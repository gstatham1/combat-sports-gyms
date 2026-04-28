import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import GymFilter from '@/components/GymFilter'
import type { Metadata } from 'next'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const { data: city } = await supabase
    .from('cities')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!city) return { title: 'City Not Found' }

  return {
    title: `Best Combat Sports Gyms in ${city.name}`,
    description: `Find the best MMA, BJJ, Muay Thai and Boxing gyms in ${city.name}, ${city.country}. Verified gyms for combat sports travelers.`,
    keywords: [
      `MMA gym ${city.name}`,
      `BJJ gym ${city.name}`,
      `Muay Thai gym ${city.name}`,
      `boxing gym ${city.name}`,
      `combat sports ${city.name}`,
      `martial arts ${city.name}`,
    ],
    openGraph: {
      title: `Best Combat Sports Gyms in ${city.name}`,
      description: `Find the best MMA, BJJ, Muay Thai and Boxing gyms in ${city.name}, ${city.country}.`,
      type: 'website',
    },
  }
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const { data: city } = await supabase
    .from('cities')
    .select('*')
    .eq('slug', slug)
    .single()

  const { data: gyms } = await supabase
    .from('gyms')
    .select('*')
    .eq('city_id', city?.id)

  if (!city) return (
    <div className="p-8 text-white">
      <p>City not found</p>
    </div>
  )

  return (
    <main className="min-h-screen" style={{ background: '#0a0a0f' }}>

      {/* Hero */}
      <section className="relative h-64 flex items-end px-6 pb-8">
        {city.image_url ? (
          <img src={city.image_url} alt={city.name}
            className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #1a0a0f, #0a0f1a)' }} />
        )}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 100%)' }} />
        <div className="relative z-10">
          <Link href="/cities" className="text-gray-400 text-sm hover:text-white mb-4 block">
            ← Back to all cities
          </Link>
          <h1 className="text-5xl font-black">{city.name}</h1>
          <p className="text-gray-400">{city.country}</p>
        </div>
      </section>

      <section className="px-6 py-12 max-w-7xl mx-auto">
        {/* SEO intro */}
        <div className="mb-10">
          <h2 className="text-2xl font-black mb-2">
            Combat Sports Gyms in {city.name}
          </h2>
          <p className="text-gray-400 max-w-2xl">
            Looking to train MMA, BJJ, Muay Thai or Boxing in {city.name}?
            FightAtlas has curated the best combat sports gyms in {city.name}, {city.country}
            for travelers and locals alike.
          </p>
        </div>

        {/* Gym Filter Component */}
        <GymFilter gyms={gyms || []} city={city} />
      </section>
    </main>
  )
}