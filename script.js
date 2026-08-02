// Smooth Scroll helper to existing Best Sellers section
function scrollToBestSellers(e) {
    if (e) {
        if (typeof e.preventDefault === 'function') e.preventDefault();
        if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }
    const target = document.querySelector('.shop-by-bestseller-section') || document.getElementById('bestsellers-section');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ── Responsive Mobile Navigation Drawer & Category Side Menu ──
(function () {
    const categoriesList = [
        { name: "Balloons", url: "products.html?category=balloons", icon: "fa-solid fa-parachute-box" },
        { name: "Metallic Balloons", url: "metallic-balloons.html", icon: "fa-solid fa-circle-dot", badge: "Hot", badgeClass: "drawer-badge-hot" },
        { name: "Cake Candles", url: "products.html?category=candles", icon: "fa-solid fa-cake-candles" },
        { name: "Sparkling Candles", url: "sparkling-candles.html", icon: "fa-solid fa-wand-magic-sparkles" },
        { name: "Party Poppers", url: "party-poppers.html", icon: "fa-solid fa-burst" },
        { name: "Paper Banners", url: "products.html?category=banners", icon: "fa-solid fa-flag", badge: "New", badgeClass: "drawer-badge-new" },
        { name: "Birthday Caps", url: "birthday-caps.html", icon: "fa-solid fa-hat-wizard" },
        { name: "Foil Curtains", url: "products.html?category=manymore", icon: "fa-solid fa-border-all" },
        { name: "Snow Spray", url: "snow-spray.html", icon: "fa-solid fa-snowflake" },
        { name: "Cake Toppers", url: "theme-cake-toppers.html", icon: "fa-solid fa-star" },
        { name: "Birthday Crowns", url: "products.html?category=crowns", icon: "fa-solid fa-crown" },
        { name: "Tiaras", url: "products.html?category=tiara", icon: "fa-solid fa-gem" },
        { name: "Sashes", url: "products.html?category=sashes", icon: "fa-solid fa-ribbon" },
        { name: "Cake Cutting Knives", url: "products.html?category=cake-knives", icon: "fa-solid fa-utensils" },
        { name: "Decor Combos", url: "products.html?category=combos", icon: "fa-solid fa-box-open" },
        { name: "Balloon Pump", url: "balloon-pump.html", icon: "fa-solid fa-wind" },
        { name: "Crazy Ribbon", url: "crazy-ribbon.html", icon: "fa-solid fa-ribbon" },
        { name: "3D Butterfly Decor", url: "3d-butterfly.html", icon: "fa-solid fa-bug" },
        { name: "Cake Dolls", url: "cake-dolls.html", icon: "fa-solid fa-person-dress" },
        { name: "Golden Number Candles", url: "golden-no-candles.html", icon: "fa-solid fa-hashtag" },
        { name: "View All Categories", url: "many-more.html", icon: "fa-solid fa-boxes-stacked" }
    ];

    const quickPagesList = [
        { name: "Home", url: "index.html", icon: "fa-solid fa-house" },
        { name: "About Us", url: "about.html", icon: "fa-solid fa-circle-info" },
        { name: "Services", url: "services.html", icon: "fa-solid fa-hand-holding-heart" },
        { name: "Contact Us", url: "contact.html", icon: "fa-solid fa-envelope" },
        { name: "Wishlist", url: "wishlist.html", icon: "fa-regular fa-heart" },
        { name: "Cart", url: "cart.html", icon: "fa-solid fa-cart-shopping" }
    ];

    function createDrawerDOM() {
        if (document.getElementById('mobile-nav-drawer')) return;

        // Backdrop
        const backdrop = document.createElement('div');
        backdrop.id = 'mobile-drawer-backdrop';
        backdrop.className = 'mobile-drawer-backdrop';
        document.body.appendChild(backdrop);

        // Drawer Panel
        const drawer = document.createElement('div');
        drawer.id = 'mobile-nav-drawer';
        drawer.className = 'mobile-nav-drawer';
        drawer.setAttribute('role', 'dialog');
        drawer.setAttribute('aria-label', 'Mobile Navigation Drawer');

        // Header
        const header = document.createElement('div');
        header.className = 'mobile-drawer-header';
        header.innerHTML = `
            <a href="index.html" aria-label="Home">
                <img src="NLTClogo.png" alt="NLTC Logo" class="mobile-drawer-logo">
            </a>
            <button class="mobile-drawer-close" id="mobile-drawer-close-btn" aria-label="Close menu">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;
        drawer.appendChild(header);

        // Body
        const body = document.createElement('div');
        body.className = 'mobile-drawer-body';

        // Section 1: Categories
        const catTitle = document.createElement('h4');
        catTitle.className = 'mobile-drawer-section-title';
        catTitle.textContent = 'Product Categories';
        body.appendChild(catTitle);

        const catUl = document.createElement('ul');
        catUl.className = 'mobile-drawer-list';

        categoriesList.forEach(item => {
            const li = document.createElement('li');
            const badgeHTML = item.badge ? `<span class="${item.badgeClass || 'drawer-badge-new'}">${item.badge}</span>` : '';
            li.innerHTML = `
                <a href="${item.url}" class="mobile-drawer-item">
                    <span class="drawer-item-left">
                        <span class="drawer-item-icon"><i class="${item.icon}"></i></span>
                        <span class="drawer-item-title">${item.name}${badgeHTML}</span>
                    </span>
                    <i class="fa-solid fa-chevron-right drawer-item-arrow"></i>
                </a>
            `;
            catUl.appendChild(li);
        });
        body.appendChild(catUl);

        // Section 2: Quick Links
        const pagesTitle = document.createElement('h4');
        pagesTitle.className = 'mobile-drawer-section-title';
        pagesTitle.textContent = 'Navigation Links';
        body.appendChild(pagesTitle);

        const pagesUl = document.createElement('ul');
        pagesUl.className = 'mobile-drawer-list';

        quickPagesList.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="${item.url}" class="mobile-drawer-item">
                    <span class="drawer-item-left">
                        <span class="drawer-item-icon"><i class="${item.icon}"></i></span>
                        <span class="drawer-item-title">${item.name}</span>
                    </span>
                    <i class="fa-solid fa-chevron-right drawer-item-arrow"></i>
                </a>
            `;
            pagesUl.appendChild(li);
        });
        body.appendChild(pagesUl);

        drawer.appendChild(body);

        // Footer
        const footer = document.createElement('div');
        footer.className = 'mobile-drawer-footer';
        footer.innerHTML = `NLTC &copy; Premium Party Decorations`;
        drawer.appendChild(footer);

        document.body.appendChild(drawer);
    }

    function openDrawer() {
        createDrawerDOM();
        const backdrop = document.getElementById('mobile-drawer-backdrop');
        const drawer = document.getElementById('mobile-nav-drawer');
        const hamburgerBtn = document.getElementById('hamburger-btn');

        if (backdrop) backdrop.classList.add('active');
        if (drawer) drawer.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (hamburgerBtn) {
            const icon = hamburgerBtn.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-xmark';
        }
    }

    function closeDrawer() {
        const backdrop = document.getElementById('mobile-drawer-backdrop');
        const drawer = document.getElementById('mobile-nav-drawer');
        const hamburgerBtn = document.getElementById('hamburger-btn');

        if (backdrop) backdrop.classList.remove('active');
        if (drawer) drawer.classList.remove('active');
        document.body.style.overflow = '';

        if (hamburgerBtn) {
            const icon = hamburgerBtn.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        }
    }

    function initEvents() {
        createDrawerDOM();

        const hamburgerBtn = document.getElementById('hamburger-btn');
        const backdrop = document.getElementById('mobile-drawer-backdrop');
        const closeBtn = document.getElementById('mobile-drawer-close-btn');
        const drawer = document.getElementById('mobile-nav-drawer');

        if (hamburgerBtn) {
            hamburgerBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                if (drawer && drawer.classList.contains('active')) {
                    closeDrawer();
                } else {
                    openDrawer();
                }
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                closeDrawer();
            });
        }

        if (backdrop) {
            backdrop.addEventListener('click', function () {
                closeDrawer();
            });
        }

        if (drawer) {
            drawer.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function () {
                    closeDrawer();
                });
            });
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeDrawer();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEvents);
    } else {
        initEvents();
    }
})();



