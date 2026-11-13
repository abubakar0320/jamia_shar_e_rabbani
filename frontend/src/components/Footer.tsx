import Link from 'next/link';
import Image from 'next/image';
import {
  PhoneCall,
  MessageCircle, 
  Send, 
  Video, 
  Users, 
  ExternalLink, 
  ShieldCheck, 
  Code2, 
  Landmark,
} from 'lucide-react';
import FooterCopyButton from '@/components/FooterCopyButton';

interface OfficialAffiliation {
  nameUrdu: string;
  nameSub: string;
  image: string;
  href: string;
  title: string;
}

const Footer = () => {

  // Official Affiliated & National Entities with verified official links
  const officialAffiliations: OfficialAffiliation[] = [
    {
      nameUrdu: 'وفاق المدارس الاسلامیہ الرضویہ',
      nameSub: 'wafaq.edu.pk',
      image: '/images/optimized/wafaq-logo.webp',
      href: 'https://wafaq.edu.pk',
      title: 'وفاق المدارس الاسلامیہ الرضویہ پاکستان - آفیشل پورٹل',
    },
    {
      nameUrdu: 'حکومتِ پاکستان',
      nameSub: 'pakistan.gov.pk',
      image: '/images/optimized/gov-logo.webp',
      href: 'https://pakistan.gov.pk',
      title: 'حکومتِ پاکستان - آفیشل پورٹل',
    },
    {
      nameUrdu: 'حکومتِ پنجاب',
      nameSub: 'punjab.gov.pk',
      image: '/images/optimized/punjab-logo.webp',
      href: 'https://punjab.gov.pk',
      title: 'حکومتِ پنجاب - آفیشل پورٹل',
    },
    {
      nameUrdu: 'ہائر ایجوکیشن کمیشن (HEC)',
      nameSub: 'hec.gov.pk',
      image: '/images/optimized/hec-logo.webp',
      href: 'https://hec.gov.pk',
      title: 'ہائر ایجوکیشن کمیشن پاکستان - آفیشل پورٹل',
    },
    {
      nameUrdu: 'پنجاب پبلک سروس کمیشن (PPSC)',
      nameSub: 'ppsc.gop.pk',
      image: '/images/optimized/ppsc-logo.webp',
      href: 'https://www.ppsc.gop.pk',
      title: 'پنجاب پبلک سروس کمیشن - آفیشل پورٹل (PPSC Official Portal)',
    },
    {
      nameUrdu: 'پاک فوج (Pakistan Army)',
      nameSub: 'pakistanarmy.gov.pk',
      image: '/images/optimized/army-logo.webp',
      href: 'https://pakistanarmy.gov.pk',
      title: 'پاک فوج - آفیشل پورٹل',
    },
  ];

  // Official Accounts for Direct Donations and Financial Support
  const donationAccounts = [
    {
      key: 'nbp',
      bankName: 'نیشنل بینک آف پاکستان (NBP)',
      personTitle: 'ڈاکٹر فاروق علی',
      accountNumber: 'PK19NBPA1985003052969759',
      displayNumber: 'PK19 NBPA 1985 0030 5296 9759',
      badge: 'آئی بی اے این / اکاؤنٹ نمبر',
      accentColor: 'border-emerald-200 bg-emerald-50/70',
      tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    },
    {
      key: 'easypaisa',
      bankName: 'ایزی پیسہ (Easypaisa)',
      personTitle: 'ڈاکٹر فاروق علی',
      accountNumber: '03144081516',
      displayNumber: '0314 4081516',
      badge: 'موبائل والٹ نمبر',
      accentColor: 'border-teal-200 bg-teal-50/70',
      tagColor: 'bg-teal-100 text-teal-900 border-teal-300',
    },
    {
      key: 'meezan',
      bankName: 'میزان بینک (Meezan Bank)',
      personTitle: 'حافظ محمد احمد علی ربانی',
      accountNumber: '98690112101313',
      displayNumber: '9869 0112 1013 13',
      badge: 'بینک اکاؤنٹ نمبر',
      accentColor: 'border-sky-200 bg-sky-50/70',
      tagColor: 'bg-sky-100 text-sky-900 border-sky-300',
    },
  ];

  const footerSections = [
    {
      title: 'تعلیمی شعبہ جات',
      headingColor: '#10b981', // Emerald
      links: [
        { label: 'تمام کورسز و شعبہ جات', href: '/courses' },
        { label: 'علمی و تحقیقی مضامین (۲۰ مضامین)', href: '/articles' },
        { label: 'حفظ القرآن الکریم مع تجوید', href: '/courses' },
        { label: 'درسِ نظامی (عالم و فاضل کورس)', href: '/courses' },
        { label: 'معزز اساتذہ کرام', href: '/faculty' },
        { label: 'سید زادے و مشائخِ عظام', href: '/syed-zady' },
        { label: 'نتائج وفاق المدارس الاسلامیہ الرضویہ', href: '/wafaq-results' },
      ],
    },
    {
      title: 'داخلہ و سہولیات',
      headingColor: '#0284c7', // Sky Blue
      links: [
        { label: 'آن لائن داخلہ فارم', href: '/admissions' },
        { label: '100% مفت تعلیم و ہاسٹل', href: '/admissions' },
        { label: 'آن لائن رول نمبر سلپ', href: '/roll-number-slip' },
        { label: 'انٹرن شپ پروگرام', href: '/internship' },
        { label: 'پنجاب پبلک سروس کمیشن (PPSC)', href: 'https://www.ppsc.gop.pk' },
        { label: 'جامعہ کی تاریخ و تعارف', href: '/about' },
        { label: 'مستحق طلبہ کی کفالت', href: '/donations' },
      ],
    },
    {
      title: 'میڈیا و اعلانات',
      headingColor: '#f59e0b', // Amber Orange
      links: [
        { label: 'تصویری گیلری (Campus Gallery)', href: '/gallery' },
        { label: 'تازہ ترین خبریں و تقاریب', href: '/news' },
        { label: 'علمی مقالات و کالمز', href: '/articles' },
        { label: 'سالانہ دستارِ فضیلت کانفرنس', href: '/news' },
        { label: 'پریس ریلیز و بیانات', href: '/news' },
        { label: 'تعلیمی اسناد و ریکارڈز', href: '/records' },
      ],
    },
    {
      title: 'عطیات و رابطہ',
      headingColor: '#e11d48', // Rose Red
      links: [
        { label: 'آن لائن عطیات و صدقات', href: '/donations' },
        { label: 'زکوٰۃ و امداد فنڈ', href: '/donations' },
        { label: 'ہم سے رابطہ کریں', href: '/contact' },
        { label: 'آئی ٹی ڈویلپر پورٹل', href: '/developer' },
        { label: 'اسٹاف / ایڈمن لاگ ان', href: '/admin' },
      ],
    },
  ];

  return (
    <footer 
      className="bg-white text-slate-700 font-sans mt-auto selection:bg-emerald-500/20 border-t-4 border-transparent shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] print:hidden" 
      style={{ borderImage: "linear-gradient(to right, #059669, #0d9488, #d97706) 1" }}
      dir="rtl"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-10">
        
        {/* Brand & Social Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 border-b border-slate-200 pb-8">
          <div className="flex flex-col">
            <Link href="/" prefetch={false} className="flex items-center mb-2.5 group gap-3.5">
              <Image 
                src="/images/optimized/logo-icon.webp" 
                alt="لوگو جامعہ شیرِ ربانی" 
                width={52} 
                height={52} 
                className="rounded-full shadow-md border-2 border-emerald-100 object-cover"
              />
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-black text-emerald-800 tracking-tight leading-none transition-all group-hover:text-emerald-700 font-urdu">
                  جامعہ شیرِ ربانی مانانوالہ
                </span>
                <span className="text-[11px] md:text-xs font-bold text-slate-500 tracking-normal leading-tight mt-1 font-urdu">
                  دینی و عصری علوم کا مستند تعلیمی مرکز • مانانوالہ، ضلع شیخوپورہ
                </span>
              </div>
            </Link>
            <p className="max-w-xl text-slate-600 text-xs sm:text-sm leading-[2.2] font-urdu">
              دینی و اسلامی علوم کی حفاظت، قرآن و سنت کی ترویج اور نسلِ نو کی اخلاقی و روحانی آبیاری کے لیے وقف عظیم اسلامی ادارہ۔
            </p>
          </div>
          
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-bold text-slate-700 font-urdu">سوشل میڈیا پر ہمارے ساتھ جڑیں</span>
            <div className="flex gap-2">
              {[
                { icon: MessageCircle, href: '/contact', color: 'hover:bg-emerald-600 hover:border-emerald-600', label: 'واٹس ایپ' },
                { icon: Send, href: '/contact', color: 'hover:bg-teal-600 hover:border-teal-600', label: 'ٹیلی گرام' },
                { icon: Video, href: '/contact', color: 'hover:bg-rose-600 hover:border-rose-600', label: 'یوٹیوب' },
                { icon: Users, href: '/contact', color: 'hover:bg-blue-600 hover:border-blue-600', label: 'فیس بک' },
              ].map((item, i) => {
                const IconComponent = item.icon;
                return (
                  <Link 
                    key={i} 
                    href={item.href} 
                    aria-label={item.label}
                    className={`w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 transition-all transform hover:-translate-y-1 hover:shadow-md hover:text-white ${item.color}`}
                  >
                    <IconComponent size={16} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Links Grid with Bold Colored Lines */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10 text-right">
          {footerSections.map((section, i) => (
            <div key={i} className="flex flex-col">
              {/* Column Heading */}
              <h3 className="text-sm md:text-base font-bold text-slate-900 pb-1.5 font-urdu">
                {section.title}
              </h3>
              {/* Full Width Bold Colored Bar under Column Heading */}
              <span 
                className="h-[3.5px] w-full rounded-full mb-3.5 shadow-2xs block" 
                style={{ backgroundColor: section.headingColor }}
              />

              {/* Column Links with Bold Black Bar shown ONLY on hover */}
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link, j) => {
                  const isExternal = link.href.startsWith('http');
                  return (
                    <li key={j}>
                      {isExternal ? (
                        <a 
                          href={link.href} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex flex-col text-xs sm:text-sm text-slate-800 hover:text-black font-semibold transition-all font-urdu w-fit"
                        >
                          <span className="leading-tight pb-0.5 group-hover:translate-x-[-2px] transition-transform inline-flex items-center gap-1">
                            <span>{link.label}</span>
                            <ExternalLink size={10} className="text-slate-400 group-hover:text-emerald-700 shrink-0" />
                          </span>
                          <span className="h-[2.5px] w-0 group-hover:w-full rounded-full bg-slate-900 transition-all duration-300 ease-out block opacity-0 group-hover:opacity-100" />
                        </a>
                      ) : (
                        <Link 
                          href={link.href} 
                          prefetch={false}
                          className="group inline-flex flex-col text-xs sm:text-sm text-slate-800 hover:text-black font-semibold transition-all font-urdu w-fit"
                        >
                          <span className="leading-tight pb-0.5 group-hover:translate-x-[-2px] transition-transform">
                            {link.label}
                          </span>
                          <span className="h-[2.5px] w-0 group-hover:w-full rounded-full bg-slate-900 transition-all duration-300 ease-out block opacity-0 group-hover:opacity-100" />
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Official Affiliation & National Portals Logos Section */}
        <div className="mb-10 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-emerald-700 w-5 h-5 shrink-0" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900 font-urdu">
                قومی الحاق و باضابطہ آفیشل پورٹلز
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-urdu">
              جامعہ شیرِ ربانی وفاق المدارس الاسلامیہ الرضویہ پاکستان سے باقاعدہ الحاق شدہ اور ملکی تعلیمی اصولوں پر عمل پیرا ہے۔
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {officialAffiliations.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                title={item.title}
                className="group flex flex-col items-center justify-between text-center p-3.5 sm:p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 transition-all duration-200 shadow-2xs hover:shadow-sm transform hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-xl bg-white p-1.5 border border-slate-200/90 shadow-2xs flex items-center justify-center shrink-0 group-hover:border-emerald-300 mb-2.5 transition-colors">
                  <Image
                    src={item.image}
                    alt={item.nameUrdu}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col items-center flex-1 justify-center w-full">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-900 transition-colors font-urdu leading-[1.8] block px-1 text-center">
                    {item.nameUrdu}
                  </span>
                  <span 
                    className="inline-flex items-center justify-center gap-1 text-[11px] text-slate-500 group-hover:text-emerald-700 font-sans font-medium mt-1 transition-colors" 
                    dir="ltr"
                  >
                    <span>{item.nameSub}</span>
                    <ExternalLink size={11} className="text-slate-400 group-hover:text-emerald-600 shrink-0" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Official Donation Bank Accounts Section (الحاق کے نیچے) */}
        <div className="mb-10 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-5">
            <div className="flex items-center gap-2">
              <Landmark className="text-emerald-700 w-5 h-5 shrink-0" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900 font-urdu">
                عطیات، زکوٰۃ و مالی تعاون کے باضابطہ اکاؤنٹس
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-xs text-slate-500 font-urdu hidden sm:block">
                جامعہ کے دینی و تعلیمی شعبہ جات کے تعاون کے لیے براہِ راست بینک اکاؤنٹ یا ایزی پیسہ میں فنڈز منتقل فرما سکتے ہیں۔
              </p>
              <Link 
                href="/donations" 
                prefetch={false}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline font-urdu shrink-0"
              >
                عطیات پورٹل وزٹ کریں ←
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {donationAccounts.map((acc) => (
              <div
                key={acc.key}
                className={`rounded-2xl p-4 border transition-all duration-200 shadow-2xs hover:shadow-sm flex flex-col justify-between ${acc.accentColor}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${acc.tagColor} font-urdu`}>
                      {acc.bankName}
                    </span>
                    <span className="text-[10px] text-slate-500 font-urdu">
                      {acc.badge}
                    </span>
                  </div>

                  <div className="mb-3">
                    <span className="text-[11px] text-slate-600 font-urdu block">اکاؤنٹ ٹائٹل:</span>
                    <span className="text-sm sm:text-base font-black text-slate-900 font-urdu">
                      {acc.personTitle}
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-2.5 border border-slate-200 shadow-2xs flex items-center justify-between gap-2">
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[9px] text-slate-600 font-urdu">نمبر:</span>
                    <span 
                      className="font-mono text-xs sm:text-sm font-black text-slate-900 tracking-wider truncate" 
                      dir="ltr"
                    >
                      {acc.displayNumber}
                    </span>
                  </div>

                  <FooterCopyButton
                    text={acc.accountNumber}
                    title="اکاؤنٹ نمبر کاپی کریں"
                    idleLabel="کاپی کریں"
                    copiedLabel="کاپی ہو گیا!"
                    variant="default"
                    tone="emerald"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

                {/* Official Direct Contact Numbers Section (براہِ راست انتظامی رابطہ نمبرز) */}
        <div className="mb-10 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-5">
            <div className="flex items-center gap-2">
              <PhoneCall className="text-emerald-700 w-5 h-5 shrink-0" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900 font-urdu">
                براہِ راست دفتری و انتظامی رابطہ نمبرز (Official Direct Contact Numbers)
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-urdu">
              داخلہ، تعلیمی رہنمائی، انتظامی امور یا مالی تعاون کے لیے درج ذیل ذمہ داران سے رابطہ کیا جا سکتا ہے:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Contact 1: Hafiz Ahmad Ali */}
            <div className="rounded-2xl p-4 border border-emerald-200 bg-emerald-50/60 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-urdu">
                    کنٹرولر امتحانات و ناظمِ تعلیمات
                  </span>
                  <span className="text-[10px] text-emerald-700 font-urdu font-bold">
                    WhatsApp
                  </span>
                </div>
                <div className="mb-3">
                  <span className="text-[11px] text-slate-500 font-urdu block">نام و عہدہ:</span>
                  <span className="text-sm sm:text-base font-black text-slate-900 font-urdu">
                    اسلامک اسکالر حافظ القاری محمد احمد ربانی صاحب
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-2.5 border border-emerald-200 shadow-2xs flex items-center justify-between gap-2">
                <a 
                  href="tel:+966540532511" 
                  className="font-mono text-xs sm:text-sm font-black text-emerald-900 hover:text-emerald-700 transition-colors tracking-wider" 
                  dir="ltr"
                >
                  +966 54 053 2511
                </a>

                <div className="flex items-center gap-1.5">
                  <a
                    href="https://wa.me/966540532511"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-600 hover:text-white text-emerald-800 transition-colors"
                    title="واٹس ایپ پر میسج کریں"
                  >
                    <MessageCircle size={14} />
                  </a>
                  <FooterCopyButton
                    text="+966540532511"
                    title="نمبر کاپی کریں"
                    idleLabel="کاپی"
                    copiedLabel="کاپی!"
                    tone="emerald"
                  />
                </div>
              </div>
            </div>

            {/* Contact 2: Dr. Farooq Ali */}
            <div className="rounded-2xl p-4 border border-teal-200 bg-teal-50/60 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900 border border-teal-300 font-urdu">
                    وائس چانسلر و ڈینِ فیکلٹی
                  </span>
                  <span className="text-[10px] text-teal-700 font-urdu font-bold">
                    کال و واٹس ایپ
                  </span>
                </div>
                <div className="mb-3">
                  <span className="text-[11px] text-slate-500 font-urdu block">نام و عہدہ:</span>
                  <span className="text-sm sm:text-base font-black text-slate-900 font-urdu">
                    ڈاکٹر پیر ابو احمد فاروق علی ربانی صاحب
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-2.5 border border-teal-200 shadow-2xs flex items-center justify-between gap-2">
                <a 
                  href="tel:03144081516" 
                  className="font-mono text-xs sm:text-sm font-black text-teal-900 hover:text-teal-700 transition-colors tracking-wider" 
                  dir="ltr"
                >
                  0314 4081516
                </a>

                <div className="flex items-center gap-1.5">
                  <a
                    href="https://wa.me/923144081516"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-teal-100 hover:bg-teal-600 hover:text-white text-teal-800 transition-colors"
                    title="واٹس ایپ پر میسج کریں"
                  >
                    <MessageCircle size={14} />
                  </a>
                  <FooterCopyButton
                    text="03144081516"
                    title="نمبر کاپی کریں"
                    idleLabel="کاپی"
                    copiedLabel="کاپی!"
                    tone="teal"
                  />
                </div>
              </div>
            </div>

            {/* Contact 3: Abubakar Siddique */}
            <div className="rounded-2xl p-4 border border-sky-200 bg-sky-50/60 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-900 border border-sky-300 font-urdu">
                    رجسٹرار، خزانچی و ہیڈ آف ڈیپارٹمنٹس فار آل
                  </span>
                  <span className="text-[10px] text-sky-700 font-urdu font-bold">
                    آن لائن داخلہ و تکنیکی معاونت
                  </span>
                </div>
                <div className="mb-3">
                  <span className="text-[11px] text-slate-500 font-urdu block">نام و عہدہ:</span>
                  <span className="text-sm sm:text-base font-black text-slate-900 font-urdu">
                    پروفیسر ابوبکر صدیق ربانی صاحب
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-2.5 border border-sky-200 shadow-2xs flex items-center justify-between gap-2">
                <a 
                  href="tel:03097354874" 
                  className="font-mono text-xs sm:text-sm font-black text-sky-900 hover:text-sky-700 transition-colors tracking-wider" 
                  dir="ltr"
                >
                  0309 7354874
                </a>

                <div className="flex items-center gap-1.5">
                  <a
                    href="https://wa.me/923097354874"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-sky-100 hover:bg-sky-600 hover:text-white text-sky-800 transition-colors"
                    title="واٹس ایپ پر میسج کریں"
                  >
                    <MessageCircle size={14} />
                  </a>
                  <FooterCopyButton
                    text="03097354874"
                    title="نمبر کاپی کریں"
                    idleLabel="کاپی"
                    copiedLabel="کاپی!"
                    tone="sky"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

{/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-slate-200 gap-3.5 text-xs text-slate-500 font-urdu">
          <div suppressHydrationWarning>
            © {new Date().getFullYear()} جامعہ شیرِ ربانی مانانوالہ، ضلع شیخوپورہ، پنجاب، پاکستان۔ جملہ حقوق محفوظ ہیں۔
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-3 text-slate-600">
            <span className="inline-flex items-center gap-1.5 text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <ShieldCheck size={14} className="text-emerald-600" />
              وفاق المدارس الاسلامیہ الرضویہ سے باقاعدہ الحاق شدہ
            </span>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <Link 
              href="/developer" 
              prefetch={false}
              className="inline-flex items-center gap-1.5 text-slate-700 hover:text-emerald-800 font-bold transition-colors bg-slate-50 hover:bg-emerald-50 px-2.5 py-1 rounded-full border border-slate-200 hover:border-emerald-300 group"
            >
              <Code2 size={14} className="text-emerald-600 group-hover:rotate-12 transition-transform" />
              <span>ڈویلپر: پروفیسر ابوبکر صدیق ربانی صاحب (رجسٹرار و آئی ٹی ہیڈ)</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
