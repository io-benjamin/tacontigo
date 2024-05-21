import React, { useState, useEffect } from 'react';
import './HomePage.css';
import Footer from './footer.js';


function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "/food-images/20.jpg",
    "/food-images/4.jpg",
    "/food-images/12.jpg",
    "/food-images/19.jpg",
    "/food-images/6.jpg",
    "/food-images/14.jpg",
    "/food-images/8.jpg",
    "/food-images/11.jpg",
    "/food-images/9.jpg",
    "/food-images/15.jpg",
    "/food-images/18.jpg",
    "/food-images/2.jpg",
    "/food-images/5.jpg"
  ];

  const foodNames = [
    'Birria Tacos con Chile Toreado',
    'Vampiros',
    'Combo con Tacos y Hotdog',
    'Birria-Grilled Cheese',
    'Torta Ahogada',
    'Torta Al Pastor',
    'Tacos de Asada con Cebolla Frita',
    'Tacos',
    'Torta',
    'Tacos de Lengua con Chile Toreado',
    'Birria Tacos',
    'Tacos de Asada',
    'Tacos de Birria con Queso'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 3) % images.length);
    }, 7500); // Change slide every 7.5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 3;
      return newIndex < 0 ? images.length + newIndex : newIndex;
    });
  };

  const renderImages = () => {
    if (window.innerWidth <= 768) {
      return (
        <div key={currentIndex} className="image-wrapper">
          <img src={images[currentIndex]} alt={foodNames[currentIndex]} />
          <div className="overlay">{foodNames[currentIndex]}</div>
        </div>
      );
    } else {
      return (
        <>
          <div key={0} className="image-wrapper">
            <img src={images[currentIndex]} alt={foodNames[currentIndex]} />
            <div className="overlay">{foodNames[currentIndex]}</div>
          </div>
          <div key={1} className="image-wrapper">
            <img src={images[(currentIndex + 1) % images.length]} alt={foodNames[(currentIndex + 1) % images.length]} />
            <div className="overlay">{foodNames[(currentIndex + 1) % images.length]}</div>
          </div>
          <div key={2} className="image-wrapper">
            <img src={images[(currentIndex + 2) % images.length]} alt={foodNames[(currentIndex + 2) % images.length]} />
            <div className="overlay">{foodNames[(currentIndex + 2) % images.length]}</div>
          </div>
        </>
      );
    }
  };

  return (
    <div>
      <div className="main-content">
        <div className='image-container'>
          <div className='pattern'></div>
          <div className="prev-button" onClick={(e) => { prevSlide(); e.preventDefault(); }}>&#10094;</div>
          {renderImages()}
          <div className="next-button" onClick={(e) => { nextSlide(); e.preventDefault(); }}>&#10095;</div>
        </div>
      </div>
      <text className='food-text'>Tacos that go wherever you go!</text>
      <text className='food-text2'>Tacos that go wherever you go!</text>

      <div className="order-button-container">
        <a href="https://food.google.com/chooseprovider?restaurantId=%2Fg%2F11khc34gc1&utm_source=share" target="_blank" rel="noopener noreferrer">
          <button className="button-74" type="button">Order Now!</button>
        </a>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
