import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, ChevronLeft } from 'lucide-react';
import { OFFICIAL_AUTHOR } from '@/data/articles';

interface ArticleAuthorCardProps {
  className?: string;
  variant?: 'card' | 'compact' | 'badge';
}

export default function ArticleAuthorCard({
  className = '',
  variant = 'card'
}: ArticleAuthorCardProps) {
  const authorImg = OFFICIAL_AUTHOR.image || '/abubakar-latest.jpeg';

  if (variant === 'badge') {
    return (
      <div 
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200/80 ${className}`}
        dir="rtl"
      >
        <div className="relative w-5 h-5 rounded-full overflow-hidden border border-emerald-600/40 shrink-0 bg-slate-200">
          <Image 
            src={authorImg} 
            alt={OFFICIAL_AUTHOR.name} 
            fill 
            unoptimized 
            className="object-cover object-top" 
          />
        </div>
        <span>مصنف: {OFFICIAL_AUTHOR.name}</span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div 
        className={`inline-flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-bold ${className}`}
        dir="rtl"
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-emerald-600/40 shadow-xs shrink-0 bg-slate-200">
          <Image 
            src={authorImg} 
            alt={OFFICIAL_AUTHOR.name} 
            fill 
            unoptimized 
            className="object-cover object-top" 
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 text-right">
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-900 font-black">مصنف:</span>
            <span className="text-slate-900 font-bold">{OFFICIAL_AUTHOR.name}</span>
          </div>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="text-slate-600 font-medium text-xs">{OFFICIAL_AUTHOR.designation}</span>
        </div>
      </div>
    );
  }

  // Default: Elegant and minimal author information card
  return (
    <div 
      className={`bg-gradient-to-r from-emerald-50/70 via-slate-50 to-white rounded-2xl p-5 sm:p-6 border border-emerald-200/80 shadow-xs text-right font-urdu ${className}`} 
      dir="rtl"
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-emerald-600/60 shadow-md shrink-0 bg-slate-800">
            <Image 
              src={authorImg} 
              alt={OFFICIAL_AUTHOR.name} 
              fill 
              unoptimized 
              priority
              className="object-cover object-top" 
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-200">
                مضمون نگار و محقق
              </span>
              <h3 className="text-base sm:text-xl font-black text-slate-900 leading-tight">
                {`مصنف: ${OFFICIAL_AUTHOR.name}`}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              {OFFICIAL_AUTHOR.designation}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-600 shadow-2xs">
            <ShieldCheck size={15} className="text-emerald-700" />
            <span>جامعہ شیرِ ربانی مانانوالہ</span>
          </div>
          <Link
            href="/faculty-profile?id=3"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors"
          >
            <span>پروفائل دیکھیں</span>
            <ChevronLeft size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
