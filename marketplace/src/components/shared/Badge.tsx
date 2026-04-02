interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'orange' | 'blue' | 'green' | 'gray'
}

const variants = {
  default: 'bg-gray-100 text-gray-700',
  orange: 'bg-brand-orange/10 text-brand-orange',
  blue: 'bg-brand-blue/10 text-brand-blue',
  green: 'bg-emerald-50 text-emerald-700',
  gray: 'bg-gray-100 text-gray-500',
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  )
}

const CATEGORY_COLORS: Record<string, string> = {
  'business-product': 'bg-purple-50 text-purple-700',
  'core-development': 'bg-blue-50 text-blue-700',
  'data-ai': 'bg-emerald-50 text-emerald-700',
  'developer-experience': 'bg-cyan-50 text-cyan-700',
  'infrastructure': 'bg-orange-50 text-orange-700',
  'language-specialists': 'bg-pink-50 text-pink-700',
  'meta-orchestration': 'bg-indigo-50 text-indigo-700',
  'quality-security': 'bg-red-50 text-red-700',
  'research-analysis': 'bg-amber-50 text-amber-700',
  'specialized-domains': 'bg-teal-50 text-teal-700',
}

const CATEGORY_LABELS: Record<string, string> = {
  'business-product': '비즈니스',
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

export function CategoryBadge({ category }: { category: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${CATEGORY_COLORS[category] || 'bg-gray-100 text-gray-600'}`}>
      {CATEGORY_LABELS[category] || category}
    </span>
  )
}
