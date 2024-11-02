// src/AuthPage.js
import React, { useState } from 'react';
import { auth, db } from './firebase'; // Import your firebase config
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const AuthPage = ({ isLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(isLogin);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      if (isLoginMode) {
        // Handle login logic
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Logged in with:', { email });
      } else {
        // Handle signup logic
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create a user profile in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          name,
          email,
          address: '', // Initialize with empty address or any default value
        });

        console.log('Signed up with:', { name, email });
      }
      onClose(); // Close modal after successful login/signup
    } catch (error) {
      setErrorMessage(error.message); // Set error message on failure
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div className="relative p-6">
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" aria-label="Close">
        ×
      </button>
      <h1 className="text-2xl font-bold mb-6 text-center">{isLoginMode ? 'Login' : 'Signup'}</h1>
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLoginMode && (
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-500'} text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300`}
        >
          {loading ? 'Processing...' : (isLoginMode ? 'Login' : 'Signup')}
        </button>
      </form>
      <button onClick={toggleMode} className="mt-4 text-blue-500 hover:underline">
        {isLoginMode ? 'Switch to Signup' : 'Switch to Login'}
      </button>
    </div>
  );
};

export default AuthPage;