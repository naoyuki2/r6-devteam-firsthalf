// TODO : 数秒後に自動で消えるようにする
import { Alert, AlertProps } from 'react-bootstrap'

type AppAlertProps = {
  message: string
  className?: string
} & AlertProps

export const AppAlert = ({
  message,
  className,
  ...bootstrapProps
}: AppAlertProps) => {
  return (
    <Alert
      className={`position-absolute top-0 end-0 m-3 ${className}`}
      {...bootstrapProps}
    >
      {message}
    </Alert>
  )
}
