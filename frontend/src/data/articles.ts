export interface ArticleCategory {
  id: string;
  title: string;
  description: string;
  badgeColor: string;
  accentColor: string;
  bgLight: string;
}

export interface AuthorInfo {
  name: string;
  designation: string;
}

export const OFFICIAL_AUTHOR: AuthorInfo = {
  name: "ابوبکر صدیق",
  designation: "آئی ٹی اینڈ سسٹم ایڈمنسٹریٹر، جامعہ شیرِ ربانی",
};

export interface Article {
  id: number;
  title: string;
  slug: string;
  aliases?: string[];
  categoryId: string;
  categoryTitle: string;
  description: string;
  image: string;
  imageAlt?: string;
  status: string;
  featured?: boolean;
  featuredPriority?: number; // 1 for primary, 2 and 3 for secondary
  readTime: string;
  author: string;
  authorDesignation: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
}

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  {
    id: "quran-and-tafseer",
    title: "قرآن و تفسیر",
    description: "قرآن مجید کی تعلیمات، تفسیر اور انسانی زندگی کے لیے قرآنی رہنمائی۔",
    badgeColor: "text-emerald-800 border-emerald-200 bg-emerald-50",
    accentColor: "#059669",
    bgLight: "bg-emerald-50/70"
  },
  {
    id: "hadith-and-sunnah",
    title: "حدیث و سنت",
    description: "احادیث مبارکہ، سنت نبوی ﷺ اور اسلامی زندگی میں ان کی اہمیت۔",
    badgeColor: "text-blue-800 border-blue-200 bg-blue-50",
    accentColor: "#2563eb",
    bgLight: "bg-blue-50/70"
  },
  {
    id: "islamic-jurisprudence",
    title: "فقہ اسلامی",
    description: "فقہ اسلامی کے بنیادی اصول، عبادات اور شرعی رہنمائی۔",
    badgeColor: "text-amber-800 border-amber-200 bg-amber-50",
    accentColor: "#d97706",
    bgLight: "bg-amber-50/70"
  },
  {
    id: "islamic-history",
    title: "اسلامی تاریخ",
    description: "اسلامی تاریخ، سیرت نبوی ﷺ اور علمائے اسلام کی علمی خدمات۔",
    badgeColor: "text-purple-800 border-purple-200 bg-purple-50",
    accentColor: "#7c3aed",
    bgLight: "bg-purple-50/70"
  },
  {
    id: "tasawwuf-and-reformation",
    title: "تصوف و اصلاح",
    description: "تزکیہ نفس، روحانی تربیت اور اخلاقی اصلاح کے موضوعات۔",
    badgeColor: "text-teal-800 border-teal-200 bg-teal-50",
    accentColor: "#0d9488",
    bgLight: "bg-teal-50/70"
  },
  {
    id: "islamic-education",
    title: "دینی تعلیم و تربیت",
    description: "دینی تعلیم، مدارس، تربیت اور اسلامی تعلیمی نظام۔",
    badgeColor: "text-indigo-800 border-indigo-200 bg-indigo-50",
    accentColor: "#4f46e5",
    bgLight: "bg-indigo-50/70"
  },
  {
    id: "islamic-society",
    title: "اسلامی معاشرت",
    description: "اسلامی معاشرت، خاندانی نظام، اخلاقیات اور حقوق العباد۔",
    badgeColor: "text-rose-800 border-rose-200 bg-rose-50",
    accentColor: "#e11d48",
    bgLight: "bg-rose-50/70"
  },
  {
    id: "contemporary-issues",
    title: "عصر حاضر کے مسائل",
    description: "جدید دور کے مسائل، ٹیکنالوجی اور نوجوان نسل کے لیے اسلامی رہنمائی۔",
    badgeColor: "text-cyan-800 border-cyan-200 bg-cyan-50",
    accentColor: "#0891b2",
    bgLight: "bg-cyan-50/70"
  }
];

