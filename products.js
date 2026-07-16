/**
 * NLTC Product Listing Page JS
 * Dynamically handles category page loading, sorting, and micro-interactions
 */

// Category Configurations
const categoriesData = {
    "balloons": {
        title: "Balloons",
        emoji: "🎈",
        description: "Add color, fun and joy to your celebrations with our amazing collection of balloons.",
        bannerBg: "nltc_banner_balloons_bg.png",
        bannerTitle: "Make Every Moment Special",
        bannerSubtitle: "with Perfect Balloons",
        bannerBadges: [
            { text: "Premium Quality", icon: "fa-award" },
            { text: "Vibrant Colors", icon: "fa-palette" },
            { text: "Helium Support", icon: "fa-wind" },
            { text: "Safe & Durable", icon: "fa-shield-halved" }
        ],
        exploreTypes: ["Latex Balloons", "Chrome Balloons", "Foil Balloons", "LED Balloons", "Character Balloons", "Balloon Bouquets"]
    },
    "candles": {
        title: "Candles",
        emoji: "🕯️",
        description: "Brighten up your cakes and make birthday wishes come true with our glowing candles.",
        bannerBg: "nltc_banner_candles_bg.png",
        bannerTitle: "Make Birthday Wishes Glow",
        bannerSubtitle: "with Elegant Celebration Candles",
        bannerBadges: [
            { text: "Smokeless Burn", icon: "fa-wind" },
            { text: "Bright Glow", icon: "fa-sun" },
            { text: "Eco-Friendly Wax", icon: "fa-leaf" },
            { text: "Long Lasting", icon: "fa-clock" }
        ],
        exploreTypes: ["Sparkling Candles", "Number Candles", "Magic Candles", "Letter Candles", "Metallic Candles", "Birthday Candles"]
    },
    "birthday-caps": {
        title: "Birthday Caps",
        emoji: "🥳",
        description: "Get everyone in the party mood with our fun, colorful, and stylish birthday caps.",
        bannerBg: "nltc_banner_festive_bg.png",
        bannerTitle: "Crown Your Celebrations",
        bannerSubtitle: "with Fun Party Caps & Hats",
        bannerBadges: [
            { text: "Comfortable Fit", icon: "fa-face-smile" },
            { text: "Vibrant Prints", icon: "fa-palette" },
            { text: "Glitter Accents", icon: "fa-wand-magic-sparkles" },
            { text: "Kid Safe", icon: "fa-shield" }
        ],
        exploreTypes: ["Party Hats", "Crown Caps", "Glitter Caps", "Theme Caps", "Paper Caps", "LED Caps"]
    },
    "party-poppers": {
        title: "Party Poppers",
        emoji: "🎉",
        description: "Celebrate the big moment with a shower of colorful confetti and metallic streamers.",
        bannerBg: "nltc_banner_festive_bg.png",
        bannerTitle: "Burst with Joy & Excitement",
        bannerSubtitle: "with Safe Confetti Party Poppers",
        bannerBadges: [
            { text: "Loud & Safe Pop", icon: "fa-volume-high" },
            { text: "Eco-Confetti", icon: "fa-leaf" },
            { text: "Metallic Streamers", icon: "fa-star" },
            { text: "Easy Pull", icon: "fa-hand" }
        ],
        exploreTypes: ["Confetti Poppers", "Rose Petal Poppers", "Metallic Poppers", "Mini Poppers", "Gun Poppers", "Smoke Poppers"]
    },
    "sashes": {
        title: "Sashes",
        emoji: "🎗️",
        description: "Make the guest of honor stand out with our premium satin birthday and celebration sashes.",
        bannerBg: "nltc_banner_festive_bg.png",
        bannerTitle: "Feel Like Royalty Today",
        bannerSubtitle: "with Premium Satin Sashes",
        bannerBadges: [
            { text: "Premium Satin", icon: "fa-gem" },
            { text: "Glitter Lettering", icon: "fa-signature" },
            { text: "Elegant Styles", icon: "fa-shirt" },
            { text: "All-Day Wear", icon: "fa-circle-check" }
        ],
        exploreTypes: ["Birthday Girl Sashes", "Birthday Boy Sashes", "Bride To Be Sashes", "Groom To Be Sashes", "Glitter Sashes", "Satin Sashes"]
    },
    "banners": {
        title: "Banners",
        emoji: "🎏",
        description: "Set the festive background for your party photos with our premium paper and foil banners.",
        bannerBg: "nltc_banner_festive_bg.png",
        bannerTitle: "Spell Out Your Happiness",
        bannerSubtitle: "with Premium Wall Banners & Garlands",
        bannerBadges: [
            { text: "Large Sizes", icon: "fa-expand" },
            { text: "Sturdy Paper", icon: "fa-scroll" },
            { text: "Easy Hanging", icon: "fa-lines-leaning" },
            { text: "Reusable", icon: "fa-rotate" }
        ],
        exploreTypes: ["Happy Birthday Banners", "Anniversary Banners", "Welcome Home Banners", "Baby Shower Banners", "Bunting Garlands", "Custom Letters"]
    },
    "cake-knives": {
        title: "Cake Cutting Knives",
        emoji: "🔪",
        description: "Cut your celebration cake with elegance using our golden and decorated knives.",
        bannerBg: "nltc_banner_candles_bg.png",
        bannerTitle: "Perfect Cake Moments",
        bannerSubtitle: "with Elegant Cutting Knives",
        bannerBadges: [
            { text: "Sharp Steel", icon: "fa-utensils" },
            { text: "Decorated Handles", icon: "fa-gem" },
            { text: "Premium Packaging", icon: "fa-box" },
            { text: "Durable Build", icon: "fa-shield" }
        ],
        exploreTypes: ["Golden Knives", "Floral Knives", "Pastel Knives", "Acrylic Knives", "Knife Sets", "Cake Servers"]
    },
    "tiara": {
        title: "Birthday Tiara",
        emoji: "👑",
        description: "Shine like a princess on your special day with our sparkling birthday tiaras.",
        bannerBg: "nltc_banner_festive_bg.png",
        bannerTitle: "Shine Like a Princess",
        bannerSubtitle: "with Sparkling Birthday Tiaras",
        bannerBadges: [
            { text: "Sparkling Crystals", icon: "fa-wand-magic-sparkles" },
            { text: "Comfortable Band", icon: "fa-circle-notch" },
            { text: "Glitter Accents", icon: "fa-gem" },
            { text: "Elegant Designs", icon: "fa-star" }
        ],
        exploreTypes: ["Crystal Tiaras", "Glitter Tiaras", "LED Tiaras", "Floral Tiaras", "Tiara Combos", "Princess Tiaras"]
    },
    "crowns": {
        title: "Birthday Crowns",
        emoji: "👑",
        description: "Royal crowns for our birthday kings and queens to match the royal theme.",
        bannerBg: "nltc_banner_festive_bg.png",
        bannerTitle: "Rule Your Special Day",
        bannerSubtitle: "with Royal Birthday Crowns",
        bannerBadges: [
            { text: "Royal Gold Foil", icon: "fa-crown" },
            { text: "Adjustable Strap", icon: "fa-gear" },
            { text: "Sturdy Paperboard", icon: "fa-scroll" },
            { text: "Kids & Adults Fit", icon: "fa-users" }
        ],
        exploreTypes: ["Gold Crowns", "Silver Crowns", "LED Crowns", "Theme Crowns", "Paper Crowns", "Adult Crowns"]
    },
    "toppers": {
        title: "Cake Toppers",
        emoji: "🎂",
        description: "Top your celebration cakes with our gold, acrylic, and glitter themed toppers.",
        bannerBg: "nltc_banner_candles_bg.png",
        bannerTitle: "Add Love to Your Cakes",
        bannerSubtitle: "with Elegant Gold & Acrylic Toppers",
        bannerBadges: [
            { text: "Shiny Acrylic", icon: "fa-gem" },
            { text: "Glitter Paper", icon: "fa-wand-magic-sparkles" },
            { text: "Custom Themes", icon: "fa-signature" },
            { text: "Food Grade Safe", icon: "fa-circle-check" }
        ],
        exploreTypes: ["Happy Birthday Toppers", "Anniversary Toppers", "Number Toppers", "Acrylic Toppers", "Wooden Toppers", "Floral Toppers"]
    },
    "combos": {
        title: "Decor Combos",
        emoji: "🎁",
        description: "Get everything you need in one box with our all-in-one theme decoration kits.",
        bannerBg: "nltc_banner_balloons_bg.png",
        bannerTitle: "All-in-One Celebration Box",
        bannerSubtitle: "with Premium Theme Decor Combos",
        bannerBadges: [
            { text: "Complete Kit", icon: "fa-box-open" },
            { text: "Time Saving", icon: "fa-clock" },
            { text: "Easy Setups", icon: "fa-check" },
            { text: "Cost Effective", icon: "fa-tags" }
        ],
        exploreTypes: ["Birthday Combos", "Anniversary Combos", "Baby Shower Combos", "Welcome Baby Combos", "Haldi Combos", "Mehndi Combos"]
    },
    "manymore": {
        title: "And More",
        emoji: "➕",
        description: "Explore our collection of other exciting party accessories and decoration essentials.",
        bannerBg: "nltc_banner_festive_bg.png",
        bannerTitle: "Discover More Excitement",
        bannerSubtitle: "with Premium Party Essentials",
        bannerBadges: [
            { text: "Wide Range", icon: "fa-list" },
            { text: "Trending Items", icon: "fa-fire" },
            { text: "Premium Stock", icon: "fa-truck" },
            { text: "Best Prices", icon: "fa-percent" }
        ],
        exploreTypes: ["Metallic Curtains", "Faux Balls", "LED Lights", "Glue Dots", "Balloon Pumps", "Celebration Sprays"]
    }
};

