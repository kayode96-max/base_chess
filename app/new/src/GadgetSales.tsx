import React, { useState } from 'react';
import './GadgetSales.css';

interface Gadget {
  id: number;
  name: string;
  price: number;
  image: string;
}

const gadgets: Gadget[] = [
  { id: 1, name: 'Smartphone', price: 120000, image: 'https://via.placeholder.com/120x80?text=Phone' },
  { id: 2, name: 'Laptop', price: 350000, image: 'https://via.placeholder.com/120x80?text=Laptop' },
  { id: 3, name: 'Tablet', price: 90000, image: 'https://via.placeholder.com/120x80?text=Tablet' },
  { id: 4, name: 'Smartwatch', price: 45000, image: 'https://via.placeholder.com/120x80?text=Watch' }
];

function GadgetSales() {
  const [cart, setCart] = useState<Gadget[]>([]);

  const addToCart = (gadget: Gadget) => {
    setCart([...cart, gadget]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="gadget-sales-app">
      <h2>Gadget Sales</h2>
      <div className="gadgets-section">
        <h3>Available Gadgets</h3>
        <div className="gadgets-list">
          {gadgets.map(gadget => (
            <div key={gadget.id} className="gadget-item">
              <img src={gadget.image} alt={gadget.name} />
              <div>{gadget.name}</div>
              <div>₦{gadget.price.toLocaleString()}</div>
              <button onClick={() => addToCart(gadget)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      <div className="cart-section">
        <h3>Cart</h3>
        {cart.length === 0 && <p>No items in cart.</p>}
        <ul>
          {cart.map((item, idx) => (
            <li key={idx}>{item.name} - ₦{item.price.toLocaleString()}</li>
          ))}
        </ul>
        <div className="total">Total: ₦{total.toLocaleString()}</div>
      </div>
    </div>
  );
}

export default GadgetSales;
