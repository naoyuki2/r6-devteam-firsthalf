'use client'

import Image from 'next/image'
import logo from '../../public/logo.png'
import { AppLink } from './AppLink'
import { ArrowLeft, Person } from 'react-bootstrap-icons'
import { useRouter } from 'next/navigation'
import { useCurrentUser } from '@/lib/jotai/userState'

type TopNavProps = {
  isLogoShow?: boolean
  isArrowShow?: boolean
  text?: string
}

export default function TopNav({ isLogoShow, isArrowShow, text }: TopNavProps) {
  const router = useRouter()
  const currentUser = useCurrentUser()

  return (
    <nav
      className="position-sticky top-0 bg-info shadow z-1 d-flex justify-content-center align-items-center px-3"
      style={{ height: '52px' }}
    >
      <div>
        {isArrowShow ? (
          <ArrowLeft
            onClick={() => router.back()}
            size={24}
            className="position-absolute text-black"
            style={{
              top: '50%',
              left: '16px',
              transform: 'translateY(-50%)',
            }}
          />
        ) : currentUser ? (
          <AppLink href="/profile">
            <Person
              size={32}
              className="border border-secondary rounded-circle bg-white p-1 position-absolute"
              style={{
                top: '50%',
                left: '16px',
                transform: 'translateY(-50%)',
              }}
            />
          </AppLink>
        ) : (
          <AppLink href="/login">
            <Person
              size={32}
              className="border border-secondary rounded-circle bg-white p-1 position-absolute"
              style={{
                top: '50%',
                left: '16px',
                transform: 'translateY(-50%)',
              }}
            />
          </AppLink>
        )}
        <span
          className="fw-bold ps-4 position-absolute text-black"
          style={{
            top: '50%',
            left: '48px',
            transform: 'translateY(-50%)',
          }}
        >
          {text}
        </span>
      </div>
      {isLogoShow && (
        <AppLink href="/">
          <Image src={logo} alt="logo" width={32} height={32} priority />
        </AppLink>
      )}
      <div></div>
    </nav>
  )
}
