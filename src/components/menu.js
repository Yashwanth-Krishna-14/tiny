import React, { useState, useEffect } from 'react';
import MenuItem from './menuItems';
import usePagination from './pagination';
import { Link } from 'react-router-dom';
import { db } from './firebase'; // Import your Firebase configuration
import { collection, getDocs } from 'firebase/firestore';

const Menu = ({ addToCart, removeFromCart, cart, getItemCount }) => {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('name');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch menu items from Firestore
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const menuCollection = collection(db, 'bq');
        const menuSnapshot = await getDocs(menuCollection);
        const items = menuSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMenuItems(items);
      } catch (err) {
        console.error("Error fetching menu items: ", err);
        setError("Failed to load menu items.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Filter and sort items based on user input
  const filteredItems = menuItems
    .filter(item => item.name && item.name.toLowerCase().includes(filter.trim().toLowerCase()))
    .sort((a, b) => (sort === 'name' ? a.name.localeCompare(b.name) : a.price - b.price));

  // Pagination logic
  const { currentData, currentPage, totalPages, setCurrentPage } = usePagination(filteredItems, 12);

  if (loading) {
    return <div className="text-center">Loading menu items...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Menu</h1>
      <input
        type="text"
        placeholder="Filter by name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      >
        <option value="name">Sort by Name</option>
        <option value="price">Sort by Price</option>
      </select>

      {/* Displaying Filtered Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentData.map(item => (
          <MenuItem
            key={item.id}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            inCart={cart.some(cartItem => cartItem.id === item.id)}
            itemCount={getItemCount(item)}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <Link
            key={index}
            to="#"
            onClick={() => setCurrentPage(index + 1)}
            className={`px-4 py-2 mx-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
          >
            {index + 1}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;