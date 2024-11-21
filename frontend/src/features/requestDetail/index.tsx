'use client'

import { useRouter } from 'next/navigation'
import { apiClient } from '@/lib/axios'
import { CreateRoomArgs, Request } from '@/types'
import { useCurrentUser } from '@/lib/jotai/userState'
import { getItem } from '@/utils/localStorage'

type RequestDetailClientProps = {
  request: Request
}

export default function RequestDetailClient({
  request,
}: RequestDetailClientProps) {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const isChatShow = request.user.id == currentUser?.id

  const requestCreateRoom = async () => {
    const token = getItem('token') // getItem 関数で token を取得
    if (!token) {
      router.push('/login')
      return
    }

    const args: CreateRoomArgs = {
      requestId: request.id,
    }

    const res = await apiClient.post('/rooms', args, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (res == null) return
    const roomId = res.data.room.id
    router.push(`/chat/${roomId}`)
  }

  const navigateToEdit = () => {
    router.push(`/request/${request.id}/edit`)
  }

  // ログイン状態確認
  const isLoggedIn = !!getItem('token')

  return (
    <div>
      {/* チャットボタン */}
      {!isChatShow && (
        <button
          className="btn btn-info"
          type="button"
          onClick={requestCreateRoom}
        >
          {isLoggedIn ? 'チャットする' : 'チャットするためにログインしよう'}
        </button>
      )}

      {/* 依頼修正ボタン（投稿者の場合のみ表示） */}
      {isChatShow && (
        <button className="btn btn-info" type="button" onClick={navigateToEdit}>
          依頼を修正
        </button>
      )}
    </div>
  )
}
