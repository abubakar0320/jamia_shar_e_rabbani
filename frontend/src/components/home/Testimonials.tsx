import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-14 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/80" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="sr-only">طلبہ و فارغ التحصیل علماء کے تاثرات</h2>
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 sm:p-10 text-center relative overflow-hidden">
          {/* Subtle Top Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-5 font-urdu">
            <Quote size={13} className="text-emerald-700" />
            <span>طلبہ و فارغ التحصیل علماء کے تاثرات</span>
          </div>

          {/* 5-Star Rating */}
          <div className="flex justify-center gap-1 text-amber-400 mb-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={18} fill="currentColor" />
            ))}
          </div>

          {/* Urdu Testimonial Quote in Noori Nastaleeq */}
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 leading-[2.4] mb-8 font-urdu max-w-3xl mx-auto">
            &rdquo;جامعہ شیرِ ربانی میں دینی علوم کے ساتھ ساتھ اخلاقی و باطنی تربیت کا جو پاکیزہ ماحول ملا، اس نے میری فکری و علمی زندگی سنوار دی۔ یہاں کے متبحر اساتذہ کرام کا خلوص، رہنمائی اور علمی شفقت بے مثال ہے۔&ldquo;
          </p>

          {/* Student Info */}
          <div className="flex flex-col items-center justify-center pt-5 border-t border-slate-100">
            <div className="w-12 h-12 rounded-full bg-emerald-800 text-white flex items-center justify-center text-base font-bold shadow-sm mb-2 font-urdu">
              ع
            </div>
            <h3 className="text-base font-bold text-slate-900 font-urdu leading-normal mb-1">
              حافظ محمد عبد اللہ
            </h3>
            <p className="text-emerald-700 text-xs font-semibold font-urdu mt-0.5">
              فارغ التحصیل درسِ نظامی (عالم کورس)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
