'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { AppButton } from '@/component/AppButton'
import { AppTextInput } from '@/component/AppTextInput'
import { AppTextArea } from '@/component/AppTextArea'
import { Form, Row, Col } from 'react-bootstrap'
import { Item, CreateRequestForm } from '@/types'
import { useRequest } from './hooks'
import { PREFECTURES } from './constants'
import { AppAlert } from '@/component/AppAlert'

const INITIAL_FORM: CreateRequestForm = {
  title: '',
  location_prefecture: '',
  location_details: '',
  delivery_prefecture: '',
  delivery_details: '',
  description: '',
  status: 'pending',
  items: [{ id: Date.now(), name: '', quantity: 1, price: 0 }], // id: Date.now() でユニークなIDを生成
}

export default function EditRequestClient() {
  const router = useRouter()
  const { id } = useParams()
  const requestId: number = Number(id)
  const { request, error, isLoading } = useRequest(requestId)
  const [form, setForm] = useState(INITIAL_FORM)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (request) {
      setForm(request)
    }
  }, [request])

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
    if (field === 'quantity' || field === 'price') {
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
    if (form.items.length > 1) {
      setForm((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
      }))
    }
  }

  const updateRequest = async () => {
    try {
      router.push('/home')
    } catch (e) {
      setHasError(true)
      console.error(e)
    }
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error loading request</p>
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
            value={form.title || ''}
            autoComplete="false"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>入手場所（都道府県）</Form.Label>
          <Form.Select
            name="location_prefecture"
            value={form.location_prefecture || ''}
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
            value={form.location_details || ''}
            autoComplete="false"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>受け渡し場所（都道府県）</Form.Label>
          <Form.Select
            name="delivery_prefecture"
            value={form.delivery_prefecture || ''}
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
            value={form.delivery_details || ''}
            autoComplete="false"
            onChange={handleInputChange}
          />
        </Form.Group>
        {form.items.map((item, index) => (
          <div key={item.id}>
            <Form.Group className="mb-3">
              <AppTextInput
                label={`欲しいもの${index + 1}`}
                type="text"
                name={`item${index + 1}`}
                value={item.name || ''}
                autoComplete="false"
                onChange={(e) =>
                  handleItemChange(index, 'name', e.target.value)
                }
              />
              <Row>
                <Col>
                  <Form.Label>個数</Form.Label>
                  <Form.Select
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        'quantity',
                        parseInt(e.target.value)
                      )
                    }
                  >
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
                    value={item.price || ''}
                    autoComplete="false"
                    onChange={(e) =>
                      handleItemChange(index, 'price', e.target.value)
                    }
                  />
                </Col>
              </Row>
              {form.items.length > 1 && (
                <AppButton
                  text="削除"
                  onClick={() => removeItemField(item.id)}
                  className="outline-danger ms-2"
                  variant="outline-danger"
                />
              )}
            </Form.Group>
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
            placeholder={form.description || ''}
            autoComplete="false"
            rows={6}
            onChange={handleInputChange}
          />
        </Form.Group>
        <AppButton
          text="この内容で依頼を更新"
          onClick={updateRequest}
          className="w-100"
        />
      </Form>
    </>
  )
}
