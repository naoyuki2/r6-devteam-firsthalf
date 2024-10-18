'use client'

import React, { useState, useRef } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import { PersonCircle } from 'react-bootstrap-icons'

export default function EditProfilePage() {
  const [name, setName] = useState('山田太郎')
  const [email, setEmail] = useState('sample@gmail.com')
  const [icon, setIcon] = useState<File | null>(null)
  const [iconPreview, setIconPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIcon(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setIconPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    // 保存処理（例: APIへの送信）
    const profileData = {
      name,
      email,
      icon: iconPreview, // アイコンはプレビュー画像を保存
    }

    // ローカルストレージに保存（実際にはAPI呼び出しなどを使う）
    localStorage.setItem('profileData', JSON.stringify(profileData))

    // 保存後、プロフィールページに遷移
    router.push('/profile')
  }

  const handleCancel = () => {
    router.push('/profile')
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <Container className="mt-4">
      {/* キャンセルと保存ボタン */}
      <Row className="mb-4">
        <Col className="text-start">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleCancel}
            style={{ fontSize: '1.1rem', fontWeight: 'bold' }}
          >
            キャンセル
          </Button>
        </Col>
        <Col className="text-end">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleSave}
            style={{ fontSize: '1.1rem', fontWeight: 'bold' }}
          >
            保存
          </Button>
        </Col>
      </Row>

      {/* プロフィール編集フォーム */}
      <Row className="mb-4">
        <Col xs={3}>
          {iconPreview ? (
            <img
              src={iconPreview}
              alt="アイコンプレビュー"
              className="rounded-circle"
              style={{ width: 80, height: 80, objectFit: 'cover' }}
            />
          ) : (
            <PersonCircle size={80} />
          )}
          <Button
            variant="outline-secondary"
            className="mt-3"
            onClick={triggerFileInput}
            style={{ fontSize: '1.1rem', fontWeight: 'bold' }}
          >
            アイコンを変更
          </Button>
          <Form.Group
            controlId="formFile"
            className="mt-3"
            style={{ display: 'none' }}
          >
            <Form.Control
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleIconChange}
            />
          </Form.Group>
        </Col>
        <Col xs={9}>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              名前
            </Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ fontSize: '1.1rem', fontWeight: 'bold' }}
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              メールアドレス
            </Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ fontSize: '1.1rem', fontWeight: 'bold' }}
            />
          </Form.Group>
        </Col>
      </Row>
    </Container>
  )
}
