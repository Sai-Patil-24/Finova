import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { supabase } from '../utils/supabaseClient';
import { runFinanceWorkflow, runFinanceWorkflowStream } from '../utils/financeWorkflow';



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
const IconUsage = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
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
const IconNews = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8z"/>
  </svg>
);
const IconInvest = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);
const IconPrice = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);
const IconLearn = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);
const IconAdvice = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/>
    <line x1="9" y1="22" x2="15" y2="22"/>
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
const IconAuto = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8"/><rect x="4" y="8" width="16" height="12" rx="2"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><path d="M12 20v2"/>
  </svg>
);
const IconStream = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);

// ─── Constants ────────────────────────────────────────────────────────────────

const AGENTS = [
  { id: 'auto',       label: 'Auto',       fullLabel: 'Smart Router',     Icon: IconAuto },
  { id: 'data',       label: 'Data',       fullLabel: 'Data Agent',       Icon: IconData },
  { id: 'analysis',   label: 'Analysis',   fullLabel: 'Analysis Agent',   Icon: IconAnalysis },
  { id: 'advice',     label: 'Advice',     fullLabel: 'Advice Agent',     Icon: IconAdvice },
  { id: 'news',       label: 'News',       fullLabel: 'News Agent',       Icon: IconNews },
  { id: 'investment', label: 'Invest',     fullLabel: 'Investment Agent', Icon: IconInvest },
  { id: 'price',      label: 'Price',      fullLabel: 'Price Agent',      Icon: IconPrice },
  { id: 'learning',   label: 'Learn',      fullLabel: 'Learning Agent',   Icon: IconLearn },
];

const NAV_ITEMS = [
  { id: 'home',     label: 'Home',     Icon: IconHome },
  { id: 'usage',    label: 'Usage',    Icon: IconUsage },
  { id: 'analysis', label: 'Analysis', Icon: IconAnalysis },
  { id: 'history',  label: 'History',  Icon: IconHistory },
];

const BADGE_COLORS = {
  invest: { bg: 'rgba(0,112,243,0.12)', color: '#60a5fa' },
  news:   { bg: 'rgba(121,40,202,0.12)', color: '#a78bfa' },
  budget: { bg: 'rgba(80,227,194,0.12)', color: '#50e3c2' },
  tax:    { bg: 'rgba(245,158,11,0.12)', color: '#fbbf24' },
  learn:  { bg: 'rgba(16,185,129,0.12)', color: '#34d399' },
  advice: { bg: 'rgba(236,72,153,0.12)', color: '#f472b6' },
  auto:   { bg: 'rgba(255,255,255,0.12)', color: '#ffffff' },
};

const HISTORY_ITEMS = [
  { id: 1, group: 'Today',     badge: 'invest', title: 'Should I buy HDFC Bank now?',     agent: 'Investment' },
  { id: 2, group: 'Today',     badge: 'news',   title: 'Latest market news for today?', agent: 'News' },
  { id: 3, group: 'Yesterday', badge: 'budget', title: 'Budget breakdown for April',        agent: 'Analysis' },
  { id: 4, group: 'Yesterday', badge: 'tax',    title: 'Current price of Gold 24k?',      agent: 'Price' },
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
  'Market News', 'Debt vs Equity', 'Retirement Planner', 'Goal Tracker',
];

function getGreeting() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return 'morning';
  if (h >= 12 && h < 17) return 'afternoon';
  return 'evening';
}

function getContextLine(agent) {
  const lines = {
    auto:       'Smart routing enabled. I will select the best agent(s) for your query.',
    data:       'Connect your financial data to unlock personalized insights.',
    analysis:   'Portfolio is up +2.3% this week. Equity drag detected in mid-cap allocation.',
    advice:     'Expert financial guidance tailored to your long-term goals.',
    news:       'Latest headlines: Nifty 50 hits record high. Fed outlook remains stable.',
    investment: 'NIFTY50 closed +0.8%. 3 instruments aligned with your investment profile.',
    price:      'Gold is trading at ₹72,450 (+0.4%). BTC is at $64,200.',
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

// ─── Typing Indicator ────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="ci-bubble-row ci-bubble-row--ai">
      <div className="ci-bubble-avatar">F</div>
      <div className="ci-bubble ci-bubble--ai ci-bubble--typing">
        <span className="ci-dot" />
        <span className="ci-dot" />
        <span className="ci-dot" />
      </div>
    </div>
  );
}

