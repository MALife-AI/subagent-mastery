import { readFileSync, readdirSync, writeFileSync, statSync, existsSync } from 'fs'
import { join, basename, dirname } from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')
const OUT = join(__dirname, '..', 'public', 'manifest.json')

// smart-skill.md에서 추출한 키워드 매핑
const SKILL_KEYWORDS = {
  'banner-design': ['배너', '커버', '헤더', '썸네일', '광고 이미지', 'banner'],
  'brand': ['브랜드', '보이스', '아이덴티티', '메시징', '톤앤매너', 'brand'],
  'composition-patterns': ['컴포넌트', '합성 패턴', 'compound', 'render props', '레고'],
  'design': ['디자인', '로고', 'CIP', '아이콘', '소셜 이미지', 'design'],
  'design-system': ['토큰', '디자인 시스템', 'CSS 변수', '컴포넌트 스펙', 'token'],
  'mirae-asset-design': ['미래에셋', '금융 UI', '리포트', '차트', 'mirae'],
  'react-best-practices': ['React 성능', 'Next.js', '최적화', 'SSR', 'RSC'],
  'react-native-skills': ['React Native', 'Expo', '모바일', '앱', 'mobile'],
  'slides': ['슬라이드', '프레젠테이션', '발표', 'PPT', '피치덱'],
  'ui-styling': ['UI', 'shadcn', 'Tailwind', '스타일링', '컴포넌트'],
  'ui-ux-pro-max': ['UX', '사용성', '접근성', '인터랙션', '레이아웃'],
  'web-design-guidelines': ['웹 디자인 리뷰', '접근성 감사', 'UI 검토', 'audit'],
  'everything-claude-code': ['ECC', '개발 컨벤션', 'convention'],
}

// 쉬운 비유 설명
const SKILL_ANALOGIES = {
  'banner-design': '광고 배너 디자이너 — SNS, 웹사이트, 광고용 이미지 배너를 만들어주는 역할',
  'brand': '브랜드 컨설턴트 — 브랜드 말투와 이미지를 정리하는 역할',
  'composition-patterns': '레고 설계사 — 화면 부품을 레고처럼 조립·재사용할 수 있게 구조를 잡는 역할',
  'design': '종합 디자인 스튜디오 — 로고, 명함, 발표자료, 배너 등 시각물을 한곳에서 만드는 역할',
  'design-system': '인테리어 규격서 — 모든 화면에서 같은 색상, 같은 간격, 같은 글꼴을 쓰도록 규칙을 정하는 역할',
  'mirae-asset-design': '미래에셋 브랜드 가이드북 — 미래에셋 공식 색상, 글꼴, 로고 규정을 적용해주는 역할',
  'react-best-practices': '웹 성능 튜너 — 웹페이지가 빠르게 뜨고 부드럽게 작동하도록 최적화하는 역할',
  'react-native-skills': '모바일 앱 전문가 — 스마트폰 앱을 만들 때 필요한 노하우를 제공하는 역할',
  'slides': '발표자료 전문 디자이너 — 차트가 포함된 깔끔한 프레젠테이션을 만들어주는 역할',
  'ui-styling': '가구 제작자 — 실제 버튼, 표, 입력창 같은 화면 부품을 예쁘게 만들어주는 역할',
  'ui-ux-pro-max': '인테리어 디자이너 — 화면의 전체 분위기, 배치, 색상 조합을 잡아주는 역할',
  'web-design-guidelines': '웹 품질 검수관 — 만들어진 화면이 표준과 접근성 기준을 충족하는지 검사하는 역할',
  'everything-claude-code': '프로젝트 규칙집 — 이 프로젝트에서 코드를 어떻게 작성해야 하는지 규칙을 알려주는 역할',
}

// 협업 패턴
const COLLABORATION_PATTERNS = [
  {
    trigger: ['미래에셋', 'UI', '대시보드', '리포트'],
    skills: ['mirae-asset-design', 'ui-styling', 'ui-ux-pro-max'],
    description: 'mirae-asset-design이 브랜드 규격을 정하면, ui-ux-pro-max가 전체 구조와 배치를 설계하고, ui-styling이 실제 화면 부품을 조립합니다.',
  },
  {
    trigger: ['발표', 'PPT', '프레젠테이션', '슬라이드'],
    skills: ['slides', 'design-system'],
    description: 'slides가 프레젠테이션 구조를 잡고, design-system이 일관된 디자인 토큰을 적용합니다.',
  },
  {
    trigger: ['배너', '광고', '소셜'],
    skills: ['banner-design', 'brand', 'ui-ux-pro-max'],
    description: 'brand가 브랜드 톤을 정하면, ui-ux-pro-max가 레이아웃을 잡고, banner-design이 최종 배너를 만듭니다.',
  },
  {
    trigger: ['React', '컴포넌트', '프론트엔드', '웹'],
    skills: ['react-best-practices', 'composition-patterns', 'ui-styling'],
    description: 'composition-patterns가 컴포넌트 구조를 설계하면, react-best-practices가 성능을 최적화하고, ui-styling이 스타일을 입힙니다.',
  },
  {
    trigger: ['모바일', '앱', 'React Native'],
    skills: ['react-native-skills', 'ui-ux-pro-max'],
    description: 'ui-ux-pro-max가 모바일 UX를 설계하면, react-native-skills가 네이티브 최적화를 적용합니다.',
  },
  {
    trigger: ['로고', 'CIP', '브랜딩', '명함'],
    skills: ['design', 'brand'],
    description: 'brand가 브랜드 전략을 수립하면, design이 로고/CIP/명함 등 시각물을 제작합니다.',
  },
]

function parseMarkdownFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8')
    const { data, content: body } = matter(content)
    return { data, body: body.trim() }
  } catch {
    return null
  }
}

function scanSkills() {
  const skillsDir = join(ROOT, 'skills')
  if (!existsSync(skillsDir)) return []

  return readdirSync(skillsDir)
    .filter(d => {
      const p = join(skillsDir, d)
      return statSync(p).isDirectory() && existsSync(join(p, 'SKILL.md'))
    })
    .map(id => {
      const parsed = parseMarkdownFile(join(skillsDir, id, 'SKILL.md'))
      if (!parsed) return null

      const { data, body } = parsed
      const assets = []
      const refsDir = join(skillsDir, id, 'references')
      if (existsSync(refsDir)) {
        readdirSync(refsDir).forEach(f => assets.push(`references/${f}`))
      }

      return {
        id,
        type: 'skill',
        name: data.name || id,
        description: typeof data.description === 'string' ? data.description : String(data.description || ''),
        argumentHint: data['argument-hint'] || null,
        version: data.metadata?.version || null,
        author: data.metadata?.author || null,
        license: data.license || null,
        body: body.slice(0, 3000),
        assets,
        keywords: SKILL_KEYWORDS[id] || [],
        analogy: SKILL_ANALOGIES[id] || null,
      }
    })
    .filter(Boolean)
}

function scanAgents() {
  const agentsDir = join(ROOT, 'agents')
  if (!existsSync(agentsDir)) return []

  const agents = []
  for (const category of readdirSync(agentsDir)) {
    const catPath = join(agentsDir, category)
    if (!statSync(catPath).isDirectory()) continue

    for (const file of readdirSync(catPath)) {
      if (!file.endsWith('.md') || file === 'README.md') continue
      const parsed = parseMarkdownFile(join(catPath, file))
      if (!parsed) continue

      const { data, body } = parsed
      agents.push({
        id: file.replace('.md', ''),
        type: 'agent',
        name: data.name || file.replace('.md', ''),
        description: typeof data.description === 'string' ? data.description : String(data.description || ''),
        category,
        tools: data.tools || [],
        model: data.model || 'sonnet',
        body: body.slice(0, 1000),
      })
    }
  }
  return agents
}

function scanCommands() {
  const cmdsDir = join(ROOT, 'commands')
  if (!existsSync(cmdsDir)) return []

  return readdirSync(cmdsDir)
    .filter(f => f.endsWith('.md') && f !== 'README.md')
    .map(file => {
      const parsed = parseMarkdownFile(join(cmdsDir, file))
      if (!parsed) return null

      const { data, body } = parsed
      return {
        id: file.replace('.md', ''),
        type: 'command',
        name: data.name || file.replace('.md', ''),
        description: typeof data.description === 'string' ? data.description : String(data.description || ''),
        allowedTools: data.allowed_tools || [],
        argumentHint: data['argument-hint'] || null,
        body: body.slice(0, 2000),
      }
    })
    .filter(Boolean)
}

function getAgentCategories(agents) {
  return [...new Set(agents.map(a => a.category))].sort()
}

// Generate
const skills = scanSkills()
const agents = scanAgents()
const commands = scanCommands()

const manifest = {
  generatedAt: new Date().toISOString(),
  skills,
  agents,
  commands,
  collaborations: COLLABORATION_PATTERNS,
  categories: {
    agents: getAgentCategories(agents),
  },
  stats: {
    totalSkills: skills.length,
    totalAgents: agents.length,
    totalCommands: commands.length,
  },
}

writeFileSync(OUT, JSON.stringify(manifest, null, 2), 'utf-8')
console.log(`✅ Manifest generated: ${skills.length} skills, ${agents.length} agents, ${commands.length} commands`)
