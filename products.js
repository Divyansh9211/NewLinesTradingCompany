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
        {
            "id": "b1",
            "name": "Red Metallic Balloons (50 Pcs × 10 Packs)",
            "rating": 5,
            "reviews": 124,
            "price": 199,
            "image": "redinflated.png",
            "popularRank": 1
        },
        {
            "id": "b2",
            "name": "Dark-Blue Metallic Balloons (50 Pcs × 10 Packs)",
            "rating": 4.5,
            "reviews": 98,
            "price": 199,
            "image": "darkblueinflated.png",
            "popularRank": 5
        },
        {
            "id": "b3",
            "name": "Sky-Blue Metallic Balloons (50 Pcs × 10 Packs)",
            "rating": 5,
            "reviews": 87,
            "price": 249,
            "image": "skyblueinflated.png",
            "popularRank": 2
        },
        {
            "id": "b4",
            "name": "Golden Metallic Balloons (50 Pcs × 10 Packs)",
            "rating": 4.5,
            "reviews": 156,
            "price": 149,
            "image": "goldeninflated.png",
            "popularRank": 3
        },
        {
            "id": "b5",
            "name": "White Metallic Balloons (50 Pcs × 10 Packs)",
            "rating": 4.5,
            "reviews": 64,
            "price": 149,
            "image": "whiteinflated.png",
            "popularRank": 8
        },
        {
            "id": "b6",
            "name": "Pink Metallic Balloons (50 Pcs × 10 Packs)",
            "rating": 5,
            "reviews": 112,
            "price": 149,
            "image": "pinkinflated.png",
            "popularRank": 4
        },
        {
            "id": "b7",
            "name": "Yellow Metallic Balloons (50 Pcs × 10 Packs)",
            "rating": 4,
            "reviews": 73,
            "price": 149,
            "image": "yellowinflated.png",
            "popularRank": 9
        },
        {
            "id": "b8",
            "name": "Black Metallic Balloons (50 Pcs × 10 Packs)",
            "rating": 4.5,
            "reviews": 91,
            "price": 249,
            "image": "blackinflated.png",
            "popularRank": 6
        },
        {
            "id": "b9",
            "name": "Grey Metallic Balloons (50 Pcs × 10 Packs)",
            "rating": 4.5,
            "reviews": 68,
            "price": 199,
            "image": "greyinflated.png",
            "popularRank": 10
        },
        {
            "id": "b10",
            "name": "Green Metallic Balloons (50 Pcs × 10 Packs)",
            "rating": 4.5,
            "reviews": 52,
            "price": 149,
            "image": "greeninflated.png",
            "popularRank": 7
        },
        {
            "id": "b11",
            "name": "Orange Metallic Balloons (50 Pcs × 10 Packs)",
            "rating": 4,
            "reviews": 38,
            "price": 119,
            "image": "orangeinflated.png",
            "popularRank": 12
        },
        {
            "id": "b12",
            "name": "Mix Metallic Balloons (50 Pcs × 10 Packs)",
            "rating": 4.5,
            "reviews": 47,
            "price": 249,
            "image": "mixinflated.png",
            "popularRank": 11
        },
        {
            "id": "b13",
            "name": "Purple Metallic Balloons (50 Pcs × 10 Packs)",
            "rating": 5,
            "reviews": 88,
            "price": 199,
            "image": "purpleinflated.png",
            "popularRank": 13
        },
        {
            "id": "b14",
            "name": "Golden-Black Happy Birthday Foil Balloon (10 Pack Bundle | 13 Letters per Pack)",
            "rating": 4.5,
            "reviews": 110,
            "price": 199,
            "image": "hbdgoldenblackinflated.png",
            "popularRank": 14
        },
        {
            "id": "b15",
            "name": "Golden Happy Birthday Foil Balloon (10 Pack Bundle | 13 Letters per Pack)",
            "rating": 5,
            "reviews": 145,
            "price": 249,
            "image": "hbdgoldeninflated.png",
            "popularRank": 15
        },
        {
            "id": "b16",
            "name": "Pink Happy Birthday Foil Balloon (10 Pack Bundle | 13 Letters per Pack)",
            "rating": 4.5,
            "reviews": 62,
            "price": 189,
            "image": "hbdpinkinflated.png",
            "popularRank": 16
        },
        {
            "id": "b17",
            "name": "Rose-Gold Happy Birthday Foil Balloon (10 Pack Bundle | 13 Letters per Pack)",
            "rating": 4.5,
            "reviews": 54,
            "price": 179,
            "image": "hbdrosegoldinflated.png",
            "popularRank": 17
        },
        {
            "id": "b18",
            "name": "Mix Happy Birthday Foil Balloon (10 Pack Bundle | 13 Letters per Pack)",
            "rating": 5,
            "reviews": 130,
            "price": 199,
            "image": "hbdmixinflated.png",
            "popularRank": 18
        },
        {
            "id": "b19",
            "name": "Silver Happy Birthday Foil Balloon (10 Pack Bundle | 13 Letters per Pack)",
            "rating": 4.5,
            "reviews": 78,
            "price": 199,
            "image": "hbdsilverinflated.png",
            "popularRank": 19
        },
        {
            "id": "b20",
            "name": "Blue Happy Birthday Foil Balloon (10 Pack Bundle | 13 Letters per Pack)",
            "rating": 5,
            "reviews": 92,
            "price": 189,
            "image": "hbdblueinflated.png",
            "popularRank": 20
        },
        {
            "id": "b21",
            "name": "Red Happy Birthday Foil Balloon (10 Pack Bundle | 13 Letters per Pack)",
            "rating": 5,
            "reviews": 165,
            "price": 199,
            "image": "hbdredinflated.png",
            "popularRank": 21
        },
        {
            "id": "b22",
            "name": "Red-Black Happy Birthday Foil Balloon (10 Pack Bundle | 13 Letters per Pack)",
            "rating": 4.5,
            "reviews": 84,
            "price": 219,
            "image": "hbdredblackinflated.png",
            "popularRank": 22
        },
        {
            "id": "b23",
            "name": "Black Happy Birthday Foil Balloon (10 Pack Bundle | 13 Letters per Pack)",
            "rating": 4.5,
            "reviews": 69,
            "price": 229,
            "image": "hbdblackinflated.png",
            "popularRank": 23
        },
        {
            "id": "b24",
            "name": "Mix Metallic Balloons (25 Pcs × 10 Packs)",
            "rating": 5,
            "reviews": 178,
            "price": 249,
            "image": "mixinflated.png",
            "popularRank": 24
        },
        {
            "id": "b25",
            "name": "Golden Metallic Balloons (25 Pcs × 10 Packs)",
            "rating": 5,
            "reviews": 195,
            "price": 279,
            "image": "goldeninflated.png",
            "popularRank": 25
        },
        {
            "id": "b26",
            "name": "Yellow Metallic Balloons (25 Pcs × 10 Packs))",
            "rating": 4.5,
            "reviews": 59,
            "price": 179,
            "image": "yellowinflated.png",
            "popularRank": 26
        },
        {
            "id": "b27",
            "name": "Dark-Blue Metallic Balloons (25 Pcs × 10 Packs)",
            "rating": 4.5,
            "reviews": 83,
            "price": 199,
            "image": "darkblueinflated.png",
            "popularRank": 27
        },
        {
            "id": "b28",
            "name": "Green Metallic Balloons (25 Pcs × 10 Packs)",
            "rating": 4.5,
            "reviews": 71,
            "price": 219,
            "image": "greeninflated.png",
            "popularRank": 28
        },
        {
            "id": "b29",
            "name": "Orange Metallic Balloons (25 Pcs × 10 Packs)",
            "rating": 4,
            "reviews": 45,
            "price": 169,
            "image": "orangeinflated.png",
            "popularRank": 29
        },
        {
            "id": "b30",
            "name": "Pink Metallic Balloons (25 Pcs × 10 Packs)",
            "rating": 5,
            "reviews": 142,
            "price": 199,
            "image": "pinkinflated.png",
            "popularRank": 30
        },
        {
            "id": "b31",
            "name": "Sky-Blue Metallic Balloons (25 Pcs × 10 Packs)",
            "rating": 4.5,
            "reviews": 96,
            "price": 199,
            "image": "skyblueinflated.png",
            "popularRank": 31
        },
        {
            "id": "b32",
            "name": "White Metallic Balloons (25 Pcs × 10 Packs)",
            "rating": 5,
            "reviews": 115,
            "price": 189,
            "image": "whiteinflated.png",
            "popularRank": 32
        },
        {
            "id": "b33",
            "name": "Red Metallic Balloons (25 Pcs × 10 Packs)",
            "rating": 5,
            "reviews": 153,
            "price": 199,
            "image": "redinflated.png",
            "popularRank": 33
        },
        {
            "id": "b34",
            "name": "Black Metallic Balloons (25 Pcs × 10 Packs)",
            "rating": 4.5,
            "reviews": 89,
            "price": 229,
            "image": "blackinflated.png",
            "popularRank": 34
        },
        {
            "id": "b35",
            "name": "Purple Metallic Balloons (25 Pcs × 10 Packs)",
            "rating": 5,
            "reviews": 104,
            "price": 219,
            "image": "purpleinflated.png",
            "popularRank": 35
        },
        {
            "id": "b36",
            "name": "Silver Happy Anniversary Foil Balloon (10 Pack Bundle | 16 Letters per Pack)",
            "rating": 5,
            "reviews": 160,
            "price": 269,
            "image": "annsilverinflated.png",
            "popularRank": 36
        },
        {
            "id": "b37",
            "name": "Black Happy Anniversary Foil Balloon (10 Pack Bundle | 16 Letters per Pack)",
            "rating": 5,
            "reviews": 137,
            "price": 269,
            "image": "annblackinflated.png",
            "popularRank": 37
        },
        {
            "id": "b38",
            "name": "Red Happy Anniversary Foil Balloon (10 Pack Bundle | 16 Letters per Pack)",
            "rating": 4.5,
            "reviews": 88,
            "price": 179,
            "image": "annredinflated.png",
            "popularRank": 38
        },
        {
            "id": "b39",
            "name": "Pink Happy Anniversary Foil Balloon (10 Pack Bundle | 16 Letters per Pack)",
            "rating": 4.5,
            "reviews": 76,
            "price": 199,
            "image": "annpinkinflated.png",
            "popularRank": 39
        },
        {
            "id": "b40",
            "name": "Golden Happy Anniversary Foil Balloon (10 Pack Bundle | 16 Letters per Pack)",
            "rating": 4.5,
            "reviews": 63,
            "price": 209,
            "image": "anngoldeninflated.png",
            "popularRank": 40
        },
        {
            "id": "b41",
            "name": "Golden-Black Happy Anniversary Foil Balloon (10 Pack Bundle | 16 Letters per Pack)",
            "rating": 5,
            "reviews": 121,
            "price": 199,
            "image": "anngoldenblackinflated.png",
            "popularRank": 41
        },
        {
            "id": "b42",
            "name": "Mix Happy Anniversary Foil Balloon (10 Pack Bundle | 16 Letters per Pack)",
            "rating": 5,
            "reviews": 182,
            "price": 289,
            "image": "annmixinflated.png",
            "popularRank": 42
        },
        {
            "id": "b43",
            "name": "Golden Number 0 Foil Balloon (10 Packs | 1 Pc/Pack)",
            "rating": 5,
            "reviews": 114,
            "price": 299,
            "image": "golden0inflated.png",
            "popularRank": 43
        },
        {
            "id": "b44",
            "name": "Golden Number 1 Foil Balloon (10 Packs | 1 Pc/Pack)",
            "rating": 5,
            "reviews": 148,
            "price": 349,
            "image": "golden1inflated.png",
            "popularRank": 44
        },
        {
            "id": "b45",
            "name": "Golden Number 2 Foil Balloon (10 Packs | 1 Pc/Pack)",
            "rating": 4.5,
            "reviews": 82,
            "price": 289,
            "image": "golden2inflated.png",
            "popularRank": 45
        },
        {
            "id": "b46",
            "name": "Golden Number 3 Foil Balloon (10 Packs | 1 Pc/Pack)",
            "rating": 4.5,
            "reviews": 67,
            "price": 279,
            "image": "golden3inflated.png",
            "popularRank": 46
        },
        {
            "id": "b47",
            "name": "Golden Number 4 Foil Balloon (10 Packs | 1 Pc/Pack)",
            "rating": 5,
            "reviews": 135,
            "price": 299,
            "image": "golden4inflated.png",
            "popularRank": 47
        },
        {
            "id": "b48",
            "name": "Golden Number 5 Foil Balloon (10 Packs | 1 Pc/Pack)",
            "rating": 4.5,
            "reviews": 94,
            "price": 299,
            "image": "golden5inflated.png",
            "popularRank": 48
        },
        {
            "id": "b49",
            "name": "Golden Number 6 Foil Balloon (10 Packs | 1 Pc/Pack)",
            "rating": 5,
            "reviews": 108,
            "price": 289,
            "image": "golden6inflated.png",
            "popularRank": 49
        },
        {
            "id": "b50",
            "name": "Golden Number 7 Foil Balloon (10 Packs | 1 Pc/Pack)",
            "rating": 5,
            "reviews": 172,
            "price": 249,
            "image": "golden7inflated.png",
            "popularRank": 50
        },
        {
            "id": "b51",
            "name": "Golden Number 8 Foil Balloon (10 Packs | 1 Pc/Pack)",
            "rating": 5,
            "reviews": 189,
            "price": 249,
            "image": "golden8inflated.png",
            "popularRank": 51
        },
        {
            "id": "b52",
            "name": "Golden Number 9 Foil Balloon (10 Packs | 1 Pc/Pack)",
            "rating": 5,
            "reviews": 156,
            "price": 199,
            "image": "golden9inflated.png",
            "popularRank": 52
        },
        {
            "id": "b53",
            "name": "Rose Gold Chrome Latex Balloons (Pack of 50)",
            "rating": 5,
            "reviews": 141,
            "price": 269,
            "image": "silver0inflated.png",
            "popularRank": 53
        },
        {
            "id": "b54",
            "name": "Confetti Sparkle Latex Balloons (Pack of 10)",
            "rating": 4.5,
            "reviews": 95,
            "price": 179,
            "image": "silver1inflated.png",
            "popularRank": 54
        },
        {
            "id": "b55",
            "name": "Golden Star Foil Balloons (18 inch, Pack of 5)",
            "rating": 4.5,
            "reviews": 112,
            "price": 199,
            "image": "silver2inflated.png",
            "popularRank": 55
        },
        {
            "id": "b56",
            "name": "Romantic Red Heart Foil Balloon (18 inch)",
            "rating": 5,
            "reviews": 168,
            "price": 149,
            "image": "silver3inflated.png",
            "popularRank": 56
        },
        {
            "id": "b57",
            "name": "Number 1 Golden Foil Balloon (32 inch)",
            "rating": 5,
            "reviews": 124,
            "price": 149,
            "image": "silver4inflated.png",
            "popularRank": 57
        },
        {
            "id": "b58",
            "name": "Happy Birthday Printed Foil Balloon (18 inch)",
            "rating": 4.5,
            "reviews": 143,
            "price": 149,
            "image": "silver5inflated.png",
            "popularRank": 58
        },
        {
            "id": "b59",
            "name": "Yellow Emoji Smiley Face Balloons (Pack of 10)",
            "rating": 4.5,
            "reviews": 87,
            "price": 129,
            "image": "silver6inflated.png",
            "popularRank": 59
        },
        {
            "id": "b60",
            "name": "Red Inflated Latex Party Balloons (100 Pcs Bulk)",
            "rating": 5,
            "reviews": 198,
            "price": 349,
            "image": "silver7inflated.png",
            "popularRank": 60
        },
        {
            "id": "b61",
            "name": "Dark Blue Inflated Latex Party Balloons (100 Pcs Bulk)",
            "rating": 4.5,
            "reviews": 105,
            "price": 349,
            "image": "silver8inflated.png",
            "popularRank": 61
        },
        {
            "id": "b62",
            "name": "Rose Gold Cake Candles – Straight (6 pcs)",
            "rating": 5,
            "reviews": 118,
            "price": 349,
            "image": "silver9inflated.png",
            "popularRank": 62
        },
        {
            "id": "b63",
            "name": "Golden Cake Candles – Straight (6 pcs)",
            "rating": 5,
            "reviews": 176,
            "price": 399,
            "image": "goldenstraightcandle.png",
            "popularRank": 63
        },
        {
            "id": "b64",
            "name": "Blue Cake Candles – Straight (6 pcs))",
            "rating": 5,
            "reviews": 132,
            "price": 339,
            "image": "bluestraightcandle.png",
            "popularRank": 64
        },
        {
            "id": "b65",
            "name": "Pink Cake Candles – Straight (6 pcs)",
            "rating": 5,
            "reviews": 154,
            "price": 349,
            "image": "pinkstraightcandle.png",
            "popularRank": 65
        },
        {
            "id": "b66",
            "name": "Silver Cake Candles – Straight (6 pcs)",
            "rating": 4.5,
            "reviews": 79,
            "price": 329,
            "image": "silverstraightcandle.png",
            "popularRank": 66
        },
        {
            "id": "b67",
            "name": "Rose Gold Cake Candles – Straight (6 pcs)",
            "rating": 4.5,
            "reviews": 92,
            "price": 379,
            "image": "rosegoldstraightcandle.png",
            "popularRank": 67
        },
        {
            "id": "b68",
            "name": "Grey Metallic Inflated Party Balloons (100 Pcs Bulk)",
            "rating": 4.5,
            "reviews": 81,
            "price": 359,
            "image": "greyinflated.png",
            "popularRank": 68
        },
        {
            "id": "b69",
            "name": "Green Metallic Inflated Party Balloons (100 Pcs Bulk)",
            "rating": 4.5,
            "reviews": 88,
            "price": 349,
            "image": "greeninflated.png",
            "popularRank": 69
        },
        {
            "id": "b70",
            "name": "Orange Inflated Latex Party Balloons (100 Pcs Bulk)",
            "rating": 4,
            "reviews": 64,
            "price": 319,
            "image": "orangeinflated.png",
            "popularRank": 70
        },
        {
            "id": "b71",
            "name": "Multicolor Mix Inflated Party Balloons (100 Pcs Bulk)",
            "rating": 5,
            "reviews": 210,
            "price": 399,
            "image": "mixinflated.png",
            "popularRank": 71
        },
        {
            "id": "b72",
            "name": "Purple Inflated Latex Party Balloons (100 Pcs Bulk)",
            "rating": 5,
            "reviews": 97,
            "price": 349,
            "image": "purpleinflated.png",
            "popularRank": 72
        },
        {
            "id": "b73",
            "name": "Golden-Black HBD Letter Foil Balloons (20 Pack Wholesale)",
            "rating": 5,
            "reviews": 167,
            "price": 389,
            "image": "hbdgoldenblackinflated.png",
            "popularRank": 73
        },
        {
            "id": "b74",
            "name": "Golden HBD Letter Foil Balloons (20 Pack Wholesale)",
            "rating": 5,
            "reviews": 185,
            "price": 399,
            "image": "hbdgoldeninflated.png",
            "popularRank": 74
        },
        {
            "id": "b75",
            "name": "Pink HBD Letter Foil Balloons (20 Pack Wholesale)",
            "rating": 4.5,
            "reviews": 129,
            "price": 369,
            "image": "hbdpinkinflated.png",
            "popularRank": 75
        },
        {
            "id": "b76",
            "name": "Rose Gold HBD Letter Foil Balloons (20 Pack Wholesale)",
            "rating": 5,
            "reviews": 144,
            "price": 379,
            "image": "hbdrosegoldinflated.png",
            "popularRank": 76
        },
        {
            "id": "b77",
            "name": "Multicolor Mix HBD Letter Foil Balloons (20 Pack Wholesale)",
            "rating": 5,
            "reviews": 192,
            "price": 399,
            "image": "hbdmixinflated.png",
            "popularRank": 77
        },
        {
            "id": "b78",
            "name": "Silver HBD Letter Foil Balloons (20 Pack Wholesale)",
            "rating": 4.5,
            "reviews": 111,
            "price": 369,
            "image": "hbdsilverinflated.png",
            "popularRank": 78
        },
        {
            "id": "b79",
            "name": "Blue HBD Letter Foil Balloons (20 Pack Wholesale)",
            "rating": 4.5,
            "reviews": 98,
            "price": 369,
            "image": "hbdblueinflated.png",
            "popularRank": 79
        },
        {
            "id": "b80",
            "name": "Red HBD Letter Foil Balloons (20 Pack Wholesale)",
            "rating": 5,
            "reviews": 175,
            "price": 379,
            "image": "hbdredinflated.png",
            "popularRank": 80
        },
        {
            "id": "b81",
            "name": "Red-Black HBD Letter Foil Balloons (20 Pack Wholesale)",
            "rating": 4.5,
            "reviews": 103,
            "price": 389,
            "image": "hbdredblackinflated.png",
            "popularRank": 81
        },
        {
            "id": "b82",
            "name": "Black HBD Letter Foil Balloons (20 Pack Wholesale)",
            "rating": 4.5,
            "reviews": 87,
            "price": 399,
            "image": "hbdblackinflated.png",
            "popularRank": 82
        },
        {
            "id": "b83",
            "name": "Silver Happy Anniversary Foil Balloons (20 Pack Wholesale)",
            "rating": 5,
            "reviews": 146,
            "price": 429,
            "image": "annsilverinflated.png",
            "popularRank": 83
        },
        {
            "id": "b84",
            "name": "Black Happy Anniversary Foil Balloons (20 Pack Wholesale)",
            "rating": 5,
            "reviews": 132,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 84
        },
        {
            "id": "b85",
            "name": "Red Happy Anniversary Foil Balloons (20 Pack Wholesale)",
            "rating": 4.5,
            "reviews": 119,
            "price": 399,
            "image": "annredinflated.png",
            "popularRank": 85
        },
        {
            "id": "b86",
            "name": "Pink Happy Anniversary Foil Balloons (20 Pack Wholesale)",
            "rating": 4.5,
            "reviews": 104,
            "price": 419,
            "image": "annpinkinflated.png",
            "popularRank": 86
        },
        {
            "id": "b87",
            "name": "Golden Happy Anniversary Foil Balloons (20 Pack Wholesale)",
            "rating": 5,
            "reviews": 163,
            "price": 449,
            "image": "anngoldeninflated.png",
            "popularRank": 87
        },
        {
            "id": "b88",
            "name": "Golden-Black Happy Anniversary Foil Balloons (20 Pack Wholesale)",
            "rating": 5,
            "reviews": 151,
            "price": 439,
            "image": "anngoldenblackinflated.png",
            "popularRank": 88
        },
        {
            "id": "b89",
            "name": "Mix Happy Anniversary Foil Balloons (20 Pack Wholesale)",
            "rating": 5,
            "reviews": 205,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 89
        },
        {
            "id": "b90",
            "name": "Dark Blue 50-Pack Metallic Balloon Bundle",
            "rating": 4.5,
            "reviews": 89,
            "price": 219,
            "image": "darkbluepack50.png",
            "popularRank": 90
        },
        {
            "id": "b91",
            "name": "Golden Chrome 50-Pack Metallic Balloon Bundle",
            "rating": 5,
            "reviews": 157,
            "price": 269,
            "image": "goldenpack50.png",
            "popularRank": 91
        },
        {
            "id": "b92",
            "name": "Green 50-Pack Metallic Balloon Bundle",
            "rating": 4.5,
            "reviews": 73,
            "price": 209,
            "image": "greenpack50.png",
            "popularRank": 92
        },
        {
            "id": "b93",
            "name": "Orange 50-Pack Metallic Balloon Bundle",
            "rating": 4,
            "reviews": 58,
            "price": 199,
            "image": "orangepack50.png",
            "popularRank": 93
        },
        {
            "id": "b94",
            "name": "Pink 50-Pack Metallic Balloon Bundle",
            "rating": 5,
            "reviews": 126,
            "price": 219,
            "image": "pinkpack50.png",
            "popularRank": 94
        },
        {
            "id": "b95",
            "name": "Sky Blue 50-Pack Metallic Balloon Bundle",
            "rating": 4.5,
            "reviews": 91,
            "price": 219,
            "image": "skybluepack50.png",
            "popularRank": 95
        },
        {
            "id": "b96",
            "name": "White 50-Pack Metallic Balloon Bundle",
            "rating": 5,
            "reviews": 114,
            "price": 209,
            "image": "whitepack50.png",
            "popularRank": 96
        },
        {
            "id": "b97",
            "name": "Metallic Red Inflated Party Pack (50 Pcs)",
            "rating": 5,
            "reviews": 162,
            "price": 199,
            "image": "redinflated.png",
            "popularRank": 97
        },
        {
            "id": "b98",
            "name": "Metallic Dark Blue Inflated Party Pack (50 Pcs)",
            "rating": 4.5,
            "reviews": 95,
            "price": 199,
            "image": "darkblueinflated.png",
            "popularRank": 98
        },
        {
            "id": "b99",
            "name": "Golden Chrome Inflated Party Pack (50 Pcs)",
            "rating": 5,
            "reviews": 184,
            "price": 249,
            "image": "goldeninflated.png",
            "popularRank": 99
        },
        {
            "id": "b100",
            "name": "Emerald Green Inflated Party Pack (50 Pcs)",
            "rating": 4.5,
            "reviews": 77,
            "price": 219,
            "image": "greeninflated.png",
            "popularRank": 100
        },
        {
            "id": "b101",
            "name": "Neon Orange Inflated Party Pack (50 Pcs)",
            "rating": 4,
            "reviews": 52,
            "price": 189,
            "image": "orangeinflated.png",
            "popularRank": 101
        },
        {
            "id": "b102",
            "name": "Ultimate Rainbow Celebration Mix Inflated Balloons (100 Pcs)",
            "rating": 5,
            "reviews": 228,
            "price": 399,
            "image": "mixinflated.png",
            "popularRank": 102
        }
    ],
    "candles": [
        {
            "id": "c1",
            "name": "Golden Cake Candles – Straight (6 pcs)",
            "rating": 5,
            "reviews": 112,
            "price": 180,
            "image": "goldenstraightcandle.png",
            "popularRank": 1
        },
        {
            "id": "c2",
            "name": "Silver Cake Candles – Straight (6 pcs)",
            "rating": 4.5,
            "reviews": 74,
            "price": 79,
            "image": "silverstraightcandle.png",
            "popularRank": 3
        },
        {
            "id": "c3",
            "name": "Rose Gold Cake Candles – Straight (6 pcs)",
            "rating": 4.8,
            "reviews": 61,
            "price": 120,
            "image": "rosegoldstraightcandle.png",
            "popularRank": 2
        },
        {
            "id": "c4",
            "name": "Pink Cake Candles – Straight (6 pcs)",
            "rating": 4.2,
            "reviews": 48,
            "price": 99,
            "image": "pinkstraightcandle.png",
            "popularRank": 5
        },
        {
            "id": "c5",
            "name": "Blue Cake Candles – Straight (6 pcs)",
            "rating": 4.6,
            "reviews": 85,
            "price": 149,
            "image": "bluestraightcandle.png",
            "popularRank": 4
        },
        {
            "id": "c6",
            "name": "Mix Cake Candles – Straight (6 pcs)",
            "rating": 4.7,
            "reviews": 93,
            "price": 299,
            "image": "mixstraightcandle.png",
            "popularRank": 6
        },
        {
            "id": "c7",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5)",
            "rating": 4.3,
            "reviews": 25,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 7
        },
        {
            "id": "c8",
            "name": "Happy Anniversary Golden Script Foil Banner",
            "rating": 4.6,
            "reviews": 42,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 8
        },
        {
            "id": "c9",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50)",
            "rating": 4.9,
            "reviews": 59,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 9
        },
        {
            "id": "c10",
            "name": "Anniversary LED Heart Fairy Lights (Warm White)",
            "rating": 4.4,
            "reviews": 76,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 10
        },
        {
            "id": "c11",
            "name": "Silver Happy Anniversary Foil Letter Balloons",
            "rating": 4.7,
            "reviews": 93,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 11
        },
        {
            "id": "c12",
            "name": "Black & Gold Anniversary Backdrop Curtain Set",
            "rating": 5,
            "reviews": 110,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 12
        },
        {
            "id": "c13",
            "name": "Golden Anniversary Acrylic Cake Topper",
            "rating": 4.5,
            "reviews": 127,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 13
        },
        {
            "id": "c14",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs)",
            "rating": 4.8,
            "reviews": 144,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 14
        },
        {
            "id": "c15",
            "name": "Champagne Bottle Big Foil Balloon",
            "rating": 4.3,
            "reviews": 161,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 15
        },
        {
            "id": "c16",
            "name": "Anniversary King & Queen Satin Sashes Set",
            "rating": 4.6,
            "reviews": 178,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 16
        },
        {
            "id": "c17",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4)",
            "rating": 4.9,
            "reviews": 195,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 17
        },
        {
            "id": "c18",
            "name": "Together Forever Heart Shape Confetti Popper",
            "rating": 4.4,
            "reviews": 212,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 18
        },
        {
            "id": "c19",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop",
            "rating": 4.7,
            "reviews": 229,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 19
        },
        {
            "id": "c20",
            "name": "Red Rose Petals & Candle Romantic Decor Kit",
            "rating": 5,
            "reviews": 36,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 20
        },
        {
            "id": "c21",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale)",
            "rating": 4.5,
            "reviews": 53,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 21
        },
        {
            "id": "c22",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10)",
            "rating": 4.8,
            "reviews": 70,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 22
        },
        {
            "id": "c23",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10)",
            "rating": 4.3,
            "reviews": 87,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 23
        },
        {
            "id": "c24",
            "name": "Love LED Neon Light Wall Hanging",
            "rating": 4.6,
            "reviews": 104,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 24
        },
        {
            "id": "c25",
            "name": "Anniversary Mixed Color Foil Balloon Set",
            "rating": 4.9,
            "reviews": 121,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 25
        },
        {
            "id": "c26",
            "name": "Bestseller Romantic Anniversary Decoration Set",
            "rating": 4.4,
            "reviews": 138,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 26
        },
        {
            "id": "c27",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 2)",
            "rating": 4.7,
            "reviews": 155,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 27
        },
        {
            "id": "c28",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 2)",
            "rating": 5,
            "reviews": 172,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 28
        },
        {
            "id": "c29",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 2)",
            "rating": 4.5,
            "reviews": 189,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 29
        },
        {
            "id": "c30",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 2)",
            "rating": 4.8,
            "reviews": 206,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 30
        },
        {
            "id": "c31",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 2)",
            "rating": 4.3,
            "reviews": 223,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 31
        },
        {
            "id": "c32",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 2)",
            "rating": 4.6,
            "reviews": 30,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 32
        },
        {
            "id": "c33",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 2)",
            "rating": 4.9,
            "reviews": 47,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 33
        },
        {
            "id": "c34",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 2)",
            "rating": 4.4,
            "reviews": 64,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 34
        },
        {
            "id": "c35",
            "name": "Champagne Bottle Big Foil Balloon (Style 2)",
            "rating": 4.7,
            "reviews": 81,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 35
        },
        {
            "id": "c36",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 2)",
            "rating": 5,
            "reviews": 98,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 36
        },
        {
            "id": "c37",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 2)",
            "rating": 4.5,
            "reviews": 115,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 37
        },
        {
            "id": "c38",
            "name": "Together Forever Heart Shape Confetti Popper (Style 2)",
            "rating": 4.8,
            "reviews": 132,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 38
        },
        {
            "id": "c39",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 2)",
            "rating": 4.3,
            "reviews": 149,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 39
        },
        {
            "id": "c40",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 2)",
            "rating": 4.6,
            "reviews": 166,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 40
        },
        {
            "id": "c41",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 2)",
            "rating": 4.9,
            "reviews": 183,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 41
        },
        {
            "id": "c42",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 2)",
            "rating": 4.4,
            "reviews": 200,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 42
        },
        {
            "id": "c43",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 2)",
            "rating": 4.7,
            "reviews": 217,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 43
        },
        {
            "id": "c44",
            "name": "Love LED Neon Light Wall Hanging (Style 2)",
            "rating": 5,
            "reviews": 234,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 44
        },
        {
            "id": "c45",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 2)",
            "rating": 4.5,
            "reviews": 41,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 45
        },
        {
            "id": "c46",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 2)",
            "rating": 4.8,
            "reviews": 58,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 46
        },
        {
            "id": "c47",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 3)",
            "rating": 4.3,
            "reviews": 75,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 47
        },
        {
            "id": "c48",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 3)",
            "rating": 4.6,
            "reviews": 92,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 48
        },
        {
            "id": "c49",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 3)",
            "rating": 4.9,
            "reviews": 109,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 49
        },
        {
            "id": "c50",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 3)",
            "rating": 4.4,
            "reviews": 126,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 50
        },
        {
            "id": "c51",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 3)",
            "rating": 4.7,
            "reviews": 143,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 51
        },
        {
            "id": "c52",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 3)",
            "rating": 5,
            "reviews": 160,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 52
        },
        {
            "id": "c53",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 3)",
            "rating": 4.5,
            "reviews": 177,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 53
        },
        {
            "id": "c54",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 3)",
            "rating": 4.8,
            "reviews": 194,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 54
        },
        {
            "id": "c55",
            "name": "Champagne Bottle Big Foil Balloon (Style 3)",
            "rating": 4.3,
            "reviews": 211,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 55
        },
        {
            "id": "c56",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 3)",
            "rating": 4.6,
            "reviews": 228,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 56
        },
        {
            "id": "c57",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 3)",
            "rating": 4.9,
            "reviews": 35,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 57
        },
        {
            "id": "c58",
            "name": "Together Forever Heart Shape Confetti Popper (Style 3)",
            "rating": 4.4,
            "reviews": 52,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 58
        },
        {
            "id": "c59",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 3)",
            "rating": 4.7,
            "reviews": 69,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 59
        },
        {
            "id": "c60",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 3)",
            "rating": 5,
            "reviews": 86,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 60
        },
        {
            "id": "c61",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 3)",
            "rating": 4.5,
            "reviews": 103,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 61
        },
        {
            "id": "c62",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 3)",
            "rating": 4.8,
            "reviews": 120,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 62
        },
        {
            "id": "c63",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 3)",
            "rating": 4.3,
            "reviews": 137,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 63
        },
        {
            "id": "c64",
            "name": "Love LED Neon Light Wall Hanging (Style 3)",
            "rating": 4.6,
            "reviews": 154,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 64
        },
        {
            "id": "c65",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 3)",
            "rating": 4.9,
            "reviews": 171,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 65
        },
        {
            "id": "c66",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 3)",
            "rating": 4.4,
            "reviews": 188,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 66
        }
    ],
    "birthday-caps": [
        {
            "id": "h1",
            "name": "Glitter Birthday King & Queen Crowns (Pack of 2)",
            "rating": 5,
            "reviews": 59,
            "price": 199,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 1
        },
        {
            "id": "h2",
            "name": "Polka Dot Birthday Party Hats (Pack of 10)",
            "rating": 4.5,
            "reviews": 83,
            "price": 149,
            "image": "nltc_prod_balloon_pastel.png",
            "popularRank": 2
        },
        {
            "id": "h3",
            "name": "Golden Metallic Cone Hats (Pack of 8)",
            "rating": 4.7,
            "reviews": 42,
            "price": 179,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 3
        },
        {
            "id": "h4",
            "name": "Foil Fringe Party Crowns (Pack of 6)",
            "rating": 4.3,
            "reviews": 29,
            "price": 120,
            "image": "nltc_prod_balloon_starfoil.png",
            "popularRank": 5
        },
        {
            "id": "h5",
            "name": "Cartoon Theme Birthday Caps (Pack of 10)",
            "rating": 4.6,
            "reviews": 67,
            "price": 159,
            "image": "nltc_prod_balloon_smiley.png",
            "popularRank": 4
        },
        {
            "id": "h6",
            "name": "LED Light Up Birthday Crown",
            "rating": 4.8,
            "reviews": 54,
            "price": 249,
            "image": "nltc_prod_balloon_num1foil.png",
            "popularRank": 6
        },
        {
            "id": "h7",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5)",
            "rating": 4.3,
            "reviews": 25,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 7
        },
        {
            "id": "h8",
            "name": "Happy Anniversary Golden Script Foil Banner",
            "rating": 4.6,
            "reviews": 42,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 8
        },
        {
            "id": "h9",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50)",
            "rating": 4.9,
            "reviews": 59,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 9
        },
        {
            "id": "h10",
            "name": "Anniversary LED Heart Fairy Lights (Warm White)",
            "rating": 4.4,
            "reviews": 76,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 10
        },
        {
            "id": "h11",
            "name": "Silver Happy Anniversary Foil Letter Balloons",
            "rating": 4.7,
            "reviews": 93,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 11
        },
        {
            "id": "h12",
            "name": "Black & Gold Anniversary Backdrop Curtain Set",
            "rating": 5,
            "reviews": 110,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 12
        },
        {
            "id": "h13",
            "name": "Golden Anniversary Acrylic Cake Topper",
            "rating": 4.5,
            "reviews": 127,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 13
        },
        {
            "id": "h14",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs)",
            "rating": 4.8,
            "reviews": 144,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 14
        },
        {
            "id": "h15",
            "name": "Champagne Bottle Big Foil Balloon",
            "rating": 4.3,
            "reviews": 161,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 15
        },
        {
            "id": "h16",
            "name": "Anniversary King & Queen Satin Sashes Set",
            "rating": 4.6,
            "reviews": 178,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 16
        },
        {
            "id": "h17",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4)",
            "rating": 4.9,
            "reviews": 195,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 17
        },
        {
            "id": "h18",
            "name": "Together Forever Heart Shape Confetti Popper",
            "rating": 4.4,
            "reviews": 212,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 18
        },
        {
            "id": "h19",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop",
            "rating": 4.7,
            "reviews": 229,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 19
        },
        {
            "id": "h20",
            "name": "Red Rose Petals & Candle Romantic Decor Kit",
            "rating": 5,
            "reviews": 36,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 20
        },
        {
            "id": "h21",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale)",
            "rating": 4.5,
            "reviews": 53,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 21
        },
        {
            "id": "h22",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10)",
            "rating": 4.8,
            "reviews": 70,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 22
        },
        {
            "id": "h23",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10)",
            "rating": 4.3,
            "reviews": 87,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 23
        },
        {
            "id": "h24",
            "name": "Love LED Neon Light Wall Hanging",
            "rating": 4.6,
            "reviews": 104,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 24
        },
        {
            "id": "h25",
            "name": "Anniversary Mixed Color Foil Balloon Set",
            "rating": 4.9,
            "reviews": 121,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 25
        },
        {
            "id": "h26",
            "name": "Bestseller Romantic Anniversary Decoration Set",
            "rating": 4.4,
            "reviews": 138,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 26
        },
        {
            "id": "h27",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 2)",
            "rating": 4.7,
            "reviews": 155,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 27
        },
        {
            "id": "h28",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 2)",
            "rating": 5,
            "reviews": 172,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 28
        },
        {
            "id": "h29",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 2)",
            "rating": 4.5,
            "reviews": 189,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 29
        },
        {
            "id": "h30",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 2)",
            "rating": 4.8,
            "reviews": 206,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 30
        },
        {
            "id": "h31",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 2)",
            "rating": 4.3,
            "reviews": 223,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 31
        },
        {
            "id": "h32",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 2)",
            "rating": 4.6,
            "reviews": 30,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 32
        },
        {
            "id": "h33",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 2)",
            "rating": 4.9,
            "reviews": 47,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 33
        },
        {
            "id": "h34",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 2)",
            "rating": 4.4,
            "reviews": 64,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 34
        },
        {
            "id": "h35",
            "name": "Champagne Bottle Big Foil Balloon (Style 2)",
            "rating": 4.7,
            "reviews": 81,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 35
        },
        {
            "id": "h36",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 2)",
            "rating": 5,
            "reviews": 98,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 36
        },
        {
            "id": "h37",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 2)",
            "rating": 4.5,
            "reviews": 115,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 37
        },
        {
            "id": "h38",
            "name": "Together Forever Heart Shape Confetti Popper (Style 2)",
            "rating": 4.8,
            "reviews": 132,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 38
        },
        {
            "id": "h39",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 2)",
            "rating": 4.3,
            "reviews": 149,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 39
        },
        {
            "id": "h40",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 2)",
            "rating": 4.6,
            "reviews": 166,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 40
        },
        {
            "id": "h41",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 2)",
            "rating": 4.9,
            "reviews": 183,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 41
        },
        {
            "id": "h42",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 2)",
            "rating": 4.4,
            "reviews": 200,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 42
        },
        {
            "id": "h43",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 2)",
            "rating": 4.7,
            "reviews": 217,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 43
        },
        {
            "id": "h44",
            "name": "Love LED Neon Light Wall Hanging (Style 2)",
            "rating": 5,
            "reviews": 234,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 44
        },
        {
            "id": "h45",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 2)",
            "rating": 4.5,
            "reviews": 41,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 45
        },
        {
            "id": "h46",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 2)",
            "rating": 4.8,
            "reviews": 58,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 46
        },
        {
            "id": "h47",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 3)",
            "rating": 4.3,
            "reviews": 75,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 47
        },
        {
            "id": "h48",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 3)",
            "rating": 4.6,
            "reviews": 92,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 48
        },
        {
            "id": "h49",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 3)",
            "rating": 4.9,
            "reviews": 109,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 49
        },
        {
            "id": "h50",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 3)",
            "rating": 4.4,
            "reviews": 126,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 50
        },
        {
            "id": "h51",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 3)",
            "rating": 4.7,
            "reviews": 143,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 51
        },
        {
            "id": "h52",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 3)",
            "rating": 5,
            "reviews": 160,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 52
        },
        {
            "id": "h53",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 3)",
            "rating": 4.5,
            "reviews": 177,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 53
        },
        {
            "id": "h54",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 3)",
            "rating": 4.8,
            "reviews": 194,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 54
        },
        {
            "id": "h55",
            "name": "Champagne Bottle Big Foil Balloon (Style 3)",
            "rating": 4.3,
            "reviews": 211,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 55
        },
        {
            "id": "h56",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 3)",
            "rating": 4.6,
            "reviews": 228,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 56
        },
        {
            "id": "h57",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 3)",
            "rating": 4.9,
            "reviews": 35,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 57
        },
        {
            "id": "h58",
            "name": "Together Forever Heart Shape Confetti Popper (Style 3)",
            "rating": 4.4,
            "reviews": 52,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 58
        },
        {
            "id": "h59",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 3)",
            "rating": 4.7,
            "reviews": 69,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 59
        },
        {
            "id": "h60",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 3)",
            "rating": 5,
            "reviews": 86,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 60
        },
        {
            "id": "h61",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 3)",
            "rating": 4.5,
            "reviews": 103,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 61
        },
        {
            "id": "h62",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 3)",
            "rating": 4.8,
            "reviews": 120,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 62
        },
        {
            "id": "h63",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 3)",
            "rating": 4.3,
            "reviews": 137,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 63
        },
        {
            "id": "h64",
            "name": "Love LED Neon Light Wall Hanging (Style 3)",
            "rating": 4.6,
            "reviews": 154,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 64
        },
        {
            "id": "h65",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 3)",
            "rating": 4.9,
            "reviews": 171,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 65
        },
        {
            "id": "h66",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 3)",
            "rating": 4.4,
            "reviews": 188,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 66
        }
    ],
    "party-poppers": [
        {
            "id": "p1",
            "name": "Large Confetti Party Popper (40 cm)",
            "rating": 4.9,
            "reviews": 142,
            "price": 149,
            "image": "nltc_prod_balloon_confetti.png",
            "popularRank": 1
        },
        {
            "id": "p2",
            "name": "Rose Petals Celebration Popper (30 cm)",
            "rating": 4.8,
            "reviews": 104,
            "price": 169,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 2
        },
        {
            "id": "p3",
            "name": "Golden Foil Streamer Popper (Pack of 2)",
            "rating": 4.7,
            "reviews": 76,
            "price": 199,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 3
        },
        {
            "id": "p4",
            "name": "Mini Desktop Party Poppers (Pack of 6)",
            "rating": 4.4,
            "reviews": 31,
            "price": 129,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 5
        },
        {
            "id": "p5",
            "name": "Multicolor Paper Confetti Popper (Pack of 4)",
            "rating": 4.6,
            "reviews": 92,
            "price": 249,
            "image": "nltc_prod_balloon_pastel.png",
            "popularRank": 4
        },
        {
            "id": "p6",
            "name": "Champagne Bottle Shape Confetti Popper",
            "rating": 4.5,
            "reviews": 58,
            "price": 299,
            "image": "nltc_prod_balloon_hbfoil.png",
            "popularRank": 6
        },
        {
            "id": "p7",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5)",
            "rating": 4.3,
            "reviews": 25,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 7
        },
        {
            "id": "p8",
            "name": "Happy Anniversary Golden Script Foil Banner",
            "rating": 4.6,
            "reviews": 42,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 8
        },
        {
            "id": "p9",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50)",
            "rating": 4.9,
            "reviews": 59,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 9
        },
        {
            "id": "p10",
            "name": "Anniversary LED Heart Fairy Lights (Warm White)",
            "rating": 4.4,
            "reviews": 76,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 10
        },
        {
            "id": "p11",
            "name": "Silver Happy Anniversary Foil Letter Balloons",
            "rating": 4.7,
            "reviews": 93,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 11
        },
        {
            "id": "p12",
            "name": "Black & Gold Anniversary Backdrop Curtain Set",
            "rating": 5,
            "reviews": 110,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 12
        },
        {
            "id": "p13",
            "name": "Golden Anniversary Acrylic Cake Topper",
            "rating": 4.5,
            "reviews": 127,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 13
        },
        {
            "id": "p14",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs)",
            "rating": 4.8,
            "reviews": 144,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 14
        },
        {
            "id": "p15",
            "name": "Champagne Bottle Big Foil Balloon",
            "rating": 4.3,
            "reviews": 161,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 15
        },
        {
            "id": "p16",
            "name": "Anniversary King & Queen Satin Sashes Set",
            "rating": 4.6,
            "reviews": 178,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 16
        },
        {
            "id": "p17",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4)",
            "rating": 4.9,
            "reviews": 195,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 17
        },
        {
            "id": "p18",
            "name": "Together Forever Heart Shape Confetti Popper",
            "rating": 4.4,
            "reviews": 212,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 18
        },
        {
            "id": "p19",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop",
            "rating": 4.7,
            "reviews": 229,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 19
        },
        {
            "id": "p20",
            "name": "Red Rose Petals & Candle Romantic Decor Kit",
            "rating": 5,
            "reviews": 36,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 20
        },
        {
            "id": "p21",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale)",
            "rating": 4.5,
            "reviews": 53,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 21
        },
        {
            "id": "p22",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10)",
            "rating": 4.8,
            "reviews": 70,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 22
        },
        {
            "id": "p23",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10)",
            "rating": 4.3,
            "reviews": 87,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 23
        },
        {
            "id": "p24",
            "name": "Love LED Neon Light Wall Hanging",
            "rating": 4.6,
            "reviews": 104,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 24
        },
        {
            "id": "p25",
            "name": "Anniversary Mixed Color Foil Balloon Set",
            "rating": 4.9,
            "reviews": 121,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 25
        },
        {
            "id": "p26",
            "name": "Bestseller Romantic Anniversary Decoration Set",
            "rating": 4.4,
            "reviews": 138,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 26
        },
        {
            "id": "p27",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 2)",
            "rating": 4.7,
            "reviews": 155,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 27
        },
        {
            "id": "p28",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 2)",
            "rating": 5,
            "reviews": 172,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 28
        },
        {
            "id": "p29",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 2)",
            "rating": 4.5,
            "reviews": 189,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 29
        },
        {
            "id": "p30",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 2)",
            "rating": 4.8,
            "reviews": 206,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 30
        },
        {
            "id": "p31",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 2)",
            "rating": 4.3,
            "reviews": 223,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 31
        },
        {
            "id": "p32",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 2)",
            "rating": 4.6,
            "reviews": 30,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 32
        },
        {
            "id": "p33",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 2)",
            "rating": 4.9,
            "reviews": 47,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 33
        },
        {
            "id": "p34",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 2)",
            "rating": 4.4,
            "reviews": 64,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 34
        },
        {
            "id": "p35",
            "name": "Champagne Bottle Big Foil Balloon (Style 2)",
            "rating": 4.7,
            "reviews": 81,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 35
        },
        {
            "id": "p36",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 2)",
            "rating": 5,
            "reviews": 98,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 36
        },
        {
            "id": "p37",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 2)",
            "rating": 4.5,
            "reviews": 115,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 37
        },
        {
            "id": "p38",
            "name": "Together Forever Heart Shape Confetti Popper (Style 2)",
            "rating": 4.8,
            "reviews": 132,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 38
        },
        {
            "id": "p39",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 2)",
            "rating": 4.3,
            "reviews": 149,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 39
        },
        {
            "id": "p40",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 2)",
            "rating": 4.6,
            "reviews": 166,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 40
        },
        {
            "id": "p41",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 2)",
            "rating": 4.9,
            "reviews": 183,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 41
        },
        {
            "id": "p42",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 2)",
            "rating": 4.4,
            "reviews": 200,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 42
        },
        {
            "id": "p43",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 2)",
            "rating": 4.7,
            "reviews": 217,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 43
        },
        {
            "id": "p44",
            "name": "Love LED Neon Light Wall Hanging (Style 2)",
            "rating": 5,
            "reviews": 234,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 44
        },
        {
            "id": "p45",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 2)",
            "rating": 4.5,
            "reviews": 41,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 45
        },
        {
            "id": "p46",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 2)",
            "rating": 4.8,
            "reviews": 58,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 46
        },
        {
            "id": "p47",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 3)",
            "rating": 4.3,
            "reviews": 75,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 47
        },
        {
            "id": "p48",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 3)",
            "rating": 4.6,
            "reviews": 92,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 48
        },
        {
            "id": "p49",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 3)",
            "rating": 4.9,
            "reviews": 109,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 49
        },
        {
            "id": "p50",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 3)",
            "rating": 4.4,
            "reviews": 126,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 50
        },
        {
            "id": "p51",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 3)",
            "rating": 4.7,
            "reviews": 143,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 51
        },
        {
            "id": "p52",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 3)",
            "rating": 5,
            "reviews": 160,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 52
        },
        {
            "id": "p53",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 3)",
            "rating": 4.5,
            "reviews": 177,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 53
        },
        {
            "id": "p54",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 3)",
            "rating": 4.8,
            "reviews": 194,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 54
        },
        {
            "id": "p55",
            "name": "Champagne Bottle Big Foil Balloon (Style 3)",
            "rating": 4.3,
            "reviews": 211,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 55
        },
        {
            "id": "p56",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 3)",
            "rating": 4.6,
            "reviews": 228,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 56
        },
        {
            "id": "p57",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 3)",
            "rating": 4.9,
            "reviews": 35,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 57
        },
        {
            "id": "p58",
            "name": "Together Forever Heart Shape Confetti Popper (Style 3)",
            "rating": 4.4,
            "reviews": 52,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 58
        },
        {
            "id": "p59",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 3)",
            "rating": 4.7,
            "reviews": 69,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 59
        },
        {
            "id": "p60",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 3)",
            "rating": 5,
            "reviews": 86,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 60
        },
        {
            "id": "p61",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 3)",
            "rating": 4.5,
            "reviews": 103,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 61
        },
        {
            "id": "p62",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 3)",
            "rating": 4.8,
            "reviews": 120,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 62
        },
        {
            "id": "p63",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 3)",
            "rating": 4.3,
            "reviews": 137,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 63
        },
        {
            "id": "p64",
            "name": "Love LED Neon Light Wall Hanging (Style 3)",
            "rating": 4.6,
            "reviews": 154,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 64
        },
        {
            "id": "p65",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 3)",
            "rating": 4.9,
            "reviews": 171,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 65
        },
        {
            "id": "p66",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 3)",
            "rating": 4.4,
            "reviews": 188,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 66
        }
    ],
    "sashes": [
        {
            "id": "s1",
            "name": "Birthday Girl Satin Sash (Glitter Pink)",
            "rating": 5,
            "reviews": 188,
            "price": 149,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 1
        },
        {
            "id": "s2",
            "name": "Birthday Boy Satin Sash (Glitter Blue)",
            "rating": 4.9,
            "reviews": 94,
            "price": 149,
            "image": "nltc_prod_balloon_num1foil.png",
            "popularRank": 2
        },
        {
            "id": "s3",
            "name": "Bride To Be Satin Sash & Tiara Combo",
            "rating": 5,
            "reviews": 115,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 3
        },
        {
            "id": "s4",
            "name": "Groom To Be Black & Gold Satin Sash",
            "rating": 4.7,
            "reviews": 43,
            "price": 149,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 5
        },
        {
            "id": "s5",
            "name": "Sweet 16 Glitter Satin Sash",
            "rating": 4.8,
            "reviews": 72,
            "price": 149,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 4
        },
        {
            "id": "s6",
            "name": "Custom Personalized Satin Sash",
            "rating": 4.6,
            "reviews": 39,
            "price": 249,
            "image": "nltc_prod_balloon_smiley.png",
            "popularRank": 6
        },
        {
            "id": "s7",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5)",
            "rating": 4.3,
            "reviews": 25,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 7
        },
        {
            "id": "s8",
            "name": "Happy Anniversary Golden Script Foil Banner",
            "rating": 4.6,
            "reviews": 42,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 8
        },
        {
            "id": "s9",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50)",
            "rating": 4.9,
            "reviews": 59,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 9
        },
        {
            "id": "s10",
            "name": "Anniversary LED Heart Fairy Lights (Warm White)",
            "rating": 4.4,
            "reviews": 76,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 10
        },
        {
            "id": "s11",
            "name": "Silver Happy Anniversary Foil Letter Balloons",
            "rating": 4.7,
            "reviews": 93,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 11
        },
        {
            "id": "s12",
            "name": "Black & Gold Anniversary Backdrop Curtain Set",
            "rating": 5,
            "reviews": 110,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 12
        },
        {
            "id": "s13",
            "name": "Golden Anniversary Acrylic Cake Topper",
            "rating": 4.5,
            "reviews": 127,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 13
        },
        {
            "id": "s14",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs)",
            "rating": 4.8,
            "reviews": 144,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 14
        },
        {
            "id": "s15",
            "name": "Champagne Bottle Big Foil Balloon",
            "rating": 4.3,
            "reviews": 161,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 15
        },
        {
            "id": "s16",
            "name": "Anniversary King & Queen Satin Sashes Set",
            "rating": 4.6,
            "reviews": 178,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 16
        },
        {
            "id": "s17",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4)",
            "rating": 4.9,
            "reviews": 195,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 17
        },
        {
            "id": "s18",
            "name": "Together Forever Heart Shape Confetti Popper",
            "rating": 4.4,
            "reviews": 212,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 18
        },
        {
            "id": "s19",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop",
            "rating": 4.7,
            "reviews": 229,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 19
        },
        {
            "id": "s20",
            "name": "Red Rose Petals & Candle Romantic Decor Kit",
            "rating": 5,
            "reviews": 36,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 20
        },
        {
            "id": "s21",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale)",
            "rating": 4.5,
            "reviews": 53,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 21
        },
        {
            "id": "s22",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10)",
            "rating": 4.8,
            "reviews": 70,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 22
        },
        {
            "id": "s23",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10)",
            "rating": 4.3,
            "reviews": 87,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 23
        },
        {
            "id": "s24",
            "name": "Love LED Neon Light Wall Hanging",
            "rating": 4.6,
            "reviews": 104,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 24
        },
        {
            "id": "s25",
            "name": "Anniversary Mixed Color Foil Balloon Set",
            "rating": 4.9,
            "reviews": 121,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 25
        },
        {
            "id": "s26",
            "name": "Bestseller Romantic Anniversary Decoration Set",
            "rating": 4.4,
            "reviews": 138,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 26
        },
        {
            "id": "s27",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 2)",
            "rating": 4.7,
            "reviews": 155,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 27
        },
        {
            "id": "s28",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 2)",
            "rating": 5,
            "reviews": 172,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 28
        },
        {
            "id": "s29",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 2)",
            "rating": 4.5,
            "reviews": 189,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 29
        },
        {
            "id": "s30",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 2)",
            "rating": 4.8,
            "reviews": 206,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 30
        },
        {
            "id": "s31",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 2)",
            "rating": 4.3,
            "reviews": 223,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 31
        },
        {
            "id": "s32",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 2)",
            "rating": 4.6,
            "reviews": 30,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 32
        },
        {
            "id": "s33",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 2)",
            "rating": 4.9,
            "reviews": 47,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 33
        },
        {
            "id": "s34",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 2)",
            "rating": 4.4,
            "reviews": 64,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 34
        },
        {
            "id": "s35",
            "name": "Champagne Bottle Big Foil Balloon (Style 2)",
            "rating": 4.7,
            "reviews": 81,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 35
        },
        {
            "id": "s36",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 2)",
            "rating": 5,
            "reviews": 98,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 36
        },
        {
            "id": "s37",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 2)",
            "rating": 4.5,
            "reviews": 115,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 37
        },
        {
            "id": "s38",
            "name": "Together Forever Heart Shape Confetti Popper (Style 2)",
            "rating": 4.8,
            "reviews": 132,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 38
        },
        {
            "id": "s39",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 2)",
            "rating": 4.3,
            "reviews": 149,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 39
        },
        {
            "id": "s40",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 2)",
            "rating": 4.6,
            "reviews": 166,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 40
        },
        {
            "id": "s41",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 2)",
            "rating": 4.9,
            "reviews": 183,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 41
        },
        {
            "id": "s42",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 2)",
            "rating": 4.4,
            "reviews": 200,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 42
        },
        {
            "id": "s43",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 2)",
            "rating": 4.7,
            "reviews": 217,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 43
        },
        {
            "id": "s44",
            "name": "Love LED Neon Light Wall Hanging (Style 2)",
            "rating": 5,
            "reviews": 234,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 44
        },
        {
            "id": "s45",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 2)",
            "rating": 4.5,
            "reviews": 41,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 45
        },
        {
            "id": "s46",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 2)",
            "rating": 4.8,
            "reviews": 58,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 46
        },
        {
            "id": "s47",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 3)",
            "rating": 4.3,
            "reviews": 75,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 47
        },
        {
            "id": "s48",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 3)",
            "rating": 4.6,
            "reviews": 92,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 48
        },
        {
            "id": "s49",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 3)",
            "rating": 4.9,
            "reviews": 109,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 49
        },
        {
            "id": "s50",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 3)",
            "rating": 4.4,
            "reviews": 126,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 50
        },
        {
            "id": "s51",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 3)",
            "rating": 4.7,
            "reviews": 143,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 51
        },
        {
            "id": "s52",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 3)",
            "rating": 5,
            "reviews": 160,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 52
        },
        {
            "id": "s53",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 3)",
            "rating": 4.5,
            "reviews": 177,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 53
        },
        {
            "id": "s54",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 3)",
            "rating": 4.8,
            "reviews": 194,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 54
        },
        {
            "id": "s55",
            "name": "Champagne Bottle Big Foil Balloon (Style 3)",
            "rating": 4.3,
            "reviews": 211,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 55
        },
        {
            "id": "s56",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 3)",
            "rating": 4.6,
            "reviews": 228,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 56
        },
        {
            "id": "s57",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 3)",
            "rating": 4.9,
            "reviews": 35,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 57
        },
        {
            "id": "s58",
            "name": "Together Forever Heart Shape Confetti Popper (Style 3)",
            "rating": 4.4,
            "reviews": 52,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 58
        },
        {
            "id": "s59",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 3)",
            "rating": 4.7,
            "reviews": 69,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 59
        },
        {
            "id": "s60",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 3)",
            "rating": 5,
            "reviews": 86,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 60
        },
        {
            "id": "s61",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 3)",
            "rating": 4.5,
            "reviews": 103,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 61
        },
        {
            "id": "s62",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 3)",
            "rating": 4.8,
            "reviews": 120,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 62
        },
        {
            "id": "s63",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 3)",
            "rating": 4.3,
            "reviews": 137,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 63
        },
        {
            "id": "s64",
            "name": "Love LED Neon Light Wall Hanging (Style 3)",
            "rating": 4.6,
            "reviews": 154,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 64
        },
        {
            "id": "s65",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 3)",
            "rating": 4.9,
            "reviews": 171,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 65
        },
        {
            "id": "s66",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 3)",
            "rating": 4.4,
            "reviews": 188,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 66
        }
    ],
    "banners": [
        {
            "id": "ba1",
            "name": "Gold Foil Happy Birthday Banner (Alphabet Letters)",
            "rating": 4.9,
            "reviews": 201,
            "price": 199,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 1
        },
        {
            "id": "ba2",
            "name": "Happy Anniversary Paper Garland (Black & Gold)",
            "rating": 4.8,
            "reviews": 88,
            "price": 149,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 3
        },
        {
            "id": "ba3",
            "name": "Welcome Home Alphabet Banner",
            "rating": 4.7,
            "reviews": 63,
            "price": 129,
            "image": "nltc_prod_balloon_pastel.png",
            "popularRank": 4
        },
        {
            "id": "ba4",
            "name": "Baby Shower Pastel Bunting Banner",
            "rating": 4.6,
            "reviews": 74,
            "price": 139,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 5
        },
        {
            "id": "ba5",
            "name": "Rainbow Paper Pennant Garland",
            "rating": 4.5,
            "reviews": 97,
            "price": 119,
            "image": "nltc_prod_balloon_hbfoil.png",
            "popularRank": 2
        },
        {
            "id": "ba6",
            "name": "Glitter Star Paper Garland (10 Feet)",
            "rating": 4.6,
            "reviews": 52,
            "price": 99,
            "image": "nltc_prod_balloon_starfoil.png",
            "popularRank": 6
        },
        {
            "id": "ba7",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5)",
            "rating": 4.3,
            "reviews": 25,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 7
        },
        {
            "id": "ba8",
            "name": "Happy Anniversary Golden Script Foil Banner",
            "rating": 4.6,
            "reviews": 42,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 8
        },
        {
            "id": "ba9",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50)",
            "rating": 4.9,
            "reviews": 59,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 9
        },
        {
            "id": "ba10",
            "name": "Anniversary LED Heart Fairy Lights (Warm White)",
            "rating": 4.4,
            "reviews": 76,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 10
        },
        {
            "id": "ba11",
            "name": "Silver Happy Anniversary Foil Letter Balloons",
            "rating": 4.7,
            "reviews": 93,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 11
        },
        {
            "id": "ba12",
            "name": "Black & Gold Anniversary Backdrop Curtain Set",
            "rating": 5,
            "reviews": 110,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 12
        },
        {
            "id": "ba13",
            "name": "Golden Anniversary Acrylic Cake Topper",
            "rating": 4.5,
            "reviews": 127,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 13
        },
        {
            "id": "ba14",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs)",
            "rating": 4.8,
            "reviews": 144,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 14
        },
        {
            "id": "ba15",
            "name": "Champagne Bottle Big Foil Balloon",
            "rating": 4.3,
            "reviews": 161,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 15
        },
        {
            "id": "ba16",
            "name": "Anniversary King & Queen Satin Sashes Set",
            "rating": 4.6,
            "reviews": 178,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 16
        },
        {
            "id": "ba17",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4)",
            "rating": 4.9,
            "reviews": 195,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 17
        },
        {
            "id": "ba18",
            "name": "Together Forever Heart Shape Confetti Popper",
            "rating": 4.4,
            "reviews": 212,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 18
        },
        {
            "id": "ba19",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop",
            "rating": 4.7,
            "reviews": 229,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 19
        },
        {
            "id": "ba20",
            "name": "Red Rose Petals & Candle Romantic Decor Kit",
            "rating": 5,
            "reviews": 36,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 20
        },
        {
            "id": "ba21",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale)",
            "rating": 4.5,
            "reviews": 53,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 21
        },
        {
            "id": "ba22",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10)",
            "rating": 4.8,
            "reviews": 70,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 22
        },
        {
            "id": "ba23",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10)",
            "rating": 4.3,
            "reviews": 87,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 23
        },
        {
            "id": "ba24",
            "name": "Love LED Neon Light Wall Hanging",
            "rating": 4.6,
            "reviews": 104,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 24
        },
        {
            "id": "ba25",
            "name": "Anniversary Mixed Color Foil Balloon Set",
            "rating": 4.9,
            "reviews": 121,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 25
        },
        {
            "id": "ba26",
            "name": "Bestseller Romantic Anniversary Decoration Set",
            "rating": 4.4,
            "reviews": 138,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 26
        },
        {
            "id": "ba27",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 2)",
            "rating": 4.7,
            "reviews": 155,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 27
        },
        {
            "id": "ba28",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 2)",
            "rating": 5,
            "reviews": 172,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 28
        },
        {
            "id": "ba29",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 2)",
            "rating": 4.5,
            "reviews": 189,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 29
        },
        {
            "id": "ba30",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 2)",
            "rating": 4.8,
            "reviews": 206,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 30
        },
        {
            "id": "ba31",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 2)",
            "rating": 4.3,
            "reviews": 223,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 31
        },
        {
            "id": "ba32",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 2)",
            "rating": 4.6,
            "reviews": 30,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 32
        },
        {
            "id": "ba33",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 2)",
            "rating": 4.9,
            "reviews": 47,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 33
        },
        {
            "id": "ba34",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 2)",
            "rating": 4.4,
            "reviews": 64,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 34
        },
        {
            "id": "ba35",
            "name": "Champagne Bottle Big Foil Balloon (Style 2)",
            "rating": 4.7,
            "reviews": 81,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 35
        },
        {
            "id": "ba36",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 2)",
            "rating": 5,
            "reviews": 98,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 36
        },
        {
            "id": "ba37",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 2)",
            "rating": 4.5,
            "reviews": 115,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 37
        },
        {
            "id": "ba38",
            "name": "Together Forever Heart Shape Confetti Popper (Style 2)",
            "rating": 4.8,
            "reviews": 132,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 38
        },
        {
            "id": "ba39",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 2)",
            "rating": 4.3,
            "reviews": 149,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 39
        },
        {
            "id": "ba40",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 2)",
            "rating": 4.6,
            "reviews": 166,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 40
        },
        {
            "id": "ba41",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 2)",
            "rating": 4.9,
            "reviews": 183,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 41
        },
        {
            "id": "ba42",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 2)",
            "rating": 4.4,
            "reviews": 200,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 42
        },
        {
            "id": "ba43",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 2)",
            "rating": 4.7,
            "reviews": 217,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 43
        },
        {
            "id": "ba44",
            "name": "Love LED Neon Light Wall Hanging (Style 2)",
            "rating": 5,
            "reviews": 234,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 44
        },
        {
            "id": "ba45",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 2)",
            "rating": 4.5,
            "reviews": 41,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 45
        },
        {
            "id": "ba46",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 2)",
            "rating": 4.8,
            "reviews": 58,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 46
        },
        {
            "id": "ba47",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 3)",
            "rating": 4.3,
            "reviews": 75,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 47
        },
        {
            "id": "ba48",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 3)",
            "rating": 4.6,
            "reviews": 92,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 48
        },
        {
            "id": "ba49",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 3)",
            "rating": 4.9,
            "reviews": 109,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 49
        },
        {
            "id": "ba50",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 3)",
            "rating": 4.4,
            "reviews": 126,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 50
        },
        {
            "id": "ba51",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 3)",
            "rating": 4.7,
            "reviews": 143,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 51
        },
        {
            "id": "ba52",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 3)",
            "rating": 5,
            "reviews": 160,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 52
        },
        {
            "id": "ba53",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 3)",
            "rating": 4.5,
            "reviews": 177,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 53
        },
        {
            "id": "ba54",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 3)",
            "rating": 4.8,
            "reviews": 194,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 54
        },
        {
            "id": "ba55",
            "name": "Champagne Bottle Big Foil Balloon (Style 3)",
            "rating": 4.3,
            "reviews": 211,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 55
        },
        {
            "id": "ba56",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 3)",
            "rating": 4.6,
            "reviews": 228,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 56
        },
        {
            "id": "ba57",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 3)",
            "rating": 4.9,
            "reviews": 35,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 57
        },
        {
            "id": "ba58",
            "name": "Together Forever Heart Shape Confetti Popper (Style 3)",
            "rating": 4.4,
            "reviews": 52,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 58
        },
        {
            "id": "ba59",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 3)",
            "rating": 4.7,
            "reviews": 69,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 59
        },
        {
            "id": "ba60",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 3)",
            "rating": 5,
            "reviews": 86,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 60
        },
        {
            "id": "ba61",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 3)",
            "rating": 4.5,
            "reviews": 103,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 61
        },
        {
            "id": "ba62",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 3)",
            "rating": 4.8,
            "reviews": 120,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 62
        },
        {
            "id": "ba63",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 3)",
            "rating": 4.3,
            "reviews": 137,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 63
        },
        {
            "id": "ba64",
            "name": "Love LED Neon Light Wall Hanging (Style 3)",
            "rating": 4.6,
            "reviews": 154,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 64
        },
        {
            "id": "ba65",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 3)",
            "rating": 4.9,
            "reviews": 171,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 65
        },
        {
            "id": "ba66",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 3)",
            "rating": 4.4,
            "reviews": 188,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 66
        }
    ],
    "cake-knives": [
        {
            "id": "ck1",
            "name": "Luxury Golden Cake Knife & Server Set",
            "rating": 4.9,
            "reviews": 78,
            "price": 349,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 1
        },
        {
            "id": "ck2",
            "name": "Floral Handle Birthday Cake Knife",
            "rating": 4.6,
            "reviews": 43,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 3
        },
        {
            "id": "ck3",
            "name": "Pastel Theme Cake Cutting Knife",
            "rating": 4.5,
            "reviews": 31,
            "price": 99,
            "image": "nltc_prod_balloon_pastel.png",
            "popularRank": 5
        },
        {
            "id": "ck4",
            "name": "Silver Acrylic Engraved Knife",
            "rating": 4.7,
            "reviews": 52,
            "price": 199,
            "image": "nltc_prod_balloon_starfoil.png",
            "popularRank": 4
        },
        {
            "id": "ck5",
            "name": "Classic Steel Cake Server",
            "rating": 4.8,
            "reviews": 64,
            "price": 179,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 2
        },
        {
            "id": "ck6",
            "name": "Decorated Ribbon Knife (Pack of 2)",
            "rating": 4.3,
            "reviews": 29,
            "price": 119,
            "image": "nltc_prod_balloon_hbfoil.png",
            "popularRank": 6
        },
        {
            "id": "ck7",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5)",
            "rating": 4.3,
            "reviews": 25,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 7
        },
        {
            "id": "ck8",
            "name": "Happy Anniversary Golden Script Foil Banner",
            "rating": 4.6,
            "reviews": 42,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 8
        },
        {
            "id": "ck9",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50)",
            "rating": 4.9,
            "reviews": 59,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 9
        },
        {
            "id": "ck10",
            "name": "Anniversary LED Heart Fairy Lights (Warm White)",
            "rating": 4.4,
            "reviews": 76,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 10
        },
        {
            "id": "ck11",
            "name": "Silver Happy Anniversary Foil Letter Balloons",
            "rating": 4.7,
            "reviews": 93,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 11
        },
        {
            "id": "ck12",
            "name": "Black & Gold Anniversary Backdrop Curtain Set",
            "rating": 5,
            "reviews": 110,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 12
        },
        {
            "id": "ck13",
            "name": "Golden Anniversary Acrylic Cake Topper",
            "rating": 4.5,
            "reviews": 127,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 13
        },
        {
            "id": "ck14",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs)",
            "rating": 4.8,
            "reviews": 144,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 14
        },
        {
            "id": "ck15",
            "name": "Champagne Bottle Big Foil Balloon",
            "rating": 4.3,
            "reviews": 161,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 15
        },
        {
            "id": "ck16",
            "name": "Anniversary King & Queen Satin Sashes Set",
            "rating": 4.6,
            "reviews": 178,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 16
        },
        {
            "id": "ck17",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4)",
            "rating": 4.9,
            "reviews": 195,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 17
        },
        {
            "id": "ck18",
            "name": "Together Forever Heart Shape Confetti Popper",
            "rating": 4.4,
            "reviews": 212,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 18
        },
        {
            "id": "ck19",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop",
            "rating": 4.7,
            "reviews": 229,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 19
        },
        {
            "id": "ck20",
            "name": "Red Rose Petals & Candle Romantic Decor Kit",
            "rating": 5,
            "reviews": 36,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 20
        },
        {
            "id": "ck21",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale)",
            "rating": 4.5,
            "reviews": 53,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 21
        },
        {
            "id": "ck22",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10)",
            "rating": 4.8,
            "reviews": 70,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 22
        },
        {
            "id": "ck23",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10)",
            "rating": 4.3,
            "reviews": 87,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 23
        },
        {
            "id": "ck24",
            "name": "Love LED Neon Light Wall Hanging",
            "rating": 4.6,
            "reviews": 104,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 24
        },
        {
            "id": "ck25",
            "name": "Anniversary Mixed Color Foil Balloon Set",
            "rating": 4.9,
            "reviews": 121,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 25
        },
        {
            "id": "ck26",
            "name": "Bestseller Romantic Anniversary Decoration Set",
            "rating": 4.4,
            "reviews": 138,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 26
        },
        {
            "id": "ck27",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 2)",
            "rating": 4.7,
            "reviews": 155,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 27
        },
        {
            "id": "ck28",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 2)",
            "rating": 5,
            "reviews": 172,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 28
        },
        {
            "id": "ck29",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 2)",
            "rating": 4.5,
            "reviews": 189,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 29
        },
        {
            "id": "ck30",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 2)",
            "rating": 4.8,
            "reviews": 206,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 30
        },
        {
            "id": "ck31",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 2)",
            "rating": 4.3,
            "reviews": 223,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 31
        },
        {
            "id": "ck32",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 2)",
            "rating": 4.6,
            "reviews": 30,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 32
        },
        {
            "id": "ck33",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 2)",
            "rating": 4.9,
            "reviews": 47,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 33
        },
        {
            "id": "ck34",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 2)",
            "rating": 4.4,
            "reviews": 64,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 34
        },
        {
            "id": "ck35",
            "name": "Champagne Bottle Big Foil Balloon (Style 2)",
            "rating": 4.7,
            "reviews": 81,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 35
        },
        {
            "id": "ck36",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 2)",
            "rating": 5,
            "reviews": 98,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 36
        },
        {
            "id": "ck37",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 2)",
            "rating": 4.5,
            "reviews": 115,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 37
        },
        {
            "id": "ck38",
            "name": "Together Forever Heart Shape Confetti Popper (Style 2)",
            "rating": 4.8,
            "reviews": 132,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 38
        },
        {
            "id": "ck39",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 2)",
            "rating": 4.3,
            "reviews": 149,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 39
        },
        {
            "id": "ck40",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 2)",
            "rating": 4.6,
            "reviews": 166,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 40
        },
        {
            "id": "ck41",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 2)",
            "rating": 4.9,
            "reviews": 183,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 41
        },
        {
            "id": "ck42",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 2)",
            "rating": 4.4,
            "reviews": 200,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 42
        },
        {
            "id": "ck43",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 2)",
            "rating": 4.7,
            "reviews": 217,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 43
        },
        {
            "id": "ck44",
            "name": "Love LED Neon Light Wall Hanging (Style 2)",
            "rating": 5,
            "reviews": 234,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 44
        },
        {
            "id": "ck45",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 2)",
            "rating": 4.5,
            "reviews": 41,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 45
        },
        {
            "id": "ck46",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 2)",
            "rating": 4.8,
            "reviews": 58,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 46
        },
        {
            "id": "ck47",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 3)",
            "rating": 4.3,
            "reviews": 75,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 47
        },
        {
            "id": "ck48",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 3)",
            "rating": 4.6,
            "reviews": 92,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 48
        },
        {
            "id": "ck49",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 3)",
            "rating": 4.9,
            "reviews": 109,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 49
        },
        {
            "id": "ck50",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 3)",
            "rating": 4.4,
            "reviews": 126,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 50
        },
        {
            "id": "ck51",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 3)",
            "rating": 4.7,
            "reviews": 143,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 51
        },
        {
            "id": "ck52",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 3)",
            "rating": 5,
            "reviews": 160,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 52
        },
        {
            "id": "ck53",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 3)",
            "rating": 4.5,
            "reviews": 177,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 53
        },
        {
            "id": "ck54",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 3)",
            "rating": 4.8,
            "reviews": 194,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 54
        },
        {
            "id": "ck55",
            "name": "Champagne Bottle Big Foil Balloon (Style 3)",
            "rating": 4.3,
            "reviews": 211,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 55
        },
        {
            "id": "ck56",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 3)",
            "rating": 4.6,
            "reviews": 228,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 56
        },
        {
            "id": "ck57",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 3)",
            "rating": 4.9,
            "reviews": 35,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 57
        },
        {
            "id": "ck58",
            "name": "Together Forever Heart Shape Confetti Popper (Style 3)",
            "rating": 4.4,
            "reviews": 52,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 58
        },
        {
            "id": "ck59",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 3)",
            "rating": 4.7,
            "reviews": 69,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 59
        },
        {
            "id": "ck60",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 3)",
            "rating": 5,
            "reviews": 86,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 60
        },
        {
            "id": "ck61",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 3)",
            "rating": 4.5,
            "reviews": 103,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 61
        },
        {
            "id": "ck62",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 3)",
            "rating": 4.8,
            "reviews": 120,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 62
        },
        {
            "id": "ck63",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 3)",
            "rating": 4.3,
            "reviews": 137,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 63
        },
        {
            "id": "ck64",
            "name": "Love LED Neon Light Wall Hanging (Style 3)",
            "rating": 4.6,
            "reviews": 154,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 64
        },
        {
            "id": "ck65",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 3)",
            "rating": 4.9,
            "reviews": 171,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 65
        },
        {
            "id": "ck66",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 3)",
            "rating": 4.4,
            "reviews": 188,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 66
        }
    ],
    "tiara": [
        {
            "id": "t1",
            "name": "Premium Crystal Birthday Tiara (Princess)",
            "rating": 5,
            "reviews": 142,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 1
        },
        {
            "id": "t2",
            "name": "Silver Glitter Birthday Girl Tiara",
            "rating": 4.8,
            "reviews": 92,
            "price": 199,
            "image": "nltc_prod_balloon_starfoil.png",
            "popularRank": 2
        },
        {
            "id": "t3",
            "name": "LED Glowing Flower Tiara Crown",
            "rating": 4.6,
            "reviews": 58,
            "price": 149,
            "image": "nltc_prod_balloon_smiley.png",
            "popularRank": 4
        },
        {
            "id": "t4",
            "name": "Rose Gold Rhinestone Crown Headband",
            "rating": 4.7,
            "reviews": 73,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 3
        },
        {
            "id": "t5",
            "name": "Theme Birthday Girl Tiara & Sash Combo",
            "rating": 4.9,
            "reviews": 108,
            "price": 349,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 5
        },
        {
            "id": "t6",
            "name": "Sweet 16 Sparkle Headband Crown",
            "rating": 4.5,
            "reviews": 39,
            "price": 179,
            "image": "nltc_prod_balloon_pastel.png",
            "popularRank": 6
        },
        {
            "id": "t7",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5)",
            "rating": 4.3,
            "reviews": 25,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 7
        },
        {
            "id": "t8",
            "name": "Happy Anniversary Golden Script Foil Banner",
            "rating": 4.6,
            "reviews": 42,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 8
        },
        {
            "id": "t9",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50)",
            "rating": 4.9,
            "reviews": 59,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 9
        },
        {
            "id": "t10",
            "name": "Anniversary LED Heart Fairy Lights (Warm White)",
            "rating": 4.4,
            "reviews": 76,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 10
        },
        {
            "id": "t11",
            "name": "Silver Happy Anniversary Foil Letter Balloons",
            "rating": 4.7,
            "reviews": 93,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 11
        },
        {
            "id": "t12",
            "name": "Black & Gold Anniversary Backdrop Curtain Set",
            "rating": 5,
            "reviews": 110,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 12
        },
        {
            "id": "t13",
            "name": "Golden Anniversary Acrylic Cake Topper",
            "rating": 4.5,
            "reviews": 127,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 13
        },
        {
            "id": "t14",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs)",
            "rating": 4.8,
            "reviews": 144,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 14
        },
        {
            "id": "t15",
            "name": "Champagne Bottle Big Foil Balloon",
            "rating": 4.3,
            "reviews": 161,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 15
        },
        {
            "id": "t16",
            "name": "Anniversary King & Queen Satin Sashes Set",
            "rating": 4.6,
            "reviews": 178,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 16
        },
        {
            "id": "t17",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4)",
            "rating": 4.9,
            "reviews": 195,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 17
        },
        {
            "id": "t18",
            "name": "Together Forever Heart Shape Confetti Popper",
            "rating": 4.4,
            "reviews": 212,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 18
        },
        {
            "id": "t19",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop",
            "rating": 4.7,
            "reviews": 229,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 19
        },
        {
            "id": "t20",
            "name": "Red Rose Petals & Candle Romantic Decor Kit",
            "rating": 5,
            "reviews": 36,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 20
        },
        {
            "id": "t21",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale)",
            "rating": 4.5,
            "reviews": 53,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 21
        },
        {
            "id": "t22",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10)",
            "rating": 4.8,
            "reviews": 70,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 22
        },
        {
            "id": "t23",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10)",
            "rating": 4.3,
            "reviews": 87,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 23
        },
        {
            "id": "t24",
            "name": "Love LED Neon Light Wall Hanging",
            "rating": 4.6,
            "reviews": 104,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 24
        },
        {
            "id": "t25",
            "name": "Anniversary Mixed Color Foil Balloon Set",
            "rating": 4.9,
            "reviews": 121,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 25
        },
        {
            "id": "t26",
            "name": "Bestseller Romantic Anniversary Decoration Set",
            "rating": 4.4,
            "reviews": 138,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 26
        },
        {
            "id": "t27",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 2)",
            "rating": 4.7,
            "reviews": 155,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 27
        },
        {
            "id": "t28",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 2)",
            "rating": 5,
            "reviews": 172,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 28
        },
        {
            "id": "t29",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 2)",
            "rating": 4.5,
            "reviews": 189,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 29
        },
        {
            "id": "t30",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 2)",
            "rating": 4.8,
            "reviews": 206,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 30
        },
        {
            "id": "t31",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 2)",
            "rating": 4.3,
            "reviews": 223,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 31
        },
        {
            "id": "t32",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 2)",
            "rating": 4.6,
            "reviews": 30,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 32
        },
        {
            "id": "t33",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 2)",
            "rating": 4.9,
            "reviews": 47,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 33
        },
        {
            "id": "t34",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 2)",
            "rating": 4.4,
            "reviews": 64,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 34
        },
        {
            "id": "t35",
            "name": "Champagne Bottle Big Foil Balloon (Style 2)",
            "rating": 4.7,
            "reviews": 81,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 35
        },
        {
            "id": "t36",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 2)",
            "rating": 5,
            "reviews": 98,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 36
        },
        {
            "id": "t37",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 2)",
            "rating": 4.5,
            "reviews": 115,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 37
        },
        {
            "id": "t38",
            "name": "Together Forever Heart Shape Confetti Popper (Style 2)",
            "rating": 4.8,
            "reviews": 132,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 38
        },
        {
            "id": "t39",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 2)",
            "rating": 4.3,
            "reviews": 149,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 39
        },
        {
            "id": "t40",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 2)",
            "rating": 4.6,
            "reviews": 166,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 40
        },
        {
            "id": "t41",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 2)",
            "rating": 4.9,
            "reviews": 183,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 41
        },
        {
            "id": "t42",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 2)",
            "rating": 4.4,
            "reviews": 200,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 42
        },
        {
            "id": "t43",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 2)",
            "rating": 4.7,
            "reviews": 217,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 43
        },
        {
            "id": "t44",
            "name": "Love LED Neon Light Wall Hanging (Style 2)",
            "rating": 5,
            "reviews": 234,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 44
        },
        {
            "id": "t45",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 2)",
            "rating": 4.5,
            "reviews": 41,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 45
        },
        {
            "id": "t46",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 2)",
            "rating": 4.8,
            "reviews": 58,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 46
        },
        {
            "id": "t47",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 3)",
            "rating": 4.3,
            "reviews": 75,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 47
        },
        {
            "id": "t48",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 3)",
            "rating": 4.6,
            "reviews": 92,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 48
        },
        {
            "id": "t49",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 3)",
            "rating": 4.9,
            "reviews": 109,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 49
        },
        {
            "id": "t50",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 3)",
            "rating": 4.4,
            "reviews": 126,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 50
        },
        {
            "id": "t51",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 3)",
            "rating": 4.7,
            "reviews": 143,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 51
        },
        {
            "id": "t52",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 3)",
            "rating": 5,
            "reviews": 160,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 52
        },
        {
            "id": "t53",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 3)",
            "rating": 4.5,
            "reviews": 177,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 53
        },
        {
            "id": "t54",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 3)",
            "rating": 4.8,
            "reviews": 194,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 54
        },
        {
            "id": "t55",
            "name": "Champagne Bottle Big Foil Balloon (Style 3)",
            "rating": 4.3,
            "reviews": 211,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 55
        },
        {
            "id": "t56",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 3)",
            "rating": 4.6,
            "reviews": 228,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 56
        },
        {
            "id": "t57",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 3)",
            "rating": 4.9,
            "reviews": 35,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 57
        },
        {
            "id": "t58",
            "name": "Together Forever Heart Shape Confetti Popper (Style 3)",
            "rating": 4.4,
            "reviews": 52,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 58
        },
        {
            "id": "t59",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 3)",
            "rating": 4.7,
            "reviews": 69,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 59
        },
        {
            "id": "t60",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 3)",
            "rating": 5,
            "reviews": 86,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 60
        },
        {
            "id": "t61",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 3)",
            "rating": 4.5,
            "reviews": 103,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 61
        },
        {
            "id": "t62",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 3)",
            "rating": 4.8,
            "reviews": 120,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 62
        },
        {
            "id": "t63",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 3)",
            "rating": 4.3,
            "reviews": 137,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 63
        },
        {
            "id": "t64",
            "name": "Love LED Neon Light Wall Hanging (Style 3)",
            "rating": 4.6,
            "reviews": 154,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 64
        },
        {
            "id": "t65",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 3)",
            "rating": 4.9,
            "reviews": 171,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 65
        },
        {
            "id": "t66",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 3)",
            "rating": 4.4,
            "reviews": 188,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 66
        }
    ],
    "crowns": [
        {
            "id": "cr1",
            "name": "Royal Golden Foil Birthday Crowns (Pack of 6)",
            "rating": 4.9,
            "reviews": 88,
            "price": 199,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 1
        },
        {
            "id": "cr2",
            "name": "Glitter Paper Crown Hats (Pack of 10)",
            "rating": 4.6,
            "reviews": 67,
            "price": 149,
            "image": "cardcaps.png",
            "popularRank": 2
        },
        {
            "id": "cr3",
            "name": "LED Light Up King & Queen Crowns (Pack of 2)",
            "rating": 4.8,
            "reviews": 54,
            "price": 249,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 3
        },
        {
            "id": "cr4",
            "name": "Adjustable Metal Birthday Boy Crown",
            "rating": 4.7,
            "reviews": 41,
            "price": 299,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 4
        },
        {
            "id": "cr5",
            "name": "Cartoon Theme Kids Crowns (Pack of 8)",
            "rating": 4.4,
            "reviews": 31,
            "price": 129,
            "image": "nltc_prod_balloon_smiley.png",
            "popularRank": 5
        },
        {
            "id": "cr6",
            "name": "Foil Fringe Celebration Party Crowns",
            "rating": 4.3,
            "reviews": 29,
            "price": 120,
            "image": "nltc_prod_balloon_starfoil.png",
            "popularRank": 6
        },
        {
            "id": "cr7",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5)",
            "rating": 4.3,
            "reviews": 25,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 7
        },
        {
            "id": "cr8",
            "name": "Happy Anniversary Golden Script Foil Banner",
            "rating": 4.6,
            "reviews": 42,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 8
        },
        {
            "id": "cr9",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50)",
            "rating": 4.9,
            "reviews": 59,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 9
        },
        {
            "id": "cr10",
            "name": "Anniversary LED Heart Fairy Lights (Warm White)",
            "rating": 4.4,
            "reviews": 76,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 10
        },
        {
            "id": "cr11",
            "name": "Silver Happy Anniversary Foil Letter Balloons",
            "rating": 4.7,
            "reviews": 93,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 11
        },
        {
            "id": "cr12",
            "name": "Black & Gold Anniversary Backdrop Curtain Set",
            "rating": 5,
            "reviews": 110,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 12
        },
        {
            "id": "cr13",
            "name": "Golden Anniversary Acrylic Cake Topper",
            "rating": 4.5,
            "reviews": 127,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 13
        },
        {
            "id": "cr14",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs)",
            "rating": 4.8,
            "reviews": 144,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 14
        },
        {
            "id": "cr15",
            "name": "Champagne Bottle Big Foil Balloon",
            "rating": 4.3,
            "reviews": 161,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 15
        },
        {
            "id": "cr16",
            "name": "Anniversary King & Queen Satin Sashes Set",
            "rating": 4.6,
            "reviews": 178,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 16
        },
        {
            "id": "cr17",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4)",
            "rating": 4.9,
            "reviews": 195,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 17
        },
        {
            "id": "cr18",
            "name": "Together Forever Heart Shape Confetti Popper",
            "rating": 4.4,
            "reviews": 212,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 18
        },
        {
            "id": "cr19",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop",
            "rating": 4.7,
            "reviews": 229,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 19
        },
        {
            "id": "cr20",
            "name": "Red Rose Petals & Candle Romantic Decor Kit",
            "rating": 5,
            "reviews": 36,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 20
        },
        {
            "id": "cr21",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale)",
            "rating": 4.5,
            "reviews": 53,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 21
        },
        {
            "id": "cr22",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10)",
            "rating": 4.8,
            "reviews": 70,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 22
        },
        {
            "id": "cr23",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10)",
            "rating": 4.3,
            "reviews": 87,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 23
        },
        {
            "id": "cr24",
            "name": "Love LED Neon Light Wall Hanging",
            "rating": 4.6,
            "reviews": 104,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 24
        },
        {
            "id": "cr25",
            "name": "Anniversary Mixed Color Foil Balloon Set",
            "rating": 4.9,
            "reviews": 121,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 25
        },
        {
            "id": "cr26",
            "name": "Bestseller Romantic Anniversary Decoration Set",
            "rating": 4.4,
            "reviews": 138,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 26
        },
        {
            "id": "cr27",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 2)",
            "rating": 4.7,
            "reviews": 155,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 27
        },
        {
            "id": "cr28",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 2)",
            "rating": 5,
            "reviews": 172,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 28
        },
        {
            "id": "cr29",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 2)",
            "rating": 4.5,
            "reviews": 189,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 29
        },
        {
            "id": "cr30",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 2)",
            "rating": 4.8,
            "reviews": 206,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 30
        },
        {
            "id": "cr31",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 2)",
            "rating": 4.3,
            "reviews": 223,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 31
        },
        {
            "id": "cr32",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 2)",
            "rating": 4.6,
            "reviews": 30,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 32
        },
        {
            "id": "cr33",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 2)",
            "rating": 4.9,
            "reviews": 47,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 33
        },
        {
            "id": "cr34",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 2)",
            "rating": 4.4,
            "reviews": 64,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 34
        },
        {
            "id": "cr35",
            "name": "Champagne Bottle Big Foil Balloon (Style 2)",
            "rating": 4.7,
            "reviews": 81,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 35
        },
        {
            "id": "cr36",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 2)",
            "rating": 5,
            "reviews": 98,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 36
        },
        {
            "id": "cr37",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 2)",
            "rating": 4.5,
            "reviews": 115,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 37
        },
        {
            "id": "cr38",
            "name": "Together Forever Heart Shape Confetti Popper (Style 2)",
            "rating": 4.8,
            "reviews": 132,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 38
        },
        {
            "id": "cr39",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 2)",
            "rating": 4.3,
            "reviews": 149,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 39
        },
        {
            "id": "cr40",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 2)",
            "rating": 4.6,
            "reviews": 166,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 40
        },
        {
            "id": "cr41",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 2)",
            "rating": 4.9,
            "reviews": 183,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 41
        },
        {
            "id": "cr42",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 2)",
            "rating": 4.4,
            "reviews": 200,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 42
        },
        {
            "id": "cr43",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 2)",
            "rating": 4.7,
            "reviews": 217,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 43
        },
        {
            "id": "cr44",
            "name": "Love LED Neon Light Wall Hanging (Style 2)",
            "rating": 5,
            "reviews": 234,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 44
        },
        {
            "id": "cr45",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 2)",
            "rating": 4.5,
            "reviews": 41,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 45
        },
        {
            "id": "cr46",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 2)",
            "rating": 4.8,
            "reviews": 58,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 46
        },
        {
            "id": "cr47",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 3)",
            "rating": 4.3,
            "reviews": 75,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 47
        },
        {
            "id": "cr48",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 3)",
            "rating": 4.6,
            "reviews": 92,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 48
        },
        {
            "id": "cr49",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 3)",
            "rating": 4.9,
            "reviews": 109,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 49
        },
        {
            "id": "cr50",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 3)",
            "rating": 4.4,
            "reviews": 126,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 50
        },
        {
            "id": "cr51",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 3)",
            "rating": 4.7,
            "reviews": 143,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 51
        },
        {
            "id": "cr52",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 3)",
            "rating": 5,
            "reviews": 160,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 52
        },
        {
            "id": "cr53",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 3)",
            "rating": 4.5,
            "reviews": 177,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 53
        },
        {
            "id": "cr54",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 3)",
            "rating": 4.8,
            "reviews": 194,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 54
        },
        {
            "id": "cr55",
            "name": "Champagne Bottle Big Foil Balloon (Style 3)",
            "rating": 4.3,
            "reviews": 211,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 55
        },
        {
            "id": "cr56",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 3)",
            "rating": 4.6,
            "reviews": 228,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 56
        },
        {
            "id": "cr57",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 3)",
            "rating": 4.9,
            "reviews": 35,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 57
        },
        {
            "id": "cr58",
            "name": "Together Forever Heart Shape Confetti Popper (Style 3)",
            "rating": 4.4,
            "reviews": 52,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 58
        },
        {
            "id": "cr59",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 3)",
            "rating": 4.7,
            "reviews": 69,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 59
        },
        {
            "id": "cr60",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 3)",
            "rating": 5,
            "reviews": 86,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 60
        },
        {
            "id": "cr61",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 3)",
            "rating": 4.5,
            "reviews": 103,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 61
        },
        {
            "id": "cr62",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 3)",
            "rating": 4.8,
            "reviews": 120,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 62
        },
        {
            "id": "cr63",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 3)",
            "rating": 4.3,
            "reviews": 137,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 63
        },
        {
            "id": "cr64",
            "name": "Love LED Neon Light Wall Hanging (Style 3)",
            "rating": 4.6,
            "reviews": 154,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 64
        },
        {
            "id": "cr65",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 3)",
            "rating": 4.9,
            "reviews": 171,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 65
        },
        {
            "id": "cr66",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 3)",
            "rating": 4.4,
            "reviews": 188,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 66
        }
    ],
    "toppers": [
        {
            "id": "to1",
            "name": "Happy Birthday Gold Acrylic Cake Topper",
            "rating": 4.9,
            "reviews": 201,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 1
        },
        {
            "id": "to2",
            "name": "Love Anniversary Silver Acrylic Topper",
            "rating": 4.8,
            "reviews": 88,
            "price": 149,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 3
        },
        {
            "id": "to3",
            "name": "Glitter Number 1 Cake Topper (Gold)",
            "rating": 4.7,
            "reviews": 63,
            "price": 99,
            "image": "nltc_prod_balloon_num1foil.png",
            "popularRank": 4
        },
        {
            "id": "to4",
            "name": "Baby Shower Pastel Theme Cake Toppers",
            "rating": 4.6,
            "reviews": 74,
            "price": 129,
            "image": "nltc_prod_balloon_pastel.png",
            "popularRank": 5
        },
        {
            "id": "to5",
            "name": "Cake Doll Princess Theme Decor topper",
            "rating": 4.8,
            "reviews": 52,
            "price": 249,
            "image": "cardtoppers.png",
            "popularRank": 2
        },
        {
            "id": "to6",
            "name": "Multicolor Balloon Cloud Cake Topper Mini",
            "rating": 4.5,
            "reviews": 97,
            "price": 119,
            "image": "nltc_prod_balloon_hbfoil.png",
            "popularRank": 6
        },
        {
            "id": "to7",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5)",
            "rating": 4.3,
            "reviews": 25,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 7
        },
        {
            "id": "to8",
            "name": "Happy Anniversary Golden Script Foil Banner",
            "rating": 4.6,
            "reviews": 42,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 8
        },
        {
            "id": "to9",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50)",
            "rating": 4.9,
            "reviews": 59,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 9
        },
        {
            "id": "to10",
            "name": "Anniversary LED Heart Fairy Lights (Warm White)",
            "rating": 4.4,
            "reviews": 76,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 10
        },
        {
            "id": "to11",
            "name": "Silver Happy Anniversary Foil Letter Balloons",
            "rating": 4.7,
            "reviews": 93,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 11
        },
        {
            "id": "to12",
            "name": "Black & Gold Anniversary Backdrop Curtain Set",
            "rating": 5,
            "reviews": 110,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 12
        },
        {
            "id": "to13",
            "name": "Golden Anniversary Acrylic Cake Topper",
            "rating": 4.5,
            "reviews": 127,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 13
        },
        {
            "id": "to14",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs)",
            "rating": 4.8,
            "reviews": 144,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 14
        },
        {
            "id": "to15",
            "name": "Champagne Bottle Big Foil Balloon",
            "rating": 4.3,
            "reviews": 161,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 15
        },
        {
            "id": "to16",
            "name": "Anniversary King & Queen Satin Sashes Set",
            "rating": 4.6,
            "reviews": 178,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 16
        },
        {
            "id": "to17",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4)",
            "rating": 4.9,
            "reviews": 195,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 17
        },
        {
            "id": "to18",
            "name": "Together Forever Heart Shape Confetti Popper",
            "rating": 4.4,
            "reviews": 212,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 18
        },
        {
            "id": "to19",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop",
            "rating": 4.7,
            "reviews": 229,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 19
        },
        {
            "id": "to20",
            "name": "Red Rose Petals & Candle Romantic Decor Kit",
            "rating": 5,
            "reviews": 36,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 20
        },
        {
            "id": "to21",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale)",
            "rating": 4.5,
            "reviews": 53,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 21
        },
        {
            "id": "to22",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10)",
            "rating": 4.8,
            "reviews": 70,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 22
        },
        {
            "id": "to23",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10)",
            "rating": 4.3,
            "reviews": 87,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 23
        },
        {
            "id": "to24",
            "name": "Love LED Neon Light Wall Hanging",
            "rating": 4.6,
            "reviews": 104,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 24
        },
        {
            "id": "to25",
            "name": "Anniversary Mixed Color Foil Balloon Set",
            "rating": 4.9,
            "reviews": 121,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 25
        },
        {
            "id": "to26",
            "name": "Bestseller Romantic Anniversary Decoration Set",
            "rating": 4.4,
            "reviews": 138,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 26
        },
        {
            "id": "to27",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 2)",
            "rating": 4.7,
            "reviews": 155,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 27
        },
        {
            "id": "to28",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 2)",
            "rating": 5,
            "reviews": 172,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 28
        },
        {
            "id": "to29",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 2)",
            "rating": 4.5,
            "reviews": 189,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 29
        },
        {
            "id": "to30",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 2)",
            "rating": 4.8,
            "reviews": 206,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 30
        },
        {
            "id": "to31",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 2)",
            "rating": 4.3,
            "reviews": 223,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 31
        },
        {
            "id": "to32",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 2)",
            "rating": 4.6,
            "reviews": 30,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 32
        },
        {
            "id": "to33",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 2)",
            "rating": 4.9,
            "reviews": 47,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 33
        },
        {
            "id": "to34",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 2)",
            "rating": 4.4,
            "reviews": 64,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 34
        },
        {
            "id": "to35",
            "name": "Champagne Bottle Big Foil Balloon (Style 2)",
            "rating": 4.7,
            "reviews": 81,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 35
        },
        {
            "id": "to36",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 2)",
            "rating": 5,
            "reviews": 98,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 36
        },
        {
            "id": "to37",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 2)",
            "rating": 4.5,
            "reviews": 115,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 37
        },
        {
            "id": "to38",
            "name": "Together Forever Heart Shape Confetti Popper (Style 2)",
            "rating": 4.8,
            "reviews": 132,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 38
        },
        {
            "id": "to39",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 2)",
            "rating": 4.3,
            "reviews": 149,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 39
        },
        {
            "id": "to40",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 2)",
            "rating": 4.6,
            "reviews": 166,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 40
        },
        {
            "id": "to41",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 2)",
            "rating": 4.9,
            "reviews": 183,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 41
        },
        {
            "id": "to42",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 2)",
            "rating": 4.4,
            "reviews": 200,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 42
        },
        {
            "id": "to43",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 2)",
            "rating": 4.7,
            "reviews": 217,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 43
        },
        {
            "id": "to44",
            "name": "Love LED Neon Light Wall Hanging (Style 2)",
            "rating": 5,
            "reviews": 234,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 44
        },
        {
            "id": "to45",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 2)",
            "rating": 4.5,
            "reviews": 41,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 45
        },
        {
            "id": "to46",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 2)",
            "rating": 4.8,
            "reviews": 58,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 46
        },
        {
            "id": "to47",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 3)",
            "rating": 4.3,
            "reviews": 75,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 47
        },
        {
            "id": "to48",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 3)",
            "rating": 4.6,
            "reviews": 92,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 48
        },
        {
            "id": "to49",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 3)",
            "rating": 4.9,
            "reviews": 109,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 49
        },
        {
            "id": "to50",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 3)",
            "rating": 4.4,
            "reviews": 126,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 50
        },
        {
            "id": "to51",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 3)",
            "rating": 4.7,
            "reviews": 143,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 51
        },
        {
            "id": "to52",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 3)",
            "rating": 5,
            "reviews": 160,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 52
        },
        {
            "id": "to53",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 3)",
            "rating": 4.5,
            "reviews": 177,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 53
        },
        {
            "id": "to54",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 3)",
            "rating": 4.8,
            "reviews": 194,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 54
        },
        {
            "id": "to55",
            "name": "Champagne Bottle Big Foil Balloon (Style 3)",
            "rating": 4.3,
            "reviews": 211,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 55
        },
        {
            "id": "to56",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 3)",
            "rating": 4.6,
            "reviews": 228,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 56
        },
        {
            "id": "to57",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 3)",
            "rating": 4.9,
            "reviews": 35,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 57
        },
        {
            "id": "to58",
            "name": "Together Forever Heart Shape Confetti Popper (Style 3)",
            "rating": 4.4,
            "reviews": 52,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 58
        },
        {
            "id": "to59",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 3)",
            "rating": 4.7,
            "reviews": 69,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 59
        },
        {
            "id": "to60",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 3)",
            "rating": 5,
            "reviews": 86,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 60
        },
        {
            "id": "to61",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 3)",
            "rating": 4.5,
            "reviews": 103,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 61
        },
        {
            "id": "to62",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 3)",
            "rating": 4.8,
            "reviews": 120,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 62
        },
        {
            "id": "to63",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 3)",
            "rating": 4.3,
            "reviews": 137,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 63
        },
        {
            "id": "to64",
            "name": "Love LED Neon Light Wall Hanging (Style 3)",
            "rating": 4.6,
            "reviews": 154,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 64
        },
        {
            "id": "to65",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 3)",
            "rating": 4.9,
            "reviews": 171,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 65
        },
        {
            "id": "to66",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 3)",
            "rating": 4.4,
            "reviews": 188,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 66
        }
    ],
    "combos": [
        {
            "id": "co1",
            "name": "All-in-One Gold & Black Birthday Combo Set",
            "rating": 4.9,
            "reviews": 188,
            "price": 499,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 1
        },
        {
            "id": "co2",
            "name": "Pastel Pink & Silver Anniversary Combo Set",
            "rating": 4.8,
            "reviews": 115,
            "price": 499,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 2
        },
        {
            "id": "co3",
            "name": "Baby Shower Complete Balloon Garland Combo Kit",
            "rating": 4.7,
            "reviews": 94,
            "price": 399,
            "image": "nltc_prod_balloon_pastel.png",
            "popularRank": 3
        },
        {
            "id": "co4",
            "name": "Welcome Baby homecoming complete combo box",
            "rating": 4.6,
            "reviews": 72,
            "price": 349,
            "image": "nltc_prod_balloon_smiley.png",
            "popularRank": 4
        },
        {
            "id": "co5",
            "name": "Traditional Haldi Marigold backdrop combo set",
            "rating": 4.5,
            "reviews": 63,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 5
        },
        {
            "id": "co6",
            "name": "Mehndi Ceremony Garland & Backdrop Combo Kit",
            "rating": 4.4,
            "reviews": 39,
            "price": 499,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 6
        },
        {
            "id": "co7",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5)",
            "rating": 4.3,
            "reviews": 25,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 7
        },
        {
            "id": "co8",
            "name": "Happy Anniversary Golden Script Foil Banner",
            "rating": 4.6,
            "reviews": 42,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 8
        },
        {
            "id": "co9",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50)",
            "rating": 4.9,
            "reviews": 59,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 9
        },
        {
            "id": "co10",
            "name": "Anniversary LED Heart Fairy Lights (Warm White)",
            "rating": 4.4,
            "reviews": 76,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 10
        },
        {
            "id": "co11",
            "name": "Silver Happy Anniversary Foil Letter Balloons",
            "rating": 4.7,
            "reviews": 93,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 11
        },
        {
            "id": "co12",
            "name": "Black & Gold Anniversary Backdrop Curtain Set",
            "rating": 5,
            "reviews": 110,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 12
        },
        {
            "id": "co13",
            "name": "Golden Anniversary Acrylic Cake Topper",
            "rating": 4.5,
            "reviews": 127,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 13
        },
        {
            "id": "co14",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs)",
            "rating": 4.8,
            "reviews": 144,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 14
        },
        {
            "id": "co15",
            "name": "Champagne Bottle Big Foil Balloon",
            "rating": 4.3,
            "reviews": 161,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 15
        },
        {
            "id": "co16",
            "name": "Anniversary King & Queen Satin Sashes Set",
            "rating": 4.6,
            "reviews": 178,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 16
        },
        {
            "id": "co17",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4)",
            "rating": 4.9,
            "reviews": 195,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 17
        },
        {
            "id": "co18",
            "name": "Together Forever Heart Shape Confetti Popper",
            "rating": 4.4,
            "reviews": 212,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 18
        },
        {
            "id": "co19",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop",
            "rating": 4.7,
            "reviews": 229,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 19
        },
        {
            "id": "co20",
            "name": "Red Rose Petals & Candle Romantic Decor Kit",
            "rating": 5,
            "reviews": 36,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 20
        },
        {
            "id": "co21",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale)",
            "rating": 4.5,
            "reviews": 53,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 21
        },
        {
            "id": "co22",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10)",
            "rating": 4.8,
            "reviews": 70,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 22
        },
        {
            "id": "co23",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10)",
            "rating": 4.3,
            "reviews": 87,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 23
        },
        {
            "id": "co24",
            "name": "Love LED Neon Light Wall Hanging",
            "rating": 4.6,
            "reviews": 104,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 24
        },
        {
            "id": "co25",
            "name": "Anniversary Mixed Color Foil Balloon Set",
            "rating": 4.9,
            "reviews": 121,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 25
        },
        {
            "id": "co26",
            "name": "Bestseller Romantic Anniversary Decoration Set",
            "rating": 4.4,
            "reviews": 138,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 26
        },
        {
            "id": "co27",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 2)",
            "rating": 4.7,
            "reviews": 155,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 27
        },
        {
            "id": "co28",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 2)",
            "rating": 5,
            "reviews": 172,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 28
        },
        {
            "id": "co29",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 2)",
            "rating": 4.5,
            "reviews": 189,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 29
        },
        {
            "id": "co30",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 2)",
            "rating": 4.8,
            "reviews": 206,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 30
        },
        {
            "id": "co31",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 2)",
            "rating": 4.3,
            "reviews": 223,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 31
        },
        {
            "id": "co32",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 2)",
            "rating": 4.6,
            "reviews": 30,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 32
        },
        {
            "id": "co33",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 2)",
            "rating": 4.9,
            "reviews": 47,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 33
        },
        {
            "id": "co34",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 2)",
            "rating": 4.4,
            "reviews": 64,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 34
        },
        {
            "id": "co35",
            "name": "Champagne Bottle Big Foil Balloon (Style 2)",
            "rating": 4.7,
            "reviews": 81,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 35
        },
        {
            "id": "co36",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 2)",
            "rating": 5,
            "reviews": 98,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 36
        },
        {
            "id": "co37",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 2)",
            "rating": 4.5,
            "reviews": 115,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 37
        },
        {
            "id": "co38",
            "name": "Together Forever Heart Shape Confetti Popper (Style 2)",
            "rating": 4.8,
            "reviews": 132,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 38
        },
        {
            "id": "co39",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 2)",
            "rating": 4.3,
            "reviews": 149,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 39
        },
        {
            "id": "co40",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 2)",
            "rating": 4.6,
            "reviews": 166,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 40
        },
        {
            "id": "co41",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 2)",
            "rating": 4.9,
            "reviews": 183,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 41
        },
        {
            "id": "co42",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 2)",
            "rating": 4.4,
            "reviews": 200,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 42
        },
        {
            "id": "co43",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 2)",
            "rating": 4.7,
            "reviews": 217,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 43
        },
        {
            "id": "co44",
            "name": "Love LED Neon Light Wall Hanging (Style 2)",
            "rating": 5,
            "reviews": 234,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 44
        },
        {
            "id": "co45",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 2)",
            "rating": 4.5,
            "reviews": 41,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 45
        },
        {
            "id": "co46",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 2)",
            "rating": 4.8,
            "reviews": 58,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 46
        },
        {
            "id": "co47",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 3)",
            "rating": 4.3,
            "reviews": 75,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 47
        },
        {
            "id": "co48",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 3)",
            "rating": 4.6,
            "reviews": 92,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 48
        },
        {
            "id": "co49",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 3)",
            "rating": 4.9,
            "reviews": 109,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 49
        },
        {
            "id": "co50",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 3)",
            "rating": 4.4,
            "reviews": 126,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 50
        },
        {
            "id": "co51",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 3)",
            "rating": 4.7,
            "reviews": 143,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 51
        },
        {
            "id": "co52",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 3)",
            "rating": 5,
            "reviews": 160,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 52
        },
        {
            "id": "co53",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 3)",
            "rating": 4.5,
            "reviews": 177,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 53
        },
        {
            "id": "co54",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 3)",
            "rating": 4.8,
            "reviews": 194,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 54
        },
        {
            "id": "co55",
            "name": "Champagne Bottle Big Foil Balloon (Style 3)",
            "rating": 4.3,
            "reviews": 211,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 55
        },
        {
            "id": "co56",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 3)",
            "rating": 4.6,
            "reviews": 228,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 56
        },
        {
            "id": "co57",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 3)",
            "rating": 4.9,
            "reviews": 35,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 57
        },
        {
            "id": "co58",
            "name": "Together Forever Heart Shape Confetti Popper (Style 3)",
            "rating": 4.4,
            "reviews": 52,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 58
        },
        {
            "id": "co59",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 3)",
            "rating": 4.7,
            "reviews": 69,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 59
        },
        {
            "id": "co60",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 3)",
            "rating": 5,
            "reviews": 86,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 60
        },
        {
            "id": "co61",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 3)",
            "rating": 4.5,
            "reviews": 103,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 61
        },
        {
            "id": "co62",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 3)",
            "rating": 4.8,
            "reviews": 120,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 62
        },
        {
            "id": "co63",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 3)",
            "rating": 4.3,
            "reviews": 137,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 63
        },
        {
            "id": "co64",
            "name": "Love LED Neon Light Wall Hanging (Style 3)",
            "rating": 4.6,
            "reviews": 154,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 64
        },
        {
            "id": "co65",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 3)",
            "rating": 4.9,
            "reviews": 171,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 65
        },
        {
            "id": "co66",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 3)",
            "rating": 4.4,
            "reviews": 188,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 66
        }
    ],
    "manymore": [
        {
            "id": "m1",
            "name": "Gold Foil Fringe Metallic Curtains (Pack of 2)",
            "rating": 4.8,
            "reviews": 204,
            "price": 199,
            "image": "banner.png",
            "popularRank": 1
        },
        {
            "id": "m2",
            "name": "Faux Decorative Cake Balls (Pack of 20)",
            "rating": 4.6,
            "reviews": 79,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 2
        },
        {
            "id": "m3",
            "name": "Fairy Lights LED String Lights (Warm White, 20Ft)",
            "rating": 4.9,
            "reviews": 124,
            "price": 149,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 3
        },
        {
            "id": "m4",
            "name": "Balloon Glue Dots & Arch Strip Tape Set",
            "rating": 4.7,
            "reviews": 156,
            "price": 99,
            "image": "nltc_prod_balloon_confetti.png",
            "popularRank": 4
        },
        {
            "id": "m5",
            "name": "Double Action Balloon Hand Pump (Fast Air)",
            "rating": 4.5,
            "reviews": 88,
            "price": 129,
            "image": "cardpoppers.png",
            "popularRank": 5
        },
        {
            "id": "m6",
            "name": "Snow Spray & Party String Spray (Pack of 2)",
            "rating": 4.4,
            "reviews": 67,
            "price": 119,
            "image": "nltc_prod_balloon_pastel.png",
            "popularRank": 6
        },
        {
            "id": "m7",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5)",
            "rating": 4.3,
            "reviews": 25,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 7
        },
        {
            "id": "m8",
            "name": "Happy Anniversary Golden Script Foil Banner",
            "rating": 4.6,
            "reviews": 42,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 8
        },
        {
            "id": "m9",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50)",
            "rating": 4.9,
            "reviews": 59,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 9
        },
        {
            "id": "m10",
            "name": "Anniversary LED Heart Fairy Lights (Warm White)",
            "rating": 4.4,
            "reviews": 76,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 10
        },
        {
            "id": "m11",
            "name": "Silver Happy Anniversary Foil Letter Balloons",
            "rating": 4.7,
            "reviews": 93,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 11
        },
        {
            "id": "m12",
            "name": "Black & Gold Anniversary Backdrop Curtain Set",
            "rating": 5,
            "reviews": 110,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 12
        },
        {
            "id": "m13",
            "name": "Golden Anniversary Acrylic Cake Topper",
            "rating": 4.5,
            "reviews": 127,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 13
        },
        {
            "id": "m14",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs)",
            "rating": 4.8,
            "reviews": 144,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 14
        },
        {
            "id": "m15",
            "name": "Champagne Bottle Big Foil Balloon",
            "rating": 4.3,
            "reviews": 161,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 15
        },
        {
            "id": "m16",
            "name": "Anniversary King & Queen Satin Sashes Set",
            "rating": 4.6,
            "reviews": 178,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 16
        },
        {
            "id": "m17",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4)",
            "rating": 4.9,
            "reviews": 195,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 17
        },
        {
            "id": "m18",
            "name": "Together Forever Heart Shape Confetti Popper",
            "rating": 4.4,
            "reviews": 212,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 18
        },
        {
            "id": "m19",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop",
            "rating": 4.7,
            "reviews": 229,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 19
        },
        {
            "id": "m20",
            "name": "Red Rose Petals & Candle Romantic Decor Kit",
            "rating": 5,
            "reviews": 36,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 20
        },
        {
            "id": "m21",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale)",
            "rating": 4.5,
            "reviews": 53,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 21
        },
        {
            "id": "m22",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10)",
            "rating": 4.8,
            "reviews": 70,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 22
        },
        {
            "id": "m23",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10)",
            "rating": 4.3,
            "reviews": 87,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 23
        },
        {
            "id": "m24",
            "name": "Love LED Neon Light Wall Hanging",
            "rating": 4.6,
            "reviews": 104,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 24
        },
        {
            "id": "m25",
            "name": "Anniversary Mixed Color Foil Balloon Set",
            "rating": 4.9,
            "reviews": 121,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 25
        },
        {
            "id": "m26",
            "name": "Bestseller Romantic Anniversary Decoration Set",
            "rating": 4.4,
            "reviews": 138,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 26
        },
        {
            "id": "m27",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 2)",
            "rating": 4.7,
            "reviews": 155,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 27
        },
        {
            "id": "m28",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 2)",
            "rating": 5,
            "reviews": 172,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 28
        },
        {
            "id": "m29",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 2)",
            "rating": 4.5,
            "reviews": 189,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 29
        },
        {
            "id": "m30",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 2)",
            "rating": 4.8,
            "reviews": 206,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 30
        },
        {
            "id": "m31",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 2)",
            "rating": 4.3,
            "reviews": 223,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 31
        },
        {
            "id": "m32",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 2)",
            "rating": 4.6,
            "reviews": 30,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 32
        },
        {
            "id": "m33",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 2)",
            "rating": 4.9,
            "reviews": 47,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 33
        },
        {
            "id": "m34",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 2)",
            "rating": 4.4,
            "reviews": 64,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 34
        },
        {
            "id": "m35",
            "name": "Champagne Bottle Big Foil Balloon (Style 2)",
            "rating": 4.7,
            "reviews": 81,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 35
        },
        {
            "id": "m36",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 2)",
            "rating": 5,
            "reviews": 98,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 36
        },
        {
            "id": "m37",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 2)",
            "rating": 4.5,
            "reviews": 115,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 37
        },
        {
            "id": "m38",
            "name": "Together Forever Heart Shape Confetti Popper (Style 2)",
            "rating": 4.8,
            "reviews": 132,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 38
        },
        {
            "id": "m39",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 2)",
            "rating": 4.3,
            "reviews": 149,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 39
        },
        {
            "id": "m40",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 2)",
            "rating": 4.6,
            "reviews": 166,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 40
        },
        {
            "id": "m41",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 2)",
            "rating": 4.9,
            "reviews": 183,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 41
        },
        {
            "id": "m42",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 2)",
            "rating": 4.4,
            "reviews": 200,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 42
        },
        {
            "id": "m43",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 2)",
            "rating": 4.7,
            "reviews": 217,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 43
        },
        {
            "id": "m44",
            "name": "Love LED Neon Light Wall Hanging (Style 2)",
            "rating": 5,
            "reviews": 234,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 44
        },
        {
            "id": "m45",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 2)",
            "rating": 4.5,
            "reviews": 41,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 45
        },
        {
            "id": "m46",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 2)",
            "rating": 4.8,
            "reviews": 58,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 46
        },
        {
            "id": "m47",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 3)",
            "rating": 4.3,
            "reviews": 75,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 47
        },
        {
            "id": "m48",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 3)",
            "rating": 4.6,
            "reviews": 92,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 48
        },
        {
            "id": "m49",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 3)",
            "rating": 4.9,
            "reviews": 109,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 49
        },
        {
            "id": "m50",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 3)",
            "rating": 4.4,
            "reviews": 126,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 50
        },
        {
            "id": "m51",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 3)",
            "rating": 4.7,
            "reviews": 143,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 51
        },
        {
            "id": "m52",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 3)",
            "rating": 5,
            "reviews": 160,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 52
        },
        {
            "id": "m53",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 3)",
            "rating": 4.5,
            "reviews": 177,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 53
        },
        {
            "id": "m54",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 3)",
            "rating": 4.8,
            "reviews": 194,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 54
        },
        {
            "id": "m55",
            "name": "Champagne Bottle Big Foil Balloon (Style 3)",
            "rating": 4.3,
            "reviews": 211,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 55
        },
        {
            "id": "m56",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 3)",
            "rating": 4.6,
            "reviews": 228,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 56
        },
        {
            "id": "m57",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 3)",
            "rating": 4.9,
            "reviews": 35,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 57
        },
        {
            "id": "m58",
            "name": "Together Forever Heart Shape Confetti Popper (Style 3)",
            "rating": 4.4,
            "reviews": 52,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 58
        },
        {
            "id": "m59",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 3)",
            "rating": 4.7,
            "reviews": 69,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 59
        },
        {
            "id": "m60",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 3)",
            "rating": 5,
            "reviews": 86,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 60
        },
        {
            "id": "m61",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 3)",
            "rating": 4.5,
            "reviews": 103,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 61
        },
        {
            "id": "m62",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 3)",
            "rating": 4.8,
            "reviews": 120,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 62
        },
        {
            "id": "m63",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 3)",
            "rating": 4.3,
            "reviews": 137,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 63
        },
        {
            "id": "m64",
            "name": "Love LED Neon Light Wall Hanging (Style 3)",
            "rating": 4.6,
            "reviews": 154,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 64
        },
        {
            "id": "m65",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 3)",
            "rating": 4.9,
            "reviews": 171,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 65
        },
        {
            "id": "m66",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 3)",
            "rating": 4.4,
            "reviews": 188,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 66
        }
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
                <div class="product-card" id="card-${prod.id}" onclick="goToProduct('${prod.id}', event)" style="cursor: pointer;">
                    <div class="wishlist-icon-wrapper" onclick="toggleWishlist('${prod.id}', event)">
                        <i class="fa-regular fa-heart wishlist-icon"></i>
                    </div>
                    <div class="product-img-container">
                        <img src="${prod.image}" alt="${prod.name}">
                    </div>
                    <div class="product-card-info">
                        <h3 class="product-name"><a href="product.html?id=${prod.id}" onclick="goToProduct('${prod.id}', event)">${prod.name}</a></h3>
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
