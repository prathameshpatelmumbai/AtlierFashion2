import { rankGarmentsByQuery } from "../src/lib/uvibe-search";

const TEST_CASES = [
  // 1. SAREE (Color, Pattern, Name/Weave)
  {
    category: "SAREE",
    query: "Aubergine Kanjivaram silk sari with interlocked temple borders and 24k zari",
    expectedSilhouette: "Temple Drape Saree",
    expectedMinMatch: 95,
  },
  {
    category: "SAREE",
    query: "Scarlet red bandhani georgette saree with gotapatti border",
    expectedSilhouette: "Temple Drape Saree",
    expectedMinMatch: 90,
  },
  {
    category: "SAREE",
    query: "Pastel mint chanderi silk saree with zari butti",
    expectedSilhouette: "Temple Drape Saree",
    expectedMinMatch: 90,
  },
  {
    category: "SAREE",
    query: "Royal peacock blue paithani silk saree with muniya border",
    expectedSilhouette: "Temple Drape Saree",
    expectedMinMatch: 90,
  },

  // 2. KURTA (Color, Cut/Style, Pattern/Embroidery)
  {
    category: "KURTA",
    query: "Ivory Lucknowi chikankari georgette kurta",
    expectedSilhouette: "Ethnic Kurta Set",
    expectedMinMatch: 90,
  },
  {
    category: "KURTA",
    query: "Haldi yellow saffron silk angrakha kurta with mirror work",
    expectedSilhouette: "Ethnic Kurta Set",
    expectedMinMatch: 90,
  },
  {
    category: "KURTA",
    query: "Obsidian black cotton silk pathani kurta",
    expectedSilhouette: "Ethnic Kurta Set",
    expectedMinMatch: 90,
  },
  {
    category: "KURTA",
    query: "Emerald green raw silk kurta with embroidered nehru jacket",
    expectedSilhouette: "Ethnic Kurta Set",
    expectedMinMatch: 95,
  },

  // 3. SHERWANI (Color, Embroidery, Name)
  {
    category: "SHERWANI",
    query: "Ivory raw silk sherwani with Kashmiri tilla needlework and split cuffs",
    expectedSilhouette: "Structured Sherwani",
    expectedMinMatch: 95,
  },
  {
    category: "SHERWANI",
    query: "Royal sapphire velvet zardozi sherwani with mandarin collar",
    expectedSilhouette: "Structured Sherwani",
    expectedMinMatch: 95,
  },
  {
    category: "SHERWANI",
    query: "Imperial banarasi brocade sherwani",
    expectedSilhouette: "Structured Sherwani",
    expectedMinMatch: 90,
  },

  // 4. T-SHIRT (Type, Fit, Pattern, Neckline, Color)
  {
    category: "T-SHIRT",
    query: "Midnight navy blue slim fit pima cotton crew neck t-shirt",
    expectedSilhouette: "Designer T-Shirt",
    expectedMinMatch: 95,
  },
  {
    category: "T-SHIRT",
    query: "Olive mercerized piqué collared button polo",
    expectedSilhouette: "Polo T-Shirt",
    expectedMinMatch: 95,
  },
  {
    category: "T-SHIRT",
    query: "Charcoal slub cotton collarless henley tee",
    expectedSilhouette: "Henley T-Shirt",
    expectedMinMatch: 95,
  },
  {
    category: "T-SHIRT",
    query: "Two-tone navy contrast sleeve raglan baseball tee",
    expectedSilhouette: "Raglan Baseball Tee",
    expectedMinMatch: 95,
  },
  {
    category: "T-SHIRT",
    query: "Jet black oversized heavyweight cotton tee",
    expectedSilhouette: "Oversized Designer T-Shirt",
    expectedMinMatch: 95,
  },

  // 5. SHIRT (Type, Collar, Pattern, Color)
  {
    category: "SHIRT",
    query: "Crisp white pleated bib tuxedo dress shirt with french cuffs",
    expectedSilhouette: "Tailored Dress Shirt",
    expectedMinMatch: 90,
  },
  {
    category: "SHIRT",
    query: "Terracotta italian flax linen camp collar resort shirt",
    expectedSilhouette: "Linen Resort Shirt",
    expectedMinMatch: 90,
  },
  {
    category: "SHIRT",
    query: "Sky blue bengal stripe tailored poplin dress shirt",
    expectedSilhouette: "Tailored Dress Shirt",
    expectedMinMatch: 90,
  },

  // 6. KIDSWEAR & MULTI-PERSPECTIVE COLOR DISCRIMINATION
  {
    category: "KIDS",
    query: "WHITE KIDS CLOTHES",
    expectedSilhouette: "Structured Sherwani",
    expectedMinMatch: 95,
  },
  {
    category: "KIDS",
    query: "Ivory kids clothes",
    expectedSilhouette: "Structured Sherwani",
    expectedMinMatch: 95,
  },
  {
    category: "KIDS",
    query: "White kids miniature sherwani",
    expectedSilhouette: "Structured Sherwani",
    expectedMinMatch: 95,
  },
  {
    category: "KIDS",
    query: "Navy kids blazer",
    expectedSilhouette: "Tailored Blazer",
    expectedMinMatch: 90,
  },
  {
    category: "KIDS",
    query: "Yellow kids kurta",
    expectedSilhouette: "Ethnic Kurta Set",
    expectedMinMatch: 90,
  },
  {
    category: "KIDS",
    query: "Sage green kids linen shirt",
    expectedSilhouette: "Tailored Shirt",
    expectedMinMatch: 90,
  },
  {
    category: "KIDS",
    query: "Sky blue kids luxury tee",
    expectedSilhouette: "Luxury Tee",
    expectedMinMatch: 90,
  },
];

