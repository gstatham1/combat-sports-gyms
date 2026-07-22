import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import type { Metadata } from 'next'

const SPORT_META: Record<string, { label: string, emoji: string, description: string }> = {
  'bjj': { label: 'BJJ', emoji: '🥋', description: 'Brazilian Jiu-Jitsu' },
  'muay-thai': { label: 'Muay Thai', emoji: '🦵', description: 'Muay Thai' },
  'mma': { label: 'MMA', emoji: '🤼', description: 'Mixed Martial Arts' },
  'boxing': { label: 'Boxing', emoji: '🥊', description: 'Boxing' },
  'wrestling': { label: 'Wrestling', emoji: '🤸', description: 'Wrestling' },
  'judo': { label: 'Judo', emoji: '🥋', description: 'Judo' },
}

export async function generateMetadata(
  { params }: { params: Promise<{ sport: string }> }
): Promise<Metadata> {
  const { sport } = await params
  const meta = SPORT_META[sport]
  if (!meta) return { title: 'Sport Not Found' }

  return {
    title: `Best ${meta.label} Gyms Worldwide | FightAtlas`,
    description: `Find the best ${meta.description} gyms in every city worldwide. Verified ${meta.label} academies for travelers and locals.`,
    keywords: [
      `${meta.label} gym`,
      `${meta.label} academy`,
      `${meta.label} training abroad`,
      `best ${meta.label} gyms`,
      `${meta.label} travel`,
      `train ${meta.label} worldwide`,
    ],
  }
}

export default async function SportPage({ params }: { params: Promise<{ sport: string }> }) {
  const { sport } = await params
  const meta = SPORT_META[sport]

  if (!meta) return (
    <div className="p-8 text-white">Sport not found</div>
  )

  // Fetch gyms and cities separately
  const { data: gyms } = await supabase
    .from('gyms')
    .select('*')
    .ilike('sports', `%${meta.label}%`)

  const { data: cities } = await supabase
    .from('cities')
    .select('*')

  // Group gyms by city
  const gymsByCity: Record<string, {
    cityName: string
    citySlug: string
    country: string
    gyms: any[]
  }> = {}

  gyms?.forEach(gym => {
    const city = cities?.find(c => c.id === gym.city_id)
    if (!city) return
    if (!gymsByCity[city.slug]) {
      gymsByCity[city.slug] = {
        cityName: city.name,
        citySlug: city.slug,
        country: city.country,
        gyms: []
      }
    }
    gymsByCity[city.slug].gyms.push(gym)
  })

  const cityGroups = Object.values(gymsByCity).sort((a, b) =>
    b.gyms.length - a.gyms.length
  )

  return (
    <main className="min-h-screen" style={{ background: '#0a0a0f' }}>

      {/* Hero */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: '#e63946' }} />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="text-5xl mb-4">{meta.emoji}</div>
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            Best <span style={{ color: '#e63946' }}>{meta.label}</span> Gyms Worldwide
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            {gyms?.length || 0} verified {meta.label} gyms across {cityGroups.length} cities
          </p>
          <p className="text-gray-500 max-w-xl mx-auto">
            Find the best {meta.description} gyms wherever you travel.
            Every gym is manually verified by FightAtlas.
          </p>
        </div>
      </section>

      {/* City Groups */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        {cityGroups.length === 0 && (
          <div className="text-center py-24 text-gray-500">
            <p className="text-4xl mb-4">{meta.emoji}</p>
            <p className="text-xl">No {meta.label} gyms listed yet</p>
            <p className="mt-2 mb-8">Be the first to submit one!</p>
            <Link href="/submit"
              className="px-6 py-3 rounded-full font-semibold text-white"
              style={{ background: '#e63946' }}>
              Submit a Gym
            </Link>
          </div>
        )}
        {cityGroups.map(group => (
          <div key={group.citySlug} className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black">{group.cityName}</h2>
                <p className="text-gray-500 text-sm">{group.country}</p>
              </div>
              <Link href={`/cities/${group.citySlug}`}
                className="text-sm px-4 py-2 rounded-full transition-all hover:text-white"
                style={{ background: '#12121a', border: '1px solid #1e1e2e', color: '#9ca3af' }}>
                All gyms in {group.cityName} →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.gyms.map(gym => (
                <Link href={`/cities/${group.citySlug}/${gym.slug}`} key={gym.id}>
                  <div className="group rounded-2xl overflow-hidden transition-all hover:scale-105"
                    style={{ background: '#12121a', border: '1px solid #1e1e2e' }}>
                    {gym.image_url && (
                      <div className="h-36 relative overflow-hidden">
                        <img
                          src={gym.image_url}
                          alt={gym.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0"
                          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)' }} />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-black mb-1">{gym.name}</h3>
                      <p className="text-gray-500 text-xs mb-2">📍 {gym.address}</p>
                      <div className="flex flex-wrap gap-1">
                        {gym.sports?.split('/').map((s: string) => (
                          <span key={s}
                            className="px-2 py-0.5 rounded-full text-xs"
                            style={{
                              background: s.trim().toLowerCase().includes(meta.label.toLowerCase())
                                ? '#e63946' : '#1e1e2e',
                              color: s.trim().toLowerCase().includes(meta.label.toLowerCase())
                                ? 'white' : '#e63946'
                            }}>
                            {s.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}