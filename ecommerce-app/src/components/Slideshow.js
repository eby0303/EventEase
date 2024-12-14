import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  '/images/image1.jpg',
  '/images/image2.jpg',
  '/images/image3.jpg',
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.slideContainer}>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          style={styles.image}
        />
        <div style={styles.overlay}>
          <h2 style={styles.title}>Create Unforgettable Events</h2>
          <p style={styles.subtitle}>Discover the perfect venue, decor, and catering for your special day</p>
          <button style={styles.button}>Start Planning</button>
        </div>
      </div>
      <button onClick={prevSlide} style={{...styles.arrow, ...styles.arrowLeft}}>
        <ChevronLeft size={24} />
      </button>
      <button onClick={nextSlide} style={{...styles.arrow, ...styles.arrowRight}}>
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  slideContainer: {
    width: '100%',
    height: 'calc(100vh - 64px)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '3rem',
    color: '#ffffff',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.5rem',
    color: '#cccccc',
    marginBottom: '2rem',
  },
  button: {
    backgroundColor: '#ff6600',
    color: '#ffffff',
    border: 'none',
    padding: '12px 24px',
    fontSize: '1rem',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  arrowLeft: {
    left: '10px',
  },
  arrowRight: {
    right: '10px',
  },
};

export default Slideshow;