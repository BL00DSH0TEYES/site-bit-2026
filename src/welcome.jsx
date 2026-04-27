import { useEffect, useRef, useState } from "react";
import backgroundVideo from './misc/bg-vid.mp4';

export default function WelcomeHero({ isPageLoaded }) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const blobRef = useRef(null);
  const trailRef = useRef(null);
  const blobGroupRef = useRef(null);
  const trailGroupRef = useRef(null);
  const particlesGroupRef = useRef(null);
  
  const [showScroll, setShowScroll] = useState(false);

  const stateRef = useRef({
    target: { x: 0, y: 0, scale: 1.0 },
    smooth: { x: 0, y: 0, scale: 1.0 },
    trail: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    particles: [],
    isAuto: true,
    isExploded: false,
    side: 1,
    autoTimeout: null
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const bubbleSize = isMobile ? 220 : 350;
  const points = isMobile ? 6 : 8; 
  const wobbleAmplitude = isMobile ? 35 : 60;
  const wobbleSpeed = 0.005;
  const standbySpeed = 2.0;

  useEffect(() => {
    if (isPageLoaded && videoRef.current) {
      videoRef.current.play().catch(e => console.log("Auto-play blocked", e));
      setShowScroll(true);
    }
  }, [isPageLoaded]);

  const setRandomTarget = () => {
    const width = sectionRef.current?.offsetWidth || window.innerWidth;
    const height = sectionRef.current?.offsetHeight || window.innerHeight;
    const s = stateRef.current;
    s.side *= -1;
    s.target.x = s.side * (width * 0.4);
    s.target.y = (Math.random() - 0.5) * (height * 0.7);
    if (!s.isExploded) s.target.scale = 1.25;
  };

  const generateBlobPath = (isTrail = false, speed, angleOfMovement) => {
    const angleStep = (Math.PI * 2) / points;
    const radius = bubbleSize / 2;
    const vertex = [];
    for (let i = 0; i < points; i++) {
      const angle = i * angleStep;
      const timeOffset = isTrail ? 1000 : 0;
      let r = radius + Math.sin((Date.now() + timeOffset) * wobbleSpeed + i) * wobbleAmplitude;
      const dotProduct = Math.cos(angle - angleOfMovement);
      const stretchFactor = dotProduct > 0 ? 1.6 : 0.4;
      const finalR = r + (dotProduct * speed * stretchFactor);
      vertex.push({ x: Math.cos(angle) * finalR, y: Math.sin(angle) * finalR });
    }
    let path = "";
    for (let i = 0; i < points; i++) {
      const curr = vertex[i];
      const next = vertex[(i + 1) % points];
      const nextNext = vertex[(i + 2) % points];
      const cx = (next.x + curr.x) / 2;
      const cy = (next.y + curr.y) / 2;
      if (i === 0) path += `M${cx},${cy}`;
      const cx1 = (next.x + nextNext.x) / 2;
      const cy1 = (next.y + nextNext.y) / 2;
      path += ` Q${next.x},${next.y} ${cx1},${cy1}`;
    }
    return path + " Z";
  };

  useEffect(() => {
    const s = stateRef.current;
    const section = sectionRef.current;
    if (!section) return;

    setRandomTarget();

    const handleMove = (e) => {
      if (s.isExploded) return;
      s.isAuto = false;
      const rect = section.getBoundingClientRect();
      s.target.x = e.clientX - rect.left - rect.width / 2;
      s.target.y = e.clientY - rect.top - rect.height / 2;
      s.target.scale = 1;
      clearTimeout(s.autoTimeout);
      s.autoTimeout = setTimeout(() => {
        s.isAuto = true;
        setRandomTarget();
      }, 1500);
    };

    const handleLeave = () => {
      clearTimeout(s.autoTimeout);
      s.autoTimeout = setTimeout(() => {
        s.isAuto = true;
        setRandomTarget();
      }, 20);
    };

    section.addEventListener("mousemove", handleMove);
    section.addEventListener("mouseleave", handleLeave);

    let animationFrame;
    const animate = () => {
      if (!isPageLoaded) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      const prevX = s.smooth.x;
      const prevY = s.smooth.y;
      if (s.isAuto) {
        const dx = s.target.x - s.smooth.x;
        const dy = s.target.y - s.smooth.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 20) { setRandomTarget(); }
        else {
          s.smooth.x += (dx / dist) * standbySpeed;
          s.smooth.y += (dy / dist) * standbySpeed;
        }
      } else {
        s.smooth.x += (s.target.x - s.smooth.x) * 0.12; 
        s.smooth.y += (s.target.y - s.smooth.y) * 0.12;
      }
      s.smooth.scale += (s.target.scale - s.smooth.scale) * 0.08;
      s.trail.x += (s.smooth.x - s.trail.x) * 0.15;
      s.trail.y += (s.smooth.y - s.trail.y) * 0.15;
      s.velocity = { x: s.smooth.x - prevX, y: s.smooth.y - prevY };
      const speed = Math.sqrt(s.velocity.x ** 2 + s.velocity.y ** 2);
      const angle = Math.atan2(s.velocity.y, s.velocity.x);

      if (blobRef.current) {
        blobRef.current.setAttribute("d", generateBlobPath(false, speed, angle));
        blobGroupRef.current.style.transform = `translate(calc(50% + ${s.smooth.x}px), calc(50% + ${s.smooth.y}px)) scale(${s.smooth.scale})`;
      }
      if (trailRef.current) {
        trailRef.current.setAttribute("d", generateBlobPath(true, speed, angle));
        trailGroupRef.current.style.transform = `translate(calc(50% + ${s.trail.x}px), calc(50% + ${s.trail.y}px)) scale(${s.smooth.scale * 0.8})`;
      }
      if (s.particles.length > 0) {
        s.particles = s.particles.map(p => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, r: p.r * 0.96 })).filter(p => p.r > 1);
        if (particlesGroupRef.current) {
          particlesGroupRef.current.innerHTML = s.particles.map(p => `<circle cx="calc(50% + ${p.x}px)" cy="calc(50% + ${p.y}px)" r="${p.r}" fill="black" />`).join('');
        }
      }
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      section.removeEventListener("mousemove", handleMove);
      section.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, [isPageLoaded]);

  const handleExplode = () => {
    const s = stateRef.current;
    if (s.isExploded) return;
    s.isExploded = true;
    s.target.scale = 0;
    const count = isMobile ? 12 : 25;
    s.particles = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 15 + 5;
      return { x: s.smooth.x, y: s.smooth.y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, r: Math.random() * 40 + 20 };
    });
    setTimeout(() => {
      s.isExploded = false;
      s.target.scale = 1.0;
      setRandomTarget();
    }, 500);
  };

  return (
    <section ref={sectionRef} className="hero-section" onClick={handleExplode} id="Welcome">
      <video 
        ref={videoRef}
        className="hero-video" 
        muted 
        loop 
        playsInline 
        autoPlay
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <svg className="hero-svg-layer">
        <defs>
          <filter id="gooey-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation={isMobile ? "4" : "15"} result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          </filter>
          <mask id="hole-mask">
            <rect width="100%" height="100%" fill="white" />
            <g> 
              <g ref={particlesGroupRef} />
              <g ref={trailGroupRef}><path ref={trailRef} fill="black" /></g>
              <g ref={blobGroupRef}><path ref={blobRef} fill="black" /></g>
            </g>
          </mask>
        </defs>
        <rect 
          width="100%" height="100%" fill="black" mask="url(#hole-mask)"
          className="hero-overlay-rect"
          style={{ filter: isMobile ? 'none' : 'url(#gooey-filter)' }} 
        />
      </svg>

      <div className="hero-content-wrapper">
        <h3 className="hero-pretitle"> Brought to you by BEST Brașov </h3>
        <h2 className="hero-title">BEST Information Technology</h2>
        <p className="hero-subtitle">
          Bridging the gap between academic potential and industry innovation.
        </p>

        <div className="hero-btn-row">
          <button onClick={(e) => { e.stopPropagation(); window.open('https://maps.app.goo.gl/c6rout2UR9yvVqzT7', '_blank'); }} className="hero-info-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hero-icon-red">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-sm font-medium tracking-wide">Aula UniTBv</span>
          </button>

          <button onClick={(e) => { e.stopPropagation(); }} className="hero-info-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hero-icon-red">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="text-sm font-medium tracking-wide">18-22 May · 2026</span>
          </button>
        </div>
      </div>

      <div 
        className={`scroll-indicator ${showScroll ? 'opacity-100' : 'opacity-0'}`}
        onClick={(e) => {
          e.stopPropagation();
          sectionRef.current?.nextElementSibling?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <div className="scroll-bounce-box">
          <span className="scroll-text">Scroll Down</span>
          <svg width="32" height="120" viewBox="0 0 24 80" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </div>
    </section>
  );
}