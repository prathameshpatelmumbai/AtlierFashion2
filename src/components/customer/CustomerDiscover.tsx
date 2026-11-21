"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, MotionConfig, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Plus,
  Mail,
  Globe,
  MapPin,
  X,
  Star,
  LayoutGrid,
  List
} from "lucide-react";
import { useStudio } from "@/context/StudioContext";
import { ListedProduct } from "@/types/studio";
import {
  LeftSilkMarginCurtain,
  RightSilkMarginCurtain,
  FooterGinkgoSpray,
  SatinSilkWaveSeam
} from "./SalonSilkDecorations";
import HeroModelSlideshow from "./HeroModelSlideshow";
import HeroTextSlideshow from "./HeroTextSlideshow";
import SignatureCollectionsCluster from "./SignatureCollectionsCluster";
import DesignerLogosMarquee from "./DesignerLogosMarquee";

const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === "production" ? "/AtlierFashion2" : "");

const asset = (path: string) => `${BASE_PATH}${path}`;

const EASE_LUXURY: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface CustomerDiscoverProps {
  onOpenBuyNow: (product: ListedProduct) => void;
  onOpenCustomRequest: (product?: ListedProduct) => void;
}

interface SalonShowcaseItem {
  id: string;
  linkedProductId: string;
  badge?: string;
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  image: string;
  category: string;
  verifiedBadge?: "blue-tick" | "gold-pro" | null;
}

const SIGNATURE_COLLECTIONS = [
  {
    id: "sig-numbered",
    badge: "NO. 03 / 05 VAULT",
    eyebrow: "NUMBERED SILHOUETTES",
    title: "Limited Edition",
    description:
      "Numbered archival garments crafted from rare vintage textiles, accompanied by sealed provenance.",
    image: "/images/salon/sig-numbered.jpg",
    filterCategory: "Bridal & Heritage Lehengas"
  },
  {
    id: "sig-zardozi",
    badge: "MASTER ARTISANS",
    eyebrow: "ZARDOZI, DABKA & CHIKANKARI",
    title: "Handcrafted",
    description:
      "Over 380 hours of hand-spun silhouette work by fourth-generation embroidery masters of Lucknow.",
    image: "/images/salon/sig-zardozi.jpg",
    filterCategory: "Bridal & Heritage Lehengas"
  },
  {
    id: "sig-geometric",
    badge: "GEOMETRIC DRAPING",
    eyebrow: "ARCHITECTURAL MOTIF",
    title: "Inspired Arts",
    description:
      "Bold silhouettes inspired by Indian temple geometry and French modernism, rendered in sculpted silk.",
    image: "/images/salon/sig-geometric.jpg",
    filterCategory: "Couture & Gowns"
  },
  {
    id: "sig-sherwani",
    badge: "ROYAL HERITAGE",
    eyebrow: "IMPERIAL BROCADE & ZARI",
    title: "Regal Sherwani",
    description:
      "Pure raw silk brocade hand-embroidered with antique Zardozi and Dabka motifs, tailored for princely ceremonial splendour.",
    image: "/images/salon/sig-sherwani.jpg",
    filterCategory: "Royal Sherwanis & Bandhgalas"
  },
  {
    id: "sig-heritage-looms",
    badge: "ANCESTRAL WEAVES",
    eyebrow: "PIT-LOOM & PURE GOLD ZARI",
    title: "Heritage Drapes",
    description:
      "Interwoven with 24-karat gold zari on Varanasi ancestral pit-looms, accompanied by an unbroken certificate of lineage.",
    image: "/images/salon/sig-heritage-looms.jpg",
    filterCategory: "Bridal & Heritage Lehengas"
  },
  {
    id: "sig-parisian",
    badge: "PARIS ATELIER SALON",
    eyebrow: "SCULPTED SILK CORSETRY",
    title: "Parisian Modernism",
    description:
      "Architectural cape gowns merging structural French corsetry with fluid Indian organza, tailored on private salon commission.",
    image: "/images/salon/sig-parisian.jpg",
    filterCategory: "Couture & Gowns"
  },
  {
    id: "sig-sapphire-gown",
    badge: "OPÉRA DE PARIS",
    eyebrow: "MIDNIGHT SILK & VELVET",
    title: "Sapphire Gala",
    description:
      "Sculptural midnight-blue velvet bodice cascading into voluminous micro-pleated tulle with constellation crystal embroidery.",
    image: "/images/salon/sapphire-gala-gown.jpg",
    filterCategory: "Couture & Gowns"
  },
  {
    id: "sig-obsidian-bandhgala",
    badge: "ROYAL JODHPUR",
    eyebrow: "BESPOKE CUT & RAW SILK",
    title: "Obsidian Bandhgala",
    description:
      "Architectural structured Jodhpuri jacket in matte obsidian silk, accented with hand-carved vintage filigree gold buttons.",
    image: "/images/salon/obsidian-bandhgala.jpg",
    filterCategory: "Royal Sherwanis & Bandhgalas"
  },
  {
    id: "sig-royal-kalidar",
    badge: "IMPERIAL GUILD",
    eyebrow: "ARCHIVAL ZARDOZI & SILK",
    title: "Royal Kalidar",
    description:
      "Heirloom pure silk flared kalidar gown encrusted with hand-couched crystals and antique gold dabka filigree.",
    image: "/images/salon/arrival-4.jpg",
    filterCategory: "Contemporary Indo-Western Couture"
  }
];

const NEW_ARRIVALS: SalonShowcaseItem[] = [
  {
    id: "arrival-1",
    linkedProductId: "prod-002",
    badge: "PRE-ACCESS PRIVÉ",
    title: "Archival Ensemble Coat",
    brand: "Maison Privée • Paris",
    price: 45000,
    originalPrice: 60000,
    image: "/images/salon/arrival-1.jpg",
    category: "Luxury Prêt & Coordinates",
    verifiedBadge: "blue-tick"
  },
  {
    id: "arrival-2",
    linkedProductId: "prod-in-002",
    badge: "BESPOKE LIMITED",
    title: "Silk Lehenga with Dupatta",
    brand: "Atelier Tarunima",
    price: 112000,
    originalPrice: 145000,
    image: "/images/salon/arrival-2.jpg",
    category: "Lehengas & Sets",
    verifiedBadge: "gold-pro"
  },
  {
    id: "arrival-3",
    linkedProductId: "prod-in-004",
    badge: "READY TO SHIP",
    title: "Embroidered Ivory Trench",
    brand: "Prathamesh Atelier",
    price: 66000,
    originalPrice: 84000,
    image: "/images/salon/arrival-3.jpg",
    category: "Royal Sherwanis & Bandhgalas",
    verifiedBadge: null
  },
  {
    id: "arrival-4",
    linkedProductId: "prod-001",
    badge: "RUNWAY RELEASE",
    title: "Crimson Crystal Silk Gown",
    brand: "Rohit Balaji Couture",
    price: 210000,
    originalPrice: 255000,
    image: "/images/salon/arrival-4.jpg",
    category: "Couture & Gowns",
    verifiedBadge: "gold-pro"
  }
];

