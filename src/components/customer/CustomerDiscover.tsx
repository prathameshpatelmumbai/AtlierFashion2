"use client";

import React, { useState, useEffect } from "react";
import { useStudio } from "@/context/StudioContext";
import { ListedProduct } from "@/types/studio";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, ArrowRight, Sparkles, Check, X, Star, Mail, Globe, MapPin } from "lucide-react";

interface CustomerDiscoverProps {
  onOpenBuyNow: (product: ListedProduct) => void;
  onOpenCustomRequest: (product?: ListedProduct) => void;
}

// Delicate Golden Botanical Line Art Component for luxury ornamentation
const GoldBotanicalBranch: React.FC<{ className?: string; flipped?: boolean }> = ({ className = "", flipped = false }) => (
  <svg
    viewBox="0 0 200 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${flipped ? "scale-x-[-1]" : ""}`}
    style={{ stroke: "#C8A463", strokeWidth: 1.2, strokeLinecap: "round", strokeLinejoin: "round" }}
  >
    <path d="M100 390 C90 320, 110 240, 85 160 C70 110, 95 60, 120 10" strokeOpacity="0.45" />
    <path d="M85 160 C50 145, 30 110, 35 70 C40 60, 60 70, 75 95 C82 108, 85 135, 85 160 Z" strokeOpacity="0.4" fill="#C8A463" fillOpacity="0.04" />
    <path d="M92 230 C130 215, 160 185, 165 140 C160 130, 140 140, 120 165 C110 180, 100 205, 92 230 Z" strokeOpacity="0.4" fill="#C8A463" fillOpacity="0.04" />
    <path d="M88 290 C45 285, 20 250, 15 210 C25 200, 45 210, 65 235 C75 250, 82 270, 88 290 Z" strokeOpacity="0.35" fill="#C8A463" fillOpacity="0.03" />
    <circle cx="120" cy="10" r="3" fill="#C8A463" fillOpacity="0.6" />
    <circle cx="35" cy="70" r="2.5" fill="#C8A463" fillOpacity="0.5" />
    <circle cx="165" cy="140" r="2.5" fill="#C8A463" fillOpacity="0.5" />
  </svg>
);

