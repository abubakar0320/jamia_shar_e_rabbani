'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { GraduationCap, Mail, Phone, ChevronLeft, UserCircle, BookOpen, ShieldCheck, Sparkles, Award } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';

interface FacultyMember {
  id: number;
  name: string;
  role: string;
  education: string;
  specialization: string;
  image: string;
  email?: string;
  contact?: string;
}

export default function Faculty() {
  const staticFaculty: FacultyMember[] = [
    {
      id: 1,
      name: 'پروفیسر ڈاکٹر فاروق علی ربانی',
      role: 'شیخ الحدیث و پرنسپل، جامعہ شیرِ ربانی',
      education: 'عالمیہ (درسِ نظامی) و تخصص فی الحدیث',
      specialization: 'علومِ حدیث، تفاسیر اور فقہِ اسلامی',
      image: '/farooq-ali-rabbani.jpeg',
      email: 'jamiashererabbani07@gmail.com',
      contact: '03144081516'
    },
    {
      id: 2,
      name: 'مولانا علی حمزہ ربانی',
      role: 'استاذ الحدیث و شعبہ درسِ نظامی',
      education: 'عالمیہ (درسِ نظامی) و تخصص فی الفقہ',
      specialization: 'فقہِ اسلامی، اصولِ فقہ و عربی ادب',
      image: '/ali-hamza.jpeg',
      email: 'jamiashererabbani07@gmail.com',
      contact: '03144081516'
    }
  ];

  const [faculty, setFaculty] = useState<FacultyMember[]>(staticFaculty);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch('/api/faculty')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          // If backend has custom faculty, map them to ensure Urdu presentation
          setFaculty(data);
        } else {
          setFaculty(staticFaculty);
        }
      })
      .catch(() => {
        setFaculty(staticFaculty);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen bg-white" dir="rtl">
        <Header />
        <main className="flex-1 min-h-[500px]" />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white" dir="rtl">
      <Header />
      
      <main className="flex-1 bg-white font-sans text-slate-900">
        
        {/* --- HERO SECTION --- */}
        <section className="relative pt-16 md:pt-24 pb-16 md:pb-20 border-b border-slate-200/80 bg-gradient-to-b from-slate-50 via-white to-white overflow-hidden text-right">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold mb-4 font-urdu shadow-2xs">
                <Sparkles size={14} className="text-emerald-700" />
                <span>جامعہ شیرِ ربانی کے ممتاز شیوخ و اساتذہ کرام</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.9] md:leading-[2.1] mb-5 font-urdu">
                معزز و جید اساتذہ کرام اور علمی قیادت
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-[2.2] md:leading-[2.3] max-w-3xl mx-auto mb-8 font-urdu">
                علم، عمل اور تقوٰی کے پیکر، متبحر علماء اور محققین جو نسلِ نو کی فکری، اخلاقی اور روحانی آبیاری کے لیے وقف ہیں۔
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- FACULTY LEADERSHIP GRID --- */}
        <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/50 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <span className="text-xs md:text-sm font-semibold tracking-wide inline-block mb-2 px-3 py-1 rounded-md text-emerald-800 bg-emerald-100/60 border border-emerald-200 font-urdu">
                اساتذہ ڈائریکٹری
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-[1.9] md:leading-[2.1] font-urdu">
                ممتاز اساتذہ اور شیوخ الحدیث
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-[2.2] md:leading-[2.3] font-urdu">
                علمِ دین کے عظیم امین اور سنتِ نبوی کے داعی جو طلبہ کو فکری اور عملی میدان میں رہنمائی فراہم کرتے ہیں۔
              </p>
            </div>
            
            {loading ? (
              <div className="text-center py-24">
                <div className="inline-block w-10 h-10 border-4 border-slate-200 border-t-emerald-700 rounded-full animate-spin mb-3"></div>
                <div className="text-sm font-bold text-slate-700 font-urdu">اساتذہ کا ڈیٹا لوڈ ہو رہا ہے...</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
                {faculty.map((member, i) => (
                  <motion.div 
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex flex-col sm:flex-row bg-white border border-slate-200/80 shadow-sm hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300 group"
                  >
                    {/* Faculty Image */}
                    <div className="sm:w-2/5 aspect-[4/5] sm:aspect-auto overflow-hidden relative bg-slate-100 shrink-0">
                      <OptimizedImage 
                        src={member.image || "/images/WhatsApp.jpeg"}
                        alt={member.name}
                        fill
                        section="faculty"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 30vw"
                      />
                    </div>
                    
                    {/* Faculty Information */}
                    <div className="p-6 md:p-8 flex flex-col justify-between flex-1 text-right">
                      <div>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/60 inline-block mb-3 font-urdu">
                          {member.role}
                        </span>
                        
                        <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-4 leading-[2.2] font-urdu group-hover:text-emerald-700 transition-colors">
                          {member.name}
                        </h3>
                        
                        <div className="space-y-3 mb-6 text-xs sm:text-sm font-urdu">
                          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                            <span className="font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                              <GraduationCap size={15} className="text-emerald-700 shrink-0" />
                              <span>تعلیمی اسناد و اسناد:</span>
                            </span>
                            <span className="text-slate-600 block leading-[2.2]">{member.education}</span>
                          </div>

                          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                            <span className="font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                              <BookOpen size={15} className="text-emerald-700 shrink-0" />
                              <span>تخصص و مہارت:</span>
                            </span>
                            <span className="text-slate-600 block leading-[2.2]">{member.specialization}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 gap-2">
                        <div className="flex gap-2">
                          <Link 
                            href={`mailto:${member.email || 'jamiashererabbani07@gmail.com'}`} 
                            className="p-2 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-800 transition-colors"
                            title="ای میل کریں"
                          >
                            <Mail size={16} />
                          </Link>
                          <Link 
                            href={`tel:${member.contact || '03144081516'}`} 
                            className="p-2 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-800 transition-colors"
                            title="رابطہ کریں"
                          >
                            <Phone size={16} />
                          </Link>
                        </div>

                        <Link 
                          href={`/faculty-profile?id=${member.id}`} 
                          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center gap-1 font-urdu"
                        >
                          <span>تفصیلی پروفائل دیکھیں</span>
                          <ChevronLeft size={14} />
                        </Link>
                      </div>

                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* --- SCHOLARLY LINEAGE (ISNAD & TALAQQI) --- */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              <div className="lg:col-span-7 text-right">
                <span className="text-xs md:text-sm font-semibold tracking-wide inline-block mb-3 px-3 py-1 rounded-md text-purple-800 bg-purple-50 border border-purple-200 font-urdu">
                  سندِ متصل اور روایتی امانت
                </span>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-relaxed mb-4 font-urdu">
                  روایت و درایت کی قدیم اسلامی روایت: تلقّی
                </h2>

                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 font-urdu">
                  جامعہ شیرِ ربانی میں محض کتابیں نہیں پڑھائی جاتیں بلکہ دینِ اسلام کی زندہ روایات کو منتقل کیا جاتا ہے۔ ہمارے اساتذہ کرام کے پاس صحاحِ ستہ اور امہات الکتب کی ایسی اسناد و اجازات موجود ہیں جو متصل اسناد کے ساتھ ائمۂ محدثین اور بالآخر رسول اللہ ﷺ تک پہنچتی ہیں۔
                </p>

                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100 text-right">
                  <div>
                    <div className="text-3xl font-black text-slate-900 mb-1">100%</div>
                    <div className="text-xs font-bold text-slate-500 font-urdu">مستند اجازات و اسناد کے حامل اساتذہ</div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-slate-900 mb-1">25+</div>
                    <div className="text-xs font-bold text-slate-500 font-urdu">سالوں پر محیط تدریسی و علمی تجربہ</div>
                  </div>
                </div>
              </div>

              {/* 4 Discipline Highlights */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4 text-center">
                <div className="bg-white p-5 md:p-6 border border-slate-200/80 shadow-2xs hover:shadow-md rounded-2xl transition-all">
                  <div className="w-12 h-12 mx-auto bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center mb-3">
                    <BookOpen size={24} />
                  </div>
                  <h4 className="font-black text-slate-900 text-base mb-1 font-urdu">تفسیر القرآن</h4>
                  <p className="text-xs text-slate-500 font-urdu">اصول و تفہیمِ قرآن</p>
                </div>

                <div className="bg-white p-5 md:p-6 border border-slate-200/80 shadow-2xs hover:shadow-md rounded-2xl transition-all">
                  <div className="w-12 h-12 mx-auto bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center mb-3">
                    <Award size={24} />
                  </div>
                  <h4 className="font-black text-slate-900 text-base mb-1 font-urdu">علومِ حدیث</h4>
                  <p className="text-xs text-slate-500 font-urdu">صحاحِ ستہ و رجال</p>
                </div>

                <div className="bg-white p-5 md:p-6 border border-slate-200/80 shadow-2xs hover:shadow-md rounded-2xl transition-all">
                  <div className="w-12 h-12 mx-auto bg-teal-50 text-teal-700 rounded-xl flex items-center justify-center mb-3">
                    <ShieldCheck size={24} />
                  </div>
                  <h4 className="font-black text-slate-900 text-base mb-1 font-urdu">فقہ و افتاء</h4>
                  <p className="text-xs text-slate-500 font-urdu">اصولِ شریعت و فتاویٰ</p>
                </div>

                <div className="bg-emerald-900 text-white p-5 md:p-6 border border-emerald-950 shadow-md rounded-2xl transition-all">
                  <div className="w-12 h-12 mx-auto bg-white/10 text-emerald-300 rounded-xl flex items-center justify-center mb-3">
                    <GraduationCap size={24} />
                  </div>
                  <h4 className="font-black text-white text-base mb-1 font-urdu">عقائد و کلام</h4>
                  <p className="text-xs text-emerald-200 font-urdu">تحفظِ عقائدِ اہلِ سنت</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- ACADEMIC DEPARTMENTS --- */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto text-right">
            <div className="mb-12 max-w-2xl">
              <span className="text-xs md:text-sm font-semibold tracking-wide inline-block mb-2 px-3 py-1 rounded-md text-emerald-800 bg-emerald-100/60 border border-emerald-200 font-urdu">
                شعبہ جاتی تقسیم
              </span>
              <h2 className="text-3xl md:text-4xl font-black mb-3 text-slate-900 font-urdu leading-relaxed">
                تخصصی تعلیمی شعبہ جات
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-urdu">
                علومِ اسلامیہ کے تمام شعبوں میں گہری، منظم اور اعلیٰ معیار کی تدریس کو یقینی بنانے کے لیے شعبہ جات قائم کیے گئے ہیں۔
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { 
                  title: 'شعبۂ علومِ قرآن و تجوید', 
                  desc: 'حفظِ قرآن، مخارج و صفات کی درستی، قراءتِ سبعہ و عشرہ اور تفہیمِ قرآن کی تخصصی تدریس۔', 
                  icon: <BookOpen size={28} /> 
                },
                { 
                  title: 'شعبۂ حدیث و سنتِ نبوی', 
                  desc: 'صحاحِ ستہ کی امہات الکتب، اصولِ حدیث، علمِ درایت و روایت اور سیرتِ طیبہ کا گہرا مطالعہ۔', 
                  icon: <Award size={28} /> 
                },
                { 
                  title: 'دار الافتاء و فقہِ اسلامی', 
                  desc: 'فقہِ حنفی، تقابلی فقہ، اصولِ افتاء اور عصرِ حاضر کے جدید معاشی و معاشرتی مسائل کا شرعی حل۔', 
                  icon: <GraduationCap size={28} /> 
                }
              ].map((dept, idx) => (
                <div key={idx} className="bg-white border border-slate-200/80 shadow-2xs hover:shadow-xl p-6 md:p-8 flex flex-col justify-between rounded-2xl transition-all duration-300 hover:-translate-y-1">
                  <div>
                    <div className="mb-4 w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {dept.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 font-urdu leading-snug">{dept.title}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-urdu mb-6">{dept.desc}</p>
                  </div>
                  <Link href="/courses" className="font-bold text-xs sm:text-sm text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 font-urdu mt-auto">
                    <span>کورسز و پروگرامز دیکھیں</span>
                    <ChevronLeft size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- OPPORTUNITIES / JOIN FACULTY --- */}
        <section className="py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 bg-slate-50 p-8 sm:p-12 border border-slate-200/80 shadow-2xs rounded-3xl text-right">
            <div className="flex-1">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100/60 px-3 py-1 rounded-md mb-3 inline-block font-urdu">
                علمی خدمات میں شمولیت
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mb-3 text-slate-900 font-urdu leading-relaxed">
                جامعہ کے تدریسی قافلے میں شمولیت
              </h2>
              <p className="text-slate-600 text-sm md:text-base mb-6 font-urdu leading-relaxed">
                جامعہ شیرِ ربانی ایسے جید علماء اور اساتذہ کرام کا ہمیشہ خیر مقدم کرتی ہے جو طلبہ کی اخلاقی، علمی اور روحانی تربیت کا جذبہ رکھتے ہوں۔
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-7 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all font-urdu text-sm md:text-base gap-1.5"
              >
                <span>ہم سے رابطہ کریں</span>
                <ChevronLeft size={16} />
              </Link>
            </div>
            
            <div className="w-full lg:w-2/5 aspect-[16/10] relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm shrink-0">
               <OptimizedImage 
                src="/images/WhatsApp.jpeg" 
                fill
                section="campus"
                className="object-cover" 
                alt="تدریسی خدمات جامعہ شیرِ ربانی"
              />
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}
