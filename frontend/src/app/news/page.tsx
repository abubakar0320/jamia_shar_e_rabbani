'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, ChevronLeft, Share2, Search, CheckCircle2, Bookmark, Tag } from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';

interface NewsItem {
  id: number;
  date: string;
  category?: string;
  title: string;
  desc: string;
  image?: string;
}

const DEFAULT_NEWS: NewsItem[] = [
  {
    id: 1,
    date: '۲۴ اپریل ۲۰۲۵ء',
    category: 'کانفرنسز',
    title: 'سالانہ عظیم الشان دستارِ فضیلت و تقسیمِ اسناد کانفرنس کا روح پرور انعقاد',
    desc: 'جامعہ شیرِ ربانی میں سالانہ دستارِ فضیلت تقریب کا انعقاد کیا گیا جس میں ملک بھر سے جید علماء کرام، مشائخ عظام اور معزز مہمانوں نے شرکت فرمائی۔ اس موقع پر فارغ التحصیل علماء اور حفاظِ کرام میں اسناد اور دستارِ فضیلت تقسیم کی گئیں۔',
    image: '/images/news.jpeg'
  },
  {
    id: 2,
    date: '۱۹ اپریل ۲۰۲۵ء',
    category: 'تعلیمی اعلانات',
    title: 'نئے تعلیمی سال برائے درسِ نظامی، حفظ و تجوید میں داخلوں کا باقاعدہ آغاز',
    desc: 'شعبہ حفظ و ناظرہ قرآن کریم، تجوید و قرات اور درسِ نظامی (عالم و فاضل کورس) میں سال ۲۰۲۵-۲۶ کے داخلے شروع ہو چکے ہیں۔ طلبہ و طالبات کے لیے الگ الگ کیمپسز اور آن لائن رجسٹریشن کی سہولت بھی میسر ہے۔',
    image: '/images/admission.jpeg'
  },
  {
    id: 3,
    date: '۲۶ مارچ ۲۰۲۵ء',
    category: 'سیمینارز و ورکشاپس',
    title: 'عربی تکلم، گرامر اور تفہیمِ قرآن پر تین روزہ خصوصی ورکشاپ',
    desc: 'عصری جامعات اور کالجز کے طلبہ اور اساتذہ کے لیے جدید طریقہ تدریس کے تحت عربی بول چال اور تفہیمِ قرآن پر تربیتی ورکشاپ کا انعقاد ہوا، جس میں عربی زبان میں مہارت کے عملی اسباق دیے گئے۔',
    image: '/images/WhatsApp 1.jpeg'
  },
  {
    id: 4,
    date: '۱۵ فروری ۲۰۲۵ء',
    category: 'کیمپس اپ ڈیٹس',
    title: 'جامعہ کے نئے جدید ہاسٹل بلاک اور ڈیجیٹل لائبریری کا باقاعدہ سنگِ بنیاد',
    desc: 'دور دراز علاقوں سے تشریف لانے والے طلبہ کی رہائشی سہولت کے لیے کشادہ ہاسٹل عمارت اور نادر اسلامی مخطوطات و کتب پر مشتمل ریسرچ لائبریری کے تعمیراتی کام کا آغاز کر دیا گیا ہے۔',
    image: '/images/WhatsApp2.jpeg'
  },
  {
    id: 5,
    date: '۲۱ جنوری ۲۰۲۵ء',
    category: 'کانفرنسز',
    title: 'سیرت النبی ﷺ کانفرنس اور صوبائی سطح پر بین المدارس حسنِ قرات مقابلہ',
    desc: 'طلبہ کی لحن، صوتی اور تجویدی صلاحیتوں کو نکھارنے کے لیے سالانہ مقابلہ حسنِ قرات و نعت خوانی منعقد کی گئی جس میں پنجاب بھر کے ممتاز دینی مدارس کے طلبہ نے شرکت کر کے شاندار اعزازات حاصل کیے۔',
    image: '/images/optimized/tajweed-card.webp'
  },
  {
    id: 6,
    date: '۰۸ دسمبر ۲۰۲۴ء',
    category: 'تعلیمی اعلانات',
    title: 'وفاق المدارس الاسلامیہ الرضویہ پاکستان کے امتحانات میں جامعہ کے طلبہ کی نمایاں پوزیشنز',
    desc: 'وفاق المدارس الاسلامیہ الرضویہ پاکستان کے سالانہ مرکزی امتحانات میں جامعہ شیرِ ربانی کے ہونہار طلبہ و طالبات نے اعلیٰ ترین پوزیشنز اور ممتاز درجات حاصل کر کے جامعہ اور اپنے والدین کا نام فخر سے بلند کیا۔',
    image: '/images/optimized/hifaz-card.webp'
  }
];

