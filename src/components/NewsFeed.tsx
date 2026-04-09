"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StockQuote } from "@/types"
import { Newspaper, ExternalLink } from "lucide-react"

interface NewsFeedProps {
  news: StockQuote['news']
}

export function NewsFeed({ news }: NewsFeedProps) {
  if (!news || news.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-neutral-500" />
            <CardTitle className="text-base">Recent News</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-500 text-center py-4">
            No recent news available
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-neutral-500" />
            <CardTitle className="text-base">Recent News</CardTitle>
          </div>
          <Badge variant="secondary">{news.length} articles</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {news.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 rounded-lg border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-colors group"
          >
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-900 group-hover:text-neutral-600 line-clamp-2">
                  {item.title}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  {item.publisher}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-1" />
            </div>
          </a>
        ))}
      </CardContent>
    </Card>
  )
}
