/**
 * ATELIER MAISON PRIVÉE • UVIBE MULTI-DIMENSIONAL NEURAL FASHION AI ENGINE
 * 
 * Production-grade semantic neural search and visual reasoning pipeline.
 * Evaluates free-form natural language, silhouette architectures, textiles, color harmonies,
 * structural design elements, and artisanal crafts against the platform's archival garment knowledge graph.
 * 
 * Computes transparent, mathematically justified accuracy percentages across 5 dimensions:
 * 1. Clothes / Silhouette Category (30%)
 * 2. Color Palette & Hue Harmony (30%)
 * 3. Designing & Structural Lines (15%)
 * 4. Fabric Physics & Weave (15%)
 * 5. Artisanal Embellishment & Craft (10%)
 */

export interface UvibeScoreBreakdown {
  clothes: number;      // Garment silhouette & category alignment (0-100)
  color: number;        // Palette & tone harmony (0-100)
  designing: number;    // Structural cut, collar, cuffs, boning & architectural lines (0-100)
  fabric: number;       // Textile physics & weave match (0-100)
  craft: number;        // Artisanal embellishment & needlework (0-100)
}

export interface UvibeAccuracyJustification {
  summary: string;           // Concise explainable AI summary
  clothesRationale: string;  // Detailed clothes category rationale
  colorRationale: string;    // Detailed color harmony rationale
  designingRationale: string;// Detailed structural design rationale
  fabricRationale: string;   // Detailed fabric & weave rationale
  craftRationale: string;    // Detailed artisanal craft rationale
  keyStrengths: string[];    // Core matching dimensions
  divergences: string[];     // Minor variations that explain why it is not 100%
}

export type SilhouetteFamily =
  | "royal-ethnic-men"      // Sherwani, Achkan, Bandhgala, Jodhpuri, Kurta Set
  | "royal-ethnic-women"    // Lehenga, Kalidar, Saree, Anarkali
  | "western-couture-women" // Corseted Gown, Ballgown, Cape Gown, Column Gown, Cocktail Midi
  | "tailored-menswear"     // Double-Breasted Suit, Tuxedo, Trench Overcoat
  | "designer-tshirts"      // Men's T-Shirts, Polo, Henley, Raglan, Oversized, Longline, etc.
  | "junior-kids";          // Miniature Sherwani, Kids Kurta, Kids Linen, Kids Jacket, Kids Tee

export interface UvibeGarment {
  id: string;
  title: string;
  badge: string;
  tag: string;
  desc: string;
  price: number;
  originalPrice?: number;
  image: string;
  sizes: string;
  silhouette: string;
  silhouetteFamily: SilhouetteFamily;
  category?: "Men" | "Women" | "Kids" | "Unisex";
  subcategory?: string;

  // Specific Structured Attribute Architecture from Training PDF:
  tshirtType?: string;      // Crew Neck, Polo, Henley, Raglan, Pocket Tee, Muscle Tee, Graphic Tee, Longline, Crop Tee, Ringer Tee, Baseball Tee
  fit?: string;             // Slim Fit, Regular Fit, Relaxed Fit, Oversized Fit, Boxy Fit, Muscle Fit, Skinny Fit
  neckline?: string;        // Crew Neck, V-Neck, Scoop Neck, U-Neck, Boat Neck, Polo Collar, Mandarin Collar, Mock Neck, High Neck
  sleeveType?: string;      // Short Sleeve, Long Sleeve, Sleeveless, Three-Quarter Sleeve, Cap Sleeve, Raglan Sleeve, Drop Shoulder
  shoulderStyle?: string;   // Regular Shoulder, Drop Shoulder, Raglan, Extended Shoulder
  patternType?: string;     // Solid, Striped, Checked, Floral, Geometric, Camouflage, Tie-Dye, Colour Block, All-Over Print, Text Print
  designDetail?: string;    // Graphic Print, Logo Print, Embroidered, Applique, Textured, Distressed, Washed, Acid Wash, Sequin, Minimal
  lengthStyle?: string;     // Regular Length, Longline, Cropped, Hip Length, Below Hip
  featuresList?: string[];  // Button Placket, Chest Pocket, Contrast Stitching, Contrast Collar, Side Slits, Ribbed Hem, Raw Hem, Curved Hem, Zipper, Hood

  fabrics: string[];
  colors: string[];
  crafts: string[];
  designFeatures: string[];
  era: string;
  gender: "women" | "men" | "kids" | "unisex";
  occasions: string[];
  verifiedBadge?: "blue-tick" | "gold-pro" | null;
  linkedProductId?: string;
  matchScore?: number;
  scoreBreakdown?: UvibeScoreBreakdown;
  justification?: UvibeAccuracyJustification;
  rawScore?: number;
  isGenderMismatch?: boolean;
  isSilhouetteMismatch?: boolean;
  hasColorContradiction?: boolean;
}

export interface ParsedFashionQuery {
  raw: string;
  cleaned: string;
  detectedGenders: ("men" | "women" | "kids")[];
  detectedSilhouettes: string[];
  detectedFabrics: string[];
  detectedColors: string[];
  primaryTargetColor?: string;
  accentColors: string[];
  detectedCrafts: string[];
  detectedDesignFeatures: string[];
  detectedOccasions: string[];
  detectedEras: string[];
  primaryTone: string;
  targetFamily: SilhouetteFamily | null;

  // PDF-guided structured extractions
  isTshirtSearch: boolean;
  extractedTshirtType?: string;
  extractedFit?: string;
  extractedNeckline?: string;
  extractedSleeveType?: string;
  extractedShoulderStyle?: string;
  extractedPattern?: string;
  extractedDesignDetail?: string;
  extractedLength?: string;
  extractedFeatures?: string[];
  hardRequirements?: Record<string, string>;

  // Domain-Trained Garment Category Extractions
  isSareeSearch?: boolean;
  extractedSareeWeave?: string;
  extractedSareePattern?: string;

  isKurtaSearch?: boolean;
  extractedKurtaStyle?: string;
  extractedKurtaCraft?: string;

  isSherwaniSearch?: boolean;
  extractedSherwaniStyle?: string;
  extractedSherwaniCraft?: string;

  isShirtSearch?: boolean;
  extractedShirtType?: string;
  extractedShirtPattern?: string;
  extractedShirtCollar?: string;
  extractedShirtCuff?: string;
}

// =========================================================================
// 1. ATELIER GARMENT KNOWLEDGE CORPUS (Indexed from all platform collections)
// =========================================================================

