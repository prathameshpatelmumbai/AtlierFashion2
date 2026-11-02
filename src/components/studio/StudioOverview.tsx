"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { ListedProduct } from "@/types/studio";
import { 
  Package, 
  Sparkles, 
  Archive, 
  FileEdit, 
  Flame, 
  ArrowRight,
  TrendingUp,
  Eye,
  ShoppingBag,
  Plus,
  Lock,
  Sliders,
  SlidersHorizontal,
  EyeOff,
  Trash2,
  RotateCcw,
  AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const StudioOverview: React.FC = () => {
  const { 
    listedProducts, 
    soldProducts, 
    drafts, 
    boostCampaigns, 
    setActiveStudioTab, 
    startNewListing,
    openBoostModal,
    updateStock,
    delistProduct,
    relistProduct,
    deleteProduct,
    showToast
  } = useStudio();

  // Modal States for inline actions
  const [stockModalProduct, setStockModalProduct] = useState<ListedProduct | null>(null);
  const [newStockInput, setNewStockInput] = useState<number>(1);
  const [delistModalProduct, setDelistModalProduct] = useState<ListedProduct | null>(null);
  const [deleteModalProduct, setDeleteModalProduct] = useState<ListedProduct | null>(null);

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

  const studioTabs = [
    {
      id: "list-new" as const,
      title: "List New Product",
      subtitle: "Launch a new haute couture or limited-run garment with structured measurements.",
      count: "+ New",
      icon: Plus,
      action: startNewListing,
      highlight: true
    },
    {
      id: "listed" as const,
      title: "Listed Products",
      subtitle: "Review live inventory, lock core attributes, and modulate real-time piece availability.",
      count: listedProducts.filter(p => p.status === "ACTIVE").length,
      icon: Package,
      action: () => setActiveStudioTab("listed"),
      highlight: false
    },
    {
      id: "sold" as const,
      title: "Sold Products",
      subtitle: "Permanent archive of bespoke and ready-to-wear orders dispatched to patrons.",
      count: soldProducts.length,
      icon: Archive,
      action: () => setActiveStudioTab("sold"),
      highlight: false
    },
    {
      id: "drafts" as const,
      title: "Drafts",
      subtitle: "In-progress creations saved with measurement profiles and fabric selections.",
      count: drafts.length,
      icon: FileEdit,
      action: () => setActiveStudioTab("drafts"),
      highlight: false
    },
    {
      id: "boosted" as const,
      title: "Boosted for Promotion",
      subtitle: "Curated spotlight campaigns enhancing your atelier's reach across global collectors.",
      count: boostCampaigns.filter(c => c.status === "ACTIVE").length,
      icon: Flame,
      action: () => setActiveStudioTab("boosted"),
      highlight: false
    }
  ];

  return (
    <div className="space-y-10">
      
      {/* Editorial Hero Banner from Reference */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl hero-glass-cherry text-[#FFF7F9] p-8 md:p-12 shadow-xl border border-[#D4AF37]/45"
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#542333]/80 border border-[#D4AF37]/50 text-[#F6DFC4] text-xs font-semibold tracking-wider uppercase mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Atelier Maison Privée Curated Edition</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-medium tracking-tight text-[#FFF7F9] leading-tight">
            Welcome to Atelier Maison Privée
          </h1>
          <p className="mt-3 text-base text-[#FBF7F1]/80 font-light leading-relaxed">
            Manage your creations, bespoke dossiers, and product availability. Every stitch, measurement, and luxury silhouette orchestrated from your private atelier console.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={startNewListing}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#21171F] text-xs font-semibold uppercase tracking-widest hover:from-[#e0bc46] hover:to-[#d4af37] transition-all shadow-md border border-[#D4AF37]/50"
            >
              <span>List New Creation</span>
              <ArrowRight className="w-4 h-4 text-[#3A0E1E]" />
            </button>
            <button
              onClick={() => setActiveStudioTab("listed")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-[#D4AF37]/40 text-[#FFF7F9] text-xs font-semibold uppercase tracking-widest hover:bg-white/20 hover:border-[#D4AF37] transition-all backdrop-blur-xs"
            >
              <span>View Active Catalogue</span>
            </button>
          </div>
        </div>

        {/* Ambient Couture Decorative Silhouette Illustration in background */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-25 pointer-events-none hidden md:block bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/25 via-transparent to-transparent" />
      </motion.div>

      {/* KPI Performance Metrics Ribbon (from reference photo) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="luxury-card p-5 sm:p-6 bg-white border border-[#E8D2B7]/70 hover:border-[#D4AF37]/70 transition-all">
          <div className="flex items-center justify-between text-[#837376] mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Total Sales</span>
            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="font-editorial text-2xl sm:text-3xl font-semibold text-[#231820]">
            ₹ 2,48,750
          </div>
          <div className="mt-1 flex items-center text-[11px] font-medium text-emerald-800">
            <span>↑ 12.5%</span>
            <span className="text-[#837376] ml-1.5 font-normal">vs last month</span>
          </div>
        </div>

        <div className="luxury-card p-5 sm:p-6 bg-white border border-[#E8D2B7]/70 hover:border-[#D4AF37]/70 transition-all">
          <div className="flex items-center justify-between text-[#837376] mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Net Earnings</span>
            <span className="text-xs font-serif font-bold text-[#3A0E1E]">₹</span>
          </div>
          <div className="font-editorial text-2xl sm:text-3xl font-semibold text-[#231820]">
            ₹ 1,98,400
          </div>
          <div className="mt-1 flex items-center text-[11px] font-medium text-emerald-800">
            <span>↑ 10.2%</span>
            <span className="text-[#837376] ml-1.5 font-normal">disbursed directly</span>
          </div>
        </div>

        <div className="luxury-card p-5 sm:p-6 bg-white border border-[#E8D2B7]/70 hover:border-[#D4AF37]/70 transition-all">
          <div className="flex items-center justify-between text-[#837376] mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Orders Fulfilled</span>
            <Package className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="font-editorial text-2xl sm:text-3xl font-semibold text-[#231820]">
            124
          </div>
          <div className="mt-1 flex items-center text-[11px] font-medium text-emerald-800">
            <span>↑ 8.7%</span>
            <span className="text-[#837376] ml-1.5 font-normal">0 return disputes</span>
          </div>
        </div>

        <div className="luxury-card p-5 sm:p-6 bg-white border border-[#E8D2B7]/70 hover:border-[#D4AF37]/70 transition-all">
          <div className="flex items-center justify-between text-[#837376] mb-2">
            <span className="text-xs uppercase tracking-wider font-semibold">Catalogue Views</span>
            <Eye className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="font-editorial text-2xl sm:text-3xl font-semibold text-[#231820]">
            89.5K
          </div>
          <div className="mt-1 flex items-center text-[11px] font-medium text-emerald-800">
            <span>↑ 14.3%</span>
            <span className="text-[#837376] ml-1.5 font-normal">organic collector pull</span>
          </div>
        </div>
      </div>

      {/* The 5 Studio Navigation Options */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-editorial text-2xl font-semibold text-[#231820]">
              Your Studio Catalogue Sections
            </h2>
            <p className="text-xs text-[#837376] mt-0.5">
              Select an area to curate, update inventory availability, or resume unfinished drafts.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {studioTabs.map((tab, idx) => {
            const Icon = tab.icon;
            return (
              <motion.div
                key={tab.id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                onClick={tab.action}
                className={`luxury-card p-6 cursor-pointer flex flex-col justify-between transition-all ${
                  tab.highlight
                    ? "border-[#D4AF37]/60 bg-gradient-to-b from-white to-[#FFF7F9] shadow-xs"
                    : "border-[#E8D2B7]/70 hover:border-[#D4AF37]/80"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tab.highlight 
                        ? "bg-[#3A0E1E] text-white border border-[#D4AF37]/50 shadow-xs" 
                        : "bg-[#FCE9F4] text-[#3A0E1E] border border-[#E8D2B7]/60"
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gradient-to-r from-[#F6DFC4]/40 to-[#E8D2B7]/30 text-[#3A0E1E] border border-[#D4AF37]/40">
                      {tab.count}
                    </span>
                  </div>
                  <h3 className="font-editorial text-xl font-medium text-[#231820]">
                    {tab.title}
                  </h3>
                  <p className="text-xs text-[#837376] mt-2 leading-relaxed">
                    {tab.subtitle}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8D2B7]/60 flex items-center justify-between text-xs font-semibold text-[#3A0E1E]">
                  <span className="tracking-wider uppercase text-[11px]">Open Section</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Featured Atelier Showcase: Active Creations in Boutique (Mirroring Image 2) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-[#865040] uppercase">
              Current Spotlight
            </span>
            <h3 className="font-editorial text-2xl font-medium text-[#21171F] tracking-tight">
              Active Creations in Boutique
            </h3>
          </div>
          <button
            onClick={() => setActiveStudioTab("listed")}
            className="text-xs font-bold uppercase tracking-wider text-[#21171F] hover:text-[#3A0E1E] transition-colors self-start sm:self-auto flex items-center gap-1.5 group"
          >
            <span>View All ({listedProducts.filter(p => p.status === "ACTIVE").length || listedProducts.length})</span>
            <span className="text-[#3A0E1E] font-bold transition-transform group-hover:translate-x-0.5">→</span>
          </button>
        </div>

        {/* Product Cards mirroring Image 2 */}
        <div className="space-y-4">
          {listedProducts.slice(0, 3).map((prod) => {
            const isDelisted = prod.status === "DELISTED";
            const isSoldOut = prod.availableStock === 0;

            return (
              <motion.div
                key={prod.id}
                layout
                className={`p-6 bg-white rounded-2xl border border-[#E7DCD5] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.03)] ${
                  isDelisted ? "opacity-70 bg-[#FFF7F9]/60 border-dashed" : "hover:border-[#D4AF37]/60"
                }`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
                  {/* LEFT: Product Thumbnail & Status Badges */}
                  <div className="flex items-center gap-5 w-full md:w-auto">
                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border border-[#E8D2B7]/60 shrink-0 bg-[#FFF7F9] shadow-inner">
                      <img 
                        src={prod.images[0] || "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400&auto=format&fit=crop"} 
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

                    {/* Product Metadata & Specifications */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#837376]">
                          {prod.category} • {prod.subcategory || "Designer Blouses"}
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
                        <span>
                          Shipping: <strong className="text-[#21171F] font-semibold">{prod.shippingMode}</strong>
                        </span>
                        <span className="text-[#E7DCD5] hidden sm:inline">|</span>
                        <span className="hidden sm:inline">
                          Sizes: <strong className="text-[#21171F] font-semibold">{prod.sizes.join(", ")}</strong>
                        </span>
                      </div>

                      {/* Stock count and lock disclaimer */}
                      <div className="pt-2 flex items-center gap-3 text-xs">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FDF6ED] border border-[#F0DCB8] text-xs">
                          <span className="text-[#865040]">Current Stock:</span>
                          <span className="font-bold text-[#3A0E1E]">
                            {prod.isOneOfOne ? "1-of-1 Piece" : `${prod.availableStock} Units Available`}
                          </span>
                        </div>

                        <div className="inline-flex items-center gap-1.5 text-xs text-[#837376]" title="Core design fields cannot be edited once published to maintain buyer trust.">
                          <Lock className="w-3.5 h-3.5 text-[#C59B27]" />
                          <span>Specs Locked</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: Actions */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-[#E8D2B7]/60 justify-end">
                    {/* Update Stock Button */}
                    <button
                      onClick={() => handleOpenStockModal(prod)}
                      className="px-4 py-2 rounded-lg border border-[#E7DCD5] bg-white text-xs font-semibold text-[#21171F] hover:bg-[#FFF7F9] hover:border-[#D4AF37] transition-all flex items-center gap-1.5 shadow-2xs"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[#3A0E1E]" />
                      <span>Update Stock</span>
                    </button>

                    {/* Boost Button */}
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

                    {/* Delist / Relist Button */}
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

                    {/* Delete Destructive Action */}
                    <button
                      onClick={() => setDeleteModalProduct(prod)}
                      className="w-9 h-9 rounded-lg border border-[#E7DCD5] bg-white text-[#837376] hover:text-[#BA1A1A] hover:bg-rose-50 hover:border-rose-300 flex items-center justify-center transition-colors"
                      title="Permanently Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* UPDATE STOCK MODAL */}
      <AnimatePresence>
        {stockModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231820]/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="luxury-card max-w-sm w-full p-6 bg-white border border-[#D4AF37]/60 space-y-5 shadow-2xl"
            >
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#865040]">
                  Inventory Management
                </span>
                <h3 className="font-editorial text-2xl font-semibold text-[#231820]">
                  Update Available Stock
                </h3>
                <p className="text-xs text-[#837376] mt-1 font-light line-clamp-1">
                  {stockModalProduct.title}
                </p>
              </div>

              <div className="space-y-3 bg-[#FFF7F9] p-4 rounded-lg border border-[#E8D2B7]">
                <div className="flex justify-between text-xs">
                  <span className="text-[#837376]">Current availability:</span>
                  <span className="font-semibold text-[#3A0E1E]">
                    {stockModalProduct.availableStock} pieces
                  </span>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#231820] mb-1.5">
                    New Available Quantity
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={newStockInput}
                    onChange={(e) => setNewStockInput(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 text-sm font-semibold rounded-lg border border-[#E8D2B7] bg-white outline-none focus:border-[#D4AF37]"
                  />
                  <span className="text-[10px] text-[#837376] mt-1 block">
                    Setting to 0 will mark this garment as &quot;Sold Out&quot;.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStockModalProduct(null)}
                  className="flex-1 py-2.5 rounded-full border border-[#E8D2B7] text-xs font-semibold uppercase tracking-wider text-[#231820] hover:bg-[#FFF7F9]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveStock}
                  className="flex-1 py-2.5 rounded-full bg-[#3A0E1E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#271C0B] transition-colors shadow-xs border border-[#D4AF37]/50"
                >
                  Save Stock
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELIST CONFIRMATION MODAL */}
      <AnimatePresence>
        {delistModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231820]/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="luxury-card max-w-sm w-full p-6 bg-white border border-[#D4AF37]/60 space-y-4 shadow-2xl"
            >
              <div className="w-10 h-10 rounded-full bg-[#FCE9F4] border border-[#D4AF37]/40 flex items-center justify-center text-[#3A0E1E]">
                <EyeOff className="w-5 h-5 text-[#D4AF37]" />
              </div>

              <div>
                <h3 className="font-editorial text-2xl font-semibold text-[#231820]">
                  Delist this creation?
                </h3>
                <p className="text-xs text-[#837376] mt-1.5 leading-relaxed">
                  This will temporarily hide <strong>&quot;{delistModalProduct.title}&quot;</strong> from customer search and designer boutique shelves. You can re-list it at any moment.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDelistModalProduct(null)}
                  className="flex-1 py-2.5 rounded-full border border-[#E8D2B7] text-xs font-semibold uppercase tracking-wider text-[#231820] hover:bg-[#FFF7F9]"
                >
                  Keep Active
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelist}
                  className="flex-1 py-2.5 rounded-full bg-[#3A0E1E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#271C0B] transition-colors border border-[#D4AF37]/50"
                >
                  Delist Product
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE DESTRUCTIVE CONFIRMATION MODAL */}
      <AnimatePresence>
        {deleteModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#21171F]/50 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="luxury-card max-w-sm w-full p-6 bg-white border border-rose-200 space-y-4 shadow-xl"
            >
              <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-[#8B2635]">
                <AlertTriangle className="w-5 h-5" />
              </div>

              <div>
                <h3 className="font-editorial text-2xl font-semibold text-[#8B2635]">
                  Permanently Delete?
                </h3>
                <p className="text-xs text-[#8F8178] mt-1.5 leading-relaxed">
                  Are you certain you wish to purge <strong>&quot;{deleteModalProduct.title}&quot;</strong>? This action is irreversible and all historical listing analytics will be detached.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteModalProduct(null)}
                  className="flex-1 py-2.5 rounded-full border border-[#E4D5C5] text-xs font-semibold uppercase tracking-wider text-[#21171F] hover:bg-[#FBF7F1]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="flex-1 py-2.5 rounded-full bg-[#8B2635] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#6D1B28] transition-colors shadow-xs"
                >
                  Delete Permanently
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

