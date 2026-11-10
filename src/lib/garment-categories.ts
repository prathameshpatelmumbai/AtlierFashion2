export interface GarmentCategory {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  subcategories: string[];
}

export const WOMEN_GARMENT_CATEGORIES: GarmentCategory[] = [
  {
    id: "women-tops",
    name: "Tops and Upperwear",
    subtitle: "Couture Silks, Handwoven Blouses & Knitwear",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=600&auto=format&fit=crop",
    subcategories: [
      "T-shirts (Crew, V-neck, Oversized, Graphic, Cropped)",
      "Shirts (Formal, Casual, Oversized, Linen, Denim)",
      "Blouses (Formal, Office, Peplum, Puff-sleeve, Tie-front)",
      "Tops (Camisole, Tank, Tube, Halter, Corset, Bodysuit, Crop)",
      "Polos, Henley Tops & Tunic Tops",
      "Sweatshirts, Hoodies & Knitted Tops"
    ]
  },
  {
    id: "women-bottoms",
    name: "Bottomwear",
    subtitle: "Tailored Trousers, Palazzos & Denim",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop",
    subcategories: [
      "Jeans (Skinny, Straight, Wide-leg, Bootcut, Flare, Mom)",
      "Trousers (Formal, Tailored, Palazzo, Cargo, Wide-leg)",
      "Pants (Chinos, Linen Pants, Joggers, Track Pants)",
      "Leggings, Jeggings & Tights",
      "Shorts (Denim, Tailored, Cycling, Casual)",
      "Skirts (Mini, Midi, Maxi, Pencil, A-line, Pleated, Tiered)",
      "Culottes, Capris & Dhoti Pants"
    ]
  },
  {
    id: "women-dresses",
    name: "Dresses and One-Piece Outfits",
    subtitle: "Couture Gowns, Jumpsuits & Co-ord Sets",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop",
    subcategories: [
      "Mini, Midi and Maxi Dresses",
      "A-line, Fit-and-flare, Bodycon, Shift & Sheath",
      "Shirt Dresses, Wrap Dresses & Slip Dresses",
      "Maxi Gowns, Evening Gowns & Cocktail Dresses",
      "Party Dresses, Formal Dresses & Maternity Dresses",
      "Jumpsuits, Playsuits & Rompers",
      "Co-ord Sets & Matching Two-Piece Sets"
    ]
  },
  {
    id: "women-ethnic",
    name: "Indian Ethnic and Fusion Wear",
    subtitle: "Heritage Lehengas, Royal Sarees & Anarkalis",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop",
    subcategories: [
      "Kurtas & Kurtis (Straight, A-line, Anarkali, Angrakha)",
      "Salwar Suits, Churidar Sets & Patiala Suits",
      "Palazzo Suits, Sharara Sets & Gharara Sets",
      "Lehenga Choli, Ghagra Choli & Bridal Lehengas",
      "Sarees (Silk, Cotton, Chiffon, Georgette, Embroidered)",
      "Blouses (Saree Blouse, Designer Blouse, Crop Blouse)",
      "Dupattas, Stoles & Ethnic Jackets",
      "Indo-Western Dresses, Ethnic Co-ords & Dhoti Sets",
      "Festive Gowns & Bridal Outfits"
    ]
  },
  {
    id: "women-outerwear",
    name: "Outerwear and Layering",
    subtitle: "Structured Capes, Silk Trench Coats & Blazers",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600&auto=format&fit=crop",
    subcategories: [
      "Blazers, Formal Jackets & Cropped Jackets",
      "Denim Jackets, Leather Jackets & Bomber Jackets",
      "Trench Coats, Overcoats & Winter Coats",
      "Cardigans, Shrugs, Boleros, Capes & Ponchos",
      "Waistcoats, Sleeveless Jackets & Ethnic Jackets",
      "Puffer Jackets, Raincoats & Windcheaters"
    ]
  },
  {
    id: "women-loungewear",
    name: "Innerwear, Sleepwear and Loungewear",
    subtitle: "Mulberry Silk Slips, Robes & Lounge Sets",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
    subcategories: [
      "Bras (T-shirt, Sports, Padded, Bralette, Strapless)",
      "Briefs, Hipsters, Boyshorts & Panties",
      "Shapewear, Slips, Camisoles & Inner Shorts",
      "Nightdresses, Nighties & Pajama Sets",
      "Robes, Bathrobes, Lounge Sets & House Dresses",
      "Maternity Innerwear & Nursing Wear",
      "Thermal Tops, Thermal Bottoms & Hosiery"
    ]
  },
  {
    id: "women-sportswear",
    name: "Sportswear and Swimwear",
    subtitle: "Performance Base Layers, Tracksuits & Resort Wear",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop",
    subcategories: [
      "Sports Bras, Gym Tops & Training T-shirts",
      "Yoga Pants, Leggings & Cycling Shorts",
      "Tracksuits, Track Jackets & Jogger Sets",
      "Running Shorts, Tennis Skirts & Sports Jerseys",
      "Swimsuits, Bikinis, Tankinis & Swim Dresses",
      "Rash Guards, Swim Shorts & Beach Cover-ups"
    ]
  }
];

export const MEN_GARMENT_CATEGORIES: GarmentCategory[] = [
  {
    id: "men-tops",
    name: "Tops and Shirts",
    subtitle: "Hand-Loomed Linen, Cuban Collars & Knits",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
    subcategories: [
      "T-shirts (Crew Neck, V-neck, Oversized, Graphic)",
      "Polo T-shirts, Henley Shirts & Longline T-shirts",
      "Shirts (Formal, Casual, Oxford, Linen, Denim, Flannel)",
      "Cuban-Collar, Camp-Collar & Resort Shirts",
      "Checked Shirts, Printed Shirts & Embroidered Shirts",
      "Tank Tops, Vests & Sleeveless Tops",
      "Sweatshirts, Hoodies & Knitted Tops"
    ]
  },
  {
    id: "men-bottoms",
    name: "Bottomwear",
    subtitle: "Pleated Trousers, Italian Chinos & Selvedge Denim",
    image: "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=600&auto=format&fit=crop",
    subcategories: [
      "Jeans (Slim, Skinny, Straight, Relaxed, Baggy, Bootcut)",
      "Formal Trousers, Pleated Trousers & Tailored Pants",
      "Chinos, Linen Pants, Cargo Pants & Utility Pants",
      "Joggers, Track Pants & Sweatpants",
      "Shorts (Denim, Cargo, Tailored, Athletic, Casual)",
      "Three-Quarter Pants, Capris & Dhoti Pants"
    ]
  },
  {
    id: "men-ethnic",
    name: "Indian Ethnic and Traditional Wear",
    subtitle: "Royal Sherwanis, Bandhgalas & Angrakhas",
    image: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?q=80&w=600&auto=format&fit=crop",
    subcategories: [
      "Kurtas (Short, Long, Straight, Embroidered, Printed)",
      "Kurta-Pajama Sets & Kurta-Trouser Sets",
      "Sherwanis, Achkans, Bandhgalas & Jodhpuri Suits",
      "Nehru Jackets, Ethnic Waistcoats & Embroidered Jackets",
      "Dhoti-Kurta Sets, Dhotis & Lungis",
      "Pathani Suits & Salwar-Kurta Sets",
      "Angavastram, Traditional Drapes & Stoles",
      "Festive Co-ords, Indo-Western Sets & Wedding Outfits"
    ]
  },
  {
    id: "men-formalwear",
    name: "Formalwear and Occasionwear",
    subtitle: "Two-Piece & Three-Piece Suits, Tuxedos & Waistcoats",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop",
    subcategories: [
      "Two-Piece Suits & Three-Piece Suits",
      "Blazers, Tuxedos & Dinner Jackets",
      "Waistcoats & Formal Vests",
      "Formal Shirts & Dress Trousers",
      "Wedding Suits, Partywear Sets & Prom Suits",
      "Business-Casual Separates"
    ]
  },
  {
    id: "men-jackets",
    name: "Jackets and Outerwear",
    subtitle: "Overcoats, Double-Breasted Cashmere & Bombers",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop",
    subcategories: [
      "Denim, Leather, Bomber & Varsity Jackets",
      "Biker Jackets, Overshirts & Shirt Jackets",
      "Windcheaters, Rain Jackets & Puffer Jackets",
      "Trench Coats, Overcoats & Parkas",
      "Cardigans, Knitted Jackets & Sleeveless Jackets",
      "Casual and Formal Blazers"
    ]
  },
  {
    id: "men-loungewear",
    name: "Innerwear, Sleepwear and Loungewear",
    subtitle: "Luxury Pima Cotton, Thermal Sets & Robes",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
    subcategories: [
      "Briefs, Boxer Briefs, Boxers & Trunks",
      "Vests, Undershirts & Thermal Innerwear",
      "Pajama Sets, Night Suits & Sleep Shorts",
      "Lounge Pants, Lounge Sets & Robes",
      "Bathrobes, Thermal Tops & Bottoms"
    ]
  },
  {
    id: "men-sportswear",
    name: "Sportswear and Swimwear",
    subtitle: "Gym Aerodynamics, Tracksuits & Swim Trunks",
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600&auto=format&fit=crop",
    subcategories: [
      "Gym T-shirts, Tank Tops & Compression Tops",
      "Training Shorts, Running Shorts & Gym Joggers",
      "Tracksuits, Sports Jerseys & Cycling Wear",
      "Football, Cricket & Basketball Apparel",
      "Swim Shorts, Swim Briefs & Board Shorts",
      "Rash Guards & Performance Base Layers"
    ]
  }
];

