import { Badge } from 'react-bootstrap'

type BadgeProps = {
  className?: string
  bg: string
  textColor?: string
  text: string
}

export const BadgeModel = ({ className, bg, textColor, text }: BadgeProps) => {
  return (
    <>
      <Badge bg={bg} text={textColor} className={className}>
        {text}
      </Badge>
    </>
  )
}
