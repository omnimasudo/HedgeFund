"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings as SettingsIcon, Key, Save, Check, ExternalLink, Terminal } from "lucide-react"

interface SettingsProps {
  apiKey: string
  onApiKeyChange: (key: string) => void
}

export function Settings({ apiKey, onApiKeyChange }: SettingsProps) {
  const [tempKey, setTempKey] = useState(apiKey)
  const [saved, setSaved] = useState(false)

  // LOGIKA AMAN
  const handleSave = () => {
    onApiKeyChange(tempKey)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-3xl space-y-6 font-[family-name:var(--font-inter)] animate-in fade-in duration-500">
      <Card className="border-neutral-200 shadow-sm bg-white overflow-hidden">
        <CardHeader className="border-b border-neutral-100 bg-neutral-50/50 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center">
              <SettingsIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-extrabold text-neutral-900">System Configuration</CardTitle>
              <CardDescription className="text-neutral-500 mt-1 font-medium">
                Adjust Wanda AI neural parameters and core API access.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-8 pt-8">
          {/* API Key Configuration */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-emerald-600" />
                <label className="text-sm font-bold text-neutral-900">OpenRouter API Access Key</label>
              </div>
              <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 text-[10px] uppercase font-bold tracking-widest font-[family-name:var(--font-jetbrains-mono)]">
                Authentication Required
              </Badge>
            </div>
            
            <Input
              type="password"
              placeholder="sk-or-v1-..."
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              className="h-12 font-[family-name:var(--font-jetbrains-mono)] text-sm bg-neutral-50 border-neutral-200 focus-visible:ring-emerald-500"
            />
            
            {/* System Notice Box */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
              <Terminal className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-bold text-emerald-900">API Documentation</p>
                <p className="text-emerald-700/80 mt-1 leading-relaxed">
                  The system requires a valid OpenRouter token to initialize the agentic swarm. Obtain your credentials at{" "}
                  <a
                    href="https://openrouter.ai/keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-bold text-emerald-800 hover:text-emerald-900"
                  >
                    openrouter.ai/keys
                  </a>
                </p>
              </div>
            </div>
            
            <Button
              onClick={handleSave}
              className="w-full h-12 gap-2 bg-neutral-900 hover:bg-emerald-600 text-white transition-all font-bold shadow-md hover:shadow-lg hover:shadow-emerald-500/20"
              disabled={!tempKey.trim()}
            >
              {saved ? (
                <>
                  <Check className="w-5 h-5" />
                  Configuration Saved
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Update API Parameters
                </>
              )}
            </Button>
          </div>

          <div className="border-t border-neutral-100 pt-8 mt-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-4">System Identity</h3>
            <div className="p-6 rounded-2xl bg-[#FDFDFD] border border-neutral-200">
              <div className="space-y-3 text-sm text-neutral-600 leading-relaxed">
                <p>
                  <strong className="text-neutral-900">Wanda AI Core Terminal</strong> bridges the gap between institutional-grade quantitative data and clean, actionable intelligence.
                </p>
                <p>
                  Powered by multi-agent neural swarms, Wanda simultaneously evaluates intrinsic valuation, growth trajectory, live quantitative indicators, and raw global sentiment to execute precision analysis.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}