export const ARTICLES: Article[] = [
  // --- Category 1: قرآن و تفسیر ---
  {
    id: 1,
    title: "قرآن مجید کا تعارف، اہمیت اور انسانی زندگی میں اس کا مقام",
    slug: "quran-introduction",
    aliases: ["quran-introduction-importance"],
    categoryId: "quran-and-tafseer",
    categoryTitle: "قرآن و تفسیر",
    description: "قرآن مجید کلامِ الٰہی، انسانیت کے لیے آخری اور ابدی ہدایت، اور انفرادی و اجتماعی زندگی میں اس کے مقام و عظمت کا علمی و فکری جائزہ۔",
    image: "/arabic-language.jpg",
    imageAlt: "قرآن مجید کا تعارف، اہمیت اور انسانی زندگی میں اس کا مقام",
    status: "شائع شدہ (علمی مقالہ)",
    featured: true,
    featuredPriority: 1,
    readTime: "۱۴ منٹ",
    author: OFFICIAL_AUTHOR.name,
    authorDesignation: OFFICIAL_AUTHOR.designation,
    seoTitle: "قرآن مجید کا تعارف، اہمیت اور انسانی زندگی میں اس کا مقام | جامعہ شیرِ ربانی",
    seoDescription: "قرآن مجید کا مفہوم، نزول، اوصاف، اعجاز اور انفرادی و اجتماعی زندگی میں اس کے مقام و عظمت کا تفصیلی، مستند اور تحقیقی جائزہ۔",
    keywords: ["قرآن مجید کا تعارف", "اہمیت قرآن", "نزول قرآن", "اعجاز قرآن", "قرآن اور انسانی زندگی"]
  },
  {
    id: 2,
    title: "قرآن کریم کی تعلیمات اور ہماری عملی زندگی",
    slug: "quran-and-practical-life",
    categoryId: "quran-and-tafseer",
    categoryTitle: "قرآن و تفسیر",
    description: "روزمرہ کے معمولات، معاملات اور باہمی رشتوں میں قرآنی احکام و اخلاقیات کو عملی جامہ پہنانے کے رہنما اصول۔",
    image: "/tajweed-o-qirat.jpg",
    imageAlt: "قرآن کریم کی تعلیمات اور ہماری عملی زندگی",
    status: "شائع شدہ (علمی مقالہ)",
    readTime: "۱۳ منٹ",
    author: OFFICIAL_AUTHOR.name,
    authorDesignation: OFFICIAL_AUTHOR.designation,
    seoTitle: "قرآن کریم کی تعلیمات اور ہماری عملی زندگی | جامعہ شیرِ ربانی",
    seoDescription: "روزمرہ معمولات، معاشی معاملات اور باہمی تعلقات میں قرآنی احکام کو عملی جامہ پہنانے کے رہنما اصول اور اسوہ صحابہ کی روشنی میں فکری جائزہ۔",
    keywords: ["قرآن اور عملی زندگی", "قرآنی تعلیمات", "اسلامی اخلاقیات", "روزمرہ معمولات میں قرآن"]
  },
  {
    id: 3,
    title: "قرآن مجید میں اخلاقی تربیت اور اصلاح معاشرہ",
    slug: "quran-ethics-and-society",
    aliases: ["quran-moral-training-society"],
    categoryId: "quran-and-tafseer",
    categoryTitle: "قرآن و تفسیر",
    description: "معاشرتی خرابیوں کے تدارک، اعلیٰ اخلاقی اوصاف کے احیاء اور پاکیزہ اسلامی معاشرے کی تعمیر کے لیے قرآنی منہج۔",
    image: "/images/hifaz.jpeg",
    imageAlt: "قرآن مجید میں اخلاقی تربیت اور اصلاح معاشرہ",
    status: "شائع شدہ (علمی مقالہ)",
    readTime: "۱۵ منٹ",
    author: OFFICIAL_AUTHOR.name,
    authorDesignation: OFFICIAL_AUTHOR.designation,
    seoTitle: "قرآن مجید میں اخلاقی تربیت اور اصلاح معاشرہ | جامعہ شیرِ ربانی",
    seoDescription: "معاشرتی امن، باہمی احترام، غیبت، تجسس اور بدگمانی کے سدِ باب اور قرآنی اصولِ معاشرت (سورۃ الحجرات کی روشنی میں) کا مدلل تحقیقی جائزہ۔",
    keywords: ["اخلاقی تربیت", "اصلاح معاشرہ", "سورۃ الحجرات", "قرآنی اخلاقیات", "معاشرتی امن"]
  },

  // --- Category 2: حدیث و سنت ---
  {
    id: 4,
    title: "حدیث نبوی ﷺ کی اہمیت اور اسلامی زندگی میں اس کا کردار",
    slug: "importance-of-hadith",
    aliases: ["importance-of-hadith-islamic-life"],
    categoryId: "hadith-and-sunnah",
    categoryTitle: "حدیث و سنت",
    description: "دینِ اسلام میں حدیث شریف کی حجیت، تشریعی حیثیت اور قرآنی احکامات کی عملی توضیح و تشریح میں اس کا اساسی مقام۔",
    image: "/hadith.jpg",
    imageAlt: "حدیث نبوی ﷺ کی اہمیت اور اسلامی زندگی میں اس کا کردار",
    status: "شائع شدہ (علمی مقالہ)",
    readTime: "۱۶ منٹ",
    author: OFFICIAL_AUTHOR.name,
    authorDesignation: OFFICIAL_AUTHOR.designation,
    seoTitle: "حدیث نبوی ﷺ کی اہمیت اور اسلامی زندگی میں اس کا کردار | جامعہ شیرِ ربانی",
    seoDescription: "دینِ اسلام میں حدیث شریف کی حجیت، تشریعی حیثیت، قرآن مجید کی تشریح میں اس کا اساسی مقام اور منکرینِ حدیث کے فتنوں کا مدلل علمی جائزہ۔",
    keywords: ["حدیث نبوی کی اہمیت", "حجیت حدیث", "حدیث اور سنت", "تشریعی حیثیت", "تدوین حدیث"]
  },
  {
    id: 5,
    title: "سنت نبوی ﷺ کی پیروی اور ہماری روزمرہ زندگی",
    slug: "following-sunnah",
    aliases: ["following-sunnah-daily-life"],
    categoryId: "hadith-and-sunnah",
    categoryTitle: "حدیث و سنت",
    description: "رسول اللہ ﷺ کے اسوہ حسنہ کی اتباع، یومیہ معمولات، عبادات اور اخلاقی برتاؤ میں سنت مبارکہ پر عمل پیرا ہونے کے ثمرات۔",
    image: "/images/hero section 1.jpeg",
    imageAlt: "سنت نبوی ﷺ کی پیروی اور ہماری روزمرہ زندگی",
    status: "شائع شدہ (علمی مقالہ)",
    featured: true,
    featuredPriority: 2,
    readTime: "۱۴ منٹ",
    author: OFFICIAL_AUTHOR.name,
    authorDesignation: OFFICIAL_AUTHOR.designation,
    seoTitle: "سنت نبوی ﷺ کی پیروی اور ہماری روزمرہ زندگی | جامعہ شیرِ ربانی",
    seoDescription: "سنتِ نبوی کی تعریف و مفہوم، اسوہ حسنہ کی جامعیت، روزمرہ عادات، عبادات اور معمولات میں سنت مبارکہ کی برکات اور عملی تطبیق۔",
    keywords: ["سنت نبوی کی پیروی", "اتباع سنت", "اسوہ حسنہ", "روزمرہ معمولات میں سنت"]
  },

  // --- Category 3: فقہ اسلامی ---
  {
    id: 6,
    title: "فقہ اسلامی کا تعارف، اہمیت اور بنیادی اصول",
    slug: "islamic-jurisprudence",
    aliases: ["islamic-jurisprudence-introduction"],
    categoryId: "islamic-jurisprudence",
    categoryTitle: "فقہ اسلامی",
    description: "فقہ اسلامی کی تدوین، ماخذِ شریعت، اجتہاد و قیاس کے اصول اور انسانی زندگی کے جدید تقاضوں میں فقہی فہم کی ناگزیریت۔",
    image: "/takhasus.jpeg",
    imageAlt: "فقہ اسلامی کا تعارف، اہمیت اور بنیادی اصول",
    status: "شائع شدہ (علمی مقالہ)",
    readTime: "۱۵ منٹ",
    author: OFFICIAL_AUTHOR.name,
    authorDesignation: OFFICIAL_AUTHOR.designation,
    seoTitle: "فقہ اسلامی کا تعارف، اہمیت اور بنیادی اصول | جامعہ شیرِ ربانی",
    seoDescription: "فقہ اسلامی کا لغوی و اصطلاحی مفہوم، شریعت اور فقہ میں فرق، تاریخی ارتقا، ادلۂ اربعہ اور انسانی زندگی میں فقہی قواعد کی ناگزیریت کا تحقیقی جائزہ۔",
    keywords: ["فقہ اسلامی کا تعارف", "اصول فقہ", "ادلۂ اربعہ", "قیاس اور اجماع", "فقہی قواعد"]
  },
  {
    id: 7,
    title: "اسلامی عبادات میں فقہ کی اہمیت",
    slug: "fiqh-and-islamic-worship",
    aliases: ["importance-of-fiqh-in-worship"],
    categoryId: "islamic-jurisprudence",
    categoryTitle: "فقہ اسلامی",
    description: "نماز، روزہ، زکوٰۃ، حج اور طہارت کے ارکان و شرائط کی شرعی صحت اور احکامِ الٰہیہ کی درست ادائیگی میں فقہ کا کردار۔",
    image: "/images/hero section 3.jpeg",
    imageAlt: "اسلامی عبادات میں فقہ کی اہمیت",
    status: "شائع شدہ (علمی مقالہ)",
    readTime: "۱۴ منٹ",
    author: OFFICIAL_AUTHOR.name,
    authorDesignation: OFFICIAL_AUTHOR.designation,
    seoTitle: "اسلامی عبادات میں فقہ کی اہمیت | جامعہ شیرِ ربانی",
    seoDescription: "نماز، طہارت، روزہ، زکوٰۃ اور حج کی شرعی صحت، ارکان و شروط کی درستی اور عبادات میں فقہی رہنمائی کی ناگزیریت کا مدلل علمی جائزہ۔",
    keywords: ["عبادات میں فقہ کی اہمیت", "طہارت اور نماز کے مسائل", "ارکان صوم", "فقہ زکوٰۃ و حج"]
  },

  // --- Category 4: اسلامی تاریخ ---
  {
    id: 8,
    title: "سیرت النبی ﷺ کے اہم پہلو اور ہمارے لیے عملی اسباق",
    slug: "seerat-un-nabi-and-practical-lessons",
    aliases: ["seerat-un-nabi-practical-lessons"],
    categoryId: "islamic-history",
    categoryTitle: "اسلامی تاریخ",
    description: "حضور نبی کریم ﷺ کی پاکیزہ حیاتِ طیبہ، اخلاقِ کریمانہ، نبوی قیادت اور عصرِ حاضر میں سیرت طیبہ سے حاصل ہونے والی عملی رہنمائی۔",
    image: "/images/mahfil2.jpeg",
    imageAlt: "سیرت النبی ﷺ کے اہم پہلو اور ہمارے لیے عملی اسباق",
    status: "شائع شدہ (علمی مقالہ)",
    featured: true,
    featuredPriority: 3,
    readTime: "۱۶ منٹ",
    author: OFFICIAL_AUTHOR.name,
    authorDesignation: OFFICIAL_AUTHOR.designation,
    seoTitle: "سیرت النبی ﷺ کے اہم پہلو اور ہمارے لیے عملی اسباق | جامعہ شیرِ ربانی",
    seoDescription: "حضور نبی کریم ﷺ کی پاکیزہ حیاتِ طیبہ، مکی و مدنی ادوار، عفو و درگزر، نبوی معاملات اور عصرِ حاضر میں سیرت طیبہ سے حاصل ہونے والی عملی رہنمائی۔",
    keywords: ["سیرت النبی کے عملی اسباق", "اسوہ حسنہ", "مکی اور مدنی زندگی", "رحمۃ للعالمین"]
  },
  {
    id: 9,
    title: "اسلامی تاریخ میں علمائے کرام کی علمی و دینی خدمات",
    slug: "scholars-contributions-in-islamic-history",
    aliases: ["scholars-services-islamic-history"],
    categoryId: "islamic-history",
    categoryTitle: "اسلامی تاریخ",
    description: "قرونِ اولیٰ سے لے کر دورِ حاضر تک ائمہ کرام، محدثین، فقہاء اور مجددین کی علمی کاوشیں اور دینِ حق کی حفاظت و ترویج۔",
    image: "/images/hero section 4.jpeg",
    imageAlt: "اسلامی تاریخ میں علمائے کرام کی علمی و دینی خدمات",
    status: "شائع شدہ (علمی مقالہ)",
    readTime: "۱۵ منٹ",
    author: OFFICIAL_AUTHOR.name,
    authorDesignation: OFFICIAL_AUTHOR.designation,
    seoTitle: "اسلامی تاریخ میں علمائے کرام کی علمی و دینی خدمات | جامعہ شیرِ ربانی",
    seoDescription: "قرونِ اولیٰ سے دورِ حاضر تک ائمہ کرام، محدثین، فقہاء اور مجددین کی بے مثال علمی خدمات، تدوینِ کتب اور اسلامی مدارس کے کردار کا تحقیقی جائزہ۔",
    keywords: ["علمائے کرام کی خدمات", "تاریخ اسلامی کے علماء", "تدوین حدیث و فقہ", "مدارس اسلامیہ کا کردار"]
  },
  {
    id: 10,
    title: "اسلامی تہذیب و تمدن اور اس کے بنیادی اصول",
    slug: "islamic-civilization-and-its-principles",
    aliases: ["islamic-civilization-principles"],
    categoryId: "islamic-history",
    categoryTitle: "اسلامی تاریخ",
    description: "عدل، علم، مساوات، انسانی حرمت اور روحانی ترقی پر مبنی درخشندہ اسلامی تہذیب کا تاریخی پس منظر اور عالمی اثرات۔",
    image: "/images/hero section 2.jpeg",
    imageAlt: "اسلامی تہذیب و تمدن اور اس کے بنیادی اصول",
    status: "شائع شدہ (علمی مقالہ)",
    readTime: "۱۵ منٹ",
    author: OFFICIAL_AUTHOR.name,
    authorDesignation: OFFICIAL_AUTHOR.designation,
    seoTitle: "اسلامی تہذیب و تمدن اور اس کے بنیادی اصول | جامعہ شیرِ ربانی",
    seoDescription: "توحید، عدل، علم، انسانی حقوق، خاندانی نظام اور فنونِ لطیفہ پر مبنی درخشندہ اسلامی تہذیب کا تاریخی پس منظر اور عصرِ حاضر کے لیے حیات بخش اسباق۔",
    keywords: ["اسلامی تہذیب و تمدن", "اصول تمدن اسلام", "عدل اور مساوات", "انسانی حقوق اسلام میں"]
  },

  // --- Category 5: تصوف و اصلاح ---
  {
    id: 11,
    title: "تزکیہ نفس کا مفہوم، اہمیت اور عملی طریقے",
    slug: "tazkiyah-nafs",
    aliases: ["tazkiyah-nafs-importance-methods"],
    categoryId: "tasawwuf-and-reformation",
    categoryTitle: "تصوف و اصلاح",
    description: "باطنی بیماریوں جیسے کبر، حسد اور ریاکاری سے نجات، صفائی قلب کے قرآنی اسالیب اور ذکر و مراقبہ کے عملی طریقے کار۔",
    image: "/images/hero section 5.jpeg",
    imageAlt: "تزکیہ نفس کا مفہوم، اہمیت اور عملی طریقے",
    status: "شائع شدہ (علمی مقالہ)",
    readTime: "۱۵ منٹ",
    author: OFFICIAL_AUTHOR.name,
    authorDesignation: OFFICIAL_AUTHOR.designation,
    seoTitle: "تزکیہ نفس کا مفہوم، اہمیت اور عملی طریقے | جامعہ شیرِ ربانی",
    seoDescription: "تزکیہ نفس کی قرآنی اہمیت، نفس کے درجات و امراض، توبہ و محاسبہ، ذکرِ الٰہی کا کردار اور روزمرہ زندگی میں باطنی پاکیزگی کے عملی طریقے کار۔",
    keywords: ["تزکیہ نفس", "اصلاح باطن", "محاسبہ نفس", "امراض قلب کا علاج"]
  },
  {
    id: 12,
    title: "اسلامی تعلیمات میں اخلاص، تقویٰ اور حسن اخلاق",
    slug: "ikhlas-taqwa-and-good-character",
    aliases: ["ikhlas-taqwa-good-character"],
    categoryId: "tasawwuf-and-reformation",
    categoryTitle: "تصوف و اصلاح",
    description: "اعمال کی قبولیت کے لیے خلوصِ نیت کی شرط، تقویٰ کی حقیقت اور مخلوقِ خدا کے ساتھ حسنِ سلوک و نرمی کے درجات۔",
    image: "/images/hero section 6.jpeg",
    imageAlt: "اسلامی تعلیمات میں اخلاص، تقویٰ اور حسن اخلاق",
    status: "شائع شدہ (علمی مقالہ)",
    readTime: "۱۴ منٹ",
    author: OFFICIAL_AUTHOR.name,
    authorDesignation: OFFICIAL_AUTHOR.designation,
    seoTitle: "اسلامی تعلیمات میں اخلاص، تقویٰ اور حسن اخلاق | جامعہ شیرِ ربانی",
    seoDescription: "اعمال کی قبولیت کے لیے اخلاصِ نیت کی شرط، تقویٰ کا قرآنی و نبوی تصور، حسنِ اخلاق کی معراج اور ریاکاری و کبر سے نجات کا مدلل جائزہ۔",
    keywords: ["اخلاص اور نیت", "تقویٰ کا قرآنی تصور", "حسن اخلاق", "ریاکاری سے بچاؤ"]
  },
  {
    id: 13,
    title: "اصلاح باطن اور روحانی تربیت کی اہمیت",
    slug: "islamic-spiritual-reformation",
    aliases: ["inner-reformation-spiritual-training"],
    categoryId: "tasawwuf-and-reformation",
    categoryTitle: "تصوف و اصلاح",
    description: "ظاہری عبادات کے ساتھ ساتھ باطن کے سدھار کی ضرورت، صحبتِ صالحین کی برکات اور قلبی بیداری کی راہنمائی۔",
    image: "/images/hero section 7.jpeg",
    imageAlt: "اصلاح باطن اور روحانی تربیت کی اہمیت",
    status: "شائع شدہ (علمی مقالہ)",
    readTime: "۱۵ منٹ",
    author: OFFICIAL_AUTHOR.name,
    authorDesignation: OFFICIAL_AUTHOR.designation,
    seoTitle: "اصلاح باطن اور روحانی تربیت کی اہمیت | جامعہ شیرِ ربانی",
    seoDescription: "قلب کی صفائی، باطن اور ظاہر کا توازن، صحبتِ صالحین کی برکات، اور مستند قرآنی و نبوی تصوف کی روشنی میں روحانی تربیت کا تحقیقی جائزہ۔",
    keywords: ["اصلاح باطن", "روحانی تربیت", "قلب سلیم", "صحبت صالحین"]
  },

  // --- Category 6: دینی تعلیم و تربیت ---
  {
    id: 14,
    title: "دینی تعلیم کی اہمیت اور عصر حاضر کے تقاضے",
    slug: "importance-of-islamic-education",
    aliases: ["islamic-education-modern-needs"],
    categoryId: "islamic-education",
    categoryTitle: "دینی تعلیم و تربیت",
    description: "ہر مسلمان پر بنیادی دینی احکام سیکھنے کی فرضیت اور دورِ جدید کے فکری چیلنجز کے تناظر میں دینی تعلیم کا ناگزیر کردار۔",
    image: "/images/WhatsApp 1.jpeg",
    imageAlt: "دینی تعلیم کی اہمیت اور عصر حاضر کے تقاضے",
    status: "شائع شدہ (علمی مقالہ)",
    readTime: "۱۴ منٹ",
    author: OFFICIAL_AUTHOR.name,
    authorDesignation: OFFICIAL_AUTHOR.designation,
    seoTitle: "دینی تعلیم کی اہمیت اور عصر حاضر کے تقاضے | جامعہ شیرِ ربانی",
    seoDescription: "اسلام میں علم کی بنیادی حیثیت، پہلی وحی کا پیغام، فکری چیلنجز کے مقابلے میں دینی تعلیم کی ضرورت، اور والدین و اساتذہ کے فرائض کا تحقیقی مطالعہ۔",
    keywords: ["دینی تعلیم کی اہمیت", "عصر حاضر اور دینی تعلیم", "حصول علم کی فضیلت"]
  },
  {
    id: 15,
    title: "مدارس دینیہ کا کردار اور معاشرے کی تعمیر",
    slug: "role-of-madaris-in-society",
    aliases: ["madrasas-role-society-building"],
    categoryId: "islamic-education",
    categoryTitle: "دینی تعلیم و تربیت",
    description: "دینی مدارس کا تعلیمی و تربیتی مشن، اخلاقی انحطاط کے خلاف مضبوط قلعہ اور باکردار قیادت و افراد سازی کی خدمات۔",
    image: "/images/WhatsApp2.jpeg",
    imageAlt: "مدارس دینیہ کا کردار اور معاشرے کی تعمیر",
    status: "شائع شدہ (علمی مقالہ)",
    readTime: "۱۵ منٹ",
    author: OFFICIAL_AUTHOR.name,
    authorDesignation: OFFICIAL_AUTHOR.designation,
    seoTitle: "مدارس دینیہ کا کردار اور معاشرے کی تعمیر | جامعہ شیرِ ربانی",
    seoDescription: "دینی مدارس کا تاریخی ارتقاء، قرآن و سنت کی حفاظت، اخلاقی قیادت کی تیاری، مفت فلاحی خدمات اور عصری چیلنجز کے تناظر میں کردار کا تحقیقی جائزہ۔",
    keywords: ["مدارس دینیہ کا کردار", "معاشرے کی تعمیر میں مدارس", "دینی مدارس کی تاریخ"]
  },

  // --- Category 7: اسلامی معاشرت ---
  {
    id: 16,
    title: "والدین کے حقوق اور اولاد کی ذمہ داریاں",
    slug: "rights-of-parents-and-children",
    aliases: ["parents-rights-children-responsibilities"],
    categoryId: "islamic-society",
    categoryTitle: "اسلامی معاشرت",
    description: "والدین کی اطاعت، خدمت اور شکر گزاری کی قرآنی تاکید اور بڑھاپے میں ان کے اکرام و احترام کے حوالے سے شرعی احکامات۔",
    image: "/images/1.jpeg",
    imageAlt: "والدین کے حقوق اور اولاد کی ذمہ داریاں",
    status: "شائع شدہ (علمی مقالہ)",
    readTime: "۱۵ منٹ",
    author: OFFICIAL_AUTHOR.name,
    authorDesignation: OFFICIAL_AUTHOR.designation,
    seoTitle: "والدین کے حقوق اور اولاد کی ذمہ داریاں | جامعہ شیرِ ربانی",
    seoDescription: "اسلام میں والدین کا عظیم الشان مقام، قرآن و سنت میں بر الوالدین کی تاکید، بڑھاپے میں نگہداشت، نافرمانی کے نقصانات اور وفات کے بعد کے حقوق کا تحقیقی جائزہ۔",
    keywords: ["والدین کے حقوق", "بر الوالدین", "اولاد کی ذمہ داریاں", "عقوق الوالدین", "خاندانی نظام"]
  },
  {
    id: 17,
    title: "اسلامی معاشرت میں حسن اخلاق اور حقوق العباد",
    slug: "good-character-and-rights-of-people",
    aliases: ["good-manners-human-rights-islam"],
    categoryId: "islamic-society",
    categoryTitle: "اسلامی معاشرت",
    description: "پڑوسیوں، رشتہ داروں اور تمام بنی نوع انسان کے حقوق کی ادائی، باہمی رواداری، اور پرامن معاشرے کا قیام۔",
    image: "/images/2.jpeg",
    imageAlt: "اسلامی معاشرت میں حسن اخلاق اور حقوق العباد",
    status: "شائع شدہ (علمی مقالہ)",
    readTime: "۱۴ منٹ",
    author: OFFICIAL_AUTHOR.name,
    authorDesignation: OFFICIAL_AUTHOR.designation,
    seoTitle: "اسلامی معاشرت میں حسن اخلاق اور حقوق العباد | جامعہ شیرِ ربانی",
    seoDescription: "حسنِ اخلاق کی فضیلت، بندوں کے حقوق، پڑوسیوں اور قرابت داروں کی رعایت، معاشرتی عدل اور اخلاقی قدروں کا جامع قرآنی و نبوی مطالعہ۔",
    keywords: ["حسن اخلاق", "حقوق العباد", "اسلامی معاشرت", "پڑوسیوں کے حقوق", "صلہ رحمی"]
  },
  {
    id: 18,
    title: "خاندانی نظام کی مضبوطی میں اسلامی تعلیمات کا کردار",
    slug: "islamic-teachings-and-family-system",
    aliases: ["strengthening-family-system-islam"],
    categoryId: "islamic-society",
    categoryTitle: "اسلامی معاشرت",
    description: "نکاح کی پاکیزگی، میاں بیوی کے باہمی حقوق و فرائض، اولاد کی نیک تربیت اور خاندانی وحدت کے تحفظ کے قرآنی اصول۔",
    image: "/images/3.jpeg",
    imageAlt: "خاندانی نظام کی مضبوطی میں اسلامی تعلیمات کا کردار",
    status: "شائع شدہ (علمی مقالہ)",
    readTime: "۱۵ منٹ",
    author: OFFICIAL_AUTHOR.name,
    authorDesignation: OFFICIAL_AUTHOR.designation,
    seoTitle: "خاندانی نظام کی مضبوطی میں اسلامی تعلیمات کا کردار | جامعہ شیرِ ربانی",
    seoDescription: "نکاح کی پاکیزگی، زوجین کے حقوق و فرائض، اولاد کی تربیت، تنازعات کے حل کے اصول اور مغرب کے خاندانی بگاڑ کے مقابلے میں اسلامی توازن کا تجزیہ۔",
    keywords: ["خاندانی نظام", "نکاح کی اہمیت", "زوجین کے حقوق", "اولاد کی تربیت", "طلاق کی ناپسندیدگی"]
  },

  // --- Category 8: عصر حاضر کے مسائل ---
  {
    id: 19,
    title: "جدید ٹیکنالوجی اور سوشل میڈیا کا اسلامی نقطۂ نظر",
    slug: "technology-and-social-media-in-islam",
    aliases: ["modern-technology-social-media-islam"],
    categoryId: "contemporary-issues",
    categoryTitle: "عصر حاضر کے مسائل",
    description: "انٹرنیٹ، سوشل میڈیا اور ڈیجیٹل ذرائع ابلاغ کا مثبت و تعمیری استعمال، وقت کا ضیاع اور اخلاقی خطرات سے بچاؤ کی شرعی تدابیر۔",
    image: "/images/4.jpeg",
    imageAlt: "جدید ٹیکنالوجی اور سوشل میڈیا کا اسلامی نقطۂ نظر",
    status: "شائع شدہ (علمی مقالہ)",
    readTime: "۱۵ منٹ",
    author: OFFICIAL_AUTHOR.name,
    authorDesignation: OFFICIAL_AUTHOR.designation,
    seoTitle: "جدید ٹیکنالوجی اور سوشل میڈیا کا اسلامی نقطۂ نظر | جامعہ شیرِ ربانی",
    seoDescription: "ڈیجیٹل انقلاب، سوشل میڈیا اور انٹرنیٹ کا شرعی و اخلاقی ضابطہ، دعوتِ دین، فکری خطرات، پرائیویسی کی حفاظت اور وقت کے تعمیری استعمال کی رہنمائی۔",
    keywords: ["جدید ٹیکنالوجی اور اسلام", "سوشل میڈیا کا شرعی حکم", "ڈیجیٹل دعوت", "انٹرنیٹ کے اخلاقی آداب", "وقت کی حفاظت"]
  },
  {
    id: 20,
    title: "نوجوان نسل کے مسائل اور اسلامی تعلیمات کی رہنمائی",
    slug: "youth-problems-and-islamic-guidance",
    aliases: ["youth-issues-islamic-guidance"],
    categoryId: "contemporary-issues",
    categoryTitle: "عصر حاضر کے مسائل",
    description: "جدید مادہ پرستی، فکری تشکیک اور بے راہ روی کے طوفان میں نوجوان نسل کے ایمان کی حفاظت اور اسلامی رہنمائی۔",
    image: "/images/news.jpeg",
    imageAlt: "نوجوان نسل کے مسائل اور اسلامی تعلیمات کی رہنمائی",
    status: "شائع شدہ (علمی مقالہ)",
    readTime: "۱۶ منٹ",
    author: OFFICIAL_AUTHOR.name,
    authorDesignation: OFFICIAL_AUTHOR.designation,
    seoTitle: "نوجوان نسل کے مسائل اور اسلامی تعلیمات کی رہنمائی | جامعہ شیرِ ربانی",
    seoDescription: "نوجوان نسل کے فکری، اخلاقی، نفسیاتی اور نظریاتی چیلنجز، اصحابِ کہف کا اسوہ، نشۂ جوانی کی حفاظت اور اسلامی رہنمائی کے عملی رہنما اصول۔",
    keywords: ["نوجوان نسل کے مسائل", "شباب فی ظل الرحمن", "فکری تشکیک کا علاج", "اصحاب کہف کا اسوہ", "اخلاقی تربیت"]
  }
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug || (a.aliases && a.aliases.includes(slug)));
}

export function getArticlesByCategory(categoryId: string): Article[] {
  return ARTICLES.filter((a) => a.categoryId === categoryId);
}

export function getFeaturedArticles(): Article[] {
  return ARTICLES.filter((a) => a.featured).sort(
    (a, b) => (a.featuredPriority || 99) - (b.featuredPriority || 99)
  );
}

export function getRelatedArticles(currentSlug: string, categoryId: string, limit: number = 3): Article[] {
  return ARTICLES.filter(
    (a) => a.slug !== currentSlug && a.categoryId === categoryId
  ).slice(0, limit);
}
