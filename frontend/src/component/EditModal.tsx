'use client'

import React from 'react'
import Modal from 'react-bootstrap/Modal'
import { AppButton } from './AppButton'
import { DraftRequest } from '@/types'

type EditModalProps = {
  show: boolean
  onClose: () => void
  draftRequest: DraftRequest
  otherRole: string
}

const EditModal: React.FC<EditModalProps> = ({
  show,
  onClose,
  draftRequest,
  otherRole,
}) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{draftRequest.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="border-start border-info border-5 ps-2 fw-bold my-2">
          入手場所
        </p>
        <div className="mb-3 ms-3">
          {draftRequest.location_prefecture}:{draftRequest.location_details}
        </div>

        <p className="border-start border-info border-5 ps-2 fw-bold my-2">
          受け渡し場所
        </p>
        <div className="mb-3 ms-3">
          {draftRequest.delivery_prefecture}:{draftRequest.delivery_details}
        </div>

        <p className="border-start border-info border-5 ps-2 fw-bold my-2">
          欲しいもの1
        </p>
        {draftRequest.draft_items.map((item) => (
          <div className="mb-3 ms-3" key={item.id}>
            <p>{item.name}</p>
            <div className="d-flex justify-content-between">
              <span>個数:{item.quantity}</span>
              <span>金額:{item.price}円</span>
            </div>
          </div>
        ))}
        <p className="border-start border-info border-5 ps-2 fw-bold my-2">
          詳細情報
        </p>
        <div className="mb-3 ms-3">{draftRequest.description}</div>
      </Modal.Body>
      <Modal.Footer>
        <AppButton
          variant="secondary"
          className="text-white"
          onClick={onClose}
          text="閉じる"
        />
        {otherRole === 'carrier' && (
          <AppButton
            variant="info"
            className="text-white"
            onClick={onClose}
            text="編集する"
          />
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default EditModal
