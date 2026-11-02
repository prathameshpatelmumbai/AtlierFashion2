"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { LogisticsOrder } from "@/types/studio";
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  RotateCcw, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  ArrowRight,
  FileText
} from "lucide-react";

export const CustomerOrders: React.FC = () => {
  const { logisticsOrders, submitCustomerReturnExchange } = useStudio();

  const [activeTab, setActiveTab] = useState<"all" | "in-transit" | "delivered" | "returns">("all");
  const [returnModalOrder, setReturnModalOrder] = useState<LogisticsOrder | null>(null);

  // Return / Exchange modal form state
  const [requestType, setRequestType] = useState<"Return" | "Exchange">("Exchange");
  const [customerReason, setCustomerReason] = useState("Slight sizing adjustment needed at waist");
  const [customerComments, setCustomerComments] = useState("The fabric and hand-embroidery are magnificent. Would like an exchange for a slightly smaller waist size.");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter orders
  const filteredOrders = logisticsOrders.filter((order) => {
    if (activeTab === "all") return true;
    if (activeTab === "in-transit") {
      return (
        order.trackingStatus === "ORDER_CONFIRMED" ||
        order.trackingStatus === "PICKED_UP_DISPATCHED" ||
        order.trackingStatus === "IN_TRANSIT"
      );
    }
    if (activeTab === "delivered") {
      return order.trackingStatus === "DELIVERED";
    }
    if (activeTab === "returns") {
      return Boolean(order.returnExchange);
    }
    return true;
  });

  const getStepProgress = (trackingStatus?: LogisticsOrder["trackingStatus"]) => {
    switch (trackingStatus) {
      case "ORDER_CONFIRMED":
        return 1;
      case "PICKED_UP_DISPATCHED":
        return 2;
      case "IN_TRANSIT":
        return 3;
      case "DELIVERED":
        return 4;
      default:
        return 1;
    }
  };

  const handleSubmitReturn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!returnModalOrder) return;
    setIsSubmitting(true);

    setTimeout(() => {
      submitCustomerReturnExchange(returnModalOrder.id, {
        requestType,
        customerReason,
        customerComments
      });
      setIsSubmitting(false);
      setReturnModalOrder(null);
    }, 600);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E8D2B7]/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#C5A059]">
            <Package className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Garment Logistics & Orders • Atelier Privée</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#231820] font-light mt-1">
            Orders & Shipments
          </h1>
          <p className="text-xs text-[#8F8178] mt-1 max-w-xl">
            Live tracking for couture deliveries, courier tracking numbers, and doorstep exchange management.
          </p>
        </div>
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
          All Orders ({logisticsOrders.length})
        </button>

        <button
          onClick={() => setActiveTab("in-transit")}
          className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
            activeTab === "in-transit"
              ? "bg-[#3A0E1E] text-white border border-[#D4AF37]/50 shadow-xs"
              : "bg-white text-[#8F8178] hover:text-[#231820] border border-[#E8D2B7]"
          }`}
        >
          In Transit & Dispatched ({logisticsOrders.filter((o) => o.trackingStatus !== "DELIVERED").length})
        </button>

        <button
          onClick={() => setActiveTab("delivered")}
          className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
            activeTab === "delivered"
              ? "bg-[#3A0E1E] text-white border border-[#D4AF37]/50 shadow-xs"
              : "bg-white text-[#8F8178] hover:text-[#231820] border border-[#E8D2B7]"
          }`}
        >
          Delivered ({logisticsOrders.filter((o) => o.trackingStatus === "DELIVERED").length})
        </button>

        <button
          onClick={() => setActiveTab("returns")}
          className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
            activeTab === "returns"
              ? "bg-[#3A0E1E] text-white border border-[#D4AF37]/50 shadow-xs"
              : "bg-white text-[#8F8178] hover:text-[#231820] border border-[#E8D2B7]"
          }`}
        >
          Returns & Exchanges ({logisticsOrders.filter((o) => Boolean(o.returnExchange)).length})
        </button>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-[#E8D2B7] p-8 shadow-xs">
          <Truck className="w-12 h-12 text-[#C5A059] mx-auto mb-3 stroke-1" />
          <h3 className="font-serif text-2xl text-[#231820] font-light">No orders in this category</h3>
          <p className="text-xs text-[#8F8178] max-w-sm mx-auto mt-2">
            You do not currently have any orders matching this filter.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const step = getStepProgress(order.trackingStatus);
            const isDelivered = order.trackingStatus === "DELIVERED";
            const hasReturn = Boolean(order.returnExchange);

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-[#E8D2B7]/80 overflow-hidden shadow-xs hover:border-[#D4AF37]/60 transition-all p-6 sm:p-8 space-y-6"
              >
                {/* Header Bar */}
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
                      {order.shippingTag}
                    </span>
                  </div>

                  <div>
                    {isDelivered ? (
                      <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-emerald-950 text-emerald-200 border border-emerald-500/30">
                        Delivered
                      </span>
                    ) : order.trackingStatus === "IN_TRANSIT" ? (
                      <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-blue-50 text-blue-900 border border-blue-200">
                        In Transit
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-amber-50 text-amber-900 border border-amber-200">
                        Dispatched from Workshop
                      </span>
                    )}
                  </div>
                </div>

                {/* Garment Details & Courier Tracking Info */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Image (3 Cols) */}
                  <div className="md:col-span-3">
                    <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-[#FFF7F9] border border-[#E8D2B7]">
                      <img
                        src={order.productThumbnail || "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80"}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Order Specifications & Tracking Stepper (9 Cols) */}
                  <div className="md:col-span-9 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-semibold">
                          {order.brandName || "Atelier Couturier"}
                        </span>
                        <h3 className="font-serif text-2xl text-[#231820] font-light mt-0.5">
                          {order.productTitle}
                        </h3>
                        <div className="text-xs text-[#8F8178] mt-1">
                          Details: <span className="font-medium text-[#231820]">{order.productDetails}</span> • Qty: {order.quantity || 1}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[10px] text-[#8F8178] uppercase">Order Amount</div>
                        <div className="font-serif text-2xl text-[#3A0E1E] font-light">
                          ₹{order.price.toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>

                    {/* Live Tracking Stepper */}
                    <div className="p-5 bg-[#FBF7F1]/80 rounded-2xl border border-[#E4D5C5]/80 space-y-4">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-[#542333]" />
                          <span className="font-semibold text-[#21171F]">
                            Courier: {order.courierInfo?.courierCompany || "BlueDart Apex Luxury Courier"}
                          </span>
                        </div>
                        {order.trackingId && (
                          <span className="font-mono text-xs text-[#542333] bg-white px-2 py-0.5 rounded border border-[#E4D5C5]">
                            AWB: {order.trackingId}
                          </span>
                        )}
                      </div>

                      {/* Visual Stepper */}
                      <div className="relative pt-2 pb-1">
                        <div className="w-full h-1 bg-[#E4D5C5] rounded-full absolute top-5 left-0"></div>
                        <div 
                          className="h-1 bg-[#542333] rounded-full absolute top-5 left-0 transition-all duration-500"
                          style={{ width: `${(step / 4) * 100}%` }}
                        ></div>

                        <div className="relative flex justify-between text-center">
                          {[
                            { label: "Confirmed", stepNum: 1 },
                            { label: "Picked Up", stepNum: 2 },
                            { label: "In Transit", stepNum: 3 },
                            { label: "Delivered", stepNum: 4 }
                          ].map((s) => (
                            <div key={s.stepNum} className="flex flex-col items-center">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                                step >= s.stepNum
                                  ? "bg-[#542333] text-white border-[#542333]"
                                  : "bg-white text-[#8F8178] border-[#E4D5C5]"
                              }`}>
                                {step >= s.stepNum ? "✓" : s.stepNum}
                              </div>
                              <span className="text-[10px] font-medium text-[#21171F] mt-1.5 whitespace-nowrap">
                                {s.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="text-[11px] text-[#8F8178] flex items-center justify-between pt-1">
                        <span>Shipping Address: {order.shippingAddress}</span>
                        <span className="font-medium text-[#21171F]">
                          {order.courierInfo?.pickupDate ? `Dispatched: ${order.courierInfo.pickupDate}` : "Complimentary Express Air"}
                        </span>
                      </div>
                    </div>

                    {/* Return & Exchange Info if already submitted */}
                    {hasReturn && order.returnExchange && (
                      <div className="p-4 bg-purple-50/80 rounded-2xl border border-purple-200 text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-purple-950 uppercase tracking-wider flex items-center gap-1.5">
                            <RotateCcw className="w-3.5 h-3.5 text-purple-700" />
                            {order.returnExchange.requestType} Request: {order.returnExchange.status}
                          </span>
                          <span className="text-[11px] text-purple-800">
                            Logged on {order.returnExchange.requestDate}
                          </span>
                        </div>
                        <div className="text-[#8F8178]">
                          Reason: <span className="font-medium text-[#21171F]">{order.returnExchange.customerReason}</span>
                        </div>
                        <div className="text-[#8F8178] italic">
                          &ldquo;{order.returnExchange.customerComments}&rdquo;
                        </div>
                      </div>
                    )}

                    {/* Actions: Request Return / Exchange for delivered orders */}
                    {isDelivered && !hasReturn && (
                      <div className="flex items-center justify-between pt-2">
                        <div className="text-xs text-[#8F8178] flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-700" />
                          <span>Delivered successfully. 7-day exchange window is open.</span>
                        </div>
                        <button
                          onClick={() => setReturnModalOrder(order)}
                          className="px-4 py-2 rounded-full bg-white hover:bg-[#FBF7F1] text-[#542333] border border-[#542333] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Request Return or Exchange</span>
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

      {/* Return / Exchange Modal */}
      {returnModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FBF7F1] w-full max-w-lg rounded-3xl border border-[#E4D5C5] shadow-2xl overflow-hidden">
            <div className="px-6 py-4 bg-white border-b border-[#E4D5C5] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#542333]" />
                <h3 className="font-serif text-lg text-[#21171F]">
                  Request Return or Exchange
                </h3>
              </div>
              <button
                onClick={() => setReturnModalOrder(null)}
                className="p-1 rounded-full text-[#8F8178] hover:text-[#21171F]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitReturn} className="p-6 space-y-5 text-xs">
              <div>
                <span className="text-[10px] text-[#8F8178] uppercase">Order Reference</span>
                <div className="font-medium text-[#21171F] mt-0.5">{returnModalOrder.productTitle} (#{returnModalOrder.orderNumber || returnModalOrder.id})</div>
              </div>

              {/* Type Switcher: Return vs Exchange */}
              <div>
                <label className="text-[10px] uppercase font-semibold text-[#21171F] tracking-wider">
                  Request Type
                </label>
                <div className="grid grid-cols-2 gap-3 mt-1.5">
                  <button
                    type="button"
                    onClick={() => setRequestType("Exchange")}
                    className={`py-2.5 rounded-xl text-xs font-medium border transition-all ${
                      requestType === "Exchange"
                        ? "bg-[#542333] text-white border-[#542333]"
                        : "bg-white text-[#21171F] border-[#E4D5C5]"
                    }`}
                  >
                    Size / Fit Exchange
                  </button>
                  <button
                    type="button"
                    onClick={() => setRequestType("Return")}
                    className={`py-2.5 rounded-xl text-xs font-medium border transition-all ${
                      requestType === "Return"
                        ? "bg-[#542333] text-white border-[#542333]"
                        : "bg-white text-[#21171F] border-[#E4D5C5]"
                    }`}
                  >
                    Full Return & Refund
                  </button>
                </div>
              </div>

              {/* Reason Selector */}
              <div>
                <label className="text-[10px] uppercase font-semibold text-[#21171F] tracking-wider">
                  Primary Reason
                </label>
                <select
                  value={customerReason}
                  onChange={(e) => setCustomerReason(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 bg-white rounded-xl border border-[#E4D5C5] text-[#21171F] outline-none text-xs"
                >
                  <option value="Slight sizing adjustment needed at waist">Slight sizing adjustment needed at waist</option>
                  <option value="Bust / Shoulder fit requires tailoring">Bust / Shoulder fit requires tailoring</option>
                  <option value="Garment length alteration needed">Garment length alteration needed</option>
                  <option value="Colour shade different than expected">Colour shade different than expected</option>
                  <option value="Fabric texture or weight preference">Fabric texture or weight preference</option>
                  <option value="Other">Other tailoring feedback</option>
                </select>
              </div>

              {/* Detailed Comments */}
              <div>
                <label className="text-[10px] uppercase font-semibold text-[#21171F] tracking-wider">
                  Detailed Comments for the Couturier
                </label>
                <textarea
                  rows={3}
                  value={customerComments}
                  onChange={(e) => setCustomerComments(e.target.value)}
                  required
                  placeholder="Please describe specific adjustments or exchange requirements..."
                  className="w-full mt-1.5 px-3 py-2 bg-white rounded-xl border border-[#E4D5C5] text-[#21171F] outline-none"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                Doorstep pickup is arranged complimentary by our luxury courier service. The designer will review and approve within 24 hours.
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-[#542333] hover:bg-[#6c2c41] text-white text-xs font-semibold tracking-widest uppercase transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Transmitting Request to Atelier...</span>
                ) : (
                  <>
                    <RotateCcw className="w-3.5 h-3.5 text-[#E8D2B7]" />
                    <span>Submit {requestType} Request</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
