'use client'

import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

type EditModalProps = {
  show: boolean
  onClose: () => void
}

const EditModal: React.FC<EditModalProps> = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>モーダル</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>ここに表示する</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          閉じる
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditModal
