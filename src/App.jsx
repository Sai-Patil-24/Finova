import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Guide from './components/Guide';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ChatInterface from './pages/ChatInterface';
import Auth from './pages/Auth';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Disclaimer from './pages/Disclaimer';
import { supabase } from './utils/supabaseClient';

function LandingPage({ session }) {
    const navigate = useNavigate();
    const handleGetStarted = () => {
        if (session) {
            navigate('/chatinterface');
        } else {
            navigate('/auth');
        }
    };

    return (
        <>
            <Navbar onGetStarted={handleGetStarted} session={session} />
            <Hero onGetStarted={handleGetStarted} />
            <Features />
            <About />
            <Guide />
            <CTA onGetStarted={handleGetStarted} />
            <Footer />
        </>
    );
}

function App() {
    const navigate = useNavigate();
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) {
        return <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Loading...</div>;
    }
    
    return (
        <Routes>
            <Route path="/" element={<LandingPage session={session} />} />
            <Route path="/auth" element={session ? <Navigate to="/chatinterface" /> : <Auth />} />
            <Route 
                path="/chatinterface" 
                element={
                    session ? (
                        <ChatInterface onBack={() => navigate('/')} session={session} />
                    ) : (
                        <Navigate to="/auth" />
                    )
                } 
            />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
        </Routes>
    );
}

export default App;
