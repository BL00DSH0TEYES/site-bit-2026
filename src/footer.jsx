import React from 'react';
import logo from './misc/best-white.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="footer-separator">
        <svg 
          width="100%" 
          height="1" 
          viewBox="0 0 100 1" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="fade-line-footer" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="50%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="100" height="1" fill="url(#fade-line-footer)" />
        </svg>
      </div>

      <div className="footer-content">
        <div className="footer-left">
          <p className="footer-text">
            All rights reserved | Copyright © {currentYear} <br />
            <a href='https://bestbrasov.ro/'>Board of European Students of Technology Brasov</a>
          </p>
        </div>

        <div className="footer-center">
          <a href='https://bestbrasov.ro/' target="_blank">
          <img 
            src={logo}
            className="footer-logo" 
          />
          </a>
        </div>

        <div className="footer-right">
          <a href="https://www.facebook.com/BESTBrasov" className="footer-social-link" aria-label="Facebook" target="_blank" rel="noreferrer">
            <svg className="footer-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>

          <a href="https://www.linkedin.com/company/best-brasov/" className="footer-social-link" aria-label="LinkedIn" target="_blank" rel="noreferrer">
            <svg className="footer-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>

          <a href="https://www.instagram.com/bestbrasov/" className="footer-social-link" aria-label="Instagram" target="_blank" rel="noreferrer">
            <svg className="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>

          <a href="https://www.tiktok.com/@bestbrasov" className="footer-social-link" aria-label="TikTok" target="_blank" rel="noreferrer">
            <svg className="footer-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
        </a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;