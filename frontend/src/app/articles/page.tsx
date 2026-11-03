import { Metadata } from 'next';
import ArticlesClient from './ArticlesClient';

export const metadata: Metadata = {
  title: 'علمی و تحقیقی مضامین | جامعہ شیرِ ربانی',
  description: 'جامعہ شیرِ ربانی مانانوالہ کے علمی و تحقیقی مضامین۔ قرآن مجید، حدیث و سنت، فقہ اسلامی، سیرت و تاریخ اور عصر حاضر کے مسائل پر مستند دینی رہنمائی۔',
  keywords: [
    'علمی مضامین',
    'اسلامی مقالات',
    'قرآن و تفسیر',
    'حدیث و سنت',
    'فقہ اسلامی',
    'جامعہ شیر ربانی مانانوالہ',
    'اسلامی تاریخ',
    'سیرت النبی',
    'تصوف و اصلاح',
    'دینی تعلیم'
  ],
  openGraph: {
    title: 'علمی و تحقیقی مضامین | جامعہ شیرِ ربانی',
    description: 'جامعہ شیرِ ربانی مانانوالہ کے علمی و تحقیقی مضامین۔ قرآن، حدیث، فقہ، سیرت اور عصر حاضر کے مسائل پر مستند دینی رہنمائی۔',
    type: 'website',
    locale: 'ur_PK',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'علمی و تحقیقی مضامین | جامعہ شیرِ ربانی',
    description: 'قرآن و سنت کی روشنی میں علم، تحقیق، اصلاح اور رہنمائی کا ایک مستند علمی پلیٹ فارم۔',
  },
};

export default function ArticlesPage() {
  return <ArticlesClient />;
}
