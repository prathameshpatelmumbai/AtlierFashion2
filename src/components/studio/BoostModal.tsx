"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { 
  Flame, 
  X, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  CreditCard,
  Crown
} from "lucide-react";
import { motion } from "framer-motion";

const BOOST_PLANS = [
  {
    id: "Atelier Curated Spotlight" as const,
    title: "Atelier Curated Spotlight",
    days: 14,
    price: 3499,
    reachEstimate: "18,000 – 24,000 Luxury Shoppers",
    placement: "Homepage Featured Atelier banner & Category Carousel top pinning",
    badge: "Most Popular"
  },
  {
    id: "Fashion Week Premier Carousel" as const,
    title: "Fashion Week Premier Carousel",
    days: 30,
    price: 7999,
    reachEstimate: "45,000 – 60,000 Connoisseurs & Stylists",
    placement: "Editorial Lookbook header, Dedicated Designer Push, and VIP Patron Salon",
    badge: "High Conversion"
  },
  {
    id: "High-End Collectors Reach" as const,
    title: "High-End Collectors Reach",
    days: 45,
    price: 12500,
    reachEstimate: "100,000+ Global Bespoke Clients",
    placement: "Private client salon recommendation & Bespoke Atelier spotlight",
    badge: "Haute Tier"
  }
];

export const BoostModal: React.FC = () => {
  const { boostModalProduct, closeBoostModal, applyBoost } = useStudio();
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!boostModalProduct) return null;

  const currentPlan = BOOST_PLANS[selectedPlanIndex];

  const handlePayAndBoost = () => {
    setIsProcessing(true);
    setTimeout(() => {
      applyBoost(boostModalProduct.id, currentPlan.id, currentPlan.price);
      setIsProcessing(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231820]/60 backdrop-blur-xs">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="luxury-card max-w-xl w-full p-6 sm:p-8 bg-white border border-[#D4AF37]/60 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={closeBoostModal}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#837376] hover:text-[#231820] hover:bg-[#FCE9F4] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#FCE9F4] border border-[#D4AF37]/40 flex items-center justify-center text-[#3A0E1E] shadow-xs">
            <Flame className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#865040]">
              Promotion & Editorial Spotlight
            </span>
            <h3 className="font-editorial text-2xl font-semibold text-[#231820]">
              Boost Creation for Promotion
            </h3>
          </div>
        </div>

        {/* Target Product Summary */}
        <div className="p-3.5 rounded-lg bg-[#FFF7F9] border border-[#E8D2B7] flex items-center gap-3.5 shadow-xs">
          <img
            src={boostModalProduct.images[0]}
            alt={boostModalProduct.title}
            className="w-12 h-16 object-cover rounded-md border border-[#E8D2B7]"
          />
          <div>
            <h4 className="text-xs font-semibold text-[#231820] line-clamp-1">
              {boostModalProduct.title}
            </h4>
            <div className="flex items-center gap-2 text-xs text-[#837376] mt-1">
              <span className="font-editorial text-sm font-bold text-[#3A0E1E]">
                ₹ {boostModalProduct.price.toLocaleString("en-IN")}
              </span>
              <span>•</span>
              <span>{boostModalProduct.category}</span>
            </div>
          </div>
        </div>

        {/* Plan Selector */}
        <div className="space-y-3">
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#231820]">
            Select Promotion Option
          </label>
          <div className="space-y-2.5">
            {BOOST_PLANS.map((plan, idx) => {
              const isSelected = selectedPlanIndex === idx;
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanIndex(idx)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start justify-between ${
                    isSelected
                      ? "border-[#D4AF37] bg-gradient-to-r from-[#F6DFC4]/30 to-[#E8D2B7]/20 shadow-xs"
                      : "border-[#E8D2B7] bg-white hover:border-[#D4AF37]"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-editorial text-base font-semibold text-[#231820]">
                        {plan.title}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-gradient-to-r from-[#F6DFC4]/50 to-[#E8D2B7]/30 text-[#3A0E1E] border border-[#D4AF37]/40">
                        {plan.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#837376]">
                      {plan.placement}
                    </p>
                    <div className="text-[11px] text-emerald-900 font-semibold">
                      Estimated exposure: {plan.reachEstimate}
                    </div>
                  </div>

                  <div className="text-right shrink-0 ml-3">
                    <span className="font-editorial text-lg font-bold text-[#3A0E1E] block">
                      ₹ {plan.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-[#837376]">
                      {plan.days} Days
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Terms Disclaimer */}
        <div className="bg-[#FFF7F9] p-3.5 rounded-lg border border-[#E8D2B7]/80 text-[11px] text-[#837376] space-y-1 leading-relaxed">
          <div className="flex items-center gap-1.5 font-medium text-[#231820]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#865040]" />
            <span>Editorial Integrity Terms</span>
          </div>
          <p>
            Boosting secures targeted placement in high-visibility buyer salons. Atelier does not promise guaranteed sales conversion or volume; patron acquisition remains based on design appeal and client preference.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={closeBoostModal}
            className="flex-1 py-3 rounded-full border border-[#E8D2B7] text-xs font-semibold uppercase tracking-wider text-[#231820] hover:bg-[#FFF7F9]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handlePayAndBoost}
            disabled={isProcessing}
            className="flex-1 py-3 rounded-full bg-[#3A0E1E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#271C0B] transition-colors shadow-xs flex items-center justify-center gap-2 border border-[#D4AF37]/50"
          >
            {isProcessing ? (
              <span>Confirming Payment...</span>
            ) : (
              <>
                <CreditCard className="w-4 h-4 text-[#F6DFC4]" />
                <span>Confirm & Pay ₹ {currentPlan.price.toLocaleString("en-IN")}</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

