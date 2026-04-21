import React, { useState, useEffect } from 'react';
import './App.css';
import logo from "./misc/best-bit.png";

function Navbar({ isVisible }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 1) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isVisible ? 'visible' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-container">
        <a href="#Welcome" className="nav-logo"><img src={logo} alt="" className="logo-img" /></a>

        <div className="hamburger" onClick={toggleMenu}>
          <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
        </div>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <a href="#About" className="nav-link" onClick={() => setMenuOpen(false)}>About Us</a>
          </li>
          <li className="nav-item">
            <a href="#Schedule" className="nav-link" onClick={() => setMenuOpen(false)}>Schedule</a>
          </li>
          <li className="nav-item">
            <a href="#Sponsors" className="nav-link" onClick={() => setMenuOpen(false)}>Sponsors</a>
          </li>
          <li className="nav-item">
            <a href="#Organizers" className="nav-link" onClick={() => setMenuOpen(false)}>Organizers</a>
          </li>
          <li className="nav-item">
            <a href="#Welcome"><button onClick={() => window.open(' https://forms.gle/sfG7BAbapSatzWwW6', '_blank')} className="nav-register-button">Pre-Register</button></a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
