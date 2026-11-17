"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Luminous blooming magnolia botanical spray behind Hero model
 * Hand-drawn gold leaf-and-blossom line art with translucent petal highlights
 */
export const HeroMagnoliaSpray: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    viewBox="0 0 340 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="magnoliaGoldGrad" x1="40" y1="20" x2="300" y2="480" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF2D6" stopOpacity="0.95" />
        <stop offset="40%" stopColor="#E2BE88" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#A47C46" stopOpacity="0.45" />
      </linearGradient>
      <radialGradient id="magnoliaPetalGlow" cx="50%" cy="38%" r="60%">
        <stop offset="0%" stopColor="#FFF9EE" stopOpacity="0.32" />
        <stop offset="100%" stopColor="#E5C797" stopOpacity="0.04" />
      </radialGradient>
    </defs>

    {/* Graceful curving central stem */}
    <path
      d="M175 490 C168 410, 184 340, 172 270 C160 210, 170 150, 182 95"
      stroke="url(#magnoliaGoldGrad)"
      strokeWidth="1.6"
      strokeLinecap="round"
    />

    {/* Secondary side branches */}
    <path
      d="M172 270 C140 252, 110 220, 95 180"
      stroke="url(#magnoliaGoldGrad)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M176 345 C208 330, 245 305, 265 265"
      stroke="url(#magnoliaGoldGrad)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />

    {/* Top Full Magnolia Bloom */}
    <g stroke="url(#magnoliaGoldGrad)" strokeWidth="1.25" strokeLinejoin="round">
      <path
        d="M182 95 C146 76, 122 42, 140 16 C156 10, 178 38, 182 95 Z"
        fill="url(#magnoliaPetalGlow)"
      />
      <path
        d="M182 95 C222 80, 248 48, 238 18 C222 10, 196 42, 182 95 Z"
        fill="url(#magnoliaPetalGlow)"
      />
      <path
        d="M182 95 C164 54, 166 12, 188 2 C206 14, 204 58, 182 95 Z"
        fill="url(#magnoliaPetalGlow)"
      />
      {/* Cupped inner petals */}
      <path
        d="M182 95 C158 86, 144 66, 156 50 C172 52, 180 74, 182 95 Z"
        fill="url(#magnoliaPetalGlow)"
      />
      <path
        d="M182 95 C208 88, 224 66, 212 48 C198 52, 188 74, 182 95 Z"
        fill="url(#magnoliaPetalGlow)"
      />
      {/* Fine petal ribs */}
      <path d="M182 95 C184 62, 186 32, 188 12" strokeOpacity="0.55" strokeWidth="0.8" />
      <path d="M182 95 C164 70, 152 46, 145 28" strokeOpacity="0.5" strokeWidth="0.75" />
      <path d="M182 95 C202 70, 218 46, 228 28" strokeOpacity="0.5" strokeWidth="0.75" />
      {/* Sparkling stamen buds */}
      <circle cx="184" cy="68" r="3.2" fill="#FFF8EB" fillOpacity="0.8" stroke="none" />
      <circle cx="178" cy="74" r="1.8" fill="#F4DEAF" fillOpacity="0.9" stroke="none" />
      <circle cx="190" cy="73" r="1.8" fill="#F4DEAF" fillOpacity="0.9" stroke="none" />
    </g>

    {/* Mid Leaves on left branch */}
    <g stroke="url(#magnoliaGoldGrad)" strokeWidth="1.15">
      <path
        d="M95 180 C62 170, 36 144, 40 114 C60 112, 85 138, 95 180 Z"
        fill="url(#magnoliaPetalGlow)"
      />
      <path d="M95 180 C74 154, 58 136, 46 122" strokeOpacity="0.55" strokeWidth="0.75" />
      <path
        d="M110 200 C138 186, 154 162, 150 140 C134 140, 118 165, 110 200 Z"
        fill="url(#magnoliaPetalGlow)"
      />
    </g>

    {/* Mid Leaves on right branch */}
    <g stroke="url(#magnoliaGoldGrad)" strokeWidth="1.15">
      <path
        d="M265 265 C295 252, 318 226, 312 196 C290 196, 268 224, 265 265 Z"
        fill="url(#magnoliaPetalGlow)"
      />
      <path d="M265 265 C284 238, 298 218, 306 204" strokeOpacity="0.55" strokeWidth="0.75" />
      <path
        d="M235 285 C212 272, 198 250, 202 230 C218 230, 230 252, 235 285 Z"
        fill="url(#magnoliaPetalGlow)"
      />
    </g>

    {/* Lower Bud Blossom */}
    <g stroke="url(#magnoliaGoldGrad)" strokeWidth="1.1">
      <path
        d="M172 375 C146 360, 128 335, 134 314 C150 314, 166 340, 172 375 Z"
        fill="url(#magnoliaPetalGlow)"
      />
      <path
        d="M174 415 C202 402, 224 378, 218 355 C202 355, 185 380, 174 415 Z"
        fill="url(#magnoliaPetalGlow)"
      />
    </g>
  </svg>
);

