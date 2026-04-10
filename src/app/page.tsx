"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/AnimatedSection";
import { 
  ArrowRight, 
  Sparkles, 
  Terminal, 
  Users, 
  Search, 
  Bot, 
  ShieldCheck, 
  Activity,
  Database,
  LineChart,
  Cpu,
  Globe,
  Twitter
} from "lucide-react";
import { SiApachespark, SiOpenai } from "react-icons/si";

export default function LandingPage() {
  const dataProviders = [
    { name: "Bloomberg", icon: Activity },
    { name: "Nasdaq", icon: LineChart },
    { name: "NYSE", icon: Globe },
    { name: "S&P Global", icon: Database },
    { name: "Yahoo Finance", icon: Search },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-[#FDFDFD] text-neutral-900 selection:bg-emerald-200 font-[family-name:var(--font-inter)] overflow-hidden">
      
      {/* NAVBAR (Inline for easy copy-paste) */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200/60">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.15)] border border-emerald-500/20 bg-neutral-900">
              <Image 
                src="/wanda-hero.jpeg" 
                alt="Wanda AI" 
                fill 
                className="object-cover object-top opacity-90"
              />
            </div>
            <span className="font-bold text-xl tracking-tight text-neutral-900">Wanda AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-neutral-500">
            <Link href="#core-metrics" className="hover:text-emerald-600 transition-colors">Metrics</Link>
            <Link href="#features" className="hover:text-emerald-600 transition-colors">Architecture</Link>
            <Link href="https://x.com/wandaihedgefund" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
              <Twitter className="w-4 h-4" />
            </Link>
            <Link href="https://github.com/omnimasudo/wanda-ai-hedgefund" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </Link>
          </nav>
          <Link 
            href="/dashboard"
            className="text-sm font-bold px-5 py-2 bg-neutral-900 text-white rounded-full hover:bg-emerald-600 transition-colors"
          >
            Launch Terminal
          </Link>
        </div>
      </header>
      
      {/* =========================================
          1. HERO SECTION
          ========================================= */}
      <section className="relative w-full min-h-[95vh] flex items-center justify-center pt-20 border-b border-neutral-200/50">
        
        {/* Background Grid & Ambient Glow */}
        <div className="absolute inset-0 z-0 bg-[#FDFDFD] overflow-hidden pointer-events-none">
          {/* Subtle Dot Grid */}
          <div 
            className="absolute inset-0 opacity-[0.15]" 
            style={{ backgroundImage: 'radial-gradient(#10B981 1px, transparent 1px)', backgroundSize: '40px 40px' }}
          ></div>
          {/* Ambient Glows */}
          <div className="absolute top-1/4 left-10 w-[600px] h-[600px] bg-emerald-400/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-500/5 blur-[100px] rounded-full"></div>
          
          {/* Floating Metric Labels */}
          <span className="absolute top-[30%] left-[5%] text-[10px] font-bold font-[family-name:var(--font-jetbrains-mono)] text-neutral-300 tracking-widest">VOL: 24.5K</span>
          <span className="absolute bottom-[20%] left-[15%] text-[10px] font-bold font-[family-name:var(--font-jetbrains-mono)] text-neutral-300 tracking-widest">LATENCY: 12ms</span>
        </div>

        {/* Main Hero Content */}
        <div className="container relative mx-auto px-6 max-w-7xl z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Text Content (Left Side) */}
          <div className="w-full lg:w-3/5 pt-12 lg:pt-0">
            <Link 
              href="/dashboard"
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 text-xs font-bold uppercase tracking-widest rounded-full bg-white text-neutral-800 border border-neutral-200 shadow-sm hover:border-emerald-500/50 hover:bg-emerald-50 transition-all group"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-600 group-hover:animate-pulse" />
              <span>Wanda Core v1.0</span>
            </Link>
            
            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-extrabold tracking-tight mb-6 text-neutral-950 leading-[1.05]">
              Precision Data. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                Intelligent Action.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-600 mb-10 leading-relaxed font-medium max-w-2xl">
              The most sophisticated AI-driven terminal for quantitative analysis. Process millions of data points to deliver clean, actionable, and hyper-accurate insights in milliseconds.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
              <Link 
                href="/dashboard" 
                className="w-full sm:w-auto px-8 py-4 bg-neutral-950 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-neutral-900/10 hover:-translate-y-1"
              >
                <Terminal className="w-5 h-5" /> Initialize Terminal
              </Link>
              <Link 
                href="#features" 
                className="w-full sm:w-auto px-8 py-4 bg-white/80 text-neutral-900 font-bold rounded-2xl border border-neutral-200 hover:bg-neutral-50 transition-all flex items-center justify-center gap-2 backdrop-blur-md hover:-translate-y-1"
              >
                <Database className="w-5 h-5 text-neutral-400" /> View Architecture
              </Link>
            </div>

            {/* Quick Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-neutral-400 mr-2 uppercase tracking-wider">Models:</span>
              {['Predictive', 'Sentiment', 'Quantitative', 'Risk Assessment'].map((category) => (
                <span 
                  key={category} 
                  className="px-3 py-1.5 text-xs font-semibold rounded-md bg-white border border-neutral-200 text-neutral-600 hover:text-emerald-700 hover:border-emerald-200 transition-colors shadow-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
          
          {/* Character Image (Right Side - Framed) */}
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-end relative group">
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            <div className="relative z-10 w-full max-w-md bg-neutral-950 rounded-[2rem] p-2 shadow-2xl shadow-emerald-900/10 border border-neutral-200 group-hover:-translate-y-2 transition-transform duration-700">
               {/* Window Controls Mock */}
               <div className="flex items-center gap-2 px-4 py-3 bg-neutral-900 rounded-t-[1.5rem] border-b border-neutral-800">
                 <div className="w-3 h-3 rounded-full bg-neutral-700"></div>
                 <div className="w-3 h-3 rounded-full bg-neutral-700"></div>
                 <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                 <span className="ml-2 text-[10px] text-neutral-500 font-[family-name:var(--font-jetbrains-mono)] tracking-wider">
                   wanda_visual_node.exe
                 </span>
               </div>
               {/* Image */}
               <div className="overflow-hidden rounded-b-[1.5rem] bg-neutral-900 aspect-[4/5] relative">
                 <Image 
                   src="/wanda-hero.jpeg" 
                   alt="Wanda AI Agent"
                   fill
                   className="object-cover object-center opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                   priority
                 />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          2. DATA PROVIDERS SECTION
          ========================================= */}
      <AnimatedSection>
        <section className="w-full py-10 bg-white border-b border-neutral-200/50 relative z-10">
          <div className="container mx-auto px-6 max-w-7xl">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-neutral-400 mb-8">
              Aggregating Market Data via Secure APIs
            </p>
            <div className="overflow-hidden">
              <div className="flex items-center gap-8 md:gap-16 opacity-90 hover:opacity-100 transition-opacity duration-500 animate-scroll">
                {[...dataProviders, ...dataProviders].map((provider, index) => (
                  <div key={`${index}-${provider.name}`} className="flex items-center gap-2 text-neutral-700 grayscale hover:grayscale-0 hover:text-emerald-600 transition-all cursor-default flex-shrink-0">
                    <provider.icon className="w-6 h-6" />
                    <span className="font-bold text-lg tracking-tight">{provider.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* =========================================
          3. FEATURED ANALYSIS METRICS
          ========================================= */}
      <AnimatedSection delay={200}>
        <section id="core-metrics" className="w-full py-24 bg-neutral-50 relative z-10">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-neutral-900 tracking-tight flex items-center gap-3">
                  Core Metrics <SiApachespark className="w-6 h-6 text-emerald-500" />
                </h2>
                <p className="text-neutral-500 text-lg">
                  High-fidelity data parsing crafted for absolute precision.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-8 border border-neutral-200 rounded-3xl bg-white hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-200 transition-all group">
                <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center mb-6 border border-neutral-100 group-hover:bg-emerald-50 transition-colors">
                  <LineChart className="w-6 h-6 text-neutral-700 group-hover:text-emerald-600" />
                </div>
                <h3 className="font-[family-name:var(--font-jetbrains-mono)] text-lg font-bold text-neutral-900 mb-3">SMA 20 Convergence</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">Analyzes trailing 20-day Simple Moving Average boundaries against instant liquidity volume in real-time.</p>
              </div>
              
              <div className="p-8 border border-neutral-200 rounded-3xl bg-white hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-200 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <Activity className="w-24 h-24" />
                </div>
                <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center mb-6 border border-neutral-100 group-hover:bg-emerald-50 transition-colors">
                  <Cpu className="w-6 h-6 text-neutral-700 group-hover:text-emerald-600" />
                </div>
                <h3 className="font-[family-name:var(--font-jetbrains-mono)] text-lg font-bold text-neutral-900 mb-3">RSI Overbought Index</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">Calculates Relative Strength Index recursively to identify deep intrinsic valuation mismatches.</p>
              </div>
              
              <div className="p-8 border border-neutral-200 rounded-3xl bg-white hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-200 transition-all group">
                <div className="w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center mb-6 border border-neutral-100 group-hover:bg-emerald-50 transition-colors">
                  <ShieldCheck className="w-6 h-6 text-neutral-700 group-hover:text-emerald-600" />
                </div>
                <h3 className="font-[family-name:var(--font-jetbrains-mono)] text-lg font-bold text-neutral-900 mb-3">P/E Ratio Modeler</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">Multi-vector analysis comparing Price-to-Earnings against current macroeconomic sector conditions.</p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* =========================================
          4. MULTI-AGENT ANALYSIS FEATURE
          ========================================= */}
      <AnimatedSection delay={400}>
        <section className="w-full py-24 bg-white relative z-10">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              
              {/* Left Content */}
              <div className="lg:w-1/2">
                <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                  <SiOpenai className="w-4 h-4" /> Advanced Analysis
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-neutral-900 leading-[1.1]">
                  Multi-Agent <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                    Intelligence
                  </span>
                </h2>
                <p className="text-lg text-neutral-500 mb-8 leading-relaxed">
                  Four specialized AI analysts work in parallel to provide comprehensive market insights. Each agent brings unique perspectives - from technical analysis to fundamental valuation.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm font-medium text-neutral-700">Technical Analyst - Chart patterns & indicators</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm font-medium text-neutral-700">Fundamental Analyst - Company valuation & metrics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm font-medium text-neutral-700">Sentiment Analyst - Market mood & news impact</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm font-medium text-neutral-700">Risk Analyst - Volatility & position sizing</span>
                  </div>
                </div>
              </div>
              
              {/* Right Visual */}
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-200">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl p-4 border border-neutral-200">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                          <LineChart className="w-4 h-4 text-blue-600" />
                        </div>
                        <h4 className="font-semibold text-sm mb-1">Technical</h4>
                        <p className="text-xs text-neutral-500">Bullish trend confirmed</p>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-neutral-200">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                          <Database className="w-4 h-4 text-green-600" />
                        </div>
                        <h4 className="font-semibold text-sm mb-1">Fundamental</h4>
                        <p className="text-xs text-neutral-500">Strong earnings growth</p>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-neutral-200">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                          <Bot className="w-4 h-4 text-purple-600" />
                        </div>
                        <h4 className="font-semibold text-sm mb-1">Sentiment</h4>
                        <p className="text-xs text-neutral-500">Positive news coverage</p>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-neutral-200">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                          <ShieldCheck className="w-4 h-4 text-orange-600" />
                        </div>
                        <h4 className="font-semibold text-sm mb-1">Risk</h4>
                        <p className="text-xs text-neutral-500">Low volatility exposure</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* =========================================
          5. AI DECISION ENGINE FEATURE
          ========================================= */}
      <AnimatedSection delay={600}>
        <section className="w-full py-24 bg-neutral-50 relative z-10">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              
              {/* Left Visual */}
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="font-bold text-lg">Final Investment Decision</h4>
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">AI Generated</Badge>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                        <span className="font-medium">Confidence Score</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-neutral-200 rounded-full overflow-hidden">
                            <div className="w-4/5 h-full bg-emerald-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-bold text-emerald-600">85%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                        <span className="font-medium">Risk Assessment</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">Low Risk</Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                        <span className="font-medium">Recommended Action</span>
                        <Badge className="bg-blue-100 text-blue-800">BUY</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Content */}
              <div className="lg:w-1/2">
                <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Decision Intelligence
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-neutral-900 leading-[1.1]">
                  AI-Powered <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                    Decision Engine
                  </span>
                </h2>
                <p className="text-lg text-neutral-500 mb-8 leading-relaxed">
                  Our advanced AI synthesizes insights from all four analysts to deliver clear, actionable investment decisions with confidence scores and risk assessments.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm font-medium text-neutral-700">Synthesizes multi-agent insights into unified recommendations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm font-medium text-neutral-700">Provides confidence scores and risk assessments</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm font-medium text-neutral-700">Considers market conditions and portfolio context</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm font-medium text-neutral-700">Delivers instant, data-driven investment decisions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* =========================================
          6. ARCHITECTURE / CAPABILITIES (Sticky Scroll)
          ========================================= */}
      <AnimatedSection delay={800}>
        <section id="features" className="w-full py-32 bg-white border-y border-neutral-200/50 relative z-10">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              
              {/* Sticky Left Content */}
              <div className="lg:w-1/3 sticky top-32">
                <span className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> The Wanda Standard
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-neutral-900 leading-[1.1]">
                  Not just data.<br/>
                  <span className="text-neutral-400">
                    Intelligence.
                  </span>
                </h2>
                <p className="text-lg text-neutral-500 mb-8 leading-relaxed">
                  We treat data analysis like pure math. Tracked, tested, and optimized for maximum yield efficiency and rapid execution.
                </p>
                <Link href="/dashboard" className="inline-flex items-center text-sm font-bold border-b-2 border-neutral-900 pb-1 hover:text-emerald-600 hover:border-emerald-600 transition-all group">
                  Access Documentation <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Scrolling Right Cards */}
              <div className="lg:w-2/3 grid grid-cols-1 gap-6">
                
                <div className="flex flex-col sm:flex-row gap-6 p-8 rounded-[2rem] bg-neutral-50 border border-neutral-200 hover:border-emerald-300 transition-colors group">
                  <div className="flex-shrink-0 w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-neutral-200 shadow-sm group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-colors">
                    <Cpu className="w-8 h-8 text-neutral-700 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-neutral-900">Live Analytics Engine</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Stop wrestling with delayed tickers. Our backend scrapes financial APIs intelligently, calculating metrics via high-speed kernels before caching.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 p-8 rounded-[2rem] bg-neutral-50 border border-neutral-200 hover:border-emerald-300 transition-colors group">
                  <div className="flex-shrink-0 w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-neutral-200 shadow-sm group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-colors">
                     <Search className="w-8 h-8 text-neutral-700 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-neutral-900">Side-by-Side Comparison</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Instantly pair assets or datasets. The agent will assess both arrays, cross-reference historical performance, and determine the fundamental winner automatically.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 p-8 rounded-[2rem] bg-neutral-50 border border-neutral-200 hover:border-emerald-300 transition-colors group">
                  <div className="flex-shrink-0 w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-neutral-200 shadow-sm group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-colors">
                     <Bot className="w-8 h-8 text-neutral-700 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-neutral-900">Agentic Sentiments</h3>
                    <p className="text-neutral-600 leading-relaxed">
                       Go beyond numbers. Wanda AI ingests current market news and provides real-time qualitative AI assessments natively within the terminal.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* =========================================
          7. CTA SECTION
          ========================================= */}
      <AnimatedSection delay={1000}>
        <section className="w-full py-32 bg-neutral-950 relative z-10 overflow-hidden text-center flex flex-col items-center justify-center">
          {/* Deep Tech Background Effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#FFF 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-bold uppercase tracking-wider rounded-full bg-white/10 border border-white/20 text-emerald-400 backdrop-blur-md">
               <Users className="w-4 h-4" /> System Ready
            </div>
            
            <h2 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter text-white leading-[1.1]">
              Master your data,<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
                one node at a time.
              </span>
            </h2>
            
            <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed">
               Don't just observe the metrics. Command them. Utilize Wanda AI's computational power to navigate complex datasets effortlessly.
            </p>
            
            <Link 
              href="/dashboard" 
              className="inline-flex px-10 py-5 bg-emerald-500 text-neutral-950 font-bold text-lg rounded-2xl hover:bg-emerald-400 transition-all items-center gap-3 shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] hover:-translate-y-1"
            >
              <Terminal className="w-6 h-6" /> Initialize Terminal Access
            </Link>
          </div>
        </section>
      </AnimatedSection>
      
    </main>
  );
}

// Dummy component just to satisfy the import reference for Zap if it wasn't extracted earlier. 
// Added locally to ensure copy-paste works flawlessly.
function Zap(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}