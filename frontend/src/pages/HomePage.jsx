import Navbar from '../components/layout/Navbar';
import HeroCarousel from '../components/home/HeroCarousel';
import OccasionSection from '../components/home/OccasionSection';
import CategorySection from '../components/home/CategorySection';
import BestsellerSection from '../components/home/BestsellerSection';
import FeaturesBar from '../components/home/FeaturesBar';
import Footer from '../components/layout/Footer';

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroCarousel />
      <OccasionSection />
      <CategorySection />
      <BestsellerSection />
      <FeaturesBar />
      <Footer />
    </>
  );
}

export default HomePage;
