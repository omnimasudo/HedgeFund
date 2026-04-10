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
  const [isLoading, setIsLoading] = useState(true)
  const [isFading, setIsFading] = useState(false)
  const [showContent, setShowContent] = useState(false)

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

    // Simulate loading time for finance vibes
    setTimeout(() => {
      setIsFading(true)
      setTimeout(() => {
        setIsLoading(false)
        setTimeout(() => setShowContent(true), 200) // Small delay before showing content
      }, 800) // Fade out duration
    }, 3000)
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
    <>
      {isLoading && (
        <div className={`fixed inset-0 z-50 bg-neutral-900 flex items-center justify-center transition-opacity duration-800 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
          <div className="text-center space-y-8">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-transparent border-t-teal-400 rounded-full animate-spin"></div>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-inter)]">Initializing Wanda Core</h2>
              <div className="text-emerald-400 font-[family-name:var(--font-jetbrains-mono)] text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span>Loading market data streams...</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <span>Calibrating AI models...</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <span>Establishing secure connections...</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                  <span>System ready for analysis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex min-h-screen bg-[#FDFDFD] font-[family-name:var(--font-inter)] text-neutral-900 selection:bg-emerald-200">
        {showContent && (
          <div className="animate-in slide-in-from-left-4 duration-700 fill-mode-forwards">
            <Sidebar
              activeView={activeView}
              onViewChange={setActiveView}
              persona={persona}
              onPersonaChange={setPersona}
            />
          </div>
        )}
        
        <main className="flex-1 p-8 overflow-x-hidden overflow-y-auto">
          <div className="max-w-7xl mx-auto h-full">
            
            {/* ANIMASI TRANSISI: Kita menggunakan Tailwind 'animate-in fade-in slide-in-from-bottom-4 duration-500' 
              agar setiap kali tab berganti, kontennya seolah muncul perlahan dari bawah ke atas.
            */}

            {activeView === "dashboard" && showContent && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards">
                <DashboardView history={formattedDashboardHistory} />
              </div>
            )}

            {/* CACHING TRICK: Komponen StockAnalyzer TIDAK di-unmount agar statenya (ticker, loading, result)
              tetap terjaga. Kita hanya mengganti class antara 'block' dan 'hidden'.
              Animasi CSS akan tetap berjalan saat display berubah dari hidden ke block.
            */}
            <div className={activeView === "analyze" && showContent ? "block animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards" : "hidden"}>
              <StockAnalyzer persona={persona} apiKey={apiKey} />
            </div>

            {activeView === "history" && showContent && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards">
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
    </>
  )
}