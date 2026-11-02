import { 
  ListedProduct, 
  SoldProduct, 
  DraftProduct, 
  BoostCampaign, 
  CustomOrder, 
  LogisticsOrder,
  DesignerProfile,
  CustomerProfile,
  NotificationItem,
  TransactionRecord,
  SubscriptionInfo
} from "@/types/studio";

export const INITIAL_DESIGNERS: DesignerProfile[] = [
  {
    id: "des-003",
    personalDetails: {
      designerName: "Prathamesh Shinde",
      phoneNumber: "+91 98202 88410",
      email: "prathamesh@atlierhaute.in",
      profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
    },
    brandDetails: {
      brandName: "Prathamesh Atelier Haute Couture",
      logo: "PA",
      brandStory: "Mastering the architecture of regal Indian menswear and royal ceremonial couture. Each royal sherwani and bandhgala is tailored with hand-drawn zardozi, certified Mulberry raw silks, and antique brass filigree buttons.",
      speciality: "Royal Sherwanis, Bandhgalas & Bespoke Groom Ensembles",
      fashionCategories: ["Royal Sherwanis & Bandhgalas", "Contemporary Indo-Western Couture", "Bridal & Heritage Lehengas"],
      coverImage: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?q=80&w=1200&auto=format&fit=crop",
      location: "Bandra West Couture District, Mumbai, MH"
    },
    businessAddress: {
      workshopAddress: "Level 3, The Atelier Pavilion, Waterfield Road, Bandra West",
      pickupAddress: "Ground Logistics Bay, Waterfield Road, Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400050"
    },
    bankDetails: {
      accountNumberMasked: "•••• •••• •••• 1048",
      rawAccountNumber: "50100481921048",
      ifscCode: "HDFC0000019",
      bankName: "HDFC Bank Ltd, Bandra West Branch",
      upiId: "prathamesh.couture@okhdfcbank",
      gstin: "27AABCP1048K1Z2"
    }
  },
  {
    id: "des-004",
    personalDetails: {
      designerName: "Adarsh Makharia",
      phoneNumber: "+91 98110 55219",
      email: "adarsh@adarshcouture.in",
      profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
    },
    brandDetails: {
      brandName: "Adarsh Couture Privée",
      logo: "AM",
      brandStory: "Reviving imperial Mughal and Rajputana embroidery traditions with contemporary sculptural draping. Renowned for hand-beaded bridal lehengas in rose gold tissue, sculpted corset gowns, and heritage sarees.",
      speciality: "Heirloom Bridal Lehengas & Hand-Draped Metallic Tissue Ensembles",
      fashionCategories: ["Bridal & Heritage Lehengas", "Contemporary Indo-Western Couture", "Sarees & Drapes"],
      coverImage: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop",
      location: "Mehrauli Heritage Complex, New Delhi, DL"
    },
    businessAddress: {
      workshopAddress: "Haveli 7, One Style Mile, Mehrauli",
      pickupAddress: "North Gate Logistics Terminal, Mehrauli",
      city: "New Delhi",
      state: "Delhi",
      postalCode: "110030"
    },
    bankDetails: {
      accountNumberMasked: "•••• •••• •••• 9921",
      rawAccountNumber: "001102919921",
      ifscCode: "ICIC0000022",
      bankName: "ICICI Bank, Mehrauli Branch",
      upiId: "adarsh.couture@icici",
      gstin: "07AABCA9921M1Z5"
    }
  },
  {
    id: "des-001",
    personalDetails: {
      designerName: "Rohit K. Balaji",
      phoneNumber: "+91 98201 44920",
      email: "rohit.balaji@ateliercouture.in",
      profilePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
    },
    brandDetails: {
      brandName: "Rohit Balaji Haute Couture",
      logo: "RB",
      brandStory: "Dedicated to reviving ancestral handloom weaves, antique badla zardozi, and architectural draping techniques for modern global patrons.",
      speciality: "Bespoke Bridal Couture & Heritage Indo-Western",
      fashionCategories: ["Bridal & Heritage Lehengas", "Contemporary Indo-Western Couture"],
      coverImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop",
      location: "Kala Ghoda Arts District, Mumbai, MH"
    },
    businessAddress: {
      workshopAddress: "Studio 4B, The Heritage Mill Compound, Senapati Bapat Marg, Lower Parel",
      pickupAddress: "Ground Floor Logistics Dispatch Dock, Senapati Bapat Marg, Lower Parel",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400013"
    },
    bankDetails: {
      accountNumberMasked: "•••• •••• •••• 4902",
      rawAccountNumber: "50100481924902",
      ifscCode: "HDFC0001824",
      bankName: "HDFC Bank Ltd, Lower Parel Branch",
      upiId: "rohitbalaji@okhdfcbank",
      gstin: "27AABCR8192K1Z8"
    }
  },
  {
    id: "des-002",
    personalDetails: {
      designerName: "Kavita Singhal",
      phoneNumber: "+91 98101 22910",
      email: "kavita@singhalatelier.in",
      profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
    },
    brandDetails: {
      brandName: "Maison Singhal",
      logo: "MS",
      brandStory: "Sculptural avant-garde draping meets timeless Kashmiri Aari threadwork and hand-pleated metallic tissue.",
      speciality: "Avant-Garde Pret & Sculptural Capes",
      fashionCategories: ["Contemporary Indo-Western Couture", "Luxury Prêt & Coordinates"],
      coverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
      location: "Mehrauli Heritage Complex, New Delhi, DL"
    },
    businessAddress: {
      workshopAddress: "Courtyard 2, One Style Mile, Mehrauli",
      pickupAddress: "Gate 1 Logistics Bay, Mehrauli",
      city: "New Delhi",
      state: "Delhi",
      postalCode: "110030"
    },
    bankDetails: {
      accountNumberMasked: "•••• •••• •••• 8812",
      rawAccountNumber: "001102918812",
      ifscCode: "ICIC0000011",
      bankName: "ICICI Bank, Connaught Place",
      upiId: "maisonsinghal@icici",
      gstin: "07AABCM9102L1Z4"
    }
  }
];

