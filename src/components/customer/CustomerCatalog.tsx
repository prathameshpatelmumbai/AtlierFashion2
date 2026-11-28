"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useStudio } from "@/context/StudioContext";
import { ListedProduct } from "@/types/studio";
import { CATALOG_PRODUCTS, CatalogProduct } from "@/data/catalogProducts";
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
import { AddToBagButton } from "./AddToBagButton";

interface CustomerCatalogProps {
  onOpenBuyNow: (product: ListedProduct) => void;
  onOpenCustomRequest: (product?: ListedProduct) => void;
}

export const SIGNATURE_COLLECTIONS_LIST = [
  "Limited Editions",
  "Handcrafted",
  "Inspired Arts",
  "Made to Order",
  "Unveiled",
  "Organic Collections"
] as const;

export type SignatureCollectionName = typeof SIGNATURE_COLLECTIONS_LIST[number];

export const GENDER_LOOP = [
  { key: "men" as const, label: "Men", fullLabel: "Men's Salon" },
  { key: "women" as const, label: "Women", fullLabel: "Women's Couture" },
  { key: "kids" as const, label: "Kids", fullLabel: "Kids' Archival" }
];

export const CustomerCatalog: React.FC<CustomerCatalogProps> = ({
  onOpenBuyNow,
  onOpenCustomRequest
}) => {
  const { 
    activeGender, 
    setActiveGender,
    activeCategoryFilter, 
    setActiveCategoryFilter,
    activeCollectionFilter,
    setActiveCollectionFilter,
    catalogLayout,
    setCatalogLayout,
    setSelectedProductId,
    addToCart,
    showToast
  } = useStudio();

  // Active filter state - completely deselected by default
  const [selectedCollections, setSelectedCollections] = useState<string[]>(
    activeCollectionFilter ? [activeCollectionFilter] : []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    activeCategoryFilter ? [activeCategoryFilter] : []
  );
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedOccasion, setSelectedOccasion] = useState<string[]>([]);
  const [selectedDesigners, setSelectedDesigners] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");

  // Accordion state - collection open if active, others collapsed
  const [openSections, setOpenSections] = useState({
    collection: !!activeCollectionFilter,
    category: false,
    price: false,
    size: false,
    occasion: false,
    fabric: false,
    brand: false
  });

  // Always scroll to top upon landing on the Catalog page
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  // Sync collection filter if navigated from signature collection card
  useEffect(() => {
    if (activeCollectionFilter) {
      setSelectedCollections([activeCollectionFilter]);
      setOpenSections((prev) => ({ ...prev, collection: true }));
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    } else {
      setSelectedCollections([]);
    }
  }, [activeCollectionFilter]);

  // Sync category filter if navigated with an active filter
  useEffect(() => {
    if (activeCategoryFilter) {
      setSelectedCategories([activeCategoryFilter]);
    } else {
      setSelectedCategories([]);
    }
  }, [activeCategoryFilter]);

  const handleGenderSwitch = (gender: "men" | "women" | "kids") => {
    setActiveGender(gender);
    setActiveCategoryFilter(null);
    setSelectedCategories([]);
    setSelectedFabrics([]);
    setSelectedSizes([]);
    setSelectedOccasion([]);
    setSelectedDesigners([]);
    setPriceRange("all");
    showToast(
      `Switched to ${
        gender === "men"
          ? "Men's Salon"
          : gender === "women"
          ? "Women's Couture"
          : "Kids' Archival"
      }`
    );
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  };

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
    setSelectedCollections([]);
    setActiveCollectionFilter(null);
    setSelectedCategories([]);
    setSelectedFabrics([]);
    setSelectedSizes([]);
    setSelectedOccasion([]);
    setSelectedDesigners([]);
    setPriceRange("all");
    setActiveCategoryFilter(null);
    showToast("Filters reset to all archival works");
  };

const normalizeCategory = (str: string) =>
  str.toLowerCase().replace(/[&,]/g, " ").replace(/\s+/g, " ").trim();

