"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { DesignerProfile } from "@/types/studio";
import { 
  User, 
  Building2, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw,
  Sparkles,
  CreditCard,
  Crown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ProfileView: React.FC = () => {
  const { 
    designerProfile: profile, 
    updatePersonalDetails, 
    updateBrandDetails, 
    updateBusinessAddress, 
    updateBankDetails, 
    showToast 
  } = useStudio();

  // Active Profile Subtab:
  // Personal Details | Brand Details | Business / Pickup Address | Bank Account & UPI Details | Account & Security
  const [activeProfileTab, setActiveProfileTab] = useState<
    "personal" | "brand" | "address" | "bank" | "security"
  >("personal");

  // Personal Details Local Form State
  const [personalForm, setPersonalForm] = useState(profile.personalDetails);

  // Brand Details Local Form State
  const [brandForm, setBrandForm] = useState(profile.brandDetails);

  // Address Local Form State
  const [addressForm, setAddressForm] = useState(profile.businessAddress);

  // Bank OTP Flow State strictly as required:
  // Step 1: Change Bank Details
  // Step 2: Send OTP
  // Step 3: Enter OTP (expiry, resend, invalid state)
  // Step 4: Only after successful OTP verification: Show new bank-detail form
  // Step 5: Review new details
  // Step 6: Confirm change
  // Step 7: Show success state only after confirmation
  // Mock OTP = 123456
  const [bankStep, setBankStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);
  const [enteredOtp, setEnteredOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpTimer, setOtpTimer] = useState<number>(60);

  // New Bank Details Form State (Only accessible in Step 4)
  const [newAccountNumber, setNewAccountNumber] = useState("");
  const [newIfsc, setNewIfsc] = useState("");
  const [newBankName, setNewBankName] = useState("");
  const [newUpiId, setNewUpiId] = useState("");

  // Handle Personal Details Save
  const handleSavePersonal = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalDetails(personalForm);
  };

  // Handle Brand Details Save
  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrandDetails(brandForm);
  };

  // Handle Address Save
  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    updateBusinessAddress(addressForm);
  };

  // Step 2: Send OTP
  const handleRequestOtp = () => {
    setBankStep(3);
    setOtpTimer(60);
    setOtpError(null);
    setEnteredOtp(["", "", "", "", "", ""]);
    showToast("Mock OTP 123456 dispatched to registered phone (+91 ••••••4920).");
  };

  // Step 3: Enter OTP
  const handleOtpInput = (index: number, val: string) => {
    if (val.length > 1) val = val[0];
    const updated = [...enteredOtp];
    updated[index] = val;
    setEnteredOtp(updated);

    if (val && index < 5) {
      document.getElementById(`otp-box-${index + 1}`)?.focus();
    }
  };

  const handleVerifyOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = enteredOtp.join("");

    // Clearly documented mock OTP: 123456
    if (fullOtp === "123456") {
      setOtpError(null);
      setBankStep(4); // Advance to Step 4: Show new bank-detail form
      showToast("OTP verified successfully. Please enter your new settlement bank information.");
    } else {
      setOtpError("Invalid OTP. For demonstration, please use mock code 123456.");
    }
  };

  // Step 4 -> Step 5: Review new details
  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccountNumber || !newIfsc || !newUpiId) {
      showToast("Please complete all bank fields.");
      return;
    }
    setBankStep(5);
  };

  // Step 6 & 7: Confirm change & Show success
  const handleFinalBankConfirm = () => {
    updateBankDetails(newAccountNumber, newIfsc, newUpiId);
    setBankStep(7);
  };

  const handleResetBankFlow = () => {
    setBankStep(1);
    setNewAccountNumber("");
    setNewIfsc("");
    setNewBankName("");
    setNewUpiId("");
    setEnteredOtp(["", "", "", "", "", ""]);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8D2B7]/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF7F9] border border-[#D4AF37]/50 text-[#3A0E1E] text-xs font-semibold uppercase tracking-wider mb-2 shadow-xs">
            <User className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Maison Administration • Atelier Maison Privée</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#3A0E1E]">
            Profile & Atelier Credentials
          </h1>
          <p className="text-sm text-[#837376] mt-1 max-w-2xl leading-relaxed">
            Manage your personal profile, fashion brand story, workshop pickup addresses, and secure OTP-guarded banking settlement.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#F6DFC4] to-[#E8D2B7] border border-[#D4AF37] text-xs font-semibold text-[#3A0E1E] shadow-xs">
          <Crown className="w-4 h-4 text-[#3A0E1E]" />
          <span>Atelier Verified Master</span>
        </div>
      </div>

      {/* 5 Profile Sub-Navigation Tabs */}
      <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-[#E8D2B7]/60 shadow-xs flex items-center gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: "personal", label: "Personal Details" },
          { id: "brand", label: "Brand Details" },
          { id: "address", label: "Business / Pickup Address" },
          { id: "bank", label: "Bank Account & UPI Details" },
          { id: "security", label: "Account & Security" },
        ].map((tab) => {
          const isActive = activeProfileTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveProfileTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider whitespace-nowrap transition-all uppercase ${
                isActive
                  ? "bg-[#3A0E1E] text-white border border-[#D4AF37]/50 shadow-xs"
                  : "text-[#837376] hover:text-[#3A0E1E] hover:bg-[#FFF7F9]"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* 1. PERSONAL DETAILS */}
      {/* ============================================================== */}
      {activeProfileTab === "personal" && (
        <form onSubmit={handleSavePersonal} className="luxury-card p-6 md:p-8 bg-white space-y-6">
          <div className="pb-4 border-b border-[#E4D5C5]">
            <h3 className="font-editorial text-2xl font-semibold text-[#21171F]">
              Personal Details
            </h3>
            <p className="text-xs text-[#8F8178]">
              Manage the primary atelier principal designer contact information.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#21171F] mb-1.5">
                Designer Name *
              </label>
              <input
                type="text"
                required
                value={personalForm.designerName}
                onChange={(e) => setPersonalForm({ ...personalForm, designerName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4D5C5] bg-[#FBF7F1]/30 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#21171F] mb-1.5">
                Phone Number *
              </label>
              <input
                type="text"
                required
                value={personalForm.phoneNumber}
                onChange={(e) => setPersonalForm({ ...personalForm, phoneNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4D5C5] bg-[#FBF7F1]/30 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#21171F] mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={personalForm.email}
                onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4D5C5] bg-[#FBF7F1]/30 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#21171F] mb-1.5">
                Profile Photo (URL)
              </label>
              <input
                type="text"
                value={personalForm.profilePhoto}
                onChange={(e) => setPersonalForm({ ...personalForm, profilePhoto: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4D5C5] bg-[#FBF7F1]/30 outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#542333] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#3D1824] transition-colors shadow-xs"
            >
              Save Personal Details
            </button>
          </div>
        </form>
      )}

      {/* ============================================================== */}
      {/* 2. BRAND DETAILS */}
      {/* ============================================================== */}
      {activeProfileTab === "brand" && (
        <form onSubmit={handleSaveBrand} className="luxury-card p-6 md:p-8 bg-white space-y-6">
          <div className="pb-4 border-b border-[#E4D5C5]">
            <h3 className="font-editorial text-2xl font-semibold text-[#21171F]">
              Brand Details
            </h3>
            <p className="text-xs text-[#8F8178]">
              Your international fashion house story, speciality, and categories.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#21171F] mb-1.5">
                  Brand Name *
                </label>
                <input
                  type="text"
                  required
                  value={brandForm.brandName}
                  onChange={(e) => setBrandForm({ ...brandForm, brandName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4D5C5] bg-[#FBF7F1]/30 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#21171F] mb-1.5">
                  Atelier Monogram Logo
                </label>
                <input
                  type="text"
                  value={brandForm.logo}
                  onChange={(e) => setBrandForm({ ...brandForm, logo: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4D5C5] bg-[#FBF7F1]/30 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#21171F] mb-1.5">
                Speciality *
              </label>
              <input
                type="text"
                required
                value={brandForm.speciality}
                onChange={(e) => setBrandForm({ ...brandForm, speciality: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4D5C5] bg-[#FBF7F1]/30 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#21171F] mb-1.5">
                Brand Story *
              </label>
              <textarea
                rows={3}
                required
                value={brandForm.brandStory}
                onChange={(e) => setBrandForm({ ...brandForm, brandStory: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4D5C5] bg-[#FBF7F1]/30 outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#542333] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#3D1824] transition-colors shadow-xs"
            >
              Save Brand Details
            </button>
          </div>
        </form>
      )}

      {/* ============================================================== */}
      {/* 3. BUSINESS / PICKUP ADDRESS */}
      {/* ============================================================== */}
      {activeProfileTab === "address" && (
        <form onSubmit={handleSaveAddress} className="luxury-card p-6 md:p-8 bg-white space-y-6">
          <div className="pb-4 border-b border-[#E4D5C5]">
            <h3 className="font-editorial text-2xl font-semibold text-[#21171F]">
              Business / Pickup Address
            </h3>
            <p className="text-xs text-[#8F8178]">
              Physical workshop locations and insured courier dispatch docks.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#21171F] mb-1.5">
                Workshop / Studio Address *
              </label>
              <input
                type="text"
                required
                value={addressForm.workshopAddress}
                onChange={(e) => setAddressForm({ ...addressForm, workshopAddress: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4D5C5] bg-[#FBF7F1]/30 outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#21171F] mb-1.5">
                Logistics Pickup Address *
              </label>
              <input
                type="text"
                required
                value={addressForm.pickupAddress}
                onChange={(e) => setAddressForm({ ...addressForm, pickupAddress: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4D5C5] bg-[#FBF7F1]/30 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#21171F] mb-1.5">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={addressForm.city}
                  onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4D5C5] bg-[#FBF7F1]/30 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#21171F] mb-1.5">
                  State *
                </label>
                <input
                  type="text"
                  required
                  value={addressForm.state}
                  onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4D5C5] bg-[#FBF7F1]/30 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#21171F] mb-1.5">
                  Postal Code *
                </label>
                <input
                  type="text"
                  required
                  value={addressForm.postalCode}
                  onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4D5C5] bg-[#FBF7F1]/30 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#542333] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#3D1824] transition-colors shadow-xs"
            >
              Save Address Information
            </button>
          </div>
        </form>
      )}

      {/* ============================================================== */}
      {/* 4. BANK ACCOUNT & UPI DETAILS (WITH STRICT 7-STEP OTP FLOW) */}
      {/* ============================================================== */}
      {activeProfileTab === "bank" && (
        <div className="luxury-card p-6 md:p-8 bg-white space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E4D5C5]">
            <div>
              <h3 className="font-editorial text-2xl font-semibold text-[#21171F]">
                Bank Account & UPI Details
              </h3>
              <p className="text-xs text-[#8F8178]">
                Masked banking information. Alterations require verified two-factor OTP authorization.
              </p>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>OTP Verification Enforced</span>
            </div>
          </div>

          {/* STEP 1: CURRENT MASKED BANKING VIEW */}
          {bankStep === 1 && (
            <div className="p-5 rounded-xl bg-[#FAF3EC] border border-[#E8D2B7] space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[#8F8178] block text-[10px] uppercase">Bank Account Number</span>
                  <strong className="text-sm font-mono text-[#21171F]">{profile.bankDetails.accountNumberMasked}</strong>
                </div>
                <div>
                  <span className="text-[#8F8178] block text-[10px] uppercase">IFSC Routing Code</span>
                  <strong className="text-sm font-mono text-[#21171F]">{profile.bankDetails.ifscCode}</strong>
                </div>
                <div>
                  <span className="text-[#8F8178] block text-[10px] uppercase">Registered UPI ID</span>
                  <strong className="text-sm text-[#21171F]">{profile.bankDetails.upiId}</strong>
                </div>
                <div>
                  <span className="text-[#8F8178] block text-[10px] uppercase">GSTIN Registration</span>
                  <strong className="text-sm font-mono text-[#542333]">{profile.bankDetails.gstin}</strong>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8D2B7]/60 flex items-center justify-between">
                <span className="text-[11px] text-[#8F8178]">
                  Verified for direct automatic payouts.
                </span>

                {/* Step 1 -> Step 2 Action */}
                <button
                  type="button"
                  onClick={() => setBankStep(2)}
                  className="px-5 py-2.5 rounded-full bg-[#542333] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#3D1824] transition-colors shadow-xs"
                >
                  Change Bank Details
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SEND OTP CONFIRMATION */}
          {bankStep === 2 && (
            <div className="p-6 rounded-xl bg-[#FBF7F1] border border-[#E4D5C5] space-y-4 text-xs max-w-md mx-auto text-center">
              <div className="w-12 h-12 rounded-full bg-[#FAF3EC] border border-[#E8D2B7] flex items-center justify-center text-[#542333] mx-auto">
                <Lock className="w-6 h-6 text-[#B77A68]" />
              </div>

              <div>
                <h4 className="font-editorial text-2xl font-semibold text-[#21171F]">
                  Security Challenge Required
                </h4>
                <p className="text-[#8F8178] mt-1">
                  To modify sensitive settlement bank account details, an OTP will be sent to your verified registered mobile number.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetBankFlow}
                  className="flex-1 py-2.5 rounded-full border border-[#E4D5C5] text-xs font-semibold uppercase tracking-wider text-[#21171F] hover:bg-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleRequestOtp}
                  className="flex-1 py-2.5 rounded-full bg-[#542333] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#3D1824] transition-colors shadow-xs"
                >
                  Send OTP
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: ENTER OTP (EXPIRY, RESEND, INVALID OTP STATE) */}
          {bankStep === 3 && (
            <form onSubmit={handleVerifyOtpSubmit} className="p-6 rounded-xl bg-[#FAF3EC] border border-[#E8D2B7] space-y-5 max-w-md mx-auto text-center text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B77A68]">
                  Two-Factor Verification
                </span>
                <h4 className="font-editorial text-2xl font-semibold text-[#21171F]">
                  Enter 6-Digit OTP
                </h4>
                <p className="text-[#8F8178] mt-1">
                  Enter the code sent to your registered phone. (Mock OTP: <strong className="font-mono text-[#542333]">123456</strong>)
                </p>
              </div>

              {/* 6 Digit Input Boxes */}
              <div className="flex items-center justify-center gap-2.5">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <input
                    key={idx}
                    id={`otp-box-${idx}`}
                    type="text"
                    maxLength={1}
                    value={enteredOtp[idx]}
                    onChange={(e) => handleOtpInput(idx, e.target.value)}
                    className="w-10 h-12 text-center text-lg font-mono font-bold rounded-lg border border-[#E4D5C5] bg-white focus:border-[#542333] outline-none"
                  />
                ))}
              </div>

              {/* Invalid OTP error state */}
              {otpError && (
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-[#8B2635] flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  <span>{otpError}</span>
                </div>
              )}

              {/* Expiry & Resend OTP */}
              <div className="flex items-center justify-between text-xs text-[#8F8178]">
                <span>OTP Expires in: <strong className="font-mono text-[#21171F]">{otpTimer}s</strong></span>
                <button
                  type="button"
                  onClick={handleRequestOtp}
                  className="text-[#542333] font-semibold hover:underline"
                >
                  Resend OTP
                </button>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetBankFlow}
                  className="flex-1 py-2.5 rounded-full border border-[#E4D5C5] text-xs font-semibold uppercase tracking-wider text-[#21171F] hover:bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-full bg-[#542333] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#3D1824] transition-colors shadow-xs"
                >
                  Verify OTP
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: ONLY AFTER SUCCESSFUL OTP VERIFICATION -> SHOW NEW BANK-DETAIL FORM */}
          {bankStep === 4 && (
            <form onSubmit={handleProceedToReview} className="p-6 rounded-xl bg-[#FBF7F1] border border-[#E4D5C5] space-y-4 text-xs">
              <div className="pb-2 border-b border-[#E4D5C5]">
                <span className="text-[10px] text-emerald-800 font-semibold uppercase tracking-wider">
                  ✓ OTP Verified
                </span>
                <h4 className="font-editorial text-2xl font-semibold text-[#21171F]">
                  Enter New Bank Settlement Details
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#21171F] mb-1.5">
                    New Account Number *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter 12-16 digit bank account"
                    value={newAccountNumber}
                    onChange={(e) => setNewAccountNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4D5C5] bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#21171F] mb-1.5">
                    New IFSC Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. HDFC0001824"
                    value={newIfsc}
                    onChange={(e) => setNewIfsc(e.target.value.toUpperCase())}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4D5C5] bg-white font-mono uppercase outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#21171F] mb-1.5">
                    Bank & Branch Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ICICI Bank, Nariman Point"
                    value={newBankName}
                    onChange={(e) => setNewBankName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4D5C5] bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#21171F] mb-1.5">
                    Registered UPI ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. atelier@okicici"
                    value={newUpiId}
                    onChange={(e) => setNewUpiId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4D5C5] bg-white outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetBankFlow}
                  className="px-5 py-2 rounded-full border border-[#E4D5C5] text-xs font-semibold text-[#21171F]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#542333] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#3D1824]"
                >
                  Review New Details
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: REVIEW NEW DETAILS */}
          {bankStep === 5 && (
            <div className="p-6 rounded-xl bg-[#FAF3EC] border border-[#E8D2B7] space-y-5 text-xs max-w-lg mx-auto">
              <div className="pb-2 border-b border-[#E8D2B7]">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B77A68]">
                  Step 5 of 7: Verification Review
                </span>
                <h4 className="font-editorial text-2xl font-semibold text-[#21171F]">
                  Review New Settlement Details
                </h4>
              </div>

              <div className="space-y-2 p-4 bg-white rounded-lg border border-[#E4D5C5]">
                <div className="flex justify-between py-1 border-b border-zinc-100">
                  <span className="text-[#8F8178]">New Account:</span>
                  <strong className="font-mono text-[#21171F]">•••• •••• {newAccountNumber.slice(-4)}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-100">
                  <span className="text-[#8F8178]">IFSC Code:</span>
                  <strong className="font-mono text-[#21171F]">{newIfsc}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-100">
                  <span className="text-[#8F8178]">Bank Name:</span>
                  <strong className="text-[#21171F]">{newBankName}</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#8F8178]">UPI Handle:</span>
                  <strong className="text-[#542333]">{newUpiId}</strong>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setBankStep(4)}
                  className="flex-1 py-2.5 rounded-full border border-[#E4D5C5] text-xs font-semibold uppercase tracking-wider text-[#21171F] hover:bg-white"
                >
                  Back to Edit
                </button>
                {/* Step 6: Confirm Change */}
                <button
                  type="button"
                  onClick={handleFinalBankConfirm}
                  className="flex-1 py-2.5 rounded-full bg-[#542333] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#3D1824] transition-colors shadow-xs"
                >
                  Confirm Change
                </button>
              </div>
            </div>
          )}

          {/* STEP 7: SHOW SUCCESS STATE ONLY AFTER CONFIRMATION */}
          {bankStep === 7 && (
            <div className="p-8 rounded-xl bg-emerald-50/70 border border-emerald-300 text-center space-y-4 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div>
                <h4 className="font-editorial text-2xl font-semibold text-[#21171F]">
                  Bank Details Updated Successfully
                </h4>
                <p className="text-xs text-[#8F8178] mt-1 leading-relaxed">
                  Your settlement account has been updated following verified two-factor OTP authentication. Future patron payouts will disburse to this new account.
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetBankFlow}
                className="px-6 py-2.5 rounded-full bg-[#21171F] text-white text-xs font-semibold uppercase tracking-wider"
              >
                Return to Account Overview
              </button>
            </div>
          )}

        </div>
      )}

      {/* ============================================================== */}
      {/* 5. ACCOUNT & SECURITY */}
      {/* ============================================================== */}
      {activeProfileTab === "security" && (
        <div className="luxury-card p-6 md:p-8 bg-white space-y-6">
          <div className="pb-4 border-b border-[#E4D5C5]">
            <h3 className="font-editorial text-2xl font-semibold text-[#21171F]">
              Account & Security
            </h3>
            <p className="text-xs text-[#8F8178]">
              High-level credentials and platform authorization parameters.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl border border-[#E4D5C5] bg-[#FBF7F1] flex items-center justify-between">
              <div>
                <strong className="text-[#21171F] block text-sm">Two-Factor Authentication (2FA)</strong>
                <span className="text-[#8F8178]">Required for all banking modifications and high-value custom quotes.</span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                Enabled
              </span>
            </div>

            <div className="p-4 rounded-xl border border-[#E4D5C5] bg-[#FBF7F1] flex items-center justify-between">
              <div>
                <strong className="text-[#21171F] block text-sm">Atelier Security Certificate</strong>
                <span className="text-[#8F8178]">Encrypted SSL session with token-based authentication.</span>
              </div>
              <span className="text-[#542333] font-mono text-xs">ATL-SEC-2026</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
