"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, MotionConfig, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  Plus,
  Sparkles,
  ShieldCheck,
  Award,
  Ruler,
  CheckCircle2,
  Clock,
  Flame,
  Tag,
  Mail,
  Globe,
  MapPin,
  ChevronRight
} from "lucide-react";
import { useStudio } from "@/context/StudioContext";
import { ListedProduct } from "@/types/studio";
import {
  LeftSilkMarginCurtain,
  RightSilkMarginCurtain,
  FooterGinkgoSpray
} from "./SalonSilkDecorations";

const asset = (path: string) => {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return base ? `${base}${path}` : path;
};

const EASE_LUXURY: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface CustomerTopDealsProps {
  onOpenBuyNow: (product: ListedProduct) => void;
  onOpenCustomRequest: (product?: ListedProduct) => void;
}

interface DealShowcaseItem {
  id: string;
  linkedProductId: string;
  badge: string;
  title: string;
  brand: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  image: string;
  category: string;
  verifiedBadge?: "blue-tick" | "gold-pro" | null;
  stockNote?: string;
}

interface BannerSlideItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  originalPrice: number;
  salePrice: number;
  image: string;
  category: string;
  audience: "Men" | "Women" | "Kids";
  linkedProductId: string;
}

const BANNER_SLIDES: BannerSlideItem[] = [
  {
    id: "banner-man",
    tag: "LIMITED TIME OFFER",
    title: "Designer Ethnic Set",
    subtitle: "Timeless Elegance. Effortless Charm.",
    originalPrice: 12999,
    salePrice: 11499,
    image: "/images/salon/deals/slide_man.png",
    category: "Royal Sherwanis & Bandhgalas",
    audience: "Men",
    linkedProductId: "prod-deal-001"
  },
  {
    id: "banner-woman-wine",
    tag: "ARCHIVAL VAULT • 69% OFF",
    title: "Blush Zardozi Kalidar",
    subtitle: "Pure Handloom Silk. Golden Zari Weave.",
    originalPrice: 48000,
    salePrice: 14999,
    image: "/images/salon/deals/slide_woman_wine.png",
    category: "Bridal & Heritage Lehengas",
    audience: "Women",
    linkedProductId: "prod-in-005"
  },
  {
    id: "banner-kid",
    tag: "FESTIVE JUNIOR EXCLUSIVE",
    title: "Royal Junior Brocade",
    subtitle: "Artisan Tailored. Pure Mulberry Comfort.",
    originalPrice: 8500,
    salePrice: 3499,
    image: "/images/salon/deals/slide_kid.png",
    category: "Kids' Royal Ethnic Wear",
    audience: "Kids",
    linkedProductId: "prod-deal-007"
  },
  {
    id: "banner-woman-emerald",
    tag: "RUNWAY SAMPLE PIECE",
    title: "Emerald Velvet Anarkali",
    subtitle: "Imperial Silhouette. Hand-Embroidered Dabka.",
    originalPrice: 28000,
    salePrice: 9999,
    image: "/images/salon/deals/slide_woman_emerald.png",
    category: "Contemporary Indo-Western Couture",
    audience: "Women",
    linkedProductId: "prod-deal-010"
  }
];

