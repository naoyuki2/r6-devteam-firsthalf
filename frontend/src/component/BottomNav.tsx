import Link from 'next/link'
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
    <div className="position-relative">
      <AppLink href="/request">
        <PlusCircleFill
          style={{
            fontSize: '3rem',
            position: 'absolute',
            right: '16px',
            bottom: '80px',
            color: '#007bff',
          }}
        />
      </AppLink>

      <nav className="position-sticky bottom-0 bg-light py-3 px-4 d-flex justify-content-between">
        {items.map((item, i) => (
          <AppLink key={i} href={item.href}>
            {item.icon}
          </AppLink>
        ))}
      </nav>
    </div>
  )
}
