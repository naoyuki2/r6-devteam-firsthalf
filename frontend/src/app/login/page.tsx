'use client'

import Link from 'next/link'
import { Button, Container, Form } from 'react-bootstrap'

export default function Login() {
  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center flex-column">
      <p className="fw-bold fs-2 text-center">ログイン</p>
      <Form>
        <Form.Group controlId="email" className="mb-4">
          <Form.Label className="border-start border-info border-5 ps-2 fw-bold">
            メールアドレス
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="sample@gmail.com"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="mb-4">
          <Form.Label className="border-start border-info border-5 ps-2 fw-bold">
            パスワード
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="***********"
          ></Form.Control>
        </Form.Group>
        <Button variant="info" className="w-100">
          ログイン
        </Button>
        <Link href="#" className="link-dark d-block">
          アカウントをお持ちでない方はこちら
        </Link>
      </Form>
    </Container>
  )
}