export const INITIAL_LISTED_PRODUCTS: ListedProduct[] = [
  {
    id: "prod-in-001",
    title: "Royal Zardozi Raw Silk Sherwani & Tissue Stole",
    designerName: "Prathamesh Shinde",
    brandName: "Prathamesh Atelier Haute Couture",
    designerId: "des-003",
    category: "Royal Sherwanis & Bandhgalas",
    subcategory: "Regal Menswear & Royal Groom Wear",
    tags: ["Sherwani", "Zardozi", "Raw Silk", "Royal Menswear", "Prathamesh Atelier", "Indian Groom"],
    price: 145000,
    currency: "INR",
    availableStock: 2,
    initialStock: 4,
    isOneOfOne: false,
    images: [
      "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["38R", "40R", "42R", "Custom Fit"],
    measurements: {
      bust: "40 in",
      waist: "34 in",
      hips: "41 in",
      length: "46 in",
      shoulder: "18.5 in"
    },
    fitType: "Tailored Royal Silhouette",
    stretchability: "No Stretch (Structured Raw Silk)",
    materials: "100% Pure Bangalore Raw Silk, hand-worked antique gold zardozi wire, velvet collar piping",
    lining: "Pure Mulberry silk habotai lining",
    careInstructions: "Specialist royal couture dry clean only. Preserve in cedarwood garment trunk.",
    shippingMode: "Free Shipping",
    packageDimensions: "70 x 55 x 20 cm",
    packageWeight: "2.8 kg",
    status: "ACTIVE",
    isBoosted: true,
    boostExpiry: "2026-12-15",
    viewsCount: 24800,
    orderCount: 16,
    createdAt: "2026-10-28",
    description: "Designed by Prathamesh Shinde, this imperial sherwani features dense floral zardozi wirework along the front placket, mandarin collar, and cuffs. Accompanied by a woven gold tissue safa/stole and tapered silk churidar."
  },
  {
    id: "prod-in-002",
    title: "Heirloom Rose Gold Tissue Silk Bridal Lehenga",
    designerName: "Adarsh Makharia",
    brandName: "Adarsh Couture Privée",
    designerId: "des-004",
    category: "Bridal & Heritage Lehengas",
    subcategory: "Bridal Lehengas & Sets",
    tags: ["Bridal Lehenga", "Rose Gold", "Tissue Silk", "Cutdana", "Adarsh Couture", "Indian Bride"],
    price: 195000,
    currency: "INR",
    availableStock: 1,
    initialStock: 2,
    isOneOfOne: true,
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["Custom Bespoke Fit", "S", "M"],
    measurements: {
      bust: "34-37 in",
      waist: "28-31 in",
      hips: "38-41 in",
      length: "44 in"
    },
    fitType: "Custom Fit",
    stretchability: "Adjustable drawstring waistband",
    materials: "Handloom Banarasi tissue silk, fine cutdana, Austrian crystals, micro seed pearls",
    lining: "Double silk satin lining with four-tier structured petticoat",
    careInstructions: "Museum archival bridal conservation clean only.",
    shippingMode: "Free Shipping",
    packageDimensions: "75 x 60 x 25 cm",
    packageWeight: "4.2 kg",
    status: "ACTIVE",
    isBoosted: true,
    boostExpiry: "2026-12-20",
    viewsCount: 38200,
    orderCount: 42,
    createdAt: "2026-10-30",
    description: "The crown jewel of Adarsh Makharia's bridal salon. Over 480 artisan hours of intricate floral needlecraft in antique rose gold threads, paired with a matching structured blouse and dual dupattas."
  },
  {
    id: "prod-in-003",
    title: "Hand-Draped Metallic Tissue Saree Gown with Boned Corset",
    designerName: "Adarsh Makharia",
    brandName: "Adarsh Couture Privée",
    designerId: "des-004",
    category: "Contemporary Indo-Western Couture",
    subcategory: "Sculptural Saree Drapes & Gowns",
    tags: ["Metallic Tissue", "Draped Saree Gown", "Boned Corset", "Contemporary Indo-Western", "Adarsh Couture"],
    price: 115000,
    currency: "INR",
    availableStock: 3,
    initialStock: 5,
    isOneOfOne: false,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["XS", "S", "M", "L"],
    measurements: {
      bust: "35 in",
      waist: "27 in",
      hips: "38 in",
      length: "58 in"
    },
    fitType: "Sculpted Hourglass",
    stretchability: "Internal lacing with 2-inch expansion range",
    materials: "Liquid metallic gold organza tissue, satin crepe pallu, 14-channel spiral boning",
    lining: "Italian cupro breathable lining",
    careInstructions: "Delicate dry clean only. Steam low.",
    shippingMode: "Free Shipping",
    packageDimensions: "55 x 40 x 14 cm",
    packageWeight: "1.6 kg",
    status: "ACTIVE",
    isBoosted: false,
    viewsCount: 19800,
    orderCount: 29,
    createdAt: "2026-10-25",
    description: "Contemporary Indian glamour reimagined by Adarsh Makharia. Pre-pleated metallic liquid drape falls gracefully into a floor-sweeping trail, anchored by a sheer boned micro-pearl corset."
  },
  {
    id: "prod-in-004",
    title: "Obsidian Velvet Jodhpuri Bandhgala with Antique Brass Buttons",
    designerName: "Prathamesh Shinde",
    brandName: "Prathamesh Atelier Haute Couture",
    designerId: "des-003",
    category: "Royal Sherwanis & Bandhgalas",
    subcategory: "Bandhgalas & Formal Royal Suits",
    tags: ["Bandhgala", "Micro-Velvet", "Obsidian Black", "Antique Gold Buttons", "Prathamesh Atelier", "Indian Menswear"],
    price: 88000,
    currency: "INR",
    availableStock: 4,
    initialStock: 6,
    isOneOfOne: false,
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["38", "40", "42", "44", "Custom Fit"],
    measurements: {
      bust: "41 in",
      waist: "35 in",
      shoulder: "18 in",
      length: "31 in"
    },
    fitType: "Precision Architectural Cut",
    stretchability: "No Stretch",
    materials: "Midnight black plush Italian micro-velvet, cast antique brass crest buttons",
    lining: "Pure silk twill inner lining with concealed ticket and phone pockets",
    careInstructions: "Specialist velvet dry clean only.",
    shippingMode: "Free Shipping",
    packageDimensions: "50 x 40 x 12 cm",
    packageWeight: "1.8 kg",
    status: "ACTIVE",
    isBoosted: false,
    viewsCount: 16700,
    orderCount: 34,
    createdAt: "2026-10-20",
    description: "Tailored to razor-sharp sartorial perfection by Prathamesh Shinde. Features a high stand collar, discreet pocket square slot, and crested handcrafted metallic buttons honoring royal equestrian uniforms."
  },
  {
    id: "prod-in-005",
    title: "Crimson Maharani Kalidar Velvet Lehenga with Heritage Dupatta",
    designerName: "Prathamesh & Adarsh Master Collaboration",
    brandName: "Atelier Maison Privée (Prathamesh x Adarsh)",
    designerId: "des-003",
    category: "Bridal & Heritage Lehengas",
    subcategory: "Masterpiece Royal Bridal Ensembles",
    tags: ["Crimson Velvet", "Kalidar Lehenga", "Badla Zardozi", "Heirloom Red", "Collab Exclusive", "Indian Bride"],
    price: 260000,
    currency: "INR",
    availableStock: 1,
    initialStock: 1,
    isOneOfOne: true,
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["Bespoke 1-of-1 Fit"],
    measurements: {
      bust: "35 in",
      waist: "29 in",
      hips: "40 in",
      length: "45 in"
    },
    fitType: "Grand Royal Kalidar",
    stretchability: "Bespoke Fitting Included",
    materials: "Micro-velvet in deep crimson red, real silver badla wire dipped in 24k gold wash",
    lining: "Quilted silk taffeta can-can structure with gold gota trim",
    careInstructions: "Preserve in archival bridal trunk. Atelier cleaning service included for lifetime.",
    shippingMode: "Free Shipping",
    packageDimensions: "80 x 60 x 30 cm",
    packageWeight: "5.1 kg",
    status: "ACTIVE",
    isBoosted: true,
    boostExpiry: "2026-12-31",
    viewsCount: 42100,
    orderCount: 8,
    createdAt: "2026-11-01",
    description: "An exceptional joint masterwork designed collaboratively by Prathamesh Shinde and Adarsh Makharia. Displays 16 kalis with authentic heritage motifs, accompanied by an embroidered velvet odhani and sheer tulle veil."
  },
  {
    id: "prod-001",
    title: "Sculpted Duchesse Silk Evening Gown",
    designerName: "Rohit K. Balaji",
    brandName: "Rohit Balaji Haute Couture",
    designerId: "des-001",
    category: "Contemporary Indo-Western Couture",
    subcategory: "Evening Gowns",
    tags: ["Duchesse Silk", "Sculpted", "Black Cherry", "Heritage Couture"],
    price: 84000,
    currency: "INR",
    availableStock: 1,
    initialStock: 1,
    isOneOfOne: true,
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "Custom Fit"],
    measurements: {
      bust: "34.5 in",
      waist: "26.0 in",
      hips: "36.5 in",
      length: "58.0 in"
    },
    fitType: "Sculpted Couture",
    stretchability: "No Stretch (Structured)",
    materials: "100% Heavy Silk Duchesse in deep black cherry hue",
    lining: "Double-layered silk habotai lining",
    careInstructions: "Specialist couture dry clean only. Preserve in archival garment trunk.",
    shippingMode: "Free Shipping",
    packageDimensions: "65 x 50 x 20 cm",
    packageWeight: "2.4 kg",
    status: "ACTIVE",
    isBoosted: false,
    viewsCount: 14200,
    orderCount: 38,
    createdAt: "2026-04-12",
    description: "An architectural tour-de-force sculpted from heavy Italian duchesse silk in a signature black cherry hue. Internal boned corsetry creates a dramatic hourglass line."
  },
  {
    id: "prod-002",
    title: "Plissé Organza Architectural Trench",
    designerName: "Rohit K. Balaji",
    brandName: "Rohit Balaji Haute Couture",
    designerId: "des-001",
    category: "Luxury Prêt & Coordinates",
    subcategory: "Outerwear & Trenches",
    tags: ["Plissé", "Organza", "Trench", "Champagne"],
    price: 4950,
    currency: "INR",
    availableStock: 3,
    initialStock: 5,
    isOneOfOne: false,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMYj5z3PhbFf53UxIcwvaM1gNSEUHTyJTWAs-w48Qju0sDklV7jbypefsSPrMh9e0xbwnHltH4NfnrrE63BgbmPovvRZDYnE-sBtthlZ2Oa_kaprP2hHmVQaMnOBlAirSf6LcSZE2PGYgcFQJrsBkXrCiEDnW54eHBQ7dGUklsNsachRKz6BGobIi0X967rwuXaOFqwcxyRdIqUxFD-GpmvCJPHSWPShGcVSQe0-M",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L"],
    measurements: {
      bust: "36 in",
      waist: "30 in",
      length: "46 in",
      shoulder: "15 in"
    },
    fitType: "Architectural Oversized",
    stretchability: "No Stretch",
    materials: "Micro-pleated Japanese silk organza with hand-buffed leather hardware",
    lining: "Unlined translucent sheer finish",
    careInstructions: "Delicate dry clean. Steam on low silk temperature.",
    shippingMode: "Free Shipping",
    packageDimensions: "45 x 35 x 10 cm",
    packageWeight: "1.1 kg",
    status: "ACTIVE",
    isBoosted: false,
    viewsCount: 11800,
    orderCount: 42,
    createdAt: "2026-04-15",
    description: "Sheer plissé organza trench with fluid architectural movement. Features a wide cinched saddle leather belt and storm flap overlays."
  },
  {
    id: "prod-003",
    title: "Beaded Velvet Corset & Wool Trousers",
    designerName: "Rohit K. Balaji",
    brandName: "Rohit Balaji Haute Couture",
    designerId: "des-001",
    category: "Contemporary Indo-Western",
    subcategory: "Runway Ensembles",
    tags: ["Runway", "Velvet Corset", "Wool Trousers", "Bronze Beaded"],
    price: 6200,
    currency: "INR",
    availableStock: 2,
    initialStock: 4,
    isOneOfOne: false,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBX6Kw9D1kmVql_Zc24BlHmv7W1UVOEtwdBCFdltWBNCkIaT3u-gdlpS6K8BxIKtVNngOgBo1hRnM1zV0zNiWhkAqkR_hY6cKKrgs3zv_0LX-7VXw3jouf7uXEG-bOm-sBD2rcT83OA9rxeWMGs1257cMhpMue3S12Vv9H4W_hdkA-skF7rSKeERwEdwCvedPa_VTRSidj6Y0w6qN_XpPkSBEhpMIxcJCQak3ZNGFw",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["XS", "S", "M"],
    measurements: {
      bust: "34 in",
      waist: "26 in",
      hips: "37 in",
      length: "42 in"
    },
    fitType: "Tailored Regular",
    stretchability: "Slight Give (Corset lacing back)",
    materials: "Midnight black velvet, bronze glass micro-beads, fine worsted wool",
    lining: "Heavy satin structural lining with internal boning",
    careInstructions: "Specialist luxury dry clean.",
    shippingMode: "Free Shipping",
    packageDimensions: "50 x 40 x 12 cm",
    packageWeight: "1.9 kg",
    status: "ACTIVE",
    isBoosted: true,
    boostExpiry: "2026-11-20",
    viewsCount: 16500,
    orderCount: 54,
    createdAt: "2026-04-18",
    description: "Avant-garde runway ensemble pairing a midnight velvet corset encrusted with bronze beadwork with flowing wide-leg wool trousers."
  },
  {
    id: "prod-004",
    title: "Cashmere Double-Faced Capelet",
    designerName: "Rohit K. Balaji",
    brandName: "Rohit Balaji Haute Couture",
    designerId: "des-001",
    category: "Luxury Prêt & Coordinates",
    subcategory: "Capes & Wraps",
    tags: ["Cashmere", "Double-Faced", "Capelet", "Winter Luxury"],
    price: 3100,
    currency: "INR",
    availableStock: 4,
    initialStock: 6,
    isOneOfOne: false,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDwiXXo_ER8TYeiaz9W7jy2kJW3GLys7h1Hfsnh0hFfZc0lCigxrEpM-YrVwnqhX-ABFghY5Zrbhl0c5mqLR4CJcy0QAuuOhm3pT4eAiXpyBwX0VL_o-ygOT4FdH4uht6httxXYkbtzr74C0gRRJheH2RpIa0jX8ILH_olwxf9C1-hoJx65hgtyxBRYCVG0Wdpvd1xOKQDeQjlHuyM5yLi7YNHB5AmliGHRiAGPqpg",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["One Size"],
    measurements: {
      length: "28 in"
    },
    fitType: "Draped Regular",
    stretchability: "Natural Stretch",
    materials: "100% Pure Mongolian Double-Faced Cashmere",
    lining: "Self-finished reversible construction",
    careInstructions: "Specialist wool & cashmere dry clean only.",
    shippingMode: "Free Shipping",
    packageDimensions: "40 x 30 x 8 cm",
    packageWeight: "0.9 kg",
    status: "ACTIVE",
    isBoosted: false,
    viewsCount: 9400,
    orderCount: 68,
    createdAt: "2026-04-20",
    description: "Minimalist luxury capelet sculpted from double-faced cashmere with hand-finished concealed horn button fastenings."
  },
  {
    id: "prod-005",
    title: "Structured Moire Faille Ball Skirt",
    designerName: "Rohit K. Balaji",
    brandName: "Rohit Balaji Haute Couture",
    designerId: "des-001",
    category: "Couture & Gowns",
    subcategory: "Ball Skirts & Drapes",
    tags: ["Moire Faille", "Voluminous", "Ball Skirt", "Grand Soiree"],
    price: 5800,
    currency: "INR",
    availableStock: 1,
    initialStock: 2,
    isOneOfOne: true,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDDDkqDfj5QonkCp6SNFxWPpgFOQJ_WOJPcNVNZ9DLkr5W7F55sqV6ywhESsnj3C5jnbr5g6jefeJvQ2BTEaCxgmjwdXGtNhFxlPMwCo8zJgyo_Es8ulHw3BVnTDFGx1KcsUZE1FZYwH0MUFB0_NJsedMUEHR-a4ytyJuDWQTpD-0JrGXLoWpK-q3paWpopKVJaBfvSJtR0Skhb4CA-vCMhkjKo9TnMFOPrxeiQHVw",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["S", "M"],
    measurements: {
      waist: "27.5 in",
      length: "48 in"
    },
    fitType: "Structured Ballgown",
    stretchability: "No Stretch",
    materials: "Heavy Silk-Blend Moire Faille with internal horsehair braid hem",
    lining: "Mulberry silk taffeta with micro-tulle support petticoat",
    careInstructions: "Archival dry clean only.",
    shippingMode: "Free Shipping",
    packageDimensions: "60 x 50 x 25 cm",
    packageWeight: "3.2 kg",
    status: "ACTIVE",
    isBoosted: false,
    viewsCount: 13200,
    orderCount: 19,
    createdAt: "2026-04-25",
    description: "Dramatic voluminous ball skirt crafted from deep burgundy moire faille with sculpted folds and deep concealed side pockets."
  },
  {
    id: "prod-006",
    title: "Hand-Embroidered Chantilly Bodice",
    designerName: "Rohit K. Balaji",
    brandName: "Rohit Balaji Haute Couture",
    designerId: "des-001",
    category: "Lehengas & Sets",
    subcategory: "Bridal Bodices",
    tags: ["Chantilly Lace", "Seed Pearls", "Bridal Bodice", "Bespoke"],
    price: 7200,
    currency: "INR",
    availableStock: 3,
    initialStock: 4,
    isOneOfOne: false,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJRLXjP4uCpHRHRrVfV4nfwzt3sv26XTYAOJrZ6W5s2yQh7Wfe54cz4XaMIDz65FeiRW9dWohDI4J3EExkC4i9gsjEX2Wu8HirdK3eauBJYPETA1Tk0qtKicFuNEdVtx9XoA-jt8YKhlf0hbnb4sCHmwatdqWKPdl2e7PptQ7juWKiMU8zKhJtBcIY3mdXz9cWXFYcF-qkx7EMdD6ssFFNHTrj_ZW-0gF9k6s60vg",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["XS", "S", "M", "Custom Fit"],
    measurements: {
      bust: "35 in",
      waist: "27 in",
      length: "17 in"
    },
    fitType: "Precision Corsetry",
    stretchability: "Adjustable back eyelets",
    materials: "French Chantilly lace, cultured freshwater seed pearls, silk tulle foundation",
    lining: "Double-layered silk georgette foundation",
    careInstructions: "Specialist bridal conservator clean only.",
    shippingMode: "Free Shipping",
    packageDimensions: "40 x 30 x 10 cm",
    packageWeight: "0.8 kg",
    status: "ACTIVE",
    isBoosted: false,
    viewsCount: 18900,
    orderCount: 81,
    createdAt: "2026-04-28",
    description: "An ethereal bridal bodice worked in French Chantilly lace, hand-encrusted with over 1,200 freshwater seed pearls and micro-crystals."
  },
  {
    id: "prod-007",
    title: "Pastel Rose Quartz Lehenga Set in Tulle",
    designerName: "Rohit K. Balaji",
    brandName: "Rohit Balaji Haute Couture",
    designerId: "des-001",
    category: "Lehengas & Sets",
    subcategory: "Bridal & Festive Lehengas",
    tags: ["Bridal", "Tulle", "Pastel", "Cutdana Work", "Modern Heritage"],
    price: 24000,
    currency: "INR",
    availableStock: 4,
    initialStock: 6,
    isOneOfOne: false,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["Custom Fit", "M", "L"],
    measurements: {
      bust: "34-38 in",
      waist: "28-32 in",
      hips: "38-42 in",
      length: "44 in"
    },
    fitType: "Custom Fit",
    stretchability: "Slight Give (1-2%)",
    materials: "Hand-pleated French tulle, micro-pearl embellishment, silver zari",
    lining: "Four-layered organza and satin silk can-can underskirt",
    careInstructions: "Delicate couture dry clean. Store flat, away from direct sunlight.",
    shippingMode: "Free Shipping",
    packageDimensions: "65 x 50 x 20 cm",
    packageWeight: "3.8 kg",
    status: "ACTIVE",
    isBoosted: true,
    boostExpiry: "2026-11-15",
    viewsCount: 10200,
    orderCount: 285,
    createdAt: "2026-04-20",
    description: "Constructed with over 80 meters of multi-layered French tulle drenched in champagne rose quartz hues. Hand-embroidered with micro-pearls and silver cutdana."
  },
  {
    id: "prod-008",
    title: "Velvet Embroidered Anarkali Ensemble in Royal Wine",
    designerName: "Rohit K. Balaji",
    brandName: "Rohit Balaji Haute Couture",
    designerId: "des-001",
    category: "Couture & Gowns",
    subcategory: "Heritage Gowns",
    tags: ["Royal Velvet", "Antique Gold", "A-Line", "Winter Couture"],
    price: 18000,
    currency: "INR",
    availableStock: 7,
    initialStock: 10,
    isOneOfOne: false,
    images: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["XS", "S", "M", "XL"],
    measurements: {
      bust: "36 in",
      waist: "31 in",
      length: "56 in",
      shoulder: "15 in"
    },
    fitType: "Tailored Regular",
    stretchability: "No Stretch (Structured)",
    materials: "Micro-velvet with hand-embroidered antique marodi and pita work",
    lining: "Pure spun silk interior lining",
    careInstructions: "Professional steam and velvet dry clean only.",
    shippingMode: "Shipping Paid by Customer",
    packageDimensions: "50 x 40 x 12 cm",
    packageWeight: "2.1 kg",
    status: "ACTIVE",
    isBoosted: false,
    viewsCount: 8900,
    orderCount: 240,
    createdAt: "2026-05-01",
    description: "Draped in deep wine micro-velvet with hand-worked marodi border accents. Includes structured silhouette flare designed for autumn and winter soirees."
  },
  {
    id: "prod-009",
    title: "One-of-One Sculptural Metallic Organza Cape & Corset",
    designerName: "Kavita Singhal",
    brandName: "Maison Singhal",
    designerId: "des-002",
    category: "Contemporary Indo-Western",
    subcategory: "Avant-Garde Couture",
    tags: ["One of One", "Sculptural", "Organza", "Runway Piece"],
    price: 45000,
    currency: "INR",
    availableStock: 1,
    initialStock: 1,
    isOneOfOne: true,
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["Custom Bespoke"],
    measurements: {
      bust: "34-36 in",
      waist: "27-29 in",
      length: "Floor Length"
    },
    fitType: "Custom Fit",
    stretchability: "No Stretch (Structured)",
    materials: "Heat-pressed iridescent organza with boned inner corset",
    lining: "Duchess satin structural foundation",
    careInstructions: "Archive piece. Clean by bespoke couture specialist.",
    shippingMode: "Free Shipping",
    packageDimensions: "60 x 50 x 15 cm",
    packageWeight: "1.4 kg",
    status: "ACTIVE",
    isBoosted: true,
    boostExpiry: "2026-11-20",
    viewsCount: 15400,
    orderCount: 1,
    createdAt: "2026-05-10",
    description: "An authentic museum runway masterwork. Sculpted from micro-pleated heat-molded iridescent organza over a structured satin foundation."
  },
  {
    id: "prod-010",
    title: "Handloom Banarasi Katan Silk Saree in Emerald & Burnished Gold",
    designerName: "Rohit K. Balaji",
    brandName: "Rohit Balaji Haute Couture",
    designerId: "des-001",
    category: "Sarees & Drapes",
    subcategory: "Handloom Weaves",
    tags: ["Handloom", "Banarasi", "Emerald Gold", "Collector"],
    price: 38500,
    currency: "INR",
    availableStock: 0,
    initialStock: 2,
    isOneOfOne: false,
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: ["Free Size (6.3m with Blouse Piece)"],
    measurements: {
      length: "6.3 meters"
    },
    fitType: "Relaxed Silhouette",
    stretchability: "No Stretch (Structured)",
    materials: "Pure Katan Silk with hand-chased zari weft",
    lining: "Unlined handloom drape",
    careInstructions: "Specialist couture dry clean only.",
    shippingMode: "Free Shipping",
    packageDimensions: "40 x 30 x 6 cm",
    packageWeight: "850 g",
    status: "SOLD_OUT",
    isBoosted: false,
    viewsCount: 19400,
    orderCount: 2,
    createdAt: "2026-03-28",
    description: "Woven over 180 hours on ancestral pit looms in Varanasi. Features intricate hunting (shikargah) motifs in fine real gold zari threads. Available for custom re-order requests."
  }
];

