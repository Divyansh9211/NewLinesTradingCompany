import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart: cartAdd } = useCart();
  const { isWishlisted: checkWishlisted, toggleWishlist } = useWishlist();
  const { isLoggedIn } = useAuth();
  
  const isWishlisted = checkWishlisted(product);
  const [buttonText, setButtonText] = useState('Add to Cart');
  const [buttonStyle, setButtonStyle] = useState({});

  const handleCardClick = (e) => {
    // Prevent navigation if clicking interactive elements
    if (
      e.target.closest('.wishlist-icon-wrapper') ||
      e.target.closest('.add-to-cart-btn') ||
      e.target.closest('.wishlist-btn-small')
    ) {
      return;
    }
    navigate(`/product/${product.id || product.slug}`);
  };

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    await toggleWishlist(product);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    setButtonText('Added! ✓');
    setButtonStyle({
      backgroundColor: '#2e7d32',
      borderColor: '#2e7d32',
      color: '#ffffff',
    });

    await cartAdd(product, 1);

    setTimeout(() => {
      setButtonText('Add to Cart');
      setButtonStyle({});
    }, 1800);
  };

  const rating = Number(product.rating) || 5;
  const reviews = Number(product.reviews) || 120;
  const price = Number(product.price) || 149;
  const imageSrc = product.image
    ? product.image.startsWith('/')
      ? product.image
      : `/${product.image}`
    : '/nltc_prod_balloon_hbfoil.png';

  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;

  return (
    <div
      className="product-card"
      id={`card-${product.id}`}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Floating Wishlist Icon */}
      <div
        className="wishlist-icon-wrapper"
        onClick={handleWishlistToggle}
        aria-label="Toggle Wishlist"
      >
        <i
          className={`wishlist-icon ${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart`}
          style={{ color: isWishlisted ? 'red' : undefined }}
        />
      </div>

      {/* Product Image Container */}
      <div className="product-img-container">
        <img
          src={imageSrc}
          alt={product.name}
          loading="lazy"
        />
      </div>

      {/* Product Info Body */}
      <div className="product-card-info">
        <h3 className="product-name">
          <a
            href={`/product/${product.id || product.slug}`}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/product/${product.id || product.slug}`);
            }}
          >
            {product.name}
          </a>
        </h3>

        <div className="product-rating-container">
          <div className="stars">
            {[...Array(fullStars)].map((_, i) => (
              <i key={`full-${i}`} className="fa-solid fa-star"></i>
            ))}
            {hasHalf && <i className="fa-solid fa-star-half-stroke"></i>}
            {[...Array(5 - Math.ceil(rating))].map((_, i) => (
              <i key={`empty-${i}`} className="fa-regular fa-star"></i>
            ))}
          </div>
          <span className="review-count">({reviews})</span>
        </div>

        <div className="product-price-action">
          <div className="product-price">₹{price}</div>
          <div className="action-buttons">
            <button
              className="add-to-cart-btn"
              style={buttonStyle}
              onClick={handleAddToCart}
            >
              {buttonText}
            </button>
            <button
              className="wishlist-btn-small"
              onClick={handleWishlistToggle}
              aria-label="Wishlist"
            >
              <i className={`${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart`} style={{ color: isWishlisted ? 'red' : undefined }}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
