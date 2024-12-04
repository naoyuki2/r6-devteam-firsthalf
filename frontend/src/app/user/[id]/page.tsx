import { RequestCard } from '@/component/RequestCard'
import TopNav from '@/component/TopNav'
import { apiClient } from '@/lib/axios'
import { Request } from '@/types'
import { Col, Container, Row } from 'react-bootstrap'
import { PersonCircle } from 'react-bootstrap-icons'

export default async function ProfilePage({
  params,
}: {
  params: { id: string }
}) {
  const resUser = await apiClient.get(`/users/${params.id}`)
  const { user } = resUser.data
  const resReq = await apiClient.get(`/requests?filter[userId]=${user.id}`)
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
            username={request.user.name}
            created_at={request.created_at}
            title={request.title}
            description={request.description}
            delivery_prefecture={request.delivery_prefecture}
            location_prefecture={request.location_prefecture}
            color={request.color}
          />
        ))}
      </Container>
    </>
  )
}
