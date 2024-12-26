'use client'

import { useState } from 'react'
import { Nav, Spinner } from 'react-bootstrap'
import { useReviewList } from './hooks'
import { AppAlert } from '@/component/AppAlert'
import { ReviewItem } from '@/component/ReviewItem'
import { Reviews } from '@/types'

export type reviewProps = {
  userId: number
}

export function ReviewClient({ userId }: reviewProps) {
  const [isGood, setIsGood] = useState<boolean>(false)
  const { reviews, error, isLoading } = useReviewList(userId)

  if (isLoading) return <Spinner animation="border" />
  if (error)
    return <AppAlert variant="danger" message="レビューの取得に失敗しました" />
  if (!reviews || reviews.length === 0)
    return <AppAlert variant="info" message="レビューがありません。" />

  const filteredReviews = reviews.filter(
    (review: Reviews) => review.isGood === isGood
  )

  return (
    <>
      <Nav
        variant="underline"
        defaultActiveKey={isGood ? 'true' : 'false'}
        className="justify-content-center mb-3"
      >
        <Nav.Item>
          <Nav.Link
            eventKey="true"
            onClick={() => setIsGood(true)}
            active={isGood}
          >
            良かった (
            {reviews.filter((review: Reviews) => review.isGood === true).length}
            )
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="false"
            onClick={() => setIsGood(false)}
            active={!isGood}
          >
            悪かった (
            {
              reviews.filter((review: Reviews) => review.isGood === false)
                .length
            }
            )
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {filteredReviews.length > 0 ? (
        filteredReviews.map((review: Reviews) => (
          <ReviewItem key={review.id} review={review} />
        ))
      ) : (
        <AppAlert variant="info" message="該当するレビューがありません。" />
      )}
    </>
  )
}
