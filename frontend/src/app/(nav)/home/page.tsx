import { AppLink } from '@/component/AppLink'
import Link from 'next/link'
import { Container } from 'react-bootstrap'
import { HouseDoor, PersonCircle, Shop } from 'react-bootstrap-icons'

export default async function Home() {
  return (
    <Container>
      <AppLink href="#">
        <div className="border-bottom border-opacity-25">
          <div className="d-flex">
            <PersonCircle size={36} className="me-3 mt-2" />
            <span className="fw-bold my-2 mt-2">平山海翔</span>
            <span className="ms-auto my-2 mt-2">2024/10/09 10:38</span>
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
      </AppLink>
    </Container>
  )
}