const TRENDING_OUTFITS: SalonShowcaseItem[] = [
  {
    id: "trending-1",
    linkedProductId: "prod-in-004",
    title: "Charcoal Bespoke Suit",
    brand: "Maison Singhal",
    price: 85000,
    image: "/images/salon/trending-1.jpg",
    category: "Royal Sherwanis & Bandhgalas",
    verifiedBadge: "gold-pro"
  },
  {
    id: "trending-2",
    linkedProductId: "prod-001",
    title: "Champagne Embroidered Gown",
    brand: "Adarsh Couture Privée",
    price: 152000,
    image: "/images/salon/trending-2.jpg",
    category: "Couture & Gowns",
    verifiedBadge: "blue-tick"
  },
  {
    id: "trending-3",
    linkedProductId: "prod-in-001",
    title: "Ivory Bandhgala Jacket",
    brand: "Maison Raghav",
    price: 68000,
    image: "/images/salon/trending-3.jpg",
    category: "Royal Sherwanis & Bandhgalas",
    verifiedBadge: null
  },
  {
    id: "trending-4",
    linkedProductId: "prod-003",
    title: "Wine Velvet Silk Midi Dress",
    brand: "Atelier K. Soni",
    price: 135000,
    image: "/images/salon/trending-4.jpg",
    category: "Contemporary Indo-Western Couture",
    verifiedBadge: "blue-tick"
  }
];

const BESTSELLERS: SalonShowcaseItem[] = [
  {
    id: "bestseller-1",
    linkedProductId: "prod-in-005",
    badge: "ICONIC ARCHIVE",
    title: "Blush Zardozi Bridal Lehenga",
    brand: "Sabyasachi Heritage Guild",
    price: 345000,
    originalPrice: 395000,
    rating: 5,
    reviews: 48,
    image: "/images/salon/bestseller-1.jpg",
    category: "Bridal & Heritage Lehengas",
    verifiedBadge: "blue-tick"
  },
  {
    id: "bestseller-2",
    linkedProductId: "prod-in-001",
    badge: "CUSTOMER FAVORITE",
    title: "Ivory Chikankari Royal Sherwani",
    brand: "Abu Jani & Sandeep Khosla",
    price: 112000,
    originalPrice: 138000,
    rating: 5,
    reviews: 38,
    image: "/images/salon/bestseller-2.jpg",
    category: "Royal Sherwanis & Bandhgalas",
    verifiedBadge: "gold-pro"
  },
  {
    id: "bestseller-3",
    linkedProductId: "prod-in-003",
    badge: "HERITAGE WEAVE",
    title: "Aubergine Kanjivaram Zari Saree",
    brand: "The Kanjivaram Collective",
    price: 98000,
    originalPrice: 120000,
    rating: 5,
    reviews: 64,
    image: "/images/salon/bestseller-3.jpg",
    category: "Sarees & Drapes",
    verifiedBadge: "blue-tick"
  },
  {
    id: "bestseller-4",
    linkedProductId: "prod-001",
    badge: "RED CARPET EDITION",
    title: "Copper Molten Couture Gown",
    brand: "Sculpted Couture Paris",
    price: 220000,
    originalPrice: 265000,
    rating: 5,
    reviews: 52,
    image: "/images/salon/bestseller-4.jpg",
    category: "Couture & Gowns",
    verifiedBadge: "gold-pro"
  }
];

const LOOKBOOK_PLATES = [
  {
    plate: "PLATE I • ARCHIVAL VAULT",
    title: "Crimson Velvet Zardozi Jacket & Heirloom Drape",
    atelier: "Lucknow & Place Vendôme Workshops",
    image: "/images/salon/hero-model.jpg",
    note: "Hand-couched metallic dabka and antique pearl zardozi executed over 410 atelier hours on pure silk velvet."
  },
  {
    plate: "PLATE II • ARCHITECTURAL SILK",
    title: "Sculpted Corset Gown over Pleated Ivory Faille",
    atelier: "Parisian Draping Studio",
    image: "/images/salon/sig-geometric.jpg",
    note: "Boned velvet bodice parting seamlessly over 18 meters of hand-knife-pleated cream duchesse satin."
  },
  {
    plate: "PLATE III • BESPOKE COMMISSION",
    title: "Master Draping on Private Customer Mannequin",
    atelier: "Milan & New Delhi Private Salon",
    image: "/images/salon/made-for-you.jpg",
    note: "Individually sculpted on custom linen-padded forms tailored to exact customer measurements."
  }
];

const WOMENS_CATEGORY_TILES = [
  { name: "Jackets & Blazers", image: "/images/categories/women/women-blazer.png", filter: "Luxury Prêt & Coordinates" },
  { name: "Trousers & Pants", image: "/images/categories/women/women-pants.png", filter: "Luxury Prêt & Coordinates" },
  { name: "Knitwear & Sweaters", image: "/images/categories/women/women-sweater.png", filter: "Luxury Prêt & Coordinates" },
  { name: "Kurtas & Tunics", image: "/images/categories/women/women-kurta.png", filter: "Contemporary Indo-Western" },
  { name: "Couture Gowns", image: "/images/categories/women/women-gown.png", filter: "Couture & Gowns" },
  { name: "Pleated Skirts", image: "/images/categories/women/women-skirt.png", filter: "Luxury Prêt & Coordinates" },
  { name: "T-Shirts & Tops", image: "/images/categories/women/women-tshirt.png", filter: "Luxury Prêt & Coordinates" },
  { name: "Shirts & Blouses", image: "/images/categories/women/women-shirt.png", filter: "Luxury Prêt & Coordinates" },
  { name: "Sarees & Drapes", image: "/images/categories/women/women-saree.png", filter: "Sarees & Drapes" },
  { name: "Lehengas & Sets", image: "/images/categories/women/women-lehenga.png", filter: "Lehengas & Sets" }
];

const CATEGORY_TILES = WOMENS_CATEGORY_TILES;

const MENS_CATEGORY_TILES = [
  { name: "T-Shirts", image: "/images/categories/men/men-tshirt.png", filter: "Luxury Prêt & Coordinates" },
  { name: "Sweatshirts", image: "/images/categories/men/men-sweatshirt.png", filter: "Luxury Prêt & Coordinates" },
  { name: "Polo T-Shirts", image: "/images/categories/men/men-polo-tshirt.png", filter: "Luxury Prêt & Coordinates" },
  { name: "Shirts", image: "/images/categories/men/men-shirt.png", filter: "Luxury Prêt & Coordinates" },
  { name: "Hoodies", image: "/images/categories/men/men-hoodie.png", filter: "Contemporary Indo-Western" },
  { name: "Jackets", image: "/images/categories/men/men-jacket.png", filter: "Luxury Prêt & Coordinates" },
  { name: "Blazers", image: "/images/categories/men/men-blazer.png", filter: "Royal Sherwanis & Bandhgalas" },
  { name: "Kurtas", image: "/images/categories/men/men-kurta.png", filter: "Contemporary Indo-Western" },
  { name: "Sherwanis", image: "/images/categories/men/men-sherwani.png", filter: "Royal Sherwanis & Bandhgalas" },
  { name: "Jeans & Pants", image: "/images/categories/men/men-jeans-pants.png", filter: "Luxury Prêt & Coordinates" }
];

