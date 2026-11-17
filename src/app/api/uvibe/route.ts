import { NextRequest, NextResponse } from "next/server";
import { rankGarmentsByQuery, enrichAtelierPrompt } from "@/lib/uvibe-ai-engine";
import { applyApiSecurityShield, wrapWithSecurityHeaders } from "@/lib/security/api-security";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, filters, mode } = body;

    // Apply API Rate Limiting & Threat Shield
    const shield = applyApiSecurityShield(req, query);
    if (shield.isBlocked && shield.blockedResponse) {
      return shield.blockedResponse;
    }

    const cleanQuery = shield.sanitizedInput || query;

    if (!cleanQuery && !filters) {
      return wrapWithSecurityHeaders(
        NextResponse.json({ error: "No search directive provided." }, { status: 400 })
      );
    }

    const searchResult = rankGarmentsByQuery(cleanQuery || "", filters);

    // Optional GenAI Commentary if GEMINI_API_KEY is available
    let aiCommentary: string | null = null;
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && query) {
      try {
        const { GoogleGenAI } = await import("@google/genai");
        const ai = new GoogleGenAI({ apiKey });

        const prompt = `You are the Head Stylist and Master Couturier at Atelier Maison Privée.
The client gave this fashion desire: "${query}".
The neural engine selected: "${searchResult.topMatch.title}" (${searchResult.topMatch.silhouette}, in ${searchResult.topMatch.fabrics.join(", ")}) with ${searchResult.overallConfidence}% affinity.
Provide a 2-sentence exquisite sartorial recommendation explaining why this piece aligns with their vision and how to style or commission it. Speak in refined, poetic luxury tone.`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt
        });

        if (response.text) {
          aiCommentary = response.text.trim();
        }
      } catch (genErr) {
        // Silently proceed with neural engine result
        console.warn("Gemini commentary fallback to local neural engine:", genErr);
      }
    }

    return wrapWithSecurityHeaders(
      NextResponse.json({
        success: true,
        topMatch: searchResult.topMatch,
        similarSuggestions: searchResult.similarSuggestions,
        parsedQuery: searchResult.parsedQuery,
        overallConfidence: searchResult.overallConfidence,
        aiCommentary: aiCommentary || `Curated ${searchResult.topMatch.silhouette} in ${searchResult.topMatch.fabrics[0]} matching your aesthetic directive with ${searchResult.overallConfidence}% affinity.`
      })
    );
  } catch (err: any) {
    console.error("UVIBE API Error:", err);
    return wrapWithSecurityHeaders(
      NextResponse.json({ error: err.message || "Failed to process UVIBE search." }, { status: 500 })
    );
  }
}

