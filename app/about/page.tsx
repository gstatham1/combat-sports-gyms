import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About FightAtlas',
  description: 'FightAtlas is the global directory for combat sports travelers. Find the best MMA, BJJ, Muay Thai and Boxing gyms in every city worldwide.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center" style={{ background: '#0a0a0f' }}>

      {/* Hero */}
      <section className="relative w-full py-24 px-6 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl"
            style={{ background: '#e63946' }} />
        </div>
        <div className="relative z-10 w-full max-w-3xl mx-auto">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: '#e63946' }}>
            Our Mission
          </p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-none">
            FIGHT<span style={{ color: '#e63946' }}>ATLAS</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            The world's first global directory for combat sports travelers.
            We help fighters, grapplers and martial artists find the best gyms
            wherever they go.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="w-full max-w-4xl mx-auto px-6 pb-24">

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[
            {
              icon: '🌍',
              title: 'Train Anywhere',
              text: "Whether you're a tourist spending a week in Bangkok or a digital nomad relocating to Barcelona, FightAtlas helps you find world-class training the moment you land."
            },
            {
              icon: '🥊',
              title: 'All Combat Sports',
              text: 'From Muay Thai camps in Thailand to BJJ academies in Brazil, MMA gyms in New York to boxing clubs in London: we cover every discipline in every city.'
            },
            {
              icon: '✅',
              title: 'Curated & Verified',
              text: 'Every gym on FightAtlas is manually reviewed and verified. We only list legitimate, reputable gyms with real coaches: no fake listings, no pay-to-play rankings.'
            },
            {
              icon: '🤝',
              title: 'Community Driven',
              text: 'Reviews, ratings and gym submissions come from the community. Fighters helping fighters find the best places to train: that\'s the FightAtlas spirit.'
            },
          ].map(card => (
            <div key={card.title} className="rounded-2xl p-8"
              style={{ background: '#12121a', border: '1px solid #1e1e2e' }}>
              <div className="text-4xl mb-4">{card.icon}</div>
              <h2 className="text-xl font-black mb-3">{card.title}</h2>
              <p className="text-gray-400 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="rounded-2xl p-8 mb-16"
          style={{ background: '#12121a', border: '1px solid #1e1e2e' }}>
          <h2 className="text-2xl font-black mb-6">The Story</h2>
          <div className="flex flex-col gap-4 text-gray-400 leading-relaxed">
            <p>
              FightAtlas was born out of a simple frustration: finding a good gym
              in a new city is harder than it should be. Google searches return
              unreliable results, travel blogs go out of date, and Reddit threads
              bury the answer in 200 comments.
            </p>
            <p>
              Combat sports travelers deserve better. Whether you're planning a
              Muay Thai trip to Phuket, looking for a BJJ academy while on a
              business trip in Tokyo, or relocating to a new city and need to
              find your new home gym : FightAtlas is built for you.
            </p>
            <p>
              We started with the world's most iconic combat sports cities and
              the most famous gyms. We're growing every day, city by city,
              gym by gym, prioritising quality over quantity. Our goal is becoming the definitive global
              resource for every combat sports traveler on the planet.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-16">
          {[
            { value: '21', label: 'Cities' },
            { value: '70+', label: 'Gyms Listed' },
            { value: '6', label: 'Combat Sports' },
          ].map(stat => (
            <div key={stat.label} className="rounded-2xl p-6 text-center"
              style={{ background: '#12121a', border: '1px solid #1e1e2e' }}>
              <p className="text-4xl font-black mb-1" style={{ color: '#e63946' }}>
                {stat.value}
              </p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-2xl p-8 text-center"
          style={{ background: 'linear-gradient(135deg, #1a0a0f, #0a0f1a)', border: '1px solid #e63946' }}>
          <h2 className="text-2xl font-black mb-3">Know a Great Gym?</h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Help the community grow. If you train at a gym that deserves to be
            on FightAtlas, submit it and we'll review it within 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/submit"
              className="px-8 py-4 rounded-full font-bold text-white transition-all hover:opacity-90"
              style={{ background: '#e63946' }}>
              🥊 Submit a Gym
            </Link>
            <Link href="/cities"
              className="px-8 py-4 rounded-full font-bold transition-all hover:text-white"
              style={{ background: '#12121a', border: '1px solid #1e1e2e', color: '#9ca3af' }}>
              🌍 Explore Cities
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}