'use client'

import { useRouter } from 'next/navigation'
import { apiClient } from '@/lib/axios'
import { CreateRoomArgs, Request } from '@/types'
import { getItem } from '@/utils/localStorage' // getItem を追加

type RequestDetailClientProps = {
  request: Request
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

    const args: CreateRoomArgs = {
      requestId: request.id,
      requestUserId: request.user.id,
    }

    const res = await apiClient.post('/rooms', args, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (res == null) return
    const roomId = res.data.createRoomId
    router.push(`/room?roomId=${roomId}`)
  }

  // ログイン状態確認
  const isLoggedIn = !!getItem('token')

  return (
    <button className="btn btn-info" type="button" onClick={requestCreateRoom}>
      {isLoggedIn ? 'チャットする' : 'チャットするためにログインしよう'}
    </button>
  )
}
