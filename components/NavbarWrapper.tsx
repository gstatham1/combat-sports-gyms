'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function NavbarWrapper() {
  const pathname = usePathname()

  // Hide navbar on globe page since it has its own UI
  if (pathname === '/' || pathname === '/globe') return null

  return <Navbar />
}