"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StockChart } from "@/components/StockChart"
import { AgentCard } from "@/components/AgentCard"
import { AIReasoningPanel } from "@/components/AIReasoningPanel"
import { PortfolioDecision } from "@/components/PortfolioDecision"
import { NewsFeed } from "@/components/NewsFeed"
import { AnalysisResult, PersonaType } from "@/types"
import { Search, Loader2, Zap, AlertCircle, TerminalSquare, Activity } from "lucide-react"

interface StockAnalyzerProps {
  persona: PersonaType
  apiKey?: string
}

const LOADING_STEPS = [
  "Establishing secure tunnel to market makers...",
  "Bypassing standard latency protocols: OK",
  "Scraping institutional datasets & dark pool prints...",
  "Deploying Neural Swarm (4 Active Nodes)...",
  "Cross-referencing intrinsic value & global sentiment...",
  "Compiling final algorithmic verdict..."
]

export function StockAnalyzer({ persona, apiKey }: StockAnalyzerProps) {
  const [ticker, setTicker] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [loadingStepIdx, setLoadingStepIdx] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingStepIdx((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev))
      }, 500) 
    } else {
      setLoadingStepIdx(0)
    }
    return () => clearInterval(interval)
  }, [isLoading])

  const handleAnalyze = async () => {
    if (!ticker.trim()) return

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const [response] = await Promise.all([
        fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ticker: ticker.trim(),
            persona,
            ...(apiKey ? { apiKey } : {}) 
          }),
        }),
        new Promise(resolve => setTimeout(resolve, 3200)) 
      ])

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        
        // FIX API 402 ERROR: Tangkap error saldo habis dari OpenRouter
        if (response.status === 402) {
           throw new Error("API_ERROR_402: Insufficient OpenRouter credits. Please top up your balance at openrouter.ai.");
        }
        
        throw new Error(data.error || `Analysis failed with status: ${response.status}`);
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAnalyze()
    }
  }

  return (
    <div className="space-y-6 font-[family-name:var(--font-inter)]">
      {/* Search Input */}
      <Card className="border-neutral-200 shadow-sm bg-white overflow-hidden">
        <div className="bg-neutral-50 border-b border-neutral-200 px-4 py-2 flex items-center gap-2">
          <TerminalSquare className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold text-neutral-500 font-[family-name:var(--font-jetbrains-mono)] uppercase tracking-wider">
            Command Line Interface
          </span>
        </div>
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <div className="relative flex-1 group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-[family-name:var(--font-jetbrains-mono)] text-emerald-600 font-bold group-focus-within:animate-pulse">
                $
              </span>
              <Input
                placeholder="Enter target ticker (e.g., AAPL, TSLA, NVDA)"
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                onKeyPress={handleKeyPress}
                className="pl-10 h-14 text-lg font-bold font-[family-name:var(--font-jetbrains-mono)] bg-neutral-50 border-neutral-200 focus-visible:ring-emerald-500 uppercase tracking-widest text-neutral-900 transition-all"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleAnalyze}
              disabled={isLoading || !ticker.trim()}
              className="h-14 px-8 bg-neutral-950 hver:bg-emerald-600 text-white font-bold shadow-lg shadow-neutral-900/10 hover:shadow-emerald-600/30 transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin text-emerald-400" />
                  <span className="text-emerald-400">Processing...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2 fill-white" />
                  Execute Analysis
                </>
              )}
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 animate-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-red-900">{error}</p>
                {error.includes("API key") && (
                  <p className="text-xs text-red-600 mt-1 font-[family-name:var(--font-jetbrains-mono)]">
                    ERR_API_KEY_MISSING: Configure OPENROUTER_API_KEY in environment or settings.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Heavy Loading State */}
          {isLoading && (
            <div className="mt-8 p-6 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl relative overflow-hidden animate-in fade-in duration-500">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none"></div>
              
              <div className="flex items-center gap-3 mb-6 border-b border-neutral-800 pb-4 relative z-10">
                 <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
                   <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
                 </div>
                 <div>
                   <span className="text-emerald-500 font-bold tracking-widest text-sm uppercase font-[family-name:var(--font-jetbrains-mono)] block">
                     Neural Swarm Execution
                   </span>
                   <span className="text-neutral-500 text-xs font-[family-name:var(--font-jetbrains-mono)]">TARGET: {ticker || "UNKNOWN"}</span>
                 </div>
              </div>

              {/* FIX OVERFLOW: Tambahkan overflow-hidden dan gradient top masking */}
              <div className="relative h-40 overflow-hidden font-[family-name:var(--font-jetbrains-mono)] text-sm z-10">
                 {/* Fading Mask di bagian atas agar teks memudar rapi saat terdorong */}
                 <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-neutral-950 to-transparent z-20"></div>
                 
                 <div className="absolute bottom-0 w-full flex flex-col justify-end space-y-3 pb-2">
                   {LOADING_STEPS.slice(0, loadingStepIdx + 1).map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <span className="text-emerald-600 font-bold">{">"}</span>
                        <span className={idx === loadingStepIdx ? "text-emerald-400 font-bold drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "text-neutral-500"}>
                          {step}
                        </span>
                      </div>
                   ))}
                   <div className="flex items-center gap-2 mt-1">
                     <span className="text-emerald-600 font-bold">{">"}</span>
                     <span className="w-2 h-4 bg-emerald-500 animate-pulse block"></span>
                   </div>
                 </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {result && !isLoading && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* 1. Stock Chart & Quick Stats */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
             <StockChart data={result.quote} />
          </div>

          {/* 2. Neural Swarm Analysis (Dibuat lebih besar / Full Width) */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-lg flex items-center gap-3 text-neutral-900">
              Neural Swarm Analysis
              <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none font-[family-name:var(--font-jetbrains-mono)] text-xs">
                4 Active Nodes
              </Badge>
            </h3>
            {/* Grid dibuat mendatar (2 kolom di mobile, 4 kolom di desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {result.agents.map((agent) => (
                <AgentCard key={agent.agent} agent={agent} />
              ))}
            </div>
          </div>

          {/* 3. System Verdict & AI Reasoning Panel (1 Baris) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* System Verdict (Mengambil 1 Kolom) */}
            <div className="lg:col-span-1 flex flex-col">
              <h3 className="font-extrabold text-lg mb-4 text-neutral-900">System Verdict</h3>
              {/* Memaksa text button di dalam PortfolioDecision menjadi putih dengan CSS selector */}
              <div className="flex-1 [&_button]:text-white [&_button_span]:text-white">
                <PortfolioDecision result={result} />
              </div>
            </div>

            {/* AI Reasoning Panel (Mengambil 2 Kolom) */}
            <div className="lg:col-span-2 flex flex-col">
              <AIReasoningPanel agents={result.agents} quote={result.quote} />
            </div>

          </div>
        </div>
      )}

      {/* Empty State */}
      {!result && !isLoading && !error && (
        <Card className="border-dashed border-2 border-neutral-200 bg-transparent shadow-none">
          <CardContent className="py-24 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Search className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-xl font-extrabold mb-2 text-neutral-900">Awaiting Target Parameters</h3>
            <p className="text-neutral-500 max-w-md mx-auto text-sm leading-relaxed">
              Input a valid equity ticker in the terminal above to initiate the data extraction and neural analysis protocol.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}