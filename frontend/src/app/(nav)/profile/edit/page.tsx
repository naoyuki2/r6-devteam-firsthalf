'use client'

import React, { useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import { PersonCircle } from 'react-bootstrap-icons'
import { useCurrentUser } from '@/lib/jotai/userState'

export default function EditProfilePage() {
  const currentUser = useCurrentUser()
  const [name, setName] = useState(currentUser?.name)
  const [email, setEmail] = useState(currentUser?.email)
  const router = useRouter()

  const handleSave = () => {
    const profileData = {
      name,
      email,
    }

    localStorage.setItem('profileData', JSON.stringify(profileData))

    router.push('/profile')
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col className="text-start">
          <Button variant="outline-primary" size="sm" onClick={handleCancel}>
            キャンセル
          </Button>
        </Col>
        <Col className="text-end">
          <Button variant="outline-primary" size="sm" onClick={handleSave}>
            保存
          </Button>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xs={3}>
          <PersonCircle size={80} />
        </Col>
        <Col xs={9}>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>名前</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>メールアドレス</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  )
}
