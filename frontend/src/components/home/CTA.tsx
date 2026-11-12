import Link from 'next/link';
import { ArrowLeft, PhoneCall } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-10 md:py-12 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white relative overflow-hidden" dir="rtl">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Text Information */}
          <div className="text-right max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500 text-slate-950 text-xs font-black px-3.5 py-1.5 mb-4 rounded-md shadow-sm font-urdu">
              <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse" />
              <span>داخلہ تعلیمی سال 2024-2025 باقاعدہ جاری ہے</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 leading-[1.9] md:leading-[2.1] font-urdu">
              دینی و عصری علوم کا سفر آج ہی شروع کریں
            </h2>

            <p className="text-emerald-100/90 text-sm md:text-base leading-[2.2] md:leading-[2.3] font-urdu">
              حفظِ قرآن، درسِ نظامی (عالم و فاضل) اور تخصصات میں 100% مفت تعلیم و ہاسٹل کے لیے ابھی درخواست دیں۔
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3.5 w-full lg:w-auto shrink-0 justify-end">
            <Link
              href="/admissions"
              prefetch={false}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm md:text-base rounded-lg shadow-md hover:shadow-lg transition-colors font-urdu"
            >
              <span>آن لائن داخلہ فارم پر کریں</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              prefetch={false}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-sm md:text-base rounded-lg transition-colors font-urdu"
            >
              <PhoneCall className="w-4 h-4" />
              <span>ہم سے رابطہ کریں</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
