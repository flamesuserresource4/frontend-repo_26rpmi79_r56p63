import Header from './components/Header'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />
      <main className="relative min-h-[70vh] flex items-center justify-center p-8">
        <div className="max-w-2xl w-full text-center">
          <img src="/flame-icon.svg" alt="Flames" className="w-24 h-24 mx-auto mb-6 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]" />
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Evently</h1>
          <p className="text-xl text-blue-200 mb-6">Create events, share them, and collect RSVPs.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="/events" className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500">Browse Events</a>
            <a href="/create" className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20">Create Event</a>
            <a href="/test" className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20">Test</a>
          </div>
        </div>
      </main>
    </div>
  )
}
