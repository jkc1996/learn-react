// Scenario: The "Search & Filter" Dashboard (Data Heavy)
// The Problem: You have a list of 5,000 products. Every time the user types in the search box, the component re-renders. If you re-filter 5,000 items on every single keystroke without memoization, the typing will feel "laggy" (delay between pressing a key and seeing the letter).

// The Solution: Use useMemo to cache the filtered list.

import React, { useState, useMemo } from 'react';

// Imagine this is a large dataset from an API
const generateProducts = () => {
  const items = [];
  for (let i = 0; i < 5000; i++) {
    items.push({ id: i, name: `Product ${i}`, price: Math.random() * 100 });
  }
  return items;
};

const allProducts = generateProducts();

export default function ProductDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false); // Unrelated state

  // 🔴 BAD PRACTICE (Without useMemo):
  // Every time you toggle 'darkMode', this filter function runs again!
  // const filteredProducts = allProducts.filter(p => 
  //     p.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // ✅ GOOD PRACTICE (With useMemo):
  // 1. If I toggle 'Dark Mode', this DOES NOT run. (Instant UI update)
  // 2. This ONLY runs when 'searchTerm' changes.
  const filteredProducts = useMemo(() => {
    console.log("🔥 Expensive Filtering Running...");
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]); // Dependency: Only re-run if search changes

  return (
    <div style={{ background: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000', padding: 20 }}>
      
      <h3>Product Dashboard ({filteredProducts.length} items)</h3>
      
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle Theme (Testing Re-render)
      </button>

      <br /><br />

      <input 
        type="text" 
        placeholder="Search products..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: 10, width: '300px' }}
      />

      <ul>
        {filteredProducts.slice(0, 5).map(p => (
          <li key={p.id}>{p.name} - ${p.price.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
}