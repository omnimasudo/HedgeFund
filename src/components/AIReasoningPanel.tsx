"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AgentInsight, StockQuote } from "@/types"
import { cn, getDecisionColor } from "@/lib/utils"
import { MessageSquare, Bot, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

interface AIReasoningPanelProps {
  agents: AgentInsight[]
  quote: StockQuote
}

export function AIReasoningPanel({ agents, quote }: AIReasoningPanelProps) {
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null)

  const toggleAgent = (agentName: string) => {
    setExpandedAgent(expandedAgent === agentName ? null : agentName)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-neutral-500" />
          <CardTitle className="text-base">AI Reasoning Panel</CardTitle>
          <Badge variant="secondary" className="ml-auto">
            <Bot className="w-3 h-3 mr-1" />
            Multi-Agent
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {agents.map((agent) => {
          const isExpanded = expandedAgent === agent.name
          const decisionClass = getDecisionColor(agent.decision)

          return (
            <div
              key={agent.agent}
              className="border border-neutral-200 rounded-lg overflow-hidden"
            >
              {/* Agent Header */}
              <button
                onClick={() => toggleAgent(agent.name)}
                className="w-full flex items-center justify-between p-3 hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Badge className={cn("font-semibold", decisionClass)}>
                    {agent.decision}
                  </Badge>
                  <span className="text-sm font-medium">{agent.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-500">
                    {agent.confidence}% confidence
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-neutral-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-400" />
                  )}
                </div>
              </button>

              {/* Expanded Reasoning */}
              {isExpanded && (
                <div className="px-3 pb-3 pt-0 border-t border-neutral-100">
                  <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                    {agent.reasoning}
                  </p>
                </div>
              )}
            </div>
          )
        })}

        {/* Summary Insight */}
        <div className="mt-4 p-3 rounded-lg bg-neutral-50 border border-neutral-200">
          <p className="text-xs font-medium text-neutral-500 mb-1">Key Insight</p>
          <p className="text-sm text-neutral-700">
            {quote.quantitative.trend === 'Bullish'
              ? `Price above SMA20 indicates bullish momentum. RSI at ${quote.quantitative.rsi14} suggests ${quote.quantitative.rsi14 > 70 ? 'overbought' : quote.quantitative.rsi14 < 30 ? 'oversold' : 'neutral'} conditions.`
              : `Price below SMA20 indicates bearish pressure. RSI at ${quote.quantitative.rsi14} suggests ${quote.quantitative.rsi14 > 70 ? 'overbought' : quote.quantitative.rsi14 < 30 ? 'oversold' : 'neutral'} conditions.`
            }
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
