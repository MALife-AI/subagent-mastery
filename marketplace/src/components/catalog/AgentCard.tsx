import { Link } from 'react-router-dom'
import type { Agent } from '../../types/manifest'
import { CategoryBadge } from '../shared/Badge'
import { Badge } from '../shared/Badge'

const MODEL_ICONS: Record<string, string> = {
  haiku: '⚡',
  sonnet: '🎵',
  opus: '🎼',
}

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link
      to={`/detail/agent/${agent.id}`}
      className="block bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-brand-blue/30 transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-900 group-hover:text-brand-blue transition truncate mr-2">
          {agent.name}
        </h3>
        <CategoryBadge category={agent.category} />
      </div>

      <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
        {agent.description.slice(0, 120)}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          <Badge variant="blue">
            {MODEL_ICONS[agent.model] || '🎵'} {agent.model}
          </Badge>
          <Badge variant="gray">{agent.tools.length} tools</Badge>
        </div>
      </div>
    </Link>
  )
}