export const UVIBE_GARMENT_CORPUS: UvibeGarment[] = [
  // 1. Blush Zardozi Kalidar Bridal Lehenga
  {
    id: "uv-1",
    title: "Blush Zardozi Kalidar Bridal Lehenga",
    badge: "Blush Zardozi Kalidar Bridal Lehenga",
    tag: "BRIDAL & HAUTE EDITION",
    desc: "Heavy mulberry silk & organza • 24k antique bullion zardozi embroidery & scalloped sheer veil",
    price: 345000,
    originalPrice: 395000,
    sizes: "XS - L • BESPOKE",
    image: "/images/salon/bestseller-1.jpg",
    silhouette: "Kalidar Lehenga",
    silhouetteFamily: "royal-ethnic-women",
    fabrics: ["Mulberry Silk", "Silk Velvet", "Tissue Organza", "Raw Silk"],
    colors: ["blush", "pink", "rose gold", "peach", "gold", "ivory", "champagne"],
    crafts: ["Bullion Zardozi", "Scalloped Veil", "Hand Embroidery", "Zardozi"],
    designFeatures: ["Kalidar 32-Kali Flare", "Scalloped Veil Border", "Deep Sweetheart Blouse", "Antique Latkan Tassels"],
    era: "Heritage Royal",
    gender: "women",
    occasions: ["Bridal", "Wedding", "Grand Reception", "Sangeet"],
    verifiedBadge: "gold-pro",
    linkedProductId: "prod-in-005"
  },
  // 1a. Crimson Silk Velvet Kalidar Bridal Lehenga (Matches exact crimson velvet kalidar query!)
  {
    id: "uv-crimson-lehenga",
    title: "Crimson Silk Velvet Kalidar Bridal Lehenga",
    badge: "Crimson Silk Velvet Kalidar Bridal Lehenga",
    tag: "MAISON BRIDAL ARCHIVE",
    desc: "Deep crimson silk micro-velvet • 32-kali flare with 24k antique gold zardozi & scalloped sheer veil",
    price: 260000,
    originalPrice: 315000,
    sizes: "XS - XL • BESPOKE",
    image: "/images/categories/women/women-lehenga.png",
    silhouette: "Kalidar Lehenga",
    silhouetteFamily: "royal-ethnic-women",
    fabrics: ["Silk Velvet", "Velvet", "Raw Silk", "Tissue Organza"],
    colors: ["crimson", "red", "burgundy", "maroon", "gold"],
    crafts: ["Antique Gold Zardozi", "Bullion Zardozi", "Zardozi", "Scalloped Veil", "Hand Embroidery"],
    designFeatures: ["Kalidar 32-Kali Flare", "Scalloped Veil", "Deep Sweetheart Blouse", "Heavy Zardozi Border"],
    era: "Heritage Royal",
    gender: "women",
    occasions: ["Bridal", "Wedding", "Grand Reception", "Sangeet"],
    verifiedBadge: "gold-pro",
    linkedProductId: "prod-in-005"
  },
  // 1b. Burgundy Velvet Architectural Sculpted Gown
  {
    id: "uv-burgundy-gown",
    title: "Burgundy Velvet Architectural Sculpted Gown",
    badge: "Burgundy Velvet Architectural Sculpted Gown",
    tag: "PARIS RUNWAY ARCHIVE",
    desc: "Midnight burgundy sculpted velvet bodice with pleated silk skirt, gold bullion embroidery & architectural boning",
    price: 240000,
    originalPrice: 285000,
    sizes: "UK 6 - 14 • BESPOKE",
    image: "/images/salon/sig-geometric.jpg",
    silhouette: "Corseted Gown",
    silhouetteFamily: "western-couture-women",
    fabrics: ["Silk Velvet", "Duchess Satin", "Sculpted Velvet", "Velvet"],
    colors: ["burgundy", "wine", "maroon", "crimson", "gold", "deep red"],
    crafts: ["Geometric Draping", "French Corsetry", "Bullion Embroidery", "Gold Embroidery"],
    designFeatures: ["Boned Basque Corset", "Architectural Petal Neckline", "Sculpted Hip Panniers", "Floor Length Column"],
    era: "Parisian Atelier",
    gender: "women",
    occasions: ["Gala", "Black Tie", "Red Carpet", "Met Gala", "Opera Gala"],
    verifiedBadge: "gold-pro",
    linkedProductId: "sig-geometric"
  },
  // 1c. Midnight Sapphire Duchess Satin Gala Gown (Matches exact curated inspiration!)
  {
    id: "uv-sapphire-gown",
    title: "Midnight Sapphire Duchess Satin Gala Gown",
    badge: "Midnight Sapphire Duchess Satin Gala Gown",
    tag: "PARIS COUTURE WEEK ARCHIVE",
    desc: "Deep midnight sapphire duchess satin • Structured boned basque corset, origami sculptural pleating & column train",
    price: 275000,
    originalPrice: 320000,
    sizes: "UK 6 - 14 • BESPOKE",
    image: "/images/salon/sapphire-gala-gown.jpg",
    silhouette: "Corseted Gown",
    silhouetteFamily: "western-couture-women",
    fabrics: ["Duchess Satin", "Silk Satin", "French Charmeuse"],
    colors: ["sapphire", "blue", "midnight", "royal blue", "navy", "deep blue"],
    crafts: ["Boned Basque Corset", "Architectural Draping", "Origami Pleats", "Column Train"],
    designFeatures: ["Boned Basque Corset", "Asymmetric Origami Neckline", "Off-Shoulder Fold", "Dramatic Column Train"],
    era: "Parisian Atelier",
    gender: "women",
    occasions: ["Gala", "Red Carpet", "Met Gala", "Black Tie", "Opera Gala"],
    verifiedBadge: "gold-pro",
    linkedProductId: "sig-parisian"
  },
  // 2. Archival Embroidered Ivory Sherwani
  {
    id: "uv-2",
    title: "Archival Embroidered Ivory Sherwani",
    badge: "Archival Embroidered Ivory Sherwani",
    tag: "MAISON PRIVÉE VAULT",
    desc: "Hand-loomed raw silk • Split french cuffs & bullion thread needlework",
    price: 112000,
    originalPrice: 145000,
    sizes: "38 - 44 • BESPOKE",
    image: "/images/salon/bestseller-2.jpg",
    silhouette: "Structured Sherwani",
    silhouetteFamily: "royal-ethnic-men",
    fabrics: ["Raw Silk", "Mulberry Silk", "Tissue Silk"],
    colors: ["ivory", "cream", "white", "gold", "champagne"],
    crafts: ["Kashmiri Tilla", "Bullion Needlework", "Hand Embroidery", "Zardozi"],
    designFeatures: ["High Mandarin Collar", "Concealed Front Placket", "Split French Cuffs", "Flared Achkan Cut"],
    era: "Heritage Royal",
    gender: "men",
    occasions: ["Wedding", "Groom", "Ceremonial", "Royal Reception"],
    verifiedBadge: "blue-tick",
    linkedProductId: "prod-in-001"
  },
  // 2b. Royal Sapphire Velvet Zardozi Sherwani (Matches exact blue sherwani query!)
  {
    id: "uv-men-1",
    title: "Royal Sapphire Velvet Zardozi Sherwani",
    badge: "Royal Sapphire Velvet Zardozi Sherwani",
    tag: "MAISON PRIVÉE ARCHIVE",
    desc: "Imperial sapphire blue micro-velvet • Heavy 24k gold bullion needlework on the mandarin collar & cuffs",
    price: 135000,
    originalPrice: 165000,
    sizes: "38 - 46 • BESPOKE",
    image: "/images/salon/blue-sapphire-sherwani.jpg",
    silhouette: "Structured Sherwani",
    silhouetteFamily: "royal-ethnic-men",
    fabrics: ["Silk Velvet", "Micro-Velvet", "Mulberry Silk", "Raw Silk"],
    colors: ["blue", "sapphire", "royal blue", "navy", "gold"],
    crafts: ["Bullion Zardozi", "Mandarin Collar", "Hand Embroidery", "Zardozi"],
    designFeatures: ["High Mandarin Collar", "Hand-Turned Cuffs", "Front Placket Zardozi", "Achkan Tailored Lines"],
    era: "Heritage Royal",
    gender: "men",
    occasions: ["Wedding", "Groom", "Royal Reception", "Ceremonial"],
    verifiedBadge: "gold-pro",
    linkedProductId: "prod-in-001"
  },
  // 2c. Emerald Green Silk Kurta & Embroidered Nehru Set
  {
    id: "uv-men-2",
    title: "Emerald Green Silk Kurta & Embroidered Nehru Set",
    badge: "Emerald Green Silk Kurta & Embroidered Nehru Set",
    tag: "ROYAL CEREMONIAL MENSWEAR",
    desc: "Hand-spun emerald raw silk kurta with gold tilla needlework, paired with structured embroidered Nehru waistcoat jacket",
    price: 78000,
    originalPrice: 95000,
    sizes: "38 - 46 • BESPOKE",
    image: "/images/salon/emerald-kurta-nehru.jpg",
    silhouette: "Ethnic Kurta Set",
    silhouetteFamily: "royal-ethnic-men",
    fabrics: ["Raw Silk", "Spun Silk", "Mulberry Silk", "Silk"],
    colors: ["emerald", "green", "forest green", "bottle green", "gold"],
    crafts: ["Nehru Collar", "Tilla Needlework", "Mandarin Collar", "Ornamental Buttons"],
    designFeatures: ["Nehru Waistcoat Jacket", "High Band Collar", "Antique Gold Buttons", "Straight Cut Kurta"],
    era: "Heritage Royal",
    gender: "men",
    occasions: ["Sangeet", "Haldi", "Festive", "Wedding", "Ceremonial"],
    verifiedBadge: "blue-tick",
    linkedProductId: "prod-in-004"
  },
  // 3. Aubergine Kanjivaram Pure Zari Drape
  {
    id: "uv-3",
    title: "Aubergine Kanjivaram Pure Zari Drape",
    badge: "Aubergine Kanjivaram Pure Zari Drape",
    tag: "HERITAGE WEAVE",
    desc: "Interlocked korvai borders • 3-ply pure silk with 24k electroplated gold zari",
    price: 98000,
    originalPrice: 120000,
    sizes: "UNSTITCHED • BESPOKE BLOUSE",
    image: "/images/salon/bestseller-3.jpg",
    silhouette: "Temple Drape Saree",
    silhouetteFamily: "royal-ethnic-women",
    fabrics: ["Kanjivaram Silk", "Pure Silk", "Brocade", "Zari Silk"],
    colors: ["aubergine", "purple", "violet", "plum", "gold"],
    crafts: ["Korvai Weaving", "24k Gold Zari", "Temple Border", "Handloom"],
    designFeatures: ["Interlocked Korvai Border", "Heavy Gold Zari Pallu", "Traditional Temple Gopuram Motifs"],
    era: "Vedic Classical",
    gender: "women",
    occasions: ["Wedding", "Festive", "Temple Ceremony", "Traditional"],
    verifiedBadge: null,
    linkedProductId: "prod-deal-004"
  },
  // 3b. Heritage Pit-Loom 24k Gold Zari Saree
  {
    id: "uv-11",
    title: "Heritage Pit-Loom 24k Gold Zari Saree",
    badge: "Heritage Pit-Loom 24k Gold Zari Saree",
    tag: "NATIONAL TREASURE WEAVE",
    desc: "Woven on 120-year-old wooden pit-looms in Varanasi • Real gold bullion wire border with bespoke stitched blouse",
    price: 185000,
    originalPrice: 220000,
    sizes: "BESPOKE BLOUSE INCLUDED",
    image: "/images/salon/sig-heritage-looms.jpg",
    silhouette: "Temple Drape Saree",
    silhouetteFamily: "royal-ethnic-women",
    fabrics: ["Banarasi Silk", "Pure Mulberry Silk", "Zari Silk", "Silk"],
    colors: ["red", "gold", "crimson", "vermillion", "amber"],
    crafts: ["Pit-Loom Weaving", "24k Gold Zari", "Shikargah Motifs", "Kadwa Weave"],
    designFeatures: ["Kadwa Weft Motifs", "Heavy Zari Pallu", "Contrast Embroidered Blouse"],
    era: "Mughal Renaissance",
    gender: "women",
    occasions: ["Bridal", "Wedding", "Grand Festive", "Temple"],
    verifiedBadge: "gold-pro",
    linkedProductId: "sig-heritage"
  },
  // 4. Molten Copper Structured Couture Gown
  {
    id: "uv-4",
    title: "Molten Copper Structured Couture Gown",
    badge: "Molten Copper Structured Couture Gown",
    tag: "PARIS RUNWAY PIECE",
    desc: "Micro-pleated duchess satin • Architectural petal shoulders & boned bodice",
    price: 220000,
    originalPrice: 265000,
    sizes: "UK 8 - 14",
    image: "/images/salon/bestseller-4.jpg",
    silhouette: "Corseted Gown",
    silhouetteFamily: "western-couture-women",
    fabrics: ["Duchess Satin", "French Charmeuse", "Satin"],
    colors: ["copper", "bronze", "rust", "metallic", "gold"],
    crafts: ["Micro-Pleating", "Corsetry", "Architectural Draping"],
    designFeatures: ["Architectural Petal Shoulders", "Structured Boned Bodice", "Asymmetric Swathe"],
    era: "Parisian Atelier",
    gender: "women",
    occasions: ["Red Carpet", "Met Gala", "Evening Cocktail", "Haute Couture"],
    verifiedBadge: "gold-pro",
    linkedProductId: "prod-001"
  },
  // 5. Archival Double-Breasted Trench Overcoat
  {
    id: "uv-5",
    title: "Archival Double-Breasted Trench Overcoat",
    badge: "Archival Double-Breasted Trench Overcoat",
    tag: "SAVILE ROW ARCHIVE",
    desc: "Heavy wool-cashmere blend • Silk faille storm flaps & horn buttons",
    price: 65000,
    originalPrice: 85000,
    sizes: "XS - XL",
    image: "/images/salon/arrival-1.jpg",
    silhouette: "Tailored Overcoat",
    silhouetteFamily: "tailored-menswear",
    fabrics: ["Wool-Cashmere", "Cashmere", "Wool", "Silk Faille"],
    colors: ["charcoal", "black", "slate", "dark grey"],
    crafts: ["Tailored Structure", "Double Breasted", "Horn Buttons"],
    designFeatures: ["Wide Peaked Lapels", "Double Breasted Front", "Storm Flaps", "Deep Vent"],
    era: "Contemporary Savile Row",
    gender: "men",
    occasions: ["Winter Gala", "Travel Luxe", "Formal Evening"],
    verifiedBadge: "blue-tick",
    linkedProductId: "prod-002"
  },
  // 6. Gilded Silk Organza Kalidar Lehenga
  {
    id: "uv-6",
    title: "Gilded Silk Organza Kalidar Lehenga",
    badge: "Gilded Silk Organza Kalidar Lehenga",
    tag: "BESPOKE MASTERPIECE",
    desc: "32-kali kalidar flare • Gotapatti & badla hand embroidery with sheer veil",
    price: 145000,
    originalPrice: 185000,
    sizes: "CUSTOM MEASURES",
    image: "/images/salon/arrival-2.jpg",
    silhouette: "Kalidar Lehenga",
    silhouetteFamily: "royal-ethnic-women",
    fabrics: ["Silk Organza", "Raw Silk", "Silk Velvet", "Organza"],
    colors: ["gold", "champagne", "ivory", "beige", "rose gold"],
    crafts: ["Gotapatti", "Badla Embroidery", "Scalloped Veil", "Zardozi", "Antique Gold Zardozi"],
    designFeatures: ["32-Kali Flare", "Hand-Dyed Badla Border", "Sweetheart Choli", "Tissue Veil"],
    era: "Mughal Renaissance",
    gender: "women",
    occasions: ["Bridal", "Wedding", "Sangeet", "Reception"],
    verifiedBadge: "gold-pro",
    linkedProductId: "prod-in-002"
  },
  // 7. Ivory Silk Bandhgala Tuxedo Ensemble
  {
    id: "uv-7",
    title: "Ivory Silk Bandhgala Tuxedo Ensemble",
    badge: "Ivory Silk Bandhgala Tuxedo Ensemble",
    tag: "READY TO TAILOR",
    desc: "High mandarin collar • Concealed placket with rosewood button interior",
    price: 78000,
    originalPrice: 95000,
    sizes: "38 - 46",
    image: "/images/salon/arrival-3.jpg",
    silhouette: "Tailored Bandhgala",
    silhouetteFamily: "royal-ethnic-men",
    fabrics: ["Spun Silk", "Matka Silk", "Loomed Silk"],
    colors: ["ivory", "cream", "white", "champagne"],
    crafts: ["Mandarin Collar", "Concealed Placket", "Tailored Cut"],
    designFeatures: ["Mandarin Collar", "Concealed Placket", "Tailored Canvas Chest", "Side Vents"],
    era: "Contemporary Savile Row",
    gender: "men",
    occasions: ["Cocktail Reception", "Black Tie", "Groom", "Formal"],
    verifiedBadge: null,
    linkedProductId: "prod-in-004"
  },
  // 8. Crimson Crystal Embellished Ballgown
  {
    id: "uv-8",
    title: "Crimson Crystal Embellished Ballgown",
    badge: "Crimson Crystal Embellished Ballgown",
    tag: "VAULT COUTURE",
    desc: "Layered chantilly lace • Hand-sewn Swarovski ruby crystals & sweeping train",
    price: 245000,
    originalPrice: 295000,
    sizes: "BESPOKE COMMISSION",
    image: "/images/salon/arrival-4.jpg",
    silhouette: "Corseted Ballgown",
    silhouetteFamily: "western-couture-women",
    fabrics: ["Chantilly Lace", "Duchess Satin", "Silk Velvet"],
    colors: ["crimson", "ruby", "red", "burgundy"],
    crafts: ["Swarovski Crystals", "Crystal Pavé", "Sweeping Train"],
    designFeatures: ["Boned Sweetheart Bodice", "Layered Crystal Chantilly Lace", "Full Cathedral Train"],
    era: "Belle Époque Guild",
    gender: "women",
    occasions: ["Opera Gala", "Grand Reception", "Red Carpet"],
    verifiedBadge: "blue-tick",
    linkedProductId: "prod-001"
  },
  // 9. Obsidian Velvet Jodhpuri Bandhgala
  {
    id: "uv-9",
    title: "Obsidian Velvet Jodhpuri Bandhgala",
    badge: "Obsidian Velvet Jodhpuri Bandhgala",
    tag: "VAULT CLEARANCE • MEN",
    desc: "Midnight obsidian silk velvet • Hand-turned brass buttons and bespoke canvas front",
    price: 54000,
    originalPrice: 180000,
    sizes: "40 Regular",
    image: "/images/salon/obsidian-bandhgala.jpg",
    silhouette: "Tailored Bandhgala",
    silhouetteFamily: "royal-ethnic-men",
    fabrics: ["Silk Velvet", "Raw Silk", "Velvet"],
    colors: ["black", "obsidian", "charcoal", "gold"],
    crafts: ["Hand-Turned Brass Buttons", "Mandarin Collar", "Bespoke Canvas Front"],
    designFeatures: ["Jodhpuri High Collar", "Hand-Turned Brass Buttons", "Floating Canvas Chest", "Double Jet Pockets"],
    era: "Heritage Royal",
    gender: "men",
    occasions: ["Formal Evening", "Black Tie", "Cocktail", "Royal Gala"],
    verifiedBadge: "gold-pro",
    linkedProductId: "prod-deal-001"
  },
  // 10. Imperial Banarasi Brocade Sherwani
  {
    id: "uv-10",
    title: "Imperial Banarasi Brocade Sherwani",
    badge: "Imperial Banarasi Brocade Sherwani",
    tag: "ROYAL HERITAGE",
    desc: "Kadwa brocade weave with real silver and gold zari threads • Royal Rajasthani court tailoring",
    price: 165000,
    originalPrice: 210000,
    sizes: "CUSTOM BESPOKE",
    image: "/images/salon/sig-sherwani.jpg",
    silhouette: "Structured Sherwani",
    silhouetteFamily: "royal-ethnic-men",
    fabrics: ["Banarasi Brocade", "Raw Silk", "Silk Brocade"],
    colors: ["gold", "mustard", "cream", "champagne", "ivory"],
    crafts: ["Kadwa Weave", "Silver Zari", "Gold Zari", "Mandarin Collar"],
    designFeatures: ["Court Achkan Hem", "High Band Collar", "Front Button Placket", "Bespoke Structured Shoulder"],
    era: "Heritage Royal",
    gender: "men",
    occasions: ["Wedding", "Groom", "Royal Reception"],
    verifiedBadge: "gold-pro",
    linkedProductId: "sig-sherwani"
  },
  // 12. Parisian Modernism Sculpted Cape Gown
  {
    id: "uv-12",
    title: "Parisian Modernism Sculpted Cape Gown",
    badge: "Parisian Modernism Sculpted Cape Gown",
    tag: "PARIS ARCHIVAL RUNWAY",
    desc: "Sculpted ivory duchess satin with detachable architectural wing cape • Hand-finished in Paris",
    price: 260000,
    originalPrice: 310000,
    sizes: "FR 36 - 42",
    image: "/images/salon/sig-parisian.jpg",
    silhouette: "Corseted Gown",
    silhouetteFamily: "western-couture-women",
    fabrics: ["Duchess Satin", "Silk Gazar", "French Satin"],
    colors: ["ivory", "white", "pearl", "gold"],
    crafts: ["Detachable Wing Cape", "Corsetry", "Architectural Draping"],
    designFeatures: ["Detachable Architectural Wing Cape", "Boned Bodice", "Minimalist Column Skirt"],
    era: "Parisian Atelier",
    gender: "women",
    occasions: ["Met Gala", "Opera Gala", "Red Carpet", "Modern Wedding"],
    verifiedBadge: "gold-pro",
    linkedProductId: "sig-parisian"
  },
  // 13. Kids Mustard Zardozi Silk Short Kurta
  {
    id: "uv-13",
    title: "Kids Mustard Zardozi Silk Short Kurta",
    badge: "Kids Mustard Zardozi Silk Short Kurta",
    tag: "JUNIOR COUTURE",
    desc: "Raw silk short festive kurta with delicate thread zardozi on mandarin collar • Comfort cotton lining",
    price: 24000,
    originalPrice: 32000,
    sizes: "Age 2 - 12Y",
    image: "/images/categories/kids/kids-kurta.png",
    silhouette: "Ethnic Kurta Set",
    silhouetteFamily: "junior-kids",
    fabrics: ["Raw Silk", "Mulberry Silk", "Cotton Lining"],
    colors: ["mustard", "yellow", "gold", "ochre"],
    crafts: ["Mandarin Collar", "Thread Zardozi", "Festive Embroidery"],
    designFeatures: ["Mandarin Collar", "Breathable Lining", "Side Slits", "Mother of Pearl Buttons"],
    era: "Heritage Royal",
    gender: "kids",
    occasions: ["Festive", "Diwali", "Wedding", "Family Celebration"],
    verifiedBadge: "blue-tick",
    linkedProductId: "prod-in-007"
  },
  // 14. Kids Sage Green Pure Linen Shirt
  {
    id: "uv-14",
    title: "Kids Sage Green Pure Linen Shirt",
    badge: "Kids Sage Green Pure Linen Shirt",
    tag: "JUNIOR RESORT",
    desc: "Breathable European flax linen with camp collar and French seams • Washed for ultra softness",
    price: 14000,
    originalPrice: 18000,
    sizes: "Age 3 - 10Y",
    image: "/images/categories/kids/kids-casual.png",
    silhouette: "Tailored Shirt",
    silhouetteFamily: "junior-kids",
    fabrics: ["Pure Linen", "European Flax"],
    colors: ["sage", "green", "mint", "pastel green"],
    crafts: ["Camp Collar", "French Seams", "Coconut Shell Buttons"],
    designFeatures: ["Camp Collar", "Relaxed Boxy Fit", "Straight Hem"],
    era: "Parisian Atelier",
    gender: "kids",
    occasions: ["Resort", "Daywear", "Summer Party"],
    verifiedBadge: null,
    linkedProductId: "prod-in-007"
  },
  // 15. Kids Indigo Denim Bomber Jacket
  {
    id: "uv-15",
    title: "Kids Indigo Denim Bomber Jacket",
    badge: "Kids Indigo Denim Bomber Jacket",
    tag: "JUNIOR STREETWEAR",
    desc: "Selvedge Japanese denim with ribbed cuffs and antique brass zip • Embroidered atelier star logo",
    price: 18000,
    originalPrice: 24000,
    sizes: "Age 4 - 12Y",
    image: "/images/categories/kids/kids-outerwear.png",
    silhouette: "Tailored Jacket",
    silhouetteFamily: "junior-kids",
    fabrics: ["Denim", "Japanese Selvedge", "Cotton"],
    colors: ["blue", "indigo", "navy"],
    crafts: ["Ribbed Trims", "Brass Hardware", "Star Embroidery"],
    designFeatures: ["Bomber Ribbed Collar", "Front Zip", "Welt Pockets"],
    era: "Contemporary Savile Row",
    gender: "kids",
    occasions: ["Casual Luxe", "Travel", "Weekend"],
    verifiedBadge: "blue-tick",
    linkedProductId: "prod-in-007"
  },
  // 16. Kids Sky Blue Star Luxury Tee
  {
    id: "uv-16",
    title: "Kids Sky Blue Star Luxury Tee",
    badge: "Kids Sky Blue Star Luxury Tee",
    tag: "JUNIOR ESSENTIAL",
    desc: "220 GSM combed organic cotton with chain-stitched gold lurex star motif",
    price: 8500,
    originalPrice: 11000,
    sizes: "Age 2 - 12Y",
    image: "/images/categories/kids/kids-tshirt.png",
    silhouette: "Luxury Tee",
    silhouetteFamily: "junior-kids",
    fabrics: ["Organic Cotton", "Combed Cotton"],
    colors: ["sky blue", "blue", "pastel blue", "gold"],
    crafts: ["Chain Stitching", "Lurex Embroidery"],
    designFeatures: ["Crewneck", "Double Stitch Hems"],
    era: "Contemporary Savile Row",
    gender: "kids",
    occasions: ["Casual Luxe", "Playwear", "Daywear"],
    verifiedBadge: null,
    linkedProductId: "prod-in-007"
  },
  // 17. Kids Ivory Silk Miniature Sherwani
  {
    id: "uv-17",
    title: "Kids Ivory Silk Miniature Sherwani",
    badge: "Kids Ivory Silk Miniature Sherwani",
    tag: "ROYAL JUNIOR HEIRLOOM",
    desc: "Spun raw silk miniature achkan with light floral dabka needlework • Soft muslin lining for sensitive skin",
    price: 36000,
    originalPrice: 48000,
    sizes: "Age 2 - 10Y",
    image: "/images/categories/kids/kids-sherwani.png",
    silhouette: "Structured Sherwani",
    silhouetteFamily: "junior-kids",
    fabrics: ["Raw Silk", "Mulberry Silk", "Muslin"],
    colors: ["ivory", "cream", "white", "gold"],
    crafts: ["Dabka Needlework", "Mandarin Collar", "Miniature Achkan Cut"],
    designFeatures: ["Mandarin Collar", "Concealed Placket", "Comfort Lining"],
    era: "Heritage Royal",
    gender: "kids",
    occasions: ["Wedding", "Royal Ceremonial", "Groom Nephew"],
    verifiedBadge: "gold-pro",
    linkedProductId: "prod-k-2"
  },
  // 18. Kids Sand Chino Drawstring Joggers
  {
    id: "uv-18",
    title: "Kids Sand Chino Drawstring Joggers",
    badge: "Kids Sand Chino Drawstring Joggers",
    tag: "JUNIOR ESSENTIAL",
    desc: "Stretch cotton twill with elasticated drawstring waistband and tapered ankles",
    price: 11000,
    originalPrice: 15000,
    sizes: "Age 3 - 12Y",
    image: "/images/categories/kids/kids-bottoms.png",
    silhouette: "Tailored Trousers",
    silhouetteFamily: "junior-kids",
    fabrics: ["Cotton Twill", "Stretch Cotton"],
    colors: ["sand", "beige", "tan", "khaki"],
    crafts: ["Drawstring Waist", "Tapered Ankles"],
    designFeatures: ["Elasticated Waistband", "Slant Pockets"],
    era: "Contemporary Savile Row",
    gender: "kids",
    occasions: ["Casual Luxe", "Travel", "School Luxe"],
    verifiedBadge: null,
    linkedProductId: "prod-in-007"
  },
  // 19. Kids Midnight Navy Crest Suit Blazer
  {
    id: "uv-19",
    title: "Kids Midnight Navy Crest Suit Blazer",
    badge: "Kids Midnight Navy Crest Suit Blazer",
    tag: "SAVILE ROW JUNIOR",
    desc: "Super 120s virgin wool miniature tailored blazer with brass heritage crest buttons and cupro lining",
    price: 22000,
    originalPrice: 44000,
    sizes: "Age 6 - 11Y",
    image: "/images/categories/kids/kids-blazer.png",
    silhouette: "Tailored Blazer",
    silhouetteFamily: "junior-kids",
    fabrics: ["Virgin Wool", "Wool", "Cupro"],
    colors: ["navy", "dark blue", "blue", "midnight blue"],
    crafts: ["Pick Stitching", "Brass Crest Buttons", "Notch Lapel"],
    designFeatures: ["Notch Lapel", "Flap Pockets", "Brass Crest Buttons", "Tailored Fit"],
    era: "Contemporary Savile Row",
    gender: "kids",
    occasions: ["Formal", "Celebration", "Ceremony"],
    verifiedBadge: "gold-pro",
    linkedProductId: "prod-k-3"
  },
  // 21. Heritage Handcrafted Zardozi Silk Bandhgala
  {
    id: "uv-men-3",
    title: "Heritage Handcrafted Zardozi Silk Bandhgala",
    badge: "Heritage Handcrafted Zardozi Silk Bandhgala",
    tag: "ROYAL JODHPURI VAULT",
    desc: "Structured midnight raw silk bandhgala with intricate dabka needlework across the collar and shoulders",
    price: 92000,
    originalPrice: 120000,
    sizes: "38 - 44 • BESPOKE",
    image: "/images/categories/men/men-blazer.png",
    silhouette: "Tailored Bandhgala",
    silhouetteFamily: "royal-ethnic-men",
    fabrics: ["Raw Silk", "Mulberry Silk"],
    colors: ["black", "midnight", "gold", "charcoal"],
    crafts: ["Dabka Needlework", "Mandarin Collar", "Bespoke Cut"],
    designFeatures: ["Mandarin Collar", "Dabka Shoulder Needlework", "Tailored Front"],
    era: "Heritage Royal",
    gender: "men",
    occasions: ["Formal Evening", "Black Tie", "Reception", "Groom"],
    verifiedBadge: "gold-pro",
    linkedProductId: "prod-in-004"
  },
  // 22. Gilded Champagne Gold Embroidered Gala Gown
  {
    id: "uv-trending-gold-gown",
    title: "Gilded Champagne Gold Embroidered Gala Gown",
    badge: "Gilded Champagne Gold Embroidered Gala Gown",
    tag: "VERSAILLES ARCHIVE",
    desc: "Sweeping champagne duchess satin ballgown adorned with hand-couched 24k antique gold filigree and court train",
    price: 265000,
    originalPrice: 310000,
    sizes: "UK 6 - 12",
    image: "/images/salon/trending-2.jpg",
    silhouette: "Corseted Ballgown",
    silhouetteFamily: "western-couture-women",
    fabrics: ["Duchess Satin", "Silk Brocade", "Tissue Gold"],
    colors: ["gold", "champagne", "gilded", "cream", "metallic"],
    crafts: ["Gold Filigree", "Scoop Neckline", "Court Train"],
    designFeatures: ["Scoop Neckline", "Hand-Couched Gold Filigree", "Sweeping Court Train"],
    era: "Belle Époque Guild",
    gender: "women",
    occasions: ["Gala", "Opera", "Met Gala", "Red Carpet"],
    verifiedBadge: "gold-pro",
    linkedProductId: "sig-parisian"
  },
  // 23. Burgundy Wool-Crepe Tailored Midi Dress
  {
    id: "uv-trending-dress",
    title: "Burgundy Wool-Crepe Tailored Midi Dress",
    badge: "Burgundy Wool-Crepe Tailored Midi Dress",
    tag: "PARIS SALON COUTURE",
    desc: "Sculpted burgundy wool-crepe with long tailored sleeves, cinched architectural waistband & inverted pleat skirt",
    price: 88000,
    originalPrice: 110000,
    sizes: "FR 36 - 44",
    image: "/images/salon/trending-4.jpg",
    silhouette: "Tailored Midi Dress",
    silhouetteFamily: "western-couture-women",
    fabrics: ["Wool-Crepe", "Fine Wool", "Silk Crepe"],
    colors: ["burgundy", "wine", "maroon", "deep red"],
    crafts: ["Inverted Pleating", "Cinched Waistband", "Tailored Structure"],
    designFeatures: ["Jewel Neckline", "Cinched Architectural Waist", "Long Tailored Sleeves", "Inverted Pleated Skirt"],
    era: "Parisian Atelier",
    gender: "women",
    occasions: ["Salon Matinee", "Cocktail", "Formal Daywear", "Gallery Opening"],
    verifiedBadge: "gold-pro",
    linkedProductId: "sig-parisian"
  },
  // 24. Ivory Spun Silk Bandhgala Tuxedo with Mandarin Collar
  {
    id: "uv-trending-bandhgala",
    title: "Ivory Spun Silk Bandhgala Tuxedo",
    badge: "Ivory Spun Silk Bandhgala Tuxedo",
    tag: "SAVILE ROW X JODHPUR",
    desc: "Ivory loomed silk jacquard bandhgala jacket with mother of pearl buttons and tailored charcoal wool trousers",
    price: 84000,
    originalPrice: 105000,
    sizes: "38 - 46",
    image: "/images/salon/trending-3.jpg",
    silhouette: "Tailored Bandhgala",
    silhouetteFamily: "royal-ethnic-men",
    fabrics: ["Spun Silk", "Silk Jacquard", "Loomed Silk"],
    colors: ["ivory", "cream", "white", "charcoal"],
    crafts: ["Mandarin Collar", "Concealed Placket", "Tailored Cut"],
    designFeatures: ["Mandarin Collar", "Mother of Pearl Buttons", "Bespoke Shoulder Canvas"],
    era: "Contemporary Savile Row",
    gender: "men",
    occasions: ["Black Tie", "Cocktail Reception", "Formal Evening"],
    verifiedBadge: "gold-pro",
    linkedProductId: "prod-in-004"
  },
  // 25. Charcoal Double-Breasted Cashmere Suit
  {
    id: "uv-trending-suit",
    title: "Charcoal Double-Breasted Cashmere Suit",
    badge: "Charcoal Double-Breasted Cashmere Suit",
    tag: "SAVILE ROW ARCHIVE",
    desc: "Heavy double-faced cashmere wool blend with peaked lapels and hand-pleated bespoke trousers",
    price: 96000,
    originalPrice: 125000,
    sizes: "38 - 46",
    image: "/images/salon/trending-1.jpg",
    silhouette: "Tailored Suit",
    silhouetteFamily: "tailored-menswear",
    fabrics: ["Cashmere", "Wool", "Wool-Cashmere"],
    colors: ["charcoal", "black", "dark grey", "slate"],
    crafts: ["Peaked Lapels", "Double Breasted", "Horn Buttons"],
    designFeatures: ["Peaked Lapels", "6-Button Double Breasted", "Single Pleat Trousers"],
    era: "Contemporary Savile Row",
    gender: "men",
    occasions: ["Black Tie", "Formal Evening", "Winter Gala"],
    verifiedBadge: "gold-pro",
    linkedProductId: "prod-002"
  },

  // =========================================================================
  // MEN'S DESIGNER T-SHIRT ARCHIVAL CATALOG (TRAINED ACCORDING TO PDF SPEC)
  // =========================================================================

  // Test 01 Match: "Show me a black oversized T-shirt"
  {
    id: "uv-tee-1",
    title: "Maison Privée Jet Black Oversized Heavyweight Cotton Tee",
    badge: "Maison Privée Jet Black Oversized Heavyweight Cotton Tee",
    tag: "DESIGNER STREETWEAR ARCHIVE",
    desc: "280 GSM combed cotton • Architectural oversized drop-shoulder cut, crew neckline & clean boxy drape",
    price: 14500,
    originalPrice: 18500,
    sizes: "S - XXL • OVERSIZED",
    image: "/images/salon/tshirt-black-oversized.jpg",
    silhouette: "Oversized Tee",
    silhouetteFamily: "designer-tshirts",
    category: "Men",
    subcategory: "T-Shirts",
    tshirtType: "Crew Neck",
    fit: "Oversized Fit",
    neckline: "Crew Neck",
    sleeveType: "Short Sleeve",
    shoulderStyle: "Drop Shoulder",
    patternType: "Solid",
    designDetail: "Minimal",
    lengthStyle: "Regular Length",
    featuresList: [],
    fabrics: ["Cotton", "Combed Cotton", "Heavyweight Cotton", "Jersey"],
    colors: ["black", "jet black", "charcoal black"],
    crafts: ["Drop Shoulder", "Boxy Cut", "Dense Rib Collar"],
    designFeatures: ["Oversized Fit", "Drop Shoulder", "Crew Neck", "Boxy Silhouette"],
    era: "Contemporary Savile Row",
    gender: "men",
    occasions: ["Casual", "Streetwear", "Everyday"],
    verifiedBadge: "gold-pro",
    linkedProductId: "prod-tee-01"
  },

  // Test 02 Match: "Find a white round-neck cotton tee"
  {
    id: "uv-tee-2",
    title: "Pure White Round-Neck Supima Cotton Regular Tee",
    badge: "Pure White Round-Neck Supima Cotton Regular Tee",
    tag: "HAUTE LUXURY ESSENTIAL",
    desc: "100% California Supima extra-long staple cotton • Clean circular crew neckline, standard tailored regular fit",
    price: 12500,
    originalPrice: 15500,
    sizes: "XS - XXL • REGULAR FIT",
    image: "/images/salon/tshirt-white-crew-cotton.jpg",
    silhouette: "Crewneck Tee",
    silhouetteFamily: "designer-tshirts",
    category: "Men",
    subcategory: "T-Shirts",
    tshirtType: "Crew Neck",
    fit: "Regular Fit",
    neckline: "Crew Neck",
    sleeveType: "Short Sleeve",
    shoulderStyle: "Regular Shoulder",
    patternType: "Solid",
    designDetail: "Minimal",
    lengthStyle: "Regular Length",
    featuresList: [],
    fabrics: ["Cotton", "Supima Cotton", "Pure Cotton", "Jersey"],
    colors: ["white", "pure white"],
    crafts: ["Supima Weave", "Circular Neckline", "Double Needle Hems"],
    designFeatures: ["Regular Fit", "Crew Neck", "Regular Shoulder", "Minimalist Cut"],
    era: "Contemporary Savile Row",
    gender: "men",
    occasions: ["Casual", "Everyday", "Smart Casual"],
    verifiedBadge: "blue-tick",
    linkedProductId: "prod-tee-02"
  },

  // Test 03 Match: "I need a collared T-shirt with buttons"
  {
    id: "uv-tee-3",
    title: "Olive Mercerized Piqué Collared Button Polo",
    badge: "Olive Mercerized Piqué Collared Button Polo",
    tag: "SAVILE ROW SPORTING GUILD",
    desc: "Mercerized double-pique cotton • Folded polo collar with mother-of-pearl 3-button placket and gold atelier crest",
    price: 18500,
    originalPrice: 22000,
    sizes: "S - XL • REGULAR FIT",
    image: "/images/categories/men/men-polo-tshirt.png",
    silhouette: "Polo T-Shirt",
    silhouetteFamily: "designer-tshirts",
    category: "Men",
    subcategory: "T-Shirts",
    tshirtType: "Polo",
    fit: "Regular Fit",
    neckline: "Polo Collar",
    sleeveType: "Short Sleeve",
    shoulderStyle: "Regular Shoulder",
    patternType: "Solid",
    designDetail: "Minimal",
    lengthStyle: "Regular Length",
    featuresList: ["Button Placket", "Contrast Collar"],
    fabrics: ["Cotton", "Pique Cotton", "Mercerized Cotton"],
    colors: ["olive", "green", "sage", "gold"],
    crafts: ["Polo Collar", "Button Placket", "Mother of Pearl Buttons"],
    designFeatures: ["Folded Polo Collar", "3-Button Placket", "Ribbed Cuffs"],
    era: "Contemporary Savile Row",
    gender: "men",
    occasions: ["Smart Casual", "Sports", "Casual", "Weekend"],
    verifiedBadge: "gold-pro",
    linkedProductId: "prod-tee-03"
  },

  // Test 04 Match: "Show me a collarless tee with buttons"
  {
    id: "uv-tee-4",
    title: "Charcoal Slub Cotton Collarless Henley Tee",
    badge: "Charcoal Slub Cotton Collarless Henley Tee",
    tag: "HERITAGE SLUB KNIT",
    desc: "Textured charcoal slub organic cotton • Authentic collarless round neckline with exposed 3-button placket",
    price: 15000,
    originalPrice: 19000,
    sizes: "S - XXL • RELAXED FIT",
    image: "/images/salon/tshirt-charcoal-henley.jpg",
    silhouette: "Henley Tee",
    silhouetteFamily: "designer-tshirts",
    category: "Men",
    subcategory: "T-Shirts",
    tshirtType: "Henley",
    fit: "Relaxed Fit",
    neckline: "Crew Neck",
    sleeveType: "Short Sleeve",
    shoulderStyle: "Regular Shoulder",
    patternType: "Solid",
    designDetail: "Textured",
    lengthStyle: "Regular Length",
    featuresList: ["Button Placket"],
    fabrics: ["Cotton", "Slub Cotton", "Organic Cotton"],
    colors: ["charcoal", "grey", "gray", "ash"],
    crafts: ["Collarless Placket", "Slub Texture", "Horn Buttons"],
    designFeatures: ["Collarless Button Neckline", "Button Placket", "Relaxed Cut"],
    era: "Contemporary Savile Row",
    gender: "men",
    occasions: ["Casual", "Lounge", "Travel", "Weekend"],
    verifiedBadge: "blue-tick",
    linkedProductId: "prod-tee-04"
  },

  // Test 05 Match: "Find a navy blue slim-fit T-shirt"
  {
    id: "uv-tee-5",
    title: "Midnight Navy Blue Slim-Fit Pima Cotton Tee",
    badge: "Midnight Navy Blue Slim-Fit Pima Cotton Tee",
    tag: "TAILORED SILHOUETTE LAB",
    desc: "Peruvian Pima cotton jersey • Contoured body-fit cut tapered through chest and arms with reinforced crew neck",
    price: 13500,
    originalPrice: 16500,
    sizes: "XS - XL • SLIM FIT",
    image: "/images/salon/tshirt-navy-slim-pima.jpg",
    silhouette: "Slim-Fit Tee",
    silhouetteFamily: "designer-tshirts",
    category: "Men",
    subcategory: "T-Shirts",
    tshirtType: "Crew Neck",
    fit: "Slim Fit",
    neckline: "Crew Neck",
    sleeveType: "Short Sleeve",
    shoulderStyle: "Regular Shoulder",
    patternType: "Solid",
    designDetail: "Minimal",
    lengthStyle: "Regular Length",
    featuresList: [],
    fabrics: ["Cotton", "Pima Cotton", "Jersey"],
    colors: ["navy", "blue", "dark blue", "midnight blue"],
    crafts: ["Slim Tapering", "Fitted Armholes", "Flatlock Seams"],
    designFeatures: ["Slim Fit", "Fitted Arms", "Crew Neck", "Contoured Torso"],
    era: "Contemporary Savile Row",
    gender: "men",
    occasions: ["Casual", "Smart Casual", "Evening"],
    verifiedBadge: "gold-pro",
    linkedProductId: "prod-tee-05"
  },

  // Test 06 Match: "Show me a T-shirt with floral print"
  {
    id: "uv-tee-6",
    title: "Ecru Botanical Floral Print Designer Cotton Tee",
    badge: "Ecru Botanical Floral Print Designer Cotton Tee",
    tag: "BOTANICAL COUTURE EDITION",
    desc: "Soft ecru combed cotton jersey • Hand-painted botanical flower print in muted olive, amber, and slate hues",
    price: 16500,
    originalPrice: 20000,
    sizes: "S - XXL • REGULAR FIT",
    image: "/images/salon/tshirt-floral-print.jpg",
    silhouette: "Floral Print Tee",
    silhouetteFamily: "designer-tshirts",
    category: "Men",
    subcategory: "T-Shirts",
    tshirtType: "Graphic Tee",
    fit: "Regular Fit",
    neckline: "Crew Neck",
    sleeveType: "Short Sleeve",
    shoulderStyle: "Regular Shoulder",
    patternType: "Floral",
    designDetail: "Graphic Print",
    lengthStyle: "Regular Length",
    featuresList: [],
    fabrics: ["Cotton", "Combed Cotton", "Jersey"],
    colors: ["white", "ecru", "floral", "olive", "amber"],
    crafts: ["Botanical Screenprint", "Water-based Inks", "Garment Wash"],
    designFeatures: ["Floral Pattern", "Crew Neck", "Regular Fit"],
    era: "Parisian Atelier",
    gender: "men",
    occasions: ["Casual", "Party", "Summer Party", "Resort"],
    verifiedBadge: "gold-pro",
    linkedProductId: "prod-tee-06"
  },

  // Test 07 Match: "I want a sleeveless gym top"
  {
    id: "uv-tee-7",
    title: "Seamless Technical Sleeveless Gym Muscle Top",
    badge: "Seamless Technical Sleeveless Gym Muscle Top",
    tag: "MAISON ATHLETICS LAB",
    desc: "Breathable moisture-wicking technical jersey • Wide dropped armholes, sleeveless ergonomic athletic cut",
    price: 11500,
    originalPrice: 14000,
    sizes: "S - XXL • MUSCLE FIT",
    image: "/images/salon/tshirt-black-sleeveless-gym.jpg",
    silhouette: "Muscle Gym Tank",
    silhouetteFamily: "designer-tshirts",
    category: "Men",
    subcategory: "T-Shirts",
    tshirtType: "Muscle Tee",
    fit: "Muscle Fit",
    neckline: "Crew Neck",
    sleeveType: "Sleeveless",
    shoulderStyle: "Regular Shoulder",
    patternType: "Solid",
    designDetail: "Minimal",
    lengthStyle: "Regular Length",
    featuresList: [],
    fabrics: ["Polyester", "Technical Jersey", "Synthetic"],
    colors: ["black", "charcoal"],
    crafts: ["Seamless Knit", "Wide Armholes", "Laser Ventilation"],
    designFeatures: ["Sleeveless", "Muscle Fit", "Engineered Ventilation"],
    era: "Contemporary Savile Row",
    gender: "men",
    occasions: ["Sports", "Athletic", "Gym", "Workout"],
    verifiedBadge: "blue-tick",
    linkedProductId: "prod-tee-07"
  },

  // Test 08 Match: "Find a T-shirt with stitched artwork"
  {
    id: "uv-tee-8",
    title: "White Organic Cotton Stitched Artwork Embroidered Tee",
    badge: "White Organic Cotton Stitched Artwork Embroidered Tee",
    tag: "HERALDRY EMBROIDERY ATELIER",
    desc: "Pure organic cotton jersey • Verified hand-stitched embroidered gold bullion and royal navy threadwork crest artwork",
    price: 19500,
    originalPrice: 24000,
    sizes: "XS - XXL • REGULAR FIT",
    image: "/images/salon/tshirt-white-embroidered-crest.jpg",
    silhouette: "Embroidered Luxury Tee",
    silhouetteFamily: "designer-tshirts",
    category: "Men",
    subcategory: "T-Shirts",
    tshirtType: "Crew Neck",
    fit: "Regular Fit",
    neckline: "Crew Neck",
    sleeveType: "Short Sleeve",
    shoulderStyle: "Regular Shoulder",
    patternType: "Solid",
    designDetail: "Embroidered",
    lengthStyle: "Regular Length",
    featuresList: [],
    fabrics: ["Cotton", "Organic Cotton", "Jersey"],
    colors: ["white", "gold", "navy"],
    crafts: ["Stitched Artwork", "Hand Embroidery", "Silk Threadwork", "Bullion Needlework"],
    designFeatures: ["Embroidered Crest", "Stitched Threadwork", "Crew Neck"],
    era: "Contemporary Savile Row",
    gender: "men",
    occasions: ["Casual", "Smart Casual", "Gallery Opening"],
    verifiedBadge: "gold-pro",
    linkedProductId: "prod-tee-08"
  },

  // Test 09 Match: "Show me a longline relaxed-fit tee"
  {
    id: "uv-tee-9",
    title: "Sand Heavyweight Longline Relaxed-Fit Extended Tee",
    badge: "Sand Heavyweight Longline Relaxed-Fit Extended Tee",
    tag: "ARCHITECTURAL DRAPE STUDIO",
    desc: "Warm sand beige French terry cotton • Extended longline body length with exaggerated curved scallop hem & relaxed cut",
    price: 16000,
    originalPrice: 19500,
    sizes: "S - XXL • LONGLINE RELAXED",
    image: "/images/salon/tshirt-sand-longline.jpg",
    silhouette: "Longline Relaxed Tee",
    silhouetteFamily: "designer-tshirts",
    category: "Men",
    subcategory: "T-Shirts",
    tshirtType: "Longline",
    fit: "Relaxed Fit",
    neckline: "Crew Neck",
    sleeveType: "Short Sleeve",
    shoulderStyle: "Drop Shoulder",
    patternType: "Solid",
    designDetail: "Minimal",
    lengthStyle: "Longline",
    featuresList: ["Curved Hem", "Side Slits"],
    fabrics: ["Cotton", "French Terry", "Loopback Knit"],
    colors: ["sand", "beige", "tan", "camel"],
    crafts: ["Curved Scallop Hem", "Extended Hemline", "Raw Edge Finishing"],
    designFeatures: ["Longline Length", "Relaxed Fit", "Curved Hem", "Extended Body"],
    era: "Contemporary Savile Row",
    gender: "men",
    occasions: ["Streetwear", "Casual", "Travel"],
    verifiedBadge: "gold-pro",
    linkedProductId: "prod-tee-09"
  },

  // Test 10 Match: "Find a raglan T-shirt with contrast sleeves"
  {
    id: "uv-tee-10",
    title: "Two-Tone Navy Contrast Sleeve Raglan Baseball Tee",
    badge: "Two-Tone Navy Contrast Sleeve Raglan Baseball Tee",
    tag: "SAVILE ROW BASEBALL ARCHIVE",
    desc: "Combed cotton jersey • Heather white torso with deep midnight navy raglan sleeves and diagonal shoulder seam construction",
    price: 14000,
    originalPrice: 17500,
    sizes: "XS - XXL • REGULAR FIT",
    image: "/images/salon/tshirt-raglan-contrast.jpg",
    silhouette: "Raglan Baseball Tee",
    silhouetteFamily: "designer-tshirts",
    category: "Men",
    subcategory: "T-Shirts",
    tshirtType: "Raglan",
    fit: "Regular Fit",
    neckline: "Crew Neck",
    sleeveType: "Raglan Sleeve",
    shoulderStyle: "Raglan",
    patternType: "Colour Block",
    designDetail: "Minimal",
    lengthStyle: "Regular Length",
    featuresList: ["Contrast Collar", "Contrast Stitching"],
    fabrics: ["Cotton", "Combed Cotton", "Jersey"],
    colors: ["white", "navy", "two-tone", "blue"],
    crafts: ["Raglan Seams", "Contrast Color Blocking", "Diagonal Shoulder Joining"],
    designFeatures: ["Raglan Construction", "Contrast Sleeves", "Two-Tone Colour Block"],
    era: "Contemporary Savile Row",
    gender: "men",
    occasions: ["Casual", "Sports", "Weekend"],
    verifiedBadge: "gold-pro",
    linkedProductId: "prod-tee-10"
  },

  // =========================================================================
  // DOMAIN-TRAINED FLAGSHIP CORPUS: SAREES (Color, Pattern, Regional Weave)
  // =========================================================================
  {
    id: "uv-saree-bandhani",
    title: "Scarlet Crimson Bandhani Silk Georgette Saree",
    badge: "Scarlet Crimson Bandhani Silk Georgette Saree",
    tag: "ROYAL RAJPUTANA ARCHIVE",
    desc: "Hand-tied fine bandhej dots with real gold gotapatti border • Pure banarasi georgette with contrast emerald piping",
    price: 72000,
    originalPrice: 89000,
    sizes: "UNSTITCHED • BESPOKE BLOUSE",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop",
    silhouette: "Temple Drape Saree",
    silhouetteFamily: "royal-ethnic-women",
    category: "Women",
    subcategory: "Sarees & Drapes",
    fabrics: ["Georgette", "Pure Silk", "Silk Georgette", "Banarasi Silk"],
    colors: ["red", "crimson", "scarlet", "gold"],
    crafts: ["Bandhani", "Gotapatti", "24k Gold Zari", "Hand Tie-Dye"],
    designFeatures: ["Hand-Tied Bandhej Dots", "Gotapatti Border", "Contrast Piping", "Pleated Pallu"],
    era: "Heritage Royal",
    gender: "women",
    occasions: ["Wedding", "Festive", "Sangeet", "Reception"],
    verifiedBadge: "gold-pro",
    linkedProductId: "prod-deal-004"
  },
  {
    id: "uv-saree-chanderi",
    title: "Pastel Mint Chanderi Silk Saree with Zari Butti",
    badge: "Pastel Mint Chanderi Silk Saree with Zari Butti",
    tag: "MADHYA PRADESH HERITAGE",
    desc: "Featherlight handloom chanderi silk-cotton with delicate gold zari floral butti motifs and sheer meenakari border",
    price: 48000,
    originalPrice: 62000,
    sizes: "UNSTITCHED • BESPOKE BLOUSE",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop",
    silhouette: "Temple Drape Saree",
    silhouetteFamily: "royal-ethnic-women",
    category: "Women",
    subcategory: "Sarees & Drapes",
    fabrics: ["Chanderi Silk", "Cotton Silk", "Tissue Silk", "Pure Silk"],
    colors: ["mint", "sage", "green", "gold", "pastel green"],
    crafts: ["Zari Butti", "Chanderi Weaving", "Gold Zari", "Handloom"],
    designFeatures: ["Zari Butti Motifs", "Meenakari Border", "Sheer Pallu", "Traditional Floral Motifs"],
    era: "Vedic Classical",
    gender: "women",
    occasions: ["Festive", "Summer Wedding", "Ceremony"],
    verifiedBadge: "blue-tick",
    linkedProductId: "prod-deal-004"
  },
  {
    id: "uv-saree-paithani",
    title: "Royal Peacock Blue Paithani Pure Silk Saree",
    badge: "Royal Peacock Blue Paithani Pure Silk Saree",
    tag: "MAHARASHTRA PATRICIAN WEAVE",
    desc: "Handcrafted Yeola Paithani on fine silk warp • Muniya parrot-gold border with regal peacock (mor bangdi) zari pallu",
    price: 128000,
    originalPrice: 155000,
    sizes: "UNSTITCHED • BESPOKE BLOUSE",
    image: "/images/salon/sig-heritage-looms.jpg",
    silhouette: "Temple Drape Saree",
    silhouetteFamily: "royal-ethnic-women",
    category: "Women",
    subcategory: "Sarees & Drapes",
    fabrics: ["Paithani Silk", "Pure Mulberry Silk", "Zari Silk"],
    colors: ["blue", "royal blue", "peacock blue", "gold", "teal"],
    crafts: ["Paithani Weaving", "Muniya Border", "24k Gold Zari", "Peacock Pallu"],
    designFeatures: ["Muniya Border", "Mor Bangdi Pallu", "Gold Zari Weft", "Intricate Buttas"],
    era: "Vedic Classical",
    gender: "women",
    occasions: ["Bridal", "Wedding", "Grand Festive"],
    verifiedBadge: "gold-pro",
    linkedProductId: "sig-heritage"
  },

  // =========================================================================
  // DOMAIN-TRAINED FLAGSHIP CORPUS: KURTAS (Cuts, Lucknowi Chikankari, Pathani)
  // =========================================================================
  {
    id: "uv-kurta-chikankari",
    title: "Ivory Lucknowi Chikankari Pure Georgette Kurta Set",
    badge: "Ivory Lucknowi Chikankari Pure Georgette Kurta Set",
    tag: "AWADH COUTURE ARCHIVE",
    desc: "Hand-embroidered by master artisans in Lucknow • Authentic 32-stitch bakhiya, shadow work, and keel kangan needlework paired with silk churidar",
    price: 58000,
    originalPrice: 74000,
    sizes: "38 - 46 • BESPOKE",
    image: "/images/salon/bestseller-2.jpg",
    silhouette: "Ethnic Kurta Set",
    silhouetteFamily: "royal-ethnic-men",
    category: "Men",
    subcategory: "Kurtas & Tunics",
    fabrics: ["Georgette", "Mulberry Silk", "Cotton Muslin", "Raw Silk"],
    colors: ["ivory", "cream", "white", "off-white"],
    crafts: ["Chikankari", "Shadow Work", "Bakhiya Stitch", "Hand Embroidery"],
    designFeatures: ["Mandarin Collar", "Embroidered Button Placket", "Straight Cut Kurta", "Side Slits"],
    era: "Mughal Renaissance",
    gender: "men",
    occasions: ["Sangeet", "Haldi", "Festive", "Ceremonial"],
    verifiedBadge: "gold-pro",
    linkedProductId: "prod-in-001"
  },
  {
    id: "uv-kurta-angrakha",
    title: "Haldi Saffron Silk Angrakha Kurta with Mirror Work",
    badge: "Haldi Saffron Silk Angrakha Kurta with Mirror Work",
    tag: "RAJASTHANI REGAL CUT",
    desc: "Hand-spun raw silk in festive haldi saffron • Flared angrakha overlapping crossover placket with genuine mirror-work shisha embroidery",
    price: 64000,
    originalPrice: 82000,
    sizes: "38 - 46 • BESPOKE",
    image: "/images/salon/emerald-kurta-nehru.jpg",
    silhouette: "Ethnic Kurta Set",
    silhouetteFamily: "royal-ethnic-men",
    category: "Men",
    subcategory: "Kurtas & Tunics",
    fabrics: ["Raw Silk", "Chanderi Silk", "Mulberry Silk"],
    colors: ["yellow", "mustard", "saffron", "gold", "haldi"],
    crafts: ["Angrakha Style", "Mirror Work", "Gold Tilla", "Resham Needlework"],
    designFeatures: ["Overlapping Angrakha Cut", "Side Tie Dori", "Mandarin Stand Collar", "Flared Hem"],
    era: "Heritage Royal",
    gender: "men",
    occasions: ["Haldi", "Mehendi", "Sangeet", "Wedding"],
    verifiedBadge: "blue-tick",
    linkedProductId: "prod-in-004"
  },
  {
    id: "uv-kurta-pathani",
    title: "Obsidian Black Cotton Silk Pathani Kurta Set",
    badge: "Obsidian Black Cotton Silk Pathani Kurta Set",
    tag: "FRONTIER HERITAGE MENSWEAR",
    desc: "Heavyweight cotton silk tailored with sharp military epaulet shoulder flaps, dual patch pockets, and curved round hem",
    price: 42000,
    originalPrice: 54000,
    sizes: "38 - 46 • BESPOKE",
    image: "/images/salon/obsidian-bandhgala.jpg",
    silhouette: "Ethnic Kurta Set",
    silhouetteFamily: "royal-ethnic-men",
    category: "Men",
    subcategory: "Kurtas & Tunics",
    fabrics: ["Cotton Silk", "Bangalore Silk", "Poplin Cotton"],
    colors: ["black", "obsidian", "noir"],
    crafts: ["Mandarin Collar", "Shoulder Flaps", "Ornamental Buttons", "Pathani Cut"],
    designFeatures: ["Military Shoulder Tabs", "Dual Flap Chest Pockets", "Curved Hem", "French Cuff Placket"],
    era: "Heritage Royal",
    gender: "men",
    occasions: ["Festive", "Evening", "Reception"],
    verifiedBadge: "gold-pro",
    linkedProductId: "prod-in-004"
  },

  // =========================================================================
  // DOMAIN-TRAINED FLAGSHIP CORPUS: SHIRTS (Tuxedo, Linen Cuban, Bengal Stripe)
  // =========================================================================
  {
    id: "uv-shirt-tuxedo",
    title: "Crisp White Pleated Bib Tuxedo Dress Shirt",
    badge: "Crisp White Pleated Bib Tuxedo Dress Shirt",
    tag: "SAVILE ROW BLACK TIE",
    desc: "200-ply Egyptian Giza cotton poplin • Architectural 1/4-inch front bib pleats, spread formal collar, and convertible double French cuffs",
    price: 26000,
    originalPrice: 34000,
    sizes: "15.0 - 17.5 • TAILORED FIT",
    image: "/images/products/similar/similar_cashmere_navy.jpg",
    silhouette: "Tailored Dress Shirt",
    silhouetteFamily: "tailored-menswear",
    category: "Men",
    subcategory: "Shirts",
    fabrics: ["Egyptian Cotton", "Poplin Cotton", "Pure Cotton"],
    colors: ["white", "pure white", "snow"],
    crafts: ["Bib Pleating", "French Cuffs", "Spread Collar", "Stud Front Placket"],
    designFeatures: ["Front Bib Pleats", "French Cuffs", "Removable Stud Buttons", "Tailored Fit"],
    era: "Parisian Atelier",
    gender: "men",
    occasions: ["Black Tie", "Gala", "Wedding", "Red Carpet"],
    verifiedBadge: "gold-pro",
    linkedProductId: "prod-4"
  },
  {
    id: "uv-shirt-cuban-linen",
    title: "Terracotta Italian Flax Linen Camp Collar Resort Shirt",
    badge: "Terracotta Italian Flax Linen Camp Collar Resort Shirt",
    tag: "RIVIERA RESORT ARCHIVE",
    desc: "Pure Italian Normandy flax linen washed for soft drape • Open notched Cuban camp collar with carved mother-of-pearl buttons",
    price: 22000,
    originalPrice: 29000,
    sizes: "S - XXL • RELAXED FIT",
    image: "/images/categories/men/men-shirt.png",
    silhouette: "Linen Resort Shirt",
    silhouetteFamily: "tailored-menswear",
    category: "Men",
    subcategory: "Shirts",
    fabrics: ["Pure Linen", "European Flax", "Linen"],
    colors: ["terracotta", "rust", "copper", "orange", "brown"],
    crafts: ["Camp Collar", "Mother of Pearl Buttons", "Boxy Fit", "Straight Hem"],
    designFeatures: ["Cuban Camp Collar", "Straight Square Hem", "Side Vents", "Short Sleeves"],
    era: "Parisian Atelier",
    gender: "men",
    occasions: ["Resort", "Vacation", "Summer Casual"],
    verifiedBadge: "blue-tick",
    linkedProductId: "prod-4"
  },
  {
    id: "uv-shirt-striped",
    title: "Sky Blue Bengal Stripe Tailored Poplin Dress Shirt",
    badge: "Sky Blue Bengal Stripe Tailored Poplin Dress Shirt",
    tag: "MAYFAIR BESPOKE SHIRTING",
    desc: "140s double-twist compact cotton poplin in clean sky blue & white vertical Bengal stripes with semi-spread collar",
    price: 24000,
    originalPrice: 31000,
    sizes: "15.0 - 17.5 • SLIM FIT",
    image: "/images/categories/men/men-shirt.png",
    silhouette: "Tailored Dress Shirt",
    silhouetteFamily: "tailored-menswear",
    category: "Men",
    subcategory: "Shirts",
    fabrics: ["Cotton Poplin", "Pima Cotton", "Egyptian Cotton"],
    colors: ["sky blue", "blue", "white", "pastel blue"],
    crafts: ["Bengal Stripe", "Semi-Spread Collar", "Mother of Pearl Buttons", "Slim Fit"],
    designFeatures: ["Vertical Bengal Stripes", "Semi-Spread English Collar", "Two-Button Barrel Cuffs", "Clean French Placket"],
    era: "Parisian Atelier",
    gender: "men",
    occasions: ["Business", "Formal", "Smart Casual"],
    verifiedBadge: "gold-pro",
    linkedProductId: "prod-4"
  }
];

