import { NextRequest, NextResponse } from "next/server";
import { ragEngine } from "@/lib/rag/rag-engine";
import { synthesizeRagResponse } from "@/lib/rag/synthesizer";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatRequestBody {
  messages: ChatMessage[];
  portalMode: "customer" | "designer";
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequestBody = await req.json();
    const { messages, portalMode } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }

    const latestMessage = messages[messages.length - 1];
    const userQuery = latestMessage.content;

    // Step 1: Perform RAG Search over the knowledge corpus
    const preferredCategory = portalMode === "designer" ? "designer-guide" : "customer-guide";
    const searchResults = ragEngine.search(userQuery, 4, preferredCategory);
    const ragContext = ragEngine.formatContextForPrompt(searchResults);

    // Step 2: Check if GEMINI_API_KEY is available in the environment
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const { GoogleGenAI } = await import("@google/genai");
        const ai = new GoogleGenAI({ apiKey });

        const systemPrompt = `You are AURA, the official luxury AI Salon Concierge & Studio Copilot for "ALTIER MAISON PRIVÉE", a high-end luxury fashion marketplace.
Your persona: Highly knowledgeable, poised, refined, polite, authoritative yet warm, similar to a head curator at a Parisian or Mayfair haute couture salon.
Current Portal Mode: ${portalMode === "designer" ? "Designer Studio (assist with listing, inventory, drafts, promotions, bespoke quotes)" : "Customer Boutique (assist with browsing, recommendations, bespoke commissioning, fittings, escrow)"}.

RAG KNOWLEDGE DOSSIER (RETRIEVED FACTS):
${ragContext}

INSTRUCTIONS:
1. Always ground your answers in the retrieved facts above.
2. If asked about the "best designer", reference Kavita Singhal (Contemporary/Gowns: 4.98/5) and Rohit K. Balaji (Bridal/Menswear: 4.96/5).
3. If asked about trending designs, highlight the Sculpted Duchesse Silk Evening Gown (₹98,400) and Hand-Embroidered Zardozi Corset Top (₹45,000).
4. If asked about website usage, give concise numbered steps according to whether the user is a patron or designer.
5. Format your response cleanly using GitHub Markdown with subtle luxury formatting.`;

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: [
            ...messages.slice(-5).map((m) => ({
              role: m.role === "assistant" ? "model" : "user",
              parts: [{ text: m.content }]
            }))
          ],
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.6,
          }
        });

        const replyText = response.text || "I am at your service at ALTIER Maison Privée.";

        return NextResponse.json({
          reply: replyText,
          sources: searchResults.map((r) => r.document.title),
          suggestedQuestions: portalMode === "customer"
            ? ["Who is the top rated bridal designer?", "Show me trending evening gowns", "How does escrow protection work?"]
            : ["How do I list a new product?", "What are the promotion boost tiers?", "How are in-progress drafts saved?"]
        });
      } catch (geminiError) {
        console.warn("Live Gemini API call failed or timed out; falling back to deterministic RAG engine:", geminiError);
      }
    }

    // Step 3: Deterministic high-fidelity RAG synthesis fallback
    const result = synthesizeRagResponse(userQuery, searchResults, portalMode);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "An error occurred in the salon concierge service." },
      { status: 500 }
    );
  }
}

