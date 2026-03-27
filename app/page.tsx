import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data: cities, error } = await supabase.from('cities').select('*')
  
  console.log('Cities:', cities)
  console.log('Error:', error)

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Combat Sports Gyms</h1>
      <h2 className="text-xl mb-4">Cities:</h2>
      <ul>
        {cities?.map((city) => (
          <li key={city.id} className="text-lg py-2">
            {city.name}, {city.country}
          </li>
        ))}
      </ul>
    </main>
  )
}