const KIDS_CATEGORY_TILES = [
  { name: "T-Shirts", image: "/images/categories/kids/kids-tshirt.png", filter: "Luxury Prêt & Coordinates" },
  { name: "Shirts", image: "/images/categories/kids/kids-shirt.png", filter: "Luxury Prêt & Coordinates" },
  { name: "Kurtas & Sets", image: "/images/categories/kids/kids-kurta.png", filter: "Contemporary Indo-Western" },
  { name: "Jackets", image: "/images/categories/kids/kids-jacket.png", filter: "Luxury Prêt & Coordinates" },
  { name: "Jeans & Pants", image: "/images/categories/kids/kids-pants.png", filter: "Luxury Prêt & Coordinates" },
  { name: "Sweatshirts", image: "/images/categories/kids/kids-sweatshirt.png", filter: "Luxury Prêt & Coordinates" },
  { name: "Hoodies", image: "/images/categories/kids/kids-hoodie.png", filter: "Contemporary Indo-Western" },
  { name: "Polo T-Shirts", image: "/images/categories/kids/kids-polo.png", filter: "Luxury Prêt & Coordinates" },
  { name: "Blazers & Suits", image: "/images/categories/kids/kids-blazer.png", filter: "Royal Sherwanis & Bandhgalas" },
  { name: "Sherwanis", image: "/images/categories/kids/kids-sherwani.png", filter: "Royal Sherwanis & Bandhgalas" }
];

const KIDS_NEW_ARRIVALS: SalonShowcaseItem[] = [
  {
    id: "kids-arr-1",
    linkedProductId: "prod-kids-001",
    badge: "HERITAGE COUTURE",
    title: "Mustard Zardozi Silk Short Kurta",
    brand: "Maison Privée Junior",
    price: 18500,
    originalPrice: 24000,
    image: "/images/categories/kids/kids-kurta.png",
    category: "Contemporary Indo-Western",
    verifiedBadge: "gold-pro"
  },
  {
    id: "kids-arr-2",
    linkedProductId: "prod-kids-002",
    badge: "RESORT COLLECTION",
    title: "Sage Green Pure Linen Shirt",
    brand: "Atelier Petit",
    price: 9200,
    originalPrice: 12500,
    image: "/images/categories/kids/kids-shirt.png",
    category: "Luxury Prêt & Coordinates",
    verifiedBadge: "blue-tick"
  },
  {
    id: "kids-arr-3",
    linkedProductId: "prod-kids-003",
    badge: "ATELIER DENIM",
    title: "Indigo Denim Bomber Jacket",
    brand: "Maison Privée Junior",
    price: 14800,
    originalPrice: 19500,
    image: "/images/categories/kids/kids-jacket.png",
    category: "Luxury Prêt & Coordinates",
    verifiedBadge: "gold-pro"
  },
  {
    id: "kids-arr-4",
    linkedProductId: "prod-kids-004",
    badge: "BESPOKE TAILORED",
    title: "Beige Chino Drawstring Joggers",
    brand: "Atelier Petit",
    price: 8500,
    originalPrice: 11000,
    image: "/images/categories/kids/kids-pants.png",
    category: "Luxury Prêt & Coordinates",
    verifiedBadge: null
  }
];

const KIDS_TRENDING: SalonShowcaseItem[] = [
  {
    id: "kids-trend-1",
    linkedProductId: "prod-kids-005",
    badge: "GOLD EMBLEM",
    title: "Sky Blue Star Luxury Cotton Tee",
    brand: "Maison Privée Junior",
    price: 5500,
    originalPrice: 7500,
    image: "/images/categories/kids/kids-tshirt.png",
    category: "Luxury Prêt & Coordinates",
    verifiedBadge: "blue-tick"
  },
  {
    id: "kids-trend-2",
    linkedProductId: "prod-kids-006",
    badge: "WINTER CASHMERE",
    title: "Camel Brushed Fleece Hoodie",
    brand: "Atelier Petit",
    price: 11500,
    originalPrice: 15000,
    image: "/images/categories/kids/kids-hoodie.png",
    category: "Contemporary Indo-Western",
    verifiedBadge: "gold-pro"
  },
  {
    id: "kids-trend-3",
    linkedProductId: "prod-kids-007",
    badge: "ROYAL ARCHIVAL",
    title: "Ivory Silk Miniature Sherwani",
    brand: "Sabyasachi Heritage Kids",
    price: 38000,
    originalPrice: 48000,
    image: "/images/categories/kids/kids-sherwani.png",
    category: "Royal Sherwanis & Bandhgalas",
    verifiedBadge: "gold-pro"
  },
  {
    id: "kids-trend-4",
    linkedProductId: "prod-kids-008",
    badge: "TAILORED LUXE",
    title: "Midnight Navy Crest Suit Blazer",
    brand: "Maison Privée Junior",
    price: 22000,
    originalPrice: 28500,
    image: "/images/categories/kids/kids-blazer.png",
    category: "Royal Sherwanis & Bandhgalas",
    verifiedBadge: null
  }
];

const getCategoryTiles = (gender: "men" | "women" | "kids" | null) => {
  if (gender === "men") return MENS_CATEGORY_TILES;
  if (gender === "kids") return KIDS_CATEGORY_TILES;
  if (gender === "women") return WOMENS_CATEGORY_TILES;
  return WOMENS_CATEGORY_TILES;
};

