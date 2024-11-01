import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { PersonCircle } from 'react-bootstrap-icons'
import Link from 'next/link'
import { RequestCard } from '@/component/RequestCard'
import { apiClient } from '@/lib/axios'
import { Request } from '@/types'

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
      <Container className="mt-4">
        <Row className="mb-4">
          <Col className="text-end">
            <Link href="/edit" passHref>
              <Button variant="outline-primary" size="sm">
                編集
              </Button>
            </Link>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col xs={3}>
            <PersonCircle size={80} />
          </Col>
          <Col xs={9}>
            {/* グローバルステートから取得したユーザー名とメールアドレスを表示 */}
            <h4 className="fw-bold">{user.name}</h4>
            <p className="text-muted">{user.email}</p>
            <div className="d-flex"></div>
          </Col>
        </Row>
        {requests.map((request: Request) => (
          <RequestCard
            key={request.id}
            id={request.id}
            userId={request.user.id}
            username={request.user.name}
            created_at={new Date(request.created_at).toLocaleString()}
            title={request.title}
            delivery_prefecture={request.delivery_prefecture}
            location_prefecture={request.location_prefecture}
          />
        ))}
      </Container>
    </>
  )
}
