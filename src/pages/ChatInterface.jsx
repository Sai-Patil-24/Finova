import React, { useState, useRef, useEffect, useCallback, Suspense } from 'react';




// ─── SVG Icon Components ─────────────────────────────────────────────────────

const IconHome = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
    <path d="M9 21V12h6v9"/>
  </svg>
);
const IconTools = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);
const IconAnalysis = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);
const IconHistory = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/>
  </svg>
);
const IconNewChat = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const IconMenu = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const IconMic = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
);
const IconSearch = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const IconMore = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
  </svg>
);
const IconData = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
);
const IconRisk = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
const IconInvest = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);
const IconDecision = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const IconLearn = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);
const IconPaperclip = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
  </svg>
);
const IconBack = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
);

// ─── Constants ────────────────────────────────────────────────────────────────

const AGENTS = [
  { id: 'data',       label: 'Data',       fullLabel: 'Data Agent',       Icon: IconData },
  { id: 'analysis',   label: 'Analysis',   fullLabel: 'Analysis Agent',   Icon: IconAnalysis },
  { id: 'risk',       label: 'Risk',       fullLabel: 'Risk Agent',       Icon: IconRisk },
  { id: 'investment', label: 'Invest',     fullLabel: 'Investment Agent', Icon: IconInvest },
  { id: 'decision',   label: 'Decision',   fullLabel: 'Decision Agent',   Icon: IconDecision },
  { id: 'learning',   label: 'Learn',      fullLabel: 'Learning Agent',   Icon: IconLearn },
];

const NAV_ITEMS = [
  { id: 'home',     label: 'Home',     Icon: IconHome },
  { id: 'tools',    label: 'Tools',    Icon: IconTools },
  { id: 'analysis', label: 'Analysis', Icon: IconAnalysis },
  { id: 'history',  label: 'History',  Icon: IconHistory },
];

const BADGE_COLORS = {
  invest: { bg: 'rgba(0,112,243,0.12)', color: '#60a5fa' },
  risk:   { bg: 'rgba(121,40,202,0.12)', color: '#a78bfa' },
  budget: { bg: 'rgba(80,227,194,0.12)', color: '#50e3c2' },
  tax:    { bg: 'rgba(245,158,11,0.12)', color: '#fbbf24' },
  learn:  { bg: 'rgba(16,185,129,0.12)', color: '#34d399' },
};

const HISTORY_ITEMS = [
  { id: 1, group: 'Today',     badge: 'invest', title: 'Should I buy HDFC Bank now?',     agent: 'Investment' },
  { id: 2, group: 'Today',     badge: 'risk',   title: 'What is my risk tolerance score?', agent: 'Risk' },
  { id: 3, group: 'Yesterday', badge: 'budget', title: 'Budget breakdown for April',        agent: 'Analysis' },
  { id: 4, group: 'Yesterday', badge: 'tax',    title: 'Old vs new tax regime',             agent: 'Decision' },
  { id: 5, group: 'This week', badge: 'learn',  title: 'How does SIP compound over 10yr?', agent: 'Learning' },
  { id: 6, group: 'This week', badge: 'invest', title: 'Nifty 50 allocation strategy',      agent: 'Investment' },
];

const FEATURE_CARDS = [
  { title: 'Smart Budget', desc: 'A budget that fits your lifestyle, not the other way around' },
  { title: 'Analytics', desc: 'Analytics empowers individuals and businesses to make smarter' },
  { title: 'Spending', desc: 'Spending is the way individuals and businesses use their financial' },
];

const MARQUEE_ITEMS = [
  'SIP Calculator', 'Lumpsum Calculator', 'FD Returns', 'RD Planner',
  'Loan EMI', 'CAGR Estimator', 'Tax Estimator', 'Portfolio Analysis',
  'Risk Profiling', 'Debt vs Equity', 'Retirement Planner', 'Goal Tracker',
];

function getGreeting() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return 'morning';
  if (h >= 12 && h < 17) return 'afternoon';
  return 'evening';
}

function getContextLine(agent) {
  const lines = {
    data:       'Connect your financial data to unlock personalized insights.',
    analysis:   'Portfolio is up +2.3% this week. Equity drag detected in mid-cap allocation.',
    risk:       'Risk score last updated 12 days ago. Market volatility has changed.',
    investment: 'NIFTY50 closed +0.8%. 3 instruments aligned with your risk profile.',
    decision:   'You have 2 pending scenarios awaiting simulation.',
    learning:   'Based on your sessions: you focus most on investment strategies.',
  };
  return lines[agent] || 'Ask anything about your finances.';
}

// ─── Voice Waveform ──────────────────────────────────────────────────────────
function VoiceWave() {
  return (
    <span className="ci-voice-wave">
      {[1,2,3,4,5].map(i => <span key={i} className={`ci-wave-bar ci-wave-bar--${i}`} />)}
    </span>
  );
}

