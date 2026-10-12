import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jamiashererabbani.com';
  const currentDate = new Date().toISOString();

  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/admissions`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/admissions/status`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/donations`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/wafaq-results`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/faculty`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faculty-profile`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/islamic-research-center`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/internship`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/internship/program-details`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/roll-number-slip`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/program`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/exam-mess`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/developer`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ];

  return routes;
}
