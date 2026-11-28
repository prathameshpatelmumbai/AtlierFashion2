"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { getCatalogProductById, CATALOG_PRODUCTS, CatalogProduct } from "@/data/catalogProducts";
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
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Lock,
  Layers,
  MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { AddToBagButton } from "./AddToBagButton";

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
      "/images/products/prod-1/angle-1.jpg",
      "/images/products/prod-1/angle-2.jpg",
      "/images/products/prod-1/angle-3.jpg",
      "/images/products/prod-1/angle-4.jpg"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
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

  const catalogProduct = getCatalogProductById(productId);
  const studioProduct = listedProducts.find((p) => p.id === productId);

  // Active product is either the catalog product or the studio product or default fallback
  const product: ListedProduct | CatalogProduct =
    catalogProduct ||
    studioProduct ||
    defaultProduct;

  const designerDisplayName =
    (product as any).designerName ||
    (product as any).designer ||
    "Atelier Couturier";

  const designerBrandName =
    (product as any).brandName ||
    `${designerDisplayName.toUpperCase()} ATELIER`;

  const monogram = designerDisplayName
    .split(" ")
    .map((n: string) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const dossierPoints: string[] =
    (product as any).dossier || [
      `Handcrafted in strictly limited atelier runs under the artistic direction of ${designerDisplayName}.`,
      `Constructed from premium ${product.materials || "fine textiles"} sourced from heritage mills renowned for extraordinary hand-feel and longevity.`,
      `Features architectural structural reinforcement allowing the garment to adapt naturally to the wearer.`,
      `Finished with hand-set closures, pick-stitched edges, and verified archival atelier serial numbering.`
    ];

  const relatedDesignerPieces = CATALOG_PRODUCTS.filter(
    (p) => p.id !== product.id
  )
    .sort((a, b) => {
      // Prioritize same designer/brand, then same gender/department
      const aScore =
        (a.designer === (product as any).designer ? 4 : 0) +
        (a.gender === (product as any).gender ? 2 : 0) +
        (a.collection === (product as any).collection ? 1 : 0);
      const bScore =
        (b.designer === (product as any).designer ? 4 : 0) +
        (b.gender === (product as any).gender ? 2 : 0) +
        (b.collection === (product as any).collection ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, 10);

  // Intelligent Visual Similarity & Aesthetic Harmony Engine
  // Trained to match:
  // 1. Strict Gender Parity (men -> men, women -> women, kids -> kids)
  // 2. Silhouette & Garment Cut Alignment (Peacoat / Overcoat / Trench / Gown / Lehenga)
  // 3. Fabric Family & Texture Resonance (Cashmere / Wool / Alpaca / Gabardine / Silk)
  // 4. Color Palette & Tone Family Harmony (Charcoal / Midnight / Camel / Onyx)
  // 5. Aesthetic Formality Tier (Haute Couture, Archival, Bespoke Tailoring)
  const similarProducts = React.useMemo(() => {
    const currentGender = (product as any).gender || "men";
    const currentTitle = (product.title || "").toLowerCase();
    const currentFabric = ((product as any).fabric || product.materials || "").toLowerCase();
    const currentCat = (product.category || "").toLowerCase();

    // Curated high-aesthetic companion pieces for luxury outerwear hero garments
    if (
      product.id === "prod-1" ||
      currentTitle.includes("peacoat") ||
      (currentGender === "men" && (currentCat.includes("coat") || currentTitle.includes("coat")))
    ) {
      const targetIds = ["prod-10", "prod-9", "prod-12", "prod-2"].filter((id) => id !== product.id);
      const curated = targetIds
        .map((id) => CATALOG_PRODUCTS.find((p) => p.id === id))
        .filter(Boolean) as typeof CATALOG_PRODUCTS;
      if (curated.length >= 4) return curated.slice(0, 4);
    }

    // Score all catalog items using multi-dimensional visual and textile similarity
    const scored = CATALOG_PRODUCTS
      .filter((p) => p.id !== product.id)
      .map((item) => {
        let score = 0;
        const itemGender = (item.gender || "").toLowerCase();
        const itemTitle = (item.title || "").toLowerCase();
        const itemFabric = (item.fabric || item.materials || "").toLowerCase();
        const itemCat = (item.category || "").toLowerCase();

        // 1. Strict Gender Parity (+50)
        if (itemGender === currentGender) {
          score += 50;
        } else {
          score -= 100;
        }

        // 2. Silhouette & Garment Cut Alignment (+40)
        const isOuterwear =
          currentTitle.includes("coat") ||
          currentTitle.includes("peacoat") ||
          currentCat.includes("coat") ||
          currentCat.includes("jacket");
        const itemIsOuterwear =
          itemTitle.includes("coat") ||
          itemTitle.includes("peacoat") ||
          itemCat.includes("coat") ||
          itemCat.includes("jacket");
        if (isOuterwear && itemIsOuterwear) score += 40;

        const isFormalSuit =
          currentTitle.includes("suit") ||
          currentTitle.includes("sherwani") ||
          currentTitle.includes("tuxedo");
        const itemIsFormalSuit =
          itemTitle.includes("suit") ||
          itemTitle.includes("sherwani") ||
          itemTitle.includes("tuxedo");
        if (isFormalSuit && itemIsFormalSuit) score += 40;

        const isGown =
          currentTitle.includes("gown") ||
          currentTitle.includes("lehenga") ||
          currentTitle.includes("sari") ||
          currentTitle.includes("dress");
        const itemIsGown =
          itemTitle.includes("gown") ||
          itemTitle.includes("lehenga") ||
          itemTitle.includes("sari") ||
          itemTitle.includes("dress");
        if (isGown && itemIsGown) score += 40;

        // 3. Fabric & Material Resonance (+30)
        if (
          (currentFabric.includes("cashmere") ||
            currentFabric.includes("wool") ||
            currentFabric.includes("alpaca")) &&
          (itemFabric.includes("cashmere") ||
            itemFabric.includes("wool") ||
            itemFabric.includes("alpaca") ||
            itemFabric.includes("gabardine"))
        ) {
          score += 30;
        } else if (
          (currentFabric.includes("silk") || currentFabric.includes("organza")) &&
          (itemFabric.includes("silk") ||
            itemFabric.includes("organza") ||
            itemFabric.includes("brocade"))
        ) {
          score += 30;
        }

        // 4. Category Match (+20)
        if (itemCat === currentCat) score += 20;

        // 5. Aesthetic Collection Tier (+10)
        if (item.collection === (product as any).collection) score += 10;

        return { item, score };
      })
      .sort((a, b) => b.score - a.score);

    return scored.slice(0, 4).map((s) => s.item);
  }, [product]);

  // Explore Designer's Work Carousel State & Swiping Handlers
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mouse drag-to-swipe physics
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  const updateScrollState = useCallback(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 12);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 12);
      const maxScroll = scrollWidth - clientWidth;
      setScrollProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
    }
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      updateScrollState();
      el.addEventListener("scroll", updateScrollState, { passive: true });
      window.addEventListener("resize", updateScrollState);
      return () => {
        el.removeEventListener("scroll", updateScrollState);
        window.removeEventListener("resize", updateScrollState);
      };
    }
  }, [updateScrollState, relatedDesignerPieces]);

  const handleSwipe = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const card = container.querySelector("[data-carousel-card]") as HTMLElement | null;
      const step = card ? card.offsetWidth + 24 : 340;
      container.scrollBy({
        left: direction === "left" ? -step : step,
        behavior: "smooth"
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - carouselRef.current.offsetLeft;
    scrollLeftRef.current = carouselRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.3;
    if (Math.abs(walk) > 5) {
      hasMovedRef.current = true;
    }
    carouselRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("MIDNIGHT CHARCOAL");
  const availableSizes = React.useMemo(() => {
    // If kids item, keep age sizes; otherwise use standard XS, S, M, L, XL, XXL
    if ((product as any).gender === "kids") {
      return product.sizes || ["Age 4-5", "Age 6-7", "Age 8-9"];
    }
    return ["XS", "S", "M", "L", "XL", "XXL"];
  }, [product]);

  const [selectedSize, setSelectedSize] = useState<string>("M");

  // Reset to first image and size whenever product changes
  useEffect(() => {
    setActiveImageIndex(0);
    if ((product as any).gender === "kids") {
      setSelectedSize(product.sizes?.[0] || "Age 4-5");
    } else {
      setSelectedSize("M");
    }
  }, [productId, product]);

  // Waive Exchange & Return Option (Instant 4% Discount, Minimum ₹120)
  // When ticked: Waives reverse courier / return trial, passing savings directly to the client
  // When unticked: Restores standard price with complimentary 3-day salon exchange & trial
  const [waiveExchange, setWaiveExchange] = useState(false);
  const discountPercent = 4;
  const exchangeDiscountAmount = Math.max(120, Math.round((product.price * discountPercent) / 100));
  const effectivePrice = waiveExchange ? product.price - exchangeDiscountAmount : product.price;

  const [pincode, setPincode] = useState("400001");
  const [pincodeVerified, setPincodeVerified] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Folio section reference & scroll handler
  const folioSectionRef = useRef<HTMLElement>(null);
  const [highlightFolio, setHighlightFolio] = useState(false);

  const scrollToFolio = () => {
    if (folioSectionRef.current) {
      folioSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      const el = document.getElementById("product-specifications-folio");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setHighlightFolio(true);
    setTimeout(() => setHighlightFolio(false), 2400);
  };

  // Specifications Accordion State (Image 2 - Details open by default)
  const [accordionState, setAccordionState] = useState<Record<string, boolean>>({
    features: false,
    details: true,
    materialCare: false,
    deliveryReturn: false,
    production: false,
    customerService: false
  });

  const toggleAccordion = (section: string) => {
    setAccordionState((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  interface ColorVariant {
    name: string;
    hex: string;
    pantone: string;
    label: string;
    description: string;
    filterStyle: React.CSSProperties;
    overlayStyle: React.CSSProperties;
  }

  const colors: ColorVariant[] = [
    {
      name: "MIDNIGHT CHARCOAL",
      hex: "#2C2C2E",
      pantone: "19-3908 TCX",
      label: "Natural Archival Charcoal",
      description: "Dyed in small batches with natural graphite minerals for balanced matte depth.",
      filterStyle: { filter: "none" },
      overlayStyle: { display: "none" }
    },
    {
      name: "DEEP NAVY",
      hex: "#1B2430",
      pantone: "19-3832 TCX",
      label: "Prussian Royal Navy",
      description: "Steeped in mineral indigo vats for rich nautical saturation under evening light.",
      filterStyle: { filter: "sepia(0.4) hue-rotate(185deg) saturate(2.4) brightness(0.92) contrast(1.12)" },
      overlayStyle: {
        background: "radial-gradient(circle, rgba(16, 36, 70, 0.45) 0%, rgba(8, 20, 48, 0.65) 100%)",
        mixBlendMode: "color" as const
      }
    },
    {
      name: "CAMEL",
      hex: "#C19A6B",
      pantone: "16-1139 TCX",
      label: "Tuscan Warm Camel",
      description: "Spun from unbleached golden Mongolian cashmere with warm caramel reflections.",
      filterStyle: { filter: "sepia(0.8) hue-rotate(-24deg) saturate(2.3) brightness(1.22) contrast(1.15)" },
      overlayStyle: {
        background: "radial-gradient(circle, rgba(205, 160, 110, 0.52) 0%, rgba(180, 135, 85, 0.68) 100%)",
        mixBlendMode: "color" as const
      }
    },
    {
      name: "ONYX BLACK",
      hex: "#111111",
      pantone: "19-4004 TCX",
      label: "Obsidian Pitch Black",
      description: "Immersed in double-saturated pitch obsidian pigments for architectural contrast.",
      filterStyle: { filter: "grayscale(1) contrast(1.4) brightness(0.70)" },
      overlayStyle: {
        background: "rgba(0, 0, 0, 0.45)",
        mixBlendMode: "multiply" as const
      }
    }
  ];

  const currentColorObj = colors.find((c) => c.name === selectedColor) || colors[0];

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
      price: effectivePrice,
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
    if (waiveExchange) {
      showToast(
        `Added to Atelier Bag with No Exchange & No Refund: ₹${effectivePrice.toLocaleString("en-IN")} (Saved ₹${exchangeDiscountAmount.toLocaleString("en-IN")})`
      );
    } else {
      showToast(`Added to Atelier Bag: ${product.title} (${currentColorObj.label} - PANTONE ${currentColorObj.pantone})`);
    }
  };

  return (
    <div className="space-y-12 pb-24 max-w-[1520px] mx-auto">
      {/* Breadcrumbs (Photo 3) */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#8F8178] border-b border-[#E8D2B7]/60 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="hover:text-[#3A0E1E] transition-colors flex items-center gap-1.5 font-serif font-medium text-[#542333] cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#C5A059] group-hover:-translate-x-1 transition-transform" />
            <span>RETURN TO ARCHIVE CATALOG</span>
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
          {/* Vertical Thumbnails with dynamic color grading */}
          <div className="flex sm:flex-col gap-3 shrink-0 overflow-x-auto sm:overflow-visible">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImageIndex === idx
                    ? "border-[#3A0E1E] shadow-md scale-102 ring-2 ring-[#D4AF37]/70"
                    : "border-[#E8D2B7] opacity-75 hover:opacity-100"
                }`}
                title={`Inspect Angle ${idx + 1}`}
              >
                <img
                  src={img}
                  alt={`Thumbnail Angle ${idx + 1}`}
                  className="w-full h-full object-cover object-top transition-all duration-500 ease-out"
                  style={currentColorObj.filterStyle}
                />
                <div
                  className="absolute inset-0 pointer-events-none transition-all duration-500"
                  style={currentColorObj.overlayStyle}
                />
              </button>
            ))}
          </div>

          {/* Main Large Image with dynamic color grading & overlay */}
          <div className="relative flex-1 aspect-4/5 rounded-3xl overflow-hidden bg-[#FAF7F2] border border-[#E8D2B7] shadow-xl group">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={`${product.title} - ${currentColorObj.name}`}
              className="w-full h-full object-cover object-top group-hover:scale-108 transition-all duration-700 ease-out"
              style={currentColorObj.filterStyle}
            />

            {/* Dynamic Colorway Shader Overlay */}
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-500"
              style={currentColorObj.overlayStyle}
            />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#3A0E1E]/95 text-[#F6DFC4] border border-[#D4AF37]/50 shadow-md backdrop-blur-xs">
                LIMITED EDITION (03/20) • ARCHIVAL RESERVE
              </span>
            </div>

            {/* Live Color Swatch Indicator on Image */}
            <div className="absolute top-4 right-16 z-10 hidden sm:block">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/80 text-[#F6DFC4] border border-[#D4AF37]/50 backdrop-blur-md flex items-center gap-2 shadow-lg">
                <span
                  className="w-2.5 h-2.5 rounded-full border border-white/60 shrink-0"
                  style={{ backgroundColor: currentColorObj.hex }}
                />
                <span>{currentColorObj.name} • PANTONE {currentColorObj.pantone}</span>
              </span>
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => {
                setIsWishlisted(!isWishlisted);
                showToast(isWishlisted ? "Removed from private vault" : "Added to your private salon vault");
              }}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#3A0E1E] backdrop-blur-xs shadow-md transition-all hover:scale-110 cursor-pointer"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? "fill-rose-600 text-rose-600" : ""}`} />
            </button>

            {/* Micro zoom hint */}
            <div className="absolute bottom-4 right-4 z-10">
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
              <span>(42 Verified Salon Customers)</span>
              <span>•</span>
              <button
                type="button"
                onClick={scrollToFolio}
                className="text-[#3A0E1E] hover:text-[#C5A059] font-medium underline underline-offset-2 cursor-pointer transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A059] rounded-xs"
                title="View Archival Product Folio & Technical Specifications"
              >
                READ FOLIO (12)
              </button>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl text-[#231820] font-semibold leading-tight">
              {product.title}
            </h1>

            {/* Price Row (Dynamically updates when 4% No-Exchange Waiver is toggled) */}
            <div className="space-y-1.5 pt-1">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#3A0E1E] transition-all duration-300">
                  ₹{effectivePrice.toLocaleString("en-IN")}
                </span>

                {waiveExchange ? (
                  <>
                    <span className="text-base sm:text-lg text-[#A49488] line-through font-serif">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <motion.span
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold font-mono tracking-wide flex items-center gap-1.5 shadow-xs"
                    >
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>SAVE ₹{exchangeDiscountAmount.toLocaleString("en-IN")} (NO EXCHANGE & NO REFUND)</span>
                    </motion.span>
                  </>
                ) : (
                  product.originalPrice && product.originalPrice > product.price && (
                    <>
                      <span className="text-sm text-[#A49488] line-through">
                        ₹{product.originalPrice.toLocaleString("en-IN")}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#FFF0F4] text-[#852C46] border border-[#E8D2B7] text-[11px] font-bold">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    </>
                  )
                )}
              </div>

              {/* Real-time reactive notification banner when discount is active */}
              <AnimatePresence>
                {waiveExchange && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -4 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-1.5 text-xs text-emerald-800 font-medium overflow-hidden pt-0.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>
                      Instant 4% Discount Applied: You save <strong>₹{exchangeDiscountAmount.toLocaleString("en-IN")}</strong> (Strictly No Exchange and No Refund).
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Color Selector (Interactive with visual garment colorway grading & Pantone specifications) */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-medium text-[#231820]">
                  COLOUR: <strong className="text-[#3A0E1E] font-serif tracking-wide">{selectedColor}</strong>
                </span>
                <span className="text-[10px] text-[#C5A059] font-mono tracking-wider hidden sm:inline">
                  • PANTONE {currentColorObj.pantone} ({currentColorObj.label.toUpperCase()})
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#8F8178]">4 Archival Shades</span>
            </div>

            <div className="flex items-start gap-4 sm:gap-6 pt-1">
              {colors.map((c) => {
                const isSelected = selectedColor === c.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => {
                      setSelectedColor(c.name);
                      showToast(`Colourway Switched: ${c.label} (PANTONE ${c.pantone})`);
                    }}
                    className="flex flex-col items-center gap-1.5 group cursor-pointer focus:outline-none"
                    aria-label={`Select color ${c.name} PANTONE ${c.pantone}`}
                  >
                    <div
                      className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                        isSelected
                          ? "border-[#3A0E1E] scale-110 ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-white shadow-md"
                          : "border-[#E8D2B7] hover:border-[#D4AF37] hover:scale-105 opacity-85 hover:opacity-100 shadow-2xs"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={`${c.name} (${c.label}) - PANTONE ${c.pantone}`}
                    >
                      {isSelected && (
                        <span className="w-2.5 h-2.5 rounded-full bg-white shadow-xs" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Atelier Colorway Dossier Note */}
            <motion.div
              key={selectedColor}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8D2B7]/80 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/30 shrink-0 shadow-2xs"
                  style={{ backgroundColor: currentColorObj.hex }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-[#3A0E1E] block text-[12px]">
                      {currentColorObj.label}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white border border-[#E8D2B7] text-[#865040] font-semibold">
                      PANTONE {currentColorObj.pantone}
                    </span>
                  </div>
                  <span className="text-[#6B5A52] text-[11px] font-sans leading-snug">
                    {currentColorObj.description}
                  </span>
                </div>
              </div>
              <span className="text-[9px] font-mono text-[#852C46] uppercase tracking-wider shrink-0 hidden sm:inline px-2 py-0.5 rounded-md bg-[#FFF0F4] border border-[#E8D2B7]">
                ARCHIVAL SHADE
              </span>
            </motion.div>
          </div>

          {/* Size Selector (XS, S, M, L, XL, XXL) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-[#231820]">
                SIZE: <strong className="text-[#3A0E1E] font-serif tracking-wide">{selectedSize}</strong>
              </span>
              <button 
                type="button"
                onClick={() => showToast("Atelier Sizing: Standard haute couture proportions from XS to XXL.")}
                className="text-[11px] text-[#3A0E1E] underline flex items-center gap-1 hover:text-[#542333] cursor-pointer"
              >
                <Ruler className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Atelier Sizing Guide</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-0.5">
              {availableSizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => {
                    setSelectedSize(sz);
                    showToast(`Selected Size: ${sz}`);
                  }}
                  className={`min-w-[48px] px-3.5 py-2 rounded-xl text-xs font-mono font-semibold border transition-all cursor-pointer text-center ${
                    selectedSize === sz
                      ? "bg-[#3A0E1E] text-white border-[#3A0E1E] shadow-sm ring-1 ring-[#D4AF37]"
                      : "bg-white text-[#231820] border-[#E8D2B7] hover:border-[#D4AF37] hover:bg-[#FAF7F2]"
                  }`}
                  aria-label={`Select size ${sz}`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Waive Exchange & Return for Instant 4% Discount Card */}
          <motion.div
            animate={{
              borderColor: waiveExchange ? "#059669" : "#E8D2B7",
              backgroundColor: waiveExchange ? "#F0FDF4" : "#FFF9F6"
            }}
            transition={{ duration: 0.2 }}
            className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer ${
              waiveExchange
                ? "border-emerald-600/70 bg-emerald-50/70 shadow-sm ring-1 ring-emerald-500/20"
                : "border-[#E8D2B7] bg-[#FFF9F6] hover:border-[#D4AF37]"
            }`}
            onClick={() => {
              const nextState = !waiveExchange;
              setWaiveExchange(nextState);
              if (nextState) {
                showToast(`Instant 4% Discount Applied! Strictly No Exchange and No Refund (Saved ₹${exchangeDiscountAmount.toLocaleString("en-IN")})`);
              } else {
                showToast("Standard service restored: No Exchange & No Refund waiver removed.");
              }
            }}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="exchange"
                checked={waiveExchange}
                onChange={(e) => {
                  e.stopPropagation();
                  setWaiveExchange(e.target.checked);
                  if (e.target.checked) {
                    showToast(`Instant 4% Discount Applied! Strictly No Exchange and No Refund (Saved ₹${exchangeDiscountAmount.toLocaleString("en-IN")})`);
                  } else {
                    showToast("Standard service restored: No Exchange & No Refund waiver removed.");
                  }
                }}
                className="mt-0.5 rounded border-[#E8D2B7] text-[#3A0E1E] focus:ring-[#D4AF37] w-4 h-4 cursor-pointer"
              />
              <div className="flex-1 text-xs select-none">
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <span className={`font-semibold tracking-wide ${waiveExchange ? "text-emerald-900" : "text-[#231820]"}`}>
                    {waiveExchange
                      ? "✓ NO EXCHANGE & NO REFUND (4% DISCOUNT ACTIVE)"
                      : "NO EXCHANGE & NO REFUND — GET INSTANT 4% OFF"}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full transition-colors ${
                      waiveExchange
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-[#3A0E1E] text-[#F6DFC4]"
                    }`}
                  >
                    {waiveExchange
                      ? `SAVED ₹${exchangeDiscountAmount.toLocaleString("en-IN")}`
                      : `SAVE 4% (-₹${exchangeDiscountAmount.toLocaleString("en-IN")})`}
                  </span>
                </div>
                <p className={`text-[11px] mt-1 leading-snug transition-colors ${waiveExchange ? "text-emerald-800" : "text-[#8F8178]"}`}>
                  {waiveExchange
                    ? `Instant 4% discount applied (-₹${exchangeDiscountAmount.toLocaleString("en-IN")}). Final sale: Strictly No Exchange and No Refund. Uncheck anytime to restore standard pricing.`
                    : `Opt for No Exchange and No Refund to unlock an instant 4% discount (-₹${exchangeDiscountAmount.toLocaleString("en-IN")}). Dispatched with standard quality guarantee.`}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Dual CTAs (Photo 3) */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOpenBuyNow({
                ...(product as unknown as ListedProduct),
                price: effectivePrice
              })}
              className="py-3.5 rounded-full bg-[#FFF0F4] hover:bg-[#FFE4EC] text-[#542333] border border-[#E8D2B7] font-serif font-bold text-xs uppercase tracking-wider shadow-sm transition-all text-center cursor-pointer"
            >
              Purchase Now
            </motion.button>

            <AddToBagButton
              product={product as any}
              variant="pdp-main"
              className="flex-1"
            />
          </div>

          <button
            onClick={() => onOpenCustomRequest(product as unknown as ListedProduct)}
            className="w-full py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F6DFC4]/50 border border-[#E8D2B7] text-[#3A0E1E] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <Scissors className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Commission Custom Sizing or Fabric Variation</span>
          </button>

          {/* Garment Dossier & Profile */}
          <div className="p-4 rounded-2xl bg-white border border-[#E8D2B7] space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#231820] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Garment Dossier & Profile</span>
            </h4>
            <ul className="space-y-2 text-xs text-[#6B5A52] leading-relaxed list-disc pl-4 font-light">
              {dossierPoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Designer Brand & Product Specifications Accordion (Position swapped per user request) */}
      <section 
        id="product-specifications-folio"
        ref={folioSectionRef}
        className={`scroll-mt-20 bg-white rounded-3xl border p-6 lg:p-10 space-y-8 shadow-sm transition-all duration-700 ${
          highlightFolio 
            ? "border-[#C5A059] ring-2 ring-[#C5A059]/40 shadow-md" 
            : "border-[#E8D2B7]"
        }`}
      >
        {/* Designer Brand Name & Logo Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8D2B7] gap-4">
          <div className="flex items-center gap-4">
            {/* Atelier / Designer Emblem Logo */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3A0E1E] to-[#1E050D] text-[#F6DFC4] border border-[#D4AF37]/60 flex items-center justify-center shadow-md shrink-0">
              <span className="font-serif text-lg font-bold tracking-widest text-[#F6DFC4]">
                {monogram}
              </span>
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#C5A059] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>OFFICIAL ATELIER COUTURIER</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#231820] font-semibold tracking-wide mt-0.5">
                {designerBrandName}
              </h3>
              <p className="text-xs text-[#8F8178] font-sans mt-0.5">
                Creative Director: <span className="text-[#3A0E1E] font-medium">{designerDisplayName}</span> • Archival Provenance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E8D2B7] text-[11px] font-mono text-[#8F8178]">
              PRODUCT ID: {product.id.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Expandable Accordion List (Matching Reference Image 2) */}
        <div className="divide-y divide-[#E5E5E5] border-t border-[#E5E5E5]">
          {/* 1. Features */}
          <div className="py-1">
            <button
              type="button"
              onClick={() => toggleAccordion("features")}
              className="w-full py-4 flex items-center justify-between text-left text-sm sm:text-base font-semibold text-[#111111] hover:text-[#3A0E1E] transition-colors cursor-pointer select-none group"
            >
              <span>Features</span>
              <span className="text-xl sm:text-2xl font-light text-[#111111] group-hover:text-[#3A0E1E] transition-colors leading-none w-6 text-right">
                {accordionState.features ? "−" : "+"}
              </span>
            </button>
            {accordionState.features && (
              <div className="pb-6 pt-1 text-xs sm:text-[13px] text-[#222222] space-y-2.5 leading-relaxed font-sans">
                <p className="flex items-start gap-1.5">
                  <span className="select-none">-</span>
                  <span>{product.materials || "Premium archival textiles"} providing supreme luxury drape, responsive texture, and enduring comfort.</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <span className="select-none">-</span>
                  <span>Artisanal tailoring and structural reinforcement engineered under the direct guidance of {designerDisplayName}.</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <span className="select-none">-</span>
                  <span>Hand-finished seams and closures anchored with waxed thread for structural resilience.</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <span className="select-none">-</span>
                  <span>Lined with smooth {product.lining || "cupro silk"} for frictionless elegance and natural breathability.</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <span className="select-none">-</span>
                  <span>Individually verified and registered with archival atelier serial identification.</span>
                </p>
              </div>
            )}
          </div>

          {/* 2. Details (Open by Default per Reference Image 2) */}
          <div className="py-1">
            <button
              type="button"
              onClick={() => toggleAccordion("details")}
              className="w-full py-4 flex items-center justify-between text-left text-sm sm:text-base font-semibold text-[#111111] hover:text-[#3A0E1E] transition-colors cursor-pointer select-none group"
            >
              <span>Details</span>
              <span className="text-xl sm:text-2xl font-light text-[#111111] group-hover:text-[#3A0E1E] transition-colors leading-none w-6 text-right">
                {accordionState.details ? "−" : "+"}
              </span>
            </button>
            {accordionState.details && (
              <div className="pb-6 pt-1 text-xs sm:text-[13px] text-[#222222] space-y-4 leading-relaxed font-sans">
                <div className="space-y-2">
                  <p className="flex items-start gap-1.5">
                    <span className="select-none">-</span>
                    <span>Recommended Minimum Temperature approx. -15°C</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="select-none">-</span>
                    <span>
                      The &ldquo;Minimum Comfortable Temperature&rdquo; is an estimated guideline based on simulations conducted under controlled test conditions by an independent third-party testing organization. It indicates the lowest ambient temperature at which the garment can be worn comfortably. *Individual comfort levels may vary. Please adjust your clothing as needed based on your personal conditions and environment.
                    </span>
                  </p>
                </div>

                <div className="pt-2">
                  <h4 className="font-semibold text-sm sm:text-base text-[#111111] mb-1.5 font-sans">
                    Function details
                  </h4>
                  <p className="flex items-start gap-1.5">
                    <span className="select-none">-</span>
                    <span>Fit: {product.fitType || "Relaxed"}</span>
                  </p>
                </div>

                <div className="pt-2 space-y-1 text-xs sm:text-[13px]">
                  <p className="font-sans text-[#111111]">
                    Product ID: {product.id === "prod-1" ? "488344" : product.id}
                  </p>
                  <p className="font-sans text-[#555555]">
                    The images shown may include colors that are not available.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 3. Material / Care */}
          <div className="py-1">
            <button
              type="button"
              onClick={() => toggleAccordion("materialCare")}
              className="w-full py-4 flex items-center justify-between text-left text-sm sm:text-base font-semibold text-[#111111] hover:text-[#3A0E1E] transition-colors cursor-pointer select-none group"
            >
              <span>Material / Care</span>
              <span className="text-xl sm:text-2xl font-light text-[#111111] group-hover:text-[#3A0E1E] transition-colors leading-none w-6 text-right">
                {accordionState.materialCare ? "−" : "+"}
              </span>
            </button>
            {accordionState.materialCare && (
              <div className="pb-6 pt-1 text-xs sm:text-[13px] text-[#222222] space-y-4 leading-relaxed font-sans">
                <div>
                  <h4 className="font-semibold text-sm text-[#111111] mb-1.5 font-sans">Material Composition</h4>
                  <p className="flex items-start gap-1.5">
                    <span className="select-none">-</span>
                    <span>Body / Outer Shell: {product.materials || "100% Mongolian Double-Faced Cashmere"}</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="select-none">-</span>
                    <span>Internal Lining: {product.lining || "100% Bemberg Cupro Silk"}</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="select-none">-</span>
                    <span>Internal Canvassing: Natural horsehair and unbleached flax canvas</span>
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-[#111111] mb-1.5 font-sans">Care Guidelines</h4>
                  <p className="flex items-start gap-1.5">
                    <span className="select-none">-</span>
                    <span>Specialist luxury dry clean only using hydrocarbon solvents.</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="select-none">-</span>
                    <span>Do not wash in water. Do not tumble dry. Do not bleach.</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="select-none">-</span>
                    <span>Low-heat press with damp cotton cloth on reverse side if needed (max 110°C).</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="select-none">-</span>
                    <span>Store suspended on provided weighted cedarwood hanger inside breathable salon garment sleeve.</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 4. Delivery / No Exchange & No Refund Policy */}
          <div className="py-1">
            <button
              type="button"
              onClick={() => toggleAccordion("deliveryReturn")}
              className="w-full py-4 flex items-center justify-between text-left text-sm sm:text-base font-semibold text-[#111111] hover:text-[#3A0E1E] transition-colors cursor-pointer select-none group"
            >
              <span>Delivery / No Exchange & No Refund Policy</span>
              <span className="text-xl sm:text-2xl font-light text-[#111111] group-hover:text-[#3A0E1E] transition-colors leading-none w-6 text-right">
                {accordionState.deliveryReturn ? "−" : "+"}
              </span>
            </button>
            {accordionState.deliveryReturn && (
              <div className="pb-6 pt-1 text-xs sm:text-[13px] text-[#222222] space-y-4 leading-relaxed font-sans">
                <div>
                  <h4 className="font-semibold text-sm text-[#111111] mb-1.5 font-sans">White-Glove Courier Logistics</h4>
                  <p className="flex items-start gap-1.5">
                    <span className="select-none">-</span>
                    <span>All commissions are dispatched through our dedicated temperature-controlled private courier fleet.</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="select-none">-</span>
                    <span>2–4 Business Days estimate for all metropolitan and salon sectors across India.</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="select-none">-</span>
                    <span>Arrives in weighted cedarwood hanger & bespoke zip garment bag with seal of provenance.</span>
                  </p>
                </div>

                {/* Integrated Pincode Checker */}
                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8D2B7]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs text-[#555555]">
                    <strong className="text-[#231820] font-medium block">Check Delivery Availability:</strong>
                    <span>Enter postal code to verify white-glove courier schedule</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter Pincode e.g. 400001"
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#E8D2B7] text-xs font-mono w-36 focus:outline-none focus:border-[#D4AF37]"
                    />
                    <button
                      type="button"
                      onClick={handleCheckPincode}
                      className="px-3.5 py-1.5 rounded-lg bg-[#3A0E1E] hover:bg-[#542333] text-[#F6DFC4] text-xs font-semibold uppercase tracking-wider font-serif transition-colors cursor-pointer"
                    >
                      Check
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-[#111111] mb-1.5 font-sans">Strict No Exchange & No Refund Policy</h4>
                  <p className="flex items-start gap-1.5">
                    <span className="select-none">-</span>
                    <span><strong>Instant 4% Discount Option:</strong> Select &quot;No Exchange & No Refund&quot; to save an instant 4% (min ₹120 off). Discounted orders are final sale with strictly <strong>No Exchange and No Refund</strong>.</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="select-none">-</span>
                    <span><strong>Atelier Standard Policy:</strong> All couture commissions are strictly final sale: <strong>No Exchange and No Refund</strong> once dispatched to protect hygiene and archival integrity.</span>
                  </p>
                  <p className="flex items-start gap-1.5">
                    <span className="select-none">-</span>
                    <span>Complimentary salon fitting consultation and custom measurement verifications are conducted prior to dispatch to ensure flawless fit.</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 5. Production */}
          <div className="py-1">
            <button
              type="button"
              onClick={() => toggleAccordion("production")}
              className="w-full py-4 flex items-center justify-between text-left text-sm sm:text-base font-semibold text-[#111111] hover:text-[#3A0E1E] transition-colors cursor-pointer select-none group"
            >
              <span>Production</span>
              <span className="text-xl sm:text-2xl font-light text-[#111111] group-hover:text-[#3A0E1E] transition-colors leading-none w-6 text-right">
                {accordionState.production ? "−" : "+"}
              </span>
            </button>
            {accordionState.production && (
              <div className="pb-6 pt-1 text-xs sm:text-[13px] text-[#222222] space-y-2.5 leading-relaxed font-sans">
                <p className="flex items-start gap-1.5">
                  <span className="select-none">-</span>
                  <span>Ethically harvested raw cashmere sourced from free-roaming nomadic herders in the high Alashan steppes of Inner Mongolia.</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <span className="select-none">-</span>
                  <span>Spun, carded, and double-woven by historic heritage mills in the foothills of Biella, Northern Italy.</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <span className="select-none">-</span>
                  <span>Canvassed, hand-stitched, and finished by master couturiers under the direct supervision of {product.designerName}.</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <span className="select-none">-</span>
                  <span>Strictly limited production run of 20 pieces globally with cryptographic authenticity ledger registration.</span>
                </p>
              </div>
            )}
          </div>

          {/* 6. Customer Service */}
          <div className="py-1">
            <button
              type="button"
              onClick={() => toggleAccordion("customerService")}
              className="w-full py-4 flex items-center justify-between text-left text-sm sm:text-base font-semibold text-[#111111] hover:text-[#3A0E1E] transition-colors cursor-pointer select-none group"
            >
              <span>Customer Service</span>
              <span className="text-xl sm:text-2xl font-light text-[#111111] group-hover:text-[#3A0E1E] transition-colors leading-none w-6 text-right">
                {accordionState.customerService ? "−" : "+"}
              </span>
            </button>
            {accordionState.customerService && (
              <div className="pb-6 pt-1 text-xs sm:text-[13px] text-[#222222] space-y-3 leading-relaxed font-sans">
                <p className="flex items-start gap-1.5">
                  <span className="select-none">-</span>
                  <span>Dedicated Atelier Client Concierge available daily from 10:00 AM to 8:00 PM IST.</span>
                </p>
                <p className="flex items-start gap-1.5">
                  <span className="select-none">-</span>
                  <span>Complimentary lifetime seam pressing, button re-anchoring, and off-season archival cedar vault storage.</span>
                </p>
                <div className="pt-2 flex flex-wrap gap-6 text-xs">
                  <div>
                    <strong className="block text-[#111111] font-semibold">Direct Salon Concierge:</strong>
                    <span className="text-[#3A0E1E] font-medium">+91 (022) 8400-ATELIER</span>
                  </div>
                  <div>
                    <strong className="block text-[#111111] font-semibold">Private Advisory Email:</strong>
                    <span className="text-[#3A0E1E] font-medium">concierge@altiermaisonprivee.com</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Similar Products (Swapped before Explore Designer's Work) */}
      <section className="space-y-6 pt-8 sm:pt-10 border-t border-[#E8D2B7]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] font-mono text-[#852C46] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>ATELIER CURATION</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#231820] mt-1 font-semibold">
              Similar Products
            </h2>
            <p className="text-xs text-[#8F8178] mt-0.5">
              Curated silhouettes and companion archive pieces matching this bespoke craftsmanship
            </p>
          </div>
          <span className="text-xs font-mono text-[#8F8178]">
            PRODUCT ID: {product.id.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarProducts.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProductId(item.id)}
              className="bg-white rounded-2xl border border-[#E8D2B7] p-4 space-y-3 hover:shadow-xl hover:border-[#D4AF37] transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="aspect-4/3 rounded-xl overflow-hidden bg-[#FAF7F2] relative">
                  <img
                    src={item.images?.[0] || item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top group-hover:scale-106 transition-transform duration-600 ease-out"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#3A0E1E]/90 text-[#F6DFC4] border border-[#D4AF37]/50 shadow-xs">
                      {item.collection?.toUpperCase() || "CURATED"}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-mono text-[#852C46] uppercase tracking-wider">
                    {item.brandName || item.designerName}
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-[#231820] line-clamp-1 group-hover:text-[#3A0E1E] transition-colors mt-0.5">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#8F8178] line-clamp-2 mt-1 leading-snug">
                    {item.description || item.materials || "Handcrafted artisanal luxury piece."}
                  </p>
                </div>
              </div>

              <div className="flex items-baseline justify-between pt-2 border-t border-[#E8D2B7]/60">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-sm font-bold text-[#3A0E1E]">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <span className="text-[11px] text-[#A49488] line-through">
                      ₹{item.originalPrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-[#C5A059] font-semibold group-hover:underline">
                  VIEW PIECE →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Designer's Work (Swipeable Couture Carousel per /design-taste-frontend & /ui-ux-pro-max) */}
      <section className="space-y-6 pt-8 sm:pt-10 scroll-mt-24 border-t border-[#E8D2B7] relative group/section">
        {/* Section Header: Title, Subtitle, and Swipe Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] font-mono text-[#852C46] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>COUTURE CAPSULE</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#231820] mt-1 font-semibold">
              Explore Designer&apos;s Work
            </h2>
            <p className="text-xs text-[#8F8178] mt-0.5">
              Swipe through archival masterworks & companion silhouettes by {product.designerName}
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 self-end sm:self-auto">
            <button
              onClick={onBack}
              className="text-xs font-serif text-[#3A0E1E] hover:underline cursor-pointer hidden md:inline-block pr-2 tracking-wide"
            >
              VIEW ATELIER PROFILE →
            </button>

            {/* Header Swipe Left & Right Navigation Buttons (Touch target >= 44x44px for accessibility) */}
            <div className="flex items-center gap-2 bg-white p-1 rounded-full border border-[#E8D2B7] shadow-xs">
              <button
                type="button"
                onClick={() => handleSwipe("left")}
                disabled={!canScrollLeft}
                aria-label="Swipe previous pieces"
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                  canScrollLeft
                    ? "bg-[#FAF7F2] hover:bg-[#3A0E1E] text-[#3A0E1E] hover:text-[#F6DFC4] border border-[#E8D2B7] hover:border-[#3A0E1E] shadow-sm hover:shadow-md cursor-pointer active:scale-95"
                    : "opacity-30 cursor-not-allowed text-[#8F8178] border border-transparent"
                }`}
                title="Swipe Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="w-[1px] h-5 bg-[#E8D2B7]/60" />

              <button
                type="button"
                onClick={() => handleSwipe("right")}
                disabled={!canScrollRight}
                aria-label="Swipe next pieces"
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                  canScrollRight
                    ? "bg-[#FAF7F2] hover:bg-[#3A0E1E] text-[#3A0E1E] hover:text-[#F6DFC4] border border-[#E8D2B7] hover:border-[#3A0E1E] shadow-sm hover:shadow-md cursor-pointer active:scale-95"
                    : "opacity-30 cursor-not-allowed text-[#8F8178] border border-transparent"
                }`}
                title="Swipe Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container with Floating Edge Swipe Arrows */}
        <div className="relative">
          {/* Floating Left Arrow (Desktop Hover) */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => handleSwipe("left")}
              aria-label="Swipe previous pieces"
              className="hidden lg:flex absolute left-0 top-[50%] -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md border border-[#E8D2B7] text-[#3A0E1E] hover:bg-[#3A0E1E] hover:text-[#F6DFC4] hover:border-[#3A0E1E] shadow-xl items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          )}

          {/* Floating Right Arrow (Desktop Hover) */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => handleSwipe("right")}
              aria-label="Swipe next pieces"
              className="hidden lg:flex absolute right-0 top-[50%] -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md border border-[#E8D2B7] text-[#3A0E1E] hover:bg-[#3A0E1E] hover:text-[#F6DFC4] hover:border-[#3A0E1E] shadow-xl items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 group"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}

          {/* Horizontal Swipeable Track */}
          <div
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-1 px-1 no-scrollbar cursor-grab active:cursor-grabbing select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {relatedDesignerPieces.map((item, idx) => (
              <div
                key={idx}
                data-carousel-card="true"
                className="w-[280px] sm:w-[320px] lg:w-[340px] shrink-0 snap-start bg-white rounded-2xl border-[1.5px] border-[#C59347]/65 overflow-hidden p-4 space-y-3.5 hover:shadow-2xl hover:border-[#C59347] transition-all duration-400 group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Portrait Photography with Quick View Overlay */}
                  <div
                    onClick={() => {
                      if (hasMovedRef.current) return;
                      setSelectedProductId(item.id);
                    }}
                    className="relative aspect-3/4 rounded-xl overflow-hidden bg-[#FAF7F2] cursor-pointer"
                  >
                    <img
                      src={item.images?.[0] || item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-top group-hover:scale-106 transition-transform duration-700 ease-out"
                    />

                    {/* Collection Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 rounded-xs bg-[#3A0E1E]/90 text-[#F6DFC4] text-[9px] uppercase font-mono tracking-wider backdrop-blur-xs border border-[#D4AF37]/40 shadow-xs">
                        {item.collection.toUpperCase()}
                      </span>
                    </div>

                    {/* Quick View Button on Hover */}
                    <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProductId(item.id);
                        }}
                        className="w-full py-2 px-3 rounded-lg bg-white/95 hover:bg-white text-[#231820] text-[10px] font-bold uppercase tracking-wider shadow-md backdrop-blur-xs text-center cursor-pointer font-sans"
                      >
                        Explore Detailed Piece
                      </button>
                    </div>
                  </div>

                  {/* Category & Designer Info */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-[#852C46] tracking-wider uppercase">
                      {item.category.toUpperCase()}
                    </span>

                    {/* Designer Verification Tick or Pro Badge */}
                    <div className="flex items-center gap-1">
                      {item.isPro ? (
                        <span
                          className="inline-flex items-center justify-center px-1.5 py-[1.5px] rounded-[3px] text-[7.5px] font-bold tracking-[0.14em] uppercase font-sans text-[#2B1403] border border-[#C99726]/60 shadow-[0_1px_2px_rgba(180,126,16,0.2)] shrink-0 select-none"
                          style={{
                            background:
                              "linear-gradient(135deg, #FDF0CD 0%, #E5B842 50%, #B88114 100%)",
                          }}
                          title="Pro Atelier Couturier"
                        >
                          PRO
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center shrink-0"
                          title="Verified Atelier Couturier"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="w-3.5 h-3.5 drop-shadow-[0_1px_2px_rgba(29,155,240,0.28)]"
                            fill="none"
                          >
                            <path
                              d="M22.5 12.5c0-1.58-.8-2.95-2-3.77.54-1.51.16-3.28-.97-4.41s-2.9-1.51-4.41-.97C14.3 2.15 12.93 1.35 11.35 1.35s-2.95.8-3.77 2c-1.51-.54-3.28-.16-4.41.97s-1.51 2.9-.97 4.41c-1.2.82-2 2.19-2 3.77s.8 2.95 2 3.77c-.54 1.51-.16 3.28.97 4.41s2.9 1.51 4.41.97c.82 1.2 2.19 2 3.77 2s2.95-.8 3.77-2c1.51.54 3.28.16 4.41-.97s1.51-2.9.97-4.41c1.2-.82 2-2.19 2-3.77z"
                              fill="#1D9BF0"
                            />
                            <path
                              d="M10.2 16.2l-3.6-3.6 1.4-1.4 2.2 2.2 5.6-5.6 1.4 1.4-7 7z"
                              fill="#FFFFFF"
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h4
                    onClick={() => {
                      if (hasMovedRef.current) return;
                      setSelectedProductId(item.id);
                    }}
                    className="font-serif text-sm font-semibold text-[#231820] hover:text-[#542333] transition-colors cursor-pointer line-clamp-1"
                  >
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-[#8F8178] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Pricing & Add to Cart Action */}
                <div className="flex items-center justify-between pt-3 border-t border-[#E8D2B7]/60 mt-auto">
                  <div className="flex items-baseline gap-1.5 sm:gap-2">
                    <span className="font-serif font-bold text-sm sm:text-base text-[#3A0E1E]">
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className="text-[10px] sm:text-[11px] text-[#A89D95] line-through font-mono">
                        ₹{item.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  <AddToBagButton product={item} variant="pill" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Bottom Progress & Interaction Indicator */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8F8178]">
              ARCHIVE SCROLL
            </span>
            <div className="w-32 sm:w-48 h-1 bg-[#E8D2B7]/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#852C46] rounded-full transition-all duration-200"
                style={{ width: `${Math.max(15, scrollProgress)}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-[#852C46] font-medium">
              {relatedDesignerPieces.length} PIECES
            </span>
          </div>

          <p className="text-[11px] text-[#8F8178] font-sans flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span>Swipe or click arrows to explore other silhouettes in this capsule</span>
          </p>
        </div>
      </section>
    </div>
  );
};
