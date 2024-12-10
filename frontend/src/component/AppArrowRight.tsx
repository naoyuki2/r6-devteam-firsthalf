import { ArrowRight } from 'react-bootstrap-icons'

type AppArrowRightProps = {
  color: string
  size: number
}

export const AppArrowRight = ({ color, size }: AppArrowRightProps) => {
  return <ArrowRight size={size} className={`text-${color} flex-shrink-0`} />
}
