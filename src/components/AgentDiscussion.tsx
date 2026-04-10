"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Cpu, Network, TerminalSquare, Loader2, Sparkles, User } from "lucide-react";
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
  { id: "Warren Buffett", role: "Oracle of Omaha" }
];

type Message = {
  id: string;
  role: "user" | "agent";
  content: string;
  agentName?: string;
  timestamp: string;
};

// HELPER: Generate Unique Cybertech Colors & Avatars for each Agent
const getAgentStyle = (name: string) => {
  const styles = {
    "Cathie Wood": { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-700", avatar: "bg-purple-600 text-white shadow-purple-500/40" },
    "Warren Buffett": { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-700", avatar: "bg-emerald-600 text-white shadow-emerald-500/40" },
    "Michael Burry": { bg: "bg-rose-500/10", border: "border-rose-500/30", text: "text-rose-700", avatar: "bg-rose-600 text-white shadow-rose-500/40" },
    "Nassim Taleb": { bg: "bg-slate-500/10", border: "border-slate-500/30", text: "text-slate-700", avatar: "bg-slate-800 text-white shadow-slate-500/40" },
    "Bill Ackman": { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-700", avatar: "bg-blue-600 text-white shadow-blue-500/40" },
    "Charlie Munger": { bg: "bg-teal-500/10", border: "border-teal-500/30", text: "text-teal-700", avatar: "bg-teal-600 text-white shadow-teal-500/40" },
    "Aswath Damodaran": { bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-700", avatar: "bg-indigo-600 text-white shadow-indigo-500/40" },
    "Stanley Druckenmiller": { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-700", avatar: "bg-amber-500 text-white shadow-amber-500/40" }
  };
  
  // Default fallback style (Cyan)
  const defaultStyle = { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-700", avatar: "bg-cyan-600 text-white shadow-cyan-500/40" };
  
  return (styles as any)[name] || defaultStyle;
};

// HELPER: Get Initials (e.g., "Warren Buffett" -> "WB")
const getInitials = (name: string) => {
  return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
};

export default function AgentDiscussion() {
  const [selectedAgents, setSelectedAgents] = useState<string[]>(["Warren Buffett", "Cathie Wood", "Michael Burry"]);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleAgent = (agentId: string) => {
    setSelectedAgents((prev) =>
      prev.includes(agentId) ? prev.filter((a) => a !== agentId) : [...prev, agentId]
    );
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!prompt.trim() || selectedAgents.length === 0) return;

    const timeString = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
    const userMessage: Message = { id: Date.now().toString(), role: "user", content: prompt, timestamp: timeString };

    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/discussion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage.content, agents: selectedAgents }),
      });

      const data = await res.json();

      if (data.responses) {
        const agentMessages: Message[] = data.responses.map((r: any, idx: number) => ({
          id: `agent-${Date.now()}-${idx}`,
          role: "agent",
          agentName: r.agentName,
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
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 flex items-center gap-2">
            <Network className="w-6 h-6 text-emerald-500" />
            War <span className="text-emerald-500">Room</span>
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Simulate a high-stakes investment committee meeting with quantitative focus.
          </p>
        </div>
        <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 bg-emerald-500/10 font-[family-name:var(--font-jetbrains-mono)] text-xs py-1 px-3">
          ACTIVE SEATS: {selectedAgents.length}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-[600px] h-full">
        {/* PANEL KIRI: Agent Selection */}
        <Card className="col-span-1 border-neutral-200 shadow-xl shadow-neutral-200/5 bg-white flex flex-col">
          <CardHeader className="border-b border-neutral-100 pb-4 bg-neutral-50/50">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-500" /> Committee Members
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-hidden">
            <ScrollArea className="h-[calc(100vh-320px)] custom-scrollbar">
              <div className="flex flex-col divide-y divide-neutral-100">
                {AGENTS_LIST.map((agent) => {
                  const isActive = selectedAgents.includes(agent.id);
                  const style = getAgentStyle(agent.id);
                  return (
                    <button
                      key={agent.id}
                      onClick={() => toggleAgent(agent.id)}
                      className={cn(
                        "text-left px-4 py-3 transition-all duration-200 group relative overflow-hidden",
                        isActive ? "bg-neutral-50" : "hover:bg-neutral-50/50"
                      )}
                    >
                      {isActive && <div className={`absolute left-0 top-0 bottom-0 w-1 ${style.avatar.split(' ')[0]} shadow-[0_0_10px_rgba(0,0,0,0.2)]`}></div>}
                      <div className="flex justify-between items-center">
                        <div>
                          <p className={cn("text-sm font-semibold transition-colors", isActive ? style.text : "text-neutral-600")}>
                            {agent.id}
                          </p>
                          <p className="text-[10px] font-[family-name:var(--font-jetbrains-mono)] text-neutral-400 mt-0.5 uppercase tracking-wider">
                            {agent.role}
                          </p>
                        </div>
                        <div className={cn("w-2 h-2 rounded-full transition-all", isActive ? `${style.avatar.split(' ')[0]} shadow-sm` : "bg-neutral-200")} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* PANEL KANAN: Meeting Console */}
        <Card className="col-span-1 lg:col-span-3 border-neutral-200 shadow-xl shadow-neutral-200/5 bg-white flex flex-col relative overflow-hidden h-full max-h-[calc(100vh-200px)]">
          <CardHeader className="border-b border-neutral-100 pb-4 bg-white/80 backdrop-blur z-10">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
              <TerminalSquare className="w-4 h-4 text-emerald-500" /> Live Transcript
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-hidden p-0 z-10 flex flex-col bg-neutral-50/50 min-h-0">
            <ScrollArea className="flex-1 p-6 custom-scrollbar">
              <div className="space-y-2">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40 mt-20">
                    <Sparkles className="w-12 h-12 text-emerald-500 mb-4" />
                    <p className="font-[family-name:var(--font-jetbrains-mono)] text-sm font-semibold text-neutral-600">COMMITTEE_IDLE</p>
                    <p className="text-xs text-neutral-400 mt-2 max-w-sm">
                      Present a thesis or asset to the selected committee members to begin the debate.
                    </p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isUser = msg.role === "user";
                    const style = isUser ? null : getAgentStyle(msg.agentName || "");

                    return (
                      <div key={msg.id} className={cn("flex w-full gap-4", isUser ? "flex-row-reverse" : "flex-row")}>
                        
                        {/* PROFILE AVATAR SIDEBAR */}
                        <div className="flex-shrink-0">
                          {isUser ? (
                            <div className="w-10 h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center shadow-lg shadow-neutral-900/20">
                              <User className="w-5 h-5" />
                            </div>
                          ) : (
                            <div className={cn(
                              "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shadow-lg border border-white/20 font-[family-name:var(--font-jetbrains-mono)]", 
                              style?.avatar
                            )}>
                              {getInitials(msg.agentName || "Agent")}
                            </div>
                          )}
                        </div>

                        {/* CHAT BUBBLE CONTENT */}
                        <div className={cn(
                          "flex flex-col max-w-[80%]",
                          isUser ? "items-end" : "items-start"
                        )}>
                          {/* Name & Timestamp */}
                          <div className={cn("flex items-center gap-2 mb-1", isUser && "flex-row-reverse")}>
                            <span className={cn("text-xs font-bold uppercase tracking-wider", isUser ? "text-neutral-800" : style?.text)}>
                              {isUser ? "You (Chairman)" : msg.agentName}
                            </span>
                            <span className="text-[10px] font-[family-name:var(--font-jetbrains-mono)] text-neutral-400">
                              {msg.timestamp}
                            </span>
                          </div>

                          {/* The Bubble */}
                          <div className={cn(
                            "p-3 rounded-xl shadow-sm border",
                            isUser 
                              ? "bg-white border-neutral-200 text-neutral-800 rounded-tr-none" 
                              : cn(style?.bg, style?.border, "text-neutral-800 rounded-tl-none")
                          )}>
                            <div className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
                              {/* Injecting a slight styling hack so numbers stand out. 
                                  In production, you could parse regex \d+%\w to bold it, 
                                  but plain text from LLM with good prompt works well too. */}
                              {msg.content}
                            </div>
                          </div>
                        </div>

                      </div>
                    );
                  })
                )}
                
                {isLoading && (
                  <div className="flex w-full gap-4 flex-row animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="flex-shrink-0 mt-1 w-10 h-10 rounded-lg bg-neutral-200 flex items-center justify-center animate-pulse">
                      <Loader2 className="w-4 h-4 text-neutral-400 animate-spin" />
                    </div>
                    <div className="flex flex-col max-w-[80%] items-start">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">System Processing</span>
                      </div>
                      <div className="p-4 rounded-xl border border-neutral-200 bg-white rounded-tl-none shadow-sm flex items-center gap-3">
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></div>
                        </div>
                        <span className="text-xs font-[family-name:var(--font-jetbrains-mono)] text-neutral-500">
                          Extracting quant models...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>

            {/* Input Terminal */}
            <div className="p-4 bg-white border-t border-neutral-100 z-10">
              <div className="relative flex items-center shadow-sm rounded-lg overflow-hidden border border-neutral-200 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
                <div className="pl-4 pr-2 text-neutral-400 font-[family-name:var(--font-jetbrains-mono)] text-sm">
                  {">"}
                </div>
                <Input
                  placeholder="Present thesis to the room (e.g. 'What is the downside risk of AAPL at 30x PE?')..."
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}