const UPCOMING_EVENTS = [
  {
    date: '۱۵',
    month: 'اگست',
    title: 'نئے تعلیمی سال کا آغاز و استقبالیہ نشست برائے نئے طلبہ',
    desc: 'تعلیمی سال ۲۰۲۵-۲۶ کے نووارد طلبہ کے لیے تعارفی نشست، قواعد و ضوابط کی آگاہی، نصابی کتب کی تقسیم اور کیمپس ٹور۔',
    category: 'تعلیمی تقریب'
  },
  {
    date: '۰۲',
    month: 'ستمبر',
    title: 'سالانہ سیرت النبی ﷺ کانفرنس اور فکری سیمینار',
    desc: 'عصرِ حاضر کے چیلنجز اور سیرتِ طیبہ کی روشنی میں حل کے موضوع پر ملکی و بین الاقوامی جید علماء کرام کے خصوصی خطابات۔',
    category: 'سیرت کانفرنس'
  },
  {
    date: '۲۰',
    month: 'اکتوبر',
    title: 'کل پاکستان بین المدارس سالانہ مقابلہ حسنِ قرات و اذان',
    desc: 'قرآنی لحن اور تجوید کے اصولوں پر مبنی سالانہ مقابلہ جس میں معزز بین الاقوامی قراء کرام بطور جج شرکت فرمائیں گے۔',
    category: 'قرآنی مقابلہ'
  }
];

const CATEGORIES = [
  'تمام خبریں',
  'کانفرنسز',
  'تعلیمی اعلانات',
  'سیمینارز و ورکشاپس',
  'کیمپس اپ ڈیٹس'
];

