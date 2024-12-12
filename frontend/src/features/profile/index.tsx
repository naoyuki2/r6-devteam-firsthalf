'use client'

import { RequestCard } from '@/component/RequestCard'
import { useCurrentUser } from '@/lib/jotai/userState'
import { Request } from '@/types'
import { Spinner } from 'react-bootstrap'
import { PencilFill, PersonCircle } from 'react-bootstrap-icons'
import { useRequest } from './hooks'
import { AppAlert } from '@/component/AppAlert'
import Link from 'next/link'

export const ProfileClient = () => {
  const currentUser = useCurrentUser()
  const { requestList, error, isLoading } = useRequest(currentUser?.id)

  if (isLoading) return <Spinner animation="border" />
  if (error)
    return <AppAlert variant="danger" message="依頼の取得に失敗しました" />

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div
          className="mb-3"
          style={{
            position: 'relative',
          }}
        >
          <PersonCircle size={80} />
          <Link
            href={'/profile/edit'}
            className="rounded-circle bg-white border border-info"
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              transform: 'translate(20%, 20%)',
              width: 36,
              height: 36,
            }}
          >
            <PencilFill
              size={24}
              className={'text-info'}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                transform: 'translate(-20%, 20%)',
              }}
            />
          </Link>
        </div>
        <p className="fw-bold text-center">{currentUser?.name}</p>
        <p className="text-muted text-center">{currentUser?.email}</p>
      </div>
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
