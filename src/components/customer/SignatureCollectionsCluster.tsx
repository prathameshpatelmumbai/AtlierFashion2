"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, Layers, LayoutGrid } from "lucide-react";
import { useStudio } from "@/context/StudioContext";

const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === "production" ? "/AtlierFashion2" : "");

const asset = (path: string) => `${BASE_PATH}${path}`;

export interface SignatureCardItem {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  cardImage: string;
  targetSection: "catalog" | "custom-orders" | "uvibe";
  filterCategory?: string;
  searchTag?: string;
  ctaText: string;
  provenanceCode: string;
  theme: {
    border: string;
    shadow: string;
    hoverGlow: string;
    shimmerColor: string;
  };
}

export const SIGNATURE_DISCIPLINES: SignatureCardItem[] = [
  {
    id: "sig-limited-editions",
    number: "01",
    eyebrow: "01 • LIMITED SILHOUETTES • VAULT 01",
    title: "Limited Editions",
    description: "Rare, small-batch designs made in strictly limited runs.",
    cardImage: "/images/signature_cards/card-limited-editions.png",
    targetSection: "catalog",
    filterCategory: "Bridal & Heritage Lehengas",
    searchTag: "Limited Edition",
    ctaText: "EXPLORE AND THE VAULT",
    provenanceCode: "DISCOVER MORE",
    theme: {
      border: "rgba(197, 147, 71, 0.75)",
      shadow: "0 20px 45px -12px rgba(6, 27, 17, 0.65)",
      hoverGlow: "rgba(34, 197, 94, 0.4)",
      shimmerColor: "rgba(246, 223, 196, 0.35)",
    },
  },
  {
    id: "sig-handcrafted",
    number: "02",
    eyebrow: "02 • MASTER ARTISANS • 150+ HRS",
    title: "Handcrafted",
    description: "Handcrafted intricate, artisan-made pieces built with meticulous detail.",
    cardImage: "/images/signature_cards/card-handcrafted.png",
    targetSection: "catalog",
    filterCategory: "Royal Sherwanis & Bandhgalas",
    searchTag: "Handcrafted",
    ctaText: "VIEW ARTISANAL ATELIER",
    provenanceCode: "DISCOVER MORE",
    theme: {
      border: "rgba(197, 147, 71, 0.75)",
      shadow: "0 20px 45px -12px rgba(6, 19, 38, 0.65)",
      hoverGlow: "rgba(59, 130, 246, 0.4)",
      shimmerColor: "rgba(246, 223, 196, 0.35)",
    },
  },
  {
    id: "sig-inspired-arts",
    number: "03",
    eyebrow: "03 • RUNWAY REIMAGINED • ARCHITECTURAL",
    title: "Inspired Arts",
    description: "High-fashion and celebrity-inspired looks, reimagined for everyday accessibility.",
    cardImage: "/images/signature_cards/card-inspired-arts.png",
    targetSection: "catalog",
    filterCategory: "Couture & Gowns",
    searchTag: "Inspired Arts",
    ctaText: "DISCOVER INSPIRED LOOKS",
    provenanceCode: "DISCOVER MORE",
    theme: {
      border: "rgba(197, 147, 71, 0.75)",
      shadow: "0 20px 45px -12px rgba(27, 5, 21, 0.65)",
      hoverGlow: "rgba(168, 85, 247, 0.4)",
      shimmerColor: "rgba(246, 223, 196, 0.35)",
    },
  },
  {
    id: "sig-made-to-order",
    number: "04",
    eyebrow: "04 • BESPOKE CONFECTION • YOURS",
    title: "Made to Order",
    description: "Bespoke, personalised fashion tailored specifically for your needs.",
    cardImage: "/images/signature_cards/card-made-to-order.png",
    targetSection: "custom-orders",
    searchTag: "Bespoke",
    ctaText: "EXPLORE BESPOKE STYLING",
    provenanceCode: "DISCOVER MORE",
    theme: {
      border: "rgba(197, 147, 71, 0.75)",
      shadow: "0 20px 45px -12px rgba(41, 6, 13, 0.65)",
      hoverGlow: "rgba(239, 68, 68, 0.4)",
      shimmerColor: "rgba(246, 223, 196, 0.35)",
    },
  },
  {
    id: "sig-upcycled",
    number: "05",
    eyebrow: "05 • OCCASION COUTURE • 360° DRESS",
    title: "Unveiled",
    description: "Distinctive every time, crafted from acclaimed and reputed materials.",
    cardImage: "/images/signature_cards/card-upcycled.png",
    targetSection: "catalog",
    filterCategory: "Luxury Prêt & Coordinates",
    searchTag: "Upcycled",
    ctaText: "EXPLORE COLLECTION",
    provenanceCode: "DISCOVER MORE",
    theme: {
      border: "rgba(197, 147, 71, 0.75)",
      shadow: "0 20px 45px -12px rgba(4, 29, 27, 0.65)",
      hoverGlow: "rgba(20, 184, 166, 0.4)",
      shimmerColor: "rgba(246, 223, 196, 0.35)",
    },
  },
  {
    id: "sig-organic-collections",
    number: "06",
    eyebrow: "06 • PLEXI BY MISHA • ARTS + ALL",
    title: "Organic Collections",
    description: "Refined, minimal, and versatile with conscious choice.",
    cardImage: "/images/signature_cards/card-organic-collections.png",
    targetSection: "catalog",
    filterCategory: "Contemporary Indo-Western Couture",
    searchTag: "Organic",
    ctaText: "EXPLORE CONSCIOUS",
    provenanceCode: "DISCOVER MORE",
    theme: {
      border: "rgba(197, 147, 71, 0.75)",
      shadow: "0 20px 45px -12px rgba(61, 36, 9, 0.65)",
      hoverGlow: "rgba(234, 179, 8, 0.4)",
      shimmerColor: "rgba(246, 223, 196, 0.35)",
    },
  },
];

