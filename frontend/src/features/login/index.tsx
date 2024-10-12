'use client'

import { AppAlert } from '@/component/AppAlert'
import { AppButton } from '@/component/AppButton'
import { AppLinkText } from '@/component/AppLinkText'
import { AppTextInput } from '@/component/AppTextInput'
import { apiClient } from '@/lib/axios'
import { setItem } from '@/utils/localStorage'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { Form } from 'react-bootstrap'

type Form = {
  email: {
    value: string
  }
  password: {
    value: string
  }
}

export const LoginClient = () => {
  const INITIAL_FORM: Form = {
    email: { value: '' },
    password: { value: '' },
  }

  const router = useRouter()
  const [hasError, setHasError] = useState<boolean>(false)
  const [form, setForm] = useState<Form>(INITIAL_FORM)
  const { email, password } = form

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: { value },
    }))
  }

  const handleLogin = async () => {
    // TODO : バリデーション, ローディング
    const args: any = {
      email: email.value,
      password: password.value,
    }
    try {
      const res = await apiClient.post('/auth', args)
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
        message="ログインに失敗しました"
        variant="danger"
        show={hasError}
      />
      <Form>
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
          text="ログイン"
          onClick={handleLogin}
          className="w-100"
          variant="info"
        />
        <AppLinkText
          text="アカウントをお持ちでない方はこちら"
          href="/signup"
          className="mt-3"
        />
      </Form>
    </>
  )
}
