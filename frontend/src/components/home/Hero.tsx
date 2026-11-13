import { BookOpen, Award, GraduationCap, MapPin, CheckCircle2 } from 'lucide-react';
import HeroCarousel from './HeroCarousel';

export default function Hero() {
  const trustChecklist = (
    <div className="pt-4 border-t border-[#edebe9] flex flex-wrap gap-2.5 sm:gap-4 text-xs sm:text-sm font-medium text-[#323130]">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-[#edebe9] shadow-2xs">
        <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
        <span className="font-urdu font-semibold text-slate-800">مانانوالہ، ضلع شیخوپورہ، پنجاب</span>
      </div>
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-[#edebe9] shadow-2xs">
        <CheckCircle2 className="w-4 h-4 text-[#107c41] shrink-0" />
        <span className="font-urdu">وفاق المدارس الاسلامیہ الرضویہ سے باقاعدہ الحاق</span>
      </div>
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-[#edebe9] shadow-2xs">
        <CheckCircle2 className="w-4 h-4 text-[#107c41] shrink-0" />
        <span className="font-urdu">100% مفت تعلیم و ہاسٹل</span>
      </div>
    </div>
  );

  return (
    <section
      className="relative w-full bg-[#faf9f8] text-[#242424] border-b border-[#edebe9] overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(#d2d0ce 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    >
      {/* Elegant Jamia Signature Accent Top Bar */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 z-20" />

      {/* Subtle Microsoft Fluent Ambient Glows (radial gradient instead of expensive blur-3xl filter) */}
      <div
        className="absolute -top-32 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,120,212,0.06) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(16,124,65,0.06) 0%, transparent 70%)' }}
      />

      {/* Interactive Main Carousel Grid */}
      <HeroCarousel trustChecklist={trustChecklist} />

      {/* Institutional Highlights Grid (Server-rendered static band) */}
      <div className="relative z-10 bg-white border-t border-[#edebe9] py-6">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            <div className="flex items-center gap-3.5 p-3.5 rounded-lg bg-white hover:bg-[#faf9f8] border border-[#edebe9] hover:border-[#0078d4] shadow-2xs hover:shadow-xs transition-all group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-md bg-[#0078d4]/10 text-[#0078d4] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <div className="text-xs sm:text-sm font-semibold text-[#201f1e] font-urdu">درسِ نظامی و حفظ</div>
                <div className="text-[11px] text-[#605e5c] mt-0.5 font-urdu">جامع اسلامی نصاب</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-lg bg-white hover:bg-[#faf9f8] border border-[#edebe9] hover:border-[#107c41] shadow-2xs hover:shadow-xs transition-all group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-md bg-[#107c41]/10 text-[#107c41] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <div className="text-xs sm:text-sm font-semibold text-[#201f1e] font-urdu">وفاق المدارس الاسلامیہ الرضویہ</div>
                <div className="text-[11px] text-[#605e5c] mt-0.5 font-urdu">الحاق شدہ تعلیمی بورڈ</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-lg bg-white hover:bg-[#faf9f8] border border-[#edebe9] hover:border-[#d83b01] shadow-2xs hover:shadow-xs transition-all group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-md bg-[#d83b01]/10 text-[#d83b01] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <div className="text-xs sm:text-sm font-semibold text-[#201f1e] font-urdu">مفت رہائش و طعام</div>
                <div className="text-[11px] text-[#605e5c] mt-0.5 font-urdu">بہترین ہاسٹل سہولیات</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-lg bg-white hover:bg-[#faf9f8] border border-[#edebe9] hover:border-[#8764b8] shadow-2xs hover:shadow-xs transition-all group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-md bg-[#8764b8]/10 text-[#8764b8] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <div className="text-xs sm:text-sm font-semibold text-[#201f1e] font-urdu">جامعہ شیرِ ربانی، مانانوالہ، ضلع شیخوپورہ</div>
                <div className="text-[11px] text-[#605e5c] mt-0.5 font-urdu">پنجاب، پاکستان (نزد ریلوے اسٹیشن)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
