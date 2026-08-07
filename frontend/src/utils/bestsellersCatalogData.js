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
        {
            "id": "bs1",
            "name": "Sparkling Anaar Candle (Pack of 4)",
            "rating": 5,
            "reviews": 112,
            "price": 180,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 1
        },
        {
            "id": "bs2",
            "name": "Musical Rotating Lotus Candle (Pink)",
            "rating": 4.7,
            "reviews": 93,
            "price": 299,
            "image": "nltc_prod_balloon_smiley.png",
            "popularRank": 2
        },
        {
            "id": "bs3",
            "name": "Sparkling Birthday Fountain Candle (Pack of 2)",
            "rating": 4.6,
            "reviews": 54,
            "price": 120,
            "image": "cardcandles.png",
            "popularRank": 3
        },
        {
            "id": "bs4",
            "name": "Metallic Gold Slim Sparkler Candles (Pack of 12)",
            "rating": 4.5,
            "reviews": 38,
            "price": 99,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 4
        },
        {
            "id": "bs5",
            "name": "Neon Color Flame Birthday Candles",
            "rating": 4.4,
            "reviews": 29,
            "price": 149,
            "image": "nltc_prod_balloon_pastel.png",
            "popularRank": 5
        },
        {
            "id": "bs6",
            "name": "Magic Relighting Birthday Candles",
            "rating": 4.2,
            "reviews": 48,
            "price": 99,
            "image": "nltc_prod_balloon_hbfoil.png",
            "popularRank": 6
        },
        {
            "id": "bs7",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5)",
            "rating": 4.3,
            "reviews": 25,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 7
        },
        {
            "id": "bs8",
            "name": "Happy Anniversary Golden Script Foil Banner",
            "rating": 4.6,
            "reviews": 42,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 8
        },
        {
            "id": "bs9",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50)",
            "rating": 4.9,
            "reviews": 59,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 9
        },
        {
            "id": "bs10",
            "name": "Anniversary LED Heart Fairy Lights (Warm White)",
            "rating": 4.4,
            "reviews": 76,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 10
        },
        {
            "id": "bs11",
            "name": "Silver Happy Anniversary Foil Letter Balloons",
            "rating": 4.7,
            "reviews": 93,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 11
        },
        {
            "id": "bs12",
            "name": "Black & Gold Anniversary Backdrop Curtain Set",
            "rating": 5,
            "reviews": 110,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 12
        },
        {
            "id": "bs13",
            "name": "Golden Anniversary Acrylic Cake Topper",
            "rating": 4.5,
            "reviews": 127,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 13
        },
        {
            "id": "bs14",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs)",
            "rating": 4.8,
            "reviews": 144,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 14
        },
        {
            "id": "bs15",
            "name": "Champagne Bottle Big Foil Balloon",
            "rating": 4.3,
            "reviews": 161,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 15
        },
        {
            "id": "bs16",
            "name": "Anniversary King & Queen Satin Sashes Set",
            "rating": 4.6,
            "reviews": 178,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 16
        },
        {
            "id": "bs17",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4)",
            "rating": 4.9,
            "reviews": 195,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 17
        },
        {
            "id": "bs18",
            "name": "Together Forever Heart Shape Confetti Popper",
            "rating": 4.4,
            "reviews": 212,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 18
        },
        {
            "id": "bs19",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop",
            "rating": 4.7,
            "reviews": 229,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 19
        },
        {
            "id": "bs20",
            "name": "Red Rose Petals & Candle Romantic Decor Kit",
            "rating": 5,
            "reviews": 36,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 20
        },
        {
            "id": "bs21",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale)",
            "rating": 4.5,
            "reviews": 53,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 21
        },
        {
            "id": "bs22",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10)",
            "rating": 4.8,
            "reviews": 70,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 22
        },
        {
            "id": "bs23",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10)",
            "rating": 4.3,
            "reviews": 87,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 23
        },
        {
            "id": "bs24",
            "name": "Love LED Neon Light Wall Hanging",
            "rating": 4.6,
            "reviews": 104,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 24
        },
        {
            "id": "bs25",
            "name": "Anniversary Mixed Color Foil Balloon Set",
            "rating": 4.9,
            "reviews": 121,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 25
        },
        {
            "id": "bs26",
            "name": "Bestseller Romantic Anniversary Decoration Set",
            "rating": 4.4,
            "reviews": 138,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 26
        },
        {
            "id": "bs27",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 2)",
            "rating": 4.7,
            "reviews": 155,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 27
        },
        {
            "id": "bs28",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 2)",
            "rating": 5,
            "reviews": 172,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 28
        },
        {
            "id": "bs29",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 2)",
            "rating": 4.5,
            "reviews": 189,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 29
        },
        {
            "id": "bs30",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 2)",
            "rating": 4.8,
            "reviews": 206,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 30
        },
        {
            "id": "bs31",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 2)",
            "rating": 4.3,
            "reviews": 223,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 31
        },
        {
            "id": "bs32",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 2)",
            "rating": 4.6,
            "reviews": 30,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 32
        },
        {
            "id": "bs33",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 2)",
            "rating": 4.9,
            "reviews": 47,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 33
        },
        {
            "id": "bs34",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 2)",
            "rating": 4.4,
            "reviews": 64,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 34
        },
        {
            "id": "bs35",
            "name": "Champagne Bottle Big Foil Balloon (Style 2)",
            "rating": 4.7,
            "reviews": 81,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 35
        },
        {
            "id": "bs36",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 2)",
            "rating": 5,
            "reviews": 98,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 36
        },
        {
            "id": "bs37",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 2)",
            "rating": 4.5,
            "reviews": 115,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 37
        },
        {
            "id": "bs38",
            "name": "Together Forever Heart Shape Confetti Popper (Style 2)",
            "rating": 4.8,
            "reviews": 132,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 38
        },
        {
            "id": "bs39",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 2)",
            "rating": 4.3,
            "reviews": 149,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 39
        },
        {
            "id": "bs40",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 2)",
            "rating": 4.6,
            "reviews": 166,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 40
        },
        {
            "id": "bs41",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 2)",
            "rating": 4.9,
            "reviews": 183,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 41
        },
        {
            "id": "bs42",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 2)",
            "rating": 4.4,
            "reviews": 200,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 42
        },
        {
            "id": "bs43",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 2)",
            "rating": 4.7,
            "reviews": 217,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 43
        },
        {
            "id": "bs44",
            "name": "Love LED Neon Light Wall Hanging (Style 2)",
            "rating": 5,
            "reviews": 234,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 44
        },
        {
            "id": "bs45",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 2)",
            "rating": 4.5,
            "reviews": 41,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 45
        },
        {
            "id": "bs46",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 2)",
            "rating": 4.8,
            "reviews": 58,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 46
        },
        {
            "id": "bs47",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 3)",
            "rating": 4.3,
            "reviews": 75,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 47
        },
        {
            "id": "bs48",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 3)",
            "rating": 4.6,
            "reviews": 92,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 48
        },
        {
            "id": "bs49",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 3)",
            "rating": 4.9,
            "reviews": 109,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 49
        },
        {
            "id": "bs50",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 3)",
            "rating": 4.4,
            "reviews": 126,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 50
        },
        {
            "id": "bs51",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 3)",
            "rating": 4.7,
            "reviews": 143,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 51
        },
        {
            "id": "bs52",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 3)",
            "rating": 5,
            "reviews": 160,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 52
        },
        {
            "id": "bs53",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 3)",
            "rating": 4.5,
            "reviews": 177,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 53
        },
        {
            "id": "bs54",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 3)",
            "rating": 4.8,
            "reviews": 194,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 54
        },
        {
            "id": "bs55",
            "name": "Champagne Bottle Big Foil Balloon (Style 3)",
            "rating": 4.3,
            "reviews": 211,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 55
        },
        {
            "id": "bs56",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 3)",
            "rating": 4.6,
            "reviews": 228,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 56
        },
        {
            "id": "bs57",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 3)",
            "rating": 4.9,
            "reviews": 35,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 57
        },
        {
            "id": "bs58",
            "name": "Together Forever Heart Shape Confetti Popper (Style 3)",
            "rating": 4.4,
            "reviews": 52,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 58
        },
        {
            "id": "bs59",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 3)",
            "rating": 4.7,
            "reviews": 69,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 59
        },
        {
            "id": "bs60",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 3)",
            "rating": 5,
            "reviews": 86,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 60
        },
        {
            "id": "bs61",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 3)",
            "rating": 4.5,
            "reviews": 103,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 61
        },
        {
            "id": "bs62",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 3)",
            "rating": 4.8,
            "reviews": 120,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 62
        },
        {
            "id": "bs63",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 3)",
            "rating": 4.3,
            "reviews": 137,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 63
        },
        {
            "id": "bs64",
            "name": "Love LED Neon Light Wall Hanging (Style 3)",
            "rating": 4.6,
            "reviews": 154,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 64
        },
        {
            "id": "bs65",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 3)",
            "rating": 4.9,
            "reviews": 171,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 65
        },
        {
            "id": "bs66",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 3)",
            "rating": 4.4,
            "reviews": 188,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 66
        }
    ],
    "metallic-balloons": [
        {
            "id": "bm1",
            "name": "Golden Metallic Chrome Balloons (Pack of 50)",
            "rating": 5,
            "reviews": 87,
            "price": 249,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 1
        },
        {
            "id": "bm2",
            "name": "Rose Gold Chrome Balloons (Pack of 50)",
            "rating": 4.8,
            "reviews": 91,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 2
        },
        {
            "id": "bm3",
            "name": "Silver Metallic Chrome Balloons (Pack of 50)",
            "rating": 4.7,
            "reviews": 63,
            "price": 249,
            "image": "nltc_prod_balloon_starfoil.png",
            "popularRank": 3
        },
        {
            "id": "bm4",
            "name": "Blue & Silver Metallic Balloon Bunch (Pack of 30)",
            "rating": 4.6,
            "reviews": 52,
            "price": 199,
            "image": "nltc_prod_balloon_pastel.png",
            "popularRank": 4
        },
        {
            "id": "bm5",
            "name": "Pink Metallic Chrome Latex Balloons (Pack of 50)",
            "rating": 4.5,
            "reviews": 38,
            "price": 249,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 5
        },
        {
            "id": "bm6",
            "name": "Green Metallic Chrome Latex Balloons (Pack of 50)",
            "rating": 4.4,
            "reviews": 29,
            "price": 249,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 6
        },
        {
            "id": "bm7",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5)",
            "rating": 4.3,
            "reviews": 25,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 7
        },
        {
            "id": "bm8",
            "name": "Happy Anniversary Golden Script Foil Banner",
            "rating": 4.6,
            "reviews": 42,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 8
        },
        {
            "id": "bm9",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50)",
            "rating": 4.9,
            "reviews": 59,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 9
        },
        {
            "id": "bm10",
            "name": "Anniversary LED Heart Fairy Lights (Warm White)",
            "rating": 4.4,
            "reviews": 76,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 10
        },
        {
            "id": "bm11",
            "name": "Silver Happy Anniversary Foil Letter Balloons",
            "rating": 4.7,
            "reviews": 93,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 11
        },
        {
            "id": "bm12",
            "name": "Black & Gold Anniversary Backdrop Curtain Set",
            "rating": 5,
            "reviews": 110,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 12
        },
        {
            "id": "bm13",
            "name": "Golden Anniversary Acrylic Cake Topper",
            "rating": 4.5,
            "reviews": 127,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 13
        },
        {
            "id": "bm14",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs)",
            "rating": 4.8,
            "reviews": 144,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 14
        },
        {
            "id": "bm15",
            "name": "Champagne Bottle Big Foil Balloon",
            "rating": 4.3,
            "reviews": 161,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 15
        },
        {
            "id": "bm16",
            "name": "Anniversary King & Queen Satin Sashes Set",
            "rating": 4.6,
            "reviews": 178,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 16
        },
        {
            "id": "bm17",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4)",
            "rating": 4.9,
            "reviews": 195,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 17
        },
        {
            "id": "bm18",
            "name": "Together Forever Heart Shape Confetti Popper",
            "rating": 4.4,
            "reviews": 212,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 18
        },
        {
            "id": "bm19",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop",
            "rating": 4.7,
            "reviews": 229,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 19
        },
        {
            "id": "bm20",
            "name": "Red Rose Petals & Candle Romantic Decor Kit",
            "rating": 5,
            "reviews": 36,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 20
        },
        {
            "id": "bm21",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale)",
            "rating": 4.5,
            "reviews": 53,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 21
        },
        {
            "id": "bm22",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10)",
            "rating": 4.8,
            "reviews": 70,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 22
        },
        {
            "id": "bm23",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10)",
            "rating": 4.3,
            "reviews": 87,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 23
        },
        {
            "id": "bm24",
            "name": "Love LED Neon Light Wall Hanging",
            "rating": 4.6,
            "reviews": 104,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 24
        },
        {
            "id": "bm25",
            "name": "Anniversary Mixed Color Foil Balloon Set",
            "rating": 4.9,
            "reviews": 121,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 25
        },
        {
            "id": "bm26",
            "name": "Bestseller Romantic Anniversary Decoration Set",
            "rating": 4.4,
            "reviews": 138,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 26
        },
        {
            "id": "bm27",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 2)",
            "rating": 4.7,
            "reviews": 155,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 27
        },
        {
            "id": "bm28",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 2)",
            "rating": 5,
            "reviews": 172,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 28
        },
        {
            "id": "bm29",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 2)",
            "rating": 4.5,
            "reviews": 189,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 29
        },
        {
            "id": "bm30",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 2)",
            "rating": 4.8,
            "reviews": 206,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 30
        },
        {
            "id": "bm31",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 2)",
            "rating": 4.3,
            "reviews": 223,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 31
        },
        {
            "id": "bm32",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 2)",
            "rating": 4.6,
            "reviews": 30,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 32
        },
        {
            "id": "bm33",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 2)",
            "rating": 4.9,
            "reviews": 47,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 33
        },
        {
            "id": "bm34",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 2)",
            "rating": 4.4,
            "reviews": 64,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 34
        },
        {
            "id": "bm35",
            "name": "Champagne Bottle Big Foil Balloon (Style 2)",
            "rating": 4.7,
            "reviews": 81,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 35
        },
        {
            "id": "bm36",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 2)",
            "rating": 5,
            "reviews": 98,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 36
        },
        {
            "id": "bm37",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 2)",
            "rating": 4.5,
            "reviews": 115,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 37
        },
        {
            "id": "bm38",
            "name": "Together Forever Heart Shape Confetti Popper (Style 2)",
            "rating": 4.8,
            "reviews": 132,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 38
        },
        {
            "id": "bm39",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 2)",
            "rating": 4.3,
            "reviews": 149,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 39
        },
        {
            "id": "bm40",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 2)",
            "rating": 4.6,
            "reviews": 166,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 40
        },
        {
            "id": "bm41",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 2)",
            "rating": 4.9,
            "reviews": 183,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 41
        },
        {
            "id": "bm42",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 2)",
            "rating": 4.4,
            "reviews": 200,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 42
        },
        {
            "id": "bm43",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 2)",
            "rating": 4.7,
            "reviews": 217,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 43
        },
        {
            "id": "bm44",
            "name": "Love LED Neon Light Wall Hanging (Style 2)",
            "rating": 5,
            "reviews": 234,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 44
        },
        {
            "id": "bm45",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 2)",
            "rating": 4.5,
            "reviews": 41,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 45
        },
        {
            "id": "bm46",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 2)",
            "rating": 4.8,
            "reviews": 58,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 46
        },
        {
            "id": "bm47",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 3)",
            "rating": 4.3,
            "reviews": 75,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 47
        },
        {
            "id": "bm48",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 3)",
            "rating": 4.6,
            "reviews": 92,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 48
        },
        {
            "id": "bm49",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 3)",
            "rating": 4.9,
            "reviews": 109,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 49
        },
        {
            "id": "bm50",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 3)",
            "rating": 4.4,
            "reviews": 126,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 50
        },
        {
            "id": "bm51",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 3)",
            "rating": 4.7,
            "reviews": 143,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 51
        },
        {
            "id": "bm52",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 3)",
            "rating": 5,
            "reviews": 160,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 52
        },
        {
            "id": "bm53",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 3)",
            "rating": 4.5,
            "reviews": 177,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 53
        },
        {
            "id": "bm54",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 3)",
            "rating": 4.8,
            "reviews": 194,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 54
        },
        {
            "id": "bm55",
            "name": "Champagne Bottle Big Foil Balloon (Style 3)",
            "rating": 4.3,
            "reviews": 211,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 55
        },
        {
            "id": "bm56",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 3)",
            "rating": 4.6,
            "reviews": 228,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 56
        },
        {
            "id": "bm57",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 3)",
            "rating": 4.9,
            "reviews": 35,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 57
        },
        {
            "id": "bm58",
            "name": "Together Forever Heart Shape Confetti Popper (Style 3)",
            "rating": 4.4,
            "reviews": 52,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 58
        },
        {
            "id": "bm59",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 3)",
            "rating": 4.7,
            "reviews": 69,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 59
        },
        {
            "id": "bm60",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 3)",
            "rating": 5,
            "reviews": 86,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 60
        },
        {
            "id": "bm61",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 3)",
            "rating": 4.5,
            "reviews": 103,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 61
        },
        {
            "id": "bm62",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 3)",
            "rating": 4.8,
            "reviews": 120,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 62
        },
        {
            "id": "bm63",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 3)",
            "rating": 4.3,
            "reviews": 137,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 63
        },
        {
            "id": "bm64",
            "name": "Love LED Neon Light Wall Hanging (Style 3)",
            "rating": 4.6,
            "reviews": 154,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 64
        },
        {
            "id": "bm65",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 3)",
            "rating": 4.9,
            "reviews": 171,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 65
        },
        {
            "id": "bm66",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 3)",
            "rating": 4.4,
            "reviews": 188,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 66
        }
    ],
    "cake-dolls": [
        {
            "id": "bd1",
            "name": "Princess Barbie Cake Doll (Pink Gown)",
            "rating": 4.8,
            "reviews": 93,
            "price": 249,
            "image": "cardtoppers.png",
            "popularRank": 1
        },
        {
            "id": "bd2",
            "name": "Cinderella Princess Cake Doll Decor",
            "rating": 4.6,
            "reviews": 52,
            "price": 249,
            "image": "cardtoppers.png",
            "popularRank": 2
        },
        {
            "id": "bd3",
            "name": "Fairy Girl Theme Cake Topper Doll",
            "rating": 4.5,
            "reviews": 38,
            "price": 199,
            "image": "cardtoppers.png",
            "popularRank": 3
        },
        {
            "id": "bd4",
            "name": "Royal King & Queen Mini Doll Sets (Pack of 2)",
            "rating": 4.7,
            "reviews": 41,
            "price": 299,
            "image": "cardtoppers.png",
            "popularRank": 4
        },
        {
            "id": "bd5",
            "name": "Cute Angel Wings Doll Cake Decoration",
            "rating": 4.4,
            "reviews": 28,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 5
        },
        {
            "id": "bd6",
            "name": "Happy Birthday Doll Dress Foil Balloon bunch",
            "rating": 4.3,
            "reviews": 21,
            "price": 199,
            "image": "nltc_prod_balloon_starfoil.png",
            "popularRank": 6
        },
        {
            "id": "bd7",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5)",
            "rating": 4.3,
            "reviews": 25,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 7
        },
        {
            "id": "bd8",
            "name": "Happy Anniversary Golden Script Foil Banner",
            "rating": 4.6,
            "reviews": 42,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 8
        },
        {
            "id": "bd9",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50)",
            "rating": 4.9,
            "reviews": 59,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 9
        },
        {
            "id": "bd10",
            "name": "Anniversary LED Heart Fairy Lights (Warm White)",
            "rating": 4.4,
            "reviews": 76,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 10
        },
        {
            "id": "bd11",
            "name": "Silver Happy Anniversary Foil Letter Balloons",
            "rating": 4.7,
            "reviews": 93,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 11
        },
        {
            "id": "bd12",
            "name": "Black & Gold Anniversary Backdrop Curtain Set",
            "rating": 5,
            "reviews": 110,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 12
        },
        {
            "id": "bd13",
            "name": "Golden Anniversary Acrylic Cake Topper",
            "rating": 4.5,
            "reviews": 127,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 13
        },
        {
            "id": "bd14",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs)",
            "rating": 4.8,
            "reviews": 144,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 14
        },
        {
            "id": "bd15",
            "name": "Champagne Bottle Big Foil Balloon",
            "rating": 4.3,
            "reviews": 161,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 15
        },
        {
            "id": "bd16",
            "name": "Anniversary King & Queen Satin Sashes Set",
            "rating": 4.6,
            "reviews": 178,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 16
        },
        {
            "id": "bd17",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4)",
            "rating": 4.9,
            "reviews": 195,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 17
        },
        {
            "id": "bd18",
            "name": "Together Forever Heart Shape Confetti Popper",
            "rating": 4.4,
            "reviews": 212,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 18
        },
        {
            "id": "bd19",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop",
            "rating": 4.7,
            "reviews": 229,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 19
        },
        {
            "id": "bd20",
            "name": "Red Rose Petals & Candle Romantic Decor Kit",
            "rating": 5,
            "reviews": 36,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 20
        },
        {
            "id": "bd21",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale)",
            "rating": 4.5,
            "reviews": 53,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 21
        },
        {
            "id": "bd22",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10)",
            "rating": 4.8,
            "reviews": 70,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 22
        },
        {
            "id": "bd23",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10)",
            "rating": 4.3,
            "reviews": 87,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 23
        },
        {
            "id": "bd24",
            "name": "Love LED Neon Light Wall Hanging",
            "rating": 4.6,
            "reviews": 104,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 24
        },
        {
            "id": "bd25",
            "name": "Anniversary Mixed Color Foil Balloon Set",
            "rating": 4.9,
            "reviews": 121,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 25
        },
        {
            "id": "bd26",
            "name": "Bestseller Romantic Anniversary Decoration Set",
            "rating": 4.4,
            "reviews": 138,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 26
        },
        {
            "id": "bd27",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 2)",
            "rating": 4.7,
            "reviews": 155,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 27
        },
        {
            "id": "bd28",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 2)",
            "rating": 5,
            "reviews": 172,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 28
        },
        {
            "id": "bd29",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 2)",
            "rating": 4.5,
            "reviews": 189,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 29
        },
        {
            "id": "bd30",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 2)",
            "rating": 4.8,
            "reviews": 206,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 30
        },
        {
            "id": "bd31",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 2)",
            "rating": 4.3,
            "reviews": 223,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 31
        },
        {
            "id": "bd32",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 2)",
            "rating": 4.6,
            "reviews": 30,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 32
        },
        {
            "id": "bd33",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 2)",
            "rating": 4.9,
            "reviews": 47,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 33
        },
        {
            "id": "bd34",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 2)",
            "rating": 4.4,
            "reviews": 64,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 34
        },
        {
            "id": "bd35",
            "name": "Champagne Bottle Big Foil Balloon (Style 2)",
            "rating": 4.7,
            "reviews": 81,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 35
        },
        {
            "id": "bd36",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 2)",
            "rating": 5,
            "reviews": 98,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 36
        },
        {
            "id": "bd37",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 2)",
            "rating": 4.5,
            "reviews": 115,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 37
        },
        {
            "id": "bd38",
            "name": "Together Forever Heart Shape Confetti Popper (Style 2)",
            "rating": 4.8,
            "reviews": 132,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 38
        },
        {
            "id": "bd39",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 2)",
            "rating": 4.3,
            "reviews": 149,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 39
        },
        {
            "id": "bd40",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 2)",
            "rating": 4.6,
            "reviews": 166,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 40
        },
        {
            "id": "bd41",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 2)",
            "rating": 4.9,
            "reviews": 183,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 41
        },
        {
            "id": "bd42",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 2)",
            "rating": 4.4,
            "reviews": 200,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 42
        },
        {
            "id": "bd43",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 2)",
            "rating": 4.7,
            "reviews": 217,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 43
        },
        {
            "id": "bd44",
            "name": "Love LED Neon Light Wall Hanging (Style 2)",
            "rating": 5,
            "reviews": 234,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 44
        },
        {
            "id": "bd45",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 2)",
            "rating": 4.5,
            "reviews": 41,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 45
        },
        {
            "id": "bd46",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 2)",
            "rating": 4.8,
            "reviews": 58,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 46
        },
        {
            "id": "bd47",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 3)",
            "rating": 4.3,
            "reviews": 75,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 47
        },
        {
            "id": "bd48",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 3)",
            "rating": 4.6,
            "reviews": 92,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 48
        },
        {
            "id": "bd49",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 3)",
            "rating": 4.9,
            "reviews": 109,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 49
        },
        {
            "id": "bd50",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 3)",
            "rating": 4.4,
            "reviews": 126,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 50
        },
        {
            "id": "bd51",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 3)",
            "rating": 4.7,
            "reviews": 143,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 51
        },
        {
            "id": "bd52",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 3)",
            "rating": 5,
            "reviews": 160,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 52
        },
        {
            "id": "bd53",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 3)",
            "rating": 4.5,
            "reviews": 177,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 53
        },
        {
            "id": "bd54",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 3)",
            "rating": 4.8,
            "reviews": 194,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 54
        },
        {
            "id": "bd55",
            "name": "Champagne Bottle Big Foil Balloon (Style 3)",
            "rating": 4.3,
            "reviews": 211,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 55
        },
        {
            "id": "bd56",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 3)",
            "rating": 4.6,
            "reviews": 228,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 56
        },
        {
            "id": "bd57",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 3)",
            "rating": 4.9,
            "reviews": 35,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 57
        },
        {
            "id": "bd58",
            "name": "Together Forever Heart Shape Confetti Popper (Style 3)",
            "rating": 4.4,
            "reviews": 52,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 58
        },
        {
            "id": "bd59",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 3)",
            "rating": 4.7,
            "reviews": 69,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 59
        },
        {
            "id": "bd60",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 3)",
            "rating": 5,
            "reviews": 86,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 60
        },
        {
            "id": "bd61",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 3)",
            "rating": 4.5,
            "reviews": 103,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 61
        },
        {
            "id": "bd62",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 3)",
            "rating": 4.8,
            "reviews": 120,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 62
        },
        {
            "id": "bd63",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 3)",
            "rating": 4.3,
            "reviews": 137,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 63
        },
        {
            "id": "bd64",
            "name": "Love LED Neon Light Wall Hanging (Style 3)",
            "rating": 4.6,
            "reviews": 154,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 64
        },
        {
            "id": "bd65",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 3)",
            "rating": 4.9,
            "reviews": 171,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 65
        },
        {
            "id": "bd66",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 3)",
            "rating": 4.4,
            "reviews": 188,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 66
        }
    ],
    "golden-no-candles": [
        {
            "id": "bg1",
            "name": "Number Birthday Candles Golden (0-9)",
            "rating": 4.9,
            "reviews": 74,
            "price": 79,
            "image": "nltc_prod_balloon_num1foil.png",
            "popularRank": 1
        },
        {
            "id": "bg2",
            "name": "Glitter Golden Number Candle Set (Double Digit)",
            "rating": 4.7,
            "reviews": 63,
            "price": 149,
            "image": "nltc_prod_balloon_num1foil.png",
            "popularRank": 2
        },
        {
            "id": "bg3",
            "name": "Gold Foil Crown Number Candle (Milestone 1)",
            "rating": 4.8,
            "reviews": 52,
            "price": 99,
            "image": "nltc_prod_balloon_num1foil.png",
            "popularRank": 3
        },
        {
            "id": "bg4",
            "name": "Classic Golden Number Candle (3)",
            "rating": 4.5,
            "reviews": 38,
            "price": 79,
            "image": "nltc_prod_balloon_num1foil.png",
            "popularRank": 4
        },
        {
            "id": "bg5",
            "name": "Classic Golden Number Candle (5)",
            "rating": 4.4,
            "reviews": 29,
            "price": 79,
            "image": "nltc_prod_balloon_num1foil.png",
            "popularRank": 5
        },
        {
            "id": "bg6",
            "name": "Classic Golden Number Candle (0)",
            "rating": 4.3,
            "reviews": 21,
            "price": 79,
            "image": "nltc_prod_balloon_num1foil.png",
            "popularRank": 6
        },
        {
            "id": "bg7",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5)",
            "rating": 4.3,
            "reviews": 25,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 7
        },
        {
            "id": "bg8",
            "name": "Happy Anniversary Golden Script Foil Banner",
            "rating": 4.6,
            "reviews": 42,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 8
        },
        {
            "id": "bg9",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50)",
            "rating": 4.9,
            "reviews": 59,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 9
        },
        {
            "id": "bg10",
            "name": "Anniversary LED Heart Fairy Lights (Warm White)",
            "rating": 4.4,
            "reviews": 76,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 10
        },
        {
            "id": "bg11",
            "name": "Silver Happy Anniversary Foil Letter Balloons",
            "rating": 4.7,
            "reviews": 93,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 11
        },
        {
            "id": "bg12",
            "name": "Black & Gold Anniversary Backdrop Curtain Set",
            "rating": 5,
            "reviews": 110,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 12
        },
        {
            "id": "bg13",
            "name": "Golden Anniversary Acrylic Cake Topper",
            "rating": 4.5,
            "reviews": 127,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 13
        },
        {
            "id": "bg14",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs)",
            "rating": 4.8,
            "reviews": 144,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 14
        },
        {
            "id": "bg15",
            "name": "Champagne Bottle Big Foil Balloon",
            "rating": 4.3,
            "reviews": 161,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 15
        },
        {
            "id": "bg16",
            "name": "Anniversary King & Queen Satin Sashes Set",
            "rating": 4.6,
            "reviews": 178,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 16
        },
        {
            "id": "bg17",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4)",
            "rating": 4.9,
            "reviews": 195,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 17
        },
        {
            "id": "bg18",
            "name": "Together Forever Heart Shape Confetti Popper",
            "rating": 4.4,
            "reviews": 212,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 18
        },
        {
            "id": "bg19",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop",
            "rating": 4.7,
            "reviews": 229,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 19
        },
        {
            "id": "bg20",
            "name": "Red Rose Petals & Candle Romantic Decor Kit",
            "rating": 5,
            "reviews": 36,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 20
        },
        {
            "id": "bg21",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale)",
            "rating": 4.5,
            "reviews": 53,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 21
        },
        {
            "id": "bg22",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10)",
            "rating": 4.8,
            "reviews": 70,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 22
        },
        {
            "id": "bg23",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10)",
            "rating": 4.3,
            "reviews": 87,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 23
        },
        {
            "id": "bg24",
            "name": "Love LED Neon Light Wall Hanging",
            "rating": 4.6,
            "reviews": 104,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 24
        },
        {
            "id": "bg25",
            "name": "Anniversary Mixed Color Foil Balloon Set",
            "rating": 4.9,
            "reviews": 121,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 25
        },
        {
            "id": "bg26",
            "name": "Bestseller Romantic Anniversary Decoration Set",
            "rating": 4.4,
            "reviews": 138,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 26
        },
        {
            "id": "bg27",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 2)",
            "rating": 4.7,
            "reviews": 155,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 27
        },
        {
            "id": "bg28",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 2)",
            "rating": 5,
            "reviews": 172,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 28
        },
        {
            "id": "bg29",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 2)",
            "rating": 4.5,
            "reviews": 189,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 29
        },
        {
            "id": "bg30",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 2)",
            "rating": 4.8,
            "reviews": 206,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 30
        },
        {
            "id": "bg31",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 2)",
            "rating": 4.3,
            "reviews": 223,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 31
        },
        {
            "id": "bg32",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 2)",
            "rating": 4.6,
            "reviews": 30,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 32
        },
        {
            "id": "bg33",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 2)",
            "rating": 4.9,
            "reviews": 47,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 33
        },
        {
            "id": "bg34",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 2)",
            "rating": 4.4,
            "reviews": 64,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 34
        },
        {
            "id": "bg35",
            "name": "Champagne Bottle Big Foil Balloon (Style 2)",
            "rating": 4.7,
            "reviews": 81,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 35
        },
        {
            "id": "bg36",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 2)",
            "rating": 5,
            "reviews": 98,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 36
        },
        {
            "id": "bg37",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 2)",
            "rating": 4.5,
            "reviews": 115,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 37
        },
        {
            "id": "bg38",
            "name": "Together Forever Heart Shape Confetti Popper (Style 2)",
            "rating": 4.8,
            "reviews": 132,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 38
        },
        {
            "id": "bg39",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 2)",
            "rating": 4.3,
            "reviews": 149,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 39
        },
        {
            "id": "bg40",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 2)",
            "rating": 4.6,
            "reviews": 166,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 40
        },
        {
            "id": "bg41",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 2)",
            "rating": 4.9,
            "reviews": 183,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 41
        },
        {
            "id": "bg42",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 2)",
            "rating": 4.4,
            "reviews": 200,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 42
        },
        {
            "id": "bg43",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 2)",
            "rating": 4.7,
            "reviews": 217,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 43
        },
        {
            "id": "bg44",
            "name": "Love LED Neon Light Wall Hanging (Style 2)",
            "rating": 5,
            "reviews": 234,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 44
        },
        {
            "id": "bg45",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 2)",
            "rating": 4.5,
            "reviews": 41,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 45
        },
        {
            "id": "bg46",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 2)",
            "rating": 4.8,
            "reviews": 58,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 46
        },
        {
            "id": "bg47",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 3)",
            "rating": 4.3,
            "reviews": 75,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 47
        },
        {
            "id": "bg48",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 3)",
            "rating": 4.6,
            "reviews": 92,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 48
        },
        {
            "id": "bg49",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 3)",
            "rating": 4.9,
            "reviews": 109,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 49
        },
        {
            "id": "bg50",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 3)",
            "rating": 4.4,
            "reviews": 126,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 50
        },
        {
            "id": "bg51",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 3)",
            "rating": 4.7,
            "reviews": 143,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 51
        },
        {
            "id": "bg52",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 3)",
            "rating": 5,
            "reviews": 160,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 52
        },
        {
            "id": "bg53",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 3)",
            "rating": 4.5,
            "reviews": 177,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 53
        },
        {
            "id": "bg54",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 3)",
            "rating": 4.8,
            "reviews": 194,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 54
        },
        {
            "id": "bg55",
            "name": "Champagne Bottle Big Foil Balloon (Style 3)",
            "rating": 4.3,
            "reviews": 211,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 55
        },
        {
            "id": "bg56",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 3)",
            "rating": 4.6,
            "reviews": 228,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 56
        },
        {
            "id": "bg57",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 3)",
            "rating": 4.9,
            "reviews": 35,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 57
        },
        {
            "id": "bg58",
            "name": "Together Forever Heart Shape Confetti Popper (Style 3)",
            "rating": 4.4,
            "reviews": 52,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 58
        },
        {
            "id": "bg59",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 3)",
            "rating": 4.7,
            "reviews": 69,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 59
        },
        {
            "id": "bg60",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 3)",
            "rating": 5,
            "reviews": 86,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 60
        },
        {
            "id": "bg61",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 3)",
            "rating": 4.5,
            "reviews": 103,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 61
        },
        {
            "id": "bg62",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 3)",
            "rating": 4.8,
            "reviews": 120,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 62
        },
        {
            "id": "bg63",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 3)",
            "rating": 4.3,
            "reviews": 137,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 63
        },
        {
            "id": "bg64",
            "name": "Love LED Neon Light Wall Hanging (Style 3)",
            "rating": 4.6,
            "reviews": 154,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 64
        },
        {
            "id": "bg65",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 3)",
            "rating": 4.9,
            "reviews": 171,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 65
        },
        {
            "id": "bg66",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 3)",
            "rating": 4.4,
            "reviews": 188,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 66
        }
    ],
    "balloon-pump": [
        {
            "id": "bp1",
            "name": "Double Action Balloon Hand Pump (Fast Air)",
            "rating": 4.8,
            "reviews": 88,
            "price": 129,
            "image": "cardpoppers.png",
            "popularRank": 1
        },
        {
            "id": "bp2",
            "name": "Dual Nozzle Electric Balloon Pump (Portable)",
            "rating": 4.9,
            "reviews": 124,
            "price": 999,
            "image": "cardpoppers.png",
            "popularRank": 2
        },
        {
            "id": "bp3",
            "name": "Heavy Duty Plastic Balloon Pump (Blue)",
            "rating": 4.5,
            "reviews": 48,
            "price": 119,
            "image": "cardpoppers.png",
            "popularRank": 3
        },
        {
            "id": "bp4",
            "name": "Fast Balloon Arch Setup Ring Clamps (Pack of 50)",
            "rating": 4.6,
            "reviews": 52,
            "price": 199,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 4
        },
        {
            "id": "bp5",
            "name": "Double Air Pump Adaptor Nozzles (Pack of 4)",
            "rating": 4.3,
            "reviews": 21,
            "price": 79,
            "image": "cardpoppers.png",
            "popularRank": 5
        },
        {
            "id": "bp6",
            "name": "Balloon Garland strip & knotter clip combo",
            "rating": 4.7,
            "reviews": 76,
            "price": 149,
            "image": "nltc_prod_balloon_confetti.png",
            "popularRank": 6
        },
        {
            "id": "bp7",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5)",
            "rating": 4.3,
            "reviews": 25,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 7
        },
        {
            "id": "bp8",
            "name": "Happy Anniversary Golden Script Foil Banner",
            "rating": 4.6,
            "reviews": 42,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 8
        },
        {
            "id": "bp9",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50)",
            "rating": 4.9,
            "reviews": 59,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 9
        },
        {
            "id": "bp10",
            "name": "Anniversary LED Heart Fairy Lights (Warm White)",
            "rating": 4.4,
            "reviews": 76,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 10
        },
        {
            "id": "bp11",
            "name": "Silver Happy Anniversary Foil Letter Balloons",
            "rating": 4.7,
            "reviews": 93,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 11
        },
        {
            "id": "bp12",
            "name": "Black & Gold Anniversary Backdrop Curtain Set",
            "rating": 5,
            "reviews": 110,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 12
        },
        {
            "id": "bp13",
            "name": "Golden Anniversary Acrylic Cake Topper",
            "rating": 4.5,
            "reviews": 127,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 13
        },
        {
            "id": "bp14",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs)",
            "rating": 4.8,
            "reviews": 144,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 14
        },
        {
            "id": "bp15",
            "name": "Champagne Bottle Big Foil Balloon",
            "rating": 4.3,
            "reviews": 161,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 15
        },
        {
            "id": "bp16",
            "name": "Anniversary King & Queen Satin Sashes Set",
            "rating": 4.6,
            "reviews": 178,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 16
        },
        {
            "id": "bp17",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4)",
            "rating": 4.9,
            "reviews": 195,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 17
        },
        {
            "id": "bp18",
            "name": "Together Forever Heart Shape Confetti Popper",
            "rating": 4.4,
            "reviews": 212,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 18
        },
        {
            "id": "bp19",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop",
            "rating": 4.7,
            "reviews": 229,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 19
        },
        {
            "id": "bp20",
            "name": "Red Rose Petals & Candle Romantic Decor Kit",
            "rating": 5,
            "reviews": 36,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 20
        },
        {
            "id": "bp21",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale)",
            "rating": 4.5,
            "reviews": 53,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 21
        },
        {
            "id": "bp22",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10)",
            "rating": 4.8,
            "reviews": 70,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 22
        },
        {
            "id": "bp23",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10)",
            "rating": 4.3,
            "reviews": 87,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 23
        },
        {
            "id": "bp24",
            "name": "Love LED Neon Light Wall Hanging",
            "rating": 4.6,
            "reviews": 104,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 24
        },
        {
            "id": "bp25",
            "name": "Anniversary Mixed Color Foil Balloon Set",
            "rating": 4.9,
            "reviews": 121,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 25
        },
        {
            "id": "bp26",
            "name": "Bestseller Romantic Anniversary Decoration Set",
            "rating": 4.4,
            "reviews": 138,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 26
        },
        {
            "id": "bp27",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 2)",
            "rating": 4.7,
            "reviews": 155,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 27
        },
        {
            "id": "bp28",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 2)",
            "rating": 5,
            "reviews": 172,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 28
        },
        {
            "id": "bp29",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 2)",
            "rating": 4.5,
            "reviews": 189,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 29
        },
        {
            "id": "bp30",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 2)",
            "rating": 4.8,
            "reviews": 206,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 30
        },
        {
            "id": "bp31",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 2)",
            "rating": 4.3,
            "reviews": 223,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 31
        },
        {
            "id": "bp32",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 2)",
            "rating": 4.6,
            "reviews": 30,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 32
        },
        {
            "id": "bp33",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 2)",
            "rating": 4.9,
            "reviews": 47,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 33
        },
        {
            "id": "bp34",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 2)",
            "rating": 4.4,
            "reviews": 64,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 34
        },
        {
            "id": "bp35",
            "name": "Champagne Bottle Big Foil Balloon (Style 2)",
            "rating": 4.7,
            "reviews": 81,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 35
        },
        {
            "id": "bp36",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 2)",
            "rating": 5,
            "reviews": 98,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 36
        },
        {
            "id": "bp37",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 2)",
            "rating": 4.5,
            "reviews": 115,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 37
        },
        {
            "id": "bp38",
            "name": "Together Forever Heart Shape Confetti Popper (Style 2)",
            "rating": 4.8,
            "reviews": 132,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 38
        },
        {
            "id": "bp39",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 2)",
            "rating": 4.3,
            "reviews": 149,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 39
        },
        {
            "id": "bp40",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 2)",
            "rating": 4.6,
            "reviews": 166,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 40
        },
        {
            "id": "bp41",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 2)",
            "rating": 4.9,
            "reviews": 183,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 41
        },
        {
            "id": "bp42",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 2)",
            "rating": 4.4,
            "reviews": 200,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 42
        },
        {
            "id": "bp43",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 2)",
            "rating": 4.7,
            "reviews": 217,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 43
        },
        {
            "id": "bp44",
            "name": "Love LED Neon Light Wall Hanging (Style 2)",
            "rating": 5,
            "reviews": 234,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 44
        },
        {
            "id": "bp45",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 2)",
            "rating": 4.5,
            "reviews": 41,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 45
        },
        {
            "id": "bp46",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 2)",
            "rating": 4.8,
            "reviews": 58,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 46
        },
        {
            "id": "bp47",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 3)",
            "rating": 4.3,
            "reviews": 75,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 47
        },
        {
            "id": "bp48",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 3)",
            "rating": 4.6,
            "reviews": 92,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 48
        },
        {
            "id": "bp49",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 3)",
            "rating": 4.9,
            "reviews": 109,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 49
        },
        {
            "id": "bp50",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 3)",
            "rating": 4.4,
            "reviews": 126,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 50
        },
        {
            "id": "bp51",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 3)",
            "rating": 4.7,
            "reviews": 143,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 51
        },
        {
            "id": "bp52",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 3)",
            "rating": 5,
            "reviews": 160,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 52
        },
        {
            "id": "bp53",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 3)",
            "rating": 4.5,
            "reviews": 177,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 53
        },
        {
            "id": "bp54",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 3)",
            "rating": 4.8,
            "reviews": 194,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 54
        },
        {
            "id": "bp55",
            "name": "Champagne Bottle Big Foil Balloon (Style 3)",
            "rating": 4.3,
            "reviews": 211,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 55
        },
        {
            "id": "bp56",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 3)",
            "rating": 4.6,
            "reviews": 228,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 56
        },
        {
            "id": "bp57",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 3)",
            "rating": 4.9,
            "reviews": 35,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 57
        },
        {
            "id": "bp58",
            "name": "Together Forever Heart Shape Confetti Popper (Style 3)",
            "rating": 4.4,
            "reviews": 52,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 58
        },
        {
            "id": "bp59",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 3)",
            "rating": 4.7,
            "reviews": 69,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 59
        },
        {
            "id": "bp60",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 3)",
            "rating": 5,
            "reviews": 86,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 60
        },
        {
            "id": "bp61",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 3)",
            "rating": 4.5,
            "reviews": 103,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 61
        },
        {
            "id": "bp62",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 3)",
            "rating": 4.8,
            "reviews": 120,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 62
        },
        {
            "id": "bp63",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 3)",
            "rating": 4.3,
            "reviews": 137,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 63
        },
        {
            "id": "bp64",
            "name": "Love LED Neon Light Wall Hanging (Style 3)",
            "rating": 4.6,
            "reviews": 154,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 64
        },
        {
            "id": "bp65",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 3)",
            "rating": 4.9,
            "reviews": 171,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 65
        },
        {
            "id": "bp66",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 3)",
            "rating": 4.4,
            "reviews": 188,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 66
        }
    ],
    "3d-butterfly": [
        {
            "id": "bf1",
            "name": "Hollow Metallic 3D Butterflies (Gold, Pack of 12)",
            "rating": 4.9,
            "reviews": 104,
            "price": 149,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 1
        },
        {
            "id": "bf2",
            "name": "Hollow Metallic 3D Butterflies (Silver, Pack of 12)",
            "rating": 4.7,
            "reviews": 83,
            "price": 149,
            "image": "nltc_prod_balloon_starfoil.png",
            "popularRank": 2
        },
        {
            "id": "bf3",
            "name": "Rose Gold 3D Butterfly Wall Stickers (Pack of 12)",
            "rating": 4.8,
            "reviews": 91,
            "price": 149,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 3
        },
        {
            "id": "bf4",
            "name": "Glitter 3D Paper Butterfly Backdrops (Pack of 24)",
            "rating": 4.5,
            "reviews": 54,
            "price": 199,
            "image": "cardtoppers.png",
            "popularRank": 4
        },
        {
            "id": "bf5",
            "name": "Colorful 3D Butterflies Wall Decor Set",
            "rating": 4.4,
            "reviews": 29,
            "price": 129,
            "image": "nltc_prod_balloon_pastel.png",
            "popularRank": 5
        },
        {
            "id": "bf6",
            "name": "Giant Foil Butterfly Shape Helium Balloon",
            "rating": 4.6,
            "reviews": 38,
            "price": 189,
            "image": "nltc_prod_balloon_starfoil.png",
            "popularRank": 6
        },
        {
            "id": "bf7",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5)",
            "rating": 4.3,
            "reviews": 25,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 7
        },
        {
            "id": "bf8",
            "name": "Happy Anniversary Golden Script Foil Banner",
            "rating": 4.6,
            "reviews": 42,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 8
        },
        {
            "id": "bf9",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50)",
            "rating": 4.9,
            "reviews": 59,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 9
        },
        {
            "id": "bf10",
            "name": "Anniversary LED Heart Fairy Lights (Warm White)",
            "rating": 4.4,
            "reviews": 76,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 10
        },
        {
            "id": "bf11",
            "name": "Silver Happy Anniversary Foil Letter Balloons",
            "rating": 4.7,
            "reviews": 93,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 11
        },
        {
            "id": "bf12",
            "name": "Black & Gold Anniversary Backdrop Curtain Set",
            "rating": 5,
            "reviews": 110,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 12
        },
        {
            "id": "bf13",
            "name": "Golden Anniversary Acrylic Cake Topper",
            "rating": 4.5,
            "reviews": 127,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 13
        },
        {
            "id": "bf14",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs)",
            "rating": 4.8,
            "reviews": 144,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 14
        },
        {
            "id": "bf15",
            "name": "Champagne Bottle Big Foil Balloon",
            "rating": 4.3,
            "reviews": 161,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 15
        },
        {
            "id": "bf16",
            "name": "Anniversary King & Queen Satin Sashes Set",
            "rating": 4.6,
            "reviews": 178,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 16
        },
        {
            "id": "bf17",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4)",
            "rating": 4.9,
            "reviews": 195,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 17
        },
        {
            "id": "bf18",
            "name": "Together Forever Heart Shape Confetti Popper",
            "rating": 4.4,
            "reviews": 212,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 18
        },
        {
            "id": "bf19",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop",
            "rating": 4.7,
            "reviews": 229,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 19
        },
        {
            "id": "bf20",
            "name": "Red Rose Petals & Candle Romantic Decor Kit",
            "rating": 5,
            "reviews": 36,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 20
        },
        {
            "id": "bf21",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale)",
            "rating": 4.5,
            "reviews": 53,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 21
        },
        {
            "id": "bf22",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10)",
            "rating": 4.8,
            "reviews": 70,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 22
        },
        {
            "id": "bf23",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10)",
            "rating": 4.3,
            "reviews": 87,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 23
        },
        {
            "id": "bf24",
            "name": "Love LED Neon Light Wall Hanging",
            "rating": 4.6,
            "reviews": 104,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 24
        },
        {
            "id": "bf25",
            "name": "Anniversary Mixed Color Foil Balloon Set",
            "rating": 4.9,
            "reviews": 121,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 25
        },
        {
            "id": "bf26",
            "name": "Bestseller Romantic Anniversary Decoration Set",
            "rating": 4.4,
            "reviews": 138,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 26
        },
        {
            "id": "bf27",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 2)",
            "rating": 4.7,
            "reviews": 155,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 27
        },
        {
            "id": "bf28",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 2)",
            "rating": 5,
            "reviews": 172,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 28
        },
        {
            "id": "bf29",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 2)",
            "rating": 4.5,
            "reviews": 189,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 29
        },
        {
            "id": "bf30",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 2)",
            "rating": 4.8,
            "reviews": 206,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 30
        },
        {
            "id": "bf31",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 2)",
            "rating": 4.3,
            "reviews": 223,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 31
        },
        {
            "id": "bf32",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 2)",
            "rating": 4.6,
            "reviews": 30,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 32
        },
        {
            "id": "bf33",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 2)",
            "rating": 4.9,
            "reviews": 47,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 33
        },
        {
            "id": "bf34",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 2)",
            "rating": 4.4,
            "reviews": 64,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 34
        },
        {
            "id": "bf35",
            "name": "Champagne Bottle Big Foil Balloon (Style 2)",
            "rating": 4.7,
            "reviews": 81,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 35
        },
        {
            "id": "bf36",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 2)",
            "rating": 5,
            "reviews": 98,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 36
        },
        {
            "id": "bf37",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 2)",
            "rating": 4.5,
            "reviews": 115,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 37
        },
        {
            "id": "bf38",
            "name": "Together Forever Heart Shape Confetti Popper (Style 2)",
            "rating": 4.8,
            "reviews": 132,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 38
        },
        {
            "id": "bf39",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 2)",
            "rating": 4.3,
            "reviews": 149,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 39
        },
        {
            "id": "bf40",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 2)",
            "rating": 4.6,
            "reviews": 166,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 40
        },
        {
            "id": "bf41",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 2)",
            "rating": 4.9,
            "reviews": 183,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 41
        },
        {
            "id": "bf42",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 2)",
            "rating": 4.4,
            "reviews": 200,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 42
        },
        {
            "id": "bf43",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 2)",
            "rating": 4.7,
            "reviews": 217,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 43
        },
        {
            "id": "bf44",
            "name": "Love LED Neon Light Wall Hanging (Style 2)",
            "rating": 5,
            "reviews": 234,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 44
        },
        {
            "id": "bf45",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 2)",
            "rating": 4.5,
            "reviews": 41,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 45
        },
        {
            "id": "bf46",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 2)",
            "rating": 4.8,
            "reviews": 58,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 46
        },
        {
            "id": "bf47",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 3)",
            "rating": 4.3,
            "reviews": 75,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 47
        },
        {
            "id": "bf48",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 3)",
            "rating": 4.6,
            "reviews": 92,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 48
        },
        {
            "id": "bf49",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 3)",
            "rating": 4.9,
            "reviews": 109,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 49
        },
        {
            "id": "bf50",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 3)",
            "rating": 4.4,
            "reviews": 126,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 50
        },
        {
            "id": "bf51",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 3)",
            "rating": 4.7,
            "reviews": 143,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 51
        },
        {
            "id": "bf52",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 3)",
            "rating": 5,
            "reviews": 160,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 52
        },
        {
            "id": "bf53",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 3)",
            "rating": 4.5,
            "reviews": 177,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 53
        },
        {
            "id": "bf54",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 3)",
            "rating": 4.8,
            "reviews": 194,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 54
        },
        {
            "id": "bf55",
            "name": "Champagne Bottle Big Foil Balloon (Style 3)",
            "rating": 4.3,
            "reviews": 211,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 55
        },
        {
            "id": "bf56",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 3)",
            "rating": 4.6,
            "reviews": 228,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 56
        },
        {
            "id": "bf57",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 3)",
            "rating": 4.9,
            "reviews": 35,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 57
        },
        {
            "id": "bf58",
            "name": "Together Forever Heart Shape Confetti Popper (Style 3)",
            "rating": 4.4,
            "reviews": 52,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 58
        },
        {
            "id": "bf59",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 3)",
            "rating": 4.7,
            "reviews": 69,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 59
        },
        {
            "id": "bf60",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 3)",
            "rating": 5,
            "reviews": 86,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 60
        },
        {
            "id": "bf61",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 3)",
            "rating": 4.5,
            "reviews": 103,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 61
        },
        {
            "id": "bf62",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 3)",
            "rating": 4.8,
            "reviews": 120,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 62
        },
        {
            "id": "bf63",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 3)",
            "rating": 4.3,
            "reviews": 137,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 63
        },
        {
            "id": "bf64",
            "name": "Love LED Neon Light Wall Hanging (Style 3)",
            "rating": 4.6,
            "reviews": 154,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 64
        },
        {
            "id": "bf65",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 3)",
            "rating": 4.9,
            "reviews": 171,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 65
        },
        {
            "id": "bf66",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 3)",
            "rating": 4.4,
            "reviews": 188,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 66
        }
    ],
    "snow-spray": [
        {
            "id": "by1",
            "name": "Snow Spray & Party String Spray (Pack of 2)",
            "rating": 4.4,
            "reviews": 67,
            "price": 119,
            "image": "nltc_prod_balloon_pastel.png",
            "popularRank": 1
        },
        {
            "id": "by2",
            "name": "Magic Snow Spray Foam Can (250 ml)",
            "rating": 4.5,
            "reviews": 88,
            "price": 59,
            "image": "nltc_prod_balloon_pastel.png",
            "popularRank": 2
        },
        {
            "id": "by3",
            "name": "Multicolor Silly String Party Spray Can",
            "rating": 4.3,
            "reviews": 31,
            "price": 69,
            "image": "nltc_prod_balloon_hbfoil.png",
            "popularRank": 3
        },
        {
            "id": "by4",
            "name": "Celebration Foam Spray Combo Pack (4 Cans)",
            "rating": 4.6,
            "reviews": 52,
            "price": 219,
            "image": "nltc_prod_balloon_pastel.png",
            "popularRank": 4
        },
        {
            "id": "by5",
            "name": "Scented Snow Spray Party Can (Pack of 2)",
            "rating": 4.2,
            "reviews": 21,
            "price": 129,
            "image": "nltc_prod_balloon_smiley.png",
            "popularRank": 5
        },
        {
            "id": "by6",
            "name": "Premium Metallic Streamer Spray Can",
            "rating": 4.1,
            "reviews": 18,
            "price": 89,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 6
        },
        {
            "id": "by7",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5)",
            "rating": 4.3,
            "reviews": 25,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 7
        },
        {
            "id": "by8",
            "name": "Happy Anniversary Golden Script Foil Banner",
            "rating": 4.6,
            "reviews": 42,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 8
        },
        {
            "id": "by9",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50)",
            "rating": 4.9,
            "reviews": 59,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 9
        },
        {
            "id": "by10",
            "name": "Anniversary LED Heart Fairy Lights (Warm White)",
            "rating": 4.4,
            "reviews": 76,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 10
        },
        {
            "id": "by11",
            "name": "Silver Happy Anniversary Foil Letter Balloons",
            "rating": 4.7,
            "reviews": 93,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 11
        },
        {
            "id": "by12",
            "name": "Black & Gold Anniversary Backdrop Curtain Set",
            "rating": 5,
            "reviews": 110,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 12
        },
        {
            "id": "by13",
            "name": "Golden Anniversary Acrylic Cake Topper",
            "rating": 4.5,
            "reviews": 127,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 13
        },
        {
            "id": "by14",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs)",
            "rating": 4.8,
            "reviews": 144,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 14
        },
        {
            "id": "by15",
            "name": "Champagne Bottle Big Foil Balloon",
            "rating": 4.3,
            "reviews": 161,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 15
        },
        {
            "id": "by16",
            "name": "Anniversary King & Queen Satin Sashes Set",
            "rating": 4.6,
            "reviews": 178,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 16
        },
        {
            "id": "by17",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4)",
            "rating": 4.9,
            "reviews": 195,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 17
        },
        {
            "id": "by18",
            "name": "Together Forever Heart Shape Confetti Popper",
            "rating": 4.4,
            "reviews": 212,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 18
        },
        {
            "id": "by19",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop",
            "rating": 4.7,
            "reviews": 229,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 19
        },
        {
            "id": "by20",
            "name": "Red Rose Petals & Candle Romantic Decor Kit",
            "rating": 5,
            "reviews": 36,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 20
        },
        {
            "id": "by21",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale)",
            "rating": 4.5,
            "reviews": 53,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 21
        },
        {
            "id": "by22",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10)",
            "rating": 4.8,
            "reviews": 70,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 22
        },
        {
            "id": "by23",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10)",
            "rating": 4.3,
            "reviews": 87,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 23
        },
        {
            "id": "by24",
            "name": "Love LED Neon Light Wall Hanging",
            "rating": 4.6,
            "reviews": 104,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 24
        },
        {
            "id": "by25",
            "name": "Anniversary Mixed Color Foil Balloon Set",
            "rating": 4.9,
            "reviews": 121,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 25
        },
        {
            "id": "by26",
            "name": "Bestseller Romantic Anniversary Decoration Set",
            "rating": 4.4,
            "reviews": 138,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 26
        },
        {
            "id": "by27",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 2)",
            "rating": 4.7,
            "reviews": 155,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 27
        },
        {
            "id": "by28",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 2)",
            "rating": 5,
            "reviews": 172,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 28
        },
        {
            "id": "by29",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 2)",
            "rating": 4.5,
            "reviews": 189,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 29
        },
        {
            "id": "by30",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 2)",
            "rating": 4.8,
            "reviews": 206,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 30
        },
        {
            "id": "by31",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 2)",
            "rating": 4.3,
            "reviews": 223,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 31
        },
        {
            "id": "by32",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 2)",
            "rating": 4.6,
            "reviews": 30,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 32
        },
        {
            "id": "by33",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 2)",
            "rating": 4.9,
            "reviews": 47,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 33
        },
        {
            "id": "by34",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 2)",
            "rating": 4.4,
            "reviews": 64,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 34
        },
        {
            "id": "by35",
            "name": "Champagne Bottle Big Foil Balloon (Style 2)",
            "rating": 4.7,
            "reviews": 81,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 35
        },
        {
            "id": "by36",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 2)",
            "rating": 5,
            "reviews": 98,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 36
        },
        {
            "id": "by37",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 2)",
            "rating": 4.5,
            "reviews": 115,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 37
        },
        {
            "id": "by38",
            "name": "Together Forever Heart Shape Confetti Popper (Style 2)",
            "rating": 4.8,
            "reviews": 132,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 38
        },
        {
            "id": "by39",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 2)",
            "rating": 4.3,
            "reviews": 149,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 39
        },
        {
            "id": "by40",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 2)",
            "rating": 4.6,
            "reviews": 166,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 40
        },
        {
            "id": "by41",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 2)",
            "rating": 4.9,
            "reviews": 183,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 41
        },
        {
            "id": "by42",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 2)",
            "rating": 4.4,
            "reviews": 200,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 42
        },
        {
            "id": "by43",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 2)",
            "rating": 4.7,
            "reviews": 217,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 43
        },
        {
            "id": "by44",
            "name": "Love LED Neon Light Wall Hanging (Style 2)",
            "rating": 5,
            "reviews": 234,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 44
        },
        {
            "id": "by45",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 2)",
            "rating": 4.5,
            "reviews": 41,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 45
        },
        {
            "id": "by46",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 2)",
            "rating": 4.8,
            "reviews": 58,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 46
        },
        {
            "id": "by47",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 3)",
            "rating": 4.3,
            "reviews": 75,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 47
        },
        {
            "id": "by48",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 3)",
            "rating": 4.6,
            "reviews": 92,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 48
        },
        {
            "id": "by49",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 3)",
            "rating": 4.9,
            "reviews": 109,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 49
        },
        {
            "id": "by50",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 3)",
            "rating": 4.4,
            "reviews": 126,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 50
        },
        {
            "id": "by51",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 3)",
            "rating": 4.7,
            "reviews": 143,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 51
        },
        {
            "id": "by52",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 3)",
            "rating": 5,
            "reviews": 160,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 52
        },
        {
            "id": "by53",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 3)",
            "rating": 4.5,
            "reviews": 177,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 53
        },
        {
            "id": "by54",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 3)",
            "rating": 4.8,
            "reviews": 194,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 54
        },
        {
            "id": "by55",
            "name": "Champagne Bottle Big Foil Balloon (Style 3)",
            "rating": 4.3,
            "reviews": 211,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 55
        },
        {
            "id": "by56",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 3)",
            "rating": 4.6,
            "reviews": 228,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 56
        },
        {
            "id": "by57",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 3)",
            "rating": 4.9,
            "reviews": 35,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 57
        },
        {
            "id": "by58",
            "name": "Together Forever Heart Shape Confetti Popper (Style 3)",
            "rating": 4.4,
            "reviews": 52,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 58
        },
        {
            "id": "by59",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 3)",
            "rating": 4.7,
            "reviews": 69,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 59
        },
        {
            "id": "by60",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 3)",
            "rating": 5,
            "reviews": 86,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 60
        },
        {
            "id": "by61",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 3)",
            "rating": 4.5,
            "reviews": 103,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 61
        },
        {
            "id": "by62",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 3)",
            "rating": 4.8,
            "reviews": 120,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 62
        },
        {
            "id": "by63",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 3)",
            "rating": 4.3,
            "reviews": 137,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 63
        },
        {
            "id": "by64",
            "name": "Love LED Neon Light Wall Hanging (Style 3)",
            "rating": 4.6,
            "reviews": 154,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 64
        },
        {
            "id": "by65",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 3)",
            "rating": 4.9,
            "reviews": 171,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 65
        },
        {
            "id": "by66",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 3)",
            "rating": 4.4,
            "reviews": 188,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 66
        }
    ],
    "crazy-ribbon": [
        {
            "id": "br1",
            "name": "Shining Metallic Curling Ribbon (Gold, 100 Yards)",
            "rating": 4.9,
            "reviews": 97,
            "price": 149,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 1
        },
        {
            "id": "br2",
            "name": "Pre-Curled Metallic hanging Streamers (Pack of 6)",
            "rating": 4.7,
            "reviews": 74,
            "price": 129,
            "image": "banner.png",
            "popularRank": 2
        },
        {
            "id": "br3",
            "name": "Rainbow Paper Streamer Ribbon (Roll of 4)",
            "rating": 4.5,
            "reviews": 49,
            "price": 99,
            "image": "banner.png",
            "popularRank": 3
        },
        {
            "id": "br4",
            "name": "Silver Curling Ribbon String Roll (100 Yards)",
            "rating": 4.8,
            "reviews": 63,
            "price": 149,
            "image": "nltc_prod_balloon_starfoil.png",
            "popularRank": 4
        },
        {
            "id": "br5",
            "name": "Red Heart Print Hanging Satin Ribbon (20 Meters)",
            "rating": 4.6,
            "reviews": 38,
            "price": 179,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 5
        },
        {
            "id": "br6",
            "name": "Black & Gold Crazy Hanging Spiral Ribbons (Pack of 12)",
            "rating": 4.4,
            "reviews": 29,
            "price": 199,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 6
        },
        {
            "id": "br7",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5)",
            "rating": 4.3,
            "reviews": 25,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 7
        },
        {
            "id": "br8",
            "name": "Happy Anniversary Golden Script Foil Banner",
            "rating": 4.6,
            "reviews": 42,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 8
        },
        {
            "id": "br9",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50)",
            "rating": 4.9,
            "reviews": 59,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 9
        },
        {
            "id": "br10",
            "name": "Anniversary LED Heart Fairy Lights (Warm White)",
            "rating": 4.4,
            "reviews": 76,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 10
        },
        {
            "id": "br11",
            "name": "Silver Happy Anniversary Foil Letter Balloons",
            "rating": 4.7,
            "reviews": 93,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 11
        },
        {
            "id": "br12",
            "name": "Black & Gold Anniversary Backdrop Curtain Set",
            "rating": 5,
            "reviews": 110,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 12
        },
        {
            "id": "br13",
            "name": "Golden Anniversary Acrylic Cake Topper",
            "rating": 4.5,
            "reviews": 127,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 13
        },
        {
            "id": "br14",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs)",
            "rating": 4.8,
            "reviews": 144,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 14
        },
        {
            "id": "br15",
            "name": "Champagne Bottle Big Foil Balloon",
            "rating": 4.3,
            "reviews": 161,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 15
        },
        {
            "id": "br16",
            "name": "Anniversary King & Queen Satin Sashes Set",
            "rating": 4.6,
            "reviews": 178,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 16
        },
        {
            "id": "br17",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4)",
            "rating": 4.9,
            "reviews": 195,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 17
        },
        {
            "id": "br18",
            "name": "Together Forever Heart Shape Confetti Popper",
            "rating": 4.4,
            "reviews": 212,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 18
        },
        {
            "id": "br19",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop",
            "rating": 4.7,
            "reviews": 229,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 19
        },
        {
            "id": "br20",
            "name": "Red Rose Petals & Candle Romantic Decor Kit",
            "rating": 5,
            "reviews": 36,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 20
        },
        {
            "id": "br21",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale)",
            "rating": 4.5,
            "reviews": 53,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 21
        },
        {
            "id": "br22",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10)",
            "rating": 4.8,
            "reviews": 70,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 22
        },
        {
            "id": "br23",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10)",
            "rating": 4.3,
            "reviews": 87,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 23
        },
        {
            "id": "br24",
            "name": "Love LED Neon Light Wall Hanging",
            "rating": 4.6,
            "reviews": 104,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 24
        },
        {
            "id": "br25",
            "name": "Anniversary Mixed Color Foil Balloon Set",
            "rating": 4.9,
            "reviews": 121,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 25
        },
        {
            "id": "br26",
            "name": "Bestseller Romantic Anniversary Decoration Set",
            "rating": 4.4,
            "reviews": 138,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 26
        },
        {
            "id": "br27",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 2)",
            "rating": 4.7,
            "reviews": 155,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 27
        },
        {
            "id": "br28",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 2)",
            "rating": 5,
            "reviews": 172,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 28
        },
        {
            "id": "br29",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 2)",
            "rating": 4.5,
            "reviews": 189,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 29
        },
        {
            "id": "br30",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 2)",
            "rating": 4.8,
            "reviews": 206,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 30
        },
        {
            "id": "br31",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 2)",
            "rating": 4.3,
            "reviews": 223,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 31
        },
        {
            "id": "br32",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 2)",
            "rating": 4.6,
            "reviews": 30,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 32
        },
        {
            "id": "br33",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 2)",
            "rating": 4.9,
            "reviews": 47,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 33
        },
        {
            "id": "br34",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 2)",
            "rating": 4.4,
            "reviews": 64,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 34
        },
        {
            "id": "br35",
            "name": "Champagne Bottle Big Foil Balloon (Style 2)",
            "rating": 4.7,
            "reviews": 81,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 35
        },
        {
            "id": "br36",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 2)",
            "rating": 5,
            "reviews": 98,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 36
        },
        {
            "id": "br37",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 2)",
            "rating": 4.5,
            "reviews": 115,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 37
        },
        {
            "id": "br38",
            "name": "Together Forever Heart Shape Confetti Popper (Style 2)",
            "rating": 4.8,
            "reviews": 132,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 38
        },
        {
            "id": "br39",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 2)",
            "rating": 4.3,
            "reviews": 149,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 39
        },
        {
            "id": "br40",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 2)",
            "rating": 4.6,
            "reviews": 166,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 40
        },
        {
            "id": "br41",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 2)",
            "rating": 4.9,
            "reviews": 183,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 41
        },
        {
            "id": "br42",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 2)",
            "rating": 4.4,
            "reviews": 200,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 42
        },
        {
            "id": "br43",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 2)",
            "rating": 4.7,
            "reviews": 217,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 43
        },
        {
            "id": "br44",
            "name": "Love LED Neon Light Wall Hanging (Style 2)",
            "rating": 5,
            "reviews": 234,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 44
        },
        {
            "id": "br45",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 2)",
            "rating": 4.5,
            "reviews": 41,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 45
        },
        {
            "id": "br46",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 2)",
            "rating": 4.8,
            "reviews": 58,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 46
        },
        {
            "id": "br47",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 3)",
            "rating": 4.3,
            "reviews": 75,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 47
        },
        {
            "id": "br48",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 3)",
            "rating": 4.6,
            "reviews": 92,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 48
        },
        {
            "id": "br49",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 3)",
            "rating": 4.9,
            "reviews": 109,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 49
        },
        {
            "id": "br50",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 3)",
            "rating": 4.4,
            "reviews": 126,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 50
        },
        {
            "id": "br51",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 3)",
            "rating": 4.7,
            "reviews": 143,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 51
        },
        {
            "id": "br52",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 3)",
            "rating": 5,
            "reviews": 160,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 52
        },
        {
            "id": "br53",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 3)",
            "rating": 4.5,
            "reviews": 177,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 53
        },
        {
            "id": "br54",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 3)",
            "rating": 4.8,
            "reviews": 194,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 54
        },
        {
            "id": "br55",
            "name": "Champagne Bottle Big Foil Balloon (Style 3)",
            "rating": 4.3,
            "reviews": 211,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 55
        },
        {
            "id": "br56",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 3)",
            "rating": 4.6,
            "reviews": 228,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 56
        },
        {
            "id": "br57",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 3)",
            "rating": 4.9,
            "reviews": 35,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 57
        },
        {
            "id": "br58",
            "name": "Together Forever Heart Shape Confetti Popper (Style 3)",
            "rating": 4.4,
            "reviews": 52,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 58
        },
        {
            "id": "br59",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 3)",
            "rating": 4.7,
            "reviews": 69,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 59
        },
        {
            "id": "br60",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 3)",
            "rating": 5,
            "reviews": 86,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 60
        },
        {
            "id": "br61",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 3)",
            "rating": 4.5,
            "reviews": 103,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 61
        },
        {
            "id": "br62",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 3)",
            "rating": 4.8,
            "reviews": 120,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 62
        },
        {
            "id": "br63",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 3)",
            "rating": 4.3,
            "reviews": 137,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 63
        },
        {
            "id": "br64",
            "name": "Love LED Neon Light Wall Hanging (Style 3)",
            "rating": 4.6,
            "reviews": 154,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 64
        },
        {
            "id": "br65",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 3)",
            "rating": 4.9,
            "reviews": 171,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 65
        },
        {
            "id": "br66",
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
            "id": "bp_s1",
            "name": "Large Confetti Party Popper (40 cm)",
            "rating": 4.9,
            "reviews": 142,
            "price": 149,
            "image": "nltc_prod_balloon_confetti.png",
            "popularRank": 1
        },
        {
            "id": "bp_s2",
            "name": "Rose Petals Celebration Popper (30 cm)",
            "rating": 4.8,
            "reviews": 104,
            "price": 169,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 2
        },
        {
            "id": "bp_s3",
            "name": "Golden Foil Streamer Popper (Pack of 2)",
            "rating": 4.7,
            "reviews": 76,
            "price": 199,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 3
        },
        {
            "id": "bp_s4",
            "name": "Mini Desktop Party Poppers (Pack of 6)",
            "rating": 4.4,
            "reviews": 31,
            "price": 129,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 4
        },
        {
            "id": "bp_s5",
            "name": "Multicolor Paper Confetti Popper (Pack of 4)",
            "rating": 4.6,
            "reviews": 92,
            "price": 249,
            "image": "nltc_prod_balloon_pastel.png",
            "popularRank": 5
        },
        {
            "id": "bp_s6",
            "name": "Champagne Bottle Shape Confetti Popper",
            "rating": 4.5,
            "reviews": 58,
            "price": 299,
            "image": "nltc_prod_balloon_hbfoil.png",
            "popularRank": 6
        },
        {
            "id": "bp_pop7",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5)",
            "rating": 4.3,
            "reviews": 25,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 7
        },
        {
            "id": "bp_pop8",
            "name": "Happy Anniversary Golden Script Foil Banner",
            "rating": 4.6,
            "reviews": 42,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 8
        },
        {
            "id": "bp_pop9",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50)",
            "rating": 4.9,
            "reviews": 59,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 9
        },
        {
            "id": "bp_pop10",
            "name": "Anniversary LED Heart Fairy Lights (Warm White)",
            "rating": 4.4,
            "reviews": 76,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 10
        },
        {
            "id": "bp_pop11",
            "name": "Silver Happy Anniversary Foil Letter Balloons",
            "rating": 4.7,
            "reviews": 93,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 11
        },
        {
            "id": "bp_pop12",
            "name": "Black & Gold Anniversary Backdrop Curtain Set",
            "rating": 5,
            "reviews": 110,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 12
        },
        {
            "id": "bp_pop13",
            "name": "Golden Anniversary Acrylic Cake Topper",
            "rating": 4.5,
            "reviews": 127,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 13
        },
        {
            "id": "bp_pop14",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs)",
            "rating": 4.8,
            "reviews": 144,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 14
        },
        {
            "id": "bp_pop15",
            "name": "Champagne Bottle Big Foil Balloon",
            "rating": 4.3,
            "reviews": 161,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 15
        },
        {
            "id": "bp_pop16",
            "name": "Anniversary King & Queen Satin Sashes Set",
            "rating": 4.6,
            "reviews": 178,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 16
        },
        {
            "id": "bp_pop17",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4)",
            "rating": 4.9,
            "reviews": 195,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 17
        },
        {
            "id": "bp_pop18",
            "name": "Together Forever Heart Shape Confetti Popper",
            "rating": 4.4,
            "reviews": 212,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 18
        },
        {
            "id": "bp_pop19",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop",
            "rating": 4.7,
            "reviews": 229,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 19
        },
        {
            "id": "bp_pop20",
            "name": "Red Rose Petals & Candle Romantic Decor Kit",
            "rating": 5,
            "reviews": 36,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 20
        },
        {
            "id": "bp_pop21",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale)",
            "rating": 4.5,
            "reviews": 53,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 21
        },
        {
            "id": "bp_pop22",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10)",
            "rating": 4.8,
            "reviews": 70,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 22
        },
        {
            "id": "bp_pop23",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10)",
            "rating": 4.3,
            "reviews": 87,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 23
        },
        {
            "id": "bp_pop24",
            "name": "Love LED Neon Light Wall Hanging",
            "rating": 4.6,
            "reviews": 104,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 24
        },
        {
            "id": "bp_pop25",
            "name": "Anniversary Mixed Color Foil Balloon Set",
            "rating": 4.9,
            "reviews": 121,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 25
        },
        {
            "id": "bp_pop26",
            "name": "Bestseller Romantic Anniversary Decoration Set",
            "rating": 4.4,
            "reviews": 138,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 26
        },
        {
            "id": "bp_pop27",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 2)",
            "rating": 4.7,
            "reviews": 155,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 27
        },
        {
            "id": "bp_pop28",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 2)",
            "rating": 5,
            "reviews": 172,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 28
        },
        {
            "id": "bp_pop29",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 2)",
            "rating": 4.5,
            "reviews": 189,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 29
        },
        {
            "id": "bp_pop30",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 2)",
            "rating": 4.8,
            "reviews": 206,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 30
        },
        {
            "id": "bp_pop31",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 2)",
            "rating": 4.3,
            "reviews": 223,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 31
        },
        {
            "id": "bp_pop32",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 2)",
            "rating": 4.6,
            "reviews": 30,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 32
        },
        {
            "id": "bp_pop33",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 2)",
            "rating": 4.9,
            "reviews": 47,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 33
        },
        {
            "id": "bp_pop34",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 2)",
            "rating": 4.4,
            "reviews": 64,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 34
        },
        {
            "id": "bp_pop35",
            "name": "Champagne Bottle Big Foil Balloon (Style 2)",
            "rating": 4.7,
            "reviews": 81,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 35
        },
        {
            "id": "bp_pop36",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 2)",
            "rating": 5,
            "reviews": 98,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 36
        },
        {
            "id": "bp_pop37",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 2)",
            "rating": 4.5,
            "reviews": 115,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 37
        },
        {
            "id": "bp_pop38",
            "name": "Together Forever Heart Shape Confetti Popper (Style 2)",
            "rating": 4.8,
            "reviews": 132,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 38
        },
        {
            "id": "bp_pop39",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 2)",
            "rating": 4.3,
            "reviews": 149,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 39
        },
        {
            "id": "bp_pop40",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 2)",
            "rating": 4.6,
            "reviews": 166,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 40
        },
        {
            "id": "bp_pop41",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 2)",
            "rating": 4.9,
            "reviews": 183,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 41
        },
        {
            "id": "bp_pop42",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 2)",
            "rating": 4.4,
            "reviews": 200,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 42
        },
        {
            "id": "bp_pop43",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 2)",
            "rating": 4.7,
            "reviews": 217,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 43
        },
        {
            "id": "bp_pop44",
            "name": "Love LED Neon Light Wall Hanging (Style 2)",
            "rating": 5,
            "reviews": 234,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 44
        },
        {
            "id": "bp_pop45",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 2)",
            "rating": 4.5,
            "reviews": 41,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 45
        },
        {
            "id": "bp_pop46",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 2)",
            "rating": 4.8,
            "reviews": 58,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 46
        },
        {
            "id": "bp_pop47",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 3)",
            "rating": 4.3,
            "reviews": 75,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 47
        },
        {
            "id": "bp_pop48",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 3)",
            "rating": 4.6,
            "reviews": 92,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 48
        },
        {
            "id": "bp_pop49",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 3)",
            "rating": 4.9,
            "reviews": 109,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 49
        },
        {
            "id": "bp_pop50",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 3)",
            "rating": 4.4,
            "reviews": 126,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 50
        },
        {
            "id": "bp_pop51",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 3)",
            "rating": 4.7,
            "reviews": 143,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 51
        },
        {
            "id": "bp_pop52",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 3)",
            "rating": 5,
            "reviews": 160,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 52
        },
        {
            "id": "bp_pop53",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 3)",
            "rating": 4.5,
            "reviews": 177,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 53
        },
        {
            "id": "bp_pop54",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 3)",
            "rating": 4.8,
            "reviews": 194,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 54
        },
        {
            "id": "bp_pop55",
            "name": "Champagne Bottle Big Foil Balloon (Style 3)",
            "rating": 4.3,
            "reviews": 211,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 55
        },
        {
            "id": "bp_pop56",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 3)",
            "rating": 4.6,
            "reviews": 228,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 56
        },
        {
            "id": "bp_pop57",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 3)",
            "rating": 4.9,
            "reviews": 35,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 57
        },
        {
            "id": "bp_pop58",
            "name": "Together Forever Heart Shape Confetti Popper (Style 3)",
            "rating": 4.4,
            "reviews": 52,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 58
        },
        {
            "id": "bp_pop59",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 3)",
            "rating": 4.7,
            "reviews": 69,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 59
        },
        {
            "id": "bp_pop60",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 3)",
            "rating": 5,
            "reviews": 86,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 60
        },
        {
            "id": "bp_pop61",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 3)",
            "rating": 4.5,
            "reviews": 103,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 61
        },
        {
            "id": "bp_pop62",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 3)",
            "rating": 4.8,
            "reviews": 120,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 62
        },
        {
            "id": "bp_pop63",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 3)",
            "rating": 4.3,
            "reviews": 137,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 63
        },
        {
            "id": "bp_pop64",
            "name": "Love LED Neon Light Wall Hanging (Style 3)",
            "rating": 4.6,
            "reviews": 154,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 64
        },
        {
            "id": "bp_pop65",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 3)",
            "rating": 4.9,
            "reviews": 171,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 65
        },
        {
            "id": "bp_pop66",
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
            "id": "bc_s1",
            "name": "Glitter Birthday King & Queen Crowns (Pack of 2)",
            "rating": 5,
            "reviews": 59,
            "price": 199,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 1
        },
        {
            "id": "bc_s2",
            "name": "Polka Dot Birthday Party Hats (Pack of 10)",
            "rating": 4.5,
            "reviews": 83,
            "price": 149,
            "image": "nltc_prod_balloon_pastel.png",
            "popularRank": 2
        },
        {
            "id": "bc_s3",
            "name": "Golden Metallic Cone Hats (Pack of 8)",
            "rating": 4.7,
            "reviews": 42,
            "price": 179,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 3
        },
        {
            "id": "bc_s4",
            "name": "Foil Fringe Party Crowns (Pack of 6)",
            "rating": 4.3,
            "reviews": 29,
            "price": 120,
            "image": "nltc_prod_balloon_starfoil.png",
            "popularRank": 4
        },
        {
            "id": "bc_s5",
            "name": "Cartoon Theme Birthday Caps (Pack of 10)",
            "rating": 4.6,
            "reviews": 67,
            "price": 159,
            "image": "nltc_prod_balloon_smiley.png",
            "popularRank": 5
        },
        {
            "id": "bc_s6",
            "name": "LED Light Up Birthday Crown",
            "rating": 4.8,
            "reviews": 54,
            "price": 249,
            "image": "nltc_prod_balloon_num1foil.png",
            "popularRank": 6
        },
        {
            "id": "bc7",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5)",
            "rating": 4.3,
            "reviews": 25,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 7
        },
        {
            "id": "bc8",
            "name": "Happy Anniversary Golden Script Foil Banner",
            "rating": 4.6,
            "reviews": 42,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 8
        },
        {
            "id": "bc9",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50)",
            "rating": 4.9,
            "reviews": 59,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 9
        },
        {
            "id": "bc10",
            "name": "Anniversary LED Heart Fairy Lights (Warm White)",
            "rating": 4.4,
            "reviews": 76,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 10
        },
        {
            "id": "bc11",
            "name": "Silver Happy Anniversary Foil Letter Balloons",
            "rating": 4.7,
            "reviews": 93,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 11
        },
        {
            "id": "bc12",
            "name": "Black & Gold Anniversary Backdrop Curtain Set",
            "rating": 5,
            "reviews": 110,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 12
        },
        {
            "id": "bc13",
            "name": "Golden Anniversary Acrylic Cake Topper",
            "rating": 4.5,
            "reviews": 127,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 13
        },
        {
            "id": "bc14",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs)",
            "rating": 4.8,
            "reviews": 144,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 14
        },
        {
            "id": "bc15",
            "name": "Champagne Bottle Big Foil Balloon",
            "rating": 4.3,
            "reviews": 161,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 15
        },
        {
            "id": "bc16",
            "name": "Anniversary King & Queen Satin Sashes Set",
            "rating": 4.6,
            "reviews": 178,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 16
        },
        {
            "id": "bc17",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4)",
            "rating": 4.9,
            "reviews": 195,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 17
        },
        {
            "id": "bc18",
            "name": "Together Forever Heart Shape Confetti Popper",
            "rating": 4.4,
            "reviews": 212,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 18
        },
        {
            "id": "bc19",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop",
            "rating": 4.7,
            "reviews": 229,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 19
        },
        {
            "id": "bc20",
            "name": "Red Rose Petals & Candle Romantic Decor Kit",
            "rating": 5,
            "reviews": 36,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 20
        },
        {
            "id": "bc21",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale)",
            "rating": 4.5,
            "reviews": 53,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 21
        },
        {
            "id": "bc22",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10)",
            "rating": 4.8,
            "reviews": 70,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 22
        },
        {
            "id": "bc23",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10)",
            "rating": 4.3,
            "reviews": 87,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 23
        },
        {
            "id": "bc24",
            "name": "Love LED Neon Light Wall Hanging",
            "rating": 4.6,
            "reviews": 104,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 24
        },
        {
            "id": "bc25",
            "name": "Anniversary Mixed Color Foil Balloon Set",
            "rating": 4.9,
            "reviews": 121,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 25
        },
        {
            "id": "bc26",
            "name": "Bestseller Romantic Anniversary Decoration Set",
            "rating": 4.4,
            "reviews": 138,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 26
        },
        {
            "id": "bc27",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 2)",
            "rating": 4.7,
            "reviews": 155,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 27
        },
        {
            "id": "bc28",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 2)",
            "rating": 5,
            "reviews": 172,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 28
        },
        {
            "id": "bc29",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 2)",
            "rating": 4.5,
            "reviews": 189,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 29
        },
        {
            "id": "bc30",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 2)",
            "rating": 4.8,
            "reviews": 206,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 30
        },
        {
            "id": "bc31",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 2)",
            "rating": 4.3,
            "reviews": 223,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 31
        },
        {
            "id": "bc32",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 2)",
            "rating": 4.6,
            "reviews": 30,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 32
        },
        {
            "id": "bc33",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 2)",
            "rating": 4.9,
            "reviews": 47,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 33
        },
        {
            "id": "bc34",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 2)",
            "rating": 4.4,
            "reviews": 64,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 34
        },
        {
            "id": "bc35",
            "name": "Champagne Bottle Big Foil Balloon (Style 2)",
            "rating": 4.7,
            "reviews": 81,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 35
        },
        {
            "id": "bc36",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 2)",
            "rating": 5,
            "reviews": 98,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 36
        },
        {
            "id": "bc37",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 2)",
            "rating": 4.5,
            "reviews": 115,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 37
        },
        {
            "id": "bc38",
            "name": "Together Forever Heart Shape Confetti Popper (Style 2)",
            "rating": 4.8,
            "reviews": 132,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 38
        },
        {
            "id": "bc39",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 2)",
            "rating": 4.3,
            "reviews": 149,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 39
        },
        {
            "id": "bc40",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 2)",
            "rating": 4.6,
            "reviews": 166,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 40
        },
        {
            "id": "bc41",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 2)",
            "rating": 4.9,
            "reviews": 183,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 41
        },
        {
            "id": "bc42",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 2)",
            "rating": 4.4,
            "reviews": 200,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 42
        },
        {
            "id": "bc43",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 2)",
            "rating": 4.7,
            "reviews": 217,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 43
        },
        {
            "id": "bc44",
            "name": "Love LED Neon Light Wall Hanging (Style 2)",
            "rating": 5,
            "reviews": 234,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 44
        },
        {
            "id": "bc45",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 2)",
            "rating": 4.5,
            "reviews": 41,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 45
        },
        {
            "id": "bc46",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 2)",
            "rating": 4.8,
            "reviews": 58,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 46
        },
        {
            "id": "bc47",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 3)",
            "rating": 4.3,
            "reviews": 75,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 47
        },
        {
            "id": "bc48",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 3)",
            "rating": 4.6,
            "reviews": 92,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 48
        },
        {
            "id": "bc49",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 3)",
            "rating": 4.9,
            "reviews": 109,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 49
        },
        {
            "id": "bc50",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 3)",
            "rating": 4.4,
            "reviews": 126,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 50
        },
        {
            "id": "bc51",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 3)",
            "rating": 4.7,
            "reviews": 143,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 51
        },
        {
            "id": "bc52",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 3)",
            "rating": 5,
            "reviews": 160,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 52
        },
        {
            "id": "bc53",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 3)",
            "rating": 4.5,
            "reviews": 177,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 53
        },
        {
            "id": "bc54",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 3)",
            "rating": 4.8,
            "reviews": 194,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 54
        },
        {
            "id": "bc55",
            "name": "Champagne Bottle Big Foil Balloon (Style 3)",
            "rating": 4.3,
            "reviews": 211,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 55
        },
        {
            "id": "bc56",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 3)",
            "rating": 4.6,
            "reviews": 228,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 56
        },
        {
            "id": "bc57",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 3)",
            "rating": 4.9,
            "reviews": 35,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 57
        },
        {
            "id": "bc58",
            "name": "Together Forever Heart Shape Confetti Popper (Style 3)",
            "rating": 4.4,
            "reviews": 52,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 58
        },
        {
            "id": "bc59",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 3)",
            "rating": 4.7,
            "reviews": 69,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 59
        },
        {
            "id": "bc60",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 3)",
            "rating": 5,
            "reviews": 86,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 60
        },
        {
            "id": "bc61",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 3)",
            "rating": 4.5,
            "reviews": 103,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 61
        },
        {
            "id": "bc62",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 3)",
            "rating": 4.8,
            "reviews": 120,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 62
        },
        {
            "id": "bc63",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 3)",
            "rating": 4.3,
            "reviews": 137,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 63
        },
        {
            "id": "bc64",
            "name": "Love LED Neon Light Wall Hanging (Style 3)",
            "rating": 4.6,
            "reviews": 154,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 64
        },
        {
            "id": "bc65",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 3)",
            "rating": 4.9,
            "reviews": 171,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 65
        },
        {
            "id": "bc66",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 3)",
            "rating": 4.4,
            "reviews": 188,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 66
        }
    ],
    "theme-cake-toppers": [
        {
            "id": "bt_s1",
            "name": "Happy Birthday Gold Acrylic Cake Topper",
            "rating": 4.9,
            "reviews": 201,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 1
        },
        {
            "id": "bt_s2",
            "name": "Love Anniversary Silver Acrylic Topper",
            "rating": 4.8,
            "reviews": 88,
            "price": 149,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 2
        },
        {
            "id": "bt_s3",
            "name": "Glitter Number 1 Cake Topper (Gold)",
            "rating": 4.7,
            "reviews": 63,
            "price": 99,
            "image": "nltc_prod_balloon_num1foil.png",
            "popularRank": 3
        },
        {
            "id": "bt_s4",
            "name": "Baby Shower Pastel Theme Cake Toppers",
            "rating": 4.6,
            "reviews": 74,
            "price": 129,
            "image": "nltc_prod_balloon_pastel.png",
            "popularRank": 4
        },
        {
            "id": "bt_s5",
            "name": "Cake Doll Princess Theme Decor topper",
            "rating": 4.8,
            "reviews": 52,
            "price": 249,
            "image": "cardtoppers.png",
            "popularRank": 5
        },
        {
            "id": "bt_s6",
            "name": "Multicolor Balloon Cloud Cake Topper Mini",
            "rating": 4.5,
            "reviews": 97,
            "price": 119,
            "image": "nltc_prod_balloon_hbfoil.png",
            "popularRank": 6
        },
        {
            "id": "bt7",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5)",
            "rating": 4.3,
            "reviews": 25,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 7
        },
        {
            "id": "bt8",
            "name": "Happy Anniversary Golden Script Foil Banner",
            "rating": 4.6,
            "reviews": 42,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 8
        },
        {
            "id": "bt9",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50)",
            "rating": 4.9,
            "reviews": 59,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 9
        },
        {
            "id": "bt10",
            "name": "Anniversary LED Heart Fairy Lights (Warm White)",
            "rating": 4.4,
            "reviews": 76,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 10
        },
        {
            "id": "bt11",
            "name": "Silver Happy Anniversary Foil Letter Balloons",
            "rating": 4.7,
            "reviews": 93,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 11
        },
        {
            "id": "bt12",
            "name": "Black & Gold Anniversary Backdrop Curtain Set",
            "rating": 5,
            "reviews": 110,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 12
        },
        {
            "id": "bt13",
            "name": "Golden Anniversary Acrylic Cake Topper",
            "rating": 4.5,
            "reviews": 127,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 13
        },
        {
            "id": "bt14",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs)",
            "rating": 4.8,
            "reviews": 144,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 14
        },
        {
            "id": "bt15",
            "name": "Champagne Bottle Big Foil Balloon",
            "rating": 4.3,
            "reviews": 161,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 15
        },
        {
            "id": "bt16",
            "name": "Anniversary King & Queen Satin Sashes Set",
            "rating": 4.6,
            "reviews": 178,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 16
        },
        {
            "id": "bt17",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4)",
            "rating": 4.9,
            "reviews": 195,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 17
        },
        {
            "id": "bt18",
            "name": "Together Forever Heart Shape Confetti Popper",
            "rating": 4.4,
            "reviews": 212,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 18
        },
        {
            "id": "bt19",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop",
            "rating": 4.7,
            "reviews": 229,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 19
        },
        {
            "id": "bt20",
            "name": "Red Rose Petals & Candle Romantic Decor Kit",
            "rating": 5,
            "reviews": 36,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 20
        },
        {
            "id": "bt21",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale)",
            "rating": 4.5,
            "reviews": 53,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 21
        },
        {
            "id": "bt22",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10)",
            "rating": 4.8,
            "reviews": 70,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 22
        },
        {
            "id": "bt23",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10)",
            "rating": 4.3,
            "reviews": 87,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 23
        },
        {
            "id": "bt24",
            "name": "Love LED Neon Light Wall Hanging",
            "rating": 4.6,
            "reviews": 104,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 24
        },
        {
            "id": "bt25",
            "name": "Anniversary Mixed Color Foil Balloon Set",
            "rating": 4.9,
            "reviews": 121,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 25
        },
        {
            "id": "bt26",
            "name": "Bestseller Romantic Anniversary Decoration Set",
            "rating": 4.4,
            "reviews": 138,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 26
        },
        {
            "id": "bt27",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 2)",
            "rating": 4.7,
            "reviews": 155,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 27
        },
        {
            "id": "bt28",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 2)",
            "rating": 5,
            "reviews": 172,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 28
        },
        {
            "id": "bt29",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 2)",
            "rating": 4.5,
            "reviews": 189,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 29
        },
        {
            "id": "bt30",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 2)",
            "rating": 4.8,
            "reviews": 206,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 30
        },
        {
            "id": "bt31",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 2)",
            "rating": 4.3,
            "reviews": 223,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 31
        },
        {
            "id": "bt32",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 2)",
            "rating": 4.6,
            "reviews": 30,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 32
        },
        {
            "id": "bt33",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 2)",
            "rating": 4.9,
            "reviews": 47,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 33
        },
        {
            "id": "bt34",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 2)",
            "rating": 4.4,
            "reviews": 64,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 34
        },
        {
            "id": "bt35",
            "name": "Champagne Bottle Big Foil Balloon (Style 2)",
            "rating": 4.7,
            "reviews": 81,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 35
        },
        {
            "id": "bt36",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 2)",
            "rating": 5,
            "reviews": 98,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 36
        },
        {
            "id": "bt37",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 2)",
            "rating": 4.5,
            "reviews": 115,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 37
        },
        {
            "id": "bt38",
            "name": "Together Forever Heart Shape Confetti Popper (Style 2)",
            "rating": 4.8,
            "reviews": 132,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 38
        },
        {
            "id": "bt39",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 2)",
            "rating": 4.3,
            "reviews": 149,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 39
        },
        {
            "id": "bt40",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 2)",
            "rating": 4.6,
            "reviews": 166,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 40
        },
        {
            "id": "bt41",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 2)",
            "rating": 4.9,
            "reviews": 183,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 41
        },
        {
            "id": "bt42",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 2)",
            "rating": 4.4,
            "reviews": 200,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 42
        },
        {
            "id": "bt43",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 2)",
            "rating": 4.7,
            "reviews": 217,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 43
        },
        {
            "id": "bt44",
            "name": "Love LED Neon Light Wall Hanging (Style 2)",
            "rating": 5,
            "reviews": 234,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 44
        },
        {
            "id": "bt45",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 2)",
            "rating": 4.5,
            "reviews": 41,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 45
        },
        {
            "id": "bt46",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 2)",
            "rating": 4.8,
            "reviews": 58,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 46
        },
        {
            "id": "bt47",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 3)",
            "rating": 4.3,
            "reviews": 75,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 47
        },
        {
            "id": "bt48",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 3)",
            "rating": 4.6,
            "reviews": 92,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 48
        },
        {
            "id": "bt49",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 3)",
            "rating": 4.9,
            "reviews": 109,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 49
        },
        {
            "id": "bt50",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 3)",
            "rating": 4.4,
            "reviews": 126,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 50
        },
        {
            "id": "bt51",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 3)",
            "rating": 4.7,
            "reviews": 143,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 51
        },
        {
            "id": "bt52",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 3)",
            "rating": 5,
            "reviews": 160,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 52
        },
        {
            "id": "bt53",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 3)",
            "rating": 4.5,
            "reviews": 177,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 53
        },
        {
            "id": "bt54",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 3)",
            "rating": 4.8,
            "reviews": 194,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 54
        },
        {
            "id": "bt55",
            "name": "Champagne Bottle Big Foil Balloon (Style 3)",
            "rating": 4.3,
            "reviews": 211,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 55
        },
        {
            "id": "bt56",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 3)",
            "rating": 4.6,
            "reviews": 228,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 56
        },
        {
            "id": "bt57",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 3)",
            "rating": 4.9,
            "reviews": 35,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 57
        },
        {
            "id": "bt58",
            "name": "Together Forever Heart Shape Confetti Popper (Style 3)",
            "rating": 4.4,
            "reviews": 52,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 58
        },
        {
            "id": "bt59",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 3)",
            "rating": 4.7,
            "reviews": 69,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 59
        },
        {
            "id": "bt60",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 3)",
            "rating": 5,
            "reviews": 86,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 60
        },
        {
            "id": "bt61",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 3)",
            "rating": 4.5,
            "reviews": 103,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 61
        },
        {
            "id": "bt62",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 3)",
            "rating": 4.8,
            "reviews": 120,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 62
        },
        {
            "id": "bt63",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 3)",
            "rating": 4.3,
            "reviews": 137,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 63
        },
        {
            "id": "bt64",
            "name": "Love LED Neon Light Wall Hanging (Style 3)",
            "rating": 4.6,
            "reviews": 154,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 64
        },
        {
            "id": "bt65",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 3)",
            "rating": 4.9,
            "reviews": 171,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 65
        },
        {
            "id": "bt66",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 3)",
            "rating": 4.4,
            "reviews": 188,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 66
        }
    ],
    "many-more": [
        {
            "id": "bm_s1",
            "name": "Gold Foil Fringe Metallic Curtains (Pack of 2)",
            "rating": 4.8,
            "reviews": 204,
            "price": 199,
            "image": "banner.png",
            "popularRank": 1
        },
        {
            "id": "bm_s2",
            "name": "Faux Decorative Cake Balls (Pack of 20)",
            "rating": 4.6,
            "reviews": 79,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 2
        },
        {
            "id": "bm_s3",
            "name": "Fairy Lights LED String Lights (Warm White, 20Ft)",
            "rating": 4.9,
            "reviews": 124,
            "price": 149,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 3
        },
        {
            "id": "bm_s4",
            "name": "Balloon Glue Dots & Arch Strip Tape Set",
            "rating": 4.7,
            "reviews": 156,
            "price": 99,
            "image": "nltc_prod_balloon_confetti.png",
            "popularRank": 4
        },
        {
            "id": "bm_s5",
            "name": "Double Action Balloon Hand Pump (Fast Air)",
            "rating": 4.5,
            "reviews": 88,
            "price": 129,
            "image": "cardpoppers.png",
            "popularRank": 5
        },
        {
            "id": "bm_s6",
            "name": "Snow Spray & Party String Spray (Pack of 2)",
            "rating": 4.4,
            "reviews": 67,
            "price": 119,
            "image": "nltc_prod_balloon_pastel.png",
            "popularRank": 6
        },
        {
            "id": "bm_m7",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5)",
            "rating": 4.3,
            "reviews": 25,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 7
        },
        {
            "id": "bm_m8",
            "name": "Happy Anniversary Golden Script Foil Banner",
            "rating": 4.6,
            "reviews": 42,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 8
        },
        {
            "id": "bm_m9",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50)",
            "rating": 4.9,
            "reviews": 59,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 9
        },
        {
            "id": "bm_m10",
            "name": "Anniversary LED Heart Fairy Lights (Warm White)",
            "rating": 4.4,
            "reviews": 76,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 10
        },
        {
            "id": "bm_m11",
            "name": "Silver Happy Anniversary Foil Letter Balloons",
            "rating": 4.7,
            "reviews": 93,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 11
        },
        {
            "id": "bm_m12",
            "name": "Black & Gold Anniversary Backdrop Curtain Set",
            "rating": 5,
            "reviews": 110,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 12
        },
        {
            "id": "bm_m13",
            "name": "Golden Anniversary Acrylic Cake Topper",
            "rating": 4.5,
            "reviews": 127,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 13
        },
        {
            "id": "bm_m14",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs)",
            "rating": 4.8,
            "reviews": 144,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 14
        },
        {
            "id": "bm_m15",
            "name": "Champagne Bottle Big Foil Balloon",
            "rating": 4.3,
            "reviews": 161,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 15
        },
        {
            "id": "bm_m16",
            "name": "Anniversary King & Queen Satin Sashes Set",
            "rating": 4.6,
            "reviews": 178,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 16
        },
        {
            "id": "bm_m17",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4)",
            "rating": 4.9,
            "reviews": 195,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 17
        },
        {
            "id": "bm_m18",
            "name": "Together Forever Heart Shape Confetti Popper",
            "rating": 4.4,
            "reviews": 212,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 18
        },
        {
            "id": "bm_m19",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop",
            "rating": 4.7,
            "reviews": 229,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 19
        },
        {
            "id": "bm_m20",
            "name": "Red Rose Petals & Candle Romantic Decor Kit",
            "rating": 5,
            "reviews": 36,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 20
        },
        {
            "id": "bm_m21",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale)",
            "rating": 4.5,
            "reviews": 53,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 21
        },
        {
            "id": "bm_m22",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10)",
            "rating": 4.8,
            "reviews": 70,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 22
        },
        {
            "id": "bm_m23",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10)",
            "rating": 4.3,
            "reviews": 87,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 23
        },
        {
            "id": "bm_m24",
            "name": "Love LED Neon Light Wall Hanging",
            "rating": 4.6,
            "reviews": 104,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 24
        },
        {
            "id": "bm_m25",
            "name": "Anniversary Mixed Color Foil Balloon Set",
            "rating": 4.9,
            "reviews": 121,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 25
        },
        {
            "id": "bm_m26",
            "name": "Bestseller Romantic Anniversary Decoration Set",
            "rating": 4.4,
            "reviews": 138,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 26
        },
        {
            "id": "bm_m27",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 2)",
            "rating": 4.7,
            "reviews": 155,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 27
        },
        {
            "id": "bm_m28",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 2)",
            "rating": 5,
            "reviews": 172,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 28
        },
        {
            "id": "bm_m29",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 2)",
            "rating": 4.5,
            "reviews": 189,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 29
        },
        {
            "id": "bm_m30",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 2)",
            "rating": 4.8,
            "reviews": 206,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 30
        },
        {
            "id": "bm_m31",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 2)",
            "rating": 4.3,
            "reviews": 223,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 31
        },
        {
            "id": "bm_m32",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 2)",
            "rating": 4.6,
            "reviews": 30,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 32
        },
        {
            "id": "bm_m33",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 2)",
            "rating": 4.9,
            "reviews": 47,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 33
        },
        {
            "id": "bm_m34",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 2)",
            "rating": 4.4,
            "reviews": 64,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 34
        },
        {
            "id": "bm_m35",
            "name": "Champagne Bottle Big Foil Balloon (Style 2)",
            "rating": 4.7,
            "reviews": 81,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 35
        },
        {
            "id": "bm_m36",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 2)",
            "rating": 5,
            "reviews": 98,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 36
        },
        {
            "id": "bm_m37",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 2)",
            "rating": 4.5,
            "reviews": 115,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 37
        },
        {
            "id": "bm_m38",
            "name": "Together Forever Heart Shape Confetti Popper (Style 2)",
            "rating": 4.8,
            "reviews": 132,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 38
        },
        {
            "id": "bm_m39",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 2)",
            "rating": 4.3,
            "reviews": 149,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 39
        },
        {
            "id": "bm_m40",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 2)",
            "rating": 4.6,
            "reviews": 166,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 40
        },
        {
            "id": "bm_m41",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 2)",
            "rating": 4.9,
            "reviews": 183,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 41
        },
        {
            "id": "bm_m42",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 2)",
            "rating": 4.4,
            "reviews": 200,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 42
        },
        {
            "id": "bm_m43",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 2)",
            "rating": 4.7,
            "reviews": 217,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 43
        },
        {
            "id": "bm_m44",
            "name": "Love LED Neon Light Wall Hanging (Style 2)",
            "rating": 5,
            "reviews": 234,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 44
        },
        {
            "id": "bm_m45",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 2)",
            "rating": 4.5,
            "reviews": 41,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 45
        },
        {
            "id": "bm_m46",
            "name": "Bestseller Romantic Anniversary Decoration Set (Style 2)",
            "rating": 4.8,
            "reviews": 58,
            "price": 599,
            "image": "bestsellers7.png",
            "popularRank": 46
        },
        {
            "id": "bm_m47",
            "name": "Romantic Red Heart Foil Balloon (18 inch, Pack of 5) (Style 3)",
            "rating": 4.3,
            "reviews": 75,
            "price": 199,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 47
        },
        {
            "id": "bm_m48",
            "name": "Happy Anniversary Golden Script Foil Banner (Style 3)",
            "rating": 4.6,
            "reviews": 92,
            "price": 189,
            "image": "anngoldeninflated.png",
            "popularRank": 48
        },
        {
            "id": "bm_m49",
            "name": "Rose Gold Chrome Metallic Latex Balloons (Pack of 50) (Style 3)",
            "rating": 4.9,
            "reviews": 109,
            "price": 249,
            "image": "nltc_prod_balloon_rosegoldchrome.png",
            "popularRank": 49
        },
        {
            "id": "bm_m50",
            "name": "Anniversary LED Heart Fairy Lights (Warm White) (Style 3)",
            "rating": 4.4,
            "reviews": 126,
            "price": 299,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 50
        },
        {
            "id": "bm_m51",
            "name": "Silver Happy Anniversary Foil Letter Balloons (Style 3)",
            "rating": 4.7,
            "reviews": 143,
            "price": 369,
            "image": "annsilverinflated.png",
            "popularRank": 51
        },
        {
            "id": "bm_m52",
            "name": "Black & Gold Anniversary Backdrop Curtain Set (Style 3)",
            "rating": 5,
            "reviews": 160,
            "price": 199,
            "image": "banner5.png",
            "popularRank": 52
        },
        {
            "id": "bm_m53",
            "name": "Golden Anniversary Acrylic Cake Topper (Style 3)",
            "rating": 4.5,
            "reviews": 177,
            "price": 149,
            "image": "cardtoppers.png",
            "popularRank": 53
        },
        {
            "id": "bm_m54",
            "name": "Red & Black Anniversary Latex Balloon Pack (50 Pcs) (Style 3)",
            "rating": 4.8,
            "reviews": 194,
            "price": 229,
            "image": "nltc_prod_balloon_redblack.png",
            "popularRank": 54
        },
        {
            "id": "bm_m55",
            "name": "Champagne Bottle Big Foil Balloon (Style 3)",
            "rating": 4.3,
            "reviews": 211,
            "price": 179,
            "image": "banner11.png",
            "popularRank": 55
        },
        {
            "id": "bm_m56",
            "name": "Anniversary King & Queen Satin Sashes Set (Style 3)",
            "rating": 4.6,
            "reviews": 228,
            "price": 199,
            "image": "cardsashes.png",
            "popularRank": 56
        },
        {
            "id": "bm_m57",
            "name": "Sparkling Anaar Fountain Candle (Pack of 4) (Style 3)",
            "rating": 4.9,
            "reviews": 35,
            "price": 180,
            "image": "cardcandles.png",
            "popularRank": 57
        },
        {
            "id": "bm_m58",
            "name": "Together Forever Heart Shape Confetti Popper (Style 3)",
            "rating": 4.4,
            "reviews": 52,
            "price": 169,
            "image": "cardpoppers.png",
            "popularRank": 58
        },
        {
            "id": "bm_m59",
            "name": "Golden Foil Fringe Metallic Curtain Backdrop (Style 3)",
            "rating": 4.7,
            "reviews": 69,
            "price": 189,
            "image": "banner1.png",
            "popularRank": 59
        },
        {
            "id": "bm_m60",
            "name": "Red Rose Petals & Candle Romantic Decor Kit (Style 3)",
            "rating": 5,
            "reviews": 86,
            "price": 349,
            "image": "bestsellers2.png",
            "popularRank": 60
        },
        {
            "id": "bm_m61",
            "name": "Anniversary Black Foil Letter Banner (20 Pcs Wholesale) (Style 3)",
            "rating": 4.5,
            "reviews": 103,
            "price": 429,
            "image": "annblackinflated.png",
            "popularRank": 61
        },
        {
            "id": "bm_m62",
            "name": "Rose Gold Heart Foil Balloon Bunch (Pack of 10) (Style 3)",
            "rating": 4.8,
            "reviews": 120,
            "price": 299,
            "image": "nltc_prod_balloon_heartfoil.png",
            "popularRank": 62
        },
        {
            "id": "bm_m63",
            "name": "Gold Metallic Straight Cake Candles Set (Pack of 10) (Style 3)",
            "rating": 4.3,
            "reviews": 137,
            "price": 89,
            "image": "goldenstraightcandle.png",
            "popularRank": 63
        },
        {
            "id": "bm_m64",
            "name": "Love LED Neon Light Wall Hanging (Style 3)",
            "rating": 4.6,
            "reviews": 154,
            "price": 499,
            "image": "nltc_prod_balloon_goldchrome.png",
            "popularRank": 64
        },
        {
            "id": "bm_m65",
            "name": "Anniversary Mixed Color Foil Balloon Set (Style 3)",
            "rating": 4.9,
            "reviews": 171,
            "price": 459,
            "image": "annmixinflated.png",
            "popularRank": 65
        },
        {
            "id": "bm_m66",
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

            const isFoilLetterSet = prod.image && (prod.image.toLowerCase().includes('hbd') || prod.image.toLowerCase().includes('ann'));
            const imgClass = isFoilLetterSet ? 'foil-banner-img' : '';

            return `
                <div class="product-card" id="card-${prod.id}" onclick="goToProduct('${prod.id}', event)" style="cursor: pointer;">
                    <div class="wishlist-icon-wrapper" onclick="toggleWishlist('${prod.id}', event)">
                        <i class="fa-regular fa-heart wishlist-icon"></i>
                    </div>
                    <div class="product-img-container ${isFoilLetterSet ? 'is-foil-set' : ''}">
                        <img src="${prod.image}" alt="${prod.name}" class="${imgClass}">
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

if (typeof window !== "undefined") {
    window.bestsellersData = bestsellersData;
    window.bestsellersProducts = bestsellersProducts;
}

export { bestsellersData, bestsellersProducts };
