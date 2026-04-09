# AI Hedge Fund - Retail Terminal

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## 🎯 Overview

**AI Hedge Fund** brings institutional-grade investment analysis to retail investors. Using multi-agent AI systems inspired by the virattt/ai-hedge-fund project, this terminal provides real-time stock analysis powered by Yahoo Finance data and OpenRouter AI.

## ✨ Features

- **📊 AI Stock Analyzer** - Input any ticker symbol for instant AI-powered analysis
- **🤖 Multi-Agent Insights** - 4 AI agents (Warren Buffett, Growth Hunter, Quant Analyst, Sentiment Scanner)
- **📈 Technical Charts** - RSI, SMA, trend indicators with Recharts
- **💼 Portfolio Decision** - Clear BUY/SELL/HOLD with confidence %
- **🐦 Share to X** - One-click Twitter sharing of analysis results
- **📰 News Feed** - Real-time news from Yahoo Finance
- **🎭 AI Persona Switch** - Conservative / Balanced / Aggressive modes

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Charts:** Recharts
- **AI:** OpenRouter (Multi-Agent System)
- **Data:** Yahoo Finance API

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- OpenRouter API key (get from [openrouter.ai/keys](https://openrouter.ai/keys))

### Installation

```bash
# Clone the repository
git clone https://github.com/omnimasudo/HedgeFund.git
cd HedgeFund

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.local

# Add your OpenRouter API key to .env.local
# OPENROUTER_API_KEY=sk-or-v1-xxxxx

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts   # AI analysis endpoint
│   │   └── stock/route.ts     # Yahoo Finance endpoint
│   ├── page.tsx               # Main dashboard
│   └── layout.tsx            # Root layout
├── components/
│   ├── Sidebar.tsx            # Navigation sidebar
│   ├── StockAnalyzer.tsx      # Main analyzer component
│   ├── StockChart.tsx         # Recharts stock chart
│   ├── AgentCard.tsx          # AI agent insight cards
│   ├── AIReasoningPanel.tsx    # Expandable reasoning panel
│   ├── PortfolioDecision.tsx   # Final decision display
│   └── ...
├── lib/
│   ├── yahoo-finance.ts       # Yahoo Finance API integration
│   ├── openrouter.ts          # OpenRouter AI service
│   └── utils.ts               # Utility functions
└── types/
    └── index.ts               # TypeScript interfaces
```

## 🌐 Deployment

This app requires Node.js hosting for API routes:

1. **Vercel** (Recommended - Free)
   - Connect your GitHub repo
   - Add `OPENROUTER_API_KEY` in Environment Variables
   - Deploy

2. **Other Platforms**
   - Railway, Render, Fly.io, or any VPS
   - Set `OPENROUTER_API_KEY` environment variable

## 📝 Environment Variables

```env
OPENROUTER_API_KEY=sk-or-v1-your-api-key-here
```

Get your API key at [openrouter.ai/keys](https://openrouter.ai/keys)

## 🎨 UI Preview

The terminal-style interface features:
- Light mode with clean, minimal design
- Bloomberg Terminal aesthetic
- Professional hedge fund vibe
- Data-heavy but readable layout

## 📜 License

MIT License - See [LICENSE](LICENSE) for details.

## 🙏 Credits

- Inspired by [virattt/ai-hedge-fund](https://github.com/virattt/ai-hedge-fund)
- AI powered by [OpenRouter](https://openrouter.ai)
- Stock data from [Yahoo Finance](https://finance.yahoo.com)