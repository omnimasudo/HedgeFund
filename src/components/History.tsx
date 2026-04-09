"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AnalysisHistory } from "@/types"
import { cn, getDecisionColor } from "@/lib/utils"
import { History as HistoryIcon, Trash2, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface HistoryProps {
  history: AnalysisHistory[]
  onSelect: (analysis: AnalysisHistory) => void
  onDelete: (id: string) => void
}

export function History({ history, onSelect, onDelete }: HistoryProps) {
  if (history.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
            <HistoryIcon className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No History Yet</h3>
          <p className="text-neutral-500 max-w-md mx-auto">
            Your analyzed stocks will appear here. Start by analyzing a stock ticker.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <HistoryIcon className="w-5 h-5" />
          Analysis History
        </h2>
        <Badge variant="secondary">{history.length} stocks</Badge>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-3 pr-4">
          {history.map((item) => {
            const DecisionIcon = item.result.finalDecision.decision === "BUY"
              ? TrendingUp
              : item.result.finalDecision.decision === "SELL"
              ? TrendingDown
              : Minus

            return (
              <Card
                key={item.id}
                className="cursor-pointer hover:border-neutral-400 transition-colors"
                onClick={() => onSelect(item)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold">{item.result.symbol}</p>
                        <p className="text-xs text-neutral-500">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="h-12 w-px bg-neutral-200" />
                      <div>
                        <Badge className={cn("gap-1", getDecisionColor(item.result.finalDecision.decision))}>
                          <DecisionIcon className="w-3 h-3" />
                          {item.result.finalDecision.decision}
                        </Badge>
                        <p className="text-sm text-neutral-500 mt-1">
                          {item.result.finalDecision.confidence}% confidence
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(item.id)
                      }}
                      className="text-neutral-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
