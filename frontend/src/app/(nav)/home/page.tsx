import { AppAlert } from '@/component/AppAlert'
import { RequestCard } from '@/component/RequestCard'
import { apiClient } from '@/lib/axios'
import { Request } from '@/types'
import { Container } from 'react-bootstrap'

export default async function Home() {
  try {
    const res = await apiClient.get('/requests?filter[status]=pending')
    const { requests } = res.data

    return (
      <Container>
        {requests.map((request: Request) => (
          <RequestCard
            key={request.id}
            id={request.id}
            userId={request.user.id}
            username={request.user.name}
            created_at={request.created_at}
            title={request.title}
            delivery_prefecture={request.delivery_prefecture}
            location_prefecture={request.location_prefecture}
          />
        ))}
      </Container>
    )
  } catch (error) {
    console.log(error)
    return (
      <AppAlert
        variant="danger"
        title="エラー"
        message="リクエストの取得に失敗しました"
      />
    )
  }
}
