function CTA({ onGetStarted }) {
    return (
        <section className="cta-section" id="contact">
            <h2 className="cta-title">Ready to take control?</h2>
            <p className="cta-subtitle">
                Join thousands of users who are already building wealth smarter with Finova.
            </p>
            <button className="btn-hero" onClick={onGetStarted}>
                Get Started Today
            </button>
        </section>
    );
}

export default CTA;
