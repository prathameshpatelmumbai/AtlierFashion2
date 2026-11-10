"use client";

import React, { useState } from "react";
import { useStudio } from "@/context/StudioContext";
import { ListedProduct } from "@/types/studio";
import { 
  ArrowLeft, 
  ShoppingBag, 
  Scissors, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles, 
  Check, 
  Ruler, 
  Heart,
  Star,
  Info,
  ChevronRight,
  CheckCircle2,
  Lock,
  Layers,
  MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface CustomerProductDetailProps {
  productId: string;
  onOpenBuyNow: (product: ListedProduct) => void;
  onOpenCustomRequest: (product: ListedProduct) => void;
  onBack: () => void;
}

export const CustomerProductDetail: React.FC<CustomerProductDetailProps> = ({
  productId,
  onOpenBuyNow,
  onOpenCustomRequest,
  onBack
}) => {
  const { listedProducts, addToCart, showToast, setSelectedProductId } = useStudio();

  // Find product or fallback to Milanese Double-Breasted Peacoat (Photo 3)
  const defaultProduct: ListedProduct = {
    id: "prod-1",
    title: "Double-Breasted Cashmere Peacoat",
    designerName: "Valentin Laurent",
    brandName: "Maison Laurent",
    designerId: "des-1",
    category: "Couture & Gowns",
    subcategory: "Outerwear & Peacoats",
    tags: ["Wool", "Cashmere", "Milanese"],
    price: 62000,
    originalPrice: 84000,
    currency: "INR",
    availableStock: 3,
    initialStock: 20,
    isOneOfOne: false,
    description: "Hand-loomed from 850gsm pure Mongolian double-faced cashmere for superior thermal insulation without excessive weight. Architectural silhouette achieved by using hand-padded canvases from Milanese provenance.",
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550246140-5119ae4790b8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["46 EU", "48 EU", "50 EU", "52 EU", "54 EU"],
    measurements: {
      length: "115 cm",
      shoulder: "48 cm"
    },
    fitType: "Tailored Regular",
    stretchability: "No Stretch (Structured)",
    materials: "100% Mongolian Cashmere",
    lining: "Bemberg Cupro",
    careInstructions: "Specialist Dry Clean Only",
    shippingMode: "Free Shipping",
    packageDimensions: "60x40x15 cm",
    packageWeight: "2.4 kg",
    status: "ACTIVE",
    viewsCount: 1420,
    orderCount: 17,
    createdAt: "2026-10-15",
    isBoosted: true
  };

  const product = listedProducts.find((p) => p.id === productId) || defaultProduct;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("MIDNIGHT CHARCOAL");
  const [selectedSize, setSelectedSize] = useState("48 EU");
  const [exchangeReturnEnabled, setExchangeReturnEnabled] = useState(true);
  const [pincode, setPincode] = useState("400001");
  const [pincodeVerified, setPincodeVerified] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const colors = [
    { name: "MIDNIGHT CHARCOAL", hex: "#2C2C2E" },
    { name: "DEEP NAVY", hex: "#1B2430" },
    { name: "CAMEL", hex: "#C19A6B" },
    { name: "ONYX BLACK", hex: "#111111" }
  ];

  const handleCheckPincode = () => {
    if (pincode.trim().length >= 6) {
      setPincodeVerified(true);
      showToast(`Verified: Dedicated White-Glove Courier available for Pincode ${pincode}`);
    } else {
      showToast("Please enter a valid 6-digit postal code");
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[activeImageIndex] || product.images[0],
      size: selectedSize,
      color: selectedColor
    });
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#3A0E1E", "#F6DFC4"]
    });
  };

  return (
    <div className="space-y-12 pb-24 max-w-[1520px] mx-auto">
      {/* Breadcrumbs (Photo 3) */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#8F8178] border-b border-[#E8D2B7]/60 pb-3">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="hover:text-[#3A0E1E] transition-colors flex items-center gap-1 font-serif">
            <ArrowLeft className="w-3.5 h-3.5 text-[#C5A059]" />
            HOME
          </button>
          <span>/</span>
          <span>MEN</span>
          <span>/</span>
          <span>CLOTHING</span>
          <span>/</span>
          <span>OUTERWEAR & TAILORING</span>
          <span>/</span>
          <span className="text-[#3A0E1E] font-semibold">{product.title.toUpperCase()}</span>
        </div>

        <div className="text-[11px] text-[#A49488]">
          MILANESE ATELIER • VAULT REF: 02MF-4821
        </div>
      </div>

      {/* Main PDP Grid (Photo 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Vertical Thumbnails + Main Zoomable Image (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Vertical Thumbnails */}
          <div className="flex sm:flex-col gap-3 shrink-0 overflow-x-auto sm:overflow-visible">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx
                    ? "border-[#3A0E1E] shadow-md scale-102"
                    : "border-[#E8D2B7] opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover object-top" />
              </button>
            ))}
          </div>

          {/* Main Large Image */}
          <div className="relative flex-1 aspect-4/5 rounded-3xl overflow-hidden bg-[#FAF7F2] border border-[#E8D2B7] shadow-xl group">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700 ease-out"
            />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#3A0E1E]/95 text-[#F6DFC4] border border-[#D4AF37]/50 shadow-md backdrop-blur-xs">
                LIMITED EDITION (03/20) • ARCHIVAL RESERVE
              </span>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => {
                setIsWishlisted(!isWishlisted);
                showToast(isWishlisted ? "Removed from private vault" : "Added to your private salon vault");
              }}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#3A0E1E] backdrop-blur-xs shadow-md transition-all hover:scale-110"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-600 text-rose-600" : ""}`} />
            </button>

            {/* Micro zoom hint */}
            <div className="absolute bottom-4 right-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-black/70 text-white/90 backdrop-blur-xs">
                TAP TO INSPECT TEXTURE
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Buying Dossier & Configuration (5 Cols) (Photo 3) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header & Rating */}
          <div className="space-y-2 border-b border-[#E8D2B7] pb-5">
            <div className="flex items-center gap-2 text-xs text-[#8F8178]">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                ))}
              </div>
              <span className="font-semibold text-[#231820]">4.91</span>
              <span>(42 Verified Salon Patrons)</span>
              <span>•</span>
              <span className="text-[#3A0E1E] font-medium underline cursor-pointer">READ FOLIO (12)</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl text-[#231820] font-semibold leading-tight">
              {product.title}
            </h1>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="font-serif text-3xl font-bold text-[#3A0E1E]">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-[#A49488] line-through">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#FFF0F4] text-[#852C46] border border-[#E8D2B7] text-[11px] font-bold">
                    26% OFF
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Color Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#231820]">
                COLOUR: <strong className="text-[#3A0E1E]">{selectedColor}</strong>
              </span>
              <span className="text-[11px] text-[#8F8178]">4 Shades Available</span>
            </div>

            <div className="flex items-center gap-3">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform ${
                    selectedColor === c.name
                      ? "border-[#3A0E1E] scale-115 ring-2 ring-[#D4AF37]"
                      : "border-gray-300 hover:scale-105"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#231820]">
                SIZE (IT/EU): <strong className="text-[#3A0E1E]">{selectedSize}</strong>
              </span>
              <button className="text-[11px] text-[#3A0E1E] underline flex items-center gap-1 hover:text-[#542333]">
                <Ruler className="w-3.5 h-3.5" />
                <span>Atelier Sizing Guide</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {["46 EU", "48 EU", "50 EU", "52 EU", "54 EU"].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium border transition-all ${
                    selectedSize === sz
                      ? "bg-[#3A0E1E] text-white border-[#3A0E1E] shadow-sm"
                      : "bg-white text-[#231820] border-[#E8D2B7] hover:border-[#D4AF37]"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Enable Free Exchange Checkbox (Photo 3) */}
          <div className="p-3 rounded-xl bg-[#FFF9F6] border border-[#E8D2B7] flex items-center gap-3">
            <input
              type="checkbox"
              id="exchange"
              checked={exchangeReturnEnabled}
              onChange={(e) => setExchangeReturnEnabled(e.target.checked)}
              className="rounded border-[#E8D2B7] text-[#3A0E1E] focus:ring-[#D4AF37] w-4 h-4"
            />
            <label htmlFor="exchange" className="text-xs text-[#6B5A52] cursor-pointer">
              <strong className="text-[#231820]">ENABLE EXCHANGE & RETURN (FREE)</strong>
              <p className="text-[10px] text-[#8F8178]">Complimentary 14-day home fitting trial with courier pickup</p>
            </label>
          </div>

          {/* Dual CTAs (Photo 3) */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOpenBuyNow(product)}
              className="py-3.5 rounded-full bg-[#FFF0F4] hover:bg-[#FFE4EC] text-[#542333] border border-[#E8D2B7] font-serif font-bold text-xs uppercase tracking-wider shadow-sm transition-all text-center"
            >
              Purchase Now
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="py-3.5 rounded-full bg-gradient-to-r from-[#2B0B17] to-[#3A0E1E] hover:from-[#3A0E1E] hover:to-[#542333] text-[#F6DFC4] border border-[#D4AF37]/50 font-serif font-bold text-xs uppercase tracking-wider shadow-lg transition-all text-center flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <span>Add to Cart</span>
            </motion.button>
          </div>

          <button
            onClick={() => onOpenCustomRequest(product)}
            className="w-full py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F6DFC4]/50 border border-[#E8D2B7] text-[#3A0E1E] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <Scissors className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Commission Custom Sizing or Fabric Variation</span>
          </button>

          {/* Garment Dossier & Profile (Photo 3) */}
          <div className="p-4 rounded-2xl bg-white border border-[#E8D2B7] space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#231820] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Garment Dossier & Profile</span>
            </h4>
            <ul className="space-y-2 text-xs text-[#6B5A52] leading-relaxed list-disc pl-4 font-light">
              <li>Hand-loomed from 850gsm pure Mongolian double-faced cashmere for superior thermal insulation without excessive weight.</li>
              <li>Architectural silhouette achieved by using hand-padded open-stored canvases from Milanese provenance.</li>
              <li>Finished with genuine polished horn closures and reinforced shanks sewn with waxed silk thread.</li>
              <li>Full-canvas internal chest piece handcrafted from natural horsehair and linen canvas that molds organically to the wearer.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Features & Fabric Breakdown (4 Visual Cards from Photo 3) */}
      <section className="space-y-6 pt-6 border-t border-[#E8D2B7]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] font-mono text-[#852C46]">
              ATELIER CRAFTSMANSHIP
            </div>
            <h2 className="font-serif text-2xl text-[#231820]">
              Features & Fabric Breakdown
            </h2>
          </div>
          <span className="text-xs font-mono text-[#8F8178]">
            PRODUCT ID: 02MF-VAL-850-CASHMERE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Structural Collar Construction",
              desc: "Reinforced outer layer inspired by classical outerwear with distinctive contrast under-collar lining.",
              image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600&auto=format&fit=crop"
            },
            {
              title: "Tactile Prowess",
              desc: "The outer fabric has a rich, velvety and responsive natural texture with superior loft and thermal depth.",
              image: "https://images.unsplash.com/photo-1550246140-5119ae4790b8?q=80&w=600&auto=format&fit=crop"
            },
            {
              title: "Bespoke Pocketing",
              desc: "Twin-way besom patch pockets can be unbuttoned smoothly from the side or top for versatile elegance.",
              image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop"
            },
            {
              title: "Weather Shielding",
              desc: "Water-repellent finish protects against light rain and moisture while retaining breathable softness.",
              image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=600&auto=format&fit=crop"
            }
          ].map((feat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#E8D2B7] p-4 space-y-3 hover:shadow-lg hover:border-[#D4AF37] transition-all group"
            >
              <div className="aspect-4/3 rounded-xl overflow-hidden bg-[#FAF7F2]">
                <img
                  src={feat.image}
                  alt={feat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h4 className="font-serif text-sm font-semibold text-[#231820]">
                {feat.title}
              </h4>
              <p className="text-xs text-[#8F8178] leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Delivery & White-Glove Logistics (Photo 3) */}
      <section className="bg-[#FAF7F2] rounded-3xl border border-[#E8D2B7] p-6 lg:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3A0E1E] text-[#F6DFC4] flex items-center justify-center border border-[#D4AF37]/50">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-[#231820]">Delivery & White-Glove Logistics</h3>
              <p className="text-xs text-[#8F8178]">
                All commissions are dispatched through our dedicated temperature-controlled courier fleet.
              </p>
            </div>
          </div>

          {/* Pincode Checker */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Enter Pincode e.g. 400001"
              className="px-3.5 py-2 rounded-xl bg-white border border-[#E8D2B7] text-xs text-[#231820] font-mono w-40 focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              onClick={handleCheckPincode}
              className="px-4 py-2 rounded-xl bg-[#3A0E1E] hover:bg-[#542333] text-[#F6DFC4] text-xs font-semibold uppercase tracking-wider font-serif transition-colors"
            >
              Check
            </button>
          </div>
        </div>

        {pincodeVerified && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#E8D2B7]/60 text-xs text-[#6B5A52]">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>2-4 Business Days</strong> estimate for metropolitan sectors</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Arrives in weighted cedarwood hanger & bespoke zip garment bag</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>White-glove shoe-removal concierge available for initial inspection</span>
            </div>
          </div>
        )}
      </section>

      {/* Explore Designer's Work (Photo 3) */}
      <section className="space-y-6 pt-6 border-t border-[#E8D2B7]">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] font-mono text-[#852C46]">
              COUTURE CAPSULE
            </div>
            <h2 className="font-serif text-2xl text-[#231820]">
              Explore Designer&apos;s Work
            </h2>
          </div>
          <button
            onClick={onBack}
            className="text-xs font-serif text-[#3A0E1E] hover:underline"
          >
            VIEW ATELIER PROFILE →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              title: "Pleated Wool Trousers",
              category: "TROUSERS • MADE TO ORDER",
              desc: "Tailored formally body cut in pure wool worsted twill.",
              price: 34000,
              image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=600&auto=format&fit=crop"
            },
            {
              title: "Cashmere Turtleneck Knit",
              category: "KNITWEAR • ORGANIC COLLECTION",
              desc: "Ultra-fine 18-gauge combed Australian merino and soft silk yarn.",
              price: 28500,
              image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop"
            },
            {
              title: "Italian Calfskin Chelsea Boots",
              category: "FOOTWEAR • HANDCRAFTED",
              desc: "Elaborated with vegetable-tanned Tuscan cowhide soles.",
              price: 42000,
              image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop"
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#E8D2B7] overflow-hidden p-4 space-y-3 hover:shadow-xl hover:border-[#D4AF37] transition-all group"
            >
              <div className="aspect-4/3 rounded-xl overflow-hidden bg-[#FAF7F2]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-[10px] font-mono text-[#852C46]">{item.category}</div>
              <h4 className="font-serif text-sm font-semibold text-[#231820]">{item.title}</h4>
              <p className="text-xs text-[#8F8178] line-clamp-2">{item.desc}</p>
              <div className="flex items-center justify-between pt-2 border-t border-[#E8D2B7]/60">
                <span className="font-serif font-bold text-[#3A0E1E]">
                  ₹{item.price.toLocaleString("en-IN")}
                </span>
                <button
                  onClick={() => addToCart({ id: `rel-${idx}`, title: item.title, price: item.price, image: item.image })}
                  className="text-xs font-serif font-semibold text-[#3A0E1E] hover:underline"
                >
                  ADD TO BAG →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
