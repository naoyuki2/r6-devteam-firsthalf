'use client'

import { RequestCard } from '@/component/RequestCard'
import { useCurrentUser } from '@/lib/jotai/userState'
import { Request } from '@/types'
import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { PersonCircle } from 'react-bootstrap-icons'
import { useRequest } from './hooks'
import { AppAlert } from '@/component/AppAlert'
import { PencilFill } from 'react-bootstrap-icons'
import Link from 'next/link'

export const ProfileClient = () => {
  const currentUser = useCurrentUser()
  const { requestList, error, isLoading } = useRequest(currentUser?.id)

  if (isLoading) return <Spinner animation="border" />
  if (error)
    return <AppAlert variant="danger" message="依頼の取得に失敗しました" />

  return (
    <>
      <div
        style={{
          position: 'relative',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <PersonCircle
          className="d-flex justify-content-center"
          style={{}}
          size={80}
        />
        <Button
          variant="outline-primary"
          size="sm"
          style={{
            position: 'absolute',
          }}
        >
          編集
        </Button>
      </div>

      <Row className="mb-4" style={{ marginTop: '60px' }}>
        <Col xs={12} className="text-center">
          <h4 className="fw-bold">{currentUser?.name}</h4>
        </Col>
        <Col xs={12} className="text-center">
          <p className="text-muted">{currentUser?.email}</p>
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
