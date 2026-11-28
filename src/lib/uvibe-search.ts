import { CATALOG_PRODUCTS, type CatalogProduct } from "../data/catalogProducts";
import { INITIAL_LISTED_PRODUCTS } from "./mock-data";
import type { ListedProduct } from "../types/studio";
import {
  UVIBE_GARMENT_CORPUS,
  parseFashionQuery,
  getSilhouetteFamily,
  areSilhouetteFamiliesCompatible,
  itemMatchesColor,
  itemMatchesBaseColor,
  resolveCanonicalColor,
  COLOR_MAP,
  FABRIC_MAP,
  CRAFT_MAP,
  FIT_MAP,
  NECKLINE_MAP,
  SLEEVE_MAP,
  PATTERN_MAP,
  DESIGN_DETAIL_MAP,
  DESIGN_FEATURE_MAP,
  OCCASION_MAP,
  SHOULDER_STYLE_MAP,
  LENGTH_MAP,
  SPECIAL_FEATURES_MAP,
  SAREE_WEAVE_MAP,
  SAREE_PATTERN_MAP,
  KURTA_STYLE_MAP,
  KURTA_CRAFT_MAP,
  SHERWANI_STYLE_MAP,
  SHERWANI_CRAFT_MAP,
  SHIRT_TYPE_MAP,
  SHIRT_PATTERN_MAP,
  SHIRT_COLLAR_MAP,
  SHIRT_CUFF_MAP,
  type UvibeGarment,
  type UvibeScoreBreakdown,
  type SilhouetteFamily,
  type ParsedFashionQuery,
} from "./uvibe-ai-engine";

export interface SearchFilters {
  silhouette?: string;
  fabric?: string;
  era?: string;
  gender?: "men" | "women" | "kids" | "unisex";
}

