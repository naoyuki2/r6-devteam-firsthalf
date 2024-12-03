'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import logo from '../../public/logo.png'
import { AppLink } from './AppLink'
import { ArrowLeft, PencilSquare, Person, Search } from 'react-bootstrap-icons'
import { usePathname, useRouter } from 'next/navigation'
import EditModal from './EditModal'
import { DraftRequest } from '@/types'

type TopNavProps = {
  draftRequest?: DraftRequest
  otherRole?: string
}

export default function TopNav({ draftRequest, otherRole }: TopNavProps) {
  const pathname = usePathname()
  const router = useRouter()

  // 特定のページで「戻る」ボタンを表示
  const isArrowShow =
    /^\/request\/\d+$/.test(pathname) ||
    /^\/user\/\d+$/.test(pathname) ||
    '/search' === pathname ||
    '/request' === pathname ||
    /^\/chat\/[a-zA-Z0-9-]+$/.test(pathname)

  const isSearchShow = '/home' === pathname

  // チャット画面の場合に編集アイコンを表示
  const isChatPage = /^\/chat\/[a-zA-Z0-9-]+$/.test(pathname) // 必要に応じて調整

  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  return (
    <nav
      className="position-sticky top-0 bg-info shadow px-3 py-2 z-1 "
      style={{ height: '52px' }}
    >
      <div className="d-flex justify-content-center">
        {isArrowShow && (
          <ArrowLeft
            onClick={() => router.back()}
            size={36}
            style={{
              position: 'absolute',
              left: 16,
              top: 16,
            }}
          />
        )}
        <div>
          <Person
            onClick={() => router.push('/profile')}
            className="border border-secondary rounded-circle p-1"
            style={{
              backgroundColor: 'white',
              fontSize: '2rem',
              width: '32px',
              height: '32px',
              position: 'absolute',
              left: 16,
            }}
          />
        </div>
        <AppLink href="/">
          <Image src={logo} alt="logo" width={32} height={32} priority />
        </AppLink>
        {isChatPage && (
          <PencilSquare
            onClick={handleOpenModal}
            style={{
              position: 'absolute',
              fontSize: '30px',
              right: 16,
              top: 16,
              cursor: 'pointer',
            }}
          />
        )}
      </div>
      {draftRequest != undefined && otherRole != undefined && (
        <EditModal
          show={showModal}
          onClose={handleCloseModal}
          draftRequest={draftRequest}
          otherRole={otherRole}
        />
      )}
    </nav>
  )
}
