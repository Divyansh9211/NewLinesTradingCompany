/**
 * NLTC Dedicated Best Sellers Listing Page JS
 * Dynamically handles loading products and configuration for each Best Seller page
 */

// Best Sellers Configurations
const bestsellersData = {
    "sparkling-candles": {
        title: "Sparkling Candles",
        emoji: "✨",
        description: "Add a touch of magic to your cakes with our sparkling and glittering celebration candles.",
        bannerBg: "nltc_banner_candles_bg.png",
        bannerTitle: "Make Every Moment Glow",
        bannerSubtitle: "with Premium Sparkle Candles",
        bannerBadges: [
            { text: "Smokeless Burn", icon: "fa-wind" },
            { text: "Bright Sparkle", icon: "fa-sun" },
            { text: "Eco-Friendly Wax", icon: "fa-leaf" },
            { text: "Premium Quality", icon: "fa-award" }
        ],
        exploreTypes: ["Classic Sparklers", "Color Sparklers", "Lotus Sparklers", "Gold Sparklers", "Silver Sparklers", "More Collections"]
    },
    "metallic-balloons": {
        title: "Metallic Balloons",
        emoji: "🎈",
        description: "Add a glossy, shiny, and luxurious texture to your event decorations with chrome balloons.",
        bannerBg: "nltc_banner_balloons_bg.png",
        bannerTitle: "Shiny & Premium Look",
        bannerSubtitle: "with Metallic Chrome Balloons",
        bannerBadges: [
            { text: "Metallic Finish", icon: "fa-gem" },
            { text: "Thick Latex", icon: "fa-shield-halved" },
            { text: "Helium Ready", icon: "fa-wind" },
            { text: "Long Lasting", icon: "fa-clock" }
        ],
        exploreTypes: ["Gold Metallic", "Silver Metallic", "Rose Gold Metallic", "Red Metallic", "Black Metallic", "More Collections"]
    },
    "cake-dolls": {
        title: "Cake Dolls",
        emoji: "👧",
        description: "Turn your birthday cake into a fairy tale princess cake with our beautiful cake dolls.",
        bannerBg: "nltc_banner_festive_bg.png",
        bannerTitle: "Fairy Tale Birthday Cakes",
        bannerSubtitle: "with Adorable Princess Cake Dolls",
        bannerBadges: [
            { text: "Princess Themes", icon: "fa-crown" },
            { text: "Food Safe Stand", icon: "fa-utensils" },
            { text: "Detailed Painting", icon: "fa-palette" },
            { text: "Reusable Dolls", icon: "fa-rotate" }
        ],
        exploreTypes: ["Princess Dolls", "Barbie Dolls", "Fairy Dolls", "Glitter Dolls", "Doll Combos", "More Collections"]
    },
    "golden-no-candles": {
        title: "Golden Number Candles",
        emoji: "🕯️",
        description: "Classy gold metallic number candles from 0 to 9 to show the milestone age clearly.",
        bannerBg: "nltc_banner_candles_bg.png",
        bannerTitle: "Celebrate Every Milestone",
        bannerSubtitle: "with Golden Number Candles",
        bannerBadges: [
            { text: "Classy Gold Foil", icon: "fa-gem" },
            { text: "Slow Burning", icon: "fa-clock" },
            { text: "Food Grade Stand", icon: "fa-shield" },
            { text: "Numbers 0 to 9", icon: "fa-list-ol" }
        ],
        exploreTypes: ["Number 0 to 3", "Number 4 to 6", "Number 7 to 9", "Double Digit Sets", "Glitter Gold", "More Collections"]
    },
    "balloon-pump": {
        title: "Balloon Pump",
        emoji: "💨",
        description: "Save your time and energy with our double action manual and electrical balloon pumps.",
        bannerBg: "nltc_banner_festive_bg.png",
        bannerTitle: "Fast & Effortless Setups",
        bannerSubtitle: "with Fast Action Balloon Pumps",
        bannerBadges: [
            { text: "Double Action", icon: "fa-bolt" },
            { text: "Ergonomic Grip", icon: "fa-hand" },
            { text: "Durable Plastic", icon: "fa-shield" },
            { text: "Compact Size", icon: "fa-minimize" }
        ],
        exploreTypes: ["Hand Pumps", "Electric Pumps", "Arch Adapters", "Dual Nozzle Pumps", "Setup Tools", "More Collections"]
    },
    "3d-butterfly": {
        title: "3D Butterfly",
        emoji: "🦋",
        description: "Add a beautiful floating butterfly effect to your walls, balloons, or backdrops.",
        bannerBg: "nltc_banner_festive_bg.png",
        bannerTitle: "Add Elegant Flutter",
        bannerSubtitle: "with Metallic 3D Butterflies",
        bannerBadges: [
            { text: "Metallic Colors", icon: "fa-palette" },
            { text: "Double Sided Tape", icon: "fa-circle-check" },
            { text: "Hollow Designs", icon: "fa-shapes" },
            { text: "3 Sizes in Pack", icon: "fa-up-right-and-down-left-from-center" }
        ],
        exploreTypes: ["Gold Butterflies", "Silver Butterflies", "Rose Gold", "Glitter Butterflies", "Hollow Out Paper", "More Collections"]
    },
    "snow-spray": {
        title: "Snow Spray",
        emoji: "❄️",
        description: "Celebrate the cake cutting moment with a magical shower of soft artificial snow spray.",
        bannerBg: "nltc_banner_festive_bg.png",
        bannerTitle: "Let It Snow Indoors",
        bannerSubtitle: "with Celebration Snow & Foam Sprays",
        bannerBadges: [
            { text: "High Foam Volume", icon: "fa-cloud" },
            { text: "Non-Toxic Spray", icon: "fa-shield" },
            { text: "Leaves No Residue", icon: "fa-sparkles" },
            { text: "Easy Spray Button", icon: "fa-hand-pointer" }
        ],
        exploreTypes: ["Snow Spray", "String Spray", "Foam Spray", "Confetti Spray", "Pack of 2", "More Collections"]
    },
    "crazy-ribbon": {
        title: "Crazy Ribbon",
        emoji: "🎗️",
        description: "Hanging and twisty crazy ribbons to add color and movement to ceiling decorations.",
        bannerBg: "nltc_banner_festive_bg.png",
        bannerTitle: "A Fun & Twisty Accent",
        bannerSubtitle: "with Hanging Crazy Ribbons",
        bannerBadges: [
            { text: "Shining Metallic", icon: "fa-gem" },
            { text: "Pre-Curled Strands", icon: "fa-rotate" },
            { text: "Easy Hanging", icon: "fa-arrow-down" },
            { text: "Rainbow Packs", icon: "fa-palette" }
        ],
        exploreTypes: ["Metallic Ribbons", "Paper Streamers", "Curling Ribbons", "Ribbon Strings", "Rainbow Packs", "More Collections"]
    },
    "party-poppers": {
        title: "Party Poppers Bestsellers",
        emoji: "🎉",
        description: "Top-selling safety party poppers with shining metallic foil flakes and rose petals.",
        bannerBg: "nltc_banner_festive_bg.png",
        bannerTitle: "Burst with Joy & Excitement",
        bannerSubtitle: "with Safe Confetti Party Poppers",
        bannerBadges: [
            { text: "High Pressure Pop", icon: "fa-bolt" },
            { text: "Eco Confetti", icon: "fa-leaf" },
            { text: "Metallic Streamers", icon: "fa-star" },
            { text: "Comfortable Pull", icon: "fa-hand" }
        ],
        exploreTypes: ["Confetti Poppers", "Rose Petal Poppers", "Metallic Poppers", "Mini Poppers", "Popper Packs", "More Collections"]
    },
    "birthday-caps": {
        title: "Birthday Caps Bestsellers",
        emoji: "🥳",
        description: "Classy crowns, glitter cone hats, and LED birthday caps to crown the special guest.",
        bannerBg: "nltc_banner_festive_bg.png",
        bannerTitle: "Crown the Guest of Honor",
        bannerSubtitle: "with Stylish Birthday Party Caps",
        bannerBadges: [
            { text: "Elastic Strap", icon: "fa-gear" },
            { text: "Glitter Border", icon: "fa-wand-magic-sparkles" },
            { text: "Sturdy Paperboard", icon: "fa-scroll" },
            { text: "Comfortable Fit", icon: "fa-circle-check" }
        ],
        exploreTypes: ["Glitter Cone Caps", "Foil Paper Crowns", "LED Crowns", "Theme Hats", "Kids Caps", "More Collections"]
    },
    "theme-cake-toppers": {
        title: "Theme Cake Toppers",
        emoji: "🎂",
        description: "Top your cake in style with our gold, acrylic, and glitter themed script toppers.",
        bannerBg: "nltc_banner_candles_bg.png",
        bannerTitle: "Top Your Cakes in Style",
        bannerSubtitle: "with Gold & Acrylic Theme Toppers",
        bannerBadges: [
            { text: "Polished Acrylic", icon: "fa-gem" },
            { text: "Shiny Glitter Paper", icon: "fa-sparkles" },
            { text: "Auspicious Designs", icon: "fa-heart" },
            { text: "Food Grade Stands", icon: "fa-circle-check" }
        ],
        exploreTypes: ["Happy Birthday Toppers", "Anniversary Toppers", "Custom Script", "Gold Acrylic", "Glitter Toppers", "More Collections"]
    },
    "many-more": {
        title: "Many More Best Sellers",
        emoji: "🎁",
        description: "Explore other trending decor products, glue dots, balloon arch tapes, and more.",
        bannerBg: "nltc_banner_festive_bg.png",
        bannerTitle: "Explore More Favorites",
        bannerSubtitle: "from Our Best Seller Collection",
        bannerBadges: [
            { text: "Huge Catalog", icon: "fa-list" },
            { text: "Glue Dots & Tapes", icon: "fa-circle" },
            { text: "Fringe Backdrops", icon: "fa-border-all" },
            { text: "Best Sellers", icon: "fa-fire" }
        ],
        exploreTypes: ["Fringe Curtains", "Glue Dots & Tapes", "LED Fairy Lights", "Faux Cake Balls", "Confetti Streamers", "More Collections"]
    }
};

