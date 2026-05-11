import React from 'react';

const GUIDE_STEPS = [
    {
        title: "Select Your Agent",
        desc: "Choose specialized AI agents for your specific financial needs.",
        details: [
            "Analysis Agent: Deep spending & portfolio trends.",
            "News Agent: Real-time market headlines & updates.",
            "Advice Agent: Personalized educational strategies."
        ],
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
        )
    },
    {
        title: "Smart Resource Tracking",
        desc: "Monitor your AI credits and tool usage in real-time.",
        details: [
            "Usage Panel: Track daily API consumption.",
            "Live Indicators: See active search & data tool status.",
            "Auto-Reset: Limits refresh every 24 hours."
        ],
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
            </svg>
        )
    },
    {
        title: "Analyze Documents",
        desc: "Upload financial statements. Finova extracts insights instantly.",
        details: [
            "Multiple Formats: png, jpg, CSV, XLSX, and Images.",
            "Source Transparency: See exactly which tools were used.",
            "Trend Detection: Spot anomalies in your records."
        ],
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
            </svg>
        )
    },
    {
        title: "Session Persistence",
        desc: "Review your chat history and monitor your financial evolution.",
        details: [
            "History Sync: Your chats are saved locally.",
            "Management: Rename, delete, or switch sessions.",
            "Auto-Resume: Pick up exactly where you left off."
        ],
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
            </svg>
        )
    }
];

function Guide() {
    return (
        <section id="experience" className="guide-section">
            <div className="guide-container">
                <div className="section-header">
                    <span className="section-label">The Experience</span>
                    <h2 className="section-title">Mastering the Interface</h2>
                    <p className="section-subtitle">
                        A powerful command center for your wealth. Built with precision, intelligence, and clarity.
                    </p>
                </div>
                
                <div className="bento-guide">
                    {/* Main Feature - Large: Agent Hub */}
                    <div className="bento-card bento-card--large">
                        <div className="bento-card-bg"></div>
                        <div className="bento-card-content">
                            <div className="bento-icon-wrap">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
                                    <path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"/>
                                </svg>
                            </div>
                            <h3 className="bento-title">Intelligent Agent Hub</h3>
                            <p className="bento-desc">
                                Specialized AI agents designed for specific financial domains. Toggle between them to change the context of your assistant instantly.
                            </p>
                            
                            <div className="agent-detail-grid">
                                <div className="agent-detail-item active">
                                    <strong>Data</strong> <span>• Live insights from your linked financials.</span>
                                </div>
                                <div className="agent-detail-item">
                                    <strong>News</strong> <span>• Real-time market headlines & updates.</span>
                                </div>
                                <div className="agent-detail-item">
                                    <strong>Invest</strong> <span>• Wealth strategies & Nifty 50 allocation.</span>
                                </div>
                                <div className="agent-detail-item">
                                    <strong>Analysis</strong> <span>• Deep spending trends & portfolio allocation.</span>
                                </div>
                                <div className="agent-detail-item">
                                    <strong>Learn</strong> <span>• Educational insights into complex finance.</span>
                                </div>
                                <div className="agent-detail-item">
                                    <strong>Price</strong> <span>• Real-time assets price tracking & history.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Voice Support - Wide */}
                    <div className="bento-card bento-card--wide">
                        <div className="bento-card-bg"></div>
                        <div className="bento-card-content">
                            <div className="bento-icon-wrap">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
                                </svg>
                            </div>
                            <h3 className="bento-title">Voice Support</h3>
                            <p className="bento-desc">
                                Hands-free financial guidance. Interact with Finova using natural speech for a truly conversational experience.
                            </p>
                            <div className="visual-wave">
                                <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                            </div>
                        </div>
                    </div>

                    {/* Usage Tracking - Square */}
                    <div className="bento-card">
                        <div className="bento-card-bg"></div>
                        <div className="bento-card-content">
                            <div className="bento-icon-wrap">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 20v-6M6 20V10M18 20V4"/>
                                </svg>
                            </div>
                            <h3 className="bento-title">Real-time Usage</h3>
                            <p className="bento-desc">Monitor your daily credits and resource consumption with our live tracking dashboard.</p>
                        </div>
                    </div>

                    {/* Tall - Document Support */}
                    <div className="bento-card bento-card--tall">
                        <div className="bento-card-bg"></div>
                        <div className="bento-card-content">
                            <div className="bento-icon-wrap">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                                </svg>
                            </div>
                            <h3 className="bento-title">Document Support</h3>
                            <p className="bento-desc">
                                Securely upload statements for instant trend extraction.
                            </p>
                            <div className="file-type-list">
                                <div className="file-type-tag">PNG</div>
                                <div className="file-type-tag">JPG</div>
                                <div className="file-type-tag">CSV</div>
                                <div className="file-type-tag">DOCX</div>
                                <div className="file-type-tag">XLSX</div>
                            </div>
                        </div>
                    </div>

                    {/* Wide - Smart Tools */}
                    <div className="bento-card bento-card--wide">
                        <div className="bento-card-bg"></div>
                        <div className="bento-card-content">
                            <div className="bento-icon-wrap">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="16" y2="18"/>
                                </svg>
                            </div>
                            <h3 className="bento-title">Smart Tools</h3>
                            <p className="bento-desc">
                                Access precise financial calculators including Return (SIP), Lumpsum, and Loan EMI trackers.
                            </p>
                        </div>
                    </div>

                    {/* Square - Analysis Visuals */}
                    <div className="bento-card">
                        <div className="bento-card-bg"></div>
                        <div className="bento-card-content">
                            <div className="bento-icon-wrap">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>
                                </svg>
                            </div>
                            <h3 className="bento-title">Insight Analysis</h3>
                            <p className="bento-desc">Visualize category growth and trajectory.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Guide;