export const INITIAL_SOLD_PRODUCTS: SoldProduct[] = [
  {
    id: "sold-001",
    productId: "prod-001",
    title: "Hand-Embroidered Zardozi Corset Top",
    category: "Couture & Gowns",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpcAlaTyWy2x6gGCpdoIgHDYcZFIqpJnDPzJM4hHAHbLPcqDcXENZEkfIadfx2ILjeBM_A5GOVJ4oCBPK9zcDPYvHEAeX8i8wGTFkO2z-R4tyUmsu2qjA5wy06zR2H7_l6ktkaeQV9QjxB--fUpuAd6-CbDPd6GFBUZjYhUijKIwVUMa5RX9_ughCO-4jrT20tPw_3C5KUWwC7dhILY0gCro9yfCD0svD3631C-oA",
    soldPrice: 85000,
    currency: "INR",
    soldDate: "14 Oct 2024",
    customerCity: "South Mumbai, MH",
    orderNumber: "ORD-9082",
    archiveCode: "#MP-SL-9082",
    collectionName: "Autumn/Winter 2024 Collection • 1 of 1 Bespoke",
    editionNumber: "Master Atelier Piece #01",
    dispatchReference: "BLUEDART-EXP-94021"
  },
  {
    id: "sold-002",
    productId: "prod-002",
    title: "Silk Organza Fluted Ball Gown",
    category: "Couture & Gowns",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBN4ug9rs-XUsRGDdbqNQmrUFZuyuCi0HOt1g4sC9VW2S6Qo7gj-KXlvIx7CaYz5VBAs7qqzg9bd6U8RbiBv-GQzKtfjqN-W8wbv7sScAj-gdKUiHmXWOxIpzFs92IYwPXkN77o11CK_oU9Yn9EiTVXkzwo6T5WxMQ7CgJ239CwZhmz7Wg7tiZBaObppG2bCjnz7x9axcFDvb5NBaD4danWIZoGbUaVHaUPeCIHzqY",
    soldPrice: 112000,
    currency: "INR",
    soldDate: "28 Sep 2024",
    customerCity: "London, Mayfair",
    orderNumber: "ORD-8920",
    archiveCode: "#MP-SL-8920",
    collectionName: "Summer Grand Gala 2024 • Bespoke Commission",
    editionNumber: "Salon Bespoke Commission",
    dispatchReference: "DHL-EXPRESS-77120"
  },
  {
    id: "sold-003",
    productId: "prod-003",
    title: "Bespoke Cutwork Velvet Sherwani Cape",
    category: "Sherwanis & Bandhgalas",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXvFJS88uN9eHdfkoWLZcTw74IAXlybFsefPUqeMRM8dCx6wbtiOd9ehgO75WR0wuh5_gdG6KxSBxbxOhVMGxh2eyRqoXqT-WYalAKe8Zbw4WbZlWvBfkB7TLgZehOqM07k9Mt52jriAP7pLYryy_CZDNKdx0cCn8iStehB-qFTEohMN-yEdzRRCvkyK70OATv2SXzCcnFN3XkD5YtlOokVsSvs59FWsPBcRyBLFI",
    soldPrice: 65000,
    currency: "INR",
    soldDate: "19 Aug 2024",
    customerCity: "New Delhi, DL",
    orderNumber: "ORD-8419",
    archiveCode: "#MP-SL-8419",
    collectionName: "Winter Capsule 2024 • Master Collection",
    editionNumber: "Master Collection #02",
    dispatchReference: "FEDEX-IND-90214"
  },
  {
    id: "sold-004",
    productId: "prod-004",
    title: "Pleated Moiré Faille Column Skirt",
    category: "Contemporary Indo-Western",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYR3-BUz5Bw_MrmHUjFZ9fHsnCPd28FPuZMt0wS1W-kEm3HYzUNNN5PqbaC07oLkSp3Vkjr9FNQKCWk6thZreP7WzVyaS_kcIw6fsbVLoch1dbG4sLf0Fybk0p2NtWnfWEp-DplRw4RhdhUCSnQlmwF8r3iYf2ChXoHkOGEORaZlFDSbscec86Ky1byQylKb-Jdn8VUA_5xRIVVHD4zw5bVEvowbzod0-uWnoYbMg",
    soldPrice: 32500,
    currency: "INR",
    soldDate: "02 Jul 2024",
    customerCity: "Paris, France",
    orderNumber: "ORD-7933",
    archiveCode: "#MP-SL-7933",
    collectionName: "Spring 2024 • Limited Series 1 of 3",
    editionNumber: "Limited Series 1 of 3",
    dispatchReference: "DHL-PARIS-55219"
  },
  {
    id: "sold-005",
    productId: "prod-005",
    title: "Chantilly Lace Corseted Bodice",
    category: "Luxury Prêt & Coordinates",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4UwikLMaPSvPBizFF-BBLO4IgZhRAb-0JBNEExlE2weJZjt3GaWRbPORGpAR6dSR-aGltvtOH5b6Gp2cSJn3yKvalQLr17PJQPH4pbe1A1b_1gR2ADL9elKtajrIOuVqB8ihBZtYA8cVdF4jvcVlVBrfgQArLWCkq5mEw0nZEcM0nWARhHAnjmSXSnHZHcV4HwpewTCbuwiIQDWW1mMHh166onZPdvEtjMWo7gb8",
    soldPrice: 47500,
    currency: "INR",
    soldDate: "11 May 2024",
    customerCity: "Bengaluru, KA",
    orderNumber: "ORD-7104",
    archiveCode: "#MP-SL-7104",
    collectionName: "Spring/Summer 2024 • Custom Fitted Archival",
    editionNumber: "Custom Fitted Archival",
    dispatchReference: "BLUEDART-EXP-66291"
  },
  {
    id: "sold-006",
    productId: "prod-006",
    title: "Sculpted Duchesse Silk Evening Gown",
    category: "Couture & Gowns",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBN4ug9rs-XUsRGDdbqNQmrUFZuyuCi0HOt1g4sC9VW2S6Qo7gj-KXlvIx7CaYz5VBAs7qqzg9bd6U8RbiBv-GQzKtfjqN-W8wbv7sScAj-gdKUiHmXWOxIpzFs92IYwPXkN77o11CK_oU9Yn9EiTVXkzwo6T5WxMQ7CgJ239CwZhmz7Wg7tiZBaObppG2bCjnz7x9axcFDvb5NBaD4danWIZoGbUaVHaUPeCIHzqY",
    soldPrice: 92000,
    currency: "INR",
    soldDate: "18 Apr 2024",
    customerCity: "Hyderabad, TS",
    orderNumber: "ORD-6891",
    archiveCode: "#MP-SL-6891",
    collectionName: "Winter Capsule 2023 • Salon Acquisition",
    editionNumber: "Salon Acquisition #01",
    dispatchReference: "BLUEDART-HYD-44812"
  }
];

