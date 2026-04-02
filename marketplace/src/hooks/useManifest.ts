import { useState, useEffect, createContext, useContext } from 'react'
import type { Manifest } from '../types/manifest'

const ManifestContext = createContext<Manifest | null>(null)

export function useManifestLoader() {
  const [manifest, setManifest] = useState<Manifest | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('./manifest.json')
      .then(r => {
        if (!r.ok) throw new Error('manifest.json을 찾을 수 없습니다')
        return r.json()
      })
      .then(setManifest)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { manifest, loading, error }
}

export const ManifestProvider = ManifestContext.Provider
export function useManifest() {
  const ctx = useContext(ManifestContext)
  if (!ctx) throw new Error('ManifestProvider가 필요합니다')
  return ctx
}
