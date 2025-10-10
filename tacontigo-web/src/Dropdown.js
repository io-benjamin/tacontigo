import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './App.css';
import menuImage from './assets/Menu/TacontigoMenu.JPG';

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showOrderSubmenu, setShowOrderSubmenu] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeDropdown();
      }
    };

    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const toggleDropdown = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsOpen(!isOpen);
    
    setTimeout(() => setIsAnimating(false), 400);
  };

  const closeDropdown = () => {
    if (isAnimating) return;
    setIsOpen(false);
    setShowOrderSubmenu(false);
  };

  const handleLinkClick = (event) => {
    event.stopPropagation();
    closeDropdown();
  };

  const handleOrderClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowOrderSubmenu(!showOrderSubmenu);
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
      {isOpen && ( /* Conditionally render the dropdown menu only if isOpen is true */
        <ul className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
          <li>
            <Link to="/" onClick={handleLinkClick}>Home</Link> 
          </li>
          <li className="order-item">
            <a href="#" onClick={handleOrderClick} className="order-toggle">
              Order {showOrderSubmenu ? '▼' : '▶'}
            </a>
            {showOrderSubmenu && (
              <ul className="order-submenu">
                <li>
                  <a href="https://tinyurl.com/mr33xkmf" target="_blank" rel="noreferrer" onClick={handleLinkClick}>
                    UberEats
                  </a>
                </li>
                <li>
                  <a href="https://tinyurl.com/yckyxzuy" target="_blank" rel="noreferrer" onClick={handleLinkClick}>
                    DoorDash
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/Catering" onClick={handleLinkClick}>Catering</Link>
          </li>
          <li>
            <a href={menuImage} target="_blank" rel="noreferrer" onClick={handleLinkClick}>Menu</a>
          </li>
          <li>
            <Link to="/About" onClick={handleLinkClick}>About</Link> 
          </li>
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
