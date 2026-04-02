import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Badge } from '../shared/Badge'
import { useGitHub } from '../../hooks/useGitHub'

interface SkillFormData {
  id: string
  name: string
  description: string
  version: string
  author: string
  license: string
  keywords: string
  analogy: string
  argumentHint: string
  body: string
}

const EMPTY_FORM: SkillFormData = {
  id: '',
  name: '',
  description: '',
  version: '1.0.0',
  author: 'AI혁신팀',
  license: 'MIT',
  keywords: '',
  analogy: '',
  argumentHint: '',
  body: `# 스킬 이름

스킬에 대한 설명을 작성하세요.

## When to Activate

- 이 스킬이 활성화되어야 하는 상황 1
- 상황 2

## How It Works

### Step 1: 분석
사용자 요청을 분석합니다.

### Step 2: 실행
매칭된 작업을 수행합니다.

## Examples

\`\`\`
입력: "예시 입력"
출력: "예시 출력"
\`\`\`
`,
}

const TEMPLATES = [
  {
    label: '디자인 스킬',
    icon: '🎨',
    data: {
      ...EMPTY_FORM,
      name: 'ckm:my-design-skill',
      description: '디자인 관련 작업을 수행하는 스킬',
      keywords: '디자인, UI, 스타일링',
      body: `# Design Skill

디자인 작업을 수행합니다.

## When to Activate

- 사용자가 UI 디자인을 요청할 때
- 시각적 요소를 생성/수정할 때

## Design Principles

1. **일관성**: 디자인 시스템을 따릅니다
2. **접근성**: WCAG 2.1 AA 기준 충족
3. **반응형**: 모바일 우선 접근

## How It Works

### Step 1: 요구사항 분석
사용자의 디자인 요구사항을 파악합니다.

### Step 2: 디자인 시스템 참조
기존 디자인 토큰과 컴포넌트를 확인합니다.

### Step 3: 구현
디자인을 코드로 변환합니다.
`,
    },
  },
  {
    label: '개발 스킬',
    icon: '💻',
    data: {
      ...EMPTY_FORM,
      name: 'ckm:my-dev-skill',
      description: '개발 관련 작업을 수행하는 스킬',
      keywords: '개발, 코드, 구현',
      body: `# Development Skill

개발 작업을 수행합니다.

## When to Activate

- 새로운 기능 구현 요청 시
- 코드 리팩토링 요청 시

## Architecture

이 스킬은 다음 패턴을 따릅니다:
- Clean Architecture
- SOLID 원칙
- TDD 기반

## How It Works

### Step 1: 코드베이스 분석
기존 코드를 탐색하여 패턴을 파악합니다.

### Step 2: 설계
구현 계획을 수립합니다.

### Step 3: 구현
코드를 작성하고 테스트합니다.
`,
    },
  },
  {
    label: '분석 스킬',
    icon: '📊',
    data: {
      ...EMPTY_FORM,
      name: 'ckm:my-analysis-skill',
      description: '데이터 분석 및 인사이트를 제공하는 스킬',
      keywords: '분석, 데이터, 리포트, 인사이트',
      body: `# Analysis Skill

데이터를 분석하고 인사이트를 제공합니다.

## When to Activate

- 데이터 분석 요청 시
- 리포트 생성 요청 시
- 트렌드 분석이 필요할 때

## How It Works

### Step 1: 데이터 수집
관련 데이터를 수집합니다.

### Step 2: 분석
통계적 방법으로 데이터를 분석합니다.

### Step 3: 시각화
결과를 차트와 표로 시각화합니다.

### Step 4: 인사이트
핵심 발견사항을 요약합니다.
`,
    },
  },
]

function generateSkillMd(form: SkillFormData): string {
  const lines = [
    '---',
    `name: ${form.name || form.id}`,
    `description: "${form.description}"`,
  ]
  if (form.argumentHint) lines.push(`argument-hint: "${form.argumentHint}"`)
  if (form.license) lines.push(`license: ${form.license}`)
  lines.push('metadata:')
  if (form.author) lines.push(`  author: ${form.author}`)
  if (form.version) lines.push(`  version: "${form.version}"`)
  lines.push('---', '', form.body)
  return lines.join('\n')
}

