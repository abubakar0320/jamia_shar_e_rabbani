export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'leadership' | 'mashaikh' | 'scholars';
  categoryLabel: string;
  image: string;
  description: string;
  tag: string;
  year?: string;
  badgeColor?: string;
}

export interface GalleryCategory {
  id: 'all' | 'leadership' | 'mashaikh' | 'scholars';
  label: string;
  iconName: string;
  count?: number;
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  { id: 'all', label: 'تمام تصاویر (All Photos)', iconName: 'Sparkles' },
  { id: 'leadership', label: 'ادارتی قیادت و انتظامیہ', iconName: 'Users' },
  { id: 'mashaikh', label: 'اکابرین و مشائخِ عظام', iconName: 'Award' },
  { id: 'scholars', label: 'پروفیسرز و علمائے کرام', iconName: 'BookOpen' },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gallery-1-peer-karam-shah',
    title: 'حضور ضیاء الامت جسٹس پیر محمد کرم شاہ الازہری علیہ الرحمہ',
    category: 'mashaikh',
    categoryLabel: 'اکابرین و مشائخِ عظام',
    image: '/gallery/1. حضور ضیاء الامت جسٹس پیر محمد کرم شاہ الازہری علیہ الرحمہ.jpeg',
    description: 'مفسرِ قرآن، عظیم روحانی پیشوا، صاحبِ تفسیر ضیاء القرآن، مصنفِ ضیاء النبی ﷺ، بانی دار العلوم محمدیہ غوثیہ بھیرہ شریف و سابق جسٹس شریعت ایپلٹ بینچ سپریم کورٹ آف پاکستان۔ آپ کی علمی، فقہی، قلمی اور روحانی خدمات پوری دنیا کے مسلمانوں کے لیے عظیم مشعلِ راہ ہیں۔',
    tag: 'ضیاء الامت و مفسرِ قرآن',
    year: 'اکابرینِ اہلِ سنت',
    badgeColor: 'bg-amber-600 text-white'
  },
  {
    id: 'gallery-1-1-chancellor-muhammad-yousaf',
    title: 'مولانا الحاج صوبیدار محمد یوسف نقشبندی مجددی صاحب',
    category: 'leadership',
    categoryLabel: 'ادارتی قیادت و انتظامیہ',
    image: '/gallery/1.1مولانا الحاج صوبیدار محمد یوسف نقشبندی مجددی صاحب.jpeg',
    description: 'چانسلر و سرپرستِ اعلیٰ، جامعہ شیرِ ربانی مانانوالہ۔ آپ ۳۰ سالہ عسکری نظم و ضبط اور ۲۴ سالہ دینی اخلاص، اور سلسلہ عالیہ نقشبندیہ مجددیہ کے روحانی فیضان کے امین ہیں۔ ادارے کے فکری، ادارتی اور تعلیمی استحکام کے سرپرستِ اعلیٰ۔',
    tag: 'چانسلر، جامعہ شیرِ ربانی',
    year: 'قیادت و سرپرستی',
    badgeColor: 'bg-emerald-800 text-white'
  },
  {
    id: 'gallery-2-farooq-ali-rabbani',
    title: 'ڈاکٹر پیر ابو احمد فاروق علی ربانی صاحب',
    category: 'leadership',
    categoryLabel: 'ادارتی قیادت و انتظامیہ',
    image: '/gallery/2. ڈاکٹر پیر ابو احمد فاروق علی ربانی صاحب (جدید).jpeg',
    description: 'وائس چانسلر و ڈینِ فیکلٹی آف اسلامک اسٹڈیز، جامعہ شیرِ ربانی مانانوالہ۔ علومِ شریعہ و حدیث کے ممتاز محقق و استاد، مصنف، پی ایچ ڈی اسکالر اور جامعہ کے تعلیمی ارتقاء، نصابی اصلاحات اور وفاق المدارس الاسلامیہ الرضویہ سے الحاق کی کلیدی شخصیت۔',
    tag: 'وائس چانسلر و ڈین',
    year: 'قیادت (2008ء تا حال)',
    badgeColor: 'bg-emerald-700 text-white'
  },
  {
    id: 'gallery-3-hafiz-ahmad-ali',
    title: 'اسلامک اسکالر حافظ القاری محمد احمد ربانی صاحب',
    category: 'leadership',
    categoryLabel: 'ادارتی قیادت و انتظامیہ',
    image: '/gallery/3. hafiz ahmad ali.jpeg',
    description: 'کنٹرولر امتحانات و ناظمِ تعلیمات (Controller of Examinations & Director of Education) جامعہ شیرِ ربانی۔ درسِ نظامی و حفظ القرآن کے جملہ تعلیمی شعبہ جات، امتحانی طریقہ کار، اساتذہ کی علمی سرپرستی اور طلبہ کی روحانی و تربیتی نشوونما کے ناظمِ اعلیٰ۔',
    tag: 'کنٹرولر امتحانات و ناظمِ تعلیمات',
    year: 'قیادت (2022ء تا حال)',
    badgeColor: 'bg-teal-700 text-white'
  },
  {
    id: 'gallery-4-abubakar-siddique',
    title: 'پروفیسر ابوبکر صدیق ربانی صاحب',
    category: 'leadership',
    categoryLabel: 'ادارتی قیادت و انتظامیہ',
    image: '/gallery/4. abubakar-siddique.jpeg',
    description: 'رجسٹرار، خزانچی، چیئرپرسن و ہیڈ آف ڈیپارٹمنٹس فار آل، جامعہ شیرِ ربانی۔ ادارے کے تمام شعبہ جات کے جملہ امور، جدید پورٹل، ڈیٹابیس آرکیٹیکچر، خودکار امتحانی سسٹم کے معمار اور نوجوانوں کے آئی ٹی انٹرن شپ پروگرام کے سپروائزر و مربی۔',
    tag: 'رجسٹرار، خزانچی و ہیڈ آف ڈیپارٹمنٹس فار آل',
    year: 'قیادت و انتظامیہ (2022ء تا حال)',
    badgeColor: 'bg-blue-700 text-white'
  },
  {
    id: 'gallery-5-peer-syed-iftikhar-shah',
    title: 'پروفیسر پیر سید افتخار الحسن شاہ صاحب',
    category: 'mashaikh',
    categoryLabel: 'اکابرین و مشائخِ عظام',
    image: '/gallery/5. Peer Syed Iftikhar ul hassan shah.jpeg',
    description: 'معروف روحانی پیشوا، سجادہ نشین آستانہ عالیہ اور صاحبِ نسبت بزرگ۔ خانقاہی نظام، تصوف و احسان کی ترویج اور سنتِ نبوی کے فروغ کے ساتھ جامعہ شیرِ ربانی مانانوالہ کے عظیم سرپرست، مربی اور دعا گو۔',
    tag: 'پروفیسر و سجادہ نشین',
    year: 'مشائخِ عظام',
    badgeColor: 'bg-purple-700 text-white'
  },
  {
    id: 'gallery-6-mufti-kashif-rafique',
    title: 'پروفیسر مفتی محافظ القاری مولانا محمد کاشف رفیق انجم (خطیبِ اعظم سرگودھا)',
    category: 'scholars',
    categoryLabel: 'پروفیسرز و علمائے کرام',
    image: '/gallery/6. Mufti Mohafiz al qari molana muhammad kashif rafique anjum al maroof katib ibn katib katib azam sarghooda.jpeg',
    description: 'پروفیسر مفتی محافظ القاری مولانا محمد کاشف رفیق انجم المعروف خطیب ابن خطیب، خطیبِ اعظم سرگودھا۔ جلیل القدر مناظرِ اسلام، مفتی و مصلح، خطابت و فصاحت کے بے تاج بادشاہ اور جامعہ شیرِ ربانی کے مخلص علمی و فکری سرپرست۔',
    tag: 'پروفیسر و خطیبِ اعظم',
    year: 'پروفیسرز فیکلٹی',
    badgeColor: 'bg-indigo-700 text-white'
  },
  {
    id: 'gallery-7-mufti-ahmad-jami-shah',
    title: 'پروفیسر پیر مفتی علامہ حافظ سید محمد احمد جامی شاہ نقشبندی مجددی',
    category: 'mashaikh',
    categoryLabel: 'اکابرین و مشائخِ عظام',
    image: '/gallery/7. Peer Mufti Allama Molana Hafiz Al Qari Syed Muhammad Ahmad Al maroof Jami Shah Naqshbandi Mujadadi.jpeg',
    description: 'پروفیسر پیر مفتی علامہ مولانا حافظ القاری سید محمد احمد المعروف جامی شاہ نقشبندی مجددی۔ صاحبِ علم و فضل، پیرِ طریقت، سلسلہ عالیہ نقشبندیہ مجددیہ کے مقتدر پیشوا اور جامعہ شیرِ ربانی کے روحانی سرپرست و مربی۔',
    tag: 'پروفیسر و پیرِ طریقت',
    year: 'مشائخ و فیکلٹی',
    badgeColor: 'bg-rose-700 text-white'
  },
  {
    id: 'gallery-8-ali-hamza',
    title: 'پروفیسر مولانا مفتی علی حمزہ صاحب',
    category: 'scholars',
    categoryLabel: 'پروفیسرز و علمائے کرام',
    image: '/gallery/8. ali-hamza.jpeg',
    description: 'پروفیسر، استاذ الحدیث، شعبہ تدریس و دار الافتاء جامعہ شیرِ ربانی مانانوالہ۔ علومِ شریعہ، فقہ و اصولِ فقہ، نحو و صرف اور عربی ادب کے سینئر پروفیسر اور طلبہ کی فقہی و فکری رہنمائی کے نگران۔',
    tag: 'پروفیسر و استاذ الحدیث',
    year: 'پروفیسرز فیکلٹی',
    badgeColor: 'bg-emerald-800 text-white'
  },
  {
    id: 'gallery-9-prof-rana-mubashar',
    title: 'پروفیسر پیر مفتی مولانا رانا محمد مبشر اکرم نقشبندی مجددی',
    category: 'mashaikh',
    categoryLabel: 'اکابرین و مشائخِ عظام',
    image: '/gallery/9. Prof. Peer Mufti Molana Rana Muhammad Mubashar Akram Naqsbandi Mujaddadi.jpeg',
    description: 'پروفیسر پیر مفتی مولانا رانا محمد مبشر اکرم نقشبندی مجددی۔ متبحر عالمِ دین، پروفیسر، سلسلہ عالیہ نقشبندیہ کے صاحبِ ارشاد پیرِ طریقت، باوقار خطیب اور جامعہ شیرِ ربانی کے علمی و روحانی معاون۔',
    tag: 'پروفیسر و پیرِ طریقت',
    year: 'مشائخ و فیکلٹی',
    badgeColor: 'bg-cyan-700 text-white'
  },
  {
    id: 'gallery-10-mufti-zeeshan-chisti',
    title: 'پروفیسر مفتی علامہ ذیشان علی چشتی صابری',
    category: 'scholars',
    categoryLabel: 'پروفیسرز و علمائے کرام',
    image: '/gallery/10. Mufti Allama Zeeshan Ali Chisti Sabri.jpeg',
    description: 'پروفیسر مفتی علامہ ذیشان علی چشتی صابری۔ فاضلِ شریعت، جید مفتی، سلسلہ چشتیہ صابریہ کے معتبر عالم، علومِ اسلامیہ و فقہ کے ماہر پروفیسر اور جامعہ شیرِ ربانی کے مخلص دینی و فکری رفیق۔',
    tag: 'پروفیسر و محققِ شریعت',
    year: 'پروفیسرز فیکلٹی',
    badgeColor: 'bg-violet-700 text-white'
  },
  {
    id: 'gallery-11-mufti-ali-murtaza',
    title: 'پروفیسر مفتی علامہ علی مرتضیٰ سیالوی (استاذ العلماء)',
    category: 'scholars',
    categoryLabel: 'پروفیسرز و علمائے کرام',
    image: '/gallery/11. Mufti Allama Ali Murtaza Sialwi.jpeg',
    description: 'پروفیسر مفتی علامہ علی مرتضیٰ سیالوی۔ استاذ العلماء، جید فقیہ و مفتی، درگاہ معلیٰ سیال شریف کی علمی و روحانی نسبت کے امین اور جامعہ شیرِ ربانی کے تعلیمی و تحقیقی شعبہ جات کے معاون و ناصح۔',
    tag: 'پروفیسر و استاذ العلماء',
    year: 'پروفیسرز فیکلٹی',
    badgeColor: 'bg-teal-800 text-white'
  },
  {
    id: 'gallery-12-mufti-asad-abbas',
    title: 'پروفیسر مفتی علامہ اسد عباس چشتی',
    category: 'scholars',
    categoryLabel: 'پروفیسرز و علمائے کرام',
    image: '/gallery/12. Mufti Allama Asad Abbas Chisti.jpeg',
    description: 'پروفیسر مفتی علامہ اسد عباس چشتی۔ جلیل القدر مفتی، عالمِ باعمل، سلسلہ عالیہ چشتیہ کے باکمال فاضل، تدریس و فتاویٰ نویسی کے میدان میں سرگرم علمی شخصیت اور جامعہ کے بہی خواہ۔',
    tag: 'پروفیسر و مدرسِ شریعت',
    year: 'پروفیسرز فیکلٹی',
    badgeColor: 'bg-amber-700 text-white'
  },
  {
    id: 'gallery-13-prof-dr-ameen-bhatti',
    title: 'پروفیسر ڈاکٹر مفتی محمد امین بھٹی صاحب',
    category: 'scholars',
    categoryLabel: 'پروفیسرز و علمائے کرام',
    image: '/gallery/13. Prof. Dr. Mufti Muhammad Ameen Bhatti Sahib.png',
    description: 'پروفیسر ڈاکٹر مفتی محمد امین بھٹی صاحب۔ بین الاقوامی محقق، پروفیسر، مفتی و متبحر اسلامی اسکالر۔ فقہی تحقیقات، یونیورسٹی سطح کے نصاب و مقالات کے نگراں اور جامعہ شیرِ ربانی کے تعلیمی و تحقیقی سرپرستِ اعلیٰ۔',
    tag: 'پروفیسر ڈاکٹر و مفتیِ اعظم',
    year: 'پروفیسرز و محققین',
    badgeColor: 'bg-emerald-900 text-white'
  }
];
