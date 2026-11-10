"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { ListedProduct } from "@/types/studio";
import { motion, AnimatePresence } from "framer-motion";

interface CustomerDiscoverProps {
  onOpenBuyNow: (product: ListedProduct) => void;
  onOpenCustomRequest: (product?: ListedProduct) => void;
}

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

  const [activeGenderTab, setActiveGenderTab] = useState<"Men" | "Women" | "Kids" | null>(null);
  const [isCategoryPopoutOpen, setIsCategoryPopoutOpen] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState<"grid" | "list">("grid");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // 12 Clean Atelier Categories (Simple Image & Title, Seamless White Background matching reference)
  const categoryTiles = [
    {
      name: "Outerwear & Overcoats",
      image: "/images/categories/outerwear-overcoats.png",
    },
    {
      name: "T-Shirts",
      image: "/images/categories/t-shirts.png",
    },
    {
      name: "Sweat & Hoodies",
      image: "/images/categories/sweat-hoodies.png",
    },
    {
      name: "Suits & Tailoring",
      image: "/images/categories/suits-tailoring.png",
    },
    {
      name: "Casual & Formal Shirts",
      image: "/images/categories/casual-formal-shirts.png",
    },
    {
      name: "Knitwear & Sweaters",
      image: "/images/categories/knitwear-sweaters.png",
    },
    {
      name: "Bottoms & Trousers",
      image: "/images/categories/bottoms-trousers.png",
    },
    {
      name: "Denim",
      image: "/images/categories/denim.png",
    },
    {
      name: "Activewear",
      image: "/images/categories/activewear.png",
    },
    {
      name: "Footwear",
      image: "/images/categories/footwear.png",
    },
    {
      name: "Leather Goods & Bags",
      image: "/images/categories/leather-goods-bags.png",
    },
    {
      name: "Fragrance",
      image: "/images/categories/fragrance.png",
    }
  ];

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

  const heroSlides = [
    {
      tag: "Archival Vault Release",
      subtag: "Paris · New Delhi",
      title: "The Archival Autumn/Winter ’25 Collection",
      desc: "Sculpted in silk duchesse, structured capes, and zardozi craftsmanship by master ateliers. Limited edition bespoke tailoring crafted on commission.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPsDAnq7dOIpO-u5MY3Hvbu9C5t6B4NKAvVWewoDoQeWv1NVIZEdJ76zmh9WURKXL785uvi4PLmQB_gWDLZft1V0Y1xcwX5ztFh2oaqH-iURDqb6mVPjFvnqToyl_IpWgqHe8ZQs4zzaBUS7K0vRSz_XrrF-t2H1RJnq-R8SXO0AXSWlDr0C_tEkQr98jbufuz-SmjGqeqdZXUe_TZZQljOD8pf22tn873rF6zWjc"
    },
    {
      tag: "Bespoke Bridal Salon",
      subtag: "Udaipur · London",
      title: "Imperial Crimson Zardozi & Polki Ensemble",
      desc: "Handcrafted 24k bullion dabka on imperial silk velvet with Basra pearl embroidery. Over 480 master artisan craft hours per creation.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuATVTDaePRyZVh25w3bMSsI6xtU3mtXoyt6LL5jaUgNAJhBCTBvJbRtJ3q_VjbYc7gCEW3t-Cc6BT4hD5u3tUVtepR6tyI6dallH11EeSzJuXSvJwXRd8G_ChPXUiFdYzbq40abSI_m-ELjKsGncUdwbHjl5UsIxlm-obqriaESwyZTfNZr_zDDW0OtyllblK6RWfK7tnVfKRjzn3zETycSYI-iw7f9dEPglWtIsQk"
    },
    {
      tag: "High Couture Runway",
      subtag: "Milan · New York",
      title: "Architectural Silk Gazar Evening Silhouette",
      desc: "Fluid geometric drapery sculpted in wild ahimsa silk with antique metallic micro-cords. Featured in the international couture galleries.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdcUv21EULlPcAjkbXW3AENsH6A6ss1VVCeF1Qjoq6N8BJQDFweD4A7Hbz274TGu2bHSOmMIOWe42_Y5Ve91NQfz_IVaW8Z9C2t0sd9So8XcUAwFgntKwsH_5tA5sgGZKsLc5aFV_zwqhrvMB89M1sDiKCuAnR3kmI9oTzYnkRwtkR4sMOa_1h0Qf4ZBYGpOixGOlhSTjAX7cOFYw-jagNOIygUUivSBcLVChQP_E"
    }
  ];

  const handleQuickAdd = (title: string, price: number, image: string, _designer: string) => {
    addToCart({
      id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title,
      price,
      image,
      size: "Custom Bespoke",
      color: "Salon Standard",
      quantity: 1
    });
    showToast(`Added "${title}" to your Atelier Bag`);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    showToast("Thank you for joining The Gazette correspondence.");
    setNewsletterEmail("");
  };

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* 1. HOME CATEGORY SUB-NAVIGATION (Men | Women | Kids + Popout Container) */}
      <section className="w-full bg-surface-container-lowest sticky top-20 z-40 border-b border-outline-variant/20 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-3 flex items-center justify-between">
          {/* Gender Buttons */}
          <div className="flex items-center gap-8 md:gap-12">
            {(["Men", "Women", "Kids"] as const).map((tab) => {
              const isSelected = activeGenderTab === tab && isCategoryPopoutOpen;
              return (
                <button
                  key={tab}
                  onClick={() => handleGenderTabClick(tab)}
                  className={`group relative py-1 font-label-lg text-label-lg uppercase tracking-widest transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isSelected ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
                  }`}
                  type="button"
                >
                  <span>{tab}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-primary transition-all duration-300 ${
                      isSelected ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </button>
              );
            })}
          </div>

          {/* Right: View Layout Toggle (Grid / List) - ONLY visible when Men, Women or Kids is selected */}
          <div className="flex items-center min-h-[36px]">
            {isCategoryPopoutOpen && activeGenderTab && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3"
              >
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#837376] font-semibold hidden sm:inline">
                  VIEW LAYOUT:
                </span>
                <div className="flex items-center gap-1 border border-outline-variant/40 rounded-sm p-0.5 bg-white shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setSelectedLayout("grid")}
                    title="Grid Layout"
                    className={`p-1.5 rounded-xs transition-all cursor-pointer ${
                      selectedLayout === "grid"
                        ? "bg-[#542333] text-white shadow-xs"
                        : "text-[#837376] hover:text-primary hover:bg-black/5"
                    }`}
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm9-9h7v7h-7V4zm0 9h7v7h-7v-7z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedLayout("list")}
                    title="Dense List Layout"
                    className={`p-1.5 rounded-xs transition-all cursor-pointer ${
                      selectedLayout === "list"
                        ? "bg-[#542333] text-white shadow-xs"
                        : "text-[#837376] hover:text-primary hover:bg-black/5"
                    }`}
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M4 5h16v6H4V5zm0 8h16v6H4v-6z" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Smooth Animated Category Popout Container (matching reference image) */}
        <AnimatePresence>
          {isCategoryPopoutOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full bg-white border-t border-outline-variant/30 shadow-2xl overflow-hidden"
            >
              <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8 sm:py-10">
                {/* Header inside popout with Close Button */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-outline-variant/20">
                  <span className="font-serif text-sm tracking-widest uppercase text-secondary font-medium">
                    {activeGenderTab ? `${activeGenderTab}’s Salon Collections` : "Salon Collections"}
                  </span>
                  <button
                    onClick={() => {
                      setIsCategoryPopoutOpen(false);
                      setActiveGenderTab(null);
                    }}
                    className="text-xs uppercase tracking-widest text-outline hover:text-primary transition-colors flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <span>Close</span>
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>

                {/* Dynamic Layout Rendering: Grid View vs List View (Clean & Simple, Seamless White Background matching reference) */}
                {selectedLayout === "grid" ? (
                  /* 12 Category Grid View (6 columns x 2 rows on desktop) */
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-8">
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
                        <div className="w-full aspect-[4/3] overflow-hidden bg-white flex items-center justify-center p-1 mb-2.5 transition-all duration-300">
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                          />
                        </div>
                        <span className="font-display text-[13px] sm:text-[14px] text-primary group-hover:text-secondary transition-colors font-normal leading-snug">
                          {cat.name}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  /* 12 Category List / Row View (Structured clean horizontal cards matching the 2-row icon) */
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                        className="group flex items-center justify-between p-3.5 rounded-none bg-white border border-outline-variant/20 hover:border-[#D4AF37] hover:shadow-md transition-all duration-300 text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-14 h-14 shrink-0 overflow-hidden bg-white p-1 border-0 group-hover:scale-105 transition-transform">
                            <img src={cat.image} alt={cat.name} className="w-full h-full object-contain" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-display text-sm sm:text-base text-primary group-hover:text-secondary transition-colors font-medium truncate">
                              {cat.name}
                            </span>
                            <span className="text-[11px] font-sans text-on-surface-variant uppercase tracking-wider mt-0.5">
                              {activeGenderTab ? `${activeGenderTab}'s Archive` : "Salon Archive"}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 pl-2 shrink-0">
                          <span className="material-symbols-outlined text-[18px] text-[#837376] group-hover:text-primary group-hover:translate-x-1 transition-all">
                            arrow_forward
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 2. MAIN HERO SLIDER (Luxury Campaign Slider) */}
      <section className="relative w-full overflow-hidden bg-primary-container min-h-[560px] lg:min-h-[640px] flex items-center">
        <div className="relative w-full h-full min-h-[560px] lg:min-h-[640px] flex items-center" id="hero-slider-track">
          {/* Background Editorial Photography */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: `url("${heroSlides[currentHeroSlide].img}")`
            }}
          ></div>

          {/* Ambient Gradient & Scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-transparent to-transparent"></div>

          {/* Content Container */}
          <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 lg:px-12 py-16 flex flex-col justify-center">
            <div className="max-w-2xl flex flex-col space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-surface-container-lowest/15 backdrop-blur-md text-tertiary-fixed font-label-sm text-label-sm uppercase tracking-widest border border-outline-variant/30">
                  {heroSlides[currentHeroSlide].tag}
                </span>
                <span className="text-tertiary-fixed-dim/90 text-body-sm font-body-sm tracking-widest uppercase">
                  {heroSlides[currentHeroSlide].subtag}
                </span>
              </div>
              <h1 className="font-display text-display text-on-primary font-normal leading-[1.08] tracking-tight text-4xl sm:text-5xl lg:text-[56px]">
                {heroSlides[currentHeroSlide].title}
              </h1>
              <p className="font-body-lg text-body-lg text-surface-container-low max-w-xl font-light">
                {heroSlides[currentHeroSlide].desc}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-5">
                <button
                  onClick={() => {
                    document.getElementById("signature-collections")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="h-[52px] px-8 bg-surface-container-lowest text-primary font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-center hover:bg-surface-container-low transition-all duration-200 shadow-sm cursor-pointer"
                >
                  Explore Collection
                </button>
                <button
                  onClick={() => setCustomerSection("catalog")}
                  className="h-[52px] px-8 bg-primary/60 border border-outline-variant/30 backdrop-blur-sm text-on-primary font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-center hover:bg-primary transition-all duration-200 cursor-pointer"
                >
                  View Lookbook
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Hairline Arrow Controls */}
        <div className="absolute inset-y-0 left-0 max-w-[1440px] w-full mx-auto px-4 lg:px-8 pointer-events-none flex items-center justify-between z-20">
          <button
            aria-label="Previous Slide"
            onClick={() => setCurrentHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="pointer-events-auto w-12 h-12 bg-surface/10 hover:bg-surface/30 backdrop-blur-md text-on-primary flex items-center justify-center transition-colors border border-outline-variant/20 cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">west</span>
          </button>
          <button
            aria-label="Next Slide"
            onClick={() => setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length)}
            className="pointer-events-auto w-12 h-12 bg-surface/10 hover:bg-surface/30 backdrop-blur-md text-on-primary flex items-center justify-center transition-colors border border-outline-variant/20 cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">east</span>
          </button>
        </div>

        {/* Slide Pagination Dots */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex items-center justify-center gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Slide ${idx + 1}`}
              onClick={() => setCurrentHeroSlide(idx)}
              className={`h-[2px] transition-all cursor-pointer ${
                currentHeroSlide === idx ? "w-8 bg-tertiary-fixed" : "w-4 bg-surface/40 hover:bg-surface/80"
              }`}
              type="button"
            ></button>
          ))}
        </div>
      </section>

      {/* 3. SIGNATURE COLLECTIONS GRID (6 Bespoke Disciplines) */}
      <section id="signature-collections" className="w-full bg-surface py-20 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col space-y-2">
              <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary">
                Curated Disciplines from India &amp; Paris Ateliers
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary text-3xl sm:text-4xl">Signature Collections</h2>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
              Six pillars of sartorial excellence, each piece accompanied by a physical certificate of lineage, artisan signature, and serial cataloguing.
            </p>
          </div>

          {/* 6 Collection Cards Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* 1. Limited Editions */}
            <div className="group relative flex flex-col bg-surface-container-lowest border border-outline-variant/20 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface-dim">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZkYGBBzhVmSOxz_ry_zSZdIvPhqYjLjxSNOIVi_kcQ7J_q0mbQfDSErSYmeDh1yFVnQqbar3muor7CHmoi4EJZPxvcG1oNNU27yErQrN_NTHXGXjnHUT2GkTDFel4ri7g6919mfOdDymrEGP9f07A5SBo0msg_-y_gE8O3aqzBAtuDC3P2JvsnICiHK-OvnBVwzJGRnFfNlIcGYoKraCMNRAECgxseJW4H5ZEejk"
                  alt="Limited Editions"
                />
                <div className="absolute top-4 left-4 px-2.5 py-1 bg-surface-container-lowest text-primary font-label-sm text-label-sm uppercase tracking-wider border border-outline-variant/30 shadow-xs">
                  No. 01 / 25 Vault
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                    Numbered Silhouettes
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-primary mt-1 text-xl font-semibold">Limited Editions</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 line-clamp-2">
                    Numbered archival garments crafted from rare vintage textiles, accompanied by sealed provenance certificates.
                  </p>
                </div>
                <button
                  onClick={() => setCustomerSection("catalog")}
                  className="font-label-md text-label-md uppercase tracking-widest text-primary inline-flex items-center justify-between gap-3 px-5 py-2.5 bg-surface-container-low border border-outline-variant/30 hover:bg-surface-container hover:shadow-sm transition-all duration-300 w-full cursor-pointer"
                >
                  <span className="font-semibold">Explore Collection</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform text-secondary">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>

            {/* 2. Handcrafted */}
            <div className="group relative flex flex-col bg-surface-container-lowest border border-outline-variant/20 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface-dim">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4lwyhOpGnFf3-9AVIDzp7mLHGHg1cmHzXLr6Exz_VCvl_BSKPCuCAxEiYJPVVY3GPv9r4fORa1xf0vdH9doFSevBVCDakrCunzW6L4IKLWbTXFdWV-MzY-n6-WuOq3n6VK9kQTOpmBKikGFiLMuT5Ikl6q6iODxXl1evl-9L0jciigebPkO_fEqMrex83DjNO7yyJwzT73nJNHVxAROeue9o73Q74PlTsf-Rmgsg"
                  alt="Handcrafted"
                />
                <div className="absolute top-4 left-4 px-2.5 py-1 bg-surface-container-lowest text-primary font-label-sm text-label-sm uppercase tracking-wider border border-outline-variant/30 shadow-xs">
                  Master Artisans
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                    Zardozi, Dabka &amp; Chikankari
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-primary mt-1 text-xl font-semibold">Handcrafted</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 line-clamp-2">
                    Over 320 craft hours per silhouette by generational embroidery masters of Lucknow and Banaras.
                  </p>
                </div>
                <button
                  onClick={() => setCustomerSection("catalog")}
                  className="font-label-md text-label-md uppercase tracking-widest text-primary inline-flex items-center justify-between gap-3 px-5 py-2.5 bg-surface-container-low border border-outline-variant/30 hover:bg-surface-container hover:shadow-sm transition-all duration-300 w-full cursor-pointer"
                >
                  <span className="font-semibold">Explore Collection</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform text-secondary">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>

            {/* 3. Inspired Arts */}
            <div className="group relative flex flex-col bg-surface-container-lowest border border-outline-variant/20 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface-dim">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIcT9qq0IyDOe-eT-mQH9pkGQOk10PheMlaU-RLgxXuzCjhrvtFYayLkok4h94W3_iphI79laepoNBWx8wIROOBnrYxuT251iXEH9o9LDtkk-CQna-pCtlsZluH_WWqQRmL-Zm43zgX1zlKjkDi_njcO72KxDTD3ic_DK3fE3LzQqINfvi-633UuUOTgQg8de2WiVHSM0VRV-rBYzFTYfKOyF3emLUFTytvDW4KsI"
                  alt="Inspired Arts"
                />
                <div className="absolute top-4 left-4 px-2.5 py-1 bg-surface-container-lowest text-primary font-label-sm text-label-sm uppercase tracking-wider border border-outline-variant/30 shadow-xs">
                  Geometric Draping
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                    Architectural Motif
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-primary mt-1 text-xl font-semibold">Inspired Arts</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 line-clamp-2">
                    Fluid silhouettes inspired by Indian temple geometry and French modernism, rendered in structural silks.
                  </p>
                </div>
                <button
                  onClick={() => setCustomerSection("catalog")}
                  className="font-label-md text-label-md uppercase tracking-widest text-primary inline-flex items-center justify-between gap-3 px-5 py-2.5 bg-surface-container-low border border-outline-variant/30 hover:bg-surface-container hover:shadow-sm transition-all duration-300 w-full cursor-pointer"
                >
                  <span className="font-semibold">Explore Collection</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform text-secondary">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>

            {/* 4. Upcycled Collections */}
            <div className="group relative flex flex-col bg-surface-container-lowest border border-outline-variant/20 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface-dim">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuChec-3uQcXiePfQSNoWY4pMEBWw6ITg5RSpkYp4CUzZNI2t53p7T2SSKmcSvj16ZXwi49oOkFxhyrZFmL8k0rxtyG7-6idhZLQ4_U-D_YxZuasavh_UtzBsOE2MoHCfG3AjrEY67CgAo7wtqtqhIJpo_liAkQ4gLFpVzSLr1BElP70aOuF5mk1n0JngF6eE4qOqGgHvyZGRq0e6mITVA6S1_Po8uHxlnSKFw-aFy0"
                  alt="Upcycled Collections"
                />
                <div className="absolute top-4 left-4 px-2.5 py-1 bg-surface-container-lowest text-primary font-label-sm text-label-sm uppercase tracking-wider border border-outline-variant/30 shadow-xs">
                  Antique Brocades
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                    Revitalized Textiles
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-primary mt-1 text-xl font-semibold">Upcycled Collections</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 line-clamp-2">
                    Preserved vintage heirloom sarees and 60-year-old silk brocades meticulously restored into modern couture.
                  </p>
                </div>
                <button
                  onClick={() => setCustomerSection("catalog")}
                  className="font-label-md text-label-md uppercase tracking-widest text-primary inline-flex items-center justify-between gap-3 px-5 py-2.5 bg-surface-container-low border border-outline-variant/30 hover:bg-surface-container hover:shadow-sm transition-all duration-300 w-full cursor-pointer"
                >
                  <span className="font-semibold">Explore Collection</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform text-secondary">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>

            {/* 5. Organic Collections */}
            <div className="group relative flex flex-col bg-surface-container-lowest border border-outline-variant/20 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface-dim">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgtm5dBW_t5lAQmjgEtQKkzfIKIY5vsuO1r3uFx79hfIZi6ieZ4TCiLN5dY9BWEiPxZilRNVlKkIrA0HQNqS8PD7e4QQyiIuY7zXggfaccF4iz5MCKwHu_Eon-EnYF07WSHolgpPAJffcgpeWNOsFLT4d7TQTB8Clo3YipvTx-Kjxs7miczfl9mi-ob1nw-ieJJWV_THqxD-3nJpS3eehdFWlLEBRgLdDpOxvCbF8"
                  alt="Organic Collections"
                />
                <div className="absolute top-4 left-4 px-2.5 py-1 bg-surface-container-lowest text-primary font-label-sm text-label-sm uppercase tracking-wider border border-outline-variant/30 shadow-xs">
                  Pure Mulmul &amp; Ahimsa
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                    Wild Raw Silks
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-primary mt-1 text-xl font-semibold">Organic Collections</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 line-clamp-2">
                    Unbleached handspun yarns, ahimsa peace silks, and vegetable-dyed botanical weaves that breathe with skin.
                  </p>
                </div>
                <button
                  onClick={() => setCustomerSection("catalog")}
                  className="font-label-md text-label-md uppercase tracking-widest text-primary inline-flex items-center justify-between gap-3 px-5 py-2.5 bg-surface-container-low border border-outline-variant/30 hover:bg-surface-container hover:shadow-sm transition-all duration-300 w-full cursor-pointer"
                >
                  <span className="font-semibold">Explore Collection</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform text-secondary">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>

            {/* 6. Made to Order */}
            <div className="group relative flex flex-col bg-surface-container-lowest border border-outline-variant/20 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-surface-dim">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCN-2VSHeJrnn5zjdKjpA1Vl0txjKA-GtZ56yyD_SNfuEcj8DKGINE3AWyB3hqeI_4Kxx-QdFLtJCahZmDynbRRjNRdD3LB-D4wql9yrx--9J-3TZfrzKSXp4Zfy5Hy86lQUBtgwU4ZaWXGXsSwjARj7gMu40_-3S5cqHujEcCdJZ5HjFdzYgTcEl48edFZCxXd7jveGeyKfEa3bLQrrtSdaDfGvl2JUpeETXgRcE"
                  alt="Made to Order"
                />
                <div className="absolute top-4 left-4 px-2.5 py-1 bg-surface-container-lowest text-primary font-label-sm text-label-sm uppercase tracking-wider border border-outline-variant/30 shadow-xs">
                  Private Salon Fitting
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                    Custom Pattern Drafting
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-primary mt-1 text-xl font-semibold">Made to Order</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 line-clamp-2">
                    Individually tailored for your exact measurements via 3D virtual body mapping or private salon sessions.
                  </p>
                </div>
                <button
                  onClick={() => onOpenCustomRequest()}
                  className="font-label-md text-label-md uppercase tracking-widest text-primary inline-flex items-center justify-between gap-3 px-5 py-2.5 bg-surface-container-low border border-outline-variant/30 hover:bg-surface-container hover:shadow-sm transition-all duration-300 w-full cursor-pointer"
                >
                  <span className="font-semibold">Explore Collection</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform text-secondary">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TOP DEALS (Pantaloons-inspired Grid with Haute Luxury Refinement) */}
      <section id="top-deals" className="w-full bg-surface-container-low py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary">
                Private Salon Privilege
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary mt-1 text-3xl sm:text-4xl">
                Curated Privileges • Top Deals
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-label-md text-label-md uppercase text-on-surface-variant">
                Exclusive Archival Pricing • Limited Run
              </span>
            </div>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Deal Card 1 */}
            <div className="group bg-surface-container-lowest flex flex-col border border-outline-variant/25 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuANqhr8K9fajzE4lalFc7l5gnA9lXBHQZcy98a24TUMaB4TFz_UiRTDcIpkBIIRJK5fq2l3OBE342G6DteOxrNuBfX4jqcfwKKYP9CGxiyV7ZF4O1GzPoPMnk2McPTeiLMAVMHrdAKKRR0lflqkiklAu6tfEoc2xZEwPyOSWVUbksIqrDrNJhzycPnRJq_T00CH2PerVfhJWdjPO5eALRJ_DEm9D17YKK7c_bI4pvI"
                  alt="Raw Silk Embroidered Angrakha"
                />
                <span className="absolute top-3 left-3 bg-[#D4AF37] text-[#1c1216] font-bold font-label-sm text-label-sm uppercase px-2.5 py-1 tracking-wider shadow-xs border border-[#F3E5AB]/40">
                  25% Privilege
                </span>
              </div>
              <div className="p-5 flex flex-col space-y-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-secondary">House of Rawal</span>
                  <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#D4AF37] text-white shadow-2xs" title="Verified Atelier">
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  </span>
                </div>
                <h4 className="font-body-md text-body-md text-primary font-medium line-clamp-1">
                  Raw Silk Embroidered Angrakha
                </h4>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-title text-title text-primary font-semibold text-lg">₹96,000</span>
                    <span className="font-body-sm text-body-sm text-outline line-through text-xs">₹1,28,000</span>
                  </div>
                  <button
                    aria-label="Quick Add"
                    onClick={() => handleQuickAdd("Raw Silk Embroidered Angrakha", 96000, "https://lh3.googleusercontent.com/aida-public/AB6AXuANqhr8K9fajzE4lalFc7l5gnA9lXBHQZcy98a24TUMaB4TFz_UiRTDcIpkBIIRJK5fq2l3OBE342G6DteOxrNuBfX4jqcfwKKYP9CGxiyV7ZF4O1GzPoPMnk2McPTeiLMAVMHrdAKKRR0lflqkiklAu6tfEoc2xZEwPyOSWVUbksIqrDrNJhzycPnRJq_T00CH2PerVfhJWdjPO5eALRJ_DEm9D17YKK7c_bI4pvI", "House of Rawal")}
                    className="text-primary hover:text-secondary transition-colors cursor-pointer p-1"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Deal Card 2 */}
            <div className="group bg-surface-container-lowest flex flex-col border border-outline-variant/25 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEEXBozxCT8lRFW1-31T1FYRDdmV8mJeTUZrCtZtvFPPCeRWq11WBfoeUf8C7j3cFUA1UtyOCvQauoNbuPW4VDW5Mk-BLGh2WcUrmRBnK_-xbLkHcFAEnlzZPf7mvPG2RA76cQ-6qSia5hEggdhO2-pIirtWAJxmF3GZ3pjy0QUTDsAfiK2W8NfNHew8NMy3vEY7qjdaQpL9kbzerbH_gOSVADxnrl7sa1pYbgPZo"
                  alt="Chanderi Tissue Anarkali Ensemble"
                />
                <span className="absolute top-3 left-3 bg-[#D4AF37] text-[#1c1216] font-bold font-label-sm text-label-sm uppercase px-2.5 py-1 tracking-wider shadow-xs border border-[#F3E5AB]/40">
                  30% Privilege
                </span>
              </div>
              <div className="p-5 flex flex-col space-y-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-secondary">Atelier Tarunima</span>
                  <span className="px-1.5 py-0.5 rounded-xs bg-[#D4AF37] text-[#1C1216] text-[9px] font-bold uppercase tracking-wider font-mono shadow-2xs">
                    PRO
                  </span>
                </div>
                <h4 className="font-body-md text-body-md text-primary font-medium line-clamp-1">
                  Chanderi Tissue Anarkali Ensemble
                </h4>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-title text-title text-primary font-semibold text-lg">₹1,12,000</span>
                    <span className="font-body-sm text-body-sm text-outline line-through text-xs">₹1,60,000</span>
                  </div>
                  <button
                    aria-label="Quick Add"
                    onClick={() => handleQuickAdd("Chanderi Tissue Anarkali Ensemble", 112000, "https://lh3.googleusercontent.com/aida-public/AB6AXuBEEXBozxCT8lRFW1-31T1FYRDdmV8mJeTUZrCtZtvFPPCeRWq11WBfoeUf8C7j3cFUA1UtyOCvQauoNbuPW4VDW5Mk-BLGh2WcUrmRBnK_-xbLkHcFAEnlzZPf7mvPG2RA76cQ-6qSia5hEggdhO2-pIirtWAJxmF3GZ3pjy0QUTDsAfiK2W8NfNHew8NMy3vEY7qjdaQpL9kbzerbH_gOSVADxnrl7sa1pYbgPZo", "Atelier Tarunima")}
                    className="text-primary hover:text-secondary transition-colors cursor-pointer p-1"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Deal Card 3 */}
            <div className="group bg-surface-container-lowest flex flex-col border border-outline-variant/25 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmIzrLQ_iLPnkRyKXdzZ2736EOMZZEZrtDmWfoeuEZZZfGLxA4V-Nn72_QDSm9_dbAlnCITbKp9aOss42H0yOm8fRZ0vBeNyiYJagJmA3FIPrGt60X-PMmvLX3RLRv-ZoZvTo8LmHDTNpwhr95vvtkDO5qKsazUjEODJyPNp5_WAXj5_Q8aH5EP4KzpCJyK6KpXJYTqgou-oDGJSMdiYfQDraqv4dvhVhhFPCmCf4"
                  alt="Ivory Hand-Loomed Bandhgala"
                />
                <span className="absolute top-3 left-3 bg-[#D4AF37] text-[#1c1216] font-bold font-label-sm text-label-sm uppercase px-2.5 py-1 tracking-wider shadow-xs border border-[#F3E5AB]/40">
                  20% Privilege
                </span>
              </div>
              <div className="p-5 flex flex-col space-y-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-secondary">Maison Raghav</span>
                  <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#D4AF37] text-white shadow-2xs" title="Verified Atelier">
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  </span>
                </div>
                <h4 className="font-body-md text-body-md text-primary font-medium line-clamp-1">
                  Ivory Hand-Loomed Bandhgala
                </h4>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-title text-title text-primary font-semibold text-lg">₹84,000</span>
                    <span className="font-body-sm text-body-sm text-outline line-through text-xs">₹1,05,000</span>
                  </div>
                  <button
                    aria-label="Quick Add"
                    onClick={() => handleQuickAdd("Ivory Hand-Loomed Bandhgala", 84000, "https://lh3.googleusercontent.com/aida-public/AB6AXuCmIzrLQ_iLPnkRyKXdzZ2736EOMZZEZrtDmWfoeuEZZZfGLxA4V-Nn72_QDSm9_dbAlnCITbKp9aOss42H0yOm8fRZ0vBeNyiYJagJmA3FIPrGt60X-PMmvLX3RLRv-ZoZvTo8LmHDTNpwhr95vvtkDO5qKsazUjEODJyPNp5_WAXj5_Q8aH5EP4KzpCJyK6KpXJYTqgou-oDGJSMdiYfQDraqv4dvhVhhFPCmCf4", "Maison Raghav")}
                    className="text-primary hover:text-secondary transition-colors cursor-pointer p-1"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Deal Card 4 */}
            <div className="group bg-surface-container-lowest flex flex-col border border-outline-variant/25 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm1YnUmkulgV245jT3QybaO9_9F2Oow0ddSTPpOepB6Q5qHjBka-HP6OSymAbq1KpP6umPToJKOa-y6r-xkS_kwx8XywTQpmX1_JzxnSmdeHM5u4y7RrhtimPed5MoCDPG43kFLaD1lfny8G9wu9Wk-NAQd5iLffb1N_Jj0SXD1Otm4tfvdM4a5Mc6K4YCaOAIh2X3EdnK0BSe643nb8XUFxeIY6Lvq4XkNKcd6l8"
                  alt="Mulberry Silk Draped Pre-Pleated Saree"
                />
                <span className="absolute top-3 left-3 bg-[#D4AF37] text-[#1c1216] font-bold font-label-sm text-label-sm uppercase px-2.5 py-1 tracking-wider shadow-xs border border-[#F3E5AB]/40">
                  35% Privilege
                </span>
              </div>
              <div className="p-5 flex flex-col space-y-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-secondary">Devika &amp; Co.</span>
                  <span className="px-1.5 py-0.5 rounded-xs bg-[#D4AF37] text-[#1C1216] text-[9px] font-bold uppercase tracking-wider font-mono shadow-2xs">
                    PRO
                  </span>
                </div>
                <h4 className="font-body-md text-body-md text-primary font-medium line-clamp-1">
                  Mulberry Silk Draped Pre-Pleated Saree
                </h4>
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-title text-title text-primary font-semibold text-lg">₹74,500</span>
                    <span className="font-body-sm text-body-sm text-outline line-through text-xs">₹1,14,000</span>
                  </div>
                  <button
                    aria-label="Quick Add"
                    onClick={() => handleQuickAdd("Mulberry Silk Draped Pre-Pleated Saree", 74500, "https://lh3.googleusercontent.com/aida-public/AB6AXuDm1YnUmkulgV245jT3QybaO9_9F2Oow0ddSTPpOepB6Q5qHjBka-HP6OSymAbq1KpP6umPToJKOa-y6r-xkS_kwx8XywTQpmX1_JzxnSmdeHM5u4y7RrhtimPed5MoCDPG43kFLaD1lfny8G9wu9Wk-NAQd5iLffb1N_Jj0SXD1Otm4tfvdM4a5Mc6K4YCaOAIh2X3EdnK0BSe643nb8XUFxeIY6Lvq4XkNKcd6l8", "Devika & Co.")}
                    className="text-primary hover:text-secondary transition-colors cursor-pointer p-1"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEW ARRIVALS: FRESH FROM THE ATELIERS */}
      <section className="w-full bg-surface py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary">
                Autumn/Winter Runway Edit
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary mt-1 text-3xl sm:text-4xl">
                New Arrivals • Fresh from the Ateliers
              </h2>
            </div>
            <button
              onClick={() => setCustomerSection("catalog")}
              className="font-label-lg text-label-lg uppercase text-primary hover:text-secondary transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>View All 84 New Additions</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          {/* Product Grid 4 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* New Arrival 1 */}
            <div className="group flex flex-col bg-surface-container-lowest border border-outline-variant/20 shadow-xs hover:shadow-md transition-shadow">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-dim">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnRMWcP4yOvn9QTFkEAeV6Y2OZhjGEcV_wE5-2zbnzohQx9YaOdFADV43g1esiFAbDSXbIo8FBlbhGj5xkLJ9F7GMTAS6f9k_dK-DfDuWdtyVQX5iEedcyFOVYB73jSqwjFYDE5-Zg2fDLKUm5dhKiQUctyqJ6NO7CWm79OF2VZWjHYch7IrnpaZ2PBGQDOivxc0W5YPiech73SbA2khrB0cxAXkO8uLho7TxS7Jg"
                  alt="Sculpted Silk Gazar Evening Coat"
                />
                <button
                  onClick={() => handleQuickAdd("Sculpted Silk Gazar Evening Coat", 145000, "https://lh3.googleusercontent.com/aida-public/AB6AXuBnRMWcP4yOvn9QTFkEAeV6Y2OZhjGEcV_wE5-2zbnzohQx9YaOdFADV43g1esiFAbDSXbIo8FBlbhGj5xkLJ9F7GMTAS6f9k_dK-DfDuWdtyVQX5iEedcyFOVYB73jSqwjFYDE5-Zg2fDLKUm5dhKiQUctyqJ6NO7CWm79OF2VZWjHYch7IrnpaZ2PBGQDOivxc0W5YPiech73SbA2khrB0cxAXkO8uLho7TxS7Jg", "Atelier K•Soni · Paris")}
                  className="absolute bottom-0 inset-x-0 bg-primary/95 text-on-primary py-2.5 px-4 text-center font-label-md text-label-md uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-primary"
                >
                  + Quick Add to Bag
                </button>
              </div>
              <div className="p-4 flex flex-col space-y-1.5 flex-grow">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-secondary">Atelier K•Soni · Paris</span>
                  <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#D4AF37] text-white shadow-2xs" title="Verified Atelier">
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  </span>
                </div>
                <h3 className="font-body-md text-body-md text-primary font-medium line-clamp-1">Sculpted Silk Gazar Evening Coat</h3>
                <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">Fabric: 100% Wild Ahimsa Silk Gazar</span>
                <div className="pt-2 flex items-center justify-between mt-auto">
                  <span className="font-title text-title text-primary font-semibold text-lg">₹1,45,000</span>
                  <button
                    aria-label="Quick Add"
                    onClick={() => handleQuickAdd("Sculpted Silk Gazar Evening Coat", 145000, "https://lh3.googleusercontent.com/aida-public/AB6AXuBnRMWcP4yOvn9QTFkEAeV6Y2OZhjGEcV_wE5-2zbnzohQx9YaOdFADV43g1esiFAbDSXbIo8FBlbhGj5xkLJ9F7GMTAS6f9k_dK-DfDuWdtyVQX5iEedcyFOVYB73jSqwjFYDE5-Zg2fDLKUm5dhKiQUctyqJ6NO7CWm79OF2VZWjHYch7IrnpaZ2PBGQDOivxc0W5YPiech73SbA2khrB0cxAXkO8uLho7TxS7Jg", "Atelier K•Soni · Paris")}
                    className="text-primary hover:text-secondary transition-colors cursor-pointer p-1"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  </button>
                </div>
              </div>
            </div>

            {/* New Arrival 2 */}
            <div className="group flex flex-col bg-surface-container-lowest border border-outline-variant/20 shadow-xs hover:shadow-md transition-shadow">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-dim">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXEvegwuj5Lj6DZV_ldpjeYXrCnBj21hQnb66U1CQXG3jReNtqoZkh0f5mV5cCRfQoaNPMsrecp7_3yVMnBlp47QMR-9_VtIvuay2TExt2KN09oCeylHOTgL7fHLej-hhyi5olf0aV0V46b4ap-rIGuEUtZXCMPUOvaAWlPZylNwplyVBkKZAvnORNb6ynUbf5driLpQw80gMqYeB08E7hONJo1g5zN_8ONNfYo6U"
                  alt="Real Silver Zari Kadhwa Brocade"
                />
                <button
                  onClick={() => handleQuickAdd("Real Silver Zari Kadhwa Brocade", 230000, "https://lh3.googleusercontent.com/aida-public/AB6AXuBXEvegwuj5Lj6DZV_ldpjeYXrCnBj21hQnb66U1CQXG3jReNtqoZkh0f5mV5cCRfQoaNPMsrecp7_3yVMnBlp47QMR-9_VtIvuay2TExt2KN09oCeylHOTgL7fHLej-hhyi5olf0aV0V46b4ap-rIGuEUtZXCMPUOvaAWlPZylNwplyVBkKZAvnORNb6ynUbf5driLpQw80gMqYeB08E7hONJo1g5zN_8ONNfYo6U", "Varanasi Looms Guild")}
                  className="absolute bottom-0 inset-x-0 bg-primary/95 text-on-primary py-2.5 px-4 text-center font-label-md text-label-md uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-primary"
                >
                  + Quick Add to Bag
                </button>
              </div>
              <div className="p-4 flex flex-col space-y-1.5 flex-grow">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-secondary">Varanasi Looms Guild</span>
                  <span className="px-1.5 py-0.5 rounded-xs bg-[#D4AF37] text-[#1C1216] text-[9px] font-bold uppercase tracking-wider font-mono shadow-2xs">
                    PRO
                  </span>
                </div>
                <h3 className="font-body-md text-body-md text-primary font-medium line-clamp-1">Real Silver Zari Kadhwa Brocade</h3>
                <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">Craft: 180 Days Handloom Weave</span>
                <div className="pt-2 flex items-center justify-between mt-auto">
                  <span className="font-title text-title text-primary font-semibold text-lg">₹2,30,000</span>
                  <button
                    aria-label="Quick Add"
                    onClick={() => handleQuickAdd("Real Silver Zari Kadhwa Brocade", 230000, "https://lh3.googleusercontent.com/aida-public/AB6AXuBXEvegwuj5Lj6DZV_ldpjeYXrCnBj21hQnb66U1CQXG3jReNtqoZkh0f5mV5cCRfQoaNPMsrecp7_3yVMnBlp47QMR-9_VtIvuay2TExt2KN09oCeylHOTgL7fHLej-hhyi5olf0aV0V46b4ap-rIGuEUtZXCMPUOvaAWlPZylNwplyVBkKZAvnORNb6ynUbf5driLpQw80gMqYeB08E7hONJo1g5zN_8ONNfYo6U", "Varanasi Looms Guild")}
                    className="text-primary hover:text-secondary transition-colors cursor-pointer p-1"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  </button>
                </div>
              </div>
            </div>

            {/* New Arrival 3 */}
            <div className="group flex flex-col bg-surface-container-lowest border border-outline-variant/20 shadow-xs hover:shadow-md transition-shadow">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-dim">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMP3bnUby2cIq-hCjrtbXOssWo5g1Qa3w4uA2xvElDkhovIWmzns0DLi8U80Y_dy8WZt89MaeD0C2Mfjvy2UuaShd8mP97RrBxkBYxNbhnGyT2tw3b1HIrZsG2tfIm9iDs5DsiY3k7Dry-J1FfUczZjD-hhR5Qr7Bx2d_Ptml2ZlCjFWaZHc9152s5BmzkrGnjfWenbAuuEisMw56gd-51K5bs7crPbMZKRijMxkA"
                  alt="Metallic Cord Pleated Column Tunic"
                />
                <button
                  onClick={() => handleQuickAdd("Metallic Cord Pleated Column Tunic", 88000, "https://lh3.googleusercontent.com/aida-public/AB6AXuBMP3bnUby2cIq-hCjrtbXOssWo5g1Qa3w4uA2xvElDkhovIWmzns0DLi8U80Y_dy8WZt89MaeD0C2Mfjvy2UuaShd8mP97RrBxkBYxNbhnGyT2tw3b1HIrZsG2tfIm9iDs5DsiY3k7Dry-J1FfUczZjD-hhR5Qr7Bx2d_Ptml2ZlCjFWaZHc9152s5BmzkrGnjfWenbAuuEisMw56gd-51K5bs7crPbMZKRijMxkA", "House of Rimzim")}
                  className="absolute bottom-0 inset-x-0 bg-primary/95 text-on-primary py-2.5 px-4 text-center font-label-md text-label-md uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-primary"
                >
                  + Quick Add to Bag
                </button>
              </div>
              <div className="p-4 flex flex-col space-y-1.5 flex-grow">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-secondary">House of Rimzim</span>
                  <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#D4AF37] text-white shadow-2xs" title="Verified Atelier">
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  </span>
                </div>
                <h3 className="font-body-md text-body-md text-primary font-medium line-clamp-1">Metallic Cord Pleated Column Tunic</h3>
                <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">Fabric: Micro-wire and organza blend</span>
                <div className="pt-2 flex items-center justify-between mt-auto">
                  <span className="font-title text-title text-primary font-semibold text-lg">₹88,000</span>
                  <button
                    aria-label="Quick Add"
                    onClick={() => handleQuickAdd("Metallic Cord Pleated Column Tunic", 88000, "https://lh3.googleusercontent.com/aida-public/AB6AXuBMP3bnUby2cIq-hCjrtbXOssWo5g1Qa3w4uA2xvElDkhovIWmzns0DLi8U80Y_dy8WZt89MaeD0C2Mfjvy2UuaShd8mP97RrBxkBYxNbhnGyT2tw3b1HIrZsG2tfIm9iDs5DsiY3k7Dry-J1FfUczZjD-hhR5Qr7Bx2d_Ptml2ZlCjFWaZHc9152s5BmzkrGnjfWenbAuuEisMw56gd-51K5bs7crPbMZKRijMxkA", "House of Rimzim")}
                    className="text-primary hover:text-secondary transition-colors cursor-pointer p-1"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  </button>
                </div>
              </div>
            </div>

            {/* New Arrival 4 */}
            <div className="group flex flex-col bg-surface-container-lowest border border-outline-variant/20 shadow-xs hover:shadow-md transition-shadow">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-dim">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnfmfFAon5vGlSvBglQY2pjo24yoqi0fW_NyO3gC2azd7Mlhg9QJigV0dpbuk0NzsODoF9gGYR184a9SxV_rsoxiYZ_3DZnAbs5Ev-ObfstxHDaJaIwBjOG6lTYfJYcc_tQilV6LsCQBrHNBuhTRt8NFzs5L7GNvTJ6hRDzuYQ1hE4_SgQR8c_tk9mGURTAc_4lJcbYV2GK5BWOlPAj9yH6dwrBR2Xb5Z9-1Gb5dg"
                  alt="Tone-on-Tone Resham Sherwani"
                />
                <button
                  onClick={() => handleQuickAdd("Tone-on-Tone Resham Sherwani", 125000, "https://lh3.googleusercontent.com/aida-public/AB6AXuBnfmfFAon5vGlSvBglQY2pjo24yoqi0fW_NyO3gC2azd7Mlhg9QJigV0dpbuk0NzsODoF9gGYR184a9SxV_rsoxiYZ_3DZnAbs5Ev-ObfstxHDaJaIwBjOG6lTYfJYcc_tQilV6LsCQBrHNBuhTRt8NFzs5L7GNvTJ6hRDzuYQ1hE4_SgQR8c_tk9mGURTAc_4lJcbYV2GK5BWOlPAj9yH6dwrBR2Xb5Z9-1Gb5dg", "Siddharth Heritage")}
                  className="absolute bottom-0 inset-x-0 bg-primary/95 text-on-primary py-2.5 px-4 text-center font-label-md text-label-md uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-primary"
                >
                  + Quick Add to Bag
                </button>
              </div>
              <div className="p-4 flex flex-col space-y-1.5 flex-grow">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-secondary">Siddharth Heritage</span>
                  <span className="px-1.5 py-0.5 rounded-xs bg-[#D4AF37] text-[#1C1216] text-[9px] font-bold uppercase tracking-wider font-mono shadow-2xs">
                    PRO
                  </span>
                </div>
                <h3 className="font-body-md text-body-md text-primary font-medium line-clamp-1">Tone-on-Tone Resham Sherwani</h3>
                <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">Fabric: Handwoven Matka Silk</span>
                <div className="pt-2 flex items-center justify-between mt-auto">
                  <span className="font-title text-title text-primary font-semibold text-lg">₹1,25,000</span>
                  <button
                    aria-label="Quick Add"
                    onClick={() => handleQuickAdd("Tone-on-Tone Resham Sherwani", 125000, "https://lh3.googleusercontent.com/aida-public/AB6AXuBnfmfFAon5vGlSvBglQY2pjo24yoqi0fW_NyO3gC2azd7Mlhg9QJigV0dpbuk0NzsODoF9gGYR184a9SxV_rsoxiYZ_3DZnAbs5Ev-ObfstxHDaJaIwBjOG6lTYfJYcc_tQilV6LsCQBrHNBuhTRt8NFzs5L7GNvTJ6hRDzuYQ1hE4_SgQR8c_tk9mGURTAc_4lJcbYV2GK5BWOlPAj9yH6dwrBR2Xb5Z9-1Gb5dg", "Siddharth Heritage")}
                    className="text-primary hover:text-secondary transition-colors cursor-pointer p-1"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRENDING DESIGNER OUTFITS (Editorial Lookbook Vignettes) */}
      <section className="w-full bg-surface-container-lowest py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary">Curator’s Choice</span>
              <h2 className="font-headline-lg text-headline-lg text-primary mt-1 text-3xl sm:text-4xl">Trending Designer Outfits</h2>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
              Capturing salon buzz, red-carpet patrons, and international fashion weeks from Milan to Mumbai.
            </p>
          </div>

          {/* Asymmetrical Editorial Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Main Large Lookbook Feature (7 cols) */}
            <div className="lg:col-span-7 relative group min-h-[500px] overflow-hidden bg-surface-container flex flex-col justify-end p-8 lg:p-12 shadow-sm border border-outline-variant/20">
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center group-hover:scale-102 transition-transform duration-700"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDdcUv21EULlPcAjkbXW3AENsH6A6ss1VVCeF1Qjoq6N8BJQDFweD4A7Hbz274TGu2bHSOmMIOWe42_Y5Ve91NQfz_IVaW8Z9C2t0sd9So8XcUAwFgntKwsH_5tA5sgGZKsLc5aFV_zwqhrvMB89M1sDiKCuAnR3kmI9oTzYnkRwtkR4sMOa_1h0Qf4ZBYGpOixGOlhSTjAX7cOFYw-jagNOIygUUivSBcLVChQP_E")`
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent"></div>
              <div className="relative z-10 flex flex-col space-y-3">
                <span className="px-3 py-1 bg-surface-container-lowest/20 backdrop-blur-md text-tertiary-fixed font-label-sm text-label-sm uppercase tracking-widest w-fit border border-outline-variant/30">
                  Patron Most-Favorited
                </span>
                <h3 className="font-headline-md text-headline-md text-on-primary text-2xl sm:text-3xl font-serif">
                  The Sculpted Velvet &amp; Organza Cape
                </h3>
                <p className="font-body-md text-body-md text-surface-container-high/90 max-w-lg">
                  Designed by House of Ananya. Worn by international luminaries at the Venice Biennale Gala.
                </p>
                <div className="pt-2 flex items-center gap-6">
                  <span className="font-title text-title text-tertiary-fixed font-bold text-xl">₹1,85,000</span>
                  <button
                    onClick={() => onOpenCustomRequest()}
                    className="font-label-md text-label-md uppercase tracking-wider text-on-primary underline underline-offset-4 hover:text-tertiary-fixed transition-colors cursor-pointer"
                  >
                    Order Runway Piece →
                  </button>
                </div>
              </div>
            </div>

            {/* 2 Stacked Trending Cards (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-8 justify-between">
              {/* Stack 1 */}
              <div className="bg-surface-container-low p-6 flex flex-col sm:flex-row gap-6 items-center shadow-sm border border-outline-variant/20">
                <div className="w-full sm:w-36 aspect-[3/4] shrink-0 overflow-hidden bg-surface-dim">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmJK6rhW1TmkCPAX2_FK9e1fOATY_Mvi0gT-h5ta38n5U-hlJAIy-Bwdq9scl528zCZDZAUbcXJ_Eq5BbJLhk_KptSvuI80ohie_fjKea4bUQqA3VTVYqtIQI8zwS8QAcjzmKtFjsEu_rNqKPBa8pIzl4yj6xq4vFUAytjHv8NSoDUrccsUYbbl72OGB1sKaJwJ0xL2IdyEhCy4eDk42bE3jOM1ybl0nFNZD_i5h4"
                    alt="Crushed Tissue Saree with Corset"
                  />
                </div>
                <div className="flex flex-col space-y-2 flex-grow">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Trending in Milan</span>
                  <h4 className="font-headline-sm text-headline-sm text-primary text-xl font-semibold">Crushed Tissue Saree with Corset</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">House of Gaurav Gupta · Archival Edition</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-title text-title text-primary font-bold text-lg">₹1,15,000</span>
                    <button
                      onClick={() => setCustomerSection("catalog")}
                      className="font-label-sm text-label-sm uppercase text-secondary hover:text-primary transition-colors cursor-pointer"
                    >
                      Details →
                    </button>
                  </div>
                </div>
              </div>

              {/* Stack 2 */}
              <div className="bg-surface-container-low p-6 flex flex-col sm:flex-row gap-6 items-center shadow-sm border border-outline-variant/20">
                <div className="w-full sm:w-36 aspect-[3/4] shrink-0 overflow-hidden bg-surface-dim">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRDcUwaDepcGCYPOomZiS7RK_Ef_a4UULKkhMjBSFVjsUB60JarHFERZq0LXa_pU3w7LRaxyY-7Du8b9pfCQ3t66_sW597nuOWKps1cfqiG81idKecHVtqgLfc3bG_RV8PC-appVCesJJZOdFGZqGPqh5RVd6WkdLgUKv85DDlLcmM4DigmQYX9LF5WIL3crsJx71zSytAua_11sdsUuluRcOvlh2KL2D_LzRDRLE"
                    alt="Ombré Hand-Dyed Silk Trench"
                  />
                </div>
                <div className="flex flex-col space-y-2 flex-grow">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Trending in London</span>
                  <h4 className="font-headline-sm text-headline-sm text-primary text-xl font-semibold">Ombré Hand-Dyed Silk Trench</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Atelier Bodice · Sustainable Atelier</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-title text-title text-primary font-bold text-lg">₹72,000</span>
                    <button
                      onClick={() => setCustomerSection("catalog")}
                      className="font-label-sm text-label-sm uppercase text-secondary hover:text-primary transition-colors cursor-pointer"
                    >
                      Details →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ATELIER BESTSELLERS (Most Coveted Pieces with Ratings & Provenance) */}
      <section className="w-full bg-surface py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary">Hall of Fame</span>
              <h2 className="font-headline-lg text-headline-lg text-primary mt-1 text-3xl sm:text-4xl">
                Atelier Bestsellers • Most Coveted Pieces
              </h2>
            </div>
            <div className="flex items-center gap-2 font-label-md text-label-md uppercase text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px] text-primary">verified_user</span>
              <span>100% Verified Provenance &amp; Hand-Numbered</span>
            </div>
          </div>

          {/* 4 Bestseller Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Bestseller 1 */}
            <div className="group bg-surface-container-lowest flex flex-col border border-outline-variant/20 shadow-xs hover:shadow-md transition-shadow">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-dim">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuATVTDaePRyZVh25w3bMSsI6xtU3mtXoyt6LL5jaUgNAJhBCTBvJbRtJ3q_VjbYc7gCEW3t-Cc6BT4hD5u3tUVtepR6tyI6dallH11EeSzJuXSvJwXRd8G_ChPXUiFdYzbq40abSI_m-ELjKsGncUdwbHjl5UsIxlm-obqriaESwyZTfNZr_zDDW0OtyllblK6RWfK7tnVfKRjzn3zETycSYI-iw7f9dEPglWtIsQk"
                  alt="Classic Crimson Kalidar Lehenga"
                />
                <span className="absolute top-3 left-3 bg-[#D4AF37] text-[#1c1216] font-bold font-label-sm text-[10px] uppercase px-2.5 py-1 tracking-wider shadow-xs border border-[#F3E5AB]/40">
                  Bestseller
                </span>
                <button
                  onClick={() => handleQuickAdd("Classic Crimson Kalidar Lehenga", 345000, "https://lh3.googleusercontent.com/aida-public/AB6AXuATVTDaePRyZVh25w3bMSsI6xtU3mtXoyt6LL5jaUgNAJhBCTBvJbRtJ3q_VjbYc7gCEW3t-Cc6BT4hD5u3tUVtepR6tyI6dallH11EeSzJuXSvJwXRd8G_ChPXUiFdYzbq40abSI_m-ELjKsGncUdwbHjl5UsIxlm-obqriaESwyZTfNZr_zDDW0OtyllblK6RWfK7tnVfKRjzn3zETycSYI-iw7f9dEPglWtIsQk", "Sabyasachi Heritage Guild")}
                  className="absolute bottom-0 inset-x-0 bg-primary/95 text-on-primary py-2.5 px-4 text-center font-label-md text-label-md uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-primary"
                >
                  + Quick Add to Bag
                </button>
              </div>
              <div className="p-4 flex flex-col space-y-1.5 flex-grow">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-secondary">Sabyasachi Heritage Guild</span>
                  <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#D4AF37] text-white shadow-2xs" title="Verified Atelier">
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  </span>
                </div>
                <h4 className="font-body-md text-body-md text-primary font-medium line-clamp-1">Classic Crimson Kalidar Lehenga</h4>
                <div className="pt-2 flex items-center justify-between mt-auto">
                  <span className="font-title text-title text-primary font-semibold text-lg">₹3,45,000</span>
                  <button
                    aria-label="Quick Add"
                    onClick={() => handleQuickAdd("Classic Crimson Kalidar Lehenga", 345000, "https://lh3.googleusercontent.com/aida-public/AB6AXuATVTDaePRyZVh25w3bMSsI6xtU3mtXoyt6LL5jaUgNAJhBCTBvJbRtJ3q_VjbYc7gCEW3t-Cc6BT4hD5u3tUVtepR6tyI6dallH11EeSzJuXSvJwXRd8G_ChPXUiFdYzbq40abSI_m-ELjKsGncUdwbHjl5UsIxlm-obqriaESwyZTfNZr_zDDW0OtyllblK6RWfK7tnVfKRjzn3zETycSYI-iw7f9dEPglWtIsQk", "Sabyasachi Heritage Guild")}
                    className="text-primary hover:text-secondary transition-colors cursor-pointer p-1"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bestseller 2 */}
            <div className="group bg-surface-container-lowest flex flex-col border border-outline-variant/20 shadow-xs hover:shadow-md transition-shadow">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-dim">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDapuN5wgXvvjSZHApoHR23fE-EEZ06PBd6a7cTUwv-a6VKtyUHJ1KI6SxfSq4paG28_cWTWQwCUagnK6OoR7nHJVbhFey4PoCf-4G4az7mY7cPRtgNthSmOkvyRSLRs6EtbKlM9CbbL2FBOWZTaGXky-kIcG00uwYZjMLeOWTcNo0P6RmfaJpJTfZkMM4EpJWtVmvA1lGXvLVyITs7E-a80TP2OomM5EcKrZyidV4"
                  alt="Pearl Chikankari Royal Sherwani"
                />
                <span className="absolute top-3 left-3 bg-[#D4AF37] text-[#1c1216] font-bold font-label-sm text-[10px] uppercase px-2.5 py-1 tracking-wider shadow-xs border border-[#F3E5AB]/40">
                  Bestseller
                </span>
                <button
                  onClick={() => handleQuickAdd("Pearl Chikankari Royal Sherwani", 280000, "https://lh3.googleusercontent.com/aida-public/AB6AXuDapuN5wgXvvjSZHApoHR23fE-EEZ06PBd6a7cTUwv-a6VKtyUHJ1KI6SxfSq4paG28_cWTWQwCUagnK6OoR7nHJVbhFey4PoCf-4G4az7mY7cPRtgNthSmOkvyRSLRs6EtbKlM9CbbL2FBOWZTaGXky-kIcG00uwYZjMLeOWTcNo0P6RmfaJpJTfZkMM4EpJWtVmvA1lGXvLVyITs7E-a80TP2OomM5EcKrZyidV4", "Abu Jani • Sandeep Khosla")}
                  className="absolute bottom-0 inset-x-0 bg-primary/95 text-on-primary py-2.5 px-4 text-center font-label-md text-label-md uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-primary"
                >
                  + Quick Add to Bag
                </button>
              </div>
              <div className="p-4 flex flex-col space-y-1.5 flex-grow">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-secondary">Abu Jani • Sandeep Khosla</span>
                  <span className="px-1.5 py-0.5 rounded-xs bg-[#D4AF37] text-[#1C1216] text-[9px] font-bold uppercase tracking-wider font-mono shadow-2xs">
                    PRO
                  </span>
                </div>
                <h4 className="font-body-md text-body-md text-primary font-medium line-clamp-1">Pearl Chikankari Royal Sherwani</h4>
                <div className="pt-2 flex items-center justify-between mt-auto">
                  <span className="font-title text-title text-primary font-semibold text-lg">₹2,80,000</span>
                  <button
                    aria-label="Quick Add"
                    onClick={() => handleQuickAdd("Pearl Chikankari Royal Sherwani", 280000, "https://lh3.googleusercontent.com/aida-public/AB6AXuDapuN5wgXvvjSZHApoHR23fE-EEZ06PBd6a7cTUwv-a6VKtyUHJ1KI6SxfSq4paG28_cWTWQwCUagnK6OoR7nHJVbhFey4PoCf-4G4az7mY7cPRtgNthSmOkvyRSLRs6EtbKlM9CbbL2FBOWZTaGXky-kIcG00uwYZjMLeOWTcNo0P6RmfaJpJTfZkMM4EpJWtVmvA1lGXvLVyITs7E-a80TP2OomM5EcKrZyidV4", "Abu Jani • Sandeep Khosla")}
                    className="text-primary hover:text-secondary transition-colors cursor-pointer p-1"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bestseller 3 */}
            <div className="group bg-surface-container-lowest flex flex-col border border-outline-variant/20 shadow-xs hover:shadow-md transition-shadow">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-dim">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeOhXdRPY9PUuFhEiAGTR8yATh5o0DS929VqzpYPyPLXhHAIKrf0iKRLRNeRrfmn0NzSYyLu_fCls7HuIHPzr3iCleSfcv5VTUXsWHnsv8vHaKXWq7NpgON0eg5ncxje6NguG97Qb5RGwqxqvrF02_lw3zER1jTTvTs7bHi1hTXzQvAVFU0oAIY8_wQ6dFqqIMSSXAlb1zbYjCnXk3B88oTj-WiUsnBfklTF7tufk"
                  alt="Aubergine Korvai Gold Zari Saree"
                />
                <span className="absolute top-3 left-3 bg-[#D4AF37] text-[#1c1216] font-bold font-label-sm text-[10px] uppercase px-2.5 py-1 tracking-wider shadow-xs border border-[#F3E5AB]/40">
                  Bestseller
                </span>
                <button
                  onClick={() => handleQuickAdd("Aubergine Korvai Gold Zari Saree", 98000, "https://lh3.googleusercontent.com/aida-public/AB6AXuBeOhXdRPY9PUuFhEiAGTR8yATh5o0DS929VqzpYPyPLXhHAIKrf0iKRLRNeRrfmn0NzSYyLu_fCls7HuIHPzr3iCleSfcv5VTUXsWHnsv8vHaKXWq7NpgON0eg5ncxje6NguG97Qb5RGwqxqvrF02_lw3zER1jTTvTs7bHi1hTXzQvAVFU0oAIY8_wQ6dFqqIMSSXAlb1zbYjCnXk3B88oTj-WiUsnBfklTF7tufk", "The Kanjivaram Collective")}
                  className="absolute bottom-0 inset-x-0 bg-primary/95 text-on-primary py-2.5 px-4 text-center font-label-md text-label-md uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-primary"
                >
                  + Quick Add to Bag
                </button>
              </div>
              <div className="p-4 flex flex-col space-y-1.5 flex-grow">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-secondary">The Kanjivaram Collective</span>
                  <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#D4AF37] text-white shadow-2xs" title="Verified Atelier">
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  </span>
                </div>
                <h4 className="font-body-md text-body-md text-primary font-medium line-clamp-1">Aubergine Korvai Gold Zari Saree</h4>
                <div className="pt-2 flex items-center justify-between mt-auto">
                  <span className="font-title text-title text-primary font-semibold text-lg">₹98,000</span>
                  <button
                    aria-label="Quick Add"
                    onClick={() => handleQuickAdd("Aubergine Korvai Gold Zari Saree", 98000, "https://lh3.googleusercontent.com/aida-public/AB6AXuBeOhXdRPY9PUuFhEiAGTR8yATh5o0DS929VqzpYPyPLXhHAIKrf0iKRLRNeRrfmn0NzSYyLu_fCls7HuIHPzr3iCleSfcv5VTUXsWHnsv8vHaKXWq7NpgON0eg5ncxje6NguG97Qb5RGwqxqvrF02_lw3zER1jTTvTs7bHi1hTXzQvAVFU0oAIY8_wQ6dFqqIMSSXAlb1zbYjCnXk3B88oTj-WiUsnBfklTF7tufk", "The Kanjivaram Collective")}
                    className="text-primary hover:text-secondary transition-colors cursor-pointer p-1"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bestseller 4 */}
            <div className="group bg-surface-container-lowest flex flex-col border border-outline-variant/20 shadow-xs hover:shadow-md transition-shadow">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-dim">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEu_LmquthW9WgUC9J33UEMCytTWnAS7ylcL9-VRdE0RfFOpFEHnCYd1mz1aU6UiQJJNTg7uOLSOHNAL2SDLN9iWptdlAArEI7nU-kO1G0pDKe92S-zkM--gq1zWYTWF9DVdvXneQ34vNSU7OH9QzGOhgx0gM0Itsw6sGigmnO9kQeBpW_xSO8BVPlaDDBJ5AHcNho7yP07y-xw11jhPawkGaYwnpCeWTazMdGYN0"
                  alt="Molten Metallic Gown with Collar"
                />
                <span className="absolute top-3 left-3 bg-[#D4AF37] text-[#1c1216] font-bold font-label-sm text-[10px] uppercase px-2.5 py-1 tracking-wider shadow-xs border border-[#F3E5AB]/40">
                  Bestseller
                </span>
                <button
                  onClick={() => handleQuickAdd("Molten Metallic Gown with Collar", 210000, "https://lh3.googleusercontent.com/aida-public/AB6AXuBEu_LmquthW9WgUC9J33UEMCytTWnAS7ylcL9-VRdE0RfFOpFEHnCYd1mz1aU6UiQJJNTg7uOLSOHNAL2SDLN9iWptdlAArEI7nU-kO1G0pDKe92S-zkM--gq1zWYTWF9DVdvXneQ34vNSU7OH9QzGOhgx0gM0Itsw6sGigmnO9kQeBpW_xSO8BVPlaDDBJ5AHcNho7yP07y-xw11jhPawkGaYwnpCeWTazMdGYN0", "Sculpted Couture Paris")}
                  className="absolute bottom-0 inset-x-0 bg-primary/95 text-on-primary py-2.5 px-4 text-center font-label-md text-label-md uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-primary"
                >
                  + Quick Add to Bag
                </button>
              </div>
              <div className="p-4 flex flex-col space-y-1.5 flex-grow">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-secondary">Sculpted Couture Paris</span>
                  <span className="px-1.5 py-0.5 rounded-xs bg-[#D4AF37] text-[#1C1216] text-[9px] font-bold uppercase tracking-wider font-mono shadow-2xs">
                    PRO
                  </span>
                </div>
                <h4 className="font-body-md text-body-md text-primary font-medium line-clamp-1">Molten Metallic Gown with Collar</h4>
                <div className="pt-2 flex items-center justify-between mt-auto">
                  <span className="font-title text-title text-primary font-semibold text-lg">₹2,10,000</span>
                  <button
                    aria-label="Quick Add"
                    onClick={() => handleQuickAdd("Molten Metallic Gown with Collar", 210000, "https://lh3.googleusercontent.com/aida-public/AB6AXuBEu_LmquthW9WgUC9J33UEMCytTWnAS7ylcL9-VRdE0RfFOpFEHnCYd1mz1aU6UiQJJNTg7uOLSOHNAL2SDLN9iWptdlAArEI7nU-kO1G0pDKe92S-zkM--gq1zWYTWF9DVdvXneQ34vNSU7OH9QzGOhgx0gM0Itsw6sGigmnO9kQeBpW_xSO8BVPlaDDBJ5AHcNho7yP07y-xw11jhPawkGaYwnpCeWTazMdGYN0", "Sculpted Couture Paris")}
                    className="text-primary hover:text-secondary transition-colors cursor-pointer p-1"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. MADE FOR YOU / CUSTOM FASHION (Luxury Bespoke Banner) */}
      <section className="w-full bg-primary-container text-on-primary py-24 relative overflow-hidden" style={{ backgroundColor: "#542333" }}>
        {/* Ambient Backdrop Texture */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none"></div>
        <div className="absolute left-10 top-10 w-72 h-72 rounded-full bg-tertiary-fixed/10 blur-2xl pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Editorial Content */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm uppercase tracking-widest font-semibold text-[#251a09]">
                  Bespoke Haute Commission
                </span>
                <span className="text-surface-container-high/70 font-label-sm text-label-sm uppercase tracking-wider">
                  Direct Atelier Guild
                </span>
              </div>
              <h2 className="font-display text-display text-on-primary font-normal leading-[1.1] text-3xl sm:text-5xl">
                Made For You: Commission Your Private Atelier Piece
              </h2>
              <p className="font-body-lg text-body-lg text-surface-container-high font-light max-w-xl">
                Collaborate directly with India and Paris’s most revered master cutters. Reinterpret archival runway creations, alter hand-embroidery palettes, or draft a bespoke silhouette sculpted solely for your proportions.
              </p>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="flex flex-col space-y-1.5 border-l border-tertiary-fixed/30 pl-4">
                  <span className="material-symbols-outlined text-tertiary-fixed text-[24px]">auto_awesome</span>
                  <span className="font-label-lg text-label-lg text-on-primary uppercase mt-1 font-semibold">AI Personal Wardrobe Stylist</span>
                  <span className="font-body-sm text-body-sm text-surface-container-high/80">
                    Your private intelligent stylist and master drafter, curating bespoke archival silhouettes and translating your imagination directly into custom atelier garments.
                  </span>
                </div>
                <div className="flex flex-col space-y-1.5 border-l border-tertiary-fixed/30 pl-4">
                  <span className="material-symbols-outlined text-tertiary-fixed text-[24px]">verified_user</span>
                  <span className="font-label-lg text-label-lg text-on-primary uppercase mt-1 font-semibold">Direct Artisan Escrow</span>
                  <span className="font-body-sm text-body-sm text-surface-container-high/80">
                    Payments held securely until final physical fitting approval and provenance audit.
                  </span>
                </div>
                <div className="flex flex-col space-y-1.5 border-l border-tertiary-fixed/30 pl-4">
                  <span className="material-symbols-outlined text-tertiary-fixed text-[24px]">straighten</span>
                  <span className="font-label-lg text-label-lg text-on-primary uppercase mt-1 font-semibold">Made-to-Measure Fit</span>
                  <span className="font-body-sm text-body-sm text-surface-container-high/80">
                    Complementary second fitting with round-trip white-glove atelier alterations.
                  </span>
                </div>
              </div>

              <div className="pt-6 flex flex-wrap items-center gap-5">
                <button
                  onClick={() => onOpenCustomRequest()}
                  className="h-[52px] px-10 bg-surface-container-lowest text-primary font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-center hover:bg-surface-container-low transition-colors shadow-sm font-semibold cursor-pointer"
                >
                  Custom Order
                </button>
                <button
                  onClick={() => {
                    setSelectedProductId(null);
                    setCustomerSection("uvibe");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="h-[52px] px-8 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] text-[#1C1216] font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-center hover:brightness-110 transition-all font-bold shadow-md cursor-pointer gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                  Imagination to Your Wardrobe
                </button>
              </div>
            </div>

            {/* Right: Artisan At Work Vignette */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[4/5] bg-surface overflow-hidden shadow-2xl border border-outline-variant/30">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNqkr6sawkrMldNVER5-uSx6EtxGjuOxTFVLSuVVGX08EBme2zI4uQJxEe2kaVMvXgCLt_wY7CFF93jCaBcuOt1WW4NjQzm2r584JSAbnTpLqUOiH2diSkPsOBnRZRU5W-7cocwa5DNeu0YkYl_NDUzQ2q285EmZ-vn66VSPit8QSkEukzaYGzVSGRcuRgp4Ok6mh23NDTz22N4GV_IcrweY0ybhDbL835YjK_Ym0"
                  alt="Master tailor at work in atelier"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. METALLIC GOLD FOIL FOOTER */}
      <footer
        className="w-full relative overflow-hidden text-[#251508] border-t border-[#b8860b]/40 shadow-2xl"
        style={{
          background: "linear-gradient(135deg, rgb(252, 246, 186) 0%, rgb(212, 175, 55) 20%, rgb(170, 119, 28) 45%, rgb(255, 217, 125) 65%, rgb(191, 149, 63) 85%, rgb(146, 101, 20) 100%)"
        }}
      >
        <style jsx>{`
          @keyframes goldGleamSweep {
            0% { transform: translateX(-120%) skewX(-20deg); }
            50% { transform: translateX(180%) skewX(-20deg); }
            100% { transform: translateX(180%) skewX(-20deg); }
          }
          .gold-shimmer-plate::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 60%;
            height: 100%;
            background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.45) 50%, transparent 100%);
            pointer-events: none;
            animation: goldGleamSweep 6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
        `}</style>

        {/* Subtle radiant surface sheen overlay & specular shimmer */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/15 pointer-events-none"></div>
        <div className="absolute inset-0 gold-shimmer-plate pointer-events-none overflow-hidden"></div>
        {/* Top edge bevel specular line */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none"></div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 pt-20 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-4 flex flex-col space-y-4">
              <div className="flex flex-col">
                <span className="font-headline-md text-headline-md text-[#2a0e1a] tracking-tight uppercase font-serif drop-shadow-xs text-2xl font-bold">
                  Maison Privée
                </span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#5c3710] font-semibold -mt-1">
                  Haute Designer Collective
                </span>
              </div>
              <p className="font-body-md text-body-md text-[#3a220f] max-w-sm font-medium leading-relaxed">
                An elevated convergence of exceptional ateliers, archival couture, and commissioned wardrobe pieces. Preserving the reverence of high-fashion craft with verified provenance.
              </p>
            </div>

            <div className="lg:col-span-2 flex flex-col space-y-4">
              <span className="font-label-lg text-label-lg uppercase tracking-wider text-[#2a0e1a] font-bold">Curated Salons</span>
              <div className="flex flex-col space-y-2.5 font-body-sm text-body-sm text-[#3a220f] font-medium">
                <button onClick={() => setCustomerSection("catalog")} className="text-left hover:text-[#1a0810] hover:underline underline-offset-4 transition-all">Haute Couture</button>
                <button onClick={() => setCustomerSection("catalog")} className="text-left hover:text-[#1a0810] hover:underline underline-offset-4 transition-all">Prêt-à-Porter</button>
                <button onClick={() => setCustomerSection("catalog")} className="text-left hover:text-[#1a0810] hover:underline underline-offset-4 transition-all">Bespoke Bridal</button>
                <button onClick={() => setCustomerSection("catalog")} className="text-left hover:text-[#1a0810] hover:underline underline-offset-4 transition-all">Archival Vault</button>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col space-y-4">
              <span className="font-label-lg text-label-lg uppercase tracking-wider text-[#2a0e1a] font-bold">Concierge</span>
              <div className="flex flex-col space-y-2.5 font-body-sm text-body-sm text-[#3a220f] font-medium">
                <button onClick={() => onOpenCustomRequest()} className="text-left hover:text-[#1a0810] hover:underline underline-offset-4 transition-all">Private Suite VIP</button>
                <button onClick={() => onOpenCustomRequest()} className="text-left hover:text-[#1a0810] hover:underline underline-offset-4 transition-all">Atelier Inquiries</button>
                <button onClick={() => setCustomerSection("catalog")} className="text-left hover:text-[#1a0810] hover:underline underline-offset-4 transition-all">Authenticity Guarantee</button>
                <button onClick={() => onOpenCustomRequest()} className="text-left hover:text-[#1a0810] hover:underline underline-offset-4 transition-all">Global White-Glove Care</button>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col space-y-4">
              <span className="font-label-lg text-label-lg uppercase tracking-wider text-[#2a0e1a] font-bold">The Gazette Newsletter</span>
              <p className="font-body-sm text-body-sm text-[#3a220f] font-medium">
                Receive exclusive private viewings, designer salon invites, and archival releases directly to your folio.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 pt-1">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your correspondence..."
                  required
                  className="flex-1 h-12 bg-white/90 backdrop-blur-sm px-4 font-body-sm text-body-sm text-[#2a0e1a] placeholder:text-[#6e533d] focus:outline-none focus:bg-white transition-all rounded-none border border-[#7c4d15]/50 shadow-inner"
                />
                <button
                  type="submit"
                  className="h-12 px-7 bg-[#3a0e1e] text-[#fbf5b7] font-label-lg text-label-lg uppercase tracking-wider hover:bg-[#542333] transition-all rounded-none shrink-0 shadow-md border border-[#ffd97d]/30 font-semibold cursor-pointer"
                >
                  Join
                </button>
              </form>
              {newsletterSubscribed && (
                <span className="text-xs text-[#2a0e1a] font-semibold">Subscribed to private correspondence.</span>
              )}
            </div>
          </div>

          <div className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#7c4d15]/25">
            <p className="font-body-sm text-body-sm text-[#3a220f] font-medium">© 2025 Maison Privée. All Rights Reserved.</p>
            <div className="flex items-center gap-6 font-label-sm text-label-sm uppercase tracking-wider text-[#3a220f] font-semibold">
              <button onClick={() => showToast("Maison Privée Privacy Policy - Verified Provenance Protection")} className="hover:text-[#1a0810] transition-colors cursor-pointer">Privacy Policy</button>
              <button onClick={() => showToast("Maison Privée Terms of Service - Haute Collective Standards")} className="hover:text-[#1a0810] transition-colors cursor-pointer">Terms of Service</button>
              <button onClick={() => showToast("Provenance & Verification Guaranteed for All Patrons")} className="hover:text-[#1a0810] transition-colors cursor-pointer">Provenance &amp; Verification</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
