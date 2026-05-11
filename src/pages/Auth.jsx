import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

/* ─── Animated Portfolio Chart ─────────────────────────────────────────── */
function PortfolioChart() {
  const [animated, setAnimated] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(t);
  }, []);

  const points = [
    { x: 0,   y: 82, label: 'Oct 23', value: '$23,230' },
    { x: 57,  y: 72, label: 'Nov 23', value: '$19,500' },
    { x: 114, y: 65, label: 'Dec 23', value: '$16,550' },
    { x: 171, y: 50, label: 'Jan 24', value: '$19,850' },
    { x: 228, y: 32, label: 'Feb 24', value: '$125,000' },
    { x: 285, y: 22, label: 'Mar 24', value: '$184,500' },
  ];

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ');
  const areaPath = linePath + ` L${points[points.length - 1].x} 100 L0 100 Z`;

  return (
    <div className="bg-[#111113] border border-[#1e1e24] rounded-2xl p-5 w-full transition-all duration-500 hover:border-[#2a2a35]">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-[#e0e0e6] font-semibold text-sm">TOTAL PORTFOLIO VALUE</h3>
      </div>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-bold text-white">$184,750.00</span>
      </div>
      <span className="text-xs font-medium text-emerald-400">+12.4% (Past 6 Months)</span>

      <div className="w-full h-[120px] mt-4 relative">
        <svg className="w-full h-full" viewBox="0 0 285 100" preserveAspectRatio="none">
          <line x1="0" y1="25" x2="285" y2="25" stroke="#1e1e24" strokeWidth="0.5" />
          <line x1="0" y1="50" x2="285" y2="50" stroke="#1e1e24" strokeWidth="0.5" />
          <line x1="0" y1="75" x2="285" y2="75" stroke="#1e1e24" strokeWidth="0.5" />

          <path
            d={areaPath}
            fill="url(#areaGradientDark)"
            style={{ opacity: animated ? 1 : 0, transition: 'opacity 1.5s ease-out' }}
          />

          <path
            d={linePath}
            fill="none"
            stroke="#9E77ED"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 800,
              strokeDashoffset: animated ? 0 : 800,
              transition: 'stroke-dashoffset 2s ease-out',
            }}
          />

          {points.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x} cy={p.y} r={hoveredPoint === i ? 5 : 3}
                fill="#9E77ED"
                stroke="#111113"
                strokeWidth="2"
                style={{
                  opacity: animated ? 1 : 0,
                  transition: `opacity 0.5s ease-out ${0.3 * i}s, r 0.2s ease`,
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredPoint(i)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            </g>
          ))}

          {hoveredPoint !== null && (
            <g>
              <rect
                x={Math.max(0, Math.min(points[hoveredPoint].x - 30, 225))}
                y={points[hoveredPoint].y - 28}
                width="60" height="20" rx="4"
                fill="#7F56D9"
              />
              <text
                x={Math.max(30, Math.min(points[hoveredPoint].x, 255))}
                y={points[hoveredPoint].y - 15}
                textAnchor="middle" fill="white" fontSize="8" fontWeight="600"
              >
                {points[hoveredPoint].value}
              </text>
            </g>
          )}

          <defs>
            <linearGradient id="areaGradientDark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9E77ED" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#9E77ED" stopOpacity="0.01" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex justify-between mt-2 text-[10px] text-[#5a5a6e] font-medium">
        {points.map((p, i) => <span key={i}>{p.label}</span>)}
      </div>
    </div>
  );
}

