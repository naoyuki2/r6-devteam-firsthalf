import { Badge } from 'react-bootstrap'

type AppBadgeProps = {
  text: string
  showCloseButton?: boolean
  onClose?: () => void
}

export const AppBadge = ({
  text,
  showCloseButton = false,
  onClose,
}: AppBadgeProps) => {
  return (
    <Badge
      bg="none" // デフォルトだとprimaryになってしまうのでnoneに変更
      className="px-2 py-1 fw-bold"
      style={{ color: '#055160', backgroundColor: '#CFF4FC' }}
    >
      {text}
      {showCloseButton && onClose && (
        <span
          onClick={onClose}
          style={{
            marginLeft: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          ×
        </span>
      )}
    </Badge>
  )
}
