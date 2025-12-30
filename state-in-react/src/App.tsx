import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProductDetails from './components/products/ProductDetails';
import AddProductDetails from './components/products/AddProductDetails';

function App() {
  return (
    <div className="App">
      {/* <ProductDetails /> */}
      <AddProductDetails />
    </div>
  );
}

export default App;
