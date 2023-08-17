import React from "react";
import HomePage from "./HomePage";
import Dropdown from "./Dropdown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import './App.css';


function App() {
  return (
    <div>
      <header className="app">
        <div className="header-title">
          <h1>TACONTIGO</h1>
          <div class="social-icons">
            <a href="#"><FontAwesomeIcon icon={faInstagram} style={{color: 'red'}} /></a>
            <a href="#"><FontAwesomeIcon icon={faFacebook} style={{color: 'red'}} /></a>
            <Dropdown />
          </div>
        </div>
        <div className="header-toggle"></div>
      </header>
      <main>
        <HomePage />
      </main>
    </div>
  );
}

export default App;