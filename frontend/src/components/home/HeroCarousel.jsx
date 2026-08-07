import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { carouselSlides } from '../../utils/carouselData';

function HeroCarousel() {
  const navigate = useNavigate();
  const [slides, setSlides] = useState(carouselSlides);
  const [activeIndex, setActiveIndex] = useState(1);
  const [transitionClass, setTransitionClass] = useState('');
  const [timerKey, setTimerKey] = useState(0);

  const timeRunning = 3000;
  const runTimeoutRef = useRef(null);

  const triggerAnimation = (type) => {
    setTransitionClass(type);
    if (runTimeoutRef.current) clearTimeout(runTimeoutRef.current);
    runTimeoutRef.current = setTimeout(() => {
      setTransitionClass('');
    }, timeRunning);
  };

  const handleNext = useCallback(() => {
    setSlides((prev) => {
      const nextArr = [...prev];
      const first = nextArr.shift();
      nextArr.push(first);
      return nextArr;
    });
    setActiveIndex((prev) => (prev + 1) % carouselSlides.length);
    triggerAnimation('next');
    setTimerKey((k) => k + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setSlides((prev) => {
      const nextArr = [...prev];
      const last = nextArr.pop();
      nextArr.unshift(last);
      return nextArr;
    });
    setActiveIndex((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
    triggerAnimation('prev');
    setTimerKey((k) => k + 1);
  }, []);

  const handleGoToSlide = useCallback((targetIdx) => {
    if (targetIdx === activeIndex) return;
    const steps = (targetIdx - activeIndex + carouselSlides.length) % carouselSlides.length;
    setSlides((prev) => {
      const nextArr = [...prev];
      for (let i = 0; i < steps; i++) {
        const first = nextArr.shift();
        nextArr.push(first);
      }
      return nextArr;
    });
    setActiveIndex(targetIdx);
    triggerAnimation('next');
    setTimerKey((k) => k + 1);
  }, [activeIndex]);

  const scrollToBestSellers = (e) => {
    if (e) e.preventDefault();
    const section = document.querySelector('.shop-by-bestseller-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    return () => {
      if (runTimeoutRef.current) clearTimeout(runTimeoutRef.current);
    };
  }, []);

  return (
    <div className={`carousel ${transitionClass}`} id="hero-carousel">
      <div className="list">
        {slides.map((slide, idx) => (
          <div
            key={`${slide.id}-${idx}`}
            className="item"
            style={{ backgroundImage: `url('/${slide.image}')` }}
          >
            <div className="content">
              <div className="title"></div>
              <div className="name"></div>
              <div className="des"></div>
              <div className="btn">
                <button className="btn-bestsellers" onClick={scrollToBestSellers}>
                  Best Sellers
                </button>
                <button className="btn-shopnow" onClick={() => navigate('/products')}>
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        ))}
        <div
          key={timerKey}
          className="timerunning"
          onAnimationEnd={handleNext}
        ></div>
      </div>

      {/* next prev buttons */}
      <div className="arrows">
        <button className="prev" onClick={handlePrev}>&lt;</button>
        <button className="next" onClick={handleNext}>&gt;</button>
      </div>

      {/* Pagination Dots */}
      <div className="carousel-dots">
        {carouselSlides.map((_, idx) => (
          <div
            key={idx}
            className={`dot ${idx === activeIndex ? 'active' : ''}`}
            onClick={() => handleGoToSlide(idx)}
          />
        ))}
      </div>

      {/* Mobile Thumbnails */}
      <div className="carousel-thumbnails-mobile">
        {carouselSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`mobile-thumb-card ${idx === activeIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url('/${slide.image}')` }}
            onClick={() => handleGoToSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;
