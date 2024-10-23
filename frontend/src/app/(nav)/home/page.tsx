import { AppAlert } from '@/component/AppAlert'
import { AppLink } from '@/component/AppLink'
import { RequestCard } from '@/component/RequestCard'
import { apiClient } from '@/lib/axios'
import { Container } from 'react-bootstrap'
import { HouseDoor, PersonCircle, Shop } from 'react-bootstrap-icons'

type Request = {
  id: number
  title: string
  location_prefecture: string
  location_details: string
  delivery_prefecture: string
  delivery_details: string
  description: string
  status: string
  completed_at: Date
  created_at: Date
  updated_at: Date
  user: {
    id: number
    name: string
    email: string
    icon_image_url: string
  }
  items: {
    id: number
    name: string
    quantity: number
    price: number
  }[]
}

export default async function Home() {
  try {
    const res = await apiClient.get('/requests')
    const { requests } = res.data

    return (
      <Container>
        {requests.map((request: Request) => (
          <RequestCard
            key={request.id}
            id={request.id}
            username={request.user.name}
            title={request.title}
            delivery_prefecture={request.delivery_prefecture}
            location_prefecture={request.location_prefecture}
          />
        ))}
      </Container>
    )
  } catch (error) {
    return (
      <AppAlert
        variant="danger"
        title="エラー"
        message="リクエストの取得に失敗しました"
      />
    )
  }
}