export const INITIAL_DRAFTS: DraftProduct[] = [
  {
    id: "draft-001",
    title: "Hand-Embroidered Zardozi Corset Top",
    draftCode: "#DRF-2024-0941",
    category: "Couture & Gowns",
    subcategory: "Couture Outerwear & Tops",
    tags: ["Zardozi", "Silk Organza", "Artisanal", "Bespoke"],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDk5xhkx_XVn2e4O1zWecyzNqsj2_tvVrM-YpQHiQXGvJbod3yanKisYTY0Z_36SwipCTbEU7YDFBgeDJwVAeo-H8CuhXZ3bYHhmSGkb7qFTLSzvrIeke5_RC4GFpPxV24vfB5Ke6JRt5koFIwXWKQmvlqBiQ20bozyEbK06y7p8hGyAJZSJilXCIKEXfnOtqd97lcAFuhD4DPtgTJhE-Xd2qCHtjqmoEor2HgnL_w"
    ],
    photoSetCount: 4,
    currentStep: 4,
    lastSaved: "Saved 18 minutes ago (Today at 14:32)",
    price: 45000,
    isOneOfOne: true,
    availableStock: 1,
    formData: {
      title: "Hand-Embroidered Zardozi Corset Top",
      category: "Couture & Gowns",
      subcategory: "Corsets & Bodices",
      tags: ["Zardozi", "Silk Organza", "Artisanal", "Bespoke"],
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDk5xhkx_XVn2e4O1zWecyzNqsj2_tvVrM-YpQHiQXGvJbod3yanKisYTY0Z_36SwipCTbEU7YDFBgeDJwVAeo-H8CuhXZ3bYHhmSGkb7qFTLSzvrIeke5_RC4GFpPxV24vfB5Ke6JRt5koFIwXWKQmvlqBiQ20bozyEbK06y7p8hGyAJZSJilXCIKEXfnOtqd97lcAFuhD4DPtgTJhE-Xd2qCHtjqmoEor2HgnL_w"
      ],
      standardSizes: ["S", "M", "Custom"],
      measurements: {
        bust: "34.5 in",
        waist: "26.0 in",
        hips: "36.5 in",
        length: "18.0 in"
      },
      fitType: "Tailored Regular",
      stretchability: "No Stretch (Structured)",
      isOneOfOne: true,
      quantity: 1,
      materials: "100% Pure Mulberry Silk Organza, Gold Zardozi Metallic Thread",
      lining: "Double-layered Heavy Duchess Satin (Pure Silk)",
      careInstructions: "Specialist archival dry clean only by luxury textile restorer.",
      price: 45000,
      shippingMode: "Free Shipping",
      packageDimensions: "45 x 35 x 15 cm",
      packageWeight: "1.8 kg"
    }
  },
  {
    id: "draft-002",
    title: "Crimson Raw Silk Angrakha Jacket",
    draftCode: "#DRF-2024-0812",
    category: "Sherwanis & Bandhgalas",
    subcategory: "Bespoke Suiting & Tunics",
    tags: ["Raw Silk", "Crimson", "Angrakha", "Handloom"],
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBYqy-Z8m7UGurmBsNo093jiPLhTDzOI5ODlwlAy94IFHLNHO0c73LNqz1lbQEixmd_bQCfFF04Ycet4Wpq9ald8zVSQIJhQNjPN97tJ_M91Z4aRp082_sfjvTyXjdsCqVjb1xtUueUYyn4HNuMCDDVdfNGus8Q-9HpimdVRu8rfDdgBpfx8FPn_ZO_1CGF1qWx7ILbd2vSZMK_1QSbA6xG36oslY4H1kHV-9x5rUE"
    ],
    photoSetCount: 1,
    currentStep: 2,
    lastSaved: "Saved yesterday at 19:45",
    price: 0,
    isOneOfOne: false,
    availableStock: 3,
    formData: {
      title: "Crimson Raw Silk Angrakha Jacket",
      category: "Sherwanis & Bandhgalas",
      subcategory: "Bespoke Suiting & Tunics",
      tags: ["Raw Silk", "Crimson", "Angrakha"],
      images: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBYqy-Z8m7UGurmBsNo093jiPLhTDzOI5ODlwlAy94IFHLNHO0c73LNqz1lbQEixmd_bQCfFF04Ycet4Wpq9ald8zVSQIJhQNjPN97tJ_M91Z4aRp082_sfjvTyXjdsCqVjb1xtUueUYyn4HNuMCDDVdfNGus8Q-9HpimdVRu8rfDdgBpfx8FPn_ZO_1CGF1qWx7ILbd2vSZMK_1QSbA6xG36oslY4H1kHV-9x5rUE"
      ],
      standardSizes: ["38", "40", "42"],
      measurements: {
        bust: "40 in",
        waist: "34 in",
        length: "42 in"
      },
      fitType: "Tailored Regular",
      stretchability: "No Stretch (Structured)",
      isOneOfOne: false,
      quantity: 3,
      materials: "Pure textured raw silk with antique gold button accents",
      lining: "Mulberry silk lining",
      careInstructions: "Specialist dry clean only.",
      price: 0,
      shippingMode: "Free Shipping",
      packageDimensions: "45 x 35 x 10 cm",
      packageWeight: "1.2 kg"
    }
  },
  {
    id: "draft-003",
    title: "Untitled Creation #3",
    draftCode: "#DRF-2024-0705",
    category: "Couture & Gowns",
    subcategory: "Uncategorized Draft",
    tags: ["Inception", "Draft"],
    images: [],
    photoSetCount: 0,
    currentStep: 1,
    lastSaved: "Saved 4 days ago (11 Oct 2024)",
    price: 0,
    isOneOfOne: false,
    availableStock: 1,
    formData: {
      title: "Untitled Creation #3",
      category: "Couture & Gowns",
      subcategory: "Uncategorized Draft",
      tags: [],
      images: [],
      standardSizes: [],
      price: 0,
      shippingMode: "Free Shipping"
    }
  }
];

