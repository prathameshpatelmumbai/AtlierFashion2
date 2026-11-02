"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { ListedProduct } from "@/types/studio";
import { 
  ArrowLeft, 
  ShoppingBag, 
  Scissors, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles, 
  Check, 
  Ruler, 
  Info,
  Layers
} from "lucide-react";

interface CustomerProductDetailProps {
  productId: string;
  onOpenBuyNow: (product: ListedProduct) => void;
  onOpenCustomRequest: (product: ListedProduct) => void;
  onBack: () => void;
}

export const CustomerProductDetail: React.FC<CustomerProductDetailProps> = ({
  productId,
  onOpenBuyNow,
  onOpenCustomRequest,
  onBack
}) => {
  const { listedProducts, designers, setSelectedDesignerId, setCustomerSection } = useStudio();

  const product = listedProducts.find((p) => p.id === productId);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || "M");

  if (!product) {
    return (
      <div className="text-center py-24 bg-white rounded-3xl border border-[#E4D5C5] p-8">
        <h3 className="font-serif text-2xl text-[#21171F]">Garment Not Found</h3>
        <p className="text-sm text-[#8F8178] mt-2 mb-6">The requested garment could not be retrieved from the atelier collection.</p>
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-full bg-[#542333] text-white text-xs font-medium uppercase tracking-wider"
        >
          Return to Discover
        </button>
      </div>
    );
  }

  const isSoldOut = product.availableStock === 0;
  const designer = designers.find((d) => d.id === product.designerId);

  return (
    <div className="space-y-8 pb-16">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-medium text-[#8F8178] hover:text-[#3A0E1E] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#C5A059]" />
          <span>Back to Collection</span>
        </button>

        <div className="text-xs text-[#8F8178] font-sans">
          Curated Atelier Piece #{product.id}
        </div>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-4/5 rounded-3xl overflow-hidden bg-[#FFF7F9] border border-[#E8D2B7]/80 shadow-lg">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover object-top"
            />

            {/* Badges Overlay */}
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              {isSoldOut ? (
                <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#3A0E1E]/95 text-[#E8D2B7] backdrop-blur-md shadow-sm border border-[#D4AF37]/40">
                  Sold Out — Customisation Available
                </span>
              ) : (
                <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-emerald-950/85 text-emerald-200 backdrop-blur-md shadow-sm border border-emerald-500/20">
                  Ready to Dispatch ({product.availableStock} in atelier)
                </span>
              )}
            </div>

            <div className="absolute bottom-6 right-6">
              <span className="px-3 py-1.5 rounded-full text-[10px] font-medium tracking-widest uppercase bg-white/95 text-[#231820] backdrop-blur-md border border-[#E8D2B7]/80">
                {product.shippingMode === "Free Shipping" ? "Complimentary Insured Courier" : "Standard Insured Courier"}
              </span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? "border-[#D4AF37] scale-102 shadow-md"
                      : "border-[#E8D2B7]/60 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Product Editorial Info (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Brand & Designer Attribution */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#C5A059]">
                {product.brandName || "Atelier Exclusive"}
              </span>
              <button
                onClick={() => {
                  if (product.designerId) {
                    setSelectedDesignerId(product.designerId);
                    setCustomerSection("designers");
                  }
                }}
                className="text-xs text-[#3A0E1E] hover:underline flex items-center gap-1 font-medium"
              >
                <span>Atelier Profile</span>
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              </button>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#231820] font-light tracking-tight leading-snug">
              {product.title}
            </h1>

            <p className="text-xs text-[#8F8178]">
              By Couturier <span className="font-medium text-[#231820]">{product.designerName || "Master Designer"}</span>
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-5 rounded-2xl bg-[#FFF7F9] border border-[#E8D2B7] flex items-baseline justify-between shadow-xs">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#8F8178] font-medium">Price (Inclusive of all taxes)</div>
              <div className="font-serif text-3xl text-[#3A0E1E] font-light mt-0.5">
                ₹{product.price.toLocaleString("en-IN")}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] font-medium text-emerald-800 flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-[#D4AF37]" /> Direct Atelier Escrow
              </div>
              <div className="text-[10px] text-[#8F8178]">Complimentary Delivery</div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#231820]">Garment Story & Silhouette</h4>
            <p className="text-xs sm:text-sm text-[#8F8178] leading-relaxed font-light">
              {product.description || "Handcrafted with supreme care in our atelier. Every seam is finished with traditional craftsmanship, presenting an ethereal balance of timeless elegance and contemporary flair."}
            </p>
          </div>

          {/* Standard Sizes Selection */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#231820]">
                Available Standard Sizes
              </label>
              <button 
                onClick={() => onOpenCustomRequest(product)}
                className="text-xs text-[#3A0E1E] hover:underline flex items-center gap-1"
              >
                <Ruler className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Need Custom Measurements?</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`w-12 h-10 rounded-xl text-xs font-medium tracking-wide transition-all border ${
                    selectedSize === sz
                      ? "bg-[#3A0E1E] text-white border-[#D4AF37] shadow-xs"
                      : "bg-white text-[#231820] border-[#E8D2B7] hover:border-[#D4AF37]"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-2 space-y-3">
            {!isSoldOut ? (
              <button
                onClick={() => onOpenBuyNow(product)}
                className="w-full py-4 rounded-full bg-[#3A0E1E] hover:bg-[#542333] text-white text-xs font-semibold tracking-widest uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 border border-[#D4AF37]/40"
              >
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                <span>Acquire This Piece (Buy Now)</span>
              </button>
            ) : (
              <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-700 shrink-0" />
                <span>This ready piece is currently sold out. You can request a custom made-to-measure piece from the couturier below.</span>
              </div>
            )}

            {/* Customise button */}
            <button
              onClick={() => onOpenCustomRequest(product)}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A059] hover:from-[#e0bc46] hover:to-[#d4af37] text-[#21171F] text-xs font-semibold tracking-widest uppercase transition-all shadow-xs flex items-center justify-center gap-2 border border-[#D4AF37]/50"
            >
              <Scissors className="w-4 h-4 text-[#3A0E1E]" />
              <span>Request Customisation / Custom Fit</span>
            </button>
          </div>

          {/* Garment Technical Specifications Accordion / Cards */}
          <div className="pt-4 border-t border-[#E8D2B7]/60 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#231820]">
              Atelier Specifications
            </h4>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-[#E8D2B7]/70">
                <div className="text-[10px] text-[#8F8178] uppercase tracking-wider">Fabric Materials</div>
                <div className="font-medium text-[#231820] mt-0.5">{product.materials || "Pure Mulberry Silk"}</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#E8D2B7]/70">
                <div className="text-[10px] text-[#8F8178] uppercase tracking-wider">Lining</div>
                <div className="font-medium text-[#231820] mt-0.5">{product.lining || "Full Butter Crepe"}</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#E8D2B7]/70">
                <div className="text-[10px] text-[#8F8178] uppercase tracking-wider">Stretchability</div>
                <div className="font-medium text-[#231820] mt-0.5">{product.stretchability || "No Stretch (Structured)"}</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#E8D2B7]/70">
                <div className="text-[10px] text-[#8F8178] uppercase tracking-wider">Package Weight</div>
                <div className="font-medium text-[#231820] mt-0.5">{product.packageWeight || "1.2 kg"}</div>
              </div>
            </div>
          </div>

          {/* Atelier Trust Assurance */}
          <div className="p-4 rounded-2xl bg-white border border-[#E8D2B7]/70 space-y-2.5">
            <div className="flex items-center gap-2.5 text-xs text-[#231820]">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Authenticity Certified by Atelier Council</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#231820]">
              <Truck className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>Complimentary insured air courier with real-time tracking</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-[#231820]">
              <RotateCcw className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>7-day exchange window with doorstep collection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
