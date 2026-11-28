"use client";

import React from "react";

const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === "production" ? "/AtlierFashion2" : "");

const asset = (path: string) => `${BASE_PATH}${path}`;

export interface AltierLogoProps {
  className?: string;
  variant?: "horizontal" | "stacked" | "emblem" | "wordmark";
  theme?: "dark" | "light"; // dark = for dark headers (burgundy/black); light = for light ivory backgrounds
  height?: number | string;
}

export const StytellLogo: React.FC<AltierLogoProps> = ({
  className = "",
  variant = "horizontal",
  theme = "dark",
  height = 34,
}) => {
  const numericHeight = typeof height === "number" ? height : undefined;

  // Single S+T Monogram Emblem
  if (variant === "emblem") {
    return (
      <div
        className={`inline-flex items-center justify-center select-none transition-transform duration-300 hover:scale-105 ${className}`}
        style={{ height }}
      >
        <img
          src={asset("/images/stytell-monogram.png")}
          alt="STYTELL Monogram"
          className="h-full w-auto object-contain"
          draggable={false}
        />
      </div>
    );
  }

  // Wordmark only
  if (variant === "wordmark") {
    return (
      <div
        className={`inline-flex items-center select-none ${className}`}
        style={{ height }}
      >
        <img
          src={asset("/images/stytell-wordmark.png")}
          alt="STYTELL"
          className="h-full w-auto object-contain"
          draggable={false}
        />
      </div>
    );
  }

  // Stacked vertical variant: ideal for splash, hero, large center badges
  if (variant === "stacked") {
    return (
      <div
        className={`inline-flex items-center justify-center select-none group cursor-pointer ${className}`}
        style={{ height: height ?? 56 }}
      >
        <img
          src={asset("/images/stytell-logo.png")}
          alt="STYTELL"
          className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          draggable={false}
        />
      </div>
    );
  }

  // Default: "horizontal" luxury navbar lockup (Monogram left + STYTELL wordmark right)
  return (
    <div
      className={`inline-flex items-center select-none group cursor-pointer ${className}`}
      style={{ height: height ?? 34 }}
    >
      <img
        src={asset("/images/stytell-horizontal.png")}
        alt="STYTELL"
        className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
        draggable={false}
      />
    </div>
  );
};

export const AltierLogo = StytellLogo;
