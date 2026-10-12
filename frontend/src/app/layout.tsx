import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    default: "Jamia Sher-e-Rabbani | Mananwala, Sheikhupura",
    template: "%s | Jamia Sher-e-Rabbani",
  },
  description:
    "Official portal of Jamia Sher-e-Rabbani, Mananwala. Dedicated to the preservation and dissemination of sacred Islamic knowledge (Dars-e-Nizami, Hifz, Tajweed, Takhassus) through contemporary academic excellence.",
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
    icon: "/logo.jpeg",
    shortcut: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  openGraph: {
    type: "website",
    locale: "ur_PK",
    alternateLocale: "en_PK",
    url: siteUrl,
    title: "Jamia Sher-e-Rabbani | Mananwala, Sheikhupura",
    description:
      "Official portal of Jamia Sher-e-Rabbani, Mananwala. Dedicated to the preservation and dissemination of sacred Islamic knowledge through contemporary academic excellence.",
    siteName: "Jamia Sher-e-Rabbani",
    images: [
      {
        url: "/logo.jpeg",
        width: 800,
        height: 800,
        alt: "Jamia Sher-e-Rabbani Official Logo",
      },
      {
        url: "/results_hero_banner.jpg",
        width: 1200,
        height: 630,
        alt: "Jamia Sher-e-Rabbani Campus Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jamia Sher-e-Rabbani | Mananwala, Sheikhupura",
    description:
      "Official portal of Jamia Sher-e-Rabbani, Mananwala. Admissions open for Dars-e-Nizami, Hifz, and Islamic Studies.",
    images: ["/results_hero_banner.jpg"],
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
  "image": `${siteUrl}/results_hero_banner.jpg`,
  "description":
    "Premier Islamic seminary dedicated to sacred Islamic scholarship, Dars-e-Nizami, Tehfeez-ul-Quran, Tajweed-o-Qirat, and contemporary education.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jamia Sher-e-Rabbani, Near Railway Station",
    "addressLocality": "Mananwala",
    "addressRegion": "Punjab",
    "postalCode": "39320",
    "addressCountry": "PK",
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+92-314-4081516",
    "contactType": "Admissions & Inquiries",
    "email": "shererabbani@gmail.com",
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
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5810661605612266"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