interface IndexedEntry {
  garment: UvibeGarment;
  sourceTier: "corpus" | "listed" | "catalog";
  primaryFabricLower: string;
  titleNorm: string;
  fullNorm: string;
  clothesKeys: string[];
  colorKeys: string[];
  fabricKeys: string[];
  craftKeys: string[];
  designKeys: string[];
  occasionKeys: string[];
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const contains = (textNorm: string, term: string) => {
  const t = normalize(term);
  if (!t) return false;
  return (" " + textNorm + " ").includes(" " + t + " ");
};

const SILHOUETTE_TYPES: Record<string, string[]> = {
  sherwani: ["sherwani", "shrewani", "shervani", "sherwaani", "sharwani", "achkan", "angrakha sherwani", "court achkan", "groom coat", "royal sherwani"],
  bandhgala: ["bandhgala", "jodhpuri", "nehru jacket", "nehru waistcoat", "mandarin coat", "closed collar coat"],
  kurta: ["kurta", "kurti", "kurta pajama", "kurta set", "short kurta", "straight cut kurta", "angrakha kurta", "pathani", "pathani kurta", "chikankari kurta", "kalidar kurta"],
  lehenga: ["lehenga", "ghagra", "kalidar lehenga", "kalidar"],
  saree: ["saree", "sari", "kanjivaram saree", "banarasi saree", "chanderi saree", "paithani saree", "patola saree", "bandhani saree", "kasavu saree", "temple drape", "saree drape", "sari drape"],
  gown: ["gown", "ballgown", "evening dress", "gala gown", "corseted gown", "column gown", "maxi dress"],
  dress: ["dress", "midi dress", "frock", "slip dress"],
  coat: ["coat", "overcoat", "peacoat", "trench", "trench coat"],
  blazer: ["blazer", "dinner jacket", "sport coat"],
  jacket: ["jacket", "bomber", "shrug"],
  suit: ["suit", "tuxedo", "three piece", "two piece"],
  shirt: ["shirt", "dress shirt", "tuxedo shirt", "camp shirt", "linen shirt", "oxford shirt", "button down", "button-down", "mandarin shirt", "cuban collar shirt", "resort shirt"],
  tshirt: ["t shirt", "tshirt", "tee", "polo", "henley", "raglan", "muscle tee", "longline", "baseball tee", "crew neck tee", "pocket tee"],
  pants: ["pants", "trousers", "joggers", "jeans", "chinos", "churidar"],
  hoodie: ["hoodie", "sweatshirt"],
  cardigan: ["cardigan"],
  sweater: ["sweater", "jumper", "knitwear"],
};

const SPECIFIC_FABRICS: Array<{ label: string; key: string; patterns: string[] }> = [
  { label: "Raw Silk", key: "raw silk", patterns: ["raw silk", "bangalore raw silk", "hand loomed raw silk", "handloom raw silk"] },
  { label: "Silk Velvet", key: "silk velvet", patterns: ["silk velvet", "sculpted velvet", "micro velvet", "italian micro velvet"] },
  { label: "Duchess Satin", key: "duchess satin", patterns: ["duchess satin", "duchesse silk", "french charmeuse", "charmeuse"] },
  { label: "Kanjivaram Silk", key: "kanjivaram silk", patterns: ["kanjivaram", "kanjivaram silk", "kanjivaram brocade", "korvai"] },
  { label: "Banarasi Brocade", key: "banarasi brocade", patterns: ["banarasi", "banarasi brocade", "banarasi silk", "katan silk", "kadwa", "shikargah"] },
  { label: "Chanderi Silk", key: "chanderi", patterns: ["chanderi", "chanderi silk", "chanderi cotton", "chanderi zari"] },
  { label: "Paithani Silk", key: "paithani", patterns: ["paithani", "paithani silk", "yeola paithani"] },
  { label: "Patola Silk", key: "patola", patterns: ["patola", "patan patola", "double ikkat"] },
  { label: "Mulberry Silk", key: "mulberry silk", patterns: ["mulberry silk", "mulberry", "pure silk", "3 ply pure silk", "tussar", "matka", "spun silk"] },
  { label: "Silk Organza", key: "organza", patterns: ["silk organza", "tissue organza", "organza", "tissue silk", "silk gazar"] },
  { label: "Georgette", key: "georgette", patterns: ["georgette", "pure georgette", "silk georgette", "khaddi georgette"] },
  { label: "Wool-Cashmere", key: "cashmere", patterns: ["wool cashmere", "cashmere", "pashmina", "virgin wool", "merino wool", "wool"] },
  { label: "Pure Linen", key: "linen", patterns: ["pure linen", "european flax", "linen"] },
  { label: "Pima Cotton", key: "cotton", patterns: ["pima cotton", "combed cotton", "organic cotton", "french terry", "cotton twill", "cotton", "supima cotton", "egyptian cotton", "cotton poplin"] },
  { label: "Chantilly Lace", key: "lace", patterns: ["chantilly lace", "lace", "tulle"] },
  { label: "Velvet", key: "velvet", patterns: ["velvet", "makhmal"] },
  { label: "Denim", key: "denim", patterns: ["denim", "selvedge"] },
  { label: "Satin", key: "satin", patterns: ["satin"] },
  { label: "Silk", key: "silk", patterns: ["silk"] },
];

const SPECIFIC_CRAFTS: Array<{ label: string; key: string; patterns: string[] }> = [
  { label: "Kashmiri Tilla", key: "tilla", patterns: ["kashmiri tilla", "tilla needlework", "tilla", "ari needlework"] },
  { label: "Bullion Zardozi", key: "zardozi", patterns: ["antique gold zardozi", "bullion zardozi", "zardozi", "zardosi", "bullion needlework", "bullion wire", "badla wire"] },
  { label: "24k Gold Zari", key: "zari", patterns: ["24k gold zari", "24k zari", "gold zari", "silver zari", "zari", "korvai", "kadwa weave", "shikargah"] },
  { label: "Gotapatti", key: "gotapatti", patterns: ["gotapatti", "gota patti", "badla embroidery", "gota"] },
  { label: "Chikankari", key: "chikankari", patterns: ["chikankari", "shadow work", "lucknowi", "bakhiya", "tepchi", "phanda"] },
  { label: "Bandhani Tie-Dye", key: "bandhani", patterns: ["bandhani", "bandhej", "tie dye", "tie-dye", "leheriya"] },
  { label: "Mirror Work", key: "mirror", patterns: ["mirror work", "shisha", "reflective glasswork", "abhala work"] },
  { label: "Dabka Needlework", key: "dabka", patterns: ["dabka needlework", "dabka", "naqshi dabka"] },
  { label: "Swarovski Crystals", key: "crystals", patterns: ["swarovski", "crystals", "crystal pave", "sequins", "mirror work"] },
  { label: "French Corsetry", key: "corsetry", patterns: ["french corsetry", "corsetry", "boned corset", "basque corset"] },
  { label: "Hand Embroidery", key: "embroidery", patterns: ["hand embroidery", "embroidered", "threadwork", "chain stitching", "resham"] },
];

function getMaps() {
  const fabrics: Record<string, string[]> = {
    ...(FABRIC_MAP || {}),
    "raw silk": ["raw silk", "bangalore raw silk", "hand loomed raw silk", "matka", "tussar"],
    "silk velvet": ["silk velvet", "micro velvet", "sculpted velvet"],
    "duchess satin": ["duchess satin", "duchesse silk", "charmeuse"],
    "kanjivaram silk": ["kanjivaram", "kanjivaram silk", "korvai"],
    "banarasi brocade": ["banarasi", "banarasi brocade", "katan silk", "brocade"],
    "chanderi silk": ["chanderi", "chanderi silk", "chanderi cotton"],
    "paithani silk": ["paithani", "paithani silk", "yeola paithani"],
    "patola silk": ["patola", "patan patola", "double ikkat"],
    georgette: ["georgette", "pure georgette", "silk georgette"],
    cashmere: ["cashmere", "pashmina"],
    wool: ["wool", "merino", "melton", "virgin wool"],
    silk: ["silk", "mulberry", "matka", "tussar", "raw silk", "banarasi", "kanjivaram"],
    organza: ["organza", "silk organza", "tissue", "gazar"],
    satin: ["satin", "charmeuse", "duchess satin"],
  };
  const colors: Record<string, string[]> = {
    ...(COLOR_MAP || {}),
    ivory: ["ivory", "cream", "off white", "champagne", "pearl", "bone", "ecru"],
    blue: ["blue", "royal blue", "sapphire", "cobalt", "azure", "cerulean", "indigo", "midnight blue", "dark blue", "navy"],
    navy: ["navy", "deep navy", "midnight blue", "dark blue"],
    "sky blue": ["sky blue", "baby blue", "pastel blue", "light blue", "powder blue"],
    chartreuse: ["chartreuse"],
    teal: ["teal"],
    turquoise: ["turquoise"],
    coral: ["coral"],
    beige: ["beige", "sand", "tan", "khaki"],
    brown: ["brown", "chocolate", "camel"],
    orange: ["orange", "saffron"],
  };
  return {
    clothes: SILHOUETTE_TYPES,
    color: colors,
    fabric: fabrics,
    craft: {
      ...(CRAFT_MAP || {}),
      ...(SAREE_WEAVE_MAP || {}),
      ...(KURTA_CRAFT_MAP || {}),
      ...(SHERWANI_CRAFT_MAP || {}),
    },
    designing: {
      ...(FIT_MAP || {}),
      ...(NECKLINE_MAP || {}),
      ...(SLEEVE_MAP || {}),
      ...(PATTERN_MAP || {}),
      ...(SAREE_PATTERN_MAP || {}),
      ...(KURTA_STYLE_MAP || {}),
      ...(SHERWANI_STYLE_MAP || {}),
      ...(SHIRT_TYPE_MAP || {}),
      ...(SHIRT_PATTERN_MAP || {}),
      ...(SHIRT_COLLAR_MAP || {}),
      ...(SHIRT_CUFF_MAP || {}),
      ...(DESIGN_DETAIL_MAP || {}),
      ...(DESIGN_FEATURE_MAP || {}),
      ...(SHOULDER_STYLE_MAP || {}),
      ...(LENGTH_MAP || {}),
      ...(SPECIAL_FEATURES_MAP || {}),
    },
  };
}

/**
 * Extract keys sorted by earliest appearance in textNorm (prominence/title-first),
 * rather than dictionary declaration order!
 */
function extractOrdered(primaryNorm: string, secondaryNorm: string, map: Record<string, string[]>): string[] {
  const scored: Array<{ key: string; rank: number }> = [];
  for (const [key, values] of Object.entries(map)) {
    let bestRank = Infinity;
    for (const v of values) {
      const vn = normalize(v);
      if (!vn) continue;
      const pIdx = (" " + primaryNorm + " ").indexOf(" " + vn + " ");
      if (pIdx !== -1) {
        bestRank = Math.min(bestRank, pIdx);
      } else {
        const sIdx = (" " + secondaryNorm + " ").indexOf(" " + vn + " ");
        if (sIdx !== -1) {
          bestRank = Math.min(bestRank, 10000 + sIdx);
        }
      }
    }
    if (bestRank < Infinity) {
      scored.push({ key, rank: bestRank });
    }
  }
  scored.sort((a, b) => a.rank - b.rank || a.key.localeCompare(b.key));
  return scored.map((s) => s.key);
}

function garmentTypes(text: string): string[] {
  const textNorm = normalize(text);
  const found = extractOrdered(textNorm, "", SILHOUETTE_TYPES);
  return found.filter(
    (t) =>
      !(t === "shirt" && found.includes("tshirt")) &&
      !(t === "dress" && (found.includes("gown") || found.includes("shirt") || textNorm.includes("dress shirt"))) &&
      !(t === "jacket" && found.includes("blazer")) &&
      !(t === "coat" && (found.includes("sherwani") || found.includes("shirt"))) &&
      !(t === "saree" && (found.includes("sherwani") || found.includes("kurta") || found.includes("lehenga") || found.includes("shirt")))
  );
}

/**
 * Strip secondary trim/lining phrases (like "velvet collar piping", "quilted lining")
 * so primary garment fabric is recognized cleanly before secondary details.
 */
function extractPrimaryBodyClause(materialsText: string): string {
  if (!materialsText) return "";
  const firstClause = materialsText.split(/[;|•]/)[0] || materialsText;
  // Remove trailing trim/lining/piping/buttons mention from comma list when prioritizing main weave
  const parts = firstClause.split(",").map((p) => p.trim()).filter(Boolean);
  const mainParts = parts.filter(
    (p) => !/\b(piping|lining|buttons|trim|tassels|can-can|stole|odhani|dupatta)\b/i.test(p)
  );
  return (mainParts.length > 0 ? mainParts.join(" ") : firstClause).trim();
}

function inferGender(rawText: string, explicitGender?: string): "men" | "women" | "kids" | "unisex" {
  if (explicitGender === "men" || explicitGender === "women" || explicitGender === "kids") {
    return explicitGender;
  }
  const t = normalize(rawText);
  if (/\b(kids|kid|junior|miniature|children|boy|boys|girl|girls|toddler|age \d+)\b/.test(t)) {
    return "kids";
  }
  if (/\b(sherwani|shrewani|achkan|bandhgala|jodhpuri|groom|menswear|men s|mens|kurta|pathani|tuxedo shirt|oxford shirt|polo tee|henley)\b/.test(t)) {
    return "men";
  }
  if (
    !t.includes("dress shirt") &&
    /\b(lehenga|kalidar|saree|sari|anarkali|choli|bridal|bride|womenswear|women s|womens|gown|ballgown|corset|midi dress|bodice|capelet|skirt|petticoat|blouse|luxury pret|couture gowns)\b/.test(
      t
    )
  ) {
    return "women";
  }
  return "unisex";
}

function inferHumanLabels(
  primaryText: string,
  secondaryText: string,
  catalog: Array<{ label: string; key: string; patterns: string[] }>
): string[] {
  const pNorm = normalize(primaryText);
  const sNorm = normalize(secondaryText);
  const hits: Array<{ label: string; rank: number }> = [];
  for (const entry of catalog) {
    let best = Infinity;
    for (const pat of entry.patterns) {
      const pn = normalize(pat);
      const pi = (" " + pNorm + " ").indexOf(" " + pn + " ");
      if (pi !== -1) best = Math.min(best, pi);
      else {
        const si = (" " + sNorm + " ").indexOf(" " + pn + " ");
        if (si !== -1) best = Math.min(best, 10000 + si);
      }
    }
    if (best < Infinity) {
      hits.push({ label: entry.label, rank: best });
    }
  }
  hits.sort((a, b) => a.rank - b.rank);
  const seen = new Set<string>();
  return hits.filter((h) => (seen.has(h.label) ? false : (seen.add(h.label), true))).map((h) => h.label);
}

const corpusCache = new WeakMap<readonly ListedProduct[], IndexedEntry[]>();

function buildIndex(listings: readonly ListedProduct[]): IndexedEntry[] {
  const maps = getMaps();
  const entries: IndexedEntry[] = [];
  const seenIds = new Set<string>();

  // 1. Live lookup map by ID so corpus items reflect live stock/price overrides cleanly
  const liveById = new Map<string, ListedProduct | CatalogProduct>();
  for (const p of listings) liveById.set(p.id, p);
  for (const cp of CATALOG_PRODUCTS) {
    const live = liveById.get(cp.id);
    liveById.set(cp.id, live ? { ...cp, status: live.status, availableStock: live.availableStock } : cp);
  }

  // 2. Index Domain-Trained UVIBE_GARMENT_CORPUS FIRST (gold-standard showcase items!)
  for (const g of UVIBE_GARMENT_CORPUS) {
    const linked = g.linkedProductId ? liveById.get(g.linkedProductId) : undefined;
    const garment: UvibeGarment = {
      ...g,
      price: g.price || linked?.price || 0,
      tshirtType: g.tshirtType,
    };
    const fullText = [
      garment.title,
      garment.badge,
      garment.tag,
      garment.desc,
      garment.silhouette,
      ...(garment.fabrics || []),
      ...(garment.colors || []),
      ...(garment.crafts || []),
      ...(garment.designFeatures || []),
      ...(garment.featuresList || []),
      garment.fit || "",
      garment.neckline || "",
      garment.sleeveType || "",
      garment.shoulderStyle || "",
      garment.patternType || "",
      garment.designDetail || "",
      garment.lengthStyle || "",
      garment.tshirtType || "",
      garment.era || "",
      ...(garment.occasions || []),
    ].join(" ");

    const titleNorm = normalize(garment.title + " " + garment.silhouette);
    const fullNorm = normalize(fullText);
    const primaryFabNorm = normalize((garment.fabrics[0] || "") + " " + garment.title);

    entries.push({
      garment,
      sourceTier: "corpus",
      primaryFabricLower: primaryFabNorm,
      titleNorm,
      fullNorm,
      clothesKeys: garmentTypes(garment.title + " " + garment.silhouette),
      colorKeys: extractOrdered(
        normalize((garment.colors || []).slice(0, 2).join(" ") + " " + garment.title),
        fullNorm,
        maps.color
      ),
      fabricKeys: extractOrdered(primaryFabNorm, normalize((garment.fabrics || []).join(" ") + " " + garment.desc), maps.fabric),
      craftKeys: extractOrdered(normalize((garment.crafts || []).join(" ") + " " + garment.desc), fullNorm, maps.craft),
      designKeys: extractOrdered(normalize((garment.designFeatures || []).join(" ") + " " + garment.desc), fullNorm, maps.designing),
      occasionKeys: extractOrdered(normalize((garment.occasions || []).join(" ")), fullNorm, OCCASION_MAP || {}),
    });
    seenIds.add(garment.id);
  }

  // 3. Index all active shoppable CATALOG_PRODUCTS and live designer listings
  for (const p of liveById.values()) {
    if (p.status !== "ACTIVE" || p.availableStock <= 0) continue;
    if (seenIds.has(p.id)) continue;

    const catalogMatch = CATALOG_PRODUCTS.find((c) => c.id === p.id);
    const primaryMaterial = extractPrimaryBodyClause(p.materials || (catalogMatch?.fabric ?? ""));
    const primaryText = [p.title, catalogMatch?.fabric || "", primaryMaterial, p.subcategory || ""].join(" ");
    const secondaryText = [p.brandName, p.designerName, p.description || "", p.fitType || "", ...(p.tags || [])].join(" ");
    const fullText = `${primaryText} ${secondaryText} ${p.materials || ""}`;

    const titleNorm = normalize(p.title);
    const primaryNorm = normalize(primaryText);
    const fullNorm = normalize(fullText);

    const parsedMeta = parseFashionQuery(fullText);
    const gender = inferGender(fullText, catalogMatch?.gender || parsedMeta.detectedGenders[0]);
    const clothesKeys = garmentTypes(p.title + " " + (p.subcategory || "") + " " + (p.category || ""));

    const humanFabrics = inferHumanLabels(primaryText, fullText, SPECIFIC_FABRICS);
    const humanCrafts = inferHumanLabels(primaryText, fullText, SPECIFIC_CRAFTS);
    const orderedColors = extractOrdered(titleNorm, fullNorm, maps.color);
    const orderedFabrics = extractOrdered(primaryNorm, fullNorm, maps.fabric);
    const orderedCrafts = extractOrdered(fullNorm, "", maps.craft);
    const orderedDesign = extractOrdered(fullNorm, "", maps.designing);
    const orderedOccasions = extractOrdered(fullNorm, "", OCCASION_MAP || {});

    const silStr = clothesKeys[0]
      ? clothesKeys[0].replace(/\b\w/g, (c) => c.toUpperCase())
      : p.category;
    let family: SilhouetteFamily = getSilhouetteFamily(p.title + " " + p.category);
    if (gender === "kids") family = "junior-kids";
    else if (gender === "men" && (clothesKeys.includes("sherwani") || clothesKeys.includes("bandhgala") || clothesKeys.includes("kurta"))) {
      family = "royal-ethnic-men";
    } else if (gender === "women" && (clothesKeys.includes("lehenga") || clothesKeys.includes("saree"))) {
      family = "royal-ethnic-women";
    }

    const garment: UvibeGarment = {
      id: p.id,
      linkedProductId: p.id,
      title: p.title,
      badge: p.title,
      tag: p.brandName,
      desc: p.description || "",
      price: p.price,
      originalPrice: p.originalPrice,
      image: p.images[0] || catalogMatch?.image || "",
      sizes: p.sizes.join(" • "),
      silhouette: silStr,
      silhouetteFamily: family,
      fabrics: humanFabrics.length > 0 ? humanFabrics : orderedFabrics.map((f) => f.replace(/\b\w/g, (c) => c.toUpperCase())),
      colors: orderedColors,
      crafts: humanCrafts.length > 0 ? humanCrafts : orderedCrafts.map((c) => c.replace(/\b\w/g, (ch) => ch.toUpperCase())),
      designFeatures: orderedDesign,
      era: parsedMeta.detectedEras[0] || (family.startsWith("royal-ethnic") ? "Heritage Royal" : "Contemporary Savile Row"),
      gender,
      occasions: orderedOccasions,
      verifiedBadge: catalogMatch?.isPro ? "gold-pro" : null,
    };

    entries.push({
      garment,
      sourceTier: catalogMatch ? "catalog" : "listed",
      primaryFabricLower: normalize(primaryText),
      titleNorm,
      fullNorm,
      clothesKeys,
      colorKeys: orderedColors,
      fabricKeys: orderedFabrics,
      craftKeys: orderedCrafts,
      designKeys: orderedDesign,
      occasionKeys: orderedOccasions,
    });
    seenIds.add(p.id);
  }

  return entries;
}

type Dimension = keyof UvibeScoreBreakdown;
const WEIGHTS: Record<Dimension, number> = {
  clothes: 30,
  color: 30,
  designing: 15,
  fabric: 15,
  craft: 10,
};

function computeSpecificFabricScore(requestedQuery: string, entry: IndexedEntry, requestedFabrics: string[]): { score: number; matchedLabels: string[] } {
  if (requestedFabrics.length === 0) return { score: 0, matchedLabels: [] };
  const qNorm = normalize(requestedQuery);

  // Check ultra-specific textile phrases first (e.g. "raw silk" vs "silk velvet")
  let specificRequested = SPECIFIC_FABRICS.filter((sf) =>
    sf.patterns.some((pat) => (" " + qNorm + " ").includes(" " + normalize(pat) + " "))
  );

  // Avoid double-counting generic parent words ("silk", "velvet", "satin") when compound weave already matched
  const matchedKeys = new Set(specificRequested.map((s) => s.key));
  specificRequested = specificRequested.filter((sf) => {
    if (sf.key === "silk" && (matchedKeys.has("raw silk") || matchedKeys.has("silk velvet") || matchedKeys.has("kanjivaram silk") || matchedKeys.has("banarasi brocade") || matchedKeys.has("mulberry silk"))) {
      return false;
    }
    if (sf.key === "velvet" && matchedKeys.has("silk velvet")) return false;
    if (sf.key === "satin" && matchedKeys.has("duchess satin")) return false;
    return true;
  });

  if (specificRequested.length > 0) {
    let matchedPrimary = 0;
    let matchedAny = 0;
    const labels: string[] = [];

    for (const req of specificRequested) {
      const hasPrimary =
        entry.garment.fabrics.slice(0, 2).some((f) => normalize(f).includes(normalize(req.label)) || req.patterns.some((p) => contains(normalize(f), p))) ||
        req.patterns.some((p) => contains(entry.primaryFabricLower, p));
      const hasAny =
        hasPrimary ||
        entry.garment.fabrics.some((f) => req.patterns.some((p) => contains(normalize(f), p))) ||
        req.patterns.some((p) => contains(entry.fullNorm, p));

      if (hasPrimary) {
        matchedPrimary++;
        labels.push(req.label);
      } else if (hasAny) {
        matchedAny++;
        labels.push(req.label);
      }
    }

    if (matchedPrimary > 0) {
      const ratio = (matchedPrimary + matchedAny * 0.6) / specificRequested.length;
      return { score: Math.round(Math.min(100, ratio * 100)), matchedLabels: labels };
    }
    if (matchedAny > 0) {
      return { score: Math.round(Math.min(70, (matchedAny / specificRequested.length) * 65)), matchedLabels: labels };
    }
  }

  // Fallback to canonical map check
  const hits = requestedFabrics.filter((reqFab) => entry.fabricKeys.includes(reqFab));
  if (hits.length > 0) {
    const primaryHit = entry.fabricKeys[0] && requestedFabrics.includes(entry.fabricKeys[0]);
    const ratio = hits.length / requestedFabrics.length;
    return {
      score: Math.round(Math.min(100, ratio * (primaryHit ? 100 : 72))),
      matchedLabels: hits,
    };
  }
  return { score: 0, matchedLabels: [] };
}

/**
 * Domain-trained UVIBE Neural Search & Multi-Dimensional Ranking Engine.
 * Guarantees accurate garment showcase order (exact silhouette, primary color,
 * primary textile weave, artisanal craft, and structural details first).
 */
export function rankGarmentsByQuery(
  rawQuery: string,
  filters: SearchFilters = {},
  listings: readonly ListedProduct[] = INITIAL_LISTED_PRODUCTS
) {
  const maps = getMaps();
  let index = corpusCache.get(listings);
  if (!index) {
    index = buildIndex(listings);
    corpusCache.set(listings, index);
  }

  const excludedPhrases: string[] = [];
  const positive = rawQuery.replace(
    /\b(?:not|no|without|exclude|excluding)\s+([^,.;]+?)(?=\s+(?:with|but|and|under|below|for)\b|[,.;]|$)/gi,
    (_, words: string) => {
      excludedPhrases.push(words);
      return " ";
    }
  );

  const parsedQuery: ParsedFashionQuery = parseFashionQuery(positive);
  const queryCombined = [positive, filters.silhouette, filters.fabric, filters.era].filter(Boolean).join(" ");
  const queryNorm = normalize(queryCombined);

  const requestedClothes = garmentTypes(filters.silhouette || positive);
  const requestedColors = extractOrdered(normalize(positive), "", maps.color);
  const requestedFabrics = extractOrdered(normalize(filters.fabric || positive), "", maps.fabric);
  const requestedDesigning = extractOrdered(queryNorm, "", maps.designing);
  const requestedCrafts = extractOrdered(normalize(positive), "", maps.craft);
  const requestedOccasions = extractOrdered(normalize(positive), "", OCCASION_MAP || {});

  const requested: Record<Dimension, string[]> = {
    clothes: requestedClothes,
    color: requestedColors,
    designing: requestedDesigning,
    fabric: requestedFabrics,
    craft: requestedCrafts,
  };

  // Strict gender & kids intent resolution
  const wantsKids =
    filters.gender === "kids" ||
    parsedQuery.detectedGenders.includes("kids") ||
    /\b(kids?|children|junior|boys?|girls?|toddler|miniature)\b/i.test(positive);
  const wantsWomen =
    !wantsKids &&
    (filters.gender === "women" ||
      parsedQuery.detectedGenders.includes("women") ||
      (requestedClothes.some((c) => ["lehenga", "saree", "gown", "dress"].includes(c)) &&
        !requestedClothes.includes("shirt") &&
        !requestedClothes.includes("sherwani") &&
        !requestedClothes.includes("kurta")));

  const wantsMen =
    !wantsKids &&
    !wantsWomen &&
    (filters.gender === "men" ||
      parsedQuery.detectedGenders.includes("men") ||
      requestedClothes.some((c) => ["sherwani", "bandhgala", "kurta", "shirt", "tshirt"].includes(c)));

  const budgetMatch = positive.match(
    /(?:under|below|up to|maximum|max|budget)\s*(?:of\s*)?(?:rs\.?|inr|₹)?\s*([\d,]+(?:\.\d+)?)\s*(k|lakh|lac)?\b/i
  );
  const maxPrice = budgetMatch
    ? Number(budgetMatch[1].replace(/,/g, "")) *
    (budgetMatch[2]?.toLowerCase() === "k" ? 1000 : budgetMatch[2] ? 100000 : 1)
    : Infinity;

  const sizeMatch = positive.match(/\bsize\s+(xxs|xs|s|m|l|xl|xxl|\d{2})\b/i)?.[1];

  // Meaningful non-stopword tokens for gentle lexical reinforcement
  const stopWords = new Set([
    "want", "need", "looking", "please", "find", "with", "for", "the", "and", "something",
    "show", "under", "below", "budget", "size", "piece", "atelier", "style", "wear", "make", "me"
  ]);
  const queryTerms = [
    ...new Set(
      normalize(positive)
        .split(" ")
        .filter((w) => w.length > 2 && !stopWords.has(w) && !/^\d+$/.test(w))
    ),
  ];

  // Filter strictly incompatible items first
  const candidates = index.filter((entry) => {
    const { garment, fullNorm } = entry;

    // 1. Price & Size Constraints
    if (garment.price > maxPrice) return false;
    if (sizeMatch && !contains(normalize(garment.sizes), sizeMatch)) return false;

    // 2. Kids vs Adult Isolation
    if (wantsKids && garment.gender !== "kids") return false;
    if (!wantsKids && garment.gender === "kids") return false;

    // 3. Menswear vs Womenswear Isolation
    if (wantsMen && garment.gender === "women") return false;
    if (wantsWomen && garment.gender === "men") return false;

    // 4. Silhouette Family Isolation
    if (parsedQuery.targetFamily && !areSilhouetteFamiliesCompatible(parsedQuery.targetFamily, garment.silhouetteFamily)) {
      return false;
    }
    // Keep royal-ethnic-men searches cohesive (Sherwanis, Bandhgalas, Kurta Sets) — don't mix unisex/western casual suits
    if (parsedQuery.targetFamily === "royal-ethnic-men" && garment.silhouetteFamily !== "royal-ethnic-men") {
      return false;
    }

    // 5. Negative Exclusion Constraints
    if (
      excludedPhrases.some(
        (ex) =>
          Object.values(maps).some((map) =>
            extractOrdered(normalize(ex), "", map).some((key) =>
              map[key].some((alias) => contains(fullNorm, alias))
            )
          ) || contains(fullNorm, ex)
      )
    ) {
      return false;
    }

    return true;
  });

  const scored = candidates
    .map((entry) => {
      const { garment, sourceTier, titleNorm, fullNorm, clothesKeys, craftKeys, designKeys, occasionKeys } = entry;
      const scoreBreakdown: UvibeScoreBreakdown = {
        clothes: 0,
        color: 0,
        designing: 0,
        fabric: 0,
        craft: 0,
      };
      const strengths: string[] = [];
      const divergences: string[] = [];

      let weightedSum = 0;
      let totalWeight = 0;

      // -------------------------------------------------------------
      // 1. CLOTHES / SILHOUETTE SCORE (Weight: 30)
      // -------------------------------------------------------------
      let isExactSilhouetteMatch = true;
      if (requestedClothes.length > 0) {
        const directHits = requestedClothes.filter((rc) => clothesKeys.includes(rc));
        if (directHits.length > 0) {
          scoreBreakdown.clothes = 100;
          strengths.push(`silhouette: ${garment.silhouette}`);
          // Extra precision for structured T-Shirt subtypes (Henley vs Raglan vs Polo vs Oversized)
          if (parsedQuery.isTshirtSearch && parsedQuery.extractedTshirtType) {
            if (garment.tshirtType === parsedQuery.extractedTshirtType) {
              scoreBreakdown.clothes = 100;
            } else {
              scoreBreakdown.clothes = 72;
              divergences.push(`T-shirt cut differs (${garment.tshirtType || garment.silhouette})`);
            }
          }
          // Extra precision for Saree weaves (Kanjivaram vs Banarasi vs Chanderi vs Paithani vs Bandhani)
          if (parsedQuery.isSareeSearch && parsedQuery.extractedSareeWeave) {
            const hasWeave = contains(fullNorm, parsedQuery.extractedSareeWeave);
            if (hasWeave) {
              scoreBreakdown.clothes = 100;
              strengths.push(`weave: ${parsedQuery.extractedSareeWeave}`);
            } else {
              scoreBreakdown.clothes = Math.max(scoreBreakdown.clothes - 15, 65);
              divergences.push(`Requested weave (${parsedQuery.extractedSareeWeave}) differs`);
            }
          }
          // Extra precision for Kurta styles (Straight Cut vs Angrakha vs Pathani vs Short Kurta)
          if (parsedQuery.isKurtaSearch && parsedQuery.extractedKurtaStyle) {
            const hasStyle = contains(fullNorm, parsedQuery.extractedKurtaStyle);
            if (hasStyle) {
              scoreBreakdown.clothes = 100;
              strengths.push(`kurta cut: ${parsedQuery.extractedKurtaStyle}`);
            } else {
              scoreBreakdown.clothes = Math.max(scoreBreakdown.clothes - 12, 70);
            }
          }
          // Extra precision for Sherwani styles (Achkan vs Royal Sherwani vs Angrakha Sherwani)
          if (parsedQuery.isSherwaniSearch && parsedQuery.extractedSherwaniStyle) {
            const hasStyle = contains(fullNorm, parsedQuery.extractedSherwaniStyle);
            if (hasStyle) {
              scoreBreakdown.clothes = 100;
              strengths.push(`sherwani cut: ${parsedQuery.extractedSherwaniStyle}`);
            }
          }
          // Extra precision for Shirt types (Tuxedo vs Linen Resort vs Bengal Stripe)
          if (parsedQuery.isShirtSearch && parsedQuery.extractedShirtType) {
            const hasType = contains(fullNorm, parsedQuery.extractedShirtType);
            if (hasType) {
              scoreBreakdown.clothes = 100;
              strengths.push(`shirt style: ${parsedQuery.extractedShirtType}`);
            } else {
              scoreBreakdown.clothes = Math.max(scoreBreakdown.clothes - 15, 68);
            }
          }
        } else if (parsedQuery.targetFamily && garment.silhouetteFamily === parsedQuery.targetFamily) {
          // Same royal/couture family (e.g. Bandhgala or Kurta for Sherwani query -> valid Similar Suggestion, NOT topMatch!)
          isExactSilhouetteMatch = false;
          scoreBreakdown.clothes = 52;
          divergences.push(`Related silhouette (${garment.silhouette}) within same family`);
        } else {
          isExactSilhouetteMatch = false;
          scoreBreakdown.clothes = 20;
          divergences.push(`Different silhouette (${garment.silhouette})`);
        }
        weightedSum += WEIGHTS.clothes * scoreBreakdown.clothes;
        totalWeight += WEIGHTS.clothes;
      } else {
        // Generic clothing search (e.g. "WHITE KIDS CLOTHES", "MEN'S CLOTHES", "ETHNIC WEAR")
        // Any piece matching target demographic / collection is 100% valid clothing!
        scoreBreakdown.clothes = 100;
        isExactSilhouetteMatch = true;
        strengths.push(`clothing: ${garment.silhouette}`);
        weightedSum += WEIGHTS.clothes * 100;
        totalWeight += WEIGHTS.clothes;
      }

      // -------------------------------------------------------------
      // 2. COLOR HARMONY & BASE HUE DISCRIMINATION (Weight: 30)
      // -------------------------------------------------------------
      let hasColorContradiction = false;
      const primaryColorIntent = parsedQuery.primaryTargetColor || (requestedColors[0] ? resolveCanonicalColor(requestedColors[0]) : undefined);

      if (requestedColors.length > 0 && primaryColorIntent) {
        const baseMatch = itemMatchesBaseColor(garment, primaryColorIntent);
        const anyMatch = itemMatchesColor(garment, primaryColorIntent);
        const accentHits = requestedColors.filter((c) => itemMatchesColor(garment, c));

        if (baseMatch) {
          scoreBreakdown.color = 100;
          strengths.push(`primary hue: ${primaryColorIntent}`);
        } else if (anyMatch) {
          scoreBreakdown.color = 85;
          strengths.push(`accent hue: ${primaryColorIntent}`);
        } else {
          hasColorContradiction = true;
          scoreBreakdown.color = accentHits.length > 0 ? 25 : 0;
          divergences.push(`Primary color differs (requested ${primaryColorIntent})`);
        }
        weightedSum += WEIGHTS.color * scoreBreakdown.color;
        totalWeight += WEIGHTS.color;
      } else {
        scoreBreakdown.color = 100;
        weightedSum += WEIGHTS.color * 100;
        totalWeight += WEIGHTS.color;
      }

      // -------------------------------------------------------------
      // 3. FABRIC PHYSICS & WEAVE SPECIFICITY (Weight: 15)
      // -------------------------------------------------------------
      if (requestedFabrics.length > 0) {
        const fabRes = computeSpecificFabricScore(positive + " " + (filters.fabric || ""), entry, requestedFabrics);
        scoreBreakdown.fabric = fabRes.score;
        if (fabRes.score >= 80) {
          strengths.push(`fabric: ${fabRes.matchedLabels[0] || garment.fabrics[0]}`);
        } else if (fabRes.score > 0) {
          strengths.push(`secondary weave: ${fabRes.matchedLabels[0]}`);
          divergences.push(`Primary textile is ${garment.fabrics[0] || "different"}`);
        } else {
          divergences.push(`Requested fabric (${requestedFabrics.join(", ")}) not primary`);
        }
        weightedSum += WEIGHTS.fabric * scoreBreakdown.fabric;
        totalWeight += WEIGHTS.fabric;
      } else {
        scoreBreakdown.fabric = 100;
        weightedSum += WEIGHTS.fabric * 100;
        totalWeight += WEIGHTS.fabric;
      }

      // -------------------------------------------------------------
      // 4. DESIGNING & STRUCTURAL LINES (Weight: 15)
      // -------------------------------------------------------------
      const structuredHits: string[] = [];
      let structuredChecks = 0;
      if (parsedQuery.isTshirtSearch && parsedQuery.hardRequirements) {
        const reqs = parsedQuery.hardRequirements;
        const fields: Array<[keyof UvibeGarment, string | undefined]> = [
          ["fit", reqs.fit],
          ["neckline", reqs.neckline],
          ["sleeveType", reqs.sleeveType],
          ["shoulderStyle", reqs.shoulderStyle],
          ["patternType", reqs.pattern],
          ["designDetail", reqs.designDetail],
          ["lengthStyle", reqs.lengthStyle],
        ];
        for (const [fieldKey, val] of fields) {
          if (!val) continue;
          structuredChecks++;
          if (garment[fieldKey] && normalize(String(garment[fieldKey])) === normalize(val)) {
            structuredHits.push(val);
          }
        }
      }

      if (requestedDesigning.length > 0 || structuredChecks > 0) {
        const hits = requestedDesigning.filter((d) => designKeys.includes(d) || contains(fullNorm, d));
        const totalReq = requestedDesigning.length + structuredChecks;
        const totalHit = hits.length + structuredHits.length;
        let baseDesign = totalReq > 0 ? Math.round(Math.min(100, (totalHit / totalReq) * 100)) : 85;

        // Specific pattern alignment boost for Sarees (e.g. temple border, butti) or Shirts (e.g. bengal stripe)
        if (parsedQuery.extractedSareePattern && contains(fullNorm, parsedQuery.extractedSareePattern)) {
          baseDesign = Math.max(baseDesign, 98);
          strengths.push(`pattern: ${parsedQuery.extractedSareePattern}`);
        }
        if (parsedQuery.extractedShirtPattern && contains(fullNorm, parsedQuery.extractedShirtPattern)) {
          baseDesign = Math.max(baseDesign, 98);
          strengths.push(`pattern: ${parsedQuery.extractedShirtPattern}`);
        }

        scoreBreakdown.designing = baseDesign;
        if (totalHit > 0) {
          strengths.push(`structure: ${[...structuredHits, ...hits].slice(0, 2).join(", ")}`);
        } else if (!parsedQuery.extractedSareePattern && !parsedQuery.extractedShirtPattern) {
          divergences.push(`Structural detail (${requestedDesigning.join(", ")}) not confirmed`);
        }
        weightedSum += WEIGHTS.designing * scoreBreakdown.designing;
        totalWeight += WEIGHTS.designing;
      } else {
        scoreBreakdown.designing = 100;
        weightedSum += WEIGHTS.designing * 100;
        totalWeight += WEIGHTS.designing;
      }

      // -------------------------------------------------------------
      // 5. ARTISANAL EMBELLISHMENT & CRAFT (Weight: 10)
      // -------------------------------------------------------------
      if (requestedCrafts.length > 0) {
        const craftHits = requestedCrafts.filter((c) => craftKeys.includes(c) || contains(fullNorm, c));
        // Extra boost if query explicitly mentions specific regional craft and item has it
        const hasKashmiriTilla = contains(queryNorm, "kashmiri tilla") && contains(fullNorm, "kashmiri tilla");
        const hasChikankari = contains(queryNorm, "chikankari") && contains(fullNorm, "chikankari");
        const hasBandhani = contains(queryNorm, "bandhani") && contains(fullNorm, "bandhani");
        const hasMirrorWork = contains(queryNorm, "mirror work") && contains(fullNorm, "mirror");
        const hasSpecificCraft = hasKashmiriTilla || hasChikankari || hasBandhani || hasMirrorWork;

        const baseCraft = Math.round((craftHits.length / requestedCrafts.length) * 100);
        scoreBreakdown.craft = hasSpecificCraft ? 100 : baseCraft;
        if (craftHits.length > 0 || hasSpecificCraft) {
          strengths.push(`craft: ${garment.crafts[0] || craftHits.join(", ")}`);
        } else {
          divergences.push(`Craft (${requestedCrafts.join(", ")}) differs`);
        }
        weightedSum += WEIGHTS.craft * scoreBreakdown.craft;
        totalWeight += WEIGHTS.craft;
      } else {
        scoreBreakdown.craft = 100;
        weightedSum += WEIGHTS.craft * 100;
        totalWeight += WEIGHTS.craft;
      }

      // -------------------------------------------------------------
      // 6. OCCASION, ERA & LEXICAL CALIBRATION
      // -------------------------------------------------------------
      if (requestedOccasions.length > 0) {
        const occHits = requestedOccasions.filter((o) => occasionKeys.includes(o) || contains(fullNorm, o));
        weightedSum += 10 * Math.round((occHits.length / requestedOccasions.length) * 100);
        totalWeight += 10;
      }
      if (filters.era) {
        const eraHit = contains(fullNorm, filters.era) ? 100 : 35;
        weightedSum += 8 * eraHit;
        totalWeight += 8;
      }

      const lexicalMatches = queryTerms.filter((t) => contains(fullNorm, t)).length;
      const lexicalRatio = queryTerms.length > 0 ? lexicalMatches / queryTerms.length : 0.5;
      const titleLexicalMatches = queryTerms.filter((t) => contains(titleNorm, t)).length;
      const titleLexicalRatio = queryTerms.length > 0 ? titleLexicalMatches / queryTerms.length : 0;

      // Base semantic score from weighted dimensions + gentle lexical boost
      let score = totalWeight > 0 ? (weightedSum / totalWeight) * 0.92 + lexicalRatio * 6 + titleLexicalRatio * 4 : lexicalRatio * 80;

      // Precision gates ensuring top match is ALWAYS visually & semantically faithful:
      if (!isExactSilhouetteMatch) {
        score = Math.min(score, 68);
      }
      if (hasColorContradiction) {
        score = Math.min(score, 24);
      }
      // Small curated flagship boost (keeps trained showcase photography on top on ties)
      if (sourceTier === "corpus" && isExactSilhouetteMatch && !hasColorContradiction) {
        score += 1.5;
      }
      if (
        scoreBreakdown.clothes === 100 &&
        scoreBreakdown.color === 100 &&
        scoreBreakdown.fabric === 100 &&
        scoreBreakdown.craft === 100 &&
        scoreBreakdown.designing === 100 &&
        !hasColorContradiction
      ) {
        score = 99;
      }

      const matchScore = Math.round(Math.max(0, Math.min(99, score)) * 10) / 10;

      // Promote matched fabric/craft to index [0] on a shallow copy so UI pills/badges reflect the best match accurately!
      const orderedGarmentFabrics = [...garment.fabrics];
      if (requestedFabrics.length > 0) {
        const matchingIdx = orderedGarmentFabrics.findIndex((f) =>
          requestedFabrics.some((rf) => contains(normalize(f), rf) || contains(rf, normalize(f)))
        );
        if (matchingIdx > 0) {
          const [m] = orderedGarmentFabrics.splice(matchingIdx, 1);
          orderedGarmentFabrics.unshift(m);
        }
      }

      const orderedGarmentCrafts = [...garment.crafts];
      if (requestedCrafts.length > 0) {
        const matchingCraftIdx = orderedGarmentCrafts.findIndex((c) =>
          requestedCrafts.some((rc) => contains(normalize(c), rc) || contains(rc, normalize(c)))
        );
        if (matchingCraftIdx > 0) {
          const [c] = orderedGarmentCrafts.splice(matchingCraftIdx, 1);
          orderedGarmentCrafts.unshift(c);
        }
      }

      const buildRationale = (dim: Dimension) =>
        requested[dim].length
          ? `${scoreBreakdown[dim]}% alignment with requested ${dim} attributes.`
          : `Compatible ${dim} profile within ${garment.silhouette}.`;

      const summary =
        divergences.length === 0
          ? `${matchScore}% precision match across silhouette (${garment.silhouette}), hue, weave (${orderedGarmentFabrics[0] || "Couture"}), and artisanal craft.`
          : `${matchScore}% attribute affinity (${strengths.slice(0, 2).join(" • ") || garment.silhouette}). Note: ${divergences[0]}.`;

      return {
        ...garment,
        fabrics: orderedGarmentFabrics,
        crafts: orderedGarmentCrafts,
        matchScore,
        rawScore: matchScore,
        scoreBreakdown,
        isExactSilhouetteMatch,
        isSilhouetteMismatch: requestedClothes.length > 0 && !isExactSilhouetteMatch,
        hasColorContradiction,
        sourceTier,
        justification: {
          summary,
          clothesRationale: buildRationale("clothes"),
          colorRationale: buildRationale("color"),
          designingRationale: buildRationale("designing"),
          fabricRationale: buildRationale("fabric"),
          craftRationale: buildRationale("craft"),
          keyStrengths: strengths,
          divergences,
        },
      };
    })
    .filter((p) => p.matchScore > 15)
    .sort((a, b) => {
      // Priority 1: Exact silhouette ALWAYS beats same-family secondary silhouette
      if (a.isExactSilhouetteMatch !== b.isExactSilhouetteMatch) {
        return a.isExactSilhouetteMatch ? -1 : 1;
      }
      // Priority 2: Exact base color match ALWAYS beats contradicting base colors
      if (a.hasColorContradiction !== b.hasColorContradiction) {
        return a.hasColorContradiction ? 1 : -1;
      }
      // Priority 3: Non-contradicting color score (matching hue beats neutral/secondary)
      const aColor = a.scoreBreakdown?.color ?? 0;
      const bColor = b.scoreBreakdown?.color ?? 0;
      if (Math.abs(bColor - aColor) > 15) {
        return bColor - aColor;
      }
      // Priority 4: Higher match score
      if (Math.abs(b.matchScore - a.matchScore) > 0.4) {
        return b.matchScore - a.matchScore;
      }
      // Priority 4: Domain-trained corpus showcase items first
      const tierRank = (t: string) => (t === "corpus" ? 0 : t === "catalog" ? 1 : 2);
      if (tierRank(a.sourceTier) !== tierRank(b.sourceTier)) {
        return tierRank(a.sourceTier) - tierRank(b.sourceTier);
      }
      return a.id.localeCompare(b.id);
    });

  const topMatch = scored[0] || null;

  // Build visually diverse, family-coherent similar suggestions sorted cleanly by descending matchScore
  const remaining = scored.slice(1).sort((a, b) => {
    if (a.isExactSilhouetteMatch !== b.isExactSilhouetteMatch) {
      return a.isExactSilhouetteMatch ? -1 : 1;
    }
    if (Math.abs(b.matchScore - a.matchScore) > 0.1) {
      return b.matchScore - a.matchScore;
    }
    return a.id.localeCompare(b.id);
  });

  const seenImages = new Set<string>(topMatch ? [topMatch.image] : []);
  const seenTitles = new Set<string>(topMatch ? [normalize(topMatch.title)] : []);
  const similarSuggestions: typeof scored = [];

  for (const item of remaining) {
    const titleKey = normalize(item.title);
    if (seenImages.has(item.image) || seenTitles.has(titleKey)) continue;
    similarSuggestions.push(item);
    seenImages.add(item.image);
    seenTitles.add(titleKey);
    if (similarSuggestions.length >= 8) break;
  }

  // If very few exact-image-unique items exist, allow remaining same-family items
  if (similarSuggestions.length < 4) {
    for (const item of remaining) {
      if (similarSuggestions.some((s) => s.id === item.id)) continue;
      if (topMatch && normalize(item.title) === normalize(topMatch.title)) continue;
      similarSuggestions.push(item);
      if (similarSuggestions.length >= 8) break;
    }
  }

  return {
    topMatch,
    similarSuggestions,
    parsedQuery,
    overallConfidence: topMatch?.matchScore || 0,
    searchedCount: index.length,
  };
}
