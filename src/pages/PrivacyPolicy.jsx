import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="legal-page">
            <nav className="legal-nav">
                <Link to="/" className="legal-back">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    Back to Home
                </Link>
                <div className="legal-logo">finova</div>
            </nav>

            <div className="legal-content">
                <h1 className="legal-title">Privacy Policy</h1>
                <p className="legal-updated">Last Updated: April 29, 2026</p>
                
                <div className="legal-section">
                    <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information in compliance with applicable laws, including the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000.</p>
                </div>

                <div className="legal-section">
                    <h2>1. Information We Collect</h2>
                    <p>We may collect the following types of information:</p>
                    <ul>
                        <li><strong>Personal Information:</strong> Name, Email address.</li>
                        <li><strong>Financial Information:</strong> Income, Expenses, Savings, Investment preferences and goals.</li>
                        <li><strong>Usage Data:</strong> Interaction with AI features, Device and browser information, Log data.</li>
                    </ul>
                </div>

                <div className="legal-section">
                    <h2>2. How We Use Your Information</h2>
                    <p>We use your data to provide personalized financial insights, improve AI recommendations, enhance user experience, and ensure platform security. We do <strong>not sell your personal data.</strong></p>
                </div>

                <div className="legal-section">
                    <h2>3. Consent</h2>
                    <p>By using our platform, you consent to the collection and use of your data and agree that data is processed for providing AI-generated insights. You may withdraw consent at any time by contacting us.</p>
                </div>

                <div className="legal-section">
                    <h2>4. Data Security</h2>
                    <p>We implement reasonable security measures, including Encryption (HTTPS), secure data storage, and access control mechanisms. However, no system is completely secure.</p>
                </div>

                <div className="legal-section">
                    <h2>5. Data Sharing</h2>
                    <p>We may share data with trusted service providers (hosting, analytics) or legal authorities if required by law. We do not share data for advertising without consent.</p>
                </div>

                <div className="legal-section">
                    <h2>6. User Rights</h2>
                    <p>Under applicable laws, you have the right to access your data, correct inaccurate data, and request deletion of your data. To exercise these rights, contact us at: <strong>contact@finova.ai</strong></p>
                </div>

                <div className="legal-section">
                    <h2>7. Data Retention</h2>
                    <p>We retain your data only as long as necessary to provide services and comply with legal obligations.</p>
                </div>

                <div className="legal-section">
                    <h2>8. Cookies</h2>
                    <p>We may use cookies to improve functionality and analyze usage patterns. You can disable cookies in your browser settings.</p>
                </div>

                <div className="legal-section">
                    <h2>9. Third-Party Services</h2>
                    <p>Our platform may integrate third-party tools or APIs. Their privacy policies apply separately.</p>
                </div>

                <div className="legal-section">
                    <h2>10. Updates to Policy</h2>
                    <p>We may update this Privacy Policy from time to time. Changes will be posted on this page.</p>
                </div>

                <div className="legal-section">
                    <h2>11. Contact Us</h2>
                    <p>For any privacy-related concerns, contact:</p>
                    <p><strong>Finova AI</strong><br/>contact@finova.ai</p>
                </div>

                <div className="legal-section">
                    <p>By using this platform, you agree to this Privacy Policy.</p>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
