import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./HomePage";
import Catering from "./Catering";
import About from "./About";
import menuImage from './assets/Menu/TacontigoMenu.JPG';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-root">
        <header className="site-header">
          <div className="site-header-inner">
            {/* Left: Navigation Links */}
            <nav className="nav-left">
              <Link to="/" className="nav-link">Home</Link>
              <a 
                href={menuImage} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="nav-link"
              >
                Menu
              </a>
            </nav>

            {/* Center: Brand */}
            <div className="nav-center">
              <h1 className="banner">
                <Link to="/" className="banner-link">
                  TACONTIGO
                </Link>
              </h1>
            </div>

            {/* Right: CTA Button + Socials */}
            <div className="nav-right">
              <Link to="/About" className="nav-link">About</Link>
              <a
                href="https://tinyurl.com/yckyxzuy"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-btn primary"
              >
                Order
              </a>
              <a
                href="https://www.instagram.com/RVATacontigo"
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100090290297929"
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </div>
          </div>
        </header>

        <main className="site-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/About" element={<About />} />
            <Route path="/Catering" element={<Catering />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
