'use client'

import React, { useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useRouter } from 'next/navigation' // Next.jsのルーターを使用してページ遷移
import { PersonCircle } from 'react-bootstrap-icons'

export default function EditProfilePage() {
  const [name, setName] = useState('山田太郎')
  const [email, setEmail] = useState('sample@gmail.com')
  const router = useRouter()

  const handleSave = () => {
    // ここで保存処理を行う。今回はローカルストレージを使用。
    const profileData = {
      name,
      email,
    }

    // ローカルストレージに保存（実際にはAPI呼び出しなどを使う）
    localStorage.setItem('profileData', JSON.stringify(profileData))

    // 保存後、プロフィールページに遷移
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
          <Form.Group controlId="formFile" className="mt-3">
            <Form.Label>アイコンを変更</Form.Label>
            <Form.Control type="file" accept="image/*" />
          </Form.Group>
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
