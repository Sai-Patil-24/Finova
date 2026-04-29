import React, { useState, useEffect } from 'react';

function Navbar({ onGetStarted }) {
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine if navbar should be hidden (scrolling down)
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            // Determine if navbar should have a background (scrolled past top)
            if (currentScrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <nav className={`navbar ${!isVisible ? 'navbar--hidden' : ''} ${isScrolled ? 'navbar--scrolled' : ''}`}>
            <div className="nav-logo-container">
                <img src="/logo.png" alt="Finova Logo" className="nav-logo-img" />
                <div className="nav-logo">FINOVA</div>
            </div>
            <div className="nav-center">
                <a href="#home" className="nav-link">Home</a>
                <a href="#features" className="nav-link">Features</a>
                <a href="#about" className="nav-link">About</a>
                <a href="#experience" className="nav-link">Experience</a>
                <a href="#contact" className="nav-link">Contact</a>
            </div>
            <div className="nav-right">
                <button className="btn-login">Log in</button>
                <button className="btn-signup" onClick={onGetStarted}>Sign up</button>
            </div>
        </nav>
    );
}

export default Navbar;
