import { supabase } from '@/lib/supabase'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://fightatlas.com'

  const { data: cities } = await supabase
    .from('cities')
    .select('slug, id')

  const { data: gyms } = await supabase
    .from('gyms')
    .select('slug, city_id')

  const cityPages = cities?.map(city => ({
    url: `${baseUrl}/cities/${city.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })) || []

  const gymPages = gyms?.map(gym => {
    const city = cities?.find(c => c.id === gym.city_id)
    if (!city) return null
    return {
      url: `${baseUrl}/cities/${city.slug}/${gym.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }
  }).filter(Boolean) || []

  return [
    {
      url: baseUrl,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/cities`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...cityPages,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(gymPages as any),
  ]
}