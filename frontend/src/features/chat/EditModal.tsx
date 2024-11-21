'use client'

import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import {
  CreateRequestArgs,
  CreateRequestForm,
  DraftRequest,
  ProposeDraftRequestArgs,
} from '@/types'
import { Col, Form, Row } from 'react-bootstrap'
import { PREFECTURES } from '@/features/request/constants'
import { getItem } from '@/utils/localStorage'
import { apiClient } from '@/lib/axios'
import { useRouter } from 'next/navigation'
import { AppButton } from '@/component/AppButton'
import { AppTextInput } from '@/component/AppTextInput'
import { AppTextArea } from '@/component/AppTextArea'
import { User } from '@/lib/jotai/userState'

type EditModalProps = {
  show: boolean
  onClose: () => void
  draftRequest: DraftRequest
  otherRole: string
  currentUser: User | null
}

type Item = {
  id: number
  name: string
  quantity: number
  price: string
}

const EditModal: React.FC<EditModalProps> = ({
  show,
  onClose,
  draftRequest,
  otherRole,
  currentUser,
}) => {
  const [isEdit, setIsEdit] = useState(false)

  const handleEditToggle = () => {
    setIsEdit(!isEdit)
  }

  const [form, setForm] = useState<CreateRequestForm>({
    title: draftRequest.title,
    location_prefecture: draftRequest.location_prefecture,
    location_details: draftRequest.location_details,
    delivery_prefecture: draftRequest.delivery_prefecture,
    delivery_details: draftRequest.delivery_details,
    description: draftRequest.description,
    status: 'pending',
    items: draftRequest.draft_item.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    })),
  })

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleItemChange = (
    index: number,
    field: keyof Item,
    value: string | number
  ) => {
    const updatedItems = [...form.items]
    if (field === 'quantity' || field === 'price' || field === 'id') {
      updatedItems[index][field] = value as number
    } else {
      updatedItems[index][field] = value as string
    }
    setForm({ ...form, items: updatedItems })
  }

  const addItemField = () => {
    setForm((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { id: Date.now(), name: '', quantity: 1, price: 0 },
      ],
    }))
  }

  const removeItemField = (id: number) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }))
  }

  // idが未使用であるESLint警告が出るが、重大な問題ではないためコメントアウトで無視
  const removeIdFromItems = (
    items: { id: number; name: string; quantity: number; price: number }[]
  ) => {
    return items.map(({ id, ...rest }) => rest) // eslint-disable-line @typescript-eslint/no-unused-vars
  }

  const proposeDraftRequest = async () => {
    const args: ProposeDraftRequestArgs = {
      title: form.title,
      location_prefecture: form.location_prefecture,
      location_details: form.location_details,
      delivery_prefecture: form.delivery_prefecture,
      delivery_details: form.delivery_details,
      description: form.description,
      draft_items: removeIdFromItems(form.items),
    }
    try {
      const token = getItem('token')
      const res = await apiClient.post(
        `/draft_requests/${draftRequest.id}/propose`,
        args,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const createMessageArgs = {
        body: '依頼を更新しました。右上のアイコンからご確認をお願いします。（このメッセージは自動送信されました。）',
        roomId: draftRequest.roomId,
        userId: currentUser?.id,
      }
      await apiClient.post('/messages', createMessageArgs)
      window.location.reload()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{!isEdit && draftRequest.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isEdit ? (
          <EditModalBody
            form={form}
            addItemField={addItemField}
            removeItemField={removeItemField}
            handleInputChange={handleInputChange}
            handleItemChange={handleItemChange}
          />
        ) : (
          <NonEditModalBody draftRequest={draftRequest} />
        )}
      </Modal.Body>
      <Modal.Footer>
        <AppButton
          variant="secondary"
          className="text-white"
          onClick={onClose}
          text="閉じる"
        />
        {otherRole !== 'carrier' &&
          (isEdit ? (
            <AppButton
              variant="info"
              className="text-white"
              onClick={() => proposeDraftRequest()}
              text="保存する"
            />
          ) : (
            draftRequest.action && (
              <AppButton
                variant="info"
                className="text-white"
                onClick={handleEditToggle}
                text="編集する"
              />
            )
          ))}
      </Modal.Footer>
    </Modal>
  )
}

const NonEditModalBody = ({ draftRequest }: { draftRequest: DraftRequest }) => {
  return (
    <>
      <p className="border-start border-info border-5 ps-2 fw-bold ms-4 my-2">
        入手場所
      </p>
      <div
        className="d-flex justify-content-center w-auto mb-3"
        style={{ width: '200px' }}
      >
        {draftRequest.location_prefecture}: {draftRequest.location_details}
      </div>

      <p className="border-start border-info border-5 ps-2 fw-bold ms-4 my-2">
        受け渡し場所
      </p>
      <div
        className="d-flex justify-content-center w-auto mb-3"
        style={{ width: '200px' }}
      >
        {draftRequest.delivery_prefecture}: {draftRequest.delivery_details}
      </div>

      <p className="border-start border-info border-5 ps-2 fw-bold ms-4 my-2">
        欲しいもの
      </p>
      <div className="d-flex justify-content-center">
        <div className="w-75">
          {draftRequest.draft_item.map((item) => (
            <div key={item.id} className="d-flex justify-content-between mb-2">
              <p className="me-4">{item.name}</p>
              <p className="me-4">{item.quantity}個</p>
              <p>¥{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="border-start border-info border-5 ps-2 fw-bold ms-4 my-2">
        詳細情報
      </p>
      <div className="d-flex justify-content-center w-auto mx-5 mb-3">
        <div className="text-container">{draftRequest.description}</div>
      </div>
    </>
  )
}

const EditModalBody = ({
  form,
  addItemField,
  removeItemField,
  handleInputChange,
  handleItemChange,
}: {
  form: CreateRequestForm
  addItemField: () => void
  removeItemField: (id: number) => void
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  handleItemChange: (
    index: number,
    field: keyof Item,
    value: string | number
  ) => void
}) => {
  return (
    <Form>
      <Form.Group className="mb-3">
        <AppTextInput
          value={form.title}
          label="タイトル"
          type="text"
          name="title"
          placeholder="例）＊＊＊限定グッズを購入してほしい！"
          autoComplete="off"
          onChange={(e) => handleInputChange(e)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="border-start border-info border-5 ps-2 fw-bold">
          入手場所（都道府県）
        </Form.Label>
        <Form.Select
          name="location_prefecture"
          required
          value={form.location_prefecture}
          onChange={(e) => handleInputChange(e)}
        >
          <option value="">選択してください</option>
          {PREFECTURES.map((prefecture) => (
            <option key={prefecture} value={prefecture}>
              {prefecture}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <AppTextInput
          value={form.location_details}
          label="入手場所（詳細情報）"
          type="text"
          name="location_details"
          placeholder="例）東京ビッグサイト"
          autoComplete="off"
          onChange={(e) => handleInputChange(e)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="border-start border-info border-5 ps-2 fw-bold">
          受け渡し場所（都道府県）
        </Form.Label>
        <Form.Select
          name="delivery_prefecture"
          value={form.delivery_prefecture}
          required
          onChange={(e) => handleInputChange(e)}
        >
          <option value="">選択してください</option>
          {PREFECTURES.map((prefecture) => (
            <option key={prefecture} value={prefecture}>
              {prefecture}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <AppTextInput
          value={form.delivery_details}
          label="受け渡し場所（詳細情報）"
          type="text"
          name="delivery_details"
          placeholder="例）東京ビッグサイト"
          autoComplete="off"
          onChange={(e) => handleInputChange(e)}
        />
      </Form.Group>

      {form.items.map((item, index) => (
        <div key={item.id}>
          <Form.Group className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <Form.Label className="border-start border-info border-5 ps-2 fw-bold">
                欲しいもの{index + 1}
              </Form.Label>
              {form.items.length > 1 && (
                <AppButton
                  text="削除"
                  onClick={() => removeItemField(item.id)}
                  className="outline-danger ms-2"
                  variant="outline-danger"
                />
              )}
            </div>
            <Form.Control
              value={item.name}
              type="text"
              name={`item${index + 1}`}
              placeholder="例）***のTシャツ"
              autoComplete="off"
              onChange={(e) => handleItemChange(index, 'name', e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Row className="mb-3">
            <Col>
              <Form.Label className="border-start border-info border-5 ps-2 fw-bold">
                個数
              </Form.Label>
              <Form.Select
                required
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, 'quantity', e.target.value)
                }
              >
                <option value="">-</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <AppTextInput
                value={item.price}
                label="金額"
                type="number"
                name={`price${index + 1}`}
                placeholder="円"
                autoComplete="off"
                onChange={(e) =>
                  handleItemChange(index, 'price', e.target.value)
                }
              />
            </Col>
          </Row>
          <div className="text-end mb-3"></div>
          <hr />
        </div>
      ))}

      <div className="text-end mb-3">
        <AppButton
          text="追加"
          onClick={() => addItemField()}
          className="outline-info"
          variant="outline-info"
        />
      </div>

      <Form.Group className="mb-3">
        <AppTextArea
          value={form.description}
          label="詳細情報"
          name="description"
          placeholder={`例）〇〇フェスで手に入る限定グッズをお願いしたいです。希望するアイテムは以下です。\n\nTシャツ（黒、Lサイズ）`}
          autoComplete="off"
          rows={6}
          onChange={(e) => handleInputChange(e)}
        />
      </Form.Group>
    </Form>
  )
}

export default EditModal
