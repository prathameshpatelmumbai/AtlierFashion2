"use client";

import React from "react";
import { useStudio } from "@/context/StudioContext";
import { ShoppingBag, Plus } from "lucide-react";
import confetti from "canvas-confetti";

export interface AddToBagProduct {
  id: string;
  title: string;
  price: number;
  image?: string;
  images?: string[];
  sizes?: string[];
  size?: string;
  colors?: string[];
  color?: string;
}

export interface AddToBagButtonProps {
  product: AddToBagProduct;
  variant?: "pill" | "pdp-main" | "footer-bar" | "catalog-footer" | "uvibe" | "sheen";
  className?: string;
  onAdded?: () => void;
}

export const AddToBagButton: React.FC<AddToBagButtonProps> = ({
  product,
  variant = "pill",
  className = "",
  onAdded
}) => {
  const { cartItems, addToCart, updateCartQuantity, removeFromCart } = useStudio();

  // Find reactive quantity for this product in the user's bag
  const inCart = cartItems.find((item) => item.id === product.id);
  const quantity = inCart ? inCart.quantity : 0;

  const resolvedImage =
    product.images?.[0] || product.image || "/images/products/prod-1/angle-1.jpg";
  const resolvedSize = product.sizes?.[0] || product.size || "Standard";
  const resolvedColor = product.colors?.[0] || product.color || "Atelier Classic";

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: resolvedImage,
      size: resolvedSize,
      color: resolvedColor,
      quantity: 1
    });

    try {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.8 },
        colors: ["#D4AF37", "#3A0E1E", "#F6DFC4"]
      });
    } catch {
      // ignore if canvas-confetti unsupported
    }

    onAdded?.();
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (quantity <= 1) {
      removeFromCart(product.id);
    } else {
      updateCartQuantity(product.id, -1);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    updateCartQuantity(product.id, 1);
    try {
      confetti({
        particleCount: 15,
        spread: 35,
        origin: { y: 0.8 },
        colors: ["#D4AF37", "#3A0E1E"]
      });
    } catch {
      // ignore
    }
  };

  // =========================================================================
  // 1. PILL VARIANT (Explore Designer's Work / Companion Carousel & standard cards)
  // =========================================================================
  if (variant === "pill") {
    if (quantity > 0) {
      return (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex items-center rounded-full bg-[#FAF7F2] border border-[#D4AF37] text-[#3A0E1E] text-[11px] font-serif font-bold tracking-wider overflow-hidden shadow-xs select-none ${className}`}
        >
          <button
            type="button"
            onClick={handleDecrement}
            className="w-7 h-7 flex items-center justify-center hover:bg-[#3A0E1E] hover:text-[#F6DFC4] transition-colors cursor-pointer text-sm font-bold text-[#3A0E1E]"
            title="Remove or reduce quantity"
          >
            −
          </button>
          <span className="px-2 py-0.5 font-mono text-xs font-bold text-[#3A0E1E] min-w-[20px] text-center bg-white/70">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            className="w-7 h-7 flex items-center justify-center hover:bg-[#3A0E1E] hover:text-[#F6DFC4] transition-colors cursor-pointer text-sm font-bold text-[#3A0E1E]"
            title="Add one more"
          >
            +
          </button>
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={handleAdd}
        className={`px-3.5 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#3A0E1E] text-[#3A0E1E] hover:text-[#F6DFC4] border border-[#E8D2B7] hover:border-[#3A0E1E] text-[11px] font-serif font-bold tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-95 shadow-xs select-none ${className}`}
      >
        <ShoppingBag className="w-3 h-3 text-[#C5A059]" />
        <span>ADD TO BAG</span>
      </button>
    );
  }

  // =========================================================================
  // 2. PDP MAIN VARIANT (Primary CTA on Product Detail Page)
  // =========================================================================
  if (variant === "pdp-main") {
    if (quantity > 0) {
      return (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`py-2 px-3 rounded-full bg-gradient-to-r from-[#2B0B17] to-[#3A0E1E] text-[#F6DFC4] border border-[#D4AF37] font-serif font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-between gap-3 select-none ${className}`}
        >
          <button
            type="button"
            onClick={handleDecrement}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-base font-bold transition-colors cursor-pointer text-[#F6DFC4]"
            title="Decrease quantity"
          >
            −
          </button>
          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-sans font-semibold">IN BAG:</span>
            <span className="text-sm font-bold text-[#FFFFFF] px-1">{quantity}</span>
          </div>
          <button
            type="button"
            onClick={handleIncrement}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-base font-bold transition-colors cursor-pointer text-[#F6DFC4]"
            title="Increase quantity"
          >
            +
          </button>
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={handleAdd}
        className={`py-3.5 rounded-full bg-gradient-to-r from-[#2B0B17] to-[#3A0E1E] hover:from-[#3A0E1E] hover:to-[#542333] text-[#F6DFC4] border border-[#D4AF37]/50 font-serif font-bold text-xs uppercase tracking-wider shadow-lg transition-all text-center flex items-center justify-center gap-2 cursor-pointer select-none active:scale-[0.99] ${className}`}
      >
        <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
        <span>Add to Cart</span>
      </button>
    );
  }

  // =========================================================================
  // 3. FOOTER BAR VARIANT (Card bottom bar in Discover & Top Deals)
  // =========================================================================
  if (variant === "footer-bar") {
    if (quantity > 0) {
      return (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex items-center gap-1 rounded-full bg-[#FAF4ED] border border-[#C59347] px-1 py-0.5 shadow-2xs select-none ${className}`}
        >
          <button
            type="button"
            onClick={handleDecrement}
            className="w-4 h-4 rounded-full border border-[#3B171D]/45 hover:bg-[#3B171D] hover:text-[#FAF2E8] flex items-center justify-center text-[10px] font-bold text-[#3B171D] transition-colors cursor-pointer"
            title="Decrease quantity"
          >
            −
          </button>
          <span className="font-mono font-bold text-[9px] text-[#3B171D] px-1 min-w-[14px] text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            className="w-4 h-4 rounded-full border border-[#3B171D]/45 hover:bg-[#3B171D] hover:text-[#FAF2E8] flex items-center justify-center text-[10px] font-bold text-[#3B171D] transition-colors cursor-pointer"
            title="Increase quantity"
          >
            +
          </button>
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={handleAdd}
        className={`inline-flex items-center gap-1.5 text-[8.5px] tracking-[0.16em] uppercase font-sans font-medium text-[#3B171D] hover:text-[#6B1F2B] transition-colors cursor-pointer select-none ${className}`}
      >
        <span className="w-3.5 h-3.5 rounded-full border border-[#3B171D]/45 flex items-center justify-center">
          <Plus className="w-2 h-2" strokeWidth={2.2} />
        </span>
        ADD TO CART
      </button>
    );
  }

  // =========================================================================
  // 4. CATALOG FOOTER VARIANT (Bottom button on catalog cards)
  // =========================================================================
  if (variant === "catalog-footer") {
    if (quantity > 0) {
      return (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`w-full py-1 rounded-lg bg-[#FAF7F2] text-[#3A0E1E] border border-[#D4AF37] text-[10px] font-semibold uppercase tracking-wider flex items-center justify-center gap-3 shadow-2xs select-none ${className}`}
        >
          <button
            type="button"
            onClick={handleDecrement}
            className="w-5 h-5 rounded-md bg-[#FFF0F4] hover:bg-[#3A0E1E] hover:text-[#F6DFC4] border border-[#E8D2B7] flex items-center justify-center font-bold text-xs transition-colors cursor-pointer text-[#3A0E1E]"
            title="Decrease quantity"
          >
            −
          </button>
          <span className="font-mono font-bold text-xs text-[#3A0E1E] min-w-[20px] text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            className="w-5 h-5 rounded-md bg-[#FFF0F4] hover:bg-[#3A0E1E] hover:text-[#F6DFC4] border border-[#E8D2B7] flex items-center justify-center font-bold text-xs transition-colors cursor-pointer text-[#3A0E1E]"
            title="Increase quantity"
          >
            +
          </button>
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={handleAdd}
        className={`w-full py-1.5 rounded-lg bg-[#FFF0F4] hover:bg-[#FFE4EC] text-[#542333] text-[10px] font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 border border-[#E8D2B7] cursor-pointer select-none active:scale-[0.99] ${className}`}
      >
        <ShoppingBag className="w-3 h-3 text-[#D4AF37]" />
        <span>Add to Cart</span>
      </button>
    );
  }

  // =========================================================================
  // 5. UVIBE VARIANT (Action button on UVIBE generated recommendations)
  // =========================================================================
  if (variant === "uvibe") {
    if (quantity > 0) {
      return (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`py-1 px-1.5 rounded-[2px] bg-[#FAF4ED] border border-[#C59347] text-[#44141C] text-[10px] font-sans font-semibold tracking-wider flex items-center justify-center gap-2 select-none ${className}`}
        >
          <button
            type="button"
            onClick={handleDecrement}
            className="px-1.5 py-0.5 hover:bg-[#44141C] hover:text-[#FAF4ED] text-xs font-bold cursor-pointer rounded-[2px] text-[#44141C]"
            title="Decrease quantity"
          >
            −
          </button>
          <span className="font-mono font-bold text-xs text-[#44141C] min-w-[16px] text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            className="px-1.5 py-0.5 hover:bg-[#44141C] hover:text-[#FAF4ED] text-xs font-bold cursor-pointer rounded-[2px] text-[#44141C]"
            title="Increase quantity"
          >
            +
          </button>
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={handleAdd}
        className={`py-2 px-2.5 rounded-[2px] bg-[#44141C] hover:bg-[#5E1E28] text-[#FAF4ED] text-[10px] font-sans font-semibold tracking-wider uppercase transition-colors shadow-xs text-center cursor-pointer select-none ${className}`}
      >
        Add to Bag
      </button>
    );
  }

  // =========================================================================
  // 6. SHEEN VARIANT (Hover overlay button in Discover cards)
  // =========================================================================
  if (variant === "sheen") {
    if (quantity > 0) {
      return (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex items-center gap-1.5 text-[8.5px] font-sans font-semibold text-[#4B1A22] bg-[#FAF4ED] border border-[#C59347] rounded-full px-2 py-0.5 select-none ${className}`}
        >
          <button
            type="button"
            onClick={handleDecrement}
            className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] font-bold hover:bg-[#4B1A22] hover:text-white transition-colors"
          >
            −
          </button>
          <span className="font-mono">{quantity}</span>
          <button
            type="button"
            onClick={handleIncrement}
            className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] font-bold hover:bg-[#4B1A22] hover:text-white transition-colors"
          >
            +
          </button>
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={handleAdd}
        className={`text-[8px] tracking-[0.16em] uppercase text-[#4B1A22] font-semibold flex items-center gap-1 hover:text-[#2B0C11] cursor-pointer select-none ${className}`}
      >
        <Plus className="w-2.5 h-2.5" /> Add to Bag
      </button>
    );
  }

  return null;
};
