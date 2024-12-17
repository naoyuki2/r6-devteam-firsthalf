import { RequestCard } from '@/component/RequestCard'
import TopNav from '@/component/TopNav'
import { apiClient } from '@/lib/axios'
import { Request } from '@/types'
import { Col, Container, Row } from 'react-bootstrap'
import { PersonCircle } from 'react-bootstrap-icons'
import ProgressBar from 'react-bootstrap/ProgressBar'
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
      <TopNav isArrowShow={true} text="ユーザー情報" />
      <Container className="mt-4">
        <Row className="mb-4 align-items-center">
          <Col xs="auto">
            <PersonCircle
              className="d-flex flex-column justify-content-center"
              size={80}
            />
          </Col>
          <Col>
            <h4 className="fw-bold mb-1">{user.name}</h4> {/* ユーザー名 */}
            <div className="d-flex align-items-center mb-1">
              <h2 className="mb-0" style={{ marginRight: '2rem' }}>
                評価 <span className="fw-bold">4.0</span> {/* 評価と4.0 */}
              </h2>
              <a
                href="/some-link"
                className="text-primary text-decoration-underline"
              >
                評価一覧を見る
              </a>{' '}
              {/* リンク */}
            </div>
            <ProgressBar
              variant="warning"
              now={60}
              style={{ height: '10px', maxWidth: '300px' }}
            />
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
