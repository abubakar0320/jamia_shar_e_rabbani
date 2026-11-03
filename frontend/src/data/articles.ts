export interface ArticleCategory {
  id: string;
  title: string;
  description: string;
  badgeColor: string;
  accentColor: string;
  bgLight: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  categoryId: string;
  categoryTitle: string;
  description: string;
  image: string;
  status: string;
  featured?: boolean;
  featuredPriority?: number; // 1 for primary, 2 and 3 for secondary
  readTime: string;
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
    slug: "quran-introduction-importance",
    categoryId: "quran-and-tafseer",
    categoryTitle: "قرآن و تفسیر",
    description: "قرآن مجید کلامِ الٰہی، انسانیت کے لیے آخری اور ابدی ہدایت، اور انفرادی و اجتماعی زندگی میں اس کے مقام و عظمت کا علمی و فکری جائزہ۔",
    image: "/arabic-language.jpg",
    status: "حالت: جلد شائع ہوگا",
    featured: true,
    featuredPriority: 1,
    readTime: "۱۰ منٹ"
  },
  {
    id: 2,
    title: "قرآن کریم کی تعلیمات اور ہماری عملی زندگی",
    slug: "quran-and-practical-life",
    categoryId: "quran-and-tafseer",
    categoryTitle: "قرآن و تفسیر",
    description: "روزمرہ کے معمولات، معاملات اور باہمی رشتوں میں قرآنی احکام و اخلاقیات کو عملی جامہ پہنانے کے رہنما اصول۔",
    image: "/tajweed-o-qirat.jpg",
    status: "حالت: جلد شائع ہوگا",
    readTime: "۸ منٹ"
  },
  {
    id: 3,
    title: "قرآن مجید میں اخلاقی تربیت اور اصلاح معاشرہ",
    slug: "quran-moral-training-society",
    categoryId: "quran-and-tafseer",
    categoryTitle: "قرآن و تفسیر",
    description: "معاشرتی خرابیوں کے تدارک، اعلیٰ اخلاقی اوصاف کے احیاء اور پاکیزہ اسلامی معاشرے کی تعمیر کے لیے قرآنی منہج۔",
    image: "/images/hifaz.jpeg",
    status: "حالت: جلد شائع ہوگا",
    readTime: "۹ منٹ"
  },

  // --- Category 2: حدیث و سنت ---
  {
    id: 4,
    title: "حدیث نبوی ﷺ کی اہمیت اور اسلامی زندگی میں اس کا کردار",
    slug: "importance-of-hadith-islamic-life",
    categoryId: "hadith-and-sunnah",
    categoryTitle: "حدیث و سنت",
    description: "دینِ اسلام میں حدیث شریف کی حجیت، تشریعی حیثیت اور قرآنی احکامات کی عملی توضیح و تشریح میں اس کا اساسی مقام۔",
    image: "/hadith.jpg",
    status: "حالت: جلد شائع ہوگا",
    readTime: "۸ منٹ"
  },
  {
    id: 5,
    title: "سنت نبوی ﷺ کی پیروی اور ہماری روزمرہ زندگی",
    slug: "following-sunnah-daily-life",
    categoryId: "hadith-and-sunnah",
    categoryTitle: "حدیث و سنت",
    description: "رسول اللہ ﷺ کے اسوہ حسنہ کی اتباع، یومیہ معمولات، عبادات اور اخلاقی برتاؤ میں سنت مبارکہ پر عمل پیرا ہونے کے ثمرات۔",
    image: "/images/hero section 1.jpeg",
    status: "حالت: جلد شائع ہوگا",
    featured: true,
    featuredPriority: 2,
    readTime: "۷ منٹ"
  },

  // --- Category 3: فقہ اسلامی ---
  {
    id: 6,
    title: "فقہ اسلامی کا تعارف، اہمیت اور بنیادی اصول",
    slug: "islamic-jurisprudence-introduction",
    categoryId: "islamic-jurisprudence",
    categoryTitle: "فقہ اسلامی",
    description: "فقہ اسلامی کی تدوین، ماخذِ شریعت، اجتہاد و قیاس کے اصول اور انسانی زندگی کے جدید تقاضوں میں فقہی فہم کی ناگزیریت۔",
    image: "/takhasus.jpeg",
    status: "حالت: جلد شائع ہوگا",
    readTime: "۱۰ منٹ"
  },
  {
    id: 7,
    title: "اسلامی عبادات میں فقہ کی اہمیت",
    slug: "importance-of-fiqh-in-worship",
    categoryId: "islamic-jurisprudence",
    categoryTitle: "فقہ اسلامی",
    description: "نماز، روزہ، زکوٰۃ، حج اور طہارت کے ارکان و شرائط کی شرعی صحت اور احکامِ الٰہیہ کی درست ادائیگی میں فقہ کا کردار۔",
    image: "/images/hero section 3.jpeg",
    status: "حالت: جلد شائع ہوگا",
    readTime: "۷ منٹ"
  },

  // --- Category 4: اسلامی تاریخ ---
  {
    id: 8,
    title: "سیرت النبی ﷺ کے اہم پہلو اور ہمارے لیے عملی اسباق",
    slug: "seerat-un-nabi-practical-lessons",
    categoryId: "islamic-history",
    categoryTitle: "اسلامی تاریخ",
    description: "حضور نبی کریم ﷺ کی پاکیزہ حیاتِ طیبہ، اخلاقِ کریمانہ، نبوی قیادت اور عصرِ حاضر میں سیرت طیبہ سے حاصل ہونے والی عملی رہنمائی۔",
    image: "/images/mahfil2.jpeg",
    status: "حالت: جلد شائع ہوگا",
    featured: true,
    featuredPriority: 3,
    readTime: "۱۱ منٹ"
  },
  {
    id: 9,
    title: "اسلامی تاریخ میں علمائے کرام کی علمی و دینی خدمات",
    slug: "scholars-services-islamic-history",
    categoryId: "islamic-history",
    categoryTitle: "اسلامی تاریخ",
    description: "قرونِ اولیٰ سے لے کر دورِ حاضر تک ائمہ کرام، محدثین، فقہاء اور مجددین کی علمی کاوشیں اور دینِ حق کی حفاظت و ترویج۔",
    image: "/images/hero section 4.jpeg",
    status: "حالت: جلد شائع ہوگا",
    readTime: "۹ منٹ"
  },
  {
    id: 10,
    title: "اسلامی تہذیب و تمدن اور اس کے بنیادی اصول",
    slug: "islamic-civilization-principles",
    categoryId: "islamic-history",
    categoryTitle: "اسلامی تاریخ",
    description: "عدل، علم، مساوات، انسانی حرمت اور روحانی ترقی پر مبنی درخشندہ اسلامی تہذیب کا تاریخی پس منظر اور عالمی اثرات۔",
    image: "/images/hero section 2.jpeg",
    status: "حالت: جلد شائع ہوگا",
    readTime: "۸ منٹ"
  },

  // --- Category 5: تصوف و اصلاح ---
  {
    id: 11,
    title: "تزکیہ نفس کا مفہوم، اہمیت اور عملی طریقے",
    slug: "tazkiyah-nafs-importance-methods",
    categoryId: "tasawwuf-and-reformation",
    categoryTitle: "تصوف و اصلاح",
    description: "باطنی بیماریوں جیسے کبر، حسد اور ریاکاری سے نجات، صفائی قلب کے قرآنی اسالیب اور ذکر و مراقبہ کے عملی طریقے کار۔",
    image: "/images/hero section 5.jpeg",
    status: "حالت: جلد شائع ہوگا",
    readTime: "۱۰ منٹ"
  },
  {
    id: 12,
    title: "اسلامی تعلیمات میں اخلاص، تقویٰ اور حسن اخلاق",
    slug: "ikhlas-taqwa-good-character",
    categoryId: "tasawwuf-and-reformation",
    categoryTitle: "تصوف و اصلاح",
    description: "اعمال کی قبولیت کے لیے خلوصِ نیت کی شرط، تقویٰ کی حقیقت اور مخلوقِ خدا کے ساتھ حسنِ سلوک و نرمی کے درجات۔",
    image: "/images/hero section 6.jpeg",
    status: "حالت: جلد شائع ہوگا",
    readTime: "۸ منٹ"
  },
  {
    id: 13,
    title: "اصلاح باطن اور روحانی تربیت کی اہمیت",
    slug: "inner-reformation-spiritual-training",
    categoryId: "tasawwuf-and-reformation",
    categoryTitle: "تصوف و اصلاح",
    description: "ظاہری عبادات کے ساتھ ساتھ باطن کے سدھار کی ضرورت، صحبتِ صالحین کی برکات اور قلبی بیداری کی راہنمائی۔",
    image: "/images/hero section 7.jpeg",
    status: "حالت: جلد شائع ہوگا",
    readTime: "۹ منٹ"
  },

  // --- Category 6: دینی تعلیم و تربیت ---
  {
    id: 14,
    title: "دینی تعلیم کی اہمیت اور عصر حاضر کے تقاضے",
    slug: "islamic-education-modern-needs",
    categoryId: "islamic-education",
    categoryTitle: "دینی تعلیم و تربیت",
    description: "ہر مسلمان پر بنیادی دینی احکام سیکھنے کی فرضیت اور دورِ جدید کے فکری چیلنجز کے تناظر میں دینی تعلیم کا ناگزیر کردار۔",
    image: "/images/WhatsApp 1.jpeg",
    status: "حالت: جلد شائع ہوگا",
    readTime: "۷ منٹ"
  },
  {
    id: 15,
    title: "مدارس دینیہ کا کردار اور معاشرے کی تعمیر",
    slug: "madrasas-role-society-building",
    categoryId: "islamic-education",
    categoryTitle: "دینی تعلیم و تربیت",
    description: "دینی مدارس کا تعلیمی و تربیتی مشن، اخلاقی انحطاط کے خلاف مضبوط قلعہ اور باکردار قیادت و افراد سازی کی خدمات۔",
    image: "/images/WhatsApp2.jpeg",
    status: "حالت: جلد شائع ہوگا",
    readTime: "۸ منٹ"
  },

  // --- Category 7: اسلامی معاشرت ---
  {
    id: 16,
    title: "والدین کے حقوق اور اولاد کی ذمہ داریاں",
    slug: "parents-rights-children-responsibilities",
    categoryId: "islamic-society",
    categoryTitle: "اسلامی معاشرت",
    description: "والدین کی اطاعت، خدمت اور شکر گزاری کی قرآنی تاکید اور بڑھاپے میں ان کے اکرام و احترام کے حوالے سے شرعی احکامات۔",
    image: "/images/1.jpeg",
    status: "حالت: جلد شائع ہوگا",
    readTime: "۸ منٹ"
  },
  {
    id: 17,
    title: "اسلامی معاشرت میں حسن اخلاق اور حقوق العباد",
    slug: "good-manners-human-rights-islam",
    categoryId: "islamic-society",
    categoryTitle: "اسلامی معاشرت",
    description: "پڑوسیوں، رشتہ داروں اور تمام بنی نوع انسان کے حقوق کی ادائی، باہمی رواداری، اور پرامن معاشرے کا قیام۔",
    image: "/images/2.jpeg",
    status: "حالت: جلد شائع ہوگا",
    readTime: "۸ منٹ"
  },
  {
    id: 18,
    title: "خاندانی نظام کی مضبوطی میں اسلامی تعلیمات کا کردار",
    slug: "strengthening-family-system-islam",
    categoryId: "islamic-society",
    categoryTitle: "اسلامی معاشرت",
    description: "نکاح کی پاکیزگی، میاں بیوی کے باہمی حقوق و فرائض، اولاد کی نیک تربیت اور خاندانی وحدت کے تحفظ کے قرآنی اصول۔",
    image: "/images/3.jpeg",
    status: "حالت: جلد شائع ہوگا",
    readTime: "۹ منٹ"
  },

  // --- Category 8: عصر حاضر کے مسائل ---
  {
    id: 19,
    title: "جدید ٹیکنالوجی اور سوشل میڈیا کا اسلامی نقطۂ نظر",
    slug: "modern-technology-social-media-islam",
    categoryId: "contemporary-issues",
    categoryTitle: "عصر حاضر کے مسائل",
    description: "انٹرنیٹ، سوشل میڈیا اور ڈیجیٹل ذرائع ابلاغ کا مثبت و تعمیری استعمال، وقت کا ضیاع اور اخلاقی خطرات سے بچاؤ کی شرعی تدابیر۔",
    image: "/images/4.jpeg",
    status: "حالت: جلد شائع ہوگا",
    readTime: "۹ منٹ"
  },
  {
    id: 20,
    title: "نوجوان نسل کے مسائل اور اسلامی تعلیمات کی رہنمائی",
    slug: "youth-issues-islamic-guidance",
    categoryId: "contemporary-issues",
    categoryTitle: "عصر حاضر کے مسائل",
    description: "جدید مادہ پرستی، فکری تشکیک اور بے راہ روی کے طوفان میں نوجوان نسل کے ایمان کی حفاظت اور اسلامی رہنمائی۔",
    image: "/images/news.jpeg",
    status: "حالت: جلد شائع ہوگا",
    readTime: "۱۰ منٹ"
  }
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
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
