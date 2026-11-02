"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { 
  Flame, 
  Calendar, 
  CheckCircle2, 
  Download, 
  Plus, 
  Eye, 
  MessageSquare, 
  CreditCard,
  ShieldCheck,
  ChevronDown,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const BoostedView: React.FC = () => {
  const { 
    boostCampaigns, 
    listedProducts, 
    openBoostModal, 
    setActiveStudioTab, 
    startNewListing,
    drafts,
    showToast 
  } = useStudio();

  // Slide drawer state for Boost Product Flow
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>(
    listedProducts[0]?.id || ""
  );
  const [selectedTier, setSelectedTier] = useState<"salon" | "curator" | "grand">("curator");

  const tierPrices = {
    salon: { days: 3, name: "Salon Spotlight", basePrice: 3500 },
    curator: { days: 7, name: "Curator's Showcase", basePrice: 7500 },
    grand: { days: 30, name: "Grand Salon Feature", basePrice: 14000 }
  };

  const currentTier = tierPrices[selectedTier];
  const gstAmount = Math.round(currentTier.basePrice * 0.18);
  const totalAmount = currentTier.basePrice + gstAmount;

  const handleLaunchCampaign = () => {
    const product = listedProducts.find((p) => p.id === selectedProductId);
    if (!product) return;

    openBoostModal(product);
    setIsDrawerOpen(false);
    showToast(`Promotion campaign initialized for ${product.title}`);
  };

  return (
    <div className="flex flex-col w-full space-y-8 animate-fadeIn">
      
      {/* SECONDARY ATELIER SUB-NAVIGATION BAR */}
      <div className="w-full bg-[#ffeff8]/80 backdrop-blur-md px-4 sm:px-8 py-0 rounded-2xl border border-[#d5c2c5]/40 shadow-xs">
        <div className="w-full max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-y-2">
          <nav className="flex items-stretch overflow-x-auto gap-6 sm:gap-8">
            <button
              onClick={() => {
                startNewListing();
                setActiveStudioTab("list-new");
              }}
              className="group inline-flex items-center gap-2 py-5 text-xs font-semibold uppercase tracking-wider text-[#837376] hover:text-[#3a0e1e] transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4 text-[#865040]" />
              <span>List New Product</span>
            </button>

            <button
              onClick={() => setActiveStudioTab("listed")}
              className="group inline-flex items-center gap-2 py-5 text-xs font-semibold uppercase tracking-wider text-[#837376] hover:text-[#3a0e1e] transition-colors whitespace-nowrap"
            >
              <span>Listed Products</span>
              <span className="px-2 py-0.5 rounded-full bg-[#f6e3ef] text-[#837376] text-[11px] font-semibold">24</span>
            </button>

            <button
              onClick={() => setActiveStudioTab("sold")}
              className="group inline-flex items-center gap-2 py-5 text-xs font-semibold uppercase tracking-wider text-[#837376] hover:text-[#3a0e1e] transition-colors whitespace-nowrap"
            >
              <span>Sold Products</span>
              <span className="px-2 py-0.5 rounded-full bg-[#f6e3ef] text-[#837376] text-[11px] font-semibold">18</span>
            </button>

            <button
              onClick={() => setActiveStudioTab("drafts")}
              className="group inline-flex items-center gap-2 py-5 text-xs font-semibold uppercase tracking-wider text-[#837376] hover:text-[#3a0e1e] transition-colors whitespace-nowrap"
            >
              <span>Drafts</span>
              <span className="px-2 py-0.5 rounded-full bg-[#f6e3ef] text-[#837376] text-[11px] font-semibold">{drafts.length}</span>
            </button>

            {/* ACTIVE TAB: BOOSTED FOR PROMOTION (4) */}
            <div className="relative inline-flex items-center gap-2 py-5 text-xs font-semibold uppercase tracking-wider text-[#3a0e1e] whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#865040]"></span>
              <span>Boosted for Promotion</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#542333] text-white text-[11px] font-semibold">
                {boostCampaigns.length}
              </span>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3a0e1e]"></div>
            </div>
          </nav>

          <div className="hidden xl:flex items-center gap-2 text-[#837376] text-xs uppercase tracking-wider py-4 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>Algorithmic Spotlights Active</span>
          </div>
        </div>
      </div>

      {/* EDITORIAL HEADER BLOCK */}
      <div className="w-full pt-4 pb-2">
        <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#865040]"></span>
            <span className="text-[11px] uppercase tracking-widest text-[#865040] font-semibold">
              Atelier Curatorial Workspace • Paid Promotions
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-2 max-w-3xl">
              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#3a0e1e] tracking-tight">
                Boosted for Promotion
              </h1>
              <p className="text-sm text-[#837376] leading-relaxed">
                Manage paid placement spotlights across curated marketplace showcases. Track campaign run dates, payment settlements, and measured visibility performance.
              </p>
              <p className="text-[11px] text-[#837376]/80 italic mt-0.5">
                Note: Paid promotion elevates algorithmic placement and catalogue spotlighting; views, ranking, and sales volume are organic patron responses and are not guaranteed.
              </p>
            </div>

            <button
              onClick={() => setIsDrawerOpen(true)}
              className="shrink-0 inline-flex items-center justify-center gap-2 bg-[#3a0e1e] hover:bg-[#542333] text-white px-6 py-3.5 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all shadow-xs"
              type="button"
            >
              <Plus className="w-4 h-4 text-[#fcb2c6]" />
              <span>Boost New Product</span>
            </button>
          </div>
        </div>
      </div>

      {/* SUMMARY METRICS QUAD (4 CARDS) */}
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Metric 1 */}
          <div className="bg-[#ffeff8] p-6 rounded-lg border border-[#d5c2c5]/40 shadow-xs flex flex-col justify-between relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#837376]">Active Campaigns</span>
              <Flame className="w-5 h-5 text-[#865040]" />
            </div>
            <div className="mt-4 flex flex-col">
              <span className="font-editorial text-3xl font-semibold text-[#3a0e1e]">4 Products</span>
              <span className="text-xs text-[#837376] mt-1">Across 3 Couture Tiers</span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-[#ffeff8] p-6 rounded-lg border border-[#d5c2c5]/40 shadow-xs flex flex-col justify-between relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#837376]">Aggregate Ad Spend</span>
              <CreditCard className="w-5 h-5 text-[#865040]" />
            </div>
            <div className="mt-4 flex flex-col">
              <span className="font-editorial text-3xl font-semibold text-[#3a0e1e]">₹38,500</span>
              <span className="text-xs text-[#837376] mt-1">Excl. GST (All Settled)</span>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-[#ffeff8] p-6 rounded-lg border border-[#d5c2c5]/40 shadow-xs flex flex-col justify-between relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#837376]">Recorded Impressions</span>
              <Eye className="w-5 h-5 text-[#865040]" />
            </div>
            <div className="mt-4 flex flex-col">
              <span className="font-editorial text-3xl font-semibold text-[#3a0e1e]">42,850</span>
              <span className="text-xs text-[#837376] mt-1">Curated Catalog Feeds</span>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="bg-[#ffeff8] p-6 rounded-lg border border-[#d5c2c5]/40 shadow-xs flex flex-col justify-between relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#837376]">Inquiries Generated</span>
              <MessageSquare className="w-5 h-5 text-[#865040]" />
            </div>
            <div className="mt-4 flex flex-col">
              <span className="font-editorial text-3xl font-semibold text-[#3a0e1e]">18 Inquiries</span>
              <span className="text-xs text-[#837376] mt-1">Direct Salon Consultations</span>
            </div>
          </div>
        </div>
      </div>

      {/* ACTIVE PROMOTED CAMPAIGNS HEADER */}
      <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <h2 className="font-editorial text-2xl font-semibold text-[#3a0e1e]">
            Live & Scheduled Showcases
          </h2>
          <span className="px-2.5 py-0.5 rounded bg-[#542333] text-white text-xs font-semibold">
            {boostCampaigns.length} Active
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#837376] uppercase tracking-wider font-semibold">Sort by</span>
          <button className="bg-[#ffeff8] border border-[#d5c2c5]/40 px-3.5 py-1.5 rounded text-xs uppercase tracking-wider font-semibold text-[#3a0e1e] flex items-center gap-1 shadow-xs">
            <span>End Date (Soonest)</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* VERTICALLY STACKED CONTAINER CARDS */}
      <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-6">
        {boostCampaigns.map((camp) => (
          <div
            key={camp.id}
            className="bg-white p-6 rounded-lg shadow-xs border border-[#d5c2c5]/30 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between relative overflow-hidden transition-all hover:shadow-md"
          >
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center w-full lg:w-auto">
              {/* Thumbnail with Spotlight Badge */}
              <div className="relative w-28 h-36 shrink-0 bg-[#fce9f4] rounded overflow-hidden shadow-inner">
                <img
                  src={camp.productImage}
                  alt={camp.productTitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-[#3a0e1e]/90 backdrop-blur-md px-2 py-0.5 text-[#f6dfc4] text-[9px] tracking-widest uppercase font-semibold">
                  Spotlight
                </div>
              </div>

              {/* Product & Campaign Details */}
              <div className="flex flex-col gap-1.5 min-w-0 max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-[#f6e3ef] text-[#3a0e1e] px-2.5 py-0.5 rounded text-xs tracking-wider uppercase font-semibold">
                    {camp.planName}
                  </span>
                  <span className="bg-[#ffb9a4]/40 text-[#6a3a2b] px-2 py-0.5 rounded text-xs font-medium">
                    {camp.daysRemaining ? `${camp.daysRemaining} days remaining` : "Scheduled"}
                  </span>
                </div>

                <h3 className="font-editorial text-xl font-semibold text-[#3a0e1e] truncate mt-0.5">
                  {camp.productTitle}
                </h3>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#837376]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#837376]" />
                    {camp.startDate} – {camp.endDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    Paid & Confirmed (₹{camp.cost.toLocaleString("en-IN")} via {camp.paymentMethod || "HDFC Corporate"})
                  </span>
                  <span>•</span>
                  <button 
                    onClick={() => showToast(`Downloading ${camp.receiptNumber || "Receipt #AP-9082"}...`)}
                    className="text-[#865040] hover:text-[#3a0e1e] underline underline-offset-4 flex items-center gap-1 font-semibold"
                  >
                    <span>{camp.receiptNumber || "Receipt #AP-9082"}</span>
                    <Download className="w-3 h-3" />
                  </button>
                </div>

                <p className="text-[11px] text-[#837376] italic mt-0.5">
                  {camp.status === "SCHEDULED"
                    ? "Marketplace performance metrics will begin tracking once the promotion goes live on scheduled launch date."
                    : "Marketplace performance metrics reflect recorded patron interactions; sales conversion depends on individual client engagement."}
                </p>
              </div>

              {/* Micro Metrics Tag Bar (2x2 Grid) */}
              <div className="flex items-center justify-center px-4 my-auto shrink-0 w-full sm:w-auto">
                <div className="grid grid-cols-2 gap-2 text-center w-full sm:w-auto">
                  <div className="bg-[#ffeff8] px-3.5 py-1.5 rounded border border-[#d5c2c5]/30 min-w-[85px]">
                    <span className="block text-[10px] uppercase tracking-wider text-[#837376] font-semibold">Impressions</span>
                    <span className="font-semibold text-[#3a0e1e] text-sm">
                      {camp.impressions > 0 ? camp.impressions.toLocaleString("en-IN") : "14,200"}
                    </span>
                  </div>
                  <div className="bg-[#ffeff8] px-3.5 py-1.5 rounded border border-[#d5c2c5]/30 min-w-[85px]">
                    <span className="block text-[10px] uppercase tracking-wider text-[#837376] font-semibold">Catalog Clicks</span>
                    <span className="font-semibold text-[#3a0e1e] text-sm">
                      {camp.clicks > 0 ? camp.clicks.toLocaleString("en-IN") : "890"}
                    </span>
                  </div>
                  <div className="bg-[#ffeff8] px-3.5 py-1.5 rounded border border-[#d5c2c5]/30 min-w-[85px]">
                    <span className="block text-[10px] uppercase tracking-wider text-[#837376] font-semibold">Patron Saves</span>
                    <span className="font-semibold text-[#3a0e1e] text-sm">
                      {camp.saves > 0 ? camp.saves.toLocaleString("en-IN") : "142"}
                    </span>
                  </div>
                  <div className="bg-[#ffeff8] px-3.5 py-1.5 rounded border border-[#d5c2c5]/30 min-w-[85px]">
                    <span className="block text-[10px] uppercase tracking-wider text-[#837376] font-semibold">Direct Inquiries</span>
                    <span className="font-semibold text-[#3a0e1e] text-sm">
                      {(camp.inquiries && camp.inquiries > 0) ? camp.inquiries : 6}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Tray */}
            <div className="flex lg:flex-col items-center lg:items-end gap-2 shrink-0 w-full lg:w-auto pt-3 lg:pt-0 border-t border-[#d5c2c5]/30 lg:border-t-0">
              <button
                onClick={() => {
                  setSelectedProductId(camp.productId);
                  setIsDrawerOpen(true);
                }}
                className="w-full lg:w-44 bg-[#3a0e1e] hover:bg-[#542333] text-white py-2.5 px-4 rounded text-xs uppercase tracking-wider font-semibold text-center transition-colors shadow-xs"
                type="button"
              >
                Extend Promotion
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CURATORIAL INTEGRITY STANDARDS BANNER */}
      <div className="w-full max-w-[1600px] mx-auto pb-8">
        <div className="p-6 bg-[#ffeff8] rounded-xl border border-[#d5c2c5]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#fce9f4] flex items-center justify-center shrink-0 border border-[#d5c2c5]/40">
              <ShieldCheck className="w-4 h-4 text-[#865040]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-[#3a0e1e]">
                Curatorial Integrity Standards
              </p>
              <p className="text-xs text-[#837376] mt-0.5 max-w-2xl">
                Promoted creations maintain the same stringent artisanal vetting. Boosted status gives prime placement without bypassing atelier craftsmanship criteria.
              </p>
            </div>
          </div>

          <button 
            onClick={() => showToast("Opening Promotion Terms & GST Guidelines...")}
            className="text-xs uppercase tracking-wider text-[#865040] hover:text-[#3a0e1e] underline underline-offset-4 font-semibold shrink-0"
            type="button"
          >
            Review Promotion Terms & Guidelines
          </button>
        </div>
      </div>

      {/* SLIDE-DRAWER: BOOST PRODUCT FLOW */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-[#231820]/60 backdrop-blur-sm">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-[#d5c2c5] p-6 sm:p-8 overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#d5c2c5]/40">
                <div className="flex items-center gap-2 text-[#3a0e1e]">
                  <Flame className="w-5 h-5 text-[#865040]" />
                  <h3 className="font-editorial text-2xl font-bold">
                    Extend / Boost Product
                  </h3>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1 rounded-full text-[#837376] hover:bg-[#ffeff8]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6 pt-6 flex-1">
                {/* Select Product */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#837376]">
                    Select Atelier Piece
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full p-3 rounded-lg border border-[#d5c2c5] text-xs font-medium text-[#231820] bg-white focus:outline-none focus:ring-1 focus:ring-[#3a0e1e]"
                  >
                    {listedProducts.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title} (₹{p.price.toLocaleString("en-IN")})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tier Selection */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#837376]">
                    Select Promotion Tier
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedTier("salon")}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selectedTier === "salon"
                          ? "border-[#3a0e1e] bg-[#ffeff8]"
                          : "border-[#d5c2c5]/50 hover:bg-[#fff7f9]"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-editorial font-bold text-[#3a0e1e]">Salon Spotlight</span>
                        <span className="font-bold text-[#3a0e1e]">₹3,500</span>
                      </div>
                      <p className="text-xs text-[#837376] mt-1">3 Days prominent discovery feed placement.</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedTier("curator")}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selectedTier === "curator"
                          ? "border-[#3a0e1e] bg-[#ffeff8]"
                          : "border-[#d5c2c5]/50 hover:bg-[#fff7f9]"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-editorial font-bold text-[#3a0e1e]">Curator's Showcase</span>
                        <span className="font-bold text-[#3a0e1e]">₹7,500</span>
                      </div>
                      <p className="text-xs text-[#837376] mt-1">7 Days runway hero spotlight with patron newsletter.</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedTier("grand")}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selectedTier === "grand"
                          ? "border-[#3a0e1e] bg-[#ffeff8]"
                          : "border-[#d5c2c5]/50 hover:bg-[#fff7f9]"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-editorial font-bold text-[#3a0e1e]">Grand Salon Feature</span>
                        <span className="font-bold text-[#3a0e1e]">₹14,000</span>
                      </div>
                      <p className="text-xs text-[#837376] mt-1">30 Days permanent high-visibility marquee placement.</p>
                    </button>
                  </div>
                </div>

                {/* Pricing Summary */}
                <div className="p-4 rounded-xl bg-[#ffeff8] border border-[#d5c2c5]/50 space-y-2 text-xs">
                  <div className="flex justify-between text-[#837376]">
                    <span>Base Campaign</span>
                    <span>₹{currentTier.basePrice.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-[#837376]">
                    <span>GST (18%)</span>
                    <span>₹{gstAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#3a0e1e] pt-2 border-t border-[#d5c2c5]/40 text-sm">
                    <span>Total Investment</span>
                    <span>₹{totalAmount.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#d5c2c5]/40 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex-1 py-3 text-xs uppercase tracking-wider font-semibold text-[#837376] hover:bg-[#ffeff8] rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleLaunchCampaign}
                  className="flex-1 py-3 text-xs uppercase tracking-wider font-semibold bg-[#3a0e1e] hover:bg-[#542333] text-white rounded-lg transition-colors shadow-xs"
                >
                  Confirm & Pay
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
