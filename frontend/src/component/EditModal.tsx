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
        <Modal.Title>＊＊＊フェスに行きます</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="border-start border-info border-5 ps-2 fw-bold my-2">
          入手場所
        </p>
        <div className="mb-3 ms-3">東京都: 東京ビックサイト</div>

        <p className="border-start border-info border-5 ps-2 fw-bold my-2">
          受け渡し場所
        </p>
        <div className="mb-3 ms-3">福岡県: 博多駅</div>

        <p className="border-start border-info border-5 ps-2 fw-bold my-2">
          受け渡し日時
        </p>
        <div className="mb-3 ms-3">2024/10/2(水)</div>

        <p className="border-start border-info border-5 ps-2 fw-bold my-2">
          欲しいもの1
        </p>
        <div className="mb-3 ms-3">
          <p>＊＊＊のTシャツ</p>
          <div className="d-flex justify-content-between">
            <span>個数: 1個</span>
            <span>金額: 1,000円</span>
          </div>
        </div>

        <p className="border-start border-info border-5 ps-2 fw-bold my-2">
          詳細情報
        </p>
        <div className="mb-3 ms-3">
          ＊＊＊フェスで手に入る限定グッズをお願いしたいです。希望するアイテムは以下です。
          <br />
          Tシャツ（黒、Lサイズ）
          <br />
          <br />
          それぞれ、フェス会場内のオフィシャルグッズショップで購入できると思います。
          <br />
          以下のリンクに商品情報がありますので、参考にしてください。
          <br />
          https://example.com
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          閉じる
        </Button>

        <Button variant="primary" onClick={onClose}>
          依頼を編集する
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditModal
