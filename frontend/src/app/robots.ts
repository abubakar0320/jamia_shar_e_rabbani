import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jamiashererabbani.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/admin/',
          '/api/admin-auth/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
