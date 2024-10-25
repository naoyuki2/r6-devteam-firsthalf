'use client'

import TopNav from '@/component/TopNav'
import { apiClient } from '@/lib/axios'
import { Container } from 'react-bootstrap'
import { PersonCircle } from 'react-bootstrap-icons'
import { useRouter } from 'next/navigation' // ページ遷移用

export default async function RequestDetail({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()

  // リクエスト詳細を取得
  const res = await apiClient.get(`/requests/${params.id}`) // ダイナミックルーティングでやるよ
  const { request } = res.data

  // チャットルーム作成APIを呼び出す関数
  const requestCreateRoom = async () => {
    const args: any = {
      requestId: request.id,
      requestUserId: request.user.id,
    }

    // トークンの取得
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('Token is missing')
      return
    }

    const res = await apiClient.post('/rooms', args, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    router.push('/chat')
  }

  return (
    <>
      <TopNav />
      <Container>
        <h2 className="d-flex justify-content-center my-3">{request.title}</h2>

        <p className="border-start border-info border-5 ps-2 fw-bold ms-4 my-2">
          入手場所
        </p>
        <div
          className="d-flex justify-content-center w-auto mb-3"
          style={{ width: '200px' }}
        >
          {request.location_prefecture}: {request.location_details}
        </div>

        <p className="border-start border-info border-5 ps-2 fw-bold ms-4 my-2">
          受け渡し場所
        </p>
        <div
          className="d-flex justify-content-center w-auto mb-3"
          style={{ width: '200px' }}
        >
          {request.delivery_prefecture}: {request.delivery_details}
        </div>

        <p className="border-start border-info border-5 ps-2 fw-bold ms-4 my-2">
          欲しいもの
        </p>
        <div className="d-flex justify-content-center w-auto mx-5 mb-3">
          {request.items.map((item: any) => (
            <div key={item.id} className="text-container">
              <p>商品名: {item.name}</p>
              <div className="">
                <p className="mx-3">個数: {item.quantity}</p>
                <p className="mx-3">価格: ¥{item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="border-start border-info border-5 ps-2 fw-bold ms-4 my-2">
          詳細情報
        </p>
        <div className="d-flex justify-content-center w-auto mx-5 mb-3">
          <div className="text-container">{request.description}</div>
        </div>
        <p className="border-start border-info border-5 ps-2 fw-bold ms-4 my-2">
          投稿者
        </p>
        <div className="d-flex justify-content-center w-auto mb-3">
          <PersonCircle
            className="bi bi-person-circle me-3"
            style={{ fontSize: '3rem' }}
          ></PersonCircle>
          <span className="fw-bold my-2">{request.user.name}さん</span>
        </div>
        <div className="d-grid gap-2 col-10 mx-auto">
          <button className="btn btn-info" type="button">
            チャットする
          </button>
          {/* AppButtonを使用したいがOnClickのせいでエラーが出ます */}
        </div>
      </Container>
    </>
  )
}