// ─── Chat Bubble ─────────────────────────────────────────────────────────────
function ChatBubble({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`ci-bubble-row ${isUser ? 'ci-bubble-row--user' : 'ci-bubble-row--ai'}`}>
      {!isUser && <div className="ci-bubble-avatar">F</div>}
      <div className={`ci-bubble ${isUser ? 'ci-bubble--user' : 'ci-bubble--ai'}`}>{msg.content}</div>
    </div>
  );
}

// ─── Marquee ─────────────────────────────────────────────────────────────────
function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="ci-marquee-wrap">
      <div className="ci-marquee-track">
        {items.map((item, i) => (
          <span key={i} className="ci-marquee-item">
            <span className="ci-marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ChatInterface({ onBack }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activeNav, setActiveNav]   = useState('home');
  const [activeAgent, setActiveAgent] = useState('data');
  const [inputVal, setInputVal]     = useState('');
  const [messages, setMessages]     = useState([]);
  const [recording, setRecording]   = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);

  const fileInputRef   = useRef(null);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const autoCollapseRef = useRef(null);

  const isHomeState = messages.length === 0;

  // Auto-collapse sidebar after 2.5s
  useEffect(() => {
    autoCollapseRef.current = setTimeout(() => setSidebarExpanded(false), 2500);
    return () => clearTimeout(autoCollapseRef.current);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handler = () => setContextMenu(null);
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  const handleSend = useCallback(() => {
    const text = inputVal.trim();
    if (!text) return;
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: text }]);
    setInputVal('');
    setTimeout(() => {
      const agent = AGENTS.find(a => a.id === activeAgent);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        content: `[${agent.fullLabel}] Processing: "${text}". Connect your AI backend to receive real insights.`,
      }]);
    }, 900);
  }, [inputVal, activeAgent]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.'); return;
    }
    if (recording) { recognitionRef.current?.stop(); setRecording(false); return; }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new SR();
    r.continuous = false; r.interimResults = true; r.lang = 'en-IN';
    r.onresult = (e) => setInputVal(Array.from(e.results).map(r => r[0].transcript).join(''));
    r.onend = () => setRecording(false);
    r.start(); recognitionRef.current = r; setRecording(true);
  };

  const handleNewChat = () => { setMessages([]); setInputVal(''); setAttachedFiles([]); };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      url: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }));
    setAttachedFiles(prev => [...prev, ...newFiles]);
    e.target.value = null; // Reset input
  };

  const removeFile = (id) => {
    setAttachedFiles(prev => {
      const filtered = prev.filter(f => f.id !== id);
      // Clean up object URLs
      const removed = prev.find(f => f.id === id);
      if (removed?.url) URL.revokeObjectURL(removed.url);
      return filtered;
    });
  };

  const toggleSidebar = () => {
    clearTimeout(autoCollapseRef.current);
    setSidebarExpanded(v => !v);
  };

  const agentInfo = AGENTS.find(a => a.id === activeAgent);

  return (
    <div className="ci-layout">
      {/* Mobile overlay */}
      {mobileDrawer && <div className="ci-drawer-overlay" onClick={() => setMobileDrawer(false)} />}

      {/* ══════════ SIDEBAR ══════════ */}
      <aside className={`ci-sidebar ${sidebarExpanded ? 'ci-sidebar--expanded' : ''} ${mobileDrawer ? 'ci-sidebar--mobile-open' : ''}`}
        onMouseEnter={() => { clearTimeout(autoCollapseRef.current); setSidebarExpanded(true); }}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        {/* Top row: menu toggle + logo */}
        <div className="ci-sidebar-top">
          <button className="ci-sb-icon-btn" onClick={toggleSidebar} aria-label="Toggle sidebar">
            <IconMenu />
          </button>
          <div className="ci-sidebar-logo-wrap">
            <img src="/logo.png" alt="Logo" className="ci-sidebar-logo-img" />
            <span className="ci-sidebar-logo-text">FINOVA</span>
          </div>
        </div>

        {/* New Chat */}
        <button className="ci-sb-new-chat" onClick={handleNewChat} title="New chat">
          <span className="ci-sb-icon-btn ci-sb-icon-btn--inline"><IconNewChat /></span>
          <span className="ci-sb-label">New chat</span>
        </button>

        {/* Nav */}
        <nav className="ci-nav">
          {NAV_ITEMS.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={`ci-nav-item ${activeNav === id ? 'ci-nav-item--active' : ''}`}
              onClick={() => { setActiveNav(id); setMobileDrawer(false); }}
              title={label}
            >
              <span className="ci-nav-icon"><Icon /></span>
              <span className="ci-nav-label">{label}</span>
            </button>
          ))}
        </nav>

        {/* Search */}
        <div className="ci-sb-search">
          <span className="ci-nav-icon"><IconSearch /></span>
          <input className="ci-sb-search-input" placeholder="Search history…" />
        </div>

        {/* History */}
        <div className="ci-history">
          <div className="ci-history-scroll">
            {['Today','Yesterday','This week'].map(group => {
              const items = HISTORY_ITEMS.filter(i => i.group === group);
              if (!items.length) return null;
              return (
                <div key={group}>
                  <p className="ci-history-group">{group}</p>
                  {items.map(item => (
                    <div key={item.id} className="ci-history-item" onMouseLeave={() => setContextMenu(null)}>
                      <span className="ci-badge" style={{ background: BADGE_COLORS[item.badge].bg, color: BADGE_COLORS[item.badge].color }}>
                        {item.badge}
                      </span>
                      <span className="ci-history-title">{item.title}</span>
                      <button className="ci-history-more" onClick={e => { e.stopPropagation(); setContextMenu(contextMenu === item.id ? null : item.id); }}>
                        <IconMore />
                      </button>
                      {contextMenu === item.id && (
                        <div className="ci-context-menu">
                          <button className="ci-context-item">Rename</button>
                          <button className="ci-context-item ci-context-item--danger">Delete</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom: close / back */}
        <div className="ci-sb-bottom">
          <button className="ci-nav-item" onClick={onBack} title="Exit to landing">
            <span className="ci-nav-icon"><IconClose /></span>
            <span className="ci-nav-label">Exit</span>
          </button>
        </div>
      </aside>

      {/* ══════════ MAIN PANEL ══════════ */}
      <main className="ci-main">

        {/* Desktop Header */}
        <header className="ci-main-header">
          <div /> {/* Spacer */}
          <button className="ci-back-btn" onClick={onBack}>
            <IconBack /> <span>Back to Home</span>
          </button>
        </header>

        {/* Mobile top bar */}
        <div className="ci-mobile-bar">
          <button className="ci-sb-icon-btn" onClick={() => setMobileDrawer(true)}><IconMenu /></button>
          <div className="ci-mobile-logo-wrap">
            <img src="/logo.png" alt="Logo" className="ci-mobile-logo-img" />
            <span className="ci-mobile-logo">FINOVA</span>
          </div>
          <button className="ci-sb-icon-btn" onClick={handleNewChat}><IconNewChat /></button>
        </div>


        {/* ── Content area ── */}
        <div className="ci-content">
          {isHomeState ? (
            <div className="ci-hero">
              {/* Background Video Animation */}
              <div className="ci-video-bg-wrap">
                <video 
                  src="/background.mp4" 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  className="ci-hero-video"
                />
                <div className="ci-video-overlay" />
              </div>

              {/* Greeting */}
              <div className="ci-greeting">
                <p className="ci-greeting-sub">Good {getGreeting()}, Alex</p>
                <h1 className="ci-greeting-title">Can I help you with anything?</h1>
              </div>
            </div>
          ) : (
            <div className="ci-messages">
              {messages.map(msg => <ChatBubble key={msg.id} msg={msg} />)}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* ── Input zone ── */}
        <div className="ci-input-zone">
          {/* Agent chips — above input */}
          <div className="ci-agent-chips">
            {AGENTS.map(({ id, label, Icon }) => (
              <button
                key={id}
                className={`ci-agent-chip ${activeAgent === id ? 'ci-agent-chip--active' : ''}`}
                onClick={() => setActiveAgent(id)}
              >
                <Icon /> {label}
              </button>
            ))}
          </div>

          {/* Input box */}
          <div className="ci-input-container">
            {attachedFiles.length > 0 && (
              <div className="ci-input-previews">
                {attachedFiles.map(file => (
                  <div key={file.id} className="ci-preview-item">
                    {file.url ? (
                      <img src={file.url} alt="preview" className="ci-preview-img" />
                    ) : (
                      <div className="ci-preview-file-icon">
                        <IconPaperclip />
                        <span className="ci-preview-file-ext">{file.name.split('.').pop().toUpperCase()}</span>
                      </div>
                    )}
                    <button className="ci-preview-remove" onClick={() => removeFile(file.id)}>
                      <IconClose />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="ci-input-row">
              <textarea
                className="ci-textarea"
                rows={1}
                placeholder={`Message AI Chat...`}
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <div className="ci-input-right">
                <button className={`ci-mic-btn ${recording ? 'ci-mic-btn--active' : ''}`} onClick={toggleVoice} title="Voice input">
                  {recording ? <VoiceWave /> : <IconMic />}
                </button>
                <button className="ci-send-btn" onClick={handleSend} disabled={!inputVal.trim()}>
                  <IconSend />
                </button>
              </div>
            </div>
            {/* Additional Actions row like in the image */}
            <div className="ci-input-actions">
               <button className="ci-action-pill" onClick={() => fileInputRef.current?.click()}>
                 <IconPaperclip /> Upload
               </button>
               <button className="ci-action-pill"><IconSearch /> Search the web</button>
            </div>
          </div>


          {/* Disclaimer */}
          <p className="ci-disclaimer">
            This platform provides educational insights, not financial advice. Please consult a certified advisor before making investment decisions.
          </p>
        </div>

        {/* ── Marquee ── */}
        <Marquee />
      </main>

      {/* Hidden file input */}
      <input 
        ref={fileInputRef} 
        type="file" 
        multiple 
        accept=".png,.jpg,.jpeg,.pdf,.csv,.xlsx,.xls,.docx" 
        style={{ display: 'none' }} 
        onChange={handleFileChange}
      />
    </div>
  );
}
