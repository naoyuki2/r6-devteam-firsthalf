'use client'

import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { useCurrentUserState } from '@/lib/jotai/userState'
import { apiClient } from '@/lib/axios'

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { currentUser, setCurrentUser } = useCurrentUserState()
  const router = useRouter()

  const checkUser = useCallback(async () => {
    try {
      const res = await apiClient.get('/user')
      const { user } = res.data
      if (user) {
        setCurrentUser(user)
      } else {
        router.push('/login')
      }
    } catch (error) {
      console.error('Failed to fetch user account:', error)
      router.push('/')
    }
  }, [setCurrentUser, router])

  useEffect(() => {
    if (!currentUser) {
      checkUser()
    }
  }, [checkUser, currentUser])

  return <>{children}</>
}
