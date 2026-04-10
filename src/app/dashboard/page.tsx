"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/Sidebar"
import { DashboardView } from "@/components/DashboardView"
import { StockAnalyzer } from "@/components/StockAnalyzer"
import { History } from "@/components/History"
import { Settings } from "@/components/Settings"
import { AnalysisHistory, PersonaType } from "@/types"

export default function DashboardPage() {
  const [activeView, setActiveView] = useState("dashboard")
  const [persona, setPersona] = useState<PersonaType>("balanced")
  const [apiKey, setApiKey] = useState("")
  const [history, setHistory] = useState<AnalysisHistory[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("openrouter_api_key")
    const savedHistory = localStorage.getItem("analysis_history")
    const savedPersona = localStorage.getItem("ai_persona") as PersonaType

    if (savedApiKey) setApiKey(savedApiKey)
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory)
        setHistory(parsed.map((h: any) => ({
          ...h,
          timestamp: new Date(h.timestamp),
          result: {
            ...h.result,
            timestamp: new Date(h.result.timestamp),
          },
        })))
      } catch (e) {
        console.error("Failed to parse history:", e)
      }
    }
    if (savedPersona) setPersona(savedPersona)
  }, [])

  // Save to localStorage
  const handleApiKeyChange = (key: string) => {
    setApiKey(key)
    localStorage.setItem("openrouter_api_key", key)
  }

  const handleHistoryUpdate = (newHistory: AnalysisHistory[]) => {
    setHistory(newHistory)
    localStorage.setItem("analysis_history", JSON.stringify(newHistory))
  }

  const handleDeleteHistory = (id: string) => {
    const newHistory = history.filter((h) => h.id !== id)
    handleHistoryUpdate(newHistory)
  }

  // Pre-format history props for DashboardView
  const formattedDashboardHistory = history.map((h) => ({
    id: h.id,
    symbol: h.symbol,
    decision: h.result.finalDecision.decision,
    timestamp: h.timestamp,
  }))

  return (
    <div className="flex min-h-screen bg-[#FDFDFD] font-[family-name:var(--font-inter)] text-neutral-900 selection:bg-emerald-200">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        persona={persona}
        onPersonaChange={setPersona}
      />
      
      <main className="flex-1 p-8 overflow-x-hidden overflow-y-auto">
        <div className="max-w-7xl mx-auto h-full">
          
          {/* ANIMASI TRANSISI: Kita menggunakan Tailwind 'animate-in fade-in slide-in-from-bottom-4 duration-500' 
            agar setiap kali tab berganti, kontennya seolah muncul perlahan dari bawah ke atas.
          */}

          {activeView === "dashboard" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards">
              <DashboardView history={formattedDashboardHistory} />
            </div>
          )}

          {/* CACHING TRICK: Komponen StockAnalyzer TIDAK di-unmount agar statenya (ticker, loading, result)
            tetap terjaga. Kita hanya mengganti class antara 'block' dan 'hidden'.
            Animasi CSS akan tetap berjalan saat display berubah dari hidden ke block.
          */}
          <div className={activeView === "analyze" ? "block animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards" : "hidden"}>
            <StockAnalyzer persona={persona} apiKey={apiKey} />
          </div>

          {activeView === "history" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards">
              <History
                history={history}
                onSelect={(item) => {
                  console.log("Selected:", item)
                }}
                onDelete={handleDeleteHistory}
              />
            </div>
          )}

          {activeView === "settings" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards">
              <Settings apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />
            </div>
          )}

        </div>
      </main>
    </div>
  )
}