// =========================================================================
// 2. FASHION LEXICON & SYNONYM DICTIONARY (PDF ATTRIBUTE SPECIFICATION)
// =========================================================================

export const COLOR_MAP: Record<string, string[]> = {
  blue: ["blue", "royal blue", "sapphire", "cobalt", "azure", "cerulean", "indigo", "midnight blue", "dark blue"],
  navy: ["navy", "dark blue", "deep navy", "midnight blue"],
  "sky blue": ["sky blue", "baby blue", "pastel blue", "light blue", "powder blue"],
  ivory: ["ivory", "cream", "off-white", "off white", "white", "pure white", "pearl", "bone", "ecru", "milk", "champagne", "snow", "eggshell", "mukul"],
  white: ["white", "pure white", "snow", "ivory", "cream", "off-white", "off white", "pearl", "chalk", "milk", "eggshell", "bone", "ecru", "alabaster", "mukul"],
  cream: ["cream", "ivory", "off-white", "off white", "white", "pearl", "milk", "buttercream", "vanilla", "snow"],
  gold: ["gold", "golden", "zari", "metallic", "brass", "gilded", "tilla", "antique gold"],
  yellow: ["yellow", "ochre", "haldi", "marigold", "amber"],
  mustard: ["mustard", "ochre", "haldi"],
  burgundy: ["burgundy", "wine", "maroon", "crimson", "ruby", "oxblood", "cherry", "deep red"],
  wine: ["wine", "burgundy", "maroon", "crimson", "plum"],
  crimson: ["crimson", "red", "ruby", "scarlet"],
  red: ["red", "crimson", "ruby", "vermillion", "rose"],
  emerald: ["emerald", "dark green", "bottle green", "forest green", "royal green"],
  green: ["green", "emerald", "sage", "mint", "olive", "forest green"],
  sage: ["sage", "mint", "green", "pastel green", "seafoam"],
  mint: ["mint", "sage", "pastel green"],
  black: ["black", "obsidian", "noir", "charcoal", "onyx", "midnight"],
  charcoal: ["charcoal", "slate", "grey", "gray", "dark grey"],
  aubergine: ["aubergine", "purple", "violet", "plum", "magenta"],
  purple: ["purple", "aubergine", "violet", "plum", "magenta", "lavender"],
  magenta: ["magenta", "plum", "purple", "fuchsia", "pink"],
  pink: ["pink", "rose", "blush", "pastel pink", "peach", "rose gold"],
  peach: ["peach", "apricot", "coral", "blush"],
  copper: ["copper", "bronze", "rust", "terracotta", "metallic"],
  beige: ["beige", "sand", "tan", "khaki", "camel", "nude"],
  camel: ["camel", "tan", "sand", "beige", "warm tan"]
};

