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

// Data awal statis dengan 100 stocks dan path logo lokal
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
  { symbol: "LLY", name: "Eli Lilly", exchange: "NYSE", sector: "Healthcare", industry: "Pharmaceuticals", marketCapValue: 0.89, marketCapUnit: "T", peRatio: 85.2, pegRatio: 1.92, logoPath: "/logos/LLY.png" },
  { symbol: "JPM", name: "JPMorgan Chase", exchange: "NYSE", sector: "Financials", industry: "Banks", marketCapValue: 0.87, marketCapUnit: "T", peRatio: 12.1, pegRatio: 2.15, logoPath: "/logos/JPM.png" },
  { symbol: "V", name: "Visa", exchange: "NYSE", sector: "Financials", industry: "Credit Services", marketCapValue: 0.85, marketCapUnit: "T", peRatio: 32.4, pegRatio: 1.68, logoPath: "/logos/V.png" },
  { symbol: "MA", name: "Mastercard", exchange: "NYSE", sector: "Financials", industry: "Credit Services", marketCapValue: 0.83, marketCapUnit: "T", peRatio: 38.6, pegRatio: 2.21, logoPath: "/logos/MA.png" },
  { symbol: "XOM", name: "Exxon Mobil", exchange: "NYSE", sector: "Energy", industry: "Oil & Gas", marketCapValue: 0.79, marketCapUnit: "T", peRatio: 12.8, pegRatio: 1.45, logoPath: "/logos/XOM.png" },
  { symbol: "UNH", name: "UnitedHealth", exchange: "NYSE", sector: "Healthcare", industry: "Health Insurance", marketCapValue: 0.75, marketCapUnit: "T", peRatio: 23.5, pegRatio: 1.82, logoPath: "/logos/UNH.png" },
  { symbol: "JNJ", name: "Johnson & Johnson", exchange: "NYSE", sector: "Healthcare", industry: "Pharmaceuticals", marketCapValue: 0.72, marketCapUnit: "T", peRatio: 21.3, pegRatio: 3.12, logoPath: "/logos/JNJ.png" },
  { symbol: "PG", name: "Procter & Gamble", exchange: "NYSE", sector: "Consumer Non-Cyclic...", industry: "Household Products", marketCapValue: 0.68, marketCapUnit: "T", peRatio: 26.8, pegRatio: 3.45, logoPath: "/logos/PG.png" },
  { symbol: "HD", name: "Home Depot", exchange: "NYSE", sector: "Consumer Cyclicals", industry: "Home Improvement", marketCapValue: 0.65, marketCapUnit: "T", peRatio: 24.2, pegRatio: 2.18, logoPath: "/logos/HD.png" },
  { symbol: "CVX", name: "Chevron", exchange: "NYSE", sector: "Energy", industry: "Oil & Gas", marketCapValue: 0.62, marketCapUnit: "T", peRatio: 14.5, pegRatio: 1.78, logoPath: "/logos/CVX.png" },
  { symbol: "ABBV", name: "AbbVie", exchange: "NYSE", sector: "Healthcare", industry: "Pharmaceuticals", marketCapValue: 0.58, marketCapUnit: "T", peRatio: 52.3, pegRatio: -2.45, logoPath: "/logos/ABBV.png" },
  { symbol: "MRK", name: "Merck", exchange: "NYSE", sector: "Healthcare", industry: "Pharmaceuticals", marketCapValue: 0.54, marketCapUnit: "T", peRatio: 17.8, pegRatio: 1.92, logoPath: "/logos/MRK.png" },
  { symbol: "PFE", name: "Pfizer", exchange: "NYSE", sector: "Healthcare", industry: "Pharmaceuticals", marketCapValue: 0.51, marketCapUnit: "T", peRatio: 28.5, pegRatio: -1.85, logoPath: "/logos/PFE.png" },
  { symbol: "KO", name: "Coca-Cola", exchange: "NYSE", sector: "Consumer Non-Cyclic...", industry: "Beverages", marketCapValue: 0.49, marketCapUnit: "T", peRatio: 23.1, pegRatio: 3.78, logoPath: "/logos/KO.png" },
  { symbol: "PEP", name: "PepsiCo", exchange: "NASDAQ", sector: "Consumer Non-Cyclic...", industry: "Beverages", marketCapValue: 0.47, marketCapUnit: "T", peRatio: 25.6, pegRatio: 2.85, logoPath: "/logos/PEP.png" },
  { symbol: "BAC", name: "Bank of America", exchange: "NYSE", sector: "Financials", industry: "Banks", marketCapValue: 0.45, marketCapUnit: "T", peRatio: 11.2, pegRatio: 1.54, logoPath: "/logos/BAC.png" },
  { symbol: "COST", name: "Costco", exchange: "NASDAQ", sector: "Consumer Cyclicals", industry: "Diversified Retail", marketCapValue: 0.43, marketCapUnit: "T", peRatio: 52.8, pegRatio: 4.12, logoPath: "/logos/COST.png" },
  { symbol: "TMO", name: "Thermo Fisher", exchange: "NYSE", sector: "Healthcare", industry: "Life Sciences", marketCapValue: 0.41, marketCapUnit: "T", peRatio: 35.4, pegRatio: 2.68, logoPath: "/logos/TMO.png" },
  { symbol: "MCD", name: "McDonald's", exchange: "NYSE", sector: "Consumer Cyclicals", industry: "Restaurants", marketCapValue: 0.39, marketCapUnit: "T", peRatio: 23.8, pegRatio: 3.24, logoPath: "/logos/MCD.png" },
  { symbol: "CSCO", name: "Cisco", exchange: "NASDAQ", sector: "Technology", industry: "Communications", marketCapValue: 0.37, marketCapUnit: "T", peRatio: 18.5, pegRatio: 2.45, logoPath: "/logos/CSCO.png" },
  { symbol: "ACN", name: "Accenture", exchange: "NYSE", sector: "Technology", industry: "IT Services", marketCapValue: 0.35, marketCapUnit: "T", peRatio: 28.9, pegRatio: 3.15, logoPath: "/logos/ACN.png" },
  { symbol: "ABT", name: "Abbott Labs", exchange: "NYSE", sector: "Healthcare", industry: "Medical Devices", marketCapValue: 0.34, marketCapUnit: "T", peRatio: 31.2, pegRatio: 2.78, logoPath: "/logos/ABT.png" },
  { symbol: "NKE", name: "Nike", exchange: "NYSE", sector: "Consumer Cyclicals", industry: "Apparel", marketCapValue: 0.33, marketCapUnit: "T", peRatio: 29.4, pegRatio: 2.95, logoPath: "/logos/NKE.png" },
  { symbol: "CRM", name: "Salesforce", exchange: "NYSE", sector: "Technology", industry: "Software", marketCapValue: 0.32, marketCapUnit: "T", peRatio: 45.8, pegRatio: 2.42, logoPath: "/logos/CRM.png" },
  { symbol: "DHR", name: "Danaher", exchange: "NYSE", sector: "Healthcare", industry: "Life Sciences", marketCapValue: 0.31, marketCapUnit: "T", peRatio: 38.6, pegRatio: 2.18, logoPath: "/logos/DHR.png" },
  { symbol: "AMD", name: "AMD", exchange: "NASDAQ", sector: "Technology", industry: "Semiconductors", marketCapValue: 0.30, marketCapUnit: "T", peRatio: 48.2, pegRatio: 0.95, logoPath: "/logos/AMD.png" },
  { symbol: "TXN", name: "Texas Instruments", exchange: "NASDAQ", sector: "Technology", industry: "Semiconductors", marketCapValue: 0.29, marketCapUnit: "T", peRatio: 26.8, pegRatio: 2.35, logoPath: "/logos/TXN.png" },
  { symbol: "INTC", name: "Intel", exchange: "NASDAQ", sector: "Technology", industry: "Semiconductors", marketCapValue: 0.28, marketCapUnit: "T", peRatio: 18.5, pegRatio: -1.25, logoPath: "/logos/INTC.png" },
  { symbol: "QCOM", name: "Qualcomm", exchange: "NASDAQ", sector: "Technology", industry: "Semiconductors", marketCapValue: 0.27, marketCapUnit: "T", peRatio: 22.4, pegRatio: 1.85, logoPath: "/logos/QCOM.png" },
  { symbol: "ORCL", name: "Oracle", exchange: "NYSE", sector: "Technology", industry: "Software", marketCapValue: 0.26, marketCapUnit: "T", peRatio: 35.2, pegRatio: 2.68, logoPath: "/logos/ORCL.png" },
  { symbol: "ADBE", name: "Adobe", exchange: "NASDAQ", sector: "Technology", industry: "Software", marketCapValue: 0.25, marketCapUnit: "T", peRatio: 42.8, pegRatio: 2.45, logoPath: "/logos/ADBE.png" },
  { symbol: "NFLX", name: "Netflix", exchange: "NASDAQ", sector: "Communication", industry: "Entertainment", marketCapValue: 0.24, marketCapUnit: "T", peRatio: 45.6, pegRatio: 1.25, logoPath: "/logos/NFLX.png" },
  { symbol: "DIS", name: "Walt Disney", exchange: "NYSE", sector: "Communication", industry: "Entertainment", marketCapValue: 0.23, marketCapUnit: "T", peRatio: 38.5, pegRatio: 1.68, logoPath: "/logos/DIS.png" },
  { symbol: "CMCSA", name: "Comcast", exchange: "NASDAQ", sector: "Communication", industry: "Media", marketCapValue: 0.22, marketCapUnit: "T", peRatio: 11.8, pegRatio: 2.15, logoPath: "/logos/CMCSA.png" },
  { symbol: "VZ", name: "Verizon", exchange: "NYSE", sector: "Communication", industry: "Telecom", marketCapValue: 0.21, marketCapUnit: "T", peRatio: 8.5, pegRatio: 3.45, logoPath: "/logos/VZ.png" },
  { symbol: "T", name: "AT&T", exchange: "NYSE", sector: "Communication", industry: "Telecom", marketCapValue: 0.20, marketCapUnit: "T", peRatio: 7.8, pegRatio: 2.85, logoPath: "/logos/T.png" },
  { symbol: "PYPL", name: "PayPal", exchange: "NASDAQ", sector: "Financials", industry: "FinTech", marketCapValue: 0.19, marketCapUnit: "T", peRatio: 15.2, pegRatio: 0.85, logoPath: "/logos/PYPL.png" },
  { symbol: "IBM", name: "IBM", exchange: "NYSE", sector: "Technology", industry: "IT Services", marketCapValue: 0.18, marketCapUnit: "T", peRatio: 24.8, pegRatio: 2.35, logoPath: "/logos/IBM.png" },
  { symbol: "NOW", name: "ServiceNow", exchange: "NYSE", sector: "Technology", industry: "Software", marketCapValue: 0.17, marketCapUnit: "T", peRatio: 78.5, pegRatio: 3.25, logoPath: "/logos/NOW.png" },
  { symbol: "INTU", name: "Intuit", exchange: "NASDAQ", sector: "Technology", industry: "Software", marketCapValue: 0.16, marketCapUnit: "T", peRatio: 55.8, pegRatio: 3.45, logoPath: "/logos/INTU.png" },
  { symbol: "AMAT", name: "Applied Materials", exchange: "NASDAQ", sector: "Technology", industry: "Semiconductors", marketCapValue: 0.15, marketCapUnit: "T", peRatio: 22.4, pegRatio: 2.18, logoPath: "/logos/AMAT.png" },
  { symbol: "LRCX", name: "Lam Research", exchange: "NASDAQ", sector: "Technology", industry: "Semiconductors", marketCapValue: 0.14, marketCapUnit: "T", peRatio: 24.8, pegRatio: 2.25, logoPath: "/logos/LRCX.png" },
  { symbol: "MU", name: "Micron", exchange: "NASDAQ", sector: "Technology", industry: "Semiconductors", marketCapValue: 0.13, marketCapUnit: "T", peRatio: 18.5, pegRatio: 1.45, logoPath: "/logos/MU.png" },
  { symbol: "BKNG", name: "Booking Holdings", exchange: "NASDAQ", sector: "Consumer Cyclicals", industry: "Travel Services", marketCapValue: 0.12, marketCapUnit: "T", peRatio: 28.5, pegRatio: 1.85, logoPath: "/logos/BKNG.png" },
  { symbol: "UBER", name: "Uber", exchange: "NYSE", sector: "Technology", industry: "Ride Sharing", marketCapValue: 0.11, marketCapUnit: "T", peRatio: 35.8, pegRatio: 1.25, logoPath: "/logos/UBER.png" },
  { symbol: "ADSK", name: "Autodesk", exchange: "NASDAQ", sector: "Technology", industry: "Software", marketCapValue: 0.10, marketCapUnit: "T", peRatio: 52.4, pegRatio: 2.85, logoPath: "/logos/ADSK.png" },
  { symbol: "PANW", name: "Palo Alto Networks", exchange: "NASDAQ", sector: "Technology", industry: "Security", marketCapValue: 0.095, marketCapUnit: "T", peRatio: 58.2, pegRatio: 2.15, logoPath: "/logos/PANW.png" },
  { symbol: "CRWD", name: "CrowdStrike", exchange: "NASDAQ", sector: "Technology", industry: "Security", marketCapValue: 0.09, marketCapUnit: "T", peRatio: 85.4, pegRatio: 3.25, logoPath: "/logos/CRWD.png" },
  { symbol: "SNOW", name: "Snowflake", exchange: "NYSE", sector: "Technology", industry: "Cloud Computing", marketCapValue: 0.085, marketCapUnit: "T", peRatio: -45.8, pegRatio: -0.85, logoPath: "/logos/SNOW.png" },
  { symbol: "ZM", name: "Zoom", exchange: "NASDAQ", sector: "Technology", industry: "Communication", marketCapValue: 0.08, marketCapUnit: "T", peRatio: 25.8, pegRatio: 1.45, logoPath: "/logos/ZM.png" },
  { symbol: "SHOP", name: "Shopify", exchange: "NYSE", sector: "Technology", industry: "E-Commerce", marketCapValue: 0.075, marketCapUnit: "T", peRatio: 68.5, pegRatio: 2.85, logoPath: "/logos/SHOP.png" },
  { symbol: "SQ", name: "Block", exchange: "NYSE", sector: "Financials", industry: "FinTech", marketCapValue: 0.07, marketCapUnit: "T", peRatio: 32.5, pegRatio: 0.95, logoPath: "/logos/SQ.png" },
  { symbol: "SPOT", name: "Spotify", exchange: "NYSE", sector: "Communication", industry: "Entertainment", marketCapValue: 0.065, marketCapUnit: "T", peRatio: 78.5, pegRatio: 2.15, logoPath: "/logos/SPOT.png" },
  { symbol: "DASH", name: "DoorDash", exchange: "NYSE", sector: "Consumer Cyclicals", industry: "Food Delivery", marketCapValue: 0.06, marketCapUnit: "T", peRatio: 45.8, pegRatio: 1.85, logoPath: "/logos/DASH.png" },
  { symbol: "ABNB", name: "Airbnb", exchange: "NASDAQ", sector: "Consumer Cyclicals", industry: "Travel Services", marketCapValue: 0.055, marketCapUnit: "T", peRatio: 38.5, pegRatio: 1.25, logoPath: "/logos/ABNB.png" },
  { symbol: "COIN", name: "Coinbase", exchange: "NASDAQ", sector: "Financials", industry: "Crypto", marketCapValue: 0.05, marketCapUnit: "T", peRatio: 28.5, pegRatio: 0.85, logoPath: "/logos/COIN.png" },
  { symbol: "RBLX", name: "Roblox", exchange: "NYSE", sector: "Communication", industry: "Gaming", marketCapValue: 0.045, marketCapUnit: "T", peRatio: -52.4, pegRatio: -1.25, logoPath: "/logos/RBLX.png" },
  { symbol: "HOOD", name: "Robinhood", exchange: "NASDAQ", sector: "Financials", industry: "FinTech", marketCapValue: 0.04, marketCapUnit: "T", peRatio: 35.8, pegRatio: 1.45, logoPath: "/logos/HOOD.png" },
  { symbol: "U", name: "Unity Software", exchange: "NYSE", sector: "Technology", industry: "Gaming", marketCapValue: 0.035, marketCapUnit: "T", peRatio: -25.8, pegRatio: -0.85, logoPath: "/logos/U.png" },
  { symbol: "DOCU", name: "DocuSign", exchange: "NASDAQ", sector: "Technology", industry: "Software", marketCapValue: 0.03, marketCapUnit: "T", peRatio: 42.5, pegRatio: 1.85, logoPath: "/logos/DOCU.png" },
  { symbol: "TWLO", name: "Twilio", exchange: "NYSE", sector: "Technology", industry: "Communication", marketCapValue: 0.028, marketCapUnit: "T", peRatio: -35.8, pegRatio: -1.25, logoPath: "/logos/TWLO.png" },
  { symbol: "DDOG", name: "Datadog", exchange: "NASDAQ", sector: "Technology", industry: "Cloud Computing", marketCapValue: 0.025, marketCapUnit: "T", peRatio: 78.5, pegRatio: 2.85, logoPath: "/logos/DDOG.png" },
  { symbol: "NET", name: "Cloudflare", exchange: "NYSE", sector: "Technology", industry: "Security", marketCapValue: 0.022, marketCapUnit: "T", peRatio: 85.4, pegRatio: 3.25, logoPath: "/logos/NET.png" },
  { symbol: "HUBS", name: "HubSpot", exchange: "NYSE", sector: "Technology", industry: "Software", marketCapValue: 0.02, marketCapUnit: "T", peRatio: 68.5, pegRatio: 2.45, logoPath: "/logos/HUBS.png" },
  { symbol: "TEAM", name: "Atlassian", exchange: "NASDAQ", sector: "Technology", industry: "Software", marketCapValue: 0.018, marketCapUnit: "T", peRatio: 58.2, pegRatio: 2.15, logoPath: "/logos/TEAM.png" },
  { symbol: "WDAY", name: "Workday", exchange: "NASDAQ", sector: "Technology", industry: "Software", marketCapValue: 0.016, marketCapUnit: "T", peRatio: 45.8, pegRatio: 2.85, logoPath: "/logos/WDAY.png" },
  { symbol: "OKTA", name: "Okta", exchange: "NASDAQ", sector: "Technology", industry: "Security", marketCapValue: 0.015, marketCapUnit: "T", peRatio: 78.5, pegRatio: 3.25, logoPath: "/logos/OKTA.png" },
  { symbol: "ZS", name: "Zscaler", exchange: "NASDAQ", sector: "Technology", industry: "Security", marketCapValue: 0.014, marketCapUnit: "T", peRatio: 85.4, pegRatio: 3.45, logoPath: "/logos/ZS.png" },
  { symbol: "SPLK", name: "Splunk", exchange: "NASDAQ", sector: "Technology", industry: "Software", marketCapValue: 0.013, marketCapUnit: "T", peRatio: 52.4, pegRatio: 2.25, logoPath: "/logos/SPLK.png" },
  { symbol: "MPWR", name: "Monolithic Power", exchange: "NASDAQ", sector: "Technology", industry: "Semiconductors", marketCapValue: 0.012, marketCapUnit: "T", peRatio: 58.5, pegRatio: 2.85, logoPath: "/logos/MPWR.png" },
  { symbol: "ON", name: "ON Semiconductor", exchange: "NASDAQ", sector: "Technology", industry: "Semiconductors", marketCapValue: 0.011, marketCapUnit: "T", peRatio: 22.4, pegRatio: 1.85, logoPath: "/logos/ON.png" },
  { symbol: "GLW", name: "Corning", exchange: "NYSE", sector: "Technology", industry: "Components", marketCapValue: 0.010, marketCapUnit: "T", peRatio: 28.5, pegRatio: 2.15, logoPath: "/logos/GLW.png" },
  { symbol: "APH", name: "Amphenol", exchange: "NYSE", sector: "Technology", industry: "Components", marketCapValue: 0.009, marketCapUnit: "T", peRatio: 38.5, pegRatio: 2.85, logoPath: "/logos/APH.png" },
  { symbol: "TEL", name: "TE Connectivity", exchange: "NYSE", sector: "Technology", industry: "Components", marketCapValue: 0.008, marketCapUnit: "T", peRatio: 24.8, pegRatio: 2.25, logoPath: "/logos/TEL.png" },
  { symbol: "FSLR", name: "First Solar", exchange: "NASDAQ", sector: "Technology", industry: "Solar", marketCapValue: 0.007, marketCapUnit: "T", peRatio: 18.5, pegRatio: 1.45, logoPath: "/logos/FSLR.png" },
  { symbol: "ENPH", name: "Enphase Energy", exchange: "NASDAQ", sector: "Technology", industry: "Solar", marketCapValue: 0.006, marketCapUnit: "T", peRatio: 32.5, pegRatio: 1.85, logoPath: "/logos/ENPH.png" },
  { symbol: "SEDG", name: "SolarEdge", exchange: "NASDAQ", sector: "Technology", industry: "Solar", marketCapValue: 0.005, marketCapUnit: "T", peRatio: 28.5, pegRatio: 1.25, logoPath: "/logos/SEDG.png" },
  { symbol: "RUN", name: "Sunrun", exchange: "NASDAQ", sector: "Technology", industry: "Solar", marketCapValue: 0.004, marketCapUnit: "T", peRatio: 18.5, pegRatio: 0.95, logoPath: "/logos/RUN.png" },
  { symbol: "NEE", name: "NextEra Energy", exchange: "NYSE", sector: "Utilities", industry: "Renewable", marketCapValue: 0.003, marketCapUnit: "T", peRatio: 24.8, pegRatio: 2.45, logoPath: "/logos/NEE.png" },
  { symbol: "DUK", name: "Duke Energy", exchange: "NYSE", sector: "Utilities", industry: "Electric", marketCapValue: 0.002, marketCapUnit: "T", peRatio: 18.5, pegRatio: 2.85, logoPath: "/logos/DUK.png" },
  { symbol: "SO", name: "Southern Company", exchange: "NYSE", sector: "Utilities", industry: "Electric", marketCapValue: 0.001, marketCapUnit: "T", peRatio: 21.2, pegRatio: 2.95, logoPath: "/logos/SO.png" },
  { symbol: "D", name: "Dominion Energy", exchange: "NYSE", sector: "Utilities", industry: "Electric", marketCapValue: 0.0009, marketCapUnit: "T", peRatio: 19.8, pegRatio: 2.45, logoPath: "/logos/D.png" },
  { symbol: "AEP", name: "American Electric", exchange: "NASDAQ", sector: "Utilities", industry: "Electric", marketCapValue: 0.0008, marketCapUnit: "T", peRatio: 17.5, pegRatio: 2.25, logoPath: "/logos/AEP.png" },
  { symbol: "EXC", name: "Exelon", exchange: "NASDAQ", sector: "Utilities", industry: "Electric", marketCapValue: 0.0007, marketCapUnit: "T", peRatio: 16.8, pegRatio: 2.15, logoPath: "/logos/EXC.png" },
  { symbol: "PCG", name: "PG&E", exchange: "NYSE", sector: "Utilities", industry: "Electric", marketCapValue: 0.0006, marketCapUnit: "T", peRatio: 15.2, pegRatio: 1.85, logoPath: "/logos/PCG.png" },
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
