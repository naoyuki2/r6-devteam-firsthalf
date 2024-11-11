'use client'
import { AppButton } from '@/component/AppButton'
import { AppTextInput } from '@/component/AppTextInput'
import { AppAlert } from '@/component/AppAlert'
import { useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { apiClient } from '@/lib/axios'
import { useRouter } from 'next/navigation'
import { PREFECTURES } from './constants'
import { AppTextArea } from '@/component/AppTextArea'
import { getItem } from '@/utils/localStorage'
import { CreateRequestArgs, CreateRequestForm, Item } from '@/types'

const INITIAL_FORM: CreateRequestForm = {
  title: '',
  location_prefecture: '',
  location_details: '',
  delivery_prefecture: '',
  delivery_details: '',
  description: '',
  status: 'pending',
  items: [{ id: Date.now(), name: '', quantity: 1, price: '' }], // id: Date.now() でユニークなIDを生成
}

export default function RequestClient() {
  const router = useRouter()
  const [form, setForm] = useState(INITIAL_FORM)
  const [hasError, setHasError] = useState<boolean>(false)

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
    if (field === 'quantity') {
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
        { id: Date.now(), name: '', quantity: 1, price: '' },
      ],
    }))
  }

  const removeItemField = (id: number) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }))
  }

  const removeIdFromItems = (
    items: { id: number; name: string; quantity: number; price: string }[]
  ) => {
    return items.map(({ id, ...rest }) => rest)
  }

  const requestCreate = async () => {
    const args: CreateRequestArgs = {
      title: form.title,
      location_prefecture: form.location_prefecture,
      location_details: form.location_details,
      delivery_prefecture: form.delivery_prefecture,
      delivery_details: form.delivery_details,
      description: form.description,
      status: 'pending',
      items: removeIdFromItems(form.items),
    }
    try {
      const token = getItem('token')
      const res = await apiClient.post('/requests', args, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res == null) return
      router.push('/home')
      router.refresh()
    } catch (e) {
      console.log(e)
      setHasError(true)
    }
  }

  return (
    <>
      <AppAlert
        message="入力項目に問題があります"
        variant="danger"
        show={hasError}
      />
      <Form>
        <Form.Group className="mb-3">
          <AppTextInput
            label="タイトル"
            type="text"
            name="title"
            placeholder="例）＊＊＊限定グッズを購入してほしい！"
            autoComplete="off"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="border-start border-info border-5 ps-2 fw-bold">
            入手場所（都道府県）
          </Form.Label>
          <Form.Select
            name="location_prefecture"
            required
            onChange={handleInputChange}
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
            label="入手場所（詳細情報）"
            type="text"
            name="location_details"
            placeholder="例）東京ビッグサイト"
            autoComplete="off"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="border-start border-info border-5 ps-2 fw-bold">
            受け渡し場所（都道府県）
          </Form.Label>
          <Form.Select
            name="delivery_prefecture"
            required
            onChange={handleInputChange}
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
            label="受け渡し場所（詳細情報）"
            type="text"
            name="delivery_details"
            placeholder="例）東京ビッグサイト"
            autoComplete="off"
            onChange={handleInputChange}
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
                type="text"
                name={`item${index + 1}`}
                placeholder="例）***のTシャツ"
                autoComplete="off"
                onChange={(e) =>
                  handleItemChange(index, 'name', e.target.value)
                }
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
                    handleItemChange(
                      index,
                      'quantity',
                      parseInt(e.target.value)
                    )
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
            onClick={addItemField}
            className="outline-info"
            variant="outline-info"
          />
        </div>

        <Form.Group className="mb-3">
          <AppTextArea
            label="詳細情報"
            name="description"
            placeholder={`例）〇〇フェスで手に入る限定グッズをお願いしたいです。希望するアイテムは以下です。\n\nTシャツ（黒、Lサイズ）`}
            autoComplete="off"
            rows={6}
            onChange={handleInputChange}
          />
        </Form.Group>

        <AppButton
          text="この内容で依頼を投稿"
          onClick={requestCreate}
          className="w-100"
          variant="info"
        />
      </Form>
    </>
  )
}