export const INITIAL_BOOST_CAMPAIGNS: BoostCampaign[] = [
  {
    id: "boost-001",
    productId: "prod-001",
    productTitle: "Hand-Embroidered Zardozi Corset Top",
    productImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJ9iUA0YDwesv-FQx9_eLdr6Afz24Nb00i6OC-rLOiWZASN3XxRqcKVU81o4vV0_w5y2hSM0nooj-PEuO1m8ti2K3-6hF2OLu6ZynKbGFGhs4URKYDKAxsX_qFk5pAEBVi_962o_Z0bnLUCNP_AlxFOviI6C32TJrapXhjUJI4G3BOEiCCgHLLxbn0Jhtef5EWzIAbcnhIy9EJhAve7M2_GGCXoz85y51KadLjhdw",
    planName: "Curator's Showcase (14 Days)",
    status: "ACTIVE",
    startDate: "12 Oct 2024",
    endDate: "26 Oct 2024",
    cost: 8500,
    impressions: 14200,
    clicks: 890,
    saves: 142,
    inquiries: 6,
    daysRemaining: 4,
    paymentMethod: "HDFC Corporate",
    receiptNumber: "Receipt #AP-9082"
  },
  {
    id: "boost-002",
    productId: "prod-002",
    productTitle: "Silk Organza Fluted Ball Gown",
    productImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0DNbOL-MhJz1b3xc4yFWrskbxJoRZEIB4EEM_RSydaqkE_UGUvKHezFNGvwITt_ey9PfxviFm-hisNsXgRKO3Y4P9DvF9_Uhid3dp9wGU85DhSUh1ghs-57YPnWug78liomvXueTOW8TGLvymegYHvOOwCos5XiNHDR6hMFoiGJLUaqtwyTQM_RB6lSMTQsXE9Hc5Dh9TdTIIywlGFbimn8FwRrTezV8Ny5b3kEw",
    planName: "Runway Spotlight (7 Days)",
    status: "ACTIVE",
    startDate: "17 Oct 2024",
    endDate: "24 Oct 2024",
    cost: 7500,
    impressions: 12850,
    clicks: 740,
    saves: 118,
    inquiries: 5,
    daysRemaining: 2,
    paymentMethod: "UPI",
    receiptNumber: "Receipt #AP-9041"
  },
  {
    id: "boost-003",
    productId: "prod-003",
    productTitle: "Bespoke Cutwork Velvet Sherwani Cape",
    productImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGLXMm8TcXGEb-LX4BcipdHcSFePGpzwzM35VWyfi1rgaIaLE5qrmQUTJKa4rpBLeTJHk6k6j6xeOfsDb1UP0f0VYzR9R3N3t6rhMEz2Ku5fMOrICiskgTENnPlG0YjmyBpewAh2FYEWXoP07Xm9pMHMoJNUVrm1CSNp3K3rnkLo0SW7bWpYLtdBsSQcS-R0GQUORvj0fl4nLnzXXialuxWw8c-l9OJKn9EGX58m4",
    planName: "Grand Salon Feature (30 Days)",
    status: "ACTIVE",
    startDate: "08 Oct 2024",
    endDate: "07 Nov 2024",
    cost: 14000,
    impressions: 28400,
    clicks: 1950,
    saves: 340,
    inquiries: 12,
    daysRemaining: 19,
    paymentMethod: "Axis Corporate",
    receiptNumber: "Receipt #AP-8874"
  },
  {
    id: "boost-004",
    productId: "prod-006",
    productTitle: "Sculpted Duchesse Silk Evening Gown",
    productImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMi8IOCjl36C0aPi5hPuMckkApuNkxc49W0UCTZTc-bqxPhJZtTjMB4QTLWshmb1xuS19Q4IjT-Xwn2Xk8cTy5YeySaXbG_n84S2NDc7-Uba7aSDnhdKl0YqcwkI7s54YthtToUGBiC6__dDAZT5b80aFP3pReSQMoMGo6FS5D8HHM0ZyrXsB1ZHBx2-hrM0nDq59RQqhRJXTTJdU2sAfbtsv2NjF5LoqZHkOn8qE",
    planName: "Runway Spotlight (7 Days)",
    status: "SCHEDULED",
    startDate: "01 Nov 2024",
    endDate: "08 Nov 2024",
    cost: 8500,
    impressions: 0,
    clicks: 0,
    saves: 0,
    inquiries: 0,
    daysRemaining: 7,
    paymentMethod: "ICICI Net Banking",
    receiptNumber: "Receipt #AP-9230"
  }
];

