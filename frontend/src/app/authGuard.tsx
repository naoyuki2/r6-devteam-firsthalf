'use client'

import { useEffect, useCallback, useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { useSetCurrentUser } from '@/lib/jotai/userState'
import { apiClient } from '@/lib/axios'
import { getItem } from '@/utils/localStorage'

export default function AuthGuard({ children }: { children: ReactNode }) {
  const authPass = useMemo(() => ['/request', '/profile', '/room', '/chat'], [])
  const setCurrentUser = useSetCurrentUser()
  const pathname = usePathname()
  const router = useRouter()

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
