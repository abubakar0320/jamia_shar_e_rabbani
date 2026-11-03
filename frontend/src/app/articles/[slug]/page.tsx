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
  Share2, 
  Bookmark, 
  Calendar, 
  Building2, 
  FileText,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  ARTICLES, 
  getArticleBySlug, 
  getRelatedArticles 
} from '@/data/articles';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
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

  return {
    title: `${article.title} | جامعہ شیرِ ربانی`,
    description: article.description,
    openGraph: {
      title: `${article.title} | جامعہ شیرِ ربانی`,
      description: article.description,
      type: 'article',
      locale: 'ur_PK',
      images: [
        {
          url: article.image,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} | جامعہ شیرِ ربانی`,
      description: article.description,
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

  const relatedArticles = getRelatedArticles(article.slug, article.categoryId, 3);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-urdu selection:bg-emerald-500/20" dir="rtl">
      
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
            <span className="text-emerald-800 whitespace-nowrap">{article.categoryTitle}</span>
          </nav>

          {/* Back to all articles button */}
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-1.5 rounded-lg border border-emerald-200 transition-all"
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
            <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-900 text-xs font-black shadow-xs">
              {article.status}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
              <Clock size={13} className="text-emerald-700" />
              <span>مطالعہ: {article.readTime}</span>
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-[1.8] sm:leading-[1.9] md:leading-[2.0] mb-6">
            {article.title}
          </h1>

          {/* Publishing & Academic Attribution Metadata */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600 font-bold">
            <div className="flex items-center gap-2">
              <Building2 size={16} className="text-emerald-700" />
              <span>جامعہ شیرِ ربانی مانانوالہ</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-emerald-700" />
              <span>شعبہ تحقیق و تصنیف</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-amber-500" />
              <span>مستند علمی سلسلہ</span>
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
            alt={article.title}
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
        <div className="bg-emerald-50/70 border-r-4 border-emerald-700 rounded-xl p-6 mb-10 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm mb-2">
            <Bookmark size={18} className="text-emerald-700" />
            <span>خلاصۂ مضمون و موضوعِ بحث:</span>
          </div>
          <p className="text-slate-800 text-base sm:text-lg leading-[2.3]">
            {article.description}
          </p>
        </div>

        {/* PLACEHOLDER NOTIFICATION BOX (Future Content Placeholder) */}
        <div className="bg-white rounded-2xl border-2 border-dashed border-emerald-300 p-8 sm:p-10 shadow-md text-center relative overflow-hidden mb-12">
          {/* Subtle Islamic Background Pattern Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-2xl -z-10" />

          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 mx-auto flex items-center justify-center mb-5 shadow-inner">
            <BookOpen size={32} />
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-[2.0] mb-4">
            یہ مضمون جلد شائع کیا جائے گا۔
          </h2>

          {/* Explanation */}
          <p className="text-slate-600 text-sm sm:text-base leading-[2.3] max-w-2xl mx-auto mb-6">
            جامعہ شیرِ ربانی کے علمی و تحقیقی شعبہ کے زیرِ اہتمام اس علمی مقالے پر کام جاری ہے۔ قرآن مجید، احادیثِ نبویہ اور سلفِ صالحین کی معتبر کتب و مراجع کی روشنی میں تحقیق، تخریج اور علمی نظرِ ثانی کے بعد یہ تحریر انشاء اللہ قارئین کے لیے شائع کی جائے گی۔
          </p>

          {/* Editorial Pipeline Points */}
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

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs sm:text-sm font-bold">
            <Sparkles size={16} className="text-amber-500" />
            <span>اشاعتی مرحلہ: تحقیق و تدوین (زیرِ تکمیل)</span>
          </div>
        </div>

        {/* Action Buttons: Back & Contact */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200 mb-16">
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
                      alt={rel.title}
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
                      <span className="text-[11px] text-slate-400 font-bold">{rel.readTime}</span>
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
