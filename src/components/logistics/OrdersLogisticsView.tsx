"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { LogisticsOrder, CourierPickupSchedule } from "@/types/studio";
import { 
  Package, 
  Truck, 
  RotateCcw, 
  FileText, 
  Download, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ChevronRight, 
  ExternalLink,
  ShieldCheck,
  MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const OrdersLogisticsView: React.FC = () => {
  const {
    logisticsOrders,
    activeLogisticsTab,
    setActiveLogisticsTab,
    schedulePickup,
    updateReturnExchangeStatus,
    showToast
  } = useStudio();

  // Courier Pickup Scheduling Modal State
  const [pickupModalOrder, setPickupModalOrder] = useState<LogisticsOrder | null>(null);
  const [courierCompany, setCourierCompany] = useState<"BlueDart Apex Luxury" | "DHL Express Worldwide" | "FedEx Priority">("BlueDart Apex Luxury");
  const [pickupDate, setPickupDate] = useState("2026-10-29");
  const [pickupSlot, setPickupSlot] = useState<"10:00 AM - 01:00 PM" | "02:00 PM - 05:00 PM" | "05:00 PM - 08:00 PM">("10:00 AM - 01:00 PM");

  // Shipping Documents Modal
  const [docsModalOrder, setDocsModalOrder] = useState<LogisticsOrder | null>(null);

  // Return & Exchange Inspection / Action Modal
  const [returnModalOrder, setReturnModalOrder] = useState<LogisticsOrder | null>(null);

  // 3 Exact Subsections:
  // 1. Ready to Dispatch
  // 2. Shipped & Delivered
  // 3. Returns & Exchanges
  const readyToDispatchList = logisticsOrders.filter((o) => o.status === "READY_TO_DISPATCH");
  const shippedAndDeliveredList = logisticsOrders.filter((o) => o.status === "SHIPPED_AND_DELIVERED");
  const returnsAndExchangesList = logisticsOrders.filter((o) => o.status === "RETURNS_AND_EXCHANGES");

  const handleConfirmPickupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickupModalOrder) return;

    const schedule: CourierPickupSchedule = {
      courierCompany,
      pickupDate,
      pickupTimeSlot: pickupSlot
    };

    schedulePickup(pickupModalOrder.id, schedule);
    setPickupModalOrder(null);
  };

  const handleDownloadDoc = (type: "Shipping Label" | "Packing Slip", order: LogisticsOrder) => {
    showToast(`Downloading mock ${type} for #${order.orderNumber}...`);
  };

  return (
    <div className="space-y-8">
      
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8D2B7]/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF7F9] border border-[#D4AF37]/50 text-[#3A0E1E] text-xs font-semibold uppercase tracking-wider mb-2 shadow-xs">
            <Package className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Atelier Fulfilment & Carrier Logistics • Maison Privée</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#3A0E1E]">
            Orders & Logistics
          </h1>
          <p className="text-sm text-[#837376] mt-1 max-w-2xl leading-relaxed">
            Coordinate high-value courier collections, print insured airway documentation, and oversee patron exchange requests with verified white-glove logistics.
          </p>
        </div>
      </div>

      {/* 3 Sub-navigation Tabs strictly as required */}
      <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-[#E8D2B7]/60 shadow-xs flex items-center gap-2 overflow-x-auto">
        {[
          { id: "ready-to-dispatch", label: "Ready to Dispatch", count: readyToDispatchList.length },
          { id: "shipped-delivered", label: "Shipped & Delivered", count: shippedAndDeliveredList.length },
          { id: "returns-exchanges", label: "Returns & Exchanges", count: returnsAndExchangesList.length },
        ].map((tab) => {
          const isActive = activeLogisticsTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveLogisticsTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? "bg-[#3A0E1E] text-white border border-[#D4AF37]/50 shadow-xs"
                  : "text-[#837376] hover:text-[#3A0E1E] hover:bg-[#FFF7F9]"
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                isActive 
                  ? "bg-[#542333] text-[#F6DFC4]" 
                  : "bg-[#FFF7F9] text-[#865040] border border-[#E8D2B7]/50"
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* 1. READY TO DISPATCH */}
      {/* ============================================================== */}
      {activeLogisticsTab === "ready-to-dispatch" && (
        <div className="space-y-4">
          {readyToDispatchList.length === 0 ? (
            <div className="luxury-card p-12 text-center bg-white space-y-3">
              <p className="font-editorial text-2xl text-[#8F8178]">
                No orders waiting for courier dispatch.
              </p>
              <p className="text-xs text-[#8F8178]">
                When patrons purchase listed products, their confirmed orders appear here for pickup scheduling and label generation.
              </p>
            </div>
          ) : (
            readyToDispatchList.map((order) => (
              <motion.div
                key={order.id}
                layout
                className="luxury-card p-6 bg-white hover:border-[#B77A68] transition-all"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  
                  {/* Left: Product Thumbnail & Order Specs */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="relative w-24 h-32 rounded-lg overflow-hidden border border-[#E4D5C5] shrink-0 bg-[#F6EFE6]">
                      <img
                        src={order.productThumbnail}
                        alt={order.productTitle}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#542333] text-white uppercase">
                        Paid Order
                      </span>
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-semibold text-[#542333]">
                          #{order.orderNumber}
                        </span>
                        <span className="text-[#8F8178]">•</span>
                        <span className="text-xs font-medium text-[#21171F]">
                          {order.customerName}
                        </span>
                        <span className="text-[#8F8178]">•</span>
                        <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Order Confirmed
                        </span>
                      </div>

                      <h3 className="font-editorial text-xl sm:text-2xl font-semibold text-[#21171F]">
                        {order.productTitle}
                      </h3>

                      <p className="text-xs text-[#8F8178]">
                        {order.productDetails}
                      </p>

                      <div className="flex items-start gap-1.5 text-xs text-[#8F8178] pt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#B77A68] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{order.shippingAddress}</span>
                      </div>

                      <div className="flex items-center gap-4 text-xs pt-1">
                        <span>Price: <strong className="text-[#542333] font-editorial text-base">₹ {order.price.toLocaleString("en-IN")}</strong></span>
                        <span>•</span>
                        <span className="text-emerald-800 font-medium">Tag: {order.shippingTag}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions (Schedule Courier Pickup, Download Shipping Documents) */}
                  <div className="w-full lg:w-72 flex flex-col justify-between pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E4D5C5]/60 space-y-2.5">
                    
                    <button
                      onClick={() => {
                        setPickupModalOrder(order);
                        setCourierCompany("BlueDart Apex Luxury");
                        setPickupDate("2026-10-29");
                      }}
                      className="w-full py-2.5 rounded-full bg-[#3A0E1E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#271C0B] transition-colors flex items-center justify-center gap-2 shadow-xs border border-[#D4AF37]/50"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#F6DFC4]" />
                      <span>Schedule Courier Pickup</span>
                    </button>

                    <button
                      onClick={() => setDocsModalOrder(order)}
                      className="w-full py-2 rounded-full border border-[#E8D2B7] text-[#3A0E1E] text-xs font-medium hover:bg-[#FCE9F4] hover:border-[#D4AF37] transition-all flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Download Shipping Documents</span>
                    </button>

                  </div>

                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. SHIPPED & DELIVERED */}
      {/* ============================================================== */}
      {activeLogisticsTab === "shipped-delivered" && (
        <div className="space-y-4">
          {shippedAndDeliveredList.length === 0 ? (
            <div className="luxury-card p-12 text-center bg-white space-y-3">
              <p className="font-editorial text-2xl text-[#8F8178]">
                No shipments currently dispatched or in transit.
              </p>
            </div>
          ) : (
            shippedAndDeliveredList.map((order) => (
              <motion.div
                key={order.id}
                layout
                className="luxury-card p-6 bg-white hover:border-[#B77A68] transition-all"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  
                  {/* Left: Product & Carrier info */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className="relative w-24 h-32 rounded-lg overflow-hidden border border-[#E4D5C5] shrink-0 bg-[#F6EFE6]">
                      <img
                        src={order.productThumbnail}
                        alt={order.productTitle}
                        className="w-full h-full object-cover"
                      />
                      <span className={`absolute top-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase text-white ${
                        order.trackingStatus === "DELIVERED" ? "bg-emerald-800" : "bg-[#542333]"
                      }`}>
                        {order.trackingStatus === "DELIVERED" ? "Delivered" : "In Transit"}
                      </span>
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-semibold text-[#542333]">
                          #{order.orderNumber}
                        </span>
                        <span className="text-[#8F8178]">•</span>
                        <span className="text-xs font-medium text-[#21171F]">
                          {order.customerName}
                        </span>
                      </div>

                      <h3 className="font-editorial text-xl sm:text-2xl font-semibold text-[#21171F]">
                        {order.productTitle}
                      </h3>

                      <div className="p-2.5 bg-[#FBF7F1] rounded-lg border border-[#E4D5C5] text-xs flex flex-wrap items-center gap-4 text-[#8F8178]">
                        <div>Courier: <strong className="text-[#21171F]">{order.courierInfo?.courierCompany || "BlueDart Apex Luxury"}</strong></div>
                        <div>•</div>
                        <div>Tracking ID: <strong className="font-mono text-[#542333]">{order.trackingId || "BD-LUX-9481029"}</strong></div>
                        <div>•</div>
                        <div>Current Status: <strong className="text-emerald-800">{order.trackingStatus === "DELIVERED" ? "Delivered to Patron" : "In Transit"}</strong></div>
                      </div>

                      {/* Shipment Timeline: Order Confirmed -> Picked Up / Dispatched -> In Transit -> Delivered */}
                      <div className="pt-3">
                        <span className="text-[10px] text-[#8F8178] uppercase tracking-wider block font-semibold mb-2">
                          Shipment Timeline:
                        </span>
                        <div className="flex items-center gap-2 text-xs flex-wrap">
                          {order.timeline.map((item, idx) => (
                            <React.Fragment key={item.stage}>
                              <div className="flex items-center gap-1.5">
                                <span className={`w-2.5 h-2.5 rounded-full ${
                                  item.completed ? "bg-emerald-700" : "bg-[#E4D5C5]"
                                }`} />
                                <span className={`text-[11px] ${
                                  item.completed ? "font-semibold text-[#21171F]" : "text-[#8F8178]"
                                }`}>
                                  {item.label}
                                </span>
                              </div>
                              {idx < order.timeline.length - 1 && (
                                <span className="text-[#E4D5C5]">→</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Right: Mock Track AWB Telemetry */}
                  <div className="w-full lg:w-48 text-right shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E4D5C5]/60 space-y-2">
                    <button
                      onClick={() => showToast(`Mock tracking telemetry opened for AWB: ${order.trackingId}`)}
                      className="w-full py-2 rounded-lg border border-[#E8D2B7] text-xs font-semibold text-[#542333] hover:bg-[#FAF3EC] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Track Shipment</span>
                    </button>
                  </div>

                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. RETURNS & EXCHANGES */}
      {/* ============================================================== */}
      {activeLogisticsTab === "returns-exchanges" && (
        <div className="space-y-4">
          {returnsAndExchangesList.length === 0 ? (
            <div className="luxury-card p-12 text-center bg-white space-y-3">
              <p className="font-editorial text-2xl text-[#8F8178]">
                No returns or exchanges registered.
              </p>
            </div>
          ) : (
            returnsAndExchangesList.map((order) => {
              const req = order.returnExchange;

              return (
                <motion.div
                  key={order.id}
                  layout
                  className="luxury-card p-6 bg-white hover:border-[#B77A68] transition-all"
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    
                    {/* Left: Product & Request Details */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="relative w-24 h-32 rounded-lg overflow-hidden border border-[#E4D5C5] shrink-0 bg-[#F6EFE6]">
                        <img
                          src={order.productThumbnail}
                          alt={order.productTitle}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#8B2635] text-white uppercase">
                          {req?.requestType || "Return"}
                        </span>
                      </div>

                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-semibold text-[#542333]">
                            Order Ref: #{order.orderNumber}
                          </span>
                          <span className="text-[#8F8178]">•</span>
                          <span className="text-xs font-medium text-[#21171F]">
                            {order.customerName}
                          </span>
                          <span className="text-[#8F8178]">•</span>
                          <span className="text-[10px] text-[#542333] font-semibold bg-[#FAF3EC] px-2 py-0.5 rounded-full border border-[#E8D2B7]">
                            Requested: {req?.requestDate}
                          </span>
                        </div>

                        <h3 className="font-editorial text-xl sm:text-2xl font-semibold text-[#21171F]">
                          {order.productTitle}
                        </h3>

                        <div className="flex items-center gap-4 text-xs text-[#8F8178]">
                          <span>Original Price: <strong className="text-[#542333] font-editorial text-base">₹ {order.price.toLocaleString("en-IN")}</strong></span>
                          <span>•</span>
                          <span>Status: <strong className="text-amber-800">{req?.status}</strong></span>
                        </div>

                        {/* Customer Reason and Comments */}
                        <div className="p-3 bg-rose-50/60 rounded-lg border border-rose-200 text-xs space-y-1">
                          <p className="text-rose-950 font-semibold">
                            Reason: {req?.customerReason}
                          </p>
                          <p className="text-[#8F8178]">
                            &quot;{req?.customerComments}&quot;
                          </p>
                        </div>

                        {/* Supporting Images */}
                        {req?.supportingImages && req.supportingImages.length > 0 && (
                          <div className="flex items-center gap-2 pt-1">
                            <span className="text-[10px] text-[#8F8178] uppercase font-semibold">Attached Evidence:</span>
                            {req.supportingImages.map((img, i) => (
                              <img key={i} src={img} alt="Evidence" className="w-8 h-10 object-cover rounded border border-[#E4D5C5]" />
                            ))}
                          </div>
                        )}

                      </div>
                    </div>

                    {/* Right: Actions (View Request, Manage Request) */}
                    <div className="w-full lg:w-48 text-right shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#E4D5C5]/60 space-y-2">
                      <button
                        onClick={() => setReturnModalOrder(order)}
                        className="w-full py-2.5 rounded-full bg-[#542333] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#3D1824] transition-colors shadow-xs"
                      >
                        Manage Request
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* SCHEDULE COURIER PICKUP INTERFACE (MODAL) */}
      {/* ============================================================== */}
      <AnimatePresence>
        {pickupModalOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#21171F]/50 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="luxury-card max-w-md w-full p-6 sm:p-8 bg-white border border-[#E8D2B7] space-y-5 shadow-2xl relative"
            >
              <button
                onClick={() => setPickupModalOrder(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-[#8F8178] hover:text-[#21171F] hover:bg-[#F6EFE6] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B77A68]">
                  Logistics Dispatch Scheduling
                </span>
                <h3 className="font-editorial text-2xl font-semibold text-[#21171F]">
                  Schedule Courier Pickup
                </h3>
                <p className="text-xs text-[#8F8178] mt-1 font-light">
                  Order #{pickupModalOrder.orderNumber} • Destination: {pickupModalOrder.customerName}
                </p>
              </div>

              <form onSubmit={handleConfirmPickupSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#21171F] mb-1.5">
                    Courier Company *
                  </label>
                  <select
                    value={courierCompany}
                    onChange={(e) => setCourierCompany(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E4D5C5] bg-white outline-none"
                  >
                    <option value="BlueDart Apex Luxury">BlueDart Apex Luxury (Domestic Insured)</option>
                    <option value="DHL Express Worldwide">DHL Express Worldwide (Global Air Freight)</option>
                    <option value="FedEx Priority">FedEx Priority (White-Glove Courier)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#21171F] mb-1.5">
                      Available Pickup Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#E4D5C5] bg-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#21171F] mb-1.5">
                      Available Pickup Time *
                    </label>
                    <select
                      value={pickupSlot}
                      onChange={(e) => setPickupSlot(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#E4D5C5] bg-white outline-none"
                    >
                      <option value="10:00 AM - 01:00 PM">10:00 AM - 01:00 PM</option>
                      <option value="02:00 PM - 05:00 PM">02:00 PM - 05:00 PM</option>
                      <option value="05:00 PM - 08:00 PM">05:00 PM - 08:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#FAF3EC] border border-[#E8D2B7] text-[11px] text-[#8F8178]">
                  <p>
                    Frontend demonstration notice: Confirming pickup moves this order directly into the shipment workflow with mock airway credentials.
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-[#E4D5C5]">
                  <button
                    type="button"
                    onClick={() => setPickupModalOrder(null)}
                    className="flex-1 py-2.5 rounded-full border border-[#E4D5C5] text-xs font-semibold uppercase tracking-wider text-[#21171F] hover:bg-[#FBF7F1]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-full bg-[#542333] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#3D1824] transition-colors shadow-xs"
                  >
                    Confirm Pickup
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* DOWNLOAD SHIPPING DOCUMENTS MODAL */}
      {/* ============================================================== */}
      <AnimatePresence>
        {docsModalOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#21171F]/50 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="luxury-card max-w-md w-full p-6 sm:p-8 bg-white border border-[#E8D2B7] space-y-5 shadow-2xl relative"
            >
              <button
                onClick={() => setDocsModalOrder(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-[#8F8178] hover:text-[#21171F] hover:bg-[#F6EFE6] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B77A68]">
                  Consignment Airway Documentation
                </span>
                <h3 className="font-editorial text-2xl font-semibold text-[#21171F]">
                  Download Shipping Documents
                </h3>
                <p className="text-xs text-[#8F8178] mt-1 font-light">
                  Order #{docsModalOrder.orderNumber} • Generated mock printable documentation.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                {/* Shipping Label */}
                <div className="p-4 rounded-xl border border-[#E4D5C5] bg-[#FBF7F1] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#542333]" />
                    <div>
                      <strong className="text-[#21171F] block">Shipping Label (PDF)</strong>
                      <span className="text-[10px] text-[#8F8178]">Includes destination barcoding & insurance seal</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownloadDoc("Shipping Label", docsModalOrder)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#542333] text-white text-xs font-semibold hover:bg-[#3D1824]"
                  >
                    Download
                  </button>
                </div>

                {/* Packing Slip */}
                <div className="p-4 rounded-xl border border-[#E4D5C5] bg-[#FBF7F1] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#542333]" />
                    <div>
                      <strong className="text-[#21171F] block">Packing Slip (PDF)</strong>
                      <span className="text-[10px] text-[#8F8178]">Internal garment manifest & atelier authenticity note</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownloadDoc("Packing Slip", docsModalOrder)}
                    className="px-3.5 py-1.5 rounded-lg border border-[#E8D2B7] text-[#542333] text-xs font-semibold hover:bg-white"
                  >
                    Download
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#FAF3EC] border border-[#E8D2B7] text-[10px] text-[#8F8178]">
                Notice: Placeholder document generation for frontend demonstration without claiming external carrier API call.
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setDocsModalOrder(null)}
                  className="px-6 py-2 rounded-full bg-[#21171F] text-white text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* MANAGE RETURNS & EXCHANGES MODAL */}
      {/* ============================================================== */}
      <AnimatePresence>
        {returnModalOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#21171F]/50 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="luxury-card max-w-md w-full p-6 sm:p-8 bg-white border border-[#E8D2B7] space-y-5 shadow-2xl relative"
            >
              <button
                onClick={() => setReturnModalOrder(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-[#8F8178] hover:text-[#21171F] hover:bg-[#F6EFE6] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8B2635]">
                  Policy-Based Resolution Protocol
                </span>
                <h3 className="font-editorial text-2xl font-semibold text-[#21171F]">
                  Manage Return / Exchange
                </h3>
                <p className="text-xs text-[#8F8178] mt-1 font-light">
                  Order #{returnModalOrder.orderNumber} • Client: {returnModalOrder.customerName}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#FBF7F1] border border-[#E4D5C5] text-xs space-y-1">
                <p><strong>Customer Reason: </strong>{returnModalOrder.returnExchange?.customerReason}</p>
                <p className="text-[#8F8178]">&quot;{returnModalOrder.returnExchange?.customerComments}&quot;</p>
              </div>

              {/* Policy-based Action Choices strictly as specified */}
              <div className="space-y-2 text-xs">
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#21171F]">
                  Select Resolution Action:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      updateReturnExchangeStatus(returnModalOrder.id, "Accept");
                      setReturnModalOrder(null);
                    }}
                    className="p-2.5 rounded-lg border border-[#E8D2B7] bg-[#FAF3EC] text-[#542333] font-semibold text-center hover:bg-white"
                  >
                    Accept Request
                  </button>
                  <button
                    onClick={() => {
                      updateReturnExchangeStatus(returnModalOrder.id, "Dispute");
                      setReturnModalOrder(null);
                    }}
                    className="p-2.5 rounded-lg border border-rose-200 bg-rose-50 text-[#8B2635] font-semibold text-center hover:bg-rose-100"
                  >
                    Dispute Request
                  </button>
                  <button
                    onClick={() => {
                      updateReturnExchangeStatus(returnModalOrder.id, "Arrange Return Pickup");
                      setReturnModalOrder(null);
                    }}
                    className="p-2.5 rounded-lg border border-[#E8D2B7] text-[#21171F] font-semibold text-center hover:bg-[#FAF3EC]"
                  >
                    Arrange Return Pickup
                  </button>
                  <button
                    onClick={() => {
                      updateReturnExchangeStatus(returnModalOrder.id, "Process Exchange");
                      setReturnModalOrder(null);
                    }}
                    className="p-2.5 rounded-lg border border-[#E8D2B7] text-[#21171F] font-semibold text-center hover:bg-[#FAF3EC]"
                  >
                    Process Exchange
                  </button>
                  <button
                    onClick={() => {
                      updateReturnExchangeStatus(returnModalOrder.id, "Refund");
                      setReturnModalOrder(null);
                    }}
                    className="sm:col-span-2 p-2.5 rounded-lg border border-[#8B2635]/40 text-[#8B2635] font-semibold text-center hover:bg-rose-50"
                  >
                    Refund (Policy-Based)
                  </button>
                </div>
              </div>

              <div className="p-3 bg-[#FAF3EC] rounded-lg border border-[#E8D2B7] text-[10px] text-[#8F8178]">
                Notice: All refunds or exchange approvals comply strictly with stated platform policy without arbitrary financial additions.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
