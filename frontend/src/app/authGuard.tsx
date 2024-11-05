'use client'

import { useEffect, useCallback, useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { useSetCurrentUser } from '@/lib/jotai/userState'
import { apiClient } from '@/lib/axios'
import { getItem } from '@/utils/localStorage'

export default function AuthGuard({ children }: { children: ReactNode }) {
  const setCurrentUser = useSetCurrentUser()
  const pathname = usePathname()
  const router = useRouter()

  const authPass = useMemo(() => {
    const basePaths = ['/request', '/profile', '/chat', '/room']
    const roomPathPattern = /^\/room\/[a-zA-Z0-9-]+$/ // 正規表現でパスチェック
    if (roomPathPattern.test(pathname)) {
      return [...basePaths, pathname]
    }
    return basePaths
  }, [pathname])

  const checkUser = useCallback(async () => {
    const token = getItem('token')
    if (!token) {
      router.push('/login')
      return
    }
    try {
      const res = await apiClient.get('/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!res.data.user) router.push('/login')
      setCurrentUser(res.data.user)
    } catch (error) {
      console.error('Failed to fetch user account:', error)
      router.push('/login')
    }
  }, [router, setCurrentUser])

  useEffect(() => {
    if (!authPass.includes(pathname)) return
    checkUser()
  }, [authPass, pathname, checkUser])

  return <>{children}</>
}