// Full Products Dataset
const productsData = {
    "balloons": [
        { id: "b1", name: "Red & Black Latex Balloons (Pack of 50)", rating: 5, reviews: 124, price: 199, image: "nltc_prod_balloon_redblack.png", popularRank: 1 },
        { id: "b2", name: "Pastel Mix Latex Balloons (Pack of 50)", rating: 4.5, reviews: 98, price: 199, image: "nltc_prod_balloon_pastel.png", popularRank: 5 },
        { id: "b3", name: "Golden Chrome Balloons (Pack of 50)", rating: 5, reviews: 87, price: 249, image: "nltc_prod_balloon_goldchrome.png", popularRank: 2 },
        { id: "b4", name: "Happy Birthday Foil Balloon (18 inch)", rating: 4.5, reviews: 156, price: 149, image: "nltc_prod_balloon_hbfoil.png", popularRank: 3 },
        { id: "b5", name: "Number Foil Balloon (1) (32 inch)", rating: 4.5, reviews: 64, price: 149, image: "nltc_prod_balloon_num1foil.png", popularRank: 8 },
        { id: "b6", name: "Heart Foil Balloon (18 inch)", rating: 5, reviews: 112, price: 149, image: "nltc_prod_balloon_heartfoil.png", popularRank: 4 },
        { id: "b7", name: "Confetti Balloons (Pack of 10)", rating: 4, reviews: 73, price: 149, image: "nltc_prod_balloon_confetti.png", popularRank: 9 },
        { id: "b8", name: "Rose Gold Chrome Balloons (Pack of 50)", rating: 4.5, reviews: 91, price: 249, image: "nltc_prod_balloon_rosegoldchrome.png", popularRank: 6 },
        { id: "b9", name: "Star Foil Balloons (18 inch, Pack of 5)", rating: 4.5, reviews: 68, price: 199, image: "nltc_prod_balloon_starfoil.png", popularRank: 10 },
        { id: "b10", name: "I Love You Foil Balloon (18 inch)", rating: 4.5, reviews: 52, price: 149, image: "nltc_prod_balloon_heartfoil.png", popularRank: 7 },
        { id: "b11", name: "Smiley Face Balloons (Pack of 10)", rating: 4, reviews: 38, price: 119, image: "nltc_prod_balloon_smiley.png", popularRank: 12 },
        { id: "b12", name: "Black & Gold Balloons (Pack of 50)", rating: 4.5, reviews: 47, price: 249, image: "nltc_prod_balloon_goldchrome.png", popularRank: 11 }
    ],
    "candles": [
        { id: "c1", name: "Sparkling Anaar Candle (Pack of 4)", rating: 5, reviews: 112, price: 180, image: "nltc_prod_balloon_goldchrome.png", popularRank: 1 },
        { id: "c2", name: "Number Birthday Candles (0-9)", rating: 4.5, reviews: 74, price: 79, image: "nltc_prod_balloon_num1foil.png", popularRank: 3 },
        { id: "c3", name: "Metallic Gold Slim Candles (Pack of 12)", rating: 4.8, reviews: 61, price: 120, image: "nltc_prod_balloon_goldchrome.png", popularRank: 2 },
        { id: "c4", name: "Magic Relighting Candles (Pack of 10)", rating: 4.2, reviews: 48, price: 99, image: "nltc_prod_balloon_pastel.png", popularRank: 5 },
        { id: "c5", name: "Multi-Color Flame Birthday Candles", rating: 4.6, reviews: 85, price: 149, image: "nltc_prod_balloon_hbfoil.png", popularRank: 4 },
        { id: "c6", name: "Musical Rotating Lotus Candle", rating: 4.7, reviews: 93, price: 299, image: "nltc_prod_balloon_smiley.png", popularRank: 6 }
    ],
    "birthday-caps": [
        { id: "h1", name: "Glitter Birthday King & Queen Crowns (Pack of 2)", rating: 5, reviews: 59, price: 199, image: "nltc_prod_balloon_goldchrome.png", popularRank: 1 },
        { id: "h2", name: "Polka Dot Birthday Party Hats (Pack of 10)", rating: 4.5, reviews: 83, price: 149, image: "nltc_prod_balloon_pastel.png", popularRank: 2 },
        { id: "h3", name: "Golden Metallic Cone Hats (Pack of 8)", rating: 4.7, reviews: 42, price: 179, image: "nltc_prod_balloon_goldchrome.png", popularRank: 3 },
        { id: "h4", name: "Foil Fringe Party Crowns (Pack of 6)", rating: 4.3, reviews: 29, price: 120, image: "nltc_prod_balloon_starfoil.png", popularRank: 5 },
        { id: "h5", name: "Cartoon Theme Birthday Caps (Pack of 10)", rating: 4.6, reviews: 67, price: 159, image: "nltc_prod_balloon_smiley.png", popularRank: 4 },
        { id: "h6", name: "LED Light Up Birthday Crown", rating: 4.8, reviews: 54, price: 249, image: "nltc_prod_balloon_num1foil.png", popularRank: 6 }
    ],
    "party-poppers": [
        { id: "p1", name: "Large Confetti Party Popper (40 cm)", rating: 4.9, reviews: 142, price: 149, image: "nltc_prod_balloon_confetti.png", popularRank: 1 },
        { id: "p2", name: "Rose Petals Celebration Popper (30 cm)", rating: 4.8, reviews: 104, price: 169, image: "nltc_prod_balloon_heartfoil.png", popularRank: 2 },
        { id: "p3", name: "Golden Foil Streamer Popper (Pack of 2)", rating: 4.7, reviews: 76, price: 199, image: "nltc_prod_balloon_goldchrome.png", popularRank: 3 },
        { id: "p4", name: "Mini Desktop Party Poppers (Pack of 6)", rating: 4.4, reviews: 31, price: 129, image: "nltc_prod_balloon_redblack.png", popularRank: 5 },
        { id: "p5", name: "Multicolor Paper Confetti Popper (Pack of 4)", rating: 4.6, reviews: 92, price: 249, image: "nltc_prod_balloon_pastel.png", popularRank: 4 },
        { id: "p6", name: "Champagne Bottle Shape Confetti Popper", rating: 4.5, reviews: 58, price: 299, image: "nltc_prod_balloon_hbfoil.png", popularRank: 6 }
    ],
    "sashes": [
        { id: "s1", name: "Birthday Girl Satin Sash (Glitter Pink)", rating: 5, reviews: 188, price: 149, image: "nltc_prod_balloon_heartfoil.png", popularRank: 1 },
        { id: "s2", name: "Birthday Boy Satin Sash (Glitter Blue)", rating: 4.9, reviews: 94, price: 149, image: "nltc_prod_balloon_num1foil.png", popularRank: 2 },
        { id: "s3", name: "Bride To Be Satin Sash & Tiara Combo", rating: 5, reviews: 115, price: 299, image: "nltc_prod_balloon_goldchrome.png", popularRank: 3 },
        { id: "s4", name: "Groom To Be Black & Gold Satin Sash", rating: 4.7, reviews: 43, price: 149, image: "nltc_prod_balloon_redblack.png", popularRank: 5 },
        { id: "s5", name: "Sweet 16 Glitter Satin Sash", rating: 4.8, reviews: 72, price: 149, image: "nltc_prod_balloon_rosegoldchrome.png", popularRank: 4 },
        { id: "s6", name: "Custom Personalized Satin Sash", rating: 4.6, reviews: 39, price: 249, image: "nltc_prod_balloon_smiley.png", popularRank: 6 }
    ],
    "banners": [
        { id: "ba1", name: "Gold Foil Happy Birthday Banner (Alphabet Letters)", rating: 4.9, reviews: 201, price: 199, image: "nltc_prod_balloon_goldchrome.png", popularRank: 1 },
        { id: "ba2", name: "Happy Anniversary Paper Garland (Black & Gold)", rating: 4.8, reviews: 88, price: 149, image: "nltc_prod_balloon_redblack.png", popularRank: 3 },
        { id: "ba3", name: "Welcome Home Alphabet Banner", rating: 4.7, reviews: 63, price: 129, image: "nltc_prod_balloon_pastel.png", popularRank: 4 },
        { id: "ba4", name: "Baby Shower Pastel Bunting Banner", rating: 4.6, reviews: 74, price: 139, image: "nltc_prod_balloon_rosegoldchrome.png", popularRank: 5 },
        { id: "ba5", name: "Rainbow Paper Pennant Garland", rating: 4.5, reviews: 97, price: 119, image: "nltc_prod_balloon_hbfoil.png", popularRank: 2 },
        { id: "ba6", name: "Glitter Star Paper Garland (10 Feet)", rating: 4.6, reviews: 52, price: 99, image: "nltc_prod_balloon_starfoil.png", popularRank: 6 }
    ],
    "cake-knives": [
        { id: "ck1", name: "Luxury Golden Cake Knife & Server Set", rating: 4.9, reviews: 78, price: 349, image: "nltc_prod_balloon_goldchrome.png", popularRank: 1 },
        { id: "ck2", name: "Floral Handle Birthday Cake Knife", rating: 4.6, reviews: 43, price: 149, image: "cardtoppers.png", popularRank: 3 },
        { id: "ck3", name: "Pastel Theme Cake Cutting Knife", rating: 4.5, reviews: 31, price: 99, image: "nltc_prod_balloon_pastel.png", popularRank: 5 },
        { id: "ck4", name: "Silver Acrylic Engraved Knife", rating: 4.7, reviews: 52, price: 199, image: "nltc_prod_balloon_starfoil.png", popularRank: 4 },
        { id: "ck5", name: "Classic Steel Cake Server", rating: 4.8, reviews: 64, price: 179, image: "nltc_prod_balloon_goldchrome.png", popularRank: 2 },
        { id: "ck6", name: "Decorated Ribbon Knife (Pack of 2)", rating: 4.3, reviews: 29, price: 119, image: "nltc_prod_balloon_hbfoil.png", popularRank: 6 }
    ],
    "tiara": [
        { id: "t1", name: "Premium Crystal Birthday Tiara (Princess)", rating: 5, reviews: 142, price: 299, image: "nltc_prod_balloon_goldchrome.png", popularRank: 1 },
        { id: "t2", name: "Silver Glitter Birthday Girl Tiara", rating: 4.8, reviews: 92, price: 199, image: "nltc_prod_balloon_starfoil.png", popularRank: 2 },
        { id: "t3", name: "LED Glowing Flower Tiara Crown", rating: 4.6, reviews: 58, price: 149, image: "nltc_prod_balloon_smiley.png", popularRank: 4 },
        { id: "t4", name: "Rose Gold Rhinestone Crown Headband", rating: 4.7, reviews: 73, price: 249, image: "nltc_prod_balloon_rosegoldchrome.png", popularRank: 3 },
        { id: "t5", name: "Theme Birthday Girl Tiara & Sash Combo", rating: 4.9, reviews: 108, price: 349, image: "nltc_prod_balloon_heartfoil.png", popularRank: 5 },
        { id: "t6", name: "Sweet 16 Sparkle Headband Crown", rating: 4.5, reviews: 39, price: 179, image: "nltc_prod_balloon_pastel.png", popularRank: 6 }
    ],
    "crowns": [
        { id: "cr1", name: "Royal Golden Foil Birthday Crowns (Pack of 6)", rating: 4.9, reviews: 88, price: 199, image: "nltc_prod_balloon_goldchrome.png", popularRank: 1 },
        { id: "cr2", name: "Glitter Paper Crown Hats (Pack of 10)", rating: 4.6, reviews: 67, price: 149, image: "cardcaps.png", popularRank: 2 },
        { id: "cr3", name: "LED Light Up King & Queen Crowns (Pack of 2)", rating: 4.8, reviews: 54, price: 249, image: "nltc_prod_balloon_goldchrome.png", popularRank: 3 },
        { id: "cr4", name: "Adjustable Metal Birthday Boy Crown", rating: 4.7, reviews: 41, price: 299, image: "nltc_prod_balloon_redblack.png", popularRank: 4 },
        { id: "cr5", name: "Cartoon Theme Kids Crowns (Pack of 8)", rating: 4.4, reviews: 31, price: 129, image: "nltc_prod_balloon_smiley.png", popularRank: 5 },
        { id: "cr6", name: "Foil Fringe Celebration Party Crowns", rating: 4.3, reviews: 29, price: 120, image: "nltc_prod_balloon_starfoil.png", popularRank: 6 }
    ],
    "toppers": [
        { id: "to1", name: "Happy Birthday Gold Acrylic Cake Topper", rating: 4.9, reviews: 201, price: 149, image: "cardtoppers.png", popularRank: 1 },
        { id: "to2", name: "Love Anniversary Silver Acrylic Topper", rating: 4.8, reviews: 88, price: 149, image: "nltc_prod_balloon_heartfoil.png", popularRank: 3 },
        { id: "to3", name: "Glitter Number 1 Cake Topper (Gold)", rating: 4.7, reviews: 63, price: 99, image: "nltc_prod_balloon_num1foil.png", popularRank: 4 },
        { id: "to4", name: "Baby Shower Pastel Theme Cake Toppers", rating: 4.6, reviews: 74, price: 129, image: "nltc_prod_balloon_pastel.png", popularRank: 5 },
        { id: "to5", name: "Cake Doll Princess Theme Decor topper", rating: 4.8, reviews: 52, price: 249, image: "cardtoppers.png", popularRank: 2 },
        { id: "to6", name: "Multicolor Balloon Cloud Cake Topper Mini", rating: 4.5, reviews: 97, price: 119, image: "nltc_prod_balloon_hbfoil.png", popularRank: 6 }
    ],
    "combos": [
        { id: "co1", name: "All-in-One Gold & Black Birthday Combo Set", rating: 4.9, reviews: 188, price: 499, image: "nltc_prod_balloon_redblack.png", popularRank: 1 },
        { id: "co2", name: "Pastel Pink & Silver Anniversary Combo Set", rating: 4.8, reviews: 115, price: 499, image: "nltc_prod_balloon_rosegoldchrome.png", popularRank: 2 },
        { id: "co3", name: "Baby Shower Complete Balloon Garland Combo Kit", rating: 4.7, reviews: 94, price: 399, image: "nltc_prod_balloon_pastel.png", popularRank: 3 },
        { id: "co4", name: "Welcome Baby homecoming complete combo box", rating: 4.6, reviews: 72, price: 349, image: "nltc_prod_balloon_smiley.png", popularRank: 4 },
        { id: "co5", name: "Traditional Haldi Marigold backdrop combo set", rating: 4.5, reviews: 63, price: 499, image: "nltc_prod_balloon_goldchrome.png", popularRank: 5 },
        { id: "co6", name: "Mehndi Ceremony Garland & Backdrop Combo Kit", rating: 4.4, reviews: 39, price: 499, image: "nltc_prod_balloon_redblack.png", popularRank: 6 }
    ],
    "manymore": [
        { id: "m1", name: "Gold Foil Fringe Metallic Curtains (Pack of 2)", rating: 4.8, reviews: 204, price: 199, image: "banner.png", popularRank: 1 },
        { id: "m2", name: "Faux Decorative Cake Balls (Pack of 20)", rating: 4.6, reviews: 79, price: 149, image: "cardtoppers.png", popularRank: 2 },
        { id: "m3", name: "Fairy Lights LED String Lights (Warm White, 20Ft)", rating: 4.9, reviews: 124, price: 149, image: "nltc_prod_balloon_goldchrome.png", popularRank: 3 },
        { id: "m4", name: "Balloon Glue Dots & Arch Strip Tape Set", rating: 4.7, reviews: 156, price: 99, image: "nltc_prod_balloon_confetti.png", popularRank: 4 },
        { id: "m5", name: "Double Action Balloon Hand Pump (Fast Air)", rating: 4.5, reviews: 88, price: 129, image: "cardpoppers.png", popularRank: 5 },
        { id: "m6", name: "Snow Spray & Party String Spray (Pack of 2)", rating: 4.4, reviews: 67, price: 119, image: "nltc_prod_balloon_pastel.png", popularRank: 6 }
    ]
};

