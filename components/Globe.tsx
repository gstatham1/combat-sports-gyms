'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GlobeInstance = any

type City = {
  id: number
  name: string
  slug: string
  country: string
}

const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  'bangkok': { lat: 13.7563, lng: 100.5018 },
  'london': { lat: 51.5074, lng: -0.1278 },
  'new-york': { lat: 40.7128, lng: -74.0060 },
  'tokyo': { lat: 35.6762, lng: 139.6503 },
  'rio-de-janeiro': { lat: -22.9068, lng: -43.1729 },
  'dublin': { lat: 53.3498, lng: -6.2603 },
  'paris': { lat: 48.8566, lng: 2.3522 },
  'sydney': { lat: -33.8688, lng: 151.2093 },
  'los-angeles': { lat: 34.0522, lng: -118.2437 },
  'las-vegas': { lat: 36.1699, lng: -115.1398 },
  'montreal': { lat: 45.5017, lng: -73.5673 },
  'rome': { lat: 41.9028, lng: 12.4964 },
}

export default function GlobeComponent({ cities }: { cities: City[] }) {
  const globeRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (!globeRef.current) return

    let globe: GlobeInstance = null

    const initGlobe = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Globe = (await import('globe.gl')).default as any

      const markers = cities
        .filter(city => CITY_COORDINATES[city.slug])
        .map(city => ({
          ...CITY_COORDINATES[city.slug],
          name: city.name,
          slug: city.slug,
          country: city.country,
        }))

      globe = Globe()(globeRef.current!)
        .width(window.innerWidth)
        .height(window.innerHeight)
        .backgroundColor('#0a0a0f')
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
        .pointsData(markers)
        .pointLat('lat')
        .pointLng('lng')
        .pointColor(() => '#e63946')
        .pointAltitude(0.02)
        .pointRadius(0.4)
        .pointLabel((d: any) => `
          <div style="
            background: #12121a;
            border: 1px solid #e63946;
            border-radius: 8px;
            padding: 8px 12px;
            color: white;
            font-family: sans-serif;
            font-size: 14px;
            font-weight: bold;
          ">
            🥊 ${d.name}
            <div style="color: #9ca3af; font-size: 12px; font-weight: normal">${d.country}</div>
          </div>
        `)
        .onPointClick((d: any) => {
          // Stop auto rotation
          globe.controls().autoRotate = false

          // Zoom into the city
          globe.pointOfView(
            { lat: d.lat, lng: d.lng, altitude: 0.5 },
            1500
          )

          // Navigate after zoom completes
          setTimeout(() => {
            router.push(`/cities/${d.slug}`)
          }, 1600)
        })

      // Auto rotate
      globe.controls().autoRotate = true
      globe.controls().autoRotateSpeed = 0.5
      globe.controls().enableZoom = true

      // Initial position
      globe.pointOfView({ lat: 20, lng: 0, altitude: 2.5 })

      // Handle resize
      const handleResize = () => {
        globe.width(window.innerWidth)
        globe.height(window.innerHeight)
      }
      window.addEventListener('resize', handleResize)

      // Cleanup resize listener
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }

    initGlobe()

    return () => {
      if (globeRef.current) {
        globeRef.current.innerHTML = ''
      }
    }
  }, [cities, router])

  return (
    <div
      ref={globeRef}
      className="w-full h-full"
    />
  )
}