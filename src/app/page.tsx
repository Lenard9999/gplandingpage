import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Destinations from '@/components/Destinations';
import TourPackages from '@/components/TourPackages';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export const revalidate = 60;

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Destinations />
      <TourPackages />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
