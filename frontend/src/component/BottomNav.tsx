import {
  ChatDots,
  HouseDoor,
  Person,
  PlusCircleFill,
} from 'react-bootstrap-icons'
import { AppLink } from './AppLink'

export default function BottomNav() {
  const items = [
    { icon: <HouseDoor style={{ fontSize: '2rem' }} />, href: '/' },
    { icon: <ChatDots style={{ fontSize: '2rem' }} />, href: '/chat' },
    { icon: <Person style={{ fontSize: '2rem' }} />, href: '/profile' },
  ]

  return (
    <div className="d-flex flex-column">
      <div style={{ flex: 1, paddingBottom: '80px' }}>
        <AppLink href="/request">
          <PlusCircleFill
            className="position-fixed"
            style={{
              fontSize: '3rem',
              right: '16px',
              bottom: '80px',
              color: '#007bff',
              zIndex: 10,
            }}
          />
        </AppLink>
      </div>

      <nav className="position-fixed bottom-0 left-0 bg-light p-3 w-100 d-flex justify-content-between">
        {items.map((item, i) => (
          <AppLink key={i} href={item.href}>
            {item.icon}
          </AppLink>
        ))}
      </nav>
    </div>
  )
}
