'use client'

import { useState } from 'react'
import Link from 'next/link'

type City = {
  id: number
  name: string
  country: string
  slug: string
  image_url: string
}

const SPORTS = ['🥊 Boxing', '🥋 BJJ', '🤼 MMA', '🦵 Muay Thai', '🤸 Wrestling', '🥋 Judo']

export default function CitySearch({ cities, heroMode = false }: { cities: City[], heroMode?: boolean }) {
  const [search, setSearch] = useState('')

  const filtered = cities.filter(city => {
    const query = search.toLowerCase().trim()
    if (!query) return true
    const cityMatch = city.name.toLowerCase().startsWith(query)
    const countryMatch = city.country.toLowerCase().startsWith(query)
    const wordMatch = city.name.toLowerCase().split(' ')
      .some(word => word.startsWith(query))
    return cityMatch || countryMatch || wordMatch
  })

  // Hero mode — only renders the search bar and sport tags
  if (heroMode) return (
    <div className="w-full max-w-xl mx-auto">
      {/* Search Bar */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search a city... Bangkok, Rio, NYC"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-6 py-4 rounded-full text-white placeholder-gray-500 outline-none"
          style={{ background: 'rgba(18,18,26,0.8)', border: '1px solid #1e1e2e' }}
        />
        {search ? (
          <button
            onClick={() => setSearch('')}
            className="px-5 py-4 rounded-full font-bold text-white transition-all hover:opacity-90"
            style={{ background: '#1e1e2e' }}>
            ✕
          </button>
        ) : (
          <button
            className="px-8 py-4 rounded-full font-bold text-white transition-all hover:opacity-90"
            style={{ background: '#e63946' }}>
            Search
          </button>
        )}
      </div>

      {/* Sport Tags */}
      <div className="flex flex-wrap justify-center gap-3">
        {SPORTS.map((sport) => (
          <span key={sport}
            className="px-4 py-2 rounded-full text-sm text-gray-400 cursor-pointer hover:text-white transition-all"
            style={{ background: 'rgba(18,18,26,0.8)', border: '1px solid #1e1e2e' }}>
            {sport}
          </span>
        ))}
      </div>
    </div>
  )

  // Grid mode — only renders the filtered city cards
  return (
    <section className="px-6 py-24 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-black">Top Destinations</h2>
        {search && (
          <p className="text-gray-400 text-sm">
            {filtered.length} {filtered.length === 1 ? 'city' : 'cities'} found for "{search}"
          </p>
        )}
      </div>
      <p className="text-gray-400 mb-12">The world's best cities for combat sports training</p>

      {filtered.length === 0 ? (
        <div className="text-center py-24 text-gray-500">
          <p className="text-4xl mb-4">🌍</p>
          <p className="text-xl mb-2">No cities found for "{search}"</p>
          <p className="text-sm">Try searching for a different city or country</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((city) => (
            <Link href={`/cities/${city.slug}`} key={city.id}>
              <div className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-105"
                style={{ height: '200px' }}>
                {city.image_url ? (
                  <img src={city.image_url} alt={city.name}
                    className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, #1a0a0f, #0a0f1a)' }} />
                )}
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-black">{city.name}</h3>
                  <p className="text-gray-300 text-sm">{city.country}</p>
                </div>
                <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: '#e63946' }} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}