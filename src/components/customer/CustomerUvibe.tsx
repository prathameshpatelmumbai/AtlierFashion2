"use client";

import React, { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  Wand2,
  Camera,
  Scissors,
  FileCheck2,
  Clock,
  Award,
  ShieldCheck,
  Ruler,
  ShoppingBag,
  SlidersHorizontal,
  ChevronRight,
  Mail,
  Globe,
  MapPin,
  UploadCloud,
  Image as ImageIcon,
  Layers,
  Zap,
  Check,
  Sliders,
  Info
} from "lucide-react";
import confetti from "canvas-confetti";
import { useStudio } from "@/context/StudioContext";
import { ListedProduct } from "@/types/studio";
import {
  LeftSilkMarginCurtain,
  RightSilkMarginCurtain,
  FooterGinkgoSpray,
  SatinSilkWaveSeam
} from "./SalonSilkDecorations";
import {
  rankGarmentsByQuery,
  enrichAtelierPrompt,
  parseFashionQuery,
  UVIBE_GARMENT_CORPUS,
  UvibeGarment,
  ParsedFashionQuery
} from "@/lib/uvibe-ai-engine";

const asset = (path: string) => {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return base ? `${base}${path}` : path;
};

interface CustomerUvibeProps {
  onOpenBuyNow: (product: ListedProduct) => void;
  onOpenCustomRequest: (product?: ListedProduct, promptRef?: string) => void;
}

