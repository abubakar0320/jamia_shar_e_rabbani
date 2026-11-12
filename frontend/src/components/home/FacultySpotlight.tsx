import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import { ChevronLeft } from 'lucide-react';

const faculty = [
  {
    id: '14',
    name: 'مولانا الحاج صوبیدار محمد یوسف نقشبندی مجددی صاحب',
    role: 'چانسلر و سرپرستِ اعلیٰ، جامعہ شیرِ ربانی',
    bio: '۳۰ سالہ عسکری نظم و ضبط اور ۲۴ سالہ دینی اخلاص، اور سلسلہ عالیہ نقشبندیہ مجددیہ کے روحانی فیضان کے امین۔ ادارے کے فکری و تعلیمی استحکام کے سرپرستِ اعلیٰ۔',
    image: '/gallery/1.1مولانا الحاج صوبیدار محمد یوسف نقشبندی مجددی صاحب.jpeg',
    link: '/faculty-profile?id=14',
  },
  {
    id: '1',
    name: 'ڈاکٹر پیر ابو احمد فاروق علی ربانی صاحب',
    role: 'وائس چانسلر و ڈینِ فیکلٹی آف اسلامک اسٹڈیز',
    bio: 'علومِ حدیث، تفاسیر اور شریعت میں 25 سال سے زائد تدریسی و تحقیقی خدمات۔ طلبہ کی علمی و روحانی رہنمائی کے سرپرستِ اعلیٰ۔',
    image: '/gallery/2. ڈاکٹر پیر ابو احمد فاروق علی ربانی صاحب (جدید).jpeg',
    link: '/faculty-profile?id=1',
  },
  {
    id: '4',
    name: 'اسلامک اسکالر حافظ القاری محمد احمد ربانی صاحب',
    role: 'کنٹرولر امتحانات و ناظمِ تعلیمات (Director of Education)',
    bio: 'جامعہ شیرِ ربانی کے امتحانی نظم و شفافیت، جملہ تدریسی شعبہ جات کے ناظمِ اعلیٰ اور طلبہ کے تعلیمی معیار کے سربراہ۔',
    image: '/gallery/3. hafiz ahmad ali.jpeg',
    link: '/faculty-profile?id=4',
  },
  {
    id: '3',
    name: 'پروفیسر ابوبکر صدیق ربانی صاحب',
    role: 'رجسٹرار، خزانچی، چیئرپرسن و نگرانِ جملہ شعبہ جات',
    bio: 'جامعہ کے رجسٹرار، خزانچی، چیئرپرسن، تمام شعبہ جات کے نگران، کلاؤڈ سسٹمز کے معمار اور آئی ٹی پروگرام کے نگران۔',
    image: '/gallery/4. abubakar-siddique.jpeg',
    link: '/faculty-profile?id=3',
  },
];

export default function FacultySpotlight() {
  return (
    <section className="py-16 md:py-20 bg-white border-b border-slate-200/80" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-xs md:text-sm font-semibold tracking-wide inline-block mb-3 px-3 py-1 rounded-md text-emerald-800 bg-emerald-50 border border-emerald-200 font-urdu">
            معزز اساتذہ و شیوخ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-[1.9] md:leading-[2.1] font-urdu">
            جامعہ کے ممتاز و جید اساتذہ کرام
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-[2.2] md:leading-[2.3] font-urdu">
            علم، تقوٰی اور اخلاص سے مزین وہ جلیل القدر اساتذہ جو نئی نسل کو علمِ دین اور سنتِ نبوی سے منور کر رہے ہیں
          </p>
        </div>

        {/* Faculty Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {faculty.map((member) => (
            <div
              key={member.id}
              className="flex flex-col bg-white border border-slate-200/80 shadow-sm hover:shadow-xl rounded-2xl overflow-hidden transition-shadow duration-300 group"
            >
              <div className="w-full aspect-[4/5] overflow-hidden relative bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 shrink-0 flex items-center justify-center">
                {/* Complete Portrait in Exact Ratio without duplicate blurred background image */}
                <OptimizedImage
                  src={member.image}
                  fill
                  loading="lazy"
                  quality={65}
                  section="faculty"
                  className="object-contain p-2 z-10 drop-shadow-md group-hover:scale-102 transition-transform duration-500"
                  alt={member.name}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 290px"
                />
              </div>

              <div className="p-6 md:p-7 flex flex-col justify-between flex-1 text-right">
                <div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/60 inline-block mb-3 font-urdu">
                    {member.role}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mb-2 leading-[2.2] font-urdu group-hover:text-emerald-700 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-[2.2] mb-6 font-urdu">
                    &ldquo;{member.bio}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={member.link}
                    prefetch={false}
                    className="inline-flex items-center text-xs md:text-sm text-emerald-700 font-bold hover:text-emerald-800 transition-colors font-urdu gap-1 group/btn"
                  >
                    <span>تفصیلی پروفائل دیکھیں</span>
                    <ChevronLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/faculty"
                    prefetch={false}
                    className="text-xs text-slate-600 hover:text-emerald-700 transition-colors font-urdu"
                  >
                    ڈائریکٹری
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Directory CTA */}
        <div className="text-center mt-12">
          <Link
            href="/faculty"
            prefetch={false}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-colors font-urdu"
          >
            <span>تمام اساتذہ و انتظامیہ کی مکمل ڈائریکٹری دیکھیں</span>
            <ChevronLeft size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
