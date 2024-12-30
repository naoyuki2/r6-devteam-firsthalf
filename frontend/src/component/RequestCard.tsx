import { AppLink } from './AppLink'
import { formatDistanceToNow } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Thumbnail } from './Thumbnail'
import { AppBadge } from './Appbadge'
import { AppUserIcon } from './AppUserIcon'

type RequestCardProps = {
  id: number
  username: string
  created_at: Date
  title: string
  description: string
  delivery_prefecture: string
  location_prefecture: string
  color: string
  userId: number
}

export const RequestCard = ({
  id,
  username,
  created_at,
  title,
  delivery_prefecture,
  location_prefecture,
  color,
  userId,
}: RequestCardProps) => {
  return (
    <AppLink href={`/request/${id}`}>
      <div
        className="card mb-3 shadow-sm p-2"
        style={{
          borderRadius: '10px',
        }}
      >
        <Thumbnail backgroundColor={color} title={title} />
        <div
          className="mt-2 d-flex"
          style={{
            gap: '8px',
          }}
        >
          <AppBadge text={`入手場所：${location_prefecture}`} />
          <AppBadge text={`受け渡し場所：${delivery_prefecture}`} />
        </div>
        <p className="fw-bold my-2">{title}</p>
        <div className="d-flex justify-content-between align-items-center">
          <AppLink
            href={`../review/${userId}`}
            className="d-flex align-items-center"
          >
            <AppUserIcon size={24} />
            <span className="fw-bold ms-2" style={{ fontSize: '0.75rem' }}>
              {username}
            </span>
          </AppLink>
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
