"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { 
  User, 
  MapPin, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  Save, 
  Sparkles,
  Phone,
  Mail
} from "lucide-react";

export const CustomerProfile: React.FC = () => {
  const { customerProfile, updateCustomerProfile, showToast } = useStudio();

  const [name, setName] = useState(customerProfile.customerName);
  const [email, setEmail] = useState(customerProfile.email);
  const [phone, setPhone] = useState(customerProfile.phone);

  const [addressLine, setAddressLine] = useState(customerProfile.deliveryAddress.addressLine);
  const [city, setCity] = useState(customerProfile.deliveryAddress.city);
  const [state, setState] = useState(customerProfile.deliveryAddress.state);
  const [postalCode, setPostalCode] = useState(customerProfile.deliveryAddress.postalCode);

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      updateCustomerProfile({
        customerName: name,
        email,
        phone,
        deliveryAddress: {
          addressLine,
          city,
          state,
          postalCode
        }
      });
      setIsSaving(false);
      showToast("Customer profile & delivery destination updated.");
    }, 500);
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-[#D4AF37]/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-xs">
        <div className="w-20 h-20 rounded-full bg-[#E8D2B7] text-[#3A0E1E] flex items-center justify-center text-3xl font-serif font-light border-2 border-[#D4AF37]">
          {name.charAt(0)}
        </div>

        <div className="text-center sm:text-left space-y-1 flex-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#C5A059]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Atelier Private Client • VIP Patron</span>
          </div>
          <h1 className="font-serif text-3xl text-[#231820] font-light">
            {name}
          </h1>
          <p className="text-xs text-[#8F8178]">
            Member of Atelier Private Couture Circle • Priority Fitting Escrow Access
          </p>
        </div>

        <div className="text-right">
          <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-emerald-950 text-emerald-200 border border-emerald-500/20">
            Escrow Verified
          </span>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Personal Details */}
        <div className="bg-white rounded-3xl border border-[#E8D2B7] p-6 sm:p-8 space-y-5 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#E8D2B7]/60 pb-3">
            <User className="w-4 h-4 text-[#3A0E1E]" />
            <h3 className="font-serif text-lg text-[#231820]">Personal Information</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="text-[10px] uppercase font-semibold text-[#231820] tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full mt-1.5 px-3.5 py-2.5 bg-[#FFF7F9] rounded-xl border border-[#E8D2B7] text-[#231820] outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-semibold text-[#231820] tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1.5 px-3.5 py-2.5 bg-[#FFF7F9] rounded-xl border border-[#E8D2B7] text-[#231820] outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-semibold text-[#231820] tracking-wider">
                Contact Phone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full mt-1.5 px-3.5 py-2.5 bg-[#FFF7F9] rounded-xl border border-[#E8D2B7] text-[#231820] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Saved Luxury Delivery Destination */}
        <div className="bg-white rounded-3xl border border-[#E8D2B7] p-6 sm:p-8 space-y-5 shadow-xs">
          <div className="flex items-center gap-2 border-b border-[#E8D2B7]/60 pb-3">
            <MapPin className="w-4 h-4 text-[#3A0E1E]" />
            <h3 className="font-serif text-lg text-[#231820]">Primary Couture Delivery Address</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="sm:col-span-2">
              <label className="text-[10px] uppercase font-semibold text-[#21171F] tracking-wider">
                Street Address / Residence Name
              </label>
              <input
                type="text"
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                required
                className="w-full mt-1.5 px-3.5 py-2.5 bg-[#FBF7F1] rounded-xl border border-[#E4D5C5] text-[#21171F] outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-semibold text-[#21171F] tracking-wider">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="w-full mt-1.5 px-3.5 py-2.5 bg-[#FBF7F1] rounded-xl border border-[#E4D5C5] text-[#21171F] outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] uppercase font-semibold text-[#21171F] tracking-wider">
                  State
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  className="w-full mt-1.5 px-3.5 py-2.5 bg-[#FBF7F1] rounded-xl border border-[#E4D5C5] text-[#21171F] outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-semibold text-[#21171F] tracking-wider">
                  Postal / PIN Code
                </label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                  className="w-full mt-1.5 px-3.5 py-2.5 bg-[#FBF7F1] rounded-xl border border-[#E4D5C5] text-[#21171F] outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security & Guarantees */}
        <div className="bg-white rounded-3xl border border-[#E8D2B7] p-6 sm:p-8 space-y-4 shadow-xs text-xs">
          <div className="flex items-center gap-2 border-b border-[#E8D2B7]/60 pb-3">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="font-serif text-lg text-[#231820]">Client Security & Escrow Protection</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#FFF7F9] rounded-2xl border border-[#E8D2B7] space-y-1">
              <div className="font-semibold text-[#231820] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Atelier Escrow Vault</span>
              </div>
              <p className="text-[11px] text-[#8F8178]">
                All payments for ready garments and advance custom quotations are retained in escrow until delivery is fulfilled.
              </p>
            </div>

            <div className="p-4 bg-[#FFF7F9] rounded-2xl border border-[#E8D2B7] space-y-1">
              <div className="font-semibold text-[#231820] flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-700" />
                <span>Encrypted Measurements</span>
              </div>
              <p className="text-[11px] text-[#8F8178]">
                Your body measurements and bespoke fit preferences are encrypted and shared only with the assigned couturier.
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 rounded-full bg-[#3A0E1E] hover:bg-[#542333] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center gap-2 border border-[#D4AF37]/40"
          >
            <Save className="w-4 h-4 text-[#D4AF37]" />
            <span>{isSaving ? "Saving Updates..." : "Save Profile Details"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
