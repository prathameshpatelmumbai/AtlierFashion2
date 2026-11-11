"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { ListedProduct } from "@/types/studio";
import { 
  X, 
  Scissors, 
  Ruler, 
  Sparkles, 
  Image as ImageIcon, 
  CheckCircle2, 
  ArrowRight,
  Lock,
  Layers
} from "lucide-react";

interface CustomerCustomRequestModalProps {
  product: ListedProduct | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const CustomerCustomRequestModal: React.FC<CustomerCustomRequestModalProps> = ({
  product,
  onClose,
  onSuccess
}) => {
  const { 
    submitExistingProductCustomization, 
    submitNewCustomizedOrder,
    setCustomerSection,
    setSelectedProductId
  } = useStudio();

  // Mode: if product is provided, "alteration", else "bespoke"
  const isAlteration = Boolean(product);

  // Form State for Listed Product Alteration
  const [requestedSize, setRequestedSize] = useState(product?.sizes[0] || "Custom");
  const [requestedColour, setRequestedColour] = useState("");
  const [requestedFabric, setRequestedFabric] = useState("");
  const [otherAlterations, setOtherAlterations] = useState("");
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [hips, setHips] = useState("");
  const [length, setLength] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");

  // Form State for Brand New Bespoke Commission
  const [requestedDesign, setRequestedDesign] = useState("");
  const [referenceImage, setReferenceImage] = useState("https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80");
  const [bespokeFabric, setBespokeFabric] = useState("Pure Chanderi Silk");
  const [bespokeColour, setBespokeColour] = useState("Champagne Gold & Peach");
  const [bespokeMeasurements, setBespokeMeasurements] = useState("Bust: 36\", Waist: 30\", Hips: 40\", Length: 56\"");
  const [alterationDetails, setAlterationDetails] = useState("Floor-length panelled silhouette with delicate dabka zardozi embroidery on sleeve cuffs and scalloped hem.");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      if (isAlteration && product) {
        submitExistingProductCustomization(product.id, {
          requestedSize,
          requestedColour: requestedColour || "As seen in original sample",
          requestedFabric: requestedFabric || product.materials || "Original Fabric",
          otherAlterations: otherAlterations || "Custom fit adjustments according to provided measurements",
          measurements: {
            bust: bust ? `${bust}"` : undefined,
            waist: waist ? `${waist}"` : undefined,
            hips: hips ? `${hips}"` : undefined,
            length: length ? `${length}"` : undefined
          },
          customerNotes
        });
      } else {
        submitNewCustomizedOrder({
          referenceImage,
          requestedDesign: requestedDesign || "Bespoke Couture Garment",
          measurements: bespokeMeasurements,
          colour: bespokeColour,
          fabric: bespokeFabric,
          alterationDetails,
          customerNotes
        });
      }

      setIsSubmitting(false);
      setSubmitted(true);
      onSuccess();
    }, 700);
  };

  const handleGoToCustomOrders = () => {
    onClose();
    setSelectedProductId(null);
    setCustomerSection("custom-orders");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FFF7F9] w-full max-w-2xl rounded-3xl border border-[#D4AF37]/50 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E8D2B7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-[#3A0E1E]" />
            <h3 className="font-serif text-lg text-[#231820]">
              {submitted 
                ? "Custom Inquiry Submitted" 
                : isAlteration 
                  ? "Request Custom Fit & Alterations" 
                  : "Commission New Bespoke Garment"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#8F8178] hover:text-[#231820] hover:bg-[#FFF7F9] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {submitted ? (
            /* Submission Confirmation Screen */
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A059]">
                  Inquiry Dispatched to Couturier
                </span>
                <h4 className="font-serif text-2xl text-[#231820] mt-1">
                  Custom Request Received
                </h4>
                <p className="text-xs text-[#8F8178] max-w-md mx-auto mt-2">
                  The atelier artisan is reviewing your specifications and will formulate a personalized quotation detailing exact pricing, material requirements, and production timeline.
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#E8D2B7] max-w-md mx-auto text-left text-xs space-y-2 shadow-xs">
                <div className="flex items-center gap-2 text-[#3A0E1E] font-medium">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Next Step: Designer Quotation</span>
                </div>
                <p className="text-[#8F8178] leading-relaxed">
                  You will receive a notification once the designer sends the quotation. You can then review and accept it with an initial 40% advance payment to commence creation.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleGoToCustomOrders}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#3A0E1E] hover:bg-[#542333] text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 border border-[#D4AF37]/40 shadow-sm"
                >
                  <span>Track in Custom Orders</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-[#FFF7F9] text-[#231820] border border-[#E8D2B7] text-xs font-medium uppercase tracking-wider"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* The Custom Inquiry Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Reference Card if Alteration Mode */}
              {isAlteration && product && (
                <div className="p-4 bg-white rounded-2xl border border-[#E8D2B7] flex items-center gap-4">
                  <img
                    src={product.images?.[0] || "/images/mockup/arrival_1.jpg"}
                    alt=""
                    className="w-16 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-semibold">
                        {product.brandName}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-[#8F8178]">
                        <Lock className="w-3 h-3 text-[#8F8178]" /> Original Piece Locked
                      </span>
                    </div>
                    <div className="font-serif text-base text-[#231820] font-light mt-0.5">
                      {product.title}
                    </div>
                    <div className="text-[#8F8178] mt-1">
                      Original Listed Price: <span className="font-medium text-[#231820]">₹{product.price.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Fields: Alteration of existing product */}
              {isAlteration ? (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-semibold text-[#231820] tracking-wider">
                        Requested Size / Silhouette
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Custom Fit / UK 10 / Petite"
                        value={requestedSize}
                        onChange={(e) => setRequestedSize(e.target.value)}
                        required
                        className="w-full mt-1.5 px-3 py-2 bg-white rounded-xl border border-[#E8D2B7] text-[#231820] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-semibold text-[#231820] tracking-wider">
                        Requested Garment Colour
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., Powder Blue / Deep Wine / Mint Green"
                        value={requestedColour}
                        onChange={(e) => setRequestedColour(e.target.value)}
                        className="w-full mt-1.5 px-3 py-2 bg-white rounded-xl border border-[#E8D2B7] text-[#231820] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-semibold text-[#231820] tracking-wider">
                      Requested Fabric / Weave Alterations
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Prefer Pure Organza Silk instead of Georgette"
                      value={requestedFabric}
                      onChange={(e) => setRequestedFabric(e.target.value)}
                      className="w-full mt-1.5 px-3 py-2 bg-white rounded-xl border border-[#E8D2B7] text-[#231820] outline-none"
                    />
                  </div>

                  {/* Body Measurements Section */}
                  <div className="p-4 bg-white rounded-2xl border border-[#E8D2B7] space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#231820]">
                      <Ruler className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Custom Fit Measurements (Inches)</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="text-[10px] text-[#8F8178] uppercase">Bust (in)</label>
                        <input
                          type="text"
                          placeholder="36"
                          value={bust}
                          onChange={(e) => setBust(e.target.value)}
                          className="w-full mt-1 px-3 py-1.5 bg-[#FFF7F9] rounded-lg border border-[#E8D2B7] text-xs text-[#231820] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#8F8178] uppercase">Waist (in)</label>
                        <input
                          type="text"
                          placeholder="28"
                          value={waist}
                          onChange={(e) => setWaist(e.target.value)}
                          className="w-full mt-1 px-3 py-1.5 bg-[#FFF7F9] rounded-lg border border-[#E8D2B7] text-xs text-[#231820] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#8F8178] uppercase">Hips (in)</label>
                        <input
                          type="text"
                          placeholder="38"
                          value={hips}
                          onChange={(e) => setHips(e.target.value)}
                          className="w-full mt-1 px-3 py-1.5 bg-[#FFF7F9] rounded-lg border border-[#E8D2B7] text-xs text-[#231820] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#8F8178] uppercase">Length (in)</label>
                        <input
                          type="text"
                          placeholder="52"
                          value={length}
                          onChange={(e) => setLength(e.target.value)}
                          className="w-full mt-1 px-3 py-1.5 bg-[#FFF7F9] rounded-lg border border-[#E8D2B7] text-xs text-[#231820] outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-semibold text-[#231820] tracking-wider">
                      Other Alterations & Tailoring Instructions
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g., Lower back neckline by 2 inches, lengthen sleeves with organza cuffs..."
                      value={otherAlterations}
                      onChange={(e) => setOtherAlterations(e.target.value)}
                      className="w-full mt-1.5 px-3 py-2 bg-white rounded-xl border border-[#E8D2B7] text-[#231820] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-semibold text-[#231820] tracking-wider">
                      Client Notes & Occasion Date
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Sangeet ceremony in late November. Need completed before Nov 15."
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      className="w-full mt-1.5 px-3 py-2 bg-white rounded-xl border border-[#E8D2B7] text-[#231820] outline-none"
                    />
                  </div>
                </div>
              ) : (
                /* Form Fields: Completely New Bespoke Garment */
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="text-[10px] uppercase font-semibold text-[#231820] tracking-wider">
                      Garment Concept / Desired Design *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Raw Silk Hand-Embroidered Anarkali with Net Dupatta"
                      value={requestedDesign}
                      onChange={(e) => setRequestedDesign(e.target.value)}
                      required
                      className="w-full mt-1.5 px-3 py-2 bg-white rounded-xl border border-[#E8D2B7] text-[#231820] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-semibold text-[#231820] tracking-wider flex items-center justify-between">
                      <span>Inspiration / Reference Image URL</span>
                      <span className="text-[#8F8178] font-normal lowercase">Curated moodboard photo</span>
                    </label>
                    <div className="flex items-center gap-2 mt-1.5">
                      <input
                        type="url"
                        value={referenceImage}
                        onChange={(e) => setReferenceImage(e.target.value)}
                        className="flex-1 px-3 py-2 bg-white rounded-xl border border-[#E8D2B7] text-[#231820] outline-none"
                      />
                      {referenceImage && (
                        <img
                          src={referenceImage}
                          alt="preview"
                          className="w-10 h-10 rounded-lg object-cover border border-[#E8D2B7]"
                        />
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-semibold text-[#231820] tracking-wider">
                        Preferred Fabric
                      </label>
                      <input
                        type="text"
                        value={bespokeFabric}
                        onChange={(e) => setBespokeFabric(e.target.value)}
                        className="w-full mt-1.5 px-3 py-2 bg-white rounded-xl border border-[#E8D2B7] text-[#231820] outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-semibold text-[#231820] tracking-wider">
                        Preferred Colour Palette
                      </label>
                      <input
                        type="text"
                        value={bespokeColour}
                        onChange={(e) => setBespokeColour(e.target.value)}
                        className="w-full mt-1.5 px-3 py-2 bg-white rounded-xl border border-[#E8D2B7] text-[#231820] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-semibold text-[#231820] tracking-wider">
                      Measurements & Silhouette Dimensions *
                    </label>
                    <input
                      type="text"
                      value={bespokeMeasurements}
                      onChange={(e) => setBespokeMeasurements(e.target.value)}
                      required
                      className="w-full mt-1.5 px-3 py-2 bg-white rounded-xl border border-[#E8D2B7] text-[#231820] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-semibold text-[#231820] tracking-wider">
                      Embroidery, Work & Design Specifics
                    </label>
                    <textarea
                      rows={3}
                      value={alterationDetails}
                      onChange={(e) => setAlterationDetails(e.target.value)}
                      className="w-full mt-1.5 px-3 py-2 bg-white rounded-xl border border-[#E8D2B7] text-[#231820] outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-semibold text-[#231820] tracking-wider">
                      Notes on Timeline or Occasion
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Needed for reception dinner, prefer delivery by mid-December."
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      className="w-full mt-1.5 px-3 py-2 bg-white rounded-xl border border-[#E8D2B7] text-[#231820] outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-[#3A0E1E] hover:bg-[#542333] disabled:bg-[#8F8178] text-white text-xs font-semibold tracking-widest uppercase transition-all shadow-md flex items-center justify-center gap-2 border border-[#D4AF37]/40"
                >
                  {isSubmitting ? (
                    <span>Submitting Inquiry to Atelier...</span>
                  ) : (
                    <>
                      <Scissors className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Submit Custom Inquiry for Quotation</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