// ─── Simple markdown renderer ─────────────────────────────────────────────────
function renderMarkdown(text) {
  // Bold **text**
  let html = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Inline code `code`
  html = html.replace(/`([^`]+)`/g, '<code class="ci-inline-code">$1</code>');
  // Headers ### ## #
  html = html.replace(/^### (.+)$/gm, '<h4 class="ci-md-h4">$1</h4>');
  html = html.replace(/^## (.+)$/gm, '<h3 class="ci-md-h3">$1</h3>');
  html = html.replace(/^# (.+)$/gm, '<h2 class="ci-md-h2">$1</h2>');
  // Bullet list items
  html = html.replace(/^[-*] (.+)$/gm, '<li class="ci-md-li">$1</li>');
  html = html.replace(/(<li[^>]*>.*<\/li>)/gs, '<ul class="ci-md-ul">$1</ul>');
  // Line breaks
  html = html.replace(/\n/g, '<br/>');
  return html;
}

// ─── Chat Bubble ─────────────────────────────────────────────────────────────
function ChatBubble({ msg }) {
  const isUser = msg.role === 'user';
  const [stepsOpen, setStepsOpen] = useState(false);
  return (
    <div className={`ci-bubble-row ${isUser ? 'ci-bubble-row--user' : 'ci-bubble-row--ai'}`}>
      {!isUser && <div className="ci-bubble-avatar">F</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '80%' }}>
        {/* Tool steps indicator */}
        {!isUser && msg.steps && msg.steps.length > 0 && (
          <button
            className="ci-steps-toggle"
            onClick={() => setStepsOpen(o => !o)}
          >
            <span className="ci-steps-icon">⚙️</span>
            <span>{msg.steps.length} source{msg.steps.length > 1 ? 's' : ''} used</span>
            <span className="ci-steps-chevron">{stepsOpen ? '▲' : '▼'}</span>
          </button>
        )}
        {stepsOpen && (
          <div className="ci-steps-list">
            {msg.steps.map((s, i) => (
              <div key={i} className="ci-step-item">{s}</div>
            ))}
          </div>
        )}
        <div className={`ci-bubble ${isUser ? 'ci-bubble--user' : 'ci-bubble--ai'}${msg.isStreaming ? ' ci-bubble--streaming' : ''}`}>
          {isUser
            ? <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div>
            : <>
                <div className="ci-md-body" dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
                {msg.isStreaming && <span className="ci-stream-cursor" />}
              </>
          }
        </div>
      </div>
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

// ─── Usage tracking (localStorage, resets daily) ─────────────────────────────
const USAGE_KEY = 'finova_usage';
const CHATS_KEY  = 'finova_chats';
const LIMITS = { llm: 500, web_search: 200, stock_price: 300, news: 150 };

function getTodayKey() { return new Date().toISOString().slice(0, 10); }

function loadUsage() {
  try {
    const raw = localStorage.getItem(USAGE_KEY);
    if (!raw) return { date: getTodayKey(), llm: 0, web_search: 0, stock_price: 0, news: 0 };
    const parsed = JSON.parse(raw);
    if (parsed.date !== getTodayKey()) return { date: getTodayKey(), llm: 0, web_search: 0, stock_price: 0, news: 0 };
    return parsed;
  } catch { return { date: getTodayKey(), llm: 0, web_search: 0, stock_price: 0, news: 0 }; }
}

function saveUsage(usage) {
  try { localStorage.setItem(USAGE_KEY, JSON.stringify(usage)); } catch {}
}

function incrementUsage(toolsCalled = [], node = '') {
  const u = loadUsage();
  u.llm = (u.llm || 0) + 1;
  // Use fuzzy matching for tool names
  if (toolsCalled.some(t => t.toLowerCase().includes('search'))) u.web_search = (u.web_search || 0) + 1;
  if (toolsCalled.some(t => t.toLowerCase().includes('stock') || t.toLowerCase().includes('price'))) u.stock_price = (u.stock_price || 0) + 1;
  if (toolsCalled.some(t => t.toLowerCase().includes('news'))) u.news = (u.news || 0) + 1;
  saveUsage(u);
  return u;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ChatInterface({ onBack, session }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activeNav, setActiveNav]   = useState('home');
  const [activeAgent, setActiveAgent] = useState('auto');
  const [inputVal, setInputVal]     = useState('');
  const [messages, setMessages]     = useState([]);
  const [isLoading, setIsLoading]   = useState(false);
  const [recording, setRecording]   = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [webSearchActive, setWebSearchActive] = useState(false);  // Search the web toggle
  const [streamingEnabled, setStreamingEnabled] = useState(true);  // Streaming toggle
  const [usageData, setUsageData] = useState(loadUsage);          // Usage panel data
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(CHATS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const fileInputRef   = useRef(null);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const abortStreamRef = useRef(null);
  const autoCollapseRef = useRef(null);

  const isHomeState = messages.length === 0;

  // Extract user info from session
  const user = session?.user;
  const userName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';
  const userAvatar = user?.user_metadata?.avatar_url || '';
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onBack();
  };

  // Persist history to localStorage
  useEffect(() => {
    localStorage.setItem(CHATS_KEY, JSON.stringify(history));
  }, [history]);

  // Persist current session messages
  useEffect(() => {
    if (messages.length > 0) {
      const chatId = localStorage.getItem('finova_active_chat_id') || 'default';
      localStorage.setItem(`finova_msgs_${chatId}`, JSON.stringify(messages));
    }
  }, [messages]);

  // Load active chat on mount
  useEffect(() => {
    const chatId = localStorage.getItem('finova_active_chat_id') || 'default';
    const saved = localStorage.getItem(`finova_msgs_${chatId}`);
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // Auto-collapse sidebar after 2.5s
  useEffect(() => {
    autoCollapseRef.current = setTimeout(() => setSidebarExpanded(false), 2500);
    return () => clearTimeout(autoCollapseRef.current);
  }, []);

  // Reset nav to home when sidebar contracts
  useEffect(() => {
    if (!sidebarExpanded) {
      setActiveNav('home');
    }
  }, [sidebarExpanded]);

  useEffect(() => {
    const timer = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, isLoading]);

  useEffect(() => {
    const handler = () => setContextMenu(null);
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  const textareaRef = useRef(null);

  // Auto-expand textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [inputVal]);

  const handleSend = useCallback(async () => {
    const text = inputVal.trim();
    if (!text || isLoading) return;
    
    // Reset textarea height
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    
    // Get active chat id
    let activeChatId = localStorage.getItem('finova_active_chat_id');
    
    // Update history title if first message
    if (messages.length === 0) {
      activeChatId = Date.now().toString();
      const newChat = {
        id: activeChatId,
        title: text.length > 30 ? text.slice(0, 30) + '...' : text,
        date: new Date().toISOString(),
        group: 'Today',
        badge: activeAgent === 'auto' ? 'auto' : activeAgent
      };
      setHistory(prev => [newChat, ...prev]);
      localStorage.setItem('finova_active_chat_id', activeChatId);
    } else if (!activeChatId) {
      activeChatId = Date.now().toString();
      localStorage.setItem('finova_active_chat_id', activeChatId);
    }

    const userMsgId = Date.now();
    setMessages(prev => [...prev, { id: userMsgId, role: 'user', content: text }]);
    setInputVal('');
    setIsLoading(true);

    // ── STREAMING MODE ──
    if (streamingEnabled) {
      const aiMsgId = Date.now() + 1;
      // Add an empty AI bubble that will fill up with streamed tokens
      setMessages(prev => [...prev, {
        id: aiMsgId,
        role: 'ai',
        content: '',
        steps: [],
        isStreaming: true,
      }]);

      const abort = runFinanceWorkflowStream(
        text,
        activeAgent,
        webSearchActive,
        session?.user?.id,
        activeChatId,
        {
          onSteps: (steps, usage) => {
            const newUsage = incrementUsage(
              usage?.tools_called || [],
              usage?.node || ''
            );
            setUsageData(newUsage);
            setMessages(prev => prev.map(m =>
              m.id === aiMsgId ? { ...m, steps } : m
            ));
          },
          onToken: (token) => {
            setMessages(prev => prev.map(m =>
              m.id === aiMsgId ? { ...m, content: m.content + token } : m
            ));
          },
          onDone: () => {
            setMessages(prev => prev.map(m =>
              m.id === aiMsgId ? { ...m, isStreaming: false } : m
            ));
            setIsLoading(false);
            abortStreamRef.current = null;
          },
          onError: (error) => {
            console.error('Stream Error:', error);
            const isConnErr = error.message?.includes('fetch') || error.message?.includes('Failed to fetch');
            setMessages(prev => prev.map(m =>
              m.id === aiMsgId
                ? {
                    ...m,
                    content: isConnErr
                      ? '⚠️ Cannot connect to the Finova backend. Make sure the Python server is running:\n\n```\ncd backend\npython main.py\n```'
                      : `⚠️ ${error.message || 'An unexpected error occurred.'}`,
                    isStreaming: false,
                  }
                : m
            ));
            setIsLoading(false);
            abortStreamRef.current = null;
          },
        }
      );
      abortStreamRef.current = abort;
      return;
    }

    // ── NORMAL (non-streaming) MODE ──
    try {
      const workflowResult = await runFinanceWorkflow(
        text, 
        activeAgent, 
        webSearchActive, 
        session?.user?.id, 
        activeChatId
      );
      const newUsage = incrementUsage(
        workflowResult.usage?.tools_called || [],
        workflowResult.usage?.node || ''
      );
      setUsageData(newUsage);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        content: workflowResult.response,
        steps: workflowResult.steps || [],
      }]);
    } catch (error) {
      console.error('Chat Error:', error);
      const isConnErr = error.message?.includes('fetch') || error.message?.includes('Failed to fetch');
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        content: isConnErr
          ? '⚠️ Cannot connect to the Finova backend. Make sure the Python server is running:\n\n```\ncd backend\npython main.py\n```'
          : `⚠️ ${error.message || 'An unexpected error occurred. Please try again.'}`,
        steps: [],
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [inputVal, activeAgent, isLoading, webSearchActive, streamingEnabled, messages.length, session]);

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

  const handleNewChat = () => { 
    if (abortStreamRef.current) { abortStreamRef.current(); abortStreamRef.current = null; }
    setMessages([]); 
    setInputVal(''); 
    setAttachedFiles([]); 
    setIsLoading(false);
    localStorage.removeItem('finova_active_chat_id');
  };

  const loadChat = (chatId) => {
    const saved = localStorage.getItem(`finova_msgs_${chatId}`);
    if (saved) {
      setMessages(JSON.parse(saved));
      localStorage.setItem('finova_active_chat_id', chatId.toString());
    }
  };

  const deleteChat = (e, chatId) => {
    e.stopPropagation();
    setHistory(prev => prev.filter(c => c.id !== chatId));
    localStorage.removeItem(`finova_msgs_${chatId}`);
    const active = localStorage.getItem('finova_active_chat_id');
    if (active === chatId.toString()) {
      handleNewChat();
    }
  };

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

        {/* Search (only in history view) */}
        {activeNav !== 'usage' && (
          <div className="ci-sb-search">
            <span className="ci-nav-icon"><IconSearch /></span>
            <input className="ci-sb-search-input" placeholder="Search history…" />
          </div>
        )}

        {/* Usage Panel */}
        {activeNav === 'usage' && (
          <div className="ci-usage-panel">
            <p className="ci-usage-title">Usage & Credits</p>
            <p className="ci-usage-subtitle">Track your remaining daily credits</p>
            
            <div className="ci-usage-list">
              {[
                { key: 'llm',         label: '🤖 AI Intelligence', color: '#818cf8' },
                { key: 'web_search',  label: '🔍 Web Research',     color: '#34d399' },
                { key: 'stock_price', label: '📈 Market Data',      color: '#fbbf24' },
                { key: 'news',        label: '📰 News Access',      color: '#f472b6' },
              ].map(({ key, label, color }) => {
                const used = usageData[key] || 0;
                const limit = LIMITS[key];
                const remaining = Math.max(limit - used, 0);
                const pct = Math.min((used / limit) * 100, 100);
                const isExhausted = remaining === 0;

                return (
                  <div key={key} className={`ci-usage-card ${isExhausted ? 'ci-usage-card--exhausted' : ''}`}>
                    <div className="ci-usage-info">
                      <span className="ci-usage-name">{label}</span>
                      <span className="ci-usage-status">
                        {isExhausted ? 'Exhausted' : `${remaining} left`}
                      </span>
                    </div>
                    <div className="ci-usage-bar-container">
                      <div className="ci-usage-bar-track">
                        <div 
                          className="ci-usage-bar-progress" 
                          style={{ width: `${pct}%`, backgroundColor: color }} 
                        />
                      </div>
                    </div>
                    <div className="ci-usage-footer">
                      <span>Used: {used}</span>
                      <span>Limit: {limit}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="ci-usage-note">
              <p>Limits reset automatically every 24 hours.</p>
            </div>
          </div>
        )}

        {/* History (hidden when Usage tab is active) */}
        {activeNav !== 'usage' && (
          <div className="ci-history">
            <div className="ci-history-scroll">
              {['Today','Yesterday','This week'].map(group => {
                const items = history.filter(i => i.group === group);
                if (!items.length) return null;
                return (
                  <div key={group}>
                    <p className="ci-history-group">{group}</p>
                    {items.map(item => (
                      <div key={item.id} className="ci-history-item" onClick={() => loadChat(item.id)} onMouseLeave={() => setContextMenu(null)}>
                        <span className="ci-badge" style={{ background: BADGE_COLORS[item.badge]?.bg || BADGE_COLORS.auto.bg, color: BADGE_COLORS[item.badge]?.color || BADGE_COLORS.auto.color }}>
                          {item.badge}
                        </span>
                        <span className="ci-history-title">{item.title}</span>
                        <button className="ci-history-more" onClick={e => { e.stopPropagation(); setContextMenu(contextMenu === item.id ? null : item.id); }}>
                          <IconMore />
                        </button>
                        {contextMenu === item.id && (
                          <div className="ci-context-menu">
                            <button className="ci-context-item" onClick={(e) => deleteChat(e, item.id)}>Delete</button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom: User profile + logout */}
        <div className="ci-sb-bottom">
          <div className="ci-sb-divider" />
          <div className="ci-sb-user">
            <div className="ci-sb-user-avatar">
              {userAvatar ? (
                <img src={userAvatar} alt="Avatar" className="ci-sb-user-avatar-img" />
              ) : (
                <span className="ci-sb-user-initials">{userInitials}</span>
              )}
            </div>
            <div className="ci-sb-user-info">
              <span className="ci-sb-user-name">{userName}</span>
              <span className="ci-sb-user-email">{userEmail}</span>
            </div>
            <button className="ci-sb-logout-btn" onClick={handleLogout} title="Log out">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </button>
          </div>
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
                <p className="ci-greeting-sub">Good {getGreeting()}, {userName}</p>
                <h1 className="ci-greeting-title">Can I help you with anything?</h1>
              </div>
            </div>
          ) : (
            <div className="ci-messages">
              {messages.map(msg => <ChatBubble key={msg.id} msg={msg} />)}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* ── Input zone ── */}
        <div className="ci-input-zone">
          {/* Agent chips — above input */}
          <div className="ci-agent-chips">
            {AGENTS.filter(a => a.id !== 'auto').map(({ id, label, Icon }) => (
              <button
                key={id}
                className={`ci-agent-chip ${activeAgent === id ? 'ci-agent-chip--active' : ''}`}
                onClick={() => setActiveAgent(activeAgent === id ? 'auto' : id)}
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
                ref={textareaRef}
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
                <button className="ci-send-btn" onClick={handleSend} disabled={!inputVal.trim() || isLoading}>
                  <IconSend />
                </button>
              </div>
            </div>
            {/* Additional Actions row */}
            <div className="ci-input-actions">
               <button className="ci-action-pill" onClick={() => fileInputRef.current?.click()}>
                 <IconPaperclip /> Upload
               </button>
               <button
                 className={`ci-action-pill ${webSearchActive ? 'ci-action-pill--active' : ''}`}
                 onClick={() => setWebSearchActive(v => !v)}
                 title={webSearchActive ? 'Web search ON — click to disable' : 'Click to enable web search'}
               >
                 <IconSearch /> Search the web
               </button>
               <button
                 className={`ci-action-pill ${streamingEnabled ? 'ci-action-pill--stream-active' : ''}`}
                 onClick={() => setStreamingEnabled(v => !v)}
                 title={streamingEnabled ? 'Streaming ON — click to disable' : 'Click to enable streaming'}
               >
                 <IconStream /> Streaming
               </button>
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
