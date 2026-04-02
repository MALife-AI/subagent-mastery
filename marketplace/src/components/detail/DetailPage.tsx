import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useManifest } from '../../hooks/useManifest'
import { Badge, CategoryBadge } from '../shared/Badge'
import type { Skill, Agent, Command, AnyItem } from '../../types/manifest'
import { useState } from 'react'

export function DetailPage() {
  const { type, id } = useParams<{ type: string; id: string }>()
  const manifest = useManifest()
  const [copied, setCopied] = useState(false)

  let item: AnyItem | undefined
  if (type === 'skill') item = manifest.skills.find(s => s.id === id)
  else if (type === 'agent') item = manifest.agents.find(a => a.id === id)
  else if (type === 'command') item = manifest.commands.find(c => c.id === id)

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-4xl mb-4">😕</p>
        <p className="text-gray-500">항목을 찾을 수 없습니다</p>
        <Link to="/" className="text-brand-orange text-sm mt-4 inline-block hover:underline">← 카탈로그로 돌아가기</Link>
      </div>
    )
  }

  const skill = item.type === 'skill' ? item as Skill : null
  const agent = item.type === 'agent' ? item as Agent : null
  const command = item.type === 'command' ? item as Command : null

  const installCmd = type === 'skill'
    ? `cp -r skills/${id}/ ~/.claude/skills/${id}/`
    : type === 'agent'
    ? `cp agents/*/${id}.md ~/.claude/agents/`
    : `cp commands/${id}.md ~/.claude/commands/`

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Back */}
      <Link to="/" className="inline-flex items-center text-sm text-gray-400 hover:text-brand-orange transition mb-6">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        카탈로그
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900">{item.name}</h1>
                <p className="text-sm text-gray-500 mt-1">{item.description.slice(0, 200)}</p>
              </div>
            </div>

            {skill?.analogy && (
              <div className="bg-brand-blue/5 rounded-lg p-4 mb-6">
                <p className="text-sm text-brand-blue">💡 {skill.analogy}</p>
              </div>
            )}

            <div className="markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {item.body}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Metadata */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-4">정보</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-400">타입</dt>
                <dd>
                  <Badge variant={type === 'skill' ? 'orange' : type === 'agent' ? 'blue' : 'green'}>
                    {type === 'skill' ? '🎯 Skill' : type === 'agent' ? '🤖 Agent' : '⚡ Command'}
                  </Badge>
                </dd>
              </div>

              {skill?.version && (
                <div className="flex justify-between">
                  <dt className="text-gray-400">버전</dt>
                  <dd className="font-medium">v{skill.version}</dd>
                </div>
              )}

              {skill?.author && (
                <div className="flex justify-between">
                  <dt className="text-gray-400">작성자</dt>
                  <dd>{skill.author}</dd>
                </div>
              )}

              {skill?.license && (
                <div className="flex justify-between">
                  <dt className="text-gray-400">라이선스</dt>
                  <dd>{skill.license}</dd>
                </div>
              )}

              {agent && (
                <>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">카테고리</dt>
                    <dd><CategoryBadge category={agent.category} /></dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">모델</dt>
                    <dd className="font-medium">{agent.model}</dd>
                  </div>
                </>
              )}
            </dl>
          </div>

          {/* Tools */}
          {(Array.isArray(agent?.tools) && agent.tools.length > 0 || Array.isArray(command?.allowedTools) && command.allowedTools.length > 0) && (
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3">사용 도구</h3>
              <div className="flex flex-wrap gap-1.5">
                {(Array.isArray(agent?.tools) ? agent.tools : Array.isArray(command?.allowedTools) ? command.allowedTools : []).map(t => (
                  <Badge key={t} variant="blue">{t}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Keywords */}
          {skill && skill.keywords.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3">키워드</h3>
              <div className="flex flex-wrap gap-1.5">
                {skill.keywords.map(k => (
                  <Badge key={k}>{k}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Assets */}
          {skill && skill.assets.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3">참조 파일 ({skill.assets.length})</h3>
              <ul className="space-y-1">
                {skill.assets.map(a => (
                  <li key={a} className="text-xs text-gray-500 truncate">📄 {a}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Install */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-3">설치</h3>
            <div className="bg-gray-900 text-gray-300 rounded-lg p-3 text-xs font-mono break-all">
              {installCmd}
            </div>
            <button
              onClick={handleCopy}
              className="mt-3 w-full py-2 rounded-lg text-sm font-medium bg-brand-orange text-white hover:bg-brand-orange-light transition"
            >
              {copied ? '✓ 복사됨!' : '📋 명령어 복사'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
