import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { db } from './firebase'; // Import your firebase config
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FaUser, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; // Import icons

const UserProfile = ({ user, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || !user.uid) {
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || '');
          setEmail(data.email || '');
          setAddress(data.address || '');
        } else {
          console.log('No such document!');
          setErrorMessage('User data not found.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMessage('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleSave = async () => {
    if (loading) return;

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    if (!name.trim()) {
      setErrorMessage('Name cannot be empty.');
      setLoading(false);
      return;
    }

    try {
      await setDoc(doc(db, 'users', user.uid), { name, email, address });
      setSuccessMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto border border-gray-300 my-8"> {/* Added margin for spacing */}
      <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
      
      {errorMessage && <p className="text-red-500" role="alert">{errorMessage}</p>}
      {successMessage && <p className="text-green-500" role="alert">{successMessage}</p>}
      
      {!isEditing ? (
        <>
          <div className="flex items-center font-size: 1.125rem mb-3">
            <FaUser className="text-gray-600 mr-2" />
            <span><strong>Name:</strong> {name}</span>
          </div>
          <div className="flex items-center mb-3">
            <FaEnvelope className="text-gray-600 mr-2" />
            <span><strong>Email:</strong> {email}</span>
          </div>
          <div className="flex items-center mb-4">
            <FaMapMarkerAlt className="text-gray-600 mr-2" />
            <span><strong>Address:</strong> {address || 'Not provided'}</span>
          </div>
          <button 
            onClick={() => setIsEditing(true)} 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 w-full"
            aria-label="Edit profile"
          >
            Edit Profile
          </button>
        </>
      ) : (
        <>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700" htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700" htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700" htmlFor="address">Address</label>
            <input 
              type="text" 
              id="address" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button 
            onClick={handleSave} 
            disabled={loading}
            className={`mt-4 ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 w-full`}
            aria-label={loading ? "Saving changes..." : "Save changes"}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button 
            onClick={onClose} // Close the modal instead of canceling edits
            className="mt-2 ml-auto bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300 w-full"
            aria-label="Cancel editing"
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
};

export default UserProfile;