// ==========================================
// CUSTOM ORDERS MOCK DATA (CUSTOMER & DESIGNER LINKED)
// ==========================================

export const INITIAL_CUSTOM_ORDERS: CustomOrder[] = [
  // 1. VIP Patron Inquiries (from Haute Atelier Dossiers)
  {
    id: "co-9042",
    orderNumber: "CO-9042",
    inquiryType: "YOUR_LISTED_PRODUCT",
    lifecycleStatus: "ADVANCE_PAYMENT_RECEIVED",
    customerName: "Dr. Samira Mehta",
    customerCity: "Mumbai, Maharashtra",
    customerPhone: "+91 98201 44920",
    customerEmail: "samira.mehta@hautecouture.in",
    designerName: "Rohit K. Balaji",
    brandName: "Rohit Balaji Haute Couture",
    customerNotes: "VIP Patron. Custom waist-to-hem drape specifications submitted. Requesting hand-stitched French wire accents along borders.",
    baseProduct: {
      id: "prod-002",
      title: "Rose Gold Tissue Silk Lehenga with Zardozi Borders",
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYiEtvfXx4kmW2tdz5Qydnho7HXdRGz2yfN7kUkUkBnr40HtkDY8aQNM47w5HnP3i3l0nXSQ7gWBEvkWGtrFbVbXmJRxwURTr1yWJGO80CW4hKDpr3pAsOPbXFj4o6wYR6Ho3hR99D1AKmRxvr3Y8BQbE2wJY8nh_gzJPIEVFJl6vnTK-YU_PRSDTBWJ3a-8cxSvKXM8g6dHxctAtdMkpJmRWV-VMI4Gp5z0moBoI",
      originalPrice: 120000,
      shippingMode: "Complimentary Insured Courier",
      status: "LISTED",
      category: "Lehengas & Sets",
      designerName: "Rohit K. Balaji",
      brandName: "Rohit Balaji Haute Couture"
    },
    requestedAlterations: {
      requestedSize: "Custom Waist 28, Length 43",
      requestedColour: "Rose Gold Tissue Silk with Antique Champagne Sheen",
      requestedFabric: "Tissue Silk with Metallic Zardozi Border & Wire Accents",
      otherAlterations: "Custom waist-to-hem drape. Hand-stitched French wire zardozi border accents.",
      measurements: {
        bust: "35 in",
        waist: "28 in",
        hips: "38 in",
        length: "43 in"
      }
    },
    quotation: {
      customerSize: "Custom Patron Fit",
      measurements: {
        bust: "35 in",
        waist: "28 in",
        hips: "38 in",
        length: "43 in"
      },
      finalPrice: 120000,
      estimatedCompletionDays: 20,
      completionDeadline: "2026-11-18",
      customizationDetails: "Rose Gold tissue silk lehenga with French wire zardozi borders and inner structured cancan.",
      shippingInfo: "Complimentary Insured White-Glove Courier",
      sentDate: "20 Oct 2026",
      status: "Advance Paid (Escrow)"
    },
    advancePaymentAmount: 60000,
    advancePaymentConfirmed: true,
    orderHistory: [
      { stage: "Inquiry Submitted", timestamp: "20 Oct 2026, 10:15 AM", note: "VIP Patron submitted custom lehenga drape dossier." },
      { stage: "Quotation Transmitted", timestamp: "20 Oct 2026, 02:30 PM", note: "Comprehensive quote of ₹1,20,000 sent." },
      { stage: "Quotation Accepted", timestamp: "21 Oct 2026, 11:00 AM" },
      { stage: "Advance Payment Received", timestamp: "21 Oct 2026, 04:45 PM", note: "₹60,000 advance confirmed into Atelier Escrow." }
    ]
  },

  {
    id: "co-8994",
    orderNumber: "CO-8994",
    inquiryType: "NEW_CUSTOMIZED_ORDER",
    lifecycleStatus: "QUOTATION_SENT",
    customerName: "Tara & Kabir Roy",
    customerCity: "New Delhi, DL",
    customerPhone: "+91 98110 33912",
    designerName: "Rohit K. Balaji",
    brandName: "Rohit Balaji Haute Couture",
    customerNotes: "Bridal Trousseau. Dual groom & partner bespoke fit. Architectural Mandarin collar with tone-on-tone threadwork.",
    newGarmentReference: {
      referenceImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfsjYkWc7IiRLvZXEEPeX28cxBX5niyOcBXYUorQBwuc8dX_h0IhY2P0uYDC802wIMc4a7mJg_k3uiYrW_-WAOC9WE6YrGk4wS9zDP1eVDxxkl2stRlE3w1Mv5ISY_o0E1m6ByEdhNJabC94kZvA2oK1q8OQMgj-x3GU5fjyMwhkDkCd51Eofh-4LCJz3MHMNGC4D2yTPRWPBCUT5Ts7Pym6Q41tyaUJe3CkACQaw",
      requestedDesign: "Midnight Velvet Bandhgala & Raw Silk Sherwani Ensemble",
      measurements: "Chest 40 in, Waist 34 in, Shoulder 18.5 in, Sleeve 25 in",
      colour: "Midnight Blue Velvet & Antique Gold Raw Silk",
      fabric: "Silk velvet with raw silk churidar trousers",
      alterationDetails: "Tone-on-tone embroidery with handcrafted antique gold button detailing."
    },
    requestedAlterations: {
      requestedSize: "Dual Bespoke Groom Set",
      requestedColour: "Midnight Velvet & Raw Silk",
      requestedFabric: "Micro-pile silk velvet",
      otherAlterations: "Architectural Mandarin collar with antique gold buttons."
    },
    quotation: {
      customerSize: "Dual Bespoke Groom Set",
      measurements: {
        bust: "40 in",
        waist: "34 in",
        hips: "41 in",
        length: "32 in"
      },
      finalPrice: 95000,
      estimatedCompletionDays: 24,
      completionDeadline: "2026-12-05",
      customizationDetails: "Dual groom ensemble. Velvet bandhgala with tone-on-tone threadwork and raw silk sherwani.",
      shippingInfo: "Insured White-Glove Delivery",
      sentDate: "19 Oct 2026",
      status: "Quote Sent • Client Considering"
    },
    advancePaymentAmount: 47500,
    advancePaymentConfirmed: false,
    orderHistory: [
      { stage: "Inquiry Submitted", timestamp: "19 Oct 2026, 09:30 AM" },
      { stage: "Quotation Transmitted", timestamp: "19 Oct 2026, 04:15 PM", note: "Comprehensive quote of ₹95,000 sent." }
    ]
  },

  {
    id: "co-8951",
    orderNumber: "CO-8951",
    inquiryType: "NEW_CUSTOMIZED_ORDER",
    lifecycleStatus: "INQUIRY_RECEIVED",
    customerName: "Eleanor Hughes",
    customerCity: "London, UK",
    customerPhone: "+44 20 7946 0912",
    designerName: "Kavita Singhal",
    brandName: "Maison Singhal",
    customerNotes: "London Salon. Bespoke corset boning parameters uploaded from Mayfair trunk show. Structural toile approved.",
    newGarmentReference: {
      referenceImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKInC19qUz-eQ0ISMCxwp2FUmd04OmfHSpCB3bcSAWPAjM5ZOHsPcXr2TBkh5-xIrVRcl_UR3_8riVpCQR8Btg3RKK2yqimAORUdL4msXIcgWnuoqOJXxpDBDuP0OimcrHVBNzpjMyuglxbTdOQKEYokN3xpwlIo3AKSCbcVH9i5WEnfbshcJGgB6XVlVIAKvle6eZqK_gG9_Zyabq9SttVvNE_VvdRI6QUpsUhbY",
      requestedDesign: "Hand-Draped Silk Duchesse Ball Gown with Corsetry",
      measurements: "Bust 34 in, Waist 25 in, Hips 36 in, Length 58 in",
      colour: "Warm Silk Duchesse Ivory",
      fabric: "Pure Duchesse Silk with Spiral Steel Corset Boning",
      alterationDetails: "Sculpted waist corset with structured pleating and floor-length sweep."
    },
    requestedAlterations: {
      requestedSize: "Bespoke Mayfair Toile S",
      requestedColour: "Duchesse Ivory",
      requestedFabric: "Pure Duchesse Silk",
      otherAlterations: "Bespoke Mayfair boning structure and toile fitting."
    },
    quotation: {
      customerSize: "Bespoke Mayfair Toile S",
      measurements: {
        bust: "34 in",
        waist: "25 in",
        hips: "36 in",
        length: "58 in"
      },
      finalPrice: 165000,
      estimatedCompletionDays: 28,
      completionDeadline: "2026-11-04",
      customizationDetails: "Hand-draped silk duchesse ball gown with inner spiral steel corset boning.",
      shippingInfo: "International Insured White-Glove Courier",
      sentDate: "17 Oct 2026",
      status: "Measurement Review Required"
    },
    advancePaymentAmount: 82500,
    advancePaymentConfirmed: false,
    orderHistory: [
      { stage: "Inquiry Submitted", timestamp: "17 Oct 2026, 11:45 AM" }
    ]
  },

  {
    id: "co-8910",
    orderNumber: "CO-8910",
    inquiryType: "YOUR_LISTED_PRODUCT",
    lifecycleStatus: "INQUIRY_RECEIVED",
    customerName: "Ananya Singhania",
    customerCity: "Mumbai, MH",
    customerPhone: "+91 98202 55910",
    designerName: "Rohit K. Balaji",
    brandName: "Rohit Balaji Haute Couture",
    customerNotes: "Red Carpet. Initial patron virtual consultation concluded. Curating swatches between Liquid Gold Lamé and Champagne Organza.",
    baseProduct: {
      id: "prod-004",
      title: "Sculptural Pleated Lamé Evening Cape",
      thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZq-pN7G2jZugXc4BuoUUkUwSUi8I-FzmvyB8ruaNEVjL-ErNftfspnJdWEHbGp2BSWbZ0_yrucLrlKY3xkhnWDgSCxYFgs1GCkY3b5_vuN78DhITJ4WpiS-IuxkzAiuX9zoecPI5IxSjWoaxo8dN2Mbz0T9QwNMuPy167gJFbAAWvaEFPh_1y4oTf0cYoPVSNkGybag6dSbQfxfIIsz7Loa-iWXgobhX4iCUbUqw",
      originalPrice: 78000,
      shippingMode: "Complimentary Hand Delivery",
      status: "LISTED",
      category: "Couture & Gowns",
      designerName: "Rohit K. Balaji",
      brandName: "Rohit Balaji Haute Couture"
    },
    requestedAlterations: {
      requestedSize: "One-of-a-kind Sculpted Cape",
      requestedColour: "Liquid Gold Lamé / Champagne",
      requestedFabric: "Micro-pleated metallic lamé",
      otherAlterations: "Dramatic architectural pleats and gold-woven fabric samples."
    },
    quotation: {
      customerSize: "Bespoke Cape Silhouette",
      measurements: {
        bust: "36 in",
        waist: "28 in",
        hips: "38 in",
        length: "55 in"
      },
      finalPrice: 78000,
      estimatedCompletionDays: 14,
      completionDeadline: "2026-11-22",
      customizationDetails: "Liquid gold lamé evening cape with hand-pleated collar drape.",
      shippingInfo: "Complimentary Hand Delivery",
      sentDate: "15 Oct 2026",
      status: "Swatch Selection Pending"
    },
    advancePaymentAmount: 39000,
    advancePaymentConfirmed: false,
    orderHistory: [
      { stage: "Inquiry Submitted", timestamp: "15 Oct 2026, 04:30 PM" }
    ]
  },

  // 5. Existing Product Customization: Quotation Received (Customer Can Accept/Decline)
  {
    id: "co-001",
    orderNumber: "INQ-7821",
    inquiryType: "YOUR_LISTED_PRODUCT",
    lifecycleStatus: "QUOTATION_SENT",
    customerName: "Meera Singhania",
    customerCity: "Mumbai, Maharashtra",
    customerPhone: "+91 98201 44920",
    customerEmail: "meera.singhania@heritageatelier.in",
    designerName: "Rohit K. Balaji",
    brandName: "Rohit Balaji Haute Couture",
    customerNotes: "Requires expedited completion before destination wedding in Udaipur.",
    baseProduct: {
      id: "prod-002",
      title: "Pastel Rose Quartz Lehenga Set in Tulle",
      thumbnail: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
      originalPrice: 24000,
      shippingMode: "Free Shipping",
      status: "LISTED",
      category: "Lehengas & Sets",
      designerName: "Rohit K. Balaji",
      brandName: "Rohit Balaji Haute Couture"
    },
    requestedAlterations: {
      requestedSize: "Custom Bust 36.5, Waist 29",
      requestedColour: "Champagne Rose Gold with metallic sheen",
      requestedFabric: "Double-layered French tulle over Banarasi mulberry silk",
      otherAlterations: "Extended 2.8m scalloped border dupatta with micro-pearl edging for reception entrance.",
      measurements: {
        bust: "36.5 in",
        waist: "29 in",
        hips: "40 in",
        length: "44 in"
      }
    },
    quotation: {
      customerSize: "Custom Bust 36.5, Waist 29",
      measurements: {
        bust: "36.5 in",
        waist: "29 in",
        hips: "40 in",
        length: "44 in"
      },
      finalPrice: 32000,
      estimatedCompletionDays: 18,
      completionDeadline: "2026-11-18",
      customizationDetails: "Hand-dyed rose gold champagne tulle, reinforced silk waist-corset, and 2.8m scalloped dupatta.",
      shippingInfo: "Complimentary Insured White-Glove Courier",
      sentDate: "27 Oct 2026",
      status: "Pending Customer Review"
    },
    advancePaymentAmount: 12000,
    advancePaymentConfirmed: false,
    orderHistory: [
      { stage: "Inquiry Submitted", timestamp: "26 Oct 2026, 11:20 AM", note: "Customer submitted custom alteration request for Rose Quartz Lehenga." },
      { stage: "Designer Quotation Received", timestamp: "27 Oct 2026, 03:45 PM", note: "Rohit Balaji sent custom quote of ₹32,000." }
    ]
  },

  // 6. Custom Order In Progress (Quotation Accepted + Advance Paid)
  {
    id: "co-002",
    orderNumber: "ORD-CUST-4412",
    inquiryType: "NEW_CUSTOMIZED_ORDER",
    lifecycleStatus: "IN_PROGRESS",
    customerName: "Devika Rao",
    customerCity: "Hyderabad, Telangana",
    customerPhone: "+91 98490 12044",
    designerName: "Kavita Singhal",
    brandName: "Maison Singhal",
    newGarmentReference: {
      referenceImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
      requestedDesign: "Sculptural metallic cape gown with micro-pleated tissue organza.",
      measurements: "Bust 34 in, Waist 27 in, Hips 37.5 in, Height 5 ft 9 in",
      colour: "Liquid Champagne & Rose Gold",
      fabric: "Iridescent organza over duchess satin",
      alterationDetails: "Floor-sweeping architectural train."
    },
    requestedAlterations: {},
    quotation: {
      customerSize: "Custom Bespoke",
      measurements: { bust: "34 in", waist: "27 in", hips: "37.5 in", length: "60 in" },
      finalPrice: 52000,
      estimatedCompletionDays: 21,
      completionDeadline: "2026-11-04",
      customizationDetails: "Hand-pleated metallic organza with boned inner corset.",
      sentDate: "14 Oct 2026",
      status: "Accepted"
    },
    advancePaymentAmount: 20000,
    advancePaymentConfirmed: true,
    startedAt: "2026-10-16",
    deadlineTimestamp: Date.now() + 18 * 3600 * 1000,
    hoursRemaining: 18,
    isOverdue: false,
    orderHistory: [
      { stage: "Quotation Accepted", timestamp: "15 Oct 2026, 03:00 PM" },
      { stage: "Advance Payment Received", timestamp: "16 Oct 2026, 09:30 AM", note: "₹20,000 received via Atelier Escrow." },
      { stage: "Order Started", timestamp: "16 Oct 2026, 11:00 AM", note: "Pattern drafting and fabric procurement underway." },
      { stage: "In Progress", timestamp: "24 Oct 2026, 04:00 PM", note: "First trial fitting approved with minor waist adjustments." }
    ]
  },

  // 7. Completed Custom Order
  {
    id: "co-003",
    orderNumber: "ORD-CUST-2901",
    inquiryType: "NEW_CUSTOMIZED_ORDER",
    lifecycleStatus: "COMPLETED",
    customerName: "Meera Singhania",
    customerCity: "Mumbai, Maharashtra",
    designerName: "Rohit K. Balaji",
    brandName: "Rohit Balaji Haute Couture",
    newGarmentReference: {
      referenceImage: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600&auto=format&fit=crop",
      requestedDesign: "Kanjivaram silk cape overlay over structured floor-length drape.",
      measurements: "Bust 36 in, Waist 28 in, Length 56 in",
      colour: "Temple Maroon & Pure Gold Zari",
      fabric: "Kanchipuram Gold Brocade",
      alterationDetails: "Scalloped cape hemline with hand-embroidered pearls."
    },
    requestedAlterations: {},
    quotation: {
      customerSize: "Bespoke Size S",
      measurements: { bust: "36 in", waist: "28 in", length: "56 in" },
      finalPrice: 48000,
      estimatedCompletionDays: 20,
      completionDeadline: "2026-10-18",
      customizationDetails: "Hand-woven Kanchipuram silk cape with pearl edging.",
      sentDate: "25 Sep 2026",
      status: "Accepted"
    },
    advancePaymentAmount: 20000,
    advancePaymentConfirmed: true,
    startedAt: "2026-09-28",
    actualCompletedDate: "2026-10-17",
    orderHistory: [
      { stage: "Quotation Accepted", timestamp: "26 Sep 2026" },
      { stage: "Advance Payment Received", timestamp: "27 Sep 2026" },
      { stage: "Order Started", timestamp: "28 Sep 2026" },
      { stage: "In Progress", timestamp: "08 Oct 2026" },
      { stage: "Completed", timestamp: "17 Oct 2026", note: "Packaged in luxury archival garment dust bag." }
    ]
  }
];

