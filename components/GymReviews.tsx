'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type Review = {
  id: number
  author: string
  comment: string
  rating: number
  created_at: string
}

function StarRating({ rating, onRate }: { rating: number, onRate?: (r: number) => void }) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          onClick={() => onRate?.(star)}
          onMouseEnter={() => onRate && setHovered(star)}
          onMouseLeave={() => onRate && setHovered(0)}
          className={onRate ? 'cursor-pointer' : 'cursor-default'}
          style={{ background: 'none', border: 'none', padding: 0 }}>
          <span style={{
            fontSize: onRate ? '24px' : '16px',
            color: star <= (hovered || rating) ? '#f59e0b' : '#374151'
          }}>
            ★
          </span>
        </button>
      ))}
    </div>
  )
}

export default function GymReviews({ gymId }: { gymId: number }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    author: '',
    comment: '',
    rating: 0,
  })

  const fetchReviews = async () => {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('gym_id', gymId)
      .order('created_at', { ascending: false })
    setReviews(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchReviews()
  }, [gymId])

  const handleSubmit = async () => {
    if (!form.author || !form.comment || form.rating === 0) {
      alert('Please fill in all fields and select a rating!')
      return
    }

    setSubmitting(true)

    const { error } = await supabase
      .from('reviews')
      .insert([{
        gym_id: gymId,
        author: form.author,
        comment: form.comment,
        rating: form.rating,
      }])

    if (error) {
      alert('Something went wrong. Please try again.')
      setSubmitting(false)
      return
    }

    setForm({ author: '', comment: '', rating: 0 })
    setShowForm(false)
    setSubmitting(false)
    fetchReviews()
  }

  const avgRating = reviews.length
    ? Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length * 10) / 10
    : 0

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    })
  }

  return (
    <div className="rounded-2xl overflow-hidden md:col-span-2"
      style={{ background: '#12121a', border: '1px solid #1e1e2e' }}>

      {/* Header */}
      <div className="p-6 flex items-center justify-between"
        style={{ borderBottom: '1px solid #1e1e2e' }}>
        <div>
          <h2 className="text-lg font-black mb-1">Community Reviews</h2>
          {reviews.length > 0 ? (
            <div className="flex items-center gap-3">
              <StarRating rating={Math.round(avgRating)} />
              <span className="text-gray-400 text-sm">
                {avgRating}/5 · {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
              </span>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No reviews yet — be the first!</p>
          )}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: '#e63946', color: 'white' }}>
          {showForm ? '✕ Cancel' : '✍️ Write Review'}
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="p-6" style={{ borderBottom: '1px solid #1e1e2e' }}>
          <h3 className="font-black mb-4">Your Review</h3>

          {/* Rating */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Rating</label>
            <StarRating
              rating={form.rating}
              onRate={(r) => setForm(prev => ({ ...prev, rating: r }))}
            />
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Your Name</label>
            <input
              type="text"
              placeholder="e.g. John D."
              value={form.author}
              onChange={e => setForm(prev => ({ ...prev, author: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 outline-none"
              style={{ background: '#0a0a0f', border: '1px solid #1e1e2e' }}
            />
          </div>

          {/* Comment */}
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">Your Review</label>
            <textarea
              placeholder="How was your experience training here? Coaches, facilities, atmosphere..."
              value={form.comment}
              onChange={e => setForm(prev => ({ ...prev, comment: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-600 outline-none resize-none"
              style={{ background: '#0a0a0f', border: '1px solid #1e1e2e' }}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full py-3 rounded-full font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
            style={{ background: '#e63946' }}>
            {submitting ? 'Submitting...' : 'Submit Review →'}
          </button>
        </div>
      )}

      {/* Reviews List */}
      <div className="divide-y" style={{ borderColor: '#1e1e2e' }}>
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <p className="text-2xl mb-2">🥊</p>
            <p>No reviews yet. Train here and be the first to share your experience!</p>
          </div>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="p-6">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="font-bold">{review.author}</p>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-gray-500 text-xs">{formatDate(review.created_at)}</p>
              </div>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}