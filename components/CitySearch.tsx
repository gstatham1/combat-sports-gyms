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

export default function CitySearch({ cities }: { cities: City[] }) {
  const [search, setSearch] = useState('')
  const [activeSport, setActiveSport] = useState('All')

  const sports = ['All', '🥊 Boxing', '🥋 BJJ', '🤼 MMA', '🦵 Muay Thai', '🤸 Wrestling', '🥋 Judo']

  const filtered = cities.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(search.toLowerCase()) ||
      city.country.toLowerCase().includes(search.toLowerCase())
    return matchesSearch
  })

  return (
    <div>
      {/* Search Bar */}
      <div className="px-6 py-8 max-w-xl mx-auto">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search a city... Bangkok, Rio, NYC"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 px-6 py-4 rounded-full text-white placeholder-gray-500 outline-none"
            style={{ background: 'rgba(18,18,26,0.8)', border: '1px solid #1e1e2e' }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="px-5 py-4 rounded-full font-bold text-white transition-all hover:opacity-90"
              style={{ background: '#1e1e2e' }}>
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Sport Tags */}
      <div className="flex flex-wrap justify-center gap-3 px-6 mb-12">
        {sports.map((sport) => (
          <button
            key={sport}
            onClick={() => setActiveSport(sport)}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-90"
            style={{
              background: activeSport === sport ? '#e63946' : 'rgba(18,18,26,0.8)',
              border: '1px solid',
              borderColor: activeSport === sport ? '#e63946' : '#1e1e2e',
              color: activeSport === sport ? 'white' : '#9ca3af'
            }}>
            {sport}
          </button>
        ))}
      </div>

      {/* Results count */}
      {search && (
        <div className="px-6 mb-6 max-w-7xl mx-auto">
          <p className="text-gray-400 text-sm">
            {filtered.length} {filtered.length === 1 ? 'city' : 'cities'} found
            {search && ` for "${search}"`}
          </p>
        </div>
      )}

      {/* Cities Grid */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-500">
            <p className="text-4xl mb-4">🌍</p>
            <p className="text-xl mb-2">No cities found for "{search}"</p>
            <p className="text-sm">Try searching for a different city or country</p>
            <button
              onClick={() => setSearch('')}
              className="mt-6 px-6 py-3 rounded-full text-sm font-semibold"
              style={{ background: '#e63946', color: 'white' }}>
              Clear Search
            </button>
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
    </div>
  )
}