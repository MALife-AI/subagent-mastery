import type { ItemType } from '../../types/manifest'
import { useManifest } from '../../hooks/useManifest'

interface TypeTabsProps {
  active: ItemType
  onChange: (t: ItemType) => void
}

export function TypeTabs({ active, onChange }: TypeTabsProps) {
  const manifest = useManifest()

  const tabs: { key: ItemType; label: string; shortLabel: string; icon: string; count: number }[] = [
    { key: 'skill', label: 'Skills', shortLabel: 'Skills', icon: '🎯', count: manifest.stats.totalSkills },
    { key: 'agent', label: 'Agents', shortLabel: 'Agents', icon: '🤖', count: manifest.stats.totalAgents },
    { key: 'command', label: 'Commands', shortLabel: 'Cmds', icon: '⚡', count: manifest.stats.totalCommands },
  ]

  return (
    <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-full sm:w-auto">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
            active === tab.key
              ? 'bg-white text-brand-blue shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <span>{tab.icon}</span>
          <span className="hidden sm:inline">{tab.label}</span>
          <span className="sm:hidden">{tab.shortLabel}</span>
          <span className={`text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5 rounded-full ${
            active === tab.key ? 'bg-brand-blue/10 text-brand-blue' : 'bg-gray-200 text-gray-500'
          }`}>
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  )
}
