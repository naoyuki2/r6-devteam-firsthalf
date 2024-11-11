import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Link from 'next/link'
import { ProfileClient } from '@/features/profile'

export default async function ProfilePage() {
  return (
    <>
      <Container className="mt-4">
        <Row className="mb-4">
          <Col className="text-end">
            <Link href="/profile/edit" passHref>
              <Button variant="outline-primary" size="sm">
                編集
              </Button>
            </Link>
          </Col>
        </Row>
        <ProfileClient />
      </Container>
    </>
  )
}
