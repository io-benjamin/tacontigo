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
          <a href="https://food.google.com/chooseprovider?restaurantId=/g/11khc34gc1&g2lbs=AOHF13kQZuc--lAg0FKcLhzbXbTzXPXztNUaC3FmZUm2sRcxuJqIKfk9w5OtJLMMCLLDcbTERX_hCezKS51GJgExLaPbGmp6GBm11OAkwdrlBbPVxBxmLtc%3D&hl=en-US&gl=us&ssta=1&fo_m=MfohQo559jFvMUOzJVpjPL1YMfZ3bInYwBDuMfaXTPp5KXh-&gei=2RRGZtLPPOeu5NoP2cWAqAk&ei=2RRGZtLPPOeu5NoP2cWAqAk&opi=89978449&foub=mcpp&sa=X&sei=CTC0p_aKX3KsEXwlyb0gvi0x&utm_campaign&utm_source=search&showAllProvidersList=0&ved&addressId&orderType=2&partnerId=11344137403575542233&fulfillmentTime=GgwKBgjI2ZmyBhD_4AE&menuSearchQuery&cartId=GAEiGFJhLVVMaVdVUVk2S2VQb19fQWt1c0E9PQ%3D%3D&fo_s=OA&dineInLocationId" target="_blank" onClick={handleLinkClick}>Order</a>
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
