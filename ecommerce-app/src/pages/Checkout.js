// src/pages/Checkout.js
import React from 'react';

const Checkout = () => {
  const handleCheckout = (e) => {
    e.preventDefault();
    alert('Checkout Complete!');
  };

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={handleCheckout}>
        <div>
          <label>Name:</label>
          <input type="text" required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" required />
        </div>
        <button type="submit">Complete Purchase</button>
      </form>
    </div>
  );
};

export default Checkout;
