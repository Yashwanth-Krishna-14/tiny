import React from 'react';
import gifImage from '../assets/video.gif'; // Adjust the path as needed
import burgerImage from '../assets/burger.jpg'; // Adjust the path as needed
import exploreImage from "../assets/explore.png";
import PromoBanner from './banner';
import Navbar from './navbar';

import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <div className="hero-section bg-gradient-to-r from-yellow-400 via-red-500 to-orange-500 text-white p-10 text-center">
        <h1 className="text-5xl font-bold">Welcome to <span className="fancy-font">Burger Kween</span></h1>
        <p className="mt-4 text-xl">Discover our amazing combos.</p>
        <button 
          className="mt-6 px-6 py-3 bg-white text-red-500 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300"
          onClick={() => navigate('/menu')} // Navigate to Menu on click
        >
          Order Now
        </button>
      </div>

      {/* Featured Items */}
      <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gray-100">
        <FeaturedItem 
          image={burgerImage} 
          title="Special Menu Beef Burger" 
          description="A delicious beef burger with special sauce." 
        />
        <FeaturedItem 
          image={gifImage} 
          title="Promotional Offer" 
          description="Get 20% off on your first order!" 
        />
        <FeaturedItem 
          image={exploreImage} 
          title="Explore the BK Wall" 
          description="Discover new and exciting menu items." 
        />
      </div>

      {/* Promotional Banner */}
      <div className="mt-6">
        <PromoBanner />
      </div>
    </div>
  );
};

// Featured Item Component
const FeaturedItem = ({ image, title, description }) => (
  <div className="w-full md:w-1/4 p-4">
    <img src={image} alt={description} className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
    <h2 className="text-xl font-semibold text-gray-800 mt-4">{title}</h2>
    <p className="text-gray-600 mt-2">{description}</p>
  </div>
);

// Category Item Component (if needed in future)
const CategoryItem = ({ category }) => (
  <div className="category-item w-full md:w-1/4 p-4">
    <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 transform hover:scale-105 flex items-center justify-center">
      <h3 className="text-xl font-bold text-gray-800">{category}</h3>
    </div>
  </div>
);

export default LandingPage;