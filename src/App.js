// ================= FRONTEND ONLY (React UI - No Backend) =================
// File: App.js

import React, { useState } from "react";
import "./App.css";

const menuItems = [
  {
    id: 1,
    name: "Chicken Biryani",
    price: 180,
    image: "/images/chicken_biryani.png",
  },
  {
    id: 2,
    name: "Veg Thali",
    price: 120,
    image: "/images/veg_thali.png",
  },
  {
    id: 3,
    name: "Burger",
    price: 90,
    image: "/images/burger.png",
  },
  {
    id: 4,
    name: "Pizza",
    price: 200,
    image: "/images/pizza.png",
  },
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      setCart(cart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const generateMessage = () => {
    let message = "Hi, I want to order:\n\n";
    let total = 0;

    cart.forEach(item => {
      const itemTotal = item.price * item.qty;
      total += itemTotal;
      message += `• ${item.name} x${item.qty} = ₹${itemTotal}\n`;
    });

    message += `\nTotal: ₹${total}`;
    message += `\n\nName: `;
    message += `\nAddress: `;

    return encodeURIComponent(message);
  };

  const handleOrder = () => {
    const phone = "917751012095";
    const url = `https://wa.me/${phone}?text=${generateMessage()}`;
    window.open(url, "_blank");
  };

  return (
    <div className="container">
      <h1>🍽️ My Restaurant</h1>

      <div className="menu">
        {menuItems.map(item => (
          <div className="card" key={item.id}>
            <img src={item.image} alt="food" />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button onClick={() => addToCart(item)}>Add</button>
          </div>
        ))}
      </div>

      <div className="cart">
        <h2>🛒 Cart</h2>
        {cart.length === 0 && <p>No items added</p>}
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <span>{item.name} x{item.qty}</span>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}

        {cart.length > 0 && (
          <button className="order-btn" onClick={handleOrder}>
            Order on WhatsApp
          </button>
        )}
      </div>
    </div>
  );
}

export default App;


