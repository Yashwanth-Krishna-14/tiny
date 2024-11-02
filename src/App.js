import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/menu';
import Cart from './components/cart';
import Navbar from './components/navbar';
import LandingPage from './components/landingPage';
import AuthPage from './components/authPage';
import Footer from './components/footer';
import Modal from './components/modal';
import UserProfile from './components/userProfile';
import { auth } from './components/firebase'; // Ensure this path is correct
import { onAuthStateChanged, signOut } from 'firebase/auth';


const App = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null); // State to hold user information

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          name: currentUser.displayName || '',
          email: currentUser.email,
          address: '', // You might want to fetch this from Firestore if it's stored there
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, count: cartItem.count + 1 } : cartItem
        );
      } else {
        return [...prevCart, { ...item, count: 1 }];
      }
    });
  };

  const removeFromCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem.count === 1) {
        return prevCart.filter(cartItem => cartItem.id !== item.id);
      } else {
        return prevCart.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, count: cartItem.count - 1 } : cartItem
        );
      }
    });
  };

  const clearCart = () => {
    setCart([]); // Clear the cart by setting it to an empty array
    localStorage.setItem('cart', JSON.stringify([])); // Clear local storage as well
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.count, 0);
  };

  const getItemCount = (item) => {
    const cartItem = cart.find(cartItem => cartItem.id === item.id);
    return cartItem ? cartItem.count : 0;
  };

  const openModal = (login) => {
    setIsLogin(login);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
      setUser(null); // Clear user state on logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="app">
      <Navbar 
        cartCount={cart.reduce((total, item) => total + item.count, 0)} 
        openModal={openModal} 
        user={user} // Pass user data to Navbar for conditional rendering
        handleLogout={handleLogout} // Pass logout function to Navbar
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/menu" 
          element={
            <Menu 
              addToCart={addToCart} 
              removeFromCart={removeFromCart} 
              cart={cart} 
              getItemCount={getItemCount} 
            />} 
        />
        <Route 
          path="/cart" 
          element={
            <Cart 
              cart={cart} 
              addToCart={addToCart} 
              removeFromCart={removeFromCart} 
              getSubtotal={getSubtotal} 
              clearCart={clearCart} // Pass clearCart function
            />} 
        />
        <Route 
          path="/profile" 
          element={<UserProfile user={user} />} // Pass user data to UserProfile
        /> 
      </Routes>
      
      <Footer />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <AuthPage isLogin={isLogin} onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default App;