"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpDown, ChevronLeft, ChevronRight, Pause, Play, Plus, Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useStudio } from "@/context/StudioContext";
import { ListedProduct } from "@/types/studio";
import { CATALOG_PRODUCTS, CatalogProduct } from "@/data/catalogProducts";
import "./CustomerTopDeals.css";
import { AddToBagButton } from "./AddToBagButton";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.NODE_ENV === "production" ? "/AtlierFashion2" : "");
const asset = (path: string) => /^https?:\/\//.test(path) ? path : path.startsWith(BASE_PATH + "/") && BASE_PATH ? path : BASE_PATH + path;
const money = (amount: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
const SLIDE_DURATION = 4000;
const CAMPAIGNS = [
  { label: "The ceremonial edit", title: "An occasion.\nAn impression.", description: "Discover distinguished tailoring and considered details for life's special moments.", image: "/images/salon/deals/slide_man.png", filter: "men", cta: "Explore menswear", number: "01" },
  { label: "The heritage edit", title: "Tradition, beautifully\nreimagined.", description: "Expressive silhouettes and exquisite textures. Find a piece to make your own.", image: "/images/salon/deals/slide_woman_wine.png", filter: "women", cta: "Explore womenswear", number: "02" },
  { label: "The little celebrations edit", title: "Small moments.\nGrand memories.", description: "A thoughtful selection for the youngest guests at every celebration.", image: "/images/salon/deals/slide_kid.png", filter: "kids", cta: "Explore kidswear", number: "03" },
  { label: "The evening edit", title: "For your next\ngrand entrance.", description: "Discover statement dressing with a modern spirit, at exceptional prices.", image: "/images/salon/deals/slide_woman_emerald.png", filter: "women", cta: "Discover the edit", number: "04" },
] as const;
const FILTERS = [{ id: "all", label: "All pieces" }, { id: "women", label: "Women" }, { id: "men", label: "Men" }, { id: "kids", label: "Kids" }] as const;
type Filter = typeof FILTERS[number]["id"];

interface CustomerTopDealsProps {
  onOpenBuyNow: (product: ListedProduct) => void;
  onOpenCustomRequest: (product?: ListedProduct) => void;
}

export const CustomerTopDeals: React.FC<CustomerTopDealsProps> = ({ onOpenCustomRequest }) => {
  const { addToCart, showToast, setSelectedProductId } = useStudio();
  const reducedMotion = useReducedMotion();
  const [slideIndex, setSlideIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [discountTier, setDiscountTier] = useState<"all" | "70" | "60" | "50" | "40">("all");
  const [sort, setSort] = useState("saving");
  const selectionRef = useRef<HTMLElement>(null);
  const touchStart = useRef<number | null>(null);
  const playing = !paused && !hovered && !focused && !hidden && !reducedMotion;

  useEffect(() => {
    const handleVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setSlideIndex((current) => (current + 1) % CAMPAIGNS.length), SLIDE_DURATION);
    return () => window.clearTimeout(timer);
  }, [slideIndex, playing]);

  const moveSlide = (direction: number) => setSlideIndex((current) => (current + direction + CAMPAIGNS.length) % CAMPAIGNS.length);
  const browse = (nextFilter: Filter) => {
    setFilter(nextFilter);
    selectionRef.current?.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" });
    selectionRef.current?.focus({ preventScroll: true });
  };

  // STRICTLY SHOW HUGE DISCOUNTS: 40% TO 70% OFF ONLY
  const deals = CATALOG_PRODUCTS.filter((product) => {
    if (product.status !== "ACTIVE" || product.availableStock <= 0 || !product.originalPrice) return false;
    const discount = Math.round((1 - product.price / product.originalPrice) * 100);
    return discount >= 40 && discount <= 70;
  });

  const visibleDeals = deals
    .filter((product) => {
      const matchesGender = filter === "all" || product.gender === filter;
      if (!matchesGender) return false;
      const discount = Math.round((1 - product.price / product.originalPrice) * 100);
      if (discountTier === "70") return discount >= 70;
      if (discountTier === "60") return discount >= 60 && discount < 70;
      if (discountTier === "50") return discount >= 50 && discount < 60;
      if (discountTier === "40") return discount >= 40 && discount < 50;
      return true;
    })
    .sort((a, b) => {
      if (sort === "saving" || sort === "curated") return (1 - b.price / b.originalPrice) - (1 - a.price / a.originalPrice);
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      return 0;
    });

  const addToBag = (product: CatalogProduct) => {
    addToCart({ id: product.id, title: product.title, price: product.price, image: asset(product.images[0] || product.image), size: product.sizes[0] || "Custom", color: "As pictured", quantity: 1 });
    showToast('Added "' + product.title + '" to your bag');
  };

  return (
    <div className={"top-deals-page"}>
      <section className={"top-deals-carousel"} aria-label="Featured collections" aria-roledescription="carousel"
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
        onKeyDown={(event) => { if (event.key === "ArrowRight") { event.preventDefault(); moveSlide(1); } if (event.key === "ArrowLeft") { event.preventDefault(); moveSlide(-1); } }}
        onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
        onTouchEnd={(event) => { if (touchStart.current !== null) { const distance = touchStart.current - event.changedTouches[0].clientX; if (Math.abs(distance) > 50) moveSlide(distance > 0 ? 1 : -1); } touchStart.current = null; }}>
        <header className={"top-deals-intro"}>
          <div className={"top-deals-introRow"}>
            <h1>Top Deals<span className={"top-deals-titleDot"}>.</span></h1>
          </div>
        </header>

        <div className={"top-deals-viewport"}>
          <div className={"top-deals-track"} style={{ transform: 'translateX(-' + slideIndex * 100 + '%)' }}>
            {CAMPAIGNS.map((campaign, index) => (
              <div key={campaign.number} className={"top-deals-slide"} role="group" aria-roledescription="slide" aria-label={(index + 1) + ' of ' + CAMPAIGNS.length} aria-hidden={index !== slideIndex} inert={index !== slideIndex}>
                <img className={"top-deals-campaignImage"} src={asset(campaign.image)} alt="" fetchPriority={index === 0 ? "high" : "auto"} />
                <div className={"top-deals-shade"} />
                <div className={"top-deals-campaignCopy"}>
                  <p className={"top-deals-eyebrow"}><span />{campaign.label}</p>
                  <h2>{campaign.title}</h2>
                  <p className={"top-deals-description"}>{campaign.description}</p>
                  <button className={"top-deals-lightButton"} onClick={() => browse(campaign.filter)}>{campaign.cta}<ArrowRight size={16} /></button>
                </div>
                <span className={"top-deals-edition"}>Maison selection / {campaign.number}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={"top-deals-controls"}>
          <div className={"top-deals-dots"} aria-label="Choose a campaign">
            {CAMPAIGNS.map((campaign, index) => <button key={campaign.number} onClick={() => setSlideIndex(index)} aria-label={'Show ' + campaign.label} aria-current={index === slideIndex ? "true" : undefined}><span className={index === slideIndex ? "top-deals-activeDot" : ""} /></button>)}
          </div>
          <p className={"top-deals-slideCount"} aria-live={playing ? "off" : "polite"}>{CAMPAIGNS[slideIndex].number}<span> / 04</span></p>
          <div className={"top-deals-arrows"}>
            <button aria-label="Previous campaign" onClick={() => moveSlide(-1)}><ChevronLeft size={18} /></button>
            {!reducedMotion && <button aria-label={paused ? "Play slideshow" : "Pause slideshow"} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>}
            <button aria-label="Next campaign" onClick={() => moveSlide(1)}><ChevronRight size={18} /></button>
          </div>
        </div>
      </section>

      <section ref={selectionRef} tabIndex={-1} className={"top-deals-selection"} aria-labelledby="deals-heading">
        {/* Section Header with Haute Couture Gold Accents */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE6DC]/90 border border-[#E0D2C2] text-[10px] font-mono uppercase tracking-[0.22em] text-[#866447] mb-3 shadow-xs">
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              <span>STYTELL Archival Vault Clearance</span>
            </div>
            <h2 id="deals-heading" className="font-serif text-3xl sm:text-4xl text-[#3A0E1E] font-semibold tracking-tight">
              Discover something exceptional<span className="text-[#C5A059]">.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-[13px] text-[#7A625E] font-light max-w-sm leading-relaxed">
            Curated haute couture pieces marked down 40% to 70%. Provenance directly verified from partner ateliers.
          </p>
        </div>

        {/* Haute Couture Filter Console Card */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#FCF9F5] via-[#F8F1E7] to-[#FAF4EC] border border-[#E5D7C7] p-4 sm:p-6 shadow-[0_12px_36px_-12px_rgba(58,14,30,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-500 hover:border-[#D4AF37]/50 hover:shadow-[0_16px_44px_-10px_rgba(58,14,30,0.12)] space-y-4">
          {/* Subtle Golden Hairline Light Ray */}
          <div className="absolute top-0 inset-x-12 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent pointer-events-none" />

          {/* Upper Row: Segmented Collection Tabs & Bespoke Sort Pill */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Segmented Pill Navigation with Animated Sliding Indicator */}
            <div className="inline-flex items-center p-1 sm:p-1.5 rounded-full bg-[#ECE1D4]/90 backdrop-blur-md border border-[#DFCFC0] shadow-[inset_0_1.5px_3px_rgba(58,14,30,0.06),0_1px_2px_rgba(255,255,255,0.8)] relative flex-wrap sm:flex-nowrap">
              {FILTERS.map((option) => {
                const isActive = filter === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setFilter(option.id)}
                    className={`relative px-4 sm:px-6 py-2 rounded-full text-xs uppercase tracking-[0.18em] font-sans transition-colors duration-300 select-none cursor-pointer z-10 ${
                      isActive
                        ? "text-[#FAF4ED] font-semibold"
                        : "text-[#7A5A53] hover:text-[#3A0E1E] font-medium"
                    }`}
                  >
                    {/* Animated Sliding Pill for Active Tab */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTopDealsTab"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3A0E1E] via-[#52172C] to-[#3A0E1E] border border-[#D4AF37]/70 shadow-[0_4px_14px_rgba(58,14,30,0.32),0_0_12px_rgba(212,175,55,0.25)]"
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      />
                    )}
                    <span className="relative z-20 flex items-center gap-1.5">
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E5C378] shadow-[0_0_6px_#E5C378] animate-pulse" />
                      )}
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bespoke Luxury Sort Pill */}
            <div className="relative inline-flex items-center self-start sm:self-auto">
              <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-sm border border-[#E2D4C5] shadow-xs hover:border-[#D4AF37] hover:shadow-[0_4px_16px_rgba(197,160,89,0.18)] transition-all duration-300 group cursor-pointer">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#3A0E1E] to-[#5A162B] flex items-center justify-center text-[#E8D2B7] shadow-xs">
                  <ArrowUpDown className="w-3 h-3 text-[#E5C378] transition-transform duration-300 group-hover:rotate-180" />
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#866447] font-semibold">
                  Sort:
                </span>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="bg-transparent text-xs text-[#3A0E1E] font-medium cursor-pointer focus:outline-none pr-1"
                >
                  <option value="saving">Highest savings (70% → 40%)</option>
                  <option value="curated">Curated selection</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Lower Row: Discount Tiers with Glow, Shimmer & Micro-Interactions */}
          <div className="flex items-center gap-2 flex-wrap pt-3.5 border-t border-[#E8DDD1]/80 text-xs">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#EFE5D8] to-[#F7EFE6] border border-[#DAC9B6] text-[10px] font-mono uppercase tracking-[0.22em] text-[#6E4F39] font-bold shadow-xs select-none">
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              <span>Discount:</span>
            </div>

            {[
              { id: "all", label: "All Huge Deals (40% - 70%)" },
              { id: "70", label: "🔥 70% Off Steals", isSpecial: true },
              { id: "60", label: "60% Off" },
              { id: "50", label: "50% Off (Half Price)" },
              { id: "40", label: "40% - 49% Off" },
            ].map((tier) => {
              const isActive = discountTier === tier.id;
              return (
                <motion.button
                  key={tier.id}
                  type="button"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDiscountTier(tier.id as any)}
                  className={`relative px-3.5 py-1.5 rounded-full text-[11px] font-mono transition-all duration-300 cursor-pointer overflow-hidden select-none ${
                    isActive
                      ? tier.isSpecial
                        ? "bg-gradient-to-r from-[#501326] via-[#751A38] to-[#501326] text-[#FFF7ED] border border-[#F6D589] shadow-[0_4px_18px_rgba(117,26,56,0.35),0_0_12px_rgba(246,213,137,0.3)] font-bold ring-1 ring-[#F6D589]/50"
                        : "bg-gradient-to-r from-[#3A0E1E] via-[#52172C] to-[#3A0E1E] text-[#FFF6E9] border border-[#D4AF37] shadow-[0_4px_14px_rgba(58,14,30,0.28),0_0_10px_rgba(212,175,55,0.22)] font-bold"
                      : tier.isSpecial
                      ? "bg-gradient-to-r from-[#FFF9F3] via-[#FFF1E0] to-[#FFEBD4] text-[#6E162D] border border-[#E8B878] hover:border-[#D4AF37] hover:shadow-[0_4px_14px_rgba(232,184,120,0.3)] font-semibold"
                      : "bg-gradient-to-b from-[#FFFFFF] to-[#FAF5EE] text-[#5A3F3A] border border-[#E6D8C9] hover:border-[#C5A059] hover:text-[#3A0E1E] hover:shadow-[0_2px_8px_rgba(197,160,89,0.14)]"
                  }`}
                >
                  {/* Subtle Light Shimmer Sweep across 70% button */}
                  {tier.isSpecial && (
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E5C378] animate-pulse" />
                    )}
                    {tier.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Live Inventory Status Bar with Animated Radar Beacon */}
        <div className="flex items-center justify-between text-xs my-6 px-1">
          <div className="flex items-center gap-2.5 text-[#7A625E]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A059]"></span>
            </span>
            <span className="font-mono text-[11px] tracking-wider uppercase text-[#866447] font-semibold">
              Vault Inventory:
            </span>
            <span className="font-serif font-bold text-[#3A0E1E] text-sm">
              {visibleDeals.length} Archival Commissions
            </span>
            <span className="text-[#866447]/50 font-light hidden sm:inline">•</span>
            <span className="text-[#866447] text-[11px] font-sans hidden sm:inline">
              {discountTier === "all" ? "40%–70% Off Archive" : discountTier === "70" ? "Strictly 70% Off Steals" : discountTier === "60" ? "60% Off Edition" : discountTier === "50" ? "50% Off Half-Price" : "40%–49% Off Range"}
            </span>
          </div>
        </div>

        {/* Animated Product Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <AnimatePresence mode="popLayout">
            {visibleDeals.map((product, idx) => {
              const discount = Math.round((1 - product.price / product.originalPrice) * 100);
              return (
                <motion.article
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4, delay: (idx % 4) * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSelectedProductId(product.id)}
                  className="group bg-[#FDF9F5] p-2.5 sm:p-3 border-[1.5px] border-[#C59347]/65 flex flex-col justify-between cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C59347] hover:shadow-[0_14px_28px_-6px_rgba(69,20,28,0.14)] gold-lined-card relative"
                >
                {/* Product Photograph */}
                <div className="relative aspect-[4/4.35] w-full overflow-hidden bg-[#EFE6DC]">
                  <img
                    src={asset(product.images[0] || product.image)}
                    alt={product.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Top-left Burgundy/Gold Badge */}
                  <span className="absolute top-2 left-2 bg-[#4B1A22] text-[#FAF4ED] text-[7.5px] sm:text-[8px] tracking-[0.14em] uppercase font-sans font-semibold px-2 py-0.5 shadow-sm border border-[#C59347]/40">
                    {discount >= 70 ? `🔥 ${discount}% OFF` : `${discount}% OFF`}
                  </span>

                  {/* Top-right Limited Edition badge if 1 of 1 */}
                  {product.isOneOfOne && (
                    <span className="absolute top-2 right-2 bg-[#C59347]/90 text-[#2B0C11] text-[7px] tracking-[0.14em] uppercase font-sans font-bold px-1.5 py-0.5 shadow-sm">
                      1 OF 1
                    </span>
                  )}

                  {/* Hover discover piece sheen */}
                  <div className="absolute inset-x-2 bottom-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-[opacity,transform] duration-300 flex justify-between items-center bg-[#FDF9F5]/95 backdrop-blur-sm border border-[#E6D9CD] px-2.5 py-1.5">
                    <span className="text-[8px] tracking-[0.16em] uppercase text-[#4B1A22] font-semibold flex items-center gap-1">
                      Discover Piece
                    </span>
                    <ArrowRight className="w-3 h-3 text-[#4B1A22]" />
                  </div>
                </div>

                {/* Metadata Block */}
                <div className="pt-2.5 px-0.5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.14em] text-[#8E6F64] font-sans truncate mb-0.5">
                      {product.brandName}
                    </p>
                    <h3 className="text-[12px] font-medium text-[#321218] font-sans leading-snug truncate group-hover:text-[#5B1D27] transition-colors">
                      {product.title}
                    </h3>
                  </div>

                  {/* Price & Savings Badge Row */}
                  <div className="mt-1.5 flex items-center justify-between font-sans">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-[12px] font-semibold text-[#3B171D]">
                        {money(product.price)}
                      </span>
                      <span className="text-[9.5px] text-[#A48C84] line-through">
                        {money(product.originalPrice)}
                      </span>
                    </div>

                    <span
                      className="inline-flex items-center justify-center px-1.5 py-[1.5px] rounded-[3px] text-[7.5px] font-bold tracking-[0.14em] uppercase font-sans text-[#2B1403] border border-[#C99726]/60 shadow-[0_1px_2px_rgba(180,126,16,0.2)] shrink-0 select-none"
                      style={{
                        background:
                          "linear-gradient(135deg, #FDF0CD 0%, #E5B842 50%, #B88114 100%)",
                      }}
                      title={`${discount}% Savings`}
                    >
                      SAVE {discount}%
                    </span>
                  </div>
                </div>

                {/* Bottom (+) ADD TO CART -> Footer Bar */}
                <div className="mt-2.5 pt-2 border-t border-[#ECE2D6] flex items-center justify-between px-0.5">
                  <AddToBagButton product={product} variant="footer-bar" />
                  <span className="text-[8.5px] text-[#8E6F64] font-sans truncate max-w-[85px]">
                    {product.fabric || "Haute Fabric"}
                  </span>
                </div>
              </motion.article>
            );
          })}
          </AnimatePresence>
        </motion.div>
        {visibleDeals.length === 0 && <div className={"top-deals-empty"}><h3>A new edit is on its way.</h3><p>Explore the other collections in the meantime.</p><button className={"top-deals-darkButton"} onClick={() => setFilter("all")}>View all pieces<ArrowRight size={16} /></button></div>}
      </section>

      <section className={"top-deals-concierge"}>
        <div className={"top-deals-monogram"} aria-hidden="true">
          <img src={asset("/images/stytell-monogram.png")} alt="" className="w-20 h-20 object-contain" />
        </div>
        <div><p className={"top-deals-eyebrow"}>A personal touch</p><h2>Extraordinary style.<br />A fit that feels like you.</h2><p>Discuss measurements, alterations, and your vision with an atelier.<br />Let us help you find your perfect fit.</p></div>
        <button className={"top-deals-darkButton"} onClick={() => onOpenCustomRequest()}>Enquire about bespoke<ArrowRight size={16} /></button>
      </section>
    </div>
  );
};
