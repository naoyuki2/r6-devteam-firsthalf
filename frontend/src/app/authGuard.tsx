'use client'

import { ReactNode, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { User, useSetCurrentUser } from '@/lib/jotai/userState'
import { fetcher, fetchWithToken } from '@/lib/axios'
import useSWR from 'swr'
import { AppAlert } from '@/component/AppAlert'
import { Spinner } from 'react-bootstrap'

const isAuthorizedPath = (pathname: string): boolean => {
  const basePaths = ['/request', '/profile', '/chat', '/room']
  const roomPathPattern = /^\/chat\/[a-zA-Z0-9-]+$/
  if (roomPathPattern.test(pathname)) {
    return true
  }
  return basePaths.includes(pathname)
}

const useUser = (): {
  user: User | null
  error: Error | null
  isLoading: boolean
} => {
  const { data, error, isLoading } = useSWR('/users', fetcher)
  return {
    user: data?.data.user ?? null,
    error,
    isLoading,
  }
}

export default function AuthGuard({ children }: { children: ReactNode }) {
  const setCurrentUser = useSetCurrentUser()
  const pathname = usePathname()
  const router = useRouter()

  const { user, error, isLoading } = useUser()

  useEffect(() => {
    if (user) setCurrentUser(user)
  }, [user, setCurrentUser])

  if (isLoading) return <Spinner animation="border" />
  if (!isAuthorizedPath(pathname)) return <>{children}</>
  if (!user) {
    router.push('/login')
    return null
  }
  if (error)
    return (
      <AppAlert variant="danger" message="ユーザー情報の取得に失敗しました" />
    )

  return <>{children}</>
}
