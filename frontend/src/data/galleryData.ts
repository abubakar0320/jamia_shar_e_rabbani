export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'campus' | 'events' | 'classes' | 'programs' | 'gatherings' | 'faculty';
  categoryLabel: string;
  image: string;
  description: string;
  tag: string;
  year?: string;
  badgeColor?: string;
}

export interface GalleryCategory {
  id: 'all' | 'campus' | 'events' | 'classes' | 'programs' | 'gatherings' | 'faculty';
  label: string;
  iconName: string;
  count?: number;
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  { id: 'all', label: 'تمام تصاویر (All Photos)', iconName: 'Sparkles' },
  { id: 'campus', label: 'مرکزی کیمپس و عمارات', iconName: 'Building2' },
  { id: 'events', label: 'سالانہ کانووکیشن و تقاریب', iconName: 'Award' },
  { id: 'classes', label: 'کلاس رومز و علمی مطالعہ', iconName: 'BookOpen' },
  { id: 'programs', label: 'شعبہ جات و اختصاصات', iconName: 'GraduationCap' },
  { id: 'gatherings', label: 'روحانی محافل و میلاد', iconName: 'HeartHandshake' },
  { id: 'faculty', label: 'ادارتی قیادت و اساتذہ', iconName: 'Users' },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  // --- CAMPUS & ARCHITECTURE ---
  {
    id: 'campus-facade',
    title: 'جامعہ شیرِ ربانی کی مرکزی عمارت و فرنٹ منظر',
    category: 'campus',
    categoryLabel: 'مرکزی کیمپس و عمارات',
    image: '/images/hero section 1.jpeg',
    description: 'جامعہ شیرِ ربانی مانانوالہ، ضلع شیخوپورہ کی مرکزی عمارت کا خوبصورت بیرونی منظر جس میں دیدہ زیب سبزہ زار، کشادہ برآمدے اور پرسکون اسلامی ماحول عیاں ہے۔',
    tag: 'مرکزی کیمپس',
    year: '2024-25',
    badgeColor: 'bg-emerald-600 text-white'
  },
  {
    id: 'campus-gate',
    title: 'جامعہ کا مرکزی گیٹ اور سرسبز احاطہ',
    category: 'campus',
    categoryLabel: 'مرکزی کیمپس و عمارات',
    image: '/images/hero section 2.jpeg',
    description: 'مرکزی شاہراہ پر واقع خوبصورت باوقار گیٹ اور سرسبز لان، جہاں روزانہ سینکڑوں طلبہ حصولِ علم کے لیے تشریف لاتے ہیں۔',
    tag: 'مین گیٹ',
    year: '2024-25',
    badgeColor: 'bg-teal-600 text-white'
  },
  {
    id: 'campus-fountain',
    title: 'جدید تعلیمی بلاک و فوارہ کا دلکش نظارہ',
    category: 'campus',
    categoryLabel: 'مرکزی کیمپس و عمارات',
    image: '/images/hero section 6.jpeg',
    description: 'جدید طرزِ تعمیر سے آراستہ تعلیمی بلاک، فوارہ اور روشنیوں سے مزین کیمپس کا رات کا روح پرور اور دیدہ زیب منظر۔',
    tag: 'تعلیمی بلاک',
    year: '2024-25',
    badgeColor: 'bg-cyan-700 text-white'
  },
  {
    id: 'campus-reception',
    title: 'جامعہ کا استقبالیہ و بیرونی مرکزی گیٹ',
    category: 'campus',
    categoryLabel: 'مرکزی کیمپس و عمارات',
    image: '/contact_hero.jpg',
    description: 'جامعہ شیرِ ربانی کا مرکزی استقبالیہ گیٹ جہاں زائرین، معزز مہمانان اور طلبہ کا پرخلوص استقبال کیا جاتا ہے۔',
    tag: 'استقبالیہ',
    year: '2024-25',
    badgeColor: 'bg-slate-700 text-white'
  },
  {
    id: 'campus-hostel',
    title: 'طلبہ ہاسٹل و اقامتی رہائش کی سہولیات',
    category: 'campus',
    categoryLabel: 'مرکزی کیمپس و عمارات',
    image: '/images/hero section 7.jpeg',
    description: 'دور دراز کے شہروں اور دیہاتوں سے آنے والے طلبہ کے لیے ۱۰۰٪ مفت معیاری رہائش، آرام دہ کمرے اور حفظانِ صحت کے مطابق طعام۔',
    tag: 'اقامتی بلاک',
    year: '2024-25',
    badgeColor: 'bg-amber-600 text-white'
  },
  {
    id: 'campus-admission',
    title: 'شعبہ داخلہ و طلبہ رہنمائی کاؤنٹر',
    category: 'campus',
    categoryLabel: 'مرکزی کیمپس و عمارات',
    image: '/images/admission.jpeg',
    description: 'سالانہ داخلہ مہم کے دوران فارمز کی وصولی، کوائف کی جانچ پڑتال اور طلبہ کی تعلیمی و نصابی رہنمائی کا متحرک ڈیسک۔',
    tag: 'داخلہ دفتر',
    year: '2024-25',
    badgeColor: 'bg-blue-600 text-white'
  },
  {
    id: 'campus-night-ambiance',
    title: 'جامعہ کے سبزہ زار کا شام کا دلکش ماحول',
    category: 'campus',
    categoryLabel: 'مرکزی کیمپس و عمارات',
    image: '/images/WhatsApp2.jpeg',
    description: 'غروبِ آفتاب کے وقت جامعہ کے سرسبز لان اور عمارت کا پرسکون ماحول جو طلبہ کے ذہن کو تازگی اور یکسوئی بخشتا ہے۔',
    tag: 'پرسکون ماحول',
    year: '2024-25',
    badgeColor: 'bg-emerald-700 text-white'
  },
  {
    id: 'campus-monogram',
    title: 'جامعہ شیرِ ربانی آفیشل نشان و مونوگرام',
    category: 'campus',
    categoryLabel: 'مرکزی کیمپس و عمارات',
    image: '/logo.jpeg',
    description: 'جامعہ شیرِ ربانی کا باضابطہ مونوگرام جو قرآن و سنت کی روشنی، علمی تحقیق اور روحانی فیضان کی علامت ہے۔',
    tag: 'آفیشل مونوگرام',
    year: 'آفیشل لوگو',
    badgeColor: 'bg-emerald-800 text-amber-300'
  },