/**
 * Continuous Left Silk Drapery Curtain
 * Hugs the left margin of the screen with undulating 3D satin folds and sketched botanical lines
 */
export const LeftSilkMarginCurtain: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg
      viewBox="0 0 160 1800"
      fill="none"
      preserveAspectRatio="none"
      className="w-full h-full block"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Soft satin fabric gradient with highlights and fold shadows */}
        <linearGradient id="leftSilkMain" x1="0" y1="0" x2="160" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EFE3D5" stopOpacity="0.9" />
          <stop offset="28%" stopColor="#FBF4EB" stopOpacity="0.95" />
          <stop offset="58%" stopColor="#E3CDBC" stopOpacity="0.75" />
          <stop offset="85%" stopColor="#F9F1E6" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FAF2E8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="leftSilkShadow" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D9BEA9" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#E8D1BE" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FAF2E8" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Billowing back silk fold */}
      <path
        d="M0,0 C65,180 120,380 75,600 C30,820 115,1080 70,1320 C30,1540 90,1700 40,1800 L0,1800 Z"
        fill="url(#leftSilkShadow)"
      />

      {/* Main cascading foreground silk fold */}
      <path
        d="M0,0 C45,140 95,320 60,510 C25,700 90,920 50,1140 C15,1360 80,1580 30,1800 L0,1800 Z"
        fill="url(#leftSilkMain)"
      />

      {/* Specular crest sheen line */}
      <path
        d="M0,0 C45,140 95,320 60,510 C25,700 90,920 50,1140 C15,1360 80,1580 30,1800"
        stroke="#FFFDF8"
        strokeWidth="1.8"
        strokeOpacity="0.65"
      />

      {/* Sketched botanical floral vines intertwining with silk */}
      <g stroke="#C29D68" strokeWidth="0.9" strokeLinecap="round" strokeOpacity="0.45">
        {/* Vine Cluster 1 */}
        <path d="M12,240 C35,210 48,175 62,140 C72,110 68,78 84,45" />
        <path d="M62,140 C84,130 102,112 106,88 C88,86 74,106 62,140 Z" fill="#D4B07B" fillOpacity="0.08" />
        <path d="M46,182 C24,174 12,156 14,134 C30,136 42,156 46,182 Z" fill="#D4B07B" fillOpacity="0.06" />

        {/* Vine Cluster 2 */}
        <path d="M22,860 C48,825 65,780 78,735 C90,695 82,655 104,615" />
        <path d="M78,735 C102,722 120,700 124,675 C104,674 90,696 78,735 Z" fill="#D4B07B" fillOpacity="0.08" />
        <path d="M60,780 C36,772 22,752 24,728 C42,732 54,754 60,780 Z" fill="#D4B07B" fillOpacity="0.06" />

        {/* Vine Cluster 3 */}
        <path d="M18,1480 C44,1445 58,1405 72,1360 C84,1320 78,1280 98,1240" />
        <path d="M72,1360 C96,1346 114,1324 118,1298 C98,1298 84,1320 72,1360 Z" fill="#D4B07B" fillOpacity="0.08" />
      </g>
    </svg>
  </div>
);

/**
 * Continuous Right Silk Drapery Curtain
 * Hugs the right margin of the screen with cascading silk folds and rich golden magnolia sketches
 */
