import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSmartMatch } from '../../hooks/useSmartMatch'
import { Badge } from '../shared/Badge'

export function SmartSkillPage() {
  const [query, setQuery] = useState('')
  const { result, match } = useSmartMatch()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    match(query)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero */}
      <div className="text-center mb-8">
        <span className="text-4xl mb-4 block">✨</span>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Smart Skill</h2>
        <p className="text-sm text-gray-500">
          하고 싶은 작업을 자연어로 입력하면, 최적의 스킬 조합을 찾아드립니다
        </p>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <textarea
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="예: 미래에셋 스타일로 포트폴리오 리포트 페이지 만들어줘"
            rows={3}
            className="w-full resize-none text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={!query.trim()}
              className="px-6 py-2.5 rounded-lg text-sm font-medium bg-brand-orange text-white hover:bg-brand-orange-light disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              🔍 스킬 매칭
            </button>
          </div>
        </div>
      </form>

      {/* Quick examples */}
      {!result && (
        <div className="mb-8">
          <p className="text-xs text-gray-400 mb-3 text-center">예시를 클릭해보세요</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              '미래에셋 스타일로 대시보드 만들어줘',
              'React 성능 최적화해줘',
              '발표자료 만들어줘',
              '배너 디자인해줘',
              '브랜드 아이덴티티 정리해줘',
            ].map(ex => (
              <button
                key={ex}
                onClick={() => { setQuery(ex); match(ex) }}
                className="px-3 py-1.5 rounded-full text-xs bg-gray-100 text-gray-600 hover:bg-brand-orange/10 hover:text-brand-orange transition"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {result && result.matches.length > 0 && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-1">📋 스킬 매칭 결과</h3>
            <p className="text-xs text-gray-400">원본 지시: {query}</p>
          </div>

          {/* Matched skills */}
          <div className="space-y-3">
            {result.matches.map((m, i) => (
              <Link
                key={m.skill.id}
                to={`/detail/skill/${m.skill.id}`}
                className="block bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md hover:border-brand-orange/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                    <span className="text-lg">
                      {m.rank === 'primary' ? '🥇' : m.rank === 'secondary' ? '🥈' : '🔗'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-brand-orange font-bold">
                        {m.rank === 'primary' ? '1순위' : m.rank === 'secondary' ? `${i + 1}순위` : '관련'}
                      </span>
                      <h4 className="text-sm font-bold text-gray-900">{m.skill.id}</h4>
                      {m.skill.version && <Badge variant="orange">v{m.skill.version}</Badge>}
                    </div>

                    {m.skill.analogy && (
                      <p className="text-sm text-brand-blue mb-1">
                        🎯 <strong>하는 일:</strong> {m.skill.analogy}
                      </p>
                    )}

                    <p className="text-xs text-gray-500 line-clamp-2">
                      {m.skill.description.slice(0, 150)}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] text-gray-400">매칭 점수: {m.score}</span>
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-orange rounded-full transition-all"
                          style={{ width: `${Math.min(100, (m.score / result.matches[0].score) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Collaboration */}
          {result.collaboration && (
            <div className="bg-brand-blue/5 rounded-xl border border-brand-blue/10 p-5">
              <h3 className="text-sm font-bold text-brand-blue mb-2">🤝 스킬 협업 방식</h3>
              <p className="text-sm text-brand-blue/80">{result.collaboration.description}</p>
            </div>
          )}

          {/* Rewritten query */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-2">📝 재작성된 Query</h3>
            <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">{result.rewrittenQuery}</p>
          </div>
        </div>
      )}

      {result && result.matches.length === 0 && (
        <div className="text-center py-12">
          <p className="text-4xl mb-4">🤷</p>
          <p className="text-sm text-gray-500">매칭되는 스킬이 없습니다. 다른 표현으로 시도해보세요.</p>
        </div>
      )}
    </div>
  )
}