export const SILHOUETTE_MAP: Record<string, string[]> = {
  sherwani: ["sherwani", "shrewani", "shervani", "sherwaani", "sharwani", "achkan", "angrakha sherwani", "court achkan", "groom coat", "royal sherwani"],
  bandhgala: ["bandhgala", "jodhpuri", "nehru jacket", "mandarin coat", "closed collar coat"],
  kurta: ["kurta", "kurti", "tunic", "ethnic top", "kurta pajama", "kurta set", "pathani", "angrakha kurta", "short kurta"],
  lehenga: ["lehenga", "kalidar", "ghagra", "choli", "kalidar flare", "can-can"],
  saree: ["saree", "sari", "kanjivaram saree", "banarasi saree", "chanderi saree", "paithani saree", "patola saree", "bandhani saree", "saree drape", "sari drape"],
  gown: ["gown", "ballgown", "evening dress", "corset gown", "column gown", "maxi dress", "gala gown"],
  dress: ["dress", "frock", "slip dress", "midi dress"],
  trench: ["trench", "overcoat", "coat", "cloak", "cape", "peacoat"],
  jacket: ["jacket", "bomber", "blazer", "outerwear", "shrug"],
  suit: ["suit", "tuxedo", "blazer", "trouser suit"],
  shirt: ["shirt", "dress shirt", "tuxedo shirt", "camp shirt", "button-down", "linen shirt", "oxford shirt", "resort shirt"],
  "t-shirt": ["t-shirt", "tshirt", "tee", "crewneck", "polo tee", "henley tee"],
  pants: ["pants", "trousers", "joggers", "chino", "churidar", "slacks", "jeans"]
};

