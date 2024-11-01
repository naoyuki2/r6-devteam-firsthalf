import { AppLink } from '@/component/AppLink'
import TopNav from '@/component/TopNav'
import RequestDetailClient from '@/features/requestDetail'
import { apiClient } from '@/lib/axios'
import { Request } from '@/types'
import { Container } from 'react-bootstrap'
import { PersonCircle } from 'react-bootstrap-icons'

export default async function RequestDetail({
  params,
}: {
  params: { id: string }
}) {
  const res = await apiClient.get(`/requests/${params.id}`)
  const { request } = res.data as { request: Request }

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
        {/* 全体の中央寄せを行うd-flex justify-content-centerクラスを追加 */}
        <div className="d-flex justify-content-center">
          <div className="w-75">
            {' '}
            {/* 幅を指定して中央に寄せる */}
            {request.items.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between mb-2"
              >
                <p className="me-4">商品名: {item.name}</p>
                <p className="me-4">個数: {item.quantity}</p>
                <p>価格: ¥{item.price}</p>
              </div>
            ))}
          </div>
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
          <AppLink href={`../user/${request.user.id}`}>
            <PersonCircle
              className="bi bi-person-circle me-3"
              style={{ fontSize: '3rem' }}
            ></PersonCircle>
            <span className="fw-bold my-2">{request.user.name}さん</span>
          </AppLink>
        </div>
        <div className="d-grid gap-2 col-10 mx-auto">
          <RequestDetailClient request={request} />
        </div>
      </Container>
    </>
  )
}
