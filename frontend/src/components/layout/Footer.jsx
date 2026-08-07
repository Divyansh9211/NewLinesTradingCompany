import { Link } from 'react-router-dom';

/**
 * Footer component — 1:1 pixel-perfect replica of the original HTML footer design.
 * Preserves the exact original HTML markup structure and CSS classes from style.css.
 */
function Footer() {
  return (
    <section>
      <footer>
        <div className="row">
          {/* Column 1: Brand Logo & Description */}
          <div className="col">
            <img src="/NLTClogo.png" className="footerlogo" alt="NLTC Logo" />
            <p>
              Bringing celebrations to life with premium party decoration products. We offer quality balloons,
              candles, banners, party accessories, and more to make every occasion memorable.
            </p>
          </div>

          {/* Column 2: Office Address & Contact Info */}
          <div className="col">
            <h3>Office <div className="underline"><span></span></div></h3>
            <p>East Babarpur</p>
            <p>Ambedkar Street, Shahdara</p>
            <p>Delhi, PIN 110032, India</p>
            <a href="mailto:newlinestrading.co.in@gmail.com" className="email-id contact">
              newlinestrading.co.in@gmail.com
            </a>
            <h4 className="contact">+91 8595371243</h4>
          </div>

          {/* Column 3: Quick Navigation Links */}
          <div className="col">
            <h3>Links <div className="underline"><span></span></div></h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/contact">Contacts</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Social Icons */}
          <div className="col">
            <h3>Newsletter <div className="underline"><span></span></div></h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <i className="fa-regular fa-envelope"></i>
              <input type="email" placeholder="Enter Your Email-id..." required />
              <button type="submit"><i className="fa-solid fa-arrow-right"></i></button>
            </form>

            <div className="social-icons">
              <a href="https://www.facebook.com/profile.php?id=100079013771029" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="https://whatsapp.com/channel/0029Vb86e1g4o7qTkxfPVj41" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <a href="https://www.instagram.com/lionapdj/" target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <i className="fa-brands fa-youtube"></i>
            </div>
          </div>
        </div>

        <hr />

        {/* Copyright Section */}
        <p className="copyright">
          &copy; 2026 New Lines Trading Company. All Rights Reserved.
        </p>
      </footer>
    </section>
  );
}

export default Footer;
