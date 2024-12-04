'use client'

import { ChatDots, HouseDoor, PlusCircleFill } from 'react-bootstrap-icons'
import { AppLink } from './AppLink'
import { usePathname } from 'next/navigation'
import { getItem } from '@/utils/localStorage'
import { LoginRecoModal } from './LoginRecoModal'
import React, { useState } from 'react'
import { Search } from 'react-bootstrap-icons'

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
            width: '24px',
            height: '24px',
          }}
        />
      ),
      href: '/home',
      active: pathname === '/home',
    },
    {
      icon: (
        <Search
          style={{
            fontSize: '2rem',
            color: pathname === '/search' ? 'white' : 'black',
            width: '24px',
            height: '24px',
          }}
        />
      ),
      href: '/search',
      active: pathname === '/search',
    },
    {
      icon: (
        <ChatDots
          style={{
            fontSize: '2rem',
            color: pathname === '/room' ? 'white' : 'black',
            width: '24px',
            height: '24px',
          }}
          onClick={openModal}
        />
      ),
      href: token ? '/room' : '',
      active: pathname === '/room',
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
                bottom: '68px',
                zIndex: 10,
              }}
              onClick={openModal}
            />
          </AppLink>
        </div>
      )}

      <nav
        className="position-fixed bottom-0 left-0 bg-light p-3 w-100 d-flex justify-content-between align-items-center "
        style={{ height: '52px' }}
      >
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