// Main DOM Content Loader
document.addEventListener("DOMContentLoaded", () => {
    // 1. Get Category from URL
    const urlParams = new URLSearchParams(window.location.search);
    let category = urlParams.get("category");

    // Standardize to lowercase slug
    if (category) {
        category = category.toLowerCase().trim();
    }

    // Validation & Fallback
    if (!category || !categoriesData[category]) {
        category = "balloons"; // Default to balloons
    }

    const currentCatInfo = categoriesData[category];
    let currentProducts = [...productsData[category]];

    // 2. Render Static Layout Elements
    // Update breadcrumb
    const breadcrumbCategory = document.getElementById("breadcrumb-category");
    if (breadcrumbCategory) {
        breadcrumbCategory.textContent = currentCatInfo.title;
        breadcrumbCategory.href = `products.html?category=${category}`;
    }

    // Update Headings
    const categoryHeading = document.getElementById("category-heading");
    if (categoryHeading) {
        categoryHeading.innerHTML = `${currentCatInfo.title} <span class="category-emoji">${currentCatInfo.emoji}</span>`;
    }

    const categoryDescription = document.getElementById("category-description");
    if (categoryDescription) {
        categoryDescription.textContent = currentCatInfo.description;
    }

    // Update Banner
    const promoBanner = document.getElementById("promo-banner");
    if (promoBanner) {
        promoBanner.style.backgroundImage = `url('${currentCatInfo.bannerBg}')`;
    }

    const bannerTitle = document.getElementById("banner-title");
    if (bannerTitle) {
        bannerTitle.textContent = currentCatInfo.bannerTitle;
    }

    const bannerSubtitle = document.getElementById("banner-subtitle");
    if (bannerSubtitle) {
        bannerSubtitle.textContent = currentCatInfo.bannerSubtitle;
    }

    const bannerBadgesContainer = document.getElementById("banner-badges-container");
    if (bannerBadgesContainer) {
        bannerBadgesContainer.innerHTML = currentCatInfo.bannerBadges.map(badge => `
            <div class="banner-badge">
                <i class="fa-solid ${badge.icon}"></i>
                <span>${badge.text}</span>
            </div>
        `).join('');
    }

    // Update Bottom Explore Buttons
    const exploreTitle = document.getElementById("explore-title");
    if (exploreTitle) {
        exploreTitle.textContent = `Explore More ${currentCatInfo.title} Types`;
    }

    const exploreButtonsContainer = document.getElementById("explore-buttons-container");
    if (exploreButtonsContainer) {
        exploreButtonsContainer.innerHTML = currentCatInfo.exploreTypes.map((type, idx) => {
            // Give each type a distinct icon for UI richness
            let iconClass = "fa-star";
            if (category === "balloons") {
                if (idx === 0) iconClass = "fa-circle";
                else if (idx === 1) iconClass = "fa-gem";
                else if (idx === 2) iconClass = "fa-ghost";
                else if (idx === 3) iconClass = "fa-lightbulb";
                else if (idx === 4) iconClass = "fa-child-reaching";
                else iconClass = "fa-gift";
            } else if (category === "candles") {
                iconClass = "fa-cake-candles";
            } else if (category === "birthday-caps") {
                iconClass = "fa-hat-cowboy";
            } else if (category === "party-poppers") {
                iconClass = "fa-burst";
            } else if (category === "sashes") {
                iconClass = "fa-medal";
            } else if (category === "banners") {
                iconClass = "fa-flag";
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
            productGrid.innerHTML = `<div class="no-products">No products found in this category.</div>`;
            return;
        }

        productGrid.innerHTML = productsList.map(prod => {
            // Generate Stars markup
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

    // Active Category Underline/Highlight in Nav-Menu (Visual Linkage)
    const navItems = document.querySelectorAll(".nav-menu li");
    navItems.forEach(item => {
        const itemText = item.textContent.replace("New", "").trim().toLowerCase();
        // Match with category keys
        let matched = false;
        if (category === "balloons" && itemText === "balloons") matched = true;
        if (category === "party-poppers" && itemText === "party poppers") matched = true;
        if (category === "candles" && itemText === "candles") matched = true;
        if (category === "birthday-caps" && itemText === "birthday caps") matched = true;
        if (category === "sashes" && itemText === "sashes") matched = true;
        if (category === "banners" && itemText === "banners") matched = true;

        if (matched) {
            item.style.color = "red";
            item.style.borderBottom = "2px solid red";
            item.style.paddingBottom = "5px";
        }
        
        // Add click handler to nav items to redirect to products page
        item.style.cursor = "pointer";
        item.onclick = function() {
            let catSlug = "balloons";
            if (itemText === "balloons") catSlug = "balloons";
            else if (itemText === "party poppers") catSlug = "party-poppers";
            else if (itemText === "candles") catSlug = "candles";
            else if (itemText === "birthday caps") catSlug = "birthday-caps";
            else if (itemText === "sashes") catSlug = "sashes";
            else if (itemText === "banners") catSlug = "banners";
            window.location.href = `products.html?category=${catSlug}`;
        };
    });

    // Make Homepage Search Input Redirect Functional inside the products page too!
    const searchBarInput = document.querySelector(".search-bar input");
    if (searchBarInput) {
        searchBarInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                const query = searchBarInput.value.toLowerCase().trim();
                handleSearchRedirect(query);
            }
        });
    }

    const searchIcon = document.querySelector(".search-bar i");
    if (searchIcon && searchBarInput) {
        searchIcon.style.cursor = "pointer";
        searchIcon.onclick = () => {
            const query = searchBarInput.value.toLowerCase().trim();
            handleSearchRedirect(query);
        };
    }
});

// Shared helper to handle category routing based on text query
function handleSearchRedirect(query) {
    if (!query) return;

    let targetCategory = "balloons"; // Default fallback
    
    if (query.includes("balloon")) {
        targetCategory = "balloons";
    } else if (query.includes("candle") || query.includes("anarcandle")) {
        targetCategory = "candles";
    } else if (query.includes("cap") || query.includes("hat")) {
        targetCategory = "birthday-caps";
    } else if (query.includes("popper")) {
        targetCategory = "party-poppers";
    } else if (query.includes("sash")) {
        targetCategory = "sashes";
    } else if (query.includes("banner") || query.includes("garland") || query.includes("bunting")) {
        targetCategory = "banners";
    } else {
        // Broad search mapping
        const keys = Object.keys(categoriesData);
        for (const k of keys) {
            if (k.replace("-", " ").includes(query) || query.includes(k.replace("-", " "))) {
                targetCategory = k;
                break;
            }
        }
    }

    window.location.href = `products.html?category=${targetCategory}`;
}

// Micro-interaction handlers
function toggleWishlist(productId, event) {
    if (event) event.stopPropagation();
    const card = document.getElementById(`card-${productId}`);
    if (!card) return;

    const wishlistIcon = card.querySelector(".wishlist-icon");
    const wishlistIconSmall = card.querySelector(".wishlist-btn-small i");

    if (wishlistIcon.classList.contains("fa-regular")) {
        // Toggle Active state
        wishlistIcon.classList.remove("fa-regular");
        wishlistIcon.classList.add("fa-solid");
        wishlistIcon.style.color = "red";
        if (wishlistIconSmall) {
            wishlistIconSmall.classList.remove("fa-regular");
            wishlistIconSmall.classList.add("fa-solid");
            wishlistIconSmall.style.color = "red";
        }
        
        // Show subtle notification
        showToast("Added to Wishlist! ❤️");
    } else {
        // Remove Active state
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
    
    // Animate the button clicked
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
    // Here we can filter productsData locally or just scroll back to view items.
    // In a real database scenario, this would trigger an API query for subclass.
    const productCards = document.querySelectorAll(".product-card");
    productCards.forEach((card, index) => {
        card.style.opacity = "0.3";
        setTimeout(() => {
            card.style.opacity = "1";
            // Randomly re-arrange some visual order to simulate filter action
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
