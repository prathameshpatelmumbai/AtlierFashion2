"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { ListedProduct } from "@/types/studio";
import { 
  Sparkles, 
  Search, 
  SlidersHorizontal, 
  RefreshCw, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Wand2, 
  Eye, 
  Scissors, 
  Share2, 
  Heart,
  Camera,
  Compass,
  FileCheck2,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface CustomerUvibeProps {
  onOpenBuyNow: (product: ListedProduct) => void;
  onOpenCustomRequest: (product?: ListedProduct, promptRef?: string) => void;
}

export const CustomerUvibe: React.FC<CustomerUvibeProps> = ({
  onOpenBuyNow,
  onOpenCustomRequest
}) => {
  const { 
    uvibePrompt, 
    setUvibePrompt, 
    setSelectedProductId, 
    addToCart, 
    showToast,
    setCustomerSection
  } = useStudio();

  const [activeTab, setActiveTab] = useState<"text" | "lens" | "generative">("text");
  const [promptInput, setPromptInput] = useState(uvibePrompt || "An elegant burgundy velvet gown with gold embroidery");
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisProgress, setSynthesisProgress] = useState(100);
  const [selectedSilhouette, setSelectedSilhouette] = useState("Column & Basque");
  const [selectedEra, setSelectedEra] = useState("Belle Époque / 1920s");
  const [selectedOccasion, setSelectedOccasion] = useState("Black Tie Gala");
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
    showToast(wishlist[id] ? "Removed from private vault" : "Added to your private salon vault");
  };

  const handleSynthesize = () => {
    setIsSynthesizing(true);
    setSynthesisProgress(15);
    setUvibePrompt(promptInput);

    const timer1 = setTimeout(() => setSynthesisProgress(65), 250);
    const timer2 = setTimeout(() => {
      setSynthesisProgress(100);
      setIsSynthesizing(false);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
        colors: ["#D4AF37", "#542333", "#F6DFC4"]
      });
      showToast("Neural Haute Synthesis Complete: 4 archival garments retrieved with 94%+ affinity.");
    }, 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  };

  const handleExportToCustom = (designTitle: string) => {
    onOpenCustomRequest(undefined, `${designTitle} based on prompt: "${promptInput}" with ${selectedSilhouette} & ${selectedEra}`);
  };

  // 4 Archival Matches from Photo 4
  const archivalMatches = [
    {
      id: "uv-1",
      matchScore: 99,
      badge: "Gilded Velvet Gala Column Gown",
      tag: "BRIDAL & HAUTE EDITION",
      desc: "Heavy silk velvet • 24k Bullion zardozi embroidery",
      price: 68000,
      sizes: "XS - L • BESPOKE",
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop",
      silhouette: "Column & Basque",
      era: "Belle Époque"
    },
    {
      id: "uv-2",
      matchScore: 96,
      badge: "Archival Embroidered Velvet Sherwani Coat",
      tag: "MAISON PRIVÉE VAULT",
      desc: "Hand-loomed velvet • Split cuffs & contrast silk lining",
      price: 54000,
      sizes: "M - XL • BESPOKE",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop",
      silhouette: "Structured Sherwani",
      era: "Heritage Royal"
    },
    {
      id: "uv-3",
      matchScore: 97,
      badge: "Montmartre Peacoat in Burgundy",
      tag: "PRÊT-À-PORTER",
      desc: "Burgundy melton wool • Gold filigree military buttons",
      price: 82500,
      originalPrice: "$1,450",
      sizes: "38, 40, 42, 44",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop",
      silhouette: "Tailored Overcoat",
      era: "Modern Archival"
    },
    {
      id: "uv-4",
      matchScore: 94,
      badge: "Velvet Corset Bodice",
      tag: "COUTURE & ARCHIVAL",
      desc: "Silk and linen boning • Gilded thread embroidery",
      price: 42000,
      sizes: "XS - M • BESPOKE",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop",
      silhouette: "Corsetry",
      era: "Victorian Revival"
    }
  ];

  return (
    <div className="space-y-14 pb-20 max-w-[1520px] mx-auto">
      {/* Top Hero Synthesis Dashboard (Photo 4) */}
      <section className="relative rounded-3xl p-8 lg:p-12 bg-gradient-to-br from-[#FFF5F7] via-[#FFFDF9] to-[#FFF0F4] border border-[#E8D2B7] shadow-xl overflow-hidden">
        {/* Decorative Backdrop Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-[#D4AF37]/15 to-transparent rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-t from-[#542333]/10 to-transparent rounded-full blur-3xl -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Semantic Input & Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3A0E1E] text-[#F6DFC4] text-[10px] uppercase font-bold tracking-[0.25em] border border-[#D4AF37]/50 shadow-xs">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>AI Personal Wardrobe Stylist • Neural Atelier</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#231820] tracking-tight leading-tight">
                Imagination to Your{" "}
                <span className="italic font-normal bg-gradient-to-r from-[#542333] via-[#852C46] to-[#C5A059] bg-clip-text text-transparent">
                  Wardrobe
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-[#7D6B60] leading-relaxed max-w-xl font-light">
                <strong className="font-semibold text-[#3A0E1E]">Describe it. Envision it. Wear it.</strong> Your intelligent AI personal assistant for custom couture. Input your silhouette desires, moods, or fabric textures, and our neural engine synthesizes matching archival masterworks, bespoke pattern draftings, and direct artisan commissions.
              </p>
            </div>

            {/* 3 Mode Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {[
                { id: "text", label: "Text Synthesis", icon: Wand2 },
                { id: "lens", label: "Visual Lens", icon: Camera },
                { id: "generative", label: "Generative Studio", icon: Sparkles }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-serif tracking-wider uppercase transition-all ${
                      isActive
                        ? "bg-[#3A0E1E] text-white shadow-md border border-[#D4AF37]/60"
                        : "bg-white/80 text-[#6B5A52] border border-[#E8D2B7] hover:bg-white hover:text-[#231820]"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#D4AF37]" : "text-[#8F8178]"}`} />
                    <span>{tab.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Natural Semantic Query Box */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E8D2B7] shadow-lg space-y-4">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#8F8178]">
                <span className="flex items-center gap-1.5 font-semibold text-[#542333]">
                  <Wand2 className="w-3.5 h-3.5 text-[#C5A059]" />
                  Mode: Natural Semantic Query
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#FFF0F4] text-[#852C46] border border-[#E8D2B7] font-mono text-[10px] font-bold">
                  Semantic Match 99.2%
                </span>
              </div>

              {/* Text Input Area */}
              <div className="relative">
                <textarea
                  rows={3}
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Describe your silhouette, fabric (e.g. Mulberry silk, velvet, brocade), embroidery style, or archival reference..."
                  className="w-full p-3.5 pr-36 rounded-xl bg-[#FAF7F2] border border-[#E8D2B7] text-sm text-[#231820] placeholder-[#A49488] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all resize-none font-sans"
                />

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleSynthesize}
                  disabled={isSynthesizing}
                  className="absolute bottom-3 right-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#2B0B17] to-[#3A0E1E] hover:from-[#3A0E1E] hover:to-[#542333] text-[#F6DFC4] text-xs font-serif font-semibold tracking-wider uppercase shadow-md flex items-center gap-2 border border-[#D4AF37]/50 disabled:opacity-60"
                >
                  {isSynthesizing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
                      <span>Synthesizing...</span>
                    </>
                  ) : (
                    <>
                      <span>Find My Style</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                    </>
                  )}
                </motion.button>
              </div>

              {/* Parameter Tags from Photo 4 */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E8D2B7]/60">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#8F8178]">
                  Atelier Parameter Tags:
                </span>
                
                <button
                  onClick={() => setSelectedSilhouette(selectedSilhouette ? "" : "Column & Basque")}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                    selectedSilhouette
                      ? "bg-[#FFF0F4] text-[#542333] border-[#542333]/40"
                      : "bg-[#FAF7F2] text-[#8F8178] border-[#E8D2B7]"
                  }`}
                >
                  Silhouette: {selectedSilhouette || "All"}
                </button>

                <button
                  onClick={() => setSelectedEra(selectedEra ? "" : "Belle Époque / 1920s")}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                    selectedEra
                      ? "bg-[#FFF0F4] text-[#542333] border-[#542333]/40"
                      : "bg-[#FAF7F2] text-[#8F8178] border-[#E8D2B7]"
                  }`}
                >
                  Era: {selectedEra || "All"}
                </button>

                <button
                  onClick={() => setSelectedOccasion(selectedOccasion ? "" : "Black Tie Gala")}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-colors ${
                    selectedOccasion
                      ? "bg-[#FFF0F4] text-[#542333] border-[#542333]/40"
                      : "bg-[#FAF7F2] text-[#8F8178] border-[#E8D2B7]"
                  }`}
                >
                  Occasion: {selectedOccasion || "All"}
                </button>

                <button
                  onClick={() => {
                    setSelectedSilhouette("");
                    setSelectedEra("");
                    setSelectedOccasion("");
                  }}
                  className="text-[10px] text-[#A49488] hover:text-[#542333] underline ml-auto tracking-wider uppercase"
                >
                  Reset Tags
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: LIVE NEURAL CANVAS (5 Cols) from Photo 4 */}
          <div className="lg:col-span-5">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260 }}
              className="relative rounded-3xl overflow-hidden bg-[#2B0B17] border-2 border-[#D4AF37]/50 shadow-2xl p-3"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-3 py-2 text-[10px] font-mono tracking-widest text-[#F6DFC4] border-b border-[#D4AF37]/20 pb-2 mb-2">
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE NEURAL CANVAS
                </span>
                <span className="text-[#D4AF37]">0.4S DYNAMIC RENDER</span>
              </div>

              {/* Render Image Container */}
              <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-black/60">
                <img
                  src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop"
                  alt="Neural Haute Couture Render"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#3A0E1E]/95 text-[#F6DFC4] border border-[#D4AF37]/60 shadow-md backdrop-blur-xs">
                    99.4% DRAPE SYNTHESIS
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[9px] uppercase font-bold tracking-wider bg-black/70 text-white/90 border border-white/20 backdrop-blur-xs">
                    Velvet & Bullion Wire
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-black/75 text-amber-300 border border-amber-300/30">
                    1080P PRO-VIEW 1
                  </span>
                </div>

                {/* Bottom Overlay Spec */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 pt-10 text-white space-y-3">
                  <div className="text-[11px] font-mono text-[#E8D2B7]">
                    <div className="font-semibold text-white">Maison Archival Velvet Spec &apos;04</div>
                    <div className="text-[10px] text-[#A49488]">Amber gold wire draped / silk brocade • 2009-2024</div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleExportToCustom("Burgundy Velvet Gala Gown")}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E8D2B7] hover:from-[#E8D2B7] hover:to-[#D4AF37] text-[#2B0B17] font-serif font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                  >
                    <Scissors className="w-3.5 h-3.5 text-[#2B0B17]" />
                    <span>Export to Custom Orders</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curated Archival Matches for Query (Photo 4) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#E8D2B7]">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] font-semibold text-[#852C46]">
              <FileCheck2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Verified Archival Vault</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#231820] mt-1">
              Curated Archival Matches for{" "}
              <span className="italic text-[#542333]">&ldquo;{promptInput}&rdquo;</span>
            </h2>
            <p className="text-xs text-[#8F8178] mt-1 font-light">
              Semantic affinity matched against 12,800+ historical haute silhouettes. Ready to ship or tailor.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#6B5A52]">
            <span className="font-medium">Sort:</span>
            <select className="bg-white border border-[#E8D2B7] rounded-lg px-2.5 py-1.5 text-xs text-[#231820] focus:outline-none focus:border-[#D4AF37]">
              <option>Highest Match First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Vault Vintage Chronological</option>
            </select>
            <span className="px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#E8D2B7] text-[11px] font-mono text-[#8F8178]">
              4 Selected Pieces
            </span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {archivalMatches.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="group bg-white rounded-2xl border border-[#E8D2B7] overflow-hidden shadow-md hover:shadow-2xl hover:border-[#D4AF37] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Box */}
                <div className="relative aspect-3/4 overflow-hidden bg-[#FAF7F2]">
                  <img
                    src={item.image}
                    alt={item.badge}
                    className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  {/* Affinity Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#3A0E1E]/90 text-[#F6DFC4] border border-[#D4AF37]/50 shadow-md backdrop-blur-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                      {item.matchScore}% AI Match
                    </span>
                  </div>

                  {/* Wishlist Heart */}
                  <button
                    onClick={() => toggleWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-[#542333] backdrop-blur-xs shadow-md transition-all hover:scale-110"
                  >
                    <Heart
                      className={`w-4 h-4 ${wishlist[item.id] ? "fill-rose-600 text-rose-600" : ""}`}
                    />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="px-2 py-0.5 rounded-sm bg-black/75 text-white/90 text-[9px] uppercase tracking-wider backdrop-blur-xs font-mono">
                      {item.tag}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <h3 className="font-serif text-base text-[#231820] font-semibold group-hover:text-[#542333] transition-colors leading-snug line-clamp-2">
                    {item.badge}
                  </h3>
                  <p className="text-xs text-[#8F8178] line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#E8D2B7]/50">
                    <div>
                      <span className="font-serif text-base font-bold text-[#3A0E1E]">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                      {item.originalPrice && (
                        <span className="text-[10px] text-[#A49488] line-through ml-2">
                          {item.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#8F8178] font-mono">
                      {item.sizes}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setSelectedProductId("prod-3"); // open PDP
                    }}
                    className="py-2 px-2.5 rounded-lg border border-[#E8D2B7] hover:border-[#3A0E1E] bg-[#FFF9F6] text-[#231820] text-[11px] font-medium tracking-wide uppercase hover:bg-white transition-all text-center"
                  >
                    View Product
                  </button>
                  <button
                    onClick={() => {
                      addToCart({
                        id: item.id,
                        title: item.badge,
                        price: item.price,
                        image: item.image,
                        size: "M",
                        color: "Burgundy Gold"
                      });
                      confetti({
                        particleCount: 40,
                        spread: 50,
                        origin: { y: 0.7 }
                      });
                    }}
                    className="py-2 px-2.5 rounded-lg bg-[#3A0E1E] hover:bg-[#542333] text-[#F6DFC4] text-[11px] font-medium tracking-wide uppercase transition-all shadow-xs text-center"
                  >
                    Add to Cart
                  </button>
                </div>

                <button
                  onClick={() => handleExportToCustom(item.badge)}
                  className="w-full py-1.5 rounded-lg bg-[#FFF0F4] hover:bg-[#FFE4EC] text-[#542333] text-[10px] font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 border border-[#E8D2B7]"
                >
                  <Scissors className="w-3 h-3 text-[#D4AF37]" />
                  <span>Customise This Design</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom Bespoke Concierge Banner (Photo 4) */}
      <section className="relative rounded-3xl p-8 lg:p-10 bg-gradient-to-r from-[#FFF5F7] via-[#FFF9FA] to-[#FFF0F4] border border-[#E8D2B7] shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Visual Illustration */}
          <div className="lg:col-span-4">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-[#E8D2B7] shadow-lg group">
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop"
                alt="Toile Drape Lab"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full text-[9px] font-mono uppercase bg-black/80 text-[#F6DFC4] border border-[#D4AF37]/50">
                  Toile Drape Lab
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="px-2.5 py-1 rounded-sm text-[9px] font-mono bg-white/90 text-[#3A0E1E] border border-[#E8D2B7] shadow-xs">
                  SPEC REF: UVIBE-TOILE-2026
                </span>
              </div>
            </div>
          </div>

          {/* Right Copy & CTA */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.2em] text-[#852C46]">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Maison Privée Bespoke Concierge</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[#231820] leading-snug">
              Can&apos;t find your perfect design?{" "}
              <span className="italic font-normal text-[#542333]">
                Let our designers create it for you.
              </span>
            </h3>

            <p className="text-xs sm:text-sm text-[#6B5A52] leading-relaxed font-light max-w-2xl">
              Our master patternmakers and heritage artisans hand-draft individualized muslin toiles, source rare archival fabrics, and translate your AI discovery prompt or reference sketch into a finished bespoke silhouette. Includes private salon fittings in London, Paris, and Mumbai.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpenCustomRequest(undefined, promptInput)}
                className="px-6 py-3 rounded-full bg-[#3A0E1E] hover:bg-[#542333] text-[#F6DFC4] font-serif text-xs font-semibold uppercase tracking-wider shadow-lg flex items-center gap-2 border border-[#D4AF37]/60"
              >
                <span>Send Custom Enquiry</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </motion.button>

              <span className="text-[11px] text-[#8F8178] font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Direct AI reference inside the dossier enabled
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

