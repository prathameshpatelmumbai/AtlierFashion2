"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cookie,
  ShieldCheck,
  Check,
  X,
  SlidersHorizontal,
  Lock,
  Sparkles,
  Info
} from "lucide-react";
import {
  CookiePreferences,
  DEFAULT_COOKIE_PREFERENCES,
  ALL_ACCEPTED_COOKIES,
  STRICT_REJECTED_COOKIES,
  getStoredCookieConsent,
  saveCookieConsent
} from "@/lib/security/vault-shield";

interface CookieConsentBannerProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  forceOpen = false,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_COOKIE_PREFERENCES);

  useEffect(() => {
    const { status, preferences: storedPrefs } = getStoredCookieConsent();
    setPreferences(storedPrefs);
    if (forceOpen) {
      setIsVisible(true);
      setIsCustomizeOpen(true);
    } else if (status === "pending") {
      // Delay showing by 1 second for graceful entry
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [forceOpen]);

  const handleAcceptAll = () => {
    saveCookieConsent("accepted", ALL_ACCEPTED_COOKIES);
    setPreferences(ALL_ACCEPTED_COOKIES);
    setIsVisible(false);
    setIsCustomizeOpen(false);
    if (onClose) onClose();
  };

  const handleRejectOptional = () => {
    saveCookieConsent("rejected", STRICT_REJECTED_COOKIES);
    setPreferences(STRICT_REJECTED_COOKIES);
    setIsVisible(false);
    setIsCustomizeOpen(false);
    if (onClose) onClose();
  };

  const handleSaveCustom = () => {
    saveCookieConsent("custom", preferences);
    setIsVisible(false);
    setIsCustomizeOpen(false);
    if (onClose) onClose();
  };

  if (!isVisible && !forceOpen) return null;

  return (
    <>
      {/* Floating Bottom Cookie Consent Notice */}
      <AnimatePresence>
        {isVisible && !isCustomizeOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-[540px] z-[9999]"
          >
            <div className="p-5 sm:p-6 rounded-2xl bg-[#2A0C16]/95 border border-[#C59347]/50 shadow-[0_15px_45px_rgba(0,0,0,0.7),0_0_25px_rgba(197,147,71,0.22)] backdrop-blur-xl text-[#FAF4ED] space-y-4">
              {/* Header Title with Gold Insignia */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#3A0E1E] border border-[#C59347]/60 flex items-center justify-center text-[#C59347] shadow-[0_0_12px_rgba(197,147,71,0.3)]">
                    <Cookie className="w-4 h-4 text-[#C59347]" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.24em] text-[#C59347] font-semibold block">
                      PRIVACY GOVERNANCE • ENCRYPTED VAULT
                    </span>
                    <h4
                      className="text-base text-[#FAF4ED] font-normal"
                      style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
                    >
                      Atelier Maison Privée Cookie Sanctuary
                    </h4>
                  </div>
                </div>
                <div className="px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-[8px] uppercase tracking-wider text-emerald-300 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  GDPR / CCPA
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-[#EEDFD5]/80 leading-relaxed">
                We employ essential cryptographic cookies for encrypted session authentication, and optional telemetry to personalize neural drape synthesis and private salon recommendations.
              </p>

              {/* Buttons: Accept, Reject, Customize */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#C59347] via-[#D4AF37] to-[#C59347] hover:brightness-110 text-[#1E060F] text-[11px] font-semibold uppercase tracking-[0.16em] transition-all shadow-[0_0_15px_rgba(197,147,71,0.3)] hover:shadow-[0_0_25px_rgba(197,147,71,0.5)] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Accept All</span>
                </button>

                <button
                  type="button"
                  onClick={handleRejectOptional}
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-lg border border-[#C59347]/40 hover:border-[#C59347] bg-[#1E0610]/80 hover:bg-[#38101E] text-[#E8D2B7] hover:text-[#FAF4ED] text-[11px] font-semibold uppercase tracking-[0.16em] transition-all cursor-pointer shadow-xs"
                >
                  Reject Optional
                </button>

                <button
                  type="button"
                  onClick={() => setIsCustomizeOpen(true)}
                  className="w-full sm:w-auto p-2.5 rounded-lg border border-[#C59347]/30 hover:border-[#C59347] bg-[#1E0610]/40 hover:bg-[#38101E] text-[#E8D2B7] text-[10px] tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                  title="Customize Preferences"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span className="sm:hidden text-[10px] uppercase">Customize</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detailed Cookie Customization Modal */}
      <AnimatePresence>
        {isCustomizeOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl bg-[#280A15] border border-[#C59347]/50 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(197,147,71,0.25)] p-6 text-[#FAF4ED] space-y-5"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-[#C59347]/20 pb-4">
                <div className="flex items-center gap-2.5">
                  <SlidersHorizontal className="w-5 h-5 text-[#C59347]" />
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#C59347] font-semibold block">
                      PRIVACY ARCHITECTURE
                    </span>
                    <h3
                      className="text-lg text-[#FAF4ED] font-normal"
                      style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
                    >
                      Bespoke Cookie Preferences
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCustomizeOpen(false)}
                  className="p-1 rounded-md text-[#E8D2B7]/70 hover:text-[#FAF4ED] hover:bg-[#3A0E1E] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Toggles List */}
              <div className="space-y-3.5 text-xs">
                {/* 1. Essential Cookies (Strictly Necessary - Locked) */}
                <div className="p-3.5 rounded-xl bg-[#1A050E]/80 border border-[#C59347]/30 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-semibold text-[#FAF4ED]">
                      <Lock className="w-3.5 h-3.5 text-[#C59347]" />
                      <span>Essential Vault Security Cookies</span>
                      <span className="text-[8px] uppercase tracking-wider text-[#C59347] font-bold border border-[#C59347]/40 px-1.5 py-0.5 rounded-full">
                        ALWAYS ACTIVE
                      </span>
                    </div>
                    <p className="text-[11px] text-[#EEDFD5]/70 leading-relaxed">
                      Required for cryptographic customer authentication, CSRF tokens, secure checkout escrow, and anti-tamper firewall checks. Cannot be disabled.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="w-4 h-4 accent-[#C59347] mt-1 cursor-not-allowed opacity-80"
                  />
                </div>

                {/* 2. Functional Cookies (Sizing & Fitted Moodboards) */}
                <div className="p-3.5 rounded-xl bg-[#1A050E]/80 border border-[#C59347]/30 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-semibold text-[#FAF4ED]">
                      <Sparkles className="w-3.5 h-3.5 text-[#C59347]" />
                      <span>Functional Silhouette Preferences</span>
                    </div>
                    <p className="text-[11px] text-[#EEDFD5]/70 leading-relaxed">
                      Remembers your bespoke fitting measurements, selected wardrobe eras, and curated fabric moodboards.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                    className="w-4 h-4 accent-[#C59347] mt-1 cursor-pointer"
                  />
                </div>

                {/* 3. Analytics & Neural Drape Telemetry */}
                <div className="p-3.5 rounded-xl bg-[#1A050E]/80 border border-[#C59347]/30 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-semibold text-[#FAF4ED]">
                      <Info className="w-3.5 h-3.5 text-[#C59347]" />
                      <span>Uvibe Neural Drape Analytics</span>
                    </div>
                    <p className="text-[11px] text-[#EEDFD5]/70 leading-relaxed">
                      Measures neural synthesis computation speed and garment recommendation accuracy without collecting personal identifiers.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="w-4 h-4 accent-[#C59347] mt-1 cursor-pointer"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#C59347]/20">
                <button
                  type="button"
                  onClick={handleRejectOptional}
                  className="px-4 py-2.5 rounded-lg border border-[#C59347]/40 hover:border-[#C59347] text-[#E8D2B7] text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Reject All Optional
                </button>
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="px-6 py-2.5 rounded-lg bg-[#C59347] hover:bg-[#D4AF37] text-[#1D060F] text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(197,147,71,0.3)] cursor-pointer"
                >
                  Save Preferences
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
