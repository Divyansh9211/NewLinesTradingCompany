/**
 * NLTC Master Product Database & Helper Utilities
 * Contains consolidated dataset and helpers for dynamic Product Details Page
 */

(function () {
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
    function getGalleryForImage(mainImage) {
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

    // Default Master Raw Catalog
    const rawProducts = [
        // Balloons Category
        {
            id: "b4",
            numericId: "101",
            slug: "happy-birthday-foil-balloon",
            name: "Happy Birthday Foil Balloon (18 inch)",
            rating: 4.8,
            reviews: 156,
            price: 149,
            originalPrice: 199,
            discount: "25% OFF",
            image: "nltc_prod_balloon_hbfoil.png",
            category: "Balloons",
            categorySlug: "balloons",
            occasion: "Birthday",
            material: "Foil",
            color: "Multi Color",
            size: "18 inch",
            sku: "NLTC-BL-1001",
            stockStatus: "In Stock",
            description: "Make your celebrations even more special with our premium Happy Birthday Foil Balloon. Perfect for birthday parties, surprises, and decorations. Can be filled with air or helium.",
            bulletPoints: [
                "High quality foil material",
                "Reusable & durable",
                "Bright and colorful print",
                "Easy to inflate (Air/Helium)"
            ]
        },
        {
            id: "b1",
            slug: "red-black-latex-balloons-pack-of-50",
            name: "Red & Black Latex Balloons (Pack of 50)",
            rating: 5,
            reviews: 124,
            price: 199,
            originalPrice: 269,
            discount: "26% OFF",
            image: "nltc_prod_balloon_redblack.png",
            category: "Balloons",
            categorySlug: "balloons",
            occasion: "Birthday",
            material: "Latex",
            color: "Red & Black",
            size: "12 inch",
            sku: "NLTC-BL-1002",
            stockStatus: "In Stock",
            description: "Add a bold and elegant touch to your event decor with premium Red & Black latex balloons. Ideal for theme parties, anniversaries, and birthday setups.",
            bulletPoints: [
                "100% Biodegradable Latex",
                "Vibrant contrast colors",
                "Thick leak-proof material",
                "Suitable for air & helium inflation"
            ]
        },
        {
            id: "b2",
            slug: "pastel-mix-latex-balloons-pack-of-50",
            name: "Pastel Mix Latex Balloons (Pack of 50)",
            rating: 4.5,
            reviews: 98,
            price: 199,
            originalPrice: 249,
            discount: "20% OFF",
            image: "nltc_prod_balloon_pastel.png",
            category: "Balloons",
            categorySlug: "balloons",
            occasion: "Baby Shower",
            material: "Latex",
            color: "Pastel Mix",
            size: "12 inch",
            sku: "NLTC-BL-1003",
            stockStatus: "In Stock",
            description: "Soft aesthetic pastel balloons set for aesthetic birthday celebrations, baby showers, and anniversary arches.",
            bulletPoints: [
                "Soft pastel aesthetic shades",
                "Extra stretchy premium latex",
                "Long lasting air retention",
                "Great for balloon arches & garlands"
            ]
        },
        {
            id: "b3",
            slug: "golden-chrome-balloons-pack-of-50",
            name: "Golden Chrome Balloons (Pack of 50)",
            rating: 5,
            reviews: 87,
            price: 249,
            originalPrice: 349,
            discount: "28% OFF",
            image: "nltc_prod_balloon_goldchrome.png",
            category: "Balloons",
            categorySlug: "balloons",
            occasion: "Anniversary",
            material: "Chrome Latex",
            color: "Metallic Gold",
            size: "12 inch",
            sku: "NLTC-BL-1004",
            stockStatus: "In Stock",
            description: "Super shiny high-gloss metallic gold balloons to give a royal touch to your celebrations and party backdrops.",
            bulletPoints: [
                "Ultra high-gloss metallic sheen",
                "Heavy-weight durable rubber",
                "Helium compatible for floating",
                "Perfect for photo backdrops"
            ]
        },
        {
            id: "b5",
            slug: "number-foil-balloon-1-32-inch",
            name: "Number Foil Balloon (1) (32 inch)",
            rating: 4.5,
            reviews: 64,
            price: 149,
            originalPrice: 199,
            discount: "25% OFF",
            image: "nltc_prod_balloon_num1foil.png",
            category: "Balloons",
            categorySlug: "balloons",
            occasion: "Birthday",
            material: "Foil",
            color: "Golden",
            size: "32 inch",
            sku: "NLTC-BL-1005",
            stockStatus: "In Stock",
            description: "Giant 32 inch golden number foil balloon for 1st birthday milestone celebrations and anniversaries.",
            bulletPoints: [
                "Jumbo 32-inch size",
                "Self-sealing valve mechanism",
                "Refillable & reusable foil",
                "Eye-catching gold finish"
            ]
        },
        {
            id: "b6",
            slug: "heart-foil-balloon-18-inch",
            name: "Heart Foil Balloon (18 inch)",
            rating: 5,
            reviews: 112,
            price: 149,
            originalPrice: 199,
            discount: "25% OFF",
            image: "nltc_prod_balloon_heartfoil.png",
            category: "Balloons",
            categorySlug: "balloons",
            occasion: "Anniversary",
            material: "Foil",
            color: "Red / Pink",
            size: "18 inch",
            sku: "NLTC-BL-1006",
            stockStatus: "In Stock",
            description: "Express your love with gorgeous heart-shaped foil balloons for anniversary surprises and Valentine decorations.",
            bulletPoints: [
                "Romantic heart shape",
                "Metallic metallic shine",
                "Self sealing valve",
                "Helium floating duration 24h+"
            ]
        },
        {
            id: "b7",
            slug: "confetti-balloons-pack-of-10",
            name: "Confetti Balloons (Pack of 10)",
            rating: 4,
            reviews: 73,
            price: 149,
            originalPrice: 199,
            discount: "25% OFF",
            image: "nltc_prod_balloon_confetti.png",
            category: "Balloons",
            categorySlug: "balloons",
            occasion: "Party",
            material: "Clear Latex + Foil",
            color: "Gold Confetti",
            size: "12 inch",
            sku: "NLTC-BL-1007",
            stockStatus: "In Stock",
            description: "Transparent balloons pre-filled with sparkling foil confetti dots for a fun surprise pop moment.",
            bulletPoints: [
                "Pre-filled foil confetti",
                "Crystal clear latex transparency",
                "Great for photo shoots & poppers",
                "Static rub instructions included"
            ]
        },
        {
            id: "b8",
            slug: "rose-gold-chrome-balloons-pack-of-50",
            name: "Rose Gold Chrome Balloons (Pack of 50)",
            rating: 4.5,
            reviews: 91,
            price: 249,
            originalPrice: 349,
            discount: "28% OFF",
            image: "nltc_prod_balloon_rosegoldchrome.png",
            category: "Balloons",
            categorySlug: "balloons",
            occasion: "Birthday",
            material: "Chrome Latex",
            color: "Rose Gold",
            size: "12 inch",
            sku: "NLTC-BL-1008",
            stockStatus: "In Stock",
            description: "Trendy rose gold metallic balloons to elevate your birthday aesthetic and room surprise decorations.",
            bulletPoints: [
                "Chic rose gold metallic color",
                "Thick rubber leak-proof",
                "Helium float ready",
                "Ideal for glam aesthetic decor"
            ]
        },
        // Candles Category
        {
            id: "c1",
            slug: "sparkling-anaar-candle-pack-of-4",
            name: "Sparkling Anaar Candle (Pack of 4)",
            rating: 5,
            reviews: 112,
            price: 180,
            originalPrice: 240,
            discount: "25% OFF",
            image: "nltc_prod_balloon_goldchrome.png",
            category: "Candles",
            categorySlug: "candles",
            occasion: "Birthday",
            material: "Sparkler Wax",
            color: "Gold & Silver",
            size: "15 cm",
            sku: "NLTC-CD-2001",
            stockStatus: "In Stock",
            description: "Light up the birthday cake cutting moment with sparkling cold-pyro fountain candles.",
            bulletPoints: [
                "Smokeless cold sparkler burn",
                "Safe for indoor cake cutting",
                "30-45 seconds sparkling duration",
                "Spike bottom for easy cake placement"
            ]
        },
        {
            id: "c2",
            slug: "number-birthday-candles-0-9",
            name: "Number Birthday Candles (0-9)",
            rating: 4.5,
            reviews: 74,
            price: 79,
            originalPrice: 99,
            discount: "20% OFF",
            image: "nltc_prod_balloon_num1foil.png",
            category: "Candles",
            categorySlug: "candles",
            occasion: "Birthday",
            material: "Eco Wax",
            color: "Golden Metallic",
            size: "7 cm",
            sku: "NLTC-CD-2002",
            stockStatus: "In Stock",
            description: "Elegant golden metallic number candles available from digits 0 to 9.",
            bulletPoints: [
                "Eco-friendly paraffin wax",
                "Slow steady burn",
                "Glossy golden metallic coating",
                "Sturdy plastic toothpicks"
            ]
        },
        // Birthday Caps Category
        {
            id: "h1",
            slug: "glitter-birthday-king-queen-crowns-pack-of-2",
            name: "Glitter Birthday King & Queen Crowns (Pack of 2)",
            rating: 5,
            reviews: 59,
            price: 199,
            originalPrice: 249,
            discount: "20% OFF",
            image: "nltc_prod_balloon_goldchrome.png",
            category: "Birthday Caps",
            categorySlug: "birthday-caps",
            occasion: "Birthday",
            material: "Paperboard + Glitter",
            color: "Gold & Silver",
            size: "Adjustable",
            sku: "NLTC-CP-3001",
            stockStatus: "In Stock",
            description: "Sparkling glitter crowns for the birthday prince/king and princess/queen to wear on their special day.",
            bulletPoints: [
                "Non-shedding glitter finish",
                "Soft elastic comfortable headband",
                "Fits children & adults",
                "Reusable party accessory"
            ]
        },
        // Party Poppers Category
        {
            id: "p1",
            slug: "large-confetti-party-popper-40-cm",
            name: "Large Confetti Party Popper (40 cm)",
            rating: 4.9,
            reviews: 142,
            price: 149,
            originalPrice: 199,
            discount: "25% OFF",
            image: "nltc_prod_balloon_confetti.png",
            category: "Party Poppers",
            categorySlug: "party-poppers",
            occasion: "Celebration",
            material: "Metallic Foil & Air Cannon",
            color: "Multicolor",
            size: "40 cm",
            sku: "NLTC-PP-4001",
            stockStatus: "In Stock",
            description: "Celebrate grand moments with a blast of colorful foil streamer confetti popping up into the air.",
            bulletPoints: [
                "Spring air pressure operated (No gunpowder)",
                "Safe indoor & outdoor use",
                "Loud pop celebration sound",
                "Shining metallic streamer foil"
            ]
        },
        // Sashes Category
        {
            id: "s1",
            slug: "birthday-girl-satin-sash-glitter-pink",
            name: "Birthday Girl Satin Sash (Glitter Pink)",
            rating: 5,
            reviews: 188,
            price: 149,
            originalPrice: 199,
            discount: "25% OFF",
            image: "nltc_prod_balloon_heartfoil.png",
            category: "Sashes",
            categorySlug: "sashes",
            occasion: "Birthday",
            material: "Premium Satin",
            color: "Glitter Pink",
            size: "Free Size (160 cm)",
            sku: "NLTC-SH-5001",
            stockStatus: "In Stock",
            description: "Soft pink satin sash with glittering 'Birthday Girl' foil lettering for the star of the party.",
            bulletPoints: [
                "Silky smooth double-layer satin",
                "Foil glitter lettering won't rub off",
                "Includes safety pin for fit",
                "Comfortable all-day wear"
            ]
        },
        // Banners Category
        {
            id: "ba1",
            slug: "gold-foil-happy-birthday-banner",
            name: "Gold Foil Happy Birthday Banner (Alphabet Letters)",
            rating: 4.9,
            reviews: 201,
            price: 199,
            originalPrice: 299,
            discount: "33% OFF",
            image: "nltc_prod_balloon_goldchrome.png",
            category: "Banners",
            categorySlug: "banners",
            occasion: "Birthday",
            material: "Foil & Cardstock",
            color: "Gold Metallic",
            size: "2.5 Meters",
            sku: "NLTC-BN-6001",
            stockStatus: "In Stock",
            description: "Classic gold metallic letter banner spelling 'HAPPY BIRTHDAY' to hang across walls or decor curtains.",
            bulletPoints: [
                "Large bold metallic letters",
                "Includes hanging ribbon thread",
                "Pre-punched holes for easy setup",
                "Durable reusable cardstock"
            ]
        },
        // Cake Toppers Category
        {
            id: "to1",
            slug: "happy-birthday-gold-acrylic-cake-topper",
            name: "Happy Birthday Gold Acrylic Cake Topper",
            rating: 4.9,
            reviews: 201,
            price: 149,
            originalPrice: 199,
            discount: "25% OFF",
            image: "cardtoppers.png",
            category: "Cake Toppers",
            categorySlug: "toppers",
            occasion: "Birthday",
            material: "Food Safe Acrylic",
            color: "Mirror Gold",
            size: "15 x 12 cm",
            sku: "NLTC-TP-7001",
            stockStatus: "In Stock",
            description: "Mirror shiny gold acrylic calligraphic topper to make your birthday cake look professional and luxurious.",
            bulletPoints: [
                "Food-grade washable acrylic",
                "High gloss mirror finish",
                "Protective film on surface",
                "Reusable for multiple cakes"
            ]
        },
        // Cake Dolls Best Sellers
        {
            id: "bd1",
            slug: "princess-barbie-cake-doll-pink-gown",
            name: "Princess Barbie Cake Doll (Pink Gown)",
            rating: 4.8,
            reviews: 93,
            price: 249,
            originalPrice: 349,
            discount: "28% OFF",
            image: "cardtoppers.png",
            category: "Cake Dolls",
            categorySlug: "cake-dolls",
            occasion: "Birthday",
            material: "Plastic & Fabric",
            color: "Pink",
            size: "18 cm",
            sku: "NLTC-DL-8001",
            stockStatus: "In Stock",
            description: "Beautiful princess cake topper doll to create a dreamy doll cake for girls' birthday parties.",
            bulletPoints: [
                "Detailed painted features",
                "Food safe bottom stake",
                "Detachable gown skirt",
                "Reusable toy doll"
            ]
        },
        // 3D Butterfly
        {
            id: "bf1",
            slug: "hollow-metallic-3d-butterflies-gold-pack-of-12",
            name: "Hollow Metallic 3D Butterflies (Gold, Pack of 12)",
            rating: 4.9,
            reviews: 104,
            price: 149,
            originalPrice: 199,
            discount: "25% OFF",
            image: "nltc_prod_balloon_goldchrome.png",
            category: "Decorations",
            categorySlug: "3d-butterfly",
            occasion: "Theme Party",
            material: "Metallic Paper",
            color: "Gold",
            size: "Assorted (8, 10, 12 cm)",
            sku: "NLTC-BF-9001",
            stockStatus: "In Stock",
            description: "3D hollow metallic golden butterflies for wall backdrops, balloon arches, and cake decorations.",
            bulletPoints: [
                "Laser cut hollow pattern",
                "Includes double-sided glue dots",
                "Easy fold 3D wing effect",
                "Reflective metallic luster"
            ]
        }
    ];

    // Build lookup indexes
    const productLookup = {};

    function processProduct(p) {
        // Ensure defaults
        const id = String(p.id);
        const numericId = p.numericId || id;
        const slug = p.slug || createSlug(p.name, id);
        const price = Number(p.price) || 149;
        const originalPrice = Number(p.originalPrice) || Math.round(price * 1.33);
        const discount = p.discount || `${Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF`;
        const category = p.category || "Balloons";
        const categorySlug = p.categorySlug || (category.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
        const images = p.images && p.images.length ? p.images : getGalleryForImage(p.image);

        const normalized = {
            id: id,
            numericId: String(numericId),
            slug: slug,
            name: p.name || "Happy Birthday Party Decoration Item",
            rating: Number(p.rating) || 4.8,
            reviews: Number(p.reviews) || 150,
            price: price,
            originalPrice: originalPrice,
            discount: discount,
            image: p.image || images[0],
            images: images,
            category: category,
            categorySlug: categorySlug,
            occasion: p.occasion || "Birthday",
            material: p.material || "Foil",
            color: p.color || "Multi Color",
            size: p.size || "Standard",
            sku: p.sku || `NLTC-${categorySlug.slice(0, 2).toUpperCase()}-${id.toUpperCase()}`,
            stockStatus: p.stockStatus || "In Stock",
            description: p.description || "Make your celebrations even more special with our premium decoration products. Perfect for birthday parties, surprises, and events.",
            bulletPoints: p.bulletPoints || [
                "High quality material",
                "Reusable & durable",
                "Vibrant print & color",
                "Easy setup & inflation"
            ],
            specificationsTable: p.specificationsTable || {
                "Brand": "New Lines Trading Company (NLTC)",
                "Category": category,
                "Occasion": p.occasion || "Birthday",
                "Material": p.material || "Foil",
                "Color": p.color || "Multi Color",
                "Size / Dimensions": p.size || "Standard",
                "Package Contains": "1 Set / Pack of items",
                "Country of Origin": "India"
            },
            shippingInfo: "Ships within 24 hours. Estimated delivery time 2-4 business days. Easy 7-day returns if damaged or defective.",
            reviewsList: [
                {
                    name: "Rahul Sharma",
                    rating: 5,
                    date: "May 10, 2026",
                    comment: "Super quality product! The colors are vibrant and setup was very easy. Highly recommended for party decor."
                },
                {
                    name: "Priya Patel",
                    rating: 5,
                    date: "April 28, 2026",
                    comment: "Exactly as shown in the picture. Quick delivery and sturdy packaging by NLTC!"
                },
                {
                    name: "Ankit Verma",
                    rating: 4,
                    date: "April 15, 2026",
                    comment: "Good quality for the price. Made our celebration look great!"
                }
            ]
        };

        productLookup[id] = normalized;
        productLookup[numericId] = normalized;
        productLookup[slug] = normalized;
        productLookup[id.toLowerCase()] = normalized;

        return normalized;
    }

    // Populate initial raw products
    const allProducts = rawProducts.map(processProduct);

    // Also import dynamic products if productsData, bestsellersProducts, or occasionsProducts exist globally
    function importExternalProducts() {
        if (typeof window !== "undefined") {
            if (window.productsData) {
                Object.keys(window.productsData).forEach(catKey => {
                    window.productsData[catKey].forEach(p => {
                        if (!productLookup[p.id]) {
                            p.categorySlug = catKey;
                            p.category = catKey.charAt(0).toUpperCase() + catKey.slice(1).replace('-', ' ');
                            allProducts.push(processProduct(p));
                        }
                    });
                });
            }
            if (window.bestsellersProducts) {
                Object.keys(window.bestsellersProducts).forEach(catKey => {
                    window.bestsellersProducts[catKey].forEach(p => {
                        if (!productLookup[p.id]) {
                            p.categorySlug = catKey;
                            p.category = catKey.charAt(0).toUpperCase() + catKey.slice(1).replace('-', ' ');
                            allProducts.push(processProduct(p));
                        }
                    });
                });
            }
            if (window.occasionsProducts) {
                Object.keys(window.occasionsProducts).forEach(catKey => {
                    window.occasionsProducts[catKey].forEach(p => {
                        if (!productLookup[p.id]) {
                            p.categorySlug = catKey;
                            p.category = catKey.charAt(0).toUpperCase() + catKey.slice(1).replace('-', ' ');
                            allProducts.push(processProduct(p));
                        }
                    });
                });
            }
        }
    }

    // Lookup functions
    function getProductByIdOrSlug(idOrSlug) {
        importExternalProducts();
        if (!idOrSlug) return productLookup["b4"];

        const key = String(idOrSlug).trim().toLowerCase();
        if (productLookup[key]) return productLookup[key];

        // Search by partial match or ID
        const match = allProducts.find(p => p.id.toLowerCase() === key || p.slug.toLowerCase() === key || p.numericId === key);
        if (match) return match;

        // Fallback default product (Happy Birthday Foil Balloon)
        return productLookup["b4"];
    }

    function getRelatedProducts(categorySlug, currentId, limit = 4) {
        importExternalProducts();
        let matches = allProducts.filter(p => p.id !== currentId && p.categorySlug === categorySlug);
        if (matches.length < limit) {
            const extra = allProducts.filter(p => p.id !== currentId && !matches.includes(p));
            matches = matches.concat(extra);
        }
        return matches.slice(0, limit);
    }

    // Export globally
    if (typeof window !== "undefined") {
        window.NLTCProductDB = {
            allProducts: allProducts,
            getProductByIdOrSlug: getProductByIdOrSlug,
            getRelatedProducts: getRelatedProducts,
            processProduct: processProduct
        };
    }
})();
