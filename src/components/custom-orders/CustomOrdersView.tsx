"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { CustomOrder, QuotationData } from "@/types/studio";
import { 
  Scissors, 
  RotateCw, 
  Calendar, 
  CheckCircle2, 
  Plus, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  MessageSquare, 
  Layers, 
  Check,
  Download,
  Clock,
  Sparkles,
  User,
  AlertTriangle,
  FileText,
  Truck,
  Lock,
  Phone,
  Mail,
  MapPin,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CustomOrdersView: React.FC = () => {
  const {
    customOrders,
    activeCustomOrdersTab,
    setActiveCustomOrdersTab,
    activeInquirySubTab,
    setActiveInquirySubTab,
    sendQuotation,
    cancelCustomOrder,
    customerAcceptQuotation,
    customerPayAdvancePayment,
    startCustomOrder,
    completeCustomOrder,
    showToast
  } = useStudio();

  // Selected Order for Modal Actions
  const [selectedOrder, setSelectedOrder] = useState<CustomOrder | null>(null);
  const [isQuotationModalOpen, setIsQuotationModalOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isSpecsModalOpen, setIsSpecsModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  // Cancel Request Modal State
  const [cancelModalOrder, setCancelModalOrder] = useState<CustomOrder | null>(null);
  const [cancelReason, setCancelReason] = useState("");

  const [consultationDate, setConsultationDate] = useState("2024-11-18");
  const [consultationTime, setConsultationTime] = useState("04:30 PM (IST)");

  // Quotation Inputs (Itemized & Full Form Details)
  const [quotePrice, setQuotePrice] = useState<number>(120000);
  const [quoteDays, setQuoteDays] = useState<number>(20);
  const [quoteNotes, setQuoteNotes] = useState("");
  const [quoteFabricCost, setQuoteFabricCost] = useState<number>(45000);
  const [quoteEmbroideryCost, setQuoteEmbroideryCost] = useState<number>(55000);
  const [quoteTailoringCost, setQuoteTailoringCost] = useState<number>(20000);

  // Tab Filtering strictly based on prompt & zip design:
  const newInquiriesList = customOrders.filter((o) =>
    ["INQUIRY_RECEIVED", "QUOTATION_SENT", "CUSTOMER_ACCEPTED", "CUSTOMER_DECLINED", "AWAITING_ADVANCE_PAYMENT", "ADVANCE_PAYMENT_RECEIVED"].includes(o.lifecycleStatus)
  );

  const inProgressList = customOrders.filter((o) => o.lifecycleStatus === "IN_PROGRESS");
  const completedList = customOrders.filter((o) => o.lifecycleStatus === "COMPLETED");

  const handleOpenReview = (order: CustomOrder) => {
    setSelectedOrder(order);
    const initialPrice = order.quotation?.finalPrice || (order.baseProduct?.originalPrice ? order.baseProduct.originalPrice + 8000 : 95000);
    setQuotePrice(initialPrice);
    setQuoteDays(order.quotation?.estimatedCompletionDays || 21);
    setQuoteFabricCost(Math.round(initialPrice * 0.35));
    setQuoteEmbroideryCost(Math.round(initialPrice * 0.45));
    setQuoteTailoringCost(Math.round(initialPrice * 0.20));
    setQuoteNotes(
      order.quotation?.customizationDetails ||
      (order.inquiryType === "YOUR_LISTED_PRODUCT"
        ? `Bespoke artisanal alterations for ${order.baseProduct?.title}: ${order.requestedAlterations.requestedColour || ""} ${order.requestedAlterations.otherAlterations || ""}. Handcrafted to submitted patron measurements.`
        : `Bespoke artisanal tailoring: ${order.newGarmentReference?.requestedDesign || order.customerNotes}. Custom handloom fabrics and zardozi wire embroidery.`)
    );
    setIsQuotationModalOpen(true);
  };

  const handleSendQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    const deadline = new Date(Date.now() + quoteDays * 24 * 3600 * 1000).toISOString().split("T")[0];

    const quoteData: QuotationData = {
      customerSize: selectedOrder.requestedAlterations.requestedSize || "Bespoke Patron Fit",
      measurements: selectedOrder.requestedAlterations.measurements || {
        bust: "35 in",
        waist: "28 in",
        hips: "38 in",
        length: "43 in"
      },
      finalPrice: quotePrice,
      estimatedCompletionDays: quoteDays,
      completionDeadline: deadline,
      customizationDetails: quoteNotes,
      shippingInfo: "Complimentary Insured White-Glove Courier",
      sentDate: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      status: "Quotation Transmitted"
    };

    sendQuotation(selectedOrder.id, quoteData);
    setIsQuotationModalOpen(false);
    showToast(`Quotation of ₹${quotePrice.toLocaleString("en-IN")} transmitted to ${selectedOrder.customerName}.`);
  };

  const handleConfirmCancel = () => {
    if (cancelModalOrder) {
      cancelCustomOrder(cancelModalOrder.id, cancelReason || "Cancelled by designer.");
      setCancelModalOrder(null);
      setCancelReason("");
    }
  };

  const handleOpenConsultation = (order: CustomOrder) => {
    setSelectedOrder(order);
    setIsConsultationModalOpen(true);
  };

  const handleConfirmConsultation = () => {
    showToast(`Private Salon Consultation scheduled with ${selectedOrder?.customerName} for ${consultationDate} at ${consultationTime}.`);
    setIsConsultationModalOpen(false);
  };

  const handleApproveMeasurements = (order: CustomOrder) => {
    showToast(`Bespoke measurements and Mayfair toile approved for ${order.customerName}. Proceeding to fabric cutting.`);
  };

  const handleSendSwatches = (order: CustomOrder) => {
    showToast(`Physical textile swatches dispatched to ${order.customerName} via White-Glove Courier.`);
  };

  const handleSendFollowUp = (order: CustomOrder) => {
    showToast(`Curatorial follow-up dossier transmitted to ${order.customerName}.`);
  };

  return (
    <div className="flex flex-col w-full space-y-8 animate-fadeIn">
      
      {/* SECONDARY SUB-NAVIGATION TAB STRIP */}
      <div className="w-full bg-[#ffeff8]/80 backdrop-blur-md px-4 sm:px-8 py-0 rounded-2xl border border-[#d5c2c5]/40 shadow-xs">
        <div className="w-full max-w-[1520px] mx-auto flex items-center gap-8 overflow-x-auto">
          <button
            onClick={() => setActiveCustomOrdersTab("new-inquiries")}
            className={`relative py-4 text-xs font-semibold uppercase tracking-[0.14em] transition-all flex items-center gap-2 whitespace-nowrap ${
              activeCustomOrdersTab === "new-inquiries"
                ? "text-[#3a0e1e]"
                : "text-[#837376] hover:text-[#3a0e1e]"
            }`}
          >
            <span className="flex items-center gap-2">
              New Inquiries ({newInquiriesList.length})
              <span className="w-1.5 h-1.5 rounded-full bg-[#865040]"></span>
            </span>
            {activeCustomOrdersTab === "new-inquiries" && (
              <motion.span 
                layoutId="customOrdersActiveTab"
                className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#3a0e1e]" 
              />
            )}
          </button>

          <button
            onClick={() => setActiveCustomOrdersTab("in-progress")}
            className={`relative py-4 text-xs font-semibold uppercase tracking-[0.14em] transition-all flex items-center gap-2 whitespace-nowrap ${
              activeCustomOrdersTab === "in-progress"
                ? "text-[#3a0e1e]"
                : "text-[#837376] hover:text-[#3a0e1e]"
            }`}
          >
            <span>In Progress ({inProgressList.length})</span>
            {activeCustomOrdersTab === "in-progress" && (
              <motion.span 
                layoutId="customOrdersActiveTab"
                className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#3a0e1e]" 
              />
            )}
          </button>

          <button
            onClick={() => setActiveCustomOrdersTab("completed")}
            className={`relative py-4 text-xs font-semibold uppercase tracking-[0.14em] transition-all flex items-center gap-2 whitespace-nowrap ${
              activeCustomOrdersTab === "completed"
                ? "text-[#3a0e1e]"
                : "text-[#837376] hover:text-[#3a0e1e]"
            }`}
          >
            <span>Completed ({completedList.length})</span>
            {activeCustomOrdersTab === "completed" && (
              <motion.span 
                layoutId="customOrdersActiveTab"
                className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#3a0e1e]" 
              />
            )}
          </button>
        </div>
      </div>

      {/* DUAL TOGGLE BUTTON SWITCHER */}
      {activeCustomOrdersTab === "new-inquiries" && (
        <section className="w-full flex flex-col items-center justify-center py-2">
          <div className="inline-flex items-stretch bg-white border border-[#d5c2c5]/40 shadow-xs p-1.5 transition-all">
            <button
              onClick={() => setActiveInquirySubTab("your-listed-product")}
              className={`flex items-center justify-center gap-3 px-8 py-3.5 transition-all font-semibold text-xs tracking-[0.14em] uppercase ${
                activeInquirySubTab === "your-listed-product"
                  ? "bg-[#3a0e1e] text-white shadow-xs"
                  : "bg-transparent hover:bg-[#ffeff8] text-[#837376] hover:text-[#3a0e1e]"
              }`}
            >
              <Layers className="w-4 h-4 text-[#f6dfc4]" />
              <span>Adding Yours Existing Product</span>
            </button>

            <div className="w-[1px] bg-[#d5c2c5]/40 self-stretch my-2 mx-1.5"></div>

            <button
              onClick={() => setActiveInquirySubTab("new-customized-order")}
              className={`flex items-center justify-center gap-3 px-8 py-3.5 transition-all font-semibold text-xs tracking-[0.14em] uppercase ${
                activeInquirySubTab === "new-customized-order"
                  ? "bg-[#3a0e1e] text-white shadow-xs"
                  : "bg-transparent hover:bg-[#ffeff8] text-[#837376] hover:text-[#3a0e1e]"
              }`}
            >
              <Scissors className="w-4 h-4 text-[#865040]" />
              <span>New Design Customization</span>
            </button>
          </div>
        </section>
      )}

      {/* SECTION HEADER */}
      <div className="w-full max-w-[1520px] mx-auto flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#3a0e1e]">
            {activeCustomOrdersTab === "new-inquiries"
              ? "Inquiry Dossiers"
              : activeCustomOrdersTab === "in-progress"
              ? "Active Atelier Commissions"
              : "Completed Haute Archive"}
          </h2>
          <span className="bg-[#f6e3ef] px-2.5 py-0.5 text-[11px] text-[#3a0e1e] uppercase tracking-widest font-semibold">
            {activeCustomOrdersTab === "new-inquiries"
              ? "Awaiting Review"
              : activeCustomOrdersTab === "in-progress"
              ? "In Handcrafting"
              : "Certified Fulfilled"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-[#837376] text-xs uppercase tracking-widest font-semibold">
          <RotateCw className="w-4 h-4 text-[#865040]" />
          <span>Auto-updating priority queue</span>
        </div>
      </div>

      {/* ACTIVITY DOSSIER CARDS (EXACT FROM PHOTO 4) */}
      <div className="w-full max-w-[1520px] mx-auto flex flex-col gap-5">
        {activeCustomOrdersTab === "new-inquiries" && (
          <>
            {/* Card 1: Dr. Samira Mehta */}
            <article className="bg-white p-6 md:p-8 shadow-xs border border-[#d5c2c5]/30 rounded-lg flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center justify-between transition-all duration-300 hover:shadow-md">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center w-full lg:w-auto">
                <div className="relative w-28 h-36 shrink-0 overflow-hidden bg-[#ffeff8] rounded shadow-inner">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYiEtvfXx4kmW2tdz5Qydnho7HXdRGz2yfN7kUkUkBnr40HtkDY8aQNM47w5HnP3i3l0nXSQ7gWBEvkWGtrFbVbXmJRxwURTr1yWJGO80CW4hKDpr3pAsOPbXFj4o6wYR6Ho3hR99D1AKmRxvr3Y8BQbE2wJY8nh_gzJPIEVFJl6vnTK-YU_PRSDTBWJ3a-8cxSvKXM8g6dHxctAtdMkpJmRWV-VMI4Gp5z0moBoI"
                    alt="Dr. Samira Mehta"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 bg-[#3a0e1e]/80 backdrop-blur-xs text-white text-[9px] px-1.5 py-0.5 tracking-wider uppercase font-semibold">
                    Lehenga
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[11px] text-[#865040] tracking-widest uppercase font-semibold">
                      REF #CO-9042
                    </span>
                    <span className="text-[#d5c2c5]">•</span>
                    <span className="text-[11px] text-[#837376] tracking-wider uppercase">
                      20 Oct 2024
                    </span>
                    <span className="bg-[#fce9f4] px-2 py-0.5 text-[10px] text-[#3a0e1e] uppercase tracking-widest font-semibold">
                      VIP Patron
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl font-semibold text-[#3a0e1e]">
                    Dr. Samira Mehta
                  </h3>

                  <p className="text-sm text-[#231820] font-medium">
                    Rose Gold Tissue Silk Lehenga with Zardozi Borders
                  </p>

                  <p className="text-xs text-[#837376] line-clamp-1 max-w-xl">
                    Custom waist-to-hem drape specifications submitted. Requesting hand-stitched French wire accents along borders.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs">
                    <span className="font-semibold text-[#3a0e1e]">
                      ₹1,20,000 <span className="font-normal text-[#837376] text-[11px]">(Quote)</span>
                    </span>
                    <span className="text-[#d5c2c5]">/</span>
                    <span className="text-[#865040] font-medium">
                      ₹60,000 Advance Paid (Escrow)
                    </span>
                    <span className="text-[#d5c2c5]">/</span>
                    <span className="text-[#837376] flex items-center gap-1 text-[11px] uppercase tracking-wide">
                      <Calendar className="w-3.5 h-3.5 text-[#865040]" />
                      Fitting: 18 Nov 2024
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between w-full lg:w-auto gap-4 pt-4 lg:pt-0 border-t border-[#d5c2c5]/30 lg:border-t-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#ffeff8] text-[#3a0e1e] text-xs uppercase tracking-widest font-semibold rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#865040] animate-pulse"></span>
                  New Inquiry • Awaiting Design Review
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setCancelModalOrder(customOrders[0])}
                    className="bg-[#fce9f4] hover:bg-[#f6e3ef] text-[#3a0e1e] text-xs uppercase tracking-widest px-4 py-3 transition-colors font-semibold rounded shadow-xs"
                    type="button"
                  >
                    Cancel Request
                  </button>
                  <button
                    onClick={() => handleOpenReview(customOrders[0])}
                    className="bg-[#3a0e1e] hover:bg-[#542333] text-white text-xs uppercase tracking-widest px-5 py-3 transition-colors shadow-xs font-semibold rounded"
                    type="button"
                  >
                    Send Quotation
                  </button>
                </div>
              </div>
            </article>

            {/* Card 2: Tara & Kabir Roy */}
            <article className="bg-white p-6 md:p-8 shadow-xs border border-[#d5c2c5]/30 rounded-lg flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center justify-between transition-all duration-300 hover:shadow-md">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center w-full lg:w-auto">
                <div className="relative w-28 h-36 shrink-0 overflow-hidden bg-[#ffeff8] rounded shadow-inner">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfsjYkWc7IiRLvZXEEPeX28cxBX5niyOcBXYUorQBwuc8dX_h0IhY2P0uYDC802wIMc4a7mJg_k3uiYrW_-WAOC9WE6YrGk4wS9zDP1eVDxxkl2stRlE3w1Mv5ISY_o0E1m6ByEdhNJabC94kZvA2oK1q8OQMgj-x3GU5fjyMwhkDkCd51Eofh-4LCJz3MHMNGC4D2yTPRWPBCUT5Ts7Pym6Q41tyaUJe3CkACQaw"
                    alt="Tara & Kabir Roy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 bg-[#3a0e1e]/80 backdrop-blur-xs text-white text-[9px] px-1.5 py-0.5 tracking-wider uppercase font-semibold">
                    Trousseau
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[11px] text-[#865040] tracking-widest uppercase font-semibold">
                      REF #CO-8994
                    </span>
                    <span className="text-[#d5c2c5]">•</span>
                    <span className="text-[11px] text-[#837376] tracking-wider uppercase">
                      19 Oct 2024
                    </span>
                    <span className="bg-[#fce9f4] px-2 py-0.5 text-[10px] text-[#3a0e1e] uppercase tracking-widest font-semibold">
                      Bridal Trousseau
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl font-semibold text-[#3a0e1e]">
                    Tara & Kabir Roy
                  </h3>

                  <p className="text-sm text-[#231820] font-medium">
                    Midnight Velvet Bandhgala & Raw Silk Sherwani Ensemble
                  </p>

                  <p className="text-xs text-[#837376] line-clamp-1 max-w-xl">
                    Dual groom & partner bespoke fit. Architectural Mandarin collar with tone-on-tone threadwork.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs">
                    <span className="font-semibold text-[#3a0e1e]">
                      ₹95,000 <span className="font-normal text-[#837376] text-[11px]">(Comprehensive Quote)</span>
                    </span>
                    <span className="text-[#d5c2c5]">/</span>
                    <span className="text-[#865040] font-medium">
                      Quote Transmitted
                    </span>
                    <span className="text-[#d5c2c5]">/</span>
                    <span className="text-[#837376] flex items-center gap-1 text-[11px] uppercase tracking-wide">
                      <Calendar className="w-3.5 h-3.5 text-[#865040]" />
                      Wedding: 05 Dec 2024
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between w-full lg:w-auto gap-4 pt-4 lg:pt-0 border-t border-[#d5c2c5]/30 lg:border-t-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#fce9f4] text-[#837376] text-xs uppercase tracking-widest font-semibold rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#837376]"></span>
                  Quote Sent • Client Considering
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setCancelModalOrder(customOrders[1])}
                    className="bg-[#fce9f4] hover:bg-[#f6e3ef] text-[#3a0e1e] text-xs uppercase tracking-widest px-4 py-3 transition-colors font-semibold rounded shadow-xs"
                    type="button"
                  >
                    Cancel Request
                  </button>
                  <button
                    onClick={() => handleOpenReview(customOrders[1])}
                    className="bg-[#3a0e1e] hover:bg-[#542333] text-white text-xs uppercase tracking-widest px-5 py-3 transition-colors shadow-xs font-semibold rounded"
                    type="button"
                  >
                    Send Quotation
                  </button>
                </div>
              </div>
            </article>

            {/* Card 3: Eleanor Hughes */}
            <article className="bg-white p-6 md:p-8 shadow-xs border border-[#d5c2c5]/30 rounded-lg flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center justify-between transition-all duration-300 hover:shadow-md">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center w-full lg:w-auto">
                <div className="relative w-28 h-36 shrink-0 overflow-hidden bg-[#ffeff8] rounded shadow-inner">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKInC19qUz-eQ0ISMCxwp2FUmd04OmfHSpCB3bcSAWPAjM5ZOHsPcXr2TBkh5-xIrVRcl_UR3_8riVpCQR8Btg3RKK2yqimAORUdL4msXIcgWnuoqOJXxpDBDuP0OimcrHVBNzpjMyuglxbTdOQKEYokN3xpwlIo3AKSCbcVH9i5WEnfbshcJGgB6XVlVIAKvle6eZqK_gG9_Zyabq9SttVvNE_VvdRI6QUpsUhbY"
                    alt="Eleanor Hughes"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 bg-[#3a0e1e]/80 backdrop-blur-xs text-white text-[9px] px-1.5 py-0.5 tracking-wider uppercase font-semibold">
                    Couture
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[11px] text-[#865040] tracking-widest uppercase font-semibold">
                      REF #CO-8951
                    </span>
                    <span className="text-[#d5c2c5]">•</span>
                    <span className="text-[11px] text-[#837376] tracking-wider uppercase">
                      17 Oct 2024
                    </span>
                    <span className="bg-[#fce9f4] px-2 py-0.5 text-[10px] text-[#3a0e1e] uppercase tracking-widest font-semibold">
                      London Salon
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl font-semibold text-[#3a0e1e]">
                    Eleanor Hughes
                  </h3>

                  <p className="text-sm text-[#231820] font-medium">
                    Hand-Draped Silk Duchesse Ball Gown with Corsetry
                  </p>

                  <p className="text-xs text-[#837376] line-clamp-1 max-w-xl">
                    Bespoke corset boning parameters uploaded from Mayfair trunk show. Structural toile approved.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs">
                    <span className="font-semibold text-[#3a0e1e]">
                      ₹1,65,000 <span className="font-normal text-[#837376] text-[11px]">(Commission Total)</span>
                    </span>
                    <span className="text-[#d5c2c5]">/</span>
                    <span className="text-[#865040] font-medium">
                      ₹82,500 Deposit Verified
                    </span>
                    <span className="text-[#d5c2c5]">/</span>
                    <span className="text-[#837376] flex items-center gap-1 text-[11px] uppercase tracking-wide">
                      <Calendar className="w-3.5 h-3.5 text-[#865040]" />
                      1st Toile Fitting: 04 Nov 2024
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between w-full lg:w-auto gap-4 pt-4 lg:pt-0 border-t border-[#d5c2c5]/30 lg:border-t-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f6dfc4]/40 text-[#865040] text-xs uppercase tracking-widest font-semibold rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#865040]"></span>
                  Measurement Review Required
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setCancelModalOrder(customOrders[2])}
                    className="bg-[#fce9f4] hover:bg-[#f6e3ef] text-[#3a0e1e] text-xs uppercase tracking-widest px-4 py-3 transition-colors font-semibold rounded shadow-xs"
                    type="button"
                  >
                    Cancel Request
                  </button>
                  <button
                    onClick={() => handleOpenReview(customOrders[2])}
                    className="bg-[#3a0e1e] hover:bg-[#542333] text-white text-xs uppercase tracking-widest px-5 py-3 transition-colors shadow-xs font-semibold rounded"
                    type="button"
                  >
                    Send Quotation
                  </button>
                </div>
              </div>
            </article>

            {/* Card 4: Ananya Singhania */}
            <article className="bg-white p-6 md:p-8 shadow-xs border border-[#d5c2c5]/30 rounded-lg flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center justify-between transition-all duration-300 hover:shadow-md">
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center w-full lg:w-auto">
                <div className="relative w-28 h-36 shrink-0 overflow-hidden bg-[#ffeff8] rounded shadow-inner">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZq-pN7G2jZugXc4BuoUUkUwSUi8I-FzmvyB8ruaNEVjL-ErNftfspnJdWEHbGp2BSWbZ0_yrucLrlKY3xkhnWDgSCxYFgs1GCkY3b5_vuN78DhITJ4WpiS-IuxkzAiuX9zoecPI5IxSjWoaxo8dN2Mbz0T9QwNMuPy167gJFbAAWvaEFPh_1y4oTf0cYoPVSNkGybag6dSbQfxfIIsz7Loa-iWXgobhX4iCUbUqw"
                    alt="Ananya Singhania"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 bg-[#3a0e1e]/80 backdrop-blur-xs text-white text-[9px] px-1.5 py-0.5 tracking-wider uppercase font-semibold">
                    Cape
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[11px] text-[#865040] tracking-widest uppercase font-semibold">
                      REF #CO-8910
                    </span>
                    <span className="text-[#d5c2c5]">•</span>
                    <span className="text-[11px] text-[#837376] tracking-wider uppercase">
                      15 Oct 2024
                    </span>
                    <span className="bg-[#fce9f4] px-2 py-0.5 text-[10px] text-[#3a0e1e] uppercase tracking-widest font-semibold">
                      Red Carpet
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl font-semibold text-[#3a0e1e]">
                    Ananya Singhania
                  </h3>

                  <p className="text-sm text-[#231820] font-medium">
                    Sculptural Pleated Lamé Evening Cape
                  </p>

                  <p className="text-xs text-[#837376] line-clamp-1 max-w-xl">
                    Initial patron virtual consultation concluded. Curating swatches between Liquid Gold Lamé and Champagne Organza.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs">
                    <span className="font-semibold text-[#3a0e1e]">
                      ₹78,000 <span className="font-normal text-[#837376] text-[11px]">(Estimate)</span>
                    </span>
                    <span className="text-[#d5c2c5]">/</span>
                    <span className="text-[#837376] font-medium">
                      Consultation Complete
                    </span>
                    <span className="text-[#d5c2c5]">/</span>
                    <span className="text-[#837376] flex items-center gap-1 text-[11px] uppercase tracking-wide">
                      <Calendar className="w-3.5 h-3.5 text-[#865040]" />
                      Gala: 22 Nov 2024
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between w-full lg:w-auto gap-4 pt-4 lg:pt-0 border-t border-[#d5c2c5]/30 lg:border-t-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#ffeff8] text-[#3a0e1e] text-xs uppercase tracking-widest font-semibold rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#865040]"></span>
                  Swatch Selection Pending
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setCancelModalOrder(customOrders[3])}
                    className="bg-[#fce9f4] hover:bg-[#f6e3ef] text-[#3a0e1e] text-xs uppercase tracking-widest px-4 py-3 transition-colors font-semibold rounded shadow-xs"
                    type="button"
                  >
                    Cancel Request
                  </button>
                  <button
                    onClick={() => handleOpenReview(customOrders[3])}
                    className="bg-[#3a0e1e] hover:bg-[#542333] text-white text-xs uppercase tracking-widest px-5 py-3 transition-colors shadow-xs font-semibold rounded"
                    type="button"
                  >
                    Send Quotation
                  </button>
                </div>
              </div>
            </article>

            {/* Dynamic Additional Custom Inquiries (if any added from Customer portal) */}
            {customOrders.slice(4).filter(o => ["INQUIRY_RECEIVED", "QUOTATION_SENT", "CUSTOMER_ACCEPTED", "CUSTOMER_DECLINED", "AWAITING_ADVANCE_PAYMENT", "ADVANCE_PAYMENT_RECEIVED"].includes(o.lifecycleStatus)).map((order) => {
              const isDeclined = order.lifecycleStatus === "CUSTOMER_DECLINED";
              return (
                <article key={order.id} className="bg-white p-6 md:p-8 shadow-xs border border-[#d5c2c5]/30 rounded-lg flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center justify-between transition-all duration-300 hover:shadow-md">
                  <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center w-full lg:w-auto">
                    <div className="relative w-28 h-36 shrink-0 overflow-hidden bg-[#ffeff8] rounded shadow-inner">
                      <img
                        src={order.baseProduct?.thumbnail || order.newGarmentReference?.referenceImage || "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop"}
                        alt={order.customerName}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                      />
                      <span className="absolute top-2 left-2 bg-[#3a0e1e]/80 backdrop-blur-xs text-white text-[9px] px-1.5 py-0.5 tracking-wider uppercase font-semibold">
                        {order.baseProduct?.category || "Bespoke"}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[11px] text-[#865040] tracking-widest uppercase font-semibold">
                          REF #{order.orderNumber}
                        </span>
                        <span className="text-[#d5c2c5]">•</span>
                        <span className="text-[11px] text-[#837376] tracking-wider uppercase">
                          {order.quotation?.sentDate || "Recent"}
                        </span>
                        <span className="bg-[#fce9f4] px-2 py-0.5 text-[10px] text-[#3a0e1e] uppercase tracking-widest font-semibold">
                          Custom Inquiry
                        </span>
                      </div>

                      <h3 className="font-editorial text-2xl font-semibold text-[#3a0e1e]">
                        {order.customerName}
                      </h3>

                      <p className="text-sm text-[#231820] font-medium">
                        {order.baseProduct?.title || order.newGarmentReference?.requestedDesign || "Custom Haute Creation"}
                      </p>

                      <p className="text-xs text-[#837376] line-clamp-1 max-w-xl">
                        {order.customerNotes || order.requestedAlterations?.otherAlterations || "Custom fitting and bespoke embellishment inquiry."}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs">
                        <span className="font-semibold text-[#3a0e1e]">
                          ₹{(order.quotation?.finalPrice || order.baseProduct?.originalPrice || 85000).toLocaleString("en-IN")} <span className="font-normal text-[#837376] text-[11px]">(Valuation)</span>
                        </span>
                        <span className="text-[#d5c2c5]">/</span>
                        <span className="text-[#865040] font-medium">
                          {order.lifecycleStatus.replace(/_/g, " ")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between w-full lg:w-auto gap-4 pt-4 lg:pt-0 border-t border-[#d5c2c5]/30 lg:border-t-0">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-widest font-semibold rounded ${isDeclined ? "bg-rose-50 text-rose-800" : "bg-[#ffeff8] text-[#3a0e1e]"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isDeclined ? "bg-rose-600" : "bg-[#865040]"}`}></span>
                      {order.lifecycleStatus.replace(/_/g, " ")}
                    </span>

                    {!isDeclined && (
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                          onClick={() => setCancelModalOrder(order)}
                          className="bg-[#fce9f4] hover:bg-[#f6e3ef] text-[#3a0e1e] text-xs uppercase tracking-widest px-4 py-3 transition-colors font-semibold rounded shadow-xs"
                          type="button"
                        >
                          Cancel Request
                        </button>
                        <button
                          onClick={() => handleOpenReview(order)}
                          className="bg-[#3a0e1e] hover:bg-[#542333] text-white text-xs uppercase tracking-widest px-5 py-3 transition-colors shadow-xs font-semibold rounded"
                          type="button"
                        >
                          Send Quotation
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </>
        )}

        {/* IN PROGRESS TAB VIEW */}
        {activeCustomOrdersTab === "in-progress" && (
          <div className="p-12 text-center bg-white rounded-2xl border border-[#d5c2c5]/40 shadow-xs space-y-4">
            <p className="font-editorial text-2xl text-[#3a0e1e]">8 Commissions Currently in Handcrafting</p>
            <p className="text-xs text-[#837376] max-w-md mx-auto leading-relaxed">
              All commissioned garments are in active tailoring across Mayfair, Paris, and Mumbai master workshops.
            </p>
          </div>
        )}

        {/* COMPLETED TAB VIEW */}
        {activeCustomOrdersTab === "completed" && (
          <div className="p-12 text-center bg-white rounded-2xl border border-[#d5c2c5]/40 shadow-xs space-y-4">
            <p className="font-editorial text-2xl text-[#3a0e1e]">24 Certified Commissions Fulfilled</p>
            <p className="text-xs text-[#837376] max-w-md mx-auto leading-relaxed">
              Archived historical patron commissions with verified provenance seals and escrow releases.
            </p>
          </div>
        )}
      </div>

      {/* CURATORIAL STANDARDS WORKFLOW BANNER */}
      <div className="w-full max-w-[1520px] mx-auto pb-8">
        <footer className="w-full bg-[#ffeff8]/80 backdrop-blur-md px-8 py-6 rounded-xl border border-[#d5c2c5]/40 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-[#fce9f4] flex items-center justify-center text-[#3a0e1e] shrink-0 border border-[#d5c2c5]/40">
                <ShieldCheck className="w-5 h-5 text-[#865040]" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#3a0e1e] font-semibold">
                  BESPOKE ATELIER STANDARDS
                </p>
                <p className="text-xs text-[#837376] mt-0.5">
                  Every custom commission adheres to Atelier Maison Privée's master craftsmanship charter. Escrow deposits are held securely until final patron fitting approval.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 shrink-0">
              <button 
                onClick={() => showToast("Opening Atelier Charter • PDF...")}
                className="text-[11px] uppercase tracking-wider text-[#865040] hover:text-[#3a0e1e] transition-colors underline underline-offset-4 font-semibold"
                type="button"
              >
                Atelier Charter • PDF
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* MODAL 1: CONSULTATION MODAL */}
      <AnimatePresence>
        {isConsultationModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231820]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 border border-[#d5c2c5] shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#d5c2c5]/40">
                <div className="flex items-center gap-2 text-[#3a0e1e]">
                  <Calendar className="w-5 h-5 text-[#865040]" />
                  <h3 className="font-editorial text-xl font-bold">
                    Schedule Salon Consultation
                  </h3>
                </div>
                <button
                  onClick={() => setIsConsultationModalOpen(false)}
                  className="p-1 rounded-full text-[#837376] hover:bg-[#ffeff8]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#837376]">Patron</label>
                  <p className="font-editorial text-lg text-[#3a0e1e] font-bold mt-0.5">{selectedOrder?.customerName}</p>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#837376]">Consultation Date</label>
                  <input
                    type="date"
                    value={consultationDate}
                    onChange={(e) => setConsultationDate(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-lg border border-[#d5c2c5] text-xs font-medium text-[#231820] bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#837376]">Time Slot</label>
                  <input
                    type="text"
                    value={consultationTime}
                    onChange={(e) => setConsultationTime(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-lg border border-[#d5c2c5] text-xs font-medium text-[#231820] bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#d5c2c5]/40">
                <button
                  type="button"
                  onClick={() => setIsConsultationModalOpen(false)}
                  className="px-4 py-2 text-xs uppercase tracking-wider font-semibold text-[#837376] hover:bg-[#ffeff8] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmConsultation}
                  className="px-5 py-2.5 text-xs uppercase tracking-wider font-semibold bg-[#3a0e1e] hover:bg-[#542333] text-white rounded-lg shadow-xs"
                >
                  Confirm Appointment
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: SPLIT SCREEN VIEW — CUSTOMER REQUEST DETAILS & SEND QUOTATION FORM */}
      <AnimatePresence>
        {isQuotationModalOpen && selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-[#160711]/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="w-full max-w-6xl max-h-[94vh] bg-white rounded-2xl sm:rounded-3xl border border-[#d5c2c5]/60 shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Split Screen Header */}
              <div className="px-6 py-4 sm:px-8 sm:py-5 border-b border-[#d5c2c5]/40 bg-[#FFF7F9] flex items-center justify-between shrink-0">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#865040] bg-[#fce9f4] px-2.5 py-0.5 rounded">
                      ATELIER DOSSIER • SPLIT SCREEN CONSOLE
                    </span>
                    <span className="text-[11px] font-semibold text-[#837376]">
                      REF #{selectedOrder.orderNumber}
                    </span>
                    <span className="text-[#d5c2c5]">•</span>
                    <span className="text-[11px] font-semibold text-[#3a0e1e]">
                      {selectedOrder.lifecycleStatus.replace(/_/g, " ")}
                    </span>
                  </div>
                  <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#3a0e1e] mt-1">
                    Bespoke Custom Inquiry: {selectedOrder.customerName}
                  </h2>
                </div>

                <button
                  onClick={() => setIsQuotationModalOpen(false)}
                  className="p-2 rounded-full text-[#837376] hover:text-[#3a0e1e] hover:bg-white transition-colors border border-transparent hover:border-[#d5c2c5]"
                  title="Close split view"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Split Screen Content Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto divide-y lg:divide-y-0 lg:divide-x divide-[#d5c2c5]/50 flex-1">
                
                {/* ======================================================== */}
                {/* LEFT PANE: CUSTOMER REQUEST DETAILS & RECEIVED QUOTATION */}
                {/* ======================================================== */}
                <div className="lg:col-span-6 p-6 sm:p-8 space-y-6 bg-[#FFF7F9]/40 overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-[#d5c2c5]/30 pb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#865040]" />
                      <h3 className="font-editorial text-lg font-bold text-[#3a0e1e]">
                        Customer Request Dossier
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#865040] bg-white px-2 py-0.5 rounded border border-[#d5c2c5]/40">
                      Patron Specifications
                    </span>
                  </div>

                  {/* Patron Identity Card */}
                  <div className="p-4 rounded-xl bg-white border border-[#d5c2c5]/40 shadow-xs space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-editorial text-lg font-bold text-[#3a0e1e]">
                          {selectedOrder.customerName}
                        </p>
                        <p className="text-xs text-[#837376]">
                          {selectedOrder.customerCity || "Mumbai, Maharashtra"} • {selectedOrder.customerPhone || "+91 98201 44920"}
                        </p>
                        {selectedOrder.customerEmail && (
                          <p className="text-xs text-[#837376]">{selectedOrder.customerEmail}</p>
                        )}
                      </div>
                      <span className="bg-[#fce9f4] px-2 py-0.5 text-[10px] text-[#3a0e1e] uppercase tracking-widest font-semibold rounded">
                        VIP Patron
                      </span>
                    </div>
                  </div>

                  {/* Garment Visual & Base Reference */}
                  <div className="p-4 rounded-xl bg-white border border-[#d5c2c5]/40 shadow-xs flex gap-4 items-center">
                    <div className="w-24 h-28 rounded-lg overflow-hidden bg-[#ffeff8] shrink-0 border border-[#d5c2c5]/50">
                      <img
                        src={selectedOrder.baseProduct?.thumbnail || selectedOrder.newGarmentReference?.referenceImage || "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop"}
                        alt={selectedOrder.customerName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#865040]">
                        {selectedOrder.inquiryType === "YOUR_LISTED_PRODUCT" ? "Catalog Creation Customization" : "New Bespoke Design Request"}
                      </span>
                      <h4 className="font-editorial text-base font-bold text-[#3a0e1e] line-clamp-2">
                        {selectedOrder.baseProduct?.title || selectedOrder.newGarmentReference?.requestedDesign || "Bespoke Couture Creation"}
                      </h4>
                      <p className="text-xs font-semibold text-[#837376]">
                        Base Valuation: <span className="text-[#3a0e1e] font-bold">₹{(selectedOrder.baseProduct?.originalPrice || 85000).toLocaleString("en-IN")}</span>
                      </p>
                    </div>
                  </div>

                  {/* Customer Requested Specifications */}
                  <div className="space-y-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#865040]">
                      Submitted Alterations & Textile Specs
                    </p>
                    <div className="bg-white rounded-xl border border-[#d5c2c5]/40 p-4 space-y-2.5 text-xs">
                      <div className="flex justify-between py-1 border-b border-[#d5c2c5]/20">
                        <span className="text-[#837376] font-medium">Requested Fit / Size:</span>
                        <span className="font-semibold text-[#3a0e1e] text-right">
                          {selectedOrder.requestedAlterations?.requestedSize || selectedOrder.newGarmentReference?.measurements || "Bespoke Patron Fit"}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#d5c2c5]/20">
                        <span className="text-[#837376] font-medium">Requested Fabric & Weave:</span>
                        <span className="font-semibold text-[#3a0e1e] text-right">
                          {selectedOrder.requestedAlterations?.requestedFabric || selectedOrder.newGarmentReference?.fabric || "Handloom Bangalore Raw Silk"}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-[#d5c2c5]/20">
                        <span className="text-[#837376] font-medium">Requested Colourway:</span>
                        <span className="font-semibold text-[#3a0e1e] text-right">
                          {selectedOrder.requestedAlterations?.requestedColour || selectedOrder.newGarmentReference?.colour || "Antique Rose Gold & Champagne"}
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-[#837376] font-medium">Alteration Scope:</span>
                        <span className="font-semibold text-[#3a0e1e] text-right max-w-xs">
                          {selectedOrder.requestedAlterations?.otherAlterations || selectedOrder.newGarmentReference?.alterationDetails || "Custom waist-to-hem drape and neckline piping."}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Precision Measurements Dossier */}
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#865040]">
                      Patron Measurements Breakdown
                    </p>
                    <div className="grid grid-cols-5 gap-2 text-center">
                      <div className="bg-white p-2.5 rounded-lg border border-[#d5c2c5]/40">
                        <p className="text-[10px] text-[#837376] font-semibold uppercase">Bust</p>
                        <p className="font-bold text-[#3a0e1e] text-xs mt-0.5">
                          {selectedOrder.requestedAlterations?.measurements?.bust || "35 in"}
                        </p>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-[#d5c2c5]/40">
                        <p className="text-[10px] text-[#837376] font-semibold uppercase">Waist</p>
                        <p className="font-bold text-[#3a0e1e] text-xs mt-0.5">
                          {selectedOrder.requestedAlterations?.measurements?.waist || "28 in"}
                        </p>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-[#d5c2c5]/40">
                        <p className="text-[10px] text-[#837376] font-semibold uppercase">Hips</p>
                        <p className="font-bold text-[#3a0e1e] text-xs mt-0.5">
                          {selectedOrder.requestedAlterations?.measurements?.hips || "38 in"}
                        </p>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-[#d5c2c5]/40">
                        <p className="text-[10px] text-[#837376] font-semibold uppercase">Length</p>
                        <p className="font-bold text-[#3a0e1e] text-xs mt-0.5">
                          {selectedOrder.requestedAlterations?.measurements?.length || "43 in"}
                        </p>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-[#d5c2c5]/40">
                        <p className="text-[10px] text-[#837376] font-semibold uppercase">Shoulder</p>
                        <p className="font-bold text-[#3a0e1e] text-xs mt-0.5">
                          {(selectedOrder.requestedAlterations?.measurements as Record<string, string | undefined>)?.shoulder || "18.5 in"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Customer Direct Notes */}
                  {selectedOrder.customerNotes && (
                    <div className="p-3.5 bg-white rounded-xl border border-[#d5c2c5]/40 text-xs">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#865040] mb-1">
                        Patron Direct Instructions
                      </p>
                      <p className="text-[#3a0e1e] italic leading-relaxed">
                        "{selectedOrder.customerNotes}"
                      </p>
                    </div>
                  )}

                  {/* Currently Active / Received Quotation Status */}
                  <div className="p-4 bg-white rounded-xl border border-[#D4AF37]/50 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#865040] flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                        Received / Active Quotation Dossier
                      </p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${selectedOrder.quotation ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-800 border border-amber-200"}`}>
                        {selectedOrder.quotation ? selectedOrder.quotation.status || "Quotation Active" : "Pending First Quote"}
                      </span>
                    </div>

                    {selectedOrder.quotation ? (
                      <div className="text-xs space-y-1.5 pt-1 text-[#837376]">
                        <p>Total Valuation: <strong className="text-[#3a0e1e] font-bold">₹{selectedOrder.quotation.finalPrice?.toLocaleString("en-IN")}</strong></p>
                        <p>Escrow Advance (50%): <strong className="text-[#865040] font-bold">₹{((selectedOrder.quotation.finalPrice || 0) * 0.5).toLocaleString("en-IN")}</strong></p>
                        <p>Timeline: <strong>{selectedOrder.quotation.estimatedCompletionDays || 21} working days</strong> (Completion Deadline: {selectedOrder.quotation.completionDeadline || "2026-11-18"})</p>
                        <p>Logistics: <strong>{selectedOrder.quotation.shippingInfo || "Complimentary Insured White-Glove Courier"}</strong></p>
                      </div>
                    ) : (
                      <p className="text-xs text-[#837376]">
                        No formal quotation has been sent to this patron yet. Review the details above and transmit the official quote form on the right.
                      </p>
                    )}
                  </div>
                </div>

                {/* ======================================================== */}
                {/* RIGHT PANE: OFFICIAL QUOTATION TRANSMISSION FORM        */}
                {/* ======================================================== */}
                <div className="lg:col-span-6 p-6 sm:p-8 space-y-5 bg-white overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-[#d5c2c5]/30 pb-3">
                    <div className="flex items-center gap-2">
                      <Scissors className="w-4 h-4 text-[#865040]" />
                      <h3 className="font-editorial text-lg font-bold text-[#3a0e1e]">
                        Official Quotation Form
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      50% Escrow Protected
                    </span>
                  </div>

                  <p className="text-xs text-[#837376] leading-relaxed">
                    Set the bespoke price valuation, artisan timeline, and itemized craftsmanship details. Once transmitted, the patron can accept and deposit 50% into secure Atelier Escrow.
                  </p>

                  <form onSubmit={handleSendQuotation} className="space-y-4 text-xs">
                    {/* Valuation & Escrow Split */}
                    <div className="p-4 rounded-xl bg-[#FFF7F9] border border-[#d5c2c5]/50 space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[11px] font-bold uppercase tracking-wider text-[#3a0e1e]">
                            Total Quotation Valuation (INR)
                          </label>
                          <span className="font-editorial text-base font-bold text-[#3a0e1e]">
                            ₹{quotePrice.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <input
                          type="number"
                          value={quotePrice}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setQuotePrice(val);
                            setQuoteFabricCost(Math.round(val * 0.35));
                            setQuoteEmbroideryCost(Math.round(val * 0.45));
                            setQuoteTailoringCost(Math.round(val * 0.20));
                          }}
                          className="w-full p-2.5 rounded-lg border border-[#d5c2c5] text-xs font-semibold text-[#3a0e1e] bg-white focus:outline-none focus:border-[#3a0e1e]"
                        />
                      </div>

                      {/* Escrow Breakdown Display */}
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div className="p-2.5 rounded-lg bg-white border border-[#d5c2c5]/40">
                          <p className="text-[10px] text-[#865040] font-bold uppercase tracking-wider">50% Advance (Escrow)</p>
                          <p className="font-bold text-[#3a0e1e] text-sm mt-0.5">
                            ₹{(quotePrice * 0.5).toLocaleString("en-IN")}
                          </p>
                          <p className="text-[9px] text-[#837376]">Locks order & begins cutting</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white border border-[#d5c2c5]/40">
                          <p className="text-[10px] text-[#837376] font-bold uppercase tracking-wider">50% Balance on Delivery</p>
                          <p className="font-bold text-[#3a0e1e] text-sm mt-0.5">
                            ₹{(quotePrice * 0.5).toLocaleString("en-IN")}
                          </p>
                          <p className="text-[9px] text-[#837376]">Released upon fitting approval</p>
                        </div>
                      </div>
                    </div>

                    {/* Timeline & Delivery */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#837376]">
                          Artisan Working Days
                        </label>
                        <input
                          type="number"
                          value={quoteDays}
                          onChange={(e) => setQuoteDays(Number(e.target.value))}
                          className="w-full mt-1 p-2.5 rounded-lg border border-[#d5c2c5] text-xs font-medium text-[#231820] bg-white focus:outline-none focus:border-[#3a0e1e]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#837376]">
                          Estimated Completion Date
                        </label>
                        <div className="mt-1 p-2.5 rounded-lg border border-[#d5c2c5]/40 text-xs font-semibold text-[#865040] bg-[#FFF7F9]">
                          {new Date(Date.now() + quoteDays * 24 * 3600 * 1000).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </div>
                      </div>
                    </div>

                    {/* Itemized Cost Breakdown */}
                    <div className="space-y-2 pt-1">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#865040]">
                        Itemized Craftsmanship Breakdown (INR)
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-[10px] font-semibold text-[#837376]">Silks & Fabric</label>
                          <input
                            type="number"
                            value={quoteFabricCost}
                            onChange={(e) => setQuoteFabricCost(Number(e.target.value))}
                            className="w-full mt-0.5 p-2 rounded-lg border border-[#d5c2c5] text-xs font-medium text-[#231820] bg-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-[#837376]">Zardozi & Needlework</label>
                          <input
                            type="number"
                            value={quoteEmbroideryCost}
                            onChange={(e) => setQuoteEmbroideryCost(Number(e.target.value))}
                            className="w-full mt-0.5 p-2 rounded-lg border border-[#d5c2c5] text-xs font-medium text-[#231820] bg-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-semibold text-[#837376]">Toile & Tailoring</label>
                          <input
                            type="number"
                            value={quoteTailoringCost}
                            onChange={(e) => setQuoteTailoringCost(Number(e.target.value))}
                            className="w-full mt-0.5 p-2 rounded-lg border border-[#d5c2c5] text-xs font-medium text-[#231820] bg-white focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Logistics & Service Guarantees */}
                    <div className="p-3 rounded-lg bg-[#FFF7F9] border border-[#d5c2c5]/40 space-y-1.5 text-xs">
                      <div className="flex items-center gap-2 text-[#3a0e1e] font-semibold">
                        <Truck className="w-3.5 h-3.5 text-[#865040]" />
                        <span>Logistics: Complimentary Insured White-Glove Courier Included</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#837376]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Fitting: 1-on-1 Salon Toile Trial & Fitting Review Included</span>
                      </div>
                    </div>

                    {/* Notes for Patron */}
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#837376]">
                        Craftsmanship Notes & Patron Instructions
                      </label>
                      <textarea
                        rows={3}
                        value={quoteNotes}
                        onChange={(e) => setQuoteNotes(e.target.value)}
                        placeholder="Add notes about fabric choice, embroidery timeline, and salon toile fitting..."
                        className="w-full mt-1 p-2.5 rounded-lg border border-[#d5c2c5] text-xs font-medium text-[#231820] bg-white focus:outline-none focus:border-[#3a0e1e]"
                      />
                    </div>

                    {/* Submit Actions */}
                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#d5c2c5]/40">
                      <button
                        type="button"
                        onClick={() => setIsQuotationModalOpen(false)}
                        className="px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#837376] hover:bg-[#ffeff8] rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-3 text-xs uppercase tracking-wider font-semibold bg-[#3a0e1e] hover:bg-[#542333] text-white rounded-xl shadow-md transition-all flex items-center gap-2 border border-[#D4AF37]/40"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Transmit Quotation to Patron</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2B: CANCEL CUSTOM REQUEST CONFIRMATION MODAL */}
      <AnimatePresence>
        {cancelModalOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#160711]/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-7 border border-[#d5c2c5] shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#d5c2c5]/40">
                <div className="flex items-center gap-2 text-[#865040]">
                  <AlertTriangle className="w-5 h-5 text-[#ba1a1a]" />
                  <h3 className="font-editorial text-xl font-bold text-[#3a0e1e]">
                    Cancel Customer Request
                  </h3>
                </div>
                <button
                  onClick={() => setCancelModalOrder(null)}
                  className="p-1 rounded-full text-[#837376] hover:bg-[#ffeff8]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3.5 bg-[#FFF7F9] rounded-xl border border-[#d5c2c5]/40 text-xs space-y-1.5">
                <p className="font-bold text-[#3a0e1e]">
                  {cancelModalOrder.customerName} • REF #{cancelModalOrder.orderNumber}
                </p>
                <p className="text-[#837376]">
                  {cancelModalOrder.baseProduct?.title || cancelModalOrder.newGarmentReference?.requestedDesign || "Bespoke Haute Creation"}
                </p>
              </div>

              <p className="text-xs text-[#837376] leading-relaxed">
                Are you sure you want to cancel this bespoke custom commission? This will decline the inquiry, update the dossier status, and notify the patron immediately.
              </p>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#837376]">
                  Cancellation Reason (Optional note for patron)
                </label>
                <input
                  type="text"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="e.g., Fabric archive exhausted or schedule fully booked"
                  className="w-full mt-1 p-2.5 rounded-lg border border-[#d5c2c5] text-xs font-medium text-[#231820] bg-white focus:outline-none focus:border-[#3a0e1e]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#d5c2c5]/40">
                <button
                  type="button"
                  onClick={() => setCancelModalOrder(null)}
                  className="px-4 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#837376] hover:bg-[#ffeff8] rounded-lg transition-colors"
                >
                  Keep Request
                </button>
                <button
                  type="button"
                  onClick={handleConfirmCancel}
                  className="px-5 py-2.5 text-xs uppercase tracking-wider font-semibold bg-[#ba1a1a] hover:bg-[#93000a] text-white rounded-lg shadow-sm transition-colors"
                >
                  Confirm Cancellation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 3: VIEW SPECS MODAL */}
      <AnimatePresence>
        {isSpecsModalOpen && selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231820]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 border border-[#d5c2c5] shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#d5c2c5]/40">
                <div className="flex items-center gap-2 text-[#3a0e1e]">
                  <CheckCircle2 className="w-5 h-5 text-[#865040]" />
                  <h3 className="font-editorial text-xl font-bold">
                    Mayfair Corset Specifications
                  </h3>
                </div>
                <button
                  onClick={() => setIsSpecsModalOpen(false)}
                  className="p-1 rounded-full text-[#837376] hover:bg-[#ffeff8]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-[#d5c2c5]/20">
                  <span className="text-[#837376] uppercase tracking-wider font-semibold">Patron</span>
                  <span className="font-bold text-[#3a0e1e]">{selectedOrder.customerName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#d5c2c5]/20">
                  <span className="text-[#837376] uppercase tracking-wider font-semibold">Reference</span>
                  <span className="font-mono text-[#865040]">{selectedOrder.orderNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#d5c2c5]/20">
                  <span className="text-[#837376] uppercase tracking-wider font-semibold">Boning Construction</span>
                  <span className="text-[#231820]">16 Spiral Steel Boning Channels</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#d5c2c5]/20">
                  <span className="text-[#837376] uppercase tracking-wider font-semibold">Toile Approval</span>
                  <span className="text-emerald-700 font-bold">Approved at London Salon</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#d5c2c5]/40">
                <button
                  type="button"
                  onClick={() => setIsSpecsModalOpen(false)}
                  className="px-4 py-2 text-xs uppercase tracking-wider font-semibold text-[#837376] hover:bg-[#ffeff8] rounded-lg"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleApproveMeasurements(selectedOrder);
                    setIsSpecsModalOpen(false);
                  }}
                  className="px-5 py-2.5 text-xs uppercase tracking-wider font-semibold bg-[#3a0e1e] hover:bg-[#542333] text-white rounded-lg shadow-xs"
                >
                  Approve Measurements
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 4: OPEN CHAT MODAL */}
      <AnimatePresence>
        {isChatModalOpen && selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#231820]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 border border-[#d5c2c5] shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#d5c2c5]/40">
                <div className="flex items-center gap-2 text-[#3a0e1e]">
                  <MessageSquare className="w-5 h-5 text-[#865040]" />
                  <h3 className="font-editorial text-xl font-bold">
                    Salon Concierge Chat
                  </h3>
                </div>
                <button
                  onClick={() => setIsChatModalOpen(false)}
                  className="p-1 rounded-full text-[#837376] hover:bg-[#ffeff8]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3 bg-[#ffeff8] rounded-lg text-xs space-y-1">
                <p className="font-bold text-[#3a0e1e]">{selectedOrder.customerName}</p>
                <p className="text-[#837376]">"Excited for the red carpet cape! Are the fabric swatches ready?"</p>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#837376]">Your Response</label>
                <textarea
                  rows={3}
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your bespoke couture consultation message..."
                  className="w-full p-2.5 rounded-lg border border-[#d5c2c5] text-xs text-[#231820] bg-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#d5c2c5]/40">
                <button
                  type="button"
                  onClick={() => setIsChatModalOpen(false)}
                  className="px-4 py-2 text-xs uppercase tracking-wider font-semibold text-[#837376] hover:bg-[#ffeff8] rounded-lg"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    showToast(`Message sent to ${selectedOrder.customerName}.`);
                    setIsChatModalOpen(false);
                    setChatMessage("");
                  }}
                  className="px-5 py-2.5 text-xs uppercase tracking-wider font-semibold bg-[#3a0e1e] hover:bg-[#542333] text-white rounded-lg shadow-xs"
                >
                  Send Message
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
