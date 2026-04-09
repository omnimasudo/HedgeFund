"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AgentInsight } from "@/types"
import { cn, getDecisionColor } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus, User } from "lucide-react"

interface AgentCardProps {
  agent: AgentInsight
  compact?: boolean
}

const agentIcons: Record<string, React.ReactNode> = {
  value: <User className="w-4 h-4" />,
  growth: <TrendingUp className="w-4 h-4" />,
  quant: <TrendingUp className="w-4 h-4" />,
  sentiment: <TrendingDown className="w-4 h-4" />,
}

const agentColors: Record<string, string> = {
  value: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  growth: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  quant: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  sentiment: "bg-pink-500/10 text-pink-600 border-pink-500/20",
}

export function AgentCard({ agent, compact = false }: AgentCardProps) {
  const decisionClass = getDecisionColor(agent.decision)

  const DecisionIcon = agent.decision === "BUY"
    ? TrendingUp
    : agent.decision === "SELL"
    ? TrendingDown
    : Minus

  return (
    <Card className={cn("border-l-4", agentColors[agent.agent])}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={cn("p-1.5 rounded-md", agentColors[agent.agent])}>
              {agentIcons[agent.agent]}
            </div>
            <CardTitle className="text-sm font-medium">
              {agent.name}
            </CardTitle>
          </div>
          <Badge className={cn("font-bold", decisionClass)}>
            <DecisionIcon className="w-3 h-3 mr-1" />
            {agent.decision}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Confidence Bar */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-neutral-500">Confidence</span>
              <span className="font-medium">{agent.confidence}%</span>
            </div>
            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  agent.decision === "BUY" ? "bg-green-500" : agent.decision === "SELL" ? "bg-red-500" : "bg-yellow-500"
                )}
                style={{ width: `${agent.confidence}%` }}
              />
            </div>
          </div>

          {/* Reasoning */}
          {!compact && (
            <p className="text-xs text-neutral-600 leading-relaxed">
              {agent.reasoning}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
