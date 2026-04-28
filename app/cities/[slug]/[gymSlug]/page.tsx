import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import GymReviews from '@/components/GymReviews'
import type { Metadata } from 'next'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string; gymSlug: string }> }
): Promise<Metadata> {
  const { slug, gymSlug } = await params

  const { data: city } = await supabase
    .from('cities')
    .select('*')
    .eq('slug', slug)
    .single()

  const { data: gym } = await supabase
    .from('gyms')
    .select('*')
    .eq('slug', gymSlug)
    .single()

  if (!gym || !city) return { title: 'Gym Not Found' }

  const sports = gym.sports
    ? gym.sports.split(',').map((s: string) => s.trim()).join(', ')
    : ''

  const sportKeywords = gym.sports
    ? gym.sports.split(',').map((s: string) => `${s.trim()} gym ${city.name}`)
    : []

  return {
    title: `${gym.name} — ${city.name} | FightAtlas`,
    description: `${gym.name} in ${city.name}, ${city.country}. ${sports} gym. ${gym.description?.slice(0, 120) ?? ''}`,
    keywords: [
      gym.name,
      `${gym.name} ${city.name}`,
      ...sportKeywords,
      `martial arts ${city.name}`,
      `combat sports ${city.name}`,
    ],
    openGraph: {
      title: `${gym.name} — ${city.name}`,
      description: `${gym.name} in ${city.name}. ${sports} training for all levels.`,
      type: 'website',
      images: gym.image_url ? [{ url: gym.image_url }] : [],
    },
  }
}

export default async function GymPage({ params }: { params: Promise<{ slug: string; gymSlug: string }> }) {
  const { slug, gymSlug } = await params

  const { data: city } = await supabase
    .from('cities')
    .select('*')
    .eq('slug', slug)
    .single()

  const { data: gym } = await supabase
    .from('gyms')
    .select('*')
    .eq('slug', gymSlug)
    .single()

  if (!gym) return <div className="p-8 text-white">Gym not found</div>

  return (
    <main className="min-h-screen" style={{ background: '#0a0a0f' }}>

      {/* Hero */}
      <section className="relative h-80 flex items-end px-6 pb-8">
        {gym.image_url ? (
          <img
            src={gym.image_url}
            alt={gym.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #1a0a0f, #0a0f1a)' }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 100%)' }}
        />
        <div className="relative z-10 w-full">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>→</span>
            <Link href={`/cities/${slug}`} className="hover:text-white">{city?.name}</Link>
            <span>→</span>
            <span className="text-white">{gym.name}</span>
          </div>
          <h1 className="text-5xl font-black mb-2">{gym.name}</h1>
          <p className="text-gray-400">{gym.address}</p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-12 max-w-4xl mx-auto">

        {/* Sports Tags */}
        <div className="flex flex-wrap gap-3 mb-8">
          {gym.sports?.split(',').map((sport: string) => (
            <span
              key={sport}
              className="px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: '#1e1e2e', color: '#e63946' }}>
              {sport.trim()}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          {/* Description */}
          <div
            className="rounded-2xl p-6 md:col-span-2"
            style={{ background: '#12121a', border: '1px solid #1e1e2e' }}>
            <h2 className="text-lg font-black mb-3">About {gym.name}</h2>
            <p className="text-gray-400 leading-relaxed">{gym.description}</p>
          </div>

          {/* Location */}
          <div
            className="rounded-2xl overflow-hidden md:col-span-2"
            style={{ border: '1px solid #1e1e2e' }}>
            <div className="p-6" style={{ background: '#12121a' }}>
              <h2 className="text-lg font-black mb-1">📍 Location</h2>
              <p className="text-gray-400 mb-4">{gym.address}</p>
            </div>
            {gym.google_maps_url && (
              <iframe
                src={gym.google_maps_url}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            )}
          </div>

          {/* Website */}
          <div
            className="rounded-2xl p-6"
            style={{ background: '#12121a', border: '1px solid #1e1e2e' }}>
            <h2 className="text-lg font-black mb-3">🌐 Website</h2>
            {gym.website ? (
              
              <a href={gym.website.startsWith('http') ? gym.website : `https://${gym.website}`} target="_blank" rel="noopener noreferrer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors">
                {gym.website}
              </a>
            ) : (
              <p className="text-gray-600">No website listed</p>
            )}
          </div>

          {/* City */}
          <div
            className="rounded-2xl p-6"
            style={{ background: '#12121a', border: '1px solid #1e1e2e' }}>
            <h2 className="text-lg font-black mb-3">🏙️ City</h2>
            <Link
              href={`/cities/${slug}`}
              className="text-gray-400 hover:text-white transition-colors">
              More gyms in {city?.name} →
            </Link>
          </div>

          {/* Community Reviews */}
          <GymReviews gymId={gym.id} />

        </div>

        {/* Back Button */}
        <Link
          href={`/cities/${slug}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all hover:opacity-90"
          style={{ background: '#e63946', color: 'white' }}>
          ← Back to {city?.name}
        </Link>
      </section>
    </main>
  )
}