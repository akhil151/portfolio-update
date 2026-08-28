import { MetadataRoute } from 'next'
import { site } from "@/config/site"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = site.canonicalUrl

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'], // block private/internal routes
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}