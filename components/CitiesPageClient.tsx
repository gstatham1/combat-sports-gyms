'use client'

import { useState } from 'react'
import Link from 'next/link'
import GlobeBackground from './GlobeBackground'

type City = {
  id: number
  name: string
  country: string
  slug: string
  image_url: string
}

const SPORTS = ['🥊 Boxing', '🥋 BJJ', '🤼 MMA', '🦵 Muay Thai', '🤸 Wrestling', '🥋 Judo']

export default function CitiesPageClient({ cities }: { cities: City[] }) {
  const [search, setSearch] = useState('')

  const filtered = cities.filter(city => {
    const query = search.toLowerCase().trim()
    if (!query) return true
    const wordMatch = city.name.toLowerCase().split(' ')
      .some(word => word.startsWith(query))
    const countryMatch = city.country.toLowerCase().startsWith(query)
    return wordMatch || countryMatch
  })

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

        {/* Globe Background */}
        <GlobeBackground />

        {/* Dark overlay */}
        <div className="absolute inset-0 z-10"
          style={{ background: 'radial-gradient(ellipse at center, rgba(10,10,15,0.6) 0%, rgba(10,10,15,0.85) 70%)' }} />

        {/* Glowing red orb */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-15 blur-3xl"
            style={{ background: '#e63946' }} />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col items-center w-full max-w-3xl mx-auto">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#e63946' }}>
            The World is Your Gym
          </p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 leading-none">
            FIGHT<span style={{ color: '#e63946' }}>ATLAS</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl text-center">
            Find the best combat sports gyms in every city. Train like a local, wherever you travel.
          </p>

          {/* Search Bar */}
          <div className="flex gap-3 w-full max-w-xl mb-8">
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

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-gray-600">
          <span className="text-xs tracking-widest uppercase">Top Destinations</span>
          <div className="w-px h-8 bg-gray-600 animate-pulse" />
        </div>
      </section>

      {/* Cities Grid */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-2">
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
            <p className="text-sm mb-6">Try searching for a different city or country</p>
            <button
              onClick={() => setSearch('')}
              className="px-6 py-3 rounded-full text-sm font-semibold"
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
    </>
  )
}