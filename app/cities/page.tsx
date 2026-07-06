import { supabase } from '@/lib/supabase'
import GlobeBackground from '@/components/GlobeBackground'
import CitiesPageClient from '@/components/CitiesPageClient'

export default async function CitiesPage() {
  const { data: cities } = await supabase
    .from('cities')
    .select('*')
    .order('display_order', { ascending: true })

  const { count: gymCount } = await supabase
    .from('gyms')
    .select('*', { count: 'exact', head: true })

  return (
    <main style={{ background: '#0a0a0f' }}>
      <CitiesPageClient
        cities={cities || []}
        gymCount={gymCount || 0}
        cityCount={cities?.length || 0}
      />
    </main>
  )
}