export const CustomerDiscover: React.FC<CustomerDiscoverProps> = ({
  onOpenBuyNow,
  onOpenCustomRequest
}) => {
  const {
    listedProducts,
    setCustomerSection,
    showToast,
    addToCart,
    activeGender,
    setActiveGender,
    setActiveCategoryFilter,
    setSelectedProductId,
    catalogLayout,
    setCatalogLayout
  } = useStudio();

  const [showCurtain, setShowCurtain] = useState(true);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [openDrawer, setOpenDrawer] = useState<"men" | "women" | "kids" | null>(null);
  const [inlineCategoryGender, setInlineCategoryGender] = useState<"men" | "women" | "kids" | null>(null);
  const [lookbookOpen, setLookbookOpen] = useState(false);
  const [lookbookIndex, setLookbookIndex] = useState(0);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  // Synchronized 7-second interval for both Hero Text Slides and Model Photos
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % 4);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 32,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowCurtain(false), 380);
    return () => clearTimeout(timer);
  }, []);

  const formatINR = (amount: number) => "₹" + amount.toLocaleString("en-IN");

  const toggleSaved = (e: React.MouseEvent, item: SalonShowcaseItem) => {
    e.stopPropagation();
    setSavedIds((prev) => {
      const exists = prev.includes(item.id);
      showToast(
        exists
          ? `Removed "${item.title}" from Private Folio`
          : `Saved "${item.title}" to Private Folio`
      );
      return exists ? prev.filter((id) => id !== item.id) : [...prev, item.id];
    });
  };

  const resolveLinkedProduct = (item: SalonShowcaseItem): ListedProduct => {
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
      tags: ["Archival", "Bespoke"],
      price: item.price,
      originalPrice: item.originalPrice,
      currency: "INR",
      availableStock: 2,
      initialStock: 3,
      isOneOfOne: true,
      images: [asset(item.image)],
      sizes: ["Custom", "S", "M", "L"],
      measurements: {},
      fitType: "Custom Fit",
      stretchability: "No Stretch (Structured)",
      materials: "Pure Handloom Mulberry Silk & Antique Zari",
      lining: "100% Breathable Silk Crepe",
      careInstructions: "Specialist Dry Clean Only",
      shippingMode: "Free Shipping",
      packageDimensions: "60 x 45 x 18 cm",
      packageWeight: "2.4 kg",
      status: "ACTIVE",
      viewsCount: 310,
      orderCount: 14,
      createdAt: "2026-11-01"
    };
  };

  const handleInspectProduct = (item: SalonShowcaseItem) => {
    const foundInCatalog = listedProducts.find((p) => p.id === item.linkedProductId);
    if (foundInCatalog) {
      setSelectedProductId(foundInCatalog.id);
      return;
    }
    onOpenBuyNow(resolveLinkedProduct(item));
  };

  const handleAddToBag = (e: React.MouseEvent, item: SalonShowcaseItem) => {
    e.stopPropagation();
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: asset(item.image),
      size: "Bespoke / Standard",
      quantity: 1
    });
    showToast(`Added "${item.title}" to your Atelier Bag`);
  };

  const handleCategorySelect = (gender: "men" | "women" | "kids", category: string) => {
    setActiveGender(gender);
    setActiveCategoryFilter(category);
    setOpenDrawer(null);
    setCustomerSection("catalog");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  };

  const handleSignatureExplore = (filterCategory: string) => {
    setActiveCategoryFilter(filterCategory);
    setCustomerSection("catalog");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  };

  const renderProductCard = (
    item: SalonShowcaseItem,
    index: number,
    options: { showFooterBar?: boolean; showRating?: boolean }
  ) => {
    return (
      <motion.article
        key={item.id}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, delay: index * 0.08, ease: EASE_LUXURY }}
        onClick={() => handleInspectProduct(item)}
        className="group bg-[#FDF9F5] p-2.5 border-[1.5px] border-[#C59347]/65 flex flex-col cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C59347] hover:shadow-[0_14px_28px_-6px_rgba(69,20,28,0.14)] gold-lined-card"
      >
        {/* Product Photograph */}
        <div className="relative aspect-[4/4.35] w-full overflow-hidden bg-[#EFE6DC]">
          <img
            src={asset(item.image)}
            alt={item.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          />

          {/* Top-left Dark Burgundy Badge */}
          {item.badge && (
            <span className="absolute top-2 left-2 bg-[#4B1A22] text-[#FAF4ED] text-[7.5px] sm:text-[8px] tracking-[0.14em] uppercase font-sans font-medium px-2 py-0.5 shadow-sm">
              {item.badge}
            </span>
          )}

          {/* Subtle hover quick-inspect sheen for cards without footer bar */}
          {!options.showFooterBar && (
            <div className="absolute inset-x-2 bottom-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-[opacity,transform] duration-300 flex justify-between items-center bg-[#FDF9F5]/95 backdrop-blur-sm border border-[#E6D9CD] px-2.5 py-1.5">
              <button
                type="button"
                onClick={(e) => handleAddToBag(e, item)}
                className="text-[8px] tracking-[0.16em] uppercase text-[#4B1A22] font-semibold flex items-center gap-1 hover:text-[#2B0C11] cursor-pointer"
              >
                <Plus className="w-2.5 h-2.5" /> Add to Bag
              </button>
              <ArrowRight className="w-3 h-3 text-[#4B1A22]" />
            </div>
          )}
        </div>

        {/* Metadata Block */}
        <div className="pt-2.5 px-0.5 flex-1 flex flex-col">
          {/* Bestseller 5-star Rating */}
          {options.showRating && (
            <div className="flex items-center gap-1.5 mb-1">
              <div className="flex items-center gap-[1.5px] text-[#C59347]">
                {Array.from({ length: item.rating ?? 5 }).map((_, starIdx) => (
                  <Star key={starIdx} className="w-2.5 h-2.5 fill-[#C59347] text-[#C59347]" />
                ))}
              </div>
              <span className="text-[9px] text-[#8E6F64] font-sans tracking-wide">
                {item.reviews ?? 42}+
              </span>
            </div>
          )}

          <h3 className="text-[11px] font-medium text-[#321218] font-sans leading-snug truncate group-hover:text-[#5B1D27] transition-colors">
            {item.title}
          </h3>

          {/* Price & Rightmost Verified/PRO Badge */}
          <div className="mt-1 flex items-center justify-between font-sans">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[11px] font-semibold text-[#3B171D]">
                {formatINR(item.price)}
              </span>
              {item.originalPrice && (
                <span className="text-[9.5px] text-[#A48C84] line-through">
                  {formatINR(item.originalPrice)}
                </span>
              )}
            </div>

            {/* Rightmost badge aligned on the same horizontal line */}
            {item.verifiedBadge === "blue-tick" && (
              <span
                className="inline-flex items-center shrink-0"
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
                className="inline-flex items-center justify-center px-1.5 py-[1.5px] rounded-[3px] text-[7.5px] font-bold tracking-[0.14em] uppercase font-sans text-[#2B1403] border border-[#C99726]/60 shadow-[0_1px_2px_rgba(180,126,16,0.2)] shrink-0 select-none"
                style={{
                  background:
                    "linear-gradient(135deg, #FDF0CD 0%, #E5B842 50%, #B88114 100%)",
                }}
                title="Pro Atelier Couturier"
              >
                PRO
              </span>
            )}
          </div>
        </div>

        {/* Bottom (+) ADD TO CART -> Footer Bar */}
        {options.showFooterBar && (
          <div className="mt-2.5 pt-2 border-t border-[#ECE2D6] flex items-center justify-between px-0.5">
            <button
              type="button"
              onClick={(e) => handleAddToBag(e, item)}
              className="inline-flex items-center gap-1.5 text-[8.5px] tracking-[0.16em] uppercase font-sans font-medium text-[#3B171D] hover:text-[#6B1F2B] transition-colors cursor-pointer"
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
        )}
      </motion.article>
    );
  };

  return (
    <MotionConfig reducedMotion="user">
    <div className="relative w-full min-h-[100dvh] bg-transparent text-[#321218] selection:bg-[#45141C] selection:text-[#FAF2E8]">
      {/* Scroll Progress Hairline */}
      <motion.div
        style={{ scaleX: smoothProgress, transformOrigin: "0% 50%" }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C89F5D] via-[#F2DEC0] to-[#C89F5D] z-[60] pointer-events-none"
      />

      {/* Luxury Entry Veil */}
      <AnimatePresence>
        {showCurtain && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.55, ease: EASE_LUXURY } }}
            onClick={() => setShowCurtain(false)}
            className="fixed inset-0 z-[70] bg-[#3E1017] flex flex-col items-center justify-center cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, y: 12, letterSpacing: "0.45em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.28em" }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.65, ease: EASE_LUXURY }}
              className="text-center px-6"
            >
              <p className="text-[10px] tracking-[0.36em] uppercase text-[#DFC294] italic mb-2">
                ATELIER
              </p>
              <h1
                className="text-2xl sm:text-4xl text-[#FAF3EB] uppercase tracking-[0.26em] font-normal font-prata"
                style={{ fontFamily: "var(--font-prata), 'Prata', Georgia, serif" }}
              >
                MAISON PRIVÉE
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.75, ease: EASE_LUXURY }}
                className="h-px w-48 mx-auto mt-4 bg-gradient-to-r from-transparent via-[#E5C99B] to-transparent"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* 1. STICKY SUB-HEADER BAR: MEN | WOMEN | KIDS <--> FEATURES*/}
      {/* ======================================================== */}
      <div className="sticky top-[58px] z-40 bg-[#FAF6F0]/95 backdrop-blur-sm border-b border-[#EAE0D4]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 h-[34px] flex items-center justify-between text-[9.5px] tracking-[0.2em] uppercase font-sans text-[#3E1820]">
          <div className="flex items-center gap-6 h-full">
            {(["men", "women", "kids"] as const).map((g) => {
              const isSelected = openDrawer === g;
              const active = isSelected || activeGender === g;
              return (
                <button
                  key={g}
                  type="button"
                  aria-expanded={isSelected}
                  onClick={() => {
                    setActiveGender(g);
                    setOpenDrawer((prev) => (prev === g ? null : g));
                  }}
                  className={`relative h-full inline-flex items-center transition-colors cursor-pointer ${
                    active
                      ? "text-[#45141C] font-semibold"
                      : "text-[#6B4A4F] hover:text-[#45141C]"
                  }`}
                >
                  {g.toUpperCase()}
                  {isSelected && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#45141C]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category & Features Slide-Down Drawer (Restored 12-Tile Category Grid & Dense List) */}
        <AnimatePresence>
          {openDrawer && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE_LUXURY }}
              className="overflow-hidden bg-[#FDF9F4] border-b border-[#E5D5C5] shadow-[0_24px_48px_-16px_rgba(69,20,28,0.22)]"
            >
              <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-5 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE0D4] pb-3.5">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[14px] sm:text-[15px] tracking-[0.14em] uppercase text-[#321218] font-normal"
                      style={{ fontFamily: "var(--font-nevrada), 'Nevrada', var(--font-cormorant), 'Playfair Display', serif" }}
                    >
                      {openDrawer === "kids" ? "KIDS’ ATELIER ARCHIVES" : `${openDrawer ? openDrawer.toUpperCase() : ""}'S ATELIER ARCHIVES`}
                    </span>
                    <span className="hidden sm:inline-block w-8 h-px bg-[#D9C4B2]" />
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <div className="flex items-center border border-[#DFCBB8] bg-white/80 p-0.5">
                      <button
                        type="button"
                        aria-label="Grid View"
                        onClick={() => setCatalogLayout("grid")}
                        className={`p-1.5 transition-colors cursor-pointer ${
                          catalogLayout === "grid" ? "bg-[#45141C] text-white" : "text-[#6D4F4B]"
                        }`}
                        title="Grid View"
                      >
                        <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        aria-label="Dense List View"
                        onClick={() => setCatalogLayout("dense")}
                        className={`p-1.5 transition-colors cursor-pointer ${
                          catalogLayout === "dense" ? "bg-[#45141C] text-white" : "text-[#6D4F4B]"
                        }`}
                        title="Dense List View"
                      >
                        <List className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                    <button
                      type="button"
                      aria-label="Close drawer"
                      onClick={() => setOpenDrawer(null)}
                      className="inline-flex items-center gap-1 px-2 py-1 text-[9px] tracking-[0.16em] uppercase text-[#6D4F4B] hover:text-[#321218] cursor-pointer"
                    >
                      Close <X className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Restored Visual Category Tiles for MEN / WOMEN / KIDS */}
                {catalogLayout === "grid" ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-5">
                      {getCategoryTiles(openDrawer).map((tile, idx) => (
                        <motion.button
                          key={tile.name}
                          type="button"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.02, duration: 0.25 }}
                          onClick={() => {
                            handleCategorySelect(openDrawer, tile.name);
                            showToast(`Exploring ${openDrawer.toUpperCase()}’s ${tile.name}`);
                          }}
                          className="group flex flex-col items-center text-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#45141C] cursor-pointer"
                        >
                          <div className="w-full aspect-[4/3] overflow-hidden bg-white border-[1.5px] border-[#C59347]/50 group-hover:border-[#C59347] group-hover:shadow-md flex items-center justify-center p-2 mb-2 transition-all duration-300 shadow-[0_6px_18px_-12px_rgba(69,20,28,0.12)]">
                            <img
                              src={asset(tile.image)}
                              alt={tile.name}
                              className="w-full h-full object-contain group-hover:scale-[1.06] transition-transform duration-500"
                            />
                          </div>
                          <span
                            className="text-[12.5px] sm:text-[13px] text-[#321218] group-hover:text-[#6B1F2B] transition-colors font-normal leading-snug"
                            style={{ fontFamily: "var(--font-nevrada), 'Nevrada', var(--font-cormorant), 'Playfair Display', serif" }}
                          >
                            {tile.name}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {getCategoryTiles(openDrawer).map((tile, idx) => (
                        <motion.button
                          key={tile.name}
                          type="button"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.02, duration: 0.2 }}
                          onClick={() => {
                            handleCategorySelect(openDrawer, tile.name);
                            showToast(`Exploring ${openDrawer.toUpperCase()}’s ${tile.name}`);
                          }}
                          className="group flex items-center justify-between p-2.5 bg-white border border-[#EAE0D4] hover:border-[#45141C]/50 hover:shadow-md transition-[border-color,box-shadow] duration-300 text-left cursor-pointer"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-12 h-12 shrink-0 overflow-hidden bg-[#FAF6F0] p-1 border border-[#F0E6DC]">
                              <img src={asset(tile.image)} alt={tile.name} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span
                                className="text-[14px] text-[#321218] group-hover:text-[#6B1F2B] transition-colors font-normal truncate"
                                style={{ fontFamily: "var(--font-nevrada), 'Nevrada', var(--font-cormorant), 'Playfair Display', serif" }}
                              >
                                {tile.name}
                              </span>
                              <span className="text-[9px] font-sans text-[#8A6D63] uppercase tracking-[0.16em] mt-0.5">
                                {openDrawer.toUpperCase()}’S ARCHIVE
                              </span>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-[#8A6D63] group-hover:text-[#45141C] group-hover:translate-x-1 transition-[color,transform] shrink-0 mr-1" aria-hidden="true" />
                        </motion.button>
                      ))}
                    </div>
                  )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ======================================================== */}
      {/* 2. HERO SECTION (Aligned Grid + 4K Portrait + Silk Wave) */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden min-h-[580px] sm:min-h-[620px] md:min-h-[640px] lg:min-h-[670px] xl:min-h-[700px] flex items-end">
        {/* Rotated 90° Clockwise Burgundy Silk Drapery Background (Second-to-last layer before full-page background) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        >
          <picture className="block w-full h-full">
            <source srcSet={asset("/images/salon/hero-burgundy-silk-drape.webp")} type="image/webp" />
            <img
              src={asset("/images/salon/hero-burgundy-silk-drape.jpg")}
              alt="Haute Couture Draped Burgundy Silk Folds"
              className="w-full h-full object-cover object-center"
            />
          </picture>
          {/* Atelier Atmosphere Gradient Overlay: Balances natural silk folds with optimal editorial text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(46, 12, 18, 0.84) 0%, rgba(69, 20, 28, 0.50) 45%, rgba(46, 12, 18, 0.76) 100%), linear-gradient(to top, rgba(40, 10, 15, 0.88) 0%, transparent 65%)"
            }}
          />
        </div>

        {/* Radial Dusty Rose Studio Spotlight */}
        <motion.div
          animate={{ opacity: [0.88, 1, 0.88] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 68% 86% at 68% 40%, rgba(182, 122, 114, 0.38), rgba(114, 46, 54, 0.24) 44%, transparent 80%)"
          }}
        />

        {/* Single Unified Container Locked to Header & Body Vertical Measure */}
        <div className="relative z-20 max-w-[1280px] w-full mx-auto px-5 sm:px-8 grid grid-cols-1 md:grid-cols-12 items-end gap-6 lg:gap-8">
          {/* Left Editorial Typography Synchronized Slideshow (Transitions in sync with model photos every 7s) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE_LUXURY }}
            className="md:col-span-6 lg:col-span-5 md:self-center pt-8 sm:pt-10 md:pt-6 pb-8 sm:pb-10 md:pb-6 lg:pb-8 flex flex-col items-start text-left z-30 md:-translate-y-4 lg:-translate-y-6 xl:-translate-y-8"
          >
            <HeroTextSlideshow
              currentIndex={heroSlideIndex}
              onSelectIndex={setHeroSlideIndex}
              onOpenLookbook={() => {
                setLookbookIndex(0);
                setLookbookOpen(true);
              }}
            />
          </motion.div>

          {/* Right Aligned Stage: Crisp Wine Circle + Glowing 4K Magnolia + 4K Portrait */}
          <div className="md:col-span-6 lg:col-span-7 relative flex justify-center md:justify-end items-end self-end min-h-[330px] sm:min-h-[440px] lg:min-h-[600px] xl:min-h-[640px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, delay: 0.2, ease: EASE_LUXURY }}
              className="relative w-[390px] sm:w-[480px] md:w-[535px] lg:w-[665px] xl:w-[730px] max-w-full flex items-end justify-center pt-6"
            >
              {/* Soft Ambient Head Spotlight Bloom */}
              <div
                aria-hidden="true"
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] lg:w-[540px] lg:h-[540px] rounded-full pointer-events-none z-0 opacity-75"
                style={{
                  background:
                    "radial-gradient(circle, rgba(206, 152, 140, 0.36) 0%, rgba(128, 56, 62, 0.14) 55%, transparent 78%)"
                }}
              />

              {/* Crisp Dark Wine Half Circle Backdrop (Golden light & golden glow border removed) */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[440px] sm:w-[560px] md:w-[620px] lg:w-[760px] xl:w-[820px] h-[220px] sm:h-[280px] md:h-[310px] lg:h-[380px] xl:h-[410px] rounded-t-full rounded-b-none bg-[#360D14]/85 backdrop-blur-[2px] z-10 pointer-events-none overflow-hidden shadow-none border-0"
              >
                {/* Embedded Silk Texture Echo Inside Arch */}
                <div className="absolute inset-0 opacity-45 mix-blend-soft-light pointer-events-none">
                  <img
                    src={asset("/images/salon/hero-burgundy-silk-drape.webp")}
                    alt=""
                    className="w-full h-full object-cover object-bottom"
                  />
                </div>
              </div>

              {/* 3D Floating Animated Golden Lineart Flower (Mirror-Flipped & Shifted Right) */}
              <motion.div
                aria-hidden="true"
                animate={{ y: [0, -8, 0], opacity: [0.94, 1, 0.94] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-16 sm:-right-20 md:-right-26 lg:-right-36 xl:-right-42 bottom-2 sm:bottom-4 lg:bottom-6 w-[180px] sm:w-[230px] md:w-[270px] lg:w-[320px] xl:w-[350px] h-auto z-[15] pointer-events-none select-none"
              >
                <picture className="block w-full h-auto">
                  <source srcSet={asset("/images/salon/hero-flower-art.webp")} type="image/webp" />
                  <img
                    src={asset("/images/salon/hero-flower-art.png")}
                    alt="Haute Couture Hand-Drawn Golden Lineart Botanical Flower"
                    className="w-full h-auto object-contain block drop-shadow-[0_0_28px_rgba(234,197,118,0.45)] filter"
                    loading="eager"
                  />
                </picture>

                {/* Subtle Ambient Twinkling Golden Starlight Orbs (Surrounding Mirrored Floral Curves) */}
                <span className="absolute -top-3 right-4 w-2 h-2 rounded-full bg-[#FFE8A3] shadow-[0_0_12px_#FFE8A3,0_0_24px_#D4AF37] animate-pulse opacity-80" />
                <span className="absolute top-1/4 -right-3 w-1.5 h-1.5 rounded-full bg-[#FFDF85] shadow-[0_0_10px_#FFDF85] animate-pulse opacity-70" style={{ animationDelay: "1.2s" }} />
                <span className="absolute top-1/3 -left-2 w-2 h-2 rounded-full bg-[#FFE494] shadow-[0_0_14px_#FFE494,0_0_28px_#D4AF37] animate-pulse opacity-85" style={{ animationDelay: "2.4s" }} />
                <span className="absolute top-1/2 right-2 w-1.5 h-1.5 rounded-full bg-[#FFE8A3] shadow-[0_0_10px_#FFE8A3] animate-pulse opacity-75" style={{ animationDelay: "0.7s" }} />
                <span className="absolute top-2/3 -left-3 w-1.5 h-1.5 rounded-full bg-[#FFDF85] shadow-[0_0_12px_#FFDF85] animate-pulse opacity-70" style={{ animationDelay: "1.9s" }} />
                <span className="absolute bottom-1/4 right-6 w-2 h-2 rounded-full bg-[#FFE494] shadow-[0_0_12px_#FFE494] animate-pulse opacity-80" style={{ animationDelay: "3.1s" }} />
              </motion.div>

              {/* Haute Couture Slideshow with VFX Golden Particle Dissolve & Reassembly */}
              <HeroModelSlideshow
                currentIndex={heroSlideIndex}
                onSelectIndex={setHeroSlideIndex}
              />
            </motion.div>
          </div>
        </div>

        {/* Single Continuous Billowing Satin Silk Wave Across Bottom (Overlaps Jacket Hem Cleanly) */}
        <div className="absolute left-0 right-0 -bottom-px z-30 pointer-events-none">
          <SatinSilkWaveSeam variant="hero-to-body" />
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. ATELIER BODY CANVAS (Sections 1 - 5)                  */}
      {/* ======================================================== */}
      <div
        className="relative overflow-hidden pb-14 sm:pb-20 bg-[#FAF7F2]"
        style={{
          backgroundColor: "#FAF7F2"
        }}
      >
        {/* Continuous Left & Right Billowing Satin Silk Margin Curtains with Golden Botanicals */}
        <LeftSilkMarginCurtain className="hidden xl:block absolute left-0 top-0 bottom-0 w-[105px] 2xl:w-[145px] z-0 opacity-100 pointer-events-none" />
        <RightSilkMarginCurtain className="hidden xl:block absolute right-0 top-0 bottom-0 w-[105px] 2xl:w-[145px] z-0 opacity-100 pointer-events-none" />

        <div className="relative z-10 max-w-[1240px] mx-auto px-5 sm:px-8 pt-6 sm:pt-10 space-y-12 sm:space-y-14">
          {/* ------------------------------------------------------------- */}
          {/* SECTION 1: 3D Clustered Signature Collections (Hover to Unfold) */}
          {/* ------------------------------------------------------------- */}
          <SignatureCollectionsCluster />

          {/* Subtle Divider Rule: — SHOP BY CATEGORY — + Inline MEN | WOMEN | KIDS */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-4 py-1">
              <span className="h-px flex-1 max-w-[140px] bg-[#D8C3B2]" />
              <div className="flex items-center gap-4 text-[9px] tracking-[0.24em] uppercase text-[#8A6D63] font-sans">
                <button
                  type="button"
                  onClick={() =>
                    setInlineCategoryGender((prev) => (prev ? null : activeGender))
                  }
                  className="hover:text-[#45141C] transition-colors cursor-pointer"
                >
                  SHOP BY CATEGORY
                </button>
                <span className="text-[#D8C3B2]" aria-hidden="true">•</span>
                {(["men", "women", "kids"] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      setActiveGender(g);
                      setInlineCategoryGender((prev) => (prev === g ? null : g));
                    }}
                    className={`transition-colors cursor-pointer ${
                      inlineCategoryGender === g
                        ? "text-[#45141C] font-semibold underline underline-offset-4"
                        : "hover:text-[#45141C]"
                    }`}
                  >
                    {g.toUpperCase()}
                  </button>
                ))}
              </div>
              <span className="h-px flex-1 max-w-[140px] bg-[#D8C3B2]" />
            </div>

            <AnimatePresence>
              {inlineCategoryGender && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: EASE_LUXURY }}
                  className="overflow-hidden"
                >
                  <div className="bg-[#FDF9F5] border-[1.5px] border-[#C59347]/65 p-4 sm:p-5 transition-all duration-500 hover:border-[#C59347] hover:shadow-md gold-lined-box">
                    <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-[#EFE3D7]">
                      <span
                        className="text-[15px] tracking-[0.08em] uppercase text-[#321218]"
                        style={{ fontFamily: "var(--font-nevrada), 'Nevrada', var(--font-cormorant), 'Playfair Display', serif" }}
                      >
                        {inlineCategoryGender === "kids" ? "KIDS’ CATEGORY ARCHIVE" : `${inlineCategoryGender.toUpperCase()}’S CATEGORY ARCHIVE`}
                      </span>
                      <button
                        type="button"
                        onClick={() => setInlineCategoryGender(null)}
                        className="text-[9px] tracking-[0.18em] uppercase text-[#8A6D63] hover:text-[#45141C] cursor-pointer"
                      >
                        HIDE
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
                      {getCategoryTiles(inlineCategoryGender).map((tile) => (
                        <button
                          key={tile.name}
                          type="button"
                          onClick={() => {
                            handleCategorySelect(inlineCategoryGender, tile.name);
                            showToast(`Exploring ${inlineCategoryGender.toUpperCase()}’s ${tile.name}`);
                          }}
                          className="group flex flex-col items-center text-center cursor-pointer"
                        >
                          <div className="w-full aspect-[4/3] bg-white border-[1.5px] border-[#C59347]/50 group-hover:border-[#C59347] group-hover:shadow-sm p-1.5 mb-1.5 flex items-center justify-center overflow-hidden transition-all duration-300">
                            <img
                              src={asset(tile.image)}
                              alt={tile.name}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <span
                            className="text-[12px] text-[#321218] group-hover:text-[#6B1F2B] leading-snug"
                            style={{ fontFamily: "var(--font-nevrada), 'Nevrada', var(--font-cormorant), 'Playfair Display', serif" }}
                          >
                            {tile.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ------------------------------- */}
          {/* SECTION 2: New Arrivals          */}
          {/* ------------------------------- */}
          <section id="new-arrivals">
            <div className="flex items-baseline justify-between mb-4">
              <h2
                className="text-[22px] sm:text-[25px] text-[#321218] font-normal font-prata"
                style={{ fontFamily: "var(--font-prata), 'Prata', Georgia, serif" }}
              >
                {activeGender === "kids" ? "New Arrivals • Kids’ Archival Collection" : "New Arrivals • Fresh from the ateliers"}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setActiveCategoryFilter(null);
                  setCustomerSection("catalog");
                  if (typeof window !== "undefined") {
                    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                  }
                }}
                className="inline-flex items-center gap-1 text-[8.5px] tracking-[0.18em] uppercase text-[#6D4F4B] hover:text-[#45141C] font-sans transition-colors cursor-pointer"
              >
                VIEW ALL COLLECTIONS <ArrowRight className="w-2.5 h-2.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(activeGender === "kids" ? KIDS_NEW_ARRIVALS : NEW_ARRIVALS).map((item, idx) =>
                renderProductCard(item, idx, { showFooterBar: true, showRating: false })
              )}
            </div>
          </section>

          {/* ------------------------------- */}
          {/* SECTION 3: Trending Designer     */}
          {/* ------------------------------- */}
          <section id="trending-outfits">
            <div className="flex items-baseline justify-between mb-4">
              <h2
                className="text-[22px] sm:text-[25px] text-[#321218] font-normal font-prata"
                style={{ fontFamily: "var(--font-prata), 'Prata', Georgia, serif" }}
              >
                {activeGender === "kids" ? "Trending Kids’ Designer Outfits" : "Trending Designer Outfits"}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setActiveCategoryFilter(null);
                  setCustomerSection("catalog");
                  if (typeof window !== "undefined") {
                    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                  }
                }}
                className="inline-flex items-center gap-1.5 text-[8.5px] tracking-[0.18em] uppercase font-medium text-[#3B171D] hover:text-[#6B1F2B] font-sans transition-colors cursor-pointer"
              >
                VIEW ALL COLLECTIONS <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(activeGender === "kids" ? KIDS_TRENDING : TRENDING_OUTFITS).map((item, idx) =>
                renderProductCard(item, idx, { showFooterBar: false, showRating: false })
              )}
            </div>
          </section>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* SECTION 4: Continuous Moving Designer Logos Trail Strip       */}
        {/* Full-Bleed: Touching leftmost end to rightmost end of screen  */}
        {/* ------------------------------------------------------------- */}
        <section
          id="designer-ateliers-trail"
          aria-label="Haute Couture Designer Ateliers"
          className="relative w-full my-12 sm:my-14 overflow-hidden"
        >
          <DesignerLogosMarquee />
        </section>

        {/* Lower Discovery Sections (Contained to 1240px) */}
        <div className="relative z-10 max-w-[1240px] mx-auto px-5 sm:px-8 space-y-12 sm:space-y-14">
          {/* ------------------------------- */}
          {/* SECTION 5: Bestsellers           */}
          {/* ------------------------------- */}
          <section id="bestsellers">
            <div className="flex items-baseline justify-between mb-4">
              <h2
                className="text-[22px] sm:text-[25px] text-[#321218] font-normal font-prata"
                style={{ fontFamily: "var(--font-prata), 'Prata', Georgia, serif" }}
              >
                Bestsellers <span className="text-[#8A6D63] mx-1">•</span> Most Coveted Pieces
              </h2>
              <button
                type="button"
                onClick={() => {
                  setActiveCategoryFilter(null);
                  setCustomerSection("catalog");
                  if (typeof window !== "undefined") {
                    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                  }
                }}
                className="inline-flex items-center gap-1 text-[8.5px] tracking-[0.18em] uppercase text-[#6D4F4B] hover:text-[#45141C] font-sans transition-colors cursor-pointer"
              >
                VIEW ALL COLLECTIONS <ArrowRight className="w-2.5 h-2.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {BESTSELLERS.map((item, idx) =>
                renderProductCard(item, idx, { showFooterBar: true, showRating: false })
              )}
            </div>
          </section>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. MARIANA VOSS EDITORIAL FOOTER                         */}
      {/* ======================================================== */}
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

        {/* Mobile-only header crop if needed, or overlay */}
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
              style={{ fontFamily: "var(--font-nevrada), 'Nevrada', var(--font-cormorant), 'Playfair Display', serif" }}
            >
              “
            </span>
            <blockquote
              className="text-[14.5px] sm:text-[15.5px] leading-[1.6] text-[#F7ECE2] font-normal"
              style={{ fontFamily: "var(--font-nevrada), 'Nevrada', var(--font-cormorant), 'Playfair Display', serif" }}
            >
              Design is not just what it looks like and feels like. Design is how it works.
            </blockquote>
            <p className="mt-3 text-[9px] tracking-[0.24em] uppercase text-[#D9BFA4] font-sans">
              — MARIANA VOSS
            </p>
          </div>
        </div>
      </footer>

      {/* ======================================================== */}
      {/* 5. ARCHIVAL LOOKBOOK LIGHTBOX MODAL                      */}
      {/* ======================================================== */}
      <AnimatePresence>
        {lookbookOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLookbookOpen(false)}
            className="fixed inset-0 z-[80] bg-[#1F070B]/85 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.35, ease: EASE_LUXURY }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[780px] bg-[#FAF2E8] border border-[#E0CEBC] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12"
            >
              <div className="md:col-span-6 aspect-[4/4.6] bg-[#3E1017] overflow-hidden">
                <img
                  src={asset(LOOKBOOK_PLATES[lookbookIndex].image)}
                  alt={LOOKBOOK_PLATES[lookbookIndex].title}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="md:col-span-6 p-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] tracking-[0.22em] uppercase text-[#8A6D63] font-sans">
                      {LOOKBOOK_PLATES[lookbookIndex].plate}
                    </span>
                    <button
                      type="button"
                      onClick={() => setLookbookOpen(false)}
                      className="p-1 text-[#6D4F4B] hover:text-[#321218] cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <h3
                    className="mt-4 text-[24px] leading-snug text-[#321218] font-normal font-prata"
                    style={{ fontFamily: "var(--font-prata), 'Prata', Georgia, serif" }}
                  >
                    {LOOKBOOK_PLATES[lookbookIndex].title}
                  </h3>
                  <p className="mt-1 text-[10px] tracking-[0.16em] uppercase text-[#7B524D] font-sans">
                    {LOOKBOOK_PLATES[lookbookIndex].atelier}
                  </p>
                  <p className="mt-4 text-[11.5px] leading-[1.65] text-[#5B423E] font-sans">
                    {LOOKBOOK_PLATES[lookbookIndex].note}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#E6D6C7] space-y-4">
                  <div className="flex items-center justify-between text-[9px] tracking-[0.18em] uppercase font-sans">
                    <button
                      type="button"
                      onClick={() =>
                        setLookbookIndex(
                          (prev) => (prev - 1 + LOOKBOOK_PLATES.length) % LOOKBOOK_PLATES.length
                        )
                      }
                      className="px-3 py-1.5 border border-[#D8C3B2] hover:bg-[#45141C] hover:text-white transition-colors cursor-pointer"
                    >
                      Previous Plate
                    </button>
                    <span className="text-[#8A6D63]">
                      0{lookbookIndex + 1} / 0{LOOKBOOK_PLATES.length}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setLookbookIndex((prev) => (prev + 1) % LOOKBOOK_PLATES.length)
                      }
                      className="px-3 py-1.5 border border-[#D8C3B2] hover:bg-[#45141C] hover:text-white transition-colors cursor-pointer"
                    >
                      Next Plate
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setLookbookOpen(false);
                      onOpenCustomRequest();
                    }}
                    className="w-full py-2.5 bg-[#45141C] hover:bg-[#5E1E28] text-[#FAF3EB] text-[9.5px] tracking-[0.2em] uppercase font-sans transition-colors cursor-pointer"
                  >
                    Commission This Silhouette
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </MotionConfig>
  );
};
