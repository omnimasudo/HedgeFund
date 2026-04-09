"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, BarChart3, Users, Clock } from "lucide-react"

interface DashboardViewProps {
  history: { id: string; symbol: string; decision: string; timestamp: Date }[]
}

export function DashboardView({ history }: DashboardViewProps) {
  const totalAnalyzed = history.length
  const buyCount = history.filter(h => h.decision === "BUY").length
  const sellCount = history.filter(h => h.decision === "SELL").length
  const holdCount = history.filter(h => h.decision === "HOLD").length

  const stats = [
    {
      title: "Total Analyzed",
      value: totalAnalyzed,
      icon: BarChart3,
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "Buy Signals",
      value: buyCount,
      icon: TrendingUp,
      color: "bg-green-500/10 text-green-600",
    },
    {
      title: "Sell Signals",
      value: sellCount,
      icon: TrendingDown,
      color: "bg-red-500/10 text-red-600",
    },
    {
      title: "Hold Signals",
      value: holdCount,
      icon: Clock,
      color: "bg-yellow-500/10 text-yellow-600",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white">
        <CardContent className="py-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to AI Hedge Fund</h1>
          <p className="text-neutral-300 max-w-xl">
            Your personal AI-powered investment analysis terminal. Get institutional-grade
            insights from multiple AI agents, all in one place.
          </p>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-500">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={cn("p-3 rounded-lg", stat.color)}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Enter Ticker</h3>
              <p className="text-sm text-neutral-500">
                Input any stock symbol (AAPL, TSLA, MSFT, etc.)
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">AI Analysis</h3>
              <p className="text-sm text-neutral-500">
                4 AI agents analyze fundamentals, technicals, and sentiment
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Get Insights</h3>
              <p className="text-sm text-neutral-500">
                Receive clear BUY/SELL/HOLD recommendations with reasoning
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Agents Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Multi-Agent AI System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
              <h4 className="font-semibold text-amber-900">Warren Buffett AI</h4>
              <p className="text-sm text-amber-700 mt-1">
                Value investing analysis focused on intrinsic value and moat
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <h4 className="font-semibold text-blue-900">Growth Hunter AI</h4>
              <p className="text-sm text-blue-700 mt-1">
                Growth potential analysis focused on expansion and innovation
              </p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
              <h4 className="font-semibold text-purple-900">Quant Analyst AI</h4>
              <p className="text-sm text-purple-700 mt-1">
                Technical analysis with RSI, SMA, and pattern recognition
              </p>
            </div>
            <div className="p-4 rounded-lg bg-pink-50 border border-pink-200">
              <h4 className="font-semibold text-pink-900">Sentiment Scanner AI</h4>
              <p className="text-sm text-pink-700 mt-1">
                Market sentiment analysis from news and social trends
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper function
function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
