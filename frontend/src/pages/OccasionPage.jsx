import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/products/ProductCard';
import { occasionsProducts, occasionsData } from '../utils/occasionsCatalogData';

function OccasionPage() {
  const { slug } = useParams();
  const occasionKey = slug || 'birthday';
  const occasionConfig = occasionsData[occasionKey] || occasionsData.birthday;

  const [sortOption, setSortOption] = useState('popular');

  const occasionProducts = useMemo(() => {
    const rawList = occasionsProducts[occasionKey] || occasionsProducts.birthday || [];
    const sorted = [...rawList];

    if (sortOption === 'low-high') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'high-low') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    return sorted;
  }, [occasionKey, sortOption]);

  return (
    <>
      <Navbar />

      <main className="products-page-container">
        <div className="breadcrumb-trail">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-current">{occasionConfig.title}</span>
        </div>

        <div className="category-info-header">
          <div className="category-text-group">
            <h1 className="category-title-main">
              {occasionConfig.title} <span className="category-emoji">{occasionConfig.emoji}</span>
            </h1>
            <p className="category-description-sub">{occasionConfig.description}</p>
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

        <div
          className="promo-banner-card"
          style={{
            backgroundImage: occasionConfig.bannerBg
              ? `url('/${occasionConfig.bannerBg}')`
              : `url('/nltc_banner_balloons_bg.png')`,
          }}
        >
          <div className="banner-content-wrapper">
            <h2 className="banner-title-text">{occasionConfig.bannerTitle}</h2>
            <p className="banner-subtitle-text">{occasionConfig.bannerSubtitle}</p>

            <div className="banner-badges-row">
              {occasionConfig.bannerBadges.map((badge, idx) => (
                <div key={idx} className="banner-badge">
                  <i className={`fa-solid ${badge.icon}`}></i>
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid — ENTIRE catalog array from occasions.js */}
        <div className="products-listing-grid">
          {occasionProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="explore-more-types-section">
          <div className="explore-section-header">
            <i className="fa-solid fa-crown"></i>
            <h2 className="explore-section-heading">
              Explore More {occasionConfig.title} Types
            </h2>
          </div>

          <div className="explore-buttons-grid">
            {occasionConfig.exploreTypes.map((type, idx) => (
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

export default OccasionPage;
