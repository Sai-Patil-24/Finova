function Hero({ onGetStarted }) {
    return (
        <section className="hero" id="home">
            <div className="hero-video-container">
                <video
                    className="hero-video"
                    autoPlay
                    loop
                    muted
                    playsInline>
                    <source src="/Hero%20section/Coins_rolling_on_202604261657.mp4" type="video/mp4" />
                </video>
            </div>

            <h1 className="hero-title">
                A New Era Of<br />Personal Finance and Wealth<br />Using AI Agents.
            </h1>
            <p className="hero-subtitle">
                The AI-powered finance platform to grow your wealth smarter,
                track prices in real time, and assist for financial future.
            </p>
            <button className="btn-hero" onClick={onGetStarted}>
                Getting Started
            </button>
        </section>
    );
}

export default Hero;
