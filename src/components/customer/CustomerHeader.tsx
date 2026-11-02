"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { 
  Search, 
  Bell, 
  User, 
  ArrowRightLeft, 
  Compass, 
  Sparkles, 
  Package, 
  Scissors,
  CheckCircle2,
  X
} from "lucide-react";
import { AltierLogo } from "@/components/common/AltierLogo";

export const CustomerHeader: React.FC = () => {
  const {
    customerSection,
    setCustomerSection,
    customerSearchQuery,
    setCustomerSearchQuery,
    customerNotificationCount,
    setCustomerNotificationsOpen,
    portalMode,
    setPortalMode,
    customerProfile,
    setSelectedProductId
  } = useStudio();

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const navLinks: { id: "discover" | "designers" | "orders" | "custom-orders"; label: string; icon: React.ReactNode }[] = [
    { id: "discover", label: "Discover", icon: <Compass className="w-4 h-4" /> },
    { id: "designers", label: "Designers", icon: <Sparkles className="w-4 h-4" /> },
    { id: "orders", label: "Orders", icon: <Package className="w-4 h-4" /> },
    { id: "custom-orders", label: "Custom Orders", icon: <Scissors className="w-4 h-4" /> },
  ];

  const handleNavClick = (section: "discover" | "designers" | "orders" | "custom-orders") => {
    setSelectedProductId(null);
    setCustomerSection(section);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF7F9]/95 backdrop-blur-md border-b border-[#E8D2B7]/60 transition-all duration-300">
      {/* Top Banner: Portal Switcher Bar */}
      <div className="bg-[#231820] text-[#FFF7F9] px-4 sm:px-8 py-1.5 text-xs font-sans flex items-center justify-between border-b border-[#3A0E1E]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]"></span>
          <span className="tracking-widest uppercase font-medium text-[10px] sm:text-xs text-[#F6DFC4]">
            Atelier Maison Privée — Customer Boutique
          </span>
        </div>
        <button
          onClick={() => setPortalMode("designer")}
          className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#F6DFC4] to-[#E8D2B7] hover:from-[#E8D2B7] hover:to-[#D9C3A9] text-[#231820] text-[11px] font-semibold transition-all border border-[#D4AF37]/50 shadow-xs"
          title="Switch to Designer Studio"
        >
          <ArrowRightLeft className="w-3 h-3 text-[#3A0E1E]" />
          <span>Switch to Designer Studio</span>
        </button>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Wordmark & Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleNavClick("discover")}
            className="text-left group focus:outline-none"
            title="ALTIER Maison Privée"
          >
            <AltierLogo height={38} variant="horizontal" theme="light" />
          </button>
        </div>

        {/* Centre Navigation */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2 bg-white/80 px-3 py-1.5 rounded-full border border-[#E8D2B7] shadow-xs">
          {navLinks.map((link) => {
            const isActive = customerSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                  isActive
                    ? "bg-[#3A0E1E] text-white border border-[#D4AF37]/50 shadow-xs"
                    : "text-[#231820] hover:text-[#3A0E1E] hover:bg-[#FCE9F4]"
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Utilities: Search, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Bar */}
          <div className="relative">
            <div className="flex items-center bg-white rounded-full border border-[#E8D2B7] px-3 py-1.5 focus-within:border-[#D4AF37] transition-all shadow-2xs">
              <Search className="w-4 h-4 text-[#837376]" />
              <input
                type="text"
                placeholder="Search pieces, fabrics..."
                value={customerSearchQuery}
                onChange={(e) => {
                  setCustomerSearchQuery(e.target.value);
                  if (customerSection !== "discover") {
                    setCustomerSection("discover");
                  }
                }}
                className="bg-transparent border-none outline-none text-xs text-[#231820] placeholder-[#837376] w-24 sm:w-44 lg:w-56 ml-2 font-sans"
              />
              {customerSearchQuery && (
                <button
                  onClick={() => setCustomerSearchQuery("")}
                  className="text-[#837376] hover:text-[#231820] ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Notifications Button */}
          <button
            onClick={() => setCustomerNotificationsOpen(true)}
            className="relative p-2.5 rounded-full bg-white border border-[#E8D2B7] hover:bg-[#FFF7F9] hover:border-[#D4AF37] text-[#231820] hover:text-[#3A0E1E] transition-all shadow-2xs"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {customerNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#3A0E1E] text-white text-[9px] font-bold flex items-center justify-center border-2 border-[#D4AF37]">
                {customerNotificationCount}
              </span>
            )}
          </button>

          {/* Customer Profile Pill */}
          <button
            onClick={() => {
              setSelectedProductId(null);
              setCustomerSection("profile");
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
              customerSection === "profile"
                ? "bg-[#3A0E1E] text-white border-[#D4AF37]/60 shadow-xs"
                : "bg-white text-[#231820] border-[#E8D2B7] hover:border-[#D4AF37] hover:bg-[#FFF7F9]"
            } shadow-2xs`}
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#F6DFC4] to-[#E8D2B7] text-[#3A0E1E] border border-[#D4AF37]/50 flex items-center justify-center text-xs font-bold">
              {customerProfile.customerName.charAt(0)}
            </div>
            <span className="hidden lg:inline text-xs font-semibold tracking-wide">
              {customerProfile.customerName.split(" ")[0]}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Row */}
      <div className="md:hidden border-t border-[#E4D5C5]/60 bg-white/90 px-4 py-2 flex items-center justify-around">
        {navLinks.map((link) => {
          const isActive = customerSection === link.id;
          return (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`flex flex-col items-center gap-1 text-[11px] font-medium py-1 px-2 rounded-lg transition-colors ${
                isActive ? "text-[#542333] font-semibold" : "text-[#8F8178]"
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};

