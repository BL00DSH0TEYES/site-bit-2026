import React from 'react';

export default function AboutSection() {
    return (
        <section id="About">
            <div class="whats-bit">
                <h1>What is BIT?</h1>
                <p>
                    <br/><br/>
                     BEST Information Technology, an event now in its eleventh edition, 
                     aims to develop a link between IT companies, 
                     the university environment and Brașov students, through dynamic activities, such as: 
                     company presentations, workshops, competitions and shows & tell.
                    <br/><br/>
                    You can discover innovations and advanced solutions offered by top-tier IT companies, while learning
                    about emerging trends and how these could transform industries. Come see live demonstrations of the
                    latest technologies and solutions used in everyday life and how these can be implemented in
                    different domains!
                    <br/><br/><br/><button onClick={() => window.open('https://docs.google.com/forms/d/1jAjpWHGJPM5ndi9ByqWvbuXdfynUGLjhrrL3IiGZVFg/viewform', '_blank')} className="bestbrasov-button">Register right now!</button>
                </p>
            </div>
            <br/><br/><br/><br/>
            <div class="our-team">
                <div class="window-container">
                    <div class="window-header">
                        <div class="dots">
                            <span class="dot red"></span>
                            <span class="dot yellow"></span>
                            <span class="dot green"></span>
                        </div>
                    <div class="window-title">our_team.jpg</div>
                </div>

                <div class="image-frame">
                    <div class="main-image"></div>
                </div>
                
                </div>
                <div class="text">
                <h1>About Us</h1>
                <p>
                    <br/><br/>BEST, or Board of European Students of Technology is a constantly growing non-profit and non-political organisation. 
                    <br/><br/>Established in 1997 under the Transylvania University of Brașov, BEST Brașov deals both with facilitating communication between the University, 
                    students and companies, but also with the professional and personal development of the organization’s members and students.
                    <br/><br/>Want to see more of what we do? Check out our other projects – you might just find your next favorite.
                    <br/><br/><br/><button onClick={() => window.open('https://bestbrasov.ro', '_blank')} className="bestbrasov-button">Check out our website here!</button>
                </p>
                </div>
            </div>
            <br/><br/><br/>
        </section>
    );
}