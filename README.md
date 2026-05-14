# Finova Finance AI Agent

![Finova Banner](public/logo.png)

Finova is a state-of-the-art, multi-agent AI financial assistant designed to empower users with real-time market data, personalized investment strategies, and deep portfolio analysis. Built with a modern React frontend and a robust Python/LangGraph backend, Finova seamlessly routes queries to specialized AI agents to deliver precise and actionable financial intelligence.

## ✨ Features

- **🧠 Multi-Agent Architecture**: Intelligent routing to specialized agents (Analysis, Advice, News, Investment, Price, Learning, and Data).
- **📈 Real-Time Market Data**: Live lookup for Nifty 50, Sensex, and global stocks using Yahoo Finance integration.
- **⚡ Streaming Responses**: Low-latency, token-by-token streaming of AI responses for a natural conversational experience.
- **🔐 Secure Authentication**: User authentication and persistent session management powered by Supabase.
- **📊 Document Analysis**: Upload and analyze financial statements (CSV, XLSX, Images) securely.
- **🎨 Premium UI/UX**: A dark-themed, glassmorphic interface with micro-animations and responsive design.
- **Track Usage**: Built-in tracking for API consumption and tool usage to manage limits effectively.

## 🏗️ Architecture

### Frontend
- **Framework**: React 19 + Vite
- **Routing**: React Router DOM
- **Styling**: Vanilla CSS with modern CSS variables, Grid, and Flexbox
- **State/Auth**: Supabase JS Client

### Backend
- **Framework**: FastAPI (Python 3.12+)
- **AI Orchestration**: LangGraph & LangChain
- **LLM Provider**: Groq (high-speed inference)
- **Database**: PostgreSQL (via Supabase & SQLAlchemy)
- **Tools**: DuckDuckGo Search, YFinance, Wikipedia, Arxiv

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.12 or higher)
- [uv](https://github.com/astral-sh/uv) (Python package manager, recommended)
- Supabase Account & Groq API Key

### 1. Clone the Repository
```bash
git clone https://github.com/Sai-Patil-24/Finova.git
cd Finova
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

# Start the development server
npm run dev
```

### 3. Backend Setup
```bash
cd backend

# Create and activate a virtual environment (using uv)
uv venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
uv pip install -r pyproject.toml

# Set up environment variables
cp .env.example .env
# Add your GROQ_API_KEY, SUPABASE_URL, etc.

# Run the FastAPI server
python main.py
```

## 📚 Agent Capabilities

Finova utilizes a LangGraph workflow to route user queries to the most capable agent:

1. **Auto (Smart Router)**: Analyzes the query intent and selects the optimal specialized agent.
2. **Analysis Agent**: Deep dives into portfolio allocation and spending trends.
3. **Advice Agent**: Provides personalized educational strategies and wealth-building tips.
4. **News Agent**: Fetches real-time market headlines and macroeconomic updates.
5. **Investment Agent**: Suggests strategies tailored to risk profiles (e.g., Nifty 50 allocation).
6. **Price Agent**: Retrieves real-time ticker prices and historical data.
7. **Learning Agent**: Explains complex financial concepts in simple terms.
8. **Data Agent**: Connects to linked financials for personalized insights.

## 🛠️ Configuration

Key environment variables required for the backend (`backend/.env`):
```env
GROQ_API_KEY=your_groq_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_key
DATABASE_URL=your_postgres_connection_string
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Sai-Patil-24/Finova/issues).

## 📄 License
Copyright © 2026 Finova. All rights reserved.
