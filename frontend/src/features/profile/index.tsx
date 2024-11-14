'use client'

import { RequestCard } from '@/component/RequestCard'
import { apiClient } from '@/lib/axios'
import { useCurrentUser } from '@/lib/jotai/userState'
import { Request } from '@/types'
import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { PersonCircle } from 'react-bootstrap-icons'

export const ProfileClient = () => {
  const currentUser = useCurrentUser()
  const [requestList, setRequestList] = useState<Request[]>([])

  const fetchRequestByUserId = async () => {
    try {
      const res = await apiClient.get(`/requests?userId=${currentUser?.id}`)
      setRequestList(res.data.requests)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (currentUser?.id) fetchRequestByUserId()
  }, [currentUser?.id])

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
      {requestList.map((request: Request) => (
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
    </>
  )
}
