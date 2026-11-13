import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AdSenseLoader from "@/components/AdSenseLoader";
import "./globals.css";
import { Providers } from "./providers";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1e3a8a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jamiashererabbani.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jamia Sher-e-Rabbani | Mananwala, District Sheikhupura",
    template: "%s | Jamia Sher-e-Rabbani",
  },
  description:
    "Official portal of Jamia Sher-e-Rabbani, Mananwala, District Sheikhupura. Dedicated to the preservation and dissemination of sacred Islamic knowledge (Dars-e-Nizami, Hifz, Tajweed, Takhassus) through contemporary academic excellence.",
  keywords: [
    "Jamia Sher-e-Rabbani",
    "جامعہ شیرِ ربانی",
    "Islamic Seminary Pakistan",
    "Dars-e-Nizami",
    "Wafaq ul Madaris",
    "Hifz ul Quran",
    "Mananwala Sheikhupura",
    "Islamic Education",
    "Madrasa Admission",
    "Online Islamic Courses"
  ],
  authors: [{ name: "Jamia Sher-e-Rabbani", url: siteUrl }],
  creator: "Jamia Sher-e-Rabbani",
  publisher: "Jamia Sher-e-Rabbani",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/images/optimized/logo-apple.png",
    shortcut: "/images/optimized/logo-apple.png",
    apple: "/images/optimized/logo-apple.png",
  },
  openGraph: {
    type: "website",
    locale: "ur_PK",
    alternateLocale: "en_PK",
    url: siteUrl,
    title: "Jamia Sher-e-Rabbani | Mananwala, District Sheikhupura",
    description:
      "Official portal of Jamia Sher-e-Rabbani, Mananwala, District Sheikhupura. Dedicated to the preservation and dissemination of sacred Islamic knowledge through contemporary academic excellence.",
    siteName: "Jamia Sher-e-Rabbani",
    images: [
      {
        url: "/logo.jpeg",
        width: 800,
        height: 800,
        alt: "Jamia Sher-e-Rabbani Official Logo",
      },
      {
        url: "/images/hero%20section%201.jpeg",
        width: 1200,
        height: 630,
        alt: "Jamia Sher-e-Rabbani Campus Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jamia Sher-e-Rabbani | Mananwala, District Sheikhupura",
    description:
      "Official portal of Jamia Sher-e-Rabbani, Mananwala, District Sheikhupura. Admissions open for Dars-e-Nizami, Hifz, and Islamic Studies.",
    images: ["/images/hero%20section%201.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "google-adsense-account": "ca-pub-5810661605612266",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Jamia Sher-e-Rabbani",
  "alternateName": "جامعہ شیرِ ربانی مانانوالہ",
  "url": siteUrl,
  "logo": `${siteUrl}/logo.jpeg`,
  "image": `${siteUrl}/images/hero%20section%201.jpeg`,
  "description":
    "Premier Islamic seminary dedicated to sacred Islamic scholarship, Dars-e-Nizami, Tehfeez-ul-Quran, Tajweed-o-Qirat, and contemporary education.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jamia Sher-e-Rabbani, Near Railway Station",
    "addressLocality": "Mananwala, District Sheikhupura",
    "addressRegion": "Punjab",
    "postalCode": "39320",
    "addressCountry": "PK",
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+92-314-4081516",
    "contactType": "Admissions & Inquiries",
    "email": "jamiashererabbani07@gmail.com",
    "availableLanguage": ["Urdu", "Arabic", "English"],
  },
  "sameAs": [
    "https://facebook.com",
    "https://youtube.com"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ur" dir="rtl">
      <head>
        <link
          rel="preload"
          href="/fonts/noto-nastaliq-urdu.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        {children}
        <FloatingWhatsApp />
        <Providers />
        <AdSenseLoader />
      </body>
    </html>
  );
}
