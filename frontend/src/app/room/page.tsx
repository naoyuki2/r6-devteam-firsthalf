'use client'

import Link from 'next/link'
import { Button, Container, Form } from 'react-bootstrap'
import { People, PersonCircle, BorderStyle } from 'react-bootstrap-icons'

export default function Room() {
  return (
    <Form>
      <Container>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <PersonCircle size={48} className="mb-4" />
            <div>
              <p className="mb-0">AAA</p>
              <p className="mb-2">ありがとうございます。</p>
            </div>
          </div>
          <div>
            <p></p>
            <p>14:25</p>
          </div>
        </div>
      </Container>
      <Container>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <PersonCircle size={48} className="mb-4" />
            <div>
              <p className="mb-0">BBB</p>
              <p className="mb-2">ありがとうございます。</p>
            </div>
          </div>
          <div>
            <p></p>
            <p>14:25</p>
          </div>
        </div>
      </Container>
      <Container>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <PersonCircle size={48} className="mb-4" />
            <div>
              <p className="mb-0">CCC</p>
              <p className="mb-2">ありがとうございます。</p>
            </div>
          </div>
          <div>
            <p></p>
            <p>14:25</p>
          </div>
        </div>
      </Container>
    </Form>
  )
}
