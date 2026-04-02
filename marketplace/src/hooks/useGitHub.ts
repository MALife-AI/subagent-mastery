import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'gh_token'
const REPO_OWNER = 'MALife-AI'
const REPO_NAME = 'subagent-mastery'
const API = 'https://api.github.com'

interface GitHubUser {
  login: string
  avatar_url: string
  name: string | null
}

interface CommitResult {
  success: boolean
  message: string
  url?: string
}

export function useGitHub() {
  const [token, setTokenState] = useState<string | null>(null)
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [loading, setLoading] = useState(false)

  // 초기 로드: localStorage에서 토큰 복원
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setTokenState(saved)
      fetchUser(saved)
    }
  }, [])

  async function fetchUser(t: string) {
    try {
      const res = await fetch(`${API}/user`, {
        headers: { Authorization: `Bearer ${t}`, Accept: 'application/vnd.github+json' },
      })
      if (!res.ok) throw new Error('인증 실패')
      const data = await res.json()
      setUser(data)
    } catch {
      // 토큰이 유효하지 않으면 제거
      localStorage.removeItem(STORAGE_KEY)
      setTokenState(null)
      setUser(null)
    }
  }

  const login = useCallback(async (t: string) => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/user`, {
        headers: { Authorization: `Bearer ${t}`, Accept: 'application/vnd.github+json' },
      })
      if (!res.ok) throw new Error('토큰이 유효하지 않습니다')
      const data = await res.json()

      // 레포 접근 권한 확인
      const repoRes = await fetch(`${API}/repos/${REPO_OWNER}/${REPO_NAME}`, {
        headers: { Authorization: `Bearer ${t}`, Accept: 'application/vnd.github+json' },
      })
      if (!repoRes.ok) throw new Error(`${REPO_OWNER}/${REPO_NAME} 레포에 접근할 수 없습니다`)

      localStorage.setItem(STORAGE_KEY, t)
      setTokenState(t)
      setUser(data)
      return { success: true, message: `${data.login}으로 로그인되었습니다` }
    } catch (e: any) {
      return { success: false, message: e.message }
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setTokenState(null)
    setUser(null)
  }, [])

  // 파일이 이미 존재하는지 확인 (업데이트 시 sha 필요)
  async function getFileSha(path: string): Promise<string | null> {
    if (!token) return null
    try {
      const res = await fetch(`${API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`, {
        headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' },
      })
      if (!res.ok) return null
      const data = await res.json()
      return data.sha
    } catch {
      return null
    }
  }

  const commitSkill = useCallback(async (
    skillId: string,
    skillMdContent: string,
    commitMessage: string,
  ): Promise<CommitResult> => {
    if (!token) return { success: false, message: 'GitHub 로그인이 필요합니다' }
    if (!skillId) return { success: false, message: '스킬 ID를 입력해주세요' }

    setLoading(true)
    try {
      const path = `skills/${skillId}/SKILL.md`
      const sha = await getFileSha(path)
      const content = btoa(unescape(encodeURIComponent(skillMdContent)))

      const body: Record<string, string> = {
        message: commitMessage,
        content,
        branch: 'main',
      }
      if (sha) body.sha = sha

      const res = await fetch(`${API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || '커밋에 실패했습니다')
      }

      const data = await res.json()
      return {
        success: true,
        message: sha ? '스킬이 업데이트되었습니다' : '새 스킬이 생성되었습니다',
        url: data.content?.html_url,
      }
    } catch (e: any) {
      return { success: false, message: e.message }
    } finally {
      setLoading(false)
    }
  }, [token])

  return {
    isLoggedIn: !!token && !!user,
    user,
    loading,
    login,
    logout,
    commitSkill,
    repoOwner: REPO_OWNER,
    repoName: REPO_NAME,
  }
}
