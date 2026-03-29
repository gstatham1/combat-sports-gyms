'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

const SPORTS = ['Boxing', 'BJJ', 'MMA', 'Muay Thai', 'Wrestling', 'Judo', 'Kickboxing', 'Sambo']

export default function SubmitGym() {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    address: '',
    description: '',
    website: '',
    sports: [] as string[],
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSportToggle = (sport: string) => {
    setFormData(prev => ({
      ...prev,
      sports: prev.sports.includes(sport)
        ? prev.sports.filter(s => s !== sport)
        : [...prev.sports, sport]
    }))
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.city || !formData.address) {
      alert('Please fill in all required fields')
      return
    }

    setStatus('loading')

    const { error } = await supabase
      .from('submissions')
      .insert([{
        name: formData.name,
        city: formData.city,
        address: formData.address,
        description: formData.description,
        website: formData.website,
        sports: formData.sports.join(', '),
        status: 'pending'
      }])

    if (error) {
      console.error(error)
      setStatus('error')
    } else {
      setStatus('success')
    }
  }

  if (status === 'success') return (
    <main className="min-h-screen flex items-center justify-center px-6"
      style={{ background: '#0a0a0f' }}>
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🥊</div>
        <h1 className="text-3xl font-black mb-4">Submission Received!</h1>
        <p className="text-gray-400 mb-8">
          Thanks for submitting your gym. We'll review it and add it to the platform shortly.
        </p>
        <Link href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold"
          style={{ background: '#e63946', color: 'white' }}>
          Back to Homepage
        </Link>
      </div>
    </main>
  )

  return (
    <main className="min-h-screen pt-24 pb-16 px-6" style={{ background: '#0a0a0f' }}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <Link href="/" className="text-gray-400 text-sm hover:text-white mb-6 block">
            ← Back to homepage
          </Link>
          <h1 className="text-4xl font-black mb-2">Submit Your Gym</h1>
          <p className="text-gray-400">
            Know a great combat sports gym? Add it to Fight Atlas and help travelers find it.
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-6">

          {/* Gym Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Gym Name <span style={{ color: '#e63946' }}>*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Tiger Muay Thai"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-5 py-4 rounded-xl text-white placeholder-gray-600 outline-none"
              style={{ background: '#12121a', border: '1px solid #1e1e2e' }}
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              City <span style={{ color: '#e63946' }}>*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Bangkok"
              value={formData.city}
              onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
              className="w-full px-5 py-4 rounded-xl text-white placeholder-gray-600 outline-none"
              style={{ background: '#12121a', border: '1px solid #1e1e2e' }}
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Address <span style={{ color: '#e63946' }}>*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 123 Sukhumvit Road, Bangkok"
              value={formData.address}
              onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
              className="w-full px-5 py-4 rounded-xl text-white placeholder-gray-600 outline-none"
              style={{ background: '#12121a', border: '1px solid #1e1e2e' }}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              placeholder="Tell us about the gym — classes, coaches, atmosphere..."
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-5 py-4 rounded-xl text-white placeholder-gray-600 outline-none resize-none"
              style={{ background: '#12121a', border: '1px solid #1e1e2e' }}
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-semibold mb-2">Website</label>
            <input
              type="text"
              placeholder="e.g. tigermuaythai.com"
              value={formData.website}
              onChange={e => setFormData(prev => ({ ...prev, website: e.target.value }))}
              className="w-full px-5 py-4 rounded-xl text-white placeholder-gray-600 outline-none"
              style={{ background: '#12121a', border: '1px solid #1e1e2e' }}
            />
          </div>

          {/* Sports */}
          <div>
            <label className="block text-sm font-semibold mb-3">Sports Offered</label>
            <div className="flex flex-wrap gap-3">
              {SPORTS.map(sport => (
                <button
                  key={sport}
                  onClick={() => handleSportToggle(sport)}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                  style={{
                    background: formData.sports.includes(sport) ? '#e63946' : '#12121a',
                    border: '1px solid',
                    borderColor: formData.sports.includes(sport) ? '#e63946' : '#1e1e2e',
                    color: formData.sports.includes(sport) ? 'white' : '#9ca3af'
                  }}>
                  {sport}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={status === 'loading'}
            className="w-full py-4 rounded-full font-bold text-white text-lg transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: '#e63946' }}>
            {status === 'loading' ? 'Submitting...' : 'Submit Gym →'}
          </button>

          {status === 'error' && (
            <p className="text-center text-sm" style={{ color: '#e63946' }}>
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </div>
    </main>
  )
}