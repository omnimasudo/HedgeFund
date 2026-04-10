"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/Sidebar"
import { DashboardView } from "@/components/DashboardView"
import { StockAnalyzer } from "@/components/StockAnalyzer"
import { Settings } from "@/components/Settings"
import { AnalysisHistory, PersonaType } from "@/types"
import { Terminal } from "lucide-react"
import History from "@/components/History"

export default function DashboardPage() {
  const [activeView, setActiveView] = useState("dashboard")
  const [persona, setPersona] = useState<PersonaType>("balanced")
  const [apiKey, setApiKey] = useState("")
  const [history, setHistory] = useState<AnalysisHistory[]>([])
  
  // State untuk Booting Screen
  const [isBooting, setIsBooting] = useState(true)
  const [bootLog, setBootLog] = useState<string[]>([])

  // Load dari localStorage
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

  // Efek Booting Screen (Terminal Vibes) - FIX ERROR UNDEFINED
  useEffect(() => {
    const sequence = [
      "WANDA_OS [Version 1.0.4.2]",
      "Bypassing standard latency protocols: OK",
      "Loading Neural Swarm models...",
      "Authenticating credentials...",
      "Access Granted. Initializing UI..."
    ];
    
    let currentIndex = 0;
    
    const logInterval = setInterval(() => {
      // Pastikan index tidak melebihi panjang array
      if (currentIndex < sequence.length) {
        const currentText = sequence[currentIndex];
        // Pastikan currentText ada (tidak undefined) sebelum di-push ke array
        if (currentText) {
          setBootLog(prev => [...prev, currentText]);
        }
        currentIndex++;
      } else {
        clearInterval(logInterval); // Bersihkan interval jika sudah selesai
      }
    }, 400); 

    const finishTimeout = setTimeout(() => {
      setIsBooting(false);
    }, 3200); 

    return () => {
      clearInterval(logInterval);
      clearTimeout(finishTimeout);
    };
  }, []);

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

  const formattedDashboardHistory = history.map((h) => ({
    id: h.id,
    symbol: h.symbol,
    decision: h.result.finalDecision.decision,
    timestamp: h.timestamp,
  }))

  // ==========================================
  // LOADING RENDER (BOOT SCREEN)
  // ==========================================
  if (isBooting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 font-[family-name:var(--font-jetbrains-mono)] overflow-hidden selection:bg-emerald-500/30 animate-in fade-in duration-1000">
        
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-lg p-8 border border-neutral-800 bg-neutral-900/50 rounded-2xl shadow-2xl backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-800">
             <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-emerald-400" />
             </div>
             <div>
               <h2 className="text-emerald-500 font-bold tracking-widest text-sm uppercase">System Boot</h2>
               <p className="text-neutral-500 text-xs">Auth Protocol V2</p>
             </div>
          </div>

          <div className="space-y-2 h-40 flex flex-col justify-end">
            {bootLog.map((log, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-neutral-300 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <span className="text-emerald-500">{">"}</span>
                {/* TAMBAHAN ?: log?.includes mencegah error jika log kebetulan undefined */}
                <span className={index === bootLog.length - 1 && log?.includes("Access Granted") ? "text-emerald-400 font-bold" : ""}>
                  {log}
                </span>
              </div>
            ))}
            {/* Blinking Cursor */}
            <div className="flex items-center gap-2 text-sm text-emerald-500 animate-pulse mt-1">
              <span>{">"}</span>
              <span className="w-2 h-4 bg-emerald-500 block"></span>
            </div>
          </div>

          {/* Progress Bar Mock */}
          <div className="mt-8 w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
             <div className="h-full bg-emerald-500 rounded-full transition-all duration-[2800ms] ease-out w-full" style={{ width: bootLog.length > 0 ? '100%' : '0%' }}></div>
          </div>
        </div>
      </div>
    )
  }

  // ==========================================
  // DASHBOARD RENDER
  // ==========================================
  return (
    <div className="flex min-h-screen bg-[#FDFDFD] font-[family-name:var(--font-inter)] text-neutral-900 selection:bg-emerald-200 animate-in fade-in duration-1000">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        persona={persona}
        onPersonaChange={setPersona}
      />
      
      <main className="flex-1 p-8 overflow-x-hidden overflow-y-auto">
        <div className="max-w-7xl mx-auto h-full">
          
          {activeView === "dashboard" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards">
              <DashboardView history={formattedDashboardHistory} />
            </div>
          )}

          <div className={activeView === "analyze" ? "block animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards" : "hidden"}>
            <StockAnalyzer persona={persona} apiKey={apiKey} />
          </div>

          {activeView === "history" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards">
              <History
                
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