export const FABRIC_MAP: Record<string, string[]> = {
  velvet: ["velvet", "silk velvet", "makhmal", "micro-velvet", "sculpted velvet"],
  silk: ["silk", "raw silk", "spun silk", "mulberry", "matka", "tussar", "brocade", "kanjivaram silk", "banarasi silk"],
  organza: ["organza", "silk organza", "sheer", "tissue", "tissue organza"],
  satin: ["satin", "duchess satin", "charmeuse", "silky", "silk satin"],
  linen: ["linen", "pure linen", "flax", "european flax"],
  cotton: ["cotton", "combed cotton", "pique", "poplin", "muslin"],
  denim: ["denim", "chambray", "jean", "selvedge"],
  cashmere: ["cashmere", "pashmina", "wool", "wool-cashmere", "wool-crepe"],
  lace: ["lace", "chantilly", "net", "crochet"]
};

export const CRAFT_MAP: Record<string, string[]> = {
  zardozi: ["zardozi", "zardosi", "bullion", "metallic wire", "gold embroidery", "antique gold zardozi"],
  tilla: ["tilla", "kashmiri", "ari", "needlework", "kashmiri tilla"],
  gotapatti: ["gotapatti", "gota patti", "gota", "badla"],
  chikankari: ["chikankari", "shadow work", "bakhiya", "lucknowi", "tepchi", "phanda"],
  dabka: ["dabka", "dabka needlework", "naqshi dabka"],
  zari: ["zari", "gold zari", "silver zari", "brocade", "weaving", "korvai", "kadwa", "shikargah"],
  crystals: ["crystals", "swarovski", "stones", "sequins", "pavé", "mirror", "shisha", "mirror work"],
  bandhani: ["bandhani", "bandhej", "tie dye", "tie-dye", "leheriya"]
};

// =========================================================================
// SAREE ATTRIBUTE DICTIONARIES (WEAVES, PATTERNS, DRAPES)
// =========================================================================

export const SAREE_WEAVE_MAP: Record<string, string[]> = {
  "Kanjivaram": ["kanjivaram", "kancheepuram", "kanchipuram", "kanjeevaram", "korvai silk", "temple silk", "pattu saree"],
  "Banarasi": ["banarasi", "banaras", "varanasi", "katan silk", "kadwa", "shikargah", "jangla", "banarasi brocade", "kadhwa"],
  "Chanderi": ["chanderi", "chanderi silk", "chanderi cotton", "chanderi zari", "zari butti chanderi"],
  "Paithani": ["paithani", "paithani silk", "yeola paithani", "muniya border", "peacock pallu", "mor bangdi"],
  "Patola": ["patola", "patan patola", "double ikkat", "rajkot patola", "patola silk"],
  "Bandhani": ["bandhani", "bandhej", "gharchola", "tie and dye saree", "bandhani georgette", "leheriya bandhani"],
  "Kasavu": ["kasavu", "kerala kasavu", "settu saree", "onam saree", "gold border ivory saree"],
  "Tussar": ["tussar", "tassar", "kosa silk", "wild silk", "tussar silk", "bhagalpuri"],
  "Organza": ["organza saree", "tissue saree", "silk organza drape", "glass tissue saree"],
  "Georgette": ["georgette saree", "pure georgette", "khaddi georgette", "banarasi georgette", "chiffon saree"]
};

