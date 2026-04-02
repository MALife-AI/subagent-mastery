import { Link, useLocation } from 'react-router-dom'
import { useManifest } from '../../hooks/useManifest'

export function Header() {
  const manifest = useManifest()
  const { pathname } = useLocation()

  const nav = [
    { to: '/', label: '카탈로그', icon: '📦' },
    { to: '/smart-skill', label: 'Smart Skill', icon: '✨' },
    { to: '/create', label: '스킬 생성', icon: '🛠️' },
  ]

  return (
    <header className="bg-brand-blue text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <span className="text-2xl">🧩</span>
            <div>
              <h1 className="text-lg font-bold leading-tight">Subagent Mastery</h1>
              <p className="text-xs text-white/60">AI혁신팀 Skill Marketplace</p>
            </div>
          </Link>

          <nav className="flex items-center gap-1">
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

          <div className="hidden sm:flex items-center gap-3 text-xs text-white/50">
            <span>{manifest.stats.totalSkills} Skills</span>
            <span>·</span>
            <span>{manifest.stats.totalAgents} Agents</span>
            <span>·</span>
            <span>{manifest.stats.totalCommands} Commands</span>
          </div>
        </div>
      </div>
    </header>
  )
}
