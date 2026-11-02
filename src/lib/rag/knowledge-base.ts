/**
 * ALTIER MAISON PRIVÉE — RAG KNOWLEDGE CORPUS
 * Comprehensive authoritative knowledge base indexed for vector and semantic retrieval.
 */

export interface KnowledgeDocument {
  id: string;
  category: "designers" | "rankings" | "trending" | "customer-guide" | "designer-guide" | "faqs" | "platform";
  title: string;
  keywords: string[];
  content: string;
  metadata?: {
    designerId?: string;
    productId?: string;
    price?: number;
    rating?: number;
    tags?: string[];
    actionLink?: {
      label: string;
      actionType: "navigate-tab" | "switch-mode" | "open-modal";
      target: string;
    };
  };
}

export const KNOWLEDGE_BASE: KnowledgeDocument[] = [
  // ==========================================
  // DESIGNERS DIRECTORY & PROFILES
  // ==========================================
  {
    id: "des-prathamesh-shinde",
    category: "designers",
    title: "Prathamesh Shinde (Prathamesh Atelier Haute Couture)",
    keywords: ["prathamesh", "shinde", "prathamesh atelier", "designer", "sherwani", "bandhgala", "groom", "menswear", "royal", "mumbai", "bandra"],
    content: `Designer: Prathamesh Shinde
Brand: Prathamesh Atelier Haute Couture
Location: Level 3, The Atelier Pavilion, Waterfield Road, Bandra West, Mumbai, MH.
Specialty: Royal Sherwanis & Bandhgalas, Bespoke Royal Groom Wear, and Contemporary Indo-Western Men's Couture. Renowned for sculptural shoulders, Bangalore raw silks, and antique brass filigree crest buttons.
Patron Rating: 4.99/5 (Ranked #1 for Royal Menswear and Groom Ensembles)
Pricing Range: ₹65,000 to ₹2,80,000 INR
Signature Masterpieces: 
1. Royal Zardozi Raw Silk Sherwani & Tissue Stole (₹1,45,000)
2. Obsidian Velvet Jodhpuri Bandhgala with Antique Brass Buttons (₹88,000)
3. Crimson Maharani Kalidar Velvet Lehenga (Co-created with Adarsh Makharia, ₹2,60,000)
Delivery Timelines: Ready Salon Inventory: 3–5 days. Bespoke Bespoke Tailoring & Fittings: 14–21 days.
Patron Feedback: Celebrated for commanding royal silhouettes, impeccable armhole comfort, and museum-grade zardozi wire embroidery.`,
    metadata: {
      designerId: "des-003",
      rating: 4.99,
      tags: ["Sherwani", "Bandhgala", "Royal Groom", "Menswear", "Zardozi"]
    }
  },
  {
    id: "des-adarsh-makharia",
    category: "designers",
    title: "Adarsh Makharia (Adarsh Couture Privée)",
    keywords: ["adarsh", "makharia", "adarsh couture", "designer", "bridal", "lehenga", "tissue silk", "rose gold", "delhi", "mehrauli", "saree gown"],
    content: `Designer: Adarsh Makharia
Brand: Adarsh Couture Privée
Location: Haveli 7, One Style Mile, Mehrauli Heritage Complex, New Delhi, DL.
Specialty: Heirloom Bridal Lehengas & Hand-Draped Metallic Tissue Ensembles. Renowned for reviving royal Mughal court embroidery, hand-beaded rose gold tissue silks, and structured boned saree gowns.
Patron Rating: 4.98/5 (Ranked #1 for Modern Imperial Bridal Couture)
Pricing Range: ₹85,000 to ₹3,50,000 INR
Signature Masterpieces:
1. Heirloom Rose Gold Tissue Silk Bridal Lehenga (₹1,95,000)
2. Hand-Draped Metallic Tissue Saree Gown with Boned Corset (₹1,15,000)
3. Crimson Maharani Kalidar Velvet Lehenga (Co-created with Prathamesh Shinde, ₹2,60,000)
Delivery Timelines: Ready Boutique Pieces: 3–5 days. Custom Bridal Commissions: 25–35 days with personalized toile trials.
Patron Feedback: Revered by royal families and high-fashion brides for lightweight multi-layered kalidars and luminous rose-gold metallic finishes.`,
    metadata: {
      designerId: "des-004",
      rating: 4.98,
      tags: ["Bridal Lehenga", "Rose Gold", "Tissue Silk", "Corset Gown", "Imperial"]
    }
  },
  {
    id: "des-rohit-balaji",
    category: "designers",
    title: "Rohit K. Balaji (Rohit Balaji Haute Couture)",
    keywords: ["rohit", "balaji", "designer", "zardozi", "bridal", "lehenga", "bandhgala", "sherwani", "mumbai", "kala ghoda"],
    content: `Designer: Rohit K. Balaji
Brand: Rohit Balaji Haute Couture
Location: Studio 4B, The Heritage Mill Compound, Kala Ghoda Arts District, Mumbai, MH.
Specialty: Bespoke Bridal Couture & Heritage Indo-Western. Revival of ancestral handloom weaves, antique badla zardozi, and architectural draping.
Patron Rating: 4.96/5 (Based on 140+ verified salon reviews)
Pricing Range: ₹45,000 to ₹1,80,000 INR
Signature Masterpieces: 
1. Rose Gold Tissue Silk Lehenga with Zardozi Borders (₹1,20,000)
2. Hand-Embroidered Zardozi Corset Top (₹45,000)
3. Midnight Velvet Bandhgala & Raw Silk Sherwani Ensemble (₹95,000)
Delivery Timelines: Ready Boutique Pieces: 3–5 days. Bespoke Alterations: 18–24 days.
Patron Feedback: Acclaimed for supreme fit precision, immaculate French wire embroidery, and private Mumbai salon fittings.`,
    metadata: {
      designerId: "des-001",
      rating: 4.96,
      tags: ["Bridal", "Zardozi", "Lehenga", "Menswear"]
    }
  },
  {
    id: "des-kavita-singhal",
    category: "designers",
    title: "Kavita Singhal (Maison Singhal)",
    keywords: ["kavita", "singhal", "maison", "designer", "london", "delhi", "aari", "duchesse", "ball gown", "trench"],
    content: `Designer: Kavita Singhal
Brand: Maison Singhal
Location: Mayfair, London (UK Salon) & Mehrauli Heritage Courtyard, New Delhi.
Specialty: Sculptural avant-garde draping, Kashmiri Aari micro-needlework, and hand-pleated metallic lamé.
Patron Rating: 4.98/5 (Highest Rated for Contemporary Couture)
Pricing Range: ₹35,000 to ₹2,50,000 INR
Signature Masterpieces:
1. Sculpted Duchesse Silk Evening Gown (₹98,400)
2. Plissé Organza Architectural Trench (₹34,950)
3. Hand-Draped Silk Duchesse Ball Gown with Corsetry (₹1,65,000)
Delivery Timelines: Ready Boutique Pieces: 3–5 days. Bespoke Commissions: 21–30 days with Mayfair or Delhi toile fittings.
Patron Feedback: Celebrated internationally for red-carpet gowns, architectural corsetry, and lightweight silk organza layering.`,
    metadata: {
      designerId: "des-002",
      rating: 4.98,
      tags: ["Contemporary", "Ball Gown", "Corset", "Red Carpet"]
    }
  },
  {
    id: "des-ananya-malhotra",
    category: "designers",
    title: "Ananya Malhotra Atelier",
    keywords: ["ananya", "malhotra", "cape", "lamé", "minimalist", "red carpet", "evening"],
    content: `Designer: Ananya Malhotra Atelier
Location: Colaba, Mumbai & Bandra Studio.
Specialty: Red carpet capes, metallic micro-pleated lamé, and sculptural minimalist evening outerwear.
Patron Rating: 4.91/5
Signature Masterpiece: Sculptural Pleated Lamé Evening Cape (₹78,000).
Delivery Timelines: 14–20 days for custom color swatches and fitting.`,
    metadata: {
      rating: 4.91,
      tags: ["Capes", "Lamé", "Modern"]
    }
  },

  // ==========================================
  // RANKINGS & "BEST DESIGNER" QUERIES
  // ==========================================
  {
    id: "rank-best-designers-overview",
    category: "rankings",
    title: "Best & Top-Rated Designers on ALTIER Maison Privée",
    keywords: ["best", "top", "ranked", "designer", "recommended", "famous", "popular", "highest rated", "who is the best"],
    content: `Overview of Best Designers across ALTIER Maison Privée:
1. Overall Highest Rated Contemporary Couturier: Kavita Singhal (Maison Singhal) — Rated 4.98/5 with 100% on-time delivery across London and India.
2. Best Heritage Bridal & Zardozi Designer: Rohit K. Balaji — Rated 4.96/5, renowned for hand-stitched antique zardozi lehengas and regal menswear bandhgalas.
3. Best Red Carpet & Avant-Garde Outerwear: Ananya Malhotra Atelier — Celebrated for sculptural lamé evening capes and architectural pleats.
4. Curatorial Criteria: All designers on ALTIER undergo strict guild vetting: 100% authentic pure silk certifications, verified handloom provenance, and guaranteed master artisan fair-wage standards.`,
    metadata: {
      rating: 4.98
    }
  },
  {
    id: "rank-best-bridal-designer",
    category: "rankings",
    title: "Best Designer for Bridal & Festive Lehengas",
    keywords: ["bridal", "wedding", "lehenga", "bride", "trousseau", "groom", "best wedding designer"],
    content: `Best Designer for Bridal Couture & Wedding Trousseau:
Rohit K. Balaji (Rohit Balaji Haute Couture).
Why Rohit Balaji is Ranked #1:
- Heritage Ancestral Techniques: Master craftsmen hand-weave pure mulberry tissue silk and execute antique gold zardozi wire embroidery.
- Tailored Toile Fittings: Includes private salon drape fittings to ensure zero slippage and optimal waist-to-hem movement.
- Top Creations: Rose Gold Tissue Silk Lehenga (₹1,20,000), Midnight Velvet Bandhgala & Sherwani Groom Ensemble (₹95,000).
- Patron Escrow: 50% advance deposit held securely in escrow until final wedding fitting approval.`,
    metadata: {
      designerId: "des-001"
    }
  },
  {
    id: "rank-best-evening-gowns",
    category: "rankings",
    title: "Best Designer for Haute Couture Evening Gowns & Ball Gowns",
    keywords: ["gown", "evening", "ball gown", "gala", "corset", "red carpet", "best gown designer"],
    content: `Best Designer for Gala Evening Gowns & Architectural Corsetry:
Kavita Singhal (Maison Singhal).
Why Kavita Singhal is Ranked #1:
- Architectural Corsetry: Features 16 spiral-steel inner boning channels engineered for maximum waist sculpt with breathable comfort.
- Luxurious Fabrics: Duchesse satin, silk faille, and imported French Chantilly lace.
- Acclaimed Pieces: Sculpted Duchesse Silk Evening Gown (₹98,400) and Hand-Draped Silk Duchesse Ball Gown (₹1,65,000).
- Global Fittings: Supported in Mayfair (London), Paris trunk shows, and New Delhi atelier.`,
    metadata: {
      designerId: "des-002"
    }
  },

  // ==========================================
  // TRENDING DESIGNS & RUNWAY SPOTLIGHTS
  // ==========================================
  {
    id: "trending-designs-2024",
    category: "trending",
    title: "Current Trending Designs & Runway Showcases",
    keywords: ["trending", "popular", "designs", "latest", "hot", "new collection", "bestsellers", "runway", "spotlight"],
    content: `Top Trending Haute Couture Creations on ALTIER:
1. Sculpted Duchesse Silk Evening Gown by Maison Singhal (₹98,400)
   - Category: Couture & Gowns • Deep Wine / Bordeaux
   - Runway Status: #1 Most Saved Piece, 1 Piece Available
2. Hand-Embroidered Zardozi Corset Top by Rohit Balaji (₹45,000)
   - Category: Couture Bodices • Deep Plum Velvet & Antique Gold
   - Status: Trending Curator's Showcase (14,200 impressions, 142 patron saves)
3. Plissé Organza Architectural Trench by Maison Singhal (₹34,950)
   - Category: Avant-Garde Outerwear • Champagne Sheer Organza
   - Status: Trending in Parisian and London trunk shows
4. Beaded Velvet Corset & Wool Trousers (₹36,200)
   - Category: Contemporary Indo-Western • Jet Black & Bronze Beads
5. Cashmere Double-Faced Capelet (₹33,100)
   - Category: Luxury Warm Outerwear • Dusty Rose & Cashmere
6. Pastel Rose Quartz Lehenga Set in Tulle (₹1,24,000)
   - Category: Festive Bridal • Hand-embroidered floral motifs`,
    metadata: {
      tags: ["Trending", "Boutique", "Couture"]
    }
  },

  // ==========================================
  // HOW TO USE THE WEBSITE (CUSTOMER GUIDE)
  // ==========================================
  {
    id: "guide-customer-how-to-buy",
    category: "customer-guide",
    title: "How to Browse & Buy Immediately (Customer Boutique)",
    keywords: ["how to buy", "buy now", "purchase", "checkout", "ordering", "customer", "browse", "payment"],
    content: `How to Purchase Ready Haute Couture Creations:
1. Switch to Customer Boutique: Use the top bar toggle or navigation button to enter 'Customer Boutique' mode.
2. Browse Curated Collections: Explore 'Discover' to see live runway creations, filter by Category (Couture Gowns, Lehengas, Outerwear, Menswear) or Price.
3. Inspect Craftsmanship Specs: Click on any garment card to inspect high-resolution editorial photos, fabric composition (e.g. 100% Pure Mulberry Silk), lining, and exact measurements.
4. Buy Now: Click 'Buy Now' to trigger the secure checkout modal.
5. White-Glove Dispatch: Receive climate-controlled, tamper-evident garment bag delivery with authenticated wax-seal certification within 3–5 business days.`,
    metadata: {
      actionLink: {
        label: "Switch to Customer Boutique",
        actionType: "switch-mode",
        target: "customer"
      }
    }
  },
  {
    id: "guide-customer-bespoke-orders",
    category: "customer-guide",
    title: "How to Commission a Custom Made-to-Measure Piece",
    keywords: ["custom", "commission", "alteration", "bespoke", "measurements", "fitting", "toile", "custom order"],
    content: `How to Commission Custom Atelier Garments:
1. Direct from a Product: On any product details or boutique card, click 'Request Custom Piece' or 'Commission Bespoke Piece'.
2. Provide Fit & Color Preferences: Choose custom waist/bust/hip measurements, preferred color swatches (e.g. Liquid Gold, Rose Gold, Royal Wine), and bespoke alterations.
3. Designer Review & Quote: The master designer reviews your dossier within 24 hours and transmits a comprehensive quotation with estimated days.
4. Escrow Protection: You deposit 50% advance into ALTIER Escrow. Funds are never released to the designer until your toile fitting is approved.
5. Consultation & Fitting: Schedule private in-salon or high-definition virtual consultation.
6. Final Dispatch: Once finished, the second 50% is settled and your custom piece is delivered white-glove.`,
    metadata: {
      actionLink: {
        label: "Open Custom Commissions",
        actionType: "navigate-tab",
        target: "custom-orders"
      }
    }
  },

  // ==========================================
  // HOW TO USE THE WEBSITE (DESIGNER STUDIO GUIDE)
  // ==========================================
  {
    id: "guide-designer-list-product",
    category: "designer-guide",
    title: "How to List a New Creation (Designer Studio)",
    keywords: ["list product", "list new", "how to list", "add piece", "designer", "studio", "publish", "step 1", "step 5"],
    content: `How to Catalog & List a New Masterpiece in Designer Studio:
1. Open Studio: In Designer mode, click '+ List New Product' in the sub-nav bar.
2. Complete 5-Stage Dossier:
   - Step 01: Product Details (Title, Category, Subcategory, Editorial Story, Tags)
   - Step 02: Fit & Measurements (Standard Sizes, Custom Fit parameters: Bust, Waist, Hips, Length, Stretchability)
   - Step 03: Availability (One-of-a-Kind Bespoke vs. Limited Batch stock count)
   - Step 04: Fabric & Care (Primary Textile, Inner Lining, Certified Atelier Care Instructions)
   - Step 05: Pricing & Fulfilment (Valuation in INR, White-Glove Shipping Mode, Box Deadweight & Dimensions)
3. Upload 5 Visual Lookbook Assets: Front Silhouette, Detail & Embroidery macro, Back Drape, Model/Movement, and Cover Look.
4. Publish or Save Draft: Click 'Review & Publish Creation' to go live immediately, or 'Save Draft' to store privately in Salon Vault.`,
    metadata: {
      actionLink: {
        label: "List New Creation Now",
        actionType: "navigate-tab",
        target: "list-new"
      }
    }
  },
  {
    id: "guide-designer-drafts",
    category: "designer-guide",
    title: "Draft Creations & In-Progress Autosave Policy",
    keywords: ["drafts", "save draft", "autosave", "72 hrs", "retention", "unpublished"],
    content: `Managing In-Progress Drafts:
- Automatic Autosave: Forms autosave at every step with progressive 30-day salon retention guarantee.
- Access Drafts: Navigate to the 'Drafts' tab in Studio to see all un-synchronized creations with completion percentages (e.g. 80% Fabric & Care).
- Continue Editing: Click 'Continue Editing →' to resume exactly where you left off.
- Discard Draft: Click 'Discard' to permanently purge abandoned prototypes with safety confirmation.`,
    metadata: {
      actionLink: {
        label: "View Studio Drafts",
        actionType: "navigate-tab",
        target: "drafts"
      }
    }
  },
  {
    id: "guide-designer-boost-promotions",
    category: "designer-guide",
    title: "How to Boost Products for Curated Runway Promotion",
    keywords: ["boost", "promotion", "promote", "ad spend", "impressions", "curator showcase", "salon spotlight", "grand salon"],
    content: `Paid Algorithmic Placement & Showcase Tiers:
- Salon Spotlight (3 Days) — ₹3,500 + GST: High-visibility placement in trending boutique discovery feeds.
- Curator's Showcase (7–14 Days) — ₹7,500 to ₹8,500 + GST: Featured in runway editorial spotlights and patron private newsletters.
- Grand Salon Feature (30 Days) — ₹14,000 + GST: Marquee header placement, global push notifications, and priority concierge recommendation.
- Performance Analytics: Track recorded impressions, catalog clicks, patron wishlist saves, and direct consultation inquiries live in 'Boosted for Promotion' tab.`,
    metadata: {
      actionLink: {
        label: "View Boosted Campaigns",
        actionType: "navigate-tab",
        target: "boosted"
      }
    }
  },
  {
    id: "guide-designer-custom-orders",
    category: "designer-guide",
    title: "How Designers Handle Custom Orders & Transmit Quotes",
    keywords: ["handle custom order", "transmit quote", "review inquiry", "approve measurement", "specs", "custom orders designer"],
    content: `Managing Custom Orders Workflow for Designers:
1. Navigate to 'Custom Orders': View inquiry dossiers sorted into 'New Inquiries', 'In Progress', and 'Completed'.
2. Review Patron Specs: Inspect patron reference photos, custom waist/bust/length parameters, and alteration requests.
3. Transmit Comprehensive Quote: Click 'Review Inquiry' to input total quote in INR, estimated completion days, and craftsmanship notes.
4. Verify Escrow Advance: Once the patron accepts, 50% advance deposit is locked in escrow.
5. Approve Toile & Measurements: Confirm fitting dates or upload swatch cards via 'Send Fabric Swatches'.
6. Mark In-Progress & Complete: Transition the order stage once final fitting is certified.`,
    metadata: {
      actionLink: {
        label: "Open Custom Orders Ledger",
        actionType: "navigate-tab",
        target: "custom-orders"
      }
    }
  },

  // ==========================================
  // PLATFORM FAQS & SAFETY POLICIES
  // ==========================================
  {
    id: "faq-escrow-security",
    category: "faqs",
    title: "How Does ALTIER Escrow Payment Protection Work?",
    keywords: ["escrow", "payment", "safe", "security", "refund", "deposit", "money", "protection"],
    content: `ALTIER Escrow Guarantee:
- For Bespoke Orders: Patrons pay a 50% advance deposit. These funds are held in secure escrow (powered by HDFC/ICICI Corporate Banking).
- Fund Release Conditions: The designer receives advance material reimbursement, but the full balance is released only after the patron has attended the fitting or approved the finished piece.
- Dispute Mediation: In the unlikely event of non-conformance with submitted measurements, ALTIER master concierges arbitrate complimentary alterations or a full escrow refund.`,
    metadata: {
      tags: ["Escrow", "Security", "Payments"]
    }
  },
  {
    id: "faq-shipping-logistics",
    category: "faqs",
    title: "Shipping, Climate Packaging, & White-Glove Logistics",
    keywords: ["shipping", "delivery", "courier", "packaging", "time", "international", "dhl", "bluedart"],
    content: `White-Glove Shipping & Delivery Standards:
- Packaging: Every garment is encased in breathable acid-free muslin garment bags and placed in reinforced archival rigid boxes.
- Dispatch Partners: Expedited air transport via BlueDart Apex Air and DHL Express International.
- Transit Timelines: Domestic metro delivery within 48–72 hours. International delivery within 4–6 business days.
- Insurance: 100% full transit insurance against loss, damage, or water ingress.`,
    metadata: {
      tags: ["Logistics", "Packaging", "Shipping"]
    }
  },
  {
    id: "faq-authenticity-provenance",
    category: "faqs",
    title: "Authenticity, Fabric Standards & Provenance Seals",
    keywords: ["authenticity", "original", "fake", "provenance", "certificate", "wax seal", "fabric purity"],
    content: `Authenticity & Artisanal Standards:
- Fabric Purity: Strict ban on synthetic polyesters for items classified as Pure Silk, Duchess Satin, or Handloom Brocade. Every piece includes lab-certified textile certifications.
- Physical Wax Seal: Each authenticated piece bears an embossed gold wax seal containing the unique Master Certificate ID (e.g. #MP-SL-9082).
- Archival Ledger: Once acquired, the piece is recorded in the permanent vault depository, establishing verifiable historic provenance.`,
    metadata: {
      tags: ["Authenticity", "Certification", "Provenance"]
    }
  }
];