// Best Sellers Products Dataset
const bestsellersProducts = {
    "sparkling-candles": [
        { id: "bs1", name: "Sparkling Anaar Candle (Pack of 4)", rating: 5, reviews: 112, price: 180, image: "nltc_prod_balloon_goldchrome.png", popularRank: 1 },
        { id: "bs2", name: "Musical Rotating Lotus Candle (Pink)", rating: 4.7, reviews: 93, price: 299, image: "nltc_prod_balloon_smiley.png", popularRank: 2 },
        { id: "bs3", name: "Sparkling Birthday Fountain Candle (Pack of 2)", rating: 4.6, reviews: 54, price: 120, image: "cardcandles.png", popularRank: 3 },
        { id: "bs4", name: "Metallic Gold Slim Sparkler Candles (Pack of 12)", rating: 4.5, reviews: 38, price: 99, image: "nltc_prod_balloon_goldchrome.png", popularRank: 4 },
        { id: "bs5", name: "Neon Color Flame Birthday Candles", rating: 4.4, reviews: 29, price: 149, image: "nltc_prod_balloon_pastel.png", popularRank: 5 },
        { id: "bs6", name: "Magic Relighting Birthday Candles", rating: 4.2, reviews: 48, price: 99, image: "nltc_prod_balloon_hbfoil.png", popularRank: 6 }
    ],
    "metallic-balloons": [
        { id: "bm1", name: "Golden Metallic Chrome Balloons (Pack of 50)", rating: 5, reviews: 87, price: 249, image: "nltc_prod_balloon_goldchrome.png", popularRank: 1 },
        { id: "bm2", name: "Rose Gold Chrome Balloons (Pack of 50)", rating: 4.8, reviews: 91, price: 249, image: "nltc_prod_balloon_rosegoldchrome.png", popularRank: 2 },
        { id: "bm3", name: "Silver Metallic Chrome Balloons (Pack of 50)", rating: 4.7, reviews: 63, price: 249, image: "nltc_prod_balloon_starfoil.png", popularRank: 3 },
        { id: "bm4", name: "Blue & Silver Metallic Balloon Bunch (Pack of 30)", rating: 4.6, reviews: 52, price: 199, image: "nltc_prod_balloon_pastel.png", popularRank: 4 },
        { id: "bm5", name: "Pink Metallic Chrome Latex Balloons (Pack of 50)", rating: 4.5, reviews: 38, price: 249, image: "nltc_prod_balloon_heartfoil.png", popularRank: 5 },
        { id: "bm6", name: "Green Metallic Chrome Latex Balloons (Pack of 50)", rating: 4.4, reviews: 29, price: 249, image: "nltc_prod_balloon_redblack.png", popularRank: 6 }
    ],
    "cake-dolls": [
        { id: "bd1", name: "Princess Barbie Cake Doll (Pink Gown)", rating: 4.8, reviews: 93, price: 249, image: "cardtoppers.png", popularRank: 1 },
        { id: "bd2", name: "Cinderella Princess Cake Doll Decor", rating: 4.6, reviews: 52, price: 249, image: "cardtoppers.png", popularRank: 2 },
        { id: "bd3", name: "Fairy Girl Theme Cake Topper Doll", rating: 4.5, reviews: 38, price: 199, image: "cardtoppers.png", popularRank: 3 },
        { id: "bd4", name: "Royal King & Queen Mini Doll Sets (Pack of 2)", rating: 4.7, reviews: 41, price: 299, image: "cardtoppers.png", popularRank: 4 },
        { id: "bd5", name: "Cute Angel Wings Doll Cake Decoration", rating: 4.4, reviews: 28, price: 149, image: "cardtoppers.png", popularRank: 5 },
        { id: "bd6", name: "Happy Birthday Doll Dress Foil Balloon bunch", rating: 4.3, reviews: 21, price: 199, image: "nltc_prod_balloon_starfoil.png", popularRank: 6 }
    ],
    "golden-no-candles": [
        { id: "bg1", name: "Number Birthday Candles Golden (0-9)", rating: 4.9, reviews: 74, price: 79, image: "nltc_prod_balloon_num1foil.png", popularRank: 1 },
        { id: "bg2", name: "Glitter Golden Number Candle Set (Double Digit)", rating: 4.7, reviews: 63, price: 149, image: "nltc_prod_balloon_num1foil.png", popularRank: 2 },
        { id: "bg3", name: "Gold Foil Crown Number Candle (Milestone 1)", rating: 4.8, reviews: 52, price: 99, image: "nltc_prod_balloon_num1foil.png", popularRank: 3 },
        { id: "bg4", name: "Classic Golden Number Candle (3)", rating: 4.5, reviews: 38, price: 79, image: "nltc_prod_balloon_num1foil.png", popularRank: 4 },
        { id: "bg5", name: "Classic Golden Number Candle (5)", rating: 4.4, reviews: 29, price: 79, image: "nltc_prod_balloon_num1foil.png", popularRank: 5 },
        { id: "bg6", name: "Classic Golden Number Candle (0)", rating: 4.3, reviews: 21, price: 79, image: "nltc_prod_balloon_num1foil.png", popularRank: 6 }
    ],
    "balloon-pump": [
        { id: "bp1", name: "Double Action Balloon Hand Pump (Fast Air)", rating: 4.8, reviews: 88, price: 129, image: "cardpoppers.png", popularRank: 1 },
        { id: "bp2", name: "Dual Nozzle Electric Balloon Pump (Portable)", rating: 4.9, reviews: 124, price: 999, image: "cardpoppers.png", popularRank: 2 },
        { id: "bp3", name: "Heavy Duty Plastic Balloon Pump (Blue)", rating: 4.5, reviews: 48, price: 119, image: "cardpoppers.png", popularRank: 3 },
        { id: "bp4", name: "Fast Balloon Arch Setup Ring Clamps (Pack of 50)", rating: 4.6, reviews: 52, price: 199, image: "nltc_prod_balloon_goldchrome.png", popularRank: 4 },
        { id: "bp5", name: "Double Air Pump Adaptor Nozzles (Pack of 4)", rating: 4.3, reviews: 21, price: 79, image: "cardpoppers.png", popularRank: 5 },
        { id: "bp6", name: "Balloon Garland strip & knotter clip combo", rating: 4.7, reviews: 76, price: 149, image: "nltc_prod_balloon_confetti.png", popularRank: 6 }
    ],
    "3d-butterfly": [
        { id: "bf1", name: "Hollow Metallic 3D Butterflies (Gold, Pack of 12)", rating: 4.9, reviews: 104, price: 149, image: "nltc_prod_balloon_goldchrome.png", popularRank: 1 },
        { id: "bf2", name: "Hollow Metallic 3D Butterflies (Silver, Pack of 12)", rating: 4.7, reviews: 83, price: 149, image: "nltc_prod_balloon_starfoil.png", popularRank: 2 },
        { id: "bf3", name: "Rose Gold 3D Butterfly Wall Stickers (Pack of 12)", rating: 4.8, reviews: 91, price: 149, image: "nltc_prod_balloon_rosegoldchrome.png", popularRank: 3 },
        { id: "bf4", name: "Glitter 3D Paper Butterfly Backdrops (Pack of 24)", rating: 4.5, reviews: 54, price: 199, image: "cardtoppers.png", popularRank: 4 },
        { id: "bf5", name: "Colorful 3D Butterflies Wall Decor Set", rating: 4.4, reviews: 29, price: 129, image: "nltc_prod_balloon_pastel.png", popularRank: 5 },
        { id: "bf6", name: "Giant Foil Butterfly Shape Helium Balloon", rating: 4.6, reviews: 38, price: 189, image: "nltc_prod_balloon_starfoil.png", popularRank: 6 }
    ],
    "snow-spray": [
        { id: "by1", name: "Snow Spray & Party String Spray (Pack of 2)", rating: 4.4, reviews: 67, price: 119, image: "nltc_prod_balloon_pastel.png", popularRank: 1 },
        { id: "by2", name: "Magic Snow Spray Foam Can (250 ml)", rating: 4.5, reviews: 88, price: 59, image: "nltc_prod_balloon_pastel.png", popularRank: 2 },
        { id: "by3", name: "Multicolor Silly String Party Spray Can", rating: 4.3, reviews: 31, price: 69, image: "nltc_prod_balloon_hbfoil.png", popularRank: 3 },
        { id: "by4", name: "Celebration Foam Spray Combo Pack (4 Cans)", rating: 4.6, reviews: 52, price: 219, image: "nltc_prod_balloon_pastel.png", popularRank: 4 },
        { id: "by5", name: "Scented Snow Spray Party Can (Pack of 2)", rating: 4.2, reviews: 21, price: 129, image: "nltc_prod_balloon_smiley.png", popularRank: 5 },
        { id: "by6", name: "Premium Metallic Streamer Spray Can", rating: 4.1, reviews: 18, price: 89, image: "nltc_prod_balloon_goldchrome.png", popularRank: 6 }
    ],
    "crazy-ribbon": [
        { id: "br1", name: "Shining Metallic Curling Ribbon (Gold, 100 Yards)", rating: 4.9, reviews: 97, price: 149, image: "nltc_prod_balloon_goldchrome.png", popularRank: 1 },
        { id: "br2", name: "Pre-Curled Metallic hanging Streamers (Pack of 6)", rating: 4.7, reviews: 74, price: 129, image: "banner.png", popularRank: 2 },
        { id: "br3", name: "Rainbow Paper Streamer Ribbon (Roll of 4)", rating: 4.5, reviews: 49, price: 99, image: "banner.png", popularRank: 3 },
        { id: "br4", name: "Silver Curling Ribbon String Roll (100 Yards)", rating: 4.8, reviews: 63, price: 149, image: "nltc_prod_balloon_starfoil.png", popularRank: 4 },
        { id: "br5", name: "Red Heart Print Hanging Satin Ribbon (20 Meters)", rating: 4.6, reviews: 38, price: 179, image: "nltc_prod_balloon_heartfoil.png", popularRank: 5 },
        { id: "br6", name: "Black & Gold Crazy Hanging Spiral Ribbons (Pack of 12)", rating: 4.4, reviews: 29, price: 199, image: "nltc_prod_balloon_redblack.png", popularRank: 6 }
    ],
    "party-poppers": [
        { id: "bp_s1", name: "Large Confetti Party Popper (40 cm)", rating: 4.9, reviews: 142, price: 149, image: "nltc_prod_balloon_confetti.png", popularRank: 1 },
        { id: "bp_s2", name: "Rose Petals Celebration Popper (30 cm)", rating: 4.8, reviews: 104, price: 169, image: "nltc_prod_balloon_heartfoil.png", popularRank: 2 },
        { id: "bp_s3", name: "Golden Foil Streamer Popper (Pack of 2)", rating: 4.7, reviews: 76, price: 199, image: "nltc_prod_balloon_goldchrome.png", popularRank: 3 },
        { id: "bp_s4", name: "Mini Desktop Party Poppers (Pack of 6)", rating: 4.4, reviews: 31, price: 129, image: "nltc_prod_balloon_redblack.png", popularRank: 4 },
        { id: "bp_s5", name: "Multicolor Paper Confetti Popper (Pack of 4)", rating: 4.6, reviews: 92, price: 249, image: "nltc_prod_balloon_pastel.png", popularRank: 5 },
        { id: "bp_s6", name: "Champagne Bottle Shape Confetti Popper", rating: 4.5, reviews: 58, price: 299, image: "nltc_prod_balloon_hbfoil.png", popularRank: 6 }
    ],
    "birthday-caps": [
        { id: "bc_s1", name: "Glitter Birthday King & Queen Crowns (Pack of 2)", rating: 5, reviews: 59, price: 199, image: "nltc_prod_balloon_goldchrome.png", popularRank: 1 },
        { id: "bc_s2", name: "Polka Dot Birthday Party Hats (Pack of 10)", rating: 4.5, reviews: 83, price: 149, image: "nltc_prod_balloon_pastel.png", popularRank: 2 },
        { id: "bc_s3", name: "Golden Metallic Cone Hats (Pack of 8)", rating: 4.7, reviews: 42, price: 179, image: "nltc_prod_balloon_goldchrome.png", popularRank: 3 },
        { id: "bc_s4", name: "Foil Fringe Party Crowns (Pack of 6)", rating: 4.3, reviews: 29, price: 120, image: "nltc_prod_balloon_starfoil.png", popularRank: 4 },
        { id: "bc_s5", name: "Cartoon Theme Birthday Caps (Pack of 10)", rating: 4.6, reviews: 67, price: 159, image: "nltc_prod_balloon_smiley.png", popularRank: 5 },
        { id: "bc_s6", name: "LED Light Up Birthday Crown", rating: 4.8, reviews: 54, price: 249, image: "nltc_prod_balloon_num1foil.png", popularRank: 6 }
    ],
    "theme-cake-toppers": [
        { id: "bt_s1", name: "Happy Birthday Gold Acrylic Cake Topper", rating: 4.9, reviews: 201, price: 149, image: "cardtoppers.png", popularRank: 1 },
        { id: "bt_s2", name: "Love Anniversary Silver Acrylic Topper", rating: 4.8, reviews: 88, price: 149, image: "nltc_prod_balloon_heartfoil.png", popularRank: 2 },
        { id: "bt_s3", name: "Glitter Number 1 Cake Topper (Gold)", rating: 4.7, reviews: 63, price: 99, image: "nltc_prod_balloon_num1foil.png", popularRank: 3 },
        { id: "bt_s4", name: "Baby Shower Pastel Theme Cake Toppers", rating: 4.6, reviews: 74, price: 129, image: "nltc_prod_balloon_pastel.png", popularRank: 4 },
        { id: "bt_s5", name: "Cake Doll Princess Theme Decor topper", rating: 4.8, reviews: 52, price: 249, image: "cardtoppers.png", popularRank: 5 },
        { id: "bt_s6", name: "Multicolor Balloon Cloud Cake Topper Mini", rating: 4.5, reviews: 97, price: 119, image: "nltc_prod_balloon_hbfoil.png", popularRank: 6 }
    ],
    "many-more": [
        { id: "bm_s1", name: "Gold Foil Fringe Metallic Curtains (Pack of 2)", rating: 4.8, reviews: 204, price: 199, image: "banner.png", popularRank: 1 },
        { id: "bm_s2", name: "Faux Decorative Cake Balls (Pack of 20)", rating: 4.6, reviews: 79, price: 149, image: "cardtoppers.png", popularRank: 2 },
        { id: "bm_s3", name: "Fairy Lights LED String Lights (Warm White, 20Ft)", rating: 4.9, reviews: 124, price: 149, image: "nltc_prod_balloon_goldchrome.png", popularRank: 3 },
        { id: "bm_s4", name: "Balloon Glue Dots & Arch Strip Tape Set", rating: 4.7, reviews: 156, price: 99, image: "nltc_prod_balloon_confetti.png", popularRank: 4 },
        { id: "bm_s5", name: "Double Action Balloon Hand Pump (Fast Air)", rating: 4.5, reviews: 88, price: 129, image: "cardpoppers.png", popularRank: 5 },
        { id: "bm_s6", name: "Snow Spray & Party String Spray (Pack of 2)", rating: 4.4, reviews: 67, price: 119, image: "nltc_prod_balloon_pastel.png", popularRank: 6 }
    ]
};

