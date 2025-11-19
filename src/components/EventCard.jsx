export default function EventCard({ event }) {
  const start = event.starts_at ? new Date(event.starts_at) : null
  const dateStr = start ? start.toLocaleString() : 'TBA'
  return (
    <div className="bg-white/90 rounded-xl shadow-sm ring-1 ring-slate-200 p-4 flex flex-col">
      {event.image_url && (
        <img src={event.image_url} alt={event.title} className="h-40 w-full object-cover rounded-lg mb-3" />
      )}
      <h3 className="text-lg font-semibold text-slate-900">{event.title}</h3>
      <p className="text-slate-600 line-clamp-2 mb-3">{event.description}</p>
      <div className="text-sm text-slate-500 mb-4">
        <span>{dateStr}</span>
        {event.location && <span className="ml-2">• {event.location}</span>}
      </div>
      <a href={`/events/${event.id}`} className="mt-auto inline-flex items-center justify-center px-3 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800">View</a>
    </div>
  )
}
