"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useStudio } from "@/context/StudioContext";
import { Bell, ShoppingCart, Search, User, LogOut, Sparkles, Wand2, ArrowRight, X, ChevronRight } from "lucide-react";
import { StytellLogo } from "@/components/common/AltierLogo";
import { rankGarmentsByQuery } from "@/lib/uvibe-search";
import { parseFashionQuery } from "@/lib/uvibe-ai-engine";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.NODE_ENV === "production" ? "/AtlierFashion2" : "");
const asset = (p: string) => {
  if (!p) return "";
  if (p.startsWith("http://") || p.startsWith("https://") || p.startsWith("data:")) return p;
  return `${BASE_PATH}${p.startsWith("/") ? "" : "/"}${p}`;
};

const CURATED_SYNTHESIS_PROMPTS = [
  "Crimson velvet kalidar lehenga with zardozi",
  "Burgundy cashmere architectural overcoat",
  "Emerald raw silk sherwani with bullion embroidery",
  "Organza silk pleated evening trench",
  "Gold brocade bridal saree with heritage border"
];

export const CustomerHeader: React.FC = () => {
  const {
    customerSection,
    setCustomerSection,
    customerSearchQuery,
    setCustomerSearchQuery,
    setCustomerNotificationsOpen,
    requestStudioAccess,
    setSelectedProductId,
    cartCount,
    setCartOpen,
    customerProfile,
    logoutCustomer,
    listedProducts,
    setUvibePrompt,
    showToast
  } = useStudio();

  const [, setActiveTopNavItem] = useState<string>("home");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Real-time Text Synthesis ranking on the query
  const ranking = useMemo(() => {
    if (!customerSearchQuery || customerSearchQuery.trim().length < 2) return null;
    return rankGarmentsByQuery(customerSearchQuery.trim(), {}, listedProducts);
  }, [customerSearchQuery, listedProducts]);

  // Real-time fashion attribute parsing (silhouettes, fabrics, colors, crafts)
  const parsed = useMemo(() => {
    if (!customerSearchQuery || customerSearchQuery.trim().length < 2) return null;
    return parseFashionQuery(customerSearchQuery.trim());
  }, [customerSearchQuery]);

  const handleTriggerSynthesis = (overridePrompt?: string) => {
    const query = (overridePrompt ?? customerSearchQuery).trim();
    if (!query) {
      setCustomerSection("uvibe");
      setSelectedProductId(null);
      setSearchDropdownOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setCustomerSearchQuery(query);
    setUvibePrompt(query);
    setSelectedProductId(null);
    setCustomerSection("uvibe");
    setSearchDropdownOpen(false);
    showToast(`✨ Synthesizing "${query}" in UVIBE Studio...`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (section: typeof customerSection, navId: string = "home") => {
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
        {/* Left Brand Logo: STYTELL Luxury Horizontal Lockup with proper breathing room */}
        <div className="flex items-center gap-5 sm:gap-6 shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick("discover", "home")}
            className="flex items-center cursor-pointer group shrink-0 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8D2B7]"
            title="STYTELL Maison Privée"
          >
            <StytellLogo height={34} variant="horizontal" theme="dark" />
          </button>

          {/* Luxury Editorial Hairline Divider for confident visual hierarchy */}
          <div className="hidden lg:block h-4 w-px bg-[#E8D2B7]/25" aria-hidden="true" />
        </div>

        {/* Navigation Links: HOME, TOP DEALS, CUSTOM ORDERS, UVIBE */}
        <nav className="hidden lg:flex items-center gap-7 h-full">
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

        {/* Text Synthesis Rectangular Search Bar */}
        <div ref={searchContainerRef} className="relative hidden sm:block flex-1 max-w-[340px] ml-auto mr-2">
          <div className="relative flex items-center">
            <input
              type="text"
              value={customerSearchQuery}
              onFocus={() => setSearchDropdownOpen(true)}
              onChange={(e) => {
                setCustomerSearchQuery(e.target.value);
                setSearchDropdownOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleTriggerSynthesis();
                }
                if (e.key === "Escape") {
                  setSearchDropdownOpen(false);
                }
              }}
              placeholder="Search designers, silhouettes, etc."
              className="w-full h-8 bg-[#2E0B12]/70 hover:bg-[#2E0B12]/90 focus:bg-[#2E0B12] pl-3 pr-16 text-[11px] text-[#FAF4ED] placeholder:text-[#E8D2B7]/55 focus:outline-none transition-colors rounded-[2px] border border-[#E8D2B7]/25 focus:border-[#E8D2B7]/60 font-sans"
            />

            <div className="absolute right-1.5 flex items-center gap-1">
              {customerSearchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setCustomerSearchQuery("");
                  }}
                  className="p-1 text-[#E8D2B7]/50 hover:text-[#FAF4ED] transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
              <button
                type="button"
                onClick={() => handleTriggerSynthesis()}
                className="p-1 text-[#E8D2B7]/80 hover:text-[#FAF4ED] hover:bg-[#FAF4ED]/10 rounded transition-colors cursor-pointer"
                title="Synthesize query in UVIBE"
                aria-label="Synthesize query"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Text Synthesis Real-Time Dropdown */}
          {searchDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-[390px] sm:w-[430px] rounded-xl bg-[#240812] border border-[#C59347]/40 shadow-[0_12px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(197,147,71,0.25)] py-2 z-50 text-left backdrop-blur-md overflow-hidden">
              {/* Header Badge */}
              <div className="flex items-center justify-between px-3.5 py-2 border-b border-[#C59347]/20 bg-[#1A050D]">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#C59347] font-semibold">
                  <Wand2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Text Synthesis Engine</span>
                </div>
                {ranking?.overallConfidence ? (
                  <span className="text-[9.5px] font-mono px-2 py-0.5 rounded-[2px] bg-[#3B1218] text-[#F7E7CE] font-bold border border-[#C59347]/30">
                    Match {ranking.overallConfidence}%
                  </span>
                ) : (
                  <span className="text-[9px] font-mono text-[#E8D2B7]/60">
                    Press Enter to Synthesize
                  </span>
                )}
              </div>

              {/* Parsed Attributes Strip if detected */}
              {parsed && (parsed.detectedSilhouettes.length > 0 || parsed.detectedFabrics.length > 0 || parsed.detectedColors.length > 0 || parsed.detectedCrafts.length > 0) && (
                <div className="flex flex-wrap items-center gap-1 px-3.5 py-1.5 border-b border-[#C59347]/15 bg-[#2B0A15]/80">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#C59347]/70 mr-1">Parsed:</span>
                  {parsed.detectedSilhouettes.map((c: string) => (
                    <span key={c} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#3B1218] text-[#FAF4ED] border border-[#C59347]/30">
                      {c}
                    </span>
                  ))}
                  {parsed.detectedFabrics.map((f: string) => (
                    <span key={f} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#3B1218] text-[#FAF4ED] border border-[#C59347]/30">
                      {f}
                    </span>
                  ))}
                  {parsed.detectedColors.map((col: string) => (
                    <span key={col} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#3B1218] text-[#FAF4ED] border border-[#C59347]/30">
                      {col}
                    </span>
                  ))}
                  {parsed.detectedCrafts.map((cr: string) => (
                    <span key={cr} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#3B1218] text-[#FAF4ED] border border-[#C59347]/30">
                      {cr}
                    </span>
                  ))}
                </div>
              )}

              {/* If ranking has topMatch */}
              {ranking?.topMatch ? (
                <div className="p-3 border-b border-[#C59347]/15 space-y-2">
                  <div className="text-[9.5px] font-mono uppercase tracking-wider text-[#E8D2B7]/70 flex items-center justify-between">
                    <span>Top Synthesized Match</span>
                    <span className="text-[#C59347] font-semibold">{ranking.topMatch.matchScore}% Neural Match</span>
                  </div>

                  <div
                    onClick={() => {
                      if (ranking.topMatch?.id) {
                        setSelectedProductId(ranking.topMatch.id);
                        setSearchDropdownOpen(false);
                      } else {
                        handleTriggerSynthesis();
                      }
                    }}
                    className="flex items-center gap-3 p-2 rounded-lg bg-[#320C18]/90 hover:bg-[#3D101E] border border-[#C59347]/25 transition-all cursor-pointer group"
                  >
                    <img
                      src={asset(ranking.topMatch.image)}
                      alt={ranking.topMatch.title}
                      className="w-12 h-16 rounded object-cover object-top border border-[#C59347]/30 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-serif font-bold text-[#FAF4ED] truncate group-hover:text-[#E8D2B7] transition-colors">
                        {ranking.topMatch.title}
                      </div>
                      <div className="text-[10px] text-[#C59347] font-mono truncate">
                        {ranking.topMatch.silhouette} • {ranking.topMatch.fabrics?.join(", ") || "Artisan weave"}
                      </div>
                      <div className="text-[11px] font-mono text-[#FAF4ED]/90 mt-1 font-semibold">
                        ₹{ranking.topMatch.price.toLocaleString("en-IN")}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#C59347]/70 group-hover:text-[#FAF4ED] transition-colors shrink-0" />
                  </div>

                  {/* Secondary matches preview */}
                  {ranking.similarSuggestions.length > 0 && (
                    <div className="pt-1 space-y-1.5">
                      <div className="text-[9px] font-mono uppercase tracking-wider text-[#E8D2B7]/60">
                        Related Neural Recommendations
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {ranking.similarSuggestions.slice(0, 2).map((item) => (
                          <div
                            key={item.id}
                            onClick={() => {
                              setSelectedProductId(item.id);
                              setSearchDropdownOpen(false);
                            }}
                            className="flex items-center gap-2 p-1.5 rounded bg-[#2B0A15]/80 hover:bg-[#3A0F1D] border border-[#C59347]/20 transition-all cursor-pointer group"
                          >
                            <img
                              src={asset(item.image)}
                              alt={item.title}
                              className="w-8 h-10 rounded object-cover object-top shrink-0 border border-[#C59347]/20"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="text-[10px] font-sans font-medium text-[#FAF4ED] truncate group-hover:text-[#E8D2B7]">
                                {item.title}
                              </div>
                              <div className="text-[9px] font-mono text-[#C59347]">
                                ₹{item.price.toLocaleString("en-IN")}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Curated Synthesis Prompts when empty or no matches */
                <div className="p-3.5 space-y-2.5">
                  <div className="text-[9.5px] font-mono uppercase tracking-wider text-[#C59347] font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    <span>Curated Natural Text Prompts</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {CURATED_SYNTHESIS_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => handleTriggerSynthesis(prompt)}
                        className="text-left text-[11px] font-sans text-[#FAF4ED]/85 hover:text-[#FAF4ED] hover:bg-[#380E1C] px-2.5 py-1.5 rounded border border-[#C59347]/15 hover:border-[#C59347]/50 transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <span className="truncate">{prompt}</span>
                        <ArrowRight className="w-3 h-3 text-[#C59347]/50 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Direct UVIBE Synthesis CTA */}
              <button
                type="button"
                onClick={() => handleTriggerSynthesis()}
                className="w-full py-2.5 px-3.5 bg-[#3B1218] hover:bg-[#4E1821] text-[#FAF4ED] text-[10px] uppercase tracking-[0.16em] flex items-center justify-center gap-2 border-t border-[#C59347]/20 font-semibold transition-colors cursor-pointer"
              >
                <Wand2 className="w-3.5 h-3.5 text-[#E2B43B]" />
                <span>
                  {customerSearchQuery ? `Synthesize "${customerSearchQuery}" in UVIBE` : "Open Text Synthesis Studio"}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E2B43B]" />
              </button>
            </div>
          )}
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
      <nav aria-label="Mobile storefront navigation" className="lg:hidden flex items-center justify-around gap-2 px-3 border-t border-[#E8D2B7]/15">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={item.onClick}
            aria-current={(item.id === "home" ? customerSection === "discover" : customerSection === item.id) ? "page" : undefined}
            className="min-h-11 px-2 text-[9px] uppercase tracking-wider text-[#EEDFD5]/80 aria-[current=page]:text-[#F2D8A7] aria-[current=page]:border-b aria-[current=page]:border-[#C5A059]"
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
};
