import { Badge } from 'react-bootstrap'

type AppBadgeProps = {
  text: string
}

export const AppBadge = ({ text }: AppBadgeProps) => {
  return (
    <>
      <Badge
        bg="none" // デフォルトだとprimaryになってしまうのでnoneに変更
        className="px-2 py-1 fw-bold"
        style={{ color: '#055160', backgroundColor: '#CFF4FC' }}
      >
        {text}
      </Badge>
    </>
  )
}
