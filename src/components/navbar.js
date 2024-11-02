import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUtensils, FaSignInAlt, FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import AddressModal from './addressModal'; // Import the AddressModal component
import logo from '../assets/ck burger.webp'; // Adjust the path as needed
import { auth } from './firebase'; // Import Firebase auth
import { signOut } from 'firebase/auth';

const Navbar = ({ cartCount, openModal, user }) => {
  const location = useLocation();
  const [option, setOption] = useState('dine-in');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [address, setAddress] = useState('Enter your address');
  const [showLogoutWarning, setShowLogoutWarning] = useState(false); // State for logout confirmation

  const toggleOption = () => {
    setOption(prevOption => (prevOption === 'dine-in' ? 'takeaway' : 'dine-in'));
  };

  const openAddressModal = () => {
    setIsAddressModalOpen(true);
  };

  const closeAddressModal = () => {
    setIsAddressModalOpen(false);
  };

  const handleAddressChange = (newAddress) => {
    setAddress(newAddress);
    closeAddressModal();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-4">
        <img src={logo} alt="Brand Logo" className="h-8" />
        <div className="flex space-x-4">
          <Link
            to="/"
            className={`text-white flex items-center space-x-2 ${location.pathname === '/' ? 'font-bold' : ''}`}
            aria-label="Home"
          >
            <FaHome />
            <span>Home</span>
          </Link>
    
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
         {/*  <span className="text-white">{option === 'dine-in' ? 'Dine-In' : 'Takeaway'}</span> */}
          <Link
            to="/menu"
            className={`text-white flex items-center space-x-2 ${location.pathname === '/menu' ? 'font-bold' : ''}`}
            aria-label="Menu"
          >
            <FaUtensils />
            <span>Menu</span>
          </Link>
          {/* <label className="switch" aria-label={`Switch to ${option === 'dine-in' ? 'takeaway' : 'dine-in'}`}>
            <input type="checkbox" checked={option === 'takeaway'} onChange={toggleOption} />
            <span className="slider round"></span>
          </label> */}
        </div>
       
        <Link
          to="/cart"
          className={`text-white flex items-center space-x-2 ${location.pathname === '/cart' ? 'font-bold' : ''}`}
          aria-label="Cart"
        >
          <FaShoppingCart />
          <span>Cart ({cartCount})</span>
        </Link>
        <Link
          to="/profile"
          className={`text-white flex items-center space-x-2 ${location.pathname === '/profile' ? 'font-bold' : ''}`}
          aria-label="Profile"
        >
          <FaUser />
          <span>Profile</span>
        </Link>
        {user ? (
          <>
            <button 
              onClick={() => setShowLogoutWarning(true)} 
              className="text-white flex items-center space-x-2" 
              aria-label="Logout"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => openModal(true)}
            className="text-white flex items-center space-x-2"
            aria-label="Login"
          >
            <FaSignInAlt />
            <span>Login</span>
          </button>
        )}

        {/* Address Input */}
</div>

      {/* Confirmation Dialog for Logout */}
      {showLogoutWarning && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>
            <div className="flex justify-end mt-4">
              <button 
                onClick={() => setShowLogoutWarning(false)} 
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  handleLogout();
                  setShowLogoutWarning(false);
                }} 
                className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Address Modal */}
      <AddressModal isOpen={isAddressModalOpen} onClose={closeAddressModal} onSave={handleAddressChange} />
    </nav>
  );
};

export default Navbar;