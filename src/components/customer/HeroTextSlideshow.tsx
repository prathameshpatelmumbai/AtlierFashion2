"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useStudio } from "@/context/StudioContext";

export interface HeroTextSlideItem {
  id: string;
  badge: string;
  header: string; // CINTARINI FONT
  title: string;  // PRATA FONT
  description: string; // OUTFIT FONT
  primaryCta: {
    label: string;
    action: "signature" | "catalog" | "custom-orders" | "uvibe";
  };
  secondaryCta: {
    label: string;
    action: "lookbook";
  };
}

export const HERO_TEXT_SLIDES: HeroTextSlideItem[] = [
  {
    id: "slide-1",
    badge: "ARCHIVAL VAULT RELEASE • 01",
    header: "Atelier Maison Privée",
    title: "Where Art Meets Attire.",
    description:
      "A collective of exceptional designers, distinctive creations and timeless expressions of personal style.",
    primaryCta: {
      label: "EXPLORE COLLECTION",
      action: "signature",
    },
    secondaryCta: {
      label: "VIEW LOOKBOOK",
      action: "lookbook",
    },
  },
  {
    id: "slide-2",
    badge: "EXCLUSIVE CURATION • 02",
    header: "Cocreated with you",
    title: "Explore Our Exclusive Collections",
    description:
      "Uncover exceptional designs, artistic inspirations and creations made to leave an impression.",
    primaryCta: {
      label: "EXPLORE COLLECTIONS",
      action: "catalog",
    },
    secondaryCta: {
      label: "VIEW LOOKBOOK",
      action: "lookbook",
    },
  },
  {
    id: "slide-3",
    badge: "BESPOKE COMMISSIONS • 03",
    header: "Your Vision, Our Craft",
    title: "Customizations Made Around Your Imagination.",
    description:
      "Describe your dream outfit, connect with talented designers, choose your favourite and place your personalised order.",
    primaryCta: {
      label: "PLACE YOUR CUSTOM ORDER",
      action: "custom-orders",
    },
    secondaryCta: {
      label: "VIEW LOOKBOOK",
      action: "lookbook",
    },
  },
  {
    id: "slide-4",
    badge: "AI NEURAL SYNTHESIS • 04",
    header: "Your Style, Your Vibe...",
    title: "Dream it, upload it, wear it",
    description:
      "Describe your dream look in words or upload a reference. Let Uvibe bring your fashion vision to life.",
    primaryCta: {
      label: "EXPERIENCE UVIBE",
      action: "uvibe",
    },
    secondaryCta: {
      label: "VIEW LOOKBOOK",
      action: "lookbook",
    },
  },
];

interface HeroTextSlideshowProps {
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  onOpenLookbook: () => void;
}

