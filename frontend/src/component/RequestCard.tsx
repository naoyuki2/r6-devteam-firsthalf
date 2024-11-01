import { HouseDoor, PersonCircle, Shop } from 'react-bootstrap-icons'
import { AppLink } from './AppLink'

type RequestCardProps = {
  id: number
  userId: number
  username: string
  title: string
  delivery_prefecture: string
  location_prefecture: string
}

export const RequestCard = ({
  id,
  userId,
  username,
  title,
  delivery_prefecture,
  location_prefecture,
}: RequestCardProps) => {
  return (
    <div className="border-bottom border-opacity-25">
      <div className="d-flex">
        <AppLink href={`/user/${userId}`}>
          <PersonCircle size={36} className="me-3 mt-2" />
          <span className="fw-bold my-2 mt-2">{username}</span>
          <span className="ms-auto my-2 mt-2"></span>
        </AppLink>
      </div>
      <AppLink href={`/request/${id}`}>
        <p className="fw-bold text-truncate mb-2">{title}</p>

        <div className="d-flex justify-content-evenly">
          <div className="d-flex align-items-center">
            <div>
              <HouseDoor size={24} className="ms-2" />
              <p className="mb-2">HOME</p>
            </div>
            <span className="ms-3">{delivery_prefecture}</span>
          </div>
          <div className="d-flex align-items-center">
            <div>
              <Shop size={24} className="ms-2" />
              <p className="mb-2">SHOP</p>
            </div>
            <span className="ms-3">{location_prefecture}</span>
          </div>
        </div>
      </AppLink>
    </div>
  )
}