// ── Tablet Search Icon Overlay Toggle ──
(function () {
    var searchIconBtn   = document.getElementById('search-icon-btn');
    var tabletOverlay   = document.getElementById('tablet-search-overlay');
    var tabletInput     = document.getElementById('tablet-search-input');
    var tabletCloseBtn  = document.getElementById('tablet-search-close-btn');

    if (!searchIconBtn || !tabletOverlay || !tabletInput) return;

    function openTabletSearch() {
        tabletOverlay.classList.add('open');
        searchIconBtn.classList.add('active');
        // Auto-focus with a tiny delay to let the animation start first
        setTimeout(function () { tabletInput.focus(); }, 80);
    }

    function closeTabletSearch() {
        tabletOverlay.classList.remove('open');
        searchIconBtn.classList.remove('active');
        tabletInput.value = '';
    }

    // Toggle on search icon click
    searchIconBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (tabletOverlay.classList.contains('open')) {
            closeTabletSearch();
        } else {
            openTabletSearch();
        }
    });

    // Close on ✕ button click
    if (tabletCloseBtn) {
        tabletCloseBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            closeTabletSearch();
        });
    }

    // Close on outside click
    document.addEventListener('click', function (e) {
        if (
            tabletOverlay.classList.contains('open') &&
            !tabletOverlay.contains(e.target) &&
            !searchIconBtn.contains(e.target)
        ) {
            closeTabletSearch();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && tabletOverlay.classList.contains('open')) {
            closeTabletSearch();
        }
    });

    // Trigger search on Enter key
    tabletInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            performSearch(tabletInput.value);
        }
    });

    // Trigger search on icon click inside overlay
    var tabletSearchIcon = tabletOverlay.querySelector('.tablet-search-bar i');
    if (tabletSearchIcon) {
        tabletSearchIcon.style.cursor = 'pointer';
        tabletSearchIcon.addEventListener('click', function () {
            performSearch(tabletInput.value);
        });
    }
})();


