"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { StockChart } from "@/components/StockChart"
import { AgentCard } from "@/components/AgentCard"
import { AIReasoningPanel } from "@/components/AIReasoningPanel"
import { PortfolioDecision } from "@/components/PortfolioDecision"
import { NewsFeed } from "@/components/NewsFeed"
import { AnalysisResult, PersonaType } from "@/types"
import { Search, Loader2, Zap, AlertCircle, TerminalSquare } from "lucide-react"

interface StockAnalyzerProps {
  persona: PersonaType
  apiKey?: string // Optional - will use server-side env if not provided
}

export function StockAnalyzer({ persona, apiKey }: StockAnalyzerProps) {
  const [ticker, setTicker] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  // LOGIKA API TIDAK DISENTUH
  const handleAnalyze = async () => {
    if (!ticker.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticker: ticker.trim(),
          persona,
          ...(apiKey ? { apiKey } : {}) 
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Analysis failed")
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
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-[family-name:var(--font-jetbrains-mono)] text-neutral-400 font-bold">
                $
              </span>
              <Input
                placeholder="Enter target ticker (e.g., AAPL, TSLA, NVDA)"
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                onKeyPress={handleKeyPress}
                className="pl-10 h-14 text-lg font-bold font-[family-name:var(--font-jetbrains-mono)] bg-neutral-50 border-neutral-200 focus-visible:ring-emerald-500 uppercase tracking-widest text-neutral-900"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleAnalyze}
              disabled={isLoading || !ticker.trim()}
              className="h-14 px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-600/20 transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
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
            <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
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

          {/* Loading State */}
          {isLoading && (
            <div className="mt-8 space-y-6">
              <div className="flex items-center gap-3 text-sm font-bold text-emerald-600 font-[family-name:var(--font-jetbrains-mono)] animate-pulse">
                <span>&gt; Initiating neural swarm on {ticker}...</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-16 rounded-xl bg-neutral-100" />
                <Skeleton className="h-16 rounded-xl bg-neutral-100" />
                <Skeleton className="h-16 rounded-xl bg-neutral-100" />
              </div>
              <Skeleton className="h-[350px] rounded-2xl bg-neutral-100" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-48 rounded-xl bg-neutral-100" />
                <Skeleton className="h-48 rounded-xl bg-neutral-100" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {result && !isLoading && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Stock Chart & Quick Stats */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
             <StockChart data={result.quote} />
          </div>

          {/* Agent Cards & AI Reasoning */}
          <div className="grid grid-cols-3 gap-6">
            {/* Agent Insights */}
            <div className="col-span-2 space-y-4">
              <h3 className="font-extrabold text-lg flex items-center gap-3 text-neutral-900">
                Neural Swarm Analysis
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none font-[family-name:var(--font-jetbrains-mono)] text-xs">
                  4 Active Nodes
                </Badge>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {result.agents.map((agent) => (
                  <AgentCard key={agent.agent} agent={agent} />
                ))}
              </div>
            </div>

            {/* Portfolio Decision */}
            <div>
              <h3 className="font-extrabold text-lg mb-4 text-neutral-900">System Verdict</h3>
              <PortfolioDecision result={result} />
            </div>
          </div>

          {/* AI Reasoning Panel & News */}
          <div className="grid grid-cols-2 gap-6">
            <AIReasoningPanel agents={result.agents} quote={result.quote} />
            <NewsFeed news={result.quote.news} />
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