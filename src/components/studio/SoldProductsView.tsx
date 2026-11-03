"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { SoldProduct } from "@/types/studio";
import { 
  Download, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Flame, 
  CheckCircle2, 
  FolderLock,
  ChevronDown,
  ArrowUpDown,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const SoldProductsView: React.FC = () => {
  const { 
    soldProducts, 
    listedProducts, 
    drafts, 
    setActiveStudioTab, 
    startNewListing,
    showToast 
  } = useStudio();

  const [searchQuery, setSearchQuery] = useState("");
  const [collectionFilter, setCollectionFilter] = useState("all");
  const [sortOption, setSortOption] = useState<"recent" | "price-desc" | "price-asc">("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [dossierProduct, setDossierProduct] = useState<SoldProduct | null>(null);

  // Filter & Sort Logic
  const filteredSoldProducts = soldProducts
    .filter((item) => {
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.archiveCode && item.archiveCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.orderNumber.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchSearch) return false;
      if (collectionFilter === "couture") return item.category.includes("Couture");
      if (collectionFilter === "menswear") return item.category.includes("Sherwanis");
      return true;
    })
    .sort((a, b) => {
      if (sortOption === "price-desc") return b.soldPrice - a.soldPrice;
      if (sortOption === "price-asc") return a.soldPrice - b.soldPrice;
      return new Date(b.soldDate).getTime() - new Date(a.soldDate).getTime();
    });

  const handleDownloadInvoice = (item: SoldProduct) => {
    showToast(`Downloading authenticated invoice dossier for ${item.title} (${item.archiveCode || item.orderNumber})...`);
  };

  const handleExportLedger = () => {
    showToast("Exporting Atelier Maison Privée Master Vault Ledger (CSV)...");
  };

  return (
    <div className="flex flex-col w-full space-y-8 animate-fadeIn">
      
      {/* SECONDARY ATELIER SUB-NAVIGATION BAR */}
      <section className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Navigation Tabs Pill Container */}
          <div className="bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border border-[#E8D2B7]/70 shadow-xs flex flex-wrap items-center gap-1.5">
            {/* Tab 1: Listed Products */}
            <button 
              onClick={() => setActiveStudioTab("listed")}
              className="px-5 py-2.5 text-[#837376] hover:text-[#3A0E1E] hover:bg-[#FFF7F9] rounded-xl text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Listed Products</span>
              <span className="text-[#837376] text-[11px] px-1.5 py-0.5">{listedProducts.length}</span>
            </button>

            {/* Tab 2: Sold Products (Active) */}
            <button 
              onClick={() => setActiveStudioTab("sold")}
              className="px-5 py-2.5 bg-[#3A0E1E] text-white rounded-xl text-xs uppercase tracking-wider font-semibold shadow-xs flex items-center gap-2 border border-[#D4AF37]/40 cursor-pointer"
            >
              <span>Sold Products</span>
              <span className="bg-[#542333] text-[#F6DFC4] text-[11px] font-bold px-2 py-0.5 rounded-full">
                18
              </span>
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
                4
              </span>
            </button>
          </div>

          {/* Standalone Distinct "List New Product" CTA Button */}
          <button
            onClick={() => {
              startNewListing();
              setActiveStudioTab("list-new");
            }}
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

      {/* EDITORIAL LEDGER HEADER */}
      <div className="w-full pt-4 pb-2">
        <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#865040]">
                Atelier Curatorial Ledger
              </span>
              <span className="text-[#865040]/40">•</span>
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#837376]">
                Vault Depository
              </span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#3a0e1e] tracking-tight">
              Sold Products Archive
            </h1>

            <p className="text-sm text-[#837376] mt-1 max-w-2xl leading-relaxed">
              Archival ledger of acquired bespoke creations, historic salon valuations, certified patron provenance records, and authenticated haute couture acquisitions.
            </p>
          </div>

          {/* REALIZED METRICS PILL RIBBON */}
          <div className="flex flex-wrap items-stretch gap-3 bg-white p-2 rounded-xl border border-[#d5c2c5]/40 shadow-xs">
            <div className="flex flex-col px-4 py-2.5 bg-[#ffeff8]/70 rounded-lg min-w-[125px]">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#837376]">Archived Works</span>
              <span className="font-editorial text-2xl font-bold text-[#3a0e1e] mt-0.5">
                18 <span className="font-sans text-xs text-[#837376] font-normal">Creations</span>
              </span>
            </div>

            <div className="flex flex-col px-4 py-2.5 bg-[#ffeff8]/70 rounded-lg min-w-[140px]">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#837376]">Realized Valuation</span>
              <span className="font-editorial text-2xl font-bold text-[#3a0e1e] mt-0.5">
                ₹3,42,000
              </span>
            </div>

            <div className="flex flex-col px-4 py-2.5 bg-[#ffeff8]/70 rounded-lg min-w-[130px]">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#837376]">Salon Provenance</span>
              <span className="font-editorial text-2xl font-bold text-[#865040] mt-0.5 flex items-center gap-1.5">
                100%
                <CheckCircle2 className="w-4 h-4 text-[#865040]" />
              </span>
            </div>
          </div>
        </div>

        {/* CURATORIAL FILTER BAR */}
        <div className="w-full max-w-[1600px] mx-auto mt-6 pt-2 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-white px-3.5 py-2.5 rounded-lg border border-[#d5c2c5]/40 max-w-md w-full shadow-xs">
            <Search className="w-4 h-4 text-[#837376]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search archive by patron, piece, or certificate ID..."
              className="bg-transparent text-xs text-[#231820] placeholder:text-[#837376]/50 focus:outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-lg border border-[#d5c2c5]/40 text-xs shadow-xs">
              <span className="text-[11px] uppercase tracking-wider text-[#837376] font-semibold">Collection:</span>
              <select
                value={collectionFilter}
                onChange={(e) => setCollectionFilter(e.target.value)}
                className="bg-transparent font-medium text-[#231820] focus:outline-none cursor-pointer"
              >
                <option value="all">All Seasons</option>
                <option value="couture">Haute Couture</option>
                <option value="menswear">Menswear</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#837376]" />
            </div>

            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-lg border border-[#d5c2c5]/40 text-xs shadow-xs">
              <span className="text-[11px] uppercase tracking-wider text-[#837376] font-semibold">Sort:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="bg-transparent font-medium text-[#231820] focus:outline-none cursor-pointer"
              >
                <option value="recent">Date of Acquisition (Recent)</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-[#837376]" />
            </div>

            <button
              onClick={handleExportLedger}
              className="bg-[#f6e3ef]/80 hover:bg-[#f6e3ef] text-[#3a0e1e] px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-colors border border-[#d5c2c5]/40 shadow-xs"
              type="button"
            >
              <Download className="w-3.5 h-3.5 text-[#865040]" />
              <span>Export Ledger</span>
            </button>
          </div>
        </div>
      </div>

      {/* HORIZONTAL ARCHIVAL LEDGER CARDS (3x2 GRID) */}
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredSoldProducts.map((item) => (
            <article
              key={item.id}
              className="group bg-white rounded-lg overflow-hidden border border-[#d5c2c5]/30 shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              {/* 3:4 Aspect Image with SOLD Ribbon */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#fce9f4]">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Diagonal SOLD Ribbon */}
                <div className="absolute -right-12 top-7 w-48 rotate-45 bg-[#542333]/95 text-[#f6dfc4] py-1 text-center text-xs tracking-[0.25em] font-bold uppercase shadow-md border-y border-[#f6dfc4]/20 pointer-events-none select-none">
                  SOLD
                </div>

                {/* "Archived Haute Couture" Blur Footer Overlay */}
                <div className="absolute inset-x-0 bottom-0 py-2.5 bg-[#3a0e1e]/80 backdrop-blur-md flex items-center justify-center">
                  <span className="text-[10px] text-[#f6dfc4] uppercase tracking-[0.2em] font-semibold">
                    Archived Haute Couture
                  </span>
                </div>
              </div>

              {/* Card Meta & Valuation */}
              <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#865040]">
                      {item.category}
                    </span>
                    <span className="font-mono text-[11px] text-[#837376]/80">
                      {item.archiveCode || `#MP-SL-${item.orderNumber.replace(/[^0-9]/g, "")}`}
                    </span>
                  </div>

                  <h2 className="font-editorial text-xl font-semibold text-[#3a0e1e] tracking-tight leading-snug line-clamp-1">
                    {item.title}
                  </h2>

                  <p className="text-xs text-[#837376] line-clamp-1">
                    {item.collectionName || "Autumn/Winter 2024 Collection • 1 of 1 Bespoke"}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#d5c2c5]/30 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="font-editorial text-2xl font-bold text-[#3a0e1e]">
                      ₹ {item.soldPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-[#837376]">
                      Sold on {item.soldDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleDownloadInvoice(item)}
                      className="flex-1 bg-[#f6e3ef]/60 hover:bg-[#f6e3ef] text-[#3a0e1e] py-2 px-3 rounded text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#d5c2c5]/30 shadow-xs"
                      type="button"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#865040]" />
                      <span>Download Invoice</span>
                    </button>

                    <button
                      onClick={() => setDossierProduct(item)}
                      className="p-2 rounded bg-[#ffeff8]/70 hover:bg-[#ffeff8] text-[#837376] hover:text-[#3a0e1e] border border-[#d5c2c5]/30 transition-colors shadow-xs"
                      title="Archival Dossier"
                      type="button"
                    >
                      <FolderLock className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* BOTTOM ARCHIVAL INDEX COUNTER & PAGINATION */}
      <div className="w-full max-w-[1600px] mx-auto pb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 bg-white p-6 rounded-lg border border-[#d5c2c5]/30 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#837376] font-semibold">
              Archival Registry Index
            </span>
            <span className="w-1 h-1 rounded-full bg-[#865040]"></span>
            <span className="text-xs text-[#231820] font-medium">
              Showing 1–{filteredSoldProducts.length} of 18 archived creations
            </span>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-2 rounded hover:bg-[#ffeff8] text-[#837376] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              type="button"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="w-8 h-8 rounded bg-[#3a0e1e] text-white text-xs font-semibold flex items-center justify-center shadow-xs">
              01
            </span>
            <button 
              onClick={() => showToast("Loading Page 02...")}
              className="w-8 h-8 rounded hover:bg-[#ffeff8] text-[#231820] text-xs flex items-center justify-center transition-colors"
              type="button"
            >
              02
            </button>
            <button 
              onClick={() => showToast("Loading Page 03...")}
              className="w-8 h-8 rounded hover:bg-[#ffeff8] text-[#231820] text-xs flex items-center justify-center transition-colors"
              type="button"
            >
              03
            </button>
            <button 
              onClick={() => showToast("Loading Page 04...")}
              className="w-8 h-8 rounded hover:bg-[#ffeff8] text-[#231820] text-xs flex items-center justify-center transition-colors"
              type="button"
            >
              04
            </button>
            <button
              onClick={() => showToast("Navigating to next vault ledger page...")}
              className="p-2 rounded hover:bg-[#ffeff8] text-[#231820] transition-colors"
              type="button"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-right">
            <span className="text-[11px] tracking-widest uppercase font-mono text-[#837376]">
              Permanent Storage Vault #A8-M
            </span>
          </div>
        </div>
      </div>

      {/* ARCHIVAL CERTIFICATE DOSSIER MODAL */}
      <AnimatePresence>
        {dossierProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231820]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 border border-[#d5c2c5] shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#d5c2c5]/40">
                <div className="flex items-center gap-2">
                  <FolderLock className="w-5 h-5 text-[#865040]" />
                  <h3 className="font-editorial text-xl font-bold text-[#3a0e1e]">
                    Archival Provenance Certificate
                  </h3>
                </div>
                <button
                  onClick={() => setDossierProduct(null)}
                  className="p-1 rounded-full text-[#837376] hover:bg-[#ffeff8]"
                >
                  <ChevronDown className="w-5 h-5 rotate-180" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-[#d5c2c5]/20">
                  <span className="text-[#837376] uppercase tracking-wider font-semibold">Master Piece</span>
                  <span className="font-bold text-[#3a0e1e]">{dossierProduct.title}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#d5c2c5]/20">
                  <span className="text-[#837376] uppercase tracking-wider font-semibold">Certificate ID</span>
                  <span className="font-mono text-[#865040]">{dossierProduct.archiveCode || "#MP-SL-9082"}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#d5c2c5]/20">
                  <span className="text-[#837376] uppercase tracking-wider font-semibold">Realized Valuation</span>
                  <span className="font-bold text-[#3a0e1e]">₹ {dossierProduct.soldPrice.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#d5c2c5]/20">
                  <span className="text-[#837376] uppercase tracking-wider font-semibold">Acquisition Date</span>
                  <span className="text-[#231820]">{dossierProduct.soldDate}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#d5c2c5]/20">
                  <span className="text-[#837376] uppercase tracking-wider font-semibold">Provenance Authenticity</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% Cryptographically Sealed
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  onClick={() => setDossierProduct(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#837376] hover:text-[#3a0e1e]"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleDownloadInvoice(dossierProduct);
                    setDossierProduct(null);
                  }}
                  className="px-5 py-2.5 rounded-lg bg-[#542333] hover:bg-[#3a0e1e] text-white text-xs uppercase tracking-wider font-semibold shadow-xs flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Full Dossier PDF</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
