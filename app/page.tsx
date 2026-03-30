import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default async function Home() {
  const { data: cities } = await supabase.from('cities').select('*').order('display_order', { ascending: true })

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{
          background: 'radial-gradient(ellipse at center, #1a0a0f 0%, #0a0a0f 70%)',
        }}>

        {/* Glowing background effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ background: '#e63946' }} />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#e63946' }}>
            The World is Your Gym
          </p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 leading-none">
            FIGHT<span style={{ color: '#e63946' }}>ATLAS</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Find the best combat sports gyms in every city. Train like a local, wherever you travel.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-16">
            <input
              type="text"
              placeholder="Search a city... Bangkok, Rio, NYC"
              className="flex-1 px-6 py-4 rounded-full text-white placeholder-gray-500 outline-none"
              style={{
                background: '#12121a',
                border: '1px solid #1e1e2e',
              }}
            />
            <button
              className="px-8 py-4 rounded-full font-bold text-white transition-all hover:opacity-90"
              style={{ background: '#e63946' }}>
              Search
            </button>
          </div>

          {/* Sport Tags */}
          <div className="flex flex-wrap justify-center gap-3">
            {['🥊 Boxing', '🥋 BJJ', '🤼 MMA', '🦵 Muay Thai', '🤸 Wrestling', '🥋 Judo'].map((sport) => (
              <span key={sport}
                className="px-4 py-2 rounded-full text-sm text-gray-400 cursor-pointer hover:text-white transition-all"
                style={{ background: '#12121a', border: '1px solid #1e1e2e' }}>
                {sport}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
          <span className="text-xs tracking-widest uppercase">Explore</span>
          <div className="w-px h-8 bg-gray-600 animate-pulse" />
        </div>
      </section>

      {/* Cities Section */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <h2 className="text-3xl font-black mb-2">Top Destinations</h2>
        <p className="text-gray-400 mb-12">The world's best cities for combat sports training</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities?.map((city) => (
            <Link href={`/cities/${city.slug}`} key={city.id}>
              <div className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-105"
                style={{ height: '200px' }}>

                {/* City Image */}
                {city.image_url ? (
                  <img
                    src={city.image_url}
                    alt={city.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, #1a0a0f, #0a0f1a)' }} />
                )}

                {/* Dark overlay */}
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)' }} />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-black">{city.name}</h3>
                  <p className="text-gray-300 text-sm">{city.country}</p>
                </div>

                {/* Hover accent */}
                <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: '#e63946' }} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}