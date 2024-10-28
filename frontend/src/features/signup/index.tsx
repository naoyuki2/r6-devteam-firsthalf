'use client'

import { AppAlert } from '@/component/AppAlert'
import { AppButton } from '@/component/AppButton'
import { AppLinkText } from '@/component/AppLinkText'
import { AppTextInput } from '@/component/AppTextInput'
import { apiClient } from '@/lib/axios'
import { SignUpArgs } from '@/types'
import { setItem } from '@/utils/localStorage'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { Form } from 'react-bootstrap'

type Form = {
  name: {
    value: string
  }
  email: {
    value: string
  }
  password: {
    value: string
  }
}

export const SignUpClient = () => {
  const INITIAL_FORM: Form = {
    name: { value: '' },
    email: { value: '' },
    password: { value: '' },
  }

  const router = useRouter()
  const [hasError, setHasError] = useState<boolean>(false)
  const [form, setForm] = useState<Form>(INITIAL_FORM)
  const { name, email, password } = form

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: { value },
    }))
  }

  const handleSignUp = async () => {
    // TODO : バリデーション, ローディング
    const args: SignUpArgs = {
      name: name.value,
      email: email.value,
      password: password.value,
    }
    try {
      const res = await apiClient.post('/user', args)
      if (res == null) return
      setItem('token', res.data.token)
      router.push('/home')
    } catch (e) {
      console.log(e)
      setHasError(true)
    }
  }

  return (
    <>
      <AppAlert
        message="新規登録に失敗しました"
        variant="danger"
        show={hasError}
      />
      <Form>
        <Form.Group controlId="email" className="mb-4">
          <AppTextInput
            label="ユーザーネーム"
            type="text"
            name="name"
            placeholder="sample"
            autoComplete="username"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="email" className="mb-4">
          <AppTextInput
            label="メールアドレス"
            type="email"
            name="email"
            placeholder="hakobun@gmail.com"
            autoComplete="email"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="password" className="mb-4">
          <AppTextInput
            label="パスワード"
            type="password"
            name="password"
            placeholder="********"
            autoComplete="password"
            onChange={handleInputChange}
          />
        </Form.Group>
        <AppButton
          text="新規登録"
          onClick={handleSignUp}
          className="w-100"
          variant="info"
        />
        <AppLinkText
          text="アカウントをお持ちの方はこちら"
          href="/login"
          className="mt-3"
        />
      </Form>
    </>
  )
}
