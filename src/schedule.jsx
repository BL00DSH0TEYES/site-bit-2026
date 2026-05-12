import React, { useRef, useState, useEffect } from "react";

export default function ScheduleSection() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isResetting = useRef(false);

  const days = [
    { 
      day: "Day 1", 
      date: "18 May 2026",
      events: ["❓ Advanced Technologies and Smart Systems Design", "👩‍💼 Șef lucr. Dr. Ing. Ioana-Corina Bogdan", "🕛 Hour 12:00"] 
    },
    { 
      day: "Day 2", 
      date: "19 May 2026",
      events: ["❓ Cybersecurity, AI and LLMs", "👨‍💼 Prof. drd. Robert Șolca", "🕓 Hour 16:00"] 
    },
    { 
      day: "Day 3", 
      date: "20 May 2026",
      events: ["❓ Operation DarkNet", "👩‍💼 Asist. drd. Liana Luminița Boca", "🕓 Hour 16:00"]
    },
    { 
      day: "Day 4", 
      date: "21 May 2026",
      events: ["❓ Modern Full-Stack Web Development with Next.js: Best Practices for Building Modern, Scalable Web Applications", "👥 Asociația Studenților la Informatică și Matematică din Brașov", "🕛 Hour 12:00"] 
    },
  ];

  const displayDays = [...days.slice(-2), ...days, ...days.slice(0, 2)];
  const bufferCount = 2;

  useEffect(() => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector('.schedule-box');
      const cardWidth = card.offsetWidth + 40;
      scrollRef.current.scrollLeft = cardWidth * bufferCount;
    }
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current || isResetting.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const card = scrollRef.current.querySelector('.schedule-box');
    const cardWidth = card.offsetWidth + 40;

    const relativeScroll = scrollLeft - (cardWidth * bufferCount);
    const index = Math.round(relativeScroll / cardWidth);
    const wrappedIndex = (index + days.length) % days.length;
    if (wrappedIndex !== activeIndex) setActiveIndex(wrappedIndex);

    if (scrollLeft <= cardWidth) {
      isResetting.current = true;
      scrollRef.current.scrollLeft = scrollLeft + (cardWidth * days.length);
      setTimeout(() => { isResetting.current = false; }, 50);
    } 
    else if (scrollLeft >= scrollWidth - clientWidth - cardWidth) {
      isResetting.current = true;
      scrollRef.current.scrollLeft = scrollLeft - (cardWidth * days.length);
      setTimeout(() => { isResetting.current = false; }, 50);
    }
  };

  const handleMouseMove = (e, isCenter) => {
    if (!isCenter) return;
    const box = e.currentTarget;
    const rect = box.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    box.style.setProperty('--x', `${x}%`);
    box.style.setProperty('--y', `${y}%`);
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector('.schedule-box').offsetWidth + 40;
      const moveBy = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: moveBy, behavior: 'smooth' });
    }
  };

  return (
    <section id="Schedule">
      <h3>SCHEDULE</h3>

      <div className="carousel-wrapper">
        <button className="nav-btn left" onClick={() => scroll('left')}>&#10094;</button>
        <button className="nav-btn right" onClick={() => scroll('right')}>&#10095;</button>

        <div className="schedule-viewport" ref={scrollRef} onScroll={handleScroll}>
          {displayDays.map((item, index) => {
            const isCenter = activeIndex === (index - bufferCount + days.length) % days.length;
            
            return (
              <div key={index} className={`schedule-box ${isCenter ? "active-card" : "inactive-card"}`} onMouseMove={(e) => handleMouseMove(e, isCenter)}>
                <p>{item.day}</p>
                <h2>{item.date}</h2>
                <svg width="100%" height="1" viewBox="0 0 100 1" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id={`fade-line-${index}`} x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor="white" stopOpacity="0" />
                      <stop offset="50%" stopColor="white" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <rect width="100" height="1" fill={`url(#fade-line-${index})`} />
                </svg>

                {item.events && item.events.map((eventText, i) => (
                <div key={i} className="event-box">
                  <p>{eventText}</p>
                </div>
                ))}
              </div>
            );
          })}
        </div>

        <div className="scroll-indicators">
          {days.map((_, idx) => (
            <div key={idx} className={`dot ${activeIndex === idx ? "active" : ""}`} />
          ))}
        </div>
      </div>
    </section>
  );
}