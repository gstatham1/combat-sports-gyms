import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default async function GymPage({ params }: { params: Promise<{ slug: string, gymSlug: string }> }) {
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
          <img src={gym.image_url} alt={gym.name}
            className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #1a0a0f, #0a0f1a)' }} />
        )}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 100%)' }} />
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
            <span key={sport}
              className="px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: '#1e1e2e', color: '#e63946' }}>
              {sport.trim()}
            </span>
          ))}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          {/* Description */}
          <div className="rounded-2xl p-6 md:col-span-2"
            style={{ background: '#12121a', border: '1px solid #1e1e2e' }}>
            <h2 className="text-lg font-black mb-3">About</h2>
            <p className="text-gray-400 leading-relaxed">{gym.description}</p>
          </div>

          {/* Address */}
          <div className="rounded-2xl p-6"
            style={{ background: '#12121a', border: '1px solid #1e1e2e' }}>
            <h2 className="text-lg font-black mb-3">📍 Location</h2>
            <p className="text-gray-400">{gym.address}</p>
            {gym.google_maps_url && (
              <a href={gym.google_maps_url} target="_blank" rel="noopener noreferrer"
                className="inline-block mt-4 text-sm font-semibold"
                style={{ color: '#e63946' }}>
                Open in Google Maps →
              </a>
            )}
          </div>

          {/* Website */}
          <div className="rounded-2xl p-6"
            style={{ background: '#12121a', border: '1px solid #1e1e2e' }}>
            <h2 className="text-lg font-black mb-3">🌐 Website</h2>
            {gym.website ? (
              <a href={`https://${gym.website}`} target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors">
                {gym.website}
              </a>
            ) : (
              <p className="text-gray-600">No website listed</p>
            )}
          </div>
        </div>

        {/* Back Button */}
        <Link href={`/cities/${slug}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all hover:opacity-90"
          style={{ background: '#e63946', color: 'white' }}>
          ← Back to {city?.name}
        </Link>
      </section>
    </main>
  )
}