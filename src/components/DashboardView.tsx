"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity, Users, Clock, Database, GitMerge, Cpu, FileText } from "lucide-react"

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
      title: "Datasets Parsed",
      value: totalAnalyzed,
      icon: Database,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Buy Signals Executed",
      value: buyCount,
      icon: TrendingUp,
      color: "bg-teal-50 text-teal-600 border-teal-100",
    },
    {
      title: "Sell Signals Executed",
      value: sellCount,
      icon: TrendingDown,
      color: "bg-neutral-100 text-neutral-600 border-neutral-200",
    },
    {
      title: "Hold Signals Active",
      value: holdCount,
      icon: Clock,
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
  ]

  return (
    <div className="space-y-6 font-[family-name:var(--font-inter)]">
      {/* Welcome Banner */}
      <Card className="bg-neutral-950 text-white border-neutral-800 relative overflow-hidden shadow-xl shadow-neutral-900/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none"></div>
        <CardContent className="py-10 relative z-10">
          <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400 bg-emerald-500/10 font-[family-name:var(--font-jetbrains-mono)] text-xs">
            STATUS: ONLINE
          </Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">Wanda <span className="text-emerald-400">Core Terminal</span></h1>
          <p className="text-neutral-400 max-w-xl text-lg leading-relaxed">
            Institutional-grade quantitative analysis. Deploying multi-agent neural swarms to parse global market datasets in real-time.
          </p>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="border-neutral-200 shadow-sm hover:border-emerald-200 transition-colors bg-white">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">{stat.title}</p>
                    <p className="text-4xl font-bold mt-2 text-neutral-900 font-[family-name:var(--font-jetbrains-mono)]">{stat.value}</p>
                  </div>
                  <div className={cn("p-2.5 rounded-xl border", stat.color)}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* How It Works */}
      <Card className="border-neutral-200 shadow-sm bg-white">
        <CardHeader className="border-b border-neutral-100 pb-4">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <GitMerge className="w-5 h-5 text-emerald-500" /> System Initialization Flow
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center mb-4 text-neutral-600 font-[family-name:var(--font-jetbrains-mono)] font-bold">
                01
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">Input Asset Ticker</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Provide the target equity symbol (e.g., AAPL, TSLA). The system will establish a direct API tunnel.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-4 text-emerald-600 font-[family-name:var(--font-jetbrains-mono)] font-bold">
                02
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">Neural Processing</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Wanda deploys 4 parallel AI agents to cross-reference fundamentals, technicals, and global sentiment.
              </p>
            </div>
            <div className="flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center mb-4 text-teal-600 font-[family-name:var(--font-jetbrains-mono)] font-bold">
                03
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">Data Output</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Receive definitive algorithmic recommendations with transparent reasoning logs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Agents Preview */}
      <Card className="border-neutral-200 shadow-sm bg-white">
        <CardHeader className="border-b border-neutral-100 pb-4">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-500" /> Neural Architecture Nodes
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#FDFDFD] border border-neutral-200 hover:border-emerald-300 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <Database className="w-4 h-4 text-emerald-600" />
                <h4 className="font-bold text-neutral-900">Value Proposition Node</h4>
              </div>
              <p className="text-sm text-neutral-500">
                Calculates intrinsic value, moats, and deep fundamental discrepancies.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#FDFDFD] border border-neutral-200 hover:border-emerald-300 transition-colors">
               <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <h4 className="font-bold text-neutral-900">Growth Analysis Node</h4>
              </div>
              <p className="text-sm text-neutral-500">
                Models forward-looking revenue trajectories and market expansion potential.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#FDFDFD] border border-neutral-200 hover:border-emerald-300 transition-colors">
               <div className="flex items-center gap-3 mb-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                <h4 className="font-bold text-neutral-900">Quantitative Node</h4>
              </div>
              <p className="text-sm text-neutral-500">
                Strict mathematical evaluation of RSI, SMA, MACD, and real-time liquidity volume.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#FDFDFD] border border-neutral-200 hover:border-emerald-300 transition-colors">
               <div className="flex items-center gap-3 mb-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <h4 className="font-bold text-neutral-900">Sentiment Scanner Node</h4>
              </div>
              <p className="text-sm text-neutral-500">
                Parses raw text from global financial news and institutional filings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}