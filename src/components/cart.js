import React, { useState } from 'react';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa'; // Importing icons for actions
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Cart = ({ cart, addToCart, removeFromCart, getSubtotal, clearCart }) => {
    const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation dialog
    const navigate = useNavigate(); // Initialize useNavigate

    const handleClearCart = () => {
        clearCart();
        setShowConfirmation(false); // Close confirmation dialog after clearing
    };

    return (
        <div className="p-6 bg-gray-110 min-h-screen flex flex-col">
            <h1 className="text-4xl font-bold mb-6 text-center text-orange-700">Your Cart</h1>
            {cart.length === 0 ? (
                <div className="text-gray-700 text-center">
                    <p className="text-lg">Your cart is empty.</p>
                    <button 
                        onClick={() => navigate('/menu')} // Navigate to Menu on click
                        className="mt-4 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Explore Full Menu
                    </button>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
                        {cart.map((item) => (
                            <div 
                                key={item.id} 
                                className="bg-gray-50 shadow-lg rounded-lg p-4 flex flex-col transition-transform transform hover:scale-105"
                                style={{ width: '250px', height: '350px' }} // Fixed size for each item
                            >
                                <img 
                                    src={item.imageUrl} 
                                    alt={item.name} 
                                    className="w-full h-32 object-cover rounded-md mb-2" 
                                />
                                <h2 className="font-semibold text-lg text-gray-800">{item.name}</h2>
                                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                <div className="mt-auto flex justify-between items-center">
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => addToCart(item)}
                                            aria-label={`Add one more ${item.name}`}
                                            className="bg-green-600 text-white px-2 py-1 rounded-md flex items-center justify-center text-sm transition duration-300 hover:bg-green-700"
                                        >
                                            <FaPlus />
                                        </button>
                                        <span className="mx-2 text-lg font-bold">{item.count}</span>
                                        {item.count > 0 && (
                                            <button
                                                onClick={() => removeFromCart(item)}
                                                aria-label={`Remove one ${item.name}`}
                                                className="bg-red-600 text-white px-2 py-1 rounded-md flex items-center justify-center text-sm transition duration-300 hover:bg-red-700"
                                            >
                                                <FaMinus />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sticky Subtotal Section */}
                    <div className="mt-auto bg-yellow-100 rounded-lg p-4 fixed bottom-0 left-0 right-0 mx-auto max-w-xl z-10 shadow-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-800">Subtotal:</h2>
                            <span className="text-xl font-bold text-gray-900">${getSubtotal().toFixed(2)}</span>
                        </div>

                        {/* Clear Cart Button with Confirmation */}
                        <button 
                            onClick={() => setShowConfirmation(true)} // Show confirmation dialog
                            aria-label="Clear all items from cart"
                            className="mt-4 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300 block mx-auto flex items-center justify-center"
                        >
                            <FaTrash className="mr-2" /> {/* Trash icon */}
                            Clear Cart
                        </button>

                        {/* Confirmation Dialog */}
                        {showConfirmation && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                                    <h3 className="text-lg font-semibold mb-4">Are you sure you want to clear your cart?</h3>
                                    <div className="flex justify-between">
                                        <button 
                                            onClick={handleClearCart} 
                                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration=300"
                                        >
                                            Yes, Clear
                                        </button>
                                        <button 
                                            onClick={() => setShowConfirmation(false)} 
                                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration=300"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;