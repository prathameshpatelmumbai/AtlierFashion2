"use client";

import React from "react";
import { useStudio } from "@/context/StudioContext";
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export const CustomerCartDrawer: React.FC = () => {
  const { cartOpen, setCartOpen, cartItems, removeFromCart, addToCart, showToast } = useStudio();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#3A0E1E", "#F6DFC4"]
    });
    showToast("Acquisition dossier prepared. Redirecting to Atelier Escrow Gateway...");
    setTimeout(() => {
      setCartOpen(false);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#E8D2B7]"
            >
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-[#2B0B17] to-[#3A0E1E] text-white flex items-center justify-between border-b border-[#D4AF37]/30">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#F6DFC4]">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg tracking-wide">Atelier Private Bag</h2>
                    <p className="text-[11px] text-[#E8D2B7]/80">
                      {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Archival Pieces Reserved
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-20">
                    <ShoppingBag className="w-12 h-12 text-[#E8D2B7] mx-auto mb-3" />
                    <p className="font-serif text-lg text-[#231820]">Your Private Bag is Empty</p>
                    <p className="text-xs text-[#8F8178] mt-1">Discover archival couture creations to commission or acquire.</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      key={item.id}
                      className="flex gap-4 p-3 rounded-2xl bg-[#FFF9F6] border border-[#E8D2B7]/60 relative group hover:border-[#D4AF37] transition-all"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-24 object-cover object-top rounded-xl border border-[#E8D2B7]"
                      />
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-serif text-sm text-[#231820] leading-snug line-clamp-2">
                              {item.title}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[#8F8178] hover:text-rose-600 transition-colors p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-[#8F8178]">
                            <span className="px-2 py-0.5 rounded-full bg-white border border-[#E8D2B7]">
                              {item.size}
                            </span>
                            <span>•</span>
                            <span className="truncate">{item.color}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E8D2B7]/40">
                          <span className="font-serif font-bold text-sm text-[#3A0E1E]">
                            ₹{item.price.toLocaleString("en-IN")}
                          </span>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                if (item.quantity > 1) {
                                  addToCart({ ...item, quantity: -1 });
                                } else {
                                  removeFromCart(item.id);
                                }
                              }}
                              className="w-6 h-6 rounded-md bg-white border border-[#E8D2B7] text-[#231820] text-xs font-bold hover:bg-[#F6DFC4] transition-colors"
                            >
                              -
                            </button>
                            <span className="text-xs font-semibold text-[#231820] w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => addToCart({ ...item, quantity: 1 })}
                              className="w-6 h-6 rounded-md bg-white border border-[#E8D2B7] text-[#231820] text-xs font-bold hover:bg-[#F6DFC4] transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}

                {/* White Glove Banner */}
                {cartItems.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#FFF5EC] to-[#FFF0F4] border border-[#E8D2B7] flex items-center gap-3">
                    <Truck className="w-5 h-5 text-[#C5A059] shrink-0" />
                    <p className="text-[11px] text-[#6B5A52] leading-relaxed">
                      <strong className="text-[#3A0E1E]">White-Glove Courier Included:</strong> Insured delivery in cedarwood archival garment boxes.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="p-6 bg-[#FAF7F2] border-t border-[#E8D2B7] space-y-4">
                  <div className="space-y-1.5 text-xs text-[#6B5A52]">
                    <div className="flex justify-between">
                      <span>Garment Subtotal</span>
                      <span className="font-semibold text-[#231820]">
                        ₹{subtotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between text-emerald-800">
                      <span>Curatorial White-Glove Shipping</span>
                      <span className="font-semibold">Complimentary</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-[#8F8178]">
                      <span>Authentication & Provenance Cert</span>
                      <span>Included</span>
                    </div>
                    <div className="flex justify-between text-base font-serif font-bold text-[#3A0E1E] pt-2 border-t border-[#E8D2B7]">
                      <span>Total Atelier Valuation</span>
                      <span>₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#2B0B17] via-[#3A0E1E] to-[#542333] hover:from-[#3A0E1E] hover:to-[#2B0B17] text-[#F6DFC4] border border-[#D4AF37]/50 font-serif font-medium text-sm tracking-wider uppercase shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Secure Acquisition</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

