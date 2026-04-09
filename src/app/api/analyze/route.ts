import { NextRequest, NextResponse } from 'next/server';
import { fetchQuoteData } from '@/lib/yahoo-finance';
import { analyzeWithAgents, generateFinalDecision } from '@/lib/openrouter';
import { AnalysisResult, PersonaType } from '@/types';

// Server-side API key from environment (more secure, used as primary)
const SERVER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ticker, persona = 'balanced' } = body;

    // Get API key: server env first (secure), then client-provided (flexible)
    const clientApiKey = body.apiKey;
    const apiKey = SERVER_API_KEY || clientApiKey;

    if (!ticker) {
      return NextResponse.json({ error: 'Ticker is required' }, { status: 400 });
    }

    if (!apiKey) {
      return NextResponse.json({
        error: 'OpenRouter API key required. Please add OPENROUTER_API_KEY to .env file or enter your key in Settings.'
      }, { status: 400 });
    }

    // Fetch stock data from Yahoo Finance
    const quote = await fetchQuoteData(ticker);

    if (!quote) {
      return NextResponse.json({ error: 'Stock not found' }, { status: 404 });
    }

    // Get insights from AI agents
    const agents = await analyzeWithAgents(quote, persona as PersonaType, apiKey);

    // Generate final decision
    const finalDecision = await generateFinalDecision(quote, agents, persona as PersonaType, apiKey);

    const result: AnalysisResult = {
      symbol: ticker.toUpperCase(),
      quote,
      agents,
      finalDecision,
      timestamp: new Date(),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Analysis API error:', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}