export const SAREE_PATTERN_MAP: Record<string, string[]> = {
  "Temple Border": ["temple border", "korvai border", "gopuram", "temple spikes", "interlocked border"],
  "Floral Jaal": ["floral jaal", "jangla", "allover jaal", "flowering vine", "zari jaal", "bel jaal"],
  "Zari Butti": ["zari butti", "booti", "gold booti", "peacock motif", "manga motif", "paisley motif", "polka butti"],
  "Leheriya": ["leheriya", "leharia", "wave pattern", "diagonal stripes", "chevron stripes"],
  "Ikkat": ["ikkat", "ikat", "pochampally", "geometric ikkat", "patola print"],
  "Geometric Checks": ["kattam checks", "checks pattern", "geometric checks", "madras check", "grid pattern"],
  "Shikargah": ["shikargah", "hunting scene", "animal motifs", "elephant motif", "horse motif", "royal fauna"],
  "Kadwa Weave": ["kadwa", "kadhwa", "embossed brocade", "hand-woven motif without floats"]
};

// =========================================================================
// KURTA ATTRIBUTE DICTIONARIES (CUTS, STYLES, EMBROIDERY, COLLARS)
// =========================================================================

export const KURTA_STYLE_MAP: Record<string, string[]> = {
  "Short Kurta": ["short kurta", "hip length kurta", "casual kurta", "contemporary kurta"],
  "Straight Cut": ["straight cut kurta", "straight kurta", "classic knee-length kurta", "traditional kurta"],
  "Angrakha": ["angrakha", "angrakha cut", "overlapping kurta", "side tie kurta", "cross-over placket"],
  "Pathani": ["pathani", "pathani kurta", "khan suit", "military kurta", "shoulder flaps kurta", "curved hem pathani"],
  "Kalidar": ["kalidar kurta", "flared kurta", "anarkali kurta", "multi-panel kurta"],
  "Asymmetric": ["asymmetric kurta", "high low kurta", "draped hem kurta", "diagonal hem kurta"],
  "Kurta Pajama Set": ["kurta pajama", "kurta pyjama", "kurta set", "kurta churidar", "kurta with jacket"],
  "Nehru Kurta Set": ["nehru kurta", "kurta with nehru jacket", "kurta waistcoat set"]
};

export const KURTA_CRAFT_MAP: Record<string, string[]> = {
  "Chikankari": ["chikankari", "lucknowi chikankari", "shadow work", "bakhiya", "phanda", "keel kangan", "tepchi"],
  "Mirror Work": ["mirror work", "shisha embroidery", "reflective glasswork", "abhala work"],
  "Foil Print": ["foil print", "gold foil", "metallic print", "khari print"],
  "Thread Embroidery": ["thread embroidery", "resham work", "silk thread work", "cross stitch"],
  "Tilla Needlework": ["tilla needlework", "kashmiri tilla", "gold thread embroidery", "ari work"],
  "Bandhej": ["bandhej print", "bandhani dots", "tie dye kurta"]
};

// =========================================================================
// SHERWANI ATTRIBUTE DICTIONARIES (STYLES, NEEDLEWORK, WEAVES)
// =========================================================================

export const SHERWANI_STYLE_MAP: Record<string, string[]> = {
  "Royal Sherwani": ["royal sherwani", "heritage sherwani", "palatial sherwani", "ceremonial sherwani", "groom sherwani"],
  "Court Achkan": ["achkan", "court achkan", "slim achkan", "nawabi achkan", "classic achkan"],
  "Angrakha Sherwani": ["angrakha sherwani", "regal angrakha", "crossover sherwani", "flared royal sherwani"],
  "Jodhpuri Sherwani": ["jodhpuri sherwani", "jodhpuri coat", "bandhgala sherwani", "rajasthani royal coat"],
  "Velvet Cape Sherwani": ["sherwani cape", "velvet cape sherwani", "cutwork sherwani", "draped royal sherwani"]
};

export const SHERWANI_CRAFT_MAP: Record<string, string[]> = {
  "Kashmiri Tilla": ["kashmiri tilla", "tilla needlework", "looped metallic embroidery", "silver tilla", "gold tilla"],
  "Bullion Zardozi": ["bullion zardozi", "zardozi embroidery", "heavy zardozi", "antique gold zardozi", "raised bullion wire"],
  "Dabka Wire": ["dabka wire", "dabka needlework", "naqshi dabka", "french wire embroidery"],
  "Resham Work": ["resham needlework", "silk resham", "fine threadwork", "tone on tone resham"],
  "Split Cuffs": ["split french cuffs", "split cuffs", "turned back cuffs", "embroidered cuffs"],
  "Concealed Placket": ["concealed placket", "hidden buttons", "hand-turned placket", "ornamental button placket"]
};

// =========================================================================
// SHIRT ATTRIBUTE DICTIONARIES (TYPES, PATTERNS, COLLARS, CUFFS)
// =========================================================================

export const SHIRT_TYPE_MAP: Record<string, string[]> = {
  "Tuxedo Shirt": ["tuxedo shirt", "pleated tuxedo shirt", "black tie shirt", "evening dress shirt", "stud placket shirt"],
  "Dress Shirt": ["dress shirt", "formal shirt", "tailored shirt", "business shirt", "poplin dress shirt"],
  "Linen Resort Shirt": ["linen shirt", "linen resort shirt", "pure linen shirt", "summer linen shirt", "breezy linen shirt"],
  "Cuban Collar Shirt": ["cuban collar", "camp collar", "camp shirt", "open collar shirt", "bowling shirt", "cabana shirt", "resort collar shirt"],
  "Oxford Button-Down": ["oxford shirt", "button-down shirt", "ocbd", "oxford cloth button down", "casual button down"],
  "Mandarin Collar Shirt": ["mandarin collar shirt", "band collar shirt", "chinese collar shirt", "grandad collar shirt", "collarless shirt"]
};

export const SHIRT_PATTERN_MAP: Record<string, string[]> = {
  "Pin-Stripe": ["pin-stripe", "pinstripe", "fine stripe", "vertical chalk stripe", "micro stripe"],
  "Bengal Stripe": ["bengal stripe", "candy stripe", "wide vertical stripe", "bold stripe"],
  "Gingham Check": ["gingham", "gingham check", "mini check", "bicolor check"],
  "Tartan Check": ["tartan", "plaid", "tartan check", "madras plaid", "lumberjack check"],
  "Windowpane": ["windowpane", "window pane check", "box check", "architectural check"],
  "Houndstooth": ["houndstooth", "dogtooth", "pied-de-poule"],
  "Solid": ["solid shirt", "plain shirt", "monochrome shirt", "clean weave"],
  "Floral Print": ["floral shirt", "botanical print", "hawaiian print", "tropical print", "flower print shirt"]
};

export const SHIRT_COLLAR_MAP: Record<string, string[]> = {
  "Spread Collar": ["spread collar", "wide spread collar", "cutaway collar", "english spread"],
  "Point Collar": ["point collar", "narrow collar", "classic straight collar"],
  "Button-Down Collar": ["button down collar", "buttoned collar", "button-down points"],
  "Cuban Camp Collar": ["cuban collar", "camp collar", "open notched collar", "flat collar"],
  "Wingtip Collar": ["wing collar", "wingtip collar", "tuxedo wing collar"],
  "Mandarin Band": ["mandarin collar", "band collar", "stand collar", "grandad collar"]
};

export const SHIRT_CUFF_MAP: Record<string, string[]> = {
  "French Cuff": ["french cuff", "french cuffs", "double cuff", "cufflink cuff"],
  "Barrel Cuff": ["barrel cuff", "button cuff", "standard cuff", "single cuff"],
  "Convertible Cuff": ["convertible cuff", "dual button cuff"]
};

// =========================================================================
// MEN'S T-SHIRT ATTRIBUTE DICTIONARIES (SECTIONS A - L OF TRAINING SPEC)
// =========================================================================

// A. Product type canonical mapping
export const TSHIRT_TYPE_MAP: Record<string, string[]> = {
  "Crew Neck": ["crew neck", "crewneck", "round neck", "circular neck", "basic round tee"],
  "V-Neck": ["v neck", "v-neck", "v-shaped neck", "deep v neck"],
  "Polo": ["polo", "polo tee", "collared t-shirt", "collar shirt", "button polo", "collared tee", "polo shirt"],
  "Henley": ["henley", "henley tee", "collarless button tee", "button neckline", "collarless tee with buttons", "collarless with buttons"],
  "Raglan": ["baseball tee", "contrast sleeve tee", "diagonal sleeve", "raglan"],
  "Pocket Tee": ["chest pocket", "pocket t-shirt", "pocketed tee", "pocket tee"],
  "Muscle Tee": ["muscle shirt", "sleeveless tee", "gym tank", "muscle tee", "sleeveless gym top"],
  "Graphic Tee": ["artwork t-shirt", "graphic print", "illustrated tee", "graphic tee", "graphic t-shirt"],
  "Longline": ["extended-length tee", "long t-shirt", "elongated tee", "longline tee", "longline"],
  "Crop Tee": ["cropped t-shirt", "short-length tee", "crop tee"],
  "Ringer Tee": ["contrast collar", "contrast sleeve trim", "ringer shirt", "ringer tee"],
  "Baseball Tee": ["two-tone sleeves", "raglan baseball shirt", "baseball t-shirt", "baseball tee"]
};

// B. Fit canonical mapping
export const FIT_MAP: Record<string, string[]> = {
  "Slim Fit": ["slim", "body fit", "fitted", "close fit", "slim fit", "slim-fit"],
  "Regular Fit": ["regular", "standard fit", "classic fit", "regular fit"],
  "Relaxed Fit": ["relaxed", "loose fit", "comfortable fit", "relaxed fit", "loose"],
  "Oversized Fit": ["oversized", "baggy", "extra loose", "roomy", "oversized fit", "baggy tee"],
  "Boxy Fit": ["boxy", "square fit", "wide cut", "boxy fit"],
  "Muscle Fit": ["muscle fit", "tight chest", "fitted arms"],
  "Skinny Fit": ["very slim", "extra fitted", "tight fit", "skinny fit"]
};

// C. Neckline canonical mapping
export const NECKLINE_MAP: Record<string, string[]> = {
  "Crew Neck": ["round neck", "circular neck", "crew neck", "crewneck"],
  "V-Neck": ["v neckline", "pointed neckline", "v-neck", "v neck"],
  "Scoop Neck": ["wide round neck", "deep curved neck", "scoop neck"],
  "U-Neck": ["u-shaped neckline", "u-neck"],
  "Boat Neck": ["wide neckline", "horizontal neckline", "boat neck"],
  "Polo Collar": ["folded collar", "polo collar", "collared"],
  "Mandarin Collar": ["chinese collar", "stand collar", "mandarin collar", "band collar"],
  "Mock Neck": ["short raised neck", "mock neckline", "mock neck"],
  "High Neck": ["high neckline", "raised neck", "high neck"]
};

// D. Sleeve type canonical mapping
export const SLEEVE_MAP: Record<string, string[]> = {
  "Short Sleeve": ["half sleeve", "short sleeve", "short sleeves", "half sleeves"],
  "Long Sleeve": ["full sleeve", "long sleeve", "full sleeves", "long sleeves"],
  "Sleeveless": ["no sleeves", "without sleeves", "sleeveless", "gym top", "tank top", "tank"],
  "Three-Quarter Sleeve": ["3/4 sleeve", "elbow-to-wrist length", "three quarter sleeve"],
  "Cap Sleeve": ["short shoulder-covering sleeve", "cap sleeve"],
  "Raglan Sleeve": ["diagonal shoulder seam", "baseball sleeve", "raglan sleeve", "raglan sleeves"],
  "Drop Shoulder": ["dropped sleeve", "low shoulder seam", "drop shoulder"]
};

// F. Pattern canonical mapping
export const PATTERN_MAP: Record<string, string[]> = {
  "Solid": ["plain", "single colour", "no print", "solid", "plain white", "plain black"],
  "Striped": ["stripes", "horizontal lines", "vertical stripes", "striped", "pinstripe", "pin-stripe", "bengal stripe"],
  "Checked": ["checks", "checkered", "checked", "gingham", "tartan", "windowpane", "houndstooth", "kattam"],
  "Floral": ["flower print", "floral design", "floral", "flower designs", "flowers", "botanical"],
  "Geometric": ["geometric pattern", "abstract shapes", "geometric", "ikkat", "ikat", "patola"],
  "Camouflage": ["camo", "military print", "camouflage"],
  "Tie-Dye": ["tie dye", "colour swirl", "tie-dye", "bandhani", "bandhej", "leheriya"],
  "Colour Block": ["two-tone", "colour blocking", "color block", "contrast sleeves", "two-colour"],
  "All-Over Print": ["full print", "repeated print", "all-over print"],
  "Text Print": ["typography", "slogan", "lettering", "text print"],
  "Temple Border": ["temple border", "korvai", "gopuram", "temple spikes", "interlocked border"],
  "Floral Jaal": ["floral jaal", "jangla", "allover jaal", "zari jaal", "bel jaal"],
  "Zari Butti": ["zari butti", "booti", "gold booti", "peacock motif", "manga motif", "paisley motif"],
  "Shikargah": ["shikargah", "hunting scene", "animal motifs", "kadwa weave"]
};

// G. Design and detailing canonical mapping
export const DESIGN_DETAIL_MAP: Record<string, string[]> = {
  "Graphic Print": ["artwork", "illustration", "graphic", "graphic print"],
  "Logo Print": ["brand logo", "logo tee", "logo print"],
  "Embroidered": ["embroidery", "stitched design", "threadwork", "stitched logo", "stitched artwork", "embroidered"],
  "Applique": ["fabric patch", "attached design", "applique"],
  "Textured": ["texture", "raised surface", "textured"],
  "Distressed": ["ripped", "worn-out", "damaged effect", "distressed"],
  "Washed": ["garment washed", "vintage wash", "washed"],
  "Acid Wash": ["acid-washed", "uneven faded effect", "acid wash"],
  "Sequin": ["shimmering embellishment", "sequins", "sequin"],
  "Minimal": ["minimal design", "subtle detailing", "minimal"]
};

// H. Length canonical mapping
export const LENGTH_MAP: Record<string, string[]> = {
  "Regular Length": ["standard length", "normal length", "regular length"],
  "Longline": ["long length", "extended hem", "longline", "long t-shirt", "extended-length"],
  "Cropped": ["crop length", "short hem", "cropped", "crop tee"],
  "Hip Length": ["ends around hips", "hip length"],
  "Below Hip": ["longer body", "below hip"]
};

// I. Shoulder construction canonical mapping
export const SHOULDER_STYLE_MAP: Record<string, string[]> = {
  "Regular Shoulder": ["standard shoulder", "normal shoulder seam", "regular shoulder"],
  "Drop Shoulder": ["dropped shoulder", "low shoulder", "drop shoulder"],
  "Raglan": ["diagonal sleeve seam", "baseball construction", "raglan"],
  "Extended Shoulder": ["extended shoulder", "extended sleeve line"]
};

// K. Occasion canonical mapping
export const OCCASION_MAP: Record<string, string[]> = {
  "Casual": ["everyday", "daily wear", "regular use", "casual"],
  "Party": ["party wear", "night out", "club wear", "party"],
  "Sports": ["athletic", "workout", "gym", "sports"],
  "Travel": ["vacation", "travel wear", "holiday", "travel"],
  "Streetwear": ["urban", "street style", "trendy", "streetwear"],
  "Lounge": ["home wear", "relaxed wear", "lounge"],
  "Smart Casual": ["semi-formal", "casual office wear", "smart casual"]
};

