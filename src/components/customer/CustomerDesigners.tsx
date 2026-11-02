"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { DesignerProfile, ListedProduct } from "@/types/studio";
import { 
  Sparkles, 
  MapPin, 
  Scissors, 
  ShieldCheck, 
  Layers
} from "lucide-react";

interface CustomerDesignersProps {
  onOpenCustomRequest: (product?: ListedProduct) => void;
  onOpenBuyNow: (product: ListedProduct) => void;
}

export const CustomerDesigners: React.FC<CustomerDesignersProps> = ({
  onOpenCustomRequest,
  onOpenBuyNow
}) => {
  const { 
    designers, 
    listedProducts, 
    selectedDesignerId, 
    setSelectedDesignerId, 
    setSelectedProductId, 
    setCustomerSection 
  } = useStudio();

  // If a designer is selected, show their full atelier profile & collection
  const activeDesigner = designers.find((d) => d.id === selectedDesignerId);

  const getDesignerProducts = (designerId: string) => {
    return listedProducts.filter((p) => p.designerId === designerId);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <div className="border-b border-[#E8D2B7]/60 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#C5A059]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Master Couturiers & Ateliers • Atelier Privée</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#231820] font-light mt-1">
            Independent Fashion Houses
          </h1>
          <p className="text-xs text-[#8F8178] mt-1 max-w-xl">
            Discover the visionary designers crafting timeless luxury through generations of heritage, handloom mastery, and haute couture tailoring.
          </p>
        </div>

        {selectedDesignerId && (
          <button
            onClick={() => setSelectedDesignerId(null)}
            className="px-4 py-2 rounded-full bg-white hover:bg-[#FFF7F9] text-[#231820] border border-[#E8D2B7] text-xs font-medium uppercase tracking-wider self-start sm:self-auto"
          >
            ← View All Ateliers
          </button>
        )}
      </div>

      {/* If single designer is selected */}
      {activeDesigner ? (
        <div className="space-y-10">
          {/* Designer Profile Spotlight */}
          <div className="bg-white rounded-3xl border border-[#D4AF37]/40 p-6 sm:p-10 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-4">
              <div className="aspect-4/5 rounded-2xl overflow-hidden bg-[#FFF7F9] border border-[#E8D2B7] shadow-md">
                <img
                  src={activeDesigner.brandDetails.logo || "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80"}
                  alt={activeDesigner.brandDetails.brandName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#C5A059]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Verified Atelier</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#231820] font-light">
                {activeDesigner.brandDetails.brandName}
              </h2>

              <div className="text-xs text-[#8F8178] flex items-center gap-3">
                <span>By Couturier <strong className="text-[#231820] font-medium">{activeDesigner.personalDetails.designerName}</strong></span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#C5A059]" />
                  {activeDesigner.businessAddress.city}, {activeDesigner.businessAddress.state}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#8F8178] leading-relaxed font-light">
                {activeDesigner.brandDetails.brandStory}
              </p>

              <div className="p-4 bg-[#FFF7F9] rounded-2xl border border-[#E8D2B7] text-xs text-[#231820] space-y-1">
                <div className="font-semibold uppercase tracking-wider text-[10px] text-[#8F8178]">
                  Workshop & Studio Address
                </div>
                <div>{activeDesigner.businessAddress.workshopAddress}, {activeDesigner.businessAddress.city} - {activeDesigner.businessAddress.postalCode}</div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => onOpenCustomRequest()}
                  className="px-6 py-3 rounded-full bg-[#3A0E1E] hover:bg-[#542333] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center gap-2 border border-[#D4AF37]/40"
                >
                  <Scissors className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Commission Bespoke Piece with {activeDesigner.personalDetails.designerName.split(" ")[0]}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Designer's Collection */}
          <div className="space-y-6">
            <h3 className="font-serif text-2xl text-[#21171F] font-light">
              Pieces by {activeDesigner.brandDetails.brandName}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getDesignerProducts(activeDesigner.id).map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-[#E4D5C5] overflow-hidden flex flex-col hover:shadow-lg transition-all"
                >
                  <div 
                    onClick={() => {
                      setSelectedProductId(product.id);
                      setCustomerSection("discover");
                    }}
                    className="relative aspect-3/4 overflow-hidden bg-[#FBF7F1] cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 
                        onClick={() => {
                          setSelectedProductId(product.id);
                          setCustomerSection("discover");
                        }}
                        className="font-serif text-lg text-[#21171F] font-light cursor-pointer hover:text-[#542333]"
                      >
                        {product.title}
                      </h4>
                      <div className="text-xs text-[#8F8178] mt-1">
                        Size: {product.sizes.join(", ")}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#E4D5C5]/60">
                      <div className="font-serif text-xl text-[#21171F]">
                        ₹{product.price.toLocaleString("en-IN")}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onOpenCustomRequest(product)}
                          className="p-2 rounded-full border border-[#E4D5C5] text-[#542333] hover:bg-[#FBF7F1]"
                          title="Customise"
                        >
                          <Scissors className="w-3.5 h-3.5" />
                        </button>
                        {product.availableStock > 0 && (
                          <button
                            onClick={() => onOpenBuyNow(product)}
                            className="px-3.5 py-1.5 rounded-full bg-[#542333] text-white text-[11px] font-medium uppercase tracking-wider hover:bg-[#6c2c41]"
                          >
                            Buy
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Designer Directory List */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {designers.map((designer) => {
            const count = getDesignerProducts(designer.id).length;

            return (
              <div
                key={designer.id}
                className="bg-white rounded-3xl border border-[#E4D5C5] overflow-hidden p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl hover:border-[#B77A68]/60 transition-all space-y-6"
              >
                <div className="flex items-start gap-5">
                  <div className="w-20 h-24 rounded-2xl overflow-hidden bg-[#FBF7F1] border border-[#E4D5C5] shrink-0">
                    <img
                      src={designer.brandDetails.logo || "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80"}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-[#B77A68] font-semibold">
                        Atelier Couturier
                      </span>
                      <span className="text-xs text-[#8F8178] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#B77A68]" />
                        {designer.businessAddress.city}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl text-[#21171F] font-light">
                      {designer.brandDetails.brandName}
                    </h3>

                    <p className="text-xs text-[#8F8178]">
                      Creative Lead: <strong className="text-[#21171F] font-medium">{designer.personalDetails.designerName}</strong>
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#8F8178] leading-relaxed font-light line-clamp-3">
                  {designer.brandDetails.brandStory}
                </p>

                {/* Footer with actions */}
                <div className="pt-4 border-t border-[#E4D5C5]/60 flex items-center justify-between">
                  <span className="text-xs text-[#8F8178]">
                    <strong className="text-[#21171F]">{count}</strong> active atelier pieces
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedDesignerId(designer.id)}
                      className="px-4 py-2 rounded-full bg-[#FBF7F1] hover:bg-[#E4D5C5]/50 text-[#21171F] text-xs font-medium tracking-wider uppercase transition-colors"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => onOpenCustomRequest()}
                      className="px-4 py-2 rounded-full bg-[#542333] hover:bg-[#6c2c41] text-white text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5"
                    >
                      <Scissors className="w-3 h-3 text-[#E8D2B7]" />
                      <span>Commission</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