var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'), 
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timerunning');

let timeRunning = 3000;
let timeAutoNext = 7000;
let runTimeOut;
let runNextAuto;

if (carousel && nextBtn && prevBtn && list && runningTime) {
    const originalItems = Array.from(list.querySelectorAll('.item'));
    const totalSlides = originalItems.length;
    // The CSS shows BOTH nth-child(1) and nth-child(2) at opacity:1 with the same z-index.
    // Since they're position:absolute at the same coordinates, nth-child(2) (later in DOM)
    // paints on top — so the visually active slide is always list.children[1] = originalItems[1].
    let activeIndex = 1;

    const dotsContainer = document.querySelector('.carousel-dots');
    const mobileThumbnailsContainer = document.querySelector('.carousel-thumbnails-mobile');

    function initMobileCarouselUI() {
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('div');
                dot.className = `dot ${i === activeIndex ? 'active' : ''}`;
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }

        if (mobileThumbnailsContainer) {
            mobileThumbnailsContainer.innerHTML = '';
            originalItems.forEach((slideItem, idx) => {
                const bgImg = slideItem.style.backgroundImage;
                const thumb = document.createElement('div');
                thumb.className = `mobile-thumb-card ${idx === activeIndex ? 'active' : ''}`;
                thumb.style.backgroundImage = bgImg;
                thumb.addEventListener('click', () => goToSlide(idx));
                mobileThumbnailsContainer.appendChild(thumb);
            });
        }
    }

    // activeIndex is the single source of truth – always set explicitly before calling this
    function updateMobileCarouselUI() {
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === activeIndex);
            });
        }

        if (mobileThumbnailsContainer) {
            const thumbs = mobileThumbnailsContainer.querySelectorAll('.mobile-thumb-card');
            thumbs.forEach((thumb, idx) => {
                thumb.classList.toggle('active', idx === activeIndex);
            });
        }
    }

    function goToSlide(targetIdx) {
        if (targetIdx === activeIndex) return;
        const currentItems = list.querySelectorAll('.item');
        if (currentItems.length === 0) return;

        // Calculate the minimum 'next' steps needed to reach targetIdx from activeIndex
        let steps = (targetIdx - activeIndex + totalSlides) % totalSlides;

        // Rotate the DOM silently (no CSS class, no per-step side effects)
        for (let i = 0; i < steps; i++) {
            const sliderItemsDom = list.querySelectorAll('.carousel .list .item');
            list.appendChild(sliderItemsDom[0]);
        }

        // Set activeIndex directly to the chosen target before any UI update
        activeIndex = targetIdx;

        // Apply a single visual transition for the jump
        carousel.classList.remove('next');
        carousel.classList.remove('prev');
        carousel.classList.add('next');

        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            carousel.classList.remove('next');
            carousel.classList.remove('prev');
        }, timeRunning);

        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(() => {
            nextBtn.click();
        }, timeAutoNext);

        resetTimeAnimation();
        updateMobileCarouselUI();
    }

    nextBtn.onclick = function(){
        showSlider('next');
    };

    prevBtn.onclick = function(){
        showSlider('prev');
    };

    runNextAuto = setTimeout(() => {
        nextBtn.click();
    }, timeAutoNext);

    function resetTimeAnimation() {
        runningTime.style.animation = 'none';
        runningTime.offsetHeight; /* trigger reflow */
        runningTime.style.animation = null;
        runningTime.style.animation = 'runningTime 7s linear 1 forwards';
    }

    function showSlider(type) {
        let sliderItemsDom = list.querySelectorAll('.carousel .list .item');
        if (type === 'next'){
            list.appendChild(sliderItemsDom[0]);
            // Advance activeIndex forward, keeping it in sync with the DOM rotation
            activeIndex = (activeIndex + 1) % totalSlides;
            carousel.classList.add('next');
        } else {
            list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
            // Move activeIndex backward, keeping it in sync with the DOM rotation
            activeIndex = (activeIndex - 1 + totalSlides) % totalSlides;
            carousel.classList.add('prev');
        }

        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(()=>{
            carousel.classList.remove('next');
            carousel.classList.remove('prev');
        }, timeRunning);

        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(()=>{
            nextBtn.click();
        }, timeAutoNext);

        resetTimeAnimation();
        updateMobileCarouselUI();
    }

    // Touch Swipe Gestures for Mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 40;
        if (touchEndX < touchStartX - swipeThreshold) {
            showSlider('next');
        } else if (touchEndX > touchStartX + swipeThreshold) {
            showSlider('prev');
        }
    }

    // Initialize UI
    initMobileCarouselUI();
    resetTimeAnimation();
}

