import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/home/Hero';
import AnnouncementPopup from '@/components/home/AnnouncementPopup';

// Dynamic imports for below-the-fold components to improve initial load
const AcademicPrograms = dynamic(() => import('@/components/home/AcademicPrograms'), {
  loading: () => <div className="h-96 animate-pulse bg-slate-50" />
});
const WhyChooseUs = dynamic(() => import('@/components/home/WhyChooseUs'), {
  loading: () => <div className="h-96 animate-pulse bg-slate-50" />
});
const Islam360Resources = dynamic(() => import('@/components/home/Islam360Resources'), {
  loading: () => <div className="h-96 animate-pulse bg-white" />
});
const FacultySpotlight = dynamic(() => import('@/components/home/FacultySpotlight'), {
  loading: () => <div className="h-96 animate-pulse bg-slate-50" />
});
const NewsEvents = dynamic(() => import('@/components/home/NewsEvents'), {
  loading: () => <div className="h-96 animate-pulse bg-slate-50" />
});
const Testimonials = dynamic(() => import('@/components/home/Testimonials'), {
  loading: () => <div className="h-96 animate-pulse bg-slate-50" />
});
const CTA = dynamic(() => import('@/components/home/CTA'), {
  loading: () => <div className="h-48 animate-pulse bg-emerald-800" />
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900">
      <AnnouncementPopup />
      <Header />
      
      <main className="flex-1">
        <Hero />
        <AcademicPrograms />
        <WhyChooseUs />
        <Islam360Resources />
        <FacultySpotlight />
        <NewsEvents />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