function encodeShareData(form: SkillFormData): string {
  const json = JSON.stringify(form)
  return btoa(unescape(encodeURIComponent(json)))
}

function decodeShareData(encoded: string): SkillFormData | null {
  try {
    const json = decodeURIComponent(escape(atob(encoded)))
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function SkillCreatorPage() {
  const location = useLocation()
  const [form, setForm] = useState<SkillFormData>(EMPTY_FORM)
  const [activePanel, setActivePanel] = useState<'edit' | 'preview' | 'output'>('edit')
  const [copied, setCopied] = useState<string | null>(null)
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [showTokenInput, setShowTokenInput] = useState(false)
  const [tokenInput, setTokenInput] = useState('')
  const [commitStatus, setCommitStatus] = useState<{ type: 'success' | 'error'; message: string; url?: string } | null>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const github = useGitHub()

  // Load from share URL
  useEffect(() => {
    const params = new URLSearchParams(location.search || location.hash.split('?')[1] || '')
    const shared = params.get('shared')
    if (shared) {
      const decoded = decodeShareData(shared)
      if (decoded) {
        setForm(decoded)
        setActivePanel('preview')
      }
    }
  }, [location])

  const updateField = (field: keyof SkillFormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleShare = () => {
    const encoded = encodeShareData(form)
    const url = `${window.location.origin}${window.location.pathname}#/create?shared=${encoded}`
    setShareUrl(url)
    navigator.clipboard.writeText(url)
    setCopied('share')
    setTimeout(() => setCopied(null), 3000)
  }

  const handleDownload = () => {
    const content = generateSkillMd(form)
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${form.id || 'my-skill'}/SKILL.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(form, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${form.id || 'my-skill'}.skill.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImportJson = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json,.skill.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string)
          setForm({ ...EMPTY_FORM, ...data })
          setActivePanel('edit')
        } catch {
          alert('유효하지 않은 스킬 파일입니다')
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  const handleGitHubLogin = async () => {
    const result = await github.login(tokenInput)
    if (result.success) {
      setShowTokenInput(false)
      setTokenInput('')
      setCommitStatus({ type: 'success', message: result.message })
    } else {
      setCommitStatus({ type: 'error', message: result.message })
    }
    setTimeout(() => setCommitStatus(null), 4000)
  }

  const handleCommitToRepo = async () => {
    if (!form.id) {
      setCommitStatus({ type: 'error', message: '스킬 ID를 입력해주세요' })
      setTimeout(() => setCommitStatus(null), 3000)
      return
    }
    const msg = `feat: ${form.id} 스킬 ${form.version ? `v${form.version}` : ''} 추가`
    const result = await github.commitSkill(form.id, generateSkillMd(form), msg)
    setCommitStatus({ type: result.success ? 'success' : 'error', message: result.message, url: result.url })
    if (result.success) {
      setTimeout(() => setCommitStatus(null), 8000)
    } else {
      setTimeout(() => setCommitStatus(null), 5000)
    }
  }

  const skillMd = generateSkillMd(form)
  const installCmd = `mkdir -p ~/.claude/skills/${form.id || 'my-skill'} && cat > ~/.claude/skills/${form.id || 'my-skill'}/SKILL.md << 'SKILL_EOF'\n${skillMd}\nSKILL_EOF`

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">스킬 생성</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">새로운 스킬을 만들고 팀과 공유하세요</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleImportJson}
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            📂 불러오기
          </button>
          <button
            onClick={handleShare}
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium bg-brand-blue text-white hover:bg-brand-blue-light transition"
          >
            {copied === 'share' ? '✓ 복사됨!' : '🔗 공유'}
          </button>
          {github.isLoggedIn ? (
            <button
              onClick={handleCommitToRepo}
              disabled={github.loading || !form.id}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              {github.loading ? '⏳ 저장 중...' : '🚀 레포에 저장'}
            </button>
          ) : (
            <button
              onClick={() => setShowTokenInput(!showTokenInput)}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 transition"
            >
              🔑 GitHub
            </button>
          )}
        </div>
      </div>

      {/* GitHub 로그인 상태 */}
      {github.isLoggedIn && github.user && (
        <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-lg px-3 sm:px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <img src={github.user.avatar_url} alt="" className="w-5 h-5 sm:w-6 sm:h-6 rounded-full" />
            <span className="text-xs sm:text-sm text-emerald-800 font-medium">{github.user.login}</span>
            <span className="text-[10px] sm:text-xs text-emerald-600">· {github.repoOwner}/{github.repoName}</span>
            <span className="text-[10px] sm:text-xs text-emerald-500 hidden sm:inline">— 레포에 바로 커밋 가능</span>
          </div>
          <button onClick={github.logout} className="text-xs text-emerald-600 hover:text-emerald-800 underline self-end sm:self-auto">로그아웃</button>
        </div>
      )}

      {/* GitHub 토큰 입력 */}
      {showTokenInput && !github.isLoggedIn && (
        <div className="mb-4 bg-gray-50 border border-gray-200 rounded-xl p-5">
          <h4 className="text-sm font-bold text-gray-900 mb-2">GitHub Personal Access Token 입력</h4>
          <p className="text-xs text-gray-500 mb-3">
            GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens에서
            <strong> {github.repoOwner}/{github.repoName}</strong> 레포에 <strong>Contents read/write</strong> 권한이 있는 토큰을 생성하세요.
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              value={tokenInput}
              onChange={e => setTokenInput(e.target.value)}
              placeholder="github_pat_..."
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/30 focus:border-brand-orange"
              onKeyDown={e => e.key === 'Enter' && handleGitHubLogin()}
            />
            <button
              onClick={handleGitHubLogin}
              disabled={!tokenInput || github.loading}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-40 transition"
            >
              {github.loading ? '확인 중...' : '연결'}
            </button>
            <button
              onClick={() => { setShowTokenInput(false); setTokenInput('') }}
              className="px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-200 transition"
            >
              취소
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-2">토큰은 브라우저 localStorage에만 저장되며 외부로 전송되지 않습니다.</p>
        </div>
      )}

      {/* 커밋 상태 알림 */}
      {commitStatus && (
        <div className={`mb-4 rounded-lg p-3 flex items-center justify-between ${
          commitStatus.type === 'success'
            ? 'bg-emerald-50 border border-emerald-200'
            : 'bg-red-50 border border-red-200'
        }`}>
          <div>
            <p className={`text-sm font-medium ${commitStatus.type === 'success' ? 'text-emerald-700' : 'text-red-700'}`}>
              {commitStatus.type === 'success' ? '✅' : '❌'} {commitStatus.message}
            </p>
            {commitStatus.url && (
              <a href={commitStatus.url} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-600 hover:underline mt-1 inline-block">
                GitHub에서 확인하기 →
              </a>
            )}
          </div>
          <button onClick={() => setCommitStatus(null)} className={`${commitStatus.type === 'success' ? 'text-emerald-400' : 'text-red-400'} hover:opacity-70`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Templates */}
      <div className="mb-6">
        <p className="text-xs text-gray-400 mb-2">템플릿으로 시작하기</p>
        <div className="flex flex-wrap gap-2">
          {TEMPLATES.map(t => (
            <button
              key={t.label}
              onClick={() => { setForm(t.data); setActivePanel('edit') }}
              className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-xs sm:text-sm bg-white border border-gray-200 hover:border-brand-orange/40 hover:shadow-sm transition flex items-center gap-1.5 sm:gap-2"
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
          <button
            onClick={() => setForm(EMPTY_FORM)}
            className="px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-xs sm:text-sm bg-white border border-gray-200 hover:border-gray-300 transition text-gray-500"
          >
            초기화
          </button>
        </div>
      </div>

      {/* Share URL notification */}
      {shareUrl && (
        <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center justify-between">
          <p className="text-sm text-emerald-700">공유 링크가 클립보드에 복사되었습니다. 이 링크를 받은 사람은 스킬을 바로 불러올 수 있습니다.</p>
          <button onClick={() => setShareUrl(null)} className="text-emerald-400 hover:text-emerald-600 ml-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Panel tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-full sm:max-w-md">
        {([
          { key: 'edit', label: '편집', icon: '✏️' },
          { key: 'preview', label: '미리보기', icon: '👁️' },
          { key: 'output', label: '출력/설치', icon: '📄' },
        ] as const).map(tab => (
          <button
            key={tab.key}
            onClick={() => setActivePanel(tab.key)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition ${
              activePanel === tab.key
                ? 'bg-white text-brand-blue shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Edit panel */}
      {activePanel === 'edit' && (
        <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Metadata form */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-4">메타데이터</h3>
              <div className="space-y-3">
                <Field label="스킬 ID *" hint="영문 소문자, 하이픈 (예: my-design-skill)">
                  <input
                    value={form.id}
                    onChange={e => updateField('id', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                    placeholder="my-skill"
                    className="input-field"
                  />
                </Field>
                <Field label="스킬 이름" hint="네임스페이스 포함 (예: ckm:my-skill)">
                  <input
                    value={form.name}
                    onChange={e => updateField('name', e.target.value)}
                    placeholder="ckm:my-skill"
                    className="input-field"
                  />
                </Field>
                <Field label="설명 *">
                  <textarea
                    value={form.description}
                    onChange={e => updateField('description', e.target.value)}
                    rows={3}
                    placeholder="이 스킬이 무엇을 하는지 설명하세요"
                    className="input-field resize-none"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="버전">
                    <input value={form.version} onChange={e => updateField('version', e.target.value)} className="input-field" />
                  </Field>
                  <Field label="라이선스">
                    <input value={form.license} onChange={e => updateField('license', e.target.value)} className="input-field" />
                  </Field>
                </div>
                <Field label="작성자">
                  <input value={form.author} onChange={e => updateField('author', e.target.value)} className="input-field" />
                </Field>
                <Field label="키워드" hint="쉼표로 구분">
                  <input
                    value={form.keywords}
                    onChange={e => updateField('keywords', e.target.value)}
                    placeholder="디자인, UI, 컴포넌트"
                    className="input-field"
                  />
                </Field>
                <Field label="쉬운 비유 설명" hint="비개발자를 위한 한 줄 설명">
                  <input
                    value={form.analogy}
                    onChange={e => updateField('analogy', e.target.value)}
                    placeholder="인테리어 디자이너 — 화면 배치를 잡는 역할"
                    className="input-field"
                  />
                </Field>
                <Field label="인자 힌트" hint="사용 시 보여줄 인자 형식">
                  <input
                    value={form.argumentHint}
                    onChange={e => updateField('argumentHint', e.target.value)}
                    placeholder="[platform] [style]"
                    className="input-field"
                  />
                </Field>
              </div>
            </div>
          </div>

          {/* Body editor */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-100 p-5 h-full">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-900">스킬 본문 (Markdown)</h3>
                <span className="text-[10px] text-gray-400">{form.body.length}자</span>
              </div>
              <textarea
                value={form.body}
                onChange={e => updateField('body', e.target.value)}
                className="w-full h-[500px] font-mono text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
                placeholder="# 스킬 제목\n\n스킬 내용을 마크다운으로 작성하세요..."
              />
            </div>
          </div>
        </div>
      )}

      {/* Preview panel */}
      {activePanel === 'preview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900">{form.name || form.id || '새 스킬'}</h1>
                <p className="text-sm text-gray-500 mt-1">{form.description || '설명을 입력하세요'}</p>
              </div>
            </div>
            {form.analogy && (
              <div className="bg-brand-blue/5 rounded-lg p-4 mb-6">
                <p className="text-sm text-brand-blue">💡 {form.analogy}</p>
              </div>
            )}
            <div className="markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {form.body}
              </ReactMarkdown>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-4">정보</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-400">타입</dt>
                  <dd><Badge variant="orange">🎯 Skill</Badge></dd>
                </div>
                {form.version && (
                  <div className="flex justify-between">
                    <dt className="text-gray-400">버전</dt>
                    <dd className="font-medium">v{form.version}</dd>
                  </div>
                )}
                {form.author && (
                  <div className="flex justify-between">
                    <dt className="text-gray-400">작성자</dt>
                    <dd>{form.author}</dd>
                  </div>
                )}
                {form.license && (
                  <div className="flex justify-between">
                    <dt className="text-gray-400">라이선스</dt>
                    <dd>{form.license}</dd>
                  </div>
                )}
              </dl>
            </div>

            {form.keywords && (
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-3">키워드</h3>
                <div className="flex flex-wrap gap-1.5">
                  {form.keywords.split(',').map(k => k.trim()).filter(Boolean).map(k => (
                    <Badge key={k}>{k}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Output panel */}
      {activePanel === 'output' && (
        <div className="space-y-6">
          {/* SKILL.md output */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-900">SKILL.md</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(skillMd, 'md')}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                >
                  {copied === 'md' ? '✓ 복사됨' : '📋 복사'}
                </button>
                <button
                  onClick={handleDownload}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                >
                  💾 다운로드
                </button>
              </div>
            </div>
            <pre className="bg-gray-900 text-gray-300 rounded-lg p-4 text-xs font-mono overflow-x-auto max-h-80 overflow-y-auto">
              {skillMd}
            </pre>
          </div>

          {/* Install command */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-900">설치 명령어</h3>
              <button
                onClick={() => handleCopy(installCmd, 'install')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-orange text-white hover:bg-brand-orange-light transition"
              >
                {copied === 'install' ? '✓ 복사됨' : '📋 명령어 복사'}
              </button>
            </div>
            <pre className="bg-gray-900 text-gray-300 rounded-lg p-4 text-xs font-mono overflow-x-auto">
              {installCmd}
            </pre>
            <p className="text-xs text-gray-400 mt-3">
              터미널에서 위 명령어를 실행하면 <code className="bg-gray-100 px-1 rounded">~/.claude/skills/{form.id || 'my-skill'}/</code>에 설치됩니다.
              Claude Code를 재시작하면 스킬이 적용됩니다.
            </p>
          </div>

          {/* Share actions */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4">공유 및 배포</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                onClick={github.isLoggedIn ? handleCommitToRepo : () => setShowTokenInput(true)}
                disabled={github.loading}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition ${
                  github.isLoggedIn
                    ? 'border-emerald-200 bg-emerald-50 hover:border-emerald-400 hover:shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <span className="text-2xl">🚀</span>
                <span className="text-sm font-medium text-gray-700">
                  {github.isLoggedIn ? '레포에 저장' : 'GitHub 연결'}
                </span>
                <span className="text-[10px] text-gray-400">
                  {github.isLoggedIn ? '커밋 → 자동 배포' : '로그인 필요'}
                </span>
              </button>
              <button
                onClick={handleShare}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-brand-blue/30 hover:shadow-sm transition"
              >
                <span className="text-2xl">🔗</span>
                <span className="text-sm font-medium text-gray-700">공유 링크 생성</span>
                <span className="text-[10px] text-gray-400">URL로 스킬 공유</span>
              </button>
              <button
                onClick={handleExportJson}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-brand-orange/30 hover:shadow-sm transition"
              >
                <span className="text-2xl">📦</span>
                <span className="text-sm font-medium text-gray-700">JSON 내보내기</span>
                <span className="text-[10px] text-gray-400">파일로 공유/백업</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-emerald-300 hover:shadow-sm transition"
              >
                <span className="text-2xl">💾</span>
                <span className="text-sm font-medium text-gray-700">SKILL.md 다운로드</span>
                <span className="text-[10px] text-gray-400">바로 설치 가능한 파일</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-gray-700">{label}</span>
      {hint && <span className="text-[10px] text-gray-400 ml-1">({hint})</span>}
      <div className="mt-1">{children}</div>
      <style>{`
        .input-field {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
          font-size: 0.875rem;
          color: #1f2937;
          transition: all 0.15s;
        }
        .input-field:focus {
          outline: none;
          border-color: #F58220;
          box-shadow: 0 0 0 3px rgba(245, 130, 32, 0.1);
        }
        .input-field::placeholder {
          color: #9ca3af;
        }
      `}</style>
    </label>
  )
}