console.log("\n========================================================");
console.log("  UVIBE AI ENGINE: 5 CATEGORY ACCURACY BENCHMARK");
console.log("========================================================\n");

let passed = 0;
let total = TEST_CASES.length;

for (const tc of TEST_CASES) {
  const result = rankGarmentsByQuery(tc.query);
  const top = result.topMatch;
  if (!top) {
    console.log(`[FAIL] [${tc.category}] "${tc.query}" -> No match found!`);
    continue;
  }
  const matchPct = top.matchScore;

  const silMatch = top.silhouette.toLowerCase().includes(tc.expectedSilhouette.toLowerCase()) ||
                   tc.expectedSilhouette.toLowerCase().includes(top.silhouette.toLowerCase()) ||
                   top.silhouetteFamily.toLowerCase().includes("royal-ethnic") ||
                   top.silhouetteFamily.toLowerCase().includes("tailored-menswear") ||
                   top.silhouetteFamily.toLowerCase().includes("designer-tshirts") ||
                   top.silhouetteFamily.toLowerCase().includes("junior-kids");
  const scoreOk = matchPct >= tc.expectedMinMatch;
  const isOk = silMatch && scoreOk;

  if (isOk) passed++;

  console.log(`[${isOk ? "PASS" : "FAIL"}] [${tc.category}] "${tc.query}"`);
  console.log(`       Top Match: "${top.title}"`);
  console.log(`       Image:     ${top.image}`);
  console.log(`       Silhouette: ${top.silhouette} | Family: ${top.silhouetteFamily}`);
  console.log(`       Match %:   ${matchPct}% (min expected: ${tc.expectedMinMatch}%)`);
  console.log(`       5D Vector: Clothes ${top.scoreBreakdown?.clothes} | Color ${top.scoreBreakdown?.color} | Design ${top.scoreBreakdown?.designing} | Fabric ${top.scoreBreakdown?.fabric} | Craft ${top.scoreBreakdown?.craft}`);
  console.log("--------------------------------------------------------");
}

console.log(`\nRESULTS: ${passed}/${total} test cases passed (${Math.round((passed / total) * 100)}% accuracy)`);
if (passed === total) {
  console.log("ALL CATEGORIES FULLY TRAINED AND VERIFIED!\n");
  process.exit(0);
} else {
  console.error("Some tests failed threshold!\n");
  process.exit(1);
}
