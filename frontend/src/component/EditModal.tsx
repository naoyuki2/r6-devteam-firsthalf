'use client'

import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { AppButton } from './AppButton'

type EditModalProps = {
  show: boolean
  onClose: () => void
}

type Item = {
  id: number
  name: string
  quantity: number
  price: string
}

const EditModal: React.FC<EditModalProps> = ({ show, onClose }) => {
  const [isEdit, setIsEdit] = useState(false)

  // 入力内容の状態管理
  const [title, setTitle] = useState('＊＊＊フェスに行きます')
  const [locationPrefecture, setLocationPrefecture] = useState('東京都')
  const [locationDetails, setLocationDetails] = useState('東京ビックサイト')
  const [deliveryPrefecture, setDeliveryPrefecture] = useState('福岡県')
  const [deliveryDetails, setDeliveryDetails] = useState('博多駅')
  const [items, setItems] = useState<Item[]>([
    { id: Date.now(), name: '＊＊＊のTシャツ', quantity: 1, price: '1,000' },
  ])
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

  // アイテムを追加
  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now(), name: '', quantity: 1, price: '' },
    ])
  }

  // アイテムを削除
  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  // アイテムの変更を管理
  const handleItemChange = (
    id: number,
    field: keyof Item,
    value: string | number
  ) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? '依頼の編集' : title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="border-start border-info border-5 ps-2 fw-bold my-2">
          タイトル
        </p>
        <div className="mb-3 ms-3">
          {isEdit ? (
            <input
              type="text"
              className="form-control"
              value={title}
              placeholder="タイトルを入力してください"
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            title
          )}
        </div>

        <p className="border-start border-info border-5 ps-2 fw-bold my-2">
          入手場所（都道府県）
        </p>
        <div className="mb-3 ms-3">
          {isEdit ? (
            <input
              type="text"
              className="form-control"
              placeholder="都道府県"
              value={locationPrefecture}
              onChange={(e) => setLocationPrefecture(e.target.value)}
            />
          ) : (
            locationPrefecture
          )}
        </div>

        <p className="border-start border-info border-5 ps-2 fw-bold my-2">
          入手場所（詳細情報）
        </p>
        <div className="mb-3 ms-3">
          {isEdit ? (
            <input
              type="text"
              className="form-control"
              placeholder="詳細情報"
              value={locationDetails}
              onChange={(e) => setLocationDetails(e.target.value)}
            />
          ) : (
            locationDetails
          )}
        </div>

        <p className="border-start border-info border-5 ps-2 fw-bold my-2">
          受け渡し場所（都道府県）
        </p>
        <div className="mb-3 ms-3">
          {isEdit ? (
            <input
              type="text"
              className="form-control"
              placeholder="都道府県"
              value={deliveryPrefecture}
              onChange={(e) => setDeliveryPrefecture(e.target.value)}
            />
          ) : (
            deliveryPrefecture
          )}
        </div>

        <p className="border-start border-info border-5 ps-2 fw-bold my-2">
          受け渡し場所（詳細情報）
        </p>
        <div className="mb-3 ms-3">
          {isEdit ? (
            <input
              type="text"
              className="form-control"
              placeholder="詳細情報"
              value={deliveryDetails}
              onChange={(e) => setDeliveryDetails(e.target.value)}
            />
          ) : (
            deliveryDetails
          )}
        </div>

        <p className="border-start border-info border-5 ps-2 fw-bold my-2">
          欲しいもの
        </p>
        {items.map((item) => (
          <div key={item.id} className="mb-3 ms-3">
            {isEdit ? (
              <>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="アイテム名"
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(item.id, 'name', e.target.value)
                  }
                />
                <div className="d-flex justify-content-between mb-2">
                  <div className="d-flex flex-column me-3">
                    <label className="fw-bold border-start border-info ps-2">
                      個数
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="個数"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(
                          item.id,
                          'quantity',
                          Math.max(1, Number(e.target.value))
                        )
                      }
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <label className="fw-bold border-start border-info ps-2">
                      金額
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="金額"
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(item.id, 'price', e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <AppButton
                    text="削除"
                    onClick={() => removeItem(item.id)}
                    className="btn-sm btn-danger"
                  />
                </div>
              </>
            ) : (
              <>
                <p>{item.name}</p>
                <div className="d-flex justify-content-between">
                  <span>個数: {item.quantity}個</span>
                  <span>金額: {item.price}円</span>
                </div>
              </>
            )}
          </div>
        ))}

        {isEdit && (
          <div className="d-flex justify-content-end">
            <AppButton
              text="追加"
              onClick={addItem}
              className="btn-sm btn-info mb-3"
            />
          </div>
        )}

        <p className="border-start border-info border-5 ps-2 fw-bold my-2">
          詳細情報
        </p>
        <div className="mb-3 ms-3">
          {isEdit ? (
            <textarea
              className="form-control"
              rows={5}
              value={details}
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
