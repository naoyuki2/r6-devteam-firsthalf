import { Person } from 'react-bootstrap-icons'

type AppUserIconProps = {
  size: number
}

export const AppUserIcon = ({ size }: AppUserIconProps) => {
  return (
    <Person
      size={size}
      className="rounded-circle border border-secondary p-1"
    />
  )
}
