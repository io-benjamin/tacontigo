// src/HeroSection.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

const HeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        if (window.scrollY > 50) {
          heroRef.current.classList.add('scrolled');
        } else {
          heroRef.current.classList.remove('scrolled');
        }
        
        if (window.scrollY > 150) {
          heroRef.current.classList.add('show-text');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      {/* Animated WebP background - autoplays everywhere, no play button needed */}
      <img
        className="hero-animation"
        src="/animation.webp"
        alt=""
        aria-hidden="true"
      />

      {/* Simple text on top */}
      <div className="hero-text">
        <h1 className="hero-title">Food that feels like family.</h1>
        <p className="hero-subtitle">
          Made with love. Served with pride.
        </p>

        <div className="hero-buttons">
          <a
            href="https://tinyurl.com/yckyxzuy"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn primary"
          >
            Order Now
          </a>
          <Link to="/Catering" className="hero-btn ghost">
            Catering & Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
