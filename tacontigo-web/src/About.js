import React, { useState, useEffect } from 'react';
import './About.css';
import Footer from './footer.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function About() {
  const [selectedImage, setSelectedImage] = useState(null);

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
  return (
    <div className="About-content">
      <div className="About-inner">
    <h1>About Us</h1>
    <p className="About-us">Welcome to our page! We're thrilled to share a glimpse into who we are. Hailing from Guadalajara, Jalisco, Mexico, we take immense pride in being a family-owned business dedicated to bringing you the authentic taste of our culinary heritage. Get ready to embark on a flavorful journey with us!</p>

    <p className="About-us">Our roots are deeply intertwined with the vibrant tapestry of Guadalajara's culinary scene, and we're excited to bring that vibrant experience directly to you. From the bustling streets of our hometown to your neighborhood, our family is on a mission to share the passion, flavors, and warmth that define our traditional Mexican dishes.</p>

    <p className="About-us">Explore our food trucks and savor the authenticity in every bite. Whether it's our famous tacos, hearty burritos, savory tortas, or flavorful quesadillas, each dish is crafted with the love and attention to detail that reflects our family's commitment to excellence. Complement your meal with our signature homemade sauces and traditional sides for a truly satisfying experience.</p>

    <p className="About-us">Join us on this delicious adventure, where every meal is not just a taste of Mexico but a piece of our family's story. Thank you for being a part of our journey, and we look forward to creating memorable moments with you through the irresistible flavors of Guadalajara.</p>

    <p className="About-us"> ¡Bienvenidos a nuestra página! Somos un negocio familiar orgulloso de compartir el auténtico sabor de Guadalajara, Jalisco, México. Desde nuestros famosos tacos hasta nuestras sabrosas tortas, cada platillo está hecho con amor y atención al detalle. Nuestros camiones de comida llevan la esencia de nuestra herencia culinaria directamente a tu vecindario. Únete a nosotros en este viaje lleno de sabores y descubre la pasión que hay detrás de cada bocado. ¡Gracias por ser parte de nuestra historia! </p>
  </div>
    <div className='image-container'>
          <img src="/event-images/event1.jpg" alt='event 1' onClick={() => openModal("/event-images/event1.jpg")}/>
          <img src="/event-images/event2.jpg" alt='event 2' onClick={() => openModal("/event-images/event2.jpg")}/>
          <img src="/event-images/event3.jpeg" alt='event 3' onClick={() => openModal("/event-images/event3.jpeg")}/>
          <img src="/event-images/event4.jpeg" alt='event 4' onClick={() => openModal("/event-images/event4.jpeg")}/>
          <img src="/event-images/event5.jpeg" alt='event 5' onClick={() => openModal("/event-images/event5.jpeg")}/>
    </div>
    <div className='About-inner'>
    <a href="/Contact">
      <h1>Inquiry about our trucks!</h1>
    </a>
    </div>

     {/* Modal */}
     {selectedImage && (
        <div className="modal-about">
          <div className="modal-content-about">
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={selectedImage} alt="Selected Image" />
          </div>
        </div>
      )}
    <Footer />
    </div>
  );
}

export default About;