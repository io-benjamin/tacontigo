import React from 'react';
import './footer.css';

const Footer = () => (
  <>
  <div className="footer-sections">
    <div className="section">
      <h2>Locations</h2>
      <p><a href="https://www.google.com/maps/dir//Tacontigo/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x89b1093d1559f871:0xabac91d8e1d702b1?sa=X&ved=2ahUKEwj27fycubODAxVkVjUKHYSkBdEQ9Rd6BAg4EAA&hl=en">13900 US-1 Chester, VA, 23831</a></p>
    </div>

    <div className="divider"></div>

    <div className="section">
      <h2>Hours</h2>
      <p>Monday: Closed</p>
      <p>Tuesday - Saturday: 12:00 PM - 8:30 PM</p>
      <p>Sunday: 11:00 AM - 8:00 PM</p>
    </div>

    <div className="divider"></div>

    <div className="section">
      <h2>Contact</h2>
      <p><a href="mailto:tacontigofamilia@gmail.com">tacontigofamilia@gmail.com</a></p>
      <p><a href="tel:8042921401">804-292-1401</a></p>
      <p><a href="tel:8046837487">804-683-7487</a></p>
      <p><a href="tel:8046777458">804-677-7458</a></p>
    </div>
  </div>
    <div className="footer-note-container">
    <h3 className="footer-note">
        © 2024 All Rights Reserved | Managed by <a href="https://estradab.dev" target="_blank" rel="noopener noreferrer">Benjamin Estrada</a>
      </h3>
    </div>
  </>
);

export default Footer;