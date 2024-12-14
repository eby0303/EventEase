import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { X, ChevronDown } from 'lucide-react';

export default function Component() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('');
  
  const userId = sessionStorage.getItem('userId');
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/getproduct/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/getEvents/${userId}`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchUserEvents();
  }, [userId]);

  const handleAddToEvent = async () => {
    if (selectedEvent) {
      try {
        await axios.post(`http://localhost:5000/api/auth/addProductToEvent`, {
          eventId: selectedEvent,
          productId: product._id,
        });
        alert('Product added to event!');
        setShowModal(false);
      } catch (error) {
        console.error('Error adding product to event:', error);
      }
    }
  };

  if (!product) {
    return <p className="loading">Loading product details...</p>;
  }

  return (
    <div className="container">
      <h1 className="title">{product.name}</h1>
      <div className="content">
        <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} className="image" />
        <div className="details">
          <p className="description">{product.description || "No description available."}</p>
          <p className="price">Price: ${product.price}</p>

          {product.category === 'Hall' && (
            <div className="additional-info">
              <p>Location: {product.location || "Not specified"}</p>
              <p>Capacity: {product.capacity || "Not specified"}</p>
              <p>Amenities: {product.amenities || "Not specified"}</p>
            </div>
          )}
          {product.category === 'Decor' && (
            <div className="additional-info">
              <p>Style: {product.style || "Not specified"}</p>
              <p>Available Items: {product.availableItems || "Not specified"}</p>
              <p>Customization Options: {product.customizationOptions || "Not specified"}</p>
            </div>
          )}
          {product.category === 'Catering' && (
            <div className="additional-info">
              <p>Cuisine Type: {product.cuisineType || "Not specified"}</p>
              <p>Menu Options: {product.menuOptions || "Not specified"}</p>
              <p>Dietary Options: {product.dietaryOptions || "Not specified"}</p>
              <p>Service Type: {product.serviceType || "Not specified"}</p>
            </div>
          )}

          <button onClick={() => setShowModal(true)} className="add-to-event-button">
            Add to Event
          </button>
          <Link to="/cart" className="cart-link">
            Go to Cart
          </Link>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Add to Event</h2>
              <button onClick={() => setShowModal(false)} className="close-button">
                <X size={24} />
              </button>
            </div>
            
            <div className="select-wrapper">
              <select 
                onChange={(e) => setSelectedEvent(e.target.value)} 
                value={selectedEvent}
                className="event-select"
              >
                <option value="">Select an event</option>
                {events.map((event) => (
                  <option key={event._id} value={event._id}>{event.name}</option>
                ))}
              </select>
              <div className="select-icon">
                <ChevronDown size={20} />
              </div>
            </div>
            
            <button 
              onClick={handleAddToEvent} 
              className="confirm-button"
              disabled={!selectedEvent}
            >
              Add to Event
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 24px;
          background-color: #1a1a1a;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #ff6600;
          text-align: center;
          margin-bottom: 24px;
        }

        .content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .content {
            flex-direction: row;
          }
        }

        .image {
          width: 100%;
          max-height: 400px;
          object-fit: cover;
          border-radius: 8px;
        }

        @media (min-width: 768px) {
          .image {
            width: 50%;
          }
        }

        .details {
          width: 100%;
        }

        @media (min-width: 768px) {
          .details {
            width: 50%;
          }
        }

        .description {
          color: #ffffff;
          margin-bottom: 16px;
          line-height: 1.6;
        }

        .price {
          font-size: 1.5rem;
          font-weight: bold;
          color: #ff6600;
          margin-bottom: 24px;
        }

        .additional-info {
          color: #cccccc;
          margin-bottom: 24px;
        }

        .additional-info p {
          margin-bottom: 8px;
        }

        .add-to-event-button {
          width: 100%;
          background-color: #ff6600;
          color: #ffffff;
          padding: 12px 24px;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
          margin-bottom: 16px;
        }

        .add-to-event-button:hover {
          background-color: #ff8533;
        }

        .cart-link {
          display: block;
          text-align: center;
          color: #ff6600;
          text-decoration: none;
          font-weight: bold;
          transition: color 0.3s;
        }

        .cart-link:hover {
          color: #ff8533;
        }

        .loading {
          color: #ffffff;
          text-align: center;
          font-size: 1.2rem;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background-color: #2a2a2a;
          padding: 24px;
          border-radius: 8px;
          width: 90%;
          max-width: 400px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #ff6600;
        }

        .close-button {
          background: none;
          border: none;
          color: #cccccc;
          cursor: pointer;
          transition: color 0.3s;
        }

        .close-button:hover {
          color: #ffffff;
        }

        .select-wrapper {
          position: relative;
          margin-bottom: 16px;
        }

        .event-select {
          width: 100%;
          padding: 12px;
          background-color: #3a3a3a;
          color: #ffffff;
          border: 1px solid #4a4a4a;
          border-radius: 4px;
          appearance: none;
          font-size: 1rem;
        }

        .select-icon {
          position: absolute;
          top: 50%;
          right: 12px;
          transform: translateY(-50%);
          pointer-events: none;
          color: #cccccc;
        }

        .confirm-button {
          width: 100%;
          background-color: #ff6600;
          color: #ffffff;
          padding: 12px;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s, opacity 0.3s;
        }

        .confirm-button:hover:not(:disabled) {
          background-color: #ff8533;
        }

        .confirm-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}