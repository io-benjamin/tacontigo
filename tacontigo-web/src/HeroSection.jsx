// src/HeroSection.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css"; // we'll define this next

const HeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        // Add 'scrolled' class when user scrolls down even a little
        if (window.scrollY > 50) {
          heroRef.current.classList.add('scrolled');
        } else {
          heroRef.current.classList.remove('scrolled');
        }
        
        // Add 'show-text' class when user scrolls down more to reveal text near video
        // Once added, it stays (doesn't remove when scrolling back up)
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
      {/* Background animation */}
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
      >
        {/* Use your actual file: Animation.mp4 in /public */}
        <source src="/Animation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Simple text on top - no boxes, no borders */}
      <div className="hero-text">
        {/* Option A - Family-focused */}
        <h1 className="hero-title">Food that feels like family.</h1>
        <p className="hero-subtitle">
          Made with love. Served with pride.
        </p>
        
        {/* Option B - Quality-focused (commented out, swap when needed):
        <h1 className="hero-title">Real tacos. Zero compromises.</h1>
        <p className="hero-subtitle"></p>
        */}

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
