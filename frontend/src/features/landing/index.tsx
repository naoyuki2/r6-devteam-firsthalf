'use client'

import { useRouter } from 'next/navigation'
import { Button, Row, Col, Card } from 'react-bootstrap'
import {
  ArrowRight,
  GeoAlt,
  Cart,
  TrainLightrailFront,
} from 'react-bootstrap-icons'
import Image from 'next/image'

export const LandingClient = () => {
  const router = useRouter()

  const handleLoginClick = () => {
    router.push('/login')
  }

  const handleSignupClick = () => {
    router.push('/home')
  }

  return (
    <>
      <header className="py-4">
        <nav className="d-flex justify-content-between align-items-center">
          <Image src="/logo.png" alt="Hakobun Logo" width={80} height={80} />
          <Button
            variant="info"
            className="text-white"
            onClick={handleLoginClick}
          >
            ログイン
          </Button>
        </nav>
      </header>

      <main className="py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-primary mb-3">
            Hakobun で簡単にお土産を代行してもらおう
          </h1>
          <p className="lead text-secondary mb-4">旅行のお土産で誰かの助けに</p>
          <Button
            variant="info"
            size="lg"
            className="text-white px-4 py-2"
            onClick={handleSignupClick}
          >
            使ってみる <ArrowRight />
          </Button>
        </div>

        <Row className="row-cols-1 row-cols-md-3 g-4 mb-5">
          <Col>
            <Card className="h-100 shadow-sm border-0 bg-white">
              <Card.Body>
                <GeoAlt size={24} />
                <Card.Title className="h5 fw-bold">魅力をかく①</Card.Title>
                <Card.Text className="text-secondary">
                  ○○○○○○○○○○○○○○○○○○します。
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="h-100 shadow-sm border-0 bg-white">
              <Card.Body>
                <Cart size={24} />
                <Card.Title className="h5 fw-bold">魅力をかく②</Card.Title>
                <Card.Text className="text-secondary">
                  ○○○○○○○○○○○○○○○○○○します。
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="h-100 shadow-sm border-0 bg-white">
              <Card.Body>
                <TrainLightrailFront size={24} />
                <Card.Title className="h5 fw-bold">魅力をかく③</Card.Title>
                <Card.Text className="text-secondary">
                  ○○○○○○○○○○○○○○○○○○します。
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="shadow-sm border-0 bg-white mb-5">
          <Card.Body>
            <h2 className="card-title text-center h3 fw-bold mb-4">
              お客様の声
            </h2>
            <Row>
              <Col md={6} className="mb-3 mb-md-0">
                <div className="border-start border-info border-4 ps-3">
                  <p className="fst-italic mb-2">
                    「Hakobunのおかげで、とても便利です！」
                  </p>
                  <p className="text-secondary">- 田中さん、東京</p>
                </div>
              </Col>
              <Col md={6}>
                <div className="border-start border-info border-4 ps-3">
                  <p className="fst-italic mb-2">「良いサービスでした。」</p>
                  <p className="text-secondary">- 阿部さん、大阪</p>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </main>

      <footer
        className="bg-dark text-white py-4 mt-5"
        style={{ width: '100%', position: 'absolute', left: 0 }}
      >
        <div style={{ textAlign: 'center' }}>
          <p className="mb-0">&copy; 2024 Hakobun. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