export const CustomerDiscover: React.FC<CustomerDiscoverProps> = ({
  onOpenBuyNow,
  onOpenCustomRequest
}) => {
  const { 
    setCustomerSection,
    showToast,
    addToCart,
    setActiveGender,
    setActiveCategoryFilter,
    setSelectedProductId
  } = useStudio();

  // Loading animation state for luxury initial reveal
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  // Sub-Navigation & Popout State
  const [activeGenderTab, setActiveGenderTab] = useState<"Men" | "Women" | "Kids" | null>(null);
  const [isCategoryPopoutOpen, setIsCategoryPopoutOpen] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState<"grid" | "list">("grid");

  // Interactive Wishlist State
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  // Lookbook Modal State
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);

  // Features Drawer State
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

  useEffect(() => {
    // Elegant luxury entrance transition
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 400);

    const preloaderTimer = setTimeout(() => {
      setShowPreloader(false);
    }, 950);

    return () => {
      clearTimeout(timer);
      clearTimeout(preloaderTimer);
    };
  }, []);

  const toggleWishlist = (id: string, name: string) => {
    setWishlist(prev => {
      const next = !prev[id];
      if (next) {
        showToast(`Saved "${name}" to your Atelier Wishlist Vault`);
      } else {
        showToast(`Removed "${name}" from Wishlist`);
      }
      return { ...prev, [id]: next };
    });
  };

  const handleGenderTabClick = (tab: "Men" | "Women" | "Kids") => {
    if (activeGenderTab === tab && isCategoryPopoutOpen) {
      setIsCategoryPopoutOpen(false);
      setActiveGenderTab(null);
    } else {
      setActiveGenderTab(tab);
      setActiveGender(tab.toLowerCase() as "men" | "women" | "kids");
      setIsCategoryPopoutOpen(true);
    }
  };

  const handleQuickAdd = (title: string, price: number, image: string) => {
    addToCart({
      id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title,
      price,
      image,
      size: "Custom Bespoke Sizing",
      color: "Salon Standard",
      quantity: 1
    });
    showToast(`Added "${title}" to your Atelier Bag`);
  };

  // 12 Clean Categories for popout drawer
  const categoryTiles = [
    { name: "Outerwear & Overcoats", image: "/images/categories/outerwear-overcoats.png" },
    { name: "T-Shirts", image: "/images/categories/t-shirts.png" },
    { name: "Sweat & Hoodies", image: "/images/categories/sweat-hoodies.png" },
    { name: "Suits & Tailoring", image: "/images/categories/suits-tailoring.png" },
    { name: "Casual & Formal Shirts", image: "/images/categories/casual-formal-shirts.png" },
    { name: "Knitwear & Sweaters", image: "/images/categories/knitwear-sweaters.png" },
    { name: "Bottoms & Trousers", image: "/images/categories/bottoms-trousers.png" },
    { name: "Denim", image: "/images/categories/denim.png" },
    { name: "Activewear", image: "/images/categories/activewear.png" },
    { name: "Footwear", image: "/images/categories/footwear.png" },
    { name: "Leather Goods & Bags", image: "/images/categories/leather-goods-bags.png" },
    { name: "Fragrance", image: "/images/categories/fragrance.png" }
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#FAF4ED] text-[#24151B] overflow-x-hidden selection:bg-[#C8A463]/30">
      
      {/* 0. PRELOADER & LUXURY LOADING CURTAIN */}
      <AnimatePresence>
        {showPreloader && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#38151D] flex flex-col items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center px-6"
            >
              <span className="text-[10px] tracking-[0.4em] text-[#C8A463] uppercase font-serif mb-2">
                ATELIER MAISON PRIVÉE
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#F8E8D9] tracking-[0.15em] uppercase font-light">
                The Archival Vault
              </h2>
              <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-[#C8A463] to-transparent my-4 relative overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-[#FFF] opacity-80"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                />
              </div>
              <span className="text-[11px] tracking-[0.25em] text-[#F8E8D9]/70 uppercase font-serif">
                AUTUMN / WINTER ’25
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. SCULPTURAL SILK RIBBON BORDERS & BOTANICAL VINES (Left & Right Flanks) */}
      <div className="fixed inset-y-0 left-0 w-8 sm:w-16 lg:w-28 pointer-events-none z-10 overflow-hidden opacity-90 hidden sm:block">
        <motion.img 
          src="/images/mockup/silk_left.png" 
          alt="Silk Ribbon Drape"
          className="w-full h-full object-cover object-left opacity-95"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <GoldBotanicalBranch className="absolute top-1/4 left-1 w-20 lg:w-24 pointer-events-none opacity-80" />
        <GoldBotanicalBranch className="absolute top-2/3 left-1 w-20 lg:w-24 pointer-events-none opacity-70" />
      </div>

      <div className="fixed inset-y-0 right-0 w-8 sm:w-16 lg:w-28 pointer-events-none z-10 overflow-hidden opacity-90 hidden sm:block">
        <motion.img 
          src="/images/mockup/silk_right.png" 
          alt="Silk Ribbon Drape"
          className="w-full h-full object-cover object-right opacity-95"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <GoldBotanicalBranch className="absolute top-1/5 right-1 w-20 lg:w-24 pointer-events-none opacity-80" flipped />
        <GoldBotanicalBranch className="absolute top-3/5 right-1 w-20 lg:w-24 pointer-events-none opacity-70" flipped />
      </div>

      {/* 2. SUB-HEADER BAR: MEN | WOMEN | KIDS + FEATURES (Cream Bar from Mockup) */}
      <section className="relative z-30 w-full bg-[#FAF4ED] border-b border-[#E8DDCE] shadow-[0_1px_4px_rgba(40,20,25,0.04)]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-2.5 flex items-center justify-between">
          {/* Gender Buttons */}
          <div className="flex items-center gap-6 sm:gap-10">
            {(["Men", "Women", "Kids"] as const).map((tab) => {
              const isSelected = activeGenderTab === tab && isCategoryPopoutOpen;
              return (
                <button
                  key={tab}
                  onClick={() => handleGenderTabClick(tab)}
                  className={`group relative py-1 text-[11px] sm:text-[12px] uppercase tracking-[0.22em] font-serif transition-colors cursor-pointer ${
                    isSelected ? "text-[#38151D] font-bold" : "text-[#5A3842] hover:text-[#38151D]"
                  }`}
                  type="button"
                >
                  <span>{tab}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#38151D] transition-all duration-300 ${
                      isSelected ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: + FEATURES and View Layout Toggle */}
          <div className="flex items-center gap-4">
            {/* View Layout Toggle (Active when Men, Women or Kids is selected) */}
            {isCategoryPopoutOpen && activeGenderTab && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                className="flex items-center gap-2"
              >
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#8C6D76] font-serif hidden sm:inline">
                  VIEW LAYOUT:
                </span>
                <div className="flex items-center gap-0.5 border border-[#D5C2B4] rounded-sm p-0.5 bg-white">
                  <button
                    type="button"
                    onClick={() => setSelectedLayout("grid")}
                    title="Grid Layout"
                    className={`p-1 rounded-xs transition-all cursor-pointer ${
                      selectedLayout === "grid"
                        ? "bg-[#38151D] text-white shadow-xs"
                        : "text-[#8C6D76] hover:text-[#38151D]"
                    }`}
                  >
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm9-9h7v7h-7V4zm0 9h7v7h-7v-7z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedLayout("list")}
                    title="List Layout"
                    className={`p-1 rounded-xs transition-all cursor-pointer ${
                      selectedLayout === "list"
                        ? "bg-[#38151D] text-white shadow-xs"
                        : "text-[#8C6D76] hover:text-[#38151D]"
                    }`}
                  >
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M4 5h16v6H4V5zm0 8h16v6H4v-6z" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}

            {/* + FEATURES Button */}
            <button
              onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
              className="text-[11px] sm:text-[12px] uppercase tracking-[0.22em] text-[#5A3842] hover:text-[#38151D] font-serif transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>+ FEATURES</span>
            </button>
          </div>
        </div>

        {/* Popout Category Drawer (matching previous approved layout) */}
        <AnimatePresence>
          {isCategoryPopoutOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-white border-t border-[#E8DDCE] shadow-xl overflow-hidden"
            >
              <div className="max-w-[1240px] mx-auto px-4 sm:px-8 py-6">
                <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#E8DDCE]">
                  <span className="font-serif text-[12px] tracking-[0.2em] uppercase text-[#38151D] font-medium">
                    {activeGenderTab ? `${activeGenderTab}’s Salon Collections` : "Salon Collections"}
                  </span>
                  <button
                    onClick={() => {
                      setIsCategoryPopoutOpen(false);
                      setActiveGenderTab(null);
                    }}
                    className="text-[11px] uppercase tracking-[0.2em] text-[#8C6D76] hover:text-[#38151D] transition-colors flex items-center gap-1 cursor-pointer font-serif"
                  >
                    <span>CLOSE</span>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {selectedLayout === "grid" ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
                    {categoryTiles.map((cat, idx) => (
                      <motion.button
                        key={cat.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.02, duration: 0.25 }}
                        onClick={() => {
                          setActiveCategoryFilter(cat.name);
                          if (activeGenderTab) {
                            setActiveGender(activeGenderTab.toLowerCase() as any);
                          }
                          setCustomerSection("catalog");
                          showToast(`Exploring ${activeGenderTab || "Atelier"}'s ${cat.name}`);
                        }}
                        className="group flex flex-col items-center text-center focus:outline-none cursor-pointer"
                      >
                        <div className="w-full aspect-[4/3] overflow-hidden bg-white flex items-center justify-center p-1 mb-2 transition-all duration-300">
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                          />
                        </div>
                        <span className="font-serif text-[12px] sm:text-[13px] text-[#38151D] group-hover:text-[#C8A463] transition-colors leading-snug">
                          {cat.name}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {categoryTiles.map((cat, idx) => (
                      <motion.button
                        key={cat.name}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.02, duration: 0.2 }}
                        onClick={() => {
                          setActiveCategoryFilter(cat.name);
                          if (activeGenderTab) {
                            setActiveGender(activeGenderTab.toLowerCase() as any);
                          }
                          setCustomerSection("catalog");
                          showToast(`Exploring ${activeGenderTab || "Atelier"}'s ${cat.name}`);
                        }}
                        className="group flex items-center justify-between p-3 bg-[#FAF7F2] border border-[#E8DDCE] hover:border-[#C8A463] transition-all duration-300 text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-12 h-12 shrink-0 bg-white p-1">
                            <img src={cat.image} alt={cat.name} className="w-full h-full object-contain" />
                          </div>
                          <span className="font-serif text-[13px] text-[#38151D] group-hover:text-[#C8A463] transition-colors truncate">
                            {cat.name}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#8C6D76] group-hover:text-[#38151D] group-hover:translate-x-1 transition-all shrink-0" />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features Drawer Modal */}
        <AnimatePresence>
          {isFeaturesOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full bg-[#38151D] text-[#F8E8D9] border-t border-[#C8A463]/30 px-6 py-8"
            >
              <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-[#C8A463]/25 p-5 bg-white/5">
                  <span className="text-[10px] tracking-[0.25em] text-[#C8A463] uppercase font-serif">FEATURE 01</span>
                  <h4 className="font-serif text-lg text-white mt-1 mb-2">AI Wardrobe Concierge</h4>
                  <p className="text-xs text-[#F8E8D9]/70 mb-4">Interactive digital draping engine generating bespoke silhouettes in seconds.</p>
                  <button 
                    onClick={() => {
                      setIsFeaturesOpen(false);
                      setCustomerSection("uvibe");
                    }} 
                    className="text-[11px] tracking-[0.2em] uppercase text-[#C8A463] hover:underline flex items-center gap-1"
                  >
                    Launch Stylist <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="border border-[#C8A463]/25 p-5 bg-white/5">
                  <span className="text-[10px] tracking-[0.25em] text-[#C8A463] uppercase font-serif">FEATURE 02</span>
                  <h4 className="font-serif text-lg text-white mt-1 mb-2">Artisan Escrow Vault</h4>
                  <p className="text-xs text-[#F8E8D9]/70 mb-4">Patron funds held safely until physical fitting inspection and provenance verification.</p>
                  <button 
                    onClick={() => {
                      setIsFeaturesOpen(false);
                      setCustomerSection("custom-orders");
                    }} 
                    className="text-[11px] tracking-[0.2em] uppercase text-[#C8A463] hover:underline flex items-center gap-1"
                  >
                    View Commissions <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="border border-[#C8A463]/25 p-5 bg-white/5">
                  <span className="text-[10px] tracking-[0.25em] text-[#C8A463] uppercase font-serif">FEATURE 03</span>
                  <h4 className="font-serif text-lg text-white mt-1 mb-2">Bespoke Fitting Video Call</h4>
                  <p className="text-xs text-[#F8E8D9]/70 mb-4">Direct private consultation with senior couturiers in Paris, Mumbai, and Milan.</p>
                  <button 
                    onClick={() => {
                      setIsFeaturesOpen(false);
                      onOpenCustomRequest();
                    }} 
                    className="text-[11px] tracking-[0.2em] uppercase text-[#C8A463] hover:underline flex items-center gap-1"
                  >
                    Book Private Session <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 3. MAIN HERO SECTION (The Archival Autumn/Winter '25 Collection) */}
      <section className="relative z-20 w-full overflow-hidden bg-[#38151D] text-[#F8E8D9] pt-8 pb-12 sm:pb-16 lg:pb-20">
        {/* Subtle radial glow and gold line art in background */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#C8A463] via-transparent to-transparent pointer-events-none" />
        <GoldBotanicalBranch className="absolute top-4 right-12 w-48 lg:w-64 pointer-events-none opacity-45 hidden md:block" />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-4"
            >
              {/* Archival Vault Release Tag */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-[1px] bg-[#C8A463]/70" />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#C8A463] font-serif font-medium">
                  ARCHIVAL VAULT RELEASE
                </span>
                <span className="w-6 h-[1px] bg-[#C8A463]/70" />
              </div>

              {/* Display Headline */}
              <h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-serif font-normal leading-[1.12] text-[#F8E8D9] tracking-[0.02em] mb-5"
                style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
              >
                The Archival<br />
                Autumn/Winter ’25<br />
                Collection
              </h1>

              {/* Paragraph Description */}
              <p className="text-xs sm:text-sm text-[#F8E8D9]/75 font-serif leading-relaxed max-w-xl mb-8">
                Sculpted in silk & charmeuse, structured capes, and artisanal craftsmanship by master artisans. Limited edition bespoke tailoring crafted on commission.
              </p>

              {/* Action Buttons: EXPLORE COLLECTION & VIEW LOOKBOOK */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => {
                    document.getElementById("signature-collections")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-5 sm:px-7 py-2.5 sm:py-3 bg-transparent hover:bg-[#C8A463]/15 text-[#F8E8D9] border border-[#C8A463]/60 rounded-xs text-[10px] sm:text-[11px] font-serif uppercase tracking-[0.25em] transition-all duration-300 cursor-pointer shadow-xs"
                >
                  EXPLORE COLLECTION
                </button>

                <button
                  onClick={() => setIsLookbookOpen(true)}
                  className="px-5 sm:px-7 py-2.5 sm:py-3 bg-[#FAF4ED] hover:bg-white text-[#38151D] rounded-xs text-[10px] sm:text-[11px] font-serif uppercase tracking-[0.25em] font-medium transition-all duration-300 cursor-pointer shadow-md"
                >
                  VIEW LOOKBOOK
                </button>
              </div>
            </motion.div>

            {/* Right Hero Model Portal Column (Circular Arch with Model from Mockup) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex justify-center lg:justify-end relative"
            >
              <div className="relative w-64 sm:w-80 md:w-96 aspect-[3/4]">
                {/* Background ornamental gold ring */}
                <div className="absolute -inset-2.5 rounded-t-full rounded-b-3xl border border-[#C8A463]/30 pointer-events-none" />
                <div className="absolute -inset-5 rounded-t-full rounded-b-3xl border border-[#C8A463]/15 pointer-events-none hidden sm:block" />
                
                {/* Arched image container */}
                <div className="w-full h-full rounded-t-full rounded-b-2xl overflow-hidden shadow-2xl border border-[#C8A463]/40 bg-[#2D0F16]">
                  <img
                    src="/images/mockup/hero_model.jpg"
                    alt="The Archival Autumn/Winter '25 Collection"
                    className="w-full h-full object-cover object-top hover:scale-104 transition-transform duration-700"
                  />
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Sculptural transition ribbon below hero */}
        <div className="w-full mt-8 sm:mt-12 overflow-hidden h-6 sm:h-10 opacity-70">
          <img 
            src="/images/mockup/silk_top_wave.jpg" 
            alt="Silk Ribbon Wave" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 4. SIGNATURE COLLECTIONS (Curated Disciplines from India & Paris Ateliers) */}
      <section id="signature-collections" className="relative z-20 max-w-[1240px] mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#6B2A38] font-serif font-medium">
              CURATED DISCIPLINES FROM INDIA & PARIS ATELIERS
            </span>
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#2B141B] mt-1"
              style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
            >
              Signature Collections
            </h2>
          </div>
          <p className="text-xs sm:text-[13px] text-[#6E555C] font-serif max-w-md leading-relaxed">
            Six pillars of sartorial excellence, each piece accompanied by a physical certificate of lineage, attesting to its serial exclusivity.
          </p>
        </div>

        {/* 3 Signature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1: NUMBERED SILHOUETTES */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="group flex flex-col bg-white border border-[#E8DDCE] shadow-xs hover:shadow-xl transition-all duration-300"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#F2EAE0]">
              <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-white/90 backdrop-blur-xs text-[9px] uppercase tracking-[0.2em] text-[#38151D] font-serif border border-[#D5C2B4]">
                NO. 03 / 05 VAULT
              </span>
              <img
                src="/images/mockup/sig_numbered.jpg"
                alt="Numbered Silhouettes"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
              />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#8C6D76] font-serif mb-1">
                NUMBERED SILHOUETTES
              </span>
              <h3 className="text-lg font-serif text-[#2B141B] mb-2 font-medium">
                Limited Edition
              </h3>
              <p className="text-xs text-[#6E555C] font-serif leading-relaxed mb-4 flex-1">
                Numbered archival garments crafted from rare vintage textiles, accompanied by sealed certificate of provenance.
              </p>
              <button
                onClick={() => {
                  setActiveCategoryFilter("Suits & Tailoring");
                  setCustomerSection("catalog");
                }}
                className="text-[10px] uppercase tracking-[0.22em] text-[#38151D] group-hover:text-[#C8A463] font-serif font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: ZARDOZI, DABKA & CHIKANKARI */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="group flex flex-col bg-white border border-[#E8DDCE] shadow-xs hover:shadow-xl transition-all duration-300"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#F2EAE0]">
              <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-white/90 backdrop-blur-xs text-[9px] uppercase tracking-[0.2em] text-[#38151D] font-serif border border-[#D5C2B4]">
                MASTER ARTISANS
              </span>
              <img
                src="/images/mockup/sig_zardozi.jpg"
                alt="Zardozi, Dabka & Chikankari"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
              />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#8C6D76] font-serif mb-1">
                ZARDOZI, DABKA & CHIKANKARI
              </span>
              <h3 className="text-lg font-serif text-[#2B141B] mb-2 font-medium">
                Handcrafted
              </h3>
              <p className="text-xs text-[#6E555C] font-serif leading-relaxed mb-4 flex-1">
                Over 350 hours of handspun silhouettes by generations of embroidery masters at Lucknow & Paris.
              </p>
              <button
                onClick={() => {
                  setActiveCategoryFilter("Outerwear & Overcoats");
                  setCustomerSection("catalog");
                }}
                className="text-[10px] uppercase tracking-[0.22em] text-[#38151D] group-hover:text-[#C8A463] font-serif font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Card 3: GEOMETRIC DRAPING */}
          <motion.div 
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="group flex flex-col bg-white border border-[#E8DDCE] shadow-xs hover:shadow-xl transition-all duration-300"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#F2EAE0]">
              <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-white/90 backdrop-blur-xs text-[9px] uppercase tracking-[0.2em] text-[#38151D] font-serif border border-[#D5C2B4]">
                GEOMETRIC DRAPING
              </span>
              <img
                src="/images/mockup/sig_geometric.jpg"
                alt="Architectural Motif"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
              />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#8C6D76] font-serif mb-1">
                ARCHITECTURAL MOTIF
              </span>
              <h3 className="text-lg font-serif text-[#2B141B] mb-2 font-medium">
                Inspired Arts
              </h3>
              <p className="text-xs text-[#6E555C] font-serif leading-relaxed mb-4 flex-1">
                Fluid silhouettes inspired by Indian temple geometry and French modernism, rendered in pure silk gazar.
              </p>
              <button
                onClick={() => {
                  setActiveCategoryFilter("Knitwear & Sweaters");
                  setCustomerSection("catalog");
                }}
                className="text-[10px] uppercase tracking-[0.22em] text-[#38151D] group-hover:text-[#C8A463] font-serif font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 5. SHOP BY CATEGORY DIVIDER */}
      <div className="relative z-20 max-w-[1240px] mx-auto px-4 sm:px-8 my-6 flex items-center justify-center">
        <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C8A463]/40 to-transparent" />
        <span 
          onClick={() => setIsCategoryPopoutOpen(true)}
          className="px-4 text-[11px] sm:text-[12px] uppercase tracking-[0.3em] text-[#6B2A38] font-serif font-medium cursor-pointer hover:text-[#38151D]"
        >
          — SHOP BY CATEGORY —
        </span>
        <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C8A463]/40 to-transparent" />
      </div>

      {/* 6. NEW ARRIVALS • FRESH FROM THE ATELIERS */}
      <section className="relative z-20 max-w-[1240px] mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 
            className="text-xl sm:text-2xl md:text-3xl font-serif text-[#2B141B]"
            style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
          >
            New Arrivals • Fresh from the ateliers
          </h2>
          <button
            onClick={() => setCustomerSection("catalog")}
            className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#6B2A38] hover:text-[#38151D] font-serif flex items-center gap-1 transition-colors"
          >
            <span>VIEW ALL COLLECTIONS</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* 4 New Arrival Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Arrival 1 */}
          <div className="group flex flex-col bg-white border border-[#E8DDCE] shadow-2xs hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F2EAE0]">
              <span className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-white/90 text-[8px] uppercase tracking-wider text-[#38151D] font-serif border border-[#D5C2B4]">
                PREVIEW COLLECTION
              </span>
              <button
                onClick={() => toggleWishlist("arr-1", "Archival Ensemble")}
                className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-[#38151D] hover:text-[#C8A463] shadow-xs cursor-pointer"
              >
                <Heart className={`w-3.5 h-3.5 ${wishlist["arr-1"] ? "fill-[#38151D] text-[#38151D]" : ""}`} />
              </button>
              <img
                src="/images/mockup/arrival_1.jpg"
                alt="Archival Ensemble"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
              />
            </div>
            <div className="p-3 sm:p-4 flex flex-col flex-1">
              <h4 className="font-serif text-[13px] sm:text-sm text-[#2B141B] font-medium truncate">
                Archival Ensemble
              </h4>
              <p className="text-[11px] text-[#8C6D76] font-serif truncate mb-2">
                Embroidered Wool Coat
              </p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-serif text-[13px] sm:text-sm font-semibold text-[#2B141B]">₹45,000</span>
                <span className="text-[11px] text-[#A8989C] line-through font-serif">₹65,000</span>
              </div>
              <button
                onClick={() => handleQuickAdd("Archival Ensemble", 45000, "/images/mockup/arrival_1.jpg")}
                className="w-full py-2 bg-[#FAF4ED] group-hover:bg-[#38151D] text-[#38151D] group-hover:text-white border border-[#E8DDCE] group-hover:border-[#38151D] rounded-xs text-[9px] sm:text-[10px] font-serif uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>ADD TO CART</span>
              </button>
            </div>
          </div>

          {/* Arrival 2 */}
          <div className="group flex flex-col bg-white border border-[#E8DDCE] shadow-2xs hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F2EAE0]">
              <span className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-white/90 text-[8px] uppercase tracking-wider text-[#38151D] font-serif border border-[#D5C2B4]">
                BESPOKE MASTERPIECE
              </span>
              <button
                onClick={() => toggleWishlist("arr-2", "Silk Lehenga with Dupatta")}
                className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-[#38151D] hover:text-[#C8A463] shadow-xs cursor-pointer"
              >
                <Heart className={`w-3.5 h-3.5 ${wishlist["arr-2"] ? "fill-[#38151D] text-[#38151D]" : ""}`} />
              </button>
              <img
                src="/images/mockup/arrival_2.jpg"
                alt="Silk Lehenga with Dupatta"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
              />
            </div>
            <div className="p-3 sm:p-4 flex flex-col flex-1">
              <h4 className="font-serif text-[13px] sm:text-sm text-[#2B141B] font-medium truncate">
                Silk Lehenga with Dupatta
              </h4>
              <p className="text-[11px] text-[#8C6D76] font-serif truncate mb-2">
                Chanderi Tissue Anarkali
              </p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-serif text-[13px] sm:text-sm font-semibold text-[#2B141B]">₹1,12,000</span>
                <span className="text-[11px] text-[#A8989C] line-through font-serif">₹1,40,000</span>
              </div>
              <button
                onClick={() => handleQuickAdd("Silk Lehenga with Dupatta", 112000, "/images/mockup/arrival_2.jpg")}
                className="w-full py-2 bg-[#FAF4ED] group-hover:bg-[#38151D] text-[#38151D] group-hover:text-white border border-[#E8DDCE] group-hover:border-[#38151D] rounded-xs text-[9px] sm:text-[10px] font-serif uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>ADD TO CART</span>
              </button>
            </div>
          </div>

          {/* Arrival 3 */}
          <div className="group flex flex-col bg-white border border-[#E8DDCE] shadow-2xs hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F2EAE0]">
              <button
                onClick={() => toggleWishlist("arr-3", "Embroidered Trench Coat")}
                className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-[#38151D] hover:text-[#C8A463] shadow-xs cursor-pointer"
              >
                <Heart className={`w-3.5 h-3.5 ${wishlist["arr-3"] ? "fill-[#38151D] text-[#38151D]" : ""}`} />
              </button>
              <img
                src="/images/mockup/arrival_3.jpg"
                alt="Embroidered Trench Coat"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
              />
            </div>
            <div className="p-3 sm:p-4 flex flex-col flex-1">
              <h4 className="font-serif text-[13px] sm:text-sm text-[#2B141B] font-medium truncate">
                Embroidered Trench Coat
              </h4>
              <p className="text-[11px] text-[#8C6D76] font-serif truncate mb-2">
                Hand-Loomed Bandhgala
              </p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-serif text-[13px] sm:text-sm font-semibold text-[#2B141B]">₹98,000</span>
                <span className="text-[11px] text-[#A8989C] line-through font-serif">₹1,15,000</span>
              </div>
              <button
                onClick={() => handleQuickAdd("Embroidered Trench Coat", 98000, "/images/mockup/arrival_3.jpg")}
                className="w-full py-2 bg-[#FAF4ED] group-hover:bg-[#38151D] text-[#38151D] group-hover:text-white border border-[#E8DDCE] group-hover:border-[#38151D] rounded-xs text-[9px] sm:text-[10px] font-serif uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>ADD TO CART</span>
              </button>
            </div>
          </div>

          {/* Arrival 4 */}
          <div className="group flex flex-col bg-white border border-[#E8DDCE] shadow-2xs hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F2EAE0]">
              <button
                onClick={() => toggleWishlist("arr-4", "Crystal Embellished Gown")}
                className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-[#38151D] hover:text-[#C8A463] shadow-xs cursor-pointer"
              >
                <Heart className={`w-3.5 h-3.5 ${wishlist["arr-4"] ? "fill-[#38151D] text-[#38151D]" : ""}`} />
              </button>
              <img
                src="/images/mockup/arrival_4.jpg"
                alt="Crystal Embellished Gown"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
              />
            </div>
            <div className="p-3 sm:p-4 flex flex-col flex-1">
              <h4 className="font-serif text-[13px] sm:text-sm text-[#2B141B] font-medium truncate">
                Crystal Embellished Gown
              </h4>
              <p className="text-[11px] text-[#8C6D76] font-serif truncate mb-2">
                Sculpted Cape Gown
              </p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-serif text-[13px] sm:text-sm font-semibold text-[#2B141B]">₹2,15,000</span>
              </div>
              <button
                onClick={() => handleQuickAdd("Crystal Embellished Gown", 215000, "/images/mockup/arrival_4.jpg")}
                className="w-full py-2 bg-[#FAF4ED] group-hover:bg-[#38151D] text-[#38151D] group-hover:text-white border border-[#E8DDCE] group-hover:border-[#38151D] rounded-xs text-[9px] sm:text-[10px] font-serif uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>ADD TO CART</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 7. TRENDING DESIGNER OUTFITS */}
      <section className="relative z-20 max-w-[1240px] mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 
            className="text-xl sm:text-2xl md:text-3xl font-serif text-[#2B141B]"
            style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
          >
            Trending Designer Outfits
          </h2>
          <button
            onClick={() => setCustomerSection("catalog")}
            className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#6B2A38] hover:text-[#38151D] font-serif flex items-center gap-1 transition-colors"
          >
            <span>VIEW ALL COLLECTIONS</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* 4 Trending Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Trending 1 */}
          <div className="group flex flex-col bg-white border border-[#E8DDCE] shadow-2xs hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F2EAE0]">
              <button
                onClick={() => toggleWishlist("tr-1", "Embroidered Wool Coat")}
                className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-[#38151D] hover:text-[#C8A463] shadow-xs cursor-pointer"
              >
                <Heart className={`w-3.5 h-3.5 ${wishlist["tr-1"] ? "fill-[#38151D] text-[#38151D]" : ""}`} />
              </button>
              <img
                src="/images/mockup/trending_1.jpg"
                alt="Embroidered Wool Coat"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
              />
            </div>
            <div className="p-3 sm:p-4 flex flex-col flex-1">
              <h4 className="font-serif text-[13px] sm:text-sm text-[#2B141B] font-medium truncate mb-1">
                Embroidered Wool Coat
              </h4>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-serif text-[13px] sm:text-sm font-semibold text-[#2B141B]">₹85,000</span>
              </div>
              <button
                onClick={() => handleQuickAdd("Embroidered Wool Coat", 85000, "/images/mockup/trending_1.jpg")}
                className="w-full py-2 bg-[#FAF4ED] group-hover:bg-[#38151D] text-[#38151D] group-hover:text-white border border-[#E8DDCE] group-hover:border-[#38151D] rounded-xs text-[9px] sm:text-[10px] font-serif uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-auto"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>ADD TO CART</span>
              </button>
            </div>
          </div>

          {/* Trending 2 */}
          <div className="group flex flex-col bg-white border border-[#E8DDCE] shadow-2xs hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F2EAE0]">
              <button
                onClick={() => toggleWishlist("tr-2", "Silk Lehenga with Dupatta")}
                className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-[#38151D] hover:text-[#C8A463] shadow-xs cursor-pointer"
              >
                <Heart className={`w-3.5 h-3.5 ${wishlist["tr-2"] ? "fill-[#38151D] text-[#38151D]" : ""}`} />
              </button>
              <img
                src="/images/mockup/trending_2.jpg"
                alt="Silk Lehenga with Dupatta"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
              />
            </div>
            <div className="p-3 sm:p-4 flex flex-col flex-1">
              <h4 className="font-serif text-[13px] sm:text-sm text-[#2B141B] font-medium truncate mb-1">
                Silk Lehenga with Dupatta
              </h4>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-serif text-[13px] sm:text-sm font-semibold text-[#2B141B]">₹1,52,000</span>
              </div>
              <button
                onClick={() => handleQuickAdd("Silk Lehenga with Dupatta", 152000, "/images/mockup/trending_2.jpg")}
                className="w-full py-2 bg-[#FAF4ED] group-hover:bg-[#38151D] text-[#38151D] group-hover:text-white border border-[#E8DDCE] group-hover:border-[#38151D] rounded-xs text-[9px] sm:text-[10px] font-serif uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-auto"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>ADD TO CART</span>
              </button>
            </div>
          </div>

          {/* Trending 3 */}
          <div className="group flex flex-col bg-white border border-[#E8DDCE] shadow-2xs hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F2EAE0]">
              <button
                onClick={() => toggleWishlist("tr-3", "Embroidered Trench Coat")}
                className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-[#38151D] hover:text-[#C8A463] shadow-xs cursor-pointer"
              >
                <Heart className={`w-3.5 h-3.5 ${wishlist["tr-3"] ? "fill-[#38151D] text-[#38151D]" : ""}`} />
              </button>
              <img
                src="/images/mockup/trending_3.jpg"
                alt="Embroidered Trench Coat"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
              />
            </div>
            <div className="p-3 sm:p-4 flex flex-col flex-1">
              <h4 className="font-serif text-[13px] sm:text-sm text-[#2B141B] font-medium truncate mb-1">
                Embroidered Trench Coat
              </h4>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-serif text-[13px] sm:text-sm font-semibold text-[#2B141B]">₹98,000</span>
              </div>
              <button
                onClick={() => handleQuickAdd("Embroidered Trench Coat", 98000, "/images/mockup/trending_3.jpg")}
                className="w-full py-2 bg-[#FAF4ED] group-hover:bg-[#38151D] text-[#38151D] group-hover:text-white border border-[#E8DDCE] group-hover:border-[#38151D] rounded-xs text-[9px] sm:text-[10px] font-serif uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-auto"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>ADD TO CART</span>
              </button>
            </div>
          </div>

          {/* Trending 4 */}
          <div className="group flex flex-col bg-white border border-[#E8DDCE] shadow-2xs hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F2EAE0]">
              <button
                onClick={() => toggleWishlist("tr-4", "Silk Gown with Cape")}
                className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-[#38151D] hover:text-[#C8A463] shadow-xs cursor-pointer"
              >
                <Heart className={`w-3.5 h-3.5 ${wishlist["tr-4"] ? "fill-[#38151D] text-[#38151D]" : ""}`} />
              </button>
              <img
                src="/images/mockup/trending_4.jpg"
                alt="Silk Gown with Cape"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
              />
            </div>
            <div className="p-3 sm:p-4 flex flex-col flex-1">
              <h4 className="font-serif text-[13px] sm:text-sm text-[#2B141B] font-medium truncate mb-1">
                Silk Gown with Cape
              </h4>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-serif text-[13px] sm:text-sm font-semibold text-[#2B141B]">₹1,35,000</span>
              </div>
              <button
                onClick={() => handleQuickAdd("Silk Gown with Cape", 135000, "/images/mockup/trending_4.jpg")}
                className="w-full py-2 bg-[#FAF4ED] group-hover:bg-[#38151D] text-[#38151D] group-hover:text-white border border-[#E8DDCE] group-hover:border-[#38151D] rounded-xs text-[9px] sm:text-[10px] font-serif uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-auto"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>ADD TO CART</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 8. PROMOTIONAL COMMISSION BANNER (Made For You. Commission Your Private Atelier Piece) */}
      <section className="relative z-20 max-w-[1240px] mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <div className="relative overflow-hidden bg-[#38151D] text-[#F8E8D9] border border-[#C8A463]/30 shadow-2xl p-6 sm:p-10 lg:p-12">
          {/* Subtle gold line ornament */}
          <GoldBotanicalBranch className="absolute bottom-2 left-1/3 w-32 pointer-events-none opacity-20 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="md:col-span-7 flex flex-col items-start pr-0 md:pr-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A463] font-serif font-medium mb-3">
                ✦ ATELIER PRIVATE SALON
              </span>
              <h3 
                className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#F8E8D9] leading-tight mb-4"
                style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
              >
                Made For You. Commission Your Private Atelier Piece
              </h3>
              <p className="text-xs sm:text-sm text-[#F8E8D9]/75 font-serif leading-relaxed mb-8 max-w-lg">
                Experience bespoke creation where your imagination meets our craftsmanship. Turn to create a couture masterpiece, made exclusively for you.
              </p>
              
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => onOpenCustomRequest()}
                  className="px-6 py-2.5 bg-[#FAF4ED] hover:bg-white text-[#38151D] rounded-xs text-[10px] sm:text-[11px] font-serif uppercase tracking-[0.25em] font-medium transition-all cursor-pointer shadow-md"
                >
                  LEARN MORE
                </button>
                <button
                  onClick={() => onOpenCustomRequest()}
                  className="px-6 py-2.5 bg-transparent hover:bg-[#C8A463]/15 text-[#F8E8D9] border border-[#C8A463]/60 rounded-xs text-[10px] sm:text-[11px] font-serif uppercase tracking-[0.25em] transition-all cursor-pointer"
                >
                  BOOK A CONSULTATION
                </button>
              </div>
            </div>

            {/* Right Photo (Couturier Fitting Mannequin from Mockup) */}
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <div className="w-full max-w-[380px] aspect-[4/3] rounded-sm overflow-hidden border border-[#C8A463]/40 shadow-xl bg-[#2D0F16]">
                <img
                  src="/images/mockup/made_for_you.jpg"
                  alt="Commission Your Private Atelier Piece"
                  className="w-full h-full object-cover hover:scale-104 transition-transform duration-700"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. BESTSELLERS • MOST COVETED PIECES */}
      <section className="relative z-20 max-w-[1240px] mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 
            className="text-xl sm:text-2xl md:text-3xl font-serif text-[#2B141B]"
            style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
          >
            Bestsellers • Most Coveted Pieces
          </h2>
        </div>

        {/* 4 Bestseller Cards with 5 Stars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Bestseller 1 */}
          <div className="group flex flex-col bg-white border border-[#E8DDCE] shadow-2xs hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F2EAE0]">
              <button
                onClick={() => toggleWishlist("bs-1", "Embroidered Wool Coat")}
                className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-[#38151D] hover:text-[#C8A463] shadow-xs cursor-pointer"
              >
                <Heart className={`w-3.5 h-3.5 ${wishlist["bs-1"] ? "fill-[#38151D] text-[#38151D]" : ""}`} />
              </button>
              <img
                src="/images/mockup/bestseller_1.jpg"
                alt="Embroidered Wool Coat"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
              />
            </div>
            <div className="p-3 sm:p-4 flex flex-col flex-1">
              {/* Star Rating from mockup */}
              <div className="flex items-center gap-0.5 text-[#C8A463] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 fill-current" />
                ))}
              </div>
              <h4 className="font-serif text-[13px] sm:text-sm text-[#2B141B] font-medium truncate mb-1">
                Embroidered Wool Coat
              </h4>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-serif text-[13px] sm:text-sm font-semibold text-[#2B141B]">₹45,000</span>
              </div>
              <button
                onClick={() => handleQuickAdd("Embroidered Wool Coat", 45000, "/images/mockup/bestseller_1.jpg")}
                className="w-full py-2 bg-[#FAF4ED] group-hover:bg-[#38151D] text-[#38151D] group-hover:text-white border border-[#E8DDCE] group-hover:border-[#38151D] rounded-xs text-[9px] sm:text-[10px] font-serif uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-auto"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>ADD TO CART</span>
              </button>
            </div>
          </div>

          {/* Bestseller 2 */}
          <div className="group flex flex-col bg-white border border-[#E8DDCE] shadow-2xs hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F2EAE0]">
              <button
                onClick={() => toggleWishlist("bs-2", "Silk Lehenga Suit")}
                className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-[#38151D] hover:text-[#C8A463] shadow-xs cursor-pointer"
              >
                <Heart className={`w-3.5 h-3.5 ${wishlist["bs-2"] ? "fill-[#38151D] text-[#38151D]" : ""}`} />
              </button>
              <img
                src="/images/mockup/bestseller_2.jpg"
                alt="Silk Lehenga Suit"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
              />
            </div>
            <div className="p-3 sm:p-4 flex flex-col flex-1">
              <div className="flex items-center gap-0.5 text-[#C8A463] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 fill-current" />
                ))}
              </div>
              <h4 className="font-serif text-[13px] sm:text-sm text-[#2B141B] font-medium truncate mb-1">
                Silk Lehenga Suit
              </h4>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-serif text-[13px] sm:text-sm font-semibold text-[#2B141B]">₹1,12,000</span>
              </div>
              <button
                onClick={() => handleQuickAdd("Silk Lehenga Suit", 112000, "/images/mockup/bestseller_2.jpg")}
                className="w-full py-2 bg-[#FAF4ED] group-hover:bg-[#38151D] text-[#38151D] group-hover:text-white border border-[#E8DDCE] group-hover:border-[#38151D] rounded-xs text-[9px] sm:text-[10px] font-serif uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-auto"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>ADD TO CART</span>
              </button>
            </div>
          </div>

          {/* Bestseller 3 */}
          <div className="group flex flex-col bg-white border border-[#E8DDCE] shadow-2xs hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F2EAE0]">
              <button
                onClick={() => toggleWishlist("bs-3", "Velvet Saree Ensemble")}
                className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-[#38151D] hover:text-[#C8A463] shadow-xs cursor-pointer"
              >
                <Heart className={`w-3.5 h-3.5 ${wishlist["bs-3"] ? "fill-[#38151D] text-[#38151D]" : ""}`} />
              </button>
              <img
                src="/images/mockup/bestseller_3.jpg"
                alt="Velvet Saree Ensemble"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
              />
            </div>
            <div className="p-3 sm:p-4 flex flex-col flex-1">
              <div className="flex items-center gap-0.5 text-[#C8A463] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 fill-current" />
                ))}
              </div>
              <h4 className="font-serif text-[13px] sm:text-sm text-[#2B141B] font-medium truncate mb-1">
                Velvet Saree Ensemble
              </h4>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-serif text-[13px] sm:text-sm font-semibold text-[#2B141B]">₹98,000</span>
              </div>
              <button
                onClick={() => handleQuickAdd("Velvet Saree Ensemble", 98000, "/images/mockup/bestseller_3.jpg")}
                className="w-full py-2 bg-[#FAF4ED] group-hover:bg-[#38151D] text-[#38151D] group-hover:text-white border border-[#E8DDCE] group-hover:border-[#38151D] rounded-xs text-[9px] sm:text-[10px] font-serif uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-auto"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>ADD TO CART</span>
              </button>
            </div>
          </div>

          {/* Bestseller 4 */}
          <div className="group flex flex-col bg-white border border-[#E8DDCE] shadow-2xs hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#F2EAE0]">
              <button
                onClick={() => toggleWishlist("bs-4", "Embroidered Gown")}
                className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-[#38151D] hover:text-[#C8A463] shadow-xs cursor-pointer"
              >
                <Heart className={`w-3.5 h-3.5 ${wishlist["bs-4"] ? "fill-[#38151D] text-[#38151D]" : ""}`} />
              </button>
              <img
                src="/images/mockup/bestseller_4.jpg"
                alt="Embroidered Gown"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
              />
            </div>
            <div className="p-3 sm:p-4 flex flex-col flex-1">
              <div className="flex items-center gap-0.5 text-[#C8A463] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 fill-current" />
                ))}
              </div>
              <h4 className="font-serif text-[13px] sm:text-sm text-[#2B141B] font-medium truncate mb-1">
                Embroidered Gown
              </h4>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-serif text-[13px] sm:text-sm font-semibold text-[#2B141B]">₹2,20,000</span>
              </div>
              <button
                onClick={() => handleQuickAdd("Embroidered Gown", 220000, "/images/mockup/bestseller_4.jpg")}
                className="w-full py-2 bg-[#FAF4ED] group-hover:bg-[#38151D] text-[#38151D] group-hover:text-white border border-[#E8DDCE] group-hover:border-[#38151D] rounded-xs text-[9px] sm:text-[10px] font-serif uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-auto"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>ADD TO CART</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 10. GRAND LUXURY FOOTER (Mariana Voss Design & Maison Privée) */}
      <footer className="relative z-20 w-full bg-[#38151D] text-[#F8E8D9] pt-12 sm:pt-16 pb-12 overflow-hidden border-t border-[#C8A463]/30 mt-8">
        <GoldBotanicalBranch className="absolute bottom-4 right-6 w-44 pointer-events-none opacity-40 hidden lg:block" />

        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Mariana Voss Portrait in Arch Frame */}
            <div className="md:col-span-3 flex justify-center md:justify-start">
              <div className="relative w-36 sm:w-44 aspect-[3/4] rounded-t-full rounded-b-xl overflow-hidden border border-[#C8A463]/40 shadow-xl bg-[#2D0F16]">
                <img
                  src="/images/mockup/footer_model.jpg"
                  alt="Mariana Voss Atelier"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Center: LET'S CREATE SOMETHING EXTRAORDINARY & Contact Info */}
            <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A463] font-serif font-medium mb-2">
                LET'S CREATE SOMETHING EXTRAORDINARY
              </span>
              <div className="w-16 h-[1px] bg-[#C8A463]/50 mb-5" />

              <div className="flex flex-col space-y-2.5 text-xs sm:text-[13px] text-[#F8E8D9]/80 font-serif">
                <a href="mailto:hello@mariana-voss.com" className="flex items-center gap-2.5 hover:text-[#C8A463] transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#C8A463]" />
                  <span>hello@mariana-voss.com</span>
                </a>
                <a href="https://www.mariana-voss.com" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 hover:text-[#C8A463] transition-colors">
                  <Globe className="w-3.5 h-3.5 text-[#C8A463]" />
                  <span>www.mariana-voss.com</span>
                </a>
                <div className="flex items-center gap-2.5 text-[#F8E8D9]/70">
                  <MapPin className="w-3.5 h-3.5 text-[#C8A463]" />
                  <span>Milan, Italy</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#F8E8D9]/70">
                  <svg className="w-3.5 h-3.5 text-[#C8A463] fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <span>@mariana-voss.design</span>
                </div>
              </div>
            </div>

            {/* Right: Signature Philosophy Quote */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left pl-0 md:pl-4">
              <div className="relative border-l-0 md:border-l border-[#C8A463]/30 pl-0 md:pl-6 py-2">
                <span className="text-3xl text-[#C8A463]/50 font-serif leading-none block mb-1">“</span>
                <p 
                  className="text-base sm:text-lg font-serif italic text-[#F8E8D9] leading-snug mb-3"
                  style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
                >
                  Design is not just what it looks like and feels like. Design is how it works.
                </p>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A463] font-serif font-medium">
                  — MARIANA VOSS
                </span>
              </div>
            </div>

          </div>

          {/* Bottom Copyright line */}
          <div className="mt-12 pt-6 border-t border-[#C8A463]/20 flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#F8E8D9]/50 font-serif tracking-wider">
            <span>© 2026 ATELIER MAISON PRIVÉE. ALL RIGHTS RESERVED.</span>
            <span className="mt-2 sm:mt-0">HAUTE COUTURE COMMISSION ARCHIVE</span>
          </div>
        </div>

        {/* Sculpted Bottom Silk Wave */}
        <div className="w-full mt-6 overflow-hidden h-8 sm:h-12 opacity-60">
          <img 
            src="/images/mockup/silk_bottom_wave.jpg" 
            alt="Silk Ribbon Wave" 
            className="w-full h-full object-cover"
          />
        </div>
      </footer>

      {/* LOOKBOOK MODAL */}
      <AnimatePresence>
        {isLookbookOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setIsLookbookOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#38151D] text-[#F8E8D9] border border-[#C8A463]/40 p-6 sm:p-8 rounded-sm shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setIsLookbookOpen(false)}
                className="absolute top-4 right-4 text-[#F8E8D9]/70 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-8">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A463] font-serif">
                  ARCHIVAL LOOKBOOK • VOLUME I
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#F8E8D9] mt-1">
                  Autumn / Winter ’25 Runway & Salon
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="aspect-[3/4] overflow-hidden bg-[#240D13] border border-[#C8A463]/25">
                  <img src="/images/mockup/sig_numbered.jpg" alt="Look 01" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[3/4] overflow-hidden bg-[#240D13] border border-[#C8A463]/25">
                  <img src="/images/mockup/sig_zardozi.jpg" alt="Look 02" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[3/4] overflow-hidden bg-[#240D13] border border-[#C8A463]/25">
                  <img src="/images/mockup/sig_geometric.jpg" alt="Look 03" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[3/4] overflow-hidden bg-[#240D13] border border-[#C8A463]/25">
                  <img src="/images/mockup/arrival_1.jpg" alt="Look 04" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[3/4] overflow-hidden bg-[#240D13] border border-[#C8A463]/25">
                  <img src="/images/mockup/arrival_2.jpg" alt="Look 05" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[3/4] overflow-hidden bg-[#240D13] border border-[#C8A463]/25">
                  <img src="/images/mockup/made_for_you.jpg" alt="Look 06" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    setIsLookbookOpen(false);
                    onOpenCustomRequest();
                  }}
                  className="px-8 py-3 bg-[#FAF4ED] text-[#38151D] text-[11px] font-serif uppercase tracking-[0.25em] font-medium hover:bg-white transition-all shadow-md"
                >
                  Commission Any Look
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
