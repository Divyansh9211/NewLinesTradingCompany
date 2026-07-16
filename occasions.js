/**
 * NLTC Occasion Listing Page JS
 * Dynamically handles loading products and configuration for each occasion page
 */

// Occasions Configurations
const occasionsData = {
    "birthday": {
        title: "Birthday Decorations",
        emoji: "🎂",
        description: "Everything you need to make your birthday celebration extra special and memorable.",
        bannerBg: "nltc_banner_balloons_bg.png",
        bannerTitle: "Make Every Birthday Magical",
        bannerSubtitle: "with Perfect Decorations",
        bannerBadges: [
            { text: "Premium Quality", icon: "fa-award" },
            { text: "Vibrant Designs", icon: "fa-palette" },
            { text: "Helium Support", icon: "fa-wind" },
            { text: "Safe & Durable", icon: "fa-shield-halved" }
        ],
        exploreTypes: ["Birthday Balloons", "Birthday Banners", "Cake Toppers", "Party Hats", "Confetti & Poppers", "More Collections"]
    },
    "anniversary": {
        title: "Anniversary Decorations",
        emoji: "💖",
        description: "Celebrate your love and milestones with our elegant, romantic, and high-quality anniversary decorations.",
        bannerBg: "nltc_banner_candles_bg.png",
        bannerTitle: "Celebrate Years of Love & Togetherness",
        bannerSubtitle: "with Elegant Anniversary Decor",
        bannerBadges: [
            { text: "Luxury Finishes", icon: "fa-gem" },
            { text: "Warm Lighting", icon: "fa-lightbulb" },
            { text: "Romantic Themes", icon: "fa-heart" },
            { text: "Premium Setup", icon: "fa-crown" }
        ],
        exploreTypes: ["Heart Balloons", "Anniversary Banners", "Red & Gold Decor", "LED Love Lights", "Foil Letters", "More Collections"]
    },
    "baby-shower": {
        title: "Baby Shower Decorations",
        emoji: "🍼",
        description: "Celebrate the arrival of your little one with sweet, adorable, and colorful baby shower decorations.",
        bannerBg: "nltc_banner_festive_bg.png",
        bannerTitle: "Welcome the Little Bundle of Joy",
        bannerSubtitle: "with Adorable Baby Shower Themes",
        bannerBadges: [
            { text: "Soft Pastel Colors", icon: "fa-palette" },
            { text: "Cute Theme Props", icon: "fa-face-smile" },
            { text: "Safe for Indoor", icon: "fa-house" },
            { text: "Easy to Assemble", icon: "fa-screwdriver-wrench" }
        ],
        exploreTypes: ["Theme Balloons", "Shower Banners", "Gender Reveal Props", "Paper Fans", "Table Decor", "More Collections"]
    },
    "welcome-baby": {
        title: "Welcome Baby Decorations",
        emoji: "👶",
        description: "Create a warm, loving, and beautiful welcome for the newborn baby with our customized decor kits.",
        bannerBg: "nltc_banner_festive_bg.png",
        bannerTitle: "Warm Welcome to the Newborn",
        bannerSubtitle: "with Loving Homecoming Decor",
        bannerBadges: [
            { text: "Gentle & Cute", icon: "fa-baby" },
            { text: "Non-Toxic Materials", icon: "fa-shield" },
            { text: "Photo Ready", icon: "fa-camera" },
            { text: "Quick Hanging", icon: "fa-check" }
        ],
        exploreTypes: ["Baby Balloons", "Welcome Banners", "Fringe Curtains", "Crib Decor", "LED Stars", "More Collections"]
    },
    "mehndi": {
        title: "Mehndi Ceremony Decorations",
        emoji: "🌿",
        description: "Bring life to your pre-wedding festivities with our vibrant green and gold mehndi decoration accessories.",
        bannerBg: "nltc_banner_festive_bg.png",
        bannerTitle: "Vibrant & Festive Mehndi Night",
        bannerSubtitle: "with Traditional Green & Gold Decor",
        bannerBadges: [
            { text: "Traditional Styling", icon: "fa-fingerprint" },
            { text: "Bright Festivity", icon: "fa-burst" },
            { text: "Reusable Props", icon: "fa-rotate" },
            { text: "Premium Fabrics", icon: "fa-rug" }
        ],
        exploreTypes: ["Green Balloons", "Mehndi Garlands", "Foil Curtains", "Traditional Lights", "Satin Ribbons", "More Collections"]
    },
    "haldi": {
        title: "Haldi Ceremony Decorations",
        emoji: "💛",
        description: "Brighten up the auspicious yellow celebration of Haldi with traditional marigolds and glowing backdrops.",
        bannerBg: "nltc_banner_festive_bg.png",
        bannerTitle: "Auspicious & Glowing Haldi Decor",
        bannerSubtitle: "with Yellow Marigold Highlights",
        bannerBadges: [
            { text: "Bright Yellow Theme", icon: "fa-sun" },
            { text: "Auspicious Elements", icon: "fa-hands-praying" },
            { text: "Perfect Backdrop", icon: "fa-image" },
            { text: "Eco Floral Props", icon: "fa-leaf" }
        ],
        exploreTypes: ["Yellow Balloons", "Marigold Banners", "Fringe Backdrops", "Traditional Lights", "Flower Toppers", "More Collections"]
    },
    "engagement": {
        title: "Engagement Decorations",
        emoji: "💍",
        description: "Celebrate the formal beginning of forever with modern metallic, silver, and ring-themed decorations.",
        bannerBg: "nltc_banner_candles_bg.png",
        bannerTitle: "Formalize Your Love Story",
        bannerSubtitle: "with Grand Ring Ceremony Decor",
        bannerBadges: [
            { text: "Luxury Silver & Gold", icon: "fa-gem" },
            { text: "Elegant Backdrops", icon: "fa-shapes" },
            { text: "Premium Lighting", icon: "fa-lightbulb" },
            { text: "Celebration Confetti", icon: "fa-star" }
        ],
        exploreTypes: ["Silver Balloons", "Proposal Banners", "Ring Foil Balloons", "LED Light Boards", "Champagne Poppers", "More Collections"]
    },
    "farewell": {
        title: "Farewell Decorations",
        emoji: "🎓",
        description: "Throw a grand goodbye party with neat black, gold, and memory-themed decorations for friends or seniors.",
        bannerBg: "nltc_banner_festive_bg.png",
        bannerTitle: "A Grand & Memorable Farewell",
        bannerSubtitle: "with Warm Memories & Banners",
        bannerBadges: [
            { text: "Classy Black & Gold", icon: "fa-moon" },
            { text: "Warm Greetings", icon: "fa-envelope-open" },
            { text: "Quick Assembly", icon: "fa-bolt" },
            { text: "Photo Backgrounds", icon: "fa-camera" }
        ],
        exploreTypes: ["Black & Gold Decor", "Farewell Banners", "Sparkle Candles", "Memory Walls", "Confetti Cannons", "More Collections"]
    },
    "annaprashan": {
        title: "Annaprashan Decorations",
        emoji: "🥣",
        description: "Decorate the pure first rice ceremony of your infant with our clean, traditional, and red-gold theme kits.",
        bannerBg: "nltc_banner_festive_bg.png",
        bannerTitle: "Holy & Pure Annaprashan Ceremony",
        bannerSubtitle: "with Traditional Red & Gold Decor",
        bannerBadges: [
            { text: "Auspicious & Clean", icon: "fa-spa" },
            { text: "Traditional Themes", icon: "fa-house-chimney" },
            { text: "Infant Friendly", icon: "fa-baby" },
            { text: "Vibrant Borders", icon: "fa-border-all" }
        ],
        exploreTypes: ["Kid Balloons", "Auspicious Banners", "Flower Backdrops", "Cake Decorations", "Smiley Caps", "More Collections"]
    },
    "krishna-janmashtami": {
        title: "Krishna Janmashtami Decor",
        emoji: "🪈",
        description: "Adorn the home mandir for Lord Krishna's birthday with colorful floral garlands and peacock feather details.",
        bannerBg: "nltc_banner_festive_bg.png",
        bannerTitle: "Divine & Spiritual Janmashtami",
        bannerSubtitle: "with Floral Garlands & Flutes",
        bannerBadges: [
            { text: "Divine Peacock Theme", icon: "fa-feather" },
            { text: "Mandir Garlands", icon: "fa-synagogue" },
            { text: "Sparkling LED Stars", icon: "fa-wand-magic-sparkles" },
            { text: "Fragrant Accents", icon: "fa-leaf" }
        ],
        exploreTypes: ["Gold Balloons", "Divine Garlands", "Wall Banners", "Flower Toppers", "LED String Lights", "More Collections"]
    },
    "welcome-home": {
        title: "Welcome Home Decorations",
        emoji: "🏡",
        description: "Celebrate the return of your loved ones or moving into a new house with cozy and happy home garlands.",
        bannerBg: "nltc_banner_festive_bg.png",
        bannerTitle: "Cozy Homecoming Celebrations",
        bannerSubtitle: "with Sweet Wall Garlands & Lights",
        bannerBadges: [
            { text: "Cozy Home Styles", icon: "fa-mug-hot" },
            { text: "Warm Fairy Lights", icon: "fa-lightbulb" },
            { text: "Welcome Garlands", icon: "fa-house-user" },
            { text: "Quick Installation", icon: "fa-circle-check" }
        ],
        exploreTypes: ["Welcome Balloons", "Home Garlands", "Foil Curtains", "LED Fairy Lights", "Smiley Caps", "More Collections"]
    }
};

