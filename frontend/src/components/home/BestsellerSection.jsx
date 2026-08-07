import { Link } from 'react-router-dom';
import { bestsellerCards } from '../../utils/bestsellerData';

function BestsellerSection() {
  return (
    <section className="shop-by-bestseller-section">
      <div className="bestseller-section-header">
        <div className="shop-by-title">
          <span className="line-left"></span>
          <span className="shop-by-text">Shop By</span>
          <span className="line-right"></span>
        </div>
        <h2 className="section-heading">BEST SELLERS</h2>
        <p className="section-subheading">Our most loved products, chosen by you</p>
      </div>

      <div className="bestsellers-grid">
        {bestsellerCards.map((card) => (
          <div key={card.id} className={`bestseller-card ${card.cssClass}`}>
            <div className="card-img-container">
              <img src={`/${card.image}`} alt={card.alt} />
            </div>
            <div className="card-content">
              <div className={`circle-icon ${card.iconClass}`}>
                <i className={card.icon}></i>
              </div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
              <Link to={card.link} className={`shop-now-btn ${card.btnClass}`}>
                Shop Now <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BestsellerSection;
