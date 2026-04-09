"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/Sidebar"
import { DashboardView } from "@/components/DashboardView"
import { StockAnalyzer } from "@/components/StockAnalyzer"
import { History } from "@/components/History"
import { Settings } from "@/components/Settings"
import { AnalysisHistory, PersonaType } from "@/types"

export default function Home() {
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

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <DashboardView
            history={history.map((h) => ({
              id: h.id,
              symbol: h.symbol,
              decision: h.result.finalDecision.decision,
              timestamp: h.timestamp,
            }))}
          />
        )
      case "analyze":
        return <StockAnalyzer persona={persona} apiKey={apiKey} />
      case "history":
        return (
          <History
            history={history}
            onSelect={(item) => {
              // Could expand to show details
              console.log("Selected:", item)
            }}
            onDelete={handleDeleteHistory}
          />
        )
      case "settings":
        return <Settings apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />
      default:
        return <DashboardView history={[]} />
    }
  }

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        persona={persona}
        onPersonaChange={setPersona}
      />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}
