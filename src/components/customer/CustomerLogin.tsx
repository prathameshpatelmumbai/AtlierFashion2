"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Eye,
  EyeOff,
  Mail,
  Key,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  User,
  Crown,
  Compass,
  HelpCircle
} from "lucide-react";
import confetti from "canvas-confetti";
import { useStudio } from "@/context/StudioContext";

interface VipProfile {
  name: string;
  email: string;
  title: string;
  tier: string;
  city: string;
  avatarInitial: string;
}

const VIP_DEMO_PROFILES: VipProfile[] = [
  {
    name: "Mariana Voss",
    email: "mariana.voss@maisonprivee.com",
    title: "VIP Grand Customer",
    tier: "Imperial Gold Guild",
    city: "Paris Atelier",
    avatarInitial: "M"
  },
  {
    name: "Lord Vikramaditya",
    email: "vikramaditya@royalarchive.in",
    title: "Royal Menswear Customer",
    tier: "Heritage Archival Circle",
    city: "New Delhi",
    avatarInitial: "V"
  },
  {
    name: "Elena Rousseau",
    email: "elena.rousseau@coutureparis.fr",
    title: "Haute Couture Collector",
    tier: "Salon Privilège",
    city: "Milan",
    avatarInitial: "E"
  }
];

export const CustomerLogin: React.FC = () => {
  const { loginCustomer, setPortalMode, requestStudioAccess, setIsCookieModalOpen, showToast } = useStudio();

  const [activeTab, setActiveTab] = useState<"signin" | "register">("signin");
  const [email, setEmail] = useState("mariana.voss@maisonprivee.com");
  const [password, setPassword] = useState("••••••••••••");
  const [fullName, setFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("Imperial Sherwanis & Bandhgalas");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showKeyHelp, setShowKeyHelp] = useState(false);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 55,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#C59347", "#FAF4ED", "#E8D2B7", "#D4AF37"]
      });
    } catch {
      // Confetti fallback safely ignored
    }
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast("Please enter a valid customer email address.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      triggerConfetti();
      // Find matching VIP demo name or deduce from email
      const matchedVip = VIP_DEMO_PROFILES.find(
        (v) => v.email.toLowerCase() === email.trim().toLowerCase()
      );
      const customerName = matchedVip
        ? matchedVip.name
        : email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

      loginCustomer({
        email: email.trim(),
        name: customerName,
        tier: matchedVip ? matchedVip.tier : "Privileged Client"
      });
    }, 600);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail || !fullName) {
      showToast("Please complete your customer name and email.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      triggerConfetti();
      loginCustomer({
        email: regEmail.trim(),
        name: fullName.trim(),
        tier: "Atelier Guild Associate"
      });
    }, 700);
  };

  const handleQuickVipAccess = (vip: VipProfile) => {
    setEmail(vip.email);
    setPassword("couture-vault-2026");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      triggerConfetti();
      loginCustomer({
        email: vip.email,
        name: vip.name,
        tier: vip.tier
      });
    }, 450);
  };

  const handleGuestBrowse = () => {
    triggerConfetti();
    loginCustomer({
      email: "guest.customer@maisonprivee.com",
      name: "Guest Customer",
      tier: "Salon Guest"
    });
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between overflow-x-hidden text-[#FAF4ED] bg-[#240912]">
      {/* Ambient Atmospheric Luxury Lighting & Subtle Silk Gradients */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 10%, rgba(197, 147, 71, 0.16) 0%, transparent 60%), radial-gradient(circle at 10% 90%, rgba(58, 14, 30, 0.8) 0%, transparent 50%), radial-gradient(circle at 90% 20%, rgba(197, 147, 71, 0.12) 0%, transparent 50%), #1D060F"
        }}
      />

      {/* Decorative Gold Filigree Corner Accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-[#C59347]/30 pointer-events-none m-4 hidden sm:block" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-[#C59347]/30 pointer-events-none m-4 hidden sm:block" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-[#C59347]/30 pointer-events-none m-4 hidden sm:block" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-[#C59347]/30 pointer-events-none m-4 hidden sm:block" />

      {/* Top Haute Couture Navigation Bar */}
      <header className="relative z-20 w-full border-b border-[#C59347]/20 bg-[#2E0B16]/80 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-3.5 flex items-center justify-between">
          {/* Brand Wordmark */}
          <div className="flex flex-col items-start leading-none">
            <span
              className="text-[9px] tracking-[0.34em] text-[#D9BFA4] uppercase font-light"
              style={{ fontFamily: "var(--font-nevrada), 'Nevrada', var(--font-cormorant), 'Playfair Display', serif" }}
            >
              ATELIER
            </span>
            <span
              className="text-[17px] sm:text-[19px] tracking-[0.2em] text-[#FAF4ED] font-normal uppercase mt-0.5"
              style={{ fontFamily: "var(--font-nevrada), 'Nevrada', var(--font-cormorant), 'Playfair Display', serif" }}
            >
              MAISON PRIVÉE
            </span>
          </div>

          {/* Center Privileged Access Indicator */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-[#C59347]/30 bg-[#3A0E1E]/60 text-[10px] tracking-[0.2em] uppercase text-[#E8D2B7]">
            <Crown className="w-3.5 h-3.5 text-[#C59347]" />
            <span>Salon De Couture • Customer Access</span>
          </div>

          {/* Right Action: Couturier Studio Switch */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleGuestBrowse}
              className="hidden sm:inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[#E8D2B7]/80 hover:text-[#FAF4ED] transition-colors cursor-pointer"
            >
              <Compass className="w-3 h-3 text-[#C59347]" />
              <span>Browse Salon</span>
            </button>
            <button
              type="button"
              onClick={requestStudioAccess}
              className="px-3.5 py-1.5 rounded-[2px] border border-[#C59347]/60 hover:border-[#C59347] bg-[#3A0E1E]/40 hover:bg-[#FAF4ED] text-[#FAF4ED] hover:text-[#2E0B16] text-[10px] font-sans font-medium uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_0_15px_rgba(197,147,71,0.15)] hover:shadow-[0_0_20px_rgba(197,147,71,0.35)] cursor-pointer"
              title="Access Protected Couturier Studio (Passkey Required)"
            >
              🔒 Couturier Studio →
            </button>
          </div>
        </div>
      </header>

      {/* Main Authentic Customer Login Hero Area (Centered) */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="w-full max-w-[620px] mx-auto my-auto">
          {/* Terminal Main Card with Golden Lining & Golden Glow on Hover */}
          <div className="p-6 sm:p-8 rounded-2xl border border-[#C59347]/45 bg-[#2A0C17]/90 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5),0_0_25px_rgba(197,147,71,0.18)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.6),0_0_35px_rgba(197,147,71,0.28)] hover:border-[#C59347]/70 transition-all duration-500">
              
              {/* Header Title & Tab Switcher */}
              <div className="space-y-4 mb-6 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C59347]/30 bg-[#3A0E1E]/50 text-[10px] tracking-[0.24em] uppercase text-[#E8D2B7]">
                  <Sparkles className="w-3 h-3 text-[#C59347]" />
                  <span>CUSTOMER CREDENTIALS</span>
                </div>
                <h1
                  className="text-3xl sm:text-4xl text-[#FAF4ED] font-normal tracking-wide"
                  style={{ fontFamily: "var(--font-nevrada), 'Nevrada', var(--font-cormorant), 'Playfair Display', serif" }}
                >
                  Welcome to Atelier Maison Privée
                </h1>
                <p className="text-xs text-[#EEDFD5]/70 max-w-lg leading-relaxed">
                  Authenticate your customer pass to access exclusive couture collections, your bespoke orders, and the Uvibe Neural Synthesis Studio.
                </p>

                {/* Tab Controls: Sign In vs Request Invitation */}
                <div className="grid grid-cols-2 p-1 rounded-lg bg-[#1D060F]/80 border border-[#C59347]/25 mt-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab("signin")}
                    className={`py-2 text-[11px] uppercase tracking-[0.18em] font-medium rounded-[5px] transition-all cursor-pointer ${
                      activeTab === "signin"
                        ? "bg-[#C59347] text-[#1E060F] font-bold shadow-[0_0_15px_rgba(197,147,71,0.4)]"
                        : "text-[#EEDFD5]/70 hover:text-[#FAF4ED]"
                    }`}
                  >
                    Customer Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("register")}
                    className={`py-2 text-[11px] uppercase tracking-[0.18em] font-medium rounded-[5px] transition-all cursor-pointer ${
                      activeTab === "register"
                        ? "bg-[#C59347] text-[#1E060F] font-bold shadow-[0_0_15px_rgba(197,147,71,0.4)]"
                        : "text-[#EEDFD5]/70 hover:text-[#FAF4ED]"
                    }`}
                  >
                    Request Invitation
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <AnimatePresence mode="wait">
                {activeTab === "signin" ? (
                  <motion.form
                    key="signin-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSignIn}
                    className="space-y-4"
                  >
                    {/* Email Field */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-[#E8D2B7] font-semibold block">
                        Customer Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="customer@maisonprivee.com"
                          className="w-full h-11 bg-[#1A050E]/80 border border-[#C59347]/30 hover:border-[#C59347]/60 focus:border-[#C59347] focus:shadow-[0_0_20px_rgba(197,147,71,0.25)] rounded-lg pl-10 pr-4 text-xs text-[#FAF4ED] placeholder:text-[#E8D2B7]/40 outline-none transition-all font-sans"
                        />
                        <Mail className="w-4 h-4 text-[#C59347]/70 absolute left-3.5 top-3.5 pointer-events-none" />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-[#E8D2B7] font-semibold block">
                          Vault Access Key (Password)
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowKeyHelp(!showKeyHelp)}
                          className="text-[10px] text-[#C59347] hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <HelpCircle className="w-3 h-3" />
                          <span>Forgot Key?</span>
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your private vault pass"
                          className="w-full h-11 bg-[#1A050E]/80 border border-[#C59347]/30 hover:border-[#C59347]/60 focus:border-[#C59347] focus:shadow-[0_0_20px_rgba(197,147,71,0.25)] rounded-lg pl-10 pr-11 text-xs text-[#FAF4ED] placeholder:text-[#E8D2B7]/40 outline-none transition-all font-sans tracking-wider"
                        />
                        <Lock className="w-4 h-4 text-[#C59347]/70 absolute left-3.5 top-3.5 pointer-events-none" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-3 text-[#C59347]/70 hover:text-[#C59347] p-0.5 cursor-pointer"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Forgot Key Alert Simulation */}
                    {showKeyHelp && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="p-3 rounded-lg bg-[#3D1221] border border-[#C59347]/40 text-[11px] text-[#EEDFD5] space-y-1"
                      >
                        <p className="font-semibold text-[#C59347]">Private Concierge Verification</p>
                        <p className="text-[10px] text-[#FAF4ED]/80">
                          For security, customer vault keys are issued by Maison Privée Concierge. You can authenticate immediately using any of the One-Click VIP Customer passes below.
                        </p>
                      </motion.div>
                    )}

                    {/* Remember Session & Security Guarantee */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-3.5 h-3.5 accent-[#C59347] rounded bg-[#1A050E] border-[#C59347]"
                        />
                        <span className="text-[11px] text-[#EEDFD5]/75">Keep customer session secure</span>
                      </label>
                      <span className="text-[10px] uppercase tracking-wider text-[#C59347]/80 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-[#C59347]" />
                        256-bit Encrypted
                      </span>
                    </div>

                    {/* Submit Button with Outer Golden Glow */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#C59347] via-[#D4AF37] to-[#C59347] hover:brightness-110 text-[#1D060F] text-xs font-semibold uppercase tracking-[0.22em] transition-all duration-300 shadow-[0_0_25px_rgba(197,147,71,0.35)] hover:shadow-[0_0_35px_rgba(197,147,71,0.55)] flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#1D060F] border-t-transparent rounded-full animate-spin" />
                          <span>Verifying Credentials...</span>
                        </>
                      ) : (
                        <>
                          <span>Enter Private Salon</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.form
                    key="register-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleRegister}
                    className="space-y-4"
                  >
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-[#E8D2B7] font-semibold block">
                        Customer Full Name & Title
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Lady Vivienne Ashford / Prince Aryavart"
                          className="w-full h-11 bg-[#1A050E]/80 border border-[#C59347]/30 hover:border-[#C59347]/60 focus:border-[#C59347] focus:shadow-[0_0_20px_rgba(197,147,71,0.25)] rounded-lg pl-10 pr-4 text-xs text-[#FAF4ED] placeholder:text-[#E8D2B7]/40 outline-none transition-all font-sans"
                        />
                        <User className="w-4 h-4 text-[#C59347]/70 absolute left-3.5 top-3.5 pointer-events-none" />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-[#E8D2B7] font-semibold block">
                        Preferred Customer Email
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="client@prestigiousdomain.com"
                          className="w-full h-11 bg-[#1A050E]/80 border border-[#C59347]/30 hover:border-[#C59347]/60 focus:border-[#C59347] focus:shadow-[0_0_20px_rgba(197,147,71,0.25)] rounded-lg pl-10 pr-4 text-xs text-[#FAF4ED] placeholder:text-[#E8D2B7]/40 outline-none transition-all font-sans"
                        />
                        <Mail className="w-4 h-4 text-[#C59347]/70 absolute left-3.5 top-3.5 pointer-events-none" />
                      </div>
                    </div>

                    {/* Wardrobe Domain Interest Selection */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-[#E8D2B7] font-semibold block">
                        Primary Sartorial Interest
                      </label>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        {[
                          "Imperial Sherwanis & Bandhgalas",
                          "Bridal & Kalidar Lehengas",
                          "Parisian Sculpted Evening Gowns",
                          "Ancestral 24k Zari Handlooms"
                        ].map((domain) => (
                          <button
                            key={domain}
                            type="button"
                            onClick={() => setSelectedInterest(domain)}
                            className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                              selectedInterest === domain
                                ? "border-[#C59347] bg-[#3A0E1E] text-[#FAF4ED] font-semibold shadow-[0_0_15px_rgba(197,147,71,0.3)]"
                                : "border-[#C59347]/20 bg-[#1D060F]/60 text-[#EEDFD5]/60 hover:text-[#FAF4ED] hover:border-[#C59347]/40"
                            }`}
                          >
                            {domain}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Registration */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#C59347] via-[#D4AF37] to-[#C59347] hover:brightness-110 text-[#1D060F] text-xs font-semibold uppercase tracking-[0.22em] transition-all duration-300 shadow-[0_0_25px_rgba(197,147,71,0.35)] hover:shadow-[0_0_35px_rgba(197,147,71,0.55)] flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#1D060F] border-t-transparent rounded-full animate-spin" />
                          <span>Issuing Customer Pass...</span>
                        </>
                      ) : (
                        <>
                          <span>Request Salon Membership</span>
                          <Crown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Divider with Gold Ornament */}
              <div className="relative my-6 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#C59347]/20" />
                </div>
                <span className="relative px-3 bg-[#2A0C17] text-[10px] tracking-[0.24em] uppercase text-[#C59347] font-serif">
                  — ⚜️ VIP CUSTOMER ONE-CLICK ACCESS ⚜️ —
                </span>
              </div>

              {/* One-Click VIP Customer Access Buttons (High Value for Pair Programming / Live Evaluation) */}
              <div className="space-y-2.5">
                <p className="text-[10px] uppercase tracking-[0.16em] text-[#E8D2B7]/70 text-center">
                  Select a registered customer pass for instant verified entry:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {VIP_DEMO_PROFILES.map((vip) => (
                    <button
                      key={vip.email}
                      type="button"
                      onClick={() => handleQuickVipAccess(vip)}
                      className="p-3 rounded-xl border border-[#C59347]/35 hover:border-[#C59347] bg-[#1E0610]/70 hover:bg-[#38101E] text-left transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(197,147,71,0.25)] group cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="w-6 h-6 rounded-full bg-[#C59347] text-[#1E060F] flex items-center justify-center text-[11px] font-serif font-bold">
                          {vip.avatarInitial}
                        </div>
                        <span className="text-[8px] uppercase tracking-wider text-[#C59347] font-semibold border border-[#C59347]/30 px-1.5 py-0.5 rounded-full">
                          {vip.city}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-[#FAF4ED] group-hover:text-[#E8D2B7] transition-colors truncate">
                        {vip.name}
                      </div>
                      <div className="text-[9px] text-[#EEDFD5]/60 truncate">
                        {vip.title}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Access Alternative */}
              <div className="mt-5 pt-4 border-t border-[#C59347]/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#EEDFD5]/70">
                <span className="text-[11px]">Visiting for the first time without credentials?</span>
                <button
                  type="button"
                  onClick={handleGuestBrowse}
                  className="px-4 py-2 rounded-md border border-[#C59347]/40 hover:border-[#C59347] text-[#E8D2B7] hover:text-[#FAF4ED] bg-[#1D060F]/60 hover:bg-[#3A0E1E] text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer shadow-xs hover:shadow-[0_0_15px_rgba(197,147,71,0.2)]"
                >
                  Explore as Guest Customer →
                </button>
              </div>

            </div>
          </div>
        </main>

      {/* Haute Couture Bottom Margin & Lineage Verification */}
      <footer className="relative z-20 w-full border-t border-[#C59347]/20 bg-[#1D060F]/90 backdrop-blur-md py-4">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[10px] text-[#E8D2B7]/60 tracking-wider">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C59347]" />
              <span>Maison Privée Vault Encryption • 256-Bit SSL Client Authentication</span>
            </div>
            <span className="text-[#C59347]/40">•</span>
            <button
              type="button"
              onClick={() => setIsCookieModalOpen(true)}
              className="text-[#E8D2B7]/80 hover:text-[#FAF4ED] underline underline-offset-2 transition-colors cursor-pointer"
            >
              Cookie Preferences
            </button>
          </div>
          <div>
            <span>© 2026 ATELIER MAISON PRIVÉE • PARIS • NEW DELHI • MILAN</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
