"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { ListedProduct } from "@/types/studio";
import { 
  Lock, 
  Flame, 
  Trash2, 
  EyeOff, 
  RotateCcw, 
  Sliders, 
  SlidersHorizontal,
  AlertTriangle, 
  Plus, 
  Search, 
  LayoutGrid, 
  List, 
  Truck, 
  CheckCircle2, 
  ShieldCheck,
  ChevronDown,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ListedProductsView: React.FC = () => {
  const { 
    listedProducts, 
    updateStock, 
    delistProduct, 
    relistProduct, 
    deleteProduct, 
    openBoostModal, 
    setActiveStudioTab,
    startNewListing,
    drafts,
    boostCampaigns
  } = useStudio();

  // Search, Filter & View Mode
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<"latest" | "price-desc" | "price-asc" | "inquiries">("latest");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Modal States
  const [stockModalProduct, setStockModalProduct] = useState<ListedProduct | null>(null);
  const [newStockInput, setNewStockInput] = useState<number>(1);
  const [delistModalProduct, setDelistModalProduct] = useState<ListedProduct | null>(null);
  const [deleteModalProduct, setDeleteModalProduct] = useState<ListedProduct | null>(null);

  // Filter & Sort Logic
  const filteredProducts = listedProducts
    .filter((prod) => {
      const matchSearch = prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.designerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      
      if (!matchSearch) return false;
      if (categoryFilter === "bridal-lehengas") {
        return prod.category.toLowerCase().includes("lehenga") || 
               prod.category.toLowerCase().includes("bridal") ||
               prod.subcategory.toLowerCase().includes("lehenga") || 
               prod.tags.some(t => t.toLowerCase().includes("lehenga") || t.toLowerCase().includes("bridal"));
      }
      if (categoryFilter === "royal-sherwanis") {
        return prod.category.toLowerCase().includes("sherwani") || 
               prod.category.toLowerCase().includes("bandhgala") || 
               prod.subcategory.toLowerCase().includes("sherwani") || 
               prod.subcategory.toLowerCase().includes("bandhgala") ||
               prod.tags.some(t => t.toLowerCase().includes("sherwani") || t.toLowerCase().includes("bandhgala"));
      }
      if (categoryFilter === "indo-western") {
        return prod.category.toLowerCase().includes("indo-western") || 
               prod.category.toLowerCase().includes("contemporary") || 
               prod.category.toLowerCase().includes("gowns") || 
               prod.category.toLowerCase().includes("saree") || 
               prod.category.toLowerCase().includes("corset") ||
               prod.tags.some(t => t.toLowerCase().includes("indo-western") || t.toLowerCase().includes("contemporary"));
      }
      return true;
    })
    .sort((a, b) => {
      if (sortOption === "price-desc") return b.price - a.price;
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "inquiries") return b.viewsCount - a.viewsCount;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const handleOpenStockModal = (prod: ListedProduct) => {
    setStockModalProduct(prod);
    setNewStockInput(prod.availableStock);
  };

  const handleSaveStock = () => {
    if (stockModalProduct) {
      updateStock(stockModalProduct.id, newStockInput);
      setStockModalProduct(null);
    }
  };

  const handleConfirmDelist = () => {
    if (delistModalProduct) {
      delistProduct(delistModalProduct.id);
      setDelistModalProduct(null);
    }
  };

  const handleConfirmDelete = () => {
    if (deleteModalProduct) {
      deleteProduct(deleteModalProduct.id);
      setDeleteModalProduct(null);
    }
  };

  return (
    <div className="flex flex-col w-full space-y-10 animate-fadeIn">
      
      {/* Section 1: Studio Editorial Header & Live Atelier Metrics (Exact from zip) */}
      <section className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#865040]">
              Maison Privée Atelier
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#865040]"></span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#837376]">
              Paris • Salons Particuliers
            </span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#3A0E1E] tracking-tight">
            Studio
          </h1>

          <p className="text-sm text-[#837376] mt-1.5 max-w-xl leading-relaxed">
            Manage and curate your couture creations and current salon inventory with bespoke precision.
          </p>
        </div>

        {/* Curated Key Indicators (Elevated Editorial Counter Modules) */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
          <div className="bg-white px-5 py-3 rounded-2xl border border-[#E8D2B7]/70 shadow-xs min-w-[140px]">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#837376]">Active Works</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="font-editorial text-2xl font-bold text-[#3A0E1E]">{listedProducts.length}</span>
              <span className="text-xs text-[#865040]">pieces</span>
            </div>
          </div>

          <div className="bg-white px-5 py-3 rounded-2xl border border-[#E8D2B7]/70 shadow-xs min-w-[140px]">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#837376]">Orders Confirmed</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="font-editorial text-2xl font-bold text-[#3A0E1E]">2</span>
              <span className="text-xs text-[#865040]">dispatched</span>
            </div>
          </div>

          <div className="bg-white px-5 py-3 rounded-2xl border border-[#E8D2B7]/70 shadow-xs min-w-[140px]">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#837376]">Check Inquiries</p>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="font-editorial text-2xl font-bold text-[#865040]">31</span>
              <span className="text-xs text-[#837376]">pending</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Architectural Subcategory Navigation Tabs & Standout CTA */}
      <section className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Navigation Tabs Pill Container */}
          <div className="bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-[#E8D2B7]/70 shadow-xs flex flex-wrap items-center gap-1.5">
            {/* Tab 1: Listed Products (Active) */}
            <button 
              onClick={() => setActiveStudioTab("listed")}
              className="px-5 py-2.5 bg-[#3A0E1E] text-white rounded-xl text-xs uppercase tracking-wider font-semibold shadow-xs flex items-center gap-2 border border-[#D4AF37]/40 cursor-pointer"
            >
              <span>Listed Products</span>
              <span className="bg-[#542333] text-[#F6DFC4] text-[11px] font-bold px-2 py-0.5 rounded-full">
                {listedProducts.length}
              </span>
            </button>

            {/* Tab 2: Sold Products */}
            <button 
              onClick={() => setActiveStudioTab("sold")}
              className="px-5 py-2.5 text-[#837376] hover:text-[#3A0E1E] hover:bg-[#FFF7F9] rounded-xl text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Sold Products</span>
              <span className="text-[#837376] text-[11px] px-1.5 py-0.5">18</span>
            </button>

            {/* Tab 3: Drafts */}
            <button 
              onClick={() => setActiveStudioTab("drafts")}
              className="px-5 py-2.5 text-[#837376] hover:text-[#3A0E1E] hover:bg-[#FFF7F9] rounded-xl text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Drafts</span>
              <span className="text-[#837376] text-[11px] px-1.5 py-0.5">({drafts.length})</span>
            </button>

            {/* Tab 4: Boosted for Promotion */}
            <button 
              onClick={() => setActiveStudioTab("boosted")}
              className="px-5 py-2.5 text-[#837376] hover:text-[#3A0E1E] hover:bg-[#FFF7F9] rounded-xl text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Boosted for Promotion</span>
              <span className="bg-[#FFB9A4]/50 text-[#7A4737] text-[11px] font-bold px-2 py-0.5 rounded-full">
                {boostCampaigns.length}
              </span>
            </button>
          </div>

          {/* Standalone Distinct "List New Product" CTA Button: Bigger, Separated, Standout with Deep Cabernet & Gold Shadow */}
          <button
            onClick={startNewListing}
            className="group px-7 py-3 sm:px-8 sm:py-3.5 bg-[#3A0E1E] hover:bg-[#250813] text-white rounded-2xl text-xs sm:text-[13px] uppercase tracking-widest font-bold transition-all duration-300 shadow-lg shadow-[#3A0E1E]/30 hover:shadow-2xl hover:shadow-[#3A0E1E]/50 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 border border-[#D4AF37]/70 ring-2 ring-[#D4AF37]/25 cursor-pointer self-start sm:self-auto"
          >
            <span className="w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-[#FFB9A4] to-[#F6DFC4] text-[#3A0E1E] flex items-center justify-center font-black text-sm sm:text-base leading-none shadow-xs group-hover:scale-110 group-hover:rotate-90 transition-all duration-300">
              +
            </span>
            <span className="text-[#F6DFC4] font-semibold tracking-widest text-xs sm:text-[13px]">
              List New Product
            </span>
          </button>
        </div>
      </section>

      {/* Section 3: Filter, Search & Viewport Toggle Console (Exact from zip) */}
      <section className="w-full">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E8D2B7]/70 shadow-xs">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#837376]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bespoke inventory by silhouette, silk, or archive code..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FFF7F9] text-xs text-[#21171F] placeholder:text-[#837376]/60 border border-[#E8D2B7]/60 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
            />
          </div>

          {/* Filter Actions & Mode Selector */}
          <div className="flex items-center gap-4 justify-between md:justify-end flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-widest font-semibold text-[#837376]">Sort:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="bg-[#FFF7F9] text-[#21171F] text-xs uppercase tracking-wider font-semibold py-2 px-3 rounded-lg border border-[#E8D2B7]/60 focus:outline-none cursor-pointer"
              >
                <option value="latest">Latest Additions</option>
                <option value="price-desc">Valuation: High to Low</option>
                <option value="price-asc">Valuation: Low to High</option>
                <option value="inquiries">Most Requested</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-widest font-semibold text-[#837376]">Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-[#FFF7F9] text-[#21171F] text-xs uppercase tracking-wider font-semibold py-2 px-3 rounded-lg border border-[#E8D2B7]/60 focus:outline-none cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="bridal-lehengas">Bridal & Heritage Lehengas</option>
                <option value="royal-sherwanis">Royal Sherwanis & Bandhgalas</option>
                <option value="indo-western">Contemporary Indo-Western Couture</option>
              </select>
            </div>

            {/* View Mode Toggle: Grid vs. List */}
            <div className="flex items-center bg-[#FFF7F9] p-1 rounded-lg border border-[#E8D2B7]/60">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-[#3A0E1E] shadow-xs border border-[#E8D2B7]"
                    : "text-[#837376] hover:text-[#3A0E1E]"
                }`}
                title="Editorial Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === "list"
                    ? "bg-white text-[#3A0E1E] shadow-xs border border-[#E8D2B7]"
                    : "text-[#837376] hover:text-[#3A0E1E]"
                }`}
                title="Curated List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Product Catalogue Viewport (Editorial Grid / Curated List) */}
      <section className="w-full">
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-[#E8D2B7]/70 space-y-3 shadow-xs">
            <p className="font-editorial text-2xl text-[#837376]">No matching creations in boutique catalog.</p>
            <p className="text-xs text-[#837376]">Try refining your search terms or view all salon collections.</p>
          </div>
        ) : viewMode === "grid" ? (
          /* ================= EDITORIAL GRID VIEW (Exact from Photo 1) ================= */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-gutter gap-y-10">
            {filteredProducts.map((prod) => {
              const isDelisted = prod.status === "DELISTED";
              const isSoldOut = prod.availableStock === 0;

              return (
                <article
                  key={prod.id}
                  className="group bg-surface-container-lowest flex flex-col shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden rounded-2xl border border-[#E8D2B7]/60"
                >
                  {/* High-Fashion 3:4 Aspect Image */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-dim">
                    <img
                      src={prod.images[0]}
                      alt={prod.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    {prod.isOneOfOne && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#3A0E1E] text-white border border-[#D4AF37]/40 shadow-sm">
                        1-of-1 Bespoke
                      </span>
                    )}
                    {prod.isBoosted && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#C59B27] text-white text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-sm">
                        <Flame className="w-3 h-3 text-white fill-white" />
                        <span>BOOSTED</span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col justify-between flex-1 bg-surface-container-lowest">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-[11px] uppercase tracking-wider font-semibold text-[#865040] gap-2">
                        <span className="truncate">{prod.category}</span>
                        <span className="text-[#3A0E1E] font-bold shrink-0">By {prod.designerName}</span>
                      </div>

                      <h2 className="font-title-lg text-title-lg font-bold text-primary tracking-tight font-serif leading-snug">
                        {prod.title}
                      </h2>
                      <div className="font-headline-sm text-headline-sm font-bold text-primary tracking-tight font-serif text-[#3A0E1E]">
                        ₹{prod.price.toLocaleString("en-IN")}
                      </div>

                      <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant text-xs text-[#837376]">
                        <span>{prod.isOneOfOne ? "1 piece available" : `${prod.availableStock} pieces available`}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-on-surface-variant text-xs text-[#837376]">
                        <span className="material-symbols-outlined text-[18px] text-secondary">local_shipping</span>
                        <span>{prod.shippingMode}</span>
                      </div>

                      <div className="flex items-center gap-1.5 pt-1">
                        <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                        <span className="font-label-md text-label-md font-semibold text-emerald-700 uppercase tracking-wider text-[11px]">
                          {isDelisted ? "Delisted" : isSoldOut ? "Sold Out" : "Listed in Salon"}
                        </span>
                      </div>
                    </div>

                    {/* 3-Button Action Strip (Exact from Photo 1) */}
                    <div className="mt-5 pt-4 border-t border-outline-variant/30 grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleOpenStockModal(prod)}
                        className="flex items-center justify-center gap-1 px-2 py-2 border border-outline-variant/40 bg-surface-container-low text-primary hover:bg-primary hover:text-surface font-label-sm text-label-sm uppercase tracking-wider transition-colors"
                        title="Update Stock"
                      >
                        <span className="material-symbols-outlined text-[16px]">inventory_2</span>
                        <span className="text-[11px] font-medium">Stock</span>
                      </button>

                      <button
                        onClick={() => openBoostModal(prod)}
                        className="flex items-center justify-center gap-1 px-2 py-2 border border-outline-variant/40 bg-surface-container-low text-primary hover:bg-primary hover:text-surface font-label-sm text-label-sm uppercase tracking-wider transition-colors"
                        title="Boost Product"
                      >
                        <span className="material-symbols-outlined text-[16px]">campaign</span>
                        <span className="text-[11px] font-medium">Boost</span>
                      </button>

                      <button
                        onClick={() => setDeleteModalProduct(prod)}
                        className="flex items-center justify-center gap-1 px-2 py-2 border border-outline-variant/40 bg-surface-container-low text-error hover:bg-error hover:text-on-error font-label-sm text-label-sm uppercase tracking-wider transition-colors"
                        title="Delete Listing"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                        <span className="text-[11px] font-medium">Delete</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* ================= CURATED LIST VIEW ================= */
          <div className="space-y-4">
            {filteredProducts.map((prod) => {
              const isDelisted = prod.status === "DELISTED";
              const isSoldOut = prod.availableStock === 0;

              return (
                <article
                  key={prod.id}
                  className="bg-white rounded-2xl p-6 sm:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-[#E7DCD5] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#D4AF37]/60 transition-all"
                >
                  <div className="flex items-center gap-5 w-full md:w-auto">
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border border-[#E8D2B7]/60 shrink-0 bg-[#FFF7F9] shadow-inner">
                      <img
                        src={prod.images[0]}
                        alt={prod.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      {prod.isOneOfOne && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-[#3A0E1E] text-white border border-[#D4AF37]/40 shadow-xs">
                          1-of-1
                        </span>
                      )}
                      {prod.isBoosted && (
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#C59B27] text-white text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-xs">
                          <Flame className="w-3 h-3 text-white fill-white" />
                          <span>BOOSTED</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#865040]">
                          {prod.category} • by {prod.designerName}
                        </span>
                        {isDelisted ? (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-zinc-100 text-zinc-700 border border-zinc-200">
                            Delisted from Public
                          </span>
                        ) : isSoldOut ? (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-rose-50 text-[#BA1A1A] border border-rose-200">
                            Sold Out
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6]">
                            Live in Boutique
                          </span>
                        )}
                      </div>

                      <h3 className="font-editorial text-2xl font-normal text-[#21171F] leading-snug">
                        {prod.title}
                      </h3>

                      <div className="flex items-center gap-3 text-xs text-[#837376] flex-wrap">
                        <span className="font-editorial text-lg font-bold text-[#21171F]">
                          ₹ {prod.price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[#E7DCD5]">|</span>
                        <span>Shipping: <strong className="text-[#21171F] font-semibold">{prod.shippingMode}</strong></span>
                        <span className="text-[#E7DCD5]">|</span>
                        <span>Sizes: <strong className="text-[#21171F] font-semibold">{prod.sizes.join(", ")}</strong></span>
                      </div>

                      <div className="pt-2 flex items-center gap-3 text-xs">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FDF6ED] border border-[#F0DCB8] text-xs">
                          <span className="text-[#865040]">Current Stock:</span>
                          <span className="font-bold text-[#3A0E1E]">
                            {prod.isOneOfOne ? "1-of-1 Piece" : `${prod.availableStock} Units Available`}
                          </span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 text-xs text-[#837376]">
                          <Lock className="w-3.5 h-3.5 text-[#C59B27]" />
                          <span>Specs Locked</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto justify-end pt-4 md:pt-0 border-t md:border-t-0 border-[#E8D2B7]/60">
                    <button
                      onClick={() => handleOpenStockModal(prod)}
                      className="px-4 py-2 rounded-lg border border-[#E7DCD5] bg-white text-xs font-semibold text-[#21171F] hover:bg-[#FFF7F9] hover:border-[#D4AF37] transition-all flex items-center gap-1.5 shadow-2xs"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[#3A0E1E]" />
                      <span>Update Stock</span>
                    </button>

                    <button
                      onClick={() => openBoostModal(prod)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs ${
                        prod.isBoosted
                          ? "bg-[#F5DEBE] text-[#3A0E1E] border border-[#E0C18E] hover:bg-[#edd4b2]"
                          : "bg-white border border-[#E7DCD5] text-[#21171F] hover:bg-[#FFF7F9] hover:border-[#D4AF37]"
                      }`}
                    >
                      <Flame className={`w-3.5 h-3.5 ${prod.isBoosted ? "text-[#C59B27] fill-[#C59B27]" : "text-[#C59B27]"}`} />
                      <span>{prod.isBoosted ? "Boost Active" : "Boost"}</span>
                    </button>

                    {isDelisted ? (
                      <button
                        onClick={() => relistProduct(prod.id)}
                        className="w-9 h-9 rounded-lg border border-[#E7DCD5] bg-white text-emerald-800 hover:bg-emerald-50 flex items-center justify-center transition-colors"
                        title="Relist Product"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setDelistModalProduct(prod)}
                        className="w-9 h-9 rounded-lg border border-[#E7DCD5] bg-white text-[#837376] hover:text-[#21171F] hover:bg-[#FFF7F9] flex items-center justify-center transition-colors"
                        title="Delist from Public"
                      >
                        <EyeOff className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => setDeleteModalProduct(prod)}
                      className="w-9 h-9 rounded-lg border border-[#E7DCD5] bg-white text-[#837376] hover:text-[#BA1A1A] hover:bg-rose-50 hover:border-rose-300 flex items-center justify-center transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Section 5: Valuation Audit & Archival Pagination Footer (Exact from Photo 1) */}
      <section className="w-full pb-16">
        <div className="bg-surface-container-low p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border border-outline-variant/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-semibold">
                Archived Inventory
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-headline-sm text-headline-sm text-primary font-bold">
                  {Math.min(filteredProducts.length, 6)}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  of 24 active creations shown
                </span>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-outline-variant/30"></div>
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-semibold">
                Selected Page Valuation
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-title-lg text-title-lg text-primary font-serif font-bold">
                  ₹35,650
                </span>
                <span className="text-xs text-on-surface-variant uppercase font-sans">USD Curated</span>
              </div>
            </div>
          </div>

          {/* Archival Pagination Controls */}
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 bg-surface text-on-surface-variant hover:text-primary flex items-center justify-center shadow-xs transition-colors border border-outline-variant/30" title="Previous Page">
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>
            <div className="flex items-center gap-1 font-label-md text-label-md">
              <span className="w-10 h-10 bg-primary text-surface flex items-center justify-center font-bold">01</span>
              <button className="w-10 h-10 bg-surface text-on-surface-variant hover:text-primary flex items-center justify-center transition-colors border border-outline-variant/30">02</button>
              <button className="w-10 h-10 bg-surface text-on-surface-variant hover:text-primary flex items-center justify-center transition-colors border border-outline-variant/30">03</button>
              <button className="w-10 h-10 bg-surface text-on-surface-variant hover:text-primary flex items-center justify-center transition-colors border border-outline-variant/30">04</button>
            </div>
            <button className="w-10 h-10 bg-surface text-on-surface-variant hover:text-primary flex items-center justify-center shadow-xs transition-colors border border-outline-variant/30" title="Next Page">
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stock Adjustment Modal */}
      <AnimatePresence>
        {stockModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231820]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 border border-[#E8D2B7] shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#E8D2B7]">
                <h3 className="font-editorial text-2xl font-bold text-[#3A0E1E]">Update Inventory Stock</h3>
                <button onClick={() => setStockModalProduct(null)} className="p-1 rounded-full text-[#837376] hover:bg-[#FFF7F9]">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-[#837376]">
                Adjust live available units for <strong>{stockModalProduct.title}</strong>.
              </p>
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#3A0E1E] mb-2">Available Quantity</label>
                <input
                  type="number"
                  min={0}
                  max={999}
                  value={newStockInput}
                  onChange={(e) => setNewStockInput(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-[#E8D2B7] text-center font-editorial text-2xl font-bold text-[#3A0E1E] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-3">
                <button onClick={() => setStockModalProduct(null)} className="px-4 py-2 text-xs font-semibold text-[#837376]">Cancel</button>
                <button onClick={handleSaveStock} className="px-6 py-2.5 rounded-full bg-[#3A0E1E] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#271C0B] shadow-xs">
                  Save Inventory
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delist Modal */}
      <AnimatePresence>
        {delistModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231820]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 border border-[#E8D2B7] shadow-2xl space-y-4"
            >
              <h3 className="font-editorial text-2xl font-bold text-[#3A0E1E]">Delist from Boutique?</h3>
              <p className="text-xs text-[#837376]">
                Hides <strong>"{delistModalProduct.title}"</strong> from public patron catalogs. You can relist anytime.
              </p>
              <div className="flex items-center justify-end gap-3 pt-3">
                <button onClick={() => setDelistModalProduct(null)} className="px-4 py-2 text-xs font-semibold text-[#837376]">Cancel</button>
                <button onClick={handleConfirmDelist} className="px-5 py-2.5 rounded-full bg-[#3A0E1E] text-white text-xs uppercase tracking-wider font-semibold">
                  Confirm Delist
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Modal */}
      <AnimatePresence>
        {deleteModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231820]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 border border-[#E8D2B7] shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-2 text-[#BA1A1A]">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-editorial text-2xl font-bold">Permanently Delete Creation?</h3>
              </div>
              <p className="text-xs text-[#837376]">
                This action cannot be undone. <strong>"{deleteModalProduct.title}"</strong> and its provenance specs will be deleted from your atelier ledger.
              </p>
              <div className="flex items-center justify-end gap-3 pt-3">
                <button onClick={() => setDeleteModalProduct(null)} className="px-4 py-2 text-xs font-semibold text-[#837376]">Cancel</button>
                <button onClick={handleConfirmDelete} className="px-5 py-2.5 rounded-full bg-[#BA1A1A] hover:bg-rose-900 text-white text-xs uppercase tracking-wider font-semibold shadow-xs">
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
