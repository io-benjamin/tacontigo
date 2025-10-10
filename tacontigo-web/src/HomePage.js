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
            &#10094;
          </button>
          {renderImages()}
          <button 
            className="next-button" 
            onClick={nextSlide}
            aria-label="Next images"
          >
            &#10095;
          </button>
        </section>
      </main>

      <section className="tagline-section">
        <h1 className="food-text">Tacos that go wherever you go!</h1>
        <h1 className="food-text2" aria-hidden="true">Tacos that go wherever you go!</h1>
      </section>

      <section className="order-section">
        <div className="order-button-container">
          <a href="https://tinyurl.com/mr33xkmf" target="_blank" rel="noopener noreferrer">
            <button className="button-74 ubereats" type="button">Order on UberEats</button>
          </a>
          <a href="https://tinyurl.com/yckyxzuy" target="_blank" rel="noopener noreferrer">
            <button className="button-74 doordash" type="button">Order on DoorDash</button>
          </a>
        </div>
      </section>

      <section className="cater-section">
        <div className="cater-content">
          <h2>Planning an Event?</h2>
          <p>Let us cater your next celebration with our delicious taco packages!</p>
          <Link to="/Catering" className="cater-link">
            <button className="button-74 cater-btn" type="button">Cater Today!</button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
