import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Footer from './footer.js';

// Food images imports
import image20 from './assets/food-images/20.jpg';
import image4 from './assets/food-images/4.jpg';
import image12 from './assets/food-images/12.jpg';
import image19 from './assets/food-images/19.jpg';
import image6 from './assets/food-images/6.jpg';
import image14 from './assets/food-images/14.jpg';
import image8 from './assets/food-images/8.jpg';
import image15 from './assets/food-images/15.jpg';
import image18 from './assets/food-images/18.jpg';
import image2 from './assets/food-images/2.jpg';
import image21 from './assets/food-images/21.png';


// Constants
const SLIDE_INTERVAL = 7500; // 7.5 seconds
const IMAGES_PER_SLIDE = 3;

// Food data configuration
const FOOD_DATA = [
  { image: image20, name: 'Birria Tacos con Chile Toreado' },
  { image: image4, name: 'Vampiros' },
  { image: image12, name: 'Combo con Tacos y Hotdog' },
  { image: image19, name: 'Birria-Grilled Cheese' },
  { image: image6, name: 'Torta Ahogada' },
  { image: image14, name: 'Torta Al Pastor' },
  { image: image8, name: 'Tacos de Asada con Cebolla Frita' },
  { image: image15, name: 'Tacos de Lengua con Chile Toreado' },
  { image: image18, name: 'Birria Tacos' },
  { image: image2, name: 'Tacos de Asada' },
  { image: image21, name: 'Chicken Quesadilla with Rice' }
];

function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + IMAGES_PER_SLIDE) % FOOD_DATA.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // Navigation handlers
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + IMAGES_PER_SLIDE) % FOOD_DATA.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - IMAGES_PER_SLIDE;
      return newIndex < 0 ? FOOD_DATA.length + newIndex : newIndex;
    });
  };

  // Render image component
  const renderImageWrapper = (index, key) => {
    const foodItem = FOOD_DATA[index % FOOD_DATA.length];
    return (
      <div key={key} className="image-wrapper">
        <img src={foodItem.image} alt={foodItem.name} />
        <div className="overlay">{foodItem.name}</div>
      </div>
    );
  };

  // Render images based on screen size
  const renderImages = () => {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      return renderImageWrapper(currentIndex, 'mobile');
    }
    
    return (
      <>
        {renderImageWrapper(currentIndex, 'desktop-1')}
        {renderImageWrapper(currentIndex + 1, 'desktop-2')}
        {renderImageWrapper(currentIndex + 2, 'desktop-3')}
      </>
    );
  };

  return (
    <div>
      <main className="main-content">
        <section className="image-container">
          <div className="pattern" />
          <button 
            className="prev-button" 
            onClick={prevSlide}
            aria-label="Previous images"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          {renderImages()}
          <button 
            className="next-button" 
            onClick={nextSlide}
            aria-label="Next images"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </section>
      </main>

      <section className="tagline-section">
        <h1 className="food-text">Tacos that go wherever you go!</h1>
        <h1 className="food-text2" aria-hidden="true">Tacos that go wherever you go!</h1>
      </section>

      <section className="order-section">
        <div className="delivery-buttons">
          {/* DoorDash Button */}
          <a
            href="https://tinyurl.com/yckyxzuy"
            target="_blank"
            rel="noopener noreferrer"
            className="delivery-btn doordash-btn"
          >
            <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.071 8.409a6.09 6.09 0 0 0-5.396-3.228H.584A.589.589 0 0 0 .17 6.184L3.894 9.93a1.752 1.752 0 0 0 1.242.516h12.049a1.554 1.554 0 1 1 .031 3.108H8.91a.589.589 0 0 0-.415 1.003l3.725 3.747a1.752 1.752 0 0 0 1.242.516h3.757c4.887 0 8.584-5.225 5.852-10.413z" />
            </svg>
            <span>Order on DoorDash</span>
          </a>

          {/* Uber Eats Button */}
          <a
            href="https://tinyurl.com/mr33xkmf"
            target="_blank"
            rel="noopener noreferrer"
            className="delivery-btn ubereats-btn"
          >
            <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.4 2.1C3.8 2.1 2.4 3.5 2.4 5.1v5.8c0 1.6 1.3 2.9 2.9 2.9h5.8c1.6 0 2.9-1.3 2.9-2.9V5.1c0-1.6-1.3-2.9-2.9-2.9H5.4zm7 5.8c0-.8.6-1.4 1.4-1.4h5.8c.8 0 1.4.6 1.4 1.4v5.8c0 .8-.6 1.4-1.4 1.4h-5.8c-.8 0-1.4-.6-1.4-1.4V7.9zm-10 6.2c0-.8.6-1.4 1.4-1.4h5.8c.8 0 1.4.6 1.4 1.4v5.8c0 .8-.6 1.4-1.4 1.4H3.8c-.8 0-1.4-.6-1.4-1.4v-5.8zm10 0c0-.8.6-1.4 1.4-1.4h5.8c.8 0 1.4.6 1.4 1.4v5.8c0 .8-.6 1.4-1.4 1.4h-5.8c-.8 0-1.4-.6-1.4-1.4v-5.8z" />
            </svg>
            <span>Order on Uber Eats</span>
          </a>
        </div>
      </section>

      {/* Separate Catering Call-to-Action Section */}
      <section className="catering-cta-section">
        <div className="catering-hero">
          <h2 className="catering-headline">Planning an Event?</h2>
          <p className="catering-description">
            Let Tacontigo bring authentic Mexican flavors to your next celebration! 
            Perfect for office parties, birthdays, weddings, and special occasions.
          </p>
          <Link to="/Catering" className="cater-main-btn">
            <svg
              className="cater-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
              <path d="M7 2v20" />
              <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
            </svg>
            <div className="cater-btn-content">
              <span className="cater-title">🌮 Start Planning Your Catering</span>
              <span className="cater-subtitle">Custom packages • Easy ordering • Guaranteed delicious</span>
            </div>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
