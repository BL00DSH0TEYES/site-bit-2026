import React, { useEffect, useRef } from "react";
import "./App.css";

import sponsor1 from "./misc/sponsor1.png";
import sponsor2 from "./misc/sponsor2.png";
import sponsor3 from "./misc/sponsor3.png";
import sponsor4 from "./misc/sponsor4.png";
import sponsor5 from "./misc/sponsor5.png";
import sponsor6 from "./misc/sponsor6.png";

const sponsors = [sponsor1, sponsor2, sponsor3, sponsor4, sponsor5, sponsor6];

export default function Sponsors() {
  const sponsorScrollerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const scroller = sponsorScrollerRef.current;
    scroller.setAttribute("data-animated", "true");

    const inner = scroller.querySelector(".scroller__inner");
    const children = Array.from(inner.children);

    children.forEach((child) => {
      const duplicate = child.cloneNode(true);
      duplicate.setAttribute("aria-hidden", "true");
      inner.appendChild(duplicate);
    });
  }, []);

  return (
    <section id="Sponsors">
        <h1>Made possible by our sponsors</h1>
        <div className="scroller" data-speed="slow" ref={sponsorScrollerRef}>
            <div className="scroller__inner">
                {[...sponsors, ...sponsors, ...sponsors, ...sponsors, ...sponsors, ...sponsors].map((src, i) => (
                <div className="sponsor" key={i}>
                    <img src={src} alt={`Sponsor ${i + 1}`} />
                </div>
            ))}
            </div>
        </div>
        <br></br><br></br><br></br>
    </section>
  );
}
