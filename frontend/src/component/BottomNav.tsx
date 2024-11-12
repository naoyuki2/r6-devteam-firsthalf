'use client'

import {
  ChatDots,
  HouseDoor,
  Person,
  PlusCircleFill,
} from 'react-bootstrap-icons'
import { AppLink } from './AppLink'
import { usePathname } from 'next/navigation'
import { getItem } from '@/utils/localStorage'
import { LoginRecoModal } from './LoginRecoModal'
import React, { useState } from 'react'

export default function BottomNav() {
  const pathname = usePathname()
  const token = getItem('token')
  const [isShow, setModal] = useState<boolean>(false)
  const openModal = () => {
    setModal(true)
  }
  const closeModal = () => {
    setModal(false)
  }

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
          onClick={openModal}
        />
      ),
      href: token ? '/room' : '',
      active: pathname === '/room',
    },
    {
      icon: (
        <Person
          style={{
            fontSize: '2rem',
            color: pathname === '/profile' ? 'white' : 'black',
          }}
          onClick={openModal}
        />
      ),
      href: token ? '/profile' : '',
      active: pathname === '/profile',
    },
  ]
  return (
    <div className="d-flex flex-column">
      {pathname === '/home' && (
        <div style={{ flex: 1, paddingBottom: '80px' }}>
          <AppLink href={token ? '/request' : ''}>
            <PlusCircleFill
              className="position-fixed text-info"
              style={{
                fontSize: '3rem',
                right: '16px',
                bottom: '80px',
                zIndex: 10,
              }}
              onClick={openModal}
            />
          </AppLink>
        </div>
      )}

      <nav className="position-fixed bottom-0 left-0 bg-light p-3 w-100 d-flex justify-content-between">
        {items.map((item, i) => (
          <React.Fragment key={i}>
            <AppLink href={item.href}>
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
            {token == null && (
              <LoginRecoModal isShow={isShow} closeModal={closeModal} />
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  )
}