  // --- ANNUAL CONVOCATIONS & EVENTS ---
  {
    id: 'event-convocation-hall',
    title: 'سالانہ عظیم الشان کانووکیشن و دستارِ فضیلت کانفرنس',
    category: 'events',
    categoryLabel: 'سالانہ کانووکیشن و تقاریب',
    image: '/images/hero section 4.jpeg',
    description: 'فارغ التحصیل علماء اور حفاظِ کرام کے اعزاز میں سالانہ دستارِ فضیلت کانفرنس کا پرشکوہ اجتماع جس میں ملک بھر کے جید علماء نے شرکت فرمائی۔',
    tag: 'دستارِ فضیلت',
    year: 'سالانہ کانفرنس',
    badgeColor: 'bg-purple-700 text-white'
  },
  {
    id: 'event-dastar-ceremony',
    title: 'فارغینِ درسِ نظامی کے سروں پر دستار بندی کا روح پرور منظر',
    category: 'events',
    categoryLabel: 'سالانہ کانووکیشن و تقاریب',
    image: '/images/hero section 5.jpeg',
    description: 'جامعہ کے باصلاحیت فارغ التحصیل علماء کرام کو جید مشائخ اور اساتذہ کے دستِ مبارک سے دستار اور علمی اسناد دینے کا پُروقار لمحہ۔',
    tag: 'دستار بندی',
    year: 'سالانہ کانفرنس',
    badgeColor: 'bg-indigo-700 text-white'
  },
  {
    id: 'event-awards',
    title: 'تقریبِ تقسیمِ اسناد، شیلڈز و اعزازی میڈلز',
    category: 'events',
    categoryLabel: 'سالانہ کانووکیشن و تقاریب',
    image: '/images/3.jpeg',
    description: 'امتحانات میں امتیازی پوزیشنز حاصل کرنے والے نمایاں طلبہ کی حوصلہ افزائی اور یادگاری شیلڈز و انعامات کی باوقار تقریب۔',
    tag: 'تقسیمِ انعامات',
    year: 'سالانہ تقریب',
    badgeColor: 'bg-amber-700 text-white'
  },
  {
    id: 'event-speeches',
    title: 'جید علماء کرام و نامور محققین کا کلیدی خطاب',
    category: 'events',
    categoryLabel: 'سالانہ کانووکیشن و تقاریب',
    image: '/images/4.jpeg',
    description: 'جامعہ کے سالانہ سیمینار میں بین الاقوامی سطح کے اسلامی اسکالرز کا امتِ مسلمہ کے اتحاد اور عصرِ حاضر کے تقاضوں پر جامع خطابات۔',
    tag: 'علمی خطابات',
    year: 'سالانہ کانفرنس',
    badgeColor: 'bg-rose-700 text-white'
  },
  {
    id: 'event-council-meeting',
    title: 'مجلسِ شوریٰ و اساتذہ کا اعلیٰ مشاورتی اجلاس',
    category: 'events',
    categoryLabel: 'سالانہ کانووکیشن و تقاریب',
    image: '/images/news.jpeg',
    description: 'تعلیمی پالیسیوں، سالانہ امتحانی نظام اور طلبہ کی ہمہ جہت تربیت کے لیے انتظامیہ اور اساتذہ کا باہمی فکری اجلاس۔',
    tag: 'شوریٰ اجلاس',
    year: 'تعلیمی سیشن',
    badgeColor: 'bg-sky-700 text-white'
  },

