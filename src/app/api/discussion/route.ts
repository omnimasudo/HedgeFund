import { NextResponse } from "next/server";

// Jika Anda punya utils fetcher sendiri di src/lib/openrouter.ts, Anda bisa import.
// Tapi ini adalah implementasi standalone yang siap pakai.
export async function POST(req: Request) {
  try {
    const { prompt, agents } = await req.json();

    if (!agents || agents.length === 0) {
      return NextResponse.json({ error: "Pilih minimal 1 agent" }, { status: 400 });
    }

    // Melakukan fetch ke OpenRouter secara paralel untuk semua agent yang dipilih
    const responses = await Promise.all(
      agents.map(async (agent: string) => {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            // Tambahkan HTTP-Referer dan X-Title sesuai standar OpenRouter jika perlu
          },
          body: JSON.stringify({
            // Gunakan model yang lebih murah dan tersedia
            model: "openai/gpt-3.5-turbo", 
            max_tokens: 500, // Kurangi token untuk menghemat kredit
            messages: [
              {
                role: "system",
                content: `You are the ${agent}. Provide your analysis and response to the user's prompt based strictly on your core investing philosophy and persona. Be highly specific, insightful, and concise (max 2 paragraphs). Speak directly to the point without robotic greetings.`
              },
              {
                role: "user",
                content: prompt
              }
            ]
          })
        });

        const data = await res.json();
        
        if (!res.ok) {
          console.error(`Error for ${agent}:`, data);
          return {
            agentName: agent,
            content: `Error: ${data.error?.message || "Failed to generate response."}`
          };
        }
        
        return {
          agentName: agent,
          content: data.choices?.[0]?.message?.content || "No response generated."
        };
      })
    );

    return NextResponse.json({ responses });
  } catch (error) {
    console.error("Discussion API Error:", error);
    return NextResponse.json({ error: "Failed to generate agent responses" }, { status: 500 });
  }
}