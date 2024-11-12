'use client'

import React from 'react'
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

export default function loginRecommend() {
  const [modal, setModal] = useState(false)

  const openModal = () => {
    setModal(true)
  }
  const closeModal = () => {
    setModal(false)
  }
  var msg = ''
  if (modal) {
    msg = 'true'
  } else {
    msg = 'false'
  }
  return (
    <>
      <button onClick={openModal}>モーダル</button>
      <span>{msg}</span>
      <Modal show={modal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <button onClick={closeModal}>Close</button>
          <button onClick={closeModal}>Save Changes</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