export const KIDS_GARMENT_CATEGORIES: GarmentCategory[] = [
  {
    id: "kids-baby",
    name: "Baby and Infant Clothing",
    subtitle: "Organic Ahimsa Cotton Onesies & Rompers",
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?q=80&w=600&auto=format&fit=crop",
    subcategories: [
      "Bodysuits, Onesies & Rompers",
      "Sleepsuits, Baby Pajamas & Sleeping Gowns",
      "Baby Vests, Tops & T-shirts",
      "Leggings, Baby Trousers & Bloomers",
      "Baby Dresses, Dungarees & Overalls",
      "Swaddles, Wearable Blankets & Baby Cardigans",
      "Mittens, Booties & Clothing Sets"
    ]
  },
  {
    id: "kids-boys",
    name: "Boys' Clothing",
    subtitle: "Miniature Sherwanis, Blazers & Casualwear",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=600&auto=format&fit=crop",
    subcategories: [
      "T-shirts, Polo Shirts & Casual Shirts",
      "Formal Shirts & Waistcoats",
      "Jeans, Trousers, Chinos & Shorts",
      "Joggers, Track Pants & Cargo Pants",
      "Hoodies, Sweatshirts & Jackets",
      "Kurta-Pajama Sets, Sherwanis & Nehru Jackets",
      "Suits, Blazers & Ethnic Festive Sets",
      "Nightwear, Underwear & Schoolwear",
      "Sportswear & Swimwear"
    ]
  },
  {
    id: "kids-girls",
    name: "Girls' Clothing",
    subtitle: "Heritage Lehenga Cholis, Frocks & Gowns",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=600&auto=format&fit=crop",
    subcategories: [
      "T-shirts, Tops, Shirts & Blouses",
      "Dresses (Casual, Party, Maxi, Pinafore)",
      "Skirts, Shorts, Jeans, Trousers & Leggings",
      "Jumpsuits, Rompers & Dungarees",
      "Cardigans, Hoodies, Jackets & Coats",
      "Frocks, Gowns, Lehenga Choli & Ghagra Sets",
      "Kurta Sets, Salwar Suits & Festive Wear",
      "Nightwear, Underwear & Schoolwear",
      "Sportswear, Dancewear & Swimwear"
    ]
  },
  {
    id: "kids-unisex",
    name: "Unisex Kids' Clothing",
    subtitle: "Cozy Knitwear, Tracksuits & Rainwear",
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=600&auto=format&fit=crop",
    subcategories: [
      "Basic T-shirts, Sweatshirts & Hoodies",
      "Tracksuits, Joggers & Shorts",
      "Pajama Sets & Sleepwear",
      "Raincoats & Winter Jackets",
      "School Uniforms & Sports Uniforms",
      "Matching Family Outfits",
      "Cultural Costumes & Performance Clothing"
    ]
  }
];

export function getGarmentCategories(gender: "Men" | "Women" | "Kids" | null): GarmentCategory[] {
  if (gender === "Men") return MEN_GARMENT_CATEGORIES;
  if (gender === "Women") return WOMEN_GARMENT_CATEGORIES;
  if (gender === "Kids") return KIDS_GARMENT_CATEGORIES;
  return WOMEN_GARMENT_CATEGORIES;
}

