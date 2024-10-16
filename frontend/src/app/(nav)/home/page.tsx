import { AppLink } from '@/component/AppLink'
import { apiClient } from '@/lib/axios'
import Link from 'next/link'
import { Container } from 'react-bootstrap'
import { HouseDoor, PersonCircle, Shop } from 'react-bootstrap-icons'
type Request = {
  id: number
  title: string
  location_prefecture: string
  location_details: string
  delivery_prefecture: string
  delivery_details: string
  description: string
  status: string
  completed_at: Date
  created_at: Date
  updated_at: Date
  user: {
    id: number
    name: string
    email: string
    icon_image_url: string
  }
  items: {
    id: number
    name: string
    quantity: number
    price: number
  }[]
}

export default async function Home() {
  const res = await apiClient.get('/requests')
  const requests: Request = res.data[0]
  console.log(res.data)
  if (!res) return <></>

  return (
    <Container>
      <AppLink href="#">
        <div className="border-bottom border-opacity-25">
          <div className="d-flex">
            <PersonCircle size={36} className="me-3 mt-2" />
            <span className="fw-bold my-2 mt-2">{requests.id}</span>
            <span className="ms-auto my-2 mt-2"></span>
          </div>
          <p className="fw-bold text-truncate mb-2">title</p>

          <div className="d-flex justify-content-evenly">
            <div className="d-flex align-items-center">
              <div>
                <HouseDoor size={24} className="ms-2" />
                <p className="mb-2">HOME</p>
              </div>
              <span className="ms-3">delivery_prefecture</span>
            </div>
            <div className="d-flex align-items-center">
              <div>
                <Shop size={24} className="ms-2" />
                <p className="mb-2">SHOP</p>
              </div>
              <span className="ms-3">location_prefecture</span>
            </div>
          </div>
        </div>
      </AppLink>
    </Container>
  )
}
