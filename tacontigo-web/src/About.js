import React, { useState, useEffect } from 'react';
import './About.css';
import Footer from './footer.js';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import event1 from './assets/event-images/event1.JPG';
import event2 from './assets/event-images/event2.JPG';
import event3 from './assets/event-images/event3.JPEG';
import event4 from './assets/event-images/event4.JPEG';
import event5 from './assets/event-images/event5.JPEG';



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
        
        <div className="about-cards-container">
          <div className="about-card">
            <h3>Our Story</h3>
            <p className="About-us">Welcome to our page! We're thrilled to share a glimpse into who we are. Hailing from Guadalajara, Jalisco, Mexico, we take immense pride in being a family-owned business dedicated to bringing you the authentic taste of our culinary heritage. Get ready to embark on a flavorful journey with us!</p>
            <p className="About-us">Our roots are deeply intertwined with the vibrant tapestry of Guadalajara's culinary scene, and we're excited to bring that vibrant experience directly to you. From the bustling streets of our hometown to your neighborhood, our family is on a mission to share the passion, flavors, and warmth that define our traditional Mexican dishes.</p>
            <p className="About-us">Explore our food trucks and savor the authenticity in every bite. Whether it's our famous tacos, hearty burritos, savory tortas, or flavorful quesadillas, each dish is crafted with the love and attention to detail that reflects our family's commitment to excellence. Complement your meal with our signature homemade sauces and traditional sides for a truly satisfying experience.</p>
            <p className="About-us">Join us on this delicious adventure, where every meal is not just a taste of Mexico but a piece of our family's story. Thank you for being a part of our journey, and we look forward to creating memorable moments with you through the irresistible flavors of Guadalajara.</p>
          </div>
          
          <div className="about-card">
            <h3>Nuestra Historia</h3>
            <p className="About-us">¡Bienvenidos a nuestra página! Somos un negocio familiar orgulloso de compartir el auténtico sabor de Guadalajara, Jalisco, México. Desde nuestros famosos tacos hasta nuestras sabrosas tortas, cada platillo está hecho con amor y atención al detalle.</p>
            <p className="About-us">Nuestros camiones de comida llevan la esencia de nuestra herencia culinaria directamente a tu vecindario. Únete a nosotros en este viaje lleno de sabores y descubre la pasión que hay detrás de cada bocado.</p>
            <p className="About-us">¡Gracias por ser parte de nuestra historia!</p>
          </div>
        </div>
      </div>
    <div className='image-container'>
          <img src={event1} alt='event 1'/>
          <img src={event2} alt='event 2'/>
          <img src={event3} alt='event 3'/>
          <img src={event4} alt='event 4'/>
          <img src={event5} alt='event 5'/>
    </div>
    <div className="About-inquiry">
          <h2>Want our food trucks at your event?</h2>
          <p>Whether you're hosting a party, corporate event, or just a gathering with friends, our food trucks bring the authentic flavors of Guadalajara straight to you.</p>
            <Link to="/Catering" className="inquiry-button">
            Inquire About Having Us!
          </Link>
    </div>

    {/* FAQ Section */}
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-container">
        <div className="faq-item">
          <h3>What are your hours of operation?</h3>
          <p>We're open Tuesday through Saturday from 11:30 AM to 8 PM, and Sunday from 12 PM to 8 PM.</p>
        </div>
        <div className="faq-item">
          <h3>Do you offer delivery?</h3>
          <p>Yes! You can order delivery through DoorDash or call us directly for phone orders.</p>
        </div>
        <div className="faq-item">
          <h3>What is the minimum order for catering?</h3>
          <p>The minimum order for catering is 20 people. Please visit our Catering page for more details.</p>
        </div>
        <div className="faq-item">
          <h3>How far in advance do I need to place a catering order?</h3>
          <p>We recommend placing your catering order at least three weeks in advance to ensure availability.</p>
        </div>
        <div className="faq-item">
          <h3>Do you have vegetarian or vegan options?</h3>
          <p>Yes! We offer vegetarian options and can accommodate dietary restrictions. Please let us know your needs when ordering.</p>
        </div>
        <div className="faq-item">
          <h3>How can I contact you?</h3>
          <p>You can call us directly for orders, email us at tacontigofamilia@gmail.com, or use our catering form for event inquiries.</p>
        </div>
      </div>
    </div>

     {/* Modal */}
     {selectedImage && (
        <div className="modal-about">
          <div className="modal-content-about">
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={selectedImage} alt="Selected" />
          </div>
        </div>
      )}
    <Footer />
    </div>
  );
}

export default About;