// Mobile dropdown menu toggle
const menuIcon = document.querySelector('.nav-left i');
const navMenu = document.querySelector('.nav-menu');

if (menuIcon && navMenu) {
    menuIcon.onclick = function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('active');
    }

    document.onclick = function(e) {
        if (!navMenu.contains(e.target) && e.target !== menuIcon) {
            navMenu.classList.remove('active');
        }
    }

    navMenu.querySelectorAll('li').forEach(li => {
        li.onclick = function() {
            navMenu.classList.remove('active');
        }
    });
}

// ==========================================================================
// NLTC Search and Category Navigation Redirect Logic
// ==========================================================================

const searchInput = document.querySelector('.search-bar input');
const searchIcon = document.querySelector('.search-bar i');

if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
}

if (searchIcon && searchInput) {
    searchIcon.style.cursor = 'pointer';
    searchIcon.onclick = function() {
        performSearch(searchInput.value);
    };
}

function performSearch(query) {
    if (!query) return;
    query = query.toLowerCase().trim();

    // Occasion keywords mapping
    if (query.includes('birthday') || query.includes('bday')) {
        window.location.href = 'birthday.html';
        return;
    }
    if (query.includes('anniversary') || query.includes('anniversaries')) {
        window.location.href = 'anniversary.html';
        return;
    }
    if (query.includes('baby shower') || query.includes('babyshower')) {
        window.location.href = 'baby-shower.html';
        return;
    }
    if (query.includes('welcome baby') || query.includes('welcomebaby')) {
        window.location.href = 'welcome-baby.html';
        return;
    }
    if (query.includes('welcome home') || query.includes('welcomehome')) {
        window.location.href = 'welcome-home.html';
        return;
    }
    if (query.includes('haldi')) {
        window.location.href = 'haldi.html';
        return;
    }
    if (query.includes('mehndi') || query.includes('mehendi')) {
        window.location.href = 'mehndi.html';
        return;
    }
    if (query.includes('engagement') || query.includes('ring ceremony')) {
        window.location.href = 'engagement.html';
        return;
    }
    if (query.includes('farewell')) {
        window.location.href = 'farewell.html';
        return;
    }
    if (query.includes('annaprashan') || query.includes('annaprasan')) {
        window.location.href = 'annaprashan.html';
        return;
    }
    if (query.includes('krishna') || query.includes('janmashtami')) {
        window.location.href = 'krishna-janmashtami.html';
        return;
    }

    // Best Sellers keywords mapping
    if (query.includes('sparkling candle')) {
        window.location.href = 'sparkling-candles.html';
        return;
    }
    if (query.includes('metallic balloon')) {
        window.location.href = 'metallic-balloons.html';
        return;
    }
    if (query.includes('cake doll')) {
        window.location.href = 'cake-dolls.html';
        return;
    }
    if (query.includes('golden no candle') || query.includes('golden candle')) {
        window.location.href = 'golden-no-candles.html';
        return;
    }
    if (query.includes('balloon pump') || query.includes('pump')) {
        window.location.href = 'balloon-pump.html';
        return;
    }
    if (query.includes('butterfly') || query.includes('3d butterfly')) {
        window.location.href = '3d-butterfly.html';
        return;
    }
    if (query.includes('snow spray') || query.includes('snow')) {
        window.location.href = 'snow-spray.html';
        return;
    }
    if (query.includes('crazy ribbon') || query.includes('ribbon')) {
        window.location.href = 'crazy-ribbon.html';
        return;
    }
    if (query.includes('theme cake topper') || query.includes('theme topper') || query.includes('cake topper')) {
        window.location.href = 'theme-cake-toppers.html';
        return;
    }

    // Category mapping (fallbacks)
    let categorySlug = 'balloons';
    if (query.includes('balloon')) {
        categorySlug = 'balloons';
    } else if (query.includes('candle') || query.includes('anarcandle')) {
        categorySlug = 'candles';
    } else if (query.includes('cap') || query.includes('hat')) {
        categorySlug = 'birthday-caps';
    } else if (query.includes('popper')) {
        categorySlug = 'party-poppers';
    } else if (query.includes('sash')) {
        categorySlug = 'sashes';
    } else if (query.includes('banner') || query.includes('garland') || query.includes('bunting')) {
        categorySlug = 'banners';
    } else if (query.includes('knife') || query.includes('knives')) {
        categorySlug = 'cake-knives';
    } else if (query.includes('tiara')) {
        categorySlug = 'tiara';
    } else if (query.includes('crown')) {
        categorySlug = 'crowns';
    } else if (query.includes('topper')) {
        categorySlug = 'toppers';
    } else if (query.includes('combo') || query.includes('kit')) {
        categorySlug = 'combos';
    } else if (query.includes('more') || query.includes('other') || query.includes('pump') || query.includes('spray') || query.includes('curtain')) {
        categorySlug = 'manymore';
    } else {
        const supported = ['balloons', 'candles', 'birthday-caps', 'party-poppers', 'sashes', 'banners', 'cake-knives', 'tiara', 'crowns', 'toppers', 'combos', 'manymore'];
        for (const cat of supported) {
            if (cat.replace('-', ' ').includes(query) || query.includes(cat.replace('-', ' '))) {
                categorySlug = cat;
                break;
            }
        }
    }

    window.location.href = `products.html?category=${categorySlug}`;
}

