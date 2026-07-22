import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { email, city } = await request.json()

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  // Store in Supabase
  await supabase
    .from('subscribers')
    .upsert([{ email, city: city || null }])

  // Send welcome email
  await resend.emails.send({
    from: 'FightAtlas <hello@fightatlas.com>',
    to: email,
    subject: 'Welcome to FightAtlas',
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; margin-bottom: 8px;">
          FIGHT<span style="color: #e63946;">ATLAS</span>
        </h1>
        <p style="color: #666; margin-bottom: 24px;">The world is your gym.</p>
        <p>Thanks for joining FightAtlas! We'll let you know when we add new gyms${city ? ` in ${city}` : ''} and new cities to the platform.</p>
        <br/>
        <a href="https://fightatlas.com/cities" 
          style="background: #e63946; color: white; padding: 12px 24px; border-radius: 999px; text-decoration: none; font-weight: bold;">
          Explore Gyms →
        </a>
        <br/><br/>
        <p style="color: #999; font-size: 12px;">You can unsubscribe at any time.</p>
      </div>
    `
  })

  return NextResponse.json({ success: true })
}