// ==========================================
// ORDERS & LOGISTICS (CUSTOMER & DESIGNER LINKED)
// ==========================================

export const INITIAL_LOGISTICS_ORDERS: LogisticsOrder[] = [
  {
    id: "log-001",
    orderNumber: "ORD-8841",
    productTitle: "Embroidered Silk Blouse & Zardozi Overlay",
    productThumbnail: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400&auto=format&fit=crop",
    productDetails: "Standard Size M • 100% Pure Mulberry Raw Silk",
    designerName: "Rohit K. Balaji",
    brandName: "Rohit Balaji Haute Couture",
    price: 8500,
    quantity: 1,
    shippingTag: "Free Shipping",
    orderConfirmed: true,
    status: "READY_TO_DISPATCH",
    customerName: "Meera Singhania",
    shippingAddress: "Villa 14, Altius Estates, Altamount Road, South Mumbai, MH — 400026",
    timeline: [
      { stage: "ORDER_CONFIRMED", label: "Order Confirmed & Paid", timestamp: "27 Oct 2026, 09:30 AM", completed: true },
      { stage: "PICKED_UP_DISPATCHED", label: "Picked Up / Dispatched", completed: false },
      { stage: "IN_TRANSIT", label: "In Transit", completed: false },
      { stage: "DELIVERED", label: "Delivered", completed: false }
    ]
  },
  {
    id: "log-002",
    orderNumber: "ORD-8719",
    productTitle: "Pastel Rose Quartz Lehenga Set in Tulle",
    productThumbnail: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400&auto=format&fit=crop",
    productDetails: "Made to Measure • 4-Layered Tulle • Insured Luxury Trunk",
    designerName: "Rohit K. Balaji",
    brandName: "Rohit Balaji Haute Couture",
    price: 24000,
    quantity: 1,
    shippingTag: "Free Shipping",
    orderConfirmed: true,
    status: "SHIPPED_AND_DELIVERED",
    customerName: "Meera Singhania",
    shippingAddress: "Villa 14, Altius Estates, Altamount Road, South Mumbai, MH — 400026",
    courierInfo: {
      courierCompany: "BlueDart Apex Luxury",
      pickupDate: "2026-10-20",
      pickupTimeSlot: "10:00 AM - 01:00 PM",
      confirmedAt: "20 Oct 2026"
    },
    trackingId: "BD-LUX-9481029",
    trackingStatus: "IN_TRANSIT",
    timeline: [
      { stage: "ORDER_CONFIRMED", label: "Order Confirmed & Paid", timestamp: "18 Oct 2026, 11:00 AM", completed: true },
      { stage: "PICKED_UP_DISPATCHED", label: "Picked Up by Courier", timestamp: "20 Oct 2026, 12:30 PM", completed: true },
      { stage: "IN_TRANSIT", label: "Out for White-Glove Delivery", timestamp: "28 Oct 2026, 08:30 AM", completed: true },
      { stage: "DELIVERED", label: "Delivered to Patron", completed: false }
    ]
  },
  {
    id: "log-003",
    orderNumber: "ORD-8512",
    productTitle: "Embroidered Silk Blouse & Zardozi Overlay",
    productThumbnail: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400&auto=format&fit=crop",
    productDetails: "Size M • Hand Embroidered Zardozi",
    designerName: "Rohit K. Balaji",
    brandName: "Rohit Balaji Haute Couture",
    price: 8500,
    quantity: 1,
    shippingTag: "Free Shipping",
    orderConfirmed: true,
    status: "RETURNS_AND_EXCHANGES",
    customerName: "Meera Singhania",
    shippingAddress: "Villa 14, Altius Estates, Altamount Road, South Mumbai, MH — 400026",
    returnExchange: {
      requestType: "Exchange",
      customerReason: "Size adjustment required for personal couture fit",
      customerComments: "The blouse circumference on the bust is tighter by 0.5 inches than anticipated. Requesting atelier alteration or exchange for tailored fit.",
      supportingImages: [
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400&auto=format&fit=crop"
      ],
      requestDate: "27 Oct 2026",
      status: "Under Review"
    },
    timeline: [
      { stage: "ORDER_CONFIRMED", label: "Original Order Fulfilled", timestamp: "15 Oct 2026", completed: true },
      { stage: "DELIVERED", label: "Delivered to Patron", timestamp: "20 Oct 2026", completed: true }
    ]
  }
];

