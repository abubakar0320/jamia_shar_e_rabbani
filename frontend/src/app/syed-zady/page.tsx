'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OptimizedImage from '@/components/OptimizedImage';
import { 
  Sparkles, Heart, Crown, ShieldCheck, 
  BookOpen, ChevronLeft, Award, ExternalLink, 
  Maximize2, X, Phone, Mail, CheckCircle2,
  Calendar, MapPin
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface SyedZada {
  id: string;
  name: string;
  title: string;
  lineage: string;
  badge: string;
  badgeColor: string;
  image: string;
  nisbat: string;
  roleInJamia: string;
  bio: string;
  education: string;
  specialization: string;
  highlights: string[];
  facultyId?: number;
  contact?: string;
}

export default function SyedZadyPage() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; subtitle: string } | null>(null);

  const syedZadaList: SyedZada[] = [
    {
      id: 'syed-abdul-wahab-shah',
      name: 'حضرت پیر سید حافظ القاری عبد الوہاب شاہ گیلانی صاحب',
      title: 'سلالۂ سادات، پیرِ طریقت، سجادہ نشین آستانہ عالیہ گیلانیہ',
      lineage: 'سلالۂ پاک حضرت غوث الاعظم سیدنا شیخ عبد القادر جیلانی رضی اللہ عنہ',
      badge: 'سلالۂ ساداتِ گیلانیہ',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      image: '/syed zady/14. Peer Syed Hafiz ul qari Abdul Wahab Shah Ghillani Sahib.png',
      nisbat: 'سلسلہ عالیہ قادریہ گیلانیہ و دربارِ عالیہ گیلانیہ',
      roleInJamia: 'معزز مہمانِ خصوصی، روحانی سرپرست و دعا گو، جامعہ شیرِ ربانی',
      bio: 'حضرت پیر سید حافظ القاری عبد الوہاب شاہ گیلانی صاحب سلالۂ ساداتِ کرام، جلیل القدر پیرِ طریقت، صاحبِ نسبت بزرگ اور حافظ و قاریِ قرآنِ مجید ہیں۔ آپ حضور غوث الثقلین سیدنا شیخ عبد القادر جیلانی رضی اللہ عنہ کے گلشنِ پاک کے مہکتے پھول ہیں۔ آپ کی جامعہ شیرِ ربانی مانانوالہ میں تشریف آوری، پُرخلوص دعاؤں اور خصوصی سرپرستی سے ادارہ ہمہ وقت فیضیاب ہے۔ ساداتِ کرام کے تقدس، احترام اور نسبتِ رسول ﷺ کا یہ درخشندہ ستارہ ادارے کے لیے بیش بہا باعثِ برکت اور افتخار ہے۔',
      education: 'حفظ و حسنِ قراءت القرآن الکریم، علومِ اسلامیہ و سلاسلِ طریقت قادریہ گیلانیہ',
      specialization: 'تزکیۂ باطن، تلاوت و قراءتِ کلامِ پاک، فیضانِ قادریہ اور ارشاد و تلقین',
      highlights: [
        'سلالۂ ساداتِ عظام اور آستانہ عالیہ گیلانیہ کے معزز پیشوا',
        'جامعہ شیرِ ربانی مانانوالہ میں باوقار تشریف آوری و خصوصی دعائیں',
        'حفظ و تجوید القرآن کے ساتھ اخلاقِ نبوی ﷺ کے پیکرِ جمیل',
        'مریدین و عقیدت مندوں کی باطنی تربیت اور خدمتِ خلق'
      ],
      contact: '03144081516'
    },
    {
      id: 'syed-iftikhar-ul-hassan-shah',
      name: 'پروفیسر پیر سید افتخار الحسن شاہ صاحب بخاری رحمۃ اللہ علیہ',
      title: 'پروفیسر، سجادہ نشین آستانہ عالیہ و روحانی مربی',
      lineage: 'سلالۂ ساداتِ بخاریہ و عظیم صوفیانہ خانوادۂ نبوت',
      badge: 'سلالۂ ساداتِ بخاریہ',
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      image: '/syed zady/5. Peer Syed Iftikhar ul hassan shah.jpeg',
      nisbat: 'آستانہ عالیہ بخاریہ و سلسلہ عالیہ تصوف',
      roleInJamia: 'پروفیسر، سرپرستِ اعلیٰ و روحانی مربی، شعبہ تصوف و اخلاقیات',
      bio: 'پروفیسر پیر سید افتخار الحسن شاہ صاحب بخاری رحمۃ اللہ علیہ ساداتِ عظام کے جلیل القدر بزرگ، سجادہ نشین دربارِ عالیہ اور صاحبِ نسبت شخصیت تھے۔ آپ دینِ مبین کی ترویج، تصوف و روحانیت کی آبیاری اور نوجوان نسل کے اخلاقی سدھار میں پیش پیش رہے۔ جامعہ شیرِ ربانی مانانوالہ کے عظیم سرپرست، مربی اور دعا گو رہے ہیں اور ان کی فیض رسانی ادارے کے دل و جان میں رچی بسی ہے۔',
      education: 'علومِ دینیہ و تصوف، سلاسلِ طریقت و نسبتِ سادات',
      specialization: 'تزکیہ نفس، تصوف و اخلاق، خانقاہی نظام اور فکری رہنمائی',
      highlights: [
        'ساداتِ بخاریہ کے عظیم روحانی و خانقاہی پیشوا',
        'جامعہ شیرِ ربانی مانانوالہ کے دینی مشن کی دیرینہ سرپرستی',
        'ہزاروں عقیدت مندوں کے دلوں کو یادِ الٰہی سے منور فرمانے والی ہستی',
        'بین المسالک ہم آہنگی اور محبتِ اہلِ بیت کے علمبردار'
      ],
      facultyId: 5,
      contact: '03144081516'
    },
    {
      id: 'syed-muhammad-ahmad-jami-shah',
      name: 'پروفیسر پیر مفتی علامہ حافظ سید محمد احمد جامی شاہ نقشبندی مجددی',
      title: 'پروفیسر، پیرِ طریقت، مفتیِ اعظم و سجادہ نشین',
      lineage: 'سلالۂ ساداتِ عظام و سلسلہ عالیہ نقشبندیہ مجددیہ',
      badge: 'سلالۂ سادات و مفتیِ اعظم',
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
      image: '/syed zady/7. Peer Mufti Allama Molana Hafiz Al Qari Syed Muhammad Ahmad Al maroof Jami Shah Naqshbandi Mujadadi.jpeg',
      nisbat: 'سلسلہ عالیہ نقشبندیہ مجددیہ و آستانہ عالیہ نقشبندیہ',
      roleInJamia: 'پروفیسر، شعبہ تحفیظ القرآن، حسنِ قرآت و تزکیۂ سلوک',
      bio: 'پروفیسر پیر مفتی علامہ مولانا حافظ القاری سید محمد احمد المعروف جامی شاہ نقشبندی مجددی سلالۂ سادات، صاحبِ علم و تقویٰ، مسندِ افتاء کے تاجدار اور سلسلہ عالیہ نقشبندیہ مجددیہ کے مقتدر پیشوا ہیں۔ آپ نے شریعت و طریقت کے سنگم سے تشنگانِ علم و سلوک کو فیضیاب کیا ہے اور جامعہ شیرِ ربانی کے روحانی سرپرست اور استاذ ہیں۔',
      education: 'الشہادۃ العالمیہ فی العلوم الاسلامیہ، حفظِ قرآنِ مجید، تخصص فی الفقہ والافتاء',
      specialization: 'سلسلہ عالیہ نقشبندیہ مجددیہ، افتاء، تجوید و حفظ اور ارشاد',
      highlights: [
        'ساداتِ عظام کے جلیل القدر مفتی اور پیرِ طریقت',
        'قرآنِ پاک کے جید حافظ و قاری اور فقہِ اسلامی کے متبحر عالم',
        'جامعہ شیرِ ربانی کے علمی، فقہی و روحانی شعبہ جات کی سرپرستی',
        'مکتوباتِ امامِ ربانی مجدد الف ثانی اور سلوکِ نقشبندیہ کے شارح'
      ],
      facultyId: 7,
      contact: '03144081516'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60 font-urdu selection:bg-amber-100 selection:text-amber-950" dir="rtl">
      <Header />

      <main className="flex-1 pb-16 sm:pb-24">
        {/* HERO SECTION */}
        <section className="bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-900 text-white pt-10 sm:pt-16 pb-16 sm:pb-24 relative overflow-hidden text-right">
          {/* Subtle Islamic Ambient Overlay */}
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl" />
          </div>

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-300/80 mb-5">
              <Link href="/" className="hover:text-amber-300 transition-colors">ہوم</Link>
              <ChevronLeft size={14} />
              <span className="text-amber-400 font-bold">سید زادے و مشائخِ عظام</span>
            </div>

            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-bold mb-4 shadow-sm backdrop-blur-xs">
              <Crown size={15} className="text-amber-400 shrink-0" />
              <span>سلالۂ ساداتِ کرام • آلِ رسول ﷺ • مشائخِ عظام</span>
            </div>

            {/* Heading */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.6] mb-4">
              جامعہ شیرِ ربانی کے معزز <span className="text-amber-400">سید زادے</span> و مشائخِ عظام
            </h1>

            {/* Subheading / Quranic Ayah */}
            <div className="max-w-4xl bg-white/5 border border-amber-400/20 rounded-2xl p-4 sm:p-5 mb-6 backdrop-blur-xs">
              <p className="text-amber-200 text-base sm:text-lg font-bold leading-[2] mb-1">
                قُلْ لَّا أَسْأَلُكُمْ عَلَيْهِ أَجْرًا إِلَّا الْمَوَدَّةَ فِي الْقُرْبَىٰ 
                <span className="text-xs text-amber-300/80 mr-2">(سورۃ الشوریٰ: ۲۳)</span>
              </p>
              <p className="text-slate-300 text-xs sm:text-sm leading-[2.1]">
                فرما دیجئے: میں تم سے اس (تبلیغِ رسالت) پر کوئی اجرت نہیں مانگتا سوائے قرابت داروں (اہلِ بیت) کی محبت کے۔
              </p>
            </div>

            <p className="text-slate-200 text-sm sm:text-base leading-[2.2] max-w-3xl">
              حضور سرورِ کونین ﷺ کی آلِ پاک، ساداتِ عظام اور مشائخِ کرام کے قدموں کی برکت سے جامعہ شیرِ ربانی مانانوالہ سرفراز ہے۔ ذیل میں ان جلیل القدر سید زادگان کا تعارف پیش ہے جن کی تشریف آوری، محبت اور پُرخلوص سرپرستی ادارے کے لیے دائمی افتخار کا باعث ہے۔
            </p>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-white/10 mt-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 text-xs sm:text-sm text-slate-200 border border-white/15">
                <Sparkles size={14} className="text-amber-400" />
                <span>۳ معزز ساداتِ کرام کا تعارف</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 text-xs sm:text-sm text-slate-200 border border-white/15">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>مستند نسبتیں و سلاسلِ طریقت</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 text-xs sm:text-sm text-slate-200 border border-white/15">
                <Heart size={14} className="text-rose-400" />
                <span>محبت و تکریمِ آلِ رسول ﷺ</span>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN SHOWCASE SECTION */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
          <div className="space-y-8 sm:space-y-12">
            {syedZadaList.map((syed, index) => (
              <motion.article
                key={syed.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
                className="bg-white rounded-3xl border-2 border-amber-200/80 shadow-xl overflow-hidden hover:border-amber-400 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  
                  {/* PHOTO COLUMN (UNCROPPED, FULL ASPECT RATIO WITH AMBIENT BACKDROP) */}
                  <div className="lg:col-span-5 bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950 p-4 sm:p-6 lg:p-7 flex flex-col items-center justify-between relative overflow-hidden group">
                    {/* Ambient Glow */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <div 
                        className="w-full h-full bg-cover bg-center blur-2xl scale-125"
                        style={{ backgroundImage: `url("${syed.image}")` }}
                      />
                    </div>

                    {/* Top Badges over Photo */}
                    <div className="w-full flex items-center justify-between gap-2 z-10 mb-3">
                      <span className="text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 backdrop-blur-md">
                        {syed.badge}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedImage({ src: syed.image, title: syed.name, subtitle: syed.title })}
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white/90 bg-white/10 hover:bg-white/20 border border-white/20 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                        title="بڑی تصویر دیکھیں"
                      >
                        <Maximize2 size={13} />
                        <span>مکمل تصویر</span>
                      </button>
                    </div>

                    {/* UNCROPPED PHOTO CONTAINER */}
                    <div 
                      onClick={() => setSelectedImage({ src: syed.image, title: syed.name, subtitle: syed.title })}
                      className="w-full relative rounded-2xl overflow-hidden border-2 border-amber-400/30 bg-slate-900/80 shadow-2xl p-2 sm:p-3 cursor-pointer group-hover:border-amber-400 transition-all flex items-center justify-center min-h-[380px] sm:min-h-[460px] lg:min-h-[500px]"
                    >
                      <OptimizedImage
                        src={syed.image}
                        alt={syed.name}
                        width={600}
                        height={750}
                        priority={index === 0}
                        className="w-full h-auto max-h-[520px] object-contain rounded-xl drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>

                    {/* Bottom Caption */}
                    <div className="w-full text-center mt-3 z-10">
                      <p className="text-xs text-amber-200/90 font-medium">
                        تصویر پر کلک کر کے اصل سائز میں ملاحظہ فرمائیں
                      </p>
                    </div>
                  </div>

                  {/* DETAILS COLUMN */}
                  <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between text-right">
                    <div>
                      {/* Lineage & Nisbat */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${syed.badgeColor}`}>
                          {syed.nisbat}
                        </span>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {syed.lineage}
                        </span>
                      </div>

                      {/* Name */}
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-[1.6] mb-2">
                        {syed.name}
                      </h2>

                      {/* Title / Role */}
                      <p className="text-sm sm:text-base font-bold text-amber-800 leading-[1.8] mb-4">
                        {syed.title}
                      </p>

                      {/* Bio */}
                      <div className="bg-amber-50/50 border-r-4 border-amber-500 rounded-xl p-4 sm:p-5 mb-5 text-slate-700 text-xs sm:text-sm leading-[2.3]">
                        {syed.bio}
                      </div>

                      {/* Key Attributes / Highlights */}
                      <div className="mb-5">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-2.5 flex items-center gap-1.5">
                          <Sparkles size={14} className="text-amber-600" />
                          <span>خصوصیات و نسبتِ مبارکہ:</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {syed.highlights.map((item, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-2 bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-xs text-slate-800 leading-[1.9]">
                              <CheckCircle2 size={14} className="text-emerald-600 mt-1 shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Education & Specialization Box */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs border-t border-slate-200 pt-4">
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                          <span className="font-bold text-slate-900 block mb-1">تعلیمی و روحانی اسناد:</span>
                          <span className="text-slate-600 leading-[1.8]">{syed.education}</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                          <span className="font-bold text-slate-900 block mb-1">تخصص و خدمات:</span>
                          <span className="text-slate-600 leading-[1.8]">{syed.specialization}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-slate-200 mt-6">
                      <div className="flex items-center gap-2">
                        {syed.facultyId ? (
                          <Link
                            href={`/faculty-profile?id=${syed.facultyId}`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 text-white font-bold text-xs sm:text-sm shadow-md hover:from-emerald-800 hover:to-teal-900 transition-all"
                          >
                            <span>مکمل فیکلٹی پروفائل دیکھیں</span>
                            <ChevronLeft size={16} />
                          </Link>
                        ) : (
                          <Link
                            href="/faculty"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 text-white font-bold text-xs sm:text-sm shadow-md hover:from-emerald-800 hover:to-teal-900 transition-all"
                          >
                            <span>جامعہ کی فیکلٹی دیکھیں</span>
                            <ChevronLeft size={16} />
                          </Link>
                        )}
                        <button
                          type="button"
                          onClick={() => setSelectedImage({ src: syed.image, title: syed.name, subtitle: syed.title })}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs transition-colors cursor-pointer"
                        >
                          <Maximize2 size={14} />
                          <span>بڑی تصویر</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Phone size={13} className="text-emerald-700" />
                        <span className="font-mono text-slate-700 font-bold" dir="ltr">{syed.contact || '03144081516'}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION / SPIRITUAL RESPECT */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 text-right">
          <div className="bg-gradient-to-r from-amber-50 via-emerald-50 to-amber-50 border-2 border-amber-300/80 rounded-3xl p-6 sm:p-10 shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
                  <Crown size={14} />
                  <span>تکریم و محبتِ آلِ رسول ﷺ</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-black text-slate-900 leading-[1.7]">
                  ساداتِ کرام کی دعائیں جامعہ شیرِ ربانی کا عظیم سرمایہ ہیں
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-[2.1]">
                  جامعہ شیرِ ربانی مانانوالہ ساداتِ عظام، مشائخِ طریقت اور علمائے حق کے زیرِ سایہ نسلِ نو کی علمی و روحانی تربیت میں ہمہ وقت مصروفِ عمل ہے۔
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href="/gallery"
                  className="px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
                >
                  تصویری گیلری دیکھیں
                </Link>
                <Link
                  href="/contact"
                  className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs sm:text-sm shadow-xs transition-colors"
                >
                  جامعہ سے رابطہ کریں
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FULL-SCREEN IMAGE MODAL / LIGHTBOX (UNCROPPED EXACT RATIO VIEW) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6"
            onClick={() => setSelectedImage(null)}
          >
            {/* Top Close Bar */}
            <div 
              className="w-full max-w-4xl flex items-center justify-between text-white mb-3 px-2 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-right">
                <h4 className="text-sm sm:text-base font-bold text-amber-300 font-urdu">{selectedImage.title}</h4>
                <p className="text-xs text-slate-300 font-urdu">{selectedImage.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="بند کریں (Close)"
              >
                <X size={22} />
              </button>
            </div>

            {/* Main Modal Image (Full Exact Ratio) */}
            <div 
              className="relative max-w-4xl max-h-[85vh] w-full flex items-center justify-center p-2 rounded-2xl bg-slate-950/60 border border-white/10 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <OptimizedImage
                src={selectedImage.src}
                alt={selectedImage.title}
                width={1200}
                height={1500}
                className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              />
            </div>
            
            <p className="text-xs text-slate-400 mt-2 font-urdu">
              بند کرنے کے لیے تصویر کے باہر کہیں بھی کلک کریں
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
