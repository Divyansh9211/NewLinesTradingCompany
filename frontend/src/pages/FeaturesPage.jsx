import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import '../styles/features.css';

function FeaturesPage() {
  const navigate = useNavigate();

  const productBoxItems = [
    { name: 'Party Poppers', img: '/poppers.png', class: 'popper', url: '/bestseller/party-poppers' },
    { name: 'Birthday Caps', img: '/caps.png', url: '/bestseller/birthday-caps' },
    { name: 'Cake Candles', img: '/candles.png', url: '/products?category=candles' },
    { name: 'Sashes', img: '/sashes.png', url: '/products?category=sashes' },
    { name: 'Balloons', img: '/balloons.png', url: '/products?category=balloons' },
    { name: 'Paper Decoration', img: '/paperdecoration.png', url: '/products?category=banners' },
    { name: 'Many More', img: '/manymore.png', url: '/bestseller/many-more' }
  ];

  return (
    <>
      <Navbar />

      <div className="features-page-wrapper">
        <main>
          <img className="banner" src="/featuresbanner.png" alt="Features Banner" />

          <section className="hero">
            <h1>Why Choose NLTC?</h1>
            <p>
              We are committed to providing premium-quality party decoration products
              with reliable wholesale service for businesses across India.
            </p>
          </section>

          <section className="features">
            <div className="card">
              <h2>🏭 Manufacturing & Trading</h2>
              <p>We manufacture and trade a wide variety of party decoration products.</p>
            </div>

            <div className="card">
              <h2>📦 Bulk Orders</h2>
              <p>Specialized in wholesale supply for wholesalers, bakeries and retailers.</p>
            </div>

            <div className="card">
              <h2>🎗️ Wide Product Range</h2>
              <p>Balloons, foil curtains, birthday banners, candles, toppers, poppers and much more.</p>
            </div>

            <div className="card">
              <h2>⭐ Premium Quality</h2>
              <p>Every product is manufactured using quality materials for long-lasting performance.</p>
            </div>

            <div className="card">
              <h2>💰 Competitive Pricing</h2>
              <p>Affordable wholesale pricing without compromising product quality.</p>
            </div>

            <div className="card">
              <h2>🚚 Reliable Supply</h2>
              <p>Fast processing and dependable delivery for business customers.</p>
            </div>
          </section>

          {/* Popular Products */}
          <section className="popular-products">
            <div className="heading">
              <span></span>
              <h2>OUR POPULAR PRODUCTS</h2>
              <span></span>
            </div>

            <div className="products">
              {productBoxItems.map((item, idx) => (
                <div
                  key={idx}
                  className="product-box"
                  onClick={() => navigate(item.url)}
                >
                  <img
                    className={item.class || ''}
                    src={item.img}
                    alt={item.name}
                  />
                  <h3>{item.name}</h3>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}

export default FeaturesPage;
