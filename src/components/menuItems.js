import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus, FaMinus } from 'react-icons/fa';

const MenuItem = ({ item, addToCart, removeFromCart, inCart, itemCount }) => {
    const fallbackImageUrl = 'https://example.com/fallback-image.jpg'; // Replace with your fallback image URL

    return (
        <div className="border p-4 rounded-lg shadow hover:shadow-xl transition-shadow bg-white">
            <img 
                src={item.imageUrl} 
                alt={`Image of ${item.name}`} 
                className="w-full h-32 object-cover mb-2 rounded" 
                onError={(e) => {
                    e.target.onerror = null; // Prevents infinite loop if fallback fails
                    e.target.src = fallbackImageUrl; // Set fallback image
                }} 
            />
            <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
            <p className="text-md text-gray-600">${item.price.toFixed(2)}</p>
            <div className="mt-3 flex items-center space-x-2">
                <button
                    onClick={() => addToCart(item)}
                    className="bg-green-500 text-white px-2 py-2 rounded-md flex items-center justify-center text-sm transition duration-300 hover:bg-green-600"
                    aria-label={`Add ${item.name} to cart`}
                >
                    <FaPlus className="mr-1" />
                    Add {itemCount > 0 && <span className="ml-1">({itemCount})</span>}
                </button>
                {itemCount > 0 && (
                    <button
                        onClick={() => removeFromCart(item)}
                        className="bg-red-500 text-white px-2 py-2 rounded-md flex items-center justify-center text-sm transition duration-300 hover:bg-red-600"
                        aria-label={`Remove ${item.name} from cart`}
                    >
                        <FaMinus className="mr-1" />
                        Remove
                    </button>
                )}
            </div>
        </div>
    );
};

MenuItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        imageUrl: PropTypes.string.isRequired,
    }).isRequired,
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    inCart: PropTypes.bool.isRequired,
    itemCount: PropTypes.number.isRequired,
};

export default MenuItem;