  // --- SPIRITUAL GATHERINGS & MILAD ---
  {
    id: 'gatherings-milad',
    title: 'سالانہ جشنِ میلاد النبی ﷺ و محفلِ ذکر و نعت',
    category: 'gatherings',
    categoryLabel: 'روحانی محافل و میلاد',
    image: '/images/mahfil2.jpeg',
    description: 'سرورِ کائنات حضرت محمد مصطفیٰ ﷺ کی ولادتِ باسعادت کی خوشی میں جامعہ کے سبزہ زار میں منعقدہ سالانہ محفل جس میں ہزاروں عشاق نے شرکت کی۔',
    tag: 'محفلِ میلاد',
    year: 'ماہِ ربیع الاول',
    badgeColor: 'bg-emerald-600 text-white'
  },
  {
    id: 'gatherings-tasawwuf',
    title: 'ماہانہ روحانی نشست و درسِ اخلاق و تزکیہ',
    category: 'gatherings',
    categoryLabel: 'روحانی محافل و میلاد',
    image: '/images/WhatsApp 1.jpeg',
    description: 'طلبہ کے باطن کو منور کرنے اور سنتِ نبوی کے عملی نفاذ کے لیے اولیاء اللہ کے ارشادات پر مبنی ماہانہ تزکیہ نفس کی نشست۔',
    tag: 'تزکیہ و تصوف',
    year: 'ماہانہ تربیتی نشست',
    badgeColor: 'bg-teal-700 text-white'
  },

