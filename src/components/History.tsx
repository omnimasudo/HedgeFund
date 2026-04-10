"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AnalysisHistory } from "@/types"
import { cn, getDecisionColor } from "@/lib/utils"
import { History as HistoryIcon, Trash2, TrendingUp, TrendingDown, Minus, Database } from "lucide-react"

interface HistoryProps {
  history: AnalysisHistory[]
  onSelect: (analysis: AnalysisHistory) => void
  onDelete: (id: string) => void
}

export function History({ history, onSelect, onDelete }: HistoryProps) {
  if (history.length === 0) {
    return (
      <Card className="border-dashed border-2 border-neutral-200 bg-transparent shadow-none font-[family-name:var(--font-inter)]">
        <CardContent className="py-24 text-center">
          <div className="w-20 h-20 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Database className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-xl font-extrabold mb-2 text-neutral-900">No Historical Data</h3>
          <p className="text-neutral-500 max-w-md mx-auto text-sm leading-relaxed">
            System cache is currently empty. Execute a new target analysis in the Terminal Node to populate the data logs.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6 font-[family-name:var(--font-inter)] animate-in fade-in duration-500">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <h2 className="text-xl font-extrabold flex items-center gap-3 text-neutral-900">
          <HistoryIcon className="w-5 h-5 text-emerald-600" />
          Historical Data Logs
        </h2>
        <Badge className="bg-emerald-100 text-emerald-700 border-none font-[family-name:var(--font-jetbrains-mono)] text-xs uppercase tracking-wider px-3 py-1">
          {history.length} Records
        </Badge>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-4 pr-4">
          {history.map((item) => {
            const DecisionIcon = item.result.finalDecision.decision === "BUY"
              ? TrendingUp
              : item.result.finalDecision.decision === "SELL"
              ? TrendingDown
              : Minus

            return (
              <Card
                key={item.id}
                className="cursor-pointer border-neutral-200 bg-white shadow-sm hover:shadow-md hover:border-emerald-300 transition-all group"
                onClick={() => onSelect(item)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="text-center w-24">
                        <p className="text-3xl font-bold font-[family-name:var(--font-jetbrains-mono)] text-neutral-900 tracking-tight group-hover:text-emerald-600 transition-colors">
                          {item.result.symbol}
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 font-[family-name:var(--font-jetbrains-mono)] mt-1">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="h-10 w-px bg-neutral-200" />
                      
                      <div className="flex flex-col gap-1.5">
                        <Badge className={cn("gap-1 w-fit font-bold font-[family-name:var(--font-jetbrains-mono)]", getDecisionColor(item.result.finalDecision.decision))}>
                          <DecisionIcon className="w-3.5 h-3.5" />
                          {item.result.finalDecision.decision}
                        </Badge>
                        <p className="text-xs font-bold text-neutral-500 font-[family-name:var(--font-jetbrains-mono)] uppercase tracking-wider">
                          Confidence: <span className="text-neutral-900">{item.result.finalDecision.confidence}%</span>
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
                      className="text-neutral-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
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