"use client";

import React, { memo } from "react";

interface DesignerBrand {
  id: string;
  name: string;
  location: string;
  discipline: string;
  icon: React.ReactNode;
}

const DESIGNER_BRANDS: DesignerBrand[] = [
  {
    id: "mariana-voss",
    name: "MARIANA VOSS",
    location: "PARIS",
    discipline: "HAUTE COUTURE",
    icon: (
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-[#F5DFC3] group-hover:text-white transition-colors drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="18" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
        <circle cx="20" cy="20" r="15" strokeWidth="1" />
        <path d="M12 25 L16 15 L20 22 L24 15 L28 25" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 25 L20 17 L24 25" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 8.5 L20.8 10.7 L23 11.5 L20.8 12.3 L20 14.5 L19.2 12.3 L17 11.5 L19.2 10.7 Z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "rohit-balaji",
    name: "ROHIT BALAJI",
    location: "NEW DELHI",
    discipline: "ROYAL COUTURE",
    icon: (
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-[#F5DFC3] group-hover:text-white transition-colors drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path d="M20 7 C21 13 27 15 27 20 C27 25 23 28 20 29 C17 28 13 25 13 20 C13 15 19 13 20 7 Z" strokeWidth="1.3" />
        <path d="M20 14 C23 18 29 20 31 24 C29 26 25 27 22 26" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M20 14 C17 18 11 20 9 24 C11 26 15 27 18 26" strokeWidth="1.1" strokeLinecap="round" />
        <circle cx="20" cy="33" r="1.5" fill="currentColor" stroke="none" />
        <line x1="8" y1="33" x2="32" y2="33" strokeWidth="0.8" opacity="0.7" />
      </svg>
    ),
  },
  {
    id: "maison-privee",
    name: "MAISON PRIVÉE",
    location: "PLACE VENDÔME",
    discipline: "PARIS NO. 12",
    icon: (
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-[#F5DFC3] group-hover:text-white transition-colors drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <polygon points="20,4 32,8 36,20 32,32 20,36 8,32 4,20 8,8" strokeWidth="1.1" />
        <polygon points="20,8 29,11 32,20 29,29 20,32 11,29 8,20 11,11" strokeWidth="0.7" opacity="0.6" />
        <path d="M20 12 L21.5 17.5 L27 19 L21.5 20.5 L20 26 L18.5 20.5 L13 19 L18.5 17.5 Z" fill="currentColor" stroke="none" opacity="0.9" />
      </svg>
    ),
  },
  {
    id: "atelier-tarunima",
    name: "ATELIER TARUNIMA",
    location: "MILANO",
    discipline: "SARTORIAL DRAPING",
    icon: (
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-[#F5DFC3] group-hover:text-white transition-colors drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path d="M10 20 C10 14 16 12 20 18 C24 24 30 22 30 17 C30 12 23 10 20 14" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M30 20 C30 26 24 28 20 22 C16 16 10 18 10 23 C10 28 17 30 20 26" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="20" cy="20" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "adarsh-couture",
    name: "ADARSH PRIVÉE",
    location: "MUMBAI",
    discipline: "HERITAGE ARCHIVE",
    icon: (
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-[#F5DFC3] group-hover:text-white transition-colors drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path d="M12 32 V19 C12 14.5 15.5 11 20 11 C24.5 11 28 14.5 28 19 V32" strokeWidth="1.3" />
        <path d="M16 32 V20 C16 17.8 17.8 16 20 16 C22.2 16 24 17.8 24 20 V32" strokeWidth="0.9" opacity="0.7" />
        <line x1="8" y1="32" x2="32" y2="32" strokeWidth="1.4" />
        <polygon points="20,5 22,9 18,9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "prathamesh-atelier",
    name: "PRATHAMESH",
    location: "LONDON",
    discipline: "MASTER TAILORING",
    icon: (
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-[#F5DFC3] group-hover:text-white transition-colors drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path d="M20 6 L31 11 V20 C31 27 26 32 20 35 C14 32 9 27 9 20 V11 Z" strokeWidth="1.1" />
        <line x1="15" y1="15" x2="25" y2="25" strokeWidth="1.3" strokeLinecap="round" />
        <line x1="25" y1="15" x2="15" y2="25" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="15" cy="15" r="1.5" />
        <circle cx="25" cy="15" r="1.5" />
      </svg>
    ),
  },
  {
    id: "maison-singhal",
    name: "MAISON SINGHAL",
    location: "GENÈVE",
    discipline: "BRODERIE FINE",
    icon: (
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-[#F5DFC3] group-hover:text-white transition-colors drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]"
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="11" strokeWidth="1.1" />
        <circle cx="20" cy="20" r="6" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
        <circle cx="20" cy="20" r="2.5" fill="currentColor" stroke="none" />
        <line x1="20" y1="5" x2="20" y2="7.5" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="20" y1="32.5" x2="20" y2="35" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="5" y1="20" x2="7.5" y2="20" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="32.5" y1="20" x2="35" y2="20" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="9.4" y1="9.4" x2="11.2" y2="11.2" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="28.8" y1="28.8" x2="30.6" y2="30.6" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="9.4" y1="30.6" x2="11.2" y2="28.8" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="28.8" y1="11.2" x2="30.6" y2="9.4" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

// Duplicate brands array to guarantee a seamless, infinite right-to-left marquee loop
const MARQUEE_ITEMS = [...DESIGNER_BRANDS, ...DESIGNER_BRANDS];

export const DesignerLogosMarquee: React.FC = memo(function DesignerLogosMarquee() {
  return (
    <div
      className="relative w-full overflow-hidden bg-[#46151E] border-y-[1.5px] border-[#C59347]/80 border-x-0 rounded-none shadow-[0_22px_45px_-22px_rgba(70,21,30,0.55)] select-none group"
      style={{
        backgroundColor: "#46151E",
      }}
    >
      {/* Top & Bottom Subdued Gold Accent Edge Highlights */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />

      {/* Haute Atelier Provenance Eyebrow */}
      <div className="pt-3.5 pb-1 px-6 text-center">
        <div className="inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
          <span className="text-[8.5px] sm:text-[9.5px] tracking-[0.28em] uppercase text-[#E8D2B7] font-sans font-medium">
            FEATURED DESIGNER ATELIERS • HAUTE COUTURE GUILD
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
        </div>
      </div>

      {/* Infinite Marquee Track: Constant Right-to-Left Moderate Motion */}
      <div className="relative py-4 sm:py-5 overflow-hidden">
        {/* Left & Right Smooth Feather Vignette Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#46151E] via-[#46151E]/95 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#46151E] via-[#46151E]/95 to-transparent z-10 pointer-events-none" />

        <div
          className="flex items-center animate-marquee hover:[animation-play-state:paused] cursor-pointer"
          style={{
            animationDuration: "32s",
          }}
        >
          {MARQUEE_ITEMS.map((brand, idx) => (
            <div
              key={`${brand.id}-${idx}`}
              className="inline-flex items-center shrink-0 group/item mx-6 sm:mx-10 transition-transform duration-300 hover:scale-[1.04]"
            >
              {/* Crest Icon & Typography Pair */}
              <div className="flex items-center gap-3 sm:gap-3.5">
                <div className="p-1.5 rounded-full bg-white/[0.04] border border-[#D4AF37]/35 group-hover/item:border-[#D4AF37]/90 group-hover/item:bg-white/[0.09] transition-all duration-300 shadow-sm">
                  {brand.icon}
                </div>

                <div className="flex flex-col text-left">
                  <span
                    className="text-[13.5px] sm:text-[15.5px] text-[#FAF4EC] font-normal tracking-[0.22em] group-hover/item:text-[#FFF4E4] transition-colors font-prata leading-tight whitespace-nowrap drop-shadow-sm"
                    style={{
                      fontFamily: "var(--font-prata), 'Prata', Georgia, serif",
                    }}
                  >
                    {brand.name}
                  </span>
                  <span className="text-[7.5px] sm:text-[8.5px] tracking-[0.26em] text-[#DFC8B2]/85 group-hover/item:text-[#FAF4EC] uppercase font-sans font-light mt-0.5 whitespace-nowrap">
                    {brand.location} <span className="opacity-40">•</span> {brand.discipline}
                  </span>
                </div>
              </div>

              {/* Four-Point Diamond Star Separator Between Logos */}
              <div className="ml-12 sm:ml-20 text-[#D4AF37]/50 flex items-center justify-center">
                <svg
                  className="w-2.5 h-2.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default DesignerLogosMarquee;
