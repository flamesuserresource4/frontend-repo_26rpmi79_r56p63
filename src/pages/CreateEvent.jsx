import { useState } from 'react'
import Header from '../components/Header'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function CreateEvent() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    starts_at: '',
    ends_at: '',
    image_url: '',
    capacity: '',
    tags: ''
  })
  const [saving, setSaving] = useState(false)
  const [createdId, setCreatedId] = useState(null)
  const [error, setError] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({...prev, [name]: value}))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload = {
        title: form.title,
        description: form.description || undefined,
        location: form.location || undefined,
        starts_at: form.starts_at ? new Date(form.starts_at).toISOString() : undefined,
        ends_at: form.ends_at ? new Date(form.ends_at).toISOString() : undefined,
        image_url: form.image_url || undefined,
        capacity: form.capacity ? Number(form.capacity) : undefined,
        tags: form.tags ? form.tags.split(',').map(s=>s.trim()).filter(Boolean) : []
      }
      const res = await fetch(`${API_BASE}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to create')
      const data = await res.json()
      setCreatedId(data.id)
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Create Event</h1>
        <form onSubmit={onSubmit} className="space-y-4 bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Title</label>
              <input name="title" value={form.title} onChange={onChange} required className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/10" />
            </div>
            <div>
              <label className="block text-sm mb-1">Location</label>
              <input name="location" value={form.location} onChange={onChange} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/10" />
            </div>
            <div>
              <label className="block text-sm mb-1">Starts at</label>
              <input type="datetime-local" name="starts_at" value={form.starts_at} onChange={onChange} required className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/10" />
            </div>
            <div>
              <label className="block text-sm mb-1">Ends at</label>
              <input type="datetime-local" name="ends_at" value={form.ends_at} onChange={onChange} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/10" />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={onChange} rows={4} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-1">Image URL</label>
              <input name="image_url" value={form.image_url} onChange={onChange} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/10" />
            </div>
            <div>
              <label className="block text-sm mb-1">Capacity</label>
              <input type="number" name="capacity" value={form.capacity} onChange={onChange} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/10" />
            </div>
            <div>
              <label className="block text-sm mb-1">Tags (comma separated)</label>
              <input name="tags" value={form.tags} onChange={onChange} className="w-full px-3 py-2 rounded-md bg-white/10 border border-white/10" />
            </div>
          </div>
          {error && <p className="text-red-400">{error}</p>}
          {createdId ? (
            <a href={`/events/${createdId}`} className="inline-flex items-center px-4 py-2 rounded-md bg-green-600 hover:bg-green-500">View Event</a>
          ) : (
            <button disabled={saving} className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 disabled:opacity-60">
              {saving ? 'Creating...' : 'Create Event'}
            </button>
          )}
        </form>
      </main>
    </div>
  )
}
