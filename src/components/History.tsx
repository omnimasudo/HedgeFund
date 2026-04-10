"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Struktur data yang sama persis dengan tabel
interface StockData {
  symbol: string;
  name: string;
  exchange: string;
  sector: string;
  industry: string;
  marketCap: string; // Langsung menggunakan string format T/B
  peRatio: number;
  pegRatio: number;
}

// Data statis yang disalin persis dari gambar referensi
const MOCK_STOCKS: StockData[] = [
  { symbol: "NVDA", name: "NVIDIA", exchange: "NASDAQ", sector: "Technology", industry: "Semiconductors & Se...", marketCap: "$4.47T", peRatio: 37.5, pegRatio: 0.54 },
  { symbol: "GOOGL", name: "Alphabet A", exchange: "NASDAQ", sector: "Technology", industry: "Software & IT Services", marketCap: "$3.84T", peRatio: 29.5, pegRatio: 0.79 },
  { symbol: "AAPL", name: "Apple", exchange: "NASDAQ", sector: "Technology", industry: "Computers, Phones & ...", marketCap: "$3.82T", peRatio: 33.0, pegRatio: 1.25 },
  { symbol: "MSFT", name: "Microsoft", exchange: "NASDAQ", sector: "Technology", industry: "Software & IT Services", marketCap: "$2.77T", peRatio: 23.2, pegRatio: 0.81 },
  { symbol: "AMZN", name: "Amazon.com", exchange: "NASDAQ", sector: "Consumer Cyclicals", industry: "Diversified Retail", marketCap: "$2.51T", peRatio: 32.4, pegRatio: 0.98 },
  { symbol: "AVGO", name: "Broadcom", exchange: "NASDAQ", sector: "Technology", industry: "Semiconductors & Se...", marketCap: "$1.68T", peRatio: 69.2, pegRatio: 0.41 },
  { symbol: "META", name: "Meta Platforms", exchange: "NASDAQ", sector: "Technology", industry: "Software & IT Services", marketCap: "$1.59T", peRatio: 26.8, pegRatio: -15.5 },
  { symbol: "TSLA", name: "Tesla", exchange: "NASDAQ", sector: "Consumer Cyclicals", industry: "Automobiles & Auto P...", marketCap: "$1.30T", peRatio: 320.0, pegRatio: -7.58 },
  { symbol: "BRK-A", name: "Berkshire Hathaway A", exchange: "NYSE", sector: "Consumer Non-Cyclic...", industry: "Consumer Goods Con...", marketCap: "$1.05T", peRatio: 15.7, pegRatio: -0.62 },
  { symbol: "WMT", name: "Walmart", exchange: "NASDAQ", sector: "Consumer Non-Cyclic...", industry: "Food & Drug Retailing", marketCap: "$1.03T", peRatio: 47.3, pegRatio: 3.45 },
];

export default function History() {
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);

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
              {MOCK_STOCKS.map((stock, index) => (
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
                  <td className="p-4 align-middle font-medium flex items-center gap-3 min-w-[120px]">
                    <span className="text-muted-foreground w-4 text-right pr-2">{index + 1}</span>
                    <div className="h-6 w-6 rounded-md bg-secondary/50 flex items-center justify-center text-[10px] font-bold border">
                      {stock.symbol.charAt(0)}
                    </div>
                    <span>{stock.symbol}</span>
                  </td>
                  <td className="p-4 align-middle text-muted-foreground font-medium">{stock.name}</td>
                  <td className="p-4 align-middle text-muted-foreground">{stock.exchange}</td>
                  <td className="p-4 align-middle text-muted-foreground">{stock.sector}</td>
                  <td className="p-4 align-middle text-muted-foreground">{stock.industry}</td>
                  <td className="p-4 align-middle text-right font-semibold">
                    {stock.marketCap}
                  </td>
                  
                  {/* Pewarnaan kustom untuk P/E Ratio (Merah jika sangat tinggi) */}
                  <td className={`p-4 align-middle text-right font-semibold ${
                      stock.peRatio > 50 ? "text-red-500" : ""
                    }`}
                  >
                    {stock.peRatio}x
                  </td>
                  
                  {/* Pewarnaan kustom untuk PEG Ratio (Hijau < 1, Merah > 3) */}
                  <td className={`p-4 align-middle text-right font-semibold ${
                      stock.pegRatio > 0 && stock.pegRatio < 1 ? "text-green-600" : 
                      stock.pegRatio > 3 ? "text-red-500" : ""
                    }`}
                  >
                    {stock.pegRatio}
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