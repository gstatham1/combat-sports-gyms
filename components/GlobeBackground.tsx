'use client'

import { useEffect, useRef } from 'react'

const CITY_COORDINATES = [
  { lat: 13.7563, lng: 100.5018 },
  { lat: 51.5074, lng: -0.1278 },
  { lat: 40.7128, lng: -74.0060 },
  { lat: 35.6762, lng: 139.6503 },
  { lat: -22.9068, lng: -43.1729 },
  { lat: 53.3498, lng: -6.2603 },
  { lat: 48.8566, lng: 2.3522 },
  { lat: -33.8688, lng: 151.2093 },
  { lat: 34.0522, lng: -118.2437 },
  { lat: 36.1699, lng: -115.1398 },
  { lat: 45.5017, lng: -73.5673 },
  { lat: 41.9028, lng: 12.4964 },
]

export default function GlobeBackground() {
  const globeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!globeRef.current) return

    const initGlobe = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Globe = (await import('globe.gl')).default as any

      const globe = Globe()(globeRef.current!)
        .width(window.innerWidth)
        .height(window.innerHeight)
        .backgroundColor('rgba(0,0,0,0)')
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
        .pointsData(CITY_COORDINATES)
        .pointLat('lat')
        .pointLng('lng')
        .pointColor(() => '#e63946')
        .pointAltitude(0.02)
        .pointRadius(0.3)

      // Slow auto rotate
      globe.controls().autoRotate = true
      globe.controls().autoRotateSpeed = 0.3
      globe.controls().enableZoom = false
      globe.controls().enableRotate = false

      // Initial position
      globe.pointOfView({ lat: 20, lng: 0, altitude: 2.2 })

      // Handle resize
      const handleResize = () => {
        globe.width(window.innerWidth)
        globe.height(window.innerHeight)
      }
      window.addEventListener('resize', handleResize)

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
  }, [])

  return (
    <div
      ref={globeRef}
      className="absolute inset-0 z-0"
      style={{ opacity: 0.6 }}
    />
  )
}