"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings as SettingsIcon, Key, Save, Check, ExternalLink } from "lucide-react"

interface SettingsProps {
  apiKey: string
  onApiKeyChange: (key: string) => void
}

export function Settings({ apiKey, onApiKeyChange }: SettingsProps) {
  const [tempKey, setTempKey] = useState(apiKey)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    onApiKeyChange(tempKey)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5" />
            <CardTitle>Settings</CardTitle>
          </div>
          <CardDescription>
            Configure your AI Hedge Fund terminal
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* API Key */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-neutral-500" />
              <label className="text-sm font-medium">OpenRouter API Key</label>
              <Badge variant="secondary" className="ml-auto">Required</Badge>
            </div>
            <Input
              type="password"
              placeholder="sk-or-v1-..."
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
            />
            <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <ExternalLink className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900">Get your API key</p>
                <p className="text-blue-700 mt-1">
                  Visit{" "}
                  <a
                    href="https://openrouter.ai/keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-medium"
                  >
                    openrouter.ai/keys
                  </a>{" "}
                  to get your API key. This is used to power the AI agents.
                </p>
              </div>
            </div>
            <Button
              onClick={handleSave}
              className="w-full gap-2"
              disabled={!tempKey.trim()}
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save API Key
                </>
              )}
            </Button>
          </div>

          <div className="border-t border-neutral-200 pt-6">
            <h3 className="font-medium mb-4">About</h3>
            <div className="space-y-2 text-sm text-neutral-600">
              <p>
                <strong>AI Hedge Fund Terminal</strong> brings institutional-grade
                investment analysis to retail investors.
              </p>
              <p>
                Powered by multi-agent AI systems that combine value investing,
                growth analysis, quantitative modeling, and sentiment tracking.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
