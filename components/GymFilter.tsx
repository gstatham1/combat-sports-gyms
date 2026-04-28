'use client'

import { useState } from 'react'
import Link from 'next/link'

type Gym = {
  id: number
  name: string
  slug: string
  address: string
  description: string
  sports: string
  image_url: string
  city_id: number
}

type City = {
  id: number
  name: string
  slug: string
  country: string
}

const SPORTS = ['All', '🥊 Boxing', '🥋 BJJ', '🤼 MMA', '🦵 Muay Thai', '🤸 Wrestling']

export default function GymFilter({ gyms, city }: { gyms: Gym[], city: City }) {
  const [activeSport, setActiveSport] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = gyms.filter(gym => {
    const matchesSport = activeSport === 'All' ||
      gym.sports?.toLowerCase().includes(
        activeSport.replace(/[^a-zA-Z\s]/g, '').trim().toLowerCase()
      )
    const matchesSearch = gym.name.toLowerCase().includes(search.toLowerCase()) ||
      gym.address?.toLowerCase().includes(search.toLowerCase())
    return matchesSport && matchesSearch
  })

  return (
    <div>
      {/* Search bar */}
      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder={`Search gyms in ${city.name}...`}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-5 py-3 rounded-full text-white placeholder-gray-500 outline-none text-sm"
          style={{ background: '#12121a', border: '1px solid #1e1e2e' }}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="px-4 py-3 rounded-full text-sm"
            style={{ background: '#1e1e2e', color: '#9ca3af' }}>
            ✕
          </button>
        )}
      </div>

      {/* Sport filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {SPORTS.map(sport => (
          <button
            key={sport}
            onClick={() => setActiveSport(sport)}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
            style={{
              background: activeSport === sport ? '#e63946' : '#12121a',
              border: '1px solid',
              borderColor: activeSport === sport ? '#e63946' : '#1e1e2e',
              color: activeSport === sport ? 'white' : '#9ca3af'
            }}>
            {sport}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-gray-500 text-sm mb-8">
        {filtered.length} {filtered.length === 1 ? 'gym' : 'gyms'}
        {activeSport !== 'All' && ` offering ${activeSport.replace(/[^a-zA-Z\s]/g, '').trim()}`}
        {search && ` matching "${search}"`}
      </p>

      {/* Gym Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 text-gray-500">
          <p className="text-4xl mb-4">🥊</p>
          <p className="text-xl mb-2">No gyms found</p>
          <p className="text-sm mb-6">Try a different sport or search term</p>
          <button
            onClick={() => { setActiveSport('All'); setSearch('') }}
            className="px-6 py-3 rounded-full text-sm font-semibold"
            style={{ background: '#e63946', color: 'white' }}>
            Show All Gyms
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((gym) => (
            <Link href={`/cities/${city.slug}/${gym.slug}`} key={gym.id}>
              <div className="group rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-105"
                style={{ background: '#12121a', border: '1px solid #1e1e2e' }}>
                <div className="h-48 relative overflow-hidden">
                  {gym.image_url ? (
                    <img
                      src={gym.image_url}
                      alt={`${gym.name} - ${city.name}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl"
                      style={{ background: 'linear-gradient(135deg, #1a0a0f, #0a0f1a)' }}>
                      🥊
                    </div>
                  )}
                  <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: '#e63946' }} />
                  <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)' }} />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-black mb-1">{gym.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">📍 {gym.address}</p>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{gym.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {gym.sports?.split(',').map((sport: string) => (
                      <span key={sport}
                        className="px-3 py-1 rounded-full text-xs"
                        style={{
                          background: activeSport !== 'All' &&
                            sport.trim().toLowerCase().includes(
                              activeSport.replace(/[^a-zA-Z\s]/g, '').trim().toLowerCase()
                            ) ? '#e63946' : '#1e1e2e',
                          color: activeSport !== 'All' &&
                            sport.trim().toLowerCase().includes(
                              activeSport.replace(/[^a-zA-Z\s]/g, '').trim().toLowerCase()
                            ) ? 'white' : '#e63946'
                        }}>
                        {sport.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}