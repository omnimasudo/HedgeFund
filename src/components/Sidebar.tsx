"use client"

import { LayoutDashboard, BarChart3, History, Settings, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { PersonaType } from "@/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SidebarProps {
  activeView: string
  onViewChange: (view: string) => void
  persona: PersonaType
  onPersonaChange: (persona: PersonaType) => void
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "analyze", label: "Analyze", icon: BarChart3 },
  { id: "history", label: "History", icon: History },
  { id: "settings", label: "Settings", icon: Settings },
]

export function Sidebar({ activeView, onViewChange, persona, onPersonaChange }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-neutral-200 bg-white flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg">AI Hedge Fund</h1>
            <p className="text-xs text-neutral-500">Retail Terminal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-neutral-900 text-white"
                      : "text-neutral-600 hover:bg-neutral-100"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Persona Selector */}
      <div className="p-4 border-t border-neutral-200">
        <label className="text-xs font-medium text-neutral-500 mb-2 block">
          AI Persona
        </label>
        <Select value={persona} onValueChange={(v) => onPersonaChange(v as PersonaType)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select persona" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="conservative">Conservative</SelectItem>
            <SelectItem value="balanced">Balanced</SelectItem>
            <SelectItem value="aggressive">Aggressive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-200">
        <p className="text-xs text-neutral-400 text-center">
          Institutional-grade analysis
          <br />
          for retail investors
        </p>
      </div>
    </aside>
  )
}
