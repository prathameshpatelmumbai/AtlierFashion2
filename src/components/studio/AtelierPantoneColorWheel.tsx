"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  PANTONE_LIBRARY, 
  PANTONE_CATEGORIES, 
  PantoneColor, 
  findClosestPantone, 
  hslToRgb, 
  rgbToHex, 
  hexToRgb, 
  rgbToHsl 
} from "@/data/pantoneLibrary";
import { 
  Search, 
  Sparkles, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Eye, 
  Palette, 
  Sliders, 
  Layers,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ActiveColorway {
  id: string;
  name: string;
  pantone: string;
  hex: string;
  label: string;
  description: string;
}

interface AtelierPantoneColorWheelProps {
  initialHex?: string;
  initialPalette?: ActiveColorway[];
  onPaletteChange?: (palette: ActiveColorway[]) => void;
  onSelectColor?: (color: { hex: string; pantone: string; name: string }) => void;
  compactMode?: boolean;
}

export const AtelierPantoneColorWheel: React.FC<AtelierPantoneColorWheelProps> = ({
  initialHex = "#1B2430",
  initialPalette,
  onPaletteChange,
  onSelectColor,
  compactMode = false
}) => {
  // HSL state for the color wheel
  const initialHsl = rgbToHsl(
    hexToRgb(initialHex).r,
    hexToRgb(initialHex).g,
    hexToRgb(initialHex).b
  );

  const [hue, setHue] = useState<number>(initialHsl.h);
  const [saturation, setSaturation] = useState<number>(initialHsl.s);
  const [lightness, setLightness] = useState<number>(initialHsl.l);

  // Active computed Hex
  const currentRgb = hslToRgb(hue, saturation, lightness);
  const currentHex = rgbToHex(currentRgb.r, currentRgb.g, currentRgb.b);

  // Closest Pantone Match
  const matchInfo = findClosestPantone(currentHex);
  const currentPantone = matchInfo.color;

  // Active Curated Colorways (Garment Palette)
  const [palette, setPalette] = useState<ActiveColorway[]>(
    initialPalette || [
      {
        id: "c-1",
        name: "MIDNIGHT CHARCOAL",
        pantone: "19-3908 TCX",
        hex: "#2C2C2E",
        label: "Natural Archival Charcoal",
        description: "Dyed in small batches with natural graphite minerals for balanced matte depth."
      },
      {
        id: "c-2",
        name: "DEEP NAVY",
        pantone: "19-3832 TCX",
        hex: "#1B2430",
        label: "Prussian Royal Navy",
        description: "Steeped in mineral indigo vats for rich nautical saturation under evening light."
      },
      {
        id: "c-3",
        name: "CAMEL",
        pantone: "16-1139 TCX",
        hex: "#C19A6B",
        label: "Tuscan Warm Camel",
        description: "Spun from unbleached golden Mongolian cashmere with warm caramel reflections."
      },
      {
        id: "c-4",
        name: "ONYX BLACK",
        pantone: "19-4004 TCX",
        hex: "#111111",
        label: "Obsidian Pitch Black",
        description: "Immersed in double-saturated pitch obsidian pigments for architectural contrast."
      }
    ]
  );

  // UI state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Palettes");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isDraggingWheel, setIsDraggingWheel] = useState(false);

  // Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wheelContainerRef = useRef<HTMLDivElement | null>(null);

  // Notify parent of palette changes
  const updatePalette = (newPalette: ActiveColorway[]) => {
    setPalette(newPalette);
    if (onPaletteChange) {
      onPaletteChange(newPalette);
    }
  };

  // Draw Chromatic Wheel Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 6;

    ctx.clearRect(0, 0, size, size);

    // Render radial chromatic spectrum
    for (let angle = 0; angle < 360; angle += 1) {
      const startAngle = ((angle - 1) * Math.PI) / 180;
      const endAngle = ((angle + 1) * Math.PI) / 180;

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();

      const gradient = ctx.createRadialGradient(center, center, 0, center, center, radius);
      gradient.addColorStop(0, `hsl(${angle}, 0%, ${lightness}%)`);
      gradient.addColorStop(1, `hsl(${angle}, 100%, ${lightness}%)`);

      ctx.fillStyle = gradient;
      ctx.fill();
    }

    // Outer luxury gold hairline ring
    ctx.beginPath();
    ctx.arc(center, center, radius + 2, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }, [lightness]);

  // Handle Wheel Touch / Click Dragging
  const handlePointerInteraction = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement> | PointerEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      const x = clientX - rect.left - rect.width / 2;
      const y = clientY - rect.top - rect.height / 2;

      const maxRadius = rect.width / 2 - 6;
      const distance = Math.min(Math.sqrt(x * x + y * y), maxRadius);

      // Calculate Angle (Hue 0-360)
      let angle = Math.atan2(y, x) * (180 / Math.PI);
      if (angle < 0) angle += 360;

      // Calculate Saturation (0-100)
      const sat = Math.round((distance / maxRadius) * 100);

      setHue(Math.round(angle));
      setSaturation(sat);

      if (onSelectColor) {
        const rgb = hslToRgb(angle, sat, lightness);
        const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
        const closest = findClosestPantone(hex);
        onSelectColor({
          hex,
          pantone: closest.color.code,
          name: closest.color.name
        });
      }
    },
    [lightness, onSelectColor]
  );

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDraggingWheel(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    handlePointerInteraction(e);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDraggingWheel) {
      handlePointerInteraction(e);
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDraggingWheel) {
      setIsDraggingWheel(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch (err) {}
    }
  };

  // Select a preset Pantone Swatch directly
  const handleSelectPantone = (p: PantoneColor) => {
    const rgb = hexToRgb(p.hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    setHue(hsl.h);
    setSaturation(hsl.s);
    setLightness(hsl.l);

    if (onSelectColor) {
      onSelectColor({
        hex: p.hex,
        pantone: p.code,
        name: p.name
      });
    }
  };

  // Add active shade to collection colorways
  const handleAddActiveToPalette = () => {
    const exists = palette.some((c) => c.pantone === currentPantone.code);
    if (exists) return;

    const newColorway: ActiveColorway = {
      id: `c-${Date.now()}`,
      name: currentPantone.name.toUpperCase(),
      pantone: currentPantone.code,
      hex: currentHex,
      label: currentPantone.name,
      description: currentPantone.description
    };

    updatePalette([...palette, newColorway]);
  };

  // Remove colorway
  const handleRemoveColorway = (id: string) => {
    if (palette.length <= 1) return;
    updatePalette(palette.filter((c) => c.id !== id));
  };

  // Copy code with toast feedback
  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Filtered Pantone Swatches
  const filteredPantones = PANTONE_LIBRARY.filter((p) => {
    const matchesCategory =
      selectedCategory === "All Palettes" || p.category === selectedCategory;
    const matchesSearch =
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.hex.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Reticle coordinate calculation
  const wheelSize = 260;
  const wheelRadius = wheelSize / 2 - 6;
  const reticleAngleRad = (hue * Math.PI) / 180;
  const reticleDist = (saturation / 100) * wheelRadius;
  const reticleX = wheelSize / 2 + reticleDist * Math.cos(reticleAngleRad);
  const reticleY = wheelSize / 2 + reticleDist * Math.sin(reticleAngleRad);

  return (
    <div className="w-full bg-[#FAF7F2] border border-[#E8D2B7] rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[#E8D2B7]/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#3A0E1E] text-[#D4AF37] flex items-center justify-center border border-[#D4AF37]/40 shadow-sm shrink-0">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3A0E1E]">
                Atelier Pantone® & Chromatic Wheel
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-widest bg-[#FFF0F4] text-[#852C46] border border-[#E8D2B7] font-semibold">
                FASHION TCX
              </span>
            </div>
            <p className="text-xs text-[#6B5A52] font-sans">
              Touch the chromatic spectrum wheel or browse the full official Pantone Fashion, Home + Interiors standard.
            </p>
          </div>
        </div>

        {/* Quick Active Match Badge */}
        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white border border-[#E8D2B7] shadow-xs">
          <div
            className="w-9 h-9 rounded-xl border border-black/20 shadow-inner shrink-0"
            style={{ backgroundColor: currentHex }}
          />
          <div className="text-left">
            <span className="text-[10px] font-mono text-[#D4AF37] font-bold block uppercase tracking-wider">
              {matchInfo.matchPercent}% MATCH
            </span>
            <span className="text-xs font-mono font-bold text-[#3A0E1E] block">
              PANTONE {currentPantone.code}
            </span>
          </div>
        </div>
      </div>

      {/* Main Studio Workstation: Left Color Wheel & Controls | Right Pantone Library */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Color Wheel & Active Color Spec (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center gap-6 bg-white p-6 rounded-2xl border border-[#E8D2B7]/90 shadow-xs">
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-mono uppercase tracking-wider text-[#865040] font-bold flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#D4AF37]" />
              Touch Chromatic Spectrum
            </span>
            <span className="text-[11px] font-mono text-[#8F8178]">
              {hue}° · {saturation}% Sat
            </span>
          </div>

          {/* Canvas Color Wheel with Target Reticle */}
          <div
            ref={wheelContainerRef}
            className="relative w-[260px] h-[260px] select-none touch-none cursor-crosshair flex items-center justify-center"
          >
            <canvas
              ref={canvasRef}
              width={260}
              height={260}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              className="rounded-full shadow-md transition-shadow hover:shadow-lg"
            />

            {/* Target Precision Reticle Indicator */}
            <div
              className="absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 border-white pointer-events-none shadow-[0_0_8px_rgba(0,0,0,0.5)] flex items-center justify-center transition-transform"
              style={{
                left: `${reticleX}px`,
                top: `${reticleY}px`,
                backgroundColor: currentHex
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>

          {/* Lightness Slider */}
          <div className="w-full space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#6B5A52]">Luminance & Lightness</span>
              <span className="text-[#3A0E1E] font-bold">{lightness}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={95}
              value={lightness}
              onChange={(e) => setLightness(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-linear-to-r from-black via-gray-400 to-white accent-[#3A0E1E]"
            />
          </div>

          {/* Active Color Details & Pantone Dossier */}
          <div className="w-full p-4 rounded-xl bg-[#FAF7F2] border border-[#E8D2B7] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl border border-black/20 shadow-md shrink-0"
                  style={{ backgroundColor: currentHex }}
                />
                <div>
                  <span className="text-xs font-mono font-bold text-[#3A0E1E] block">
                    {currentPantone.name}
                  </span>
                  <span className="text-[11px] font-mono text-[#D4AF37] font-semibold">
                    PANTONE® {currentPantone.code}
                  </span>
                </div>
              </div>

              {/* Copy Hex / Pantone */}
              <button
                type="button"
                onClick={() => handleCopyCode(`PANTONE ${currentPantone.code} (${currentHex})`)}
                className="p-2 rounded-lg bg-white border border-[#E8D2B7] text-[#3A0E1E] hover:bg-[#3A0E1E] hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1.5 shadow-2xs"
                title="Copy Pantone specification"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[10px] font-mono font-medium">Copy</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-[#E8D2B7]/60 text-[10px] font-mono">
              <div className="bg-white p-1.5 rounded-lg border border-[#E8D2B7]/60">
                <span className="text-[#8F8178] block text-[9px]">HEX</span>
                <span className="text-[#3A0E1E] font-bold">{currentHex}</span>
              </div>
              <div className="bg-white p-1.5 rounded-lg border border-[#E8D2B7]/60">
                <span className="text-[#8F8178] block text-[9px]">RGB</span>
                <span className="text-[#3A0E1E] font-bold">
                  {currentRgb.r},{currentRgb.g},{currentRgb.b}
                </span>
              </div>
              <div className="bg-white p-1.5 rounded-lg border border-[#E8D2B7]/60">
                <span className="text-[#8F8178] block text-[9px]">HSL</span>
                <span className="text-[#3A0E1E] font-bold">
                  {hue}°,{saturation}%,{lightness}%
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#6B5A52] font-sans leading-relaxed pt-1">
              {currentPantone.description}
            </p>

            {currentPantone.recommendedFabrics && (
              <div className="pt-1">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#865040] block font-bold mb-1">
                  Atelier Textile Compatibility:
                </span>
                <div className="flex flex-wrap gap-1">
                  {currentPantone.recommendedFabrics.map((f) => (
                    <span
                      key={f}
                      className="px-2 py-0.5 rounded text-[10px] bg-white border border-[#E8D2B7] text-[#3A0E1E] font-sans"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Active Garment Palette Button */}
            <button
              type="button"
              onClick={handleAddActiveToPalette}
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#3A0E1E] hover:bg-[#52152B] text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Add to Garment Colorways</span>
            </button>
          </div>
        </div>

        {/* Right Column: Whole Pantone Swatch Library & Palette Manager (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Active Garment Colorways (What customers see) */}
          <div className="bg-white p-5 rounded-2xl border border-[#E8D2B7] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#D4AF37]" />
                <h4 className="font-serif font-bold text-sm text-[#3A0E1E]">
                  Active Garment Colorways ({palette.length} Registered)
                </h4>
              </div>
              <span className="text-[10px] font-mono text-[#865040] uppercase tracking-wider">
                Shown to VIP Customers
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {palette.map((c) => (
                <div
                  key={c.id}
                  className="group relative p-3 rounded-xl border border-[#E8D2B7] bg-[#FAF7F2] hover:border-[#D4AF37] transition-all flex flex-col items-center text-center gap-1.5 shadow-2xs"
                >
                  <div
                    className="w-8 h-8 rounded-full border border-black/20 shadow-xs"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#D4AF37] font-bold">
                    PANTONE
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#3A0E1E]">
                    {c.pantone}
                  </span>
                  <span className="text-[10px] text-[#6B5A52] font-sans truncate w-full" title={c.label}>
                    {c.label}
                  </span>

                  {/* Remove Button (if > 1) */}
                  {palette.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveColorway(c.id)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-100 border border-red-300 text-red-700 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-xs"
                      title="Remove Colorway"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pantone Swatch Search & Category Filters */}
          <div className="bg-white p-5 rounded-2xl border border-[#E8D2B7] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#8F8178] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Pantone code (e.g. 19-3832), shade name, or hex..."
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E8D2B7] text-[#231820] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <span className="text-xs font-mono text-[#8F8178] shrink-0 self-center">
                {filteredPantones.length} Shades
              </span>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
              {PANTONE_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-[11px] font-sans whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#3A0E1E] text-white font-medium shadow-xs"
                      : "bg-[#FAF7F2] text-[#6B5A52] hover:bg-[#F0EAE1] border border-[#E8D2B7]/60"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Swatch Library Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
              {filteredPantones.map((p) => {
                const isCurrent = p.code === currentPantone.code;
                return (
                  <button
                    key={p.code}
                    type="button"
                    onClick={() => handleSelectPantone(p)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 group ${
                      isCurrent
                        ? "bg-[#FAF7F2] border-[#3A0E1E] ring-2 ring-[#D4AF37] ring-offset-1 shadow-sm"
                        : "bg-white border-[#E8D2B7]/80 hover:border-[#D4AF37] hover:bg-[#FAF7F2]"
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-lg border border-black/20 shrink-0 shadow-2xs group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: p.hex }}
                    />
                    <div className="overflow-hidden">
                      <span className="text-[10px] font-mono font-bold text-[#3A0E1E] block truncate">
                        {p.code}
                      </span>
                      <span className="text-[10px] text-[#6B5A52] font-sans block truncate" title={p.name}>
                        {p.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