  // --- CLASSROOMS & STUDENT LIFE ---
  {
    id: 'classes-dars-nizami',
    title: 'درسِ نظامی کی کلاس روم و فقہی و کلامی مباحثہ',
    category: 'classes',
    categoryLabel: 'کلاس رومز و علمی مطالعہ',
    image: '/images/1.jpeg',
    description: 'شعبہ درسِ نظامی کے طلبہ فقہ، اصولِ فقہ اور نحو و صرف کے دقیق مسائل کا حل استادِ محترم کی رہنمائی میں تلاش کرتے ہوئے۔',
    tag: 'درسِ نظامی کلاس',
    year: 'روزمرہ تدریس',
    badgeColor: 'bg-emerald-700 text-white'
  },
  {
    id: 'classes-hifz-recitation',
    title: 'شعبہ حفظِ قرآن میں طلبہ کی تلاوت و دہرائی',
    category: 'classes',
    categoryLabel: 'کلاس رومز و علمی مطالعہ',
    image: '/images/2.jpeg',
    description: 'صبح کی منور ساعتوں میں چھوٹے معصوم طلبہ کا اپنے استاد کے سامنے حفظ کردہ اسباق اور منزل سنانے کا پرکیف نظارہ۔',
    tag: 'حفظِ قرآن',
    year: 'حفظ کلاس',
    badgeColor: 'bg-teal-600 text-white'
  },
  {
    id: 'classes-group-study',
    title: 'طلبہ کا باہمی علمی تکرار و گروپ مطالعہ',
    category: 'classes',
    categoryLabel: 'کلاس رومز و علمی مطالعہ',
    image: '/images/a.jpeg',
    description: 'قدیم روایتی طریقہ تدریس کے مطابق طلبہ عصر کے بعد آپس میں مل بیٹھ کر روزانہ کے اسباق کو دہراتے اور علمی اشکالات حل کرتے ہیں۔',
    tag: 'علمی تکرار',
    year: 'شام کا مطالعہ',
    badgeColor: 'bg-indigo-600 text-white'
  },
  {
    id: 'classes-tajweed-practice',
    title: 'شعبہ حسنِ صوت و تجویدی قواعد کی عملی مشق',
    category: 'classes',
    categoryLabel: 'کلاس رومز و علمی مطالعہ',
    image: '/images/b.jpeg',
    description: 'حروف کے مخارج، غنہ، مدات اور ترتیل کے اصولوں پر قراءت کا پریکٹیکل تربیتی سیشن۔',
    tag: 'تجوید پریکٹس',
    year: 'روزمرہ مشق',
    badgeColor: 'bg-cyan-600 text-white'
  },
  {
    id: 'classes-library-research',
    title: 'مرکزی کتب خانہ و تحقیقی مطالعہ ہال',
    category: 'classes',
    categoryLabel: 'کلاس رومز و علمی مطالعہ',
    image: '/images/c.jpeg',
    description: 'جامعہ کے ریسرچ ہال میں کتبِ تفاسیر اور شروحات سے استفادہ کرتے ہوئے محقق طلبہ کا علمی ذوق۔',
    tag: 'ریسرچ لائبریری',
    year: 'کتب خانہ',
    badgeColor: 'bg-amber-700 text-white'
  },
  {
    id: 'classes-corridor-view',
    title: 'تجوید و قرات ہال اور تعلیمی راہداری',
    category: 'classes',
    categoryLabel: 'کلاس رومز و علمی مطالعہ',
    image: '/images/hero section 3.jpeg',
    description: 'تدریسی ہال کے سامنے طلبہ کے مطالعہ کی کشادہ گیلری جہاں یکسوئی کے ساتھ کتابوں کا گہرا مطالعہ کیا جاتا ہے۔',
    tag: 'تدریسی راہداری',
    year: 'کلاس روم بلاک',
    badgeColor: 'bg-emerald-800 text-white'
  },

  // --- ACADEMIC PROGRAMS & SPECIALIZATIONS ---
  {
    id: 'programs-hifz',
    title: 'شعبہ تحفیظ القرآن الکریم مع تجوید',
    category: 'programs',
    categoryLabel: 'شعبہ جات و اختصاصات',
    image: '/images/hifaz.jpeg',
    description: 'جامعہ کا بنیادی اور روشن ترین شعبہ جس میں مختصر مدت میں طلبہ کو مکمل تجوید کے ساتھ حفظِ کلامِ پاک کروایا جاتا ہے۔',
    tag: 'حفظ شعبہ',
    year: '۳ سالہ کورس',
    badgeColor: 'bg-emerald-600 text-white'
  },
  {
    id: 'programs-tajweed',
    title: 'شعبہ حسنِ قرات و فنِ تجوید (حفص و سبعہ)',
    category: 'programs',
    categoryLabel: 'شعبہ جات و اختصاصات',
    image: '/images/tajweed.jpeg',
    description: 'قرآن مجید کو لحنِ داؤدی اور بین الاقوامی مصری و حجازی لب و لہجے میں تلاوت کرنے کی باقاعدہ دو سالہ و تین سالہ تعلیم۔',
    tag: 'تجوید شعبہ',
    year: '۲ سالہ سند',
    badgeColor: 'bg-teal-600 text-white'
  },
  {
    id: 'programs-qirat-course',
    title: 'عالمی حسنِ قرات و فنِ ترتیل تربیتی کورس',
    category: 'programs',
    categoryLabel: 'شعبہ جات و اختصاصات',
    image: '/tajweed-o-qirat.jpg',
    description: 'ملکی اور بین الاقوامی مقابلۂ حسنِ قرات میں شرکت کے لیے طلبہ کی صوتی مقامات اور ادائیگی کی جامع تیاری۔',
    tag: 'فنِ قرات',
    year: 'قرات ڈپلومہ',
    badgeColor: 'bg-sky-600 text-white'
  },
  {
    id: 'programs-hadith',
    title: 'دورۂ حدیث شریف (عالمیہ سیکنڈ ایئر)',
    category: 'programs',
    categoryLabel: 'شعبہ جات و اختصاصات',
    image: '/hadith.jpg',
    description: 'درسِ نظامی کی معراج دورۂ حدیث شریف جس میں صحیح البخاری، صحیح مسلم اور سننِ اربعہ کی مکمل اسناد کے ساتھ تدریس کی جاتی ہے۔',
    tag: 'دورۂ حدیث',
    year: 'ایم اے اسلامیات مساوی',
    badgeColor: 'bg-emerald-800 text-white'
  },
  {
    id: 'programs-takhasus',
    title: 'تخصص فی الفقہ والافتاء (مفتی کورس)',
    category: 'programs',
    categoryLabel: 'شعبہ جات و اختصاصات',
    image: '/takhasus.jpeg',
    description: 'دورۂ حدیث کے بعد دو سالہ اعلیٰ ریسرچ ڈگری جس میں عصرِ حاضر کے مالیاتی، طبی اور معاشرتی مسائل پر فتاویٰ نویسی سکھائی جاتی ہے۔',
    tag: 'افتاء و تحقیق',
    year: '۲ سالہ تخصص',
    badgeColor: 'bg-violet-700 text-white'
  },
  {
    id: 'programs-arabic',
    title: 'عربی زبان و ادبیات (الدراسات العربیۃ)',
    category: 'programs',
    categoryLabel: 'شعبہ جات و اختصاصات',
    image: '/arabic-language.jpg',
    description: 'قرآن و حدیث کی اصل زبان عربی میں روانی سے گفتگو، تحریر اور تقریر کے لیے خصوصی ماڈرن عربک ڈپلومہ۔',
    tag: 'عربی لغت',
    year: '۱ سالہ سرٹیفکیٹ',
    badgeColor: 'bg-blue-700 text-white'
  },