// Occasions Products Dataset
const occasionsProducts = {
    "birthday": [
        { id: "ob1", name: "Happy Birthday Foil Banner (Rose Gold)", rating: 4.5, reviews: 124, price: 199, image: "nltc_prod_balloon_hbfoil.png", popularRank: 1 },
        { id: "ob2", name: "Black & Gold Latex Balloons (Pack of 50)", rating: 4.5, reviews: 98, price: 249, image: "nltc_prod_balloon_redblack.png", popularRank: 2 },
        { id: "ob3", name: "Happy Birthday Cake Topper (Golden)", rating: 4.5, reviews: 87, price: 149, image: "cardtoppers.png", popularRank: 3 },
        { id: "ob4", name: "Happy Birthday Foil Balloon (18 inch)", rating: 4.5, reviews: 156, price: 149, image: "nltc_prod_balloon_hbfoil.png", popularRank: 4 },
        { id: "ob5", name: "Number Candle (1) (Golden)", rating: 4.5, reviews: 64, price: 49, image: "nltc_prod_balloon_num1foil.png", popularRank: 5 },
        { id: "ob6", name: "Birthday Candles (Pack of 24)", rating: 4.5, reviews: 112, price: 49, image: "cardcandles.png", popularRank: 6 },
        { id: "ob7", name: "Star Foil Balloons (Pack of 5)", rating: 4.5, reviews: 73, price: 199, image: "nltc_prod_balloon_starfoil.png", popularRank: 7 },
        { id: "ob8", name: "Fringe Curtain (Pink)", rating: 4.5, reviews: 91, price: 199, image: "banner.png", popularRank: 8 },
        { id: "ob9", name: "Birthday Cap (Blue)", rating: 4.5, reviews: 68, price: 79, image: "cardcaps.png", popularRank: 9 },
        { id: "ob10", name: "Cake Doll (Princess)", rating: 4.5, reviews: 52, price: 249, image: "cardtoppers.png", popularRank: 10 },
        { id: "ob11", name: "Confetti Cannon (Pack of 2)", rating: 4.5, reviews: 38, price: 149, image: "cardpoppers.png", popularRank: 11 },
        { id: "ob12", name: "Happy Birthday LED Light (Warm White)", rating: 4.5, reviews: 47, price: 349, image: "nltc_prod_balloon_goldchrome.png", popularRank: 12 }
    ],
    "anniversary": [
        { id: "oa1", name: "I Love You Foil Balloon (18 inch)", rating: 5, reviews: 112, price: 149, image: "nltc_prod_balloon_heartfoil.png", popularRank: 1 },
        { id: "oa2", name: "Red Heart Shape Foil Balloon bunch", rating: 4.8, reviews: 83, price: 199, image: "nltc_prod_balloon_heartfoil.png", popularRank: 2 },
        { id: "oa3", name: "Golden Anniversary Script Wall Banner", rating: 4.9, reviews: 67, price: 180, image: "nltc_prod_balloon_goldchrome.png", popularRank: 3 },
        { id: "oa4", name: "Rose Gold Metallic Chrome Balloons (Pack of 50)", rating: 4.6, reviews: 91, price: 249, image: "nltc_prod_balloon_rosegoldchrome.png", popularRank: 4 },
        { id: "oa5", name: "Anniversary LED Fairy Lights (Warm White)", rating: 4.5, reviews: 48, price: 299, image: "nltc_prod_balloon_goldchrome.png", popularRank: 5 },
        { id: "oa6", name: "Sparkling Anaar Candle (Pack of 4)", rating: 4.7, reviews: 76, price: 180, image: "cardcandles.png", popularRank: 6 }
    ],
    "baby-shower": [
        { id: "obs1", name: "Pastel Mix Latex Balloons (Pack of 50)", rating: 4.8, reviews: 110, price: 199, image: "nltc_prod_balloon_pastel.png", popularRank: 1 },
        { id: "obs2", name: "Baby Shower Foil Bunting Banner", rating: 4.6, reviews: 85, price: 149, image: "nltc_prod_balloon_hbfoil.png", popularRank: 2 },
        { id: "obs3", name: "Gender Reveal Confetti Popper (Pink & Blue)", rating: 4.9, reviews: 94, price: 199, image: "cardpoppers.png", popularRank: 3 },
        { id: "obs4", name: "Baby Shower Theme Paper Crowns (Pack of 10)", rating: 4.4, reviews: 31, price: 120, image: "cardcaps.png", popularRank: 4 },
        { id: "obs5", name: "Welcome Baby Foil Balloon (Silver)", rating: 4.7, reviews: 52, price: 189, image: "nltc_prod_balloon_starfoil.png", popularRank: 5 },
        { id: "obs6", name: "Baby Footprint Shape Foil Balloon", rating: 4.5, reviews: 38, price: 149, image: "nltc_prod_balloon_smiley.png", popularRank: 6 }
    ],
    "welcome-baby": [
        { id: "owb1", name: "Welcome Baby Script Banner (Gold Glitter)", rating: 4.9, reviews: 74, price: 149, image: "nltc_prod_balloon_goldchrome.png", popularRank: 1 },
        { id: "owb2", name: "Baby Footprint Shape Foil Balloon (Blue)", rating: 4.6, reviews: 48, price: 149, image: "nltc_prod_balloon_smiley.png", popularRank: 2 },
        { id: "owb3", name: "Pastel Blue & White Latex Balloons (Pack of 50)", rating: 4.7, reviews: 63, price: 199, image: "nltc_prod_balloon_pastel.png", popularRank: 3 },
        { id: "owb4", name: "Glitter Star Foil Balloons (Pack of 5)", rating: 4.5, reviews: 39, price: 199, image: "nltc_prod_balloon_starfoil.png", popularRank: 4 },
        { id: "owb5", name: "Confetti Balloons Bunch (Pack of 10)", rating: 4.8, reviews: 52, price: 149, image: "nltc_prod_balloon_confetti.png", popularRank: 5 },
        { id: "owb6", name: "Soft Fringe Curtain (Baby Blue)", rating: 4.4, reviews: 29, price: 180, image: "banner.png", popularRank: 6 }
    ],
    "mehndi": [
        { id: "om1", name: "Dark Green & Yellow Latex Balloons (Pack of 50)", rating: 4.7, reviews: 88, price: 199, image: "nltc_prod_balloon_redblack.png", popularRank: 1 },
        { id: "om2", name: "Golden Metallic Chrome Balloons (Pack of 50)", rating: 4.9, reviews: 104, price: 249, image: "nltc_prod_balloon_goldchrome.png", popularRank: 2 },
        { id: "om3", name: "Mehndi Ceremony Paper Bunting Banner", rating: 4.5, reviews: 43, price: 129, image: "nltc_prod_balloon_hbfoil.png", popularRank: 3 },
        { id: "om4", name: "Green Metallic Fringe Curtain Backdrops", rating: 4.6, reviews: 52, price: 199, image: "banner.png", popularRank: 4 },
        { id: "om5", name: "Marigold Artificial Flower Garlands (Pack of 5)", rating: 4.8, reviews: 93, price: 299, image: "cardtoppers.png", popularRank: 5 },
        { id: "om6", name: "Confetti Party Popper (Green & Gold)", rating: 4.4, reviews: 37, price: 149, image: "cardpoppers.png", popularRank: 6 }
    ],
    "haldi": [
        { id: "oh1", name: "Bright Yellow Latex Balloons (Pack of 50)", rating: 4.8, reviews: 92, price: 199, image: "nltc_prod_balloon_smiley.png", popularRank: 1 },
        { id: "oh2", name: "Golden Chrome Latex Balloons (Pack of 50)", rating: 4.9, reviews: 115, price: 249, image: "nltc_prod_balloon_goldchrome.png", popularRank: 2 },
        { id: "oh3", name: "Yellow Marigold Artificial Garland Strings", rating: 4.7, reviews: 81, price: 299, image: "cardtoppers.png", popularRank: 3 },
        { id: "oh4", name: "Haldi Ceremony Banner (Script font, Gold)", rating: 4.6, reviews: 39, price: 149, image: "nltc_prod_balloon_goldchrome.png", popularRank: 4 },
        { id: "oh5", name: "Yellow Metallic Fringe Curtains (Pack of 2)", rating: 4.5, reviews: 54, price: 199, image: "banner.png", popularRank: 5 },
        { id: "oh6", name: "Sparkling Anaar Birthday Candle (Pack of 4)", rating: 4.4, reviews: 28, price: 180, image: "cardcandles.png", popularRank: 6 }
    ],
    "engagement": [
        { id: "oe1", name: "Gold Foil Ring Shape Balloon (30 inch)", rating: 5, reviews: 142, price: 249, image: "nltc_prod_balloon_goldchrome.png", popularRank: 1 },
        { id: "oe2", name: "Silver & White Metallic Balloons (Pack of 50)", rating: 4.7, reviews: 76, price: 249, image: "nltc_prod_balloon_goldchrome.png", popularRank: 2 },
        { id: "oe3", name: "Engagement Ceremony Gold Foil Banner", rating: 4.8, reviews: 98, price: 199, image: "nltc_prod_balloon_hbfoil.png", popularRank: 3 },
        { id: "oe4", name: "Star Shaped Silver Foil Balloons (Pack of 5)", rating: 4.5, reviews: 43, price: 199, image: "nltc_prod_balloon_starfoil.png", popularRank: 4 },
        { id: "oe5", name: "Luxury Champagne Confetti Poppers (Pack of 2)", rating: 4.9, reviews: 88, price: 299, image: "cardpoppers.png", popularRank: 5 },
        { id: "oe6", name: "Musical Rotating Flower Cake Candle", rating: 4.6, reviews: 52, price: 299, image: "cardcandles.png", popularRank: 6 }
    ],
    "farewell": [
        { id: "of1", name: "We Will Miss You Script Banner (Gold)", rating: 4.9, reviews: 97, price: 149, image: "nltc_prod_balloon_goldchrome.png", popularRank: 1 },
        { id: "of2", name: "Black & Gold Latex Balloons bunch (Pack of 50)", rating: 4.7, reviews: 110, price: 249, image: "nltc_prod_balloon_redblack.png", popularRank: 2 },
        { id: "of3", name: "Farewell Confetti Party Poppers (Pack of 4)", rating: 4.8, reviews: 74, price: 249, image: "cardpoppers.png", popularRank: 3 },
        { id: "of4", name: "Sparkling Silver Star Balloons (Pack of 5)", rating: 4.5, reviews: 49, price: 199, image: "nltc_prod_balloon_starfoil.png", popularRank: 4 },
        { id: "of5", name: "Fringe Curtain Backdrops (Jet Black)", rating: 4.6, reviews: 63, price: 199, image: "banner.png", popularRank: 5 },
        { id: "of6", name: "Gold Glitter Cake Topper (Best Wishes)", rating: 4.8, reviews: 41, price: 149, image: "cardtoppers.png", popularRank: 6 }
    ],
    "annaprashan": [
        { id: "oap1", name: "Annaprashan Ceremony Script Banner (Red-Gold)", rating: 4.9, reviews: 67, price: 199, image: "nltc_prod_balloon_goldchrome.png", popularRank: 1 },
        { id: "oap2", name: "Traditional Red & Gold Balloons (Pack of 50)", rating: 4.6, reviews: 52, price: 199, image: "nltc_prod_balloon_redblack.png", popularRank: 2 },
        { id: "oap3", name: "Auspicious Swastik Shape Foil Balloons", rating: 4.8, reviews: 41, price: 149, image: "nltc_prod_balloon_heartfoil.png", popularRank: 3 },
        { id: "oap4", name: "Gold Glitter Cake Topper (Pratham Grash)", rating: 4.7, reviews: 38, price: 149, image: "cardtoppers.png", popularRank: 4 },
        { id: "oap5", name: "Polka Dot Theme Party Hats (Pack of 10)", rating: 4.5, reviews: 88, price: 149, image: "cardcaps.png", popularRank: 5 },
        { id: "oap6", name: "Traditional Marigold Flower Backdrop (Garlands)", rating: 4.7, reviews: 59, price: 299, image: "banner.png", popularRank: 6 }
    ],
    "krishna-janmashtami": [
        { id: "okj1", name: "Golden Peacock Feather Script Banner", rating: 5, reviews: 83, price: 199, image: "nltc_prod_balloon_goldchrome.png", popularRank: 1 },
        { id: "okj2", name: "Divine Flower Garland Hanging Strings (Pack of 5)", rating: 4.9, reviews: 92, price: 299, image: "cardtoppers.png", popularRank: 2 },
        { id: "okj3", name: "Peacock Feather Shape Foil Balloons (Pack of 2)", rating: 4.8, reviews: 52, price: 180, image: "nltc_prod_balloon_starfoil.png", popularRank: 3 },
        { id: "okj4", name: "Lord Krishna Flute Decor Prop (Golden)", rating: 4.7, reviews: 37, price: 149, image: "nltc_prod_balloon_goldchrome.png", popularRank: 4 },
        { id: "okj5", name: "Yellow & Green Metallic Balloons (Pack of 50)", rating: 4.6, reviews: 74, price: 199, image: "nltc_prod_balloon_smiley.png", popularRank: 5 },
        { id: "okj6", name: "Warm White LED String Fairy Lights (20 Feet)", rating: 4.8, reviews: 110, price: 149, image: "nltc_prod_balloon_goldchrome.png", popularRank: 6 }
    ],
    "welcome-home": [
        { id: "owh1", name: "Welcome Home Gold Foil Letter Banners", rating: 4.9, reviews: 104, price: 199, image: "nltc_prod_balloon_goldchrome.png", popularRank: 1 },
        { id: "owh2", name: "Warm Home Latex Balloons Bunch (Pack of 50)", rating: 4.6, reviews: 63, price: 199, image: "nltc_prod_balloon_pastel.png", popularRank: 2 },
        { id: "owh3", name: "Fairy Lights LED String Backdrop (Warm White)", rating: 4.8, reviews: 91, price: 249, image: "nltc_prod_balloon_goldchrome.png", popularRank: 3 },
        { id: "owh4", name: "Welcome Home Cake Topper (Wooden script)", rating: 4.5, reviews: 38, price: 129, image: "cardtoppers.png", popularRank: 4 },
        { id: "owh5", name: "Metallic Gold Fringe Curtains (Pack of 2)", rating: 4.7, reviews: 54, price: 199, image: "banner.png", popularRank: 5 },
        { id: "owh6", name: "Confetti Popper Cannon (Golden Streamers)", rating: 4.5, reviews: 29, price: 149, image: "cardpoppers.png", popularRank: 6 }
    ]
};

