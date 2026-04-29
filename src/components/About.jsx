function About() {
    return (
        <section id="about">
            <div className="ai-section">
                <div className="section-label">About</div>
                <h2 className="section-title">Meet Your AI Interface</h2>
                <p className="ai-quote">
                    "I've optimized your portfolio to maintain your savings goals based on this month's spending. 
                    Ready to see your updated projections?"
                </p>
                <div className="ai-mockup-wrapper">
                    <div className="ai-mockup-glow"></div>
                    <div className="ai-mockup">
                        <img src="/interface.png" alt="AI Interface" className="ai-mockup-img" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
