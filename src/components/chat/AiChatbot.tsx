"use client";

import React, { useState, useEffect, useRef } from "react";
import { useStudio } from "@/context/StudioContext";
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2, 
  RotateCcw, 
  Flame, 
  ShieldCheck, 
  Scissors, 
  Plus, 
  Layers,
  ChevronRight,
  Compass,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AltierLogo } from "@/components/common/AltierLogo";
import { ragEngine } from "@/lib/rag/rag-engine";
import { synthesizeRagResponse } from "@/lib/rag/synthesizer";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  suggestedQuestions?: string[];
  timestamp: string;
}

export const AiChatbot: React.FC = () => {
  const { portalMode, setActiveStudioTab, setCustomerSection } = useStudio();

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome messages tailored to portal mode
  const initialMessages: Message[] = [
    {
      id: "welcome-1",
      role: "assistant",
      content: portalMode === "designer"
        ? `### Welcome to Atelier Studio Copilot\n\nI am your curatorial intelligence assistant, grounded in **ALTIER's master knowledge base**. Ask me about:\n\n* **Cataloging & Listing**: 5-stage dossier requirements, image specifications\n* **Paid Promotions**: Boost tiers (Salon, Curator, Grand) & ad metrics\n* **Custom Orders**: Reviewing specs, fitting dates & transmitting quotes\n* **Vault Archiving**: 72-hour draft autosaves and sales ledger exports`
        : `### Welcome to ALTIER Haute Concierge\n\nI am **AURA**, your private haute salon concierge. I can assist you with:\n\n* **Top Designers**: Discover the best bridal, menswear, and contemporary couturiers\n* **Trending Designs**: Real-time runway spotlights & bestselling creations\n* **Bespoke Commissions**: How to submit measurements and request alterations\n* **Escrow Guarantee**: How our 50% escrow protection keeps your purchase safe`,
      suggestedQuestions: portalMode === "designer"
        ? [
            "How do I list a new couture piece in Studio?",
            "What are the 3 promotion boost tiers and pricing?",
            "How are in-progress drafts retained in the vault?",
            "How do I review an inquiry and transmit a quote?"
          ]
        : [
            "Who is the best designer for bridal lehengas?",
            "What are the trending designs right now?",
            "How does the 50% escrow protection work?",
            "How do I submit custom fitting measurements?"
          ],
      timestamp: "Just now"
    }
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  // Update welcome message if portal mode switches and chat is fresh
  useEffect(() => {
    if (messages.length <= 1) {
      setMessages(initialMessages);
    }
  }, [portalMode]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      let data: { reply: string; sources?: string[]; suggestedQuestions?: string[] };
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            portalMode,
            messages: [...messages, userMessage].map((m) => ({
              role: m.role,
              content: m.content
            }))
          })
        });

        if (!response.ok) {
          throw new Error("API route unavailable");
        }
        data = await response.json();
      } catch {
        // High-fidelity client-side RAG fallback for static hosting (GitHub Pages)
        const preferredCategory = portalMode === "designer" ? "designer-guide" : "customer-guide";
        const searchResults = ragEngine.search(text, 4, preferredCategory);
        data = synthesizeRagResponse(text, searchResults, portalMode);
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply || "I am at your service at ALTIER Maison Privée.",
        sources: data.sources || [],
        suggestedQuestions: data.suggestedQuestions || [],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: "I apologize, our salon communications encountered a momentary delay. Please ask again or select a suggested topic below.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages(initialMessages);
  };

  // Helper to format simple markdown elements (bold, italic, headers, bullet points)
  const renderFormattedText = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      // Header 3
      if (line.startsWith("### ")) {
        return (
          <h4 key={idx} className="font-editorial text-base font-bold text-[#F6DFC4] mt-2 mb-1.5 tracking-wide">
            {line.replace("### ", "")}
          </h4>
        );
      }
      // Bullet items
      if (line.startsWith("* ") || line.startsWith("- ")) {
        const itemText = line.substring(2);
        return (
          <li key={idx} className="ml-4 list-disc text-xs leading-relaxed text-[#f3e7ed] marker:text-[#D4AF37]">
            <span dangerouslySetInnerHTML={{ __html: formatInline(itemText) }} />
          </li>
        );
      }
      // Numbered lists
      if (/^\d+\.\s/.test(line)) {
        const itemText = line.replace(/^\d+\.\s/, "");
        return (
          <div key={idx} className="ml-2 flex gap-2 text-xs leading-relaxed text-[#f3e7ed] my-0.5">
            <span className="font-bold text-[#D4AF37]">{line.match(/^\d+/)?.[0]}.</span>
            <span dangerouslySetInnerHTML={{ __html: formatInline(itemText) }} />
          </div>
        );
      }
      // Empty lines
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }
      // Standard paragraph
      return (
        <p key={idx} className="text-xs leading-relaxed text-[#f3e7ed]">
          <span dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
        </p>
      );
    });
  };

  function formatInline(str: string) {
    return str
      .replace(/\*\*(.*?)\*\*/g, "<strong class='font-semibold text-[#F6DFC4]'>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em class='italic text-[#eedde5]'>$1</em>");
  }

  return (
    <>
      {/* FLOATING TRIGGER BUTTON (BOTTOM-RIGHT) */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative group flex items-center gap-3 px-5 py-3.5 rounded-full bg-[#3a0e1e] text-white shadow-2xl border border-[#D4AF37]/70 hover:border-[#F6DFC4] transition-all duration-300"
          title="Open AI Haute Concierge"
        >
          {/* Animated Gold Aura Pulse */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#D4AF37]/30 via-[#F6DFC4]/40 to-[#D4AF37]/30 blur-sm opacity-70 group-hover:opacity-100 animate-pulse pointer-events-none" />

          <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-[#F6DFC4] to-[#D4AF37] text-[#3a0e1e] shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>

          <div className="relative flex flex-col text-left">
            <span className="font-editorial text-xs tracking-wider uppercase font-semibold text-[#F6DFC4]">
              {portalMode === "designer" ? "Studio Copilot" : "Salon Concierge"}
            </span>
            <span className="text-[9px] text-white/70 tracking-widest uppercase -mt-0.5">
              RAG AI Intelligence
            </span>
          </div>

          <span className="relative w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        </motion.button>
      </div>

      {/* FLOATING CHAT DRAWER / WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[440px] h-[600px] max-h-[85vh] flex flex-col bg-[#160711]/96 backdrop-blur-2xl rounded-2xl border border-[#D4AF37]/50 shadow-[0_25px_70px_rgba(0,0,0,0.7),0_0_40px_rgba(212,175,55,0.14)] overflow-hidden"
          >
            {/* CHAT HEADER */}
            <div className="px-5 py-4 bg-gradient-to-r from-[#240815] via-[#2f0a1c] to-[#200712] text-white flex items-center justify-between border-b border-[#D4AF37]/35 shrink-0 shadow-xs">
              <div className="flex items-center gap-3">
                <AltierLogo variant="emblem" height={28} theme="dark" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-editorial text-base font-semibold tracking-wide text-[#F6DFC4]">
                      {portalMode === "designer" ? "Studio Copilot" : "AURA Salon Concierge"}
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#3f1220] text-[#F6DFC4] border border-[#D4AF37]/40 uppercase font-bold tracking-wider shadow-2xs">
                      {portalMode === "designer" ? "Designer OS" : "Patron Boutique"}
                    </span>
                  </div>
                  <span className="text-[10px] text-white/60 tracking-wider flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]"></span>
                    RAG Vector Engine Active
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleClearHistory}
                  className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  title="Reset conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  title="Close Concierge"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* MESSAGES FEED */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-gradient-to-b from-[#180712]/70 via-[#14060f]/90 to-[#12050e]/95">
              {messages.map((msg) => {
                const isAssistant = msg.role === "assistant";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isAssistant ? "items-start" : "items-end"}`}
                  >
                    <div
                      className={`max-w-[88%] p-4 rounded-2xl transition-all ${
                        isAssistant
                          ? "bg-gradient-to-br from-[#2a0e1c]/95 to-[#210915]/95 border border-[#D4AF37]/35 text-[#f3e7ed] rounded-tl-xs shadow-[0_10px_28px_rgba(0,0,0,0.45),0_0_16px_rgba(212,175,55,0.07),inset_0_1px_1px_rgba(255,255,255,0.08)]"
                          : "bg-gradient-to-br from-[#54172e] to-[#3a0d1e] text-white border border-[#F6DFC4]/50 rounded-tr-xs shadow-[0_8px_25px_rgba(84,23,46,0.5),0_0_16px_rgba(246,223,196,0.15),inset_0_1px_1px_rgba(255,255,255,0.12)]"
                      }`}
                    >
                      {/* Avatar & Header Tag */}
                      <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/10">
                        <div className="flex items-center gap-1.5">
                          {isAssistant ? (
                            <span className="w-4 h-4 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F6DFC4] flex items-center justify-center text-[#240612] text-[9px] font-bold shadow-2xs">
                              A
                            </span>
                          ) : (
                            <User className="w-3.5 h-3.5 text-[#F6DFC4]" />
                          )}
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#F6DFC4]">
                            {isAssistant ? (portalMode === "designer" ? "Atelier Intelligence" : "Salon Concierge") : "You"}
                          </span>
                        </div>
                        <span className="text-[9px] text-white/45">
                          {msg.timestamp}
                        </span>
                      </div>

                      {/* Formatted Content */}
                      <div className="space-y-1">
                        {isAssistant ? renderFormattedText(msg.content) : (
                          <p className="text-xs leading-relaxed text-white whitespace-pre-wrap">
                            {msg.content}
                          </p>
                        )}
                      </div>

                      {/* RAG Sources Citations */}
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-[#D4AF37]/20 flex flex-wrap items-center gap-1.5">
                          <span className="text-[9px] uppercase tracking-wider font-semibold text-[#D4AF37]">
                            Dossier Sources:
                          </span>
                          {msg.sources.map((src, i) => (
                            <span
                              key={i}
                              className="text-[9px] px-2 py-0.5 rounded bg-[#180812] border border-[#D4AF37]/25 text-[#eedde5] font-medium shadow-2xs"
                            >
                              {src}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Suggested Question Chips */}
                    {isAssistant && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[90%]">
                        {msg.suggestedQuestions.map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(q)}
                            className="text-left text-[11px] px-3 py-1.5 rounded-full bg-[#260c1a]/90 hover:bg-[#3d1329] text-[#F6DFC4] border border-[#D4AF37]/35 hover:border-[#D4AF37] transition-all flex items-center gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.35),0_0_10px_rgba(212,175,55,0.08)] hover:shadow-[0_4px_18px_rgba(212,175,55,0.22)] group"
                          >
                            <span className="text-[#D4AF37] group-hover:translate-x-0.5 transition-transform font-bold">›</span>
                            <span>{q}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 p-3 bg-[#260c1a] rounded-2xl border border-[#D4AF37]/35 w-fit shadow-[0_4px_14px_rgba(0,0,0,0.4),0_0_12px_rgba(212,175,55,0.1)]">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[10px] text-[#F6DFC4] uppercase tracking-wider font-semibold ml-1">
                    Retrieving Salon Archives...
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* QUICK PROMPT CHIPS (STICKY ABOVE INPUT) */}
            <div className="px-4 py-2.5 bg-[#13040c]/95 border-t border-[#D4AF37]/25 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 shadow-inner">
              <span className="text-[10px] font-semibold text-[#D4AF37] uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Quick:
              </span>
              {(portalMode === "designer"
                ? [
                    "How to list a new piece",
                    "Promotion boost tiers",
                    "How drafts are saved",
                    "Transmit custom quotes"
                  ]
                : [
                    "Best bridal designer",
                    "Trending designs",
                    "How escrow works",
                    "Custom commission guide"
                  ]
              ).map((chip, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(chip)}
                  className="px-2.5 py-1 rounded-full bg-[#250b18] hover:bg-[#3a1126] text-[10px] text-[#F6DFC4] font-semibold border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all whitespace-nowrap shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.35)] hover:shadow-[0_2px_12px_rgba(212,175,55,0.16)]"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* INPUT COMPOSER */}
            <div className="p-3 bg-[#10030a] border-t border-[#D4AF37]/35 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={
                    portalMode === "designer"
                      ? "Ask studio copilot (e.g. how to boost, catalog steps)..."
                      : "Ask concierge (e.g. best designer, trending gown, escrow)..."
                  }
                  className="flex-1 px-4 py-2.5 rounded-full bg-[#1f0914] border border-[#D4AF37]/35 text-xs text-[#F6DFC4] placeholder:text-white/35 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)] transition-all"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#F6DFC4] to-[#C99E32] hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed text-[#240612] flex items-center justify-center transition-all shadow-[0_0_16px_rgba(212,175,55,0.4)] shrink-0"
                  title="Send message"
                >
                  <Send className="w-4 h-4 text-[#240612]" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

