import { CATALOG_PRODUCTS, CatalogProduct } from "../src/data/catalogProducts";

console.log(`Total CATALOG_PRODUCTS in repository: ${CATALOG_PRODUCTS.length}`);

const normalizeCategory = (str: string) =>
  str.toLowerCase().replace(/[&,]/g, " ").replace(/\s+/g, " ").trim();

function matchesWord(text: string, term: string): boolean {
  if (!text || !term) return false;
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`, "i").test(text);
}

const CATEGORY_SYNONYMS: Record<string, string[]> = {
  // Men & Shared
  "t shirts": ["t-shirts", "t-shirt", "tshirts", "tshirt", "t shirts", "t shirt", "tee", "tees"],
  "sweatshirts": ["sweatshirts", "sweatshirt", "fleece sweatshirt"],
  "polo t shirts": ["polo t-shirts", "polo t-shirt", "polo", "polos", "polo shirt", "polo shirts", "polo t shirts"],
  "shirts": ["shirts", "shirt", "poplin", "linen shirt", "formal shirt", "business shirt", "blouse", "blouses"],
  "hoodies": ["hoodies", "hoodie", "fleece hoodie"],
  "jackets": ["jackets", "jacket", "bomber", "peacoat", "overcoat", "trench", "jackets coats", "outerwear"],
  "jackets coats": ["jackets", "jacket", "coat", "coats", "peacoat", "overcoat", "trench", "jackets coats"],
  "blazers": ["blazers", "blazer", "blazers suits", "suits tailoring", "dinner jacket"],
  "blazers suits": ["blazers suits", "blazers", "blazer", "suit", "suits", "suits tailoring"],
  "suits tailoring": ["suits tailoring", "blazers suits", "blazers", "blazer", "suit", "suits"],
  "kurtas": ["kurtas", "kurta", "kurtas tunics", "kurtas sets", "tunic kurta"],
  "kurtas sets": ["kurtas sets", "kurtas", "kurta", "kurtas tunics", "tunic kurta"],
  "kurtas tunics": ["kurtas tunics", "kurtas", "kurta", "kurtas sets", "tunic kurta"],
  "sherwanis": ["sherwanis", "sherwani", "royal sherwanis bandhgalas", "bandhgala", "bandhgalas", "achkan"],
  "royal sherwanis bandhgalas": ["royal sherwanis bandhgalas", "sherwanis", "sherwani", "bandhgala", "bandhgalas"],
  "jeans pants": ["jeans pants", "jeans", "pants", "trousers", "bottoms trousers", "trousers pants", "denim", "joggers", "chinos"],
  "bottoms trousers": ["bottoms trousers", "jeans pants", "trousers pants", "pants", "trousers", "jeans", "denim", "joggers", "chinos"],

  // Women
  "jackets blazers": ["jackets blazers", "blazers", "jackets", "blazer", "jacket", "crepe blazer"],
  "trousers pants": ["trousers pants", "jeans pants", "bottoms trousers", "pants", "trousers", "palazzo"],
  "knitwear sweaters": ["knitwear sweaters", "sweaters", "knitwear", "sweatshirts", "sweater", "cardigan"],
  "couture gowns": ["couture gowns", "couture & gowns", "gowns", "gown", "ballgown", "evening gown"],
  "couture & gowns": ["couture gowns", "couture & gowns", "gowns", "gown", "ballgown", "evening gown"],
  "pleated skirts": ["pleated skirts", "skirts", "skirt"],
  "t shirts tops": ["t shirts tops", "t-shirts", "t-shirt", "t shirts", "t shirt", "tee", "tees", "top", "tops"],
  "shirts blouses": ["shirts blouses", "shirts", "shirt", "blouse", "blouses"],
  "sarees drapes": ["sarees drapes", "sarees", "saree", "drapes", "drape", "sari"],
  "lehengas sets": ["lehengas sets", "lehengas", "lehenga", "bridal lehengas", "ghagra"]
};

function matchCategory(selectedCat: string, product: CatalogProduct): boolean {
  const normSelected = normalizeCategory(selectedCat);
  const prodCat = normalizeCategory(product.category || "");
  const prodSub = normalizeCategory(product.subcategory || "");
  const prodTitle = normalizeCategory(product.title || "");
  const prodTags = (product.tags || []).map((t) => normalizeCategory(t));

  // Direct exact match
  if (prodCat === normSelected || prodSub === normSelected) return true;

  // Check synonyms of selected category
  const synonyms = CATEGORY_SYNONYMS[normSelected] || [normSelected];
  for (const syn of synonyms) {
    const normSyn = normalizeCategory(syn);
    if (prodCat === normSyn || prodSub === normSyn) return true;
    if (prodTags.some((t) => t === normSyn || matchesWord(t, normSyn))) return true;
    if (matchesWord(prodTitle, normSyn)) return true;
  }

  // Reverse check: does prodCat synonyms match selected?
  const prodCatSynonyms = CATEGORY_SYNONYMS[prodCat] || [];
  for (const syn of prodCatSynonyms) {
    const normSyn = normalizeCategory(syn);
    if (normSyn === normSelected) return true;
  }

  return false;
}

const MENS_TILES = [
  "T-Shirts", "Sweatshirts", "Polo T-Shirts", "Shirts", "Hoodies",
  "Jackets", "Blazers", "Kurtas", "Sherwanis", "Jeans & Pants"
];

const WOMENS_TILES = [
  "Jackets & Blazers", "Trousers & Pants", "Knitwear & Sweaters", "Kurtas & Tunics", "Couture Gowns",
  "Pleated Skirts", "T-Shirts & Tops", "Shirts & Blouses", "Sarees & Drapes", "Lehengas & Sets"
];

const KIDS_TILES = [
  "T-Shirts", "Shirts", "Kurtas & Sets", "Jackets", "Jeans & Pants",
  "Sweatshirts", "Hoodies", "Polo T-Shirts", "Blazers & Suits", "Sherwanis"
];

let totalPassed = 0;
let totalFailed = 0;

function runTestSuite(gender: "men" | "women" | "kids", tiles: string[]) {
  console.log(`\n=================== TESTING ${gender.toUpperCase()} TILES ===================`);
  for (const tile of tiles) {
    const matches = CATALOG_PRODUCTS.filter(p => p.gender === gender && matchCategory(tile, p));
    if (matches.length > 0) {
      console.log(`✅ [PASS] "${tile}": ${matches.length} piece(s) -> ${matches.map(m => `"${m.title}"`).join(', ')}`);
      totalPassed++;
    } else {
      console.error(`❌ [FAIL] "${tile}": 0 matching pieces found!`);
      totalFailed++;
    }
  }
}

runTestSuite("men", MENS_TILES);
runTestSuite("women", WOMENS_TILES);
runTestSuite("kids", KIDS_TILES);

console.log(`\n=================== SUMMARY ===================`);
console.log(`Passed: ${totalPassed} / 30 tiles`);
console.log(`Failed: ${totalFailed} / 30 tiles`);

if (totalFailed > 0) {
  process.exit(1);
} else {
  console.log("🎉 ALL 30 CATEGORY TILES ACROSS MEN, WOMEN, AND KIDS PASS WITH CLEAN, PRECISE MATCHING!");
}
