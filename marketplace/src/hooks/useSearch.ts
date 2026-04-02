import { useState, useMemo } from 'react'
import type { AnyItem, Skill, Agent } from '../types/manifest'
import { useManifest } from './useManifest'
import type { ItemType } from '../types/manifest'

export function useSearch() {
  const manifest = useManifest()
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState<ItemType>('skill')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let items: AnyItem[]
    switch (activeTab) {
      case 'skill': items = manifest.skills; break
      case 'agent': items = manifest.agents; break
      case 'command': items = manifest.commands; break
    }

    if (selectedCategory && activeTab === 'agent') {
      items = items.filter(i => (i as Agent).category === selectedCategory)
    }

    if (!query.trim()) return items

    const q = query.toLowerCase()
    return items.filter(item => {
      if (item.name.toLowerCase().includes(q)) return true
      if (item.description.toLowerCase().includes(q)) return true
      if (item.type === 'skill') {
        const skill = item as Skill
        if (skill.keywords.some(k => k.toLowerCase().includes(q))) return true
      }
      return false
    })
  }, [manifest, query, activeTab, selectedCategory])

  return {
    query, setQuery,
    activeTab, setActiveTab,
    selectedCategory, setSelectedCategory,
    filtered,
    categories: manifest.categories.agents,
  }
}
