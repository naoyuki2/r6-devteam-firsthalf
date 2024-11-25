'use client'

import { RequestCard } from '@/component/RequestCard'
import { Container, Spinner } from 'react-bootstrap'
import { useRequestList } from './hooks'
import { AppAlert } from '@/component/AppAlert'
import { useSearchParams } from 'next/navigation'

export const HomeClient = () => {
  const searchParams = useSearchParams()
  const locationPrefecture = searchParams.get('filter[location_prefecture]')
  const { requests, error, isLoading } = useRequestList(
    `?filter[status]=pending&filter[location_prefecture]=${locationPrefecture}`
  )

  if (isLoading) return <Spinner animation="border" />
  if (error)
    return <AppAlert variant="danger" message="依頼の取得に失敗しました" />
  if (!requests?.length) return <p>依頼がありません</p>

  return (
    <Container>
      {requests.map((request) => (
        <RequestCard
          key={request.id}
          id={request.id}
          userId={request.user.id}
          username={request.user.name}
          created_at={request.created_at}
          title={request.title}
          description={request.description}
          delivery_prefecture={request.delivery_prefecture}
          location_prefecture={request.location_prefecture}
        />
      ))}
    </Container>
  )
}
