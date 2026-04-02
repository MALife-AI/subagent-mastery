import { Link } from 'react-router-dom'
import type { Command } from '../../types/manifest'
import { Badge } from '../shared/Badge'

export function CommandCard({ command }: { command: Command }) {
  return (
    <Link
      to={`/detail/command/${command.id}`}
      className="block bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-brand-orange/30 transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-900 group-hover:text-brand-orange transition">
          /{command.id}
        </h3>
        {command.argumentHint && (
          <Badge variant="gray">{command.argumentHint}</Badge>
        )}
      </div>

      <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
        {command.description.slice(0, 150)}
      </p>

      <div className="flex flex-wrap gap-1">
        {command.allowedTools.map(t => (
          <span key={t} className="text-[10px] text-brand-blue bg-brand-blue/5 px-1.5 py-0.5 rounded">
            {t}
          </span>
        ))}
      </div>
    </Link>
  )
}
