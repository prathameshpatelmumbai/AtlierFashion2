"use client";

import React from "react";
import { useStudio } from "@/context/StudioContext";
import { SubscriptionTier } from "@/types/studio";
import { 
  Bell, 
  Wallet, 
  Crown, 
  X, 
  CheckCircle2, 
  Download, 
  Check,
  Sparkles,
  Info
} from "lucide-react";
import { motion } from "framer-motion";

export const UtilitiesModals: React.FC = () => {
  const {
    activeUtilityModal,
    closeUtilityModal,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    transactions,
    subscription,
    changeSubscriptionTier,
    showToast
  } = useStudio();

  if (!activeUtilityModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#21171F]/50 backdrop-blur-xs">
      
      {/* ============================================================== */}
      {/* 1. NOTIFICATIONS MODAL */}
      {/* ============================================================== */}
      {activeUtilityModal === "notifications" && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="luxury-card max-w-lg w-full p-6 sm:p-8 bg-white border border-[#E8D2B7] space-y-5 shadow-2xl relative max-h-[85vh] flex flex-col"
        >
          <button
            onClick={closeUtilityModal}
            className="absolute top-4 right-4 p-1.5 rounded-full text-[#8F8178] hover:text-[#21171F] hover:bg-[#F6EFE6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF3EC] border border-[#E8D2B7] flex items-center justify-center text-[#542333]">
              <Bell className="w-5 h-5 text-[#B77A68]" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B77A68]">
                Atelier Communications
              </span>
              <h3 className="font-editorial text-2xl font-semibold text-[#21171F]">
                Notifications
              </h3>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 divide-y divide-[#E4D5C5]/60 text-xs pr-1">
            {notifications.length === 0 ? (
              <p className="text-center text-[#8F8178] py-8">No notifications.</p>
            ) : (
              notifications.map((notif) => (
                <div 
                  key={notif.id}
                  onClick={() => markNotificationAsRead(notif.id)}
                  className={`pt-3 first:pt-0 flex items-start gap-3 cursor-pointer group p-2 rounded-lg transition-colors ${
                    !notif.read ? "bg-[#FAF3EC]/60" : "hover:bg-[#FBF7F1]"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    !notif.read ? "bg-[#542333]" : "bg-transparent"
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-semibold text-[#B77A68]">
                        {notif.category}
                      </span>
                      <span className="text-[10px] text-[#8F8178] font-mono">{notif.timestamp}</span>
                    </div>
                    <p className="font-semibold text-[#21171F] mt-0.5">{notif.title}</p>
                    <p className="text-[#8F8178] mt-0.5">{notif.shortDescription}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="pt-3 border-t border-[#E4D5C5] flex items-center justify-between text-xs">
            <button
              onClick={() => markAllNotificationsAsRead("designer")}
              className="text-[#542333] font-semibold hover:underline"
            >
              Mark all as read
            </button>
            <button
              onClick={closeUtilityModal}
              className="px-5 py-2 rounded-full bg-[#21171F] text-white text-xs font-semibold uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}

      {/* ============================================================== */}
      {/* 2. TRANSACTION HISTORY MODAL */}
      {/* ============================================================== */}
      {activeUtilityModal === "transactions" && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="luxury-card max-w-xl w-full p-6 sm:p-8 bg-white border border-[#E8D2B7] space-y-5 shadow-2xl relative max-h-[85vh] flex flex-col"
        >
          <button
            onClick={closeUtilityModal}
            className="absolute top-4 right-4 p-1.5 rounded-full text-[#8F8178] hover:text-[#21171F] hover:bg-[#F6EFE6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF3EC] border border-[#E8D2B7] flex items-center justify-center text-[#542333]">
              <Wallet className="w-5 h-5 text-[#B77A68]" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B77A68]">
                Settlement & Payout Ledger
              </span>
              <h3 className="font-editorial text-2xl font-semibold text-[#21171F]">
                Transaction History
              </h3>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 divide-y divide-[#E4D5C5]/60 text-xs pr-1">
            {transactions.map((tx) => (
              <div key={tx.id} className="pt-3 first:pt-0 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-[#21171F]">{tx.transactionType}</strong>
                    <span className={`text-[10px] px-2 py-0.2 rounded-full font-semibold ${
                      tx.status === "Settled"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : tx.status === "In Escrow"
                        ? "bg-amber-50 text-amber-800 border border-amber-200"
                        : "bg-zinc-100 text-zinc-700"
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#8F8178] font-mono block mt-0.5">
                    {tx.date} • Ref: {tx.transactionReference} ({tx.relatedOrder})
                  </span>
                  {tx.commissionDeduction && (
                    <span className="text-[10px] text-[#8F8178] block">
                      Platform fee deducted: ₹{tx.commissionDeduction} | Net: ₹{tx.netPayout}
                    </span>
                  )}
                </div>

                <div className="text-right">
                  <span className={`font-editorial text-lg font-bold block ${
                    tx.transactionType === "Platform commission" ? "text-[#8B2635]" : "text-[#542333]"
                  }`}>
                    {tx.transactionType === "Platform commission" ? "-" : "+"} ₹ {tx.amount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E4D5C5] flex items-center justify-between text-xs">
            <button
              onClick={() => showToast("Exporting Transaction Ledger CSV...")}
              className="text-[#542333] font-semibold flex items-center gap-1.5 hover:underline"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Ledger CSV</span>
            </button>

            <button
              onClick={closeUtilityModal}
              className="px-5 py-2 rounded-full bg-[#21171F] text-white text-xs font-semibold uppercase tracking-wider"
            >
              Done
            </button>
          </div>
        </motion.div>
      )}

      {/* ============================================================== */}
      {/* 3. SUBSCRIPTION PLAN MODAL */}
      {/* ============================================================== */}
      {activeUtilityModal === "subscription" && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="luxury-card max-w-2xl w-full p-6 sm:p-8 bg-white border border-[#E8D2B7] space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={closeUtilityModal}
            className="absolute top-4 right-4 p-1.5 rounded-full text-[#8F8178] hover:text-[#21171F] hover:bg-[#F6EFE6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF3EC] border border-[#E8D2B7] flex items-center justify-center text-[#542333]">
              <Crown className="w-5 h-5 text-[#B77A68]" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B77A68]">
                Atelier Maison Membership
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#21171F]">
                Subscription Plan
              </h3>
            </div>
          </div>

          {/* EXACTLY 3 PLANS: FREE, BASIC, PRO */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            
            {/* FREE PLAN */}
            <div className={`p-4 rounded-xl border flex flex-col justify-between ${
              subscription.currentTier === "FREE"
                ? "border-[#542333] bg-[#FAF3EC] ring-1 ring-[#542333]"
                : "border-[#E4D5C5] bg-white"
            }`}>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-editorial text-xl font-bold text-[#21171F]">FREE</h4>
                  {subscription.currentTier === "FREE" && (
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#542333] text-white uppercase font-bold">
                      Current
                    </span>
                  )}
                </div>

                <div className="font-editorial text-2xl font-bold text-[#542333]">
                  ₹0 <span className="text-xs font-normal text-[#8F8178]">/month</span>
                </div>

                <div className="space-y-1.5 text-[11px] text-[#8F8178] pt-2 border-t border-[#E8D2B7]/60">
                  <p>• <strong>0% commission</strong> on first 3 orders</p>
                  <p>• <strong>9% commission + GST</strong> after first 3 orders</p>
                  <p>• Standard catalog listings</p>
                </div>
              </div>

              <button
                disabled={subscription.currentTier === "FREE"}
                onClick={() => changeSubscriptionTier("FREE")}
                className={`mt-4 w-full py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                  subscription.currentTier === "FREE"
                    ? "bg-[#E8D2B7]/50 text-[#8F8178] cursor-not-allowed"
                    : "border border-[#E4D5C5] hover:bg-[#FBF7F1] text-[#21171F]"
                }`}
              >
                {subscription.currentTier === "FREE" ? "Active Plan" : "Downgrade to Free"}
              </button>
            </div>

            {/* BASIC PLAN */}
            <div className={`p-4 rounded-xl border flex flex-col justify-between ${
              subscription.currentTier === "BASIC"
                ? "border-[#542333] bg-[#FAF3EC] ring-1 ring-[#542333]"
                : "border-[#E4D5C5] bg-white"
            }`}>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-editorial text-xl font-bold text-[#21171F]">BASIC</h4>
                  {subscription.currentTier === "BASIC" && (
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#542333] text-white uppercase font-bold">
                      Current
                    </span>
                  )}
                </div>

                <div className="font-editorial text-2xl font-bold text-[#542333]">
                  ₹499 <span className="text-xs font-normal text-[#8F8178]">/month</span>
                </div>

                <div className="space-y-1.5 text-[11px] text-[#8F8178] pt-2 border-t border-[#E8D2B7]/60">
                  <p>• <strong>7% commission + GST</strong></p>
                  <p>• Search priority in category</p>
                  <p>• Custom-order features & quotations</p>
                  <p>• Marketing & promotion access</p>
                </div>
              </div>

              <button
                onClick={() => changeSubscriptionTier("BASIC")}
                className={`mt-4 w-full py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                  subscription.currentTier === "BASIC"
                    ? "bg-[#E8D2B7]/50 text-[#8F8178] cursor-not-allowed"
                    : "border border-[#E8D2B7] bg-[#FAF3EC] text-[#542333] hover:bg-white"
                }`}
              >
                {subscription.currentTier === "BASIC" ? "Active Plan" : "Choose Basic"}
              </button>
            </div>

            {/* PRO PLAN */}
            <div className={`p-4 rounded-xl border-2 flex flex-col justify-between transition-all ${
              subscription.currentTier === "PRO"
                ? "border-[#D4AF37] bg-gradient-to-b from-white to-[#FCE9F4]/50 shadow-md ring-1 ring-[#D4AF37]/40"
                : "border-[#E8D2B7] bg-white hover:border-[#D4AF37]"
            }`}>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-editorial text-xl font-bold text-[#3A0E1E]">PRO</h4>
                  {subscription.currentTier === "PRO" && (
                    <span className="text-[9px] px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#865040] text-white uppercase font-bold shadow-xs">
                      Current Active
                    </span>
                  )}
                </div>

                <div className="font-editorial text-2xl font-bold text-[#3A0E1E]">
                  ₹1,299 <span className="text-xs font-normal text-[#837376]">/month</span>
                </div>

                <div className="space-y-1.5 text-[11px] text-[#837376] pt-2 border-t border-[#E8D2B7]/60">
                  <p>• <strong>4% commission + GST</strong></p>
                  <p>• Top search priority & lookbooks</p>
                  <p>• Verified designer badge & analytics</p>
                  <p>• Trend recommendations & full features</p>
                </div>
              </div>

              <button
                onClick={() => changeSubscriptionTier("PRO")}
                className={`mt-4 w-full py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                  subscription.currentTier === "PRO"
                    ? "bg-[#3A0E1E] text-white cursor-default border border-[#D4AF37]/50 shadow-xs"
                    : "bg-[#231820] text-white hover:bg-[#3A0E1E]"
                }`}
              >
                {subscription.currentTier === "PRO" ? "Active Haute Tier" : "Upgrade to Pro"}
              </button>
            </div>

          </div>

          {/* Mandatory Display String */}
          <div className="p-3 bg-[#FAF3EC] rounded-lg border border-[#E8D2B7] text-xs text-[#542333] flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0" />
            <span className="font-semibold">GST will be added on every order.</span>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={closeUtilityModal}
              className="px-6 py-2.5 rounded-full bg-[#21171F] text-white text-xs font-semibold uppercase tracking-wider"
            >
              Done
            </button>
          </div>
        </motion.div>
      )}

    </div>
  );
};
