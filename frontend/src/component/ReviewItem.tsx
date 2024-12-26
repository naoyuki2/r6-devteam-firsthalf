import { Reviews } from '@/types'
import { AppUserIcon } from '@/component/AppUserIcon'

type ReviewItemProps = {
  review: Reviews
}

export function ReviewItem({ review }: ReviewItemProps) {
  return (
    <div className="d-flex mb-3 align-items-start">
      <div className="me-3">
        {review.sendUser.iconImageUrl ? (
          <img
            src={review.sendUser.iconImageUrl}
            className="rounded-circle"
            style={{ width: '36px', height: '36px' }}
          />
        ) : (
          <AppUserIcon size={36} />
        )}
      </div>

      <div className="flex-grow-1">
        <div className="d-flex mb-2">
          <div className="me-2" style={{ fontSize: '12px' }}>
            {review.sendUser.name}
          </div>
          <span
            className="badge bg-info text-black"
            style={{ fontSize: '10px' }}
          >
            {review.sendUserRole === 'requester' ? '依頼者' : '運び手'}
          </span>
        </div>

        <div
          className="p-2 rounded border"
          style={{
            backgroundColor: '#f8f9fa',
            borderColor: '#ddd',
            borderRadius: '10px',
          }}
        >
          {review.body}
          <small className="text-muted d-block mt-1">
            {new Date(review.created_at).toLocaleString('ja-JP', {
              weekday: 'short',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </small>
        </div>
      </div>
    </div>
  )
}
