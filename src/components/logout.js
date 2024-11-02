// src/Logout.js
import React, { useEffect } from 'react';
import { auth } from './firebase'; // Import your firebase config
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut(auth);
        console.log('User logged out successfully');
        navigate('/'); // Redirect to home or login page after logout
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-xl">Logging out...</h2>
    </div>
  );
};

export default Logout;