// Progressive 3D Deck Clustered Offsets (Tilted fan stack matching user reference image)
const CLUSTER_POSITIONS = [
  { rotate: -13, x: -175, y: 18, z: 10, scale: 0.94, zIndex: 1 },
  { rotate: -7.5, x: -105, y: 5, z: 20, scale: 0.96, zIndex: 2 },
  { rotate: -2, x: -35, y: -8, z: 30, scale: 0.98, zIndex: 3 },
  { rotate: 3.5, x: 35, y: -4, z: 40, scale: 1.0, zIndex: 4 },
  { rotate: 9, x: 105, y: 12, z: 50, scale: 0.97, zIndex: 5 },
  { rotate: 15, x: 175, y: 26, z: 60, scale: 0.94, zIndex: 6 },
];

export default function SignatureCollectionsCluster() {
  const { setCustomerSection, setActiveCategoryFilter, setActiveCollectionFilter } = useStudio();
  const [isHovered, setIsHovered] = useState(false);
  const [isLockedOpen, setIsLockedOpen] = useState(false);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mouse tilt tracking state for 3D card tilt
  const [tilt, setTilt] = useState<{ [key: string]: { rotateX: number; rotateY: number } }>({});

  const isExpanded = isHovered || isLockedOpen;

  const handleMouseEnterStage = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeaveStage = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      setActiveCardId(null);
    }, 380); // Smooth debounce so card transitions feel calm and continuous
  };

  const handleCardClick = (card: SignatureCardItem) => {
    // Set collection filter for the clicked card and navigate to catalog
    setActiveCollectionFilter(card.title);
    setActiveCategoryFilter(null);
    setCustomerSection("catalog");

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Velvet-smooth gentle tilt (max 4.5 degrees)
    const rotateX = ((y - centerY) / centerY) * -4.5;
    const rotateY = ((x - centerX) / centerX) * 4.5;
    setTilt((prev) => ({ ...prev, [id]: { rotateX, rotateY } }));
  };

  const handleMouseLeave = (id: string) => {
    setTilt((prev) => ({ ...prev, [id]: { rotateX: 0, rotateY: 0 } }));
  };

  return (
    <section id="signature-collections" className="relative py-2 sm:py-4">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
            <p className="text-[8.5px] tracking-[0.24em] uppercase text-[#8A6D63] font-sans">
              CURATED DISCIPLINES • HAUTE COUTURE ATELIER
            </p>
          </div>
          <h2
            className="text-[28px] sm:text-[34px] text-[#321218] font-normal leading-tight font-prata"
            style={{
              fontFamily: "var(--font-prata), 'Prata', Georgia, serif",
            }}
          >
            Signature Collections
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <p className="text-[10.5px] leading-[1.6] text-[#6B4F4B] max-w-[320px] font-sans hidden sm:block">
            Six pillars of sartorial discipline, each hand-tailored without compromise and attested by sealed provenance.
          </p>

          {/* Interactive Mode Pill Button */}
          <button
            type="button"
            onClick={() => setIsLockedOpen((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] tracking-[0.16em] uppercase font-sans font-medium transition-all duration-300 border border-[#C59347]/50 hover:border-[#C59347] bg-[#FAF3EB] hover:bg-white text-[#3E161F] shadow-sm cursor-pointer"
            title={isLockedOpen ? "Click to enable hover cluster fold" : "Click to lock grid view open"}
          >
            {isExpanded ? (
              <>
                <Layers className="w-3 h-3 text-[#A07026]" />
                <span>FOLD CLUSTER</span>
              </>
            ) : (
              <>
                <LayoutGrid className="w-3 h-3 text-[#A07026]" />
                <span>UNFOLD GRID</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive Hint Banner (Visible when clustered) */}
      <div className="text-center mb-3">
        <span className="inline-flex items-center gap-2 text-[9px] tracking-[0.22em] uppercase font-sans text-[#8C6D63]/85 transition-opacity duration-300">
          <Sparkles className="w-3 h-3 text-[#C59347] animate-pulse" />
          {isExpanded
            ? "CLICK ANY DISCIPLINE CARD TO ENTER COLLECTION"
            : "HOVER OVER THE 3D CLUSTER TO UNROLL CARDS INTO GRID"}
        </span>
      </div>

      {/* 3D Showcase Stage Container */}
      <motion.div
        layout
        onMouseEnter={handleMouseEnterStage}
        onMouseLeave={handleMouseLeaveStage}
        className="relative w-full"
        style={{
          perspective: 1400,
        }}
      >
        {/* Dynamic Clustered 3D Fan Deck (When not hovered) vs Separated Row-and-Column Grid (When hovered) */}
        {!isExpanded ? (
          /* ============================================================== */
          /* 1. CLUSTERED 3D DECK VIEW (Matching User Reference Image)      */
          /* ============================================================== */
          <motion.div
            layout
            transition={{
              type: "spring",
              stiffness: 68,
              damping: 17,
              mass: 1.15,
            }}
            className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] flex items-center justify-center overflow-visible select-none py-6"
          >
            <div className="relative w-full max-w-[780px] h-[240px] sm:h-[280px] flex items-center justify-center">
              {SIGNATURE_DISCIPLINES.map((card, idx) => {
                const pos = CLUSTER_POSITIONS[idx];
                const isCardActive = activeCardId === card.id;

                return (
                  <motion.div
                    key={card.id}
                    layoutId={`signature-card-${card.id}`}
                    onClick={() => {
                      setIsLockedOpen(true);
                      handleCardClick(card);
                    }}
                    onMouseEnter={() => setActiveCardId(card.id)}
                    initial={false}
                    animate={{
                      rotateZ: isCardActive ? pos.rotate * 0.65 : pos.rotate,
                      x: isCardActive ? pos.x * 1.05 : pos.x,
                      y: isCardActive ? pos.y - 18 : pos.y,
                      scale: isCardActive ? 1.07 : pos.scale,
                      zIndex: isCardActive ? 40 : pos.zIndex,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 68,
                      damping: 17,
                      mass: 1.15,
                      delay: isCardActive ? 0 : (5 - idx) * 0.035,
                    }}
                    className="absolute w-[280px] sm:w-[330px] md:w-[360px] aspect-[1200/840] rounded-[8px] cursor-pointer select-none overflow-hidden"
                    style={{
                      boxShadow: isCardActive
                        ? `0 32px 64px -14px rgba(0, 0, 0, 0.8), 0 0 35px ${card.theme.hoverGlow}, 0 0 1px 1px ${card.theme.border}`
                        : `${card.theme.shadow}, 0 0 1px 1px ${card.theme.border}`,
                      transformStyle: "preserve-3d",
                      transition: "box-shadow 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    <img
                      src={asset(card.cardImage)}
                      alt={card.title}
                      className="w-full h-full object-cover block pointer-events-none select-none drop-shadow-sm transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04]"
                    />

                    {/* Subtle Shimmer Sheen on Hover */}
                    <div
                      className="absolute -inset-full w-[250%] h-[250%] pointer-events-none opacity-0 hover:opacity-100 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] -rotate-45 translate-x-[-20%] hover:translate-x-[20%]"
                      style={{
                        background: `linear-gradient(90deg, transparent 40%, ${card.theme.shimmerColor} 50%, transparent 60%)`,
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* ============================================================== */
          /* 2. UNFOLDED ROW & COLUMN GRID VIEW (Interactive 3×2 Layout)     */
          /* ============================================================== */
          <motion.div
            layout
            transition={{
              type: "spring",
              stiffness: 68,
              damping: 17,
              mass: 1.15,
            }}
            className="w-full max-w-[1180px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 py-2"
          >
            {SIGNATURE_DISCIPLINES.map((card, idx) => {
              const cardTilt = tilt[card.id] || { rotateX: 0, rotateY: 0 };

              return (
                <motion.div
                  key={card.id}
                  layoutId={`signature-card-${card.id}`}
                  initial={false}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotateZ: 0,
                    x: 0,
                    y: 0,
                    rotateX: cardTilt.rotateX,
                    rotateY: cardTilt.rotateY,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 68,
                    damping: 17,
                    mass: 1.15,
                    delay: idx * 0.055,
                  }}
                  onClick={() => handleCardClick(card)}
                  onMouseMove={(e) => handleMouseMove(e, card.id)}
                  onMouseLeave={() => handleMouseLeave(card.id)}
                  className="group relative rounded-[8px] aspect-[1200/840] cursor-pointer select-none overflow-hidden"
                  style={{
                    boxShadow: `${card.theme.shadow}, 0 0 1px 1px ${card.theme.border}`,
                    transformStyle: "preserve-3d",
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.035,
                    boxShadow: `0 34px 68px -14px rgba(0, 0, 0, 0.75), 0 0 35px ${card.theme.hoverGlow}, 0 0 0 1px ${card.theme.border}`,
                    transition: {
                      duration: 0.65,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }}
                  whileTap={{
                    scale: 0.99,
                    transition: { duration: 0.2 },
                  }}
                >
                  <img
                    src={asset(card.cardImage)}
                    alt={card.title}
                    className="w-full h-full object-cover block pointer-events-none select-none transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045] group-hover:brightness-105"
                  />

                  {/* Hidden screen-reader description */}
                  <span className="sr-only">
                    {card.title} - {card.description}
                  </span>

                  {/* Dynamic Shimmer Light Flare Sweep on Hover */}
                  <div
                    className="absolute -inset-full w-[250%] h-[250%] pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] -rotate-45 translate-x-[-25%] group-hover:translate-x-[25%]"
                    style={{
                      background: `linear-gradient(90deg, transparent 40%, ${card.theme.shimmerColor} 50%, transparent 60%)`,
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
