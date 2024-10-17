'use client'

import { useRouter } from 'next/navigation'

// ロジック
export const LandingClient = () => {
  const router = useRouter()

  // ログインボタン
  const handleLoginClick = () => {
    router.push('/login')
  }

  // 使ってみるボタン
  const handleSignupClick = () => {
    router.push('/signup')
  }

  return {
    handleLoginClick,
    handleSignupClick,
  }
}
