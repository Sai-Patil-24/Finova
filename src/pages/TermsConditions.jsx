import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function TermsConditions() {
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
                <h1 className="legal-title">Terms & Conditions</h1>
                <p className="legal-updated">Last Updated: April 29, 2026</p>
                
                <div className="legal-section">
                    <p>Welcome to Finova (“Platform”, “we”, “our”, “us”). By accessing or using our services, you agree to comply with and be bound by these Terms and Conditions (“Terms”). If you do not agree, please do not use the Platform.</p>
                </div>

                <div className="legal-section">
                    <h2>1. Eligibility</h2>
                    <p>You must be at least 18 years old and have the legal capacity to enter into a binding agreement. By using this Platform, you confirm that you meet these requirements.</p>
                </div>

                <div className="legal-section">
                    <h2>2. Nature of Service</h2>
                    <p>The Platform provides AI-powered financial insights, analysis, and educational content. We are not registered with the Securities and Exchange Board of India as an investment advisor. The Platform does not provide regulated financial, legal, or tax advisory services.</p>
                </div>

                <div className="legal-section">
                    <h2>3. User Responsibilities</h2>
                    <p>You agree to provide accurate and complete information, use the Platform only for lawful purposes, and not misuse or attempt to exploit the system. You are solely responsible for your financial decisions and any actions taken based on the Platform’s outputs.</p>
                </div>

                <div className="legal-section">
                    <h2>4. AI-Generated Content</h2>
                    <p>The Platform uses artificial intelligence to generate responses. You acknowledge that outputs may be inaccurate, incomplete, or outdated. AI responses are for informational purposes only and should not be treated as professional advice.</p>
                </div>

                <div className="legal-section">
                    <h2>5. No Financial Advice</h2>
                    <p>Nothing on the Platform constitutes investment advice, stock recommendations, or financial guarantees. Please consult a qualified professional before making financial decisions.</p>
                </div>

                <div className="legal-section">
                    <h2>6. Risk Disclosure</h2>
                    <p>You understand that all investments carry risk, market conditions can change unpredictably, and past performance is not indicative of future results.</p>
                </div>

                <div className="legal-section">
                    <h2>7. Account Security</h2>
                    <p>You are responsible for maintaining the confidentiality of your account credentials and all activities under your account. Notify us immediately of any unauthorized access.</p>
                </div>

                <div className="legal-section">
                    <h2>8. Data and Privacy</h2>
                    <p>Your use of the Platform is also governed by our Privacy Policy, aligned with the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000.</p>
                </div>

                <div className="legal-section">
                    <h2>9. Prohibited Activities</h2>
                    <p>You agree NOT to use the Platform for illegal or fraudulent activities, reverse engineer or attempt to extract source code, use bots or automated systems to abuse the service, or upload malicious content.</p>
                </div>

                <div className="legal-section">
                    <h2>10. Third-Party Services</h2>
                    <p>The Platform may use third-party data sources and services. We do not control these services and do not guarantee their accuracy or availability.</p>
                </div>

                <div className="legal-section">
                    <h2>11. Limitation of Liability</h2>
                    <p>To the fullest extent permitted by law, we shall not be liable for financial losses, investment decisions made by users, or any indirect, incidental, or consequential damages.</p>
                </div>

                <div className="legal-section">
                    <h2>12. Indemnification</h2>
                    <p>You agree to indemnify and hold us harmless from claims arising from your misuse of the Platform or violations of these Terms.</p>
                </div>

                <div className="legal-section">
                    <h2>13. Suspension and Termination</h2>
                    <p>We reserve the right to suspend or terminate your access or remove content/accounts if you violate these Terms or applicable laws.</p>
                </div>

                <div className="legal-section">
                    <h2>14. Modifications</h2>
                    <p>We may update these Terms at any time. Continued use of the Platform constitutes acceptance of the updated Terms.</p>
                </div>

                <div className="legal-section">
                    <h2>15. Governing Law</h2>
                    <p>These Terms shall be governed by the laws of India. Any disputes shall be subject to the jurisdiction of the courts in Pune, Maharashtra.</p>
                </div>

                <div className="legal-section">
                    <h2>16. Contact</h2>
                    <p>For any questions regarding these Terms:</p>
                    <p><strong>Finova AI</strong><br/>contact@finova.ai</p>
                </div>

                <div className="legal-section">
                    <p>By using this Platform, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.</p>
                </div>
            </div>
        </div>
    );
}

export default TermsConditions;
