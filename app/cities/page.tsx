import { supabase } from '@/lib/supabase'
import GlobeBackground from '@/components/GlobeBackground'
import CitiesPageClient from '@/components/CitiesPageClient'

export default async function CitiesPage() {
  const { data: cities } = await supabase
    .from('cities')
    .select('*')
    .order('display_order', { ascending: true })

  return (
    <main style={{ background: '#0a0a0f' }}>
      <CitiesPageClient cities={cities || []} />
    </main>
  )
}