"use client";

import React, { useState, useMemo } from "react";
import { useStudio } from "@/context/StudioContext";
import { ListedProduct } from "@/types/studio";
import { 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  X, 
  Check, 
  Heart, 
  ShoppingBag, 
  Eye, 
  Scissors, 
  SlidersHorizontal, 
  Sparkles, 
  ArrowUpDown, 
  CheckCircle2,
  Grid,
  Columns
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface CustomerCatalogProps {
  onOpenBuyNow: (product: ListedProduct) => void;
  onOpenCustomRequest: (product?: ListedProduct) => void;
}

export const CustomerCatalog: React.FC<CustomerCatalogProps> = ({
  onOpenBuyNow,
  onOpenCustomRequest
}) => {
  const { 
    activeGender, 
    setActiveGender,
    activeCategoryFilter, 
    setActiveCategoryFilter,
    catalogLayout,
    setCatalogLayout,
    setSelectedProductId,
    addToCart,
    showToast
  } = useStudio();

  // Active filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    activeCategoryFilter ? [activeCategoryFilter] : ["Jackets & Coats"]
  );
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>(["Wool"]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(["Size M"]);
  const [selectedOccasion, setSelectedOccasion] = useState<string[]>([]);
  const [selectedDesigners, setSelectedDesigners] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");

  // Accordion state
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    size: true,
    occasion: false,
    fabric: true,
    brand: false
  });

  const toggleSection = (sec: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
    showToast(wishlist[id] ? "Removed from private vault" : "Saved to your private salon vault");
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedFabrics([]);
    setSelectedSizes([]);
    setSelectedOccasion([]);
    setSelectedDesigners([]);
    setPriceRange("all");
    setActiveCategoryFilter(null);
    showToast("Filters reset to all archival works");
  };

  // Luxury Catalog Products (Photo 2)
  const catalogProducts = useMemo(() => [
    {
      id: "prod-1",
      title: "Double-Breasted Cashmere Peacoat",
      designer: "Valentin Laurent",
      isPro: true,
      badge: "LIMITED EDITION",
      category: "Jackets & Coats",
      fabric: "Pure Cashmere",
      price: 62000,
      originalPrice: 84000,
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
      sizes: ["46 EU", "48 EU", "50 EU", "52 EU"],
      gender: "men"
    },
    {
      id: "prod-2",
      title: "Structured Wool Overcoat",
      designer: "Atelier Bellini",
      isPro: true,
      badge: "HANDCRAFTED",
      category: "Jackets & Coats",
      fabric: "Wool",
      price: 58000,
      originalPrice: 76000,
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop",
      sizes: ["48 EU", "50 EU", "52 EU"],
      gender: "men"
    },
    {
      id: "prod-3",
      title: "Bespoke Tailored Velvet Blazer",
      designer: "Elena Rostova",
      isPro: true,
      badge: "MADE TO ORDER",
      category: "Suits & Tailoring",
      fabric: "Velvet",
      price: 52500,
      originalPrice: 69000,
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop",
      sizes: ["Size S", "Size M", "Size L"],
      gender: "men"
    },
    {
      id: "prod-4",
      title: "Sculptural Silk Trench",
      designer: "Julian Vance",
      isPro: false,
      badge: "HANDCRAFTED",
      category: "Jackets & Coats",
      fabric: "Mulberry Silk",
      price: 74000,
      originalPrice: 95000,
      image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop",
      sizes: ["Size M", "Size L"],
      gender: "men"
    },
    {
      id: "prod-5",
      title: "Italian Melton Wool Overcoat",
      designer: "Manuel Costello",
      isPro: true,
      badge: "ORGANIC COLLECTION",
      category: "Jackets & Coats",
      fabric: "Wool",
      price: 59000,
      originalPrice: 75000,
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop",
      sizes: ["48 EU", "50 EU"],
      gender: "men"
    },
    {
      id: "prod-6",
      title: "Hand-Spun Alpaca Blend Robe Coat",
      designer: "Aurelien Moreau",
      isPro: true,
      badge: "HANDCRAFTED",
      category: "Knitwear & Sweaters",
      fabric: "Alpaca",
      price: 86000,
      originalPrice: 110000,
      image: "https://images.unsplash.com/photo-1550246140-5119ae4790b8?q=80&w=1000&auto=format&fit=crop",
      sizes: ["Size M", "Size L", "Size XL"],
      gender: "men"
    },
    {
      id: "prod-7",
      title: "Seamless Merino Knit Trench",
      designer: "Sean & Jane",
      isPro: true,
      badge: "ORGANIC COLLECTION",
      category: "Knitwear & Sweaters",
      fabric: "Wool",
      price: 48000,
      originalPrice: 62000,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
      sizes: ["Size S", "Size M"],
      gender: "men"
    },
    {
      id: "prod-8",
      title: "Pleated Trousers in Virgin Wool",
      designer: "Lucia Ferrando",
      isPro: true,
      badge: "MADE TO ORDER",
      category: "Bottoms & Trousers",
      fabric: "Wool",
      price: 34000,
      originalPrice: 44000,
      image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1000&auto=format&fit=crop",
      sizes: ["30", "32", "34", "36"],
      gender: "men"
    },
    {
      id: "prod-9",
      title: "Oversized Silk-Cashmere Coat",
      designer: "Lucia Ferrando",
      isPro: true,
      badge: "LIMITED EDITION",
      category: "Jackets & Coats",
      fabric: "Pure Cashmere",
      price: 68000,
      originalPrice: 89000,
      image: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=1000&auto=format&fit=crop",
      sizes: ["Size M", "Size L"],
      gender: "men"
    },
    {
      id: "prod-10",
      title: "Double-Faced Wool Peacoat",
      designer: "Atelier Bellini",
      isPro: true,
      badge: "HANDCRAFTED",
      category: "Jackets & Coats",
      fabric: "Wool",
      price: 56000,
      originalPrice: 72000,
      image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=1000&auto=format&fit=crop",
      sizes: ["48 EU", "50 EU", "52 EU"],
      gender: "men"
    },
    {
      id: "prod-11",
      title: "Bespoke Velvet Dinner Jacket",
      designer: "Valentin Laurent",
      isPro: true,
      badge: "MADE TO ORDER",
      category: "Suits & Tailoring",
      fabric: "Velvet",
      price: 64000,
      originalPrice: 82000,
      image: "https://images.unsplash.com/photo-1555069519-127aadedf1ee?q=80&w=1000&auto=format&fit=crop",
      sizes: ["Size S", "Size M", "Size L"],
      gender: "men"
    },
    {
      id: "prod-12",
      title: "Archival Gabardine Coat",
      designer: "Aurelien Moreau",
      isPro: true,
      badge: "HANDCRAFTED",
      category: "Jackets & Coats",
      fabric: "Wool",
      price: 72000,
      originalPrice: 94000,
      image: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=1000&auto=format&fit=crop",
      sizes: ["Size M", "Size L"],
      gender: "men"
    }
  ], []);

  // Filtered pieces
  const filteredProducts = useMemo(() => {
    return catalogProducts.filter((item) => {
      if (selectedFabrics.length > 0 && !selectedFabrics.some((f) => item.fabric.toLowerCase().includes(f.toLowerCase()))) {
        return false;
      }
      return true;
    });
  }, [catalogProducts, selectedFabrics]);

  return (
    <div className="space-y-8 pb-20 max-w-[1520px] mx-auto">
      {/* Header & Breadcrumb Strip (Photo 2) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8D2B7] pb-5">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#8F8178] font-mono mb-1">
            HAUTE CURATED REPOSITORY • {activeGender.toUpperCase()}&apos;S SALON
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#231820]">
            {activeGender === "men" ? "Men's Clothing" : activeGender === "women" ? "Women's Couture" : "Kids' Archival"}
            <span className="text-sm font-sans font-normal text-[#8F8178] ml-3 tracking-normal">
              (1,248 PIECES)
            </span>
          </h1>
        </div>

        {/* Layout Toggle & Sort */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 p-1 bg-[#FAF7F2] rounded-xl border border-[#E8D2B7]">
            <button
              onClick={() => setCatalogLayout("grid")}
              className={`p-1.5 rounded-lg transition-colors ${
                catalogLayout === "grid"
                  ? "bg-[#3A0E1E] text-white shadow-2xs"
                  : "text-[#8F8178] hover:text-[#231820]"
              }`}
              title="Standard Grid"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCatalogLayout("dense")}
              className={`p-1.5 rounded-lg transition-colors ${
                catalogLayout === "dense"
                  ? "bg-[#3A0E1E] text-white shadow-2xs"
                  : "text-[#8F8178] hover:text-[#231820]"
              }`}
              title="Editorial 2-Column"
            >
              <Columns className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#6B5A52]">
            <span className="font-medium">SORT BY:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#E8D2B7] rounded-lg px-3 py-1.5 text-xs text-[#231820] font-medium focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="popular">POPULAR ▾</option>
              <option value="price-low">PRICE: LOW TO HIGH</option>
              <option value="price-high">PRICE: HIGH TO LOW</option>
              <option value="newest">LATEST ADDITIONS</option>
              <option value="archival">ARCHIVAL VINTAGE</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips Bar (Photo 2) */}
      <div className="flex flex-wrap items-center gap-2">
        {selectedCategories.map((cat) => (
          <span
            key={cat}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F4] border border-[#E8D2B7] text-[#542333] text-xs font-serif uppercase tracking-wider"
          >
            {cat}
            <button
              onClick={() => setSelectedCategories(selectedCategories.filter((c) => c !== cat))}
              className="hover:text-rose-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}

        {selectedFabrics.map((fab) => (
          <span
            key={fab}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F4] border border-[#E8D2B7] text-[#542333] text-xs font-serif uppercase tracking-wider"
          >
            {fab}
            <button
              onClick={() => setSelectedFabrics(selectedFabrics.filter((f) => f !== fab))}
              className="hover:text-rose-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}

        {selectedSizes.map((sz) => (
          <span
            key={sz}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F4] border border-[#E8D2B7] text-[#542333] text-xs font-serif uppercase tracking-wider"
          >
            {sz}
            <button
              onClick={() => setSelectedSizes(selectedSizes.filter((s) => s !== sz))}
              className="hover:text-rose-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}

        {(selectedCategories.length > 0 || selectedFabrics.length > 0 || selectedSizes.length > 0) && (
          <button
            onClick={clearAllFilters}
            className="text-[11px] font-mono text-[#8F8178] hover:text-[#542333] underline ml-2 uppercase tracking-wider"
          >
            CLEAR ALL
          </button>
        )}
      </div>

      {/* Main Catalog View: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filter Sidebar (3 Cols) (Photo 2) */}
        <aside className="lg:col-span-3 bg-white rounded-2xl border border-[#E8D2B7] p-5 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8D2B7]">
            <h3 className="font-serif text-base text-[#231820] font-semibold flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#C5A059]" />
              <span>Filters</span>
            </h3>
            <button
              onClick={clearAllFilters}
              className="text-[11px] text-[#8F8178] hover:text-[#542333] tracking-wider uppercase font-mono"
            >
              CLEAR ALL
            </button>
          </div>

          {/* Accordion: CATEGORY */}
          <div className="border-b border-[#E8D2B7]/60 pb-4">
            <button
              onClick={() => toggleSection("category")}
              className="w-full flex items-center justify-between text-xs font-serif uppercase tracking-wider font-semibold text-[#231820] py-1"
            >
              <span>Category</span>
              {openSections.category ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {openSections.category && (
              <div className="mt-2.5 space-y-1.5 text-xs text-[#6B5A52]">
                {[
                  "Jackets & Coats",
                  "Suits & Tailoring",
                  "Casual & Formal Shirts",
                  "Knitwear & Sweaters",
                  "Bottoms & Trousers",
                  "Denim",
                  "Leather Goods & Bags"
                ].map((cat) => (
                  <label key={cat} className="flex items-center gap-2.5 cursor-pointer hover:text-[#3A0E1E] transition-colors py-0.5">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => {
                        setSelectedCategories(
                          selectedCategories.includes(cat)
                            ? selectedCategories.filter((c) => c !== cat)
                            : [...selectedCategories, cat]
                        );
                      }}
                      className="rounded border-[#E8D2B7] text-[#3A0E1E] focus:ring-[#D4AF37]"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Accordion: PRICE */}
          <div className="border-b border-[#E8D2B7]/60 pb-4">
            <button
              onClick={() => toggleSection("price")}
              className="w-full flex items-center justify-between text-xs font-serif uppercase tracking-wider font-semibold text-[#231820] py-1"
            >
              <span>Price Range</span>
              {openSections.price ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {openSections.price && (
              <div className="mt-2.5 space-y-1.5 text-xs text-[#6B5A52]">
                {[
                  { id: "all", label: "All Prices" },
                  { id: "under-35k", label: "Under ₹35,000" },
                  { id: "35k-60k", label: "₹35,000 - ₹60,000" },
                  { id: "60k-85k", label: "₹60,000 - ₹85,000" },
                  { id: "85k-plus", label: "₹85,000+" }
                ].map((p) => (
                  <label key={p.id} className="flex items-center gap-2.5 cursor-pointer hover:text-[#3A0E1E] transition-colors py-0.5">
                    <input
                      type="radio"
                      name="price"
                      checked={priceRange === p.id}
                      onChange={() => setPriceRange(p.id)}
                      className="text-[#3A0E1E] focus:ring-[#D4AF37]"
                    />
                    <span>{p.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Accordion: SIZES */}
          <div className="border-b border-[#E8D2B7]/60 pb-4">
            <button
              onClick={() => toggleSection("size")}
              className="w-full flex items-center justify-between text-xs font-serif uppercase tracking-wider font-semibold text-[#231820] py-1"
            >
              <span>Sizes</span>
              {openSections.size ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {openSections.size && (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {["Size S", "Size M", "Size L", "Size XL", "46 EU", "48 EU", "50 EU", "52 EU"].map((sz) => {
                  const isSel = selectedSizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      onClick={() => {
                        setSelectedSizes(isSel ? selectedSizes.filter((s) => s !== sz) : [...selectedSizes, sz]);
                      }}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all ${
                        isSel
                          ? "bg-[#3A0E1E] text-white border-[#3A0E1E]"
                          : "bg-white text-[#6B5A52] border-[#E8D2B7] hover:border-[#D4AF37]"
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Accordion: OCCASION */}
          <div className="border-b border-[#E8D2B7]/60 pb-4">
            <button
              onClick={() => toggleSection("occasion")}
              className="w-full flex items-center justify-between text-xs font-serif uppercase tracking-wider font-semibold text-[#231820] py-1"
            >
              <span>Occasion</span>
              {openSections.occasion ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {openSections.occasion && (
              <div className="mt-2.5 space-y-1.5 text-xs text-[#6B5A52]">
                {["Black Tie Gala", "Archival Evening", "Heritage Wedding", "Business Sartorial", "Daywear"].map((occ) => (
                  <label key={occ} className="flex items-center gap-2.5 cursor-pointer hover:text-[#3A0E1E] py-0.5">
                    <input type="checkbox" className="rounded border-[#E8D2B7] text-[#3A0E1E]" />
                    <span>{occ}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Accordion: FABRIC */}
          <div className="border-b border-[#E8D2B7]/60 pb-4">
            <button
              onClick={() => toggleSection("fabric")}
              className="w-full flex items-center justify-between text-xs font-serif uppercase tracking-wider font-semibold text-[#231820] py-1"
            >
              <span>Fabric</span>
              {openSections.fabric ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {openSections.fabric && (
              <div className="mt-2.5 space-y-1.5 text-xs text-[#6B5A52]">
                {["Wool", "Pure Cashmere", "Mulberry Silk", "Alpaca", "Velvet", "Organic Cotton"].map((fab) => (
                  <label key={fab} className="flex items-center gap-2.5 cursor-pointer hover:text-[#3A0E1E] py-0.5">
                    <input
                      type="checkbox"
                      checked={selectedFabrics.includes(fab)}
                      onChange={() => {
                        setSelectedFabrics(
                          selectedFabrics.includes(fab)
                            ? selectedFabrics.filter((f) => f !== fab)
                            : [...selectedFabrics, fab]
                        );
                      }}
                      className="rounded border-[#E8D2B7] text-[#3A0E1E]"
                    />
                    <span>{fab}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Accordion: BRAND / ATELIER */}
          <div className="pb-2">
            <button
              onClick={() => toggleSection("brand")}
              className="w-full flex items-center justify-between text-xs font-serif uppercase tracking-wider font-semibold text-[#231820] py-1"
            >
              <span>Brand / Atelier</span>
              {openSections.brand ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {openSections.brand && (
              <div className="mt-2.5 space-y-1.5 text-xs text-[#6B5A52]">
                {["Valentin Laurent", "Atelier Bellini", "Elena Rostova", "Julian Vance", "Manuel Costello", "Aurelien Moreau"].map((des) => (
                  <label key={des} className="flex items-center gap-2.5 cursor-pointer hover:text-[#3A0E1E] py-0.5">
                    <input type="checkbox" className="rounded border-[#E8D2B7] text-[#3A0E1E]" />
                    <span>{des}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => showToast("Applied filters across archival repository")}
              className="w-full py-2.5 rounded-xl bg-[#3A0E1E] hover:bg-[#542333] text-[#F6DFC4] font-serif text-xs font-semibold uppercase tracking-wider shadow-md transition-all text-center"
            >
              Apply Filters
            </button>
            <button
              onClick={clearAllFilters}
              className="w-full py-2 text-center text-xs text-[#8F8178] hover:text-[#231820] transition-colors"
            >
              Clear All
            </button>
          </div>
        </aside>

        {/* Right 4-Column Product Grid (9 Cols) (Photo 2) */}
        <main className="lg:col-span-9 space-y-8">
          <div
            className={`grid gap-6 ${
              catalogLayout === "grid"
                ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2"
            }`}
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="group bg-white rounded-2xl border border-[#E8D2B7] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#D4AF37] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Photo with hover zoom */}
                  <div className="relative aspect-3/4 overflow-hidden bg-[#FAF7F2]">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover object-top group-hover:scale-106 transition-transform duration-700 ease-out"
                    />

                    {/* Wishlist Heart */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-[#542333] backdrop-blur-xs shadow-md transition-all hover:scale-110"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${wishlist[product.id] ? "fill-rose-600 text-rose-600" : ""}`}
                      />
                    </button>

                    {/* Badge */}
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2 py-0.5 rounded-sm bg-black/75 text-white/95 text-[9px] uppercase font-mono tracking-wider backdrop-blur-xs">
                        {product.badge}
                      </span>
                    </div>

                    {/* Quick Action Overlay on Hover */}
                    <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                      <button
                        onClick={() => setSelectedProductId("prod-1")} // triggers Photo 3 PDP
                        className="flex-1 py-1.5 px-2 rounded-lg bg-white/95 hover:bg-white text-[#231820] text-[10px] font-bold uppercase tracking-wider shadow-md backdrop-blur-xs text-center"
                      >
                        Quick View
                      </button>
                      <button
                        onClick={() => {
                          addToCart({
                            id: product.id,
                            title: product.title,
                            price: product.price,
                            image: product.image,
                            size: product.sizes[0],
                            color: "Midnight Charcoal"
                          });
                          confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
                        }}
                        className="p-1.5 rounded-lg bg-[#3A0E1E] text-[#F6DFC4] hover:bg-[#542333] shadow-md text-center"
                        title="Add to Atelier Bag"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Garment Information */}
                  <div className="p-4 space-y-2">
                    <h3
                      onClick={() => setSelectedProductId("prod-1")}
                      className="font-serif text-sm font-semibold text-[#231820] group-hover:text-[#542333] transition-colors leading-snug cursor-pointer line-clamp-2"
                    >
                      {product.title}
                    </h3>

                    {/* Designer Attribution */}
                    <div className="flex items-center gap-1.5 text-[11px] text-[#8F8178]">
                      <span>By: {product.designer}</span>
                      {product.isPro && (
                        <span className="px-1 py-0.2 rounded-xs bg-[#F6DFC4] text-[#3A0E1E] text-[9px] font-bold font-mono">
                          PRO
                        </span>
                      )}
                      <CheckCircle2 className="w-3 h-3 text-[#C5A059]" />
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#E8D2B7]/50">
                      <div>
                        <span className="font-serif text-base font-bold text-[#3A0E1E]">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] text-[#A49488] line-through ml-1.5">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Commission Action */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => onOpenCustomRequest(product as any)}
                    className="w-full py-1.5 rounded-lg bg-[#FFF0F4] hover:bg-[#FFE4EC] text-[#542333] text-[10px] font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 border border-[#E8D2B7]"
                  >
                    <Scissors className="w-3 h-3 text-[#D4AF37]" />
                    <span>Commission Bespoke</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Pagination (Photo 2) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#E8D2B7] text-xs text-[#8F8178]">
            <div>Showing 1-24 of 1,248 pieces</div>

            <div className="flex items-center gap-1">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg font-serif text-xs font-semibold transition-colors ${
                    currentPage === page
                      ? "bg-[#3A0E1E] text-white"
                      : "bg-white text-[#231820] border border-[#E8D2B7] hover:border-[#D4AF37]"
                  }`}
                >
                  {page}
                </button>
              ))}
              <span className="px-2">...</span>
              <button
                onClick={() => setCurrentPage(24)}
                className={`w-8 h-8 rounded-lg font-serif text-xs font-semibold transition-colors ${
                  currentPage === 24
                    ? "bg-[#3A0E1E] text-white"
                    : "bg-white text-[#231820] border border-[#E8D2B7] hover:border-[#D4AF37]"
                }`}
              >
                24
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