export default function HeroTextSlideshow({
  currentIndex,
  onSelectIndex,
  onOpenLookbook,
}: HeroTextSlideshowProps) {
  const { setCustomerSection } = useStudio();

  const handleCta = (action: string) => {
    if (action === "lookbook") {
      onOpenLookbook();
    } else if (action === "signature") {
      const el = document.getElementById("signature-collections");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        setCustomerSection("catalog");
      }
    } else if (action === "catalog") {
      setCustomerSection("catalog");
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    } else if (action === "custom-orders") {
      setCustomerSection("custom-orders");
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    } else if (action === "uvibe") {
      setCustomerSection("uvibe");
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    }
  };

  return (
    <div className="relative w-full min-h-[380px] sm:min-h-[420px] md:min-h-[450px] lg:min-h-[480px] flex flex-col justify-center select-none">
      {/* 4 Synchronized Text Slides with Same 1.1s Smooth Crossfade as Model Photos */}
      {HERO_TEXT_SLIDES.map((slide, idx) => {
        const isActive = idx === currentIndex;

        return (
          <div
            key={slide.id}
            className="absolute inset-0 w-full h-full flex flex-col items-start justify-center text-left will-change-[opacity,transform]"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive
                ? "translateY(0px) scale(1)"
                : "translateY(14px) scale(0.985)",
              zIndex: isActive ? 20 : 10,
              pointerEvents: isActive ? "auto" : "none",
              transition:
                "opacity 1.1s cubic-bezier(0.4, 0, 0.2, 1), transform 1.1s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* 1. HEADER in CINTARINI FONT (Single-line Luxury Editorial Scale with Generous Spacing) */}
            <div
              className="text-[26px] sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[46px] leading-[1.15] text-[#EAD6B8] mb-5 sm:mb-6 md:mb-7 drop-shadow-[0_2px_14px_rgba(234,214,184,0.32)] tracking-[0.01em] font-cintarini whitespace-nowrap"
              style={{
                fontFamily:
                  "var(--font-cintarini), 'Cintarini', cursive, serif",
              }}
            >
              {slide.header}
            </div>

            {/* 2. TITLE in PRATA FONT (Refined smaller elegant size) */}
            <h1
              className="text-[22px] sm:text-[25px] md:text-[28px] lg:text-[32px] xl:text-[36px] leading-[1.18] text-[#FBF4EC] font-normal tracking-[-0.015em] mb-3.5 drop-shadow-md font-prata max-w-[540px]"
              style={{
                fontFamily: "var(--font-prata), 'Prata', Georgia, serif",
              }}
            >
              {slide.title}
            </h1>

            {/* 4. COMMON / REGULAR TEXT in OUTFIT FONT */}
            <p
              className="text-[12px] sm:text-[13px] md:text-[13.5px] leading-[1.68] text-[#DFC9BE] max-w-[420px] font-light mb-7 font-outfit"
              style={{
                fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
              }}
            >
              {slide.description}
            </p>

            {/* 5. CTA BUTTONS */}
            <div className="flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => handleCta(slide.primaryCta.action)}
                className="px-6 py-2.5 border border-[#D9BFA8]/70 hover:border-[#FBF4EC] bg-[#360E15]/50 hover:bg-[#FBF4EC]/10 text-[#FAF4EC] text-[9.5px] tracking-[0.22em] uppercase rounded-[2px] transition-[background-color,border-color,transform] duration-300 cursor-pointer shadow-sm hover:scale-[1.02] flex items-center gap-1.5"
                style={{
                  fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
                }}
              >
                <span>{slide.primaryCta.label}</span>
                <ArrowUpRight className="w-3 h-3 text-[#EAD6B8]" />
              </button>

              <button
                type="button"
                onClick={() => handleCta(slide.secondaryCta.action)}
                className="px-7 py-2.5 bg-[#FAF3EB] hover:bg-white text-[#3F1219] text-[9.5px] tracking-[0.22em] uppercase font-semibold rounded-[2px] shadow-sm transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                style={{
                  fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
                }}
              >
                {slide.secondaryCta.label}
              </button>
            </div>
          </div>
        );
      })}

      {/* Synchronized 4-Slide Indicator Dots with Progress Glow */}
      <div className="absolute -bottom-6 sm:-bottom-8 left-0 z-30 flex items-center gap-2">
        {HERO_TEXT_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => onSelectIndex(idx)}
              className="group py-1 cursor-pointer focus:outline-none flex items-center gap-1.5"
              aria-label={`Slide ${idx + 1}: ${slide.header}`}
            >
              <span
                className={`block rounded-full transition-all duration-500 ${
                  isActive
                    ? "w-8 h-1.5 bg-gradient-to-r from-[#EAC576] to-[#FAF2E8] shadow-[0_0_10px_rgba(234,197,118,0.8)]"
                    : "w-2 h-1.5 bg-[#FAF2E8]/35 group-hover:bg-[#FAF2E8]/65"
                }`}
              />
              <span
                className={`text-[9px] font-sans transition-opacity duration-300 ${
                  isActive ? "text-[#EAC576] font-medium opacity-100" : "text-[#E5CFC2]/40 opacity-0 group-hover:opacity-100"
                }`}
              >
                0{idx + 1}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
