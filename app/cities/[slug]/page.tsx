import { supabase } from '@/lib/supabase'
import Link from 'next/link'

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
          <Link href="/" className="text-gray-400 text-sm hover:text-white mb-4 block">
            ← Back to all cities
          </Link>
          <h1 className="text-5xl font-black">{city.name}</h1>
          <p className="text-gray-400">{city.country}</p>
        </div>
      </section>

      <section className="px-6 py-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-black mb-2">Gyms in {city.name}</h2>
        <p className="text-gray-400 mb-8">{gyms?.length || 0} gyms found</p>

        {/* Sport Filter */}
        <div className="flex flex-wrap gap-3 mb-10">
          {['All', '🥊 Boxing', '🥋 BJJ', '🤼 MMA', '🦵 Muay Thai', '🤸 Wrestling'].map((sport) => (
            <span key={sport}
              className="px-4 py-2 rounded-full text-sm cursor-pointer transition-all hover:text-white"
              style={{
                background: sport === 'All' ? '#e63946' : '#12121a',
                border: '1px solid #1e1e2e',
                color: sport === 'All' ? 'white' : '#9ca3af'
              }}>
              {sport}
            </span>
          ))}
        </div>

        {/* Gym Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gyms?.map((gym) => (
            <Link href={`/cities/${city.slug}/${gym.slug}`} key={gym.id}>
              <div className="group rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-105"
                style={{ background: '#12121a', border: '1px solid #1e1e2e' }}>

                {/* Image */}
                <div className="h-48 relative overflow-hidden">
                  {gym.image_url ? (
                    <img
                      src={gym.image_url}
                      alt={gym.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl"
                      style={{ background: 'linear-gradient(135deg, #1a0a0f, #0a0f1a)' }}>
                      🥊
                    </div>
                  )}
                  {/* Red top border on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: '#e63946' }} />
                  {/* Dark overlay on image */}
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)' }} />
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-lg font-black mb-1">{gym.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">📍 {gym.address}</p>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{gym.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {gym.sports?.split(',').map((sport: string) => (
                      <span key={sport}
                        className="px-3 py-1 rounded-full text-xs"
                        style={{ background: '#1e1e2e', color: '#e63946' }}>
                        {sport.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {gyms?.length === 0 && (
          <div className="text-center py-24 text-gray-500">
            <p className="text-4xl mb-4">🥊</p>
            <p className="text-xl">No gyms listed yet in {city.name}</p>
            <p className="mt-2">Be the first to submit one!</p>
          </div>
        )}
      </section>
    </main>
  )
}