// Main DOM Content Loader
document.addEventListener("DOMContentLoaded", () => {
    // 1. Get Bestseller Name from filename
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1);
    let bestseller = filename.replace('.html', '').toLowerCase().trim();

    // Validation & Fallback
    if (!bestseller || !bestsellersData[bestseller]) {
        bestseller = "sparkling-candles"; // Default fallback
    }

    const currentBestInfo = bestsellersData[bestseller];
    let currentProducts = [...bestsellersProducts[bestseller]];

    // 2. Render Static Layout Elements
    // Update breadcrumb
    const breadcrumbCategory = document.getElementById("breadcrumb-category");
    if (breadcrumbCategory) {
        breadcrumbCategory.textContent = currentBestInfo.title;
        breadcrumbCategory.href = `${bestseller}.html`;
    }

    // Update Headings
    const categoryHeading = document.getElementById("category-heading");
    if (categoryHeading) {
        categoryHeading.innerHTML = `${currentBestInfo.title} <span class="category-emoji">${currentBestInfo.emoji}</span>`;
    }

    const categoryDescription = document.getElementById("category-description");
    if (categoryDescription) {
        categoryDescription.textContent = currentBestInfo.description;
    }

    // Update Banner
    const promoBanner = document.getElementById("promo-banner");
    if (promoBanner) {
        promoBanner.style.backgroundImage = `url('${currentBestInfo.bannerBg}')`;
    }

    const bannerTitle = document.getElementById("banner-title");
    if (bannerTitle) {
        bannerTitle.textContent = currentBestInfo.bannerTitle;
    }

    const bannerSubtitle = document.getElementById("banner-subtitle");
    if (bannerSubtitle) {
        bannerSubtitle.textContent = currentBestInfo.bannerSubtitle;
    }

    const bannerBadgesContainer = document.getElementById("banner-badges-container");
    if (bannerBadgesContainer) {
        bannerBadgesContainer.innerHTML = currentBestInfo.bannerBadges.map(badge => `
            <div class="banner-badge">
                <i class="fa-solid ${badge.icon}"></i>
                <span>${badge.text}</span>
            </div>
        `).join('');
    }

    // Update Bottom Explore Buttons
    const exploreTitle = document.getElementById("explore-title");
    if (exploreTitle) {
        exploreTitle.textContent = `Explore More ${currentBestInfo.title} Categories`;
    }

    const exploreButtonsContainer = document.getElementById("explore-buttons-container");
    if (exploreButtonsContainer) {
        exploreButtonsContainer.innerHTML = currentBestInfo.exploreTypes.map((type, idx) => {
            let iconClass = "fa-star";
            if (bestseller === "metallic-balloons") {
                iconClass = "fa-parachute-box";
            } else if (bestseller === "sparkling-candles" || bestseller === "golden-no-candles") {
                iconClass = "fa-cake-candles";
            } else if (bestseller === "balloon-pump") {
                iconClass = "fa-bolt";
            } else {
                iconClass = "fa-wand-magic-sparkles";
            }

            return `
                <button class="explore-btn" onclick="filterBySubtype('${type}')">
                    <i class="fa-solid ${iconClass}"></i>
                    <span>${type}</span>
                </button>
            `;
        }).join('');
    }

    // 3. Render Product Cards Grid
    const productGrid = document.getElementById("product-grid");

    function renderProducts(productsList) {
        if (!productGrid) return;

        if (productsList.length === 0) {
            productGrid.innerHTML = `<div class="no-products">No products found for this category.</div>`;
            return;
        }

        productGrid.innerHTML = productsList.map(prod => {
            const fullStars = Math.floor(prod.rating);
            const hasHalfStar = prod.rating % 1 !== 0;
            let starsMarkup = "";
            for (let i = 1; i <= 5; i++) {
                if (i <= fullStars) {
                    starsMarkup += `<i class="fa-solid fa-star"></i>`;
                } else if (i === fullStars + 1 && hasHalfStar) {
                    starsMarkup += `<i class="fa-solid fa-star-half-stroke"></i>`;
                } else {
                    starsMarkup += `<i class="fa-regular fa-star"></i>`;
                }
            }

            return `
                <div class="product-card" id="card-${prod.id}">
                    <div class="wishlist-icon-wrapper" onclick="toggleWishlist('${prod.id}', event)">
                        <i class="fa-regular fa-heart wishlist-icon"></i>
                    </div>
                    <div class="product-img-container">
                        <img src="${prod.image}" alt="${prod.name}">
                    </div>
                    <div class="product-card-info">
                        <h3 class="product-name">${prod.name}</h3>
                        <div class="product-rating-container">
                            <div class="stars">${starsMarkup}</div>
                            <span class="review-count">(${prod.reviews})</span>
                        </div>
                        <div class="product-price-action">
                            <span class="product-price">₹${prod.price}</span>
                            <div class="action-buttons">
                                <button class="add-to-cart-btn" onclick="addToCart('${prod.id}', '${prod.name}', event)">
                                    Add to Cart
                                </button>
                                <button class="wishlist-btn-small" onclick="toggleWishlist('${prod.id}', event)">
                                    <i class="fa-regular fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Initial render
    renderProducts(currentProducts);

    // 4. Sorting Functionality
    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
            const val = e.target.value;
            let sorted = [...currentProducts];

            if (val === "popular") {
                sorted.sort((a, b) => a.popularRank - b.popularRank);
            } else if (val === "low-high") {
                sorted.sort((a, b) => a.price - b.price);
            } else if (val === "high-low") {
                sorted.sort((a, b) => b.price - a.price);
            } else if (val === "rating") {
                sorted.sort((a, b) => b.rating - a.rating);
            }

            renderProducts(sorted);
        });
    }

    // Highlight menu items if relevant
    const navItems = document.querySelectorAll(".nav-menu li");
    navItems.forEach(item => {
        item.style.cursor = "pointer";
    });
});

// Micro-interaction handlers
function toggleWishlist(productId, event) {
    if (event) event.stopPropagation();
    const card = document.getElementById(`card-${productId}`);
    if (!card) return;

    const wishlistIcon = card.querySelector(".wishlist-icon");
    const wishlistIconSmall = card.querySelector(".wishlist-btn-small i");

    if (wishlistIcon.classList.contains("fa-regular")) {
        wishlistIcon.classList.remove("fa-regular");
        wishlistIcon.classList.add("fa-solid");
        wishlistIcon.style.color = "red";
        if (wishlistIconSmall) {
            wishlistIconSmall.classList.remove("fa-regular");
            wishlistIconSmall.classList.add("fa-solid");
            wishlistIconSmall.style.color = "red";
        }
        showToast("Added to Wishlist! ❤️");
    } else {
        wishlistIcon.classList.remove("fa-solid");
        wishlistIcon.classList.add("fa-regular");
        wishlistIcon.style.color = "";
        if (wishlistIconSmall) {
            wishlistIconSmall.classList.remove("fa-solid");
            wishlistIconSmall.classList.add("fa-regular");
            wishlistIconSmall.style.color = "";
        }
        showToast("Removed from Wishlist.");
    }
}

function addToCart(productId, productName, event) {
    if (event) event.stopPropagation();
    
    const card = document.getElementById(`card-${productId}`);
    if (card) {
        const btn = card.querySelector(".add-to-cart-btn");
        if (btn) {
            btn.textContent = "Added! ✓";
            btn.style.backgroundColor = "#2e7d32";
            btn.style.borderColor = "#2e7d32";
            btn.style.color = "#ffffff";
            
            setTimeout(() => {
                btn.textContent = "Add to Cart";
                btn.style.backgroundColor = "";
                btn.style.borderColor = "";
                btn.style.color = "";
            }, 1800);
        }
    }
    showToast(`"${productName}" added to cart! 🛒`);
}

function filterBySubtype(subtype) {
    showToast(`Filtering by ${subtype}...`);
    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach((card, index) => {
        card.style.opacity = "0.3";
        setTimeout(() => {
            card.style.opacity = "1";
            if (index % 3 === 0) {
                card.style.transform = "scale(0.98)";
                setTimeout(() => card.style.transform = "", 300);
            }
        }, 150 + index * 50);
    });
}

// Toast Notification
function showToast(msg) {
    let toast = document.getElementById("nltc-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "nltc-toast";
        toast.style.position = "fixed";
        toast.style.bottom = "30px";
        toast.style.right = "30px";
        toast.style.backgroundColor = "#222222";
        toast.style.color = "#ffffff";
        toast.style.padding = "12px 24px";
        toast.style.borderRadius = "8px";
        toast.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.15)";
        toast.style.zIndex = "100000";
        toast.style.fontFamily = "'Poppins', sans-serif";
        toast.style.fontSize = "14px";
        toast.style.fontWeight = "500";
        toast.style.transition = "all 0.3s ease";
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";
        document.body.appendChild(toast);
    }

    toast.textContent = msg;
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";
    }, 2500);
}
