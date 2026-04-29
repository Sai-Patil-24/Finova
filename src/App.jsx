import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Guide from './components/Guide';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ChatInterface from './pages/ChatInterface';

function LandingPage() {
    const navigate = useNavigate();
    const handleGetStarted = () => navigate('/chatinterface');

    return (
        <>
            <Navbar onGetStarted={handleGetStarted} />
            <Hero onGetStarted={handleGetStarted} />
            <Features />
            <About />
            <Guide />
            <CTA onGetStarted={handleGetStarted} />
            <Footer />
        </>
    );
}

import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Disclaimer from './pages/Disclaimer';

function App() {
    const navigate = useNavigate();
    
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chatinterface" element={<ChatInterface onBack={() => navigate('/')} />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
        </Routes>
    );
}

export default App;
