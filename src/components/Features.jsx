function Features() {
    return (
        <section className="section" id="features">
            <div className="section-label">Features</div>
            <h2 className="section-title">Intelligent Features</h2>
            <p className="section-subtitle">
                Everything you need to manage, grow, and protect your wealth — powered by AI.
            </p>
            <div className="bento-grid">
                {/* Item 1: Portfolio Analysis */}
                <div className="bento-item item-1">
                    <div className="bento-bg-img" style={{ backgroundImage: 'url("/predictive analytic img.png")' }}></div>
                    <div className="bento-icon">
                        <svg width="28" height="28" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M433 29L321 140L315 143L307 143L219 101L208 98L192 99L177 106L62 221" stroke="white" strokeWidth="24" strokeLinecap="round" />
                            <rect x="40" y="380" width="80" height="100" rx="8" fill="white" fillOpacity="0.3" />
                            <rect x="160" y="260" width="80" height="220" rx="8" fill="white" fillOpacity="0.5" />
                            <rect x="280" y="310" width="80" height="170" rx="8" fill="white" fillOpacity="0.7" />
                            <rect x="400" y="160" width="80" height="320" rx="8" fill="white" />
                        </svg>
                    </div>
                    <h3>Advanced Analysis</h3>
                    <p>Deep-dive into your portfolio allocation and spending trends with our specialized Analysis engine.</p>
                </div>

                {/* Item 2: Indian Market Research */}
                <div className="bento-item item-2">
                    <div className="bento-bg-img" style={{ backgroundImage: 'url("/smart saving img.png")' }}></div>
                    <div className="bento-icon">
                        <img src="/save-money.png" alt="Market Icon" style={{ width: '28px', height: '28px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
                    </div>
                    <h3>Indian Market Research</h3>
                    <p>Real-time lookups for Nifty 50, Sensex, and all NSE/BSE listed stocks with intelligent ticker resolution.</p>
                </div>

                {/* Item 3: Transparent AI Support */}
                <div className="bento-item item-3">
                    <div className="bento-bg-img" style={{ backgroundImage: 'url("/24-7 ai support img.png")' }}></div>
                    <div className="bento-icon">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill="white" d="M18.364 10.283c.046.033.09.068.133.105a2.95 2.95 0 0 0 .003-.133V5.75a2.25 2.25 0 0 0-2.25-2.25h-3.5v-.75l-.006-.101A.75.75 0 0 0 12 2l-.102.007a.75.75 0 0 0-.648.743l-.001.75h-3.5A2.25 2.25 0 0 0 5.5 5.75v4.505a2.25 2.25 0 0 0 2.25 2.25h7.784l.02-.053l.008-.026l.45-1.384l.005-.012a1.544 1.544 0 0 1 2.348-.747ZM9.75 6.5a1.25 1.25 0 1 1 0 2.499a1.25 1.25 0 0 1 0-2.499Zm4.492 0a1.25 1.25 0 1 1 0 2.499a1.25 1.25 0 0 1 0-2.499Zm-1.2 7.537l.113-.037H6.254a2.25 2.25 0 0 0-2.25 2.25v.907a3.75 3.75 0 0 0 1.305 2.844c1.563 1.343 3.802 2 6.691 2c2.076 0 3.817-.339 5.213-1.028a1.545 1.545 0 0 1-1.169-1.003l-.004-.012l-.45-1.385v-.001a1.837 1.837 0 0 0-.444-.72l-.359-.262l-.359-.183l-1.385-.45l-.012-.005a1.545 1.545 0 0 1 0-2.911l.012-.005Zm2.812 3.109a2.831 2.831 0 0 1 .685 1.114l.448 1.377a.544.544 0 0 0 1.027 0l.447-1.377a2.834 2.834 0 0 1 1.798-1.796l1.378-.448a.545.545 0 0 0 0-1.025l-.027-.007l-1.378-.448a2.84 2.84 0 0 1-1.798-1.796l-.448-1.377a.544.544 0 0 0-1.026 0l-.448 1.377l-.012.034a2.838 2.838 0 0 1-1.759 1.762l-1.377.448a.545.545 0 0 0 0 1.025l1.377.448c.42.14.801.376 1.113.689Zm7.164 3.819l.765.248l.016.004a.302.302 0 0 1 0 .57l-.766.248a1.578 1.578 0 0 0-.999.998l-.248.765a.302.302 0 0 1-.57 0l-.25-.764a1.575 1.575 0 0 0-.998-1.002l-.766-.249a.302.302 0 0 1 0-.57l.766-.248a1.578 1.578 0 0 0 .983-.998l.249-.765a.302.302 0 0 1 .57 0l.249.764a1.575 1.575 0 0 0 .999.999Z"/>
                        </svg>
                    </div>
                    <h3>Transparency & Usage</h3>
                    <p>Real-time usage tracking and source indicators ensure you know exactly where your data comes from.</p>
                </div>

                {/* Item 4: Multi-Agent Logic */}
                <div className="bento-item item-4">
                    <div className="bento-bg-img" style={{ backgroundImage: 'url("/Institutional Security img.jpg")' }}></div>
                    <div className="bento-icon">
                        <svg width="28" height="28" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M256 40L80 120V240C80 346.4 154.4 443.2 256 472C357.6 443.2 432 346.4 432 240V120L256 40Z" stroke="white" strokeWidth="24" strokeLinejoin="round" />
                            <path d="M180 240L230 290L332 188" stroke="white" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h3>Intelligent Routing</h3>
                    <p>Specialized AI agents for Advice, Investment, News, and Price data collaborate to solve complex queries.</p>
                </div>
            </div>
        </section>
    );
}

export default Features;
