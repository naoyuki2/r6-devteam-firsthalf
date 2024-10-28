import { RequestCard } from '@/component/RequestCard'
import TopNav from '@/component/TopNav'
import { apiClient } from '@/lib/axios'
import { Col, Container, Row } from 'react-bootstrap'
import { PersonCircle } from 'react-bootstrap-icons'

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

export default async function ProfilePage({
  params,
}: {
  params: { id: string }
}) {
  const resUser = await apiClient.get(`/user/${params.id}`)
  const { user } = resUser.data
  const resReq = await apiClient.get(`/requests?userId=${user.id}`)
  const { requests } = resReq.data
  return (
    <>
      <TopNav />
      <Container className="mt-4">
        <Row className="mb-4">
          <Col xs={3}>
            <PersonCircle size={80} />
          </Col>
          <Col xs={9}>
            <h4 className="fw-bold">{user.name}</h4>
          </Col>
        </Row>
        {requests.map((request: Request) => (
          <RequestCard
            key={request.id}
            id={request.id}
            userId={request.user.id}
            username={request.user.name}
            title={request.title}
            delivery_prefecture={request.delivery_prefecture}
            location_prefecture={request.location_prefecture}
          />
        ))}
      </Container>
    </>
  )
}
