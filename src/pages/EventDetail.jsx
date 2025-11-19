import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function EventDetail() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [rsvps, setRsvps] = useState([])
  const [form, setForm] = useState({ name: '', email: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [evRes, rRes] = await Promise.all([
        fetch(`${API_BASE}/api/events/${id}`),
        fetch(`${API_BASE}/api/events/${id}/rsvps`)
      ])
      const ev = await evRes.json()
      const r = await rRes.json()
      setEvent(ev)
      setRsvps(r)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [id])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({...prev, [name]: value}))
  }

  const onRsvp = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch(`${API_BASE}/api/events/${id}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed to RSVP')
      setForm({ name: '', email: '' })
      await fetchAll()
    } catch (e) {
      alert(e.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="min-h-screen bg-slate-900 text-white"><Header /><div className="p-8">Loading...</div></div>
  if (!event) return <div className="min-h-screen bg-slate-900 text-white"><Header /><div className="p-8">Not found</div></div>

  const start = event.starts_at ? new Date(event.starts_at).toLocaleString() : 'TBA'
  const end = event.ends_at ? new Date(event.ends_at).toLocaleString() : 'TBA'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {event.image_url && <img src={event.image_url} alt={event.title} className="w-full rounded-xl mb-4" />}
          <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
          <p className="text-blue-200/80 mb-4">{event.location || 'Online'} • {start} {event.ends_at && `→ ${end}`}</p>
          <p className="text-blue-100 leading-relaxed whitespace-pre-wrap">{event.description}</p>
          {event.tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {event.tags.map(t => <span key={t} className="px-2 py-1 rounded bg-white/10 text-xs">#{t}</span>)}
            </div>
          )}
        </div>
        <aside>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h2 className="font-semibold mb-3">RSVP</h2>
            <form onSubmit={onRsvp} className="space-y-3">
              <input name="name" value={form.name} onChange={onChange} placeholder="Your name" className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/10" />
              <input name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/10" />
              <button disabled={saving} className="w-full px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-500 disabled:opacity-60">{saving ? 'Submitting...' : 'RSVP'}</button>
            </form>
          </div>
          <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">
            <h2 className="font-semibold mb-3">Attendees ({rsvps.length})</h2>
            <ul className="space-y-2 text-sm">
              {rsvps.map(a => <li key={a.id} className="flex items-center justify-between"><span>{a.name}</span><span className="text-blue-200/70">{a.email}</span></li>)}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  )
}
