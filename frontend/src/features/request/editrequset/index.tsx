'use client'
import { AppButton } from '@/component/AppButton'
import { AppTextInput } from '@/component/AppTextInput'
import { AppAlert } from '@/component/AppAlert'
import { useState, useEffect } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { apiClient } from '@/lib/axios'
import { useRouter, useParams } from 'next/navigation'
import { PREFECTURES } from './editconstants'
import { AppTextArea } from '@/component/AppTextArea'
import { getItem } from '@/utils/localStorage'
import { CreateRequestForm, Item } from '@/types'

const INITIAL_FORM: CreateRequestForm = {
  title: '',
  location_prefecture: '',
  location_details: '',
  delivery_prefecture: '',
  delivery_details: '',
  description: '',
  status: 'pending',
  items: [{ id: Date.now(), name: '', quantity: 1, price: '' }],
}

export default function RequestUpdateClient() {
  const router = useRouter()
  const { id } = useParams()
  const numericId = id ? Number(id) : null
  const [form, setForm] = useState(INITIAL_FORM)
  const [hasError, setHasError] = useState<boolean>(false)

  console.log(form)

  // データを取得してフォームを初期化
  useEffect(() => {
    const fetchRequestData = async () => {
      if (!id) {
        console.error('Request ID is missing')
        setHasError(true)
        return
      }
      try {
        const res = await apiClient.get(`requests/${numericId}`)
        if (res?.data) {
          setForm({
            ...res.data,
            items: res.data.items.map((item: any) => ({
              ...item,
              id: item.id || Date.now(),
            })),
          })
        } else {
          console.error('No data found for the given ID')
          setHasError(true)
        }
      } catch (e) {
        console.error('Error fetching request data:', e)
        setHasError(true)
      }
    }

    fetchRequestData()
  }, [id])

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

  const requestUpdate = () => {}

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

    return (
      <>
        <div>{form.title}</div>
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
              placeholder={form.title}
              autoComplete="off"
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* 入手場所 */}
          <Form.Group className="mb-3">
            <Form.Label className="border-start border-info border-5 ps-2 fw-bold">
              入手場所（都道府県）
            </Form.Label>
            <Form.Select
              name="location_prefecture"
              value={form.location_prefecture}
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

          {form.items.map((item, index) => (
            <div key={item.id}>
              <Form.Group className="mb-3">
                <Form.Label className="border-start border-info border-5 ps-2 fw-bold">
                  欲しいもの{index + 1}
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="アイテム名"
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(index, 'name', e.target.value)
                  }
                />
              </Form.Group>
            </div>
          ))}

          <div className="text-end mb-3">
            <AppButton text="アイテムを追加" onClick={addItemField} />
          </div>

          <AppButton
            text="この内容で依頼を修正"
            onClick={requestUpdate}
            className="w-100"
            variant="info"
          />
        </Form>
      </>
    )
  }
}
