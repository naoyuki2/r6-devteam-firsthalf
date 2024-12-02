import { HouseDoor, PersonCircle, Shop } from 'react-bootstrap-icons'
import { AppLink } from './AppLink'
import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'
import { BadgeModel } from './Appbadge'
import { Thumbnail } from './Thumbnail'

type RequestCardProps = {
  id: number
  userId: number
  username: string
  created_at: Date
  title: string
  description: string
  delivery_prefecture: string
  location_prefecture: string
}

export const RequestCard = ({
  id,
  userId,
  username,
  created_at,
  title,
  delivery_prefecture,
  location_prefecture,
}: RequestCardProps) => {
  return (
    <div
      className="card mb-3 shadow-sm"
      style={{
        borderRadius: '10px',
        overflow: 'hidden',
        padding: '8px',
      }}
    >
      <div className="d-flex justify-content-between align-items-center bg-light">
        <Thumbnail
          className="shadow-sm"
          bg="#87ceeb" //いずれは動的にカラーコードを指定する
          text="Hakobun"
          body={title}
        />
      </div>

      <AppLink href={`/request/${id}`}>
        <div className="mt-2 d-flex" style={{ marginTop: '-15px' }}>
          <div className="d-flex align-items-center justify-content-start">
            <BadgeModel
              bg="info"
              textColor="dark"
              className="px-2 py-1"
              text={`入手場所：${location_prefecture}`}
            />
          </div>
          <div className="d-flex align-items-center ms-2">
            <BadgeModel
              bg="info"
              textColor="dark"
              className="px-2 py-1"
              text={`受け渡し場所：${delivery_prefecture}`}
            />
          </div>
        </div>
        <p className="fw-bold mb-3 mt-2">{title}</p>
        <div className="d-flex justify-content-between align-items-center">
          <AppLink href={`/user/${userId}`}>
            <div className="d-flex align-items-center">
              <PersonCircle size={24} className="me-3 dark" />
              <span className="fw-bold" style={{ fontSize: '0.75rem' }}>
                {username}
              </span>
            </div>
          </AppLink>
          <span className="text-muted" style={{ fontSize: '0.75rem' }}>
            {formatDistanceToNow(new Date(created_at), {
              addSuffix: true,
              locale: ja,
            })}
          </span>
        </div>
      </AppLink>
    </div>
  )
}
