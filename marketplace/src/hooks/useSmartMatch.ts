import { useState, useCallback } from 'react'
import type { Skill, Collaboration } from '../types/manifest'
import { useManifest } from './useManifest'

export interface MatchResult {
  skill: Skill
  score: number
  rank: 'primary' | 'secondary' | 'related'
}

export interface SmartMatchResult {
  matches: MatchResult[]
  collaboration: Collaboration | null
  rewrittenQuery: string
}

export function useSmartMatch() {
  const manifest = useManifest()
  const [result, setResult] = useState<SmartMatchResult | null>(null)

  const match = useCallback((query: string) => {
    if (!query.trim()) {
      setResult(null)
      return
    }

    const tokens = query.toLowerCase().split(/\s+/)

    // Score each skill
    const scored = manifest.skills.map(skill => {
      let score = 0

      for (const token of tokens) {
        // Keyword exact match
        if (skill.keywords.some(k => k.toLowerCase().includes(token) || token.includes(k.toLowerCase()))) {
          score += 10
        }
        // Name match
        if (skill.name.toLowerCase().includes(token) || skill.id.toLowerCase().includes(token)) {
          score += 8
        }
        // Description match
        if (skill.description.toLowerCase().includes(token)) {
          score += 5
        }
        // Body match (first 500 chars)
        if (skill.body.slice(0, 500).toLowerCase().includes(token)) {
          score += 2
        }
      }

      return { skill, score }
    })
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)

    // Assign ranks
    const matches: MatchResult[] = scored.map((s, i) => ({
      ...s,
      rank: i === 0 ? 'primary' : i < 3 ? 'secondary' : 'related',
    }))

    // Find matching collaboration pattern
    const collaboration = manifest.collaborations.find(collab =>
      collab.trigger.some(t => tokens.some(tok => t.toLowerCase().includes(tok) || tok.includes(t.toLowerCase())))
    ) || null

    // Generate rewritten query
    const primarySkill = matches[0]?.skill
    const secondarySkills = matches.slice(1, 3).map(m => m.skill)

    let rewrittenQuery = query
    if (primarySkill) {
      const parts = [primarySkill.name]
      if (secondarySkills.length > 0) {
        parts.push(...secondarySkills.map(s => s.id))
      }
      rewrittenQuery = `${parts.join(' + ')} 스킬을 활용하여: ${query}`
    }

    setResult({ matches: matches.slice(0, 6), collaboration, rewrittenQuery })
  }, [manifest])

  return { result, match }
}
