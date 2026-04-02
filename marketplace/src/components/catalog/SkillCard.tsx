import { Link } from 'react-router-dom'
import type { Skill } from '../../types/manifest'
import { Badge } from '../shared/Badge'

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <Link
      to={`/detail/skill/${skill.id}`}
      className="block bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg hover:border-brand-orange/30 transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-900 group-hover:text-brand-orange transition">
          {skill.id}
        </h3>
        <div className="flex gap-1.5">
          {skill.version && <Badge variant="orange">v{skill.version}</Badge>}
          {skill.license && <Badge variant="gray">{skill.license}</Badge>}
        </div>
      </div>

      <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
        {skill.description.slice(0, 120)}
      </p>

      {skill.analogy && (
        <p className="text-xs text-brand-blue/70 bg-brand-blue/5 rounded-lg px-3 py-2 mb-3">
          💡 {skill.analogy}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {skill.keywords.slice(0, 3).map(k => (
            <span key={k} className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">
              {k}
            </span>
          ))}
        </div>
        {skill.author && (
          <span className="text-[10px] text-gray-400">{skill.author}</span>
        )}
      </div>
    </Link>
  )
}
