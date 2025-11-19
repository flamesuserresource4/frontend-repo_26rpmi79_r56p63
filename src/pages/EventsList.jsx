import { useEffect, useState } from 'react'
import Header from '../components/Header'
import EventCard from '../components/EventCard'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function EventsList() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const url = new URL(`${API_BASE}/api/events`)
      if (query) url.searchParams.set('q', query)
      const res = await fetch(url)
      const data = await res.json()
      setEvents(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchEvents() }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search events" className="w-full px-3 py-2 rounded-md bg-white/10 text-white placeholder:text-blue-200/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button onClick={fetchEvents} className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500">Search</button>
          <a href="/create" className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20">Create</a>
        </div>

        {loading ? (
          <p className="text-blue-200">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(ev => <EventCard key={ev.id} event={ev} />)}
          </div>
        )}
      </main>
    </div>
  )
}
