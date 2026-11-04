export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'leadership' | 'akabireen';
  categoryLabel: string;
  image: string;
  description: string;
  tag: string;
  year?: string;
  badgeColor?: string;
}

export interface GalleryCategory {
  id: 'all' | 'leadership' | 'akabireen';
  label: string;
  iconName: string;
  count?: number;
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  { id: 'all', label: 'تمام تصاویر (All Photos)', iconName: 'Sparkles' },
  { id: 'leadership', label: 'ادارتی قیادت و اساتذہ', iconName: 'Users' },
  { id: 'akabireen', label: 'اکابرین و مشائخِ عظام', iconName: 'Award' },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gallery-1-peer-karam-shah',
    title: 'حضور ضیاء الامت جسٹس پیر محمد کرم شاہ الازہری علیہ الرحمہ',
    category: 'akabireen',
    categoryLabel: 'اکابرین و مشائخِ عظام',
    image: '/gallery/1. Zayah ul umat justice peer muhammad karam shah.jpeg',
    description: 'مفسرِ قرآن، عظیم روحانی پیشوا، صاحبِ تفسیر ضیاء القرآن، مصنفِ ضیاء النبی ﷺ، بانی دار العلوم محمدیہ غوثیہ بھیرہ شریف و سابق جسٹس شریعت ایپلٹ بینچ سپریم کورٹ آف پاکستان۔ آپ کی علمی، فقہی، قلمی اور روحانی خدمات پوری دنیا کے مسلمانوں کے لیے عظیم مشعلِ راہ ہیں۔',
    tag: 'ضیاء الامت و مفسرِ قرآن',
    year: 'اکابرینِ اہلِ سنت',
    badgeColor: 'bg-amber-600 text-white'
  },
  {
    id: 'gallery-2-farooq-ali-rabbani',
    title: 'پروفیسر ڈاکٹر فاروق علی ربانی',
    category: 'leadership',
    categoryLabel: 'ادارتی قیادت و اساتذہ',
    image: '/gallery/2. farooq-ali-rabbani.jpeg',
    description: 'پرنسپل و شیخ الحدیث، جامعہ شیرِ ربانی مانانوالہ۔ علومِ شریعہ و حدیث کے ممتاز استاد، مصنف، پی ایچ ڈی اسکالر اور جامعہ کے تعلیمی ارتقاء، نصابی اصلاحات اور وفاق المدارس الاسلامیہ الرضویہ سے الحاق کی کلیدی شخصیت۔',
    tag: 'پرنسپل، جامعہ شیرِ ربانی',
    year: 'قیادت (2008ء تا حال)',
    badgeColor: 'bg-emerald-700 text-white'
  },
  {
    id: 'gallery-3-hafiz-ahmad-ali',
    title: 'حافظ محمد احمد علی ربانی',
    category: 'leadership',
    categoryLabel: 'ادارتی قیادت و اساتذہ',
    image: '/gallery/3. hafiz ahmad ali.jpeg',
    description: 'نائب مہتمم و ناظمِ تعلیمات (Director of Education) جامعہ شیرِ ربانی۔ درسِ نظامی و حفظ القرآن کے جملہ تعلیمی شعبہ جات، امتحانی طریقہ کار، اساتذہ کی علمی سرپرستی اور طلبہ کی روحانی و تربیتی نشوونما کے ناظمِ اعلیٰ۔',
    tag: 'نائب مہتمم و ناظمِ تعلیمات',
    year: 'قیادت (2022ء تا حال)',
    badgeColor: 'bg-teal-700 text-white'
  },
  {
    id: 'gallery-4-abubakar-siddique',
    title: 'محترم ابوبکر صدیق صاحب',
    category: 'leadership',
    categoryLabel: 'ادارتی قیادت و اساتذہ',
    image: '/gallery/4. abubakar-siddique.jpeg',
    description: 'ڈائریکٹر انفارمیشن ٹیکنالوجی و ہیڈ آف سافٹ ویئر سسٹمز، جامعہ شیرِ ربانی۔ ادارے کے جدید پورٹل، ڈیٹابیس آرکیٹیکچر، خودکار امتحانی سسٹم کے معمار اور نوجوانوں کے آئی ٹی انٹرن شپ پروگرام کے سپروائزر و مربی۔',
    tag: 'ڈائریکٹر آئی ٹی و انٹرن شپ سپروائزر',
    year: 'آئی ٹی قیادت (2022ء تا حال)',
    badgeColor: 'bg-blue-700 text-white'
  },
  {
    id: 'gallery-5-peer-syed-iftikhar-shah',
    title: 'پیر سید افتخار الحسن شاہ صاحب',
    category: 'akabireen',
    categoryLabel: 'اکابرین و مشائخِ عظام',
    image: '/gallery/5. Peer Syed Iftikhar ul hassan shah.jpeg',
    description: 'معروف روحانی پیشوا، سجادہ نشین آستانہ عالیہ اور صاحبِ نسبت بزرگ۔ خانقاہی نظام، تصوف و احسان کی ترویج اور سنتِ نبوی کے فروغ کے ساتھ جامعہ شیرِ ربانی مانانوالہ کے عظیم سرپرست، مربی اور دعا گو۔',
    tag: 'سجادہ نشین و روحانی پیشوا',
    year: 'مشائخِ عظام',
    badgeColor: 'bg-purple-700 text-white'
  },
  {
    id: 'gallery-6-mufti-kashif-rafique',
    title: 'مفتی کاشف رفیق انجم صاحب',
    category: 'akabireen',
    categoryLabel: 'اکابرین و مشائخِ عظام',
    image: '/gallery/6. Mufti kashif rafique anjum.jpeg',
    description: 'جلیل القدر عالمِ دین، ممتاز مفتی اور محققِ عصر۔ فقہِ اسلامی، معاصر فتاویٰ، شریعت کونسلنگ اور دینی علوم میں گراں قدر تصنیفی و تدریسی خدمات کے امین، اور جامعہ شیرِ ربانی کے علمی معاون و رہنما۔',
    tag: 'مفتی و محققِ شریعت',
    year: 'علمائے کرام',
    badgeColor: 'bg-indigo-700 text-white'
  },
  {
    id: 'gallery-7-mufti-ahmad-jami-shah',
    title: 'مفتی محمد احمد جامی شاہ صاحب',
    category: 'akabireen',
    categoryLabel: 'اکابرین و مشائخِ عظام',
    image: '/gallery/7. Mufti muhammad ahmad Jami shah.jpeg',
    description: 'جید مفتی، صاحبِ علم و تقویٰ اور باوقار علمی و روحانی رہنما۔ مسندِ تدریس و افتاء پر طویل علمی خدمات، سنتِ نبوی کی ترویج اور جامعہ شیرِ ربانی کے تعلیمی و تربیتی مشن کے سرپرست و خیر خواہ۔',
    tag: 'مفتی و استاذِ شریعت',
    year: 'مشائخ و علماء',
    badgeColor: 'bg-rose-700 text-white'
  },
  {
    id: 'gallery-8-ali-hamza',
    title: 'مولانا مفتی علی حمزہ صاحب',
    category: 'leadership',
    categoryLabel: 'ادارتی قیادت و اساتذہ',
    image: '/gallery/8. ali-hamza.jpeg',
    description: 'استاذ الحدیث، شعبہ تدریس و امورِ دینیہ جامعہ شیرِ ربانی مانانوالہ۔ علومِ شریعہ، فقہ و اصولِ فقہ، نحو و صرف اور عربی ادب کے سینئر استاد اور طلبہ کی فقہی و فکری رہنمائی کے نگران۔',
    tag: 'استاذ الحدیث و شعبہ درسِ نظامی',
    year: 'اساتذہ کرام',
    badgeColor: 'bg-emerald-800 text-white'
  }
];
