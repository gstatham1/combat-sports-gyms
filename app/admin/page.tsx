'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const ADMIN_PASSWORD = 'Peter1Griffin&'

type Submission = {
  id: number
  name: string
  city: string
  address: string
  description: string
  website: string
  sports: string
  status: string
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(false)

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true)
    } else {
      alert('Wrong password!')
    }
  }

  const fetchSubmissions = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('submissions')
      .select('*')
      .order('id', { ascending: false })
    setSubmissions(data || [])
    setLoading(false)
  }

  useEffect(() => {
    if (authenticated) fetchSubmissions()
  }, [authenticated])

  const handleApprove = async (submission: Submission) => {
    // Find the city
    const { data: city } = await supabase
      .from('cities')
      .select('*')
      .ilike('name', submission.city)
      .single()

    if (!city) {
      alert(`City "${submission.city}" not found in database. Please add it first.`)
      return
    }

    // Create slug from gym name
    const slug = submission.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Add to gyms table
    const { error } = await supabase
      .from('gyms')
      .insert([{
        name: submission.name,
        city_id: city.id,
        address: submission.address,
        description: submission.description,
        website: submission.website,
        sports: submission.sports,
        slug: slug
      }])

    if (error) {
      alert('Error approving gym: ' + error.message)
      return
    }

    // Update submission status
    await supabase
      .from('submissions')
      .update({ status: 'approved' })
      .eq('id', submission.id)

    alert(`✅ ${submission.name} has been approved and added to ${city.name}!`)
    fetchSubmissions()
  }

  const handleReject = async (id: number) => {
    await supabase
      .from('submissions')
      .update({ status: 'rejected' })
      .eq('id', id)
    fetchSubmissions()
  }

  // Login Screen
  if (!authenticated) return (
    <main className="min-h-screen flex items-center justify-center px-6"
      style={{ background: '#0a0a0f' }}>
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-black mb-2 text-center">Admin Panel</h1>
        <p className="text-gray-400 text-center mb-8">Fight Atlas</p>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          className="w-full px-5 py-4 rounded-xl text-white placeholder-gray-600 outline-none mb-4"
          style={{ background: '#12121a', border: '1px solid #1e1e2e' }}
        />
        <button
          onClick={handleLogin}
          className="w-full py-4 rounded-full font-bold text-white transition-all hover:opacity-90"
          style={{ background: '#e63946' }}>
          Login
        </button>
      </div>
    </main>
  )

  // Admin Dashboard
  return (
    <main className="min-h-screen pt-24 pb-16 px-6" style={{ background: '#0a0a0f' }}>
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-black mb-1">Admin Panel</h1>
            <p className="text-gray-400">Manage gym submissions</p>
          </div>
          <button
            onClick={fetchSubmissions}
            className="px-4 py-2 rounded-full text-sm font-semibold"
            style={{ background: '#12121a', border: '1px solid #1e1e2e', color: '#9ca3af' }}>
            🔄 Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Pending', value: submissions.filter(s => s.status === 'pending').length, color: '#f59e0b' },
            { label: 'Approved', value: submissions.filter(s => s.status === 'approved').length, color: '#10b981' },
            { label: 'Rejected', value: submissions.filter(s => s.status === 'rejected').length, color: '#e63946' },
          ].map(stat => (
            <div key={stat.label} className="rounded-2xl p-6 text-center"
              style={{ background: '#12121a', border: '1px solid #1e1e2e' }}>
              <p className="text-3xl font-black mb-1" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Submissions List */}
        {loading ? (
          <p className="text-gray-400 text-center py-12">Loading...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {submissions.map(submission => (
              <div key={submission.id} className="rounded-2xl p-6"
                style={{ background: '#12121a', border: '1px solid #1e1e2e' }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-black">{submission.name}</h3>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          background: submission.status === 'pending' ? '#f59e0b20' :
                            submission.status === 'approved' ? '#10b98120' : '#e6394620',
                          color: submission.status === 'pending' ? '#f59e0b' :
                            submission.status === 'approved' ? '#10b981' : '#e63946'
                        }}>
                        {submission.status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">📍 {submission.city} — {submission.address}</p>
                    <p className="text-gray-500 text-sm mb-2">{submission.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {submission.sports?.split(',').map(sport => (
                        <span key={sport} className="px-3 py-1 rounded-full text-xs"
                          style={{ background: '#1e1e2e', color: '#e63946' }}>
                          {sport.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {submission.status === 'pending' && (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleApprove(submission)}
                        className="px-4 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90"
                        style={{ background: '#10b981' }}>
                        ✅ Approve
                      </button>
                      <button
                        onClick={() => handleReject(submission.id)}
                        className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-90"
                        style={{ background: '#1e1e2e', color: '#e63946' }}>
                        ❌ Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {submissions.length === 0 && (
              <div className="text-center py-24 text-gray-500">
                <p className="text-4xl mb-4">📭</p>
                <p>No submissions yet</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}