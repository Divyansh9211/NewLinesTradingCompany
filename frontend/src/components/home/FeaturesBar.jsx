function FeaturesBar() {
  return (
    <section className="features-bar-section">
      <div className="feature-item">
        <div className="feature-icon icon-badge">
          <i className="fa-solid fa-award"></i>
        </div>
        <div className="feature-text">
          <h4>PREMIUM QUALITY</h4>
          <p>Carefully selected products to make every celebration extra special.</p>
        </div>
      </div>

      <div className="feature-item">
        <div className="feature-icon icon-truck">
          <i className="fa-solid fa-truck-fast"></i>
        </div>
        <div className="feature-text">
          <h4>FAST DELIVERY</h4>
          <p>Timely delivery to make your events hassle-free and stress-free.</p>
        </div>
      </div>

      <div className="feature-item">
        <div className="feature-icon icon-shield">
          <i className="fa-solid fa-shield-halved"></i>
        </div>
        <div className="feature-text">
          <h4>SECURE PAYMENT</h4>
          <p>100% secure payment options for your peace of mind.</p>
        </div>
      </div>

      <div className="feature-item">
        <div className="feature-icon icon-headset">
          <i className="fa-solid fa-headset"></i>
        </div>
        <div className="feature-text">
          <h4>CUSTOMER SUPPORT</h4>
          <p>We're here to help you at every step of your celebration.</p>
        </div>
      </div>
    </section>
  );
}

export default FeaturesBar;
