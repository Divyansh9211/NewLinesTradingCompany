import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import '../styles/service.css';

function ServicesPage() {
  return (
    <>
      <Navbar />

      <main>
        <img className="image" src="/servicesnew.png" alt="Our Services Banner" />

        <section className="services">
          <h3>WHAT WE OFFER</h3>

          <h1>
            <span className="blue-text">OUR</span>{' '}
            <span className="red-text">SERVICES</span>
          </h1>

          <div className="title-divider">
            <div className="divider-line"></div>
            <div className="divider-dot"></div>
            <div className="divider-line"></div>
          </div>

          <p className="subtitle">
            At NLTC, we deliver end-to-end solutions for high-quality
            celebration and decoration products with commitment to excellence.
          </p>

          <div className="services-grid">
            {/* Card 1 */}
            <div className="service-card">
              <div className="service-icon red">
                <i className="fa-solid fa-box-open"></i>
              </div>
              <h2>PRODUCT SUPPLY</h2>
              <div className="card-line red-line"></div>
              <p>
                We supply a wide range of premium celebration and decoration products.
              </p>
              <div className="card-dots red-dots"></div>
            </div>

            {/* Card 2 */}
            <div className="service-card">
              <div className="service-icon gold">
                <i className="fa-solid fa-award"></i>
              </div>
              <h2>QUALITY ASSURANCE</h2>
              <div className="card-line gold-line"></div>
              <p>
                Ensuring premium quality in every product we offer.
              </p>
              <div className="card-dots gold-dots"></div>
            </div>

            {/* Card 3 */}
            <div className="service-card">
              <div className="service-icon blue">
                <i className="fa-solid fa-truck-fast"></i>
              </div>
              <h2>TIMELY DELIVERY</h2>
              <div className="card-line blue-line"></div>
              <p>
                We ensure safe and reliable shipping services.
              </p>
              <div className="card-dots blue-dots"></div>
            </div>

            {/* Card 4 */}
            <div className="service-card">
              <div className="service-icon red">
                <i className="fa-solid fa-warehouse"></i>
              </div>
              <h2>LARGE INVENTORY</h2>
              <div className="card-line red-line"></div>
              <p>
                We maintain inventory to fulfill bulk requirements.
              </p>
              <div className="card-dots red-dots"></div>
            </div>

            {/* Card 5 */}
            <div className="service-card">
              <div className="service-icon gold">
                <i className="fa-solid fa-headset"></i>
              </div>
              <h2>CUSTOMER SUPPORT</h2>
              <div className="card-line gold-line"></div>
              <p>
                Our support team is always ready to assist you.
              </p>
              <div className="card-dots gold-dots"></div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default ServicesPage;
