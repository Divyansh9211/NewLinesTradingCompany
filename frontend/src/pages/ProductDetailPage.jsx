import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { getProductByIdOrSlug, getRelatedProducts, getGalleryForImage } from '../utils/productData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart: cartAdd } = useCart();
  const { isWishlisted: checkWishlisted, toggleWishlist } = useWishlist();
  const { isLoggedIn } = useAuth();

  const product = getProductByIdOrSlug(id);
  const relatedProducts = getRelatedProducts(product.categorySlug, product.id, 4);

  const galleryImages = product.images && product.images.length > 0
    ? product.images
    : getGalleryForImage(product.image);

  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('desc');
  const [pincode, setPincode] = useState('');
  const [estimatedDate, setEstimatedDate] = useState('May 20 - May 22');
  const [deliveryDateStyle, setDeliveryDateStyle] = useState({});
  const [cartBtnText, setCartBtnText] = useState('Add to Cart');
  const [cartBtnStyle, setCartBtnStyle] = useState({});

  const isWishlisted = checkWishlisted(product);

  useEffect(() => {
    if (galleryImages && galleryImages.length > 0) {
      setSelectedImage(galleryImages[0]);
    }
    setQuantity(1);
    setActiveTab('desc');
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = async () => {
    setCartBtnText('Added to Cart! ✓');
    setCartBtnStyle({ backgroundColor: '#2e7d32' });

    await cartAdd(product, quantity);

    setTimeout(() => {
      setCartBtnText('Add to Cart');
      setCartBtnStyle({});
    }, 1800);
  };

  const handleWishlistToggle = async () => {
    await toggleWishlist(product);
  };

  const handleBuyNow = async () => {
    await cartAdd(product, quantity);
    navigate('/cart');
  };

  const handleCheckPincode = () => {
    const trimmed = pincode.trim();
    if (!trimmed) {
      alert('Please enter a valid 6-digit Pincode.');
      return;
    }
    if (!/^\d{6}$/.test(trimmed)) {
      alert('Invalid Pincode. Please enter a 6-digit Indian Pincode.');
      return;
    }

    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 3);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 5);

    const options = { month: 'short', day: 'numeric' };
    const minStr = minDate.toLocaleDateString('en-US', options);
    const maxStr = maxDate.toLocaleDateString('en-US', options);

    setEstimatedDate(`${minStr} - ${maxStr}`);
    setDeliveryDateStyle({ color: '#2e7d32' });
    alert(`Delivery available for Pincode ${trimmed}! Estimated delivery: ${minStr} - ${maxStr}.`);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating || 5);
    const hasHalfStar = (rating % 1) !== 0;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<i key={i} className="fa-solid fa-star"></i>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<i key={i} className="fa-solid fa-star-half-stroke"></i>);
      } else {
        stars.push(<i key={i} className="fa-regular fa-star"></i>);
      }
    }
    return stars;
  };

  const currentImgSrc = selectedImage
    ? (selectedImage.startsWith('/') || selectedImage.startsWith('http') ? selectedImage : `/${selectedImage}`)
    : '/nltc_prod_balloon_hbfoil.png';

  const isFoil = currentImgSrc.toLowerCase().includes('hbd') || currentImgSrc.toLowerCase().includes('ann');
  const sizeNum = product.size ? product.size.replace(/\D/g, '') || '18' : '18';

  const bulletPoints = product.bulletPoints || [
    "100% Biodegradable Latex / Premium Quality Material",
    "Vibrant contrast colors for stunning party setup",
    "Thick leak-proof durable material",
    "Suitable for air & helium inflation"
  ];

  const specificationsTable = product.specificationsTable || {
    "Category": product.category || "Party Supplies",
    "Occasion": product.occasion || "All Occasions",
    "Material": product.material || "Foil",
    "Color": product.color || "Multi Color",
    "Size": product.size || "18 inch",
    "Stock Status": product.stockStatus || "In Stock",
    "SKU": product.sku || "NLTC-BL-1001"
  };

  const reviewsList = product.reviewsList || [
    { name: "Ananya Sharma", date: "12 May 2026", rating: 5, comment: "High quality products! Exactly as shown in the picture. Perfect for our party." },
    { name: "Rahul Verma", date: "04 May 2026", rating: 5, comment: "Very fast delivery and durable product. Highly recommended!" },
    { name: "Priya Patel", date: "28 Apr 2026", rating: 4, comment: "Looks great, easy to inflate and stayed inflated for days." }
  ];

  return (
    <>
      <Navbar />

      {/* Subnav Category Navigation Bar (Matches Original product.html) */}
      <div className="category-subnav-bar">
        <div className="category-subnav-container">
          <button className="shop-categories-btn" onClick={() => navigate('/products')}>
            <i className="fa-solid fa-bars"></i>
            <span>Shop by Categories</span>
          </button>

          <ul className="subnav-links-list">
            <li><Link to="/products?category=balloons">Balloons <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.7rem' }}></i></Link></li>
            <li><Link to="/products?category=candles">Candles <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.7rem' }}></i></Link></li>
            <li><Link to="/bestseller/theme-cake-toppers">Cake Toppers <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.7rem' }}></i></Link></li>
            <li><Link to="/bestseller/party-poppers">Party Poppers</Link></li>
            <li><Link to="/products?category=sashes">Sashes</Link></li>
            <li><Link to="/bestseller/birthday-caps">Birthday Caps</Link></li>
            <li><Link to="/bestseller/sparkling-candles">Anarcandles</Link></li>
            <li><Link to="/occasion/birthday">Themes <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.7rem' }}></i></Link></li>
            <li><Link to="/bestseller/many-more">More <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.7rem' }}></i></Link></li>
          </ul>
        </div>
      </div>

      {/* Main Container for Product Details Page */}
      <main className="product-details-container">

        {/* Breadcrumb Navigation Trail */}
        <nav className="breadcrumb-trail-wrapper" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">&gt;</span>
          <Link to={`/products?category=${product.categorySlug}`} id="breadcrumb-category">{product.category}</Link>
          <span className="breadcrumb-sep">&gt;</span>
          <span id="breadcrumb-subcategory">{product.material ? `${product.material} ${product.category}` : product.category}</span>
          <span className="breadcrumb-sep">&gt;</span>
          <span className="breadcrumb-current" id="breadcrumb-current">{product.name}</span>
        </nav>

        {/* Main Product Showcase Card (2-Column Pixel-Perfect Layout) */}
        <section className="product-showcase-card">

          {/* Left Column: Product Image Gallery */}
          <div className="product-gallery-section">
            {/* Vertical Thumbnails Column */}
            <div className="thumbnails-column" id="thumbnails-container">
              {galleryImages.map((imgUrl, index) => {
                const thumbSrc = imgUrl.startsWith('/') || imgUrl.startsWith('http') ? imgUrl : `/${imgUrl}`;
                const isActive = selectedImage === imgUrl;
                return (
                  <div
                    key={index}
                    className={`thumb-img-box ${isActive ? 'active-thumb' : ''}`}
                    onClick={() => setSelectedImage(imgUrl)}
                  >
                    <img src={thumbSrc} alt={`${product.name} Thumbnail ${index + 1}`} />
                  </div>
                );
              })}
            </div>

            {/* Main Display Box */}
            <div className="main-image-display-container">
              {/* Variant/Size Badge Overlay */}
              <div className="variant-size-badge" id="variant-badge">
                <span className="badge-val" id="variant-badge-val">{sizeNum}</span>
                <span className="badge-lbl">INCH</span>
              </div>
              <img
                id="main-product-image"
                src={currentImgSrc}
                alt={product.name}
                className={isFoil ? 'foil-banner-img' : ''}
              />
            </div>
          </div>

          {/* Right Column: Product Details & Purchase Actions */}
          <div className="product-info-details-section">
            <h1 className="product-title-heading" id="product-title">{product.name}</h1>

            {/* Rating & Reviews Header */}
            <div className="ratings-reviews-row">
              <div className="stars-rating-icons" id="rating-stars-container">
                {renderStars(product.rating)}
              </div>
              <span className="rating-score-count" id="rating-text">
                {product.rating} ({product.reviews} Reviews)
              </span>
              <span className="rating-divider">|</span>
              <a
                href="#tab-panel-reviews"
                className="add-review-link"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('reviews');
                  const el = document.getElementById('tab-panel-reviews');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Add a Review
              </a>
            </div>

            {/* Price Block */}
            <div className="price-discount-block">
              <span className="sale-price-text" id="sale-price">₹{product.price}</span>
              {product.originalPrice && (
                <span className="original-price-text" id="original-price">₹{product.originalPrice}</span>
              )}
              {product.discount && (
                <span className="discount-percentage-pill" id="discount-pill">{product.discount}</span>
              )}
            </div>
            <div className="tax-inclusive-note">Inclusive of all taxes</div>

            {/* Stock Status & SKU Row */}
            <div className="stock-sku-badge-bar">
              <span className="stock-status-green-badge" id="stock-status">
                <i className="fa-regular fa-circle-check"></i> {product.stockStatus || 'In Stock'}
              </span>
              <span className="sku-code-text" id="sku-code">SKU: {product.sku || 'NLTC-BL-1001'}</span>
            </div>

            {/* Short Description */}
            <p className="product-short-description-p" id="short-description">
              {product.description}
            </p>

            {/* Key Attributes Grid (4 Icon Cards) */}
            <div className="key-attributes-grid">
              {/* Box 1: Occasion */}
              <div className="attribute-card-box">
                <i className="fa-solid fa-gift"></i>
                <div className="attr-text-stack">
                  <span className="attr-lbl">Occasion</span>
                  <span className="attr-val" id="attr-occasion">{product.occasion || 'Birthday'}</span>
                </div>
              </div>
              {/* Box 2: Material */}
              <div className="attribute-card-box">
                <i className="fa-solid fa-shield-halved"></i>
                <div className="attr-text-stack">
                  <span className="attr-lbl">Material</span>
                  <span className="attr-val" id="attr-material">{product.material || 'Foil'}</span>
                </div>
              </div>
              {/* Box 3: Color */}
              <div className="attribute-card-box">
                <i className="fa-solid fa-palette"></i>
                <div className="attr-text-stack">
                  <span className="attr-lbl">Color</span>
                  <span className="attr-val" id="attr-color">{product.color || 'Multi Color'}</span>
                </div>
              </div>
              {/* Box 4: Size */}
              <div className="attribute-card-box">
                <i className="fa-solid fa-ruler-combined"></i>
                <div className="attr-text-stack">
                  <span className="attr-lbl">Size</span>
                  <span className="attr-val" id="attr-size">{product.size || '18 inch'}</span>
                </div>
              </div>
            </div>

            {/* Purchase Controls Row 1: Quantity + Wishlist + Add to Cart */}
            <div className="purchase-controls-row-1">
              <div className="quantity-stepper-box">
                <button className="qty-step-btn" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
                <input type="text" className="qty-input-field" id="qty-input" value={quantity} readOnly />
                <button className="qty-step-btn" onClick={() => setQuantity((q) => q + 1)}>+</button>
              </div>

              <button
                className="btn-wishlist-outlined"
                id="btn-add-wishlist"
                onClick={handleWishlistToggle}
                style={isWishlisted ? { backgroundColor: '#fff0f0' } : {}}
              >
                <i className={isWishlisted ? "fa-solid fa-heart" : "fa-regular fa-heart"} style={isWishlisted ? { color: '#d32f2f' } : {}}></i>
                <span>{isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}</span>
              </button>

              <button
                className="btn-add-to-cart-red"
                id="btn-add-cart"
                onClick={handleAddToCart}
                style={cartBtnStyle}
              >
                <i className="fa-solid fa-cart-shopping"></i>
                <span>{cartBtnText}</span>
              </button>
            </div>

            {/* Purchase Controls Row 2: Buy Now Button */}
            <button className="btn-buy-now-golden" id="btn-buy-now" onClick={handleBuyNow}>
              <i className="fa-solid fa-bolt"></i>
              <span>Buy Now</span>
            </button>

            {/* Delivery Check Card */}
            <div className="delivery-checker-card">
              <div className="pincode-left-group">
                <span className="pincode-label-heading">Check Delivery &amp; Delivery Date</span>
                <div className="pincode-input-row">
                  <input
                    type="text"
                    className="pincode-input"
                    id="pincode-input"
                    placeholder="Enter Pincode"
                    maxLength="6"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                  <button className="pincode-check-btn" onClick={handleCheckPincode}>Check</button>
                </div>
              </div>

              <div className="delivery-status-right-box">
                <i className="fa-solid fa-truck delivery-truck-icon"></i>
                <div className="delivery-details-text-stack">
                  <span className="est-delivery-lbl">Estimated Delivery</span>
                  <span className="est-delivery-date-val" id="est-delivery-date" style={deliveryDateStyle}>
                    {estimatedDate}
                  </span>
                  <span className="free-delivery-tag">Free Delivery on this product</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Bottom Split Section: Tabs (Left) + Related Products (Right) */}
        <section className="product-bottom-split-section">

          {/* Left Container: Interactive Information Tabs */}
          <div className="tabs-content-card">
            {/* Tabs Navigation Bar */}
            <div className="tabs-navigation-header">
              <button
                className={`tab-nav-btn ${activeTab === 'desc' ? 'active-tab' : ''}`}
                id="tab-header-desc"
                onClick={() => setActiveTab('desc')}
              >
                Description
              </button>
              <button
                className={`tab-nav-btn ${activeTab === 'specs' ? 'active-tab' : ''}`}
                id="tab-header-specs"
                onClick={() => setActiveTab('specs')}
              >
                Specifications
              </button>
              <button
                className={`tab-nav-btn ${activeTab === 'shipping' ? 'active-tab' : ''}`}
                id="tab-header-shipping"
                onClick={() => setActiveTab('shipping')}
              >
                Shipping &amp; Returns
              </button>
              <button
                className={`tab-nav-btn ${activeTab === 'reviews' ? 'active-tab' : ''}`}
                id="tab-header-reviews"
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({product.reviews || (reviewsList ? reviewsList.length : 0)})
              </button>
            </div>

            {/* Tab Panel 1: Description */}
            <div className={`tab-panel ${activeTab === 'desc' ? 'active-panel' : ''}`} id="tab-panel-desc">
              <p id="tab-desc-text">
                {product.description || `Our ${product.name} adds a vibrant and joyful touch to your party decorations. Made from high-quality ${product.material || 'decor'} material, it is durable, long-lasting, and reusable. Suitable for helium and air inflation.`}
              </p>
              <div className="features-checklist-grid" id="checklist-container">
                {bulletPoints.map((pt, idx) => (
                  <div key={idx} className="check-item-row">
                    <div className="check-icon-circle"><i className="fa-solid fa-check"></i></div>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tab Panel 2: Specifications */}
            <div className={`tab-panel ${activeTab === 'specs' ? 'active-panel' : ''}`} id="tab-panel-specs">
              <table className="specs-data-table">
                <tbody id="specs-table-body">
                  {Object.entries(specificationsTable).map(([key, val]) => (
                    <tr key={key}>
                      <td className="spec-lbl">{key}</td>
                      <td className="spec-val">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tab Panel 3: Shipping & Returns */}
            <div className={`tab-panel ${activeTab === 'shipping' ? 'active-panel' : ''}`} id="tab-panel-shipping">
              <p><strong>Shipping Policy:</strong> We process all orders within 24 hours. Express shipping takes 2 to 4 business days depending on your location across India.</p>
              <p style={{ marginTop: '10px' }}><strong>Return Policy:</strong> Easy 7-day return/replacement guarantee if the product is damaged or defective upon arrival. Contact our support team with opening video proof.</p>
            </div>

            {/* Tab Panel 4: Reviews */}
            <div className={`tab-panel ${activeTab === 'reviews' ? 'active-panel' : ''}`} id="tab-panel-reviews">
              <div id="reviews-list-container">
                {reviewsList.map((rev, idx) => (
                  <div key={idx} className="review-item-card" style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 700, color: '#333' }}>{rev.name}</span>
                      <span style={{ fontSize: '0.8rem', color: '#888' }}>{rev.date}</span>
                    </div>
                    <div style={{ color: '#ffb400', fontSize: '0.85rem', marginBottom: '6px' }}>
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star" style={{ marginRight: '2px' }}></i>
                      ))}
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#555', margin: 0 }}>{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Container: "You May Also Like" Related Products */}
          <div className="related-products-card">
            <div className="related-section-header">
              <h3 className="related-heading-text">You May Also Like</h3>
              <Link to={`/products?category=${product.categorySlug}`} className="view-all-related-link" id="view-all-related-link">
                View All
              </Link>
            </div>

            <div className="related-products-grid" id="related-products-grid">
              {relatedProducts.map((rel) => {
                const relImg = rel.image ? (rel.image.startsWith('/') || rel.image.startsWith('http') ? rel.image : `/${rel.image}`) : '/nltc_prod_balloon_hbfoil.png';
                const isFoilRel = rel.image && (rel.image.toLowerCase().includes('hbd') || rel.image.toLowerCase().includes('ann'));
                const isRelWishlisted = checkWishlisted(rel.id || rel.slug);
                return (
                  <div
                    key={rel.id}
                    className="mini-related-card"
                    onClick={() => navigate(`/product/${rel.id}`)}
                  >
                    <div className={`mini-card-img-box ${isFoilRel ? 'is-foil-set' : ''}`}>
                      <img
                        src={relImg}
                        alt={rel.name}
                        className={isFoilRel ? 'foil-banner-img' : ''}
                      />
                    </div>
                    <div className="mini-card-title">{rel.name}</div>
                    <div className="mini-card-footer">
                      <span className="mini-card-price">₹{rel.price}</span>
                      <i
                        className={`${isRelWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart mini-wishlist-icon`}
                        style={isRelWishlisted ? { color: '#d32f2f' } : {}}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isLoggedIn) {
                            navigate('/login');
                            return;
                          }
                          toggleWishlist(rel);
                        }}
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default ProductDetailPage;
