import type { ItemType } from '../../types/manifest'
import { useManifest } from '../../hooks/useManifest'

interface TypeTabsProps {
  active: ItemType
  onChange: (t: ItemType) => void
}

export function TypeTabs({ active, onChange }: TypeTabsProps) {
  const manifest = useManifest()

  const tabs: { key: ItemType; label: string; icon: string; count: number }[] = [
    { key: 'skill', label: 'Skills', icon: '🎯', count: manifest.stats.totalSkills },
    { key: 'agent', label: 'Agents', icon: '🤖', count: manifest.stats.totalAgents },
    { key: 'command', label: 'Commands', icon: '⚡', count: manifest.stats.totalCommands },
  ]

  return (
    <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            active === tab.key
              ? 'bg-white text-brand-blue shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span>{tab.icon}</span>
          {tab.label}
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${
            active === tab.key ? 'bg-brand-blue/10 text-brand-blue' : 'bg-gray-200 text-gray-500'
          }`}>
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  )
}
