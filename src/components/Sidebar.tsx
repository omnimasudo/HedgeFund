"use client"

import Image from "next/image"
import { LayoutDashboard, History, Settings, Terminal, Activity } from "lucide-react"
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
  { id: "dashboard", label: "System Overview", icon: LayoutDashboard },
  { id: "analyze", label: "Wanda Core", icon: Terminal },
  { id: "history", label: "Data Logs", icon: History },
  { id: "settings", label: "Configuration", icon: Settings },
]

export function Sidebar({ activeView, onViewChange, persona, onPersonaChange }: SidebarProps) {
  return (
    // FIX SIDEBAR: Tambahkan sticky dan top-0 agar tidak ikut ter-scroll
    <aside className="w-64 border-r border-neutral-200 bg-[#FDFDFD] flex flex-col h-screen sticky top-0 z-20">
      {/* Logo Area */}
      <div className="p-6 border-b border-neutral-200/60 bg-white">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.15)] border border-emerald-500/20 bg-neutral-900">
            <Image 
              src="/wanda-hero.jpeg" 
              alt="Wanda AI" 
              fill
              sizes="44px" // FIX WARNING NEXT.JS
              className="object-cover object-top opacity-90 scale-110" 
            />
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight text-neutral-900">Wanda AI</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 font-[family-name:var(--font-jetbrains-mono)]">Core System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm"
                      : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-emerald-600" : "text-neutral-400")} />
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Persona Selector */}
      <div className="p-4 border-t border-neutral-200/60 bg-white">
        <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-2">
          <Terminal className="w-3 h-3" /> Processing Model
        </label>
        <Select value={persona} onValueChange={(v) => onPersonaChange(v as PersonaType)}>
          <SelectTrigger className="w-full bg-neutral-50 border-neutral-200 text-sm font-semibold focus:ring-emerald-500">
            <SelectValue placeholder="Select logic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="conservative">Conservative (Low Risk)</SelectItem>
            <SelectItem value="balanced">Balanced (Standard)</SelectItem>
            <SelectItem value="aggressive">Aggressive (High Yield)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-200/60 bg-neutral-50">
        <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 font-[family-name:var(--font-jetbrains-mono)]">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          Node Active
        </div>
      </div>
    </aside>
  )
}