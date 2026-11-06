'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search, 
  Sparkles, 
  Building2, 
  Award, 
  BookOpen, 
  GraduationCap, 
  Users, 
  HeartHandshake, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Eye, 
  Download, 
  Home, 
  MapPin, 
  Phone,
  Layers,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { 
  GALLERY_ITEMS, 
  GALLERY_CATEGORIES, 
  GalleryItem, 
  GalleryCategory 
} from '@/data/galleryData';

export default function GalleryPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter gallery items based on category and search query
  const filteredItems = useMemo(() => {
    return GALLERY_ITEMS.filter((item) => {
      const matchesCategory = 
        selectedCategory === 'all' || item.category === selectedCategory;
      
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch = 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tag.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: GALLERY_ITEMS.length };
    GALLERY_ITEMS.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Lightbox navigation handlers
  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextLightboxImage = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => 
      prev !== null ? (prev + 1) % filteredItems.length : 0
    );
  }, [activeLightboxIndex, filteredItems.length]);

  const prevLightboxImage = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => 
      prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
    );
  }, [activeLightboxIndex, filteredItems.length]);

  // Handle keyboard events for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') prevLightboxImage(); // RTL: Right arrow is prev
      if (e.key === 'ArrowLeft') nextLightboxImage();  // RTL: Left arrow is next
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, nextLightboxImage, prevLightboxImage]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-urdu" dir="rtl">
        <Header />
        <main className="flex-1 flex items-center justify-center p-12">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-600 font-bold">تصویری گیلری لوڈ ہو رہی ہے...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentLightboxItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles size={16} />;
      case 'Building2': return <Building2 size={16} />;
      case 'Award': return <Award size={16} />;
      case 'BookOpen': return <BookOpen size={16} />;
      case 'GraduationCap': return <GraduationCap size={16} />;
      case 'HeartHandshake': return <HeartHandshake size={16} />;
      case 'Users': return <Users size={16} />;
      default: return <Layers size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-urdu selection:bg-emerald-100 selection:text-emerald-900" dir="rtl">
      <Header />

      <main className="flex-1">
        {/* --- 1. HERO HEADER SECTION --- */}
        <section className="relative bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden border-b-4 border-amber-400">
          {/* Subtle Islamic Motif Background */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-emerald-200/80 mb-6 font-sans">
              <Link href="/" className="hover:text-amber-300 transition-colors inline-flex items-center gap-1 font-urdu">
                <Home size={14} /> ہوم
              </Link>
              <span>/</span>
              <span className="text-amber-300 font-bold font-urdu">تصویری گیلری</span>
            </nav>

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm font-bold mb-4 shadow-sm">
                <Sparkles size={16} className="text-amber-400" />
                <span>جامعہ شیرِ ربانی کی آفیشل دستاویزی تصویری گیلری</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white leading-[2.1] mb-4">
                جامعہ شیرِ ربانی مانانوالہ کی <span className="text-amber-300 underline decoration-amber-400/50 underline-offset-8">تصویری جھلکیاں</span>
              </h1>

              <p className="text-emerald-100/90 text-sm sm:text-lg leading-[2.3] max-w-3xl mb-8">
                جامعہ شیرِ ربانی مانانوالہ کے اکابرین، مشائخِ عظام، ممتاز مفتیان اور معزز ادارتی قیادت کا باوقار و مستند تصویری البم۔
              </p>

              {/* Stat Badges */}
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                <div className="bg-emerald-900/90 border border-emerald-500/30 px-4 py-2 rounded-xl text-emerald-100 flex items-center gap-2 font-bold shadow-sm">
                  <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                  <span>{GALLERY_ITEMS.length} مستند و ہائی ریزولوشن تصاویر</span>
                </div>
                <div className="bg-emerald-900/90 border border-emerald-500/30 px-4 py-2 rounded-xl text-emerald-100 flex items-center gap-2 font-bold shadow-sm">
                  <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                  <span>اکابرین، مشائخ و ادارتی قیادت</span>
                </div>
                <div className="bg-emerald-900/90 border border-emerald-500/30 px-4 py-2 rounded-xl text-emerald-100 flex items-center gap-2 font-bold shadow-sm">
                  <MapPin size={16} className="text-amber-400 shrink-0" />
                  <span>مانانوالہ، ضلع شیخوپورہ، پنجاب</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 2. CONTROLS: CATEGORY TABS & SEARCH BAR --- */}
        <section className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              
              {/* Category Filter Buttons */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-thin">
                {GALLERY_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  const count = categoryCounts[cat.id] || 0;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20 scale-102'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <span className={isSelected ? 'text-amber-300' : 'text-slate-500'}>
                        {renderCategoryIcon(cat.iconName)}
                      </span>
                      <span>{cat.label}</span>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full font-sans font-bold ${
                          isSelected ? 'bg-emerald-800 text-white' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[260px] sm:min-w-[320px]">
                <input
                  type="text"
                  placeholder="تصویر، عنوان یا شعبہ تلاش کریں..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-11 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800 font-urdu leading-[1.8] transition-all"
                />
                <Search size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    title="تلاش صاف کریں"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Current Active Filter Indicator */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500 font-bold">
              <div>
                دکھائی جانے والی تصاویر: <span className="text-emerald-700 font-black font-sans text-sm">{filteredItems.length}</span> از <span className="font-sans">{GALLERY_ITEMS.length}</span>
              </div>
              {searchQuery && (
                <div>
                  تلاش کا نتیجہ برائے: &ldquo;<span className="text-slate-800 font-urdu">{searchQuery}</span>&rdquo;
                </div>
              )}
            </div>
          </div>
        </section>

        {/* --- 3. GALLERY PHOTO GRID --- */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 p-8 shadow-xs">
              <Eye size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-700 mb-2">کوئی تصویر نہیں ملی</h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto mb-6 leading-[2.1]">
                آپ کے مطلوبہ لفظ &ldquo;{searchQuery}&rdquo; سے مطابقت رکھنے والی کوئی تصویر دستیاب نہیں ہے۔ براہِ کرم کوئی دوسرا لفظ تلاش کریں۔
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-sm transition-colors"
              >
                تمام تصاویر دیکھیں
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(index)}
                  className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col cursor-pointer"
                >
                  {/* Photo Container: Exact Ratio & Complete Photo (Zero Cropping) */}
                  <div className="relative aspect-[4/5] w-full bg-slate-950 overflow-hidden flex items-center justify-center">
                    {/* Ambient matching soft background to gracefully fill letterbox edges */}
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      unoptimized
                      className="object-cover blur-xl opacity-35 scale-110 pointer-events-none"
                      aria-hidden
                    />
                    {/* The Crisp, Uncropped Complete Photo in Exact Ratio */}
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain p-2 z-10 group-hover:scale-105 transition-transform duration-500 ease-out drop-shadow-md"
                    />

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-40 group-hover:opacity-75 transition-opacity duration-300 z-10 pointer-events-none" />

                    {/* Top badges */}
                    <div className="absolute top-3 right-3 left-3 flex items-center justify-between pointer-events-none z-10">
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full shadow-md ${item.badgeColor || 'bg-emerald-700 text-white'}`}>
                        {item.tag}
                      </span>
                      {item.year && (
                        <span className="text-[11px] font-sans font-bold px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-white/20">
                          {item.year}
                        </span>
                      )}
                    </div>

                    {/* Center Zoom icon on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 z-10">
                      <div className="w-14 h-14 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-xl border-2 border-white/50 backdrop-blur-xs">
                        <Maximize2 size={24} />
                      </div>
                    </div>

                    {/* Bottom Category label overlay */}
                    <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
                      <span className="text-xs text-white/90 font-bold bg-black/50 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                        {item.categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-800 group-hover:text-emerald-700 transition-colors leading-[2.1] mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-[2.2] line-clamp-3 mb-4">
                        {item.description}
                      </p>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-bold group-hover:text-emerald-800">
                      <span className="inline-flex items-center gap-1.5">
                        <Eye size={15} />
                        <span>بڑی تصویر و تفصیل دیکھیں</span>
                      </span>
                      <span className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-emerald-50 text-slate-600 group-hover:text-emerald-700 flex items-center justify-center transition-colors">
                        <ChevronLeft size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* --- 4. LIGHTBOX MODAL --- */}
        {currentLightboxItem && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
          >
            {/* Top Toolbar */}
            <div className="p-4 sm:p-6 flex items-center justify-between text-white border-b border-white/10 relative z-20">
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm font-sans font-bold bg-emerald-800/80 px-3 py-1 rounded-full border border-emerald-400/30 text-amber-300">
                  تصویر {activeLightboxIndex! + 1} از {filteredItems.length}
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-300 hidden sm:inline">
                  {currentLightboxItem.categoryLabel}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-red-600/80 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
                title="بند کریں (Esc)"
              >
                <span>بند کریں</span>
                <X size={18} />
              </button>
            </div>

            {/* Main Stage: Image and Prev/Next Arrows */}
            <div className="relative flex-1 flex items-center justify-center p-2 sm:p-6 min-h-0">
              {/* Prev Button (RTL: right arrow goes to previous) */}
              <button
                onClick={(e) => { e.stopPropagation(); prevLightboxImage(); }}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-emerald-600 text-white flex items-center justify-center transition-all z-20 backdrop-blur-md cursor-pointer border border-white/20 shadow-xl"
                title="پچھلی تصویر"
              >
                <ChevronRight size={28} />
              </button>

              {/* Central Image Container */}
              <div 
                className="relative w-full h-full max-w-5xl max-h-[70vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={currentLightboxItem.image}
                  alt={currentLightboxItem.title}
                  fill
                  unoptimized
                  priority
                  className="object-contain drop-shadow-2xl rounded-xl"
                />
              </div>

              {/* Next Button (RTL: left arrow goes to next) */}
              <button
                onClick={(e) => { e.stopPropagation(); nextLightboxImage(); }}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-emerald-600 text-white flex items-center justify-center transition-all z-20 backdrop-blur-md cursor-pointer border border-white/20 shadow-xl"
                title="اگلی تصویر"
              >
                <ChevronLeft size={28} />
              </button>
            </div>

            {/* Bottom Caption & Information Panel */}
            <div className="p-4 sm:p-6 bg-slate-950/90 border-t border-white/10 text-white relative z-20">
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[11px] font-bold px-3 py-0.5 rounded-full ${currentLightboxItem.badgeColor || 'bg-emerald-700 text-white'}`}>
                      {currentLightboxItem.tag}
                    </span>
                    <span className="text-xs text-amber-300 font-bold">
                      {currentLightboxItem.categoryLabel}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-2xl font-black text-white leading-[2.1] mb-1">
                    {currentLightboxItem.title}
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm leading-[2.2] max-w-4xl">
                    {currentLightboxItem.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={currentLightboxItem.image}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold transition-all shadow-sm"
                  >
                    <Download size={16} />
                    <span>مکمل سائز ڈاؤن لوڈ</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- 5. CAMPUS VISIT & ADMISSIONS CTA --- */}
        <section className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-t-4 border-amber-400">
          <div className="max-w-5xl mx-auto text-center">
            <Building2 size={40} className="text-amber-400 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-4xl font-black text-white leading-[2.0] mb-4">
              جامعہ شیرِ ربانی مانانوالہ کے کیمپس کا دورہ فرمائیں
            </h2>
            <p className="text-emerald-100/90 text-sm sm:text-base leading-[2.3] max-w-3xl mx-auto mb-8">
              جامعہ شیرِ ربانی میں دینی و عصری علوم کے لیے داخلے جاری ہیں۔ آپ کیمپس تشریف لا کر طلبہ کے ہاسٹل، تدریسی کمروں، کتب خانے اور پرامن تعلیمی ماحول کا خود مشاہدہ کر سکتے ہیں۔
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/admissions"
                className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-black rounded-xl text-sm sm:text-base shadow-lg hover:shadow-xl transition-all"
              >
                آن لائن داخلہ فارم برائے 2024-25
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm sm:text-base shadow-md border border-emerald-500/40 transition-all"
              >
                کیمپس کی لوکیشن و رابطہ
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
