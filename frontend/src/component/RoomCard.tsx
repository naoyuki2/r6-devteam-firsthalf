import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Thumbnail } from './Thumbnail'
import { AppUserIcon } from './AppUserIcon'
import { AppLink } from '@/component/AppLink'

type RoomCardProps = {
  id: string
  username: string
  created_at: Date
  title: string
  color: string
  message: string
}

export const RoomCard = ({
  id,
  username,
  created_at,
  title,
  color,
  message,
}: RoomCardProps) => {
  return (
    <AppLink href={`/chat/${id}`}>
      <div
        className="card mb-3 shadow-sm p-2"
        style={{
          borderRadius: '10px',
        }}
      >
        <Thumbnail backgroundColor={color} title={title} />
        <p className="fw-bold my-2">{title}</p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <AppUserIcon size={24} />
            <div className="ms-2">
              <div className="fw-bold" style={{ fontSize: '0.75rem' }}>
                {username}
              </div>
              <div
                className="text-muted text-truncate d-inline-block"
                style={{ fontSize: '0.75rem', maxWidth: '290px' }}
              >
                {message}
              </div>
            </div>
          </div>
          <span className="text-muted" style={{ fontSize: '0.75rem' }}>
            {formatDistanceToNow(new Date(created_at), {
              addSuffix: true,
              locale: ja,
            })}
          </span>
        </div>
      </div>
    </AppLink>
  )
}
