/**
 * NLTC Product Details Page Controller (product.js)
 * Dynamically loads product information based on URL parameters (id or slug)
 * Manages gallery switching, tabs, quantity stepper, pincode check, wishlist, cart, and related products
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Get Product ID or Slug from URL Query String
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id") || urlParams.get("slug") || "b4";

    // 2. Fetch Product from Master DB
    if (!window.NLTCProductDB) {
        console.error("NLTCProductDB not loaded. Make sure product-data.js is included before product.js.");
        return;
    }

    const product = window.NLTCProductDB.getProductByIdOrSlug(productId);

    if (!product) {
        console.warn("Product not found. Falling back to default product.");
    }

    // Current State Variables
    let currentQuantity = 1;
    let isWishlisted = false;

    // 3. Populate Page Metadata & Title
    document.title = `${product.name} | New Lines Trading Company`;

    // 4. Update Breadcrumbs
    const breadcrumbCategory = document.getElementById("breadcrumb-category");
    if (breadcrumbCategory) {
        breadcrumbCategory.textContent = product.category;
        breadcrumbCategory.href = `products.html?category=${product.categorySlug}`;
    }

    const breadcrumbSubcategory = document.getElementById("breadcrumb-subcategory");
    if (breadcrumbSubcategory) {
        breadcrumbSubcategory.textContent = `${product.material} ${product.category}`;
    }

    const breadcrumbCurrent = document.getElementById("breadcrumb-current");
    if (breadcrumbCurrent) {
        breadcrumbCurrent.textContent = product.name;
    }

    // 5. Populate Product Title, Ratings, Reviews
    const productTitle = document.getElementById("product-title");
    if (productTitle) productTitle.textContent = product.name;

    const ratingStarsContainer = document.getElementById("rating-stars-container");
    if (ratingStarsContainer) {
        const fullStars = Math.floor(product.rating);
        const hasHalfStar = product.rating % 1 !== 0;
        let starsHtml = "";
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                starsHtml += `<i class="fa-solid fa-star"></i>`;
            } else if (i === fullStars + 1 && hasHalfStar) {
                starsHtml += `<i class="fa-solid fa-star-half-stroke"></i>`;
            } else {
                starsHtml += `<i class="fa-regular fa-star"></i>`;
            }
        }
        ratingStarsContainer.innerHTML = starsHtml;
    }

    const ratingText = document.getElementById("rating-text");
    if (ratingText) {
        ratingText.textContent = `${product.rating} (${product.reviews} Reviews)`;
    }

    const reviewsTabHeader = document.getElementById("tab-header-reviews");
    if (reviewsTabHeader) {
        reviewsTabHeader.textContent = `Reviews (${product.reviews})`;
    }

    // 6. Populate Pricing & Stock
    const salePrice = document.getElementById("sale-price");
    if (salePrice) salePrice.textContent = `₹${product.price}`;

    const originalPrice = document.getElementById("original-price");
    if (originalPrice) originalPrice.textContent = `₹${product.originalPrice}`;

    const discountPill = document.getElementById("discount-pill");
    if (discountPill) discountPill.textContent = product.discount;

    const stockStatus = document.getElementById("stock-status");
    if (stockStatus) stockStatus.innerHTML = `<i class="fa-regular fa-circle-check"></i> ${product.stockStatus}`;

    const skuCode = document.getElementById("sku-code");
    if (skuCode) skuCode.textContent = `SKU: ${product.sku}`;

    // 7. Populate Short Description
    const shortDesc = document.getElementById("short-description");
    if (shortDesc) shortDesc.textContent = product.description;

    // 8. Populate Key Attributes Grid
    const attrOccasion = document.getElementById("attr-occasion");
    if (attrOccasion) attrOccasion.textContent = product.occasion;

    const attrMaterial = document.getElementById("attr-material");
    if (attrMaterial) attrMaterial.textContent = product.material;

    const attrColor = document.getElementById("attr-color");
    if (attrColor) attrColor.textContent = product.color;

    const attrSize = document.getElementById("attr-size");
    if (attrSize) attrSize.textContent = product.size;

    // 9. Size Variant Badge on Main Image
    const variantBadgeVal = document.getElementById("variant-badge-val");
    if (variantBadgeVal) {
        variantBadgeVal.textContent = product.size;
    }

    // 10. Populate Image Gallery & Main Image Display
    const mainImageDisplay = document.getElementById("main-product-image");
    if (mainImageDisplay) {
        mainImageDisplay.src = product.images[0] || product.image;
        mainImageDisplay.alt = product.name;
    }

    const thumbnailsContainer = document.getElementById("thumbnails-container");
    if (thumbnailsContainer && product.images && product.images.length) {
        thumbnailsContainer.innerHTML = product.images.map((imgUrl, index) => `
            <div class="thumb-img-box ${index === 0 ? 'active-thumb' : ''}" onclick="switchMainImage('${imgUrl}', this)">
                <img src="${imgUrl}" alt="${product.name} Thumbnail ${index + 1}">
            </div>
        `).join('');
    }

    // 11. Populate Description & Features Tab Panel
    const tabDescText = document.getElementById("tab-desc-text");
    if (tabDescText) {
        tabDescText.textContent = `Our ${product.name} adds a vibrant and joyful touch to your party decorations. Made from high-quality ${product.material} material, it is durable, long-lasting, and reusable. Suitable for all celebrations and surprise setups.`;
    }

    const checklistContainer = document.getElementById("checklist-container");
    if (checklistContainer && product.bulletPoints) {
        checklistContainer.innerHTML = product.bulletPoints.map(pt => `
            <div class="check-item-row">
                <div class="check-icon-circle"><i class="fa-solid fa-check"></i></div>
                <span>${pt}</span>
            </div>
        `).join('');
    }

    // 12. Populate Specifications Table Tab Panel
    const specsTableBody = document.getElementById("specs-table-body");
    if (specsTableBody && product.specificationsTable) {
        specsTableBody.innerHTML = Object.entries(product.specificationsTable).map(([key, val]) => `
            <tr>
                <td class="spec-lbl">${key}</td>
                <td class="spec-val">${val}</td>
            </tr>
        `).join('');
    }

    // 13. Populate Reviews List Tab Panel
    const reviewsListContainer = document.getElementById("reviews-list-container");
    if (reviewsListContainer && product.reviewsList) {
        reviewsListContainer.innerHTML = product.reviewsList.map(rev => `
            <div class="review-item-card" style="border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                    <span style="font-weight: 700; color: #333;">${rev.name}</span>
                    <span style="font-size: 0.8rem; color: #888;">${rev.date}</span>
                </div>
                <div style="color: #ffb400; font-size: 0.85rem; margin-bottom: 6px;">
                    ${'<i class="fa-solid fa-star"></i>'.repeat(rev.rating)}
                </div>
                <p style="font-size: 0.9rem; color: #555; margin: 0;">${rev.comment}</p>
            </div>
        `).join('');
    }

    // 14. Populate "You May Also Like" Related Products
    const relatedGrid = document.getElementById("related-products-grid");
    if (relatedGrid) {
        const relatedProds = window.NLTCProductDB.getRelatedProducts(product.categorySlug, product.id, 4);
        relatedGrid.innerHTML = relatedProds.map(rel => `
            <div class="mini-related-card" onclick="location.href='product.html?id=${rel.id}'">
                <div class="mini-card-img-box">
                    <img src="${rel.image}" alt="${rel.name}">
                </div>
                <div class="mini-card-title">${rel.name}</div>
                <div class="mini-card-footer">
                    <span class="mini-card-price">₹${rel.price}</span>
                    <i class="fa-regular fa-heart mini-wishlist-icon" onclick="event.stopPropagation(); alert('${rel.name} added to Wishlist!')"></i>
                </div>
            </div>
        `).join('');
    }

    const viewAllRelatedLink = document.getElementById("view-all-related-link");
    if (viewAllRelatedLink) {
        viewAllRelatedLink.href = `products.html?category=${product.categorySlug}`;
    }

    // ==========================================================================
    // Interactive Handlers
    // ==========================================================================

    // Image Gallery Switcher
    window.switchMainImage = function (imgUrl, element) {
        if (mainImageDisplay) {
            mainImageDisplay.style.opacity = "0.4";
            setTimeout(() => {
                mainImageDisplay.src = imgUrl;
                mainImageDisplay.style.opacity = "1";
            }, 150);
        }
        document.querySelectorAll(".thumb-img-box").forEach(el => el.classList.remove("active-thumb"));
        if (element) element.classList.add("active-thumb");
    };

    // Quantity Counter
    const qtyInput = document.getElementById("qty-input");
    window.increaseQty = function () {
        currentQuantity++;
        if (qtyInput) qtyInput.value = currentQuantity;
    };

    window.decreaseQty = function () {
        if (currentQuantity > 1) {
            currentQuantity--;
            if (qtyInput) qtyInput.value = currentQuantity;
        }
    };

    // Pincode Delivery Estimate Simulator
    window.checkPincodeDelivery = function () {
        const pincodeInput = document.getElementById("pincode-input");
        const estDeliveryDate = document.getElementById("est-delivery-date");

        if (!pincodeInput || !pincodeInput.value.trim()) {
            alert("Please enter a valid 6-digit Pincode.");
            return;
        }

        const pincode = pincodeInput.value.trim();
        if (!/^\d{6}$/.test(pincode)) {
            alert("Invalid Pincode. Please enter a 6-digit Indian Pincode.");
            return;
        }

        // Calculate dynamic delivery date (3 to 5 days from today)
        const today = new Date();
        const minDate = new Date(today);
        minDate.setDate(today.getDate() + 3);
        const maxDate = new Date(today);
        maxDate.setDate(today.getDate() + 5);

        const options = { month: 'short', day: 'numeric' };
        const minStr = minDate.toLocaleDateString('en-US', options);
        const maxStr = maxDate.toLocaleDateString('en-US', options);

        if (estDeliveryDate) {
            estDeliveryDate.textContent = `${minStr} - ${maxStr}`;
            estDeliveryDate.style.color = "#2e7d32";
        }

        alert(`Delivery available for Pincode ${pincode}! Estimated delivery: ${minStr} - ${maxStr}.`);
    };

    // Tab Switcher
    window.switchTab = function (tabName, btnElement) {
        document.querySelectorAll(".tab-nav-btn").forEach(btn => btn.classList.remove("active-tab"));
        document.querySelectorAll(".tab-panel").forEach(panel => panel.classList.remove("active-panel"));

        if (btnElement) btnElement.classList.add("active-tab");

        const targetPanel = document.getElementById(`tab-panel-${tabName}`);
        if (targetPanel) targetPanel.classList.add("active-panel");
    };

    // Wishlist Toggle Button
    window.toggleProductWishlist = function () {
        isWishlisted = !isWishlisted;
        const wishlistBtn = document.getElementById("btn-add-wishlist");
        if (wishlistBtn) {
            if (isWishlisted) {
                wishlistBtn.innerHTML = `<i class="fa-solid fa-heart" style="color:#d32f2f;"></i> Added to Wishlist`;
                wishlistBtn.style.backgroundColor = "#fff0f0";
            } else {
                wishlistBtn.innerHTML = `<i class="fa-regular fa-heart"></i> Add to Wishlist`;
                wishlistBtn.style.backgroundColor = "#ffffff";
            }
        }
    };

    // Add to Cart Button
    window.addProductToCart = function () {
        alert(`Success! Added ${currentQuantity} x "${product.name}" to your Cart.`);
    };

    // Buy Now Button
    window.buyNowProduct = function () {
        alert(`Redirecting to Checkout for "${product.name}" (Qty: ${currentQuantity}, Total: ₹${product.price * currentQuantity})...`);
    };
});
