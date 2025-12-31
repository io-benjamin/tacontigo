import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Footer from './footer.js';
import HeroSection from "./HeroSection";

// Food images imports
import image20 from './assets/food-images/20.jpg';
import image12 from './assets/food-images/12.jpg';
import image19 from './assets/food-images/19.jpg';
import image6 from './assets/food-images/6.jpg';
import image14 from './assets/food-images/14.jpg';
import image8 from './assets/food-images/8.jpg';
import image15 from './assets/food-images/15.jpg';
import image2 from './assets/food-images/2.png';
import image3 from './assets/food-images/3.png';
import image5 from './assets/food-images/5.png';
import image7 from './assets/food-images/7.png';
import image1 from './assets/food-images/1.png';
import image9 from './assets/food-images/9.png';

// Food data configuration
const FOOD_DATA = [
  { image: image20, name: 'Birria Tacos con Chile Toreado' },
  { image: image1, name: 'Cali Hot Dog' },
  { image: image9, name: 'Burrito De Asada' },
  { image: image2, name: 'Mango Fresco / Fresh Mango' },
  { image: image3, name: 'Chicken Quesadilla' },
  { image: image12, name: 'Combo con Tacos y Hotdog' },
  { image: image19, name: 'Birria-Grilled Cheese' },
  { image: image5, name: 'Torta Al Pastor' },
  { image: image6, name: 'Torta Ahogada' },
  { image: image14, name: 'Torta Al Pastor' },
  { image: image8, name: 'Tacos de Asada con Cebolla Frita' },
  { image: image15, name: 'Tacos de Lengua con Chile Toreado' },
  { image: image7, name: 'Elote Locos Hot Cheetos / Doritos / Cheese' },
];

function HomePage() {
  const [isHovering, setIsHovering] = useState(false);

  // Duplicate food data for seamless infinite loop
  const duplicatedFoodData = [...FOOD_DATA, ...FOOD_DATA];

  return (
    <div className="home-page">
      {/* Modern hero section with video (from HeroSection.jsx) */}
      <HeroSection />

      {/* Food Gallery Section - Infinite Scrolling Carousel */}
      <section className="gallery-section">
        <div className="gallery-header">
          <h2>Our Favorites</h2>
          <p>Some of our delicious menu items</p>
        </div>
        
        <div 
          className={`carousel-wrapper ${isHovering ? 'paused' : ''}`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="carousel-track">
            {duplicatedFoodData.map((item, index) => (
              <div key={index} className="carousel-card">
                <img src={item.image} alt={item.name} className="carousel-image" />
                <div className="carousel-label">
                  <span>{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section for Catering */}
      <section className="catering-cta-section">
        <div className="catering-content">
          <h2>Planning an Event?</h2>
          <p>
            Let Tacontigo bring authentic Mexican flavors to your next celebration! 
            Perfect for office parties, birthdays, weddings, and special occasions.
          </p>
          <Link to="/Catering" className="btn btn-primary btn-large">
            Start Your Catering Order →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
