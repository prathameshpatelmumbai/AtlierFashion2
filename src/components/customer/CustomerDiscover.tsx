"use client";

import React, { useState, useMemo } from "react";
import { useStudio } from "@/context/StudioContext";
import { ListedProduct } from "@/types/studio";
import { 
  Sparkles, 
  Scissors, 
  ArrowRight, 
  CheckCircle2, 
  ShoppingBag, 
  Filter, 
  Layers,
  Heart,
  Eye
} from "lucide-react";

interface CustomerDiscoverProps {
  onOpenBuyNow: (product: ListedProduct) => void;
  onOpenCustomRequest: (product?: ListedProduct) => void;
}

export const CustomerDiscover: React.FC<CustomerDiscoverProps> = ({
  onOpenBuyNow,
  onOpenCustomRequest
}) => {
  const { 
    listedProducts, 
    setSelectedProductId, 
    customerSearchQuery,
    designers,
    setSelectedDesignerId,
    setCustomerSection
  } = useStudio();

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All", 
    "Bridal & Heritage Lehengas", 
    "Royal Sherwanis & Bandhgalas", 
    "Contemporary Indo-Western", 
    "Handloom & Silk"
  ];

  // Filter products by search query and category
  const filteredProducts = useMemo(() => {
    return listedProducts.filter((product) => {
      // Category filter matching
      const matchesCategory = 
        selectedCategory === "All" ||
        (selectedCategory === "Bridal & Heritage Lehengas" && (
          product.category.toLowerCase().includes("bridal") || 
          product.category.toLowerCase().includes("lehenga") || 
          product.title.toLowerCase().includes("lehenga")
        )) ||
        (selectedCategory === "Royal Sherwanis & Bandhgalas" && (
          product.category.toLowerCase().includes("sherwani") || 
          product.category.toLowerCase().includes("bandhgala") || 
          product.title.toLowerCase().includes("sherwani") || 
          product.title.toLowerCase().includes("bandhgala")
        )) ||
        (selectedCategory === "Contemporary Indo-Western" && (
          product.category.toLowerCase().includes("indo-western") || 
          product.category.toLowerCase().includes("contemporary") || 
          product.title.toLowerCase().includes("saree gown") || 
          product.title.toLowerCase().includes("corset") ||
          product.title.toLowerCase().includes("gown")
        )) ||
        (selectedCategory === "Handloom & Silk" && (
          product.title.toLowerCase().includes("silk") || 
          product.materials?.toLowerCase().includes("silk")
        ));

      // Search query matching
      const query = customerSearchQuery.trim().toLowerCase();
      const matchesSearch = 
        !query ||
        product.title.toLowerCase().includes(query) ||
        (product.designerName && product.designerName.toLowerCase().includes(query)) ||
        (product.brandName && product.brandName.toLowerCase().includes(query)) ||
        (product.materials && product.materials.toLowerCase().includes(query)) ||
        (product.category && product.category.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [listedProducts, selectedCategory, customerSearchQuery]);

  return (
    <div className="space-y-12 pb-16">
      {/* Editorial Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl hero-glass-cherry text-[#FFF7F9] shadow-2xl">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:px-16 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#542333]/80 text-[#E8D2B7] text-xs font-medium tracking-widest uppercase mb-6 border border-[#D4AF37]/40 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>ALTIER Maison Privée — Haute Curated Sanctuary</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight mb-6">
            Exceptional Garments, <br />
            <span className="italic font-normal text-[#F6DFC4]">Crafted by Master Couturiers.</span>
          </h1>

          <p className="text-[#FFF7F9]/80 text-sm sm:text-base font-sans max-w-2xl leading-relaxed mb-8 font-light">
            Browse authentic creations directly from India’s foremost independent fashion ateliers. 
            Acquire ready pieces immediately, or commission personalized made-to-measure alterations directly with the artisan.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenCustomRequest()}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A059] hover:from-[#e0bc46] hover:to-[#d4af37] text-[#21171F] font-semibold text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Scissors className="w-4 h-4 text-[#3A0E1E]" />
              <span>Commission Bespoke Piece</span>
            </button>
            <button
              onClick={() => setCustomerSection("designers")}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-[#FFF7F9] font-medium text-xs tracking-wider uppercase transition-all duration-200 border border-[#D4AF37]/40 flex items-center gap-2"
            >
              <span>Explore Designer Ateliers</span>
              <ArrowRight className="w-4 h-4 text-[#E8D2B7]" />
            </button>
          </div>
        </div>
      </section>

      {/* Category Pills & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E8D2B7]/60 pb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all whitespace-nowrap backdrop-blur-xs ${
                selectedCategory === cat
                  ? "bg-[#3A0E1E]/90 text-[#FFF7F9] border border-[#D4AF37]/50 shadow-xs"
                  : "bg-white/80 text-[#8F8178] hover:text-[#231820] border border-[#E8D2B7]/60 hover:bg-[#FFF7F9]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs text-[#8F8178] font-sans">
          Showing <span className="font-semibold text-[#231820]">{filteredProducts.length}</span> curated pieces
          {customerSearchQuery && (
            <span> for &ldquo;{customerSearchQuery}&rdquo;</span>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-[#E8D2B7]/70 p-8 shadow-xs">
          <Layers className="w-12 h-12 text-[#C5A059] mx-auto mb-4 stroke-1" />
          <h3 className="font-serif text-2xl text-[#231820] font-light mb-2">No garments found</h3>
          <p className="text-sm text-[#8F8178] max-w-md mx-auto mb-6">
            We couldn&rsquo;t find any pieces matching your current search criteria. Try a different term or commission a bespoke design.
          </p>
          <button
            onClick={() => onOpenCustomRequest()}
            className="px-6 py-2.5 rounded-full bg-[#3A0E1E] text-white text-xs font-medium tracking-wider uppercase hover:bg-[#542333] transition-colors border border-[#D4AF37]/40"
          >
            Commission Custom Design
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isSoldOut = product.availableStock === 0;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-[#E7DCD5] overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:border-[#D4AF37]/70"
              >
                {/* Garment Photography Box */}
                <div 
                  onClick={() => setSelectedProductId(product.id)}
                  className="relative aspect-3/4 overflow-hidden bg-[#FFF7F9] cursor-pointer"
                >
                  <img
                    src={product.images[0] || "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80"}
                    alt={product.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Overlay for luxury feel */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-[#FFF7F9] text-xs font-semibold tracking-widest uppercase flex items-center gap-1.5 bg-[#3A0E1E]/90 px-3.5 py-1.5 rounded-full backdrop-blur-xs border border-[#D4AF37]/50 shadow-xs">
                      <Eye className="w-3.5 h-3.5 text-[#D4AF37]" /> View Garment Details
                    </span>
                  </div>

                  {/* Stock or Custom Status Badge */}
                  <div className="absolute top-4 left-4">
                    {isSoldOut ? (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#3A0E1E]/95 text-[#E8D2B7] backdrop-blur-xs shadow-xs border border-[#D4AF37]/40">
                        Sold Out — Made to Measure
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#E6F4EA] text-[#137333] backdrop-blur-xs shadow-xs border border-[#CEEAD6]">
                        In Stock ({product.availableStock} available)
                      </span>
                    )}
                  </div>

                  {/* Shipping Mode Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 rounded-full text-[9px] font-semibold tracking-wider uppercase bg-white/95 text-[#21171F] backdrop-blur-xs border border-[#E8D2B7]">
                      {product.shippingMode === "Free Shipping" ? "Complimentary Insured Courier" : "Standard Insured Courier"}
                    </span>
                  </div>
                </div>

                {/* Garment Editorial Meta */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Brand / Designer Tag */}
                    <div className="flex items-center justify-between text-xs text-[#837376] mb-1 font-sans">
                      <span className="uppercase tracking-widest text-[11px] font-bold text-[#865040]">
                        {product.brandName || "Atelier Studio"}
                      </span>
                      <span className="font-medium text-[#21171F]">By {product.designerName || "Master Artisan"}</span>
                    </div>

                    {/* Garment Title */}
                    <h3 
                      onClick={() => setSelectedProductId(product.id)}
                      className="font-editorial text-2xl text-[#21171F] font-normal tracking-tight cursor-pointer hover:text-[#3A0E1E] transition-colors line-clamp-1 leading-snug"
                    >
                      {product.title}
                    </h3>

                    {/* Material & Size pill */}
                    <div className="flex items-center gap-2 mt-2 text-xs text-[#837376]">
                      <span>Sizes: <strong className="font-semibold text-[#21171F]">{product.sizes.join(", ")}</strong></span>
                      <span className="text-[#E7DCD5]">|</span>
                      <span>{product.materials || "Handloom Silk"}</span>
                    </div>
                  </div>

                  {/* Price & Action CTA */}
                  <div className="pt-4 border-t border-[#E8D2B7]/60 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-[#837376] font-semibold">Valuation</div>
                      <div className="font-editorial text-2xl text-[#3A0E1E] font-bold">
                        ₹{product.price.toLocaleString("en-IN")}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Request Customisation button (always available, even for sold out!) */}
                      <button
                        onClick={() => onOpenCustomRequest(product)}
                        className="p-2.5 rounded-xl border border-[#E8D2B7] text-[#3A0E1E] hover:bg-[#FFF7F9] hover:border-[#D4AF37] transition-colors shadow-2xs"
                        title="Request Customisation / Made-to-measure"
                      >
                        <Scissors className="w-4 h-4" />
                      </button>

                      {/* Buy Now button (only enabled if in stock) */}
                      {!isSoldOut ? (
                        <button
                          onClick={() => onOpenBuyNow(product)}
                          className="px-4 py-2.5 rounded-xl bg-[#3A0E1E] hover:bg-[#542333] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-xs flex items-center gap-1.5 border border-[#D4AF37]/40"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-[#F6DFC4]" />
                          <span>Buy Now</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onOpenCustomRequest(product)}
                          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F6DFC4] to-[#E8D2B7] hover:from-[#E8D2B7] hover:to-[#D9C3A9] text-[#3A0E1E] text-xs font-semibold tracking-wider uppercase transition-all shadow-xs flex items-center gap-1.5 border border-[#D4AF37]"
                        >
                          <Scissors className="w-3.5 h-3.5 text-[#3A0E1E]" />
                          <span>Customise</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bespoke Invitation Section */}
      <section className="bg-gradient-to-r from-[#FFF7F9]/85 via-[#FCE9F4]/50 to-white/85 backdrop-blur-md rounded-3xl border border-[#D4AF37]/40 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3A0E1E]/10 text-[#3A0E1E] text-xs font-medium tracking-widest uppercase border border-[#D4AF37]/30">
            <Scissors className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Direct Couturier Commission</span>
          </div>
          <h2 className="font-serif text-3xl text-[#231820] font-light">
            Have a unique vision or bridal concept?
          </h2>
          <p className="text-sm text-[#8F8178] leading-relaxed">
            Provide your reference photos, measurements, desired fabrics, and silhouette notes. 
            Our designers formulate bespoke quotations with dedicated completion timelines and secure escrow protection.
          </p>
        </div>
        <button
          onClick={() => onOpenCustomRequest()}
          className="px-8 py-4 rounded-full bg-[#3A0E1E] hover:bg-[#542333] text-white text-xs font-semibold tracking-widest uppercase transition-all shadow-md hover:shadow-lg whitespace-nowrap flex items-center gap-2 border border-[#D4AF37]/40"
        >
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>Commission New Garment</span>
        </button>
      </section>
    </div>
  );
};
