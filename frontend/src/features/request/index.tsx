'use client'
import { AppButton } from '@/component/AppButton'
import { AppTextInput } from '@/component/AppTextInput'
import { AppAlert } from '@/component/AppAlert'
import { useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { apiClient } from '@/lib/axios'
import { useRouter } from 'next/navigation'

export default function RequestClient() {
  const prefectures = [
    '北海道',
    '青森県',
    '岩手県',
    '宮城県',
    '秋田県',
    '山形県',
    '福島県',
    '茨城県',
    '栃木県',
    '群馬県',
    '埼玉県',
    '千葉県',
    '東京都',
    '神奈川県',
    '新潟県',
    '富山県',
    '石川県',
    '福井県',
    '山梨県',
    '長野県',
    '岐阜県',
    '静岡県',
    '愛知県',
    '三重県',
    '滋賀県',
    '京都府',
    '大阪府',
    '兵庫県',
    '奈良県',
    '和歌山県',
    '鳥取県',
    '島根県',
    '岡山県',
    '広島県',
    '山口県',
    '徳島県',
    '香川県',
    '愛媛県',
    '高知県',
    '福岡県',
    '佐賀県',
    '長崎県',
    '熊本県',
    '大分県',
    '宮崎県',
    '鹿児島県',
    '沖縄県',
  ]

  type Item = {
    name: string
    quantity: number
    price: string
  }

  type Form = {
    title: string
    locationPrefecture: string
    locationDetails: string
    deliveryPrefecture: string
    deliveryDetails: string
    details: string
    items: Item[]
  }

  const INITIAL_FORM: Form = {
    title: '',
    locationPrefecture: '',
    locationDetails: '',
    deliveryPrefecture: '',
    deliveryDetails: '',
    details: '',
    items: [{ name: '', quantity: 1, price: '' }],
  }
  const router = useRouter()
  const [form, setForm] = useState<Form>(INITIAL_FORM)
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

  const addField = () => {
    setForm((prev) => ({
      ...prev,
      items: [...prev.items, { name: '', quantity: 1, price: '' }],
    }))
  }

  const requestCreate = async () => {
    const args: any = {
      title: form.title,
      location_prefecture: form.locationPrefecture,
      location_details: form.locationDetails,
      delivery_prefecture: form.deliveryPrefecture,
      delivery_details: form.deliveryDetails,
      description: form.details,
      status: 'pending',
      userId: 1, //ローカルストレージからtoken取得
      items: form.items,
    }
    try {
      const res = await apiClient.post('/requests', args)
      if (res == null) return
      router.push('/home')
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
            name="locationPrefecture"
            required
            onChange={handleInputChange}
          >
            <option value="">選択してください</option>
            {prefectures.map((prefecture) => (
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
            name="locationDetails"
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
            name="deliveryPrefecture"
            required
            onChange={handleInputChange}
          >
            <option value="">選択してください</option>
            {prefectures.map((prefecture) => (
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
            name="deliveryDetails"
            placeholder="例）東京ビッグサイト"
            autoComplete="off"
            onChange={handleInputChange}
          />
        </Form.Group>

        {/* アイテムリストの動的追加 */}
        {form.items.map((item, index) => (
          <div key={index}>
            <Form.Group className="mb-3">
              <AppTextInput
                label={`欲しいもの${index + 1}`}
                type="text"
                name={`item${index + 1}`}
                placeholder="例）***のTシャツ"
                autoComplete="off"
                onChange={(e) =>
                  handleItemChange(index, 'name', e.target.value)
                }
              />
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
          </div>
        ))}

        <div className="text-end mb-3">
          <AppButton
            text="追加"
            onClick={addField}
            className="outline-info"
            variant="outline-info"
          />
        </div>

        <Form.Group className="mb-3">
          <AppTextInput
            label="詳細情報"
            type="textarea"
            name="details"
            placeholder={`例）〇〇フェスで手に入る限定グッズをお願いしたいです。希望するアイテムは以下です。\n\nTシャツ（黒、Lサイズ）`}
            autoComplete="off"
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
