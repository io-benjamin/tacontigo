import React, { useState, useEffect } from 'react';
import './HomePage.css';
import Footer from './footer.js';

function HomePage() {
  const [selectedImage, setSelectedImage] = useState(null);
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

  const openModal = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // Close modal when clicking outside the modal content
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains('modal')) {
        closeModal();
      }
    };

    if (selectedImage) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [selectedImage]);

  // Function to advance the slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 3) % images.length);
    }, 7500); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % images.length);
  };

  // Function to go to the previous slide
  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 3;
      return newIndex < 0 ? images.length + newIndex : newIndex;
    });
  };

  // Function to render three images
  // Function to render a single image
  const renderImage = () => {
    return (
      <img key={currentIndex} src={images[currentIndex]} alt={`Slide ${currentIndex}`} onClick={() => openModal(images[currentIndex])} />
    );
  };
  // Function to render images based on screen size
  const renderImages = () => {
    if (window.innerWidth <= 768) {
      // For mobile devices, render only one image
      return renderImage();
    } else {
      // For larger screens, render three images
      return (
        <>
          <img key={0} src={images[currentIndex]} alt={`Slide ${currentIndex}`} onClick={() => openModal(images[currentIndex])} />
          <img key={1} src={images[(currentIndex + 1) % images.length]} alt={`Slide ${(currentIndex + 1) % images.length}`} onClick={() => openModal(images[(currentIndex + 1) % images.length])} />
          <img key={2} src={images[(currentIndex + 2) % images.length]} alt={`Slide ${(currentIndex + 2) % images.length}`} onClick={() => openModal(images[(currentIndex + 2) % images.length])} />
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
        <a href="https://food.google.com/chooseprovider?restaurantId=/g/11khc34gc1&g2lbs=AOHF13kQZuc--lAg0FKcLhzbXbTzXPXztNUaC3FmZUm2sRcxuJqIKfk9w5OtJLMMCLLDcbTERX_hCezKS51GJgExLaPbGmp6GBm11OAkwdrlBbPVxBxmLtc%3D&hl=en-US&gl=us&ssta=1&fo_m=MfohQo559jFvMUOzJVpjPL1YMfZ3bInYwBDuMfaXTPp5KXh-&gei=2RRGZtLPPOeu5NoP2cWAqAk&ei=2RRGZtLPPOeu5NoP2cWAqAk&opi=89978449&foub=mcpp&sa=X&sei=CTC0p_aKX3KsEXwlyb0gvi0x&utm_campaign&utm_source=search&showAllProvidersList=0&ved&addressId&orderType=2&partnerId=11344137403575542233&fulfillmentTime=GgwKBgjI2ZmyBhD_4AE&menuSearchQuery&cartId=GAEiGFJhLVVMaVdVUVk2S2VQb19fQWt1c0E9PQ%3D%3D&fo_s=OA&dineInLocationId" target="_blank">
          <button className="button-74" type="button">Order Now!</button>
        </a>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={selectedImage} alt="Selected Image" />
          </div>
        </div>
      )}
      

      <Footer />
    </div>
  );
}

export default HomePage;
