/**
 * NLTC Wishlist Under Construction Page Script (wishlist.js)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuIcon = document.querySelector('.nav-left i.fa-bars');
    const navMenu = document.querySelector('.nav-menu');

    if (menuIcon && navMenu) {
        menuIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && e.target !== menuIcon) {
                navMenu.classList.remove('active');
            }
        });
    }

    // 2. Category Navbar Item Redirects
    const navMenuItems = document.querySelectorAll('.nav-menu li');
    navMenuItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const catAttr = item.getAttribute('data-cat');
            let catSlug = catAttr || 'balloons';
            if (!catAttr) {
                const itemText = item.textContent.replace('New', '').trim().toLowerCase();
                if (itemText === 'balloons') catSlug = 'balloons';
                else if (itemText === 'party poppers') catSlug = 'party-poppers';
                else if (itemText === 'candles') catSlug = 'candles';
                else if (itemText === 'birthday caps') catSlug = 'birthday-caps';
                else if (itemText === 'sashes') catSlug = 'sashes';
                else if (itemText === 'banners') catSlug = 'banners';
            }
            window.location.href = `products.html?category=${catSlug}`;
        });
    });

    // 3. Search Bar Interactivity
    const searchInput = document.querySelector('.search-bar input');
    const searchIcon = document.querySelector('.search-bar i');

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }

    if (searchIcon && searchInput) {
        searchIcon.style.cursor = 'pointer';
        searchIcon.addEventListener('click', () => {
            performSearch(searchInput.value);
        });
    }

    function performSearch(query) {
        if (!query) return;
        query = query.toLowerCase().trim();

        if (query.includes('birthday')) { window.location.href = 'birthday.html'; return; }
        if (query.includes('anniversary')) { window.location.href = 'anniversary.html'; return; }
        if (query.includes('baby shower')) { window.location.href = 'baby-shower.html'; return; }
        if (query.includes('welcome baby')) { window.location.href = 'welcome-baby.html'; return; }
        if (query.includes('welcome home')) { window.location.href = 'welcome-home.html'; return; }
        if (query.includes('haldi')) { window.location.href = 'haldi.html'; return; }
        if (query.includes('mehndi')) { window.location.href = 'mehndi.html'; return; }
        if (query.includes('engagement')) { window.location.href = 'engagement.html'; return; }

        let categorySlug = 'balloons';
        if (query.includes('balloon')) categorySlug = 'balloons';
        else if (query.includes('candle')) categorySlug = 'candles';
        else if (query.includes('cap')) categorySlug = 'birthday-caps';
        else if (query.includes('popper')) categorySlug = 'party-poppers';
        else if (query.includes('sash')) categorySlug = 'sashes';
        else if (query.includes('banner')) categorySlug = 'banners';

        window.location.href = `products.html?category=${categorySlug}`;
    }
});
