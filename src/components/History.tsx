"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Struktur data diperbarui dengan format angka terpisah dan tambahan logoPath
interface StockData {
  symbol: string;
  name: string;
  exchange: string;
  sector: string;
  industry: string;
  marketCapValue: number;
  marketCapUnit: string;
  peRatio: number;
  pegRatio: number;
  logoPath: string; // Path logo lokal di public/logos/
}

// Data awal statis dengan path logo lokal
const INITIAL_STOCKS: StockData[] = [
  { symbol: "NVDA", name: "NVIDIA", exchange: "NASDAQ", sector: "Technology", industry: "Semiconductors & Se...", marketCapValue: 4.47, marketCapUnit: "T", peRatio: 37.5, pegRatio: 0.54, logoPath: "/logos/NVDA.png" },
  { symbol: "GOOGL", name: "Alphabet A", exchange: "NASDAQ", sector: "Technology", industry: "Software & IT Services", marketCapValue: 3.84, marketCapUnit: "T", peRatio: 29.5, pegRatio: 0.79, logoPath: "/logos/GOOGL.png" },
  { symbol: "AAPL", name: "Apple", exchange: "NASDAQ", sector: "Technology", industry: "Computers, Phones & ...", marketCapValue: 3.82, marketCapUnit: "T", peRatio: 33.0, pegRatio: 1.25, logoPath: "/logos/AAPL.png" },
  { symbol: "MSFT", name: "Microsoft", exchange: "NASDAQ", sector: "Technology", industry: "Software & IT Services", marketCapValue: 2.77, marketCapUnit: "T", peRatio: 23.2, pegRatio: 0.81, logoPath: "/logos/MSFT.png" },
  { symbol: "AMZN", name: "Amazon.com", exchange: "NASDAQ", sector: "Consumer Cyclicals", industry: "Diversified Retail", marketCapValue: 2.51, marketCapUnit: "T", peRatio: 32.4, pegRatio: 0.98, logoPath: "/logos/AMZN.png" },
  { symbol: "AVGO", name: "Broadcom", exchange: "NASDAQ", sector: "Technology", industry: "Semiconductors & Se...", marketCapValue: 1.68, marketCapUnit: "T", peRatio: 69.2, pegRatio: 0.41, logoPath: "/logos/AVGO.png" },
  { symbol: "META", name: "Meta Platforms", exchange: "NASDAQ", sector: "Technology", industry: "Software & IT Services", marketCapValue: 1.59, marketCapUnit: "T", peRatio: 26.8, pegRatio: -15.5, logoPath: "/logos/META.png" },
  { symbol: "TSLA", name: "Tesla", exchange: "NASDAQ", sector: "Consumer Cyclicals", industry: "Automobiles & Auto P...", marketCapValue: 1.30, marketCapUnit: "T", peRatio: 320.0, pegRatio: -7.58, logoPath: "/logos/TSLA.png" },
  { symbol: "BRK-A", name: "Berkshire Hathaway A", exchange: "NYSE", sector: "Consumer Non-Cyclic...", industry: "Consumer Goods Con...", marketCapValue: 1.05, marketCapUnit: "T", peRatio: 15.7, pegRatio: -0.62, logoPath: "/logos/BRK-A.png" },
  { symbol: "WMT", name: "Walmart", exchange: "NASDAQ", sector: "Consumer Non-Cyclic...", industry: "Food & Drug Retailing", marketCapValue: 1.03, marketCapUnit: "T", peRatio: 47.3, pegRatio: 3.45, logoPath: "/logos/WMT.png" },
];

export default function History() {
  const [stocks, setStocks] = useState<StockData[]>(INITIAL_STOCKS);
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);

  // Simulasi Market Live Data (berubah setiap 1.5 detik)
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          // Membuat fluktuasi acak antara -0.2% hingga +0.2%
          const multiplier = 1 + (Math.random() * 0.004 - 0.002);
          const pegChange = Math.random() * 0.02 - 0.01; // Fluktuasi absolut untuk PEG

          return {
            ...stock,
            marketCapValue: stock.marketCapValue * multiplier,
            peRatio: stock.peRatio * multiplier,
            pegRatio: stock.pegRatio + pegChange,
          };
        })
      );
    }, 1500); // 1500ms = 1.5 detik

    return () => clearInterval(interval);
  }, []);

  const toggleSelect = (symbol: string) => {
    setSelectedStocks((prev) =>
      prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : [...prev, symbol]
    );
  };

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-xl font-semibold">Data Logs</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="w-full overflow-auto rounded-md border bg-white">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 w-[40px] px-4 text-left align-middle font-medium text-muted-foreground"></th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Company</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Exchange</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Sector</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Industry</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground whitespace-nowrap">Market Cap</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground whitespace-nowrap">P/E Ratio</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground whitespace-nowrap">PEG Ratio</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {stocks.map((stock, index) => (
                <tr
                  key={stock.symbol}
                  className="border-b transition-colors hover:bg-muted/50"
                >
                  <td className="p-4 align-middle">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 accent-primary cursor-pointer"
                      checked={selectedStocks.includes(stock.symbol)}
                      onChange={() => toggleSelect(stock.symbol)}
                    />
                  </td>
                  <td className="p-4 align-middle font-medium flex items-center gap-3 min-w-[150px]">
                    <span className="text-muted-foreground w-4 text-right pr-2">{index + 100}</span>
                    
                    {/* IMPLEMENTASI LOGO LOKAL */}
                    <div className="h-7 w-7 rounded-full bg-secondary/50 flex items-center justify-center overflow-hidden border">
                      <img
                        src={stock.logoPath}
                        alt={`${stock.name} logo`}
                        className="h-full w-full object-contain bg-white"
                        onError={(e) => {
                          // Fallback jika logo gagal dimuat
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = `<span class="text-[10px] font-bold">${stock.symbol.charAt(0)}</span>`;
                        }}
                      />
                    </div>
                    <span>{stock.symbol}</span>
                  </td>
                  <td className="p-4 align-middle text-muted-foreground font-medium">{stock.name}</td>
                  <td className="p-4 align-middle text-muted-foreground">{stock.exchange}</td>
                  <td className="p-4 align-middle text-muted-foreground">{stock.sector}</td>
                  <td className="p-4 align-middle text-muted-foreground">{stock.industry}</td>
                  
                  {/* Kolom yang berfluktuasi live */}
                  <td className="p-4 align-middle text-right font-semibold transition-all duration-300">
                    ${stock.marketCapValue.toFixed(2)}{stock.marketCapUnit}
                  </td>
                  <td className={`p-4 align-middle text-right font-semibold transition-all duration-300 ${
                      stock.peRatio > 50 ? "text-red-500" : ""
                    }`}
                  >
                    {stock.peRatio.toFixed(1)}x
                  </td>
                  <td className={`p-4 align-middle text-right font-semibold transition-all duration-300 ${
                      stock.pegRatio > 0 && stock.pegRatio < 1 ? "text-green-600" : 
                      stock.pegRatio > 3 || stock.pegRatio < 0 ? "text-red-500" : ""
                    }`}
                  >
                    {stock.pegRatio.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}