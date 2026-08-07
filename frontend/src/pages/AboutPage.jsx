import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import '../styles/about.css';

function AboutPage() {
  return (
    <>
      <Navbar />

      <div className="about-page-wrapper">
        <main>
          <section className="about">
            <h1>About Us</h1>
            <p>
              <strong>New Lines Trading Company (NLTC)</strong> is a trusted manufacturing and trading company
              specializing in premium-quality party decoration products. We supply a wide range of celebration
              essentials to wholesalers, bakeries, event suppliers, and bulk buyers across India.
            </p>
            <p>
              We believe every celebration deserves the best decorations. From birthdays to special occasions,
              our products are designed to add color, creativity, and joy to every event. Our commitment to
              quality, affordability, and customer satisfaction has made us a reliable partner for businesses
              looking for party decoration supplies.
            </p>
          </section>

          <section className="mission">
            <h2>Our Mission</h2>
            <p>
              Our mission is to manufacture and deliver high-quality party decoration products at competitive
              prices while maintaining long-term relationships with wholesalers, bakeries, and business partners.
              We strive to make celebrations more memorable through reliable products and excellent service.
            </p>
          </section>

          <section className="vision">
            <h2>Our Vision</h2>
            <p>
              To become one of India's most trusted manufacturers and suppliers of party decoration products by
              continuously improving product quality, expanding our product range, and providing exceptional
              customer service.
            </p>
          </section>

          <section className="products">
            <h2>Our Products</h2>
            <ul>
              <li>Balloons</li>
              <li>Foil Balloons</li>
              <li>Foil Curtains</li>
              <li>Birthday Decoration Combos</li>
              <li>Birthday Banners</li>
              <li>Party Poppers</li>
              <li>Anaar Candles</li>
              <li>Cake Candles</li>
              <li>Cake Toppers</li>
              <li>Cake Cutting Knives</li>
              <li>Faux Balls</li>
              <li>And many more party decoration accessories.</li>
            </ul>
          </section>

          <section className="why">
            <h2>Why Choose Us?</h2>
            <div className="box">
              <div className="card">
                <h3>Premium Quality</h3>
                <p>Manufactured using quality materials to ensure customer satisfaction.</p>
              </div>

              <div className="card">
                <h3>Wholesale Supply</h3>
                <p>We specialize in bulk orders for wholesalers and bakeries.</p>
              </div>

              <div className="card">
                <h3>Wide Product Range</h3>
                <p>Everything required for party and cake decoration is available under one roof.</p>
              </div>

              <div className="card">
                <h3>Competitive Pricing</h3>
                <p>Affordable prices without compromising on quality.</p>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}

export default AboutPage;
