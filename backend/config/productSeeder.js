const mongoose = require('mongoose');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

const seedCategories = [
  { name: 'Balloons', slug: 'balloons', description: 'Premium decorative party balloons' },
  { name: 'Candles', slug: 'candles', description: 'Celebration and birthday cake candles' },
  { name: 'Birthday Caps', slug: 'birthday-caps', description: 'Party caps and crowns' },
  { name: 'Party Poppers', slug: 'party-poppers', description: 'Confetti and party cannons' },
  { name: 'Sashes', slug: 'sashes', description: 'Celebration sashes' },
  { name: 'Banners', slug: 'banners', description: 'Hanging foil and paper banners' },
  { name: 'Cake Toppers', slug: 'toppers', description: 'Acrylic and wooden cake toppers' },
  { name: 'Cake Dolls', slug: 'cake-dolls', description: 'Princess and doll cake toppers' },
  { name: 'Decorations', slug: '3d-butterfly', description: 'Wall and arch decorations' },
  { name: 'General', slug: 'general', description: 'General party supplies' },
];

const seedProductsData = [
  {
    sku: 'b1',
    numericId: '101',
    slug: 'red-metallic-balloons-50-pcs-10-packs',
    name: 'Red Metallic Balloons (50 Pcs × 10 Packs)',
    categorySlug: 'balloons',
    price: 199,
    originalPrice: 269,
    image: 'redinflated.png',
    shortDescription: 'Add a bold and elegant touch to your event decor with premium Red Metallic Balloons.',
    description: 'Add a bold and elegant touch to your event decor with premium Red Metallic Balloons (50 Pcs × 10 Packs). 100% Biodegradable Latex with vibrant finish.',
  },
  {
    sku: 'b2',
    numericId: '102',
    slug: 'dark-blue-metallic-balloons-50-pcs-10-packs',
    name: 'Dark-Blue Metallic Balloons (50 Pcs × 10 Packs)',
    categorySlug: 'balloons',
    price: 199,
    originalPrice: 249,
    image: 'darkblueinflated.png',
    shortDescription: 'Add a bold and elegant touch with Dark-Blue Metallic Balloons.',
    description: 'Add a bold and elegant touch with Dark-Blue Metallic Balloons (50 Pcs × 10 Packs). Extra stretchy premium latex.',
  },
  {
    sku: 'b3',
    numericId: '103',
    slug: 'sky-blue-metallic-balloons-50-pcs-10-packs',
    name: 'Sky-Blue Metallic Balloons (50 Pcs × 10 Packs)',
    categorySlug: 'balloons',
    price: 249,
    originalPrice: 349,
    image: 'skyblueinflated.png',
    shortDescription: 'Super shiny high-gloss sky blue metallic balloons.',
    description: 'Super shiny high-gloss sky blue metallic balloons for royal party setups. Helium compatible.',
  },
  {
    sku: 'b4',
    numericId: '104',
    slug: 'golden-metallic-balloons-50-pcs-10-packs',
    name: 'Golden Metallic Balloons (50 Pcs × 10 Packs)',
    categorySlug: 'balloons',
    price: 149,
    originalPrice: 199,
    image: 'goldeninflated.png',
    shortDescription: 'Premium Golden Metallic Balloons for birthday parties.',
    description: 'Premium Golden Metallic Balloons for birthday parties, surprises, and decorations.',
  },
  {
    sku: 'b5',
    numericId: '105',
    slug: 'white-metallic-balloons-50-pcs-10-packs',
    name: 'White Metallic Balloons (50 Pcs × 10 Packs)',
    categorySlug: 'balloons',
    price: 149,
    originalPrice: 199,
    image: 'whiteinflated.png',
    shortDescription: 'Pure white metallic balloons for milestone celebrations.',
    description: 'Pure white metallic balloons for birthday milestone celebrations.',
  },
  {
    sku: 'b6',
    numericId: '106',
    slug: 'pink-metallic-balloons-50-pcs-10-packs',
    name: 'Pink Metallic Balloons (50 Pcs × 10 Packs)',
    categorySlug: 'balloons',
    price: 149,
    originalPrice: 199,
    image: 'pinkinflated.png',
    shortDescription: 'Gorgeous pink metallic balloons for surprises.',
    description: 'Gorgeous pink metallic balloons for birthday surprises and party decorations.',
  },
  {
    sku: 'b7',
    numericId: '107',
    slug: 'confetti-balloons-pack-of-10',
    name: 'Confetti Balloons (Pack of 10)',
    categorySlug: 'balloons',
    price: 149,
    originalPrice: 199,
    image: 'nltc_prod_balloon_confetti.png',
    shortDescription: 'Transparent balloons pre-filled with sparkling foil confetti.',
    description: 'Transparent balloons pre-filled with sparkling foil confetti dots.',
  },
  {
    sku: 'b8',
    numericId: '108',
    slug: 'rose-gold-chrome-balloons-pack-of-50',
    name: 'Rose Gold Chrome Balloons (Pack of 50)',
    categorySlug: 'balloons',
    price: 249,
    originalPrice: 349,
    image: 'nltc_prod_balloon_rosegoldchrome.png',
    shortDescription: 'Trendy rose gold metallic balloons for birthday aesthetics.',
    description: 'Trendy rose gold metallic balloons for birthday aesthetics and room surprise decorations.',
  },
  {
    sku: 'c1',
    numericId: '201',
    slug: 'sparkling-anaar-candle-pack-of-4',
    name: 'Sparkling Anaar Candle (Pack of 4)',
    categorySlug: 'candles',
    price: 180,
    originalPrice: 240,
    image: 'nltc_prod_balloon_goldchrome.png',
    shortDescription: 'Sparkling cold-pyro fountain candles for cakes.',
    description: 'Light up the birthday cake cutting moment with sparkling cold-pyro fountain candles.',
  },
  {
    sku: 'c2',
    numericId: '202',
    slug: 'number-birthday-candles-0-9',
    name: 'Number Birthday Candles (0-9)',
    categorySlug: 'candles',
    price: 79,
    originalPrice: 99,
    image: 'nltc_prod_balloon_num1foil.png',
    shortDescription: 'Golden metallic number candles from 0 to 9.',
    description: 'Elegant golden metallic number candles available from digits 0 to 9.',
  },
  {
    sku: 'h1',
    numericId: '301',
    slug: 'glitter-birthday-king-queen-crowns-pack-of-2',
    name: 'Glitter Birthday King & Queen Crowns (Pack of 2)',
    categorySlug: 'birthday-caps',
    price: 199,
    originalPrice: 249,
    image: 'nltc_prod_balloon_goldchrome.png',
    shortDescription: 'Sparkling glitter crowns for king and queen.',
    description: 'Sparkling glitter crowns for the birthday prince/king and princess/queen.',
  },
  {
    sku: 'p1',
    numericId: '401',
    slug: 'large-confetti-party-popper-40-cm',
    name: 'Large Confetti Party Popper (40 cm)',
    categorySlug: 'party-poppers',
    price: 149,
    originalPrice: 199,
    image: 'nltc_prod_balloon_confetti.png',
    shortDescription: 'Celebrate with a blast of colorful foil streamer confetti.',
    description: 'Celebrate grand moments with a blast of colorful foil streamer confetti.',
  },
  {
    sku: 's1',
    numericId: '501',
    slug: 'birthday-girl-satin-sash-glitter-pink',
    name: 'Birthday Girl Satin Sash (Glitter Pink)',
    categorySlug: 'sashes',
    price: 149,
    originalPrice: 199,
    image: 'nltc_prod_balloon_heartfoil.png',
    shortDescription: 'Soft pink satin sash with glittering Birthday Girl text.',
    description: 'Soft pink satin sash with glittering Birthday Girl foil lettering.',
  },
  {
    sku: 'ba1',
    numericId: '601',
    slug: 'gold-foil-happy-birthday-banner',
    name: 'Gold Foil Happy Birthday Banner (Alphabet Letters)',
    categorySlug: 'banners',
    price: 199,
    originalPrice: 299,
    image: 'nltc_prod_balloon_goldchrome.png',
    shortDescription: 'Classic gold metallic letter banner spelling HAPPY BIRTHDAY.',
    description: 'Classic gold metallic letter banner spelling HAPPY BIRTHDAY.',
  },
  {
    sku: 'to1',
    numericId: '701',
    slug: 'happy-birthday-gold-acrylic-cake-topper',
    name: 'Happy Birthday Gold Acrylic Cake Topper',
    categorySlug: 'toppers',
    price: 149,
    originalPrice: 199,
    image: 'cardtoppers.png',
    shortDescription: 'Mirror shiny gold acrylic cake topper.',
    description: 'Mirror shiny gold acrylic cake topper for professional and luxurious cakes.',
  },
  {
    sku: 'bd1',
    numericId: '801',
    slug: 'princess-barbie-cake-doll-pink-gown',
    name: 'Princess Barbie Cake Doll (Pink Gown)',
    categorySlug: 'cake-dolls',
    price: 249,
    originalPrice: 349,
    image: 'cardtoppers.png',
    shortDescription: 'Princess cake topper doll for birthday parties.',
    description: 'Beautiful princess cake topper doll for girls birthday parties.',
  },
  {
    sku: 'bf1',
    numericId: '901',
    slug: 'hollow-metallic-3d-butterflies-gold-pack-of-12',
    name: 'Hollow Metallic 3D Butterflies (Gold, Pack of 12)',
    categorySlug: '3d-butterfly',
    price: 149,
    originalPrice: 199,
    image: 'nltc_prod_balloon_goldchrome.png',
    shortDescription: '3D hollow metallic golden butterflies.',
    description: '3D hollow metallic golden butterflies for wall backdrops and arches.',
  },
];

const seedDatabase = async () => {
  try {
    const categoryMap = {};

    for (const cat of seedCategories) {
      let existingCat = await Category.findOne({ slug: cat.slug });
      if (!existingCat) {
        existingCat = await Category.create({
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
          isActive: true,
        });
      }
      categoryMap[cat.slug] = existingCat._id;
    }

    const defaultCat = Object.values(categoryMap)[0];

    for (const p of seedProductsData) {
      const catId = categoryMap[p.categorySlug] || defaultCat;
      const existingProduct = await Product.findOne({
        $or: [{ slug: p.slug }, { sku: p.sku }, { name: p.name }],
      });

      if (!existingProduct) {
        await Product.create({
          name: p.name,
          slug: p.slug,
          category: catId,
          sku: p.sku,
          shortDescription: p.shortDescription,
          description: p.description,
          originalPrice: p.originalPrice,
          price: p.price,
          stock: 100,
          isActive: true,
          images: [{ url: p.image || 'cardballoons.png', public_id: 'default' }],
        });
      }
    }

    console.log('[Seeder] Product database initialized successfully.');
  } catch (err) {
    console.error('[Seeder Error] Failed to seed products:', err.message);
  }
};

module.exports = seedDatabase;
