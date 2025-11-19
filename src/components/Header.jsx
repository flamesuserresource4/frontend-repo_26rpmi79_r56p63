import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-900/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/flame-icon.svg" alt="logo" className="w-7 h-7" />
          <span className="text-white font-semibold">Evently</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <NavLink to="/events" className={({isActive}) => `px-3 py-1.5 rounded-md ${isActive ? 'bg-blue-600 text-white' : 'text-blue-200 hover:text-white hover:bg-white/10'}`}>Browse</NavLink>
          <NavLink to="/create" className={({isActive}) => `px-3 py-1.5 rounded-md ${isActive ? 'bg-blue-600 text-white' : 'text-blue-200 hover:text-white hover:bg-white/10'}`}>Create</NavLink>
          <NavLink to="/test" className={({isActive}) => `px-3 py-1.5 rounded-md ${isActive ? 'bg-blue-600 text-white' : 'text-blue-200 hover:text-white hover:bg-white/10'}`}>Test</NavLink>
        </nav>
      </div>
    </header>
  )
}
