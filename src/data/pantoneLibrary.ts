export interface PantoneColor {
  code: string;       // e.g. "19-3908 TCX"
  name: string;       // e.g. "White Asparagus / Charcoal"
  hex: string;        // e.g. "#2C2C2E"
  category: "Archival Neutrals" | "Royal & Oceanic" | "Tuscan & Earthy" | "Imperial Reds & Wines" | "Couture Greens" | "Haute Pastels & Runway";
  description: string;
  recommendedFabrics?: string[];
}

export const PANTONE_CATEGORIES = [
  "All Palettes",
  "Archival Neutrals",
  "Royal & Oceanic",
  "Tuscan & Earthy",
  "Imperial Reds & Wines",
  "Couture Greens",
  "Haute Pastels & Runway"
] as const;

export const PANTONE_LIBRARY: PantoneColor[] = [
  // Archival Neutrals
  {
    code: "19-3908 TCX",
    name: "Graphite Charcoal",
    hex: "#2C2C2E",
    category: "Archival Neutrals",
    description: "Balanced deep matte charcoal dyed with natural mineral graphite.",
    recommendedFabrics: ["Heavy Cashmere", "Structured Wool", "Tweed"]
  },
  {
    code: "19-4004 TCX",
    name: "Tap Shoe Black",
    hex: "#111111",
    category: "Archival Neutrals",
    description: "Pitch obsidian pigment with sharp architectural light absorption.",
    recommendedFabrics: ["Duchess Satin", "Silk Velvet", "Barathea Wool"]
  },
  {
    code: "19-0303 TCX",
    name: "Jet Black",
    hex: "#1D1D1B",
    category: "Archival Neutrals",
    description: "Classic high-fashion pitch black with deep velvet saturation.",
    recommendedFabrics: ["Velvet", "Grosgrain Silk", "Raw Cashmere"]
  },
  {
    code: "18-4005 TCX",
    name: "Steel Grey",
    hex: "#4F5257",
    category: "Archival Neutrals",
    description: "Cool architectural grey with muted metallic undertones.",
    recommendedFabrics: ["Flannel", "Merino Worsted", "Crisp Poplin"]
  },
  {
    code: "16-3801 TCX",
    name: "Dove Grey",
    hex: "#8B8C89",
    category: "Archival Neutrals",
    description: "Soft warm greige reflecting ambient salon light with understated poise.",
    recommendedFabrics: ["Habotai Silk", "Cashmere Gauze", "Crêpe de Chine"]
  },
  {
    code: "14-4102 TCX",
    name: "Glacier Grey",
    hex: "#C5C6C7",
    category: "Archival Neutrals",
    description: "Luminous pale mineral grey for summer tailoring and architectural capes.",
    recommendedFabrics: ["Tropical Wool", "Silk Georgette", "Linen"]
  },
  {
    code: "11-0601 TCX",
    name: "Bright White",
    hex: "#F4F5F0",
    category: "Archival Neutrals",
    description: "Pure bleached heritage white with pristine luminescence.",
    recommendedFabrics: ["Silk Mikado", "Cotton Piqué", "Taffeta"]
  },
  {
    code: "12-5202 TCX",
    name: "Turtledove",
    hex: "#DED7C8",
    category: "Archival Neutrals",
    description: "Warm antique alabaster reminiscent of archival vellum and pearls.",
    recommendedFabrics: ["Silk Crepe", "Cashmere Blend", "Double-face Wool"]
  },

  // Royal & Oceanic
  {
    code: "19-3832 TCX",
    name: "Navy Peony",
    hex: "#1B2430",
    category: "Royal & Oceanic",
    description: "Steeped in traditional indigo vats for profound nautical depth.",
    recommendedFabrics: ["Cashmere Melange", "Wool Gabardine", "Silk Barathea"]
  },
  {
    code: "19-4024 TCX",
    name: "Dress Blues",
    hex: "#1D2330",
    category: "Royal & Oceanic",
    description: "Diplomatic midnight navy with subtle ultramarine reflection.",
    recommendedFabrics: ["Tuxedo Wool", "Ottoman Silk", "Fine Cashmere"]
  },
  {
    code: "19-4052 TCX",
    name: "Classic Blue",
    hex: "#0F4C81",
    category: "Royal & Oceanic",
    description: "Enduring royal cobalt evoking boundless evening horizons.",
    recommendedFabrics: ["Silk Twill", "Velveteen", "Brocade"]
  },
  {
    code: "19-3952 TCX",
    name: "Surf the Web",
    hex: "#192E5B",
    category: "Royal & Oceanic",
    description: "Electric deep lapis lazuli jewel tone with regal vibrancy.",
    recommendedFabrics: ["Silk Satin", "Jacquard", "Embroidered Tulle"]
  },
  {
    code: "18-4034 TCX",
    name: "Estate Blue",
    hex: "#233658",
    category: "Royal & Oceanic",
    description: "Heritage manor blue imbued with timeless stately dignity.",
    recommendedFabrics: ["Double Breasted Overcoats", "Faille Silk", "Worsted Wool"]
  },
  {
    code: "17-4427 TCX",
    name: "Blue Danube",
    hex: "#007A87",
    category: "Royal & Oceanic",
    description: "Vivid oceanic teal marrying serene turquoise depth with jewel nobility.",
    recommendedFabrics: ["Raw Silk", "Chiffon", "Bespoke Suiting"]
  },
  {
    code: "19-4127 TCX",
    name: "Dark Sapphire",
    hex: "#182239",
    category: "Royal & Oceanic",
    description: "Crystalline deep gem sapphire with profound night luster.",
    recommendedFabrics: ["Silk Charmeuse", "Wool Silk", "Velvet"]
  },

  // Tuscan & Earthy
  {
    code: "16-1139 TCX",
    name: "Warm Camel",
    hex: "#C19A6B",
    category: "Tuscan & Earthy",
    description: "Unbleached golden Mongolian cashmere with warm honey reflections.",
    recommendedFabrics: ["Mongolian Cashmere", "Camelhair", "Alpaca Blend"]
  },
  {
    code: "17-1045 TCX",
    name: "Cumin Tan",
    hex: "#9E6C38",
    category: "Tuscan & Earthy",
    description: "Warm spice umber from roasted organic pigments.",
    recommendedFabrics: ["Suede", "Corduroy", "Heavy Wool Twill"]
  },
  {
    code: "16-1334 TCX",
    name: "Tuscan Tan",
    hex: "#A67A53",
    category: "Tuscan & Earthy",
    description: "Sun-drenched Sienna earth tone beloved by Mediterranean master tailors.",
    recommendedFabrics: ["Linen Wool", "Soft Suede", "Silk Linen"]
  },
  {
    code: "18-0937 TCX",
    name: "Raw Umber",
    hex: "#674A32",
    category: "Tuscan & Earthy",
    description: "Deep roasted hazelnut earth pigment with grounded warmth.",
    recommendedFabrics: ["Shearling", "Moleskin", "Donegal Tweed"]
  },
  {
    code: "14-1036 TCX",
    name: "Ochre Gold",
    hex: "#D8A951",
    category: "Tuscan & Earthy",
    description: "Gilded natural earth pigment with subtle amber radiance.",
    recommendedFabrics: ["Zardozi Silk", "Brocade", "Dupioni"]
  },
  {
    code: "16-0924 TCX",
    name: "Croissant",
    hex: "#BE9765",
    category: "Tuscan & Earthy",
    description: "Buttery pastry gold hue that harmonizes with mother-of-pearl buttons.",
    recommendedFabrics: ["Cashmere Knit", "Silk Crepe", "Gabardine"]
  },
  {
    code: "18-1018 TCX",
    name: "Bison",
    hex: "#6E4C3E",
    category: "Tuscan & Earthy",
    description: "Rich mahogany brown inspired by hand-burnished bridle leather.",
    recommendedFabrics: ["Hand-burnished Leather", "Heavy Melange", "Cashmere Felt"]
  },

  // Imperial Reds & Wines
  {
    code: "19-1664 TCX",
    name: "True Red",
    hex: "#BF1932",
    category: "Imperial Reds & Wines",
    description: "Runway ceremonial scarlet with high chromatic power.",
    recommendedFabrics: ["Silk Velvet", "Duchess Satin", "Heavy Crepe"]
  },
  {
    code: "19-1755 TCX",
    name: "Crimson Silk",
    hex: "#990024",
    category: "Imperial Reds & Wines",
    description: "Opulent regal crimson favored by European dynasties and bridal couturiers.",
    recommendedFabrics: ["Mulberry Silk", "Bridal Satin", "Brocade"]
  },
  {
    code: "19-1557 TCX",
    name: "Chili Pepper",
    hex: "#9B1B30",
    category: "Imperial Reds & Wines",
    description: "Sensual wine-red with simmering spice and rich theatrical drama.",
    recommendedFabrics: ["Silk Organza", "Lace Overlay", "Taffeta"]
  },
  {
    code: "19-2024 TCX",
    name: "Rhododendron",
    hex: "#5A1D2E",
    category: "Imperial Reds & Wines",
    description: "Maison Privée signature burgundy with velvety noir undertones.",
    recommendedFabrics: ["Velvet Smoking Jacket", "Cashmere Overcoat", "Duchess Silk"]
  },
  {
    code: "18-1662 TCX",
    name: "Flame Scarlet",
    hex: "#CD212A",
    category: "Imperial Reds & Wines",
    description: "Unapologetic fiery vermilion demanding central runway presence.",
    recommendedFabrics: ["Wool Melange", "Couture Gown Silk", "Tuxedo Lapel"]
  },
  {
    code: "19-2430 TCX",
    name: "Purple Wine",
    hex: "#6A2846",
    category: "Imperial Reds & Wines",
    description: "Aged vintage Bordeaux hue with rich berry reflections.",
    recommendedFabrics: ["Double Georgette", "Heavy Crepe", "Worsted Flannel"]
  },
  {
    code: "18-1438 TCX",
    name: "Marsala",
    hex: "#955251",
    category: "Imperial Reds & Wines",
    description: "Earthy wine-red embodying warmth, indulgence, and natural sophistication.",
    recommendedFabrics: ["Cashmere Blend", "Velveteen", "Silk Wool"]
  },

  // Couture Greens
  {
    code: "17-5641 TCX",
    name: "Emerald Green",
    hex: "#009473",
    category: "Couture Greens",
    description: "Radiant gemstone emerald symbolizing imperial majesty and renewal.",
    recommendedFabrics: ["Silk Satin", "Brocade", "Velvet"]
  },
  {
    code: "19-5513 TCX",
    name: "Dark Forest Green",
    hex: "#13372C",
    category: "Couture Greens",
    description: "Archival hunting green evoking evergreen pines under Scottish mist.",
    recommendedFabrics: ["Donegal Wool", "Loden Cloth", "Heavy Twill"]
  },
  {
    code: "19-0515 TCX",
    name: "Olive Night",
    hex: "#3B3A30",
    category: "Couture Greens",
    description: "Austere utilitarian dark olive with subtle golden khaki hints.",
    recommendedFabrics: ["Cotton Drill", "Waxed Cotton", "Fine Gabardine"]
  },
  {
    code: "18-0130 TCX",
    name: "Cactus Sage",
    hex: "#53634B",
    category: "Couture Greens",
    description: "Dusty architectural sage evoking sunlit Mediterranean groves.",
    recommendedFabrics: ["Linen Tailoring", "Silk Gauze", "Raw Silk"]
  },
  {
    code: "16-0220 TCX",
    name: "Greenery",
    hex: "#88B04B",
    category: "Couture Greens",
    description: "Zesty chartreuse yellow-green bursting with vitality and modern flair.",
    recommendedFabrics: ["Silk Faille", "Organza", "Poplin"]
  },
  {
    code: "15-5519 TCX",
    name: "Turquoise Sea",
    hex: "#45B5AA",
    category: "Couture Greens",
    description: "Gleaming Caribbean lagoon shade bridging soft cyan and emerald.",
    recommendedFabrics: ["Georgette", "Raw Silk", "Chiffon"]
  },

  // Haute Pastels & Runway
  {
    code: "13-1520 TCX",
    name: "Rose Quartz",
    hex: "#F7CAC9",
    category: "Haute Pastels & Runway",
    description: "Gentle mineral pink conveying composure, gentleness, and salon grace.",
    recommendedFabrics: ["Silk Habotai", "Chantilly Lace", "Georgette"]
  },
  {
    code: "16-1546 TCX",
    name: "Living Coral",
    hex: "#FF6F61",
    category: "Haute Pastels & Runway",
    description: "Vibrant yet mellow coral with a golden undertone for festive couture.",
    recommendedFabrics: ["Dupioni Silk", "Organza", "Duchess Satin"]
  },
  {
    code: "17-3938 TCX",
    name: "Very Peri",
    hex: "#6667AB",
    category: "Haute Pastels & Runway",
    description: "Dynamic periwinkle blue with violet red undertone inspiring creativity.",
    recommendedFabrics: ["Silk Taffeta", "Crepe de Chine", "Velvet"]
  },
  {
    code: "18-3838 TCX",
    name: "Ultra Violet",
    hex: "#5F4B8B",
    category: "Haute Pastels & Runway",
    description: "Provocative cosmic purple communicating original haute genius.",
    recommendedFabrics: ["Jacquard", "Heavy Velvet", "Silk Brocade"]
  },
  {
    code: "14-0848 TCX",
    name: "Mimosa Gold",
    hex: "#EFC050",
    category: "Haute Pastels & Runway",
    description: "Illuminating warm yellow evoking solar rays through vintage champagne glasses.",
    recommendedFabrics: ["Zardozi Trim", "Silk Chiffon", "Metallic Lamé"]
  },
  {
    code: "14-3207 TCX",
    name: "Pink Lavender",
    hex: "#D8B5D8",
    category: "Haute Pastels & Runway",
    description: "Soft poetic violet blush beloved in spring Paris salon shows.",
    recommendedFabrics: ["Tulle", "Silk Crepe", "Cashmere Silk"]
  },
  {
    code: "12-1403 TCX",
    name: "Tapioca Silk",
    hex: "#E4D3C5",
    category: "Haute Pastels & Runway",
    description: "Creamy bisque champagne with delicate biscuit warmth.",
    recommendedFabrics: ["Silk Satin", "Linen Silk", "Charmeuse"]
  }
];

