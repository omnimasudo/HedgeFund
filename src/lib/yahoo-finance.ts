import { StockQuote } from '@/types';

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

async function getYahooAuth() {
  try {
    const response = await fetch('https://fc.yahoo.com', {
      headers: { 'User-Agent': USER_AGENT },
    });

    const cookies = response.headers.getSetCookie?.() || [];
    const cookieString = cookies.join('; ');

    return { cookie: cookieString, crumb: 'undefined' };
  } catch {
    return { cookie: '', crumb: 'undefined' };
  }
}

export async function fetchQuoteData(ticker: string): Promise<StockQuote | null> {
  try {
    const symbol = ticker.toUpperCase().trim();
    const { cookie, crumb } = await getYahooAuth();

    const headers = {
      'User-Agent': USER_AGENT,
      'Cookie': cookie,
      'Accept': 'application/json'
    };

    // 1. FUNDAMENTAL DATA
    const quoteUrl = `https://query2.finance.yahoo.com/v7/finance/quote?symbols=${symbol}&crumb=${crumb}`;
    const quoteRes = await fetch(quoteUrl, { headers, cache: 'no-store' });

    if (!quoteRes.ok) throw new Error(`Fundamental API returned status: ${quoteRes.status}`);

    const quoteData = await quoteRes.json();
    const quote = quoteData.quoteResponse?.result?.[0];

    if (!quote) return null;

    // 2. HISTORICAL DATA FOR CHART & TECHNICAL INDICATORS
    const chartUrl = `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=60d&crumb=${crumb}`;
    const chartRes = await fetch(chartUrl, { headers, cache: 'no-store' });

    let sma20 = 0;
    let volatility = 0;
    let riskLevel = 'Unknown';
    let rsi14 = 0;
    let trend = 'Neutral';
    let historicalData: { date: string; price: number }[] = [];

    if (chartRes.ok) {
      const chartData = await chartRes.json();
      const result = chartData.chart?.result?.[0];

      const timestamps = result?.timestamp || [];
      const rawClosePrices = result?.indicators?.quote?.[0]?.close || [];

      // Filter out null data (market holidays)
      const validData: { time: number; price: number }[] = [];
      for (let i = 0; i < timestamps.length; i++) {
        if (rawClosePrices[i] !== null && rawClosePrices[i] !== undefined) {
          validData.push({
            time: timestamps[i],
            price: rawClosePrices[i]
          });
        }
      }

      const closePrices = validData.map(d => d.price);

      if (closePrices.length > 0) {
        const currentPrice = closePrices[closePrices.length - 1];

        // A. Chart data for UI
        historicalData = validData.map(d => ({
          date: new Date(d.time * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          price: Number(d.price.toFixed(2))
        }));

        // B. SMA 20 Calculation
        const period20 = Math.min(20, closePrices.length);
        const recent20 = closePrices.slice(-period20);
        const sum20 = recent20.reduce((a, b) => a + b, 0);
        sma20 = sum20 / period20;

        // C. Volatility & Risk
        const mean = sma20;
        const variance = recent20.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / period20;
        volatility = Math.sqrt(variance);
        riskLevel = volatility > (mean * 0.05) ? 'High' : volatility > (mean * 0.03) ? 'Medium' : 'Low';

        // D. Trend Detection
        trend = currentPrice > sma20 ? 'Bullish' : 'Bearish';

        // E. RSI 14 Calculation
        if (closePrices.length > 14) {
          let gains = 0;
          let losses = 0;
          for (let i = closePrices.length - 14; i < closePrices.length; i++) {
            const difference = closePrices[i] - closePrices[i - 1];
            if (difference >= 0) {
              gains += difference;
            } else {
              losses -= difference;
            }
          }
          const avgGain = gains / 14;
          const avgLoss = losses / 14;
          if (avgLoss === 0) {
            rsi14 = 100;
          } else {
            const rs = avgGain / avgLoss;
            rsi14 = 100 - (100 / (1 + rs));
          }
        }
      }
    }

    // 3. RECENT NEWS
    let recentNews: { title: string; publisher: string; link: string }[] = [];
    try {
      const newsUrl = `https://query2.finance.yahoo.com/v1/finance/search?q=${symbol}&quotesCount=0&newsCount=5`;
      const newsRes = await fetch(newsUrl, { headers: { 'User-Agent': USER_AGENT }, cache: 'no-store' });

      if (newsRes.ok) {
        const newsData = await newsRes.json();
        recentNews = (newsData.news || []).map((item: any) => ({
          title: item.title,
          publisher: item.publisher,
          link: item.link
        }));
      }
    } catch (newsError) {
      console.error(`[stocks.ts] Failed to fetch news for ${symbol}:`, newsError);
    }

    // 4. COMBINE ALL DATA
    return {
      symbol: quote.symbol,
      companyName: quote.shortName || quote.longName || symbol,
      currentPrice: quote.regularMarketPrice || 0,
      marketCap: quote.marketCap || 0,
      peRatio: quote.trailingPE || 0,
      eps: quote.epsTrailingTwelveMonths || 0,
      dividendYield: quote.dividendYield || 0,
      week52High: quote.fiftyTwoWeekHigh || 0,
      week52Low: quote.fiftyTwoWeekLow || 0,
      volume: quote.regularMarketVolume || 0,
      historicalData,
      quantitative: {
        sma20: Number(sma20.toFixed(2)),
        volatility: Number(volatility.toFixed(2)),
        riskLevel,
        rsi14: Number(rsi14.toFixed(2)),
        trend
      },
      news: recentNews
    };

  } catch (error: any) {
    console.error(`[stocks.ts] Error for ${ticker}:`, error.message);
    return null;
  }
}
