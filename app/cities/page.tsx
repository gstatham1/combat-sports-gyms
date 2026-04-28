import { supabase } from '@/lib/supabase'
import GlobeBackground from '@/components/GlobeBackground'
import CitySearch from '@/components/CitySearch'

export default async function CitiesPage() {
  const { data: cities } = await supabase
    .from('cities')
    .select('*')
    .order('display_order', { ascending: true })

  return (
    <main style={{ background: '#0a0a0f' }}>

      {/* Hero Section with Globe Background */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

        {/* Globe Background */}
        <GlobeBackground />

        {/* Dark overlay */}
        <div className="absolute inset-0 z-10"
          style={{ background: 'radial-gradient(ellipse at center, rgba(10,10,15,0.6) 0%, rgba(10,10,15,0.85) 70%)' }} />

        {/* Glowing red orb */}
        <div className="absolute inset-0 z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-15 blur-3xl"
            style={{ background: '#e63946' }} />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-4xl mx-auto">
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
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-gray-600">
          <span className="text-xs tracking-widest uppercase">Top Destinations</span>
          <div className="w-px h-8 bg-gray-600 animate-pulse" />
        </div>
      </section>

      {/* Search + Cities Grid */}
      <CitySearch cities={cities || []} />

    </main>
  )
}