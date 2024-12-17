'use client'

import { AppButton } from '@/component/AppButton'
import { AppTextInput } from '@/component/AppTextInput'
import { AppAlert } from '@/component/AppAlert'
import { useState } from 'react'
import { Form } from 'react-bootstrap'
import { apiClient } from '@/lib/axios'
import { useRouter } from 'next/navigation'
import { AppTextArea } from '@/component/AppTextArea'
import { getItem } from '@/utils/localStorage'
import { CreateRequestArgs, CreateRequestForm, Item } from '@/types'
import { SearchAccordion } from '@/component/SearchAccordion'
import { Check } from 'react-bootstrap-icons'
import { THUMBNAIL_COLORS } from './constants'

const INITIAL_FORM: CreateRequestForm = {
  title: '',
  location_prefecture: '',
  location_details: '',
  delivery_prefecture: '',
  delivery_details: '',
  description: '',
  status: 'pending',
  items: [{ id: Date.now(), name: '', quantity: 1, price: 0 }], // id: Date.now() でユニークなIDを生成
  color: '',
}

export default function RequestClient() {
  const router = useRouter()
  const [form, setForm] = useState(INITIAL_FORM)
  const [hasError, setHasError] = useState<boolean>(false)
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [selectedDelivery, setSelectedDelivery] = useState<string>('')
  const [selectColor, setSelectColor] = useState<string>('#85C9EF')

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
        { id: Date.now(), name: '1', quantity: 1, price: 0 },
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

  const requestCreate = async () => {
    const args: CreateRequestArgs = {
      title: form.title,
      location_prefecture: selectedLocation,
      location_details: form.location_details,
      delivery_prefecture: selectedDelivery,
      delivery_details: form.delivery_details,
      description: form.description,
      status: 'pending',
      items: removeIdFromItems(form.items),
      color: selectColor,
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
        style={{ zIndex: 100 }}
      />
      <Form>
        <Form.Group className="mb-3">
          <AppTextInput
            label="タイトル"
            type="text"
            name="title"
            placeholder="例）＊＊＊限定グッズを購入してほしい!"
            autoComplete="off"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="border-start border-info border-5 ps-2 fw-bold">
            商品の入手場所（都道府県）
          </Form.Label>
          <SearchAccordion
            selectedPrefecture={selectedLocation}
            setSelectedPrefecture={setSelectedLocation}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <AppTextInput
            label="商品の入手場所（詳細情報）"
            type="text"
            name="location_details"
            placeholder="例）東京ビッグサイト"
            autoComplete="off"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="border-start border-info border-5 ps-2 fw-bold">
            商品の受け渡し場所（都道府県）
          </Form.Label>
          <SearchAccordion
            selectedPrefecture={selectedDelivery}
            setSelectedPrefecture={setSelectedDelivery}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <AppTextInput
            label="商品の受け渡し場所（詳細情報）"
            type="text"
            name="delivery_details"
            placeholder="例）東京ビッグサイト"
            autoComplete="off"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <AppTextArea
            label="備考"
            name="description"
            placeholder={`例）〇〇フェスで手に入る限定グッズをお願いしたいです。希望するアイテムは以下です。\n\nTシャツ（黒、Lサイズ）`}
            autoComplete="off"
            rows={6}
            onChange={handleInputChange}
          />
        </Form.Group>

        <div>
          <Form.Group className="mb-3">
            <div className="align-items-center mb-2">
              <div className="d-flex justify-content-between mb-2">
                <Form.Label className="border-start border-info border-5 ps-2 fw-bold">
                  欲しいもの
                </Form.Label>
                <AppButton
                  text="追加"
                  onClick={addItemField}
                  className="outline-info"
                  variant="outline-info"
                />
              </div>
              <table className="border">
                <thead
                  style={{
                    backgroundColor: '#85c9ef',
                    color: 'white',
                    fontSize: '12px',
                  }}
                >
                  <tr>
                    <th
                      style={{
                        width: '30%',
                        border: '1px solid #B3B3B3',
                        textAlign: 'center',
                        padding: '8px',
                      }}
                    >
                      商品名
                    </th>
                    <th
                      style={{
                        width: '30%',
                        border: '1px solid #B3B3B3',
                        textAlign: 'center',
                        padding: '8px',
                      }}
                    >
                      単価
                    </th>
                    <th
                      style={{
                        width: '20%',
                        border: '1px solid #B3B3B3',
                        textAlign: 'center',
                        padding: '8px',
                      }}
                    >
                      個数
                    </th>
                    <th
                      style={{
                        width: '20%',
                        border: '1px solid #B3B3B3',
                        textAlign: 'center',
                        padding: '8px',
                      }}
                    >
                      -
                    </th>
                  </tr>
                </thead>
                {form.items.map((item, index) => (
                  <tr key={item.id}>
                    <td className="border" style={{ height: '20px' }}>
                      <Form.Control
                        type="text"
                        name={`item${index + 1}`}
                        placeholder="Tシャツ"
                        autoComplete="off"
                        onChange={(e) =>
                          handleItemChange(index, 'name', e.target.value)
                        }
                        style={{ border: 'none' }}
                      ></Form.Control>
                    </td>
                    <td className="border d-flex">
                      <span className="pt-1">￥</span>
                      <Form.Control
                        type="number"
                        name={`price${index + 1}`}
                        placeholder="1000"
                        autoComplete="off"
                        onChange={(e) =>
                          handleItemChange(index, 'name', e.target.value)
                        }
                        style={{ border: 'none' }}
                      ></Form.Control>
                    </td>
                    <td className="border">
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
                    </td>
                    <td className="border">
                      {form.items.length > 1 && (
                        <AppButton
                          text="削除"
                          onClick={() => removeItemField(item.id)}
                          className="outline-danger ms-2"
                          variant="outline-danger"
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </Form.Group>
        </div>

        <Form.Group className="mb-3" style={{ paddingBottom: '54px' }}>
          <Form.Label className="border-start border-info border-5 ps-2 fw-bold">
            サムネイル
          </Form.Label>
          <div className="d-flex justify-content-between mb-3 ms-4">
            {THUMBNAIL_COLORS.map((item) => (
              <div key={item}>
                <label
                  htmlFor={item}
                  className="btn rounded-circle"
                  style={{ backgroundColor: item }}
                >
                  <Check
                    className={`text-light ${
                      item === selectColor ? '' : 'invisible'
                    }`}
                  />
                </label>
                <input
                  type="radio"
                  name="thumbnail"
                  id={item}
                  className="invisible"
                  onClick={() => setSelectColor(item)}
                />
              </div>
            ))}
          </div>
        </Form.Group>

        <AppButton
          text="この内容で依頼を投稿"
          onClick={requestCreate}
          variant="info"
          style={{ position: 'fixed', width: '95%', bottom: 10, right: 10 }}
        />
      </Form>
    </>
  )
}
