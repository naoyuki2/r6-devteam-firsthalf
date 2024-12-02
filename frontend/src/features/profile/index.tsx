'use client'

import { RequestCard } from '@/component/RequestCard'
import { useCurrentUser } from '@/lib/jotai/userState'
import { Request } from '@/types'
import { Col, Row, Spinner } from 'react-bootstrap'
import { PersonCircle } from 'react-bootstrap-icons'
import { useRequest } from './hooks'
import { AppAlert } from '@/component/AppAlert'

export const ProfileClient = () => {
  const currentUser = useCurrentUser()
  const { requestList, error, isLoading } = useRequest(currentUser?.id)

  if (isLoading) return <Spinner animation="border" />
  if (error)
    return <AppAlert variant="danger" message="依頼の取得に失敗しました" />

  return (
    <>
      <Row className="mb-4">
        <Col xs={3}>
          <PersonCircle size={80} />
        </Col>
        <Col xs={9}>
          <h4 className="fw-bold">{currentUser?.name}</h4>
          <p className="text-muted">{currentUser?.email}</p>
          <div className="d-flex"></div>
        </Col>
      </Row>

      {!requestList || requestList.length === 0 ? (
        <p>依頼がありません</p>
      ) : (
        requestList.map((request: Request) => (
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
        ))
      )}
    </>
  )
}
