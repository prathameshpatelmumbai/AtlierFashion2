"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { ArrowRightLeft } from "lucide-react";
import { AltierLogo } from "@/components/common/AltierLogo";

export const CustomerHeader: React.FC = () => {
  const {
    customerSection,
    setCustomerSection,
    customerSearchQuery,
    setCustomerSearchQuery,
    setCustomerNotificationsOpen,
    setPortalMode,
    setSelectedProductId,
    cartCount,
    setCartOpen
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
      label: "Home", 
      onClick: () => handleNavClick("discover", "home") 
    },
    { 
      id: "top-deals", 
      label: "Top Deals", 
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
      label: "Custom Orders", 
      onClick: () => handleNavClick("custom-orders", "custom-orders") 
    },
    { 
      id: "uvibe", 
      label: "Uvibe", 
      onClick: () => handleNavClick("uvibe", "uvibe") 
    }
  ];

  return (
    <header
      className="sticky top-0 left-0 right-0 w-full z-50 backdrop-blur-md shadow-[0_1px_8px_rgba(36,23,27,0.06)] border-b bg-primary-container"
      style={{
        backgroundColor: "rgb(84, 35, 51)",
        borderColor: "rgba(255, 255, 255, 0.15)"
      }}
    >
      <div className="h-20 max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Logo & Home Link (Previous Atelier Logo from Designer Side) */}
        <div
          onClick={() => handleNavClick("discover", "home")}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
          title="ALTIER Maison Privée"
        >
          <AltierLogo height={38} variant="horizontal" theme="dark" />
        </div>

        {/* Center Main Navigation with Premium Serif Font and Golden Selected State */}
        <nav className="hidden lg:flex items-center gap-8 h-full" id="header-main-nav">
          {navItems.map((item) => {
            const isActive =
              (item.id === "home" && customerSection === "discover" && activeTopNavItem !== "top-deals") ||
              (item.id === "top-deals" && activeTopNavItem === "top-deals" && customerSection === "discover") ||
              (item.id === "custom-orders" && customerSection === "custom-orders") ||
              (item.id === "uvibe" && customerSection === "uvibe");

            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`h-full flex items-center uppercase text-[13px] sm:text-[14px] transition-all duration-300 border-b-2 cursor-pointer ${
                  isActive
                    ? "text-[#D4AF37] font-semibold border-[#D4AF37] drop-shadow-[0_1px_6px_rgba(212,175,55,0.45)]"
                    : "text-white/80 hover:text-[#D4AF37] border-transparent font-normal"
                }`}
                style={{
                  fontFamily: "var(--font-cormorant), 'Playfair Display', serif",
                  letterSpacing: "0.2em"
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Search, Notifications, Cart, Profile, Switcher */}
        <div className="flex items-center gap-4 lg:gap-6 shrink-0">
          {/* Search Input */}
          <div className="relative hidden sm:block">
            <input
              type="text"
              value={customerSearchQuery}
              onChange={(e) => {
                setCustomerSearchQuery(e.target.value);
                if (customerSection !== "catalog" && customerSection !== "discover") {
                  setCustomerSection("catalog");
                }
              }}
              placeholder="Search designers, silhouettes, archival pieces..."
              className="w-64 xl:w-80 h-10 bg-white/10 px-4 pr-9 font-body-sm text-body-sm text-white placeholder:text-white/50 focus:outline-none focus:bg-white/15 transition-colors rounded-none border border-white/20"
            />
            <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-[18px] text-white/60 pointer-events-none">
              search
            </span>
          </div>

          <div className="flex items-center gap-3 lg:gap-4">
            {/* Notifications */}
            <button
              aria-label="Notifications"
              onClick={() => setCustomerNotificationsOpen(true)}
              className="p-1.5 text-white/80 hover:text-[#d4af37] transition-colors relative flex items-center justify-center cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px] text-white">
                notifications
              </span>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#d4af37]"></span>
            </button>

            {/* Shopping Cart */}
            <button
              aria-label="Shopping Cart"
              onClick={() => setCartOpen(true)}
              className="p-1.5 text-white/80 hover:text-[#d4af37] transition-colors relative flex items-center justify-center cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px] text-white">
                shopping_bag
              </span>
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#d4af37] text-[#1c1216] font-label-sm text-[9px] flex items-center justify-center font-bold">
                {cartCount > 0 ? cartCount : 3}
              </span>
            </button>

            {/* User Profile */}
            <button
              aria-label="User Profile"
              onClick={() => {
                setSelectedProductId(null);
                setCustomerSection("profile");
              }}
              className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-white">
                person
              </span>
            </button>

            {/* Switch to Designer Portal */}
            <button
              onClick={() => setPortalMode("designer")}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-[#d4af37]/20 hover:bg-[#d4af37]/30 text-[#f6dfc4] hover:text-white border border-[#d4af37]/50 rounded-none text-[11px] font-sans font-medium uppercase tracking-wider transition-all cursor-pointer"
              title="Switch to Designer Studio"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Studio</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
