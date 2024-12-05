'use client'

import React from 'react'
import { PencilSquare } from 'react-bootstrap-icons'
import { ChatDots } from 'react-bootstrap-icons'
import { CurrencyYen } from 'react-bootstrap-icons'
import Modal from 'react-bootstrap/Modal'
import { useRouter } from 'next/navigation'

type LoginRecoModalProps = {
  isShow: boolean
  closeModal: () => void
}
export const LoginRecoModal = ({ isShow, closeModal }: LoginRecoModalProps) => {
  const router = useRouter()

  const handleLoginClick = () => {
    router.push('/login')
  }
  return (
    <Modal show={isShow} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className="fw-bold mt-2 text-center">
          この機能を利用するには
          <br />
          ログインが必要です
        </h4>
        <p className="text-center">
          ログインすると、様々なサービスを受けられます
        </p>
        <div className="border border-info rounded d-flex mb-2">
          <PencilSquare
            className="mt-2 mb-2 mx-2"
            style={{
              fontSize: '3rem',
            }}
          ></PencilSquare>
          <div>
            <p className="fw-bold mt-2 mb-2 mx-2">依頼作成機能</p>
            <p className="mb-2 mx-2">欲しいものを依頼できる</p>
          </div>
        </div>
        <div className="border border-info rounded d-flex mb-2">
          <ChatDots
            className="mt-2 mb-2 mx-2"
            style={{
              fontSize: '3rem',
            }}
          ></ChatDots>
          <div>
            <p className="fw-bold mt-2 mb-2 my-2 mx-2">チャット機能</p>
            <p className="mb-2 mx-2">気になる依頼に対してチャットが送れる</p>
          </div>
        </div>
        <div className="border border-info rounded d-flex mb-2">
          <CurrencyYen
            className="mt-2 mb-2 mx-2"
            style={{
              fontSize: '3rem',
            }}
          ></CurrencyYen>
          <div>
            <p className="fw-bold mt-2 mb-2 mx-2">報酬受け取り機能</p>
            <p className="mb-2 mx-2">依頼を達成して報酬を受け取れる</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={closeModal}>
          閉じる
        </button>
        <button className="text-white btn btn-info" onClick={handleLoginClick}>
          ログイン
        </button>
      </Modal.Footer>
    </Modal>
  )
}
