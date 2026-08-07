/**
 * NLTC Master Product Database & Helper Utilities
 * Migrated from product-data.js (original) → ES Module for React
 * Logic is identical to the original — only the module format changed.
 */
import { productsData } from './productsCatalogData';
import { occasionsProducts } from './occasionsCatalogData';
import { bestsellersProducts } from './bestsellersCatalogData';


// Helper to generate a URL slug from name
function createSlug(name, id) {
    return (name || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') + '-' + id;
}

// Default Images fallback dictionary based on category or image type
const fallbackGalleries = {
    "nltc_prod_balloon_hbfoil.png": [
        "nltc_prod_balloon_hbfoil.png",
        "cardballoons.png",
        "nltc_prod_balloon_goldchrome.png",
        "nltc_prod_balloon_pastel.png",
        "nltc_prod_balloon_heartfoil.png"
    ],
    "nltc_prod_balloon_goldchrome.png": [
        "nltc_prod_balloon_goldchrome.png",
        "cardballoons.png",
        "bestsellers2.png",
        "nltc_prod_balloon_rosegoldchrome.png",
        "nltc_prod_balloon_starfoil.png"
    ],
    "nltc_prod_balloon_heartfoil.png": [
        "nltc_prod_balloon_heartfoil.png",
        "cardballoons.png",
        "nltc_prod_balloon_hbfoil.png",
        "nltc_prod_balloon_pastel.png",
        "nltc_prod_balloon_rosegoldchrome.png"
    ],
    "nltc_prod_balloon_num1foil.png": [
        "nltc_prod_balloon_num1foil.png",
        "bestsellers4.png",
        "cardcandles.png",
        "nltc_prod_balloon_goldchrome.png",
        "nltc_prod_balloon_starfoil.png"
    ],
    "nltc_prod_balloon_pastel.png": [
        "nltc_prod_balloon_pastel.png",
        "cardballoons.png",
        "nltc_prod_balloon_hbfoil.png",
        "nltc_prod_balloon_confetti.png",
        "nltc_prod_balloon_smiley.png"
    ],
    "nltc_prod_balloon_confetti.png": [
        "nltc_prod_balloon_confetti.png",
        "cardpoppers.png",
        "cardballoons.png",
        "nltc_prod_balloon_starfoil.png",
        "nltc_prod_balloon_goldchrome.png"
    ],
    "default": [
        "nltc_prod_balloon_hbfoil.png",
        "cardballoons.png",
        "bestsellers1.png",
        "cardtoppers.png",
        "nltc_prod_balloon_goldchrome.png"
    ]
};

// Helper to get gallery images for any product
export function getGalleryForImage(mainImage) {
    if (fallbackGalleries[mainImage]) {
        return [...fallbackGalleries[mainImage]];
    }
    return [
        mainImage || "nltc_prod_balloon_hbfoil.png",
        "cardballoons.png",
        "bestsellers1.png",
        "cardtoppers.png",
        "nltc_prod_balloon_goldchrome.png"
    ];
}

// Default Master Raw Catalog — identical data from original product-data.js
const rawProducts = [
    // Balloons Category
    {
        id: "b1", numericId: "101",
        slug: "red-metallic-balloons-50-pcs-10-packs",
        name: "Red Metallic Balloons (50 Pcs × 10 Packs)",
        rating: 5, reviews: 124, price: 199, originalPrice: 269, discount: "26% OFF",
        image: "redinflated.png", category: "Balloons", categorySlug: "balloons",
        occasion: "Birthday", material: "Latex", color: "Red", size: "12 inch",
        sku: "NLTC-BL-1001", stockStatus: "In Stock",
        description: "Add a bold and elegant touch to your event decor with premium Red Metallic Balloons (50 Pcs × 10 Packs).",
        bulletPoints: ["100% Biodegradable Latex", "Vibrant contrast colors", "Thick leak-proof material", "Suitable for air & helium inflation"]
    },
    {
        id: "b2", slug: "dark-blue-metallic-balloons-50-pcs-10-packs",
        name: "Dark-Blue Metallic Balloons (50 Pcs × 10 Packs)",
        rating: 4.5, reviews: 98, price: 199, originalPrice: 249, discount: "20% OFF",
        image: "darkblueinflated.png", category: "Balloons", categorySlug: "balloons",
        occasion: "Birthday", material: "Latex", color: "Dark Blue", size: "12 inch",
        sku: "NLTC-BL-1002", stockStatus: "In Stock",
        description: "Add a bold and elegant touch with Dark-Blue Metallic Balloons (50 Pcs × 10 Packs).",
        bulletPoints: ["Soft metallic shiny finish", "Extra stretchy premium latex", "Long lasting air retention", "Great for balloon arches & garlands"]
    },
    {
        id: "b3", slug: "sky-blue-metallic-balloons-50-pcs-10-packs",
        name: "Sky-Blue Metallic Balloons (50 Pcs × 10 Packs)",
        rating: 5, reviews: 87, price: 249, originalPrice: 349, discount: "28% OFF",
        image: "skyblueinflated.png", category: "Balloons", categorySlug: "balloons",
        occasion: "Birthday", material: "Latex", color: "Sky Blue", size: "12 inch",
        sku: "NLTC-BL-1003", stockStatus: "In Stock",
        description: "Super shiny high-gloss sky blue metallic balloons for royal party setups.",
        bulletPoints: ["Ultra high-gloss metallic sheen", "Heavy-weight durable rubber", "Helium compatible for floating", "Perfect for photo backdrops"]
    },
    {
        id: "b4", slug: "golden-metallic-balloons-50-pcs-10-packs",
        name: "Golden Metallic Balloons (50 Pcs × 10 Packs)",
        rating: 4.5, reviews: 156, price: 149, originalPrice: 199, discount: "25% OFF",
        image: "goldeninflated.png", category: "Balloons", categorySlug: "balloons",
        occasion: "Birthday", material: "Latex", color: "Golden", size: "12 inch",
        sku: "NLTC-BL-1004", stockStatus: "In Stock",
        description: "Premium Golden Metallic Balloons for birthday parties, surprises, and decorations.",
        bulletPoints: ["High quality metallic finish", "Reusable & durable", "Bright and colorful print", "Easy to inflate (Air/Helium)"]
    },
    {
        id: "b5", slug: "white-metallic-balloons-50-pcs-10-packs",
        name: "White Metallic Balloons (50 Pcs × 10 Packs)",
        rating: 4.5, reviews: 64, price: 149, originalPrice: 199, discount: "25% OFF",
        image: "whiteinflated.png", category: "Balloons", categorySlug: "balloons",
        occasion: "Birthday", material: "Latex", color: "White", size: "12 inch",
        sku: "NLTC-BL-1005", stockStatus: "In Stock",
        description: "Pure white metallic balloons for birthday milestone celebrations.",
        bulletPoints: ["Standard 12-inch size", "Self-sealing balloon ties", "Refillable & durable latex", "Eye-catching white finish"]
    },
    {
        id: "b6", slug: "pink-metallic-balloons-50-pcs-10-packs",
        name: "Pink Metallic Balloons (50 Pcs × 10 Packs)",
        rating: 5, reviews: 112, price: 149, originalPrice: 199, discount: "25% OFF",
        image: "pinkinflated.png", category: "Balloons", categorySlug: "balloons",
        occasion: "Birthday", material: "Latex", color: "Pink", size: "12 inch",
        sku: "NLTC-BL-1006", stockStatus: "In Stock",
        description: "Gorgeous pink metallic balloons for birthday surprises and party decorations.",
        bulletPoints: ["Vibrant pink color", "Metallic shine", "Durable latex material", "Helium floating duration 24h+"]
    },
    {
        id: "b7", slug: "confetti-balloons-pack-of-10",
        name: "Confetti Balloons (Pack of 10)",
        rating: 4, reviews: 73, price: 149, originalPrice: 199, discount: "25% OFF",
        image: "nltc_prod_balloon_confetti.png", category: "Balloons", categorySlug: "balloons",
        occasion: "Party", material: "Clear Latex + Foil", color: "Gold Confetti", size: "12 inch",
        sku: "NLTC-BL-1007", stockStatus: "In Stock",
        description: "Transparent balloons pre-filled with sparkling foil confetti dots.",
        bulletPoints: ["Pre-filled foil confetti", "Crystal clear latex transparency", "Great for photo shoots & poppers", "Static rub instructions included"]
    },
    {
        id: "b8", slug: "rose-gold-chrome-balloons-pack-of-50",
        name: "Rose Gold Chrome Balloons (Pack of 50)",
        rating: 4.5, reviews: 91, price: 249, originalPrice: 349, discount: "28% OFF",
        image: "nltc_prod_balloon_rosegoldchrome.png", category: "Balloons", categorySlug: "balloons",
        occasion: "Birthday", material: "Chrome Latex", color: "Rose Gold", size: "12 inch",
        sku: "NLTC-BL-1008", stockStatus: "In Stock",
        description: "Trendy rose gold metallic balloons for birthday aesthetics and room surprise decorations.",
        bulletPoints: ["Chic rose gold metallic color", "Thick rubber leak-proof", "Helium float ready", "Ideal for glam aesthetic decor"]
    },
    // Candles Category
    {
        id: "c1", slug: "sparkling-anaar-candle-pack-of-4",
        name: "Sparkling Anaar Candle (Pack of 4)",
        rating: 5, reviews: 112, price: 180, originalPrice: 240, discount: "25% OFF",
        image: "nltc_prod_balloon_goldchrome.png", category: "Candles", categorySlug: "candles",
        occasion: "Birthday", material: "Sparkler Wax", color: "Gold & Silver", size: "15 cm",
        sku: "NLTC-CD-2001", stockStatus: "In Stock",
        description: "Light up the birthday cake cutting moment with sparkling cold-pyro fountain candles.",
        bulletPoints: ["Smokeless cold sparkler burn", "Safe for indoor cake cutting", "30-45 seconds sparkling duration", "Spike bottom for easy cake placement"]
    },
    {
        id: "c2", slug: "number-birthday-candles-0-9",
        name: "Number Birthday Candles (0-9)",
        rating: 4.5, reviews: 74, price: 79, originalPrice: 99, discount: "20% OFF",
        image: "nltc_prod_balloon_num1foil.png", category: "Candles", categorySlug: "candles",
        occasion: "Birthday", material: "Eco Wax", color: "Golden Metallic", size: "7 cm",
        sku: "NLTC-CD-2002", stockStatus: "In Stock",
        description: "Elegant golden metallic number candles available from digits 0 to 9.",
        bulletPoints: ["Eco-friendly paraffin wax", "Slow steady burn", "Glossy golden metallic coating", "Sturdy plastic toothpicks"]
    },
    // Birthday Caps Category
    {
        id: "h1", slug: "glitter-birthday-king-queen-crowns-pack-of-2",
        name: "Glitter Birthday King & Queen Crowns (Pack of 2)",
        rating: 5, reviews: 59, price: 199, originalPrice: 249, discount: "20% OFF",
        image: "nltc_prod_balloon_goldchrome.png", category: "Birthday Caps", categorySlug: "birthday-caps",
        occasion: "Birthday", material: "Paperboard + Glitter", color: "Gold & Silver", size: "Adjustable",
        sku: "NLTC-CP-3001", stockStatus: "In Stock",
        description: "Sparkling glitter crowns for the birthday prince/king and princess/queen.",
        bulletPoints: ["Non-shedding glitter finish", "Soft elastic comfortable headband", "Fits children & adults", "Reusable party accessory"]
    },
    // Party Poppers Category
    {
        id: "p1", slug: "large-confetti-party-popper-40-cm",
        name: "Large Confetti Party Popper (40 cm)",
        rating: 4.9, reviews: 142, price: 149, originalPrice: 199, discount: "25% OFF",
        image: "nltc_prod_balloon_confetti.png", category: "Party Poppers", categorySlug: "party-poppers",
        occasion: "Celebration", material: "Metallic Foil & Air Cannon", color: "Multicolor", size: "40 cm",
        sku: "NLTC-PP-4001", stockStatus: "In Stock",
        description: "Celebrate grand moments with a blast of colorful foil streamer confetti.",
        bulletPoints: ["Spring air pressure operated (No gunpowder)", "Safe indoor & outdoor use", "Loud pop celebration sound", "Shining metallic streamer foil"]
    },
    // Sashes Category
    {
        id: "s1", slug: "birthday-girl-satin-sash-glitter-pink",
        name: "Birthday Girl Satin Sash (Glitter Pink)",
        rating: 5, reviews: 188, price: 149, originalPrice: 199, discount: "25% OFF",
        image: "nltc_prod_balloon_heartfoil.png", category: "Sashes", categorySlug: "sashes",
        occasion: "Birthday", material: "Premium Satin", color: "Glitter Pink", size: "Free Size (160 cm)",
        sku: "NLTC-SH-5001", stockStatus: "In Stock",
        description: "Soft pink satin sash with glittering 'Birthday Girl' foil lettering.",
        bulletPoints: ["Silky smooth double-layer satin", "Foil glitter lettering won't rub off", "Includes safety pin for fit", "Comfortable all-day wear"]
    },
    // Banners Category
    {
        id: "ba1", slug: "gold-foil-happy-birthday-banner",
        name: "Gold Foil Happy Birthday Banner (Alphabet Letters)",
        rating: 4.9, reviews: 201, price: 199, originalPrice: 299, discount: "33% OFF",
        image: "nltc_prod_balloon_goldchrome.png", category: "Banners", categorySlug: "banners",
        occasion: "Birthday", material: "Foil & Cardstock", color: "Gold Metallic", size: "2.5 Meters",
        sku: "NLTC-BN-6001", stockStatus: "In Stock",
        description: "Classic gold metallic letter banner spelling 'HAPPY BIRTHDAY'.",
        bulletPoints: ["Large bold metallic letters", "Includes hanging ribbon thread", "Pre-punched holes for easy setup", "Durable reusable cardstock"]
    },
    // Cake Toppers Category
    {
        id: "to1", slug: "happy-birthday-gold-acrylic-cake-topper",
        name: "Happy Birthday Gold Acrylic Cake Topper",
        rating: 4.9, reviews: 201, price: 149, originalPrice: 199, discount: "25% OFF",
        image: "cardtoppers.png", category: "Cake Toppers", categorySlug: "toppers",
        occasion: "Birthday", material: "Food Safe Acrylic", color: "Mirror Gold", size: "15 x 12 cm",
        sku: "NLTC-TP-7001", stockStatus: "In Stock",
        description: "Mirror shiny gold acrylic cake topper for professional and luxurious cakes.",
        bulletPoints: ["Food-grade washable acrylic", "High gloss mirror finish", "Protective film on surface", "Reusable for multiple cakes"]
    },
    // Cake Dolls
    {
        id: "bd1", slug: "princess-barbie-cake-doll-pink-gown",
        name: "Princess Barbie Cake Doll (Pink Gown)",
        rating: 4.8, reviews: 93, price: 249, originalPrice: 349, discount: "28% OFF",
        image: "cardtoppers.png", category: "Cake Dolls", categorySlug: "cake-dolls",
        occasion: "Birthday", material: "Plastic & Fabric", color: "Pink", size: "18 cm",
        sku: "NLTC-DL-8001", stockStatus: "In Stock",
        description: "Beautiful princess cake topper doll for girls' birthday parties.",
        bulletPoints: ["Detailed painted features", "Food safe bottom stake", "Detachable gown skirt", "Reusable toy doll"]
    },
    // 3D Butterfly
    {
        id: "bf1", slug: "hollow-metallic-3d-butterflies-gold-pack-of-12",
        name: "Hollow Metallic 3D Butterflies (Gold, Pack of 12)",
        rating: 4.9, reviews: 104, price: 149, originalPrice: 199, discount: "25% OFF",
        image: "nltc_prod_balloon_goldchrome.png", category: "Decorations", categorySlug: "3d-butterfly",
        occasion: "Theme Party", material: "Metallic Paper", color: "Gold", size: "Assorted (8, 10, 12 cm)",
        sku: "NLTC-BF-9001", stockStatus: "In Stock",
        description: "3D hollow metallic golden butterflies for wall backdrops, balloon arches, and cake decorations.",
        bulletPoints: ["Laser cut hollow pattern", "Includes double-sided glue dots", "Easy fold 3D wing effect", "Reflective metallic luster"]
    }
];

// --- Helper inference functions (identical logic from original) ---
function inferColor(name) {
    if (!name) return "Multi Color";
    const n = name.toLowerCase();
    if (n.includes("red & black") || n.includes("red-black")) return "Red & Black";
    if (n.includes("golden-black") || n.includes("golden black")) return "Gold & Black";
    if (n.includes("dark-blue") || n.includes("dark blue")) return "Dark Blue";
    if (n.includes("sky-blue") || n.includes("sky blue")) return "Sky Blue";
    if (n.includes("rose-gold") || n.includes("rose gold")) return "Rose Gold";
    if (n.includes("golden") || n.includes("gold")) return "Golden";
    if (n.includes("silver")) return "Silver";
    if (n.includes("red")) return "Red";
    if (n.includes("blue")) return "Blue";
    if (n.includes("pink")) return "Pink";
    if (n.includes("yellow")) return "Yellow";
    if (n.includes("black")) return "Black";
    if (n.includes("grey") || n.includes("gray")) return "Grey";
    if (n.includes("green")) return "Green";
    if (n.includes("orange")) return "Orange";
    if (n.includes("purple")) return "Purple";
    if (n.includes("white")) return "White";
    if (n.includes("pastel")) return "Pastel Mix";
    return "Multi Color";
}

function inferMaterial(name) {
    if (!name) return "Latex";
    const n = name.toLowerCase();
    if (n.includes("foil") || n.includes("hbd") || n.includes("anniversary")) return "Foil";
    if (n.includes("latex") || n.includes("metallic") || n.includes("chrome") || n.includes("inflated")) return "Latex";
    return "Latex";
}

function inferSize(name) {
    if (!name) return "12 inch";
    const n = name.toLowerCase();
    if (n.includes("32 inch")) return "32 inch";
    if (n.includes("18 inch")) return "18 inch";
    if (n.includes("10 pack") || n.includes("16 letters") || n.includes("13 letters")) return "16 inch";
    if (n.includes("50 pcs") || n.includes("pack of 50") || n.includes("pack of 10")) return "12 inch";
    return "12 inch";
}

function inferOccasion(name) {
    if (!name) return "Birthday";
    const n = name.toLowerCase();
    if (n.includes("anniversary")) return "Anniversary";
    if (n.includes("birthday") || n.includes("hbd")) return "Birthday";
    if (n.includes("love") || n.includes("heart")) return "Anniversary / Romantic";
    if (n.includes("baby")) return "Baby Shower";
    return "Birthday";
}

// Build lookup indexes
const productLookup = {};

function processProduct(p) {
    const id = String(p.id);
    const numericId = p.numericId || id;
    const slug = p.slug || createSlug(p.name, id);
    const price = Number(p.price) || 149;
    const originalPrice = Number(p.originalPrice) || Math.round(price * 1.33);
    const discount = p.discount || `${Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF`;
    const category = p.category || "Balloons";
    const categorySlug = p.categorySlug || category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const primaryImage = p.image || "nltc_prod_balloon_hbfoil.png";
    const images = p.images && p.images.length
        ? p.images
        : [primaryImage, ...getGalleryForImage(primaryImage).filter(img => img !== primaryImage)];

    const color = p.color || inferColor(p.name);
    const material = p.material || inferMaterial(p.name);
    const size = p.size || inferSize(p.name);
    const occasion = p.occasion || inferOccasion(p.name);
    const numIdPart = parseInt(id.replace(/\D/g, '')) || 1002;
    const sku = p.sku || `NLTC-BL-${1000 + numIdPart}`;
    const description = p.description || `Premium ${p.name || 'party decoration item'} by NLTC.`;

    const normalized = {
        id, numericId: String(numericId), slug,
        name: p.name || "Happy Birthday Party Decoration Item",
        rating: Number(p.rating) || 4.8,
        reviews: Number(p.reviews) || 150,
        price, originalPrice, discount,
        image: primaryImage, images,
        category, categorySlug, occasion, material, color, size, sku,
        stockStatus: p.stockStatus || "In Stock",
        description,
        bulletPoints: p.bulletPoints || ["High quality material", "Reusable & durable", "Vibrant print & color", "Easy setup & inflation"],
        specificationsTable: p.specificationsTable || {
            "Brand": "New Lines Trading Company (NLTC)",
            "Category": category, "Occasion": occasion,
            "Material": material, "Color": color,
            "Size / Dimensions": size,
            "Package Contains": "1 Set / Pack of items",
            "Country of Origin": "India"
        },
        shippingInfo: "Ships within 24 hours. Estimated delivery time 2-4 business days. Easy 7-day returns if damaged or defective.",
        reviewsList: [
            { name: "Rahul Sharma", rating: 5, date: "May 10, 2026", comment: "Super quality product! The colors are vibrant and setup was very easy. Highly recommended for party decor." },
            { name: "Priya Patel", rating: 5, date: "April 28, 2026", comment: "Exactly as shown in the picture. Quick delivery and sturdy packaging by NLTC!" },
            { name: "Ankit Verma", rating: 4, date: "April 15, 2026", comment: "Good quality for the price. Made our celebration look great!" }
        ]
    };

    productLookup[id] = normalized;
    productLookup[String(numericId)] = normalized;
    productLookup[slug] = normalized;
    productLookup[id.toLowerCase()] = normalized;

    return normalized;
}

// Process all raw products
const allProducts = rawProducts.map(processProduct);

// Import and merge all product datasets from products.js, occasions.js, bestsellers.js
function importAllCatalogProducts() {
  const sources = [productsData, bestsellersProducts, occasionsProducts];
  sources.forEach((src) => {
    if (!src) return;
    Object.keys(src).forEach((catKey) => {
      if (Array.isArray(src[catKey])) {
        src[catKey].forEach((p) => {
          const item = { ...p };
          item.categorySlug = catKey;
          item.category = catKey.charAt(0).toUpperCase() + catKey.slice(1).replace(/-/g, ' ');
          const processed = processProduct(item);

          const existingIdx = allProducts.findIndex(
            (existing) => String(existing.id).toLowerCase() === String(p.id).toLowerCase()
          );
          if (existingIdx !== -1) {
            allProducts[existingIdx] = { ...allProducts[existingIdx], ...processed };
          } else {
            allProducts.push(processed);
          }
        });
      }
    });
  });
}

importAllCatalogProducts();

// Lookup functions (identical logic from original)
export function getProductByIdOrSlug(idOrSlug) {
    if (!idOrSlug) return productLookup["b1"] || allProducts[0];
    const key = String(idOrSlug).trim().toLowerCase();
    if (productLookup[key]) return productLookup[key];
    const match = allProducts.find(p =>
        String(p.id).toLowerCase() === key ||
        (p.slug && p.slug.toLowerCase() === key) ||
        String(p.numericId) === key
    );
    if (match) return match;
    return productLookup["b1"] || allProducts[0];
}

export function getRelatedProducts(categorySlug, currentId, limit = 4) {
    let matches = allProducts.filter(p => p.id !== currentId && p.categorySlug === categorySlug);
    if (matches.length < limit) {
        const extra = allProducts.filter(p => p.id !== currentId && !matches.includes(p));
        matches = matches.concat(extra);
    }
    return matches.slice(0, limit);
}

export { allProducts, productLookup };
export default allProducts;
