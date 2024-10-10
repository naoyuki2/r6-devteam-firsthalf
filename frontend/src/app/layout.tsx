import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ChatDots, HouseDoor, Person, Plus } from 'react-bootstrap-icons'

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'], weight: ['400'] })

export const metadata: Metadata = {
  title: 'Hakobun',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.className} d-flex flex-column min-vh-100`}
        style={{ paddingTop: '70px' }}
      >
        <header className="bg-info px-3 py-2 fixed-top shadow">
          <Container>
            <div className="d-flex justify-content-center">
              <div
                className="rounded-circle bg-dark"
                style={{ width: '2rem', height: '2rem' }}
              ></div>
            </div>
          </Container>
        </header>
        <main className="flex-fill">{children}</main>
        <footer className="bg-light py-3 px-4">
          <Container>
            <div className="d-flex justify-content-between">
              <Col xs="auto">
                <HouseDoor
                  className="bi bi-house-door"
                  style={{ fontSize: '2rem' }}
                ></HouseDoor>
              </Col>
              <Col xs="auto">
                <ChatDots
                  className="bi bi-chat-dots"
                  style={{ fontSize: '2rem' }}
                ></ChatDots>
              </Col>
              <Col xs="auto">
                <Person
                  className="bi bi-plus"
                  style={{ fontSize: '2rem' }}
                ></Person>
              </Col>
            </div>
          </Container>
        </footer>
      </body>
    </html>
  )
}
