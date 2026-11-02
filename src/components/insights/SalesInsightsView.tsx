"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { 
  TrendingUp, 
  ShoppingBag, 
  Wallet, 
  Eye, 
  Sparkles, 
  Calendar,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

export const SalesInsightsView: React.FC = () => {
  const { listedProducts, showToast } = useStudio();
  const [selectedRange, setSelectedRange] = useState<"7D" | "30D" | "3M" | "1Y">("30D");

  // Trend Intelligence fashion items
  const trendingStyles = [
    { name: "Indo-Western Drapes", growth: "+24.8%" },
    { name: "Pastel & Champagne Tulle", growth: "+18.2%" },
    { name: "Hand Badla Zardozi", growth: "+15.6%" },
    { name: "Sculptural Capes", growth: "+11.4%" },
  ];

  const popularColours = [
    { hex: "#F3E3D3", name: "Rose Quartz" },
    { hex: "#D4AF37", name: "Antique Gold" },
    { hex: "#E8D2B7", name: "Champagne" },
    { hex: "#542333", name: "Black Cherry" },
    { hex: "#21171F", name: "Near-Black Plum" },
  ];

  const highInterestCategories = [
    { name: "Lehengas & Sets", share: "42%" },
    { name: "Contemporary Indo-Western", share: "28%" },
    { name: "Couture & Gowns", share: "18%" },
    { name: "Sarees & Drapes", share: "12%" }
  ];

  return (
    <div className="space-y-8">
      
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8D2B7]/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF7F9] border border-[#D4AF37]/50 text-[#3A0E1E] text-xs font-semibold uppercase tracking-wider mb-2 shadow-xs">
            <TrendingUp className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Telemetry & Atelier Intelligence • Maison Privée</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#3A0E1E]">
            Sales Insights
          </h1>
          <p className="text-sm text-[#837376] mt-1 max-w-2xl leading-relaxed">
            Comprehensive atelier revenue telemetry, fashion trend intelligence, and top-performing creation metrics.
          </p>
        </div>

        {/* Date Selection */}
        <div className="flex items-center p-1 rounded-full bg-white border border-[#E8D2B7] text-xs font-semibold shadow-xs">
          {(["7D", "30D", "3M", "1Y"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRange(r)}
              className={`px-3 py-1.5 rounded-full transition-all ${
                selectedRange === r
                  ? "bg-[#3A0E1E] text-white shadow-xs border border-[#D4AF37]/40"
                  : "text-[#837376] hover:text-[#3A0E1E]"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Performance Metrics: Total Sales, Net Earnings, Orders Received, Product Views */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-6 border border-[#E8D2B7]/70 hover:border-[#D4AF37]/70 transition-all shadow-xs">
          <div className="flex items-center justify-between text-[#837376] mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Total Sales</span>
            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="font-editorial text-2xl sm:text-3xl font-semibold text-[#3A0E1E]">
            ₹ 2,48,750
          </div>
          <div className="mt-1 flex items-center text-[11px] font-medium text-emerald-800">
            <span>↑ 12.5%</span>
            <span className="text-[#837376] ml-1.5 font-normal">vs last cycle</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E8D2B7]/70 hover:border-[#D4AF37]/70 transition-all shadow-xs">
          <div className="flex items-center justify-between text-[#837376] mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Net Earnings</span>
            <Wallet className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="font-editorial text-2xl sm:text-3xl font-semibold text-[#3A0E1E]">
            ₹ 1,98,400
          </div>
          <div className="mt-1 flex items-center text-[11px] font-medium text-emerald-800">
            <span>↑ 10.2%</span>
            <span className="text-[#837376] ml-1.5 font-normal">disbursed to bank</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E8D2B7]/70 hover:border-[#D4AF37]/70 transition-all shadow-xs">
          <div className="flex items-center justify-between text-[#837376] mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Orders Received</span>
            <Sparkles className="w-4 h-4 text-[#865040]" />
          </div>
          <div className="font-editorial text-2xl sm:text-3xl font-semibold text-[#3A0E1E]">
            124
          </div>
          <div className="mt-1 flex items-center text-[11px] font-medium text-emerald-800">
            <span>↑ 8.7%</span>
            <span className="text-[#837376] ml-1.5 font-normal">0 dispute cases</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E8D2B7]/70 hover:border-[#D4AF37]/70 transition-all shadow-xs">
          <div className="flex items-center justify-between text-[#837376] mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Product Views</span>
            <Eye className="w-4 h-4 text-[#865040]" />
          </div>
          <div className="font-editorial text-2xl sm:text-3xl font-semibold text-[#3A0E1E]">
            89.5K
          </div>
          <div className="mt-1 flex items-center text-[11px] font-medium text-emerald-800">
            <span>↑ 14.3%</span>
            <span className="text-[#837376] ml-1.5 font-normal">patron curiosity</span>
          </div>
        </div>
      </div>

      {/* SALES & EARNINGS TRENDS (Restrained colours: Black Cherry, Rose Gold, Champagne) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Chart */}
        <div className="lg:col-span-2 luxury-card p-6 md:p-8 bg-white space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B77A68]">
                Restrained Palette Curve
              </span>
              <h3 className="font-editorial text-2xl font-semibold text-[#21171F]">
                Sales & Earnings Trends
              </h3>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#B77A68]" />
                <span className="text-[#8F8178]">Gross Sales (Rose Gold)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#542333]" />
                <span className="text-[#8F8178]">Net Disbursed (Black Cherry)</span>
              </div>
            </div>
          </div>

          {/* SVG Vector Chart using strict Black Cherry & Rose Gold */}
          <div className="relative pt-4">
            <div className="flex justify-between text-[11px] font-mono text-[#8F8178] pb-1">
              <span>Peak: ₹3.0 Lakhs</span>
              <span>Baseline: Zero</span>
            </div>

            <div className="h-56 w-full relative">
              <svg viewBox="0 0 700 200" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="roseGoldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#B77A68" stopOpacity="0.20" />
                    <stop offset="100%" stopColor="#B77A68" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="blackCherryGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#542333" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#542333" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Champagne gridlines */}
                <line x1="0" y1="40" x2="700" y2="40" stroke="#E8D2B7" strokeDasharray="2 2" opacity="0.6" />
                <line x1="0" y1="100" x2="700" y2="100" stroke="#E8D2B7" strokeDasharray="2 2" opacity="0.6" />
                <line x1="0" y1="160" x2="700" y2="160" stroke="#E8D2B7" strokeDasharray="2 2" opacity="0.6" />

                {/* Rose Gold Curve: Sales */}
                <path
                  d="M 20,150 C 120,110 200,60 300,70 C 400,80 480,40 580,50 L 680,52 L 680,190 L 20,190 Z"
                  fill="url(#roseGoldGrad)"
                />
                <path
                  d="M 20,150 C 120,110 200,60 300,70 C 400,80 480,40 580,50 L 680,52"
                  fill="none"
                  stroke="#B77A68"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Black Cherry Curve: Earnings */}
                <path
                  d="M 20,175 C 120,135 200,95 300,105 C 400,115 480,75 580,85 L 680,87 L 680,190 L 20,190 Z"
                  fill="url(#blackCherryGrad)"
                />
                <path
                  d="M 20,175 C 120,135 200,95 300,105 C 400,115 480,75 580,85 L 680,87"
                  fill="none"
                  stroke="#542333"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* End Point Markers */}
                <circle cx="680" cy="52" r="5" fill="#B77A68" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="680" cy="87" r="5" fill="#542333" stroke="#FFFFFF" strokeWidth="2" />
              </svg>
            </div>

            <div className="flex justify-between text-xs font-mono text-[#8F8178] pt-2 border-t border-[#E4D5C5]">
              <span>1 May</span>
              <span>8 May</span>
              <span>15 May</span>
              <span>22 May</span>
              <span>30 May</span>
            </div>
          </div>
        </div>

        {/* Right Column: Trend Intelligence */}
        <div className="luxury-card p-6 bg-white space-y-5 flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-[#E4D5C5]">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B77A68]">
                Fashion Signals
              </span>
              <h3 className="font-editorial text-xl font-semibold text-[#21171F]">
                Trend Intelligence
              </h3>
            </div>

            {/* Trending Styles */}
            <div className="mt-4 space-y-2">
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#21171F]">
                Trending Styles
              </label>
              <div className="flex flex-wrap gap-1.5">
                {trendingStyles.map((s) => (
                  <span
                    key={s.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF3EC] border border-[#E8D2B7]/80 text-xs font-medium text-[#21171F]"
                  >
                    <span>{s.name}</span>
                    <span className="text-[10px] text-emerald-800 font-bold">{s.growth}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Popular Colours */}
            <div className="mt-5 space-y-2">
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#21171F]">
                Popular Atelier Colours
              </label>
              <div className="flex items-center gap-2.5">
                {popularColours.map((c) => (
                  <div
                    key={c.name}
                    title={c.name}
                    className="w-7 h-7 rounded-full border-2 border-white shadow-xs cursor-pointer hover:scale-110 transition-transform"
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* High-Interest Categories */}
            <div className="mt-5 space-y-2">
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#21171F]">
                High-Interest Categories
              </label>
              <div className="space-y-1.5 text-xs">
                {highInterestCategories.map((cat) => (
                  <div key={cat.name} className="flex justify-between items-center text-[#8F8178]">
                    <span>{cat.name}</span>
                    <strong className="text-[#21171F] font-mono">{cat.share}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#FBF7F1] rounded-lg border border-[#E4D5C5] text-xs text-[#8F8178]">
            <strong className="text-[#542333]">Demand Signal: </strong>
            Surging bridal requests for pure Katan silk in champagne tones.
          </div>
        </div>

      </div>

      {/* TOP-PERFORMING PRODUCTS */}
      <div className="luxury-card p-6 md:p-8 bg-white space-y-6">
        <div className="pb-4 border-b border-[#E4D5C5]">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B77A68]">
            Catalogue Performance
          </span>
          <h3 className="font-editorial text-2xl font-semibold text-[#21171F]">
            Top-Performing Products
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {listedProducts.slice(0, 3).map((prod) => (
            <div key={prod.id} className="p-4 rounded-xl border border-[#E4D5C5] bg-[#FBF7F1]/40 flex flex-col justify-between">
              <div>
                <img
                  src={prod.images[0]}
                  alt={prod.title}
                  className="w-full h-44 object-cover rounded-lg border border-[#E4D5C5] mb-3"
                />
                <h4 className="font-editorial text-lg font-semibold text-[#21171F] line-clamp-1">
                  {prod.title}
                </h4>
                <div className="font-editorial text-xl font-bold text-[#542333] mt-0.5">
                  ₹ {prod.price.toLocaleString("en-IN")}
                </div>
                <div className="flex items-center gap-3 text-xs text-[#8F8178] mt-2">
                  <span>{prod.viewsCount.toLocaleString()} views</span>
                  <span>•</span>
                  <span>{prod.orderCount} orders</span>
                </div>
              </div>

              <button
                onClick={() => showToast(`Detailed telemetry opened for ${prod.title}.`)}
                className="mt-4 w-full py-2 rounded-lg border border-[#E8D2B7] text-xs font-semibold text-[#542333] hover:bg-[#FAF3EC] transition-colors"
              >
                View Details →
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
