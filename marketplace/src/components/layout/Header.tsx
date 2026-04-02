import { Link, useLocation } from 'react-router-dom'
import { useManifest } from '../../hooks/useManifest'
import { useState } from 'react'

export function Header() {
  const manifest = useManifest()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const nav = [
    { to: '/', label: '카탈로그', icon: '📦' },
    { to: '/smart-skill', label: 'Smart Skill', icon: '✨' },
    { to: '/create', label: '스킬 생성', icon: '🛠️' },
  ]

  return (
    <header className="bg-brand-blue text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition shrink-0">
            <span className="text-xl sm:text-2xl">🧩</span>
            <div>
              <h1 className="text-sm sm:text-lg font-bold leading-tight">Subagent Mastery</h1>
              <p className="text-[10px] sm:text-xs text-white/60 hidden sm:block">AI혁신팀 Skill Marketplace</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {nav.map(n => (
              <Link
                key={n.to}
                to={n.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  pathname === n.to
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="mr-1.5">{n.icon}</span>
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 text-xs text-white/50">
            <span>{manifest.stats.totalSkills} Skills</span>
            <span>·</span>
            <span>{manifest.stats.totalAgents} Agents</span>
            <span>·</span>
            <span>{manifest.stats.totalCommands} Commands</span>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 px-4 py-3 space-y-1">
          {nav.map(n => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                pathname === n.to
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="mr-2">{n.icon}</span>
              {n.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 text-xs text-white/40 pt-2 px-4">
            <span>{manifest.stats.totalSkills} Skills</span>
            <span>·</span>
            <span>{manifest.stats.totalAgents} Agents</span>
            <span>·</span>
            <span>{manifest.stats.totalCommands} Commands</span>
          </div>
        </div>
      )}
    </header>
  )
}
