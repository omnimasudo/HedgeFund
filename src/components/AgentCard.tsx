"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AgentInsight } from "@/types"
import { cn, getDecisionColor } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus, User, Briefcase, Activity, ShieldAlert, Terminal } from "lucide-react"

interface AgentCardProps {
  agent: AgentInsight
  compact?: boolean
}

const agentIcons: Record<string, React.ReactNode> = {
  value: <Briefcase className="w-4 h-4" />,
  growth: <TrendingUp className="w-4 h-4" />,
  quant: <Activity className="w-4 h-4" />,
  sentiment: <ShieldAlert className="w-4 h-4" />,
}

const agentColors: Record<string, string> = {
  value: "bg-white text-emerald-600 border-emerald-200",
  growth: "bg-white text-emerald-600 border-emerald-200",
  quant: "bg-white text-emerald-600 border-emerald-200",
  sentiment: "bg-white text-emerald-600 border-emerald-200",
}

export function AgentCard({ agent, compact = false }: AgentCardProps) {
  const decisionClass = getDecisionColor(agent.decision)

  const DecisionIcon = agent.decision === "BUY"
    ? TrendingUp
    : agent.decision === "SELL"
    ? TrendingDown
    : Minus

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className={cn(
          "border-l-4 cursor-pointer group hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 bg-white", 
          agentColors[agent.agent]
        )}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={cn("p-2 rounded-lg bg-neutral-50 group-hover:bg-emerald-50 transition-colors border border-neutral-100 group-hover:border-emerald-200", "text-neutral-700 group-hover:text-emerald-600")}>
                  {agentIcons[agent.agent] || <User className="w-4 h-4" />}
                </div>
                <CardTitle className="text-sm font-bold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                  {agent.name}
                </CardTitle>
              </div>
              <Badge className={cn("font-bold shadow-sm", decisionClass)}>
                <DecisionIcon className="w-3 h-3 mr-1" />
                {agent.decision}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-neutral-500 font-semibold uppercase tracking-wider text-[10px]">Confidence Matrix</span>
                  <span className="font-bold font-[family-name:var(--font-jetbrains-mono)]">{agent.confidence}%</span>
                </div>
                <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      agent.decision === "BUY" ? "bg-emerald-500" : agent.decision === "SELL" ? "bg-red-500" : "bg-amber-500"
                    )}
                    style={{ width: `${agent.confidence}%` }}
                  />
                </div>
              </div>

              {!compact && (
                <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                  {agent.reasoning}
                </p>
              )}
            </div>
            
            <div className="mt-4 pt-3 border-t border-neutral-100 text-[10px] text-neutral-400 uppercase tracking-widest font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               Click to open dossier
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      {/* ==========================================
          MODAL / DIALOG CONTENT (WHITE VIBE)
          ========================================== */}
      {/* FIX DIALOG: Diubah menjadi putih dan clean */}
      <DialogContent className="sm:max-w-[600px] bg-white border-neutral-200 text-neutral-900 p-0 overflow-hidden font-[family-name:var(--font-inter)] shadow-2xl">
        
        {/* Header Modal - Light Vibe */}
        <div className="p-6 border-b border-neutral-100 bg-neutral-50 relative overflow-hidden">
           {/* Aksent halus */}
           <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 blur-[40px] rounded-full"></div>
           <DialogHeader>
             <div className="flex items-center justify-between mb-2 relative z-10">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-emerald-600 shadow-sm">
                    {agentIcons[agent.agent] || <User className="w-5 h-5" />}
                 </div>
                 <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 font-[family-name:var(--font-jetbrains-mono)] mb-0.5">Agent Identifier</p>
                    <DialogTitle className="text-xl font-extrabold text-neutral-900">{agent.name}</DialogTitle>
                 </div>
               </div>
               <Badge className={cn("font-bold text-sm px-3 py-1 shadow-sm", decisionClass)}>
                 <DecisionIcon className="w-4 h-4 mr-2" />
                 {agent.decision}
               </Badge>
             </div>
           </DialogHeader>
        </div>

        {/* Body Modal */}
        <div className="p-6 space-y-6 bg-white">
           
           {/* Terminal Stats */}
           <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-sm">
                 <p className="text-xs text-neutral-500 uppercase tracking-wider font-bold mb-1">Confidence Score</p>
                 <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold font-[family-name:var(--font-jetbrains-mono)] text-neutral-900">{agent.confidence}%</span>
                    <span className="text-sm text-emerald-600 font-bold mb-1">HIGH</span>
                 </div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-sm flex flex-col justify-center">
                 <p className="text-xs text-neutral-500 uppercase tracking-wider font-bold mb-2 flex items-center gap-2">
                    <Terminal className="w-3 h-3" /> Execution Node
                 </p>
                 <p className="font-[family-name:var(--font-jetbrains-mono)] text-sm font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md inline-block self-start border border-emerald-100">
                    wanda_node_{agent.agent}_v2.1
                 </p>
              </div>
           </div>

           {/* Log Reasoning */}
           <div>
             <p className="text-xs text-neutral-600 font-bold uppercase tracking-widest mb-3 font-[family-name:var(--font-jetbrains-mono)] flex items-center gap-2">
                <Terminal className="w-3 h-3 text-emerald-500" /> Output Extraction Log
             </p>
             <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200 font-[family-name:var(--font-jetbrains-mono)] text-sm text-neutral-700 leading-relaxed h-[200px] overflow-y-auto custom-scrollbar shadow-inner">
                {agent.reasoning}
             </div>
           </div>
        </div>

      </DialogContent>
    </Dialog>
  )
}