// 30 Curated Luxury Deals with Indian Ethnic Couture Touch & Verified Imagery
const TOP_DEALS_ITEMS: DealShowcaseItem[] = [
  {
    id: "deal-01",
    linkedProductId: "prod-deal-001",
    badge: "71% OFF • FLASH",
    title: "Embroidered Organza Silk Kurta Set",
    brand: "Atelier Tarunima",
    price: 2499,
    originalPrice: 8500,
    discountPercent: 71,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop",
    category: "Luxury Prêt & Coordinates",
    verifiedBadge: "blue-tick",
    stockNote: "Only 2 left"
  },
  {
    id: "deal-02",
    linkedProductId: "prod-in-005",
    badge: "ARCHIVE SAMPLE",
    title: "Blush Zardozi Kalidar Bridal Lehenga",
    brand: "Sabyasachi Heritage Guild",
    price: 14999,
    originalPrice: 48000,
    discountPercent: 69,
    image: "/images/salon/bestseller-1.jpg",
    category: "Bridal & Heritage Lehengas",
    verifiedBadge: "gold-pro",
    stockNote: "1-of-1 Vault Piece"
  },
  {
    id: "deal-03",
    linkedProductId: "prod-in-001",
    badge: "69% OFF • LIMITED",
    title: "Ivory Chikankari Royal Sherwani",
    brand: "Abu Jani & Sandeep Khosla",
    price: 6800,
    originalPrice: 22000,
    discountPercent: 69,
    image: "/images/salon/bestseller-2.jpg",
    category: "Royal Sherwanis & Bandhgalas",
    verifiedBadge: null,
    stockNote: "Fast Selling"
  },
  {
    id: "deal-04",
    linkedProductId: "prod-in-003",
    badge: "70% OFF • HERITAGE",
    title: "Aubergine Kanjivaram Pure Zari Saree",
    brand: "The Kanjivaram Collective",
    price: 4200,
    originalPrice: 14000,
    discountPercent: 70,
    image: "/images/salon/bestseller-3.jpg",
    category: "Sarees & Drapes",
    verifiedBadge: "blue-tick"
  },
  {
    id: "deal-05",
    linkedProductId: "prod-in-004",
    badge: "VAULT CLEARANCE",
    title: "Obsidian Velvet Jodhpuri Bandhgala",
    brand: "Prathamesh Atelier Haute Couture",
    price: 5400,
    originalPrice: 18000,
    discountPercent: 70,
    image: "/images/salon/trending-1.jpg",
    category: "Royal Sherwanis & Bandhgalas",
    verifiedBadge: "gold-pro",
    stockNote: "Limited Tailoring"
  },
  {
    id: "deal-06",
    linkedProductId: "prod-001",
    badge: "70% OFF • RED CARPET",
    title: "Champagne Embroidered Tissue Gown",
    brand: "Adarsh Couture Privée",
    price: 7200,
    originalPrice: 24000,
    discountPercent: 70,
    image: "/images/salon/trending-2.jpg",
    category: "Couture & Gowns",
    verifiedBadge: "blue-tick"
  },
  {
    id: "deal-07",
    linkedProductId: "prod-deal-007",
    badge: "BUDGET LUXE",
    title: "Raw Silk Nehru Waistcoat & Kurta",
    brand: "Maison Raghav",
    price: 1899,
    originalPrice: 6499,
    discountPercent: 71,
    image: "/images/salon/trending-3.jpg",
    category: "Royal Sherwanis & Bandhgalas",
    verifiedBadge: null
  },
  {
    id: "deal-08",
    linkedProductId: "prod-deal-008",
    badge: "69% OFF • SAMPLE",
    title: "Crimson Crystal Draped Saree Ensemble",
    brand: "Sculpted Couture Paris",
    price: 5999,
    originalPrice: 19500,
    discountPercent: 69,
    image: "/images/salon/arrival-4.jpg",
    category: "Couture & Gowns",
    verifiedBadge: "gold-pro"
  },
  {
    id: "deal-09",
    linkedProductId: "prod-deal-009",
    badge: "LUCKNOW ARTISAN",
    title: "Hand-Couched Badla Kurta Pajama",
    brand: "Prathamesh Atelier",
    price: 2850,
    originalPrice: 9500,
    discountPercent: 70,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop",
    category: "Royal Sherwanis & Bandhgalas",
    verifiedBadge: "blue-tick"
  },
  {
    id: "deal-10",
    linkedProductId: "prod-deal-010",
    badge: "FESTIVE DEAL",
    title: "Mulberry Silk Draped Cape Set",
    brand: "Atelier K. Soni",
    price: 3600,
    originalPrice: 12000,
    discountPercent: 70,
    image: "/images/salon/trending-4.jpg",
    category: "Contemporary Indo-Western Couture",
    verifiedBadge: "gold-pro"
  },
  {
    id: "deal-11",
    linkedProductId: "prod-deal-011",
    badge: "LAST 2 PIECES",
    title: "Gold Filigree Banarasi Brocade Sherwani",
    brand: "Prathamesh & Adarsh Master Collaboration",
    price: 8999,
    originalPrice: 29000,
    discountPercent: 69,
    image: "/images/salon/arrival-3.jpg",
    category: "Royal Sherwanis & Bandhgalas",
    verifiedBadge: null
  },
  {
    id: "deal-12",
    linkedProductId: "prod-deal-012",
    badge: "70% OFF • BRIDAL",
    title: "Rose Gold Corseted Tissue Lehenga",
    brand: "Adarsh Couture Privée",
    price: 12500,
    originalPrice: 42000,
    discountPercent: 70,
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop",
    category: "Bridal & Heritage Lehengas",
    verifiedBadge: "blue-tick"
  },
  {
    id: "deal-13",
    linkedProductId: "prod-deal-013",
    badge: "HERITAGE PRINT",
    title: "Chanderi Hand-Block Choga Coat",
    brand: "Maison Singhal",
    price: 2150,
    originalPrice: 7200,
    discountPercent: 70,
    image: "/images/salon/arrival-1.jpg",
    category: "Luxury Prêt & Coordinates",
    verifiedBadge: "gold-pro"
  },
  {
    id: "deal-14",
    linkedProductId: "prod-deal-014",
    badge: "70% OFF • RUNWAY",
    title: "Emerald Zari Embroidered Trench",
    brand: "Maison Privée Paris",
    price: 4800,
    originalPrice: 16000,
    discountPercent: 70,
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=1000&auto=format&fit=crop",
    category: "Royal Sherwanis & Bandhgalas",
    verifiedBadge: "blue-tick"
  },
  {
    id: "deal-15",
    linkedProductId: "prod-deal-015",
    badge: "FLASH BLOWOUT",
    title: "Mirror-Work Pastel Festive Anarkali",
    brand: "Rohit Balaji Haute Couture",
    price: 3499,
    originalPrice: 11500,
    discountPercent: 70,
    image: "/images/salon/arrival-2.jpg",
    category: "Lehengas & Sets",
    verifiedBadge: null
  },
  {
    id: "deal-16",
    linkedProductId: "prod-deal-016",
    badge: "ARCHIVE 1-OF-1",
    title: "Liquid Copper Sculpted Saree Gown",
    brand: "Sculpted Couture Paris",
    price: 6800,
    originalPrice: 22500,
    discountPercent: 70,
    image: "/images/salon/bestseller-4.jpg",
    category: "Couture & Gowns",
    verifiedBadge: "gold-pro"
  },
  {
    id: "deal-17",
    linkedProductId: "prod-deal-017",
    badge: "CUSTOMER SPECIAL",
    title: "Royal Off-White Angrakha Kurta",
    brand: "Maison Raghav",
    price: 2299,
    originalPrice: 7800,
    discountPercent: 71,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop",
    category: "Royal Sherwanis & Bandhgalas",
    verifiedBadge: "blue-tick"
  },
  {
    id: "deal-18",
    linkedProductId: "prod-deal-018",
    badge: "BEST VALUE",
    title: "Handloom Tussar Silk Dupatta & Kurta",
    brand: "Atelier Tarunima",
    price: 1950,
    originalPrice: 6500,
    discountPercent: 70,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop",
    category: "Sarees & Drapes",
    verifiedBadge: null
  },
  {
    id: "deal-19",
    linkedProductId: "prod-deal-019",
    badge: "BESPOKE CUT",
    title: "Deep Maroon Velvet Indo-Western Blazer",
    brand: "Prathamesh Atelier",
    price: 4400,
    originalPrice: 14800,
    discountPercent: 70,
    image: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?q=80&w=1000&auto=format&fit=crop",
    category: "Royal Sherwanis & Bandhgalas",
    verifiedBadge: "gold-pro"
  },
  {
    id: "deal-20",
    linkedProductId: "prod-deal-020",
    badge: "WEAVERS GUILD",
    title: "Gilded Meenakari Tissue Saree",
    brand: "The Kanjivaram Collective",
    price: 3800,
    originalPrice: 12500,
    discountPercent: 70,
    image: "/images/salon/sig-zardozi.jpg",
    category: "Sarees & Drapes",
    verifiedBadge: "blue-tick"
  },
  {
    id: "deal-21",
    linkedProductId: "prod-deal-021",
    badge: "69% OFF • COUTURE",
    title: "Peacock Blue Kalidar Gown with Cape",
    brand: "Adarsh Couture Privée",
    price: 5200,
    originalPrice: 17000,
    discountPercent: 69,
    image: "/images/salon/sig-geometric.jpg",
    category: "Couture & Gowns",
    verifiedBadge: "gold-pro"
  },
  {
    id: "deal-22",
    linkedProductId: "prod-deal-022",
    badge: "LIMITED RELEASE",
    title: "Ivory Pearl Chikankari Waistcoat",
    brand: "Maison Singhal",
    price: 1750,
    originalPrice: 5900,
    discountPercent: 70,
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop",
    category: "Royal Sherwanis & Bandhgalas",
    verifiedBadge: null
  },
  {
    id: "deal-23",
    linkedProductId: "prod-deal-023",
    badge: "ROYAL WEDDING",
    title: "Zardozi Scallop Border Silk Lehenga",
    brand: "Sabyasachi Heritage Guild",
    price: 13800,
    originalPrice: 45000,
    discountPercent: 69,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
    category: "Bridal & Heritage Lehengas",
    verifiedBadge: "blue-tick"
  },
  {
    id: "deal-24",
    linkedProductId: "prod-deal-024",
    badge: "TAILORED LUXE",
    title: "Classic Charcoal Double-Breasted Sherwani",
    brand: "Prathamesh Atelier",
    price: 6400,
    originalPrice: 21000,
    discountPercent: 70,
    image: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=1000&auto=format&fit=crop",
    category: "Royal Sherwanis & Bandhgalas",
    verifiedBadge: "gold-pro"
  },
  {
    id: "deal-25",
    linkedProductId: "prod-deal-025",
    badge: "FESTIVE VAULT",
    title: "Saffron Hand-Embroidered Choli Set",
    brand: "Rohit Balaji Couture",
    price: 2999,
    originalPrice: 9999,
    discountPercent: 70,
    image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=1000&auto=format&fit=crop",
    category: "Lehengas & Sets",
    verifiedBadge: "blue-tick"
  },
  {
    id: "deal-26",
    linkedProductId: "prod-deal-026",
    badge: "INDO-WESTERN",
    title: "Bespoke Draped Dhoti & Kurta Set",
    brand: "Maison Raghav",
    price: 2450,
    originalPrice: 8200,
    discountPercent: 70,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
    category: "Contemporary Indo-Western Couture",
    verifiedBadge: null
  },
  {
    id: "deal-27",
    linkedProductId: "prod-deal-027",
    badge: "STEAL DEAL",
    title: "Pure Organza Foil Printed Saree",
    brand: "The Kanjivaram Collective",
    price: 1850,
    originalPrice: 6200,
    discountPercent: 70,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop",
    category: "Sarees & Drapes",
    verifiedBadge: "gold-pro"
  },
  {
    id: "deal-28",
    linkedProductId: "prod-deal-028",
    badge: "69% OFF • GROOM",
    title: "Hand-Tailored Bandhgala with Brass Crests",
    brand: "Prathamesh Atelier Haute Couture",
    price: 5800,
    originalPrice: 19000,
    discountPercent: 69,
    image: "https://images.unsplash.com/photo-1550246140-5119ae4790b8?q=80&w=1000&auto=format&fit=crop",
    category: "Royal Sherwanis & Bandhgalas",
    verifiedBadge: "blue-tick"
  },
  {
    id: "deal-29",
    linkedProductId: "prod-deal-029",
    badge: "COUTURE SAMPLE",
    title: "Champagne Silk Fluted Gown",
    brand: "Maison Privée Paris",
    price: 4999,
    originalPrice: 16500,
    discountPercent: 70,
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop",
    category: "Couture & Gowns",
    verifiedBadge: "gold-pro"
  },
  {
    id: "deal-30",
    linkedProductId: "prod-deal-030",
    badge: "VAULT FINALE",
    title: "Antique Gold Zardozi Kurta Set",
    brand: "Atelier Tarunima",
    price: 3200,
    originalPrice: 10800,
    discountPercent: 70,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
    category: "Luxury Prêt & Coordinates",
    verifiedBadge: "blue-tick"
  }
];

