"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { CustomOrder } from "@/types/studio";
import { 
  Scissors, 
  Clock, 
  CheckCircle2, 
  CreditCard, 
  ShieldCheck, 
  Calendar, 
  ArrowRight,
  Sparkles,
  Lock
} from "lucide-react";

interface CustomerCustomOrdersProps {
  onOpenNewCommission: () => void;
}

export const CustomerCustomOrders: React.FC<CustomerCustomOrdersProps> = ({
  onOpenNewCommission
}) => {
  const { 
    customOrders, 
    customerAcceptQuotation, 
    customerDeclineQuotation, 
    customerPayAdvancePayment,
    setCustomerSection
  } = useStudio();

  const [activeTab, setActiveTab] = useState<"all" | "quotes" | "in-progress" | "completed">("all");
  const [selectedPayOrderId, setSelectedPayOrderId] = useState<string | null>(null);

  // Filter orders according to activeTab
  const filteredOrders = customOrders.filter((order) => {
    if (activeTab === "all") return true;
    if (activeTab === "quotes") {
      return (
        order.lifecycleStatus === "QUOTATION_SENT" || 
        order.lifecycleStatus === "AWAITING_ADVANCE_PAYMENT" ||
        order.lifecycleStatus === "CUSTOMER_ACCEPTED"
      );
    }
    if (activeTab === "in-progress") {
      return (
        order.lifecycleStatus === "IN_PROGRESS" || 
        order.lifecycleStatus === "ORDER_STARTED" ||
        order.lifecycleStatus === "ADVANCE_PAYMENT_RECEIVED"
      );
    }
    if (activeTab === "completed") {
      return order.lifecycleStatus === "COMPLETED";
    }
    return true;
  });

  const getStatusBadge = (status: CustomOrder["lifecycleStatus"]) => {
    switch (status) {
      case "INQUIRY_RECEIVED":
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-amber-50 text-amber-900 border border-amber-200">
            Awaiting Designer Quotation
          </span>
        );
      case "QUOTATION_SENT":
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#3A0E1E] text-[#E8D2B7] border border-[#D4AF37]/50 shadow-xs animate-pulse">
            Quotation Ready for Review
          </span>
        );
      case "CUSTOMER_ACCEPTED":
      case "AWAITING_ADVANCE_PAYMENT":
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-blue-50 text-blue-900 border border-blue-200">
            Awaiting 40% Advance Payment
          </span>
        );
      case "ADVANCE_PAYMENT_RECEIVED":
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-emerald-50 text-emerald-900 border border-emerald-200">
            Advance Escrow Confirmed
          </span>
        );
      case "ORDER_STARTED":
      case "IN_PROGRESS":
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-purple-50 text-purple-900 border border-purple-200">
            In Atelier Production
          </span>
        );
      case "COMPLETED":
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-emerald-950 text-emerald-200 border border-emerald-500/30">
            Garment Completed
          </span>
        );
      case "CUSTOMER_DECLINED":
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-gray-100 text-gray-700">
            Quotation Declined
          </span>
        );
      default:
        return null;
    }
  };

  const selectedPayOrder = customOrders.find((o) => o.id === selectedPayOrderId);

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E8D2B7]/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#C5A059]">
            <Scissors className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Personal Made-to-Measure Hub • Atelier Privée</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#231820] font-light mt-1">
            Custom Orders & Commissions
          </h1>
          <p className="text-xs text-[#8F8178] mt-1 max-w-xl">
            Track inquiries, evaluate custom quotations from master couturiers, fund escrow deposits, and follow tailoring milestones.
          </p>
        </div>

        <button
          onClick={onOpenNewCommission}
          className="px-6 py-3 rounded-full bg-[#3A0E1E] hover:bg-[#542333] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 self-start sm:self-auto border border-[#D4AF37]/40"
        >
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>New Bespoke Request</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#E8D2B7]/60">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
            activeTab === "all"
              ? "bg-[#3A0E1E] text-white border border-[#D4AF37]/50 shadow-xs"
              : "bg-white text-[#8F8178] hover:text-[#231820] border border-[#E8D2B7]"
          }`}
        >
          All Requests ({customOrders.length})
        </button>

        <button
          onClick={() => setActiveTab("quotes")}
          className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
            activeTab === "quotes"
              ? "bg-[#3A0E1E] text-white border border-[#D4AF37]/50 shadow-xs"
              : "bg-white text-[#8F8178] hover:text-[#231820] border border-[#E8D2B7]"
          }`}
        >
          Quotations Ready ({customOrders.filter((o) => o.lifecycleStatus === "QUOTATION_SENT" || o.lifecycleStatus === "AWAITING_ADVANCE_PAYMENT" || o.lifecycleStatus === "CUSTOMER_ACCEPTED").length})
        </button>

        <button
          onClick={() => setActiveTab("in-progress")}
          className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
            activeTab === "in-progress"
              ? "bg-[#3A0E1E] text-white border border-[#D4AF37]/50 shadow-xs"
              : "bg-white text-[#8F8178] hover:text-[#231820] border border-[#E8D2B7]"
          }`}
        >
          In Production ({customOrders.filter((o) => o.lifecycleStatus === "IN_PROGRESS" || o.lifecycleStatus === "ORDER_STARTED" || o.lifecycleStatus === "ADVANCE_PAYMENT_RECEIVED").length})
        </button>

        <button
          onClick={() => setActiveTab("completed")}
          className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
            activeTab === "completed"
              ? "bg-[#3A0E1E] text-white border border-[#D4AF37]/50 shadow-xs"
              : "bg-white text-[#8F8178] hover:text-[#231820] border border-[#E8D2B7]"
          }`}
        >
          Completed Pieces ({customOrders.filter((o) => o.lifecycleStatus === "COMPLETED").length})
        </button>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-[#E8D2B7] p-8 shadow-xs">
          <Scissors className="w-12 h-12 text-[#C5A059] mx-auto mb-3 stroke-1" />
          <h3 className="font-serif text-2xl text-[#231820] font-light">No custom inquiries in this section</h3>
          <p className="text-xs text-[#8F8178] max-w-sm mx-auto mt-2 mb-6">
            You do not currently have any custom inquiries in this state.
          </p>
          <button
            onClick={onOpenNewCommission}
            className="px-6 py-2.5 rounded-full bg-[#3A0E1E] text-white text-xs font-medium uppercase tracking-wider border border-[#D4AF37]/40"
          >
            Commission Bespoke Garment
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const hasQuote = Boolean(order.quotation);
            const isAwaitingAdvance = 
              order.lifecycleStatus === "AWAITING_ADVANCE_PAYMENT" || 
              order.lifecycleStatus === "CUSTOMER_ACCEPTED";

            const garmentImage = 
              order.baseProduct?.thumbnail || 
              order.newGarmentReference?.referenceImage || 
              "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80";

            const garmentTitle = 
              order.baseProduct?.title || 
              order.newGarmentReference?.requestedDesign || 
              "Bespoke Garment Creation";

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-[#E8D2B7]/80 overflow-hidden shadow-xs hover:border-[#D4AF37]/70 transition-all p-6 sm:p-8 space-y-6"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#E8D2B7]/60 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#3A0E1E] bg-[#FFF7F9] px-2.5 py-1 rounded-md border border-[#E8D2B7]">
                      {order.orderNumber || order.id}
                    </span>
                    <span className="text-xs text-[#8F8178]">
                      Client: {order.customerName}
                    </span>
                    <span className="text-xs text-[#8F8178]">•</span>
                    <span className="text-xs font-medium text-[#231820]">
                      {order.inquiryType === "YOUR_LISTED_PRODUCT" ? "Alteration of Listed Piece" : "Bespoke New Commission"}
                    </span>
                  </div>

                  <div>{getStatusBadge(order.lifecycleStatus)}</div>
                </div>

                {/* Garment Details Row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Thumbnail (3 Cols) */}
                  <div className="md:col-span-3">
                    <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-[#FFF7F9] border border-[#E8D2B7]">
                      <img
                        src={garmentImage}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Specifications (9 Cols) */}
                  <div className="md:col-span-9 space-y-4">
                    <div>
                      <h3 className="font-serif text-2xl text-[#231820] font-light">
                        {garmentTitle}
                      </h3>
                      {order.baseProduct?.originalPrice && (
                        <div className="text-xs text-[#8F8178] mt-0.5">
                          Original Base Price: ₹{order.baseProduct.originalPrice.toLocaleString("en-IN")}
                        </div>
                      )}
                    </div>

                    {/* Specification grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      {order.requestedAlterations.requestedSize && (
                        <div className="p-3 bg-[#FFF7F9] rounded-xl border border-[#E8D2B7]/70">
                          <span className="text-[10px] text-[#8F8178] uppercase">Size</span>
                          <div className="font-medium text-[#231820] mt-0.5">{order.requestedAlterations.requestedSize}</div>
                        </div>
                      )}

                      {order.requestedAlterations.requestedColour && (
                        <div className="p-3 bg-[#FFF7F9] rounded-xl border border-[#E8D2B7]/70">
                          <span className="text-[10px] text-[#8F8178] uppercase">Requested Colour</span>
                          <div className="font-medium text-[#231820] mt-0.5">{order.requestedAlterations.requestedColour}</div>
                        </div>
                      )}

                      {order.requestedAlterations.requestedFabric && (
                        <div className="p-3 bg-[#FFF7F9] rounded-xl border border-[#E8D2B7]/70">
                          <span className="text-[10px] text-[#8F8178] uppercase">Fabric Preference</span>
                          <div className="font-medium text-[#231820] mt-0.5">{order.requestedAlterations.requestedFabric}</div>
                        </div>
                      )}
                    </div>

                    {/* Measurements & Alterations */}
                    <div className="p-4 bg-[#FFF7F9]/90 rounded-2xl border border-[#E8D2B7]/70 text-xs space-y-2">
                      <div className="font-semibold text-[#231820] uppercase tracking-wider text-[10px]">
                        Tailoring Measurements & Special Requests
                      </div>
                      {order.requestedAlterations.measurements && (
                        <div className="flex flex-wrap gap-4 text-xs font-mono text-[#231820]">
                          {order.requestedAlterations.measurements.bust && <span>Bust: {order.requestedAlterations.measurements.bust}</span>}
                          {order.requestedAlterations.measurements.waist && <span>Waist: {order.requestedAlterations.measurements.waist}</span>}
                          {order.requestedAlterations.measurements.hips && <span>Hips: {order.requestedAlterations.measurements.hips}</span>}
                          {order.requestedAlterations.measurements.length && <span>Length: {order.requestedAlterations.measurements.length}</span>}
                        </div>
                      )}

                      {order.requestedAlterations.otherAlterations && (
                        <div className="text-[#8F8178] mt-1 italic">
                          &ldquo;{order.requestedAlterations.otherAlterations}&rdquo;
                        </div>
                      )}

                      {order.newGarmentReference?.alterationDetails && (
                        <div className="text-[#8F8178] mt-1">
                          {order.newGarmentReference.alterationDetails}
                        </div>
                      )}
                    </div>

                    {/* Designer Quotation Box if available */}
                    {order.quotation && (
                      <div className="p-5 bg-gradient-to-r from-[#FFF7F9] to-white rounded-2xl border border-[#D4AF37]/50 space-y-4 shadow-xs">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#E8D2B7]/60 pb-3">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-[#3A0E1E]">
                              Official Couturier Quotation
                            </span>
                          </div>
                          <span className="text-[11px] text-[#8F8178]">
                            Valid for 7 calendar days
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                          <div>
                            <div className="text-[10px] text-[#8F8178] uppercase">Quoted Final Price</div>
                            <div className="font-serif text-2xl text-[#3A0E1E] font-light mt-0.5">
                              ₹{order.quotation.finalPrice.toLocaleString("en-IN")}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-[#8F8178] uppercase">Estimated Completion</div>
                            <div className="font-medium text-[#231820] mt-1 text-sm flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                              <span>{order.quotation.estimatedCompletionDays} Days</span>
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-[#8F8178] uppercase">40% Escrow Advance Required</div>
                            <div className="font-medium text-emerald-800 mt-1 text-sm">
                              ₹{(order.quotation.finalPrice * 0.4).toLocaleString("en-IN")}
                            </div>
                          </div>
                        </div>

                        {order.quotation.customizationDetails && (
                          <div className="text-xs text-[#8F8178] italic bg-white/70 p-3 rounded-xl border border-[#E8D2B7]/60">
                            <strong>Designer Note:</strong> &ldquo;{order.quotation.customizationDetails}&rdquo;
                          </div>
                        )}

                        {/* Quotation Action Buttons */}
                        {order.lifecycleStatus === "QUOTATION_SENT" && (
                          <div className="pt-2 flex flex-wrap items-center gap-3">
                            <button
                              onClick={() => {
                                customerAcceptQuotation(order.id);
                                setSelectedPayOrderId(order.id);
                              }}
                              className="px-6 py-2.5 rounded-full bg-[#3A0E1E] hover:bg-[#542333] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-xs flex items-center gap-2 border border-[#D4AF37]/40"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                              <span>Accept Quotation & Pay Advance</span>
                            </button>
                            <button
                              onClick={() => customerDeclineQuotation(order.id)}
                              className="px-4 py-2.5 rounded-full bg-white hover:bg-[#FFF7F9] text-[#8F8178] hover:text-[#231820] border border-[#E8D2B7] text-xs font-medium tracking-wider uppercase transition-colors"
                            >
                              Decline
                            </button>
                          </div>
                        )}

                        {/* Pay Advance if accepted but not yet paid */}
                        {isAwaitingAdvance && (
                          <div className="pt-2">
                            <button
                              onClick={() => setSelectedPayOrderId(order.id)}
                              className="px-6 py-3 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold tracking-widest uppercase transition-all shadow-md flex items-center gap-2 border border-emerald-500/30"
                            >
                              <CreditCard className="w-4 h-4 text-emerald-200" />
                              <span>Pay 40% Advance (₹{(order.quotation.finalPrice * 0.4).toLocaleString("en-IN")}) via Escrow</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* In Progress Status Bar */}
                    {(order.lifecycleStatus === "IN_PROGRESS" || order.lifecycleStatus === "ORDER_STARTED" || order.lifecycleStatus === "ADVANCE_PAYMENT_RECEIVED") && (
                      <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                            {order.lifecycleStatus === "IN_PROGRESS" ? "Artisan actively tailoring piece" : "Advance Paid — Ready for Production Start"}
                          </span>
                          <span className="text-emerald-800 font-medium">
                            {order.quotation?.estimatedCompletionDays ? `Target: ~${order.quotation.estimatedCompletionDays} Days` : "In Schedule"}
                          </span>
                        </div>

                        {/* Progress Tracker bar */}
                        <div className="w-full h-2 rounded-full bg-emerald-200/50 overflow-hidden">
                          <div 
                            className={`h-full bg-emerald-700 rounded-full transition-all duration-700 ${
                              order.lifecycleStatus === "IN_PROGRESS" ? "w-2/3" : "w-1/3"
                            }`} 
                          />
                        </div>

                        <div className="flex justify-between text-[10px] text-emerald-900">
                          <span>Quotation Approved</span>
                          <span>Advance In Escrow</span>
                          <span>Pattern & Embroidery</span>
                          <span>Final Finishing</span>
                        </div>
                      </div>
                    )}

                    {/* Completed Piece Status */}
                    {order.lifecycleStatus === "COMPLETED" && (
                      <div className="p-4 bg-emerald-950 text-white rounded-2xl flex items-center justify-between">
                        <div className="space-y-0.5 text-xs">
                          <div className="font-medium text-emerald-200 uppercase tracking-wider text-[10px]">
                            Crafting Concluded
                          </div>
                          <div className="font-serif text-lg text-white">
                            Garment Completed & Packaging for Insured Courier
                          </div>
                        </div>
                        <button
                          onClick={() => setCustomerSection("orders")}
                          className="px-4 py-2 rounded-full bg-[#E8D2B7] text-[#21171F] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5"
                        >
                          <span>Track Logistics</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Advance Payment Modal */}
      {selectedPayOrder && selectedPayOrder.quotation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FFF7F9] w-full max-w-lg rounded-3xl border border-[#D4AF37]/50 shadow-2xl overflow-hidden">
            <div className="px-6 py-4 bg-white border-b border-[#E8D2B7] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <h3 className="font-serif text-lg text-[#231820]">
                  Atelier Escrow Advance Payment
                </h3>
              </div>
              <button
                onClick={() => setSelectedPayOrderId(null)}
                className="p-1 rounded-full text-[#8F8178] hover:text-[#231820]"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="text-xs text-[#8F8178]">
                You are paying the initial 40% advance deposit for Custom Order <span className="font-mono text-[#3A0E1E] font-semibold">{selectedPayOrder.orderNumber || selectedPayOrder.id}</span>.
              </div>

              {/* Amount Breakdown */}
              <div className="p-4 bg-white rounded-2xl border border-[#E8D2B7] space-y-2 text-xs">
                <div className="flex justify-between text-[#8F8178]">
                  <span>Total Agreed Garment Price</span>
                  <span className="font-medium text-[#231820]">₹{selectedPayOrder.quotation.finalPrice.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-[#8F8178]">
                  <span>Advance Payment (40%)</span>
                  <span className="font-medium text-emerald-800">
                    ₹{(selectedPayOrder.quotation.finalPrice * 0.4).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-[#8F8178]">
                  <span>Balance Payable Upon Final Completion (60%)</span>
                  <span className="font-medium text-[#8F8178]">
                    ₹{(selectedPayOrder.quotation.finalPrice * 0.6).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#E8D2B7] flex justify-between font-serif text-lg text-[#3A0E1E]">
                  <span>Payable Now</span>
                  <span>₹{(selectedPayOrder.quotation.finalPrice * 0.4).toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Escrow Guarantee Box */}
              <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                <Lock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>
                  <strong>Escrow Protection:</strong> The advance is held in third-party escrow. 
                  The atelier artisan receives production unlock and starts sourcing fabrics, but funds are only released according to contract milestones.
                </span>
              </div>

              {/* Confirm CTA */}
              <button
                onClick={() => {
                  customerPayAdvancePayment(selectedPayOrder.id);
                  setSelectedPayOrderId(null);
                }}
                className="w-full py-4 rounded-full bg-[#3A0E1E] hover:bg-[#542333] text-white text-xs font-semibold tracking-widest uppercase transition-all shadow-md flex items-center justify-center gap-2 border border-[#D4AF37]/40"
              >
                <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Confirm & Pay 40% Advance (₹{(selectedPayOrder.quotation.finalPrice * 0.4).toLocaleString("en-IN")})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