// Helper: Convert HEX to RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let clean = hex.replace("#", "");
  if (clean.length === 3) {
    clean = clean.split("").map((c) => c + c).join("");
  }
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

// Helper: Convert RGB to HEX
export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const toHex = (v: number) => clamp(v).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

// Helper: Convert HSL to RGB
export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r1 = 0, g1 = 0, b1 = 0;
  if (h >= 0 && h < 60) {
    r1 = c; g1 = x; b1 = 0;
  } else if (h >= 60 && h < 120) {
    r1 = x; g1 = c; b1 = 0;
  } else if (h >= 120 && h < 180) {
    r1 = 0; g1 = c; b1 = x;
  } else if (h >= 180 && h < 240) {
    r1 = 0; g1 = x; b1 = c;
  } else if (h >= 240 && h < 300) {
    r1 = x; g1 = 0; b1 = c;
  } else {
    r1 = c; g1 = 0; b1 = x;
  }

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255)
  };
}

// Helper: Convert RGB to HSL
export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

// Helper: Find Closest Pantone Color in the Library
export function findClosestPantone(hex: string): { color: PantoneColor; distance: number; matchPercent: number } {
  const targetRgb = hexToRgb(hex);

  let bestMatch = PANTONE_LIBRARY[0];
  let minDistance = Infinity;

  for (const pantone of PANTONE_LIBRARY) {
    const pRgb = hexToRgb(pantone.hex);
    // Weighted Euclidean RGB distance favoring human eye perception (Red*0.3, Green*0.59, Blue*0.11)
    const dR = targetRgb.r - pRgb.r;
    const dG = targetRgb.g - pRgb.g;
    const dB = targetRgb.b - pRgb.b;
    const distance = Math.sqrt(2 * dR * dR + 4 * dG * dG + 3 * dB * dB);

    if (distance < minDistance) {
      minDistance = distance;
      bestMatch = pantone;
    }
  }

  // Max distance is ~765. Calculate match percentage
  const matchPercent = Math.max(0, Math.min(100, Math.round((1 - minDistance / 765) * 100)));

  return {
    color: bestMatch,
    distance: minDistance,
    matchPercent
  };
}
