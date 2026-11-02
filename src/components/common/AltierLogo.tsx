"use client";

import React from "react";

interface AltierLogoProps {
  className?: string;
  variant?: "horizontal" | "stacked" | "emblem" | "wordmark";
  theme?: "dark" | "light"; // dark = for dark headers (burgundy/black); light = for light ivory backgrounds
  height?: number | string;
}

export const AltierLogo: React.FC<AltierLogoProps> = ({
  className = "",
  variant = "horizontal",
  theme = "dark",
  height = 36,
}) => {
  const isLight = theme === "light";

  // Gradient ID prefixes to prevent DOM collisions
  const goldGradientId = isLight ? "altierGoldLight" : "altierGoldDark";
  const goldSoftGradientId = isLight ? "altierGoldSoftLight" : "altierGoldSoftDark";

  const EmblemSVG = (
    <svg 
      viewBox="0 0 60 60" 
      className="h-full w-auto overflow-visible select-none shrink-0"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={goldGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isLight ? "#9A6D2D" : "#CA9E5A"} />
          <stop offset="25%" stopColor={isLight ? "#FDF3CD" : "#FFF7DB"} />
          <stop offset="50%" stopColor={isLight ? "#B88E35" : "#D4AF37"} />
          <stop offset="75%" stopColor={isLight ? "#F8E7B4" : "#FFF2CB"} />
          <stop offset="100%" stopColor={isLight ? "#7A5016" : "#A67A33"} />
        </linearGradient>

        <linearGradient id={goldSoftGradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={isLight ? "#8A5C1F" : "#B38738"} />
          <stop offset="50%" stopColor={isLight ? "#D8AC56" : "#EAD292"} />
          <stop offset="100%" stopColor={isLight ? "#F7E6BA" : "#FFF8E0"} />
        </linearGradient>
      </defs>

      {/* Outer Diamond Framework */}
      <path 
        d="M30 4 L56 30 L30 56 L4 30 Z" 
        stroke={`url(#${goldGradientId})`} 
        strokeWidth="1.5" 
        fill="none" 
        className="opacity-90"
      />
      
      {/* Concentric Inner Geometric Diamond */}
      <path 
        d="M30 9 L51 30 L30 51 L9 30 Z" 
        stroke={`url(#${goldSoftGradientId})`} 
        strokeWidth="0.8" 
        strokeDasharray="2.5 2.5"
        fill="none" 
        className="opacity-60"
      />

      {/* Stylized Haute Couture 'A' Monogram Legs */}
      <path 
        d="M30 14 L18 45" 
        stroke={`url(#${goldGradientId})`} 
        strokeWidth="2.8" 
        strokeLinecap="round"
      />
      <path 
        d="M30 14 L42 45" 
        stroke={`url(#${goldGradientId})`} 
        strokeWidth="2.8" 
        strokeLinecap="round"
      />
      
      {/* Needle & Thread Crossbar Curves */}
      <path 
        d="M20 34 C25 30.5, 35 30.5, 40 34" 
        stroke={`url(#${goldGradientId})`} 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      <path 
        d="M17 37 C24 40.5, 36 40.5, 43 37" 
        stroke={`url(#${goldSoftGradientId})`} 
        strokeWidth="1.2" 
        strokeLinecap="round"
        className="opacity-90"
      />

      {/* Crown Atelier Four-Point Star Sparkle */}
      <g transform="translate(30, 14)">
        <circle cx="0" cy="0" r="2" fill={`url(#${goldGradientId})`} />
        <path d="M0 -6 L0 6 M-6 0 L6 0" stroke={`url(#${goldGradientId})`} strokeWidth="1" opacity="0.85" />
      </g>

      {/* Base Drop Facet */}
      <polygon points="30,49 32.5,52 30,55.5 27.5,52" fill={`url(#${goldGradientId})`} />
    </svg>
  );

  if (variant === "emblem") {
    return (
      <div 
        className={`inline-flex items-center justify-center transition-transform duration-300 hover:scale-105 ${className}`}
        style={{ height }}
      >
        {EmblemSVG}
      </div>
    );
  }

  if (variant === "wordmark") {
    return (
      <div className={`flex flex-col select-none ${className}`}>
        <span 
          className="font-editorial tracking-[0.24em] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF0BE] to-[#AA771C]"
          style={{ fontSize: typeof height === "number" ? `${height * 0.75}px` : height }}
        >
          ALTIER
        </span>
        <span className="text-[9px] font-sans font-semibold tracking-[0.42em] text-[#D4AF37]/90 -mt-0.5 uppercase">
          Maison Privée
        </span>
      </div>
    );
  }

  if (variant === "stacked") {
    return (
      <div className={`flex flex-col items-center text-center gap-2 select-none group ${className}`}>
        <div style={{ height: typeof height === "number" ? height : 48 }} className="transition-transform duration-500 group-hover:scale-105">
          {EmblemSVG}
        </div>
        <div className="flex flex-col items-center">
          <span className="font-editorial text-2xl tracking-[0.26em] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF0BE] to-[#AA771C]">
            ALTIER
          </span>
          <span className="text-[9px] font-sans font-semibold tracking-[0.42em] text-[#D4AF37]/90 uppercase mt-0.5">
            Maison Privée • Paris
          </span>
        </div>
      </div>
    );
  }

  // Default: "horizontal"
  return (
    <div 
      className={`inline-flex items-center gap-3.5 select-none group cursor-pointer ${className}`}
      style={{ height }}
    >
      <div className="h-full py-0.5 transition-transform duration-500 group-hover:scale-105">
        {EmblemSVG}
      </div>
      <div className="flex flex-col justify-center text-left">
        <span className="font-editorial text-xl sm:text-2xl tracking-[0.24em] leading-none font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#E5C378] via-[#FFF5D6] to-[#C49746] drop-shadow-xs group-hover:from-[#FFF5D6] group-hover:to-[#E5C378] transition-all">
          ALTIER
        </span>
        <span className="text-[8px] sm:text-[9px] font-sans font-semibold tracking-[0.38em] text-[#D4AF37]/90 uppercase mt-1 leading-none">
          Maison Privée
        </span>
      </div>
    </div>
  );
};