// Main DOM Content Loader
document.addEventListener("DOMContentLoaded", () => {
    // 1. Get Occasion from filename
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1);
    let occasion = filename.replace('.html', '').toLowerCase().trim();

    // Validation & Fallback
    if (!occasion || !occasionsData[occasion]) {
        occasion = "birthday"; // Default fallback
    }

    const currentOccInfo = occasionsData[occasion];
    let currentProducts = [...occasionsProducts[occasion]];

    // 2. Render Static Layout Elements
    // Update breadcrumb
    const breadcrumbCategory = document.getElementById("breadcrumb-category");
    if (breadcrumbCategory) {
        breadcrumbCategory.textContent = currentOccInfo.title.replace(" Decorations", "");
        breadcrumbCategory.href = `${occasion}.html`;
    }

    // Update Headings
    const categoryHeading = document.getElementById("category-heading");
    if (categoryHeading) {
        categoryHeading.innerHTML = `${currentOccInfo.title} <span class="category-emoji">${currentOccInfo.emoji}</span>`;
    }

    const categoryDescription = document.getElementById("category-description");
    if (categoryDescription) {
        categoryDescription.textContent = currentOccInfo.description;
    }

    // Update Banner
    const promoBanner = document.getElementById("promo-banner");
    if (promoBanner) {
        promoBanner.style.backgroundImage = `url('${currentOccInfo.bannerBg}')`;
    }

    const bannerTitle = document.getElementById("banner-title");
    if (bannerTitle) {
        bannerTitle.textContent = currentOccInfo.bannerTitle;
    }

    const bannerSubtitle = document.getElementById("banner-subtitle");
    if (bannerSubtitle) {
        bannerSubtitle.textContent = currentOccInfo.bannerSubtitle;
    }

    const bannerBadgesContainer = document.getElementById("banner-badges-container");
    if (bannerBadgesContainer) {
        bannerBadgesContainer.innerHTML = currentOccInfo.bannerBadges.map(badge => `
            <div class="banner-badge">
                <i class="fa-solid ${badge.icon}"></i>
                <span>${badge.text}</span>
            </div>
        `).join('');
    }

    // Update Bottom Explore Buttons
    const exploreTitle = document.getElementById("explore-title");
    if (exploreTitle) {
        exploreTitle.textContent = `Explore More ${currentOccInfo.title.replace(" Decorations", "")} Categories`;
    }

    const exploreButtonsContainer = document.getElementById("explore-buttons-container");
    if (exploreButtonsContainer) {
        exploreButtonsContainer.innerHTML = currentOccInfo.exploreTypes.map((type, idx) => {
            let iconClass = "fa-star";
            if (occasion === "birthday") {
                if (idx === 0) iconClass = "fa-parachute-box";
                else if (idx === 1) iconClass = "fa-scroll";
                else if (idx === 2) iconClass = "fa-star";
                else if (idx === 3) iconClass = "fa-hat-wizard";
                else if (idx === 4) iconClass = "fa-burst";
                else iconClass = "fa-gift";
            } else if (occasion === "anniversary") {
                iconClass = "fa-heart";
            } else if (occasion === "baby-shower" || occasion === "welcome-baby") {
                iconClass = "fa-baby";
            } else if (occasion === "mehndi" || occasion === "haldi") {
                iconClass = "fa-spa";
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
            productGrid.innerHTML = `<div class="no-products">No products found for this occasion.</div>`;
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

    // Make Homepage Search Input Redirect Functional inside the occasions page too!
    const searchBarInput = document.querySelector(".search-bar input");
    if (searchBarInput) {
        searchBarInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                // Let the global script.js handle the search redirect
            }
        });
    }
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
            
            setTimeout(() => {
                btn.textContent = "Add to Cart";
                btn.style.backgroundColor = "";
                btn.style.borderColor = "";
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
