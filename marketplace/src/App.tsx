import { HashRouter, Routes, Route } from 'react-router-dom'
import { useManifestLoader, ManifestProvider } from './hooks/useManifest'
import { Header } from './components/layout/Header'
import { CatalogPage } from './components/catalog/CatalogPage'
import { DetailPage } from './components/detail/DetailPage'
import { SmartSkillPage } from './components/smart-skill/SmartSkillPage'
import { SkillCreatorPage } from './components/creator/SkillCreatorPage'

function AppContent() {
  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <Header />
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/detail/:type/:id" element={<DetailPage />} />
        <Route path="/smart-skill" element={<SmartSkillPage />} />
        <Route path="/create" element={<SkillCreatorPage />} />
      </Routes>
      <footer className="text-center py-8 text-xs text-gray-400">
        Subagent Mastery · AI혁신팀 Skill Marketplace
      </footer>
    </div>
  )
}

export default function App() {
  const { manifest, loading, error } = useManifestLoader()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fb]">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-sm text-gray-400">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (error || !manifest) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fb]">
        <div className="text-center">
          <p className="text-4xl mb-4">⚠️</p>
          <p className="text-sm text-gray-500">{error || 'manifest.json을 불러올 수 없습니다'}</p>
          <p className="text-xs text-gray-400 mt-2">npm run generate 를 먼저 실행해주세요</p>
        </div>
      </div>
    )
  }

  return (
    <ManifestProvider value={manifest}>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </ManifestProvider>
  )
}
