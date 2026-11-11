"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { ArrowRightLeft, Heart, ShoppingBag, Search, User } from "lucide-react";
import { motion } from "framer-motion";

export const CustomerHeader: React.FC = () => {
  const {
    customerSection,
    setCustomerSection,
    customerSearchQuery,
    setCustomerSearchQuery,
    setPortalMode,
    setSelectedProductId,
    cartCount,
    setCartOpen,
    showToast
  } = useStudio();

  const [activeTopNavItem, setActiveTopNavItem] = useState<string>("home");

  const handleNavClick = (section: any, navId: string = "home") => {
    setActiveTopNavItem(navId);
    setSelectedProductId(null);
    setCustomerSection(section);
  };

  const navItems = [
    { 
      id: "home", 
      label: "HOME", 
      onClick: () => handleNavClick("discover", "home") 
    },
    { 
      id: "top-deals", 
      label: "TOP DEALS", 
      onClick: () => {
        setActiveTopNavItem("top-deals");
        if (customerSection !== "discover") {
          setSelectedProductId(null);
          setCustomerSection("discover");
        }
        setTimeout(() => {
          document.getElementById("top-deals")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } 
    },
    { 
      id: "custom-orders", 
      label: "CUSTOM ORDERS", 
      onClick: () => handleNavClick("custom-orders", "custom-orders") 
    },
    { 
      id: "qa", 
      label: "Q&A", 
      onClick: () => {
        setActiveTopNavItem("qa");
        showToast("Atelier Concierge Q&A and FAQ Archive");
      } 
    }
  ];

  return (
    <header
      className="sticky top-0 left-0 right-0 w-full z-50 shadow-[0_2px_12px_rgba(30,10,16,0.25)] border-b"
      style={{
        backgroundColor: "#38151D",
        borderColor: "rgba(200, 164, 99, 0.25)"
      }}
    >
      <div className="h-16 lg:h-18 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Logo matching the exact reference: ATELIER MAISON PRIVÉE */}
        <div
          onClick={() => handleNavClick("discover", "home")}
          className="flex flex-col items-start leading-none cursor-pointer group shrink-0"
          title="Atelier Maison Privée"
        >
          <span 
            className="text-[9px] tracking-[0.32em] text-[#C8A463] uppercase font-semibold transition-colors group-hover:text-[#E6C994]"
            style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
          >
            ATELIER
          </span>
          <span 
            className="text-[14px] sm:text-[16px] tracking-[0.2em] text-[#F8E8D9] font-serif uppercase font-normal transition-colors group-hover:text-white mt-0.5"
            style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
          >
            MAISON PRIVÉE
          </span>
        </div>

        {/* Center Main Navigation: HOME, TOP DEALS, CUSTOM ORDERS, Q&A */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 h-full">
          {navItems.map((item) => {
            const isActive =
              (item.id === "home" && customerSection === "discover" && activeTopNavItem !== "top-deals") ||
              (item.id === "top-deals" && activeTopNavItem === "top-deals" && customerSection === "discover") ||
              (item.id === "custom-orders" && customerSection === "custom-orders") ||
              (item.id === "qa" && activeTopNavItem === "qa");

            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`h-full flex items-center uppercase text-[11px] lg:text-[12px] tracking-[0.2em] transition-all duration-300 border-b-2 cursor-pointer font-serif ${
                  isActive
                    ? "text-[#C8A463] font-semibold border-[#C8A463]"
                    : "text-[#F8E8D9]/75 hover:text-[#C8A463] border-transparent font-normal"
                }`}
                style={{
                  fontFamily: "var(--font-cormorant), 'Playfair Display', serif"
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Search Bar matching the pill layout in mockup */}
        <div className="relative hidden sm:block flex-1 max-w-[280px] lg:max-w-[340px]">
          <input
            type="text"
            value={customerSearchQuery}
            onChange={(e) => {
              setCustomerSearchQuery(e.target.value);
              if (customerSection !== "catalog" && customerSection !== "discover") {
                setCustomerSection("catalog");
              }
            }}
            placeholder="Search designers, silhouettes, etc."
            className="w-full h-8 sm:h-9 bg-white/10 hover:bg-white/15 focus:bg-white/20 px-3.5 pr-8 text-[12px] text-[#F8E8D9] placeholder:text-[#F8E8D9]/50 placeholder:italic focus:outline-none transition-all rounded-full border border-white/20 focus:border-[#C8A463]"
            style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
          />
          <Search className="w-3.5 h-3.5 absolute right-3 top-2.5 text-[#C8A463] pointer-events-none" />
        </div>

        {/* Right Action Icons: Shopping Bag, Wishlist Heart, Profile, STUDIO button */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Wishlist Heart */}
          <button
            aria-label="Wishlist"
            onClick={() => showToast("Wishlist Vault — Curated private selections saved")}
            className="p-1 text-[#F8E8D9]/80 hover:text-[#C8A463] transition-colors relative flex items-center justify-center cursor-pointer"
            type="button"
            title="Wishlist"
          >
            <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>

          {/* Shopping Bag */}
          <button
            aria-label="Shopping Cart"
            onClick={() => setCartOpen(true)}
            className="p-1 text-[#F8E8D9]/80 hover:text-[#C8A463] transition-colors relative flex items-center justify-center cursor-pointer"
            type="button"
            title="Atelier Bag"
          >
            <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            <span className="absolute -top-1 -right-1.5 min-w-[15px] h-[15px] px-0.5 rounded-full bg-[#C8A463] text-[#38151D] text-[9px] flex items-center justify-center font-bold font-sans">
              {cartCount > 0 ? cartCount : 2}
            </span>
          </button>

          {/* User Profile */}
          <button
            aria-label="User Profile"
            onClick={() => {
              setSelectedProductId(null);
              setCustomerSection("profile");
            }}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-[#F8E8D9] hover:bg-white/20 hover:border-[#C8A463] transition-colors cursor-pointer"
            type="button"
            title="Patron Profile"
          >
            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* STUDIO Pill Button matching reference */}
          <button
            onClick={() => setPortalMode("designer")}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1 bg-white/5 hover:bg-[#C8A463] text-[#EAD8BA] hover:text-[#38151D] border border-[#C8A463]/40 rounded-full text-[10px] sm:text-[11px] font-sans font-medium uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-xs"
            title="Switch to Designer Studio"
          >
            <ArrowRightLeft className="w-2.5 h-2.5" />
            <span>STUDIO</span>
          </button>
        </div>
      </div>
    </header>
  );
};
