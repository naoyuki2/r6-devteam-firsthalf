import { Badge } from 'react-bootstrap'

type AppBadgeProps = {
  text: string
  onClose: () => void
}

export const AppBadge = ({ text, onClose }: AppBadgeProps) => {
  return (
    <>
      <Badge
        bg="none" // デフォルトだとprimaryになってしまうのでnoneに変更
        className="px-2 py-1 fw-bold"
        style={{ color: '#055160', backgroundColor: '#CFF4FC' }}
      >
        {text}
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
      </Badge>
    </>
  )
}
