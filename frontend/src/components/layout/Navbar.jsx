import { useRef, useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

/**
 * Navbar component — Pixel-perfect reference matched navbar design
 * implementing React Router navigation, active route state indicator,
 * Products dropdown, search mapping, wishlist/cart badge overlays,
 * and vertical divider lines.
 */
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isLoggedIn, logout } = useAuth();

  // Search state
  const [searchValue, setSearchValue] = useState('');
  const [tabletSearchOpen, setTabletSearchOpen] = useState(false);
  const tabletInputRef = useRef(null);

  // Mobile drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Products Dropdown state
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  // Active link helper
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/products') {
      return (
        location.pathname.startsWith('/products') ||
        location.pathname.startsWith('/occasion') ||
        location.pathname.startsWith('/bestseller')
      );
    }
    return location.pathname === path;
  };

  // Products dropdown option click handler
  const handleDropdownOptionClick = (type) => {
    setProductsDropdownOpen(false);
    if (type === 'occasion') {
      if (location.pathname === '/') {
        const el = document.getElementById('shop-by-occasion') || document.querySelector('.shop-by-occasion-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById('shop-by-occasion') || document.querySelector('.shop-by-occasion-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else if (type === 'categories') {
      navigate('/products');
    } else if (type === 'bestsellers') {
      if (location.pathname === '/') {
        const el = document.getElementById('best-sellers') || document.querySelector('.shop-by-bestseller-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById('best-sellers') || document.querySelector('.shop-by-bestseller-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  };

  // Mobile drawer data
  const categoriesList = [
    { name: "Balloons", url: "/products?category=balloons", icon: "fa-solid fa-parachute-box" },
    { name: "Metallic Balloons", url: "/bestseller/metallic-balloons", icon: "fa-solid fa-circle-dot", badge: "Hot", badgeClass: "drawer-badge-hot" },
    { name: "Cake Candles", url: "/products?category=candles", icon: "fa-solid fa-cake-candles" },
    { name: "Sparkling Candles", url: "/bestseller/sparkling-candles", icon: "fa-solid fa-wand-magic-sparkles" },
    { name: "Party Poppers", url: "/bestseller/party-poppers", icon: "fa-solid fa-burst" },
    { name: "Paper Banners", url: "/products?category=banners", icon: "fa-solid fa-flag", badge: "New", badgeClass: "drawer-badge-new" },
    { name: "Birthday Caps", url: "/bestseller/birthday-caps", icon: "fa-solid fa-hat-wizard" },
    { name: "Foil Curtains", url: "/products?category=manymore", icon: "fa-solid fa-border-all" },
    { name: "Snow Spray", url: "/bestseller/snow-spray", icon: "fa-solid fa-snowflake" },
    { name: "Cake Toppers", url: "/bestseller/theme-cake-toppers", icon: "fa-solid fa-star" },
    { name: "Birthday Crowns", url: "/products?category=crowns", icon: "fa-solid fa-crown" },
    { name: "Tiaras", url: "/products?category=tiara", icon: "fa-solid fa-gem" },
    { name: "Sashes", url: "/products?category=sashes", icon: "fa-solid fa-ribbon" },
    { name: "Cake Cutting Knives", url: "/products?category=cake-knives", icon: "fa-solid fa-utensils" },
    { name: "Decor Combos", url: "/products?category=combos", icon: "fa-solid fa-box-open" },
    { name: "Balloon Pump", url: "/bestseller/balloon-pump", icon: "fa-solid fa-wind" },
    { name: "Crazy Ribbon", url: "/bestseller/crazy-ribbon", icon: "fa-solid fa-ribbon" },
    { name: "3D Butterfly Decor", url: "/bestseller/3d-butterfly", icon: "fa-solid fa-bug" },
    { name: "Cake Dolls", url: "/bestseller/cake-dolls", icon: "fa-solid fa-person-dress" },
    { name: "Golden Number Candles", url: "/bestseller/golden-no-candles", icon: "fa-solid fa-hashtag" },
    { name: "View All Categories", url: "/bestseller/many-more", icon: "fa-solid fa-boxes-stacked" }
  ];

  const quickPagesList = [
    { name: "Home", url: "/", icon: "fa-solid fa-house" },
    { name: "Services", url: "/services", icon: "fa-solid fa-hand-holding-heart" },
    { name: "Features", url: "/features", icon: "fa-solid fa-star" },
    { name: "Products by Occasion", optionType: "occasion", icon: "fa-solid fa-calendar-day" },
    { name: "Products by Categories", optionType: "categories", icon: "fa-solid fa-layer-group" },
    { name: "Products by Best Sellers", optionType: "bestsellers", icon: "fa-solid fa-fire" },
    { name: "About Us", url: "/about", icon: "fa-solid fa-circle-info" },
    { name: "Contact", url: "/contact", icon: "fa-solid fa-envelope" },
    { name: `Wishlist${wishlistCount > 0 ? ` (${wishlistCount})` : ''}`, url: "/wishlist", icon: wishlistCount > 0 ? "fa-solid fa-heart" : "fa-regular fa-heart" },
    { name: `Cart${cartCount > 0 ? ` (${cartCount})` : ''}`, url: "/cart", icon: "fa-solid fa-cart-shopping" },
    ...(isLoggedIn
      ? [{ name: `Logout (${user?.name?.split(' ')[0] || 'User'})`, url: '#logout', icon: 'fa-solid fa-right-from-bracket', isLogout: true }]
      : [{ name: 'Login / Sign up', url: '/login', icon: 'fa-regular fa-user' }])
  ];

  // Open tablet search and auto-focus input
  const openTabletSearch = useCallback(() => {
    setTabletSearchOpen(true);
    setTimeout(() => { if (tabletInputRef.current) tabletInputRef.current.focus(); }, 80);
  }, []);

  const closeTabletSearch = useCallback(() => {
    setTabletSearchOpen(false);
    setSearchValue('');
  }, []);

  const openDrawer = () => {
    setDrawerOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    document.body.style.overflow = '';
  };

  // Close drawer/search on ESC key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        closeDrawer();
        closeTabletSearch();
        setProductsDropdownOpen(false);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [closeTabletSearch]);

  // Close tablet search / dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      const overlay = document.getElementById('tablet-search-overlay');
      const iconBtn = document.getElementById('search-icon-btn');
      if (tabletSearchOpen && overlay && !overlay.contains(e.target) && iconBtn && !iconBtn.contains(e.target)) {
        closeTabletSearch();
      }
      const dropdown = document.querySelector('.dropdown-item');
      if (dropdown && !dropdown.contains(e.target)) {
        setProductsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [tabletSearchOpen, closeTabletSearch]);

  // Search navigation logic
  const performSearch = (query) => {
    if (!query) return;
    const q = query.toLowerCase().trim();
    const routeMap = [
      { keywords: ['birthday', 'bday'], url: '/occasion/birthday' },
      { keywords: ['anniversary', 'anniversaries'], url: '/occasion/anniversary' },
      { keywords: ['baby shower', 'babyshower'], url: '/occasion/baby-shower' },
      { keywords: ['welcome baby'], url: '/occasion/welcome-baby' },
      { keywords: ['welcome home'], url: '/occasion/welcome-home' },
      { keywords: ['haldi'], url: '/occasion/haldi' },
      { keywords: ['mehndi', 'mehendi'], url: '/occasion/mehndi' },
      { keywords: ['farewell'], url: '/occasion/farewell' },
      { keywords: ['annaprashan'], url: '/occasion/annaprashan' },
      { keywords: ['krishna', 'janmashtami'], url: '/occasion/krishna-janmashtami' },
      { keywords: ['sparkling candle'], url: '/bestseller/sparkling-candles' },
      { keywords: ['metallic balloon'], url: '/bestseller/metallic-balloons' },
      { keywords: ['cake doll'], url: '/bestseller/cake-dolls' },
      { keywords: ['golden no candle', 'golden candle'], url: '/bestseller/golden-no-candles' },
      { keywords: ['balloon pump'], url: '/bestseller/balloon-pump' },
      { keywords: ['butterfly', '3d butterfly'], url: '/bestseller/3d-butterfly' },
      { keywords: ['snow spray', 'snow'], url: '/bestseller/snow-spray' },
      { keywords: ['crazy ribbon', 'ribbon'], url: '/bestseller/crazy-ribbon' },
      { keywords: ['theme cake topper', 'cake topper'], url: '/bestseller/theme-cake-toppers' },
    ];
    for (const { keywords, url } of routeMap) {
      if (keywords.some(k => q.includes(k))) { navigate(url); return; }
    }
    let cat = 'balloons';
    if (q.includes('balloon')) cat = 'balloons';
    else if (q.includes('candle')) cat = 'candles';
    else if (q.includes('cap') || q.includes('hat')) cat = 'birthday-caps';
    else if (q.includes('popper')) cat = 'party-poppers';
    else if (q.includes('sash')) cat = 'sashes';
    else if (q.includes('banner')) cat = 'banners';
    else if (q.includes('knife') || q.includes('knives')) cat = 'cake-knives';
    else if (q.includes('tiara')) cat = 'tiara';
    else if (q.includes('crown')) cat = 'crowns';
    else if (q.includes('topper')) cat = 'toppers';
    else if (q.includes('combo') || q.includes('kit')) cat = 'combos';
    navigate(`/products?category=${cat}`);
  };

  return (
    <>
      <header>
        <nav>
          <div className="nav-left">
            {/* Hamburger — shown only on mobile */}
            <button
              className="hamburger-btn"
              id="hamburger-btn"
              aria-label="Open menu"
              onClick={drawerOpen ? closeDrawer : openDrawer}
            >
              <i className={drawerOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}></i>
            </button>

            <Link to="/">
              <img src="/NLTClogo.png" alt="NLTC Logo" />
            </Link>

            <ul className="nav-menu" id="nav-menu">
              <li className={`nav-menu-item ${isActive('/') ? 'active' : ''}`}>
                <Link to="/">Home</Link>
                {isActive('/') && <span className="active-indicator"></span>}
              </li>

              <li className="nav-vertical-divider"></li>

              <li className={`nav-menu-item ${isActive('/services') ? 'active' : ''}`}>
                <Link to="/services">Services</Link>
                {isActive('/services') && <span className="active-indicator"></span>}
              </li>

              <li className="nav-vertical-divider"></li>

              <li className={`nav-menu-item ${isActive('/features') ? 'active' : ''}`}>
                <Link to="/features">Features</Link>
                {isActive('/features') && <span className="active-indicator"></span>}
              </li>

              <li className="nav-vertical-divider"></li>

              <li
                className={`nav-menu-item dropdown-item ${isActive('/products') ? 'active' : ''}`}
                onMouseEnter={() => setProductsDropdownOpen(true)}
                onMouseLeave={() => setProductsDropdownOpen(false)}
              >
                <div
                  className="products-menu-trigger"
                  onClick={() => setProductsDropdownOpen((prev) => !prev)}
                  style={{ cursor: 'pointer' }}
                >
                  <span>Products</span>
                  <i className={`fa-solid fa-chevron-down dropdown-arrow ${productsDropdownOpen ? 'open' : ''}`}></i>
                </div>
                {isActive('/products') && <span className="active-indicator"></span>}

                {productsDropdownOpen && (
                  <div className="products-dropdown-menu">
                    <div
                      className="dropdown-option"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownOptionClick('occasion');
                      }}
                    >
                      Products by Occasion
                    </div>
                    <div
                      className="dropdown-option"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownOptionClick('categories');
                      }}
                    >
                      Products by Categories
                    </div>
                    <div
                      className="dropdown-option"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownOptionClick('bestsellers');
                      }}
                    >
                      Products by Best Sellers
                    </div>
                  </div>
                )}
              </li>

              <li className="nav-vertical-divider"></li>

              <li className={`nav-menu-item ${isActive('/about') ? 'active' : ''}`}>
                <Link to="/about">About Us</Link>
                {isActive('/about') && <span className="active-indicator"></span>}
              </li>

              <li className="nav-vertical-divider"></li>

              <li className={`nav-menu-item ${isActive('/contact') ? 'active' : ''}`}>
                <Link to="/contact">Contact</Link>
                {isActive('/contact') && <span className="active-indicator"></span>}
              </li>
            </ul>
          </div>

          <div className="nav-right">
            {/* Full search bar: desktop & laptop */}
            <div className="search-bar" id="main-search-bar">
              <i className="fa-solid fa-magnifying-glass" style={{ cursor: 'pointer' }} onClick={() => performSearch(searchValue)}></i>
              <input
                type="text"
                placeholder="Search for Party Decoration Items..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && performSearch(searchValue)}
              />
            </div>

            <div className="nav-vertical-divider right-divider"></div>

            <div className="login">
              {isLoggedIn ? (
                <>
                  <span className="loginbtn" style={{ cursor: 'pointer' }} onClick={logout} title="Logout">
                    <i className="fa-solid fa-right-from-bracket"></i>
                  </span>
                  <p style={{ cursor: 'pointer' }} onClick={logout} title="Click to Logout">
                    {user?.name ? user.name.split(' ')[0] : 'Logout'}
                  </p>
                </>
              ) : (
                <>
                  <Link to="/login" className="loginbtn"><i className="fa-regular fa-user"></i></Link>
                  <Link to="/login"><p>Login / Sign up</p></Link>
                </>
              )}
            </div>

            <div className="nav-vertical-divider icon-divider"></div>

            <div className="wishlist">
              <Link to="/wishlist" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="nav-icon-wrapper">
                  <i className={wishlistCount > 0 ? "fa-solid fa-heart" : "fa-regular fa-heart"} style={{ color: wishlistCount > 0 ? '#ff3f6c' : undefined }}></i>
                  {wishlistCount > 0 && <span className="nav-badge-round">{wishlistCount}</span>}
                </div>
                <p>Wishlist{wishlistCount > 0 ? ` (${wishlistCount})` : ''}</p>
              </Link>
            </div>

            <div className="nav-vertical-divider icon-divider"></div>

            <div className="cart">
              <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="nav-icon-wrapper">
                  <i className="fa-solid fa-cart-shopping"></i>
                  {cartCount > 0 && <span className="nav-badge-round">{cartCount}</span>}
                </div>
                <p>Cart{cartCount > 0 ? ` (${cartCount})` : ''}</p>
              </Link>
            </div>
          </div>
        </nav>

        {/* Tablet search overlay */}
        <div
          className={`tablet-search-overlay${tabletSearchOpen ? ' open' : ''}`}
          id="tablet-search-overlay"
          role="search"
          aria-label="Search overlay"
        >
          <div className="tablet-search-bar">
            <i
              className="fa-solid fa-magnifying-glass"
              style={{ cursor: 'pointer' }}
              onClick={() => performSearch(searchValue)}
            ></i>
            <input
              type="text"
              id="tablet-search-input"
              placeholder="Search for Party Decoration Items..."
              autoComplete="off"
              ref={tabletInputRef}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && performSearch(searchValue)}
            />
          </div>
          <button
            className="tablet-search-close-btn"
            id="tablet-search-close-btn"
            aria-label="Close search"
            onClick={closeTabletSearch}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Mobile search row */}
        <div className="mobile-search-row" id="mobile-search-row">
          <div className="search-bar">
            <i
              className="fa-solid fa-magnifying-glass"
              style={{ cursor: 'pointer' }}
              onClick={() => performSearch(searchValue)}
            ></i>
            <input
              type="text"
              placeholder="Search for Party Decoration Items..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && performSearch(searchValue)}
            />
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      {drawerOpen && (
        <div
          className="mobile-drawer-backdrop active"
          id="mobile-drawer-backdrop"
          onClick={closeDrawer}
        />
      )}
      <div
        className={`mobile-nav-drawer${drawerOpen ? ' active' : ''}`}
        id="mobile-nav-drawer"
        role="dialog"
        aria-label="Mobile Navigation Drawer"
      >
        <div className="mobile-drawer-header">
          <Link to="/" aria-label="Home" onClick={closeDrawer}>
            <img src="/NLTClogo.png" alt="NLTC Logo" className="mobile-drawer-logo" />
          </Link>
          <button
            className="mobile-drawer-close"
            id="mobile-drawer-close-btn"
            aria-label="Close menu"
            onClick={closeDrawer}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="mobile-drawer-body">
          <h4 className="mobile-drawer-section-title">Navigation Links</h4>
          <ul className="mobile-drawer-list">
            {quickPagesList.map((item, idx) => (
              <li key={idx}>
                {item.isLogout ? (
                  <button
                    type="button"
                    className="mobile-drawer-item"
                    style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit' }}
                    onClick={() => {
                      logout();
                      closeDrawer();
                    }}
                  >
                    <span className="drawer-item-left">
                      <span className="drawer-item-icon"><i className={item.icon}></i></span>
                      <span className="drawer-item-title">{item.name}</span>
                    </span>
                    <i className="fa-solid fa-chevron-right drawer-item-arrow"></i>
                  </button>
                ) : item.optionType ? (
                  <div
                    className="mobile-drawer-item"
                    style={{ cursor: 'pointer', width: '100%' }}
                    onClick={(e) => {
                      e.preventDefault();
                      closeDrawer();
                      handleDropdownOptionClick(item.optionType);
                    }}
                  >
                    <span className="drawer-item-left">
                      <span className="drawer-item-icon"><i className={item.icon}></i></span>
                      <span className="drawer-item-title">{item.name}</span>
                    </span>
                    <i className="fa-solid fa-chevron-right drawer-item-arrow"></i>
                  </div>
                ) : (
                  <Link to={item.url} className="mobile-drawer-item" onClick={closeDrawer}>
                    <span className="drawer-item-left">
                      <span className="drawer-item-icon"><i className={item.icon}></i></span>
                      <span className="drawer-item-title">{item.name}</span>
                    </span>
                    <i className="fa-solid fa-chevron-right drawer-item-arrow"></i>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <h4 className="mobile-drawer-section-title">Product Categories</h4>
          <ul className="mobile-drawer-list">
            {categoriesList.map((item, idx) => (
              <li key={idx}>
                <Link to={item.url} className="mobile-drawer-item" onClick={closeDrawer}>
                  <span className="drawer-item-left">
                    <span className="drawer-item-icon"><i className={item.icon}></i></span>
                    <span className="drawer-item-title">
                      {item.name}
                      {item.badge && <span className={item.badgeClass || 'drawer-badge-new'}>{item.badge}</span>}
                    </span>
                  </span>
                  <i className="fa-solid fa-chevron-right drawer-item-arrow"></i>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mobile-drawer-footer">NLTC &copy; Premium Party Decorations</div>
      </div>
    </>
  );
}

export default Navbar;
