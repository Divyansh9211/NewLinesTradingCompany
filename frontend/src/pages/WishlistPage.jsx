import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/products/ProductCard';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

function WishlistPage() {
  const navigate = useNavigate();
  const { wishlistItems, wishlistCount, clearWishlist, loading } = useWishlist();
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Navbar />

      <main className="products-page-container">
        {/* Breadcrumb Trail */}
        <div className="breadcrumb-trail">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">&gt;</span>
          <span style={{ color: '#222222', fontWeight: 600 }}>My Wishlist</span>
        </div>

        {/* Wishlist Info Header */}
        <div className="category-info-header" style={{ alignItems: 'center' }}>
          <div className="category-text-group">
            <h1 className="category-title-main">
              My Wishlist <span className="category-emoji" style={{ color: '#ff3f6c' }}>❤️</span>
            </h1>
            <p className="category-description-sub">
              {isLoggedIn
                ? `You have ${wishlistCount} item${wishlistCount === 1 ? '' : 's'} saved in your wishlist.`
                : 'Save your favorite party supplies and decorations for upcoming celebrations.'}
            </p>
          </div>

          {isLoggedIn && wishlistCount > 0 && (
            <button
              onClick={clearWishlist}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                padding: '8px 16px',
                color: '#666666',
                cursor: 'pointer',
                fontSize: '0.88rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ff3f6c';
                e.currentTarget.style.borderColor = '#ff3f6c';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#666666';
                e.currentTarget.style.borderColor = '#e0e0e0';
              }}
            >
              <i className="fa-solid fa-trash-can"></i> Clear All
            </button>
          )}
        </div>

        {/* Not Logged In State */}
        {!isLoggedIn && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              backgroundColor: '#fafafa',
              borderRadius: '12px',
              border: '1px dashed #e0e0e0',
              margin: '30px 0 60px 0',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#fff0f3',
                color: '#ff3f6c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                margin: '0 auto 20px auto',
              }}
            >
              <i className="fa-regular fa-heart"></i>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#222222', marginBottom: '10px' }}>
              Please Log In to View Your Wishlist
            </h2>
            <p style={{ color: '#666666', maxWidth: '450px', margin: '0 auto 25px auto', lineHeight: '1.5' }}>
              Log in to sync and access your saved party decor favorites across devices anytime.
            </p>
            <button
              onClick={() => navigate('/login')}
              style={{
                backgroundColor: 'red',
                color: '#ffffff',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 32px',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(255, 0, 0, 0.25)',
              }}
            >
              Login / Sign Up
            </button>
          </div>
        )}

        {/* Logged In - Empty State */}
        {isLoggedIn && wishlistItems.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              backgroundColor: '#fafafa',
              borderRadius: '12px',
              border: '1px dashed #e0e0e0',
              margin: '30px 0 60px 0',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#fff0f3',
                color: '#ff3f6c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                margin: '0 auto 20px auto',
              }}
            >
              <i className="fa-regular fa-heart"></i>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#222222', marginBottom: '10px' }}>
              Your Wishlist is Empty
            </h2>
            <p style={{ color: '#666666', maxWidth: '450px', margin: '0 auto 25px auto', lineHeight: '1.5' }}>
              Explore our best-selling balloons, cake toppers, banners, and decor combos to save your favorites!
            </p>
            <button
              onClick={() => navigate('/products')}
              style={{
                backgroundColor: 'red',
                color: '#ffffff',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 32px',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(255, 0, 0, 0.25)',
              }}
            >
              Explore Products
            </button>
          </div>
        )}

        {/* Wishlist Product Listing Grid */}
        {isLoggedIn && wishlistItems.length > 0 && (
          <div className="products-listing-grid" style={{ marginBottom: '60px' }}>
            {wishlistItems.map((product) => (
              <ProductCard
                key={product._id || product.id || product.slug}
                product={product}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default WishlistPage;
