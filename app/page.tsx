import GlobeComponent from '@/components/Globe'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data: cities } = await supabase
    .from('cities')
    .select('*')
    .order('display_order', { ascending: true })

  return (
    <main className="relative w-full h-screen overflow-hidden"
      style={{ background: '#0a0a0f' }}>

      {/* Globe */}
      <GlobeComponent cities={cities || []} />

      {/* Top left logo */}
      <div className="absolute top-6 left-6 z-20">
        <Link href="/">
          <span className="text-2xl font-black tracking-tight">
            FIGHT<span style={{ color: '#e63946' }}>ATLAS</span>
          </span>
        </Link>
      </div>

      {/* Bottom UI */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-center">
        <p className="text-gray-400 text-sm mb-4 tracking-widest uppercase">
          Click a city to explore
        </p>
        <Link href="/cities"
          className="px-6 py-3 rounded-full font-semibold text-white transition-all hover:opacity-90"
          style={{ background: '#e63946' }}>
          View All Cities →
        </Link>
      </div>
    </main>
  )
}