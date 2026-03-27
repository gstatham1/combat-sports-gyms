'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
      style={{ background: 'linear-gradient(to bottom, rgba(10,10,15,0.95), transparent)' }}>
      
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <span className="text-2xl font-black tracking-tight">
          FIGHT<span style={{ color: '#e63946' }}>ATLAS</span>
        </span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        <Link href="/cities" className="text-sm text-gray-400 hover:text-white transition-colors">
          Explore Cities
        </Link>
        <Link href="/sports" className="text-sm text-gray-400 hover:text-white transition-colors">
          By Sport
        </Link>
        <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
          About
        </Link>
        <Link href="/submit" 
          className="text-sm px-4 py-2 rounded-full font-semibold transition-all"
          style={{ background: '#e63946', color: 'white' }}>
          Submit a Gym
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-white"
        onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 p-6 flex flex-col gap-4"
          style={{ background: '#0a0a0f', borderBottom: '1px solid #1e1e2e' }}>
          <Link href="/cities" className="text-gray-400 hover:text-white">Explore Cities</Link>
          <Link href="/sports" className="text-gray-400 hover:text-white">By Sport</Link>
          <Link href="/about" className="text-gray-400 hover:text-white">About</Link>
          <Link href="/submit" className="text-white font-semibold" style={{ color: '#e63946' }}>Submit a Gym</Link>
        </div>
      )}
    </nav>
  )
}