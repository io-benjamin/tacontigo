import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Use Link from react-router-dom
import HomePage from "./HomePage";
import Dropdown from "./Dropdown";
import Menu from "./Menu"; // Import the Menu component
import About from "./About";
import Contact from "./Contact";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import './App.css';

function App() {
  return (
    <Router basename="/tacontigo">
      <div>
        <header className="app">
          <div className="header-title">
            <Dropdown />
            <h1 className="banner">
              <Link to="/" className="banner-link">TACONTIGO</Link>
            </h1>
            <div className="social-icons">
              <a href="https://www.instagram.com/RVATacontigo"><FontAwesomeIcon icon={faInstagram} style={{color: 'red'}} /></a>
              <a href="https://www.facebook.com/profile.php?id=100090290297929"><FontAwesomeIcon icon={faFacebook} style={{color: 'red'}} /></a>
            </div>
          </div>
          <div className="header-toggle"></div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} /> 
            <Route path="/About" element={<About />} /> 
            <Route path="/Menu" element={<Menu />} /> 
            <Route path="/Contact" element={<Contact />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