function matchesWord(text: string, term: string): boolean {
  if (!text || !term) return false;
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`, "i").test(text);
}

const CATEGORY_SYNONYMS: Record<string, string[]> = {
  // Men & Shared
  "t shirts": ["t-shirts", "t-shirt", "tshirts", "tshirt", "t shirts", "t shirt", "tee", "tees"],
  "sweatshirts": ["sweatshirts", "sweatshirt", "fleece sweatshirt"],
  "polo t shirts": ["polo t-shirts", "polo t-shirt", "polo", "polos", "polo shirt", "polo shirts", "polo t shirts"],
  "shirts": ["shirts", "shirt", "poplin", "linen shirt", "formal shirt", "business shirt", "blouse", "blouses"],
  "hoodies": ["hoodies", "hoodie", "fleece hoodie"],
  "jackets": ["jackets", "jacket", "bomber", "peacoat", "overcoat", "trench", "jackets coats", "outerwear"],
  "jackets coats": ["jackets", "jacket", "coat", "coats", "peacoat", "overcoat", "trench", "jackets coats"],
  "blazers": ["blazers", "blazer", "blazers suits", "suits tailoring", "dinner jacket"],
  "blazers suits": ["blazers suits", "blazers", "blazer", "suit", "suits", "suits tailoring"],
  "suits tailoring": ["suits tailoring", "blazers suits", "blazers", "blazer", "suit", "suits"],
  "kurtas": ["kurtas", "kurta", "kurtas tunics", "kurtas sets", "tunic kurta"],
  "kurtas sets": ["kurtas sets", "kurtas", "kurta", "kurtas tunics", "tunic kurta"],
  "kurtas tunics": ["kurtas tunics", "kurtas", "kurta", "kurtas sets", "tunic kurta"],
  "sherwanis": ["sherwanis", "sherwani", "royal sherwanis bandhgalas", "bandhgala", "bandhgalas", "achkan"],
  "royal sherwanis bandhgalas": ["royal sherwanis bandhgalas", "sherwanis", "sherwani", "bandhgala", "bandhgalas"],
  "jeans pants": ["jeans pants", "jeans", "pants", "trousers", "bottoms trousers", "trousers pants", "denim", "joggers", "chinos"],
  "bottoms trousers": ["bottoms trousers", "jeans pants", "trousers pants", "pants", "trousers", "jeans", "denim", "joggers", "chinos"],

  // Women
  "jackets blazers": ["jackets blazers", "blazers", "jackets", "blazer", "jacket", "crepe blazer"],
  "trousers pants": ["trousers pants", "jeans pants", "bottoms trousers", "pants", "trousers", "palazzo"],
  "knitwear sweaters": ["knitwear sweaters", "sweaters", "knitwear", "sweatshirts", "sweater", "cardigan"],
  "couture gowns": ["couture gowns", "couture & gowns", "gowns", "gown", "ballgown", "evening gown"],
  "couture & gowns": ["couture gowns", "couture & gowns", "gowns", "gown", "ballgown", "evening gown"],
  "pleated skirts": ["pleated skirts", "skirts", "skirt"],
  "t shirts tops": ["t shirts tops", "t-shirts", "t-shirt", "t shirts", "t shirt", "tee", "tees", "top", "tops"],
  "shirts blouses": ["shirts blouses", "shirts", "shirt", "blouse", "blouses"],
  "sarees drapes": ["sarees drapes", "sarees", "saree", "drapes", "drape", "sari"],
  "lehengas sets": ["lehengas sets", "lehengas", "lehenga", "bridal lehengas", "ghagra"]
};

function matchCategory(selectedCat: string, product: CatalogProduct): boolean {
  const normSelected = normalizeCategory(selectedCat);
  const prodCat = normalizeCategory(product.category || "");
  const prodSub = normalizeCategory(product.subcategory || "");
  const prodTitle = normalizeCategory(product.title || "");
  const prodTags = (product.tags || []).map((t) => normalizeCategory(t));

  // Direct exact match
  if (prodCat === normSelected || prodSub === normSelected) return true;

  // Check synonyms of selected category
  const synonyms = CATEGORY_SYNONYMS[normSelected] || [normSelected];
  for (const syn of synonyms) {
    const normSyn = normalizeCategory(syn);
    if (prodCat === normSyn || prodSub === normSyn) return true;
    if (prodTags.some((t) => t === normSyn || matchesWord(t, normSyn))) return true;
    if (matchesWord(prodTitle, normSyn)) return true;
  }

  // Reverse check: does prodCat synonyms match selected?
  const prodCatSynonyms = CATEGORY_SYNONYMS[prodCat] || [];
  for (const syn of prodCatSynonyms) {
    const normSyn = normalizeCategory(syn);
    if (normSyn === normSelected) return true;
  }

  return false;
}

  // Dynamic categories per department
  const availableCategories = useMemo(() => {
    if (activeGender === "women") {
      return [
        "Sarees & Drapes",
        "Lehengas & Sets",
        "Couture Gowns",
        "Kurtas & Tunics",
        "T-Shirts & Tops",
        "Shirts & Blouses",
        "Jackets & Blazers",
        "Trousers & Pants",
        "Pleated Skirts",
        "Knitwear & Sweaters"
      ];
    }
    if (activeGender === "kids") {
      return [
        "Kurtas & Sets",
        "Sherwanis",
        "Blazers & Suits",
        "Jackets",
        "Shirts",
        "T-Shirts",
        "Hoodies",
        "Sweatshirts",
        "Polo T-Shirts",
        "Jeans & Pants"
      ];
    }
    return [
      "T-Shirts",
      "Polo T-Shirts",
      "Shirts",
      "Sweatshirts",
      "Hoodies",
      "Jackets",
      "Blazers",
      "Kurtas",
      "Sherwanis",
      "Jeans & Pants"
    ];
  }, [activeGender]);

  // Dynamic sizes per department (Strict XS, S, M, L, XL, XXL)
  const availableSizes = useMemo(() => {
    if (activeGender === "kids") {
      return ["Age 2-3", "Age 4-5", "Age 6-7", "Age 8-9", "Age 10-11", "Age 12-14"];
    }
    return ["XS", "S", "M", "L", "XL", "XXL"];
  }, [activeGender]);

  // Dynamic designers per department
  const availableDesigners = useMemo(() => {
    if (activeGender === "women") {
      return [
        "Sabyasachi Heritage Guild",
        "Rohit Balaji Couture",
        "Adarsh Couture Privée",
        "Maison Mariana Voss",
        "Atelier Tarunima",
        "Atelier K. Soni"
      ];
    }
    if (activeGender === "kids") {
      return [
        "Maison Privée Junior",
        "Sabyasachi Heritage Kids",
        "Atelier Petit",
        "Prathamesh Atelier"
      ];
    }
    return [
      "Valentin Laurent",
      "Atelier Bellini",
      "Elena Rostova",
      "Julian Vance",
      "Manuel Costello",
      "Aurelien Moreau"
    ];
  }, [activeGender]);

  // Curated Archival Catalog Products for Men, Women & Kids (36 pieces total)
  const catalogProducts: CatalogProduct[] = CATALOG_PRODUCTS;

  // Filtered pieces based on active gender, categories, fabrics, sizes, designers, and price
  const filteredProducts = useMemo(() => {
    return catalogProducts
      .filter((item) => {
        // Department / Gender filter
        if (item.gender !== activeGender) {
          return false;
        }

        // Collections filter (Signature Collection Disciplines)
        if (selectedCollections.length > 0) {
          const itemCol = (item.collection || "").toLowerCase().trim();
          const matches = selectedCollections.some((sel) => {
            const s = sel.toLowerCase().trim();
            if (itemCol === s) return true;
            if ((s === "unveiled" || s === "upcycled") && (itemCol === "unveiled" || itemCol === "upcycled")) return true;
            return false;
          });
          if (!matches) {
            return false;
          }
        }

        // Category filter
        if (selectedCategories.length > 0) {
          const matchesCategory = selectedCategories.some((cat) => matchCategory(cat, item));
          if (!matchesCategory) {
            return false;
          }
        }

        // Fabric filter
        if (
          selectedFabrics.length > 0 &&
          !selectedFabrics.some((f) => item.fabric.toLowerCase().includes(f.toLowerCase()))
        ) {
          return false;
        }

        // Size filter
        if (
          selectedSizes.length > 0 &&
          !selectedSizes.some((s) => item.sizes.includes(s))
        ) {
          return false;
        }

        // Designer filter
        if (
          selectedDesigners.length > 0 &&
          !selectedDesigners.includes(item.designer)
        ) {
          return false;
        }

        // Price Range filter
        if (priceRange === "under-50k" && item.price >= 50000) return false;
        if (priceRange === "50k-75k" && (item.price < 50000 || item.price > 75000)) return false;
        if (priceRange === "75k-100k" && (item.price < 75000 || item.price > 100000)) return false;
        if (priceRange === "above-100k" && item.price <= 100000) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        return 0;
      });
  }, [
    catalogProducts,
    activeGender,
    selectedCollections,
    selectedCategories,
    selectedFabrics,
    selectedSizes,
    selectedDesigners,
    priceRange,
    sortBy
  ]);

  return (
    <div className="w-full">
      {/* Top Header & Breadcrumb Strip: Kept in Original Warm Off-White (#FAF7F2) */}
      <div className="w-full bg-[#FAF7F2] pt-6 sm:pt-8 pb-5 border-b border-[#E8D2B7]">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Breadcrumb Strip (Photo 2) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#8F8178] font-mono mb-1">
                HAUTE CURATED REPOSITORY • {activeGender.toUpperCase()}&apos;S SALON
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-0.5">
                <h1 className="font-serif text-3xl sm:text-4xl text-[#231820]">
                  {activeGender === "men"
                    ? "Men's Clothing"
                    : activeGender === "women"
                    ? "Women's Couture"
                    : "Kids' Archival"}
                  <span className="text-sm font-sans font-normal text-[#8F8178] ml-3 tracking-normal">
                    ({activeGender === "kids" ? "842" : activeGender === "women" ? "1,420" : "1,248"} PIECES)
                  </span>
                </h1>
              </div>
            </div>

            {/* Layout Toggle & Sort */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-[#E8D2B7]">
                <button
                  onClick={() => setCatalogLayout("grid")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
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
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
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
                  className="bg-white border border-[#E8D2B7] rounded-lg px-3 py-1.5 text-xs text-[#231820] font-medium focus:outline-none focus:border-[#D4AF37] cursor-pointer"
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
        </div>
      </div>

      {/* Starting from where the user cropped: Clean Pure White (#FFFFFF) */}
      <div className="w-full bg-white pt-6 pb-20">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Active Filter Chips Bar (Photo 2) */}
          {(selectedCollections.length > 0 ||
            selectedCategories.length > 0 ||
            selectedFabrics.length > 0 ||
            selectedSizes.length > 0 ||
            selectedDesigners.length > 0) && (
            <div className="flex flex-wrap items-center gap-2">
              {selectedCollections.map((col) => (
                <span
                  key={col}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3A0E1E] text-[#F6DFC4] border border-[#D4AF37]/60 text-xs font-serif uppercase tracking-wider shadow-xs"
                >
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span>{col}</span>
                  <button
                    onClick={() => {
                      const next = selectedCollections.filter((c) => c !== col);
                      setSelectedCollections(next);
                      if (next.length === 0) setActiveCollectionFilter(null);
                    }}
                    className="hover:text-rose-300 transition-colors cursor-pointer"
                    title="Remove filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {selectedCategories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F4] border border-[#E8D2B7] text-[#542333] text-xs font-serif uppercase tracking-wider"
                >
                  {cat}
                  <button
                    onClick={() => {
                      const updated = selectedCategories.filter((c) => c !== cat);
                      setSelectedCategories(updated);
                      if (updated.length === 0) {
                        setActiveCategoryFilter(null);
                      }
                    }}
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

              {selectedDesigners.map((des) => (
                <span
                  key={des}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F4] border border-[#E8D2B7] text-[#542333] text-xs font-serif uppercase tracking-wider"
                >
                  {des}
                  <button
                    onClick={() => setSelectedDesigners(selectedDesigners.filter((d) => d !== des))}
                    className="hover:text-rose-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              <button
                onClick={clearAllFilters}
                className="text-[11px] font-mono text-[#8F8178] hover:text-[#542333] underline ml-2 uppercase tracking-wider cursor-pointer"
              >
                CLEAR ALL
              </button>
            </div>
          )}

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
              className="text-[11px] text-[#8F8178] hover:text-[#542333] tracking-wider uppercase font-mono cursor-pointer"
            >
              CLEAR ALL
            </button>
          </div>

          {/* Department Quick Switcher in Sidebar */}
          <div className="pb-3 border-b border-[#E8D2B7]/60">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#8F8178] mb-2 flex items-center justify-between">
              <span>Department</span>
              <span className="text-[9px] text-[#C5A059] uppercase">Salon Mode</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {GENDER_LOOP.map((g) => {
                const isActive = g.key === activeGender;
                return (
                  <button
                    key={g.key}
                    type="button"
                    onClick={() => handleGenderSwitch(g.key)}
                    className={`py-1.5 px-1 rounded-lg text-xs font-serif text-center transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#3A0E1E] text-[#F6DFC4] font-semibold shadow-xs border border-[#3A0E1E]"
                        : "bg-[#FAF7F2] text-[#6B5A52] hover:bg-white hover:text-[#3A0E1E] border border-[#E8D2B7]"
                    }`}
                  >
                    {g.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accordion: COLLECTIONS (Signature Collection 6 Disciplines) */}
          <div className="border-b border-[#E8D2B7]/60 pb-4">
            <button
              onClick={() => toggleSection("collection")}
              className="w-full flex items-center justify-between text-xs font-serif uppercase tracking-wider font-semibold text-[#231820] py-1 cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <span>Collections</span>
                {selectedCollections.length > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                )}
              </span>
              {openSections.collection ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {openSections.collection && (
              <div className="mt-2.5 space-y-1.5 text-xs text-[#6B5A52]">
                {SIGNATURE_COLLECTIONS_LIST.map((col) => {
                  const isChecked = selectedCollections.includes(col);
                  return (
                    <label key={col} className="flex items-center gap-2.5 cursor-pointer hover:text-[#3A0E1E] transition-colors py-0.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          const updated = isChecked
                            ? selectedCollections.filter((c) => c !== col)
                            : [...selectedCollections, col];
                          setSelectedCollections(updated);
                          if (updated.length === 0) {
                            setActiveCollectionFilter(null);
                          } else {
                            setActiveCollectionFilter(updated[0]);
                          }
                        }}
                        className="rounded border-[#E8D2B7] text-[#3A0E1E] focus:ring-[#D4AF37]"
                      />
                      <span className={isChecked ? "font-semibold text-[#3A0E1E]" : ""}>
                        {col}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Accordion: CATEGORY */}
          <div className="border-b border-[#E8D2B7]/60 pb-4">
            <button
              onClick={() => toggleSection("category")}
              className="w-full flex items-center justify-between text-xs font-serif uppercase tracking-wider font-semibold text-[#231820] py-1 cursor-pointer"
            >
              <span>Category</span>
              {openSections.category ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {openSections.category && (
              <div className="mt-2.5 space-y-1.5 text-xs text-[#6B5A52]">
                {availableCategories.map((cat) => (
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

          {/* Accordion: PRICE RANGE */}
          <div className="border-b border-[#E8D2B7]/60 pb-4">
            <button
              onClick={() => toggleSection("price")}
              className="w-full flex items-center justify-between text-xs font-serif uppercase tracking-wider font-semibold text-[#231820] py-1 cursor-pointer"
            >
              <span>Price Range</span>
              {openSections.price ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {openSections.price && (
              <div className="mt-2.5 space-y-1.5 text-xs text-[#6B5A52]">
                {[
                  { id: "all", label: "All Prices" },
                  { id: "under-50k", label: "Under ₹50,000" },
                  { id: "50k-75k", label: "₹50,000 – ₹75,000" },
                  { id: "75k-100k", label: "₹75,000 – ₹1,00,000" },
                  { id: "above-100k", label: "₹1,00,000+" }
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
              className="w-full flex items-center justify-between text-xs font-serif uppercase tracking-wider font-semibold text-[#231820] py-1 cursor-pointer"
            >
              <span>Sizes</span>
              {openSections.size ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {openSections.size && (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {availableSizes.map((sz) => {
                  const isSel = selectedSizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => {
                        setSelectedSizes(isSel ? selectedSizes.filter((s) => s !== sz) : [...selectedSizes, sz]);
                      }}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all cursor-pointer ${
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
              className="w-full flex items-center justify-between text-xs font-serif uppercase tracking-wider font-semibold text-[#231820] py-1 cursor-pointer"
            >
              <span>Occasion</span>
              {openSections.occasion ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {openSections.occasion && (
              <div className="mt-2.5 space-y-1.5 text-xs text-[#6B5A52]">
                {["Black Tie Gala", "Archival Evening", "Heritage Wedding", "Business Sartorial", "Daywear"].map((occ) => (
                  <label key={occ} className="flex items-center gap-2.5 cursor-pointer hover:text-[#3A0E1E] py-0.5">
                    <input
                      type="checkbox"
                      checked={selectedOccasion.includes(occ)}
                      onChange={() => {
                        setSelectedOccasion(
                          selectedOccasion.includes(occ)
                            ? selectedOccasion.filter((o) => o !== occ)
                            : [...selectedOccasion, occ]
                        );
                      }}
                      className="rounded border-[#E8D2B7] text-[#3A0E1E]"
                    />
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
              className="w-full flex items-center justify-between text-xs font-serif uppercase tracking-wider font-semibold text-[#231820] py-1 cursor-pointer"
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
              className="w-full flex items-center justify-between text-xs font-serif uppercase tracking-wider font-semibold text-[#231820] py-1 cursor-pointer"
            >
              <span>Brand / Atelier</span>
              {openSections.brand ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            {openSections.brand && (
              <div className="mt-2.5 space-y-1.5 text-xs text-[#6B5A52]">
                {availableDesigners.map((des) => (
                  <label key={des} className="flex items-center gap-2.5 cursor-pointer hover:text-[#3A0E1E] py-0.5">
                    <input
                      type="checkbox"
                      checked={selectedDesigners.includes(des)}
                      onChange={() => {
                        setSelectedDesigners(
                          selectedDesigners.includes(des)
                            ? selectedDesigners.filter((d) => d !== des)
                            : [...selectedDesigners, des]
                        );
                      }}
                      className="rounded border-[#E8D2B7] text-[#3A0E1E]"
                    />
                    <span>{des}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => showToast(`Applied filters across ${activeGender === 'men' ? "Men's Salon" : activeGender === 'women' ? "Women's Couture" : "Kids' Archival"}`)}
              className="w-full py-2.5 rounded-xl bg-[#3A0E1E] hover:bg-[#542333] text-[#F6DFC4] font-serif text-xs font-semibold uppercase tracking-wider shadow-md transition-all text-center cursor-pointer"
            >
              Apply Filters
            </button>
            <button
              onClick={clearAllFilters}
              className="w-full py-2 text-center text-xs text-[#8F8178] hover:text-[#231820] transition-colors cursor-pointer"
            >
              Clear All
            </button>
          </div>
        </aside>

        {/* Right Product Grid (9 Cols) (Photo 2) */}
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
                className="group bg-white rounded-2xl border-[1.5px] border-[#C59347]/65 overflow-hidden shadow-xs hover:border-[#C59347] hover:shadow-[0_14px_28px_-6px_rgba(69,20,28,0.14)] transition-all duration-400 flex flex-col justify-between gold-lined-card"
              >
                <div>
                  {/* Photo with hover zoom */}
                  <div
                    onClick={() => setSelectedProductId(product.id)}
                    className="relative aspect-3/4 overflow-hidden bg-[#FAF7F2] cursor-pointer"
                  >
                    <img
                      src={product.images?.[0] || product.image}
                      alt={product.title}
                      className="w-full h-full object-cover object-top group-hover:scale-106 transition-transform duration-700 ease-out"
                    />

                    {/* Wishlist Heart */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-[#542333] backdrop-blur-xs shadow-md transition-all hover:scale-110 cursor-pointer"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${wishlist[product.id] ? "fill-rose-600 text-rose-600" : ""}`}
                      />
                    </button>

                    {/* Badge */}
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2 py-0.5 rounded-xs bg-[#3A0E1E]/90 text-[#F6DFC4] text-[9px] uppercase font-mono tracking-wider backdrop-blur-xs border border-[#D4AF37]/40 shadow-xs">
                        {product.collection || product.badge}
                      </span>
                    </div>

                    {/* Quick Action Overlay on Hover */}
                    <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                      <button
                        onClick={() => setSelectedProductId(product.id)}
                        className="flex-1 py-1.5 px-2 rounded-lg bg-white/95 hover:bg-white text-[#231820] text-[10px] font-bold uppercase tracking-wider shadow-md backdrop-blur-xs text-center cursor-pointer"
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
                        className="p-1.5 rounded-lg bg-[#3A0E1E] text-[#F6DFC4] hover:bg-[#542333] shadow-md text-center cursor-pointer"
                        title="Add to Atelier Bag"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Garment Information */}
                  <div className="p-4 space-y-2">
                    <h3
                      onClick={() => setSelectedProductId(product.id)}
                      className="font-serif text-sm font-semibold text-[#231820] group-hover:text-[#542333] transition-colors leading-snug cursor-pointer line-clamp-2"
                    >
                      {product.title}
                    </h3>

                    {/* Designer Attribution */}
                    <div className="flex items-center gap-1.5 text-[11px] text-[#8F8178]">
                      <span>By: {product.designer}</span>
                      {product.isPro ? (
                        <span
                          className="inline-flex items-center justify-center px-1.5 py-[1.5px] rounded-[3px] text-[7.5px] font-bold tracking-[0.14em] uppercase font-sans text-[#2B1403] border border-[#C99726]/60 shadow-[0_1px_2px_rgba(180,126,16,0.2)] shrink-0 select-none"
                          style={{
                            background:
                              "linear-gradient(135deg, #FDF0CD 0%, #E5B842 50%, #B88114 100%)",
                          }}
                          title="Pro Atelier Couturier"
                        >
                          PRO
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center shrink-0"
                          title="Verified Atelier Heritage Guild"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="w-3.5 h-3.5 drop-shadow-[0_1px_2px_rgba(29,155,240,0.28)]"
                            fill="none"
                          >
                            <path
                              d="M22.5 12.5c0-1.58-.8-2.95-2-3.77.54-1.51.16-3.28-.97-4.41s-2.9-1.51-4.41-.97C14.3 2.15 12.93 1.35 11.35 1.35s-2.95.8-3.77 2c-1.51-.54-3.28-.16-4.41.97s-1.51 2.9-.97 4.41c-1.2.82-2 2.19-2 3.77s.8 2.95 2 3.77c-.54 1.51-.16 3.28.97 4.41s2.9 1.51 4.41.97c.82 1.2 2.19 2 3.77 2s2.95-.8 3.77-2c1.51.54 3.28.16 4.41-.97s1.51-2.9.97-4.41c1.2-.82 2-2.19 2-3.77z"
                              fill="#1D9BF0"
                            />
                            <path
                              d="M10.2 16.2l-3.6-3.6 1.4-1.4 2.2 2.2 5.6-5.6 1.4 1.4-7 7z"
                              fill="#FFFFFF"
                            />
                          </svg>
                        </span>
                      )}
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

                {/* Footer Add to Cart Action */}
                <div className="p-4 pt-0">
                  <AddToBagButton product={product} variant="catalog-footer" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Pagination (Photo 2) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#E8D2B7] text-xs text-[#8F8178]">
            <div>
              Showing 1-{filteredProducts.length} of{" "}
              {activeGender === "kids" ? "842" : activeGender === "women" ? "1,420" : "1,248"} pieces
            </div>

            <div className="flex items-center gap-1">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg font-serif text-xs font-semibold transition-colors cursor-pointer ${
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
                className={`w-8 h-8 rounded-lg font-serif text-xs font-semibold transition-colors cursor-pointer ${
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
  </div>
</div>
  );
};
