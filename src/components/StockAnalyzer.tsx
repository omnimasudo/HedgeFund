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
import { Search, Loader2, Zap, AlertCircle } from "lucide-react"

interface StockAnalyzerProps {
  persona: PersonaType
  apiKey?: string // Optional - will use server-side env if not provided
}

export function StockAnalyzer({ persona, apiKey }: StockAnalyzerProps) {
  const [ticker, setTicker] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const handleAnalyze = async () => {
    if (!ticker.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      // Send request - server will use OPENROUTER_API_KEY from env
      // Client can optionally send their own key for flexibility
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticker: ticker.trim(),
          persona,
          ...(apiKey ? { apiKey } : {}) // Only send if user provided one
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
    <div className="space-y-6">
      {/* Search Input */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <Input
                placeholder="Enter stock ticker (e.g., AAPL, TSLA, MSFT)"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 h-12 text-lg font-medium"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleAnalyze}
              disabled={isLoading || !ticker.trim()}
              className="h-12 px-8 bg-black hover:bg-neutral-800"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Analyze
                </>
              )}
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800">{error}</p>
                {error.includes("API key") && (
                  <p className="text-xs text-red-600 mt-1">
                    Add OPENROUTER_API_KEY to .env.local file or enter your key in Settings
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
              </div>
              <Skeleton className="h-[300px]" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-48" />
                <Skeleton className="h-48" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {result && !isLoading && (
        <div className="space-y-6 animate-in fade-in duration-500">
          {/* Stock Chart & Quick Stats */}
          <StockChart data={result.quote} />

          {/* Agent Cards & AI Reasoning */}
          <div className="grid grid-cols-3 gap-6">
            {/* Agent Insights */}
            <div className="col-span-2 space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                Multi-Agent Insights
                <Badge variant="secondary">4 Analysts</Badge>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {result.agents.map((agent) => (
                  <AgentCard key={agent.agent} agent={agent} />
                ))}
              </div>
            </div>

            {/* Portfolio Decision */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Final Verdict</h3>
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
        <Card className="border-dashed">
          <CardContent className="py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Start Analyzing</h3>
            <p className="text-neutral-500 max-w-md mx-auto">
              Enter a stock ticker above to get AI-powered analysis with multi-agent insights,
              technical indicators, and investment recommendations.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}