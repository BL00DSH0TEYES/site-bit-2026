import React, { useEffect, useRef } from 'react';
import MO from './misc/MO.png';
import FR_PR from './misc/fr-pr.png';
import FR_COMP from './misc/fr-comp.png';
import ACAD from './misc/academic.png';
import GD from './misc/gd.png';
import IT from './misc/it.png';
import PAX from './misc/pax.png';
import PRES from './misc/presedinte.png';
import LOG from './misc/logistica.png';
import PR from './misc/pr.png';


export default function OrganizerSection() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: false });
        const parent = canvas.parentElement;
        let particles = [];
        let animationFrameId;
        let resizeTimeout;
        let isVisible = false;

        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
                if (isVisible) animate();
                else cancelAnimationFrame(animationFrameId);
            },
            { threshold: 0.1 }
        );
        observer.observe(parent);

        const init = () => {
            particles = [];
            const area = canvas.width * canvas.height;
            const count = Math.min(Math.floor(area / 30000), 60); 
            
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const handleResize = () => {
            canvas.width = parent.offsetWidth;
            canvas.height = parent.offsetHeight;
            init();
        };

        const resizeObserver = new ResizeObserver(() => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(handleResize, 250);
        });
        resizeObserver.observe(parent);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.7;
                this.speedY = (Math.random() - 0.5) * 0.7;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
            draw() {
                ctx.fillStyle = '#30f9f2';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const animate = () => {
            if (!isVisible) return;

            ctx.fillStyle = '#02080f'; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const particleLen = particles.length;
            for (let i = 0; i < particleLen; i++) {
                const p = particles[i];
                p.update();
                p.draw();

                for (let j = i + 1; j < particleLen; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < 14400) {
                        const opacity = 1 - Math.sqrt(distSq) / 120;
                        ctx.strokeStyle = `rgba(42, 240, 230, ${opacity * 0.5})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        handleResize();

        return () => {
            observer.disconnect();
            resizeObserver.disconnect();
            clearTimeout(resizeTimeout);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const canvasStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        background: 'linear-gradient(to bottom, #02080f, #000103)',
    };

    return (
        <section id='Organizers' style={{ position: 'relative', overflow: 'hidden', minHeight: '500px' }}>
            <canvas ref={canvasRef} style={canvasStyle} />

            <div style={{ position: 'relative', zIndex: 2 }}>
                <h2 className="section-title">Meet the team that organized this event!</h2>

                <div className="organizers-grid">
                    <div className="organizer-window-container">
                        <div className="organizer-window-header">
                            <div className="dots">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                            </div>
                            <div className="organizer-window-title">president.jpg</div>
                        </div>
                        <div className="organizer-window-body">
                            <img src={PRES} alt="Andi" className="organizer-img" />
                            <div className="organizer-info">
                                <h3>Cilichidreanu Andi-Marian</h3>
                                <p className="role">PRESIDENT</p>
                                <br></br>
                                <p className="contact">
                                    andi-marian.cilichidreanu@best-eu.org
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="organizer-window-container">
                        <div className="organizer-window-header">
                            <div className="dots">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                            </div>
                            <div className="organizer-window-title">main_organizer.jpg</div>
                        </div>
                        <div className="organizer-window-body">
                            <img src={MO} alt="Ioana" className="organizer-img" />
                            <div className="organizer-info">
                                <h3>Stan Ioana-Alexandra</h3>
                                <p className="role">MAIN ORGANIZER</p>
                                <br></br>
                                <p className="contact">
                                    stan.ioana.alexandra@best-eu.org
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="break"></div>

                    <div className="organizer-window-container">
                        <div className="organizer-window-header">
                            <div className="dots">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                            </div>
                            <div className="organizer-window-title">fr-produce_respo.jpg</div>
                        </div>
                        <div className="organizer-window-body">
                            <img src={FR_PR} alt="Karina" className="organizer-img" />
                            <div className="organizer-info">
                                <h3>Raduly Karina</h3>
                                <p className="role">PRIZES/PRODUCTS FUNDRAISING RESPONSIBLE</p>
                            </div>
                        </div>
                    </div>

                    <div className="organizer-window-container">
                        <div className="organizer-window-header">
                            <div className="dots">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                            </div>
                            <div className="organizer-window-title">fr-companies_respo.jpg</div>
                        </div>
                        <div className="organizer-window-body">
                            <img src={FR_COMP} alt="Stefan" className="organizer-img" />
                            <div className="organizer-info">
                                <h3>Dănilă Ștefan Andrei</h3>
                                <p className="role">COMPANY FUNDRAISING RESPONSIBLE</p>
                            </div>
                        </div>
                    </div>

                    <div className="organizer-window-container">
                        <div className="organizer-window-header">
                            <div className="dots">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                            </div>
                            <div className="organizer-window-title">pr_respo.jpg</div>
                        </div>
                        <div className="organizer-window-body">
                            <img src={PR} alt="Miruna" className="organizer-img" />
                            <div className="organizer-info">
                                <h3>Tudor Miruna Emilia</h3>
                                <p className="role">PUBLIC RELATIONS RESPONSIBLE</p>
                            </div>
                        </div>
                    </div>

                    <div className="break"></div>

                    <div className="organizer-window-container">
                        <div className="organizer-window-header">
                            <div className="dots">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                            </div>
                            <div className="organizer-window-title">gd_respo.jpg</div>
                        </div>
                        <div className="organizer-window-body">
                            <img src={GD} alt="Sorin" className="organizer-img" />
                            <div className="organizer-info">
                                <h3>Gavra Sorin-Andrei</h3>
                                <p className="role">GRAPHIC DESIGN RESPONSIBLE</p>
                            </div>
                        </div>
                    </div>

                    <div className="organizer-window-container">
                        <div className="organizer-window-header">
                            <div className="dots">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                            </div>
                            <div className="organizer-window-title">it_respo.jpg</div>
                        </div>
                        <div className="organizer-window-body">
                            <img src={IT} alt="Rares" className="organizer-img" />
                            <div className="organizer-info">
                                <h3>Bucur Rareș-Mihai</h3>
                                <p className="role">IT RESPONSIBLE</p>
                            </div>
                        </div>
                    </div>

                    <div className="organizer-window-container">
                        <div className="organizer-window-header">
                            <div className="dots">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                            </div>
                            <div className="organizer-window-title">academic_respo.jpg</div>
                        </div>
                        <div className="organizer-window-body">
                            <img src={ACAD} alt="Ana" className="organizer-img" />
                            <div className="organizer-info">
                                <h3>Crivăț Ana-Maria</h3>
                                <p className="role">ACADEMIC RESPONSIBLE</p>
                            </div>
                        </div>
                    </div>

                    <div className="break"></div>

                    <div className="organizer-window-container">
                        <div className="organizer-window-header">
                            <div className="dots">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                            </div>
                            <div className="organizer-window-title">pax_respo.jpg</div>
                        </div>
                        <div className="organizer-window-body">
                            <img src={PAX} alt="Andrada" className="organizer-img" />
                            <div className="organizer-info">
                                <h3>Dobre Andrada-Maria</h3>
                                <p className="role">PARTICIPANTS EXPERIENCE RESPONSIBLE</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="organizer-window-container">
                        <div className="organizer-window-header">
                            <div className="dots">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                            </div>
                            <div className="organizer-window-title">logistics_respo.jpg</div>
                        </div>
                        <div className="organizer-window-body">
                            <img src={LOG} alt="Maria" className="organizer-img" />
                            <div className="organizer-info">
                                <h3>Gergely Maria</h3>
                                <p className="role">LOGISTICS RESPONSIBLE</p>
                            </div>
                        </div>
                    </div>

                    <div className="break"></div>
                </div>
            </div>
        </section>
    );
}