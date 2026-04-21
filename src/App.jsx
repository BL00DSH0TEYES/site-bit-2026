import { useState, useEffect, useRef } from 'react';
import './App.css';
import Navbar from './navbar.jsx';
import WelcomeHero from './welcome.jsx';
import AboutSection from './about.jsx';
import ScheduleSection from './schedule.jsx';
import SponsorSection from './Sponsors.jsx';
import OrganizerSection from './organizers.jsx';
import Footer from './footer.jsx';
import logoImage from './misc/best-bit-logo.png';

function App() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const aboutSectionRef = useRef(null);

  useEffect(() => {
    const handlePageLoad = () => {
      setTimeout(() => {
        setIsPageLoaded(true);
      }, 1000);
    };

    if (document.readyState === 'complete') {
      handlePageLoad();
    } else {
      window.addEventListener('load', handlePageLoad);
    }

    const handleScroll = () => {
      if (window.scrollY > 1) {
        setIsNavbarVisible(true);
      } else {
        setIsNavbarVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handlePageLoad);
    };
  }, []);

  return (
    <div className="App">
      <div className={`global-loader ${isPageLoaded ? 'revealed' : ''}`}>
        <div className="loader-container">
          <img src={logoImage} alt="Loading..." className="spinning-logo" />
        </div>
      </div>

      <Navbar isVisible={isNavbarVisible} />
      
      <WelcomeHero isPageLoaded={isPageLoaded} />

      <AboutSection />
      <ScheduleSection />
      <SponsorSection />
      <OrganizerSection />
      
      <Footer />
    </div>
  );
}

export default App;