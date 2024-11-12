'use client'

import React from 'react'
import { useState } from 'react'
import { PencilSquare } from 'react-bootstrap-icons'
import Modal from 'react-bootstrap/Modal'

type LoginRecoModalProps = {
  isShow: boolean
  closeModal: () => void
}
export const LoginRecoModal = ({ isShow, closeModal }: LoginRecoModalProps) => {
  return (
    <>
      <Modal show={isShow} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            この機能を利用するには
            <br />
            ログインが必要です
          </h4>
          <p>ログインすると、様々なサービスを受けられます</p>
          <div className="border border-info rounded d-flex">
            <PencilSquare
              style={{
                fontSize: '3rem',
              }}
            ></PencilSquare>
            <div>
              <p className="fw-bold mt-2">依頼作成機能</p>
              <span className="">欲しいものを依頼できる</span>
            </div>
          </div>
          <div className="border border-info rounded">チャット機能</div>
          <div className="border border-info rounded">報酬受け取り機能</div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={closeModal}>閉じる</button>
          <button>ログイン</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