// L. Special features canonical mapping
export const SPECIAL_FEATURES_MAP: Record<string, string[]> = {
  "Button Placket": ["buttons", "front buttons", "button placket", "with buttons"],
  "Chest Pocket": ["front pocket", "breast pocket", "chest pocket", "pocket"],
  "Contrast Stitching": ["different-colour stitching", "contrast stitching"],
  "Contrast Collar": ["different-colour collar", "contrast collar"],
  "Side Slits": ["side cuts", "split hem", "side slits"],
  "Ribbed Hem": ["ribbed bottom", "elastic ribbing", "ribbed hem"],
  "Raw Hem": ["unfinished hem", "raw edges", "raw hem"],
  "Curved Hem": ["rounded bottom", "curved hem"],
  "Zipper": ["zip closure", "zip neckline", "zipper"],
  "Hood": ["hooded t-shirt", "hooded tee", "hood"]
};

export const DESIGN_FEATURE_MAP: Record<string, string[]> = {
  "mandarin collar": ["mandarin collar", "high collar", "band collar", "closed collar", "nehru collar"],
  "split cuffs": ["split cuffs", "french cuffs", "split cuff", "cuffs"],
  "boned basque corset": ["boned", "corset", "basque", "boned bodice", "corseted"],
  "architectural draping": ["architectural", "sculpted", "origami", "draping", "pleating", "petal shoulders"],
  "kalidar flare": ["kalidar", "flare", "32-kali", "pleated flare"],
  "scalloped veil": ["veil", "scalloped", "dupatta", "sheer veil"],
  "sweeping train": ["train", "column train", "court train", "cathedral train"],
  "temple border": ["temple border", "korvai", "gopuram", "pallu"],
  "double breasted": ["double breasted", "peaked lapels", "storm flaps"],
  "drop shoulder": ["drop shoulder", "dropped shoulder", "low shoulder"],
  "folded polo collar": ["folded collar", "polo collar", "collared"],
  "button placket": ["buttons", "button placket", "with buttons"],
  "raglan construction": ["raglan", "baseball construction", "diagonal sleeve"],
  "curved hem": ["curved hem", "rounded bottom", "extended hem"],
  "stitched artwork": ["stitched artwork", "stitched logo", "embroidery", "embroidered"]
};

// =========================================================================
// 3. SILHOUETTE FAMILY RESOLVER & STRICT CROSS-CATEGORY ISOLATION
// =========================================================================

export function getSilhouetteFamily(sil: string): SilhouetteFamily {
  const s = sil.toLowerCase();
  // Kidswear checked first so "kids tee" maps to junior-kids
  if (s.includes("kid") || s.includes("junior") || s.includes("miniature")) {
    return "junior-kids";
  }
  // Men's designer T-shirts recognized as dedicated category per training documentation
  if (
    s.includes("t-shirt") ||
    s.includes("tshirt") ||
    s.includes("tee") ||
    s.includes("polo") ||
    s.includes("henley") ||
    s.includes("raglan") ||
    s.includes("gym top") ||
    s.includes("muscle top") ||
    s.includes("muscle tee") ||
    s.includes("longline") ||
    s.includes("crop tee") ||
    s.includes("ringer tee") ||
    s.includes("baseball tee")
  ) {
    return "designer-tshirts";
  }
  // Woven formal and resort shirts (separate from knit t-shirts!)
  if (
    s.includes("shirt") ||
    s.includes("button down") ||
    s.includes("tuxedo shirt") ||
    s.includes("camp shirt") ||
    s.includes("resort shirt") ||
    s.includes("oxford")
  ) {
    return "tailored-menswear";
  }
  if (
    s.includes("sherwani") ||
    s.includes("shrewani") ||
    s.includes("achkan") ||
    s.includes("bandhgala") ||
    s.includes("jodhpuri") ||
    s.includes("kurta") ||
    s.includes("pathani") ||
    s.includes("angrakha")
  ) {
    return "royal-ethnic-men";
  }
  if (
    s.includes("lehenga") ||
    s.includes("saree") ||
    s.includes("sari") ||
    s.includes("kalidar") ||
    s.includes("anarkali") ||
    s.includes("kanjivaram") ||
    s.includes("banarasi") ||
    s.includes("chanderi") ||
    s.includes("paithani") ||
    s.includes("patola") ||
    s.includes("bandhani")
  ) {
    return "royal-ethnic-women";
  }
  if (s.includes("gown") || s.includes("ballgown") || s.includes("corset") || s.includes("midi dress") || s.includes("dress")) {
    return "western-couture-women";
  }
  if (s.includes("overcoat") || s.includes("trench") || s.includes("peacoat") || s.includes("suit") || s.includes("tuxedo")) {
    return "tailored-menswear";
  }
  return "designer-tshirts";
}

/**
 * Strict category compatibility check.
 * Evaluation Checklist: "Men's T-shirt searches do not return unrelated garment categories."
 * Saree NEVER suggests trench coats!
 * Sherwani NEVER suggests gowns!
 * T-shirt NEVER suggests sherwanis or sarees!
 */
export function areSilhouetteFamiliesCompatible(f1: SilhouetteFamily, f2: SilhouetteFamily): boolean {
  if (f1 === f2) return true;
  // Never cross adult and kids
  if (f1 === "junior-kids" || f2 === "junior-kids") return false;
  // Designer T-shirts are strictly isolated from traditional royal ethnic pieces and heavy ballgowns
  if (f1 === "designer-tshirts" || f2 === "designer-tshirts") return false;
  // Never cross ethnic menswear with western womenswear
  if (f1 === "royal-ethnic-men" && (f2 === "western-couture-women" || f2 === "royal-ethnic-women")) return false;
  if (f2 === "royal-ethnic-men" && (f1 === "western-couture-women" || f1 === "royal-ethnic-women")) return false;
  // Never cross traditional Indian saree/lehenga with western winter trench coats
  if (f1 === "royal-ethnic-women" && f2 === "tailored-menswear") return false;
  if (f2 === "royal-ethnic-women" && f1 === "tailored-menswear") return false;
  // Women western couture vs women ethnic: both are haute women, but keep affinity bounded
  if (f1 === "western-couture-women" && f2 === "royal-ethnic-women") return true;
  if (f2 === "western-couture-women" && f1 === "royal-ethnic-women") return true;
  // Menswear tailored vs royal ethnic men: both are luxury menswear
  if (f1 === "royal-ethnic-men" && f2 === "tailored-menswear") return true;
  if (f2 === "royal-ethnic-men" && f1 === "tailored-menswear") return true;

  return false;
}

// =========================================================================
// 4. COLOR DISCRIMINATION & EXTRACTION
// =========================================================================

export function resolveCanonicalColor(word: string): string {
  const w = word.toLowerCase().trim();
  if (w === "blue" || w.includes("blue")) {
    if (w.includes("sky") || w.includes("baby") || w.includes("powder")) return "sky blue";
    if (w.includes("navy")) return "navy";
    return "blue";
  }
  if (w === "sapphire" || w.includes("sapphire")) return "blue";
  if (w === "ivory" || w.includes("ivory") || w === "cream" || w === "off-white") return "ivory";
  if (w === "white") return "white";
  if (w === "black" || w === "obsidian" || w === "midnight") return "black";
  if (w === "gold" || w.includes("gold") || w === "tilla" || w === "zari") return "gold";
  if (w === "emerald" || w.includes("emerald")) return "emerald";
  if (w === "green") return "green";
  if (w === "burgundy" || w === "wine" || w === "maroon") return "burgundy";
  if (w === "crimson" || w === "ruby") return "crimson";
  if (w === "yellow" || w === "mustard") return "mustard";
  if (w === "aubergine" || w === "purple") return "aubergine";

  for (const [canon, syns] of Object.entries(COLOR_MAP)) {
    if (w === canon || syns.includes(w)) return canon;
  }
  return w;
}

/**
 * Checks whether an item contains a specific color hue (either base body or accent)
 */
export function itemMatchesColor(item: UvibeGarment, targetColor: string): boolean {
  const canon = resolveCanonicalColor(targetColor);
  let syns = COLOR_MAP[canon] || [canon];
  if (canon === "blue") {
    syns = Array.from(new Set([...syns, "navy", "sapphire", "royal blue", "dark blue", "indigo"]));
  }
  if (["white", "ivory", "cream"].includes(canon)) {
    syns = Array.from(new Set([...syns, ...(COLOR_MAP.white || []), ...(COLOR_MAP.ivory || []), ...(COLOR_MAP.cream || [])]));
  }
  const itemColors = (item.colors || []).map((c) => c.toLowerCase());
  const itemFull = `${item.title} ${item.desc} ${item.badge} ${item.tag}`.toLowerCase();

  for (const c of itemColors) {
    if (syns.includes(c)) return true;
    for (const syn of syns) {
      if (c.includes(syn) || syn.includes(c)) return true;
    }
  }

  for (const syn of syns) {
    const escaped = syn.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`\\b${escaped}\\b`, "i");
    if (regex.test(itemFull)) return true;
  }

  return false;
}

/**
 * Checks if the PRIMARY BASE fabric color of the garment matches the target color
 * (Differentiates base fabric from gold/silver embroidery accents)
 */
export function itemMatchesBaseColor(item: UvibeGarment, targetColor: string): boolean {
  const canon = resolveCanonicalColor(targetColor);
  // Garment's primary colors are the first 1-3 entries in its colors array
  const primaryHues = (item.colors || []).slice(0, 3).map((c) => resolveCanonicalColor(c));
  if (primaryHues.includes(canon)) return true;

  // White / Ivory / Cream / Off-White mutual equivalence in couture, ethnic & kids
  const whiteCluster = ["white", "ivory", "cream"];
  if (whiteCluster.includes(canon) && primaryHues.some((h) => whiteCluster.includes(h))) {
    return true;
  }

  // If target is blue, accept navy/sapphire
  if (canon === "blue" && (primaryHues.includes("navy") || primaryHues.includes("blue") || primaryHues.includes("sapphire"))) return true;
  if (canon === "navy" && (primaryHues.includes("navy") || primaryHues.includes("blue"))) return true;

  // Check title and description
  const titleLower = item.title.toLowerCase();
  const descLower = (item.desc || "").toLowerCase();
  const syns = COLOR_MAP[canon] || [canon];
  return syns.some((s) => titleLower.includes(s) || descLower.includes(s));
}

/**
 * Syntactic-semantic parser for resolving primary target color intent.
 * Handles head-modifier binding (e.g. "raw silk blue sherwani" -> target color: blue).
 */
export function extractTargetColor(
  cleaned: string,
  detectedColors: string[],
  detectedSilhouettes: string[]
): string | undefined {
  if (detectedColors.length === 0) return undefined;
  if (detectedColors.length === 1) return resolveCanonicalColor(detectedColors[0]);

  // Separate primary garment clause (before "with ...") from embellishment clause ("with antique gold zardozi...")
  const headClause = cleaned.split(/\bwith\b/i)[0] || cleaned;
  const isAccentMetal = (c: string) => /^(gold|golden|antique gold|rose gold|tilla|zari|brass|silver)$/i.test(c);

  // Multiple colors detected: resolve head-noun adjective binding
  for (const sil of detectedSilhouettes) {
    const silSyns = SILHOUETTE_MAP[sil] || [sil];
    for (const silWord of silSyns) {
      for (const col of detectedColors) {
        const colSyns = COLOR_MAP[col] || [col];
        for (const colWord of colSyns) {
          const escCol = colWord.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
          const escSil = silWord.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

          // Pattern A: [colWord] directly before [silWord] (e.g. "blue sherwani", "sapphire gown")
          if (new RegExp(`\\b${escCol}\\s+${escSil}\\b`, "i").test(cleaned)) {
            return resolveCanonicalColor(colWord);
          }
          // Pattern B: [colWord] + (up to 4 textile/silhouette modifiers) + [silWord] (e.g. "crimson silk velvet kalidar lehenga")
          if (new RegExp(`\\b${escCol}\\s+(?:\\S+\\s+){1,4}${escSil}\\b`, "i").test(headClause)) {
            return resolveCanonicalColor(colWord);
          }
          // Pattern C: fabric + [colWord] + [silWord] (e.g. "raw silk blue sherwani")
          if (new RegExp(`\\b(?:raw\\s+silk|silk|velvet|satin|duchess\\s+satin|organza|brocade|cotton|linen)\\s+${escCol}\\s+${escSil}\\b`, "i").test(cleaned)) {
            return resolveCanonicalColor(colWord);
          }
          // Pattern D: [silWord] + "in" / "of" + [colWord] (e.g. "sherwani in blue")
          if (new RegExp(`\\b${escSil}\\s+(?:in|of|shade\\s+of)\\s+(?:a\\s+)?(?:royal\\s+)?${escCol}\\b`, "i").test(cleaned)) {
            return resolveCanonicalColor(colWord);
          }
        }
      }
    }
  }

  // Head-clause non-metal hue takes precedence over embellishment accents
  for (const col of detectedColors) {
    if (isAccentMetal(col)) continue;
    const colSyns = COLOR_MAP[col] || [col];
    if (colSyns.some((cSyn) => new RegExp(`\\b${cSyn.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}\\b`, "i").test(headClause))) {
      return resolveCanonicalColor(col);
    }
  }

  // Proximity scan: color closest to silhouette noun in headClause
  let closestCol = detectedColors[0];
  let minDistance = Infinity;

  for (const sil of detectedSilhouettes) {
    const silIdx = headClause.indexOf(sil);
    if (silIdx !== -1) {
      for (const col of detectedColors) {
        const colSyns = COLOR_MAP[col] || [col];
        for (const cSyn of colSyns) {
          const colIdx = headClause.indexOf(cSyn);
          if (colIdx !== -1) {
            const dist = Math.abs(silIdx - colIdx);
            if (dist < minDistance) {
              minDistance = dist;
              closestCol = resolveCanonicalColor(cSyn);
            }
          }
        }
      }
    }
  }

  if (minDistance !== Infinity) {
    return closestCol;
  }

  return resolveCanonicalColor(detectedColors[0]);
}

// =========================================================================
// 5. SEMANTIC QUERY PARSER
// =========================================================================

