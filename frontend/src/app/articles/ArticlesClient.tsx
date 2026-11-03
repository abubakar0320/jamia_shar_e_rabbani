'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  BookOpen, 
  Clock, 
  Sparkles, 
  ArrowLeft, 
  Filter, 
  Bookmark, 
  CheckCircle2, 
  Layers, 
  X,
  FileText,
  User
} from 'lucide-react';
import { 
  ARTICLES, 
  ARTICLE_CATEGORIES, 
  Article, 
  ArticleCategory, 
  getFeaturedArticles,
  OFFICIAL_AUTHOR
} from '@/data/articles';

export default function ArticlesClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const featuredArticles = useMemo(() => getFeaturedArticles(), []);

  // Filter articles based on search query and category
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory = 
        selectedCategory === 'all' || article.categoryId === selectedCategory;
      
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch = 
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.categoryTitle.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const activeCategoryObj = useMemo(() => {
    if (selectedCategory === 'all') return null;
    return ARTICLE_CATEGORIES.find((cat) => cat.id === selectedCategory) || null;
  }, [selectedCategory]);

  const prominentArticle = featuredArticles[0];
  const supportingArticles = featuredArticles.slice(1, 3);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-urdu" dir="rtl">
      
      {/* 1. HERO SECTION: Islamic Inspired, Elegant Light Palette */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-400">
        {/* Subtle Geometric Background Overlay */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#fbbf24 1px, transparent 1px), radial-gradient(#ffffff 1px, #064e3b 1px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px'
          }}
        />
        
        {/* Decorative Top Arch Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-24 bg-gradient-to-b from-emerald-700/40 to-transparent blur-2xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-600/60 text-amber-300 text-sm font-bold shadow-inner mb-6">
            <Sparkles size={16} className="text-amber-400" />
            <span>جامعہ شیرِ ربانی کا علمی و تحقیقی اشاعتی مرکز</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-normal leading-[1.8] sm:leading-[1.9] md:leading-[2.0] mb-6 drop-shadow-md">
            علمی و تحقیقی مضامین
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto font-normal leading-[2.1] mb-8">
            قرآن و سنت کی روشنی میں علم، تحقیق، اصلاح اور رہنمائی کا ایک علمی پلیٹ فارم۔
          </p>

          {/* Key Stats Counter */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 border-t border-emerald-700/60 max-w-2xl mx-auto text-emerald-100 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-amber-300" />
              <span>۲۰ مستند علمی موضوعات</span>
            </div>
            <div className="hidden sm:block text-emerald-500">•</div>
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-amber-300" />
              <span>۸ بنیادی علمی شعبہ جات</span>
            </div>
            <div className="hidden sm:block text-emerald-500">•</div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-amber-300" />
              <span>اہلسنت و الجماعت کا معتدل منہج</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTER SECTION */}
      <section className="relative -mt-8 max-w-5xl mx-auto px-4 sm:px-6 z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-4 sm:p-6 backdrop-blur-sm">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="اپنا مطلوبہ مضمون تلاش کریں۔۔۔"
              className="w-full pl-12 pr-12 py-3.5 sm:py-4 rounded-xl border-2 border-emerald-100 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/15 outline-none text-base sm:text-lg text-slate-800 placeholder-slate-400 transition-all font-urdu leading-normal shadow-xs"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-700 pointer-events-none">
              <Search size={22} />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
                title="تلاش صاف کریں"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-3 text-slate-600 text-sm font-bold">
              <Filter size={16} className="text-emerald-700" />
              <span>مضامین کی کیٹیگری منتخب کریں:</span>
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]">
              {/* All Category Pill */}
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                  selectedCategory === 'all'
                    ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20 scale-[1.02]'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>تمام مضامین</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  selectedCategory === 'all' ? 'bg-emerald-950 text-amber-300' : 'bg-slate-200 text-slate-600'
                }`}>
                  {ARTICLES.length}
                </span>
              </button>

              {/* Individual Category Pills */}
              {ARTICLE_CATEGORIES.map((cat) => {
                const count = ARTICLES.filter((a) => a.categoryId === cat.id).length;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                      isSelected
                        ? 'bg-emerald-800 text-white shadow-md shadow-emerald-900/20 scale-[1.02]'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{cat.title}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      isSelected ? 'bg-emerald-950 text-amber-300' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Category Information Banner */}
            {activeCategoryObj && (
              <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3 text-sm">
                <Bookmark size={20} className="text-emerald-700 shrink-0 mt-0.5" />
                <div className="leading-[2.0]">
                  <strong className="font-bold text-emerald-950">{activeCategoryObj.title}: </strong>
                  <span>{activeCategoryObj.description}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. FEATURED ARTICLES SECTION: Visible on initial landing */}
      {selectedCategory === 'all' && !searchQuery && prominentArticle && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b-2 border-emerald-100 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-bold mb-2">
                <Sparkles size={14} className="text-amber-600" />
                <span>خصوصی علمی و فکری تحریریں</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-[2.0]">
                منتخب مضامین
              </h2>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-[2.0] mt-2 md:mt-0">
              اہل علم اور متلاشیانِ حق کے لیے بنیادی اور فکر انگیز دینی موضوعات
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Prominent Lead Article (Left on RTL, 7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-100">
                <Image
                  src={prominentArticle.image}
                  alt={prominentArticle.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <span className="px-3.5 py-1 rounded-full bg-emerald-800 text-white text-xs font-bold shadow-md">
                    {prominentArticle.categoryTitle}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-900 text-xs font-black shadow-md">
                    نمایاں مضمون
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 left-4 text-white">
                  <div className="flex items-center gap-3 text-xs text-amber-200 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      مطالعہ: {prominentArticle.readTime}
                    </span>
                    <span>•</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-200">
                      {prominentArticle.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between bg-white">
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 leading-[2.0] sm:leading-[2.1] mb-3 group-hover:text-emerald-800 transition-colors">
                    {prominentArticle.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-[2.2] mb-6">
                    {prominentArticle.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <User size={14} className="text-emerald-700" />
                    <span>{`مصنف: ${prominentArticle.author || OFFICIAL_AUTHOR.name}`}</span>
                  </div>
                  <Link
                    href={`/articles/${prominentArticle.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all group-hover:bg-emerald-700"
                  >
                    <span>مضمون پڑھیں</span>
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Two Supporting Featured Articles (Right on RTL, 5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
              {supportingArticles.map((article) => (
                <div 
                  key={article.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-200/80 hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row lg:flex-col group"
                >
                  <div className="relative h-44 sm:h-auto sm:w-2/5 lg:w-full lg:h-44 shrink-0 overflow-hidden bg-slate-100">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 rounded-full bg-emerald-800/90 backdrop-blur-xs text-white text-xs font-bold">
                        {article.categoryTitle}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                        <Clock size={13} className="text-emerald-700" />
                        <span>مطالعہ: {article.readTime}</span>
                        <span>•</span>
                        <span className="text-amber-800 font-bold">{article.status}</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-black text-slate-900 leading-[1.9] mb-2 group-hover:text-emerald-800 transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-slate-600 text-xs sm:text-sm leading-[2.1] line-clamp-2 mb-4">
                        {article.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600">
                        <User size={12} className="text-emerald-700" />
                        <span>{article.author || OFFICIAL_AUTHOR.name}</span>
                      </div>
                      <Link
                        href={`/articles/${article.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
                      >
                        <span>مضمون پڑھیں</span>
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. CATEGORIES SHOWCASE: 8 Categories Overview (Visible when no search query and all articles selected) */}
      {selectedCategory === 'all' && !searchQuery && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-emerald-800 text-xs font-bold tracking-wider px-3 py-1 rounded-full bg-emerald-100 mb-2 inline-block">
              علمی تقسیم و زمرہ جات
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-[2.0]">
              علمی و فکری زمرہ جات
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-[2.0] mt-1">
              مختلف موضوعات پر جامعہ شیرِ ربانی کے مستند تحقیقی مقالات و مضامین
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ARTICLE_CATEGORIES.map((cat) => {
              const catArticles = ARTICLES.filter((a) => a.categoryId === cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all text-right group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${cat.badgeColor}`}>
                        {cat.title}
                      </span>
                      <span className="text-xs text-slate-400 group-hover:text-emerald-700 font-bold transition-colors">
                        {catArticles.length} مضامین
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-slate-800 group-hover:text-emerald-800 transition-colors mb-2 leading-[1.8]">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-[2.1] line-clamp-3">
                      {cat.description}
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-800 font-bold">
                    <span>مضامین دیکھیں</span>
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* 5. MAIN ARTICLES LISTING GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.9]">
              {selectedCategory === 'all' 
                ? (searchQuery ? `تلاش کے نتائج: "${searchQuery}"` : 'تمام مضامین کی فہرست')
                : `${activeCategoryObj?.title || 'کیٹیگری'} کے مضامین`
              }
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              کل {filteredArticles.length} مضامین دستیاب ہیں
            </p>
          </div>

          {(selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={resetFilters}
              className="mt-3 sm:mt-0 text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 self-start sm:self-auto bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200"
            >
              <span>تمام مضامین دیکھیں (فلٹر صاف کریں)</span>
              <X size={14} />
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 sm:p-16 text-center max-w-2xl mx-auto border border-slate-200 shadow-sm my-8">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center mb-4">
              <FileText size={32} />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-2 leading-[2.0]">
              معذرت! آپ کی تلاش کے مطابق کوئی مضمون نہیں ملا
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-[2.2] mb-6">
              برائے مہربانی دیگر الفاظ کا انتخاب کریں یا تمام مضامین کی فہرست دیکھنے کے لیے فلٹر صاف فرمائیں۔
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-sm shadow hover:bg-emerald-900 transition-all"
            >
              <span>تمام مضامین دیکھیں</span>
              <ArrowLeft size={16} />
            </button>
          </div>
        ) : (
          /* Grid of 20 Articles */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 transition-all duration-300 flex flex-col group"
              >
                {/* Featured Image */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3.5 right-3.5">
                    <span className="px-3 py-1 rounded-full bg-emerald-800/90 text-white text-xs font-bold shadow-md backdrop-blur-xs">
                      {article.categoryTitle}
                    </span>
                  </div>

                  {/* Status Pill */}
                  <div className="absolute bottom-3 right-3.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-900 text-[11px] font-black shadow-xs">
                      {article.status}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Read Time Info */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2.5">
                      <Clock size={13} className="text-emerald-700" />
                      <span>مطالعہ کا دورانیہ: {article.readTime}</span>
                    </div>

                    {/* Article Title */}
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-[2.0] mb-3 group-hover:text-emerald-800 transition-colors">
                      <Link href={`/articles/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    {/* Article Description */}
                    <p className="text-slate-600 text-xs sm:text-sm leading-[2.2] mb-5 line-clamp-3">
                      {article.description}
                    </p>
                  </div>

                  {/* Read Article CTA Button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-700 font-bold">
                      <User size={13} className="text-emerald-700 shrink-0" />
                      <span>{article.author || OFFICIAL_AUTHOR.name}</span>
                    </div>
                    <Link
                      href={`/articles/${article.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-800 text-emerald-800 hover:text-white text-xs sm:text-sm font-bold transition-all duration-200 group-hover:bg-emerald-800 group-hover:text-white shadow-2xs"
                    >
                      <span>مضمون پڑھیں</span>
                      <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 6. RESEARCH & QUALITY PLEDGE FOOTER BANNER */}
      <section className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-white py-12 px-4 sm:px-6 lg:px-8 mt-12 border-t-2 border-amber-400">
        <div className="max-w-4xl mx-auto text-center">
          <BookOpen size={36} className="text-amber-400 mx-auto mb-3" />
          <h3 className="text-2xl sm:text-3xl font-black text-white leading-[2.0] mb-3">
            جامعہ شیرِ ربانی کا علمی منہج اور معیار
          </h3>
          <p className="text-emerald-100 text-sm sm:text-base leading-[2.2] mb-6">
            تمام علمی و تحقیقی مضامین قرآن مجید، احادیثِ صحیحہ اور ائمہ سلف کے معتبر مراجع کی روشنی میں تیار کیے جاتے ہیں۔ ہماری کوشش ہے کہ امتِ مسلمہ اور بالخصوص نوجوان نسل تک خالص دینی علوم جدید اسلوب میں پہنچائے جائیں۔
          </p>
          <div className="inline-flex items-center gap-2 text-xs text-amber-300 bg-emerald-950/60 px-4 py-2 rounded-full border border-emerald-700/60 font-bold">
            <span>تحقیق و تدوین: شعبہ تصنیف و تالیف جامعہ شیرِ ربانی مانانوالہ</span>
          </div>
        </div>
      </section>

    </div>
  );
}
