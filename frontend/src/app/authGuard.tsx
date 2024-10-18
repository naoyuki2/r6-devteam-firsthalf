'use client'

import { useEffect, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { useCurrentUserState } from '@/lib/jotai/userState'
import { apiClient } from '@/lib/axios'
import { getItem } from '@/utils/localStorage'

export default function AuthGuard({ children }: { children: ReactNode }) {
  const authPass = ['/request', '/profile', '/room', '/chat']
  const { currentUser, setCurrentUser } = useCurrentUserState()
  const pathname = usePathname()
  const router = useRouter()

  const checkUser = useCallback(async () => {
    const token = getItem('token')
    try {
      const res = await apiClient.get('/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const { user } = res.data
      if (user) {
        setCurrentUser(user)
      } else {
        router.push('/login')
      }
    } catch (error) {
      console.error('Failed to fetch user account:', error)
      router.push('/login')
    }
  }, [setCurrentUser, router])

  useEffect(() => {
    if (authPass.includes(pathname)) {
      checkUser()
    }
  }, [])

  return <>{children}</>
}
