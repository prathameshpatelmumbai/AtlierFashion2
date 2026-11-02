"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { ListedProduct } from "@/types/studio";
import { 
  X, 
  ShoppingBag, 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  MapPin, 
  Lock,
  ArrowRight
} from "lucide-react";

interface CustomerBuyNowModalProps {
  product: ListedProduct | null;
  onClose: () => void;
  onSuccess: (orderId: string) => void;
}

export const CustomerBuyNowModal: React.FC<CustomerBuyNowModalProps> = ({
  product,
  onClose,
  onSuccess
}) => {
  const { customerProfile, customerBuyNowProduct, setCustomerSection, setSelectedProductId } = useStudio();

  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState(customerProfile.deliveryAddress.addressLine);
  const [city, setCity] = useState(customerProfile.deliveryAddress.city);
  const [state, setState] = useState(customerProfile.deliveryAddress.state);
  const [pin, setPin] = useState(customerProfile.deliveryAddress.postalCode);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrderId, setCompletedOrderId] = useState<string | null>(null);

  if (!product) return null;

  const maxQuantity = Math.min(product.availableStock || 1, 5);
  const totalAmount = product.price * quantity;

  const handleConfirmPurchase = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const orderId = customerBuyNowProduct(product.id, quantity, {
        address,
        city,
        state,
        pin
      });
      setIsProcessing(false);
      setCompletedOrderId(orderId);
      onSuccess(orderId);
    }, 900);
  };

  const handleGoToOrders = () => {
    onClose();
    setSelectedProductId(null);
    setCustomerSection("orders");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FFF7F9] w-full max-w-xl rounded-3xl border border-[#D4AF37]/50 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E8D2B7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#3A0E1E]" />
            <h3 className="font-serif text-lg text-[#231820]">
              {completedOrderId ? "Order Confirmed" : "Direct Garment Acquisition • Atelier Privée"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#8F8178] hover:text-[#231820] hover:bg-[#FFF7F9] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {completedOrderId ? (
            /* Success State */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-emerald-800">
                  Payment Confirmed & In Escrow
                </div>
                <h4 className="font-serif text-2xl text-[#231820] mt-1">
                  Order #{completedOrderId} Placed Successfully
                </h4>
                <p className="text-xs text-[#8F8178] max-w-md mx-auto mt-2">
                  The designer atelier has received your order request and will prepare the garment for insured courier dispatch.
                </p>
              </div>

              {/* Order Card Preview */}
              <div className="p-4 bg-white rounded-2xl border border-[#E8D2B7] max-w-md mx-auto text-left flex items-center gap-4">
                <img
                  src={product.images[0]}
                  alt=""
                  className="w-16 h-20 rounded-xl object-cover"
                />
                <div className="flex-1 text-xs">
                  <div className="font-medium text-[#231820]">{product.title}</div>
                  <div className="text-[#8F8178] mt-0.5">Quantity: {quantity} • Total: ₹{totalAmount.toLocaleString("en-IN")}</div>
                  <div className="text-[#C5A059] mt-1">Delivering to: {city}, {pin}</div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleGoToOrders}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#3A0E1E] hover:bg-[#542333] text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 border border-[#D4AF37]/40 shadow-sm"
                >
                  <span>Track in Orders & Logistics</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-[#FFF7F9] text-[#231820] border border-[#E8D2B7] text-xs font-medium uppercase tracking-wider"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <>
              {/* Product Summary */}
              <div className="p-4 bg-white rounded-2xl border border-[#E8D2B7] flex items-center gap-4">
                <img
                  src={product.images[0]}
                  alt=""
                  className="w-16 h-20 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-semibold">
                    {product.brandName || "Atelier Couturier"}
                  </span>
                  <h4 className="font-serif text-base text-[#231820] font-light">
                    {product.title}
                  </h4>
                  <div className="text-xs text-[#8F8178] mt-1">
                    Price per piece: <span className="text-[#231820] font-medium">₹{product.price.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Quantity selector */}
                <div className="text-right">
                  <label className="text-[10px] text-[#8F8178] uppercase font-medium">Qty</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="block mt-1 px-3 py-1.5 bg-[#FFF7F9] border border-[#E8D2B7] rounded-xl text-xs font-medium text-[#231820] outline-none"
                  >
                    {Array.from({ length: maxQuantity }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Delivery Address Review */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-[#231820] uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                    Delivery Destination
                  </span>
                  <span className="text-[11px] text-[#8F8178] lowercase font-normal">
                    Recipient: {customerProfile.customerName}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-[#8F8178] uppercase">Street Address / Residence</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-white rounded-xl border border-[#E8D2B7] text-[#231820] outline-none text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#8F8178] uppercase">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full mt-1 px-3 py-2 bg-white rounded-xl border border-[#E8D2B7] text-[#231820] outline-none text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-[#8F8178] uppercase">State</label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full mt-1 px-3 py-2 bg-white rounded-xl border border-[#E8D2B7] text-[#231820] outline-none text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[#8F8178] uppercase">PIN Code</label>
                      <input
                        type="text"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        className="w-full mt-1 px-3 py-2 bg-white rounded-xl border border-[#E8D2B7] text-[#231820] outline-none text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Calculation breakdown */}
              <div className="p-4 bg-white rounded-2xl border border-[#E8D2B7] space-y-2 text-xs">
                <div className="flex justify-between text-[#8F8178]">
                  <span>Garment Subtotal ({quantity} {quantity === 1 ? "item" : "items"})</span>
                  <span className="text-[#231820]">₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-[#8F8178]">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-emerald-700" />
                    Insured Luxury Express Air Courier
                  </span>
                  <span className="text-emerald-700 font-medium uppercase text-[10px]">Complimentary</span>
                </div>
                <div className="flex justify-between text-[#8F8178]">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Atelier Escrow Protection
                  </span>
                  <span className="text-emerald-700 font-medium uppercase text-[10px]">Included</span>
                </div>
                <div className="pt-2 border-t border-[#E8D2B7] flex justify-between font-serif text-lg text-[#3A0E1E]">
                  <span>Total Payable</span>
                  <span>₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Escrow Guarantee Note */}
              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/70 text-[11px] text-amber-900 flex items-start gap-2">
                <Lock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>
                  <strong>Escrow Security Guarantee:</strong> Your payment remains securely locked in Atelier Escrow. 
                  Funds are disbursed to the designer atelier only after delivery and fitting confirmation.
                </span>
              </div>

              {/* Confirmation CTA */}
              <button
                onClick={handleConfirmPurchase}
                disabled={isProcessing}
                className="w-full py-4 rounded-full bg-[#3A0E1E] hover:bg-[#542333] disabled:bg-[#8F8178] text-white text-xs font-semibold tracking-widest uppercase transition-all shadow-md flex items-center justify-center gap-2 border border-[#D4AF37]/40"
              >
                {isProcessing ? (
                  <span>Securing Payment & Reserving Piece...</span>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Confirm & Pay ₹{totalAmount.toLocaleString("en-IN")}</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