export const CustomerTopDeals: React.FC<CustomerTopDealsProps> = ({
  onOpenBuyNow,
  onOpenCustomRequest
}) => {
  const {
    showToast,
    addToCart,
    listedProducts,
    setSelectedProductId
  } = useStudio();

  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 38,
    seconds: 22
  });

  const [slideIndex, setSlideIndex] = useState(0);
  const [autoPlayPaused, setAutoPlayPaused] = useState(false);

  // Auto-play slideshow every 5.5s with pause on customer hover
  useEffect(() => {
    if (autoPlayPaused) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [autoPlayPaused]);

  const currentSlide = BANNER_SLIDES[slideIndex];

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 32,
    restDelta: 0.001
  });

  // Countdown timer simulation for flash vault sale
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatINR = (amount: number) => "₹" + amount.toLocaleString("en-IN");

  const resolveLinkedProduct = (item: DealShowcaseItem): ListedProduct => {
    const existing = listedProducts.find((p) => p.id === item.linkedProductId);
    if (existing) {
      return {
        ...existing,
        images: [asset(item.image), ...(existing.images || [])]
      };
    }
    return {
      id: item.linkedProductId,
      title: item.title,
      designerName: item.brand,
      brandName: item.brand,
      designerId: "des-001",
      category: item.category as ListedProduct["category"],
      subcategory: item.category,
      tags: ["Vault Deal", "Sample Sale", "Special Discount"],
      price: item.price,
      originalPrice: item.originalPrice,
      currency: "INR",
      availableStock: 3,
      initialStock: 8,
      isOneOfOne: false,
      images: [asset(item.image)],
      sizes: ["Custom Bespoke Fit", "S", "M", "L", "XL"],
      measurements: { bust: "36-40 in", waist: "30-34 in", hips: "38-42 in", length: "48 in" },
      fitType: "Precision Tailored",
      stretchability: "Bespoke Room",
      materials: "Pure handloom silk, badla zardozi, and micro metallic zari work",
      lining: "Mulberry silk inner lining",
      careInstructions: "Specialist dry clean only.",
      shippingMode: "Free Shipping",
      packageDimensions: "50 x 40 x 10 cm",
      packageWeight: "1.5 kg",
      status: "ACTIVE",
      isBoosted: true,
      viewsCount: 14200,
      orderCount: 48,
      createdAt: "2026-11-01",
      description: `Archival vault sample piece by ${item.brand}. Heavily discounted for private customers. Crafted with exquisite heritage Indian detailing.`
    };
  };

  const handleInspectProduct = (item: DealShowcaseItem) => {
    setSelectedProductId(item.linkedProductId);
  };

  const handleAddToBag = (e: React.MouseEvent, item: DealShowcaseItem) => {
    e.stopPropagation();
    addToCart({
      id: item.linkedProductId,
      title: item.title,
      price: item.price,
      image: asset(item.image),
      size: "Bespoke / Custom",
      color: "Archival Piece",
      quantity: 1
    });
    showToast(`Added "${item.title}" to Atelier Bag (${formatINR(item.price)})`);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative w-full min-h-[100dvh] bg-transparent text-[#321218] selection:bg-[#45141C] selection:text-[#FAF2E8]">
        {/* Scroll Progress Hairline */}
        <motion.div
          style={{ scaleX: smoothProgress, transformOrigin: "0% 50%" }}
          className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C89F5D] via-[#F2DEC0] to-[#C89F5D] z-[60] pointer-events-none"
        />

        {/* Ambient Silk Margins (Responsive) */}
        <LeftSilkMarginCurtain className="hidden xl:block absolute left-0 top-0 bottom-0 w-[105px] 2xl:w-[145px] z-0 opacity-85 pointer-events-none" />
        <RightSilkMarginCurtain className="hidden xl:block absolute right-0 top-0 bottom-0 w-[105px] 2xl:w-[145px] z-0 opacity-85 pointer-events-none" />

        {/* =========================================================================
            TOP DEALS EDITORIAL HERO BANNER WITH SLIDESHOW & GOLDEN FILIGREE ARTWORK
            ========================================================================= */}
        <section className="relative w-full bg-[#360B12] text-[#FAF4ED] pt-10 pb-12 px-4 sm:px-6 md:px-8 overflow-hidden border-b border-[#C59347]/25">
          {/* Ambient background velvet glow */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(200, 159, 93, 0.35), transparent 75%)"
            }}
          />

          <div className="max-w-[1240px] mx-auto relative z-10">
            {/* 1. TOP ORNAMENTAL CREST & HEADING */}
            <div className="flex flex-col items-center justify-center mb-6 sm:mb-8 text-center">
              {/* Golden Palmette / Fleur-de-lis Crest */}
              <img
                src={asset("/images/salon/deals/gold_header_crest.png")}
                alt="Royal Atelier Crest"
                className="w-11 sm:w-14 h-auto mb-2.5 opacity-95 drop-shadow-[0_2px_8px_rgba(226,180,59,0.45)] select-none pointer-events-none"
              />

              {/* Title flanked by horizontal gold gradient hairline rules */}
              <div className="w-full flex items-center justify-center gap-3 sm:gap-6">
                <div className="h-[1px] flex-1 max-w-[140px] sm:max-w-[240px] bg-gradient-to-r from-transparent via-[#C59347]/50 to-[#C59347]" />
                <h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal tracking-wide text-[#FAF4ED] whitespace-nowrap drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
                  style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', Georgia, serif" }}
                >
                  Top Deals & Archive Clearance
                </h1>
                <div className="h-[1px] flex-1 max-w-[140px] sm:max-w-[240px] bg-gradient-to-l from-transparent via-[#C59347]/50 to-[#C59347]" />
              </div>
            </div>

            {/* 2. THE GRAND ORNATE GOLDEN BANNER CARD SLIDESHOW */}
            <div
              className="relative w-full rounded-[14px] sm:rounded-[18px] overflow-hidden bg-gradient-to-r from-[#2B070E] via-[#380B13] to-[#24060B] border-[1.5px] border-[#C59347]/80 transition-all duration-500 hover:border-[#C59347] hover:shadow-[0_20px_60px_rgba(15,3,6,0.8)] shadow-[0_20px_60px_rgba(15,3,6,0.8)] group gold-lined-box"
              onMouseEnter={() => setAutoPlayPaused(true)}
              onMouseLeave={() => setAutoPlayPaused(false)}
            >
              {/* Slideshow Content Container */}
              <div className="relative w-full min-h-[350px] sm:min-h-[380px] md:min-h-[420px] lg:min-h-[440px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {/* Model Image Layer positioned on the right with smooth left feather */}
                    <div className="absolute inset-0 w-full h-full pointer-events-none">
                      <img
                        src={asset(currentSlide.image)}
                        alt={currentSlide.title}
                        className="w-full h-full object-cover object-right select-none"
                      />
                    </div>

                    {/* Left Vignette / Gradient Protection Layer for Typography Contrast */}
                    <div className="absolute inset-y-0 left-0 w-full sm:w-[65%] md:w-[58%] lg:w-[50%] bg-gradient-to-r from-[#24060B] via-[#2A060E]/95 to-transparent pointer-events-none z-10" />

                    {/* Content Text Overlay */}
                    <div className="relative z-20 h-full flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 py-8 max-w-[620px]">
                      {/* Eyebrow / Offer tag with delicate flanking dashes */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex items-center gap-2 mb-2 sm:mb-3"
                      >
                        <div className="w-5 sm:w-7 h-[1px] bg-[#C59347]/70" />
                        <span className="text-[10px] sm:text-[11.5px] uppercase font-sans font-semibold tracking-[0.26em] text-[#D9BFA4]">
                          {currentSlide.tag}
                        </span>
                        <div className="w-5 sm:w-7 h-[1px] bg-[#C59347]/70" />
                      </motion.div>

                      {/* Title */}
                      <motion.h2
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal tracking-tight text-[#FAF4ED] leading-[1.08] mb-2 sm:mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                        style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
                      >
                        {currentSlide.title}
                      </motion.h2>

                      {/* Subtitle */}
                      <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-[13px] sm:text-[14.5px] md:text-[16px] text-[#E8D4C3] font-sans font-light leading-relaxed mb-4 sm:mb-6"
                      >
                        {currentSlide.subtitle}
                      </motion.p>

                      {/* Price Row: Strikethrough original + discounted bold gold */}
                      <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.25 }}
                        className="flex items-baseline gap-3 sm:gap-4 mb-5 sm:mb-7"
                      >
                        <span className="text-[16px] sm:text-[18px] md:text-[20px] font-sans text-[#C2A38E]/75 line-through decoration-[#C59347]/80">
                          {formatINR(currentSlide.originalPrice)}
                        </span>
                        <span className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#F2D8A7] font-medium tracking-tight drop-shadow-[0_2px_12px_rgba(242,216,167,0.35)]">
                          {formatINR(currentSlide.salePrice)}
                        </span>
                      </motion.div>

                      {/* CTA Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                      >
                        <button
                          onClick={() => {
                            const linked = resolveLinkedProduct({
                              id: currentSlide.id,
                              linkedProductId: currentSlide.linkedProductId,
                              badge: currentSlide.tag,
                              title: currentSlide.title,
                              brand: "Prathamesh Atelier Haute Couture",
                              price: currentSlide.salePrice,
                              originalPrice: currentSlide.originalPrice,
                              discountPercent: Math.round(((currentSlide.originalPrice - currentSlide.salePrice) / currentSlide.originalPrice) * 100),
                              image: currentSlide.image,
                              category: currentSlide.category
                            });
                            onOpenBuyNow(linked);
                          }}
                          className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#1A0408]/85 hover:bg-[#2B070E] border border-[#C59347]/80 hover:border-[#F2D8A7] text-[#FAF4ED] text-[11px] sm:text-[12px] font-sans font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(200,159,93,0.25)] hover:shadow-[0_6px_25px_rgba(200,159,93,0.45)] hover:scale-[1.02] active:scale-[0.98] group/btn cursor-pointer"
                        >
                          <span>SHOP NOW</span>
                          <ChevronRight className="w-3.5 h-3.5 text-[#E2B43B] transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </button>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* 3. ORNATE GOLDEN FILIGREE BORDER OVERLAY */}
              <div className="absolute inset-0 pointer-events-none z-30 rounded-[14px] sm:rounded-[18px] border-2 border-[#C59347]/75 shadow-[inset_0_0_15px_rgba(200,159,93,0.22)]">
                {/* Inner thin hairline border */}
                <div className="absolute inset-[3px] sm:inset-[5px] rounded-[11px] sm:rounded-[14px] border border-[#F2D8A7]/45" />

                {/* Ornate Filigree Corner Embellishments */}
                <div className="absolute top-1 left-1 w-11 sm:w-16 h-11 sm:h-16">
                  <img src={asset("/images/salon/deals/gold_corner_tl.png")} alt="" className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />
                </div>
                <div className="absolute top-1 right-1 w-11 sm:w-16 h-11 sm:h-16 -scale-x-100">
                  <img src={asset("/images/salon/deals/gold_corner_tl.png")} alt="" className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />
                </div>
                <div className="absolute bottom-1 left-1 w-11 sm:w-16 h-11 sm:h-16 -scale-y-100">
                  <img src={asset("/images/salon/deals/gold_corner_tl.png")} alt="" className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />
                </div>
                <div className="absolute bottom-1 right-1 w-11 sm:w-16 h-11 sm:h-16 -scale-100">
                  <img src={asset("/images/salon/deals/gold_corner_tl.png")} alt="" className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />
                </div>
              </div>

              {/* 4. SLIDESHOW CONTROLS & PILL INDICATORS */}
              {/* Prev / Next Chevrons on hover */}
              <button
                onClick={() => setSlideIndex((prev) => (prev - 1 + BANNER_SLIDES.length) % BANNER_SLIDES.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1C0509]/75 hover:bg-[#2E070F] border border-[#C59347]/60 text-[#FAF4ED] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronRight className="w-4 h-4 rotate-180 text-[#E2B43B]" />
              </button>
              <button
                onClick={() => setSlideIndex((prev) => (prev + 1) % BANNER_SLIDES.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1C0509]/75 hover:bg-[#2E070F] border border-[#C59347]/60 text-[#FAF4ED] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4 text-[#E2B43B]" />
              </button>

              {/* Slide Indicators: 4 elegant gold pill indicators */}
              <div className="absolute bottom-4 left-6 sm:left-10 md:left-14 z-40 flex items-center gap-2">
                {BANNER_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setSlideIndex(idx)}
                    className={`transition-all duration-300 rounded-full h-1.5 cursor-pointer ${
                      idx === slideIndex
                        ? "w-8 bg-gradient-to-r from-[#C59347] to-[#F2D8A7] shadow-[0_0_8px_rgba(242,216,167,0.7)]"
                        : "w-2.5 bg-[#C59347]/35 hover:bg-[#C59347]/70"
                    }`}
                    aria-label={`Jump to slide ${idx + 1}: ${slide.audience}`}
                  />
                ))}
              </div>
            </div>

            {/* 5. QUICK GUARANTEES RIBBON (Under Banner Card) */}
            <div className="mt-6 sm:mt-7 grid grid-cols-2 lg:grid-cols-4 gap-3 text-center text-[#D9BFA4] text-[10px] sm:text-[11px] font-sans tracking-[0.14em] uppercase">
              <div className="flex items-center justify-center gap-2 py-2 border-r border-[#C59347]/20 last:border-none">
                <CheckCircle2 className="w-4 h-4 text-[#C59347]" />
                <span>30 Curated Masterpieces</span>
              </div>
              <div className="flex items-center justify-center gap-2 py-2 border-r border-[#C59347]/20 last:border-none">
                <Award className="w-4 h-4 text-[#C59347]" />
                <span>100% Certified Authentic</span>
              </div>
              <div className="flex items-center justify-center gap-2 py-2 border-r border-[#C59347]/20 last:border-none">
                <Tag className="w-4 h-4 text-[#C59347]" />
                <span>Custom Alterations Available</span>
              </div>
              <div className="flex items-center justify-center gap-2 py-2">
                <Globe className="w-4 h-4 text-[#C59347]" />
                <span>Insured Global Courier</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PURE UNFILTERED 30-CARD CURATED CLOTHING SHOWCASE
            No filters, no sorting widgets - pure high-fashion magazine catalog
            ========================================================================= */}
        <section className="relative w-full py-12 sm:py-16">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            {/* Section Header with Golden Artwork Dividing Lines */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#EAE0D5]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C2434]" />
                  <span className="text-[9.5px] uppercase tracking-[0.24em] text-[#7A2433] font-sans font-semibold">
                    DIRECT ATELIER RELEASE • SINGLE CONTINUOUS PAGE
                  </span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-normal text-[#321218] tracking-tight"
                  style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
                >
                  Top Clothing Deals • Heritage Indian & Contemporary Haute Couture
                </h2>
              </div>
              <span className="text-[11px] font-sans text-[#7E5C53] font-medium tracking-wide">
                Showing all 30 Exclusive Pieces
              </span>
            </div>

            {/* 30-Card Responsive Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
              {TOP_DEALS_ITEMS.map((item, idx) => {
                return (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{
                      duration: 0.55,
                      delay: (idx % 4) * 0.06,
                      ease: EASE_LUXURY
                    }}
                    onClick={() => handleInspectProduct(item)}
                    className="group bg-[#FDF9F5] p-2 sm:p-2.5 border-[1.5px] border-[#C59347]/65 flex flex-col cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C59347] hover:shadow-[0_14px_28px_-6px_rgba(69,20,28,0.14)] gold-lined-card"
                  >
                    {/* Photograph Container */}
                    <div className="relative aspect-[4/4.35] w-full overflow-hidden bg-[#EFE6DC]">
                      <img
                        src={asset(item.image)}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                      />

                      {/* Top-left Dark Burgundy / Golden Discount Badge */}
                      <span className="absolute top-2 left-2 bg-[#4B1A22] text-[#FAF4ED] text-[7.5px] sm:text-[8px] tracking-[0.14em] uppercase font-sans font-medium px-2 py-0.5 shadow-sm border border-[#E8D2B7]/20">
                        {item.badge}
                      </span>

                      {/* Stock availability urgency indicator if any */}
                      {item.stockNote && (
                        <span className="absolute bottom-2 left-2 bg-[#FAF4ED]/95 backdrop-blur-xs text-[#8C2434] text-[7px] sm:text-[7.5px] font-sans font-bold tracking-[0.1em] uppercase px-1.5 py-0.5 border border-[#EAE0D5]">
                          {item.stockNote}
                        </span>
                      )}
                    </div>

                    {/* Metadata Block */}
                    <div className="pt-2 px-0.5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Brand Eyebrow */}
                        <div className="text-[8.5px] tracking-[0.18em] uppercase font-sans text-[#8C6D62] font-semibold truncate mb-0.5">
                          {item.brand}
                        </div>

                        {/* Title */}
                        <h3 className="text-[11px] sm:text-[11.5px] font-medium text-[#321218] font-sans leading-snug truncate group-hover:text-[#6A1B29] transition-colors">
                          {item.title}
                        </h3>
                      </div>

                      {/* Price Row (With Crossed-out Original, % Off Pill, and Rightmost Badge) */}
                      <div className="mt-1.5 flex items-center justify-between font-sans">
                        <div className="flex items-baseline gap-1.5 flex-wrap">
                          <span className="text-[11px] sm:text-[11.5px] font-semibold text-[#3B171D]">
                            {formatINR(item.price)}
                          </span>
                          <span className="text-[9px] sm:text-[9.5px] text-[#A48C84] line-through">
                            {formatINR(item.originalPrice)}
                          </span>
                          <span className="text-[8px] font-bold text-[#8C2434] bg-[#F7E7E9] px-1 py-[1px] rounded-[2px]">
                            -{item.discountPercent}%
                          </span>
                        </div>

                        {/* Rightmost Badge (Blue Tick or Golden PRO, exactly matching main page alignment) */}
                        {item.verifiedBadge === "blue-tick" && (
                          <span
                            className="inline-flex items-center shrink-0 ml-auto"
                            title="Verified Atelier Heritage Guild"
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

                        {item.verifiedBadge === "gold-pro" && (
                          <span
                            className="inline-flex items-center justify-center px-1.5 py-[1.5px] rounded-[3px] text-[7.5px] font-bold tracking-[0.14em] uppercase font-sans text-[#2B1403] border border-[#C99726]/60 shadow-[0_1px_2px_rgba(180,126,16,0.2)] shrink-0 ml-auto select-none"
                            style={{
                              background:
                                "linear-gradient(135deg, #FDF0CD 0%, #E5B842 50%, #B88114 100%)"
                            }}
                            title="Pro Atelier Couturier"
                          >
                            PRO
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom (+) ADD TO CART -> Footer Bar */}
                    <div className="mt-2.5 pt-2 border-t border-[#ECE2D6] flex items-center justify-between px-0.5">
                      <button
                        type="button"
                        onClick={(e) => handleAddToBag(e, item)}
                        className="inline-flex items-center gap-1.5 text-[8px] sm:text-[8.5px] tracking-[0.16em] uppercase font-sans font-medium text-[#3B171D] hover:text-[#6B1F2B] transition-colors cursor-pointer"
                      >
                        <span className="w-3.5 h-3.5 rounded-full border border-[#3B171D]/45 flex items-center justify-center">
                          <Plus className="w-2 h-2" strokeWidth={2.2} />
                        </span>
                        ADD TO CART
                      </button>
                      <ArrowRight
                        className="w-3 h-3 text-[#3B171D]/70 group-hover:translate-x-1 transition-transform"
                        strokeWidth={1.6}
                      />
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            GOLDEN PROVENANCE GUARANTEE & CONCIERGE BANNER
            ========================================================================= */}
        <section className="relative w-full py-12 bg-transparent border-t border-[#EAE0D5]/60">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="relative border-[1.5px] border-[#C59347]/75 bg-[#FDF9F5] p-8 sm:p-10 rounded-[2px] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-500 hover:border-[#C59347] hover:shadow-md gold-lined-box">
              {/* Golden line accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C59347] to-transparent" />

              <div className="max-w-xl">
                <span className="text-[9px] uppercase tracking-[0.22em] text-[#8C2434] font-semibold block mb-1">
                  Atelier Client Care & Bespoke Tailoring
                </span>
                <h3
                  className="text-2xl sm:text-3xl font-normal text-[#321218] tracking-tight mb-2"
                  style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
                >
                  Need Custom Fitting on a Sale Piece?
                </h3>
                <p className="text-[12.5px] text-[#7A6158] font-sans font-light leading-relaxed">
                  Every discounted archival piece is eligible for complimentary bespoke alteration consultation with our master tailors in Mumbai and Paris. Request a digital measurement session anytime.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenCustomRequest()}
                  className="px-5 py-2.5 bg-[#45141C] text-[#FAF4ED] text-[9.5px] uppercase tracking-[0.18em] font-sans font-medium hover:bg-[#5E1B26] transition-colors cursor-pointer"
                >
                  Book Tailor Consultation
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            EDITORIAL FOOTER (Identical to Main Page with Master Panorama Artwork)
            ========================================================================= */}
        <footer
          id="atelier-footer"
          className="relative w-full overflow-hidden bg-[#5C0D15] text-[#FAF3EB] min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] flex items-center"
        >
          {/* Master Panoramic Artwork Backdrop (Provided 100% exact editorial photo with ample headroom) */}
          <div className="absolute inset-0 z-0">
            <img
              src={asset("/images/salon/footer-banner-master.jpg")}
              alt="Mariana Voss Atelier"
              className="w-full h-full object-cover object-top md:object-[center_top] pointer-events-none select-none"
            />
          </div>

          <div className="relative z-10 w-full max-w-[1240px] mx-auto px-5 sm:px-8 py-14 sm:py-16 lg:py-20 grid grid-cols-1 md:grid-cols-12 items-center gap-8">
            {/* Left Column Spacer: Leaves full view for Mariana Voss in the photo */}
            <div className="hidden md:block md:col-span-4 lg:col-span-4 h-full pointer-events-none min-h-[160px]" />

            {/* Center Contact Rows */}
            <div className="md:col-span-4 lg:col-span-4 bg-[#5C0D15]/80 md:bg-transparent p-4 md:p-0 rounded-[2px] backdrop-blur-[2px] md:backdrop-blur-none border border-[#E5D0C3]/15 md:border-none">
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#E8D5C7] font-sans mb-4">
                LET’S CREATE SOMETHING EXTRAORDINARY
              </p>
              <ul className="space-y-2.5 text-[11px] font-sans text-[#E8D5C7]/95">
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border border-[#E5D0C3]/40 flex items-center justify-center shrink-0">
                    <Mail className="w-3 h-3 text-[#E5D0C3]" strokeWidth={1.6} />
                  </span>
                  hello@marianavoss.com
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border border-[#E5D0C3]/40 flex items-center justify-center shrink-0">
                    <Globe className="w-3 h-3 text-[#E5D0C3]" strokeWidth={1.6} />
                  </span>
                  www.marianavoss.com
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border border-[#E5D0C3]/40 flex items-center justify-center shrink-0">
                    <MapPin className="w-3 h-3 text-[#E5D0C3]" strokeWidth={1.6} />
                  </span>
                  Milan, Italy
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border border-[#E5D0C3]/40 flex items-center justify-center shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#E5D0C3"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3 h-3"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </span>
                  @marianavoss.design
                </li>
              </ul>
            </div>

            {/* Right Creative Director Quote */}
            <div className="md:col-span-4 lg:col-span-4 md:border-l border-[#E5D0C3]/25 md:pl-7 pr-4 sm:pr-8 lg:pr-14 relative bg-[#5C0D15]/80 md:bg-transparent p-4 md:p-0 rounded-[2px] backdrop-blur-[2px] md:backdrop-blur-none border border-[#E5D0C3]/15 md:border-none">
              <span
                className="block text-[38px] leading-none text-[#D9BFA4]/60 select-none mb-1"
                style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
              >
                “
              </span>
              <blockquote
                className="text-[14.5px] sm:text-[15.5px] leading-[1.6] text-[#F7ECE2] font-normal"
                style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
              >
                Design is not just what it looks like and feels like. Design is how it works.
              </blockquote>
              <p className="mt-3 text-[9px] tracking-[0.24em] uppercase text-[#D9BFA4] font-sans">
                — MARIANA VOSS
              </p>
            </div>
          </div>
        </footer>

        {/* Editorial Footer ends */}
      </div>
    </MotionConfig>
  );
};
