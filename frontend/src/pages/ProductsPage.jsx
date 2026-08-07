import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/products/ProductCard';
import { productsData, categoriesData } from '../utils/productsCatalogData';

function ProductsPage() {
  const [searchParams] = useSearchParams();
  const categoryKey = searchParams.get('category') || 'balloons';
  const categoryConfig = categoriesData[categoryKey] || categoriesData.balloons;

  const [sortOption, setSortOption] = useState('popular');

  const categoryProducts = useMemo(() => {
    const rawList = productsData[categoryKey] || productsData.balloons || [];
    const sorted = [...rawList];

    if (sortOption === 'low-high') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'high-low') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    return sorted;
  }, [categoryKey, sortOption]);

  return (
    <>
      <Navbar />

      <main className="products-page-container">
        {/* Breadcrumb Trail */}
        <div className="breadcrumb-trail">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">&gt;</span>
          <a href="#" className="breadcrumb-category" onClick={(e) => e.preventDefault()}>
            {categoryConfig.title}
          </a>
        </div>

        {/* Category Header */}
        <div className="category-info-header">
          <div className="category-text-group">
            <h1 className="category-title-main">
              {categoryConfig.title} <span className="category-emoji">{categoryConfig.emoji}</span>
            </h1>
            <p className="category-description-sub">{categoryConfig.description}</p>
          </div>

          <div className="sort-dropdown-wrapper">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              className="sort-dropdown-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="popular">Popular</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Promo Banner Card */}
        <div
          className="promo-banner-card"
          style={{
            backgroundImage: categoryConfig.bannerBg
              ? `url('/${categoryConfig.bannerBg}')`
              : `url('/nltc_banner_balloons_bg.png')`,
          }}
        >
          <div className="banner-content-wrapper">
            <h2 className="banner-title-text">{categoryConfig.bannerTitle}</h2>
            <p className="banner-subtitle-text">{categoryConfig.bannerSubtitle}</p>

            <div className="banner-badges-row">
              {categoryConfig.bannerBadges.map((badge, idx) => (
                <div key={idx} className="banner-badge">
                  <i className={`fa-solid ${badge.icon}`}></i>
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Listing Grid — ENTIRE catalog array from products.js */}
        <div className="products-listing-grid">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Explore More Subcategories */}
        <div className="explore-more-types-section">
          <div className="explore-section-header">
            <i className="fa-solid fa-crown"></i>
            <h2 className="explore-section-heading">
              Explore More {categoryConfig.title} Types
            </h2>
          </div>

          <div className="explore-buttons-grid">
            {categoryConfig.exploreTypes.map((type, idx) => (
              <button key={idx} className="explore-btn">
                <span>{type}</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default ProductsPage;
