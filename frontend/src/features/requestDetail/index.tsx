'use client'

import { useRouter } from 'next/navigation'
import { apiClient } from '@/lib/axios'
import { CreateRoomArgs, Request } from '@/types'

type RequestDetailClientProps = {
  request: Request
}

export default function RequestDetailClient({
  request,
}: RequestDetailClientProps) {
  const router = useRouter()

  const requestCreateRoom = async () => {
    const args: CreateRoomArgs = {
      requestId: request.id,
      requestUserId: request.user.id,
    }

    const token = localStorage.getItem('token')
    if (!token) {
      console.error('Token is missing')
      return
    }

    const res = await apiClient.post('/rooms', args, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (res == null) return
    router.push('/chat')
  }

  return (
    <button className="btn btn-info" type="button" onClick={requestCreateRoom}>
      チャットする
    </button>
  )
}
