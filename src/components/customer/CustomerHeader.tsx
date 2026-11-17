"use client";

import React, { useState, useRef, useEffect } from "react";
import { useStudio } from "@/context/StudioContext";
import { Bell, ShoppingCart, Search, User, LogOut, Sparkles } from "lucide-react";

export const CustomerHeader: React.FC = () => {
  const {
    customerSection,
    setCustomerSection,
    customerSearchQuery,
    setCustomerSearchQuery,
    setCustomerNotificationsOpen,
    setPortalMode,
    requestStudioAccess,
    setSelectedProductId,
    cartCount,
    setCartOpen,
    customerProfile,
    logoutCustomer,
    showToast
  } = useStudio();

  const [activeTopNavItem, setActiveTopNavItem] = useState<string>("home");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        handleNavClick("top-deals", "top-deals");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    {
      id: "custom-orders",
      label: "CUSTOM ORDERS",
      onClick: () => handleNavClick("custom-orders", "custom-orders")
    },
    {
      id: "uvibe",
      label: "UVIBE",
      onClick: () => {
        handleNavClick("uvibe", "uvibe");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  ];

  return (
    <header
      className="sticky top-0 left-0 right-0 w-full z-50 border-b"
      style={{
        backgroundColor: "#44141C",
        borderColor: "rgba(232, 210, 183, 0.16)"
      }}
    >
      <div className="h-[58px] max-w-[1240px] mx-auto px-5 sm:px-8 flex items-center justify-between gap-4">
        {/* Left Brand Wordmark: ATELIER / MAISON PRIVÉE */}
        <button
          type="button"
          onClick={() => handleNavClick("discover", "home")}
          className="flex flex-col items-start leading-none cursor-pointer group shrink-0 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8D2B7]"
          title="Atelier Maison Privée"
        >
          <span
            className="text-[8px] tracking-[0.28em] text-[#D9BFA4] uppercase italic font-normal"
            style={{ fontFamily: "var(--font-nevrada), 'Nevrada', var(--font-cormorant), 'Playfair Display', serif" }}
          >
            ATELIER
          </span>
          <span
            className="text-[14px] sm:text-[15px] tracking-[0.16em] text-[#FAF4ED] font-normal uppercase mt-0.5"
            style={{ fontFamily: "var(--font-nevrada), 'Nevrada', var(--font-cormorant), 'Playfair Display', serif" }}
          >
            MAISON PRIVÉE
          </span>
        </button>

        {/* Navigation Links: HOME, TOP DEALS, CUSTOM ORDERS, UVIBE */}
        <nav className="hidden lg:flex items-center gap-6 h-full ml-2">
          {navItems.map((item) => {
            const isActive =
              (item.id === "home" && customerSection === "discover") ||
              (item.id === "top-deals" && customerSection === "top-deals") ||
              (item.id === "custom-orders" && customerSection === "custom-orders") ||
              (item.id === "uvibe" && customerSection === "uvibe");

            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`h-full flex items-center uppercase text-[10px] tracking-[0.16em] transition-colors cursor-pointer font-sans ${
                  isActive
                    ? "text-[#FAF4ED] font-semibold"
                    : "text-[#EEDFD5]/75 hover:text-[#FAF4ED] font-medium"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Sleek Rectangular Search Bar */}
        <div className="relative hidden sm:block flex-1 max-w-[330px] ml-auto mr-2">
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
            className="w-full h-8 bg-[#2E0B12]/70 hover:bg-[#2E0B12]/90 focus:bg-[#2E0B12] px-3 pr-8 text-[11px] text-[#FAF4ED] placeholder:text-[#E8D2B7]/55 focus:outline-none transition-colors rounded-[2px] border border-[#E8D2B7]/25 focus:border-[#E8D2B7]/60 font-sans"
          />
          <Search className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-[#E8D2B7]/70 pointer-events-none" />
        </div>

        {/* Right Utility Controls: Bell, Bag, User Profile, Rectangular STUDIO Button */}
        <div className="flex items-center gap-3.5 shrink-0">
          <button
            aria-label="Notifications"
            onClick={() => setCustomerNotificationsOpen(true)}
            className="p-1 text-[#FAF4ED]/85 hover:text-[#E8D2B7] transition-colors relative flex items-center justify-center cursor-pointer"
            type="button"
            title="Salon Notifications"
          >
            <Bell className="w-[16px] h-[16px]" strokeWidth={1.6} />
          </button>

          <button
            aria-label="Shopping Cart"
            onClick={() => setCartOpen(true)}
            className="p-1 text-[#FAF4ED]/85 hover:text-[#E8D2B7] transition-colors relative flex items-center justify-center cursor-pointer"
            type="button"
            title="Shopping Cart"
          >
            <ShoppingCart className="w-[16px] h-[16px]" strokeWidth={1.6} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1.5 min-w-[14px] h-[14px] px-0.5 rounded-full bg-[#C8A463] text-[#38151D] text-[8px] flex items-center justify-center font-bold font-sans">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile & Customer Session Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              aria-label="User Profile"
              onClick={() => setUserMenuOpen((prev) => !prev)}
              className="p-1 text-[#FAF4ED]/85 hover:text-[#E8D2B7] transition-colors flex items-center justify-center cursor-pointer"
              type="button"
              title="Customer Profile & Session"
            >
              <User className="w-[16px] h-[16px]" strokeWidth={1.6} />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-9 w-60 rounded-xl bg-[#280914] border border-[#C59347]/40 shadow-[0_10px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(197,147,71,0.25)] py-2 z-50 text-left backdrop-blur-md">
                <div className="px-3.5 py-2 border-b border-[#C59347]/15">
                  <div className="text-[11px] font-semibold text-[#FAF4ED] truncate">
                    {customerProfile.customerName}
                  </div>
                  <div className="text-[9px] text-[#E8D2B7]/70 truncate">
                    {customerProfile.email}
                  </div>
                  <div className="mt-1 inline-flex items-center gap-1 text-[8px] uppercase tracking-wider text-[#C59347] font-semibold bg-[#3A0E1E] px-2 py-0.5 rounded-full border border-[#C59347]/30">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>VIP Salon Customer</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedProductId(null);
                    setCustomerSection("profile");
                    setUserMenuOpen(false);
                  }}
                  className="w-full px-3.5 py-2 text-[10px] uppercase tracking-wider text-[#FAF4ED]/85 hover:text-[#FAF4ED] hover:bg-[#3A0E1E] flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-[#C59347]" />
                  <span>Customer Profile & Fits</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUserMenuOpen(false);
                    logoutCustomer();
                  }}
                  className="w-full px-3.5 py-2 text-[10px] uppercase tracking-wider text-rose-300 hover:text-rose-200 hover:bg-rose-950/40 flex items-center gap-2 cursor-pointer transition-colors border-t border-[#C59347]/15 mt-1"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                  <span>Sign Out of Salon</span>
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={requestStudioAccess}
            className="px-3.5 py-1.5 bg-transparent hover:bg-[#FAF4ED] text-[#FAF4ED] hover:text-[#44141C] border border-[#E8D2B7]/50 rounded-[2px] text-[10px] font-sans font-medium uppercase tracking-[0.2em] transition-colors duration-300 cursor-pointer flex items-center gap-1.5"
            title="Protected Couturier Studio (Passkey Required)"
          >
            <span>STUDIO</span>
          </button>
        </div>
      </div>
    </header>
  );
};