const INSPIRATION_PROMPTS = [
  "Crimson silk velvet kalidar lehenga with antique gold zardozi and scalloped veil",
  "Ivory raw silk sherwani with Kashmiri tilla needlework and split cuffs",
  "Midnight sapphire duchess satin gala gown with structured boned basque corset",
  "Aubergine Kanjivaram silk sari with interlocked temple borders and 24k zari"
];

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

  const [activeTab, setActiveTab] = useState<"text" | "lens">("text");

  // Initial neural search ranking based on prompt or default haute search
  const initialPrompt = uvibePrompt || "Crimson silk velvet kalidar lehenga with antique gold bullion zardozi";
  const initialRanking = rankGarmentsByQuery(initialPrompt);

  const [promptInput, setPromptInput] = useState(initialPrompt);
  const [topMatch, setTopMatch] = useState<UvibeGarment>(initialRanking.topMatch);
  const [suggestions, setSuggestions] = useState<UvibeGarment[]>(initialRanking.similarSuggestions);
  const [semanticConfidence, setSemanticConfidence] = useState<number>(initialRanking.overallConfidence);
  const [parsedState, setParsedState] = useState<ParsedFashionQuery>(initialRanking.parsedQuery);

  // AI Accuracy Justification & Filter States
  const [expandedJustificationId, setExpandedJustificationId] = useState<string | null>(null);
  const [suggestionsFilter, setSuggestionsFilter] = useState<"all" | "silhouette" | "color" | "craft">("all");

  // Multi-dimensional filtered suggestions
  const filteredSuggestions = suggestions.filter((item) => {
    if (suggestionsFilter === "silhouette") {
      return (item.scoreBreakdown?.clothes ?? 0) >= 70 || item.silhouette === topMatch.silhouette;
    }
    if (suggestionsFilter === "color") {
      return (item.scoreBreakdown?.color ?? 0) >= 70;
    }
    if (suggestionsFilter === "craft") {
      return (item.scoreBreakdown?.craft ?? 0) >= 70;
    }
    return true;
  });

  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisProgress, setSynthesisProgress] = useState(100);
  const [selectedSilhouette, setSelectedSilhouette] = useState(initialRanking.topMatch.silhouette);
  const [selectedEra, setSelectedEra] = useState(initialRanking.topMatch.era);
  const [selectedOccasion, setSelectedOccasion] = useState(
    initialRanking.topMatch.occasions?.[0] || "Black Tie Gala"
  );
  const [selectedFabric, setSelectedFabric] = useState(
    initialRanking.topMatch.fabrics?.[0] || "Silk Velvet"
  );
  const [selectedEmbellishment, setSelectedEmbellishment] = useState(
    initialRanking.topMatch.crafts?.[0] || "Bullion Zardozi"
  );

  // Visual Lens State
  const [lensImage, setLensImage] = useState<string>("/images/salon/arrival-2.jpg");
  const [lensTitle, setLensTitle] = useState<string>("Crimson Velvet Zardozi Kalidar");
  const [isLensScanning, setIsLensScanning] = useState<boolean>(false);

  // Dynamic canvas preview render
  const [canvasImage, setCanvasImage] = useState(initialRanking.topMatch.image);

  /**
   * Real-time semantic synthesis engine
   * Runs free-form natural language and computer-vision features through our neural garment knowledge graph
   */
  const runSynthesis = (
    queryText: string,
    extraFilters?: { silhouette?: string; fabric?: string; era?: string }
  ) => {
    setIsSynthesizing(true);
    setSynthesisProgress(25);
    setUvibePrompt(queryText);

    const timer1 = setTimeout(() => setSynthesisProgress(70), 200);
    const timer2 = setTimeout(() => {
      setSynthesisProgress(100);
      setIsSynthesizing(false);

      const ranking = rankGarmentsByQuery(queryText, extraFilters);

      setTopMatch(ranking.topMatch);
      setSuggestions(ranking.similarSuggestions);
      setSemanticConfidence(ranking.overallConfidence);
      setParsedState(ranking.parsedQuery);
      setCanvasImage(ranking.topMatch.image);
      setSelectedSilhouette(ranking.topMatch.silhouette);
      if (ranking.topMatch.fabrics?.length > 0) {
        setSelectedFabric(ranking.topMatch.fabrics[0]);
      }
      if (ranking.topMatch.crafts?.length > 0) {
        setSelectedEmbellishment(ranking.topMatch.crafts[0]);
      }
      if (ranking.topMatch.era) {
        setSelectedEra(ranking.topMatch.era);
      }

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
        colors: ["#C59347", "#44141C", "#FAF4ED"]
      });

      showToast(
        `Neural Atelier Synthesis: Matched "${ranking.topMatch.badge}" with ${ranking.overallConfidence}% affinity.`
      );
    }, 450);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  };

  const handleSynthesize = (queryOverride?: string) => {
    const q = (typeof queryOverride === "string" ? queryOverride : promptInput).trim();
    runSynthesis(q || "archival couture");
  };

  const handleLensSelect = (img: string, title: string, sil: string, fab: string) => {
    setLensImage(img);
    setLensTitle(title);
    setSelectedSilhouette(sil);
    setSelectedFabric(fab);
    setIsLensScanning(true);
    setCanvasImage(img);
    setPromptInput(title);

    setTimeout(() => {
      setIsLensScanning(false);
      runSynthesis(`${title} in ${sil} with ${fab}`, { silhouette: sil, fabric: fab });
    }, 500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setLensImage(result);
        const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_.]+/g, " ");
        setLensTitle(`Customer Reference: ${cleanName}`);
        setIsLensScanning(true);
        setCanvasImage(result);

        setTimeout(() => {
          setIsLensScanning(false);
          const uploadQuery = `${cleanName} bespoke couture pattern with metallic accents`;
          setPromptInput(uploadQuery);
          runSynthesis(uploadQuery);
        }, 600);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExportToCustom = (designTitle: string, itemRef?: UvibeGarment) => {
    const g = itemRef || topMatch;
    const details = `Bespoke Commission: ${designTitle || g.badge} • Silhouette: ${g.silhouette} • Fabric: ${g.fabrics?.join(", ")} • Craft: ${g.crafts?.join(", ")} • Era: ${g.era} • Price Ref: ₹${g.price.toLocaleString("en-IN")}. Customer Prompt: "${promptInput}".`;
    onOpenCustomRequest(undefined, details);
  };

  return (
    <div className="relative w-full bg-[#FAF2E8] text-[#2C0D12] overflow-x-hidden min-h-screen">
      {/* 3D Satin Silk Margin Drapery Curtains (Desktop) */}
      <aside
        aria-hidden="true"
        className="hidden 2xl:block fixed left-0 top-[58px] bottom-0 w-[80px] pointer-events-none z-30 opacity-75"
      >
        <LeftSilkMarginCurtain className="h-full w-full" />
      </aside>
      <aside
        aria-hidden="true"
        className="hidden 2xl:block fixed right-0 top-[58px] bottom-0 w-[80px] pointer-events-none z-30 opacity-75"
      >
        <RightSilkMarginCurtain className="h-full w-full" />
      </aside>

      {/* =========================================================================
          1. HAUTE COUTURE STUDIO HERO (Deep Burgundy Atelier Studio)
          ========================================================================= */}
      <section
        id="uvibe-hero"
        className="relative w-full bg-[#3B1218] text-[#FAF4ED] pt-12 sm:pt-16 pb-16 sm:pb-20 overflow-hidden border-b border-[#E8D2B7]/25"
      >
        {/* Soft Ambient Radial Illumination */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 20% 40%, rgba(184, 115, 110, 0.22), transparent 70%), radial-gradient(circle at 85% 30%, rgba(212, 175, 55, 0.12), transparent 60%)"
          }}
        />

        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10">
          {/* Eyebrow Ornament */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center gap-3 mb-3">
              <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#C59347]" />
              <svg width="48" height="24" viewBox="0 0 48 24" fill="none" className="text-[#C59347]">
                <circle cx="24" cy="12" r="2.5" fill="currentColor" />
                <circle cx="8" cy="12" r="1.5" />
                <circle cx="40" cy="12" r="1.5" />
                <path d="M12 12c3-4 6-4 9-2" stroke="currentColor" strokeWidth="1" fill="none" />
                <path d="M36 12c-3-4-6-4-9-2" stroke="currentColor" strokeWidth="1" fill="none" />
              </svg>
              <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#C59347]" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#25090E]/85 border border-[#C59347]/40 rounded-[2px] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#E2B43B] animate-pulse" />
              <span className="text-[9px] sm:text-[10px] tracking-[0.24em] uppercase font-sans font-semibold text-[#F7E7CE]">
                MAISON PRIVÉE • UVIBE AI STUDIO • NEURAL HAUTE DISCOVERY
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#FAF4ED] leading-[1.08] mb-3"
              style={{ fontFamily: "var(--font-nevrada), 'Nevrada', var(--font-cormorant), 'Playfair Display', serif" }}
            >
              Imagination to Your Wardrobe
            </h1>
            <p className="max-w-2xl mx-auto text-[13px] sm:text-[14.5px] text-[#E8D4C3] font-sans font-light leading-relaxed">
              <strong className="font-semibold text-[#FAF4ED]">Describe it. Envision it. Wear it.</strong> An intelligent neural atelier translating your moods, silhouettes, and fabric desires into verified archival masterworks, bespoke pattern draftings, and direct artisan commissions.
            </p>
          </div>

          {/* Main Hero Grid: Left Prompt Synthesis Studio | Right Live Neural Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-10">
            {/* Left Column: Semantic Input & Controls (7 Cols) */}
            <div className="lg:col-span-7 space-y-5">
              {/* 2 Mode Switcher Tabs */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "text", label: "Text Synthesis", icon: Wand2 },
                  { id: "lens", label: "Visual Lens", icon: Camera }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-[2px] text-[10px] sm:text-[11px] font-sans tracking-[0.16em] uppercase transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#FAF4ED] text-[#3B1218] font-bold shadow-md border border-[#D4AF37]"
                          : "bg-[#270A10]/80 text-[#E8D4C3]/80 border border-[#D9BFA4]/25 hover:bg-[#340E16] hover:text-[#FAF4ED]"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#C59347]" : "text-[#D9BFA4]/70"}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mode 1: TEXT SYNTHESIS */}
              {activeTab === "text" && (
                <div className="bg-[#FAF4ED] rounded-[3px] p-5 border border-[#D9BFA4]/60 shadow-xl space-y-4 text-[#2C0D12]">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] font-sans text-[#8C6D53]">
                    <span className="flex items-center gap-1.5 font-semibold text-[#44141C]">
                      <Wand2 className="w-3.5 h-3.5 text-[#C59347]" />
                      Mode: Natural Text Synthesis
                    </span>
                    <span className="px-2 py-0.5 rounded-[2px] bg-[#3B1218] text-[#F7E7CE] font-mono text-[9.5px] font-bold tracking-wider">
                      Semantic Match {semanticConfidence}%
                    </span>
                  </div>

                  {/* Textarea Input */}
                  <div className="relative">
                    <textarea
                      rows={3}
                      value={promptInput}
                      onChange={(e) => setPromptInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSynthesize();
                        }
                      }}
                      placeholder="Describe any design, clothing, silhouette, fabric (e.g. Mulberry silk, velvet, brocade), embroidery craft, or occasion..."
                      className="w-full p-3.5 pr-36 rounded-[2px] bg-[#FFFFFF] border border-[#D9BFA4] text-[13px] text-[#2C0D12] placeholder-[#9E8B7F] focus:outline-none focus:border-[#C59347] focus:ring-1 focus:ring-[#C59347] transition-all resize-none font-sans leading-relaxed"
                    />

                    <button
                      type="button"
                      onClick={() => handleSynthesize()}
                      disabled={isSynthesizing}
                      className="absolute bottom-3 right-3 px-4 py-2.5 rounded-[2px] bg-[#3B1218] hover:bg-[#4E1821] text-[#FAF4ED] text-[10.5px] font-sans font-semibold tracking-[0.16em] uppercase shadow-md flex items-center gap-2 border border-[#C59347]/50 transition-colors disabled:opacity-60 cursor-pointer"
                    >
                      {isSynthesizing ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#E2B43B]" />
                          <span>Synthesizing...</span>
                        </>
                      ) : (
                        <>
                          <span>Find My Style</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#E2B43B]" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Curated Quick Inspiration Prompts */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[9.5px] uppercase font-bold tracking-[0.14em] text-[#8C6D53]">
                      Curated Atelier Inspirations:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {INSPIRATION_PROMPTS.map((samplePrompt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setPromptInput(samplePrompt);
                            handleSynthesize(samplePrompt);
                          }}
                          className="text-left text-[11px] font-sans px-2.5 py-1 bg-[#F5ECE1] hover:bg-[#EBDDCF] text-[#44141C] border border-[#D9BFA4]/40 rounded-[2px] transition-colors line-clamp-1 cursor-pointer"
                        >
                          &ldquo;{samplePrompt}&rdquo;
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Atelier Parameter Tags */}
                  <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#D9BFA4]/40 text-[#44141C]">
                    <span className="text-[9.5px] uppercase font-bold tracking-[0.14em] text-[#8C6D53]">
                      Tags:
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        const nextSil = selectedSilhouette === "Kalidar & Basque" ? "Structured Sherwani" : "Kalidar & Basque";
                        setSelectedSilhouette(nextSil);
                        runSynthesis(promptInput, { silhouette: nextSil });
                      }}
                      className="px-2.5 py-1 rounded-[2px] text-[10px] font-sans font-medium border border-[#C59347]/50 bg-[#F5ECE1] hover:bg-[#FAF4ED] transition-colors cursor-pointer"
                    >
                      Silhouette: {selectedSilhouette}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const nextFab = selectedFabric === "Silk Velvet" ? "Mulberry Silk" : "Silk Velvet";
                        setSelectedFabric(nextFab);
                        runSynthesis(promptInput, { fabric: nextFab });
                      }}
                      className="px-2.5 py-1 rounded-[2px] text-[10px] font-sans font-medium border border-[#C59347]/50 bg-[#F5ECE1] hover:bg-[#FAF4ED] transition-colors cursor-pointer"
                    >
                      Fabric: {selectedFabric}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const nextEra = selectedEra === "Belle Époque Guild" ? "Mughal Renaissance" : "Belle Époque Guild";
                        setSelectedEra(nextEra);
                        runSynthesis(promptInput, { era: nextEra });
                      }}
                      className="px-2.5 py-1 rounded-[2px] text-[10px] font-sans font-medium border border-[#C59347]/50 bg-[#F5ECE1] hover:bg-[#FAF4ED] transition-colors cursor-pointer"
                    >
                      Era: {selectedEra}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const defaultQuery = "Crimson silk velvet kalidar lehenga with antique gold bullion zardozi";
                        setPromptInput(defaultQuery);
                        setSelectedSilhouette("Kalidar & Basque");
                        setSelectedFabric("Silk Velvet");
                        setSelectedEra("Belle Époque Guild");
                        runSynthesis(defaultQuery, {
                          silhouette: "Kalidar & Basque",
                          fabric: "Silk Velvet",
                          era: "Belle Époque Guild"
                        });
                      }}
                      className="text-[9px] text-[#8C6D53] hover:text-[#3B1218] underline ml-auto tracking-wider uppercase font-sans cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              )}

              {/* Mode 2: VISUAL LENS */}
              {activeTab === "lens" && (
                <div className="bg-[#FAF4ED] rounded-[3px] p-5 border border-[#D9BFA4]/60 shadow-xl space-y-4 text-[#2C0D12]">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] font-sans text-[#8C6D53]">
                    <span className="flex items-center gap-1.5 font-semibold text-[#44141C]">
                      <Camera className="w-3.5 h-3.5 text-[#C59347]" />
                      Mode: Neural Visual Lens Scanner
                    </span>
                    <span className="px-2 py-0.5 rounded-[2px] bg-[#3B1218] text-[#F7E7CE] font-mono text-[9.5px] font-bold tracking-wider">
                      Computer Vision 98.8%
                    </span>
                  </div>

                  {/* Drag & Drop Upload Zone + Runway Preset References */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                    {/* Upload Drop Target */}
                    <label className="sm:col-span-5 relative border-2 border-dashed border-[#C59347]/60 hover:border-[#44141C] bg-[#FFFBF7] rounded-[3px] p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="sr-only"
                      />
                      <UploadCloud className="w-7 h-7 text-[#C59347] group-hover:scale-110 transition-transform mb-1.5" />
                      <span className="text-[11px] font-sans font-semibold text-[#3B1218] uppercase tracking-wider">
                        Upload Reference Photo
                      </span>
                      <span className="text-[9px] text-[#8C6D53] mt-0.5 font-sans">
                        PNG, JPG, WEBP up to 25MB
                      </span>
                    </label>

                    {/* 4 Curated Runway Reference Snapshots */}
                    <div className="sm:col-span-7 space-y-1.5">
                      <span className="text-[9.5px] uppercase font-bold tracking-[0.14em] text-[#8C6D53]">
                        Or Scan Archival Reference:
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { title: "Velvet Zardozi", img: "/images/salon/arrival-2.jpg", sil: "Kalidar & Basque", fab: "Silk Velvet" },
                          { title: "Ivory Sherwani", img: "/images/salon/bestseller-2.jpg", sil: "Structured Sherwani", fab: "Mulberry Raw Silk" },
                          { title: "Aubergine Sari", img: "/images/salon/bestseller-3.jpg", sil: "Temple Drape Saree", fab: "Kanjivaram Brocade" },
                          { title: "Molten Gown", img: "/images/salon/bestseller-4.jpg", sil: "Corseted Gown", fab: "French Charmeuse" }
                        ].map((ref, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleLensSelect(ref.img, ref.title, ref.sil, ref.fab)}
                            className={`flex items-center gap-2 p-1.5 bg-[#FFFBF7] border rounded-[2px] text-left transition-all cursor-pointer ${
                              lensImage === ref.img ? "border-[#44141C] ring-1 ring-[#44141C] bg-[#F7ECE1]" : "border-[#D9BFA4]/60 hover:border-[#C59347]"
                            }`}
                          >
                            <img src={asset(ref.img)} alt={ref.title} className="w-8 h-8 rounded-[1px] object-cover" />
                            <span className="text-[10px] font-sans font-medium text-[#3B1218] truncate leading-tight">
                              {ref.title}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Scanned Analysis Attributes Card */}
                  <div className="bg-[#FFF8F0] border border-[#E3D1BE] p-3 rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-14 rounded-[2px] overflow-hidden bg-[#24080D] shrink-0 border border-[#C59347]/50">
                        <img src={asset(lensImage)} alt="Visual Lens Input" className="w-full h-full object-cover object-top" />
                        {isLensScanning && (
                          <motion.div
                            animate={{ y: [0, 56, 0] }}
                            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-x-0 h-[2px] bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                          />
                        )}
                      </div>
                      <div className="text-[11px] font-sans space-y-0.5">
                        <div className="font-semibold text-[#3B1218]">{lensTitle}</div>
                        <div className="text-[10px] text-[#7A6356]">
                          Silhouette: <strong className="text-[#3B1218]">{selectedSilhouette}</strong> • Textile: <strong className="text-[#3B1218]">{selectedFabric}</strong>
                        </div>
                        <div className="text-[9.5px] font-mono text-[#8C6D53]">
                          Extracted Feature Vectors: 1,024 High-Dim Embeddings
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleLensSelect(lensImage, lensTitle, selectedSilhouette, selectedFabric)}
                      disabled={isLensScanning}
                      className="px-4 py-2.5 bg-[#44141C] hover:bg-[#5C1A26] text-[#FAF4ED] text-[10px] font-sans font-semibold tracking-[0.16em] uppercase rounded-[2px] shadow-sm flex items-center justify-center gap-2 border border-[#C59347]/40 transition-colors shrink-0 cursor-pointer"
                    >
                      {isLensScanning ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#E2B43B]" />
                          <span>Scanning...</span>
                        </>
                      ) : (
                        <>
                          <Camera className="w-3.5 h-3.5 text-[#E2B43B]" />
                          <span>Scan & Match Vault</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: LIVE NEURAL CANVAS (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-[3px] overflow-hidden bg-[#24080D] border-2 border-[#C59347]/60 shadow-2xl p-3">
                {/* Header Bar */}
                <div className="flex items-center justify-between px-3 py-1.5 text-[9.5px] font-mono tracking-widest text-[#F7E7CE] border-b border-[#C59347]/25 pb-2 mb-2">
                  <span className="flex items-center gap-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE NEURAL CANVAS
                  </span>
                  <span className="text-[#E2B43B]">0.4S DYNAMIC RENDER</span>
                </div>

                {/* Render Image Container */}
                <div className="relative aspect-[3/4] rounded-[2px] overflow-hidden bg-black/60">
                  <img
                    src={asset(canvasImage)}
                    alt={topMatch.badge || "Neural Haute Couture Render"}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-[2px] text-[9.5px] font-mono font-bold bg-[#3B1218]/95 text-[#FAF4ED] border border-[#C59347]/60 shadow-md">
                      {topMatch.matchScore || semanticConfidence}% DRAPE SYNTHESIS
                    </span>
                    <span className="px-2.5 py-0.5 rounded-[2px] text-[9px] uppercase font-bold tracking-wider bg-black/75 text-white/95 border border-white/20">
                      {topMatch.fabrics?.[0] || selectedFabric} & {topMatch.crafts?.[0] || selectedEmbellishment}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 rounded-[2px] text-[9px] font-mono bg-black/80 text-amber-300 border border-amber-300/40">
                      4K PRO-VIEW
                    </span>
                  </div>

                  {/* Bottom Overlay Spec */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/85 to-transparent p-4 pt-8 text-white space-y-2.5">
                    <div className="text-[11px] font-mono text-[#E8D4C3]">
                      <div className="font-semibold text-white leading-tight">{topMatch.badge}</div>
                      <div className="text-[10px] text-[#C5B3A6] mt-0.5">
                        {topMatch.silhouette} • {topMatch.era} • ₹{topMatch.price.toLocaleString("en-IN")}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleExportToCustom(topMatch.badge, topMatch)}
                      className="w-full py-2.5 rounded-[2px] bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] hover:from-[#E2B43B] hover:to-[#C59347] text-[#24080D] font-sans font-bold text-[11px] uppercase tracking-[0.16em] shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Scissors className="w-3.5 h-3.5 text-[#24080D]" />
                      <span>Export to Custom Orders</span>
                    </button>
                  </div>
                </div>

                {/* 5-Dimensional AI Accuracy Justification Panel */}
                <div className="mt-3 bg-[#190508] border border-[#C59347]/40 rounded-[2px] p-3 text-[#FAF4ED] space-y-2.5">
                  <div className="flex items-center justify-between border-b border-[#C59347]/25 pb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#E2B43B]" />
                      <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#E2B43B]">
                        5-Dimensional Accuracy Vector
                      </span>
                    </div>
                    <span className="font-mono text-[10.5px] font-bold text-[#FAF4ED] bg-[#3B1218] px-2 py-0.5 rounded-[2px] border border-[#C59347]/50 shadow-xs">
                      {topMatch.matchScore || semanticConfidence}% Verified Match
                    </span>
                  </div>

                  {/* 5 Metric Dimensions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[9px] font-sans">
                    <div>
                      <div className="flex justify-between text-[#D9BFA4]">
                        <span>Clothes Silhouette (30%)</span>
                        <span className="font-mono font-bold text-white">{topMatch.scoreBreakdown?.clothes ?? 98}%</span>
                      </div>
                      <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden mt-0.5">
                        <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F59E0B]" style={{ width: `${topMatch.scoreBreakdown?.clothes ?? 98}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[#D9BFA4]">
                        <span>Color & Hue Harmony (30%)</span>
                        <span className="font-mono font-bold text-white">{topMatch.scoreBreakdown?.color ?? 97}%</span>
                      </div>
                      <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden mt-0.5">
                        <div className="h-full bg-gradient-to-r from-[#38BDF8] to-[#60A5FA]" style={{ width: `${topMatch.scoreBreakdown?.color ?? 97}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[#D9BFA4]">
                        <span>Designing & Structure (15%)</span>
                        <span className="font-mono font-bold text-white">{topMatch.scoreBreakdown?.designing ?? 95}%</span>
                      </div>
                      <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden mt-0.5">
                        <div className="h-full bg-gradient-to-r from-[#E2B43B] to-[#C59347]" style={{ width: `${topMatch.scoreBreakdown?.designing ?? 95}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[#D9BFA4]">
                        <span>Fabric Physics & Weave (15%)</span>
                        <span className="font-mono font-bold text-white">{topMatch.scoreBreakdown?.fabric ?? 96}%</span>
                      </div>
                      <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden mt-0.5">
                        <div className="h-full bg-gradient-to-r from-[#C084FC] to-[#A855F7]" style={{ width: `${topMatch.scoreBreakdown?.fabric ?? 96}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Artisanal Craft */}
                  <div className="text-[9px] font-sans">
                    <div className="flex justify-between text-[#D9BFA4]">
                      <span>Artisanal Embellishment & Craft (10%)</span>
                      <span className="font-mono font-bold text-white">{topMatch.scoreBreakdown?.craft ?? 94}%</span>
                    </div>
                    <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden mt-0.5">
                      <div className="h-full bg-gradient-to-r from-[#34D399] to-[#10B981]" style={{ width: `${topMatch.scoreBreakdown?.craft ?? 94}%` }} />
                    </div>
                  </div>

                  {/* Summary Rationale */}
                  <div className="pt-2 border-t border-[#C59347]/20 text-[10px] text-[#F7E7CE] leading-relaxed font-sans">
                    <p className="italic">
                      "{topMatch.justification?.summary || `Mathematical affinity verified across silhouette architecture, chromatic harmony, and fabric physics.`}"
                    </p>
                  </div>

                  {/* Key Strengths Tags */}
                  {topMatch.justification?.keyStrengths && topMatch.justification.keyStrengths.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {topMatch.justification.keyStrengths.map((str, i) => (
                        <span key={i} className="text-[8.5px] px-1.5 py-0.5 bg-[#3B1218] border border-[#C59347]/40 text-[#F7E7CE] rounded-[2px] font-mono">
                          ✓ {str}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. CURATED ARCHIVAL MATCHES (Matching Home / Top Deals Card Vibe)
          ========================================================================= */}
      <section className="relative w-full py-14 sm:py-16">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-[#EAE0D5]">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] font-sans font-semibold text-[#8C2C3E] mb-1">
                <FileCheck2 className="w-3.5 h-3.5 text-[#C59347]" />
                <span>VERIFIED ARCHIVAL VAULT • {semanticConfidence}%+ AFFINITY</span>
              </div>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#2C0D12] leading-tight"
                style={{ fontFamily: "var(--font-nevrada), 'Nevrada', var(--font-cormorant), 'Playfair Display', serif" }}
              >
                Similar Suggestions for Your Interest
              </h2>
              <p className="text-[12px] sm:text-[13px] text-[#7A6356] font-sans font-light mt-1">
                Archival garments retrieved from private salon vaults matching your silhouette and textile query. Ready for immediate acquisition or bespoke re-tailoring.
              </p>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-sans text-[#7A6356] shrink-0">
              <span className="px-3 py-1 rounded-[2px] bg-[#FAF4ED] border border-[#D9BFA4] font-mono text-[10.5px] text-[#44141C] font-semibold">
                {filteredSuggestions.length} of {suggestions.length} Curated Masterpieces
              </span>
            </div>
          </div>

          {/* Dimension Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#8C6D53] mr-1">
              Filter By Dimension:
            </span>
            {[
              { id: "all", label: `All Curated (${suggestions.length})` },
              { id: "silhouette", label: "Exact Silhouette" },
              { id: "color", label: "Color Harmonious" },
              { id: "craft", label: "Artisanal Craft" }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSuggestionsFilter(tab.id as any)}
                className={`px-3 py-1 rounded-[2px] text-[10px] font-sans uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  suggestionsFilter === tab.id
                    ? "bg-[#3B1218] text-[#FAF4ED] border border-[#C59347] shadow-sm"
                    : "bg-[#FAF4ED] text-[#7A6356] border border-[#D9BFA4]/60 hover:border-[#3B1218]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Archival Match Cards Grid */}
          {filteredSuggestions.length === 0 ? (
            <div className="p-8 text-center bg-[#FAF4ED] border border-[#D9BFA4]/60 rounded-[3px] space-y-3">
              <p className="text-sm font-sans text-[#44141C]">
                No suggestions directly matched this specific dimension filter.
              </p>
              <button
                type="button"
                onClick={() => setSuggestionsFilter("all")}
                className="px-4 py-1.5 bg-[#44141C] text-[#FAF4ED] text-[10px] font-sans font-semibold uppercase tracking-wider rounded-[2px]"
              >
                Reset to All Curated
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredSuggestions.map((item) => (
                <div
                  key={item.id}
                  className="group bg-[#FAF4ED] border border-[#E8D7C8] hover:border-[#C59347] rounded-[2px] overflow-hidden shadow-xs hover:shadow-[0_0_22px_rgba(197,147,71,0.35)] transition-all duration-500 flex flex-col justify-between relative"
                >
                  <div>
                    {/* Image Box */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#F5ECE1]">
                      <img
                        src={asset(item.image)}
                        alt={item.badge}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      />

                      {/* Affinity Badge + Interactive "Why X%?" toggle */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
                        <span className="px-2 py-0.5 rounded-[2px] text-[9.5px] font-mono font-bold bg-[#3B1218]/90 text-[#FAF4ED] border border-[#C59347]/50 shadow-md flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#E2B43B]" />
                          {item.matchScore}% Match
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedJustificationId(expandedJustificationId === item.id ? null : item.id);
                          }}
                          className="px-1.5 py-0.5 rounded-[2px] text-[8.5px] font-mono font-medium bg-black/80 hover:bg-[#3B1218] text-[#F7E7CE] border border-[#C59347]/40 shadow-sm flex items-center gap-1 cursor-pointer transition-colors"
                          title="Inspect accuracy scoring justification"
                        >
                          <Info className="w-2.5 h-2.5 text-[#E2B43B]" />
                          <span>{expandedJustificationId === item.id ? "Close" : "Why?"}</span>
                        </button>
                      </div>

                      {/* Top Right Tag */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5">
                        <span className="px-2 py-0.5 rounded-[1px] bg-black/75 text-white/95 text-[8.5px] uppercase tracking-wider font-mono">
                          {item.tag}
                        </span>
                      </div>

                      {/* Accuracy Score Breakdown Overlay Drawer */}
                      <AnimatePresence>
                        {expandedJustificationId === item.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 bg-[#24080D]/95 backdrop-blur-sm p-3 z-20 flex flex-col justify-between text-[#FAF4ED] text-[10px]"
                          >
                            <div>
                              <div className="flex items-center justify-between border-b border-[#C59347]/30 pb-1 mb-2">
                                <span className="font-mono text-[9px] uppercase tracking-wider text-[#E2B43B] font-bold">
                                  Score Justification
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setExpandedJustificationId(null)}
                                  className="text-[9px] text-[#D9BFA4] hover:text-white px-1"
                                >
                                  ✕
                                </button>
                              </div>

                              {/* 5-Dimensional Mini Progress Bars */}
                              <div className="space-y-1.5 font-sans">
                                <div>
                                  <div className="flex justify-between text-[8.5px] text-[#D9BFA4]">
                                    <span>Clothes Silhouette (30%)</span>
                                    <span className="font-mono font-bold text-white">{item.scoreBreakdown?.clothes ?? item.matchScore}%</span>
                                  </div>
                                  <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden mt-0.5">
                                    <div className="h-full bg-[#E2B43B]" style={{ width: `${item.scoreBreakdown?.clothes ?? item.matchScore}%` }} />
                                  </div>
                                </div>

                                <div>
                                  <div className="flex justify-between text-[8.5px] text-[#D9BFA4]">
                                    <span>Color Harmony (30%)</span>
                                    <span className="font-mono font-bold text-white">{item.scoreBreakdown?.color ?? item.matchScore}%</span>
                                  </div>
                                  <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden mt-0.5">
                                    <div className="h-full bg-[#38BDF8]" style={{ width: `${item.scoreBreakdown?.color ?? item.matchScore}%` }} />
                                  </div>
                                </div>

                                <div>
                                  <div className="flex justify-between text-[8.5px] text-[#D9BFA4]">
                                    <span>Design Structure (15%)</span>
                                    <span className="font-mono font-bold text-white">{item.scoreBreakdown?.designing ?? item.matchScore}%</span>
                                  </div>
                                  <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden mt-0.5">
                                    <div className="h-full bg-[#C59347]" style={{ width: `${item.scoreBreakdown?.designing ?? item.matchScore}%` }} />
                                  </div>
                                </div>

                                <div>
                                  <div className="flex justify-between text-[8.5px] text-[#D9BFA4]">
                                    <span>Fabric & Weave (15%)</span>
                                    <span className="font-mono font-bold text-white">{item.scoreBreakdown?.fabric ?? item.matchScore}%</span>
                                  </div>
                                  <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden mt-0.5">
                                    <div className="h-full bg-[#C084FC]" style={{ width: `${item.scoreBreakdown?.fabric ?? item.matchScore}%` }} />
                                  </div>
                                </div>

                                <div>
                                  <div className="flex justify-between text-[8.5px] text-[#D9BFA4]">
                                    <span>Artisanal Craft (10%)</span>
                                    <span className="font-mono font-bold text-white">{item.scoreBreakdown?.craft ?? item.matchScore}%</span>
                                  </div>
                                  <div className="w-full h-1 bg-black/50 rounded-full overflow-hidden mt-0.5">
                                    <div className="h-full bg-[#34D399]" style={{ width: `${item.scoreBreakdown?.craft ?? item.matchScore}%` }} />
                                  </div>
                                </div>
                              </div>

                              {/* Summary */}
                              <p className="mt-2 text-[9px] text-[#F7E7CE] leading-tight italic line-clamp-3">
                                "{item.justification?.summary || item.desc}"
                              </p>

                              {/* Strengths & Divergences */}
                              {item.justification?.keyStrengths && item.justification.keyStrengths.length > 0 && (
                                <div className="mt-1.5 flex flex-wrap gap-1">
                                  {item.justification.keyStrengths.slice(0, 2).map((st, i) => (
                                    <span key={i} className="text-[7.5px] px-1 py-0.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded-[1px]">
                                      ✓ {st}
                                    </span>
                                  ))}
                                </div>
                              )}
                              {item.justification?.divergences && item.justification.divergences.length > 0 && (
                                <div className="mt-1 flex flex-wrap gap-1">
                                  {item.justification.divergences.slice(0, 1).map((div, i) => (
                                    <span key={i} className="text-[7.5px] px-1 py-0.5 bg-amber-950/80 border border-amber-500/40 text-amber-300 rounded-[1px]">
                                      ⚠ {div}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="pt-1.5 border-t border-[#C59347]/20 flex justify-between items-center text-[8px] font-mono text-[#D9BFA4]">
                              <span>Overall: {item.matchScore}%</span>
                              <button
                                type="button"
                                onClick={() => setExpandedJustificationId(null)}
                                className="text-[#E2B43B] underline hover:text-white"
                              >
                                View Photo
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 space-y-2">
                      <h3
                        className="text-[16px] font-normal text-[#2C0D12] group-hover:text-[#44141C] transition-colors leading-snug line-clamp-1"
                        style={{ fontFamily: "var(--font-nevrada), 'Nevrada', var(--font-cormorant), 'Playfair Display', serif" }}
                      >
                        {item.badge}
                      </h3>
                      <p className="text-[11px] text-[#7A6356] font-sans line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>

                      {/* Price Line with Blue Tick / Gold PRO at Rightmost Position */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-[#E8D7C8]">
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-[17px] font-bold text-[#44141C]">
                            ₹{item.price.toLocaleString("en-IN")}
                          </span>
                          {item.originalPrice && (
                            <span className="text-[11px] text-[#9E8B7F] line-through font-sans">
                              ₹{item.originalPrice.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>

                        {/* Rightmost Verified Tick or Golden PRO Logo (Aligned on price line, ZERO HEARTS) */}
                        {item.verifiedBadge === "blue-tick" && (
                          <span title="Maison Verified Design" className="inline-flex items-center text-[#2563EB]">
                            <CheckCircle2 className="w-4 h-4 fill-[#2563EB] text-white" />
                          </span>
                        )}
                        {item.verifiedBadge === "gold-pro" && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-[2px] bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#24080D] font-sans font-black text-[9px] tracking-wider uppercase shadow-xs">
                            PRO
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="p-4 pt-0 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedProductId(item.linkedProductId || item.id)}
                        className="py-2 px-2.5 rounded-[2px] border border-[#D9BFA4] hover:border-[#44141C] bg-[#FFFFFF] text-[#2C0D12] text-[10px] font-sans font-semibold tracking-wider uppercase hover:bg-[#FAF4ED] transition-colors text-center cursor-pointer"
                      >
                        View Details
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          addToCart({
                            id: item.linkedProductId || item.id,
                            title: item.badge,
                            price: item.price,
                            image: item.image,
                            size: "Bespoke",
                            color: item.colors?.[0] || "Archival"
                          });
                          confetti({
                            particleCount: 35,
                            spread: 45,
                            origin: { y: 0.7 }
                          });
                          showToast(`Added "${item.badge}" to your shopping bag.`);
                        }}
                        className="py-2 px-2.5 rounded-[2px] bg-[#44141C] hover:bg-[#5E1E28] text-[#FAF4ED] text-[10px] font-sans font-semibold tracking-wider uppercase transition-colors shadow-xs text-center cursor-pointer"
                      >
                        Add to Bag
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleExportToCustom(item.badge, item)}
                      className="w-full py-1.5 rounded-[2px] bg-[#F5ECE1] hover:bg-[#EBDDCF] text-[#44141C] text-[9.5px] font-sans font-semibold uppercase tracking-[0.14em] transition-colors flex items-center justify-center gap-1.5 border border-[#D9BFA4]/60 cursor-pointer"
                    >
                      <Scissors className="w-3 h-3 text-[#C59347]" />
                      <span>Commission Custom Tailoring</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          3. BESPOKE CONCIERGE & TOILE DRAPE LAB BANNER
          ========================================================================= */}
      <section className="relative w-full py-10">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="relative rounded-[3px] p-8 lg:p-12 bg-gradient-to-r from-[#3B1218] via-[#481822] to-[#3B1218] border border-[#C59347]/40 shadow-2xl overflow-hidden text-[#FAF4ED]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Visual Illustration */}
              <div className="lg:col-span-4">
                <div className="relative aspect-[4/3] rounded-[2px] overflow-hidden border border-[#D9BFA4]/40 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop"
                    alt="Toile Drape Lab"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded-[2px] text-[8.5px] font-mono uppercase bg-black/80 text-[#FAF4ED] border border-[#C59347]/50">
                      Toile Drape Lab
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-center">
                    <span className="px-2 py-0.5 rounded-[1px] text-[8.5px] font-mono bg-white/95 text-[#3B1218] border border-[#D9BFA4] font-semibold">
                      SPEC REF: UVIBE-TOILE-2026
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Copy & CTA */}
              <div className="lg:col-span-8 space-y-3.5">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-[#E2B43B]">
                  <Sparkles className="w-3 h-3 text-[#E2B43B]" />
                  <span>Maison Privée Bespoke Concierge</span>
                </div>

                <h3
                  className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#FAF4ED] leading-snug"
                  style={{ fontFamily: "var(--font-nevrada), 'Nevrada', var(--font-cormorant), 'Playfair Display', serif" }}
                >
                  Can&apos;t find your exact silhouette?{" "}
                  <span className="italic text-[#E8D4C3]">
                    Let our master artisans craft it for you.
                  </span>
                </h3>

                <p className="text-[12px] sm:text-[13.5px] text-[#E8D4C3] font-sans font-light leading-relaxed max-w-2xl">
                  Our master patternmakers and heritage artisans hand-draft individualized muslin toiles, source rare archival fabrics from Varanasi to Lyon, and translate your AI discovery prompt or reference sketch into a finished bespoke silhouette. Includes private salon fittings in London, Paris, and Mumbai.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenCustomRequest(undefined, promptInput)}
                    className="px-6 py-3 rounded-[2px] bg-[#FAF4ED] hover:bg-white text-[#3B1218] font-sans text-[11px] font-bold uppercase tracking-[0.16em] shadow-lg flex items-center gap-2 border border-[#C59347] transition-all cursor-pointer"
                  >
                    <span>Send Custom Atelier Enquiry</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C59347]" />
                  </button>

                  <span className="text-[11px] text-[#E8D4C3] font-mono flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Direct AI reference inside the atelier dossier enabled
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SEAMLESS MARIANA VOSS EDITORIAL FOOTER (Master Panoramic Artwork)
          ========================================================================= */}
      <footer
        id="atelier-footer"
        className="relative w-full overflow-hidden bg-[#5C0D15] text-[#FAF3EB] min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] flex items-center mt-12"
      >
        {/* Master Panoramic Artwork Backdrop (Provided 100% exact editorial photo with ample headroom) */}
        <div className="absolute inset-0 z-0">
          <img
            src={asset("/images/salon/footer-banner-master.jpg")}
            alt="Mariana Voss Atelier"
            className="w-full h-full object-cover object-top md:object-[center_top] pointer-events-none select-none"
          />
        </div>

        <div className="relative z-10 w-full max-w-[1240px] mx-auto px-5 sm:px-8 py-14 sm:py-16 lg:py-20 grid grid-cols-1 md:grid-cols-12 items-center gap-8">
          {/* Left Column Spacer: Leaves full view for Mariana Voss in the photo */}
          <div className="hidden md:block md:col-span-4 lg:col-span-4 h-full pointer-events-none min-h-[160px]" />

          {/* Center Contact Rows */}
          <div className="md:col-span-4 lg:col-span-4 bg-[#5C0D15]/80 md:bg-transparent p-4 md:p-0 rounded-[2px] backdrop-blur-[2px] md:backdrop-blur-none border border-[#E5D0C3]/15 md:border-none">
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#E8D5C7] font-sans mb-4">
              LET’S CREATE SOMETHING EXTRAORDINARY
            </p>
            <ul className="space-y-2.5 text-[11px] font-sans text-[#E8D5C7]/95">
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full border border-[#E5D0C3]/40 flex items-center justify-center shrink-0">
                  <Mail className="w-3 h-3 text-[#E5D0C3]" strokeWidth={1.6} />
                </span>
                hello@marianavoss.com
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full border border-[#E5D0C3]/40 flex items-center justify-center shrink-0">
                  <Globe className="w-3 h-3 text-[#E5D0C3]" strokeWidth={1.6} />
                </span>
                www.marianavoss.com
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full border border-[#E5D0C3]/40 flex items-center justify-center shrink-0">
                  <MapPin className="w-3 h-3 text-[#E5D0C3]" strokeWidth={1.6} />
                </span>
                Milan, Italy
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full border border-[#E5D0C3]/40 flex items-center justify-center shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#E5D0C3"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3 h-3"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </span>
                @marianavoss.design
              </li>
            </ul>
          </div>

          {/* Right Creative Director Quote */}
          <div className="md:col-span-4 lg:col-span-4 md:border-l border-[#E5D0C3]/25 md:pl-7 pr-4 sm:pr-8 lg:pr-14 relative bg-[#5C0D15]/80 md:bg-transparent p-4 md:p-0 rounded-[2px] backdrop-blur-[2px] md:backdrop-blur-none border border-[#E5D0C3]/15 md:border-none">
            <span
              className="block text-[38px] leading-none text-[#D9BFA4]/60 select-none mb-1"
              style={{ fontFamily: "var(--font-nevrada), 'Nevrada', var(--font-cormorant), 'Playfair Display', serif" }}
            >
              “
            </span>
            <blockquote
              className="text-[14.5px] sm:text-[15.5px] leading-[1.6] text-[#F7ECE2] font-normal"
              style={{ fontFamily: "var(--font-nevrada), 'Nevrada', var(--font-cormorant), 'Playfair Display', serif" }}
            >
              Design is not just what it looks like and feels like. Design is how it works.
            </blockquote>
            <p className="mt-3 text-[9px] tracking-[0.24em] uppercase text-[#D9BFA4] font-sans">
              — MARIANA VOSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
