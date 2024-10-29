'use client'

import { useRouter } from 'next/navigation'
import { apiClient } from '@/lib/axios'
import { getItem } from '@/utils/localStorage' // getItem を追加

type RequestDetailClientProps = {
  request: any
}

export default function RequestDetailClient({
  request,
}: RequestDetailClientProps) {
  const router = useRouter()

  const requestCreateRoom = async () => {
    const token = getItem('token') // getItem 関数で token を取得
    if (!token) {
      router.push('/login')
      return
    }

    const args: any = {
      requestId: request.id,
      requestUserId: request.user.id,
    }

    const res = await apiClient.post('/rooms', args, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    router.push('/chat')
  }

  // ログイン状態確認
  const isLoggedIn = !!getItem('token')

  return (
    <button className="btn btn-info" type="button" onClick={requestCreateRoom}>
      {isLoggedIn ? 'チャットする' : 'チャットするためにログインしよう'}
    </button>
  )
}
