'use client'

import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { PersonCircle, HouseDoor, Shop } from 'react-bootstrap-icons'
import Link from 'next/link'
import Image from 'next/image' // next/imageをインポート
import { useCurrentUser } from '@/lib/jotai/userState' // グローバルステートからユーザー情報を取得

export default function ProfilePage() {
  const currentUser = useCurrentUser() // 現在のユーザー情報を取得

  // const icon = <SomeIconComponent />; // 未使用のicon変数をコメントアウト

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col className="text-end">
          <Link href="/edit" passHref>
            <Button variant="outline-primary" size="sm">
              編集
            </Button>
          </Link>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col xs={3}>
          <PersonCircle size={80} />
        </Col>
        <Col xs={9}>
          {/* グローバルステートから取得したユーザー名とメールアドレスを表示 */}
          <h4 className="fw-bold">{currentUser?.name ?? 'ゲスト'}</h4>
          <p className="text-muted">
            {currentUser?.email ?? 'example@example.com'}
          </p>
          <div className="d-flex"></div>
        </Col>
      </Row>

      <Row className="border-top pt-3">
        <Col>
          <div className="d-flex">
            <PersonCircle size={40} className="me-3" />
            <div>
              <div className="d-flex">
                <p className="fw-bold me-2 mb-0">山田太郎</p>
                <p className="text-muted mb-0">2024/10/09 10:38</p>
              </div>
              <p className="fw-bold text-truncate mb-2">
                東京ドームのフェス限定のグッズが欲しい！
              </p>
              <div className="d-flex justify-content-evenly">
                <div className="d-flex align-items-center">
                  <div>
                    <HouseDoor size={24} className="ms-2" />
                    <p className="mb-2">HOME</p>
                  </div>
                  <span className="ms-3">福岡市</span>
                </div>
                <div className="d-flex align-items-center">
                  <div>
                    <Shop size={24} className="ms-2" />
                    <p className="mb-2">SHOP</p>
                  </div>
                  <span className="ms-3">東京都</span>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
