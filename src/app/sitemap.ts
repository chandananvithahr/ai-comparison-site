import { MetadataRoute } from 'next'
import { getAllComparisonSlugs, getAllToolSlugs, getAllBestForSlugs } from '@/lib/mdx'

const BASE_URL = 'https://aitoolvs.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const comparisonSlugs = getAllComparisonSlugs()
  const toolSlugs = getAllToolSlugs()
  const bestForSlugs = getAllBestForSlugs()

  const comparisonRoutes = comparisonSlugs.map((slug) => ({
    url: `${BASE_URL}/compare/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const toolRoutes = toolSlugs.map((slug) => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const bestForRoutes = bestForSlugs.map((slug) => ({
    url: `${BASE_URL}/best-for/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...comparisonRoutes,
    ...toolRoutes,
    ...bestForRoutes,
  ]
}
