import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

function Navbar({ onGetStarted, session }) {
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

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

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setDropdownOpen(false);
        navigate('/');
    };

    // Get user info
    const user = session?.user;
    const userEmail = user?.email || '';
    const userName = user?.user_metadata?.full_name || user?.user_metadata?.name || '';
    const userAvatar = user?.user_metadata?.avatar_url || '';
    const initials = userName
        ? userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : userEmail ? userEmail[0].toUpperCase() : '?';

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
                {session ? (
                    /* ── Logged-in: Profile avatar + dropdown ── */
                    <div className="nav-profile-wrapper" ref={dropdownRef}>
                        <span className="nav-profile-name" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            {userName || 'User'}
                        </span>
                        <button
                            className="nav-profile-btn"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            aria-label="User menu"
                        >
                            {userAvatar ? (
                                <img src={userAvatar} alt="Avatar" className="nav-avatar-img" />
                            ) : (
                                <span className="nav-avatar-initials">{initials}</span>
                            )}
                        </button>

                        {dropdownOpen && (
                            <div className="nav-dropdown">
                                <div className="nav-dropdown-header">
                                    <p className="nav-dropdown-name">{userName || 'User'}</p>
                                    <p className="nav-dropdown-email">{userEmail}</p>
                                </div>
                                <div className="nav-dropdown-divider" />
                                <button
                                    className="nav-dropdown-item"
                                    onClick={() => { navigate('/chatinterface'); setDropdownOpen(false); }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                                    Go to Chat
                                </button>
                                <button className="nav-dropdown-item nav-dropdown-logout" onClick={handleLogout}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                                    Log out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    /* ── Not logged-in: Login / Signup buttons ── */
                    <>
                        <button className="btn-login" onClick={() => navigate('/auth')}>Log in</button>
                        <button className="btn-signup" onClick={onGetStarted}>Sign up</button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
