'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import logo from '../../public/logo.png'
import { AppLink } from './AppLink'
import { ArrowLeft, PencilSquare } from 'react-bootstrap-icons'
import { usePathname, useRouter } from 'next/navigation'
import EditModal from './EditModal'
import { DraftRequest } from '@/types'

type TopNavProps = {
  draftRequest?: DraftRequest
}

export default function TopNav({ draftRequest }: TopNavProps) {
  const pathname = usePathname()
  const router = useRouter()

  // 特定のページで「戻る」ボタンを表示
  const isArrowShow =
    /^\/request\/\d+$/.test(pathname) || /^\/user\/\d+$/.test(pathname)

  // チャット画面の場合に編集アイコンを表示
  const isChatPage = /^\/chat\/[a-zA-Z0-9-]+$/.test(pathname) // 必要に応じて調整

  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  return (
    <nav className="position-sticky top-0 bg-info shadow px-3 py-2 z-1">
      <div className="d-flex justify-content-center">
        {isArrowShow && (
          <ArrowLeft
            onClick={() => router.back()}
            style={{
              position: 'absolute',
              fontSize: '36px',
              left: 16,
              top: 16,
            }}
          />
        )}
        <AppLink href="/">
          <Image src={logo} alt="logo" width={48} height={48} priority />
        </AppLink>
        {isChatPage && (
          <PencilSquare
            onClick={handleOpenModal}
            style={{
              position: 'absolute',
              fontSize: '24px',
              right: 16,
              top: 16,
              cursor: 'pointer',
            }}
          />
        )}
      </div>

      {draftRequest != undefined && (
        <EditModal
          show={showModal}
          onClose={handleCloseModal}
          draftRequest={draftRequest}
        />
      )}
    </nav>
  )
}
