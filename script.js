var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'), 
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timerunning') 

let timeRunning = 3000 
let timeAutoNext = 7000
let runTimeOut 
let runNextAuto 

if (carousel && nextBtn && prevBtn && list && runningTime) {
    nextBtn.onclick = function(){
        showSlider('next')
    }

    prevBtn.onclick = function(){
        showSlider('prev')
    }

    runNextAuto = setTimeout(() => {
        nextBtn.click()
    }, timeAutoNext)

    function resetTimeAnimation() {
        runningTime.style.animation = 'none'
        runningTime.offsetHeight /* trigger reflow */
        runningTime.style.animation = null 
        runningTime.style.animation = 'runningTime 7s linear 1 forwards'
    }

    function showSlider(type) {
        let sliderItemsDom = list.querySelectorAll('.carousel .list .item')
        if(type === 'next'){
            list.appendChild(sliderItemsDom[0])
            carousel.classList.add('next')
        } else{
            list.prepend(sliderItemsDom[sliderItemsDom.length - 1])
            carousel.classList.add('prev')
        }

        clearTimeout(runTimeOut)
        runTimeOut = setTimeout(()=>{
            carousel.classList.remove('next')
            carousel.classList.remove('prev')
        }, timeAutoNext)

        clearTimeout(runNextAuto)
        runNextAuto = setTimeout(()=>{
            nextBtn.click()
        }, timeAutoNext)

        resetTimeAnimation() //reset the running time animation
    }

    //Start the initial animation
    resetTimeAnimation()
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