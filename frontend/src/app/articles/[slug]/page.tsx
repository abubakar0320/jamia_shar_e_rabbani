import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  Clock, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Bookmark, 
  Building2, 
  FileText,
  CheckCircle2,
  Scroll,
  Quote,
  ShieldCheck,
  Check,
  Library,
  User
} from 'lucide-react';
import { 
  ARTICLES, 
  getArticleBySlug, 
  getRelatedArticles,
  OFFICIAL_AUTHOR
} from '@/data/articles';
import { getCompleteArticleContent } from '@/data/articleContentsBatch1';
import ArticleAuthorCard from '@/components/articles/ArticleAuthorCard';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const paramsList: { slug: string }[] = [];
  ARTICLES.forEach((article) => {
    paramsList.push({ slug: article.slug });
    if (article.aliases) {
      article.aliases.forEach((alias) => {
        paramsList.push({ slug: alias });
      });
    }
  });
  return paramsList;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'مضمون نہیں ملا | جامعہ شیرِ ربانی',
      description: 'مطلوبہ علمی مضمون دستیاب نہیں ہے۔',
    };
  }

  const fullContent = getCompleteArticleContent(slug);
  const title = fullContent?.seoTitle || `${article.title} | جامعہ شیرِ ربانی`;
  const description = fullContent?.seoDescription || article.description;
  const keywords = fullContent?.keywords || article.keywords || [
    'علمی مضامین',
    'جامعہ شیر ربانی',
    article.categoryTitle,
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: fullContent?.canonicalUrl || `https://jamiashererabbani.com/articles/${article.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'ur_PK',
      url: fullContent?.canonicalUrl || `https://jamiashererabbani.com/articles/${article.slug}`,
      siteName: 'جامعہ شیرِ ربانی مانانوالہ',
      images: [
        {
          url: article.image,
          alt: fullContent?.imageAlt || article.imageAlt || article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [article.image],
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const fullContent = getCompleteArticleContent(slug);
  const relatedArticles = getRelatedArticles(article.slug, article.categoryId, 3);

  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullContent?.canonicalUrl || `https://jamiashererabbani.com/articles/${article.slug}`,
    },
    headline: article.title,
    description: article.description,
    image: `https://jamiashererabbani.com${article.image}`,
    author: {
      '@type': 'Person',
      name: OFFICIAL_AUTHOR.name,
      jobTitle: OFFICIAL_AUTHOR.designation,
      worksFor: {
        '@type': 'Organization',
        name: 'جامعہ شیرِ ربانی',
        url: 'https://jamiashererabbani.com',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'جامعہ شیرِ ربانی',
      logo: {
        '@type': 'ImageObject',
        url: 'https://jamiashererabbani.com/logo.jpeg',
      },
    },
    inLanguage: 'ur-PK',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ہوم',
        item: 'https://jamiashererabbani.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'علمی مضامین',
        item: 'https://jamiashererabbani.com/articles',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.categoryTitle,
        item: `https://jamiashererabbani.com/articles`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: article.title,
        item: `https://jamiashererabbani.com/articles/${article.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-urdu selection:bg-emerald-500/20" dir="rtl">
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* 1. TOP BREADCRUMB & BACK NAVIGATION */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          
          {/* Breadcrumb List */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-bold overflow-x-auto scrollbar-none">
            <Link href="/" className="hover:text-emerald-700 transition-colors whitespace-nowrap">
              ہوم
            </Link>
            <span className="text-slate-300">/</span>
            <Link href="/articles" className="hover:text-emerald-700 transition-colors whitespace-nowrap">
              علمی مضامین
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600 whitespace-nowrap">{article.categoryTitle}</span>
            <span className="text-slate-300">/</span>
            <span className="text-emerald-800 truncate max-w-[200px] sm:max-w-xs">{article.title}</span>
          </nav>

          {/* Back to all articles button */}
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-1.5 rounded-lg border border-emerald-200 transition-all shrink-0"
          >
            <ArrowRight size={16} />
            <span>تمام مضامین پر واپس جائیں</span>
          </Link>
        </div>
      </div>

      {/* 2. ARTICLE HEADER SECTION */}
      <header className="bg-white border-b border-slate-200 pt-8 pb-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Category & Status Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="px-3.5 py-1 rounded-full bg-emerald-800 text-white text-xs font-bold shadow-xs">
              {article.categoryTitle}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-black shadow-xs ${
              fullContent 
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                : 'bg-amber-400 text-slate-900'
            }`}>
              {fullContent ? fullContent.scholarlyStatus : article.status}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
              <Clock size={13} className="text-emerald-700" />
              <span>مطالعہ: {fullContent ? fullContent.readingTime : article.readTime}</span>
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-[1.8] sm:leading-[1.9] md:leading-[2.0] mb-6">
            {article.title}
          </h1>

          {/* Author Profile Information Box */}
          <ArticleAuthorCard className="mb-6" />

          {/* Publishing & Academic Attribution Metadata */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600 font-bold">
            <div className="flex items-center gap-2">
              <User size={16} className="text-emerald-700" />
              <span>{`مصنف: ${OFFICIAL_AUTHOR.name}`}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Building2 size={16} className="text-emerald-700" />
              <span>جامعہ شیرِ ربانی مانانوالہ</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-emerald-700" />
              <span>شعبہ تصنیف و تحقیق</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-amber-500" />
              <span>مستند علمی و فکری سلسلہ</span>
            </div>
          </div>
        </div>
      </header>

      {/* 3. MAIN CONTENT CONTAINER */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        
        {/* Featured Image */}
        <div className="relative h-72 sm:h-96 md:h-[420px] w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 mb-10 bg-slate-100">
          <Image
            src={article.image}
            alt={fullContent?.imageAlt || article.imageAlt || article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
          <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-xs text-white px-3.5 py-1.5 rounded-lg text-xs font-bold">
            {article.categoryTitle} • جامعہ شیرِ ربانی
          </div>
        </div>

        {/* Short Executive Summary Callout */}
        <div className="bg-emerald-50/80 border-r-4 border-emerald-700 rounded-2xl p-6 mb-12 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-950 font-bold text-base mb-2">
            <Bookmark size={20} className="text-emerald-700" />
            <span>خلاصۂ مضمون و موضوعِ بحث:</span>
          </div>
          <p className="text-slate-800 text-base sm:text-lg leading-[2.3]">
            {article.description}
          </p>
        </div>

        {/* ========================================================= */}
        {/* CASE A: FULL SCHOLARLY ARTICLE CONTENT (Articles 01–05)   */}
        {/* ========================================================= */}
        {fullContent ? (
          <article className="space-y-12">
            
            {/* 1. تمہید (Introduction) */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2.5 pb-3 border-b border-emerald-100 mb-5">
                <Scroll size={22} className="text-emerald-700" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-[2.0]">
                  تمہید و پس منظر
                </h2>
              </div>
              <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-[2.4]">
                {fullContent.tamheed.map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </div>
            </section>

            {/* 2. بنیادی تعارف (Fundamental Context) */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2.5 pb-3 border-b border-emerald-100 mb-5">
                <BookOpen size={22} className="text-emerald-700" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-[2.0]">
                  بنیادی تعارف و مفہوم
                </h2>
              </div>
              <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-[2.4]">
                {fullContent.bunyadiTaaruf.map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </div>
            </section>

            {/* 3. تفصیلی وضاحت (Detailed Subsections) */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-8">
              <div className="flex items-center gap-2.5 pb-3 border-b border-emerald-100 mb-2">
                <FileText size={22} className="text-emerald-700" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-[2.0]">
                  تفصیلی علمی و فکری مباحث
                </h2>
              </div>

              {fullContent.tafseeliWazahat.map((sub, index) => (
                <div key={index} className="pt-2">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-6 rounded-full bg-emerald-700 inline-block" />
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-[2.0]">
                      {sub.subheading}
                    </h3>
                  </div>
                  <div className="space-y-3.5 text-slate-700 text-base sm:text-lg leading-[2.4] pr-4">
                    {sub.content.map((p, pIndex) => (
                      <p key={pIndex}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* 4. قرآنی رہنمائی (Quranic Guidance) */}
            <section className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-8 border-2 border-emerald-700 shadow-md">
              <div className="flex items-center gap-2.5 pb-4 border-b border-emerald-800 mb-6">
                <BookOpen size={24} className="text-amber-400" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white leading-[1.9]">
                    قرآنی رہنمائی و تفسیری نکات
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-200 leading-[1.8]">
                    {fullContent.quranicGuidance.intro}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {fullContent.quranicGuidance.verses.map((v, index) => (
                  <div 
                    key={index} 
                    className="bg-emerald-900/70 border border-emerald-700/80 rounded-xl p-5 sm:p-6 shadow-inner"
                  >
                    {/* Surah & Ayat Badge */}
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-emerald-800">
                      <span className="px-3 py-1 rounded-md bg-emerald-950 text-amber-300 text-xs font-bold border border-emerald-600/60">
                        {v.surah} • آیت نمبر: {v.ayat}
                      </span>
                      <span className="text-xs text-emerald-300 font-bold">قرآن مجید</span>
                    </div>

                    {/* Original Arabic Text */}
                    <div className="my-4 text-center py-3 bg-emerald-950/60 rounded-lg px-4 border border-emerald-800/80">
                      <p className="text-xl sm:text-2xl md:text-3xl text-amber-200 font-bold leading-[2.3] tracking-wide">
                        ﴿ {v.arabic} ﴾
                      </p>
                    </div>

                    {/* Urdu Translation */}
                    <div className="mt-4 p-4 rounded-lg bg-emerald-950/90 border-r-4 border-amber-400 text-white text-base sm:text-lg leading-[2.3]">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1">
                        <Quote size={14} />
                        <span>ترجمۂ مبارک:</span>
                      </div>
                      <p className="font-medium text-emerald-50">{v.translation}</p>
                    </div>

                    {/* Scholarly Explanation */}
                    <div className="mt-3.5 text-xs sm:text-sm text-emerald-100 leading-[2.2] bg-emerald-900/40 p-3 rounded-md">
                      <strong className="text-amber-200">فکری و تفسیری نکتہ: </strong>
                      <span>{v.explanation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. احادیث مبارکہ (Hadith Guidance) */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200 mb-6">
                <Library size={24} className="text-amber-600" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.9]">
                    احادیثِ نبویہ ﷺ کے ارشادات
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 leading-[1.8]">
                    {fullContent.hadithGuidance.intro}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {fullContent.hadithGuidance.ahadith.map((h, index) => (
                  <div 
                    key={index} 
                    className="bg-amber-50/40 border border-amber-200/90 rounded-xl p-5 sm:p-6"
                  >
                    {/* Hadith Source & Number Badge */}
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-200/70">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-md bg-amber-800 text-white text-xs font-bold shadow-2xs">
                          {h.source}
                        </span>
                        {h.number && (
                          <span className="px-2.5 py-0.5 rounded-md bg-white border border-amber-300 text-amber-900 text-xs font-bold">
                            حدیث: {h.number}
                          </span>
                        )}
                      </div>
                      {h.grade && (
                        <span className="text-xs text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                          حکم: {h.grade}
                        </span>
                      )}
                    </div>

                    {/* Original Arabic Text */}
                    <div className="my-3 py-2 text-center bg-white rounded-lg p-3 border border-amber-200">
                      <p className="text-lg sm:text-xl md:text-2xl text-slate-900 font-bold leading-[2.3]">
                        {h.arabic}
                      </p>
                    </div>

                    {/* Urdu Translation */}
                    <div className="mt-3 p-4 rounded-lg bg-white border-r-4 border-amber-600 text-slate-800 text-base sm:text-lg leading-[2.3] shadow-2xs">
                      <div className="text-xs font-bold text-amber-800 mb-1">
                        اردو ترجمہ:
                      </div>
                      <p>{h.translation}</p>
                    </div>

                    {/* Explanation */}
                    <div className="mt-3 text-xs sm:text-sm text-slate-600 leading-[2.2] bg-white/70 p-3 rounded-md border border-amber-100">
                      <strong className="text-amber-900">تشریح و مقصد: </strong>
                      <span>{h.explanation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. عملی زندگی میں رہنمائی (Practical Application) */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2.5 pb-3 border-b border-emerald-100 mb-5">
                <CheckCircle2 size={22} className="text-emerald-700" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-[2.0]">
                  عملی زندگی میں رہنمائی و نفاذ
                </h2>
              </div>
              <p className="text-slate-600 text-sm sm:text-base leading-[2.2] mb-6">
                {fullContent.practicalLifeGuidance.intro}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fullContent.practicalLifeGuidance.points.map((pt, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-500 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {index + 1}
                      </div>
                      <h4 className="text-base font-black text-slate-900 leading-[1.8]">
                        {pt.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-[2.1] pr-8">
                      {pt.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 7. اہم نکات (Key Takeaways) */}
            <section className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50 rounded-2xl p-6 sm:p-8 border border-emerald-200">
              <div className="flex items-center gap-2.5 pb-3 border-b border-emerald-200 mb-5">
                <Sparkles size={22} className="text-amber-600" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-[2.0]">
                  اہم حاصلِ مطالعہ (اہم نکات)
                </h2>
              </div>
              <ul className="space-y-3">
                {fullContent.keyTakeaways.map((point, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-slate-800 leading-[2.2]">
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-1">
                      <Check size={13} />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 8. خلاصہ (Conclusion) */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2.5 pb-3 border-b border-emerald-100 mb-5">
                <Bookmark size={22} className="text-emerald-700" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-[2.0]">
                  خلاصۂ کلام
                </h2>
              </div>
              <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-[2.4]">
                {fullContent.khulasa.map((k, index) => (
                  <p key={index}>{k}</p>
                ))}
              </div>
            </section>

            {/* 9. حوالہ جات و مصادر (References) */}
            <section className="bg-slate-100/90 rounded-2xl p-6 sm:p-8 border border-slate-200 text-slate-700">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-300 mb-4">
                <Library size={20} className="text-emerald-800" />
                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-[1.9]">
                  حوالہ جات و مراجع (Sources & References)
                </h3>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm leading-[2.2] pr-2">
                {fullContent.references.map((ref, index) => (
                  <li key={index} className="text-slate-700">{ref}</li>
                ))}
              </ol>
            </section>

            {/* 10. Institutional Scholarly Verification Note */}
            <div className="p-5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs sm:text-sm leading-[2.2] flex items-start gap-3">
              <ShieldCheck size={24} className="text-amber-700 shrink-0 mt-1" />
              <div>
                <strong className="font-bold text-amber-900">علمی نظرِ ثانی و ادارتی نوٹ: </strong>
                <span>{fullContent.scholarlyReviewNote}</span>
              </div>
            </div>

          </article>
        ) : (
          /* ========================================================= */
          /* CASE B: PLACEHOLDER NOTIFICATION BOX (Articles 06–20)     */
          /* ========================================================= */
          <div className="bg-white rounded-2xl border-2 border-dashed border-emerald-300 p-8 sm:p-10 shadow-md text-center relative overflow-hidden mb-12">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-2xl -z-10" />

            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 mx-auto flex items-center justify-center mb-5 shadow-inner">
              <BookOpen size={32} />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-[2.0] mb-4">
              یہ مضمون جلد شائع کیا جائے گا۔
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-[2.3] max-w-2xl mx-auto mb-6">
              جامعہ شیرِ ربانی کے علمی و تحقیقی شعبہ کے زیرِ اہتمام اس علمی مقالے پر کام جاری ہے۔ قرآن مجید، احادیثِ نبویہ اور سلفِ صالحین کی معتبر کتب و مراجع کی روشنی میں تحقیق، تخریج اور علمی نظرِ ثانی کے بعد یہ تحریر انشاء اللہ قارئین کے لیے شائع کی جائے گی۔
            </p>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 max-w-xl mx-auto text-right mb-8">
              <div className="text-xs font-bold text-slate-500 mb-3 flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-700" />
                <span>مضمون کے علمی مراحل:</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-[2.0]">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  <span>مستند تفاسیر و احادیثِ مبارکہ سے براہِ راست مراجع و تخریج</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  <span>جامعہ کے اساتذہ کرام اور مفتیانِ عظام کی علمی نظرِ ثانی</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mt-2 shrink-0" />
                  <span>عصرِ حاضر کے فکری تقاضوں کے مطابق عام فہم اور اصلاحی اسلوب</span>
                </li>
              </ul>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs sm:text-sm font-bold">
              <Sparkles size={16} className="text-amber-500" />
              <span>اشاعتی مرحلہ: تحقیق و تدوین (زیرِ تکمیل)</span>
            </div>
          </div>
        )}

        {/* Action Buttons: Back & Contact */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-slate-200 mt-12 mb-16">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
          >
            <ArrowRight size={18} />
            <span>تمام مضامین پر واپس جائیں</span>
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm border border-slate-200 shadow-xs transition-all"
          >
            <span>علمی سوال یا رائے کے لیے رابطہ کریں</span>
          </Link>
        </div>

        {/* 4. RELATED ARTICLES SECTION */}
        {relatedArticles.length > 0 && (
          <section className="pt-8 border-t-2 border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-emerald-800 text-xs font-bold">اسی زمرے سے مزید</span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.9]">
                  متعلقہ علمی مضامین
                </h3>
              </div>
              <Link
                href="/articles"
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
              >
                <span>مزید دیکھیں</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-slate-200 transition-all flex flex-col justify-between group"
                >
                  <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={rel.image}
                      alt={rel.imageAlt || rel.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 right-2.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-900/90 text-white text-[11px] font-bold">
                        {rel.categoryTitle}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-grow justify-between">
                    <div>
                      <h4 className="text-sm sm:text-base font-black text-slate-900 leading-[1.9] mb-2 group-hover:text-emerald-800 transition-colors">
                        {rel.title}
                      </h4>
                      <p className="text-slate-600 text-xs leading-[2.1] line-clamp-2 mb-3">
                        {rel.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[11px] text-slate-600 font-bold">
                        <User size={12} className="text-emerald-700" />
                        <span>{rel.author || OFFICIAL_AUTHOR.name}</span>
                      </div>
                      <Link
                        href={`/articles/${rel.slug}`}
                        className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                      >
                        <span>مضمون پڑھیں</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

    </div>
  );
}
