"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { AtelierPantoneColorWheel, ActiveColorway } from "@/components/studio/AtelierPantoneColorWheel";
import { 
  Plus, 
  Flame, 
  Palette, 
  Layers, 
  Sun, 
  Moon, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  Share2, 
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

export const AtelierPantoneStudioView: React.FC = () => {
  const { 
    activeStudioTab, 
    setActiveStudioTab, 
    listedProducts, 
    drafts, 
    showToast 
  } = useStudio();

  // Active Selected Color for fabric drape simulation
  const [activeColor, setActiveColor] = useState<{ hex: string; pantone: string; name: string }>({
    hex: "#1B2430",
    pantone: "19-3832 TCX",
    name: "Navy Peony"
  });

  // Lighting environment simulation
  const [lightingMode, setLightingMode] = useState<"salon" | "daylight" | "runway" | "atelier">("salon");

  const lightingGradients = {
    salon: "linear-gradient(135deg, rgba(255, 230, 200, 0.15) 0%, rgba(58, 14, 30, 0.25) 100%)",
    daylight: "linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(180, 210, 255, 0.15) 100%)",
    runway: "linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(0, 0, 0, 0.4) 100%)",
    atelier: "linear-gradient(135deg, rgba(245, 222, 179, 0.2) 0%, rgba(139, 69, 19, 0.2) 100%)"
  };

  const fabrics = [
    { name: "Pure Mongolian Cashmere", weave: "850gsm Double-Faced Twill", opacity: "Opaque Matte" },
    { name: "Heavy Duchess Satin", weave: "100% Pure Silk Lustre", opacity: "High Sheen" },
    { name: "Mulberry Silk Organza", weave: "Translucent Architectural Crisp", opacity: "Sheer 40%" },
    { name: "Archival Crushed Velvet", weave: "Silk-Rayon Directional Pile", opacity: "Directional Lustre" }
  ];

  return (
    <div className="w-full space-y-8 animate-fadeIn pb-24">
      {/* Studio Sub Navigation Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#E8D2B7]/80 pb-3 gap-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
          <nav className="flex items-center gap-6 sm:gap-8">
            <button
              onClick={() => setActiveStudioTab("list-new")}
              className="py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#837376] hover:text-[#3A0E1E] transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#865040]" />
              <span>List New Product</span>
            </button>
            <button
              onClick={() => setActiveStudioTab("listed")}
              className="py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#837376] hover:text-[#3A0E1E] transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <span>Listed Products</span>
              <span className="text-[10px] bg-[#FFF7F9] px-2 py-0.5 rounded-full border border-[#E8D2B7] text-[#837376]">
                ({listedProducts.length})
              </span>
            </button>
            <button
              onClick={() => setActiveStudioTab("sold")}
              className="py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#837376] hover:text-[#3A0E1E] transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <span>Sold Products</span>
              <span className="text-[10px] bg-[#FFF7F9] px-2 py-0.5 rounded-full border border-[#E8D2B7] text-[#837376]">
                (18)
              </span>
            </button>
            <button
              onClick={() => setActiveStudioTab("drafts")}
              className="py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#837376] hover:text-[#3A0E1E] transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <span>Drafts</span>
              <span className="text-[10px] bg-[#FFF7F9] px-2 py-0.5 rounded-full border border-[#E8D2B7] text-[#837376]">
                ({drafts.length})
              </span>
            </button>
            <button
              onClick={() => setActiveStudioTab("boosted")}
              className="py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#837376] hover:text-[#3A0E1E] transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Boosted (4)</span>
            </button>
            <button
              onClick={() => setActiveStudioTab("pantone")}
              className="relative py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#3A0E1E] transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-bold">Pantone & Color Wheel</span>
              <motion.span
                layoutId="studioSubNavActive"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]"
              />
            </button>
          </nav>
        </div>

        {/* Export Spec Sheet CTA */}
        <button
          type="button"
          onClick={() => showToast("Exporting Atelier Pantone Swatch Dossier Specification Sheet...")}
          className="px-4 py-2 rounded-xl bg-white border border-[#E8D2B7] hover:border-[#D4AF37] text-xs font-mono font-medium text-[#3A0E1E] flex items-center gap-2 shadow-2xs cursor-pointer transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-[#865040]" />
          <span>Export TCX Spec Sheet</span>
        </button>
      </div>

      {/* Main Interactive Pantone Color Wheel Workstation */}
      <AtelierPantoneColorWheel
        initialHex={activeColor.hex}
        onSelectColor={(col) => setActiveColor(col)}
        onPaletteChange={(palette) => {
          showToast(`Atelier Garment Palette updated (${palette.length} colorways active)`);
        }}
      />

      {/* Fabric Drape & Lighting Simulation Studio */}
      <div className="bg-[#FAF7F2] border border-[#E8D2B7] rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E8D2B7]/80">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#865040] font-bold block mb-1">
              Photometric Dye Simulation
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3A0E1E]">
              Haute Textile Draping: PANTONE® {activeColor.pantone}
            </h3>
            <p className="text-xs text-[#6B5A52] font-sans">
              Simulating dye penetration and directional luster under calibrated salon lighting environments.
            </p>
          </div>

          {/* Lighting Selector */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-white border border-[#E8D2B7]">
            <span className="text-[10px] font-mono text-[#8F8178] px-2 uppercase tracking-wider">
              Illuminant:
            </span>
            {(["salon", "daylight", "runway", "atelier"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setLightingMode(mode)}
                className={`px-3 py-1 rounded-lg text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                  lightingMode === mode
                    ? "bg-[#3A0E1E] text-white shadow-2xs font-semibold"
                    : "text-[#6B5A52] hover:text-[#3A0E1E] hover:bg-[#FAF7F2]"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Luxury Fabric Swatches */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {fabrics.map((f, idx) => (
            <div
              key={f.name}
              className="group relative rounded-2xl overflow-hidden border border-[#E8D2B7] bg-white p-4 space-y-3 transition-all hover:shadow-md"
            >
              {/* Simulated Fabric Drape Texture */}
              <div
                className="relative aspect-4/3 w-full rounded-xl overflow-hidden shadow-inner transition-transform group-hover:scale-102 duration-300"
                style={{ backgroundColor: activeColor.hex }}
              >
                {/* Photometric Lighting Layer */}
                <div
                  className="absolute inset-0 pointer-events-none transition-all duration-500"
                  style={{ background: lightingGradients[lightingMode] }}
                />

                {/* Fabric Weave Texture Overlay */}
                <div
                  className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage: idx % 2 === 0
                      ? "radial-gradient(circle at 50% 50%, white 10%, transparent 70%)"
                      : "linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.2) 75%)"
                  }}
                />

                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[9px] font-mono bg-black/60 text-white backdrop-blur-xs">
                  {f.opacity}
                </span>
              </div>

              <div>
                <span className="font-serif font-bold text-xs text-[#3A0E1E] block truncate">
                  {f.name}
                </span>
                <span className="text-[11px] font-mono text-[#8F8178] block">
                  {f.weave}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
