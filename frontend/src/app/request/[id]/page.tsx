import { AppLink } from '@/component/AppLink'
import TopNav from '@/component/TopNav'
import RequestDetailClient from '@/features/requestDetail'
import { apiClient } from '@/lib/axios'
import { Request } from '@/types'
import { Container } from 'react-bootstrap'
import { PersonCircle } from 'react-bootstrap-icons'
import { RequestCard } from '@/component/RequestCard'

// 三桁区切り
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('ja-JP').format(value)
}

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
      <Container
        style={{
          paddingBottom: '80px',
        }}
      >
        <div
          className="mb-4"
          style={{
            marginTop: '16px',
          }}
        >
          <RequestCard
            id={request.id}
            username={request.user.name}
            created_at={request.created_at}
            title={request.title}
            description={request.description}
            delivery_prefecture={request.delivery_prefecture}
            location_prefecture={request.location_prefecture}
            color={request.color} // 必要に応じて他のプロパティも渡す
          />
        </div>

        <p className="border-start border-info border-5 ps-2 fw-bold ms-2">
          依頼する商品
        </p>
        <div className="ms-2" style={{ marginBottom: '16px' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
            }}
          >
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
                    border: '1px solid #B3B3B3',
                    textAlign: 'center',
                    padding: '8px',
                  }}
                >
                  商品名
                </th>
                <th
                  style={{
                    border: '1px solid #B3B3B3',
                    textAlign: 'center',
                    padding: '8px',
                  }}
                >
                  単価
                </th>
                <th
                  style={{
                    border: '1px solid #B3B3B3',
                    textAlign: 'center',
                    padding: '8px',
                  }}
                >
                  個数
                </th>
                <th
                  style={{
                    border: '1px solid #B3B3B3',
                    textAlign: 'center',
                    padding: '8px',
                  }}
                >
                  金額
                </th>
              </tr>
            </thead>
            <tbody
              style={{
                fontSize: '14px',
              }}
            >
              {request.items.map((item) => (
                <tr key={item.id}>
                  <td
                    style={{
                      border: '1px solid #dee2e6',
                      textAlign: 'left',
                      padding: '8px',
                    }}
                  >
                    {item.name}
                  </td>
                  <td
                    style={{
                      border: '1px solid #dee2e6',
                      textAlign: 'right',
                      padding: '8px',
                    }}
                  >
                    ¥{formatCurrency(item.price)}
                  </td>
                  <td
                    style={{
                      border: '1px solid #dee2e6',
                      textAlign: 'right',
                      padding: '8px',
                    }}
                  >
                    {item.quantity}
                  </td>
                  <td
                    style={{
                      border: '1px solid #dee2e6',
                      textAlign: 'right',
                      padding: '8px',
                    }}
                  >
                    ¥{formatCurrency(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
              {/* 合計 */}
              <tr>
                <td
                  colSpan={4}
                  style={{
                    textAlign: 'right',

                    padding: '8px',
                    border: '1px solid #dee2e6',
                  }}
                >
                  ¥
                  {formatCurrency(
                    request.items.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="border-start border-info border-5 ps-2 fw-bold ms-2">
          詳細情報
        </p>
        <div className="mt-3 ms-3">
          <p className="fw-bold">■ 入手場所</p>
          <p>
            {request.location_prefecture}: {request.location_details}
          </p>
          <p className="fw-bold">■ 受け渡し場所</p>
          <p>
            {request.delivery_prefecture}: {request.delivery_details}
          </p>
          <p className="fw-bold">■ 備考</p>
          <p>{request.description}</p>
        </div>
        <p className="border-start border-info border-5 ps-2 fw-bold ms-2">
          依頼者
        </p>
        <div className="d-flex justify-content-center w-auto mb-3">
          <AppLink href={`../user/${request.user.id}`}>
            <PersonCircle
              className="bi bi-person-circle me-3"
              style={{ fontSize: '3rem' }}
            ></PersonCircle>
            <span className="fw-bold my-2">{request.user.name}</span>
          </AppLink>
        </div>
        <div
          style={{
            position: 'fixed',
            bottom: '0px',
            left: '0',
            width: '100%',
            zIndex: 1000,

            padding: '8px 0',
          }}
        >
          <div className="d-grid gap-2 col-10 mx-auto">
            <RequestDetailClient request={request} />
          </div>
        </div>
      </Container>
    </>
  )
}
