import { Reviews } from '@/types'
import { AppUserIcon } from '@/component/AppUserIcon'
import Image from 'next/image'

type ReviewItemProps = {
  review: Reviews
}

export function ReviewItem({ review }: ReviewItemProps) {
  return (
    <div className="d-flex mb-3 align-items-start">
      <div className="me-3">
        {review.sendUser.iconImageUrl ? (
          <Image
            src={review.sendUser.iconImageUrl}
            alt={`${review.sendUser.name}のアイコン画像`}
            width={36}
            height={36}
            className="rounded-circle"
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
          className="p-2 rounded border border-dark"
          style={{
            borderRadius: '12px',
          }}
        >
          {review.body}
          <small className="text-muted d-block mt-1 text-end">
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
