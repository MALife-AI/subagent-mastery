import { useSearch } from '../../hooks/useSearch'
import { SearchBar } from './SearchBar'
import { TypeTabs } from './TypeTabs'
import { SkillCard } from './SkillCard'
import { AgentCard } from './AgentCard'
import { CommandCard } from './CommandCard'
import type { Skill, Agent, Command } from '../../types/manifest'

const CATEGORY_LABELS: Record<string, string> = {
  'business-product': '비즈니스/프로덕트',
  'core-development': '핵심 개발',
  'data-ai': '데이터/AI',
  'developer-experience': '개발자 경험',
  'infrastructure': '인프라',
  'language-specialists': '언어 전문가',
  'meta-orchestration': '메타 오케스트레이션',
  'quality-security': '품질/보안',
  'research-analysis': '연구/분석',
  'specialized-domains': '전문 도메인',
}

export function CatalogPage() {
  const {
    query, setQuery,
    activeTab, setActiveTab,
    selectedCategory, setSelectedCategory,
    filtered,
    categories,
  } = useSearch()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Skill Marketplace
        </h2>
        <p className="text-sm text-gray-500">
          AI혁신팀의 스킬, 에이전트, 커맨드를 탐색하세요
        </p>
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-6">
        <SearchBar query={query} onQueryChange={setQuery} />
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <TypeTabs active={activeTab} onChange={(t) => { setActiveTab(t); setSelectedCategory(null) }} />
      </div>

      {/* Category Filter (agents only) */}
      {activeTab === 'agent' && (
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
              !selectedCategory ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            전체
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                selectedCategory === cat ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {CATEGORY_LABELS[cat] || cat}
            </button>
          ))}
        </div>
      )}

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-gray-400">
          {filtered.length}개 결과
          {query && <span> · "{query}" 검색</span>}
          {selectedCategory && <span> · {CATEGORY_LABELS[selectedCategory] || selectedCategory}</span>}
        </p>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-gray-400 text-sm">검색 결과가 없습니다</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeTab === 'skill' && filtered.map(item => (
            <SkillCard key={item.id} skill={item as Skill} />
          ))}
          {activeTab === 'agent' && filtered.map(item => (
            <AgentCard key={item.id} agent={item as Agent} />
          ))}
          {activeTab === 'command' && filtered.map(item => (
            <CommandCard key={item.id} command={item as Command} />
          ))}
        </div>
      )}
    </div>
  )
}