  // --- LEADERSHIP & FACULTY ---
  {
    id: 'faculty-farooq-ali',
    title: 'حضرت علامہ ڈاکٹر محمد فاروق علی ربانی',
    category: 'faculty',
    categoryLabel: 'ادارتی قیادت و اساتذہ',
    image: '/farooq-ali-rabbani.jpeg',
    description: 'سرپرستِ اعلیٰ و بانی جامعہ شیرِ ربانی مانانوالہ، ممتاز عالمِ دین، مصنف، پی ایچ ڈی اسکالر اور بین الاقوامی محقق۔',
    tag: 'بانی و مہتمم اعلیٰ',
    year: 'قیادت',
    badgeColor: 'bg-emerald-900 text-amber-300'
  },
  {
    id: 'faculty-ahmad-ali',
    title: 'حافظ محمد احمد علی ربانی',
    category: 'faculty',
    categoryLabel: 'ادارتی قیادت و اساتذہ',
    image: '/hafiz-ahmad-ali.jpeg',
    description: 'نائب مہتمم و ناظمِ تعلیمات (Director of Education) جامعہ شیرِ ربانی۔ تدریسی شعبہ جات کے نگران، منتظمِ اعلیٰ اور معتمدِ شوریٰ۔',
    tag: 'ناظمِ تعلیمات (Director of Education)',
    year: 'قیادت',
    badgeColor: 'bg-teal-800 text-white'
  },
  {
    id: 'faculty-abubakar',
    title: 'محترم ابوبکر صدیق صاحب',
    category: 'faculty',
    categoryLabel: 'ادارتی قیادت و اساتذہ',
    image: '/abubakar-latest.jpeg',
    description: 'ہیڈ آف انفارمیشن ٹیکنالوجی و سپروائزر آف انٹرن شپ پروگرام۔ جامعہ کے مکمل ڈیجیٹل سسٹم اور جدید ویب پورٹلز کے معمار۔',
    tag: 'ڈائریکٹر آئی ٹی',
    year: 'آئی ٹی قیادت',
    badgeColor: 'bg-blue-800 text-white'
  },
  {
    id: 'faculty-ali-hamza',
    title: 'مولانا مفتی علی حمزہ صاحب',
    category: 'faculty',
    categoryLabel: 'ادارتی قیادت و اساتذہ',
    image: '/ali-hamza.jpeg',
    description: 'استاذ الحدیث، شعبہ تدریس و امورِ دینیہ۔ طلبہ کی روحانی تربیت اور درسِ نظامی کے سینئر استاد۔',
    tag: 'استاذ الحدیث',
    year: 'اساتذہ کرام',
    badgeColor: 'bg-purple-800 text-white'
  }
];
