import { parseFashionQuery } from "../src/lib/uvibe-ai-engine";
import { rankGarmentsByQuery } from "../src/lib/uvibe-search";

const q = "WHITE KIDS CLOTHES";
console.log("Analyzing query:", q);

const parsed = parseFashionQuery(q);
console.log("Parsed query:", {
  targetFamily: parsed.targetFamily,
  detectedGenders: parsed.detectedGenders,
  primaryTargetColor: parsed.primaryTargetColor,
});

const result = rankGarmentsByQuery(q);
console.log("\nTop match:");
if (result.topMatch) {
  console.log("ID:", result.topMatch.id);
  console.log("Title:", result.topMatch.title);
  console.log("Colors:", result.topMatch.colors);
  console.log("Gender:", result.topMatch.gender);
  console.log("Silhouette:", result.topMatch.silhouette);
  console.log("SilhouetteFamily:", result.topMatch.silhouetteFamily);
  console.log("Overall Confidence:", result.overallConfidence);
  console.log("Match Score:", result.topMatch.matchScore);
  console.log("Score Breakdown:", result.topMatch.scoreBreakdown);
}

console.log("\nAll candidate suggestions:");
for (const s of result.similarSuggestions) {
  console.log(`- [${s.id}] ${s.title} (${s.gender}): ${s.matchScore}% | colors: ${s.colors?.join(", ")} | breakdown:`, s.scoreBreakdown);
}
