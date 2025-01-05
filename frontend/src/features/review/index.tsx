'use client'

import { useState } from 'react'
import { Card, Container, Nav, Spinner } from 'react-bootstrap'
import { useReviewList } from './hooks'
import { AppAlert } from '@/component/AppAlert'
import { ReviewItem } from '@/component/ReviewItem'
import { Reviews } from '@/types'
import { EmojiDizzy } from 'react-bootstrap-icons'

export type reviewProps = {
  userId: number
}

export function ReviewClient({ userId }: reviewProps) {
  const [isGood, setIsGood] = useState<boolean>(true)
  const { reviews, error, isLoading } = useReviewList(userId)

  if (isLoading) return <Spinner animation="border" />
  if (error)
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '70vh' }}
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
              エラーが発生しました
            </Card.Title>
          </Card.Body>
        </Card>
      </Container>
    )
  if (!reviews || reviews.length === 0)
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '70vh' }}
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
              レビューがありません
            </Card.Title>
          </Card.Body>
        </Card>
      </Container>
    )

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
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: '70vh' }}
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
                レビューがありません
              </Card.Title>
            </Card.Body>
          </Card>
        </Container>
      )}
    </>
  )
}
