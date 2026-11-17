"use client";

import React, { useEffect, useState } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const asset = (path: string) => `${BASE_PATH}${path}`;

export interface HeroModelItem {
  id: "boy" | "girl" | "emerald" | "groom" | "kid" | "bride" | string;
  title: string;
  subtitle: string;
  webpSrc: string;
  pngSrc: string;
  alt: string;
}

export const HERO_MODELS: HeroModelItem[] = [
  {
    id: "boy",
    title: "Midnight Plum Embroidered Velvet Jacket",
    subtitle: "Archival Zari Embroidery Atelier Masterpiece",
    webpSrc: "/images/salon/hero-model-boy.webp",
    pngSrc: "/images/salon/hero-model-boy.png",
    alt: "Midnight Plum Hand-Embroidered Velvet Couture Blazer"
  },
  {
    id: "groom",
    title: "Royal Ivory Raw Silk Sherwani",
    subtitle: "Hand-Embroidered Zari & Pearls",
    webpSrc: "/images/salon/hero-model-groom.webp",
    pngSrc: "/images/salon/hero-model-groom.png",
    alt: "Royal Ivory Raw Silk Sherwani with Zari & Pearl Mala"
  },
  {
    id: "kid",
    title: "Junior Heritage Couture",
    subtitle: "Hand-Embroidered Zardozi Bomber",
    webpSrc: "/images/salon/hero-model-kid.webp",
    pngSrc: "/images/salon/hero-model-kid.png",
    alt: "Junior Heritage Couture Hand-Embroidered Velvet & Silk"
  },
  {
    id: "bride",
    title: "Imperial Wine Zardozi Lehenga",
    subtitle: "Private Vault Bridal Masterpiece",
    webpSrc: "/images/salon/hero-model-bride.webp",
    pngSrc: "/images/salon/hero-model-bride.png",
    alt: "Imperial Wine Zardozi Velvet Lehenga with Scalloped Dupatta"
  }
];

export default function HeroModelSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 4-second slideshow interval with smooth photo fade-off transition
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_MODELS.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative z-20 w-[435px] sm:w-[525px] md:w-[580px] lg:w-[725px] xl:w-[795px] max-w-none h-auto select-none mb-1 sm:mb-2 flex items-end justify-center pointer-events-auto"
      style={{
        aspectRatio: "1800 / 1630"
      }}
    >
      {/* Silky Seamless Photo Fade-Off Crossfade Stack */}
      {HERO_MODELS.map((item, idx) => {
        const isActive = idx === currentIndex;
        return (
          <div
            key={item.id}
            className="absolute inset-0 w-full h-full flex items-end justify-center pointer-events-none will-change-[opacity]"
            style={{
              opacity: isActive ? 1 : 0,
              zIndex: isActive ? 20 : 10,
              transition: "opacity 1.1s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
          >
            <picture className="w-full h-full block">
              <source srcSet={asset(item.webpSrc)} type="image/webp" />
              <img
                src={asset(item.pngSrc)}
                alt={item.alt}
                className="w-full h-full object-contain object-bottom block pointer-events-none drop-shadow-[0_0_16px_rgba(54,13,20,0.28)]"
                loading="eager"
                decoding="async"
              />
            </picture>
          </div>
        );
      })}

      {/* Subtle Haute Couture Model Indicator / Progress Dots */}
      <div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A0B0E]/65 backdrop-blur-md border border-[#E5CFC2]/25 shadow-lg pointer-events-auto opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300"
        title="Atelier Haute Couture Silhouette Showcase"
      >
        {HERO_MODELS.map((item, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className="relative py-1 px-0.5 group focus:outline-none cursor-pointer"
              aria-label={`View ${item.title}`}
            >
              <span
                className={`block rounded-full transition-all duration-500 ${
                  isActive
                    ? "w-6 h-1.5 bg-gradient-to-r from-[#EAC576] to-[#FAF2E8] shadow-[0_0_8px_rgba(234,197,118,0.7)]"
                    : "w-1.5 h-1.5 bg-[#FAF2E8]/40 hover:bg-[#FAF2E8]/70"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
