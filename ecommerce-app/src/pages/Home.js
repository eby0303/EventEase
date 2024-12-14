import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Slideshow from '../components/Slideshow';
import { Plus, Calendar, ChevronRight, ShoppingBag } from 'lucide-react';

export default function Component() {
  const [products, setProducts] = useState({
    halls: [],
    decors: [],
    caterings: []
  });
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEventName, setNewEventName] = useState('');
  const userId = sessionStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/getproduct');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

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

    fetchProducts();
    fetchEvents();
  }, [userId]);

  const handleCreateEvent = async () => {
    if (!userId) {
      alert("You must be logged in to create an event.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/createEvent', {
        name: newEventName,
        userId: userId
      });
      setEvents([...events, response.data]);
      setShowModal(false);
      setNewEventName('');
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div className="home-container">
      <header className="main-header">
        <h1>Welcome to EventEase</h1>
        <p>Your one-stop shop for all event needs</p>
      </header>
      
      <Slideshow />

      <div style={{ height: '60px' }}></div>

      <section className="events-section">
        {userId ? (
          <>
            <div className="section-header">
              <h2 className="section-title">Your Events</h2>
              <button onClick={() => setShowModal(true)} className="create-event-button">
                <Plus size={20} /> Create Event
              </button>
            </div>
            {events.length > 0 ? (
              <div className="event-list">
                {events.map((event) => (
                  <div key={event._id} className="event-card">
                    <div className="event-card-header">
                      <Calendar size={24} className="event-icon" />
                      <h3 className="event-name">{event.name}</h3>
                    </div>
                    <div className="event-products">
                      <h4 className="products-title"><ShoppingBag size={16} /> Selected Products</h4>
                      {event.products && event.products.length > 0 ? (
                        <div className="product-grid">
                          {event.products.slice(0, 4).map((product) => (
                            <div key={product._id} className="product-item">
                              <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} className="product-image" />
                              <div className="product-details">
                                <p className="product-name">{product.name}</p>
                                <p className="product-price">${product.price}</p>
                              </div>
                            </div>
                          ))}
                          {event.products.length > 4 && (
                            <div className="product-item more-products">
                              +{event.products.length - 4} more
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="no-products">No products selected for this event yet.</p>
                      )}
                    </div>
                    <button onClick={() => navigate(`/Cart`)} className="view-event-button">
                      Manage Event <ChevronRight size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-events-container">
                <Calendar size={48} className="no-events-icon" />
                <p className="no-events">You haven't created any events yet. Start planning your first event!</p>
                <button onClick={() => setShowModal(true)} className="create-first-event-button">
                  Create Your First Event
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="login-prompt">
            <h2 className="login-prompt-title">Start Planning Your Event</h2>
            <p className="login-prompt-text">Log in to create and manage your events.</p>
            <button onClick={() => navigate('/login')} className="login-button">Log In</button>
          </div>
        )}
      </section>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Create a New Event</h3>
            <input
              type="text"
              value={newEventName}
              onChange={(e) => setNewEventName(e.target.value)}
              placeholder="Event Name"
              className="modal-input"
            />
            <div className="modal-buttons">
              <button onClick={handleCreateEvent} className="modal-create-button">Create Event</button>
              <button onClick={() => setShowModal(false)} className="modal-cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}