/* ─── Savings Goal Ring ────────────────────────────────────────────────── */
function SavingsGoal() {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 800);
    return () => clearTimeout(t);
  }, []);

  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const progress = 0.74;

  return (
    <div className="bg-[#111113] border border-[#1e1e24] rounded-2xl p-5 flex flex-col items-center transition-all duration-500 hover:border-[#2a2a35]">
      <h3 className="text-[#e0e0e6] font-semibold text-xs self-start mb-4">SAVINGS GOAL</h3>
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="#1e1e24" strokeWidth="8" />
          <circle
            cx="50" cy="50" r={radius} fill="none"
            stroke="#9E77ED" strokeWidth="8" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={animated ? circumference * (1 - progress) : circumference}
            style={{ transition: 'stroke-dashoffset 1.8s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white">74%</span>
        </div>
      </div>
      <p className="text-[10px] text-[#5a5a6e] mt-3 font-medium">$37,000 / $50,000</p>
    </div>
  );
}

/* ─── Stat Card ────────────────────────────────────────────────────────── */
function StatCard({ title, value, color, trend }) {
  return (
    <div className="bg-[#111113] border border-[#1e1e24] rounded-2xl p-4 transition-all duration-500 hover:border-[#2a2a35]">
      <h4 className="text-[10px] text-[#5a5a6e] font-semibold tracking-wide mb-1">{title}</h4>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-white">{value}</span>
        <svg className="w-16 h-6" viewBox="0 0 60 24">
          <path d={trend} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

/* ─── Google Icon ─────────────────────────────────────────────────────── */
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.0 24.0 0 0 0 0 21.56l7.98-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════ */
/*  MAIN AUTH COMPONENT                                                    */
/* ═══════════════════════════════════════════════════════════════════════ */
export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const navigate = useNavigate();

  const canSubmitSignUp = agreeTerms && agreePrivacy;

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        });
        if (error) throw error;
        setMessage('Check your email for the verification link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/chatinterface');
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin + '/chatinterface' },
      });
      if (error) throw error;
    } catch (error) {
      setMessage(error.message);
    }
  };

  /* ─── INPUT CLASS (reused) ──────────────────────────────────────────── */
  const inputClass = "w-full rounded-lg border border-[#2a2a35] bg-[#0c0c0e] px-3.5 py-2.5 text-sm text-white shadow-sm outline-none placeholder:text-[#4a4a58] focus:border-[#7F56D9] focus:ring-1 focus:ring-[#7F56D9]/40 transition-all";

  /* ─── RENDER ─────────────────────────────────────────────────────────── */
  return (
    <div className="flex min-h-screen w-full bg-[#050505] font-sans text-white">

      {/* ── LEFT: FORM ──────────────────────────────────────────────────── */}
      <div className="flex w-full flex-col px-8 py-10 md:w-[50%] lg:px-20 lg:py-12">

        {/* Logo */}
        <div
          className="flex items-center gap-2.5 cursor-pointer select-none"
          onClick={() => navigate('/')}
        >
          <img src="/logo.png" alt="Finova" className="h-8 w-8 rounded-lg object-contain" />
          <span className="text-lg font-bold tracking-tight text-white">Finova</span>
        </div>

        {/* Form area */}
        <div className="mx-auto w-full max-w-[380px] flex-1 flex flex-col justify-center py-12">
          <h1 className="text-[30px] font-semibold tracking-tight leading-tight text-white">
            {isSignUp ? 'Create an account' : 'Log in'}
          </h1>
          <p className="mt-2 text-sm text-[#8a8a9a] leading-relaxed">
            {isSignUp
              ? 'Start your financial journey with Finova AI.'
              : 'Welcome back! Please enter your details.'}
          </p>

          {/* Status message */}
          {message && (
            <div
              className={`mt-5 rounded-lg px-4 py-3 text-sm font-medium ${
                message.includes('Check')
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}
            >
              {message}
            </div>
          )}

          {/* ── FORM ─────────────────────────────────────────────────────── */}
          <form onSubmit={handleAuth} className="mt-8">
            <div className="space-y-5">
              {/* Name (sign-up only) */}
              {isSignUp && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#c0c0cc] mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#c0c0cc] mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#c0c0cc] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass + " pr-10"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4a4a58] hover:text-[#9E77ED] transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Forgot password (login only) */}
              {!isSignUp && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm font-semibold text-[#9E77ED] hover:text-[#B692F6] transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Agreement checkboxes (sign-up only) */}
              {isSignUp && (
                <div className="space-y-3 pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-[#2a2a35] bg-[#0c0c0e] text-[#7F56D9] focus:ring-[#7F56D9] shrink-0"
                    />
                    <span className="text-xs text-[#8a8a9a] leading-relaxed">
                      I agree to the{' '}
                      <a href="/terms" target="_blank" className="font-semibold text-[#9E77ED] hover:text-[#B692F6] underline underline-offset-2">
                        Terms & Conditions
                      </a>
                    </span>
                  </label>
                  <label className="flex items-start gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={agreePrivacy}
                      onChange={(e) => setAgreePrivacy(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-[#2a2a35] bg-[#0c0c0e] text-[#7F56D9] focus:ring-[#7F56D9] shrink-0"
                    />
                    <span className="text-xs text-[#8a8a9a] leading-relaxed">
                      I agree to the{' '}
                      <a href="/privacy" target="_blank" className="font-semibold text-[#9E77ED] hover:text-[#B692F6] underline underline-offset-2">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || (isSignUp && !canSubmitSignUp)}
              className="mt-6 w-full rounded-lg bg-[#7F56D9] py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#9E77ED] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7F56D9] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Processing\u2026' : isSignUp ? 'Create account' : 'Sign in'}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-[#1e1e24]" />
              <span className="text-xs text-[#4a4a58] font-medium select-none">OR</span>
              <div className="flex-1 h-px bg-[#1e1e24]" />
            </div>

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 rounded-lg border border-[#2a2a35] bg-[#0c0c0e] py-2.5 text-sm font-semibold text-[#c0c0cc] shadow-sm hover:bg-[#141418] hover:border-[#3a3a45] active:scale-[0.98] transition-all"
            >
              <GoogleIcon />
              <span>{isSignUp ? 'Sign up with Google' : 'Sign in with Google'}</span>
            </button>
          </form>

          {/* Toggle */}
          <p className="mt-8 text-center text-sm text-[#8a8a9a]">
            {isSignUp ? 'Already have an account?' : "Don\u2019t have an account?"}{' '}
            <button
              onClick={() => { setIsSignUp(!isSignUp); setMessage(''); setName(''); }}
              className="font-semibold text-[#9E77ED] hover:text-[#B692F6] transition-colors"
            >
              {isSignUp ? 'Log in' : 'Sign up'}
            </button>
          </p>
        </div>

        {/* Footer */}
        <div className="text-xs text-[#3a3a45]">&copy; Finova AI 2026</div>
      </div>

      {/* ── RIGHT: VISUAL ───────────────────────────────────────────────── */}
      <div className="hidden md:flex w-[50%] flex-col items-center justify-center bg-[#0a0a0c] relative overflow-hidden p-8 lg:p-12 border-l border-[#1e1e24]">

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(#1e1e24 1px, transparent 1px), linear-gradient(90deg, #1e1e24 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Glow orbs */}
        <div className="absolute top-[10%] right-[15%] w-[300px] h-[300px] rounded-full bg-[#7F56D9] opacity-[0.04] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[10%] w-[250px] h-[250px] rounded-full bg-[#6366f1] opacity-[0.04] blur-[100px] pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[460px] space-y-4">

          {/* Header row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Finova" className="h-6 w-6 rounded object-contain" />
              <h2 className="text-sm font-bold text-[#e0e0e6] tracking-tight">FINANCIAL OVERVIEW</h2>
            </div>
          </div>

          {/* Top row: Chart + Savings */}
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3">
              <PortfolioChart />
            </div>
            <div className="col-span-2">
              <SavingsGoal />
            </div>
          </div>

          {/* Bottom row: Two stat cards */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              title="MONTHLY INCOME"
              value="$12,500"
              color="#9E77ED"
              trend="M2 18 Q10 14, 18 10 T34 6 T50 2"
            />
            <StatCard
              title="TOTAL EXPENSES"
              value="$8,920"
              color="#F97066"
              trend="M2 4 Q10 8, 18 12 T34 10 T50 14"
            />
          </div>

          {/* Tagline */}
          <p className="text-center text-xs text-[#4a4a58] pt-4 font-medium">
            Real-time insights &middot; Multi-agent AI &middot; Portfolio tracking
          </p>
        </div>
      </div>
    </div>
  );
}
