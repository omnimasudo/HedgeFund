"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnalysisResult } from "@/types"
import { cn, getDecisionColor, getRiskColor } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus, Share2, Check, X } from "lucide-react"

interface PortfolioDecisionProps {
  result: AnalysisResult
}

export function PortfolioDecision({ result }: PortfolioDecisionProps) {
  const { finalDecision, symbol } = result

  const DecisionIcon = finalDecision.decision === "BUY"
    ? TrendingUp
    : finalDecision.decision === "SELL"
    ? TrendingDown
    : Minus

  const decisionClass = getDecisionColor(finalDecision.decision)

  const handleShare = () => {
    const text = `AI Hedge Fund just analyzed $${symbol}:

→ ${finalDecision.decision}
→ Confidence: ${finalDecision.confidence}%
→ Risk: ${finalDecision.riskLevel}
→ Reason: ${finalDecision.summary}

#AIInvesting #StockAnalysis`

    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(url, "_blank", "width=550,height=420")
  }

  return (
    <Card className="border-2 border-neutral-900">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
          Portfolio Decision
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        {/* Main Decision */}
        <div className={cn(
          "inline-flex items-center gap-3 px-6 py-4 rounded-xl mb-4",
          finalDecision.decision === "BUY" && "bg-green-500/10",
          finalDecision.decision === "SELL" && "bg-red-500/10",
          finalDecision.decision === "HOLD" && "bg-yellow-500/10"
        )}>
          <DecisionIcon className={cn(
            "w-10 h-10",
            finalDecision.decision === "BUY" && "text-green-500",
            finalDecision.decision === "SELL" && "text-red-500",
            finalDecision.decision === "HOLD" && "text-yellow-500"
          )} />
          <span className={cn(
            "text-5xl font-bold",
            finalDecision.decision === "BUY" && "text-green-500",
            finalDecision.decision === "SELL" && "text-red-500",
            finalDecision.decision === "HOLD" && "text-yellow-500"
          )}>
            {finalDecision.decision}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 rounded-lg bg-neutral-50">
            <p className="text-xs text-neutral-500">Confidence</p>
            <p className="text-2xl font-bold">{finalDecision.confidence}%</p>
          </div>
          <div className="p-3 rounded-lg bg-neutral-50">
            <p className="text-xs text-neutral-500">Risk Level</p>
            <Badge className={cn("mt-1", getRiskColor(finalDecision.riskLevel))}>
              {finalDecision.riskLevel}
            </Badge>
          </div>
        </div>

        {/* Summary */}
        <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
          {finalDecision.summary}
        </p>

        {/* Share Button */}
        <Button
          onClick={handleShare}
          className="w-full gap-2 bg-black hover:bg-neutral-800"
        >
          <Share2 className="w-4 h-4" />
          Share to X
        </Button>
      </CardContent>
    </Card>
  )
}
