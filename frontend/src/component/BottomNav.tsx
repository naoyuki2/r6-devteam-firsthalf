'use client'

import {
  ChatDots,
  HouseDoor,
  Person,
  PlusCircleFill,
} from 'react-bootstrap-icons'
import { AppLink } from './AppLink'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()

  const items = [
    {
      icon: (
        <HouseDoor
          style={{
            fontSize: '2rem',
            color: pathname === '/home' ? 'white' : 'black',
          }}
        />
      ),
      href: '/home',
      active: pathname === '/home',
    },
    {
      icon: (
        <ChatDots
          style={{
            fontSize: '2rem',
            color: pathname === '/room' ? 'white' : 'black',
          }}
        />
      ),
      href: '/room',
      active: pathname === '/room',
    },
    {
      icon: (
        <Person
          style={{
            fontSize: '2rem',
            color: pathname === '/profile' ? 'white' : 'black',
          }}
        />
      ),
      href: '/profile',
      active: pathname === '/profile',
    },
  ]

  return (
    <div className="d-flex flex-column">
      <div style={{ flex: 1, paddingBottom: '80px' }}>
        <AppLink href="/request">
          <PlusCircleFill
            className="position-fixed text-info"
            style={{
              fontSize: '3rem',
              right: '16px',
              bottom: '80px',
              zIndex: 10,
            }}
          />
        </AppLink>
      </div>

      <nav className="position-fixed bottom-0 left-0 bg-light p-3 w-100 d-flex justify-content-between">
        {items.map((item, i) => (
          <AppLink key={i} href={item.href}>
            <div
              className={item.active ? 'bg-info' : ''}
              style={{
                borderRadius: '50%',
                padding: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {item.icon}
            </div>
          </AppLink>
        ))}
      </nav>
    </div>
  )
}
