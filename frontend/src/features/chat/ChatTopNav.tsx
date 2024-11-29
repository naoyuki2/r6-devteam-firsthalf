'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import logo from '../../../public/logo.png'
import { ArrowLeft, PencilSquare } from 'react-bootstrap-icons'
import { useRouter } from 'next/navigation'
import { DraftRequest, Request } from '@/types'
import { User } from '@/lib/jotai/userState'
import { AppLink } from '@/component/AppLink'
import EditModal from './EditModal'

type TopNavProps = {
  draftRequest: DraftRequest | Request
  otherRole?: string
  currentUser?: User | null
  onOpenModal: () => void
  onCloseModal: () => void
  showModal: boolean
}

export default function ChatTopNav({
  draftRequest,
  otherRole,
  currentUser,
  onOpenModal,
  onCloseModal,
  showModal,
}: TopNavProps) {
  const router = useRouter()

  return (
    <nav className="position-sticky top-0 bg-info shadow px-3 py-2 z-1">
      <div className="d-flex justify-content-center">
        <ArrowLeft
          onClick={() => router.back()}
          style={{
            position: 'absolute',
            fontSize: '36px',
            left: 16,
            top: 16,
          }}
        />
        <AppLink href="/">
          <Image src={logo} alt="logo" width={48} height={48} priority />
        </AppLink>
        <PencilSquare
          onClick={onOpenModal}
          style={{
            position: 'absolute',
            fontSize: '24px',
            right: 16,
            top: 16,
            cursor: 'pointer',
          }}
        />
      </div>

      {draftRequest != undefined &&
        otherRole != undefined &&
        currentUser != undefined && (
          <EditModal
            show={showModal}
            onClose={onCloseModal}
            draftRequest={draftRequest}
            otherRole={otherRole}
            currentUser={currentUser}
          />
        )}
    </nav>
  )
}