// Category Navbar Item Redirects (on homepage and other pages)
const navMenuItems = document.querySelectorAll('.nav-menu li');
navMenuItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', function() {
        const itemText = item.textContent.replace('New', '').trim().toLowerCase();
        let catSlug = 'balloons';
        if (itemText === 'balloons') catSlug = 'balloons';
        else if (itemText === 'party poppers') catSlug = 'party-poppers';
        else if (itemText === 'candles') catSlug = 'candles';
        else if (itemText === 'birthday caps') catSlug = 'birthday-caps';
        else if (itemText === 'sashes') catSlug = 'sashes';
        else if (itemText === 'banners') catSlug = 'banners';

        window.location.href = `products.html?category=${catSlug}`;
    });
});

// Global navigation helper to Product Details Page
function goToProduct(idOrSlug, event) {
    if (event) {
        // Prevent event propagation if triggered from nested child elements
        const target = event.target;
        if (target.closest('.wishlist-icon-wrapper') || target.closest('.add-to-cart-btn') || target.closest('.wishlist-btn-small')) {
            return;
        }
    }
    if (!idOrSlug) return;
    window.location.href = `product.html?id=${idOrSlug}`;
}

// Global navbar Wishlist & Cart click navigation handlers
document.addEventListener('DOMContentLoaded', function() {
    const navWishlist = document.querySelector('header nav .wishlist, nav .wishlist');
    if (navWishlist) {
        navWishlist.style.cursor = 'pointer';
        navWishlist.addEventListener('click', function(e) {
            // Avoid double navigation if clicking on link
            if (!e.target.closest('a')) {
                window.location.href = 'wishlist.html';
            }
        });
    }

    const navCart = document.querySelector('header nav .cart, nav .cart');
    if (navCart) {
        navCart.style.cursor = 'pointer';
        navCart.addEventListener('click', function(e) {
            if (!e.target.closest('a')) {
                window.location.href = 'cart.html';
            }
        });
    }
});