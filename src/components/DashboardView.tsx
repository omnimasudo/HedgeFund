"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Newspaper, Gauge } from "lucide-react"

// --- 1. SPARKLINE COMPONENT ---
const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  if (!data || data.length === 0) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 100;
  const height = 30;

  const points = data
    .map((val, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <polyline fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  );
};

// --- 2. GAUGE CHART COMPONENT (RED TO GREEN GRADIENT) ---
const GaugeChart = ({ value }: { value: number }) => {
  // Konversi nilai 0-100 menjadi rotasi derajat (-90 hingga 90)
  const rotation = (value / 100) * 180 - 90;
  
  return (
    <div className="relative w-48 h-24 mb-4">
      <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible drop-shadow-sm">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />   {/* Tailwind red-500 */}
            <stop offset="50%" stopColor="#f59e0b" />  {/* Tailwind amber-500 */}
            <stop offset="100%" stopColor="#10b981" /> {/* Tailwind emerald-500 */}
          </linearGradient>
        </defs>
        {/* Background Track */}
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#f5f5f5" strokeWidth="12" strokeLinecap="round" />
        {/* Gradient Arc */}
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="url(#gaugeGradient)" strokeWidth="12" strokeLinecap="round" />
        {/* Needle */}
        <g 
          className="transition-transform duration-1000 ease-out" 
          style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '50px 50px' }}
        >
          <polygon points="48,50 52,50 50,15" fill="#27272a" />
          <circle cx="50" cy="50" r="4" fill="#18181b" />
        </g>
      </svg>
    </div>
  );
};

interface DashboardViewProps {
  history?: { id: string; symbol: string; decision: string; timestamp: Date }[];
}

export function DashboardView({ history }: DashboardViewProps) {
  const [marketData, setMarketData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      // Mengganti BTC dengan AAPL
      const tickers = ["SPY", "QQQ", "AAPL", "NVDA"]; 
      try {
        const responses = await Promise.all(
          tickers.map(t => fetch(`/api/stock?ticker=${t}`).then(res => res.json()))
        );
        
        const formattedData = responses.map(data => {
          if (data.error) return null;
          const firstPrice = data.historicalData[0]?.price || data.currentPrice;
          const changePct = ((data.currentPrice - firstPrice) / firstPrice) * 100;
          
          return {
            id: data.symbol,
            name: data.companyName,
            price: `$${data.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            change: changePct,
            isPositive: changePct >= 0,
            history: data.historicalData.map((d: any) => d.price),
            news: data.news
          };
        }).filter(Boolean);

        setMarketData(formattedData);
      } catch (error) {
        console.error("Gagal mengambil data market", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  const recentNews = marketData.length > 0 ? marketData[0].news : [];

  return (
    <div className="space-y-6 font-[family-name:var(--font-inter)]">
      {/* Welcome Banner */}
      <Card className="bg-white text-neutral-900 border-neutral-200 relative overflow-hidden shadow-xl shadow-neutral-200/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none"></div>
        <CardContent className="py-10 relative z-10">
          <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-600 bg-emerald-500/10 font-[family-name:var(--font-jetbrains-mono)] text-xs">
            STATUS: ONLINE
          </Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">Wanda <span className="text-emerald-500">Core Terminal</span></h1>
          <p className="text-neutral-600 max-w-xl text-lg leading-relaxed">
            Institutional-grade quantitative analysis. Deploying multi-agent neural swarms to parse global market datasets in real-time.
          </p>
        </CardContent>
      </Card>

      {/* REPLACEMENT 1: Market Ticker Cards */}
      <div className="flex flex-wrap gap-4">
        {isLoading ? (
          <div className="text-sm text-neutral-500 animate-pulse w-full text-center py-4">Establishing API Tunnel to Market Data...</div>
        ) : (
          marketData.map((coin) => {
            const colorClass = coin.isPositive ? "text-emerald-500" : "text-rose-500";
            const strokeColor = coin.isPositive ? "#10b981" : "#f43f5e";

            return (
              // Mengubah border menjadi lebih solid hijau
              <Card key={coin.id} className="flex min-w-[240px] flex-1 items-center justify-between p-4 shadow-sm border-emerald-500 bg-white hover:border-emerald-600 transition-colors">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-neutral-900">{coin.id}</span>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-neutral-900 font-[family-name:var(--font-jetbrains-mono)]">{coin.price}</div>
                    <div className={`flex items-center text-sm font-medium ${colorClass}`}>
                      {coin.isPositive ? <TrendingUp className="mr-1 h-3.5 w-3.5" /> : <TrendingDown className="mr-1 h-3.5 w-3.5" />}
                      {Math.abs(coin.change).toFixed(2)}%
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex items-center justify-center">
                  <Sparkline data={coin.history} color={strokeColor} />
                </div>
              </Card>
            );
          })
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* REPLACEMENT 2: Fear and Greed Index */}
        {/* Mengubah border menjadi lebih solid hijau */}
        <Card className="border-emerald-500 shadow-sm bg-white md:col-span-1 flex flex-col hover:border-emerald-600 transition-colors">
          <CardHeader className="border-b border-neutral-100 pb-4">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Gauge className="w-5 h-5 text-emerald-500" /> Fear & Greed Index
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8 flex-1 flex flex-col items-center justify-center relative">
             {/* Menggunakan komponen Gauge SVG yang baru */}
             <GaugeChart value={62} />
             
             <div className="text-center">
                <h3 className="text-3xl font-extrabold text-emerald-500">62</h3>
                <p className="text-sm font-bold text-neutral-600 uppercase tracking-wider">Greed</p>
                <p className="text-xs text-neutral-400 mt-2">Market Sentiment Indicator</p>
             </div>
          </CardContent>
        </Card>

        {/* REPLACEMENT 3: Recent News */}
        {/* Mengubah border menjadi lebih solid hijau */}
        <Card className="border-emerald-500 shadow-sm bg-white md:col-span-2 flex flex-col hover:border-emerald-600 transition-colors">
          <CardHeader className="border-b border-neutral-100 pb-4">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-emerald-500" /> Recent Market News
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="divide-y divide-neutral-100 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {isLoading ? (
                <div className="py-8 text-center text-sm text-neutral-500 animate-pulse">Scanning global news networks...</div>
              ) : recentNews.length > 0 ? (
                recentNews.map((article: any, index: number) => (
                  <a 
                    key={index} 
                    href={article.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block py-4 group hover:bg-emerald-50/50 transition-colors -mx-6 px-6"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">{article.publisher}</span>
                      <h4 className="font-medium text-neutral-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                    </div>
                  </a>
                ))
              ) : (
                <div className="py-8 text-center text-sm text-neutral-500">No recent news found.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}