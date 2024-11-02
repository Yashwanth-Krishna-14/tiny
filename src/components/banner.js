import React from 'react';
import { useNavigate } from 'react-router-dom';


const PromoBanner = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-yellow-100 p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4">DEALS OF THE DAY</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
        <img src="https://www.hungryjacks.com.au/Upload/HJ/Media/Menu/product/Thumbnail/ThickShake-Chocolate-1600x1200.png" width="400" height="400"  ></img>
          <h3 className="text-xl font-semibold">Chocolate Thick Shake</h3>
          <p className="text-green-500 font-bold">FREE</p>
          <p className="text-sm text-gray-600">*Minimum order value $39. T&C Apply</p>
          <button className="mt-2 bg-orange-500 text-white py-2 px-4 rounded-lg" onClick={() => navigate('/menu')}>ORDER NOW</button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
        <img src="https://th.bing.com/th/id/OIP.L2DvtigcG2mDg37PX-HdDgHaE8?w=227&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" width="400" height="400"></img>
          <h3 className="text-xl font-semibold">Beef Wellington</h3>
          <p className="text-green-500 font-bold">FREE</p>
          <p className="text-sm text-gray-600">*Minimum order value $99. T&C Apply</p>
          <button className="mt-2 bg-orange-500 text-white py-2 px-4 rounded-lg" onClick={() => navigate('/menu')}>ORDER NOW</button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
        <img src="https://th.bing.com/th/id/OIP.ine78NHGbXjrUSykdLmw6gAAAA?rs=1&pid=ImgDetMain" width="400" height="auto"></img>
            
          <h3 className="text-xl font-semibold">BK Beef Whopper</h3>
          <p className="text-green-500 font-bold">FREE</p>
          
          <h1>Bk special</h1>
          <h1>Double patty</h1>
          <p className="text-sm text-gray-600">*Minimum order value $29. T&C Apply</p>
          <button className="mt-2 bg-orange-500 text-white py-2 px-4 rounded-lg" onClick={() => navigate('/menu')}>ORDER NOW</button>
        </div>
      </div>
      <button className="mt-6 bg-orange-500 text-white py-2 px-6 rounded-lg" onClick={() => navigate('/menu')}>EXPLORE FULL MENU</button>
    </div>
  );
};

export default PromoBanner;
