import { SearchResult } from "./rag-engine";

/**
 * Intelligent luxury deterministic response synthesizer based on retrieved RAG documents.
 * Guarantees instantaneous, ultra-high-fidelity answers even when offline or in static export (GitHub Pages).
 */
export function synthesizeRagResponse(
  query: string,
  searchResults: SearchResult[],
  portalMode: "customer" | "designer"
): { reply: string; suggestedQuestions: string[]; sources: string[] } {
  const q = query.toLowerCase();
  const topDocs = searchResults.map((r) => r.document);
  const sources = topDocs.map((d) => d.title);

  // Default suggested follow-ups based on portal mode
  let suggestedQuestions = portalMode === "customer"
    ? [
        "Who is the best designer for bridal lehengas?",
        "What are the trending designs right now?",
        "How does the 50% escrow protection work?",
        "How do I submit custom fitting measurements?"
      ]
    : [
        "How do I list a new couture piece in Studio?",
        "What are the 3 promotion boost tiers and pricing?",
        "How are in-progress drafts retained in the vault?",
        "How do I review an inquiry and transmit a quote?"
      ];

  // 0. SPECIFIC DESIGNER QUERIES (PRATHAMESH / ADARSH)
  if (q.includes("prathamesh")) {
    return {
      reply: `### Couturier Profile: **Prathamesh Shinde**\n\n` +
        `**Prathamesh Shinde** (*Prathamesh Atelier Haute Couture*) is ALTIER's premier master couturier for **Royal Sherwanis & Bandhgalas** with a **4.99 / 5.0** patron rating.\n\n` +
        `* **Atelier Location**: Level 3, The Atelier Pavilion, Waterfield Road, Bandra West, Mumbai, MH.\n` +
        `* **Signature Specialties**: Royal Zardozi Sherwanis, Italian Micro-Velvet Bandhgalas, and Architectural Menswear Draping.\n` +
        `* **Top Pieces in Boutique**:\n` +
        `  - *Royal Zardozi Raw Silk Sherwani & Tissue Stole* (₹1,45,000)\n` +
        `  - *Obsidian Velvet Jodhpuri Bandhgala with Antique Brass Buttons* (₹88,000)\n` +
        `  - *Crimson Maharani Kalidar Velvet Lehenga* (Collaboration with Adarsh Makharia, ₹2,60,000)\n` +
        `* **Bespoke Services**: Custom armhole adjustments, royal groom trials, and 14–21 day rush commissions with 50% escrow protection.`,
      suggestedQuestions: [
        "How do I book a Bandra atelier fitting with Prathamesh?",
        "What fabrics does Prathamesh Atelier use for royal sherwanis?",
        "Show me Adarsh Makharia's bridal lehengas"
      ],
      sources
    };
  }

  if (q.includes("adarsh")) {
    return {
      reply: `### Couturier Profile: **Adarsh Makharia**\n\n` +
        `**Adarsh Makharia** (*Adarsh Couture Privée*) is ALTIER's highest-acclaimed designer for **Bridal & Heritage Lehengas** and **Contemporary Indo-Western Couture** with a **4.98 / 5.0** rating.\n\n` +
        `* **Atelier Location**: Haveli 7, One Style Mile, Mehrauli Heritage Complex, New Delhi, DL.\n` +
        `* **Signature Specialties**: Hand-beaded Rose Gold Tissue Silks, 400+ Hour Zardozi Needlework, and Sculpted Pre-Draped Saree Gowns.\n` +
        `* **Top Pieces in Boutique**:\n` +
        `  - *Heirloom Rose Gold Tissue Silk Bridal Lehenga* (₹1,95,000)\n` +
        `  - *Hand-Draped Metallic Tissue Saree Gown with Boned Corset* (₹1,15,000)\n` +
        `  - *Crimson Maharani Kalidar Velvet Lehenga* (Collaboration with Prathamesh Shinde, ₹2,60,000)\n` +
        `* **Bespoke Services**: In-person New Delhi toile trials, video consultations, and custom color swatching under escrow guarantee.`,
      suggestedQuestions: [
        "How do I commission a bridal lehenga with Adarsh Makharia?",
        "What is the construction time for Adarsh's rose gold lehenga?",
        "Tell me about Prathamesh Shinde's menswear"
      ],
      sources
    };
  }

  // 1. BEST DESIGNER / TOP DESIGNER QUERY
  if (q.includes("best designer") || q.includes("top designer") || q.includes("who is the best") || q.includes("recommended designer")) {
    if (q.includes("groom") || q.includes("sherwani") || q.includes("bandhgala") || q.includes("menswear") || q.includes("men")) {
      return {
        reply: `### Premier Royal Menswear & Groom Couturier: **Prathamesh Shinde**\n\n` +
          `**Prathamesh Shinde** (*Prathamesh Atelier Haute Couture*) is ranked **#1 for Royal Menswear and Groom Ensembles** with a verified patron rating of **4.99 / 5.0**.\n\n` +
          `* **Heritage Specialty**: Handcrafted Bangalore raw silks, antique gold zardozi wire embroidery, and razor-sharp Jodhpuri bandhgalas with cast brass crest buttons.\n` +
          `* **Signature Creations**:\n` +
          `  - *Royal Zardozi Raw Silk Sherwani & Tissue Stole* (₹1,45,000)\n` +
          `  - *Obsidian Velvet Jodhpuri Bandhgala with Antique Brass Buttons* (₹88,000)\n` +
          `* **Location & Studio**: Level 3, The Atelier Pavilion, Waterfield Road, Bandra West, Mumbai.\n` +
          `* **Escrow Guarantee**: 50% deposit held safely in escrow until you approve the garment after personal fitting.`,
        suggestedQuestions: [
          "How do I submit measurements for Prathamesh's sherwani?",
          "Can I customize the silk color of the bandhgala?",
          "Who is the best designer for bridal lehengas?"
        ],
        sources
      };
    }

    if (q.includes("bridal") || q.includes("wedding") || q.includes("lehenga")) {
      return {
        reply: `### Premier Imperial Bridal Couturier: **Adarsh Makharia**\n\n` +
          `**Adarsh Makharia** (*Adarsh Couture Privée*) holds the #1 ranking for bridal lehengas on ALTIER with a verified patron rating of **4.98 / 5.0**.\n\n` +
          `* **Heritage Specialty**: Imperial handloom rose gold tissue silks, 480-hour zardozi needlecraft, and grand kalidar silhouettes.\n` +
          `* **Signature Masterpieces**:\n` +
          `  - *Heirloom Rose Gold Tissue Silk Bridal Lehenga* (₹1,95,000)\n` +
          `  - *Crimson Maharani Kalidar Velvet Lehenga* (Co-designed with Prathamesh Shinde, ₹2,60,000)\n` +
          `  - *Hand-Draped Metallic Tissue Saree Gown with Boned Corset* (₹1,15,000)\n` +
          `* **Location & Studio**: Haveli 7, One Style Mile, Mehrauli Heritage Complex, New Delhi.\n` +
          `* **Escrow Guarantee**: 50% advance deposit held securely in escrow until your private fitting is completed.`,
        suggestedQuestions: [
          "How do I commission a custom piece with Adarsh Makharia?",
          "What is the average timeline for bespoke lehengas?",
          "Show me Prathamesh Shinde's royal sherwanis"
        ],
        sources
      };
    }

    if (q.includes("gown") || q.includes("evening") || q.includes("contemporary") || q.includes("ball gown") || q.includes("indo-western")) {
      return {
        reply: `### Highest-Rated Contemporary & Indo-Western Couturiers: **Adarsh Makharia & Kavita Singhal**\n\n` +
          `1. **Adarsh Makharia (Adarsh Couture Privée)** — **4.98 / 5.0** ★★★★★\n` +
          `   * *Signature*: *Hand-Draped Metallic Tissue Saree Gown with Boned Corset* (₹1,15,000)\n` +
          `   * *Technique*: Liquid metallic drape anchored by an internal 14-bone corset structure.\n\n` +
          `2. **Kavita Singhal (Maison Singhal)** — **4.98 / 5.0** ★★★★★\n` +
          `   * *Signature*: *Sculpted Duchesse Silk Evening Gown* (₹98,400)\n` +
          `   * *Technique*: Architectural corsetry with 16 spiral-steel inner channels & Kashmiri Aari work.`,
        suggestedQuestions: [
          "Can I book a London Mayfair or Delhi toile fitting?",
          "How does the escrow payment guarantee work?",
          "Show me Prathamesh Shinde's royal sherwanis"
        ],
        sources
      };
    }

    return {
      reply: `### Top-Ranked Master Couturiers on ALTIER Maison Privée\n\n` +
        `Our curated collective features world-class Indian and international independent couturiers vetted for certified textile purity and master craftsmanship:\n\n` +
        `1. **Prathamesh Shinde (Prathamesh Atelier Haute Couture)** — **4.99 / 5.0** ★★★★★\n` +
        `   * *Category*: **Royal Sherwanis & Bandhgalas**, Royal Groom Couture, Jodhpur Suits.\n` +
        `   * *Signature*: *Royal Zardozi Raw Silk Sherwani & Tissue Stole* (₹1,45,000).\n` +
        `   * *Atelier*: Bandra West, Mumbai, MH.\n\n` +
        `2. **Adarsh Makharia (Adarsh Couture Privée)** — **4.98 / 5.0** ★★★★★\n` +
        `   * *Category*: **Bridal & Heritage Lehengas**, Draped Metallic Saree Gowns.\n` +
        `   * *Signature*: *Heirloom Rose Gold Tissue Silk Bridal Lehenga* (₹1,95,000).\n` +
        `   * *Atelier*: Mehrauli Heritage Complex, New Delhi, DL.\n\n` +
        `3. **Rohit K. Balaji (Rohit Balaji Haute Couture)** — **4.96 / 5.0** ★★★★★\n` +
        `   * *Category*: Heritage Weaves, Banarasi Katan Silk Sarees & Zardozi Ensembles.\n` +
        `   * *Signature*: *Handloom Banarasi Katan Silk Saree* (₹38,500).\n` +
        `   * *Atelier*: Kala Ghoda Arts District, Mumbai, MH.\n\n` +
        `4. **Kavita Singhal (Maison Singhal)** — **4.98 / 5.0** ★★★★★\n` +
        `   * *Category*: Contemporary Haute Couture, Gala Ball Gowns, Architectural Corsetry.\n` +
        `   * *Signature*: *Sculpted Duchesse Silk Evening Gown* (₹98,400).\n` +
        `   * *Atelier*: Mayfair (London) & Mehrauli (New Delhi).`,
      suggestedQuestions: [
        "Tell me more about Prathamesh Shinde's sherwanis",
        "Show me Adarsh Makharia's bridal lehengas",
        "What are the trending designs this week?"
      ],
      sources
    };
  }

  // 2. TRENDING DESIGNS QUERY
  if (q.includes("trend") || q.includes("popular") || q.includes("latest design") || q.includes("bestseller") || q.includes("hot")) {
    return {
      reply: `### Current Runway Spotlights & Trending Masterpieces\n\n` +
        `Here are the most celebrated Indian and international creations currently in high demand across the ALTIER boutique feeds:\n\n` +
        `1. **Royal Zardozi Raw Silk Sherwani & Tissue Stole** by *Prathamesh Shinde*\n` +
        `   * *Valuation*: **₹1,45,000** | *Category*: Royal Sherwanis & Bandhgalas\n` +
        `   * *Highlight*: Over 24,800 patron impressions, pure Bangalore raw silk with handcrafted antique gold wire embroidery.\n\n` +
        `2. **Heirloom Rose Gold Tissue Silk Bridal Lehenga** by *Adarsh Makharia*\n` +
        `   * *Valuation*: **₹1,95,000** | *Category*: Bridal & Heritage Lehengas\n` +
        `   * *Highlight*: 38,200 impressions, handloom Banarasi rose-gold tissue with 480 hours of seed pearl & cutdana needlecraft.\n\n` +
        `3. **Crimson Maharani Kalidar Velvet Lehenga** by *Prathamesh & Adarsh Master Collaboration*\n` +
        `   * *Valuation*: **₹2,60,000** | *Category*: 1-of-1 Bespoke Masterpiece\n` +
        `   * *Highlight*: 16 hand-paneled silk velvet kalis encrusted with genuine silver badla wire dipped in 24k gold wash.\n\n` +
        `4. **Hand-Draped Metallic Tissue Saree Gown with Boned Corset** by *Adarsh Makharia*\n` +
        `   * *Valuation*: **₹1,15,000** | *Category*: Contemporary Indo-Western Couture\n` +
        `   * *Highlight*: Liquid-gold metallic silk drape anchored with an internal 14-channel spiral boning corset.\n\n` +
        `5. **Obsidian Velvet Jodhpuri Bandhgala** by *Prathamesh Shinde*\n` +
        `   * *Valuation*: **₹88,000** | *Category*: Royal Sherwanis & Bandhgalas\n` +
        `   * *Highlight*: Italian midnight micro-velvet tailored with cast antique brass crest buttons.`,
      suggestedQuestions: [
        "How do I submit measurements for Prathamesh's sherwani?",
        "Can I customize the silk color of Adarsh's rose gold lehenga?",
        "How does the 50% escrow guarantee work?"
      ],
      sources
    };
  }

  // 3. HOW TO USE THE WEBSITE (DESIGNER QUERIES)
  if (portalMode === "designer" || q.includes("how to list") || q.includes("publish") || q.includes("boost") || q.includes("draft") || q.includes("transmit quote")) {
    if (q.includes("boost") || q.includes("promote") || q.includes("ad spend")) {
      return {
        reply: `### Studio Guide: Paid Promotion & Runway Boost Tiers\n\n` +
          `Designers can elevate eligible masterpieces directly to prime discovery feeds without bypassing craftsmanship vetting:\n\n` +
          `* **Tier 1: Salon Spotlight (3 Days) — ₹3,500 + 18% GST**\n` +
          `  * Elevated placement in customer category discovery feeds and algorithmic recommendations.\n\n` +
          `* **Tier 2: Curator's Showcase (7–14 Days) — ₹7,500 to ₹8,500 + 18% GST**\n` +
          `  * Runway spotlight badge, dedicated editorial cards, and VIP patron newsletter feature.\n\n` +
          `* **Tier 3: Grand Salon Feature (30 Days) — ₹14,000 + 18% GST**\n` +
          `  * Permanent marquee showcase banner on boutique homepage with verified push alerts.\n\n` +
          `* **How to Launch**: In Designer Studio, open the **Boosted for Promotion** tab or click the **Boost** button on any listed product card.`,
        suggestedQuestions: [
          "How are campaign impressions measured?",
          "How do I list a new product in the Studio?",
          "How do I manage my saved drafts?"
        ],
        sources
      };
    }

    if (q.includes("list") || q.includes("add product") || q.includes("new creation")) {
      return {
        reply: `### Studio Guide: Cataloging a New Creation (5 Steps)\n\n` +
          `1. **Navigate**: In Designer Studio, click **+ List New Product** in the top navigation strip.\n` +
          `2. **Step 01 — Product Details**: Enter title, category (e.g. *Couture & Gowns*), subcategory (*Corsets & Bodices*), and storytelling notes.\n` +
          `3. **Step 02 — Fit & Measurements**: Define standard sizing (S, M, L) and exact tailor measurements (bust, waist, hips, length, stretchability).\n` +
          `4. **Step 03 — Availability**: Set as a *1-of-1 Bespoke Masterpiece* or specify inventory batch count.\n` +
          `5. **Step 04 — Fabric & Care**: Record primary textiles (e.g. *100% Pure Mulberry Silk Organza*), lining, and dry-clean instructions.\n` +
          `6. **Step 05 — Pricing & Logistics**: Set valuation in INR, select *Complimentary White-Glove Shipping*, and specify packaging dimensions.\n` +
          `7. **Upload Lookbook**: Add 5 high-resolution photography perspectives (Cover Look 3:4, Front Silhouette, Macro Detail, Back Drape, Model Movement).\n` +
          `8. **Publish**: Click **Review & Publish Creation** to go live instantly, or **Save Draft** for private vault storage.`,
        suggestedQuestions: [
          "What are the image resolution requirements?",
          "How long do drafts stay saved?",
          "How do I handle custom fitting orders?"
        ],
        sources
      };
    }

    if (q.includes("draft") || q.includes("autosave")) {
      return {
        reply: `### Studio Guide: Draft Management & 72-Hour Salon Guarantee\n\n` +
          `* **Automatic Real-Time Autosave**: Your form progress automatically records measurements, uploaded images, and fabric notes at every step.\n` +
          `* **Vault Retention**: Inactive drafts are safely retained for 72 hours with a progressive 30-day salon recovery guarantee.\n` +
          `* **Access & Resume**: Head to the **Drafts** tab in the Studio sub-nav to see all in-progress pieces with completion progress bars (e.g. *Step 4 of 5 Completed: 80%*).\n` +
          `* **Discarding**: Click **Discard** to purge abandoned prototypes with an immediate confirmation modal.`,
        suggestedQuestions: [
          "How do I publish my drafts?",
          "How do I view sold archive records?",
          "What is the commission payout process?"
        ],
        sources
      };
    }
  }

  // 4. HOW TO USE THE WEBSITE (CUSTOMER QUERIES)
  if (q.includes("how to use") || q.includes("how to buy") || q.includes("how does it work") || q.includes("order") || q.includes("custom commission")) {
    return {
      reply: `### Patron Concierge Guide: Navigating ALTIER\n\n` +
        `ALTIER Maison Privée brings Paris & Mayfair haute couture commissioning directly to your private screen:\n\n` +
        `* **1. Instant Acquisition (Ready Boutique Pieces)**:\n` +
        `  * Browse our **Discover** salon catalog.\n` +
        `  * Click on any piece to review authenticated craftsmanship dossiers, pure silk certifications, and exact measurements.\n` +
        `  * Click **Buy Now** for immediate checkout with complimentary insured white-glove air delivery in 3–5 days.\n\n` +
        `* **2. Bespoke Custom Commissions (Made-to-Measure)**:\n` +
        `  * Click **Commission Bespoke Piece** on any design.\n` +
        `  * Submit your custom drape measurements and color swatch preferences.\n` +
        `  * The master designer transmits an official quote within 24 hours.\n` +
        `  * Deposit a 50% advance into ALTIER Escrow — securely locked until your private toile fitting is approved.\n\n` +
        `* **3. Portal Switcher**: Use the top-bar button anytime to switch seamlessly between **Customer Boutique** and **Designer Studio**.`,
      suggestedQuestions: [
        "How does the 50% escrow guarantee protect me?",
        "Who is the best designer for bridal lehengas?",
        "What happens if my measurements need alteration?"
      ],
      sources
    };
  }

  // 5. ESCROW, PAYMENTS & SAFETY FAQS
  if (q.includes("escrow") || q.includes("payment") || q.includes("refund") || q.includes("security") || q.includes("safe")) {
    return {
      reply: `### ALTIER Escrow & Patron Protection Guarantee\n\n` +
        `To protect both discerning patrons and master couturiers, all bespoke commissions utilize institutional banking escrow:\n\n` +
        `1. **50% Advance Locked in Escrow**: Upon accepting a designer's quote, your deposit is held securely in escrow (powered by HDFC & ICICI Corporate Trust).\n` +
        `2. **Toile Fitting Verification**: Funds remain untouched until your physical toile structure or virtual fitting is approved.\n` +
        `3. **Complimentary Alterations**: If the delivered garment deviates from your submitted specifications, ALTIER covers 100% complimentary atelier refittings.\n` +
        `4. **Wax-Seal Provenance**: Every authentic delivery includes an embossed golden wax seal and verifiable archival registry ID.`,
      suggestedQuestions: [
        "What is the delivery timeline for custom orders?",
        "Can I request fabric swatches before commissioning?",
        "Show me trending bridal lehengas"
      ],
      sources
    };
  }

  // 6. DEFAULT GENERAL SYNTHESIS FROM TOP MATCHING DOCUMENTS
  const primaryDoc = topDocs[0];
  const secondaryDoc = topDocs[1];

  let synthesized = `### Atelier Concierge Intelligence\n\n`;
  if (primaryDoc) {
    synthesized += `Based on our curated atelier archives regarding **${primaryDoc.title}**:\n\n${primaryDoc.content}\n\n`;
  }
  if (secondaryDoc && secondaryDoc.id !== primaryDoc?.id) {
    synthesized += `**Additional Salon Context (${secondaryDoc.title})**:\n${secondaryDoc.content.slice(0, 300)}...\n\n`;
  }

  return {
    reply: synthesized,
    suggestedQuestions,
    sources
  };
}