// ==========================================
// CUSTOMER PROFILE & NOTIFICATIONS
// ==========================================

export const INITIAL_CUSTOMER_PROFILE: CustomerProfile = {
  customerName: "Meera Singhania",
  profilePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  phone: "+91 98201 44920",
  email: "meera.singhania@heritageatelier.in",
  deliveryAddress: {
    addressLine: "Villa 14, Altius Estates, Altamount Road",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400026"
  },
  accountSecurity: {
    twoFactorEnabled: true,
    memberSince: "November 2025"
  }
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-c1",
    category: "Quotation received",
    title: "Quotation received from Rohit Balaji",
    shortDescription: "Your custom request for Rose Quartz Lehenga Set has received an official quotation of ₹32,000.",
    timestamp: "2 mins ago",
    read: false,
    audience: "customer"
  },
  {
    id: "notif-c2",
    category: "Order shipped",
    title: "Order #ORD-8719 Out for Delivery",
    shortDescription: "BlueDart Apex Luxury courier is in transit with your luxury garment.",
    timestamp: "1 hour ago",
    read: false,
    audience: "customer"
  },
  {
    id: "notif-c3",
    category: "Advance payment confirmation",
    title: "Advance payment verified",
    shortDescription: "₹20,000 escrow advance confirmed for Bespoke Sculptural Cape Gown.",
    timestamp: "1 day ago",
    read: true,
    audience: "customer"
  },
  {
    id: "notif-d1",
    category: "New custom inquiry",
    title: "New custom inquiry received",
    shortDescription: "Meera Singhania submitted custom specifications for Rose Quartz Lehenga.",
    timestamp: "3 mins ago",
    read: false,
    audience: "designer"
  }
];

export const INITIAL_TRANSACTIONS: TransactionRecord[] = [
  {
    id: "tx-001",
    date: "28 Oct 2026",
    transactionReference: "TXN-ATELIER-94021",
    transactionType: "Designer payout",
    relatedOrder: "Ledger Disbursal Cycle #42",
    amount: 72500,
    status: "Settled"
  }
];

export const INITIAL_SUBSCRIPTION_INFO: SubscriptionInfo = {
  currentTier: "PRO",
  billingPeriod: "Monthly",
  renewsOn: "28 May 2027"
};
