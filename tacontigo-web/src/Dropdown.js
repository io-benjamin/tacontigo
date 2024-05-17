import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './App.css';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleLinkClick = (event) => {
    event.stopPropagation(); // Stop event propagation
    closeDropdown();
  };

  return (
    <div className={`dropdown ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        <div className={`hamburger ${isOpen ? 'active' : ''}`}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </button>
      <ul className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
        <li>
          <Link to="/"onClick={handleLinkClick}>Home</Link> 
        </li>
        <li>
          <a href="https://food.google.com/chooseprovider?restaurantId=%2Fg%2F11khc34gc1&utm_source=share" target="_blank" onClick={handleLinkClick}>Order</a>
        </li>
        <li>
          <Link to="/Menu"onClick={handleLinkClick}>Menu</Link> 
        </li>
        <li>
          <Link to="/About"onClick={handleLinkClick}>About</Link> 
        </li>
        <li>
          <Link to="/Contact"onClick={handleLinkClick}>Contact</Link>
        </li>
      </ul>
    </div>
  );
}

export default Dropdown;