export const RightSilkMarginCurtain: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg
      viewBox="0 0 160 1800"
      fill="none"
      preserveAspectRatio="none"
      className="w-full h-full block"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="rightSilkMain" x1="160" y1="0" x2="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EFE3D5" stopOpacity="0.9" />
          <stop offset="28%" stopColor="#FBF4EB" stopOpacity="0.95" />
          <stop offset="58%" stopColor="#E3CDBC" stopOpacity="0.75" />
          <stop offset="85%" stopColor="#F9F1E6" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FAF2E8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="rightSilkShadow" x1="160" y1="0" x2="40" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D9BEA9" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#E8D1BE" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FAF2E8" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Billowing back silk fold */}
      <path
        d="M160,0 C95,180 40,380 85,600 C130,820 45,1080 90,1320 C130,1540 70,1700 120,1800 L160,1800 Z"
        fill="url(#rightSilkShadow)"
      />

      {/* Main cascading foreground silk fold */}
      <path
        d="M160,0 C115,140 65,320 100,510 C135,700 70,920 110,1140 C145,1360 80,1580 130,1800 L160,1800 Z"
        fill="url(#rightSilkMain)"
      />

      {/* Specular crest sheen line */}
      <path
        d="M160,0 C115,140 65,320 100,510 C135,700 70,920 110,1140 C145,1360 80,1580 130,1800"
        stroke="#FFFDF8"
        strokeWidth="1.8"
        strokeOpacity="0.65"
      />

      {/* Sketched botanical floral branches along right silk */}
      <g stroke="#C29D68" strokeWidth="0.95" strokeLinecap="round" strokeOpacity="0.5">
        {/* Blossom Branch 1 */}
        <path d="M148,320 C122,280 106,240 92,195 C82,155 88,115 68,75" />
        <path d="M92,195 C68,182 48,160 44,132 C64,130 80,152 92,195 Z" fill="#D4B07B" fillOpacity="0.08" />
        <path d="M112,240 C134,230 148,210 146,186 C128,188 116,210 112,240 Z" fill="#D4B07B" fillOpacity="0.06" />

        {/* Blossom Branch 2 */}
        <path d="M142,940 C116,900 98,855 84,810 C74,770 78,730 58,685" />
        <path d="M84,810 C60,798 42,774 38,746 C58,746 72,768 84,810 Z" fill="#D4B07B" fillOpacity="0.08" />
        <path d="M102,855 C124,845 138,825 136,800 C118,802 106,825 102,855 Z" fill="#D4B07B" fillOpacity="0.06" />

        {/* Blossom Branch 3 */}
        <path d="M144,1520 C118,1480 102,1438 88,1390 C78,1350 82,1308 62,1265" />
        <path d="M88,1390 C64,1376 46,1352 42,1324 C62,1324 76,1348 88,1390 Z" fill="#D4B07B" fillOpacity="0.08" />
      </g>
    </svg>
  </div>
);

/**
 * Enhanced Realistic 3D Satin Silk Wave Transition
 * Supports "hero-to-body" and "footer-bottom" with multi-layer undulating folds,
 * crest specular highlights, and deep crease shadows
 */
