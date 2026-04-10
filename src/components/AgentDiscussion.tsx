"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Cpu, Network, TerminalSquare, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const AGENTS_LIST = [
  { id: "Aswath Damodaran", role: "Valuation Dean" },
  { id: "Ben Graham", role: "Value Godfather" },
  { id: "Bill Ackman", role: "Activist" },
  { id: "Cathie Wood", role: "Growth/Disruption" },
  { id: "Charlie Munger", role: "Quality at Fair Price" },
  { id: "Michael Burry", role: "Deep Value/Contrarian" },
  { id: "Mohnish Pabrai", role: "Dhandho Investor" },
  { id: "Nassim Taleb", role: "Tail Risk/Antifragile" },
  { id: "Peter Lynch", role: "Ten-bagger Hunter" },
  { id: "Phil Fisher", role: "Scuttlebutt Growth" },
  { id: "Rakesh Jhunjhunwala", role: "Big Bull" },
  { id: "Stanley Druckenmiller", role: "Macro Legend" },
  { id: "Warren Buffett", role: "Oracle of Omaha" },
  { id: "Valuation Agent", role: "Intrinsic Calculator" },
  { id: "Sentiment Agent", role: "Market Mood" },
  { id: "Fundamentals Agent", role: "Data Parser" },
  { id: "Technicals Agent", role: "Chart Analyst" },
  { id: "Risk Manager", role: "Exposure Control" },
  { id: "Portfolio Manager", role: "Execution" }
];

type Message = {
  id: string;
  role: "user" | "agent";
  content: string;
  agentName?: string;
  timestamp: string;
};

