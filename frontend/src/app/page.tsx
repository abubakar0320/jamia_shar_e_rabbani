import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/home/Hero';
import DeferredPopup from '@/components/home/DeferredPopup';
import AcademicPrograms from '@/components/home/AcademicPrograms';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import FacultySpotlight from '@/components/home/FacultySpotlight';
import NewsEvents from '@/components/home/NewsEvents';
import Testimonials from '@/components/home/Testimonials';
import CTA from '@/components/home/CTA';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900" dir="rtl">
      <DeferredPopup />
      <Header />

      <main className="flex-1">
        <Hero />
        <AcademicPrograms />
        <WhyChooseUs />
        <FacultySpotlight />
        <NewsEvents />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