export const SatinSilkWaveSeam: React.FC<{
  variant?: "hero-to-body" | "footer-bottom";
  className?: string;
}> = ({ variant = "hero-to-body", className = "" }) => {
  if (variant === "hero-to-body") {
    return (
      <div className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}>
        <svg
          viewBox="0 0 1440 170"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-16 sm:h-24 lg:h-32 block"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft burgundy-plum rim shadow cast onto back fold */}
            <linearGradient id="waveAmbientDrop" x1="0" y1="0" x2="0" y2="170" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2A080E" stopOpacity="0.58" />
              <stop offset="55%" stopColor="#45141C" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#FAF2E8" stopOpacity="0" />
            </linearGradient>

            {/* Back silk billowing ridge */}
            <linearGradient id="waveFoldBack" x1="0" y1="10" x2="1440" y2="140" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F5E5D5" />
              <stop offset="22%" stopColor="#CFA788" />
              <stop offset="48%" stopColor="#EBD6C3" />
              <stop offset="76%" stopColor="#FDF6EE" />
              <stop offset="100%" stopColor="#E1C2A8" />
            </linearGradient>

            {/* Primary billowing satin drape */}
            <linearGradient id="waveFoldFront" x1="120" y1="15" x2="1360" y2="155" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFDF9" />
              <stop offset="24%" stopColor="#ECD7C6" />
              <stop offset="50%" stopColor="#FAF1E6" />
              <stop offset="75%" stopColor="#E1C4AE" />
              <stop offset="100%" stopColor="#FFF9F3" />
            </linearGradient>

            {/* Deep interior valley shadow between upper & lower folds */}
            <linearGradient id="waveValleyShade" x1="0" y1="55" x2="1440" y2="155" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#DFC0A7" stopOpacity="0.45" />
              <stop offset="35%" stopColor="#F9EFE5" stopOpacity="0.15" />
              <stop offset="68%" stopColor="#D6B398" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#FAF2E8" stopOpacity="0.1" />
            </linearGradient>

            {/* Soft specular highlight crest */}
            <linearGradient id="waveCrestSheen" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
              <stop offset="38%" stopColor="#FFF7EC" stopOpacity="0.7" />
              <stop offset="72%" stopColor="#FFFFFF" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#FFF9F2" stopOpacity="0.85" />
            </linearGradient>

            <filter id="silkHighlightBlur" x="-5%" y="-20%" width="110%" height="140%">
              <feGaussianBlur stdDeviation="3.5" />
            </filter>
          </defs>

          {/* 1. Drop shadow behind upper edge */}
          <path
            d="M0,18 C190,62 390,118 690,94 C980,72 1190,28 1440,54 L1440,170 L0,170 Z"
            fill="url(#waveAmbientDrop)"
          />

          {/* 2. Sculpted upper satin back fold */}
          <path
            d="M0,26 C210,72 410,116 700,90 C990,64 1210,26 1440,58 L1440,170 L0,170 Z"
            fill="url(#waveFoldBack)"
          />

          {/* 3. Foreground billowing liquid champagne-cream silk wave */}
          <path
            d="M0,64 C210,32 410,112 720,104 C1030,96 1220,42 1440,74 L1440,170 L0,170 Z"
            fill="url(#waveFoldFront)"
          />

          {/* 4. Soft interior valley fold shading for photoreal cloth volume */}
          <path
            d="M0,92 C280,74 520,126 860,116 C1130,108 1300,82 1440,94 L1440,170 L0,170 Z"
            fill="url(#waveValleyShade)"
            filter="url(#silkHighlightBlur)"
          />

          {/* 5. Soft blurred crest sheen */}
          <path
            d="M0,64 C210,32 410,112 720,104 C1030,96 1220,42 1440,74"
            stroke="url(#waveCrestSheen)"
            strokeWidth="3.2"
            filter="url(#silkHighlightBlur)"
            fill="none"
          />

          {/* 6. Crisp baseline sealing cleanly into #FAF2E8 champagne body canvas */}
          <path d="M0,126 C420,152 1040,152 1440,120 L1440,170 L0,170 Z" fill="#FAF2E8" />
        </svg>
      </div>
    );
  }

  // variant === "footer-bottom"
  return (
    <div className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 1440 140"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-16 sm:h-20 lg:h-28 block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="footerSilkBack" x1="0" y1="20" x2="1440" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F5E4D4" />
            <stop offset="32%" stopColor="#DFBF9E" />
            <stop offset="65%" stopColor="#FCF6EF" />
            <stop offset="100%" stopColor="#E6C8AF" />
          </linearGradient>
          <linearGradient id="footerSilkFront" x1="1440" y1="0" x2="0" y2="130" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFDFC" />
            <stop offset="42%" stopColor="#E9D0BC" />
            <stop offset="78%" stopColor="#FCF7F2" />
            <stop offset="100%" stopColor="#FAF1E6" />
          </linearGradient>
          <linearGradient id="footerSheen" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#FFF9F0" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Back undulating sweep */}
        <path
          d="M0,16 C220,44 420,96 720,105 C1020,114 1260,68 1440,24 L1440,140 L0,140 Z"
          fill="url(#footerSilkBack)"
        />

        {/* Foreground billowing sweep framing Mariana Voss */}
        <path
          d="M0,54 C260,30 480,114 840,102 C1140,92 1310,48 1440,68 L1440,140 L0,140 Z"
          fill="url(#footerSilkFront)"
        />

        {/* Specular crest reflection */}
        <path
          d="M0,54 C260,30 480,114 840,102 C1140,92 1310,48 1440,68"
          stroke="url(#footerSheen)"
          strokeWidth="2"
          fill="none"
        />

        {/* Bottom flat merge */}
        <path d="M0,110 C420,132 1020,132 1440,105 L1440,140 L0,140 Z" fill="#FAF2E8" />
      </svg>
    </div>
  );
};

/**
 * Luminous metallic gold Ginkgo fan sculpture for Footer right edge
 */
export const FooterGinkgoSpray: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 240 260" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="ginkgoMetallicGold" x1="20" y1="10" x2="220" y2="250" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF0D4" stopOpacity="0.95" />
        <stop offset="35%" stopColor="#E2BD82" stopOpacity="0.88" />
        <stop offset="70%" stopColor="#B68748" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#784E22" stopOpacity="0.45" />
      </linearGradient>
    </defs>

    {/* Large sculpted fan leaf */}
    <path
      d="M168 255 C164 205, 156 160, 148 120 C100 122, 54 94, 44 44 C72 28, 105 32, 126 55 C136 32, 156 16, 188 14 C214 40, 214 92, 164 120 C172 162, 180 208, 186 255"
      fill="url(#ginkgoMetallicGold)"
      fillOpacity="0.6"
      stroke="#FFF0D4"
      strokeWidth="1.2"
      strokeOpacity="0.8"
    />

    {/* Fine radiating ginkgo fan ribs */}
    <g stroke="#FFF6E5" strokeWidth="0.6" strokeOpacity="0.5">
      <path d="M152 118 L60 52" />
      <path d="M152 118 L80 40" />
      <path d="M152 118 L108 38" />
      <path d="M152 118 L154 22" />
      <path d="M152 118 L182 28" />
      <path d="M152 118 L198 58" />
    </g>

    {/* Second overlapping leaf below */}
    <path
      d="M184 255 C200 214, 224 180, 238 152 C204 144, 176 156, 166 190"
      fill="url(#ginkgoMetallicGold)"
      fillOpacity="0.45"
      stroke="#FFF0D4"
      strokeWidth="1"
      strokeOpacity="0.65"
    />
  </svg>
);
