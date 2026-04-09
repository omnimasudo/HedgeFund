"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StockQuote } from "@/types"
import { formatCurrency, getRiskColor } from "@/lib/utils"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface StockChartProps {
  data: StockQuote
}

export function StockChart({ data }: StockChartProps) {
  const priceChange = data.historicalData.length > 1
    ? data.historicalData[data.historicalData.length - 1].price - data.historicalData[0].price
    : 0
  const percentChange = data.historicalData.length > 1
    ? ((priceChange / data.historicalData[0].price) * 100).toFixed(2)
    : "0.00"
  const isPositive = priceChange >= 0

  return (
    <Card className="col-span-2">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">{data.companyName}</CardTitle>
            <p className="text-sm text-neutral-500">{data.symbol}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">${data.currentPrice.toFixed(2)}</p>
            <p className={`text-sm font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {isPositive ? "+" : ""}{priceChange.toFixed(2)} ({percentChange}%)
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Chart */}
        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.historicalData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isPositive ? "#22c55e" : "#ef4444"} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={isPositive ? "#22c55e" : "#ef4444"} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={['dataMin - 5', 'dataMax + 5']}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={isPositive ? "#22c55e" : "#ef4444"}
                strokeWidth={2}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="text-center p-3 rounded-lg bg-neutral-50">
            <p className="text-xs text-neutral-500">P/E Ratio</p>
            <p className="font-semibold">{data.peRatio > 0 ? data.peRatio.toFixed(2) : "N/A"}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-neutral-50">
            <p className="text-xs text-neutral-500">RSI(14)</p>
            <p className="font-semibold">{data.quantitative.rsi14}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-neutral-50">
            <p className="text-xs text-neutral-500">Trend</p>
            <p className={`font-semibold ${data.quantitative.trend === 'Bullish' ? 'text-green-500' : 'text-red-500'}`}>
              {data.quantitative.trend}
            </p>
          </div>
          <div className="text-center p-3 rounded-lg bg-neutral-50">
            <p className="text-xs text-neutral-500">Risk</p>
            <Badge className={getRiskColor(data.quantitative.riskLevel)}>
              {data.quantitative.riskLevel}
            </Badge>
          </div>
        </div>

        {/* Market Cap & Range */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <p className="text-xs text-neutral-500">Market Cap</p>
            <p className="font-medium">{formatCurrency(data.marketCap)}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500">52W Range</p>
            <p className="font-medium">${data.week52Low.toFixed(2)} - ${data.week52High.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500">Volume</p>
            <p className="font-medium">{(data.volume / 1e6).toFixed(2)}M</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