export default function AgentDiscussion() {
  const [selectedAgents, setSelectedAgents] = useState<string[]>(["Warren Buffett"]);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleAgent = (agentId: string) => {
    setSelectedAgents((prev) =>
      prev.includes(agentId) ? prev.filter((a) => a !== agentId) : [...prev, agentId]
    );
  };

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!prompt.trim() || selectedAgents.length === 0) return;

    const timeString = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: prompt,
      timestamp: timeString
    };

    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setIsLoading(true);

    try {
      // Ubah array agentName menjadi full string sesuai mapping sebelumnya jika diperlukan API, 
      // atau biarkan hanya namanya saja.
      const agentsToFetch = selectedAgents.map(a => `${a} Agent`);

      const res = await fetch("/api/discussion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage.content, agents: agentsToFetch }),
      });

      const data = await res.json();

      if (data.responses) {
        const agentMessages: Message[] = data.responses.map((r: any, idx: number) => ({
          id: `agent-${Date.now()}-${idx}`,
          role: "agent",
          agentName: r.agentName.replace(" Agent", ""), // Bersihkan kata 'Agent' untuk UI
          content: r.content,
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric", second: "numeric" })
        }));
        setMessages((prev) => [...prev, ...agentMessages]);
      }
    } catch (error) {
      console.error("Error fetching agent responses", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 font-[family-name:var(--font-inter)] h-full flex flex-col">
      {/* HEADER BANNERS - Aligned with Dashboard Vibes */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 flex items-center gap-2">
            <Network className="w-6 h-6 text-emerald-500" />
            Neural <span className="text-emerald-500">Council</span>
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Deploy parallel cognitive nodes for multi-perspective market analysis.
          </p>
        </div>
        <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 bg-emerald-500/10 font-[family-name:var(--font-jetbrains-mono)] text-xs py-1 px-3">
          ACTIVE NODES: {selectedAgents.length}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-[600px]">
        {/* PANEL KIRI: Agent Topology Selection */}
        <Card className="col-span-1 border-neutral-200 shadow-xl shadow-neutral-200/5 bg-white flex flex-col">
          <CardHeader className="border-b border-neutral-100 pb-4 bg-neutral-50/50">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-500" /> Available Models
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-hidden">
            <ScrollArea className="h-[calc(100vh-320px)] custom-scrollbar">
              <div className="flex flex-col divide-y divide-neutral-100">
                {AGENTS_LIST.map((agent) => {
                  const isActive = selectedAgents.includes(agent.id);
                  return (
                    <button
                      key={agent.id}
                      onClick={() => toggleAgent(agent.id)}
                      className={cn(
                        "text-left px-4 py-3 transition-all duration-200 group relative overflow-hidden",
                        isActive ? "bg-emerald-50/50" : "hover:bg-neutral-50"
                      )}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                      )}
                      <div className="flex justify-between items-center">
                        <div>
                          <p className={cn(
                            "text-sm font-semibold transition-colors",
                            isActive ? "text-emerald-700" : "text-neutral-700 group-hover:text-neutral-900"
                          )}>
                            {agent.id}
                          </p>
                          <p className="text-[10px] font-[family-name:var(--font-jetbrains-mono)] text-neutral-400 mt-0.5 uppercase tracking-wider">
                            {agent.role}
                          </p>
                        </div>
                        <div className={cn(
                          "w-2 h-2 rounded-full transition-all",
                          isActive ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" : "bg-neutral-200"
                        )} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* PANEL KANAN: Terminal Output */}
        <Card className="col-span-1 lg:col-span-3 border-emerald-500/20 shadow-xl shadow-emerald-500/5 bg-white flex flex-col relative overflow-hidden h-[calc(100vh-200px)]">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>

          <CardHeader className="border-b border-neutral-100 pb-4 bg-white/80 backdrop-blur z-10">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
              <TerminalSquare className="w-4 h-4 text-emerald-500" /> Output Console
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-hidden p-0 z-10 flex flex-col bg-neutral-50/30">
            <ScrollArea className="flex-1 p-6 custom-scrollbar">
              <div className="space-y-6">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40 mt-20">
                    <Sparkles className="w-12 h-12 text-emerald-500 mb-4" />
                    <p className="font-[family-name:var(--font-jetbrains-mono)] text-sm font-semibold text-neutral-600">AWAITING_QUERY</p>
                    <p className="text-xs text-neutral-400 mt-2 max-w-sm">
                      Select nodes from the left panel and input parameters below to generate synthesis.
                    </p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={cn(
                        "p-5 rounded-xl border shadow-sm relative",
                        msg.role === "user" 
                          ? "bg-white border-neutral-200 ml-auto max-w-[85%]" 
                          : "bg-emerald-50/30 border-emerald-100/50 mr-auto max-w-[95%]"
                      )}
                    >
                      {/* Meta Data Top Bar */}
                      <div className="flex justify-between items-center mb-3 pb-2 border-b border-neutral-100/50">
                        <div className="flex items-center gap-2">
                          {msg.role === "agent" ? (
                            <>
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                                {msg.agentName}
                              </span>
                            </>
                          ) : (
                            <>
                              <div className="w-1.5 h-1.5 rounded-full bg-neutral-400"></div>
                              <span className="text-xs font-bold uppercase tracking-wider text-neutral-600">
                                SYSTEM_ADMIN
                              </span>
                            </>
                          )}
                        </div>
                        <span className="text-[10px] font-[family-name:var(--font-jetbrains-mono)] text-neutral-400">
                          [{msg.timestamp}]
                        </span>
                      </div>
                      
                      {/* Content */}
                      <div className={cn(
                        "text-sm leading-relaxed whitespace-pre-wrap",
                        msg.role === "user" ? "text-neutral-700" : "text-neutral-800"
                      )}>
                        {msg.content}
                      </div>
                    </div>
                  ))
                )}
                
                {isLoading && (
                  <div className="p-5 rounded-xl border border-emerald-100 bg-emerald-50/30 mr-auto max-w-[95%] shadow-sm">
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
                      <span className="text-xs font-[family-name:var(--font-jetbrains-mono)] text-emerald-600 uppercase tracking-widest">
                        Nodes Computing Synthesis...
                      </span>
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Input Form Terminal Style */}
            <div className="p-4 bg-white border-t border-neutral-100 z-10">
              <div className="relative flex items-center shadow-sm rounded-lg overflow-hidden border border-neutral-200 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
                <div className="pl-4 pr-2 text-neutral-400 font-[family-name:var(--font-jetbrains-mono)] text-sm">
                  {">"}
                </div>
                <Input
                  placeholder="Input market query or asset ticker..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  disabled={isLoading || selectedAgents.length === 0}
                  className="border-0 shadow-none focus-visible:ring-0 bg-transparent h-12 text-sm font-medium"
                />
                <Button
                  className="absolute right-1.5 h-9 bg-neutral-900 hover:bg-emerald-600 text-white transition-colors px-4"
                  onClick={handleSend}
                  disabled={isLoading || !prompt.trim() || selectedAgents.length === 0}
                >
                  <Send className="w-4 h-4 mr-2" />
                  <span className="text-xs font-bold uppercase tracking-wider">Execute</span>
                </Button>
              </div>
              {selectedAgents.length === 0 && (
                <p className="text-[10px] text-rose-500 mt-2 font-[family-name:var(--font-jetbrains-mono)] uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                  Error: No cognitive nodes selected
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}