export function parseFashionQuery(rawQuery: string): ParsedFashionQuery {
  const cleaned = rawQuery.toLowerCase().trim();

  const detectedGenders: ("men" | "women" | "kids")[] = [];

  // Dedicated Kidswear Triggers
  if (/\b(kid|kids|junior|child|children|baby|toddler|boy|boys|girl|girls)\b/.test(cleaned) && !cleaned.includes("groom") && !cleaned.includes("bridal")) {
    detectedGenders.push("kids");
  }

  // Dedicated Menswear Triggers
  if (
    !detectedGenders.includes("kids") &&
    /\b(men|man|mens|groom|grooms|male|gentleman|gentlemen|sherwani|shrewani|bandhgala|achkan|nehru|kurta pajama)\b/.test(cleaned)
  ) {
    detectedGenders.push("men");
  }

  // Dedicated Womenswear Triggers
  if (
    !detectedGenders.includes("kids") &&
    /\b(women|woman|womens|bride|bridal|female|lady|ladies|gown|ballgown|lehenga|saree|sari|choli|anarkali|midi dress)\b/.test(cleaned)
  ) {
    detectedGenders.push("women");
  }

  // Detect colors
  const detectedColors: string[] = [];
  for (const [colorName, syns] of Object.entries(COLOR_MAP)) {
    if (syns.some((syn) => cleaned.includes(syn))) {
      detectedColors.push(colorName);
    }
  }

  // Detect silhouettes
  const detectedSilhouettes: string[] = [];
  for (const [silName, syns] of Object.entries(SILHOUETTE_MAP)) {
    if (syns.some((syn) => cleaned.includes(syn))) {
      detectedSilhouettes.push(silName);
    }
  }

  // Detect fabrics
  const detectedFabrics: string[] = [];
  for (const [fabName, syns] of Object.entries(FABRIC_MAP)) {
    if (syns.some((syn) => cleaned.includes(syn))) {
      detectedFabrics.push(fabName);
    }
  }

  // Detect crafts
  const detectedCrafts: string[] = [];
  for (const [craftName, syns] of Object.entries(CRAFT_MAP)) {
    if (syns.some((syn) => cleaned.includes(syn))) {
      detectedCrafts.push(craftName);
    }
  }

  // Detect design features
  const detectedDesignFeatures: string[] = [];
  for (const [featName, syns] of Object.entries(DESIGN_FEATURE_MAP)) {
    if (syns.some((syn) => cleaned.includes(syn))) {
      detectedDesignFeatures.push(featName);
    }
  }

  // Detect occasions
  const detectedOccasions: string[] = [];
  const occTest = [
    { name: "bridal", regex: /\b(bride|bridal|wedding|shaadi|vivah)\b/ },
    { name: "groom", regex: /\b(groom|grooms|baraat|sherwani)\b/ },
    { name: "sangeet", regex: /\b(sangeet|mehendi|haldi|festive|diwali)\b/ },
    { name: "reception", regex: /\b(reception|cocktail|evening)\b/ },
    { name: "gala", regex: /\b(gala|red carpet|black tie|opera|met gala)\b/ },
    { name: "resort", regex: /\b(resort|summer|beach|daytime|vacation)\b/ }
  ];
  for (const occ of occTest) {
    if (occ.regex.test(cleaned)) detectedOccasions.push(occ.name);
  }

  // Detect era
  const detectedEras: string[] = [];
  if (/\b(royal|heritage|ancestral|imperial|rajasthan|jaipur|court)\b/.test(cleaned)) detectedEras.push("Heritage Royal");
  if (/\b(paris|parisian|french|modern|contemporary|minimal)\b/.test(cleaned)) detectedEras.push("Parisian Atelier");
  if (/\b(mughal|nawabi|lucknow|kalidar)\b/.test(cleaned)) detectedEras.push("Mughal Renaissance");
  if (/\b(vedic|classical|temple|kanjivaram|banaras)\b/.test(cleaned)) detectedEras.push("Vedic Classical");
  if (/\b(gilded|belle epoque|victorian|corset)\b/.test(cleaned)) detectedEras.push("Belle Époque Guild");

  const primaryTargetColor = extractTargetColor(cleaned, detectedColors, detectedSilhouettes);
  const accentColors = detectedColors.filter((c) => resolveCanonicalColor(c) !== primaryTargetColor);
  const primaryTone = primaryTargetColor || detectedColors[0] || (detectedFabrics[0] ? `${detectedFabrics[0]} Tone` : "Haute Metallic");

  // =========================================================================
  // MEN'S T-SHIRT ATTRIBUTE EXTRACTIONS (From Training Manual & Architecture)
  // =========================================================================
  const isTshirtSearch =
    /\b(t-shirt|tshirt|tee|tees|polo|henley|raglan|muscle top|gym top|tank top|longline|crewneck|oversized tee|round-neck|baseball tee)\b/i.test(cleaned) &&
    !detectedGenders.includes("kids");

  let extractedTshirtType: string | undefined;
  let maxTypeLen = 0;
  for (const [type, syns] of Object.entries(TSHIRT_TYPE_MAP)) {
    for (const syn of syns) {
      if (cleaned.includes(syn) && syn.length > maxTypeLen) {
        maxTypeLen = syn.length;
        extractedTshirtType = type;
      }
    }
  }

  let extractedFit: string | undefined;
  let maxFitLen = 0;
  for (const [fit, syns] of Object.entries(FIT_MAP)) {
    for (const syn of syns) {
      if (cleaned.includes(syn) && syn.length > maxFitLen) {
        maxFitLen = syn.length;
        extractedFit = fit;
      }
    }
  }

  let extractedNeckline: string | undefined;
  let maxNeckLen = 0;
  for (const [neck, syns] of Object.entries(NECKLINE_MAP)) {
    for (const syn of syns) {
      if (cleaned.includes(syn) && syn.length > maxNeckLen) {
        maxNeckLen = syn.length;
        extractedNeckline = neck;
      }
    }
  }

  let extractedSleeveType: string | undefined;
  let maxSleeveLen = 0;
  for (const [slv, syns] of Object.entries(SLEEVE_MAP)) {
    for (const syn of syns) {
      if (cleaned.includes(syn) && syn.length > maxSleeveLen) {
        maxSleeveLen = syn.length;
        extractedSleeveType = slv;
      }
    }
  }

  let extractedShoulderStyle: string | undefined;
  let maxShoulderLen = 0;
  for (const [shld, syns] of Object.entries(SHOULDER_STYLE_MAP)) {
    for (const syn of syns) {
      if (cleaned.includes(syn) && syn.length > maxShoulderLen) {
        maxShoulderLen = syn.length;
        extractedShoulderStyle = shld;
      }
    }
  }

  let extractedPattern: string | undefined;
  let maxPatternLen = 0;
  for (const [pat, syns] of Object.entries(PATTERN_MAP)) {
    for (const syn of syns) {
      if (cleaned.includes(syn) && syn.length > maxPatternLen) {
        maxPatternLen = syn.length;
        extractedPattern = pat;
      }
    }
  }

  let extractedDesignDetail: string | undefined;
  let maxDetailLen = 0;
  for (const [des, syns] of Object.entries(DESIGN_DETAIL_MAP)) {
    for (const syn of syns) {
      if (cleaned.includes(syn) && syn.length > maxDetailLen) {
        maxDetailLen = syn.length;
        extractedDesignDetail = des;
      }
    }
  }

  let extractedLength: string | undefined;
  let maxLengthLen = 0;
  for (const [len, syns] of Object.entries(LENGTH_MAP)) {
    for (const syn of syns) {
      if (cleaned.includes(syn) && syn.length > maxLengthLen) {
        maxLengthLen = syn.length;
        extractedLength = len;
      }
    }
  }

  const extractedFeatures: string[] = [];
  for (const [feat, syns] of Object.entries(SPECIAL_FEATURES_MAP)) {
    if (syns.some((syn) => cleaned.includes(syn))) {
      extractedFeatures.push(feat);
    }
  }

  const hardRequirements: Record<string, string> = {};
  if (extractedFit) hardRequirements.fit = extractedFit;
  if (extractedNeckline) hardRequirements.neckline = extractedNeckline;
  if (extractedTshirtType) hardRequirements.tshirtType = extractedTshirtType;
  if (extractedSleeveType) hardRequirements.sleeveType = extractedSleeveType;
  if (extractedPattern) hardRequirements.pattern = extractedPattern;
  if (extractedDesignDetail) hardRequirements.designDetail = extractedDesignDetail;
  if (extractedLength) hardRequirements.lengthStyle = extractedLength;
  if (extractedShoulderStyle) hardRequirements.shoulderStyle = extractedShoulderStyle;

  // =========================================================================
  // SHERWANI ATTRIBUTE EXTRACTIONS (Style, Craft)
  // =========================================================================
  const isSherwaniSearch =
    /\b(sherwani|shrewani|shervani|achkan|angrakha sherwani|court achkan|jodhpuri sherwani)\b/i.test(cleaned) &&
    !detectedGenders.includes("kids");

  let extractedSherwaniStyle: string | undefined;
  let maxSherwaniStyleLen = 0;
  for (const [style, syns] of Object.entries(SHERWANI_STYLE_MAP)) {
    for (const syn of syns) {
      if (cleaned.includes(syn) && syn.length > maxSherwaniStyleLen) {
        maxSherwaniStyleLen = syn.length;
        extractedSherwaniStyle = style;
      }
    }
  }

  let extractedSherwaniCraft: string | undefined;
  let maxSherwaniCraftLen = 0;
  for (const [craft, syns] of Object.entries(SHERWANI_CRAFT_MAP)) {
    for (const syn of syns) {
      if (cleaned.includes(syn) && syn.length > maxSherwaniCraftLen) {
        maxSherwaniCraftLen = syn.length;
        extractedSherwaniCraft = craft;
      }
    }
  }

  // =========================================================================
  // KURTA ATTRIBUTE EXTRACTIONS (Style, Craft)
  // =========================================================================
  const isKurtaSearch =
    /\b(kurta|kurti|angrakha|pathani|kurta pajama|kurta pyjama|kurta set|chikankari kurta)\b/i.test(cleaned) &&
    !detectedGenders.includes("kids") &&
    !isSherwaniSearch;

  let extractedKurtaStyle: string | undefined;
  let maxKurtaStyleLen = 0;
  for (const [style, syns] of Object.entries(KURTA_STYLE_MAP)) {
    for (const syn of syns) {
      if (cleaned.includes(syn) && syn.length > maxKurtaStyleLen) {
        maxKurtaStyleLen = syn.length;
        extractedKurtaStyle = style;
      }
    }
  }

  let extractedKurtaCraft: string | undefined;
  let maxKurtaCraftLen = 0;
  for (const [craft, syns] of Object.entries(KURTA_CRAFT_MAP)) {
    for (const syn of syns) {
      if (cleaned.includes(syn) && syn.length > maxKurtaCraftLen) {
        maxKurtaCraftLen = syn.length;
        extractedKurtaCraft = craft;
      }
    }
  }

  // =========================================================================
  // SAREE ATTRIBUTE EXTRACTIONS (Weave, Pattern)
  // =========================================================================
  const isSareeSearch =
    /\b(saree|sari|kanjivaram|banarasi|chanderi|paithani|patola|bandhani|bandhej|kasavu|tussar|georgette saree|tissue saree|sari drape)\b/i.test(cleaned) &&
    !detectedGenders.includes("kids") &&
    !isSherwaniSearch &&
    !isKurtaSearch;

  let extractedSareeWeave: string | undefined;
  let maxWeaveLen = 0;
  for (const [weave, syns] of Object.entries(SAREE_WEAVE_MAP)) {
    for (const syn of syns) {
      if (cleaned.includes(syn) && syn.length > maxWeaveLen) {
        maxWeaveLen = syn.length;
        extractedSareeWeave = weave;
      }
    }
  }

  let extractedSareePattern: string | undefined;
  let maxSareePatLen = 0;
  for (const [pat, syns] of Object.entries(SAREE_PATTERN_MAP)) {
    for (const syn of syns) {
      if (cleaned.includes(syn) && syn.length > maxSareePatLen) {
        maxSareePatLen = syn.length;
        extractedSareePattern = pat;
      }
    }
  }

  // =========================================================================
  // SHIRT ATTRIBUTE EXTRACTIONS (Type, Pattern, Collar, Cuff)
  // =========================================================================
  const isShirtSearch =
    /\b(shirt|shirts|dress shirt|tuxedo shirt|camp shirt|resort shirt|oxford shirt|button-down|mandarin shirt|linen shirt)\b/i.test(cleaned) &&
    !isTshirtSearch &&
    !detectedGenders.includes("kids");

  let extractedShirtType: string | undefined;
  let maxShirtTypeLen = 0;
  for (const [type, syns] of Object.entries(SHIRT_TYPE_MAP)) {
    for (const syn of syns) {
      if (cleaned.includes(syn) && syn.length > maxShirtTypeLen) {
        maxShirtTypeLen = syn.length;
        extractedShirtType = type;
      }
    }
  }

  let extractedShirtPattern: string | undefined;
  let maxShirtPatLen = 0;
  for (const [pat, syns] of Object.entries(SHIRT_PATTERN_MAP)) {
    for (const syn of syns) {
      if (cleaned.includes(syn) && syn.length > maxShirtPatLen) {
        maxShirtPatLen = syn.length;
        extractedShirtPattern = pat;
      }
    }
  }

  let extractedShirtCollar: string | undefined;
  let maxCollarLen = 0;
  for (const [col, syns] of Object.entries(SHIRT_COLLAR_MAP)) {
    for (const syn of syns) {
      if (cleaned.includes(syn) && syn.length > maxCollarLen) {
        maxCollarLen = syn.length;
        extractedShirtCollar = col;
      }
    }
  }

  let extractedShirtCuff: string | undefined;
  let maxCuffLen = 0;
  for (const [cuff, syns] of Object.entries(SHIRT_CUFF_MAP)) {
    for (const syn of syns) {
      if (cleaned.includes(syn) && syn.length > maxCuffLen) {
        maxCuffLen = syn.length;
        extractedShirtCuff = cuff;
      }
    }
  }

  // Determine target silhouette family
  let targetFamily: SilhouetteFamily | null = null;
  if (detectedGenders.includes("kids")) {
    targetFamily = "junior-kids";
  } else if (isTshirtSearch) {
    targetFamily = "designer-tshirts";
    if (!detectedGenders.includes("men")) {
      detectedGenders.push("men");
    }
  } else if (isShirtSearch) {
    targetFamily = "tailored-menswear";
    if (!detectedGenders.includes("men")) {
      detectedGenders.push("men");
    }
  } else if (isSherwaniSearch || isKurtaSearch) {
    targetFamily = "royal-ethnic-men";
    if (!detectedGenders.includes("men")) {
      detectedGenders.push("men");
    }
  } else if (isSareeSearch) {
    targetFamily = "royal-ethnic-women";
    if (!detectedGenders.includes("women")) {
      detectedGenders.push("women");
    }
  } else if (detectedSilhouettes.length > 0) {
    const s0 = detectedSilhouettes[0];
    if (s0 === "sherwani" || s0 === "bandhgala" || s0 === "kurta") targetFamily = "royal-ethnic-men";
    else if (s0 === "lehenga" || s0 === "saree") targetFamily = "royal-ethnic-women";
    else if (s0 === "gown" || s0 === "dress") targetFamily = "western-couture-women";
    else if (s0 === "trench" || s0 === "suit" || s0 === "shirt") targetFamily = "tailored-menswear";
  } else if (detectedGenders.includes("men")) {
    targetFamily = "royal-ethnic-men";
  } else if (detectedGenders.includes("women")) {
    targetFamily = "western-couture-women";
  }

  return {
    raw: rawQuery,
    cleaned,
    detectedGenders,
    detectedSilhouettes,
    detectedFabrics,
    detectedColors,
    primaryTargetColor,
    accentColors,
    detectedCrafts,
    detectedDesignFeatures,
    detectedOccasions,
    detectedEras,
    primaryTone,
    targetFamily,
    isTshirtSearch,
    extractedTshirtType,
    extractedFit,
    extractedNeckline,
    extractedSleeveType,
    extractedShoulderStyle,
    extractedPattern,
    extractedDesignDetail,
    extractedLength,
    extractedFeatures,
    hardRequirements,
    isSareeSearch,
    extractedSareeWeave,
    extractedSareePattern,
    isKurtaSearch,
    extractedKurtaStyle,
    extractedKurtaCraft,
    isSherwaniSearch,
    extractedSherwaniStyle,
    extractedSherwaniCraft,
    isShirtSearch,
    extractedShirtType,
    extractedShirtPattern,
    extractedShirtCollar,
    extractedShirtCuff
  };
}

// =========================================================================
// 6. MULTI-DIMENSIONAL NEURAL SIMILARITY & JUSTIFICATION ALGORITHM
// =========================================================================

export { rankGarmentsByQuery } from "./uvibe-search";

// =========================================================================
// 7. ATELIER AI PROMPT ENRICHER / POLISHER
// =========================================================================

export function enrichAtelierPrompt(input: string, silhouette?: string, fabric?: string, embellishment?: string, era?: string): string {
  return [input.trim(), silhouette, fabric, embellishment, era].filter(Boolean).join(", ");
}
