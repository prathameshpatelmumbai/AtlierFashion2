"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { motion, AnimatePresence } from "framer-motion";
import { UtilitiesModals } from "./UtilitiesModals";
import { AltierLogo } from "@/components/common/AltierLogo";

export const GlobalHeader: React.FC = () => {
  const { 
    activeSection, 
    setActiveSection, 
    setActiveStudioTab, 
    designerNotificationCount: notificationCount,
    openUtilityModal,
    subscription,
    setPortalMode
  } = useStudio();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact 5 Main Navigation Items strictly as specified in the HTML zip
  const navItems = [
    { id: "studio", label: "Studio", path: "studio" },
    { id: "custom-orders", label: "Custom Orders", path: "custom-orders" },
    { id: "orders-logistics", label: "Orders & Logistics", path: "orders-and-logistics" },
    { id: "sales-insights", label: "Sales Insights", path: "sales-insights" },
    { id: "profile", label: "Profile", path: "profile" },
  ] as const;

  const handleNavClick = (id: typeof activeSection) => {
    setActiveSection(id);
    if (id === "studio") {
      setActiveStudioTab("listed");
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 w-full z-50 bg-primary/95 backdrop-blur-xl border-b border-outline-variant/20 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        {/* Top Minimal Boutique Switcher Bar */}
        <div className="bg-[#231820] text-[#FFF7F9] px-4 sm:px-16 py-1 text-xs font-sans flex items-center justify-between border-b border-primary/50">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-container shadow-[0_0_6px_rgba(255,185,164,0.8)]"></span>
            <span className="tracking-widest uppercase font-medium text-[10px] text-tertiary-fixed">
              Atelier Maison Privée — Haute Curated Sanctuary
            </span>
          </div>
          <button
            onClick={() => setPortalMode("customer")}
            className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-primary-container/80 hover:bg-primary text-tertiary-fixed text-[11px] font-medium transition-all border border-outline-variant/30"
            title="Switch to Customer Boutique"
          >
            <span className="material-symbols-outlined text-[13px] text-secondary-container">sync_alt</span>
            <span>Switch to Customer Boutique</span>
          </button>
        </div>

        <div className="h-20 w-full px-4 sm:px-8 lg:px-16 flex items-center justify-between">
          
          {/* Brand Logo & Home Link */}
          <div 
            onClick={() => handleNavClick("studio")}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
            title="ALTIER Maison Privée"
          >
            <AltierLogo height={38} variant="horizontal" theme="dark" />
          </div>

          {/* Central Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 h-full">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`h-full flex items-center uppercase tracking-widest text-sm transition-all duration-200 border-b-2 ${
                    isActive
                      ? "text-tertiary-fixed border-secondary-container font-medium"
                      : "text-inverse-on-surface/70 hover:text-inverse-on-surface border-transparent font-normal"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Notifications */}
            <button
              onClick={() => openUtilityModal("notifications")}
              aria-label="Notifications" 
              className="relative flex items-center justify-center p-2 text-inverse-on-surface/80 hover:text-inverse-on-surface transition-colors" 
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              {notificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary-container ring-2 ring-primary"></span>
              )}
            </button>

            {/* Transaction History */}
            <button
              onClick={() => openUtilityModal("transactions")}
              aria-label="Transaction History" 
              className="flex items-center gap-1 font-label-md text-label-md uppercase tracking-wider text-inverse-on-surface/80 hover:text-inverse-on-surface transition-colors p-2" 
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            </button>

            {/* Pro Badge */}
            <div 
              onClick={() => openUtilityModal("subscription")}
              className="border border-outline-variant/40 px-2.5 py-1 bg-primary-container/40 rounded cursor-pointer hover:border-secondary-container transition-colors"
            >
              <span className="font-label-sm text-label-sm tracking-widest uppercase text-tertiary-fixed font-semibold">
                {subscription.currentTier || "PRO"}
              </span>
            </div>

            {/* Profile Avatar */}
            <div 
              onClick={() => handleNavClick("profile")}
              className="w-8 h-8 rounded-full bg-primary-container/80 border border-secondary-container/40 flex items-center justify-center cursor-pointer hover:border-secondary-container transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">person</span>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-inverse-on-surface/80 hover:text-inverse-on-surface transition-colors"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-primary border-t border-outline-variant/20 px-6 py-4 flex flex-col space-y-3"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-sm uppercase tracking-wider py-2 transition-colors ${
                    activeSection === item.id 
                      ? "text-tertiary-fixed font-semibold border-l-2 border-secondary-container pl-3" 
                      : "text-inverse-on-surface/70 hover:text-inverse-on-surface pl-3"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between">
                <button
                  onClick={() => { setPortalMode("customer"); setMobileMenuOpen(false); }}
                  className="text-xs uppercase tracking-wider text-secondary-container flex items-center gap-1.5 py-1"
                >
                  <span className="material-symbols-outlined text-[16px]">sync_alt</span>
                  <span>Switch to Boutique</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Modals for Header Actions */}
      <UtilitiesModals />
    </>
  );
};
