import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import '../styles/contact.css';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  return (
    <>
      <Navbar />

      <main>
        <section className="contact-page">
          <h1>Contact Us</h1>

          <p className="subtitle">
            We'd love to hear from you. Contact us for wholesale inquiries,
            product information or business partnerships.
          </p>

          <div className="container">
            {/* CONTACT INFO */}
            <div className="info">
              <h2>Get In Touch</h2>

              <div className="item">
                <i className="fa-solid fa-location-dot"></i>
                <p>
                  East Babarpur, Ambedkar Street,
                  Shahdara, Delhi - 110032
                </p>
              </div>

              <div className="item">
                <i className="fa-solid fa-phone"></i>
                <p>+91 9811007773</p>
              </div>

              <div className="item">
                <i className="fa-solid fa-envelope"></i>
                <p>newlinestrading.co.in@gmail.com</p>
              </div>

              <div className="item">
                <i className="fa-solid fa-box"></i>
                <p>Wholesale Orders Only</p>
              </div>
            </div>

            {/* CONTACT FORM */}
            <div className="form-box">
              <h2>Send an Inquiry</h2>

              {submitted ? (
                <div style={{ padding: '20px', background: '#e6fffa', color: '#047857', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>
                  Thank you! Your inquiry has been sent successfully. We will get back to you soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />

                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />

                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />

                  <textarea
                    rows="6"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>

                  <button type="submit">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default ContactPage;
