'use client'

import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { AppButton } from './AppButton'

type EditModalProps = {
  show: boolean
  onClose: () => void
}

const EditModal: React.FC<EditModalProps> = ({ show, onClose }) => {
  // 編集モードの管理
  const [isEdit, setIsEdit] = useState(false)

  // 各項目の値を管理（初期値は既存データ）
  const [place, setPlace] = useState('東京都: 東京ビックサイト')
  const [transfer, setTransfer] = useState('福岡県: 博多駅')
  const [date, setDate] = useState('2024/10/2(水)')
  const [item, setItem] = useState('＊＊＊のTシャツ')
  const [details, setDetails] = useState(
    `＊＊＊フェスで手に入る限定グッズをお願いしたいです。希望するアイテムは以下です。
Tシャツ（黒、Lサイズ）

それぞれ、フェス会場内のオフィシャルグッズショップで購入できると思います。
以下のリンクに商品情報がありますので、参考にしてください。
https://example.com`
  )

  // 編集モードの切り替え
  const handleEditToggle = () => {
    setIsEdit(!isEdit)
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>＊＊＊フェスに行きます</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="border-start border-info border-5 ps-2 fw-bold my-2">
          入手場所
        </p>
        <div className="mb-3 ms-3">
          {isEdit ? (
            <input
              type="text"
              className="form-control"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          ) : (
            place
          )}
        </div>

        <p className="border-start border-info border-5 ps-2 fw-bold my-2">
          受け渡し場所
        </p>
        <div className="mb-3 ms-3">
          {isEdit ? (
            <input
              type="text"
              className="form-control"
              value={transfer}
              onChange={(e) => setTransfer(e.target.value)}
            />
          ) : (
            transfer
          )}
        </div>

        <p className="border-start border-info border-5 ps-2 fw-bold my-2">
          受け渡し日時
        </p>
        <div className="mb-3 ms-3">
          {isEdit ? (
            <input
              type="text"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          ) : (
            date
          )}
        </div>

        <p className="border-start border-info border-5 ps-2 fw-bold my-2">
          欲しいもの1
        </p>
        <div className="mb-3 ms-3">
          {isEdit ? (
            <input
              type="text"
              className="form-control"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          ) : (
            item
          )}
        </div>

        <p className="border-start border-info border-5 ps-2 fw-bold my-2">
          詳細情報
        </p>
        <div className="mb-3 ms-3">
          {isEdit ? (
            <textarea
              className="form-control"
              value={details}
              rows={5}
              onChange={(e) => setDetails(e.target.value)}
            />
          ) : (
            details
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <AppButton
          variant="secondary"
          className="text-white"
          onClick={onClose}
          text="閉じる"
        />
        {isEdit ? (
          <AppButton
            variant="success"
            className="text-white"
            onClick={handleEditToggle}
            text="保存する"
          />
        ) : (
          <AppButton
            variant="info"
            className="text-white"
            onClick={handleEditToggle}
            text="編集する"
          />
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default EditModal
