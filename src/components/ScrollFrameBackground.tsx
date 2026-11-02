"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, Film } from "lucide-react";

const FRAME_COUNT = 120;

/**
 * ScrollFrameBackground
 * High-performance, scroll-driven frame-by-frame video background.
 * Renders on a fixed HTML5 Canvas layer behind page content.
 */
export const ScrollFrameBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // References to keep animation loop decoupled from React state renders
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);
  const isReducedMotionRef = useRef<boolean>(false);
  const isAutoPlayingRef = useRef<boolean>(false);

  // Interactive UI state for HUD
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState<boolean>(false);

  // Helper to format frame path
  const getFrameUrl = useCallback((index: number) => {
    const frameNum = String(index + 1).padStart(4, "0");
    return `/frames/frame_${frameNum}.webp`;
  }, []);

  // Core drawing method: draws a single frame with "object-fit: cover"
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Ensure canvas has valid dimensions
    if (canvas.width === 0 || canvas.height === 0) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor((window.innerHeight - 135) * dpr);
    }

    // Pick closest available image
    let img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Look backward first
      for (let i = frameIndex; i >= 0; i--) {
        const candidate = imagesRef.current[i];
        if (candidate && candidate.complete && candidate.naturalWidth > 0) {
          img = candidate;
          break;
        }
      }
      // If none backward, look forward
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let i = frameIndex + 1; i < FRAME_COUNT; i++) {
          const candidate = imagesRef.current[i];
          if (candidate && candidate.complete && candidate.naturalWidth > 0) {
            img = candidate;
            break;
          }
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;

    // Object-fit: cover calculations
    const hRatio = width / img.naturalWidth;
    const vRatio = height / img.naturalHeight;
    const ratio = Math.max(hRatio, vRatio);

    const renderW = img.naturalWidth * ratio;
    const renderH = img.naturalHeight * ratio;
    const offsetX = (width - renderW) / 2;
    const offsetY = (height - renderH) / 2;

    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, offsetX, offsetY, renderW, renderH);
    lastDrawnFrameRef.current = frameIndex;
  }, []);

  useEffect(() => {
    // 1. Check for reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    isReducedMotionRef.current = mediaQuery.matches;
    const handleMotion = (e: MediaQueryListEvent) => {
      isReducedMotionRef.current = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotion);

    // 2. Mobile stride optimization
    const isMobile = window.innerWidth < 768;
    const stride = isMobile ? 2 : 1;

    imagesRef.current = new Array(FRAME_COUNT).fill(null);

    // 3. Size canvas immediately
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const w = Math.floor(rect.width || window.innerWidth);
      const h = Math.floor(rect.height || (window.innerHeight - 135));

      canvas.width = w * dpr;
      canvas.height = h * dpr;

      const current = Math.round(currentFrameRef.current);
      drawFrame(current);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // 4. Preload frame 0 with immediate paint
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    imagesRef.current[0] = firstImg;
    if (firstImg.complete) {
      drawFrame(0);
    } else {
      firstImg.onload = () => {
        drawFrame(0);
      };
    }

    // 5. Preload all remaining frames in background
    let loaded = 1;
    const total = Math.ceil(FRAME_COUNT / stride);

    for (let i = 0; i < FRAME_COUNT; i += stride) {
      if (i === 0) continue;
      const img = new Image();
      img.src = getFrameUrl(i);
      imagesRef.current[i] = img;

      img.onload = () => {
        loaded++;
        const pct = Math.round((loaded / total) * 100);
        setLoadProgress(pct);

        if (loaded >= total) {
          setIsFullyLoaded(true);
        }

        // If newly loaded frame matches current position, paint it
        const current = Math.round(currentFrameRef.current);
        if (Math.abs(current - i) <= 1) {
          drawFrame(current);
        }
      };

      img.onerror = () => {
        loaded++;
      };
    }

    // 6. Scroll listener mapping scroll progress [0..1] to [0..FRAME_COUNT-1]
    const handleScroll = () => {
      if (isReducedMotionRef.current || isAutoPlayingRef.current) return;

      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? Math.min(Math.max(scrollY / scrollHeight, 0), 1) : 0;

      targetFrameRef.current = progress * (FRAME_COUNT - 1);

      // Subtle 3D scale (1.00 -> 1.06) and translateY parallax
      if (containerRef.current) {
        const scale = 1.0 + progress * 0.05;
        const translateY = progress * -10;
        containerRef.current.style.transform = `scale(${scale.toFixed(4)}) translateY(${translateY.toFixed(2)}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // 7. RequestAnimationFrame smoothing loop
    let lastHUDUpdate = 0;
    const animate = (timestamp: number) => {
      // Handle Auto Play mode if triggered
      if (isAutoPlayingRef.current) {
        targetFrameRef.current = (targetFrameRef.current + 0.35) % (FRAME_COUNT - 1);
      }

      if (!isReducedMotionRef.current) {
        const target = targetFrameRef.current;
        const current = currentFrameRef.current;
        const diff = target - current;

        if (Math.abs(diff) > 0.01) {
          currentFrameRef.current += diff * 0.14; // smooth lerp
        } else {
          currentFrameRef.current = target;
        }

        const rounded = Math.round(currentFrameRef.current);
        const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, rounded));

        if (clamped !== lastDrawnFrameRef.current) {
          drawFrame(clamped);
        }

        // Throttle React state update for HUD to ~10 times per second
        if (timestamp - lastHUDUpdate > 100) {
          setCurrentFrameDisplay(clamped + 1);
          lastHUDUpdate = timestamp;
        }
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resizeCanvas);
      mediaQuery.removeEventListener("change", handleMotion);
    };
  }, [drawFrame, getFrameUrl]);

  // Toggle Auto Play
  const toggleAutoPlay = () => {
    isAutoPlayingRef.current = !isAutoPlayingRef.current;
    setIsAutoPlaying(isAutoPlayingRef.current);
  };

  // Manual scrub slider handler
  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value) - 1;
    targetFrameRef.current = val;
    currentFrameRef.current = val;
    drawFrame(val);
    setCurrentFrameDisplay(val + 1);
  };

  return (
    <>
      {/* Fixed background canvas layer behind all content */}
      <div
        ref={containerRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 right-0 bottom-0 overflow-hidden origin-center"
        style={{
          top: "var(--header-offset, 135px)",
          zIndex: 0,
          willChange: "transform",
        }}
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full block"
          style={{
            backgroundColor: "#FFF7F9"
          }}
        />

        {/* Soft atmospheric gradient wash ensuring content contrast */}
        <div 
          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#FFF7F9]/80 via-transparent to-transparent opacity-30" 
        />
      </div>

      {/* Floating Haute Runway HUD & Motion Controller */}
      <div 
        className="fixed bottom-6 right-6 z-50 pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#231820]/90 text-[#FFF7F9] backdrop-blur-md border border-[#D4AF37]/50 shadow-2xl transition-all hover:bg-[#231820]"
        title="Atelier Haute Couture Runway Scrub Controller"
      >
        {/* Film / Indicator Icon */}
        <div className="flex items-center gap-2 pr-2 border-r border-[#E8D2B7]/30">
          <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-[10px] tracking-widest uppercase font-semibold text-[#F6DFC4] hidden sm:inline">
            Runway
          </span>
          <span className="font-mono text-[11px] font-bold text-[#D4AF37]">
            {String(currentFrameDisplay).padStart(3, "0")}/{FRAME_COUNT}
          </span>
        </div>

        {/* Scrub Slider */}
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="1"
            max={FRAME_COUNT}
            value={currentFrameDisplay}
            onChange={handleScrubberChange}
            className="w-20 sm:w-28 h-1 bg-[#542333] accent-[#D4AF37] rounded-lg cursor-pointer"
            title="Scrub Runway Motion"
          />
        </div>

        {/* Auto Play / Pause Button */}
        <button
          onClick={toggleAutoPlay}
          className="p-1.5 rounded-full bg-[#542333] hover:bg-[#3A0E1E] text-[#D4AF37] transition-all border border-[#D4AF37]/40 shadow-xs flex items-center justify-center cursor-pointer"
          title={isAutoPlaying ? "Pause Runway Film" : "Play Runway Film"}
        >
          {isAutoPlaying ? (
            <Pause className="w-3 h-3 fill-current" />
          ) : (
            <Play className="w-3 h-3 fill-current ml-0.5" />
          )}
        </button>

        {/* Loading Progress indicator */}
        {!isFullyLoaded && (
          <span className="text-[9px] text-[#E8D2B7]/70 font-mono hidden md:inline">
            {loadProgress}%
          </span>
        )}
      </div>
    </>
  );
};
