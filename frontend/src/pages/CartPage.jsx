import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function CartPage() {
  const navigate = useNavigate();
  const { cartItems, cartCount, cartTotal, updateQuantity, removeFromCart, clearCart, loading } =
    useCart();
  const { isLoggedIn } = useAuth();

  const handleQtyChange = (item, newQty) => {
    if (newQty < 1) {
      removeFromCart(item.id || item._id || item.slug);
    } else {
      updateQuantity(item.id || item._id || item.slug, newQty);
    }
  };

  const deliveryFee = cartTotal > 499 || cartTotal === 0 ? 0 : 49;
  const grandTotal = cartTotal + deliveryFee;

  return (
    <>
      <Navbar />

      <main className="products-page-container">
        {/* Breadcrumb Trail */}
        <div className="breadcrumb-trail">
          <Link to="/">Home</Link>
          <span className="breadcrumb-separator">&gt;</span>
          <span style={{ color: '#222222', fontWeight: 600 }}>Shopping Cart</span>
        </div>

        {/* Cart Info Header */}
        <div className="category-info-header" style={{ alignItems: 'center' }}>
          <div className="category-text-group">
            <h1 className="category-title-main">
              Shopping Cart <span className="category-emoji">🛒</span>
            </h1>
            <p className="category-description-sub">
              {isLoggedIn
                ? `You have ${cartCount} item${cartCount === 1 ? '' : 's'} in your cart.`
                : 'Review and manage your selected party decorations before checkout.'}
            </p>
          </div>

          {isLoggedIn && cartItems.length > 0 && (
            <button
              onClick={clearCart}
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
              <i className="fa-solid fa-trash-can"></i> Clear Cart
            </button>
          )}
        </div>

        {/* Empty Cart State */}
        {cartItems.length === 0 && (
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
                backgroundColor: '#f5f5f5',
                color: '#555555',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                margin: '0 auto 20px auto',
              }}
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#222222', marginBottom: '10px' }}>
              Your Shopping Cart is Empty
            </h2>
            <p style={{ color: '#666666', maxWidth: '450px', margin: '0 auto 25px auto', lineHeight: '1.5' }}>
              Looks like you haven't added any party items to your cart yet. Discover our top collections!
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
              Start Shopping
            </button>
          </div>
        )}

        {/* Cart Items & Summary Grid */}
        {cartItems.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
              gap: '30px',
              marginBottom: '60px',
              alignItems: 'start',
            }}
            className="cart-grid-layout"
          >
            {/* Cart Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {cartItems.map((item) => {
                const imageSrc = item.image
                  ? item.image.startsWith('/')
                    ? item.image
                    : `/${item.image}`
                  : '/nltc_prod_balloon_hbfoil.png';

                const targetKey = item.id || item._id || item.slug;

                return (
                  <div
                    key={targetKey}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      padding: '18px 20px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #f0f0f0',
                      borderRadius: '10px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      style={{
                        width: '85px',
                        height: '85px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        backgroundColor: '#f8f8f8',
                        flexShrink: 0,
                        cursor: 'pointer',
                      }}
                      onClick={() => navigate(`/product/${item.id || item.slug}`)}
                    >
                      <img
                        src={imageSrc}
                        alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </div>

                    {/* Details */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3
                        style={{
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: '#222222',
                          margin: '0 0 6px 0',
                          cursor: 'pointer',
                        }}
                        onClick={() => navigate(`/product/${item.id || item.slug}`)}
                      >
                        {item.name}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'red' }}>
                          ₹{item.price}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span style={{ fontSize: '0.85rem', color: '#999999', textDecoration: 'line-through' }}>
                            ₹{item.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Quantity Selector & Item Subtotal */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            border: '1px solid #dcdcdc',
                            borderRadius: '4px',
                            overflow: 'hidden',
                          }}
                        >
                          <button
                            onClick={() => handleQtyChange(item, item.quantity - 1)}
                            style={{
                              border: 'none',
                              backgroundColor: '#f7f7f7',
                              padding: '4px 12px',
                              cursor: 'pointer',
                              fontWeight: 700,
                              fontSize: '0.9rem',
                            }}
                          >
                            -
                          </button>
                          <span
                            style={{
                              padding: '4px 14px',
                              fontWeight: 600,
                              fontSize: '0.9rem',
                              color: '#222222',
                            }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQtyChange(item, item.quantity + 1)}
                            style={{
                              border: 'none',
                              backgroundColor: '#f7f7f7',
                              padding: '4px 12px',
                              cursor: 'pointer',
                              fontWeight: 700,
                              fontSize: '0.9rem',
                            }}
                          >
                            +
                          </button>
                        </div>

                        <span style={{ fontSize: '0.9rem', color: '#666666' }}>
                          Subtotal: <strong style={{ color: '#222222' }}>₹{item.price * item.quantity}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => removeFromCart(targetKey)}
                      aria-label="Remove item"
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#999999',
                        fontSize: '1.1rem',
                        cursor: 'pointer',
                        padding: '8px',
                        borderRadius: '50%',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#ff3f6c')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#999999')}
                      title="Remove item"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Order Summary Box */}
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e8e8e8',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                position: 'sticky',
                top: '120px',
              }}
            >
              <h2
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#222222',
                  margin: '0 0 20px 0',
                  borderBottom: '1px solid #f0f0f0',
                  paddingBottom: '12px',
                }}
              >
                Order Summary
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', color: '#666666' }}>
                  <span>Items Subtotal ({cartCount})</span>
                  <span style={{ fontWeight: 600, color: '#222222' }}>₹{cartTotal}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', color: '#666666' }}>
                  <span>Delivery Charges</span>
                  <span style={{ fontWeight: 600, color: deliveryFee === 0 ? '#2e7d32' : '#222222' }}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>

                {cartTotal < 499 && (
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#ff6f00', backgroundColor: '#fff8e1', padding: '6px 10px', borderRadius: '4px' }}>
                    💡 Add items worth ₹{499 - cartTotal} more for FREE delivery!
                  </p>
                )}

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#222222',
                    borderTop: '1px solid #f0f0f0',
                    paddingTop: '15px',
                    marginTop: '5px',
                  }}
                >
                  <span>Grand Total</span>
                  <span style={{ color: 'red' }}>₹{grandTotal}</span>
                </div>
              </div>

              <button
                onClick={() => alert('Checkout flow: Order placement initialized!')}
                style={{
                  width: '100%',
                  backgroundColor: 'red',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '14px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(255, 0, 0, 0.3)',
                  transition: 'background-color 0.2s ease',
                  marginBottom: '12px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#cc0000')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'red')}
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate('/products')}
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  color: '#555555',
                  border: '1px solid #dcdcdc',
                  borderRadius: '8px',
                  padding: '10px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#222222';
                  e.currentTarget.style.color = '#222222';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#dcdcdc';
                  e.currentTarget.style.color = '#555555';
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default CartPage;
