'use client'

import { RequestCard } from '@/component/RequestCard'
import { Container, Spinner, Card } from 'react-bootstrap'
import { useRequestList } from './hooks'
import { AppAlert } from '@/component/AppAlert'
import { useSearchParams } from 'next/navigation'
import { EmojiDizzy } from 'react-bootstrap-icons'
import { AppBadge } from '@/component/Appbadge'

export const HomeClient = () => {
  const searchParams = useSearchParams()
  const keyword = searchParams.get('filter[keyword]')
  const locationPrefecture = searchParams.get('filter[location_prefecture]')
  const deliveryPrefecture = searchParams.get('filter[delivery_prefecture]')
  const { requests, error, isLoading } = useRequestList(
    `?filter[status]=pending&filter[keyword]=${keyword}&filter[location_prefecture]=${locationPrefecture}&filter[delivery_prefecture]=${deliveryPrefecture}`
  )

  // 条件を削除する関数
  const handleRemoveCondition = (key: string) => {
    const newParams = new URLSearchParams(window.location.search)
    newParams.delete(`filter[${key}]`)
    window.location.search = newParams.toString()
  }

  if (isLoading) return <Spinner animation="border" />
  if (error)
    return <AppAlert variant="danger" message="依頼の取得に失敗しました" />
  if (!requests?.length)
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
      >
        <Card
          className="text-center shadow-sm"
          style={{ width: '100%', maxWidth: '400px' }}
        >
          <Card.Body>
            <EmojiDizzy
              className="text-primary mb-3"
              style={{ fontSize: '4rem' }}
            />
            <Card.Title className="text-primary fs-4">
              依頼がありません
            </Card.Title>
            <Card.Text className="text-muted">
              依頼を投稿してみましょう！
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    )

  return (
    <Container style={{ marginTop: '15px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '20px',
        }}
      >
        <strong>{requests?.length || 0}件</strong>

        {locationPrefecture && (
          <AppBadge
            text={`入手場所: ${locationPrefecture}`}
            showCloseButton={true}
            onClose={() => handleRemoveCondition('location_prefecture')}
          />
        )}
        {deliveryPrefecture && (
          <AppBadge
            text={`受け渡し場所: ${deliveryPrefecture}`}
            showCloseButton={true}
            onClose={() => handleRemoveCondition('delivery_prefecture')}
          />
        )}
      </div>

      {requests.map((request) => (
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
          userId={request.user.id}
        />
      ))}
    </Container>
  )
}
