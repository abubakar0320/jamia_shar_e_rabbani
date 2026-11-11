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
    id: 'gallery-0-mian-jameel-ahmad-sharqpoori',
    title: 'فخر المشائخ، پیرِ طریقت، رہبرِ شریعت میاں جمیل احمد نقشبندی مجددی شرقپوری صاحب',
    category: 'mashaikh',
    categoryLabel: 'اکابرین و مشائخِ عظام',
    image: '/gallery/1.1 Fakhir ul mashaiq peer tareeqaqat rehbre shareeyat mian jameel ahmad naqsbandi mujadaadi sharqpoori sajada nasheen astana alia mian shere rabbani.png',
    description: 'فخر المشائخ، پیرِ طریقت، رہبرِ شریعت، سجادہ نشین آستانہ عالیہ میاں شیرِ ربانی شرقپور شریف۔ سلسلہ عالیہ نقشبندیہ مجددیہ کے عظیم پیشوا اور جامعہ شیرِ ربانی مانانوالہ کے روحانی سرپرستِ اعلیٰ۔',
    tag: 'سجادہ نشین شرقپور شریف',
    year: 'اکابرینِ اہلِ سنت',
    badgeColor: 'bg-amber-600 text-white'
  },
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
    id: 'gallery-0-1-molvi-manzoor-ahmad',
    title: 'مولانا مولوی منظور احمد نقشبندی مجددی صاحب',
    category: 'leadership',
    categoryLabel: 'ادارتی قیادت و بانیان',
    image: '/gallery/Mollana Molvi Manzoor Ahmad Naqsbandi Mujadadi.jpeg',
    description: 'بانیِ اول جامعہ شیرِ ربانی مانانوالہ (1992ء)۔ آپ نے اسلامی تعلیمات کے فروغ، دینی اقدار کے تحفظ اور روحانی و اخلاقی نشوونما کے عظیم وژن کے تحت 1992ء میں مدرسہ شیرِ ربانی کا سنگِ بنیاد رکھا، جس کے فیض سے آج جامعہ شیرِ ربانی ایک عظیم تعلیمی و دینی یونیورسٹی کے طور پر فیض رساں ہے۔',
    tag: 'بانیِ اول (سنگِ بنیاد 1992ء)',
    year: '1992ء',
    badgeColor: 'bg-emerald-900 text-white'
  },
  {
    id: 'gallery-1-1-chancellor-muhammad-yousaf',
    title: 'مولانا الحاج صوبیدار محمد یوسف نقشبندی مجددی صاحب',
    category: 'leadership',
    categoryLabel: 'ادارتی قیادت و انتظامیہ',
    image: '/gallery/1.1مولانا الحاج صوبیدار محمد یوسف نقشبندی مجددی صاحب.jpeg',
    description: 'فاضلِ جامعہ شیرِ ربانی (الشہادۃ العالمیہ)، چانسلر و سرپرستِ اعلیٰ، جامعہ شیرِ ربانی مانانوالہ۔ آپ ۳۰ سالہ عسکری نظم و ضبط اور ۲۴ سالہ دینی اخلاص، اور سلسلہ عالیہ نقشبندیہ مجددیہ کے روحانی فیضان کے امین ہیں۔',
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
    description: 'فاضلِ جامعہ شیرِ ربانی (الشہادۃ العالمیہ)، وائس چانسلر و ڈینِ فیکلٹی آف اسلامک اسٹڈیز، جامعہ شیرِ ربانی مانانوالہ۔ علومِ شریعہ و حدیث کے ممتاز محقق و استاد، مصنف، پی ایچ ڈی اسکالر اور جامعہ کے تعلیمی ارتقاء کی کلیدی شخصیت۔',
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
    description: 'فاضلِ جامعہ شیرِ ربانی (الشہادۃ العالمیہ)، کنٹرولر امتحانات و ناظمِ تعلیمات (Controller of Examinations & Director of Education) جامعہ شیرِ ربانی۔ درسِ نظامی و حفظ القرآن کے جملہ تعلیمی شعبہ جات اور امتحانی نظم کے نگران۔',
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
    description: 'فاضلِ جامعہ شیرِ ربانی (الشہادۃ العالمیہ) و بی ایس آئی ٹی، رجسٹرار، خزانچی، چیئرپرسن و ہیڈ آف ڈیپارٹمنٹس فار آل، جامعہ شیرِ ربانی۔ ادارے کے تمام شعبہ جات، جدید پورٹل، ڈیٹابیس اور خودکار امتحانی سسٹم کے معمار۔',
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
    description: 'فاضلِ جامعہ شیرِ ربانی (الشہادۃ العالمیہ)، معروف روحانی پیشوا، سجادہ نشین آستانہ عالیہ اور صاحبِ نسبت بزرگ۔ خانقاہی نظام، تصوف و احسان کی ترویج اور جامعہ شیرِ ربانی مانانوالہ کے عظیم سرپرست، مربی اور دعا گو۔',
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
    description: 'فاضلِ جامعہ شیرِ ربانی (الشہادۃ العالمیہ)، پروفیسر مفتی محافظ القاری مولانا محمد کاشف رفیق انجم المعروف خطیب ابن خطیب، خطیبِ اعظم سرگودھا۔ جلیل القدر مناظرِ اسلام، مفتی و مصلح، خطابت کے بے تاج بادشاہ۔',
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
    description: 'فاضلِ جامعہ شیرِ ربانی (الشہادۃ العالمیہ)، پروفیسر پیر مفتی علامہ مولانا حافظ القاری سید محمد احمد المعروف جامی شاہ نقشبندی مجددی۔ صاحبِ علم و فضل، پیرِ طریقت اور جامعہ کے روحانی سرپرست و مربی۔',
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
    description: 'فاضلِ جامعہ شیرِ ربانی (الشہادۃ العالمیہ)، پروفیسر، استاذ الحدیث، شعبہ تدریس و دار الافتاء جامعہ شیرِ ربانی مانانوالہ۔ علومِ شریعہ، فقہ و اصولِ فقہ، نحو و صرف اور عربی ادب کے سینئر پروفیسر۔',
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
    description: 'فاضلِ جامعہ شیرِ ربانی (الشہادۃ العالمیہ)، پروفیسر پیر مفتی مولانا رانا محمد مبشر اکرم نقشبندی مجددی۔ متبحر عالمِ دین، ایم فل/پی ایچ ڈی اسکالر، سلسلہ عالیہ نقشبندیہ کے صاحبِ ارشاد پیرِ طریقت۔',
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
    description: 'فاضلِ جامعہ شیرِ ربانی (الشہادۃ العالمیہ)، پروفیسر مفتی علامہ ذیشان علی چشتی صابری۔ فاضلِ شریعت، جید مفتی، سلسلہ چشتیہ صابریہ کے معتبر عالم، علومِ اسلامیہ و فقہ کے ماہر پروفیسر۔',
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
    description: 'فاضلِ جامعہ شیرِ ربانی (الشہادۃ العالمیہ)، پروفیسر مفتی علامہ علی مرتضیٰ سیالوی۔ استاذ العلماء، جید فقیہ و مفتی، درگاہ معلیٰ سیال شریف کی علمی و روحانی نسبت کے امین۔',
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
    description: 'فاضلِ جامعہ شیرِ ربانی (الشہادۃ العالمیہ)، پروفیسر مفتی علامہ اسد عباس چشتی۔ جلیل القدر مفتی، عالمِ باعمل، سلسلہ عالیہ چشتیہ کے باکمال فاضل اور تدریس و فتاویٰ نویسی کے ماہر۔',
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
    description: 'فاضلِ جامعہ شیرِ ربانی (الشہادۃ العالمیہ)، پروفیسر ڈاکٹر مفتی محمد امین بھٹی صاحب۔ پی ایچ ڈی علومِ اسلامیہ، بین الاقوامی محقق، پروفیسر، مفتی و متبحر اسلامی اسکالر۔',
    tag: 'پروفیسر ڈاکٹر و مفتیِ اعظم',
    year: 'پروفیسرز و محققین',
    badgeColor: 'bg-emerald-900 text-white'
  },
  {
    id: 'gallery-14-prof-dr-hamid-zyah',
    title: 'پروفیسر ڈاکٹر مفتی حافظ القاری حامد ضیاء الحبیب صاحب',
    category: 'scholars',
    categoryLabel: 'پروفیسرز و علمائے کرام',
    image: '/gallery/14. Prof. Dr. Mufti Hafiz UL qari Hamid Zyah ul Habib Sahib.png',
    description: 'فاضلِ جامعہ شیرِ ربانی (الشہادۃ العالمیہ)، پروفیسر ڈاکٹر مفتی حافظ القاری حامد ضیاء الحبیب صاحب۔ پی ایچ ڈی علومِ اسلامیہ، مفتی و محقق، علوم القرآن و تجوید کے ماہر۔',
    tag: 'پروفیسر ڈاکٹر و قاری',
    year: 'پروفیسرز فیکلٹی',
    badgeColor: 'bg-teal-700 text-white'
  },
  {
    id: 'gallery-15-peer-syed-abdul-wahab-shah',
    title: 'پیر سید حافظ القاری عبد الوہاب شاہ گیلانی صاحب',
    category: 'mashaikh',
    categoryLabel: 'اکابرین و مشائخِ عظام',
    image: '/syed zady/14. Peer Syed Hafiz ul qari Abdul Wahab Shah Ghillani Sahib.png',
    description: 'سلالۂ سادات، پیرِ طریقت، سجادہ نشین آستانہ عالیہ گیلانیہ، حافظ و قاریِ قرآن مجید۔ جامعہ شیرِ ربانی مانانوالہ کے عظیم روحانی سرپرست اور تشریف آوری فرمانے والے معزز سید زادہ۔',
    tag: 'سلالۂ سادات و پیرِ طریقت',
    year: 'سادات و مشائخ',
    badgeColor: 'bg-emerald-800 text-white'
  }
];