export default function News() {
  const [mounted, setMounted] = useState(false);
  const [news, setNews] = useState<NewsItem[]>(DEFAULT_NEWS);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('تمام خبریں');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setNews(data);
        } else {
          setNews(DEFAULT_NEWS);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching news:', err);
        setNews(DEFAULT_NEWS);
        setLoading(false);
      });
  }, []);

  const filteredNews = useMemo(() => {
    return news.filter(item => {
      const matchesSearch = 
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = 
        selectedCategory === 'تمام خبریں' || 
        item.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [news, searchQuery, selectedCategory]);

  const handleShare = (id: number) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen bg-white" dir="rtl">
        <Header />
        <main className="flex-1" />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white" dir="rtl">
      <Header />
      <main className="flex-1 bg-white text-slate-900 font-urdu">
        
        {/* --- HERO SECTION --- */}
        <section 
          style={{ 
            backgroundImage: "linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.92)), url('/ahmad.webp')", 
            backgroundSize: "cover", 
            backgroundPosition: "center" 
          }} 
          className="relative pt-24 pb-20 bg-white border-b border-slate-100"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-4 py-2 rounded-full text-emerald-800 text-sm font-bold mb-6 shadow-sm">
                <Tag className="w-4 h-4 text-emerald-600" />
                <span>جامعہ شیرِ ربانی کی تازہ ترین خبریں و اعلانات</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-8 leading-[1.8] md:leading-[2.0]">
                خبریں، اعلانات و اہم تقریبات
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-[2.2] md:leading-[2.4]">
                جامعہ شیرِ ربانی کی علمی کامیابیوں، سالانہ اجتماعات، کانووکیشنز، تربیتی سیمینارز اور کمیونٹی سرگرمیوں کی تفاصیل سے باخبر رہیں۔
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- NEWS GRID & FILTER SECTION --- */}
        <section className="py-16 bg-slate-50/50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Search and Category Filter Bar */}
            <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-sm mb-12">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                
                {/* Category Pills */}
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start w-full lg:w-auto">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2.5 rounded-xl text-sm md:text-base font-bold transition-all leading-normal ${
                        selectedCategory === cat
                          ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Search Bar */}
                <div className="relative w-full lg:w-96">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="خبریں یا اعلانات تلاش کریں..." 
                    className="w-full pr-11 pl-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20 rounded-xl outline-none transition-all text-slate-900 placeholder:text-slate-400 text-base font-medium"
                  />
                  <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold bg-slate-200 rounded-full px-2 py-0.5"
                    >
                      صاف کریں
                    </button>
                  )}
                </div>

              </div>
            </div>

            {/* Results Header */}
            <div className="flex justify-between items-center mb-8 pb-3 border-b border-slate-200/80">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-[1.9]">
                {selectedCategory === 'تمام خبریں' ? 'تمام تازہ ترین خبریں' : selectedCategory}
              </h2>
              <span className="text-sm font-bold text-slate-600 bg-white px-3.5 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                کل مقالات: {filteredNews.length}
              </span>
            </div>
            
            {loading ? (
              <div className="text-center py-32">
                <div className="inline-block w-9 h-9 border-4 border-slate-200 border-t-emerald-600 rounded-full animate-spin"></div>
                <div className="mt-4 text-base font-bold text-slate-600">خبریں لوڈ ہو رہی ہیں...</div>
              </div>
            ) : filteredNews.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-2xl border border-slate-200 p-8">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800 mb-2 leading-[2]">کوئی خبر نہیں ملی</h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto mb-6 leading-[2.2]">
                  آپ کی تلاش کے مطابق کوئی خبر دستیاب نہیں ہے۔ براہ کرم مختلف الفاظ سے دوبارہ تلاش کریں۔
                </p>
                <button 
                  onClick={() => { setSearchQuery(''); setSelectedCategory('تمام خبریں'); }}
                  className="px-6 py-2.5 bg-emerald-700 text-white rounded-xl font-bold hover:bg-emerald-800 transition-colors shadow-sm"
                >
                  تمام خبریں دیکھیں
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredNews.map((item, i) => (
                  <motion.div 
                    key={item.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex flex-col bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 group rounded-2xl overflow-hidden"
                  >
                    {/* Card Image */}
                    <div className="aspect-[16/10] relative bg-slate-100 overflow-hidden">
                      <OptimizedImage 
                        src={item.image || '/images/news.jpeg'} 
                        alt={item.title} 
                        fill
                        section="news"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />
                      
                      {item.category && (
                        <span className="absolute top-3.5 right-3.5 bg-emerald-700/95 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm">
                          {item.category}
                        </span>
                      )}
                    </div>
                    
                    {/* Card Body with Generous Line-Height and Spacing */}
                    <div className="p-6 md:p-7 flex flex-col flex-1">
                      
                      {/* Discrete Date Pill - Well Separated with Margin */}
                      <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-100/90 border border-slate-200/90 px-3.5 py-1.5 rounded-lg w-fit mb-5 shadow-xs">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item.date}</span>
                      </div>

                      {/* Title with Spacious Line Height */}
                      <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-5 leading-[2.2] md:leading-[2.3] group-hover:text-emerald-700 transition-colors line-clamp-2">
                        {item.title}
                      </h3>

                      {/* Description with Readable Line Height */}
                      <p className="text-sm md:text-base text-slate-600 mb-6 flex-1 leading-[2.3] line-clamp-3">
                        {item.desc}
                      </p>

                      {/* Card Action Footer */}
                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
                        <Link 
                          href="#" 
                          className="font-black text-sm text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 group/btn"
                        >
                          <span>مکمل خبر پڑھیں</span>
                          <ChevronLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                        </Link>

                        <div className="relative">
                          <button 
                            onClick={() => handleShare(item.id)}
                            title="لنک کاپی کریں"
                            className="p-2 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                          {copiedId === item.id && (
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap">
                              لنک کاپی ہو گیا!
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* --- FEATURED HIGHLIGHT SECTION --- */}
        <section className="py-20 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Media Container */}
              <div className="relative aspect-[16/11] bg-slate-800 border border-emerald-900/50 rounded-3xl overflow-hidden shadow-2xl">
                <OptimizedImage 
                  src="/images/WhatsApp 1.jpeg" 
                  alt="سالانہ کانووکیشن تقریب" 
                  fill
                  section="hero"
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-6 right-6 left-6 text-right">
                  <div className="inline-block bg-gradient-to-r from-amber-500 to-emerald-600 px-4 py-1.5 text-xs font-black uppercase text-white mb-4 rounded-full shadow-lg">
                    خصوصی کوریج و تصویری جھلکیاں
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white leading-[2.1]">
                    سالانہ عظیم الشان کانووکیشن و دستارِ فضیلت کانفرنس
                  </h3>
                </div>
              </div>
              
              {/* Content Description */}
              <div className="text-right">
                <div className="inline-flex items-center gap-2 text-amber-400 text-sm font-bold mb-4 bg-white/5 px-3 py-1.5 rounded-lg border border-amber-400/20">
                  <Bookmark className="w-4 h-4" />
                  <span>تاریخی سنگِ میل</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-[1.9] md:leading-[2.1]">
                  دینی و علمی برتری اور فکری قیادت کا روشن تسلسل
                </h2>

                <p className="text-slate-300 text-base md:text-lg mb-6 leading-[2.3]">
                  جامعہ شیرِ ربانی کی اس سال کی دستارِ فضیلت و تقسیمِ اسناد کانفرنس میں ۵۰۰ سے زائد طلبہ و طالبات نے درسِ نظامی، تخصص فی الفقہ، حفظِ قرآن اور تجوید و قرات کی تکمیل کی۔ اس بابرکت تقریب نے ادارے کی سو سالہ علمی و روحانی روایات کو نئی جلا بخشی۔
                </p>

                <div className="border-r-4 border-amber-500 pr-6 my-6 bg-white/5 py-5 rounded-l-2xl">
                  <p className="text-slate-200 text-lg md:text-xl mb-4 leading-[2.4] font-bold">
                    &ldquo;علمِ دین کا حصول ایک دائمی اور مقدس فریضہ ہے۔ آج آپ محض اسناد لے کر فارغ نہیں ہو رہے بلکہ امتِ مسلمہ کے لیے نورِ ہدایت، خیر خواہی اور اخلاق و کردار کے عملی پیکر بن کر معاشرے میں جا رہے ہیں۔&rdquo;
                  </p>
                  <p className="text-xs md:text-sm font-bold text-amber-400 leading-normal">
                    — صدارتی و اختتامی خطاب، حضرت مہتمم صاحب مدظلہ العالی
                  </p>
                </div>

                <div className="pt-2">
                  <Link 
                    href="#"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/40 transition-all transform hover:-translate-y-0.5 text-base"
                  >
                    <span>مکمل رپورٹ و تصویری گیلری ملاحظہ فرمائیں</span>
                    <ChevronLeft size={18} />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- UPCOMING EVENTS SECTION --- */}
        <section className="py-20 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 text-right">
              <div>
                <span className="text-emerald-700 text-xs md:text-sm font-bold bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-md mb-3 inline-block">
                  تقویم و شیڈول
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 leading-[1.9]">
                  آئندہ اہم تقریبات، مجالس و سیمینارز
                </h2>
                <p className="text-slate-600 text-base md:text-lg leading-[2.2]">
                  جامعہ شیرِ ربانی کے آئندہ علمی اجتماعات، سیمینارز اور تربیتی ورکشاپس کی تاریخیں اپنے پاس محفوظ فرمائیں۔
                </p>
              </div>
              <Link 
                href="#" 
                className="inline-flex items-center gap-1.5 px-6 py-2.5 border border-slate-300 text-slate-700 hover:border-emerald-700 hover:text-emerald-700 font-bold transition-colors bg-white rounded-xl shadow-sm text-sm md:text-base self-start md:self-auto"
              >
                <span>مکمل سالانہ کیلنڈر دیکھیں</span>
                <ChevronLeft size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {UPCOMING_EVENTS.map((event, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-slate-200 shadow-sm p-6 md:p-8 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1.5 rounded-2xl hover:shadow-xl hover:border-emerald-300 group"
                >
                  <div>
                    <div className="flex items-start gap-4 mb-6">
                      <div className="bg-emerald-50 border border-emerald-200 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-sm group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-colors">
                        <span className="text-2xl md:text-3xl font-black leading-none text-emerald-800 group-hover:text-white transition-colors">
                          {event.date}
                        </span>
                        <span className="text-xs md:text-sm font-black text-emerald-600 group-hover:text-emerald-100 transition-colors mt-1">
                          {event.month}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md inline-block mb-2">
                          {event.category}
                        </span>
                        <h3 className="font-black text-slate-900 text-base md:text-lg leading-[2.1] group-hover:text-emerald-700 transition-colors">
                          {event.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm md:text-base leading-[2.3] mb-6">
                      {event.desc}
                    </p>
                  </div>

                  <button className="w-full py-3 bg-slate-50 hover:bg-emerald-700 hover:text-white text-slate-700 font-bold text-sm md:text-base transition-colors rounded-xl border border-slate-200 hover:border-emerald-700 flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>کیلنڈر میں محفوظ کریں</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- NEWSLETTER SECTION --- */}
        <section className="py-20 bg-slate-50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white rounded-3xl shadow-xl overflow-hidden p-8 md:p-14 text-right">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-emerald-700/60 border border-emerald-500/40 px-3.5 py-1.5 rounded-full text-emerald-200 text-xs font-bold mb-5">
                  <Tag className="w-3.5 h-3.5" />
                  <span>جامعہ نیوز لیٹر</span>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-black mb-5 leading-[1.9] md:leading-[2.1]">
                  جامعہ شیرِ ربانی سے مستقل رابطے میں رہیں
                </h2>
                
                <p className="text-emerald-100 mb-8 text-base md:text-lg leading-[2.3]">
                  جامعہ کے ماہانہ نیوز لیٹر میں شامل ہو کر تازہ ترین داخلہ اعلانات، علمی کتب و مضامین، خطباتِ جمعہ اور سالانہ تقریبات کی معلومات براہ راست اپنے ای میل پر حاصل کریں۔
                </p>

                {subscribed ? (
                  <div className="flex items-center gap-2 bg-emerald-700/80 border border-emerald-400 p-4 rounded-2xl text-white font-bold text-base leading-[2]">
                    <CheckCircle2 className="w-6 h-6 text-emerald-200 shrink-0" />
                    <span>جزاکم اللہ خیراً! آپ کا ای میل کامیابی سے درج کر لیا گیا ہے۔ آپ کو جلد تصدیقی پیغام موصول ہوگا۔</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-xl">
                    <input 
                      type="email" 
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="اپنا ای میل پتہ درج فرمائیں..." 
                      className="flex-1 px-5 py-3.5 bg-white text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-amber-400 rounded-xl text-base font-medium shadow-inner"
                    />
                    <button 
                      type="submit"
                      className="bg-amber-400 hover:bg-amber-300 text-slate-900 px-8 py-3.5 font-black transition-colors whitespace-nowrap rounded-xl shadow-md text-base"
                    >
                      سبسکرائب کریں
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
