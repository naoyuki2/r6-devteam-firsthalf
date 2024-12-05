'use client'

import { useRouter } from 'next/navigation'
import { apiClient } from '@/lib/axios'
import { CreateRoomArgs, Request } from '@/types'
import { useCurrentUser } from '@/lib/jotai/userState'
import { getItem } from '@/utils/localStorage'
import { AppButton } from '@/component/AppButton'

type RequestDetailClientProps = {
  request: Request
}

export default function RequestDetailClient({
  request,
}: RequestDetailClientProps) {
  const router = useRouter()
  const currentUser = useCurrentUser()
  const isRequestUser = request.user.id == currentUser?.id

  const requestCreateRoom = async () => {
    try {
      const token = getItem('token')
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
      await apiClient.post(`/draft_requests/${roomId}`)
      router.push(`/chat/${roomId}`)
    } catch (e) {
      console.error(e)
    }
  }

  const requestEdit = () => {
    router.push(`/request/${request.id}/edit`)
  }

  // ログイン状態確認
  const isLoggedIn = !!getItem('token')

  return (
    <>
      {!isRequestUser && (
        <AppButton
          className="btn btn-info text-white"
          type="button"
          onClick={requestCreateRoom}
          text={
            isLoggedIn ? 'チャットする' : 'チャットするためにログインしよう'
          }
        ></AppButton>
      )}
      {isRequestUser && (
        <AppButton
          className="btn btn-info text-white"
          type="button"
          onClick={requestEdit}
          text="依頼を修正"
        ></AppButton>
      )}
    </>
  )
}
