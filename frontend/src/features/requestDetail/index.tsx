'use client'

import { useRouter } from 'next/navigation'
import { apiClient } from '@/lib/axios'

type RequestDetailClientProps = {
  request: any
}

export default function RequestDetailClient({
  request,
}: RequestDetailClientProps) {
  const router = useRouter()

  const requestCreateRoom = async () => {
    const args: any = {
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

    router.push('/chat')
  }

  return (
    <button className="btn btn-info" type="button" onClick={requestCreateRoom}>
      チャットする
    </button>
  )
}
