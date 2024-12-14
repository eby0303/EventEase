import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingCart, Trash2, CreditCard } from 'lucide-react';

export default function Cart() {
  const [events, setEvents] = useState([]);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const fetchEvents = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:5000/api/auth/getEvents/${userId}`);
          setEvents(response.data);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      }
    };

    fetchEvents();
  }, [userId]);

  const handleCheckout = (eventId) => {
    alert(`Proceeding to checkout for event: ${eventId}`);
    // Implement your checkout logic here
  };

  const handleRemoveProduct = async (eventId, productId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/auth/deleteproduct`, {
        data: { eventId, productId },
      });
      
      const updatedEvent = response.data;

      setEvents((prevEvents) => 
        prevEvents.map((event) =>
          event._id === eventId
            ? { ...event, products: event.products.filter((product) => product._id !== productId) }
            : event
        )
      );
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  const handleRemoveEvent = async (eventId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/auth/removeEvent`, {
        data: { eventId },
      });
      
      // After deleting the event, remove it from the local state
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error('Error removing event:', error);
    }
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title"><ShoppingCart className="icon" /> Your Cart</h1>
      {events.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        events.map((event) => (
          <div key={event._id} className="event-card">
            <h2 className="event-name">{event.name}</h2>
            <button onClick={() => handleRemoveEvent(event._id)} className="remove-event-button">
              <Trash2 size={18} />
              Remove Event
            </button>
            {event.products && event.products.length > 0 ? (
              <div className="product-list">
                {event.products.map((product) => (
                  <div key={product._id} className="product-item">
                    <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} className="product-image" />
                    <div className="product-details">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-price">${product.price}</p>
                    </div>
                    <button onClick={() => handleRemoveProduct(event._id, product._id)} className="remove-button">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-products">No products under this event.</p>
            )}
            <button onClick={() => handleCheckout(event._id)} className="checkout-button">
              <CreditCard size={18} /> Checkout
            </button>
          </div>
        ))
      )}
      <style jsx>{`
        .cart-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #1a1a1a;
          color: #ffffff;
        }
        .cart-title {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          margin-bottom: 30px;
          color: #ff6600;
        }
        .icon {
          margin-right: 10px;
        }
        .empty-cart {
          text-align: center;
          font-size: 1.2rem;
          color: #cccccc;
        }
        .event-card {
          background-color: #2a2a2a;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .event-name {
          font-size: 1.8rem;
          margin-bottom: 15px;
          color: #ff6600;
        }
        .remove-event-button {
          background-color: transparent;
          border: none;
          color: #ff4d4f;
          cursor: pointer;
          padding: 5px;
          font-size: 1rem;
        }
        .remove-event-button:hover {
          color: #ff7875;
        }
        .product-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .product-item {
          display: flex;
          align-items: center;
          background-color: #333333;
          border-radius: 5px;
          padding: 10px;
        }
        .product-image {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 5px;
          margin-right: 15px;
        }
        .product-details {
          flex-grow: 1;
        }
        .product-name {
          font-size: 1.2rem;
          margin-bottom: 5px;
        }
        .product-price {
          font-size: 1.1rem;
          color: #ff6600;
        }
        .remove-button {
          background-color: transparent;
          border: none;
          color: #ff4d4f;
          cursor: pointer;
          padding: 5px;
        }
        .remove-button:hover {
          color: #ff7875;
        }
        .checkout-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          background-color: #ff6600;
          color: #ffffff;
          border: none;
          padding: 10px;
          font-size: 1.1rem;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 20px;
          transition: background-color 0.3s;
        }
        .checkout-button:hover {
          background-color: #ff8533;
        }
        .no-products {
          text-align: center;
          color: #cccccc;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
