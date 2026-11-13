import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Calendar, MapPin } from 'lucide-react';

const sideNews = [
  {
    cat: 'داخلہ اعلانات',
    title: 'نئے تعلیمی سیشن برائے درسِ نظامی و حفظ میں داخلے جاری',
    desc: 'حفظِ قرآن، تجوید و قرات اور درسِ نظامی (عالم و فاضل) کے نئے داخلے شروع ہیں، آن لائن فارم پر کریں۔',
    link: '/admissions',
  },
  {
    cat: 'علمی سیمینار',
    title: 'عربی گرامر اور تفہیمِ قرآن پر دو روزہ خصوصی ورکشاپ',
    desc: 'کالج و یونیورسٹی کے طلبہ کے لیے فہمِ دین اور عربی تکلم کے اصولوں پر مشتمل تربیتی پروگرام۔',
    link: '/news',
  },
  {
    cat: 'تربیتی نشست',
    title: 'جدید فتنوں کا سدِباب اور اسلامی اخلاقیات: خصوصی خطاب',
    desc: 'جمعۃ المبارک کے موقع پر معزز علماء کرام کا نوجوانوں کی فکری و اخلاقی رہنمائی پر جامع بیان۔',
    link: '/news',
  },
  {
    cat: 'کیمپس اپ ڈیٹس',
    title: 'جامعہ کے نئے رہائشی بلاک و لائبریری ہال کی تعمیر کا آغاز',
    desc: 'بحمدِ تعالی طلبہ کی سہولت کے لیے نئے کشادہ ہاسٹل اور اسلامک کتب خانے کی بنیاد رکھ دی گئی۔',
    link: '/news',
  },
];

export default function NewsEvents() {
  return (
    <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200/80" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with View All Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-4 text-right">
          <div>
            <span className="text-xs md:text-sm font-semibold tracking-wide inline-block mb-2 px-3 py-1 rounded-md text-emerald-800 bg-emerald-100/60 border border-emerald-200 font-urdu">
              اعلانات و تقریبات
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-[1.9] md:leading-[2.1] font-urdu">
              تازہ ترین خبریں اور اہم سرگرمیاں
            </h2>
          </div>
          <Link
            href="/news"
            prefetch={false}
            className="text-emerald-700 font-bold hover:text-emerald-800 flex items-center gap-1 group font-urdu text-sm md:text-base self-start md:self-auto"
          >
            <span>تمام خبریں دیکھیں</span>
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Featured News Card */}
          <div className="lg:col-span-7 bg-white shadow-sm border border-slate-200/80 hover:shadow-xl transition-shadow rounded-2xl overflow-hidden flex flex-col group text-right">
            <div className="aspect-[16/10] w-full overflow-hidden relative bg-slate-100">
              <Image
                src="/images/news.jpeg"
                fill
                loading="lazy"
                quality={65}
                className="absolute inset-0 object-cover group-hover:scale-105 transition-transform duration-500"
                alt="سالانہ کانووکیشن و دستارِ فضیلت"
                sizes="(max-width: 1024px) 92vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 text-white text-xs font-bold bg-emerald-700/90 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-sm font-urdu">
                <Calendar size={13} />
                <span>سالانہ دستارِ فضیلت تقریب</span>
              </span>
            </div>

            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4 leading-[2.2] font-urdu group-hover:text-emerald-700 transition-colors">
                  سالانہ عظیم الشان دستارِ فضیلت و تقسیمِ اسناد کانفرنس 2024-25
                </h3>
                <p className="text-slate-600 text-sm md:text-base leading-[2.3] mb-6 font-urdu">
                  جامعہ شیرِ ربانی کے فارغ التحصیل علماء و حفاظِ کرام کے اعزاز میں منعقدہ پروقار تقریب جس میں ملک بھر کے جید علماء، مشائخ اور اہم شخصیات نے شرکت فرمائی۔
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-500 text-xs sm:text-sm pt-4 border-t border-slate-100 font-urdu">
                <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <Calendar size={15} className="text-emerald-600" />
                  <span>15 شعبان المعظم 1445ھ</span>
                </span>
                <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <MapPin size={15} className="text-emerald-600" />
                  <span>مرکزی آڈیٹوریم، جامعہ شیرِ ربانی مانانوالہ</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right 4 Stacked News Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {sideNews.map((item, i) => (
              <Link
                key={i}
                href={item.link}
                prefetch={false}
                className="bg-white border border-slate-200/80 p-5 shadow-2xs hover:shadow-md transition-shadow rounded-xl flex flex-col justify-between text-right group"
              >
                <div>
                  <div className="text-emerald-700 text-xs font-bold mb-2 font-urdu">
                    {item.cat}
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2.5 leading-[2.1] font-urdu">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-[2.2] font-urdu line-clamp-2">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-emerald-700 font-urdu">
                  <span>مزید تفصیلات دیکھیں</span>
                  <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
