import { CheckCircle } from 'react-bootstrap-icons'

type AppCheckProps = {
  color: string
  size: number
  bg?: string
}

export const AppCheck = ({ color, size, bg }: AppCheckProps) => {
  return (
    <CheckCircle
      size={size}
      className={`text-${color} flex-shrink-0 rounded-circle`}
      style={{ background: bg }}
    />
  )
}
