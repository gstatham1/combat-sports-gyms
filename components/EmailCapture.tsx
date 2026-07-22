'use client'

import { useState } from 'react'

export default function EmailCapture({ city }: { city?: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async () => {
    if (!email) return
    setStatus('loading')

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, city })
    })

    if (res.ok) {
      setStatus('success')
      setEmail('')
    } else {
      setStatus('error')
    }
  }

  return (
    <div className="rounded-2xl p-8 text-center"
      style={{ background: '#12121a', border: '1px solid #1e1e2e', paddingBottom: '2.5rem' }}>
      <h3 className="text-xl font-black mb-2">
        {city ? `Get notified when we add gyms in ${city}` : 'Stay in the loop'}
      </h3>
      <p className="text-gray-400 text-sm mb-6">
        {city
          ? `We'll email you when new gyms are added to ${city}.`
          : 'New cities, new gyms, traveler tips. No spam.'}
      </p>

      {status === 'success' ? (
        <div className="text-green-400 font-semibold">
          ✅ You're in! We'll keep you posted.
        </div>
      ) : (
        <div className="flex gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            className="flex-1 px-5 py-3 rounded-full text-white placeholder-gray-500 outline-none"
            style={{ background: '#0a0a0f', border: '1px solid #1e1e2e' }}
          />
          <button
            onClick={handleSubmit}
            disabled={status === 'loading'}
            className="px-6 py-3 rounded-full font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: '#e63946' }}>
            {status === 'loading' ? '...' : 'Notify me'}
          </button>
        </div>
      )}

      {status === 'error' && (
        <p className="text-red-400 text-sm mt-3">Something went wrong. Please try again.</p>
      )}
    </div>
  )
}