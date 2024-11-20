import { Form } from 'react-bootstrap'

type AppTextAreaProps = {
  label?: string
  name: string
  value?: string
  placeholder: string
  autoComplete: string
  onChange: (changeData: React.ChangeEvent<HTMLInputElement>) => void
  labelClassName?: string
  controlClassName?: string
  rows?: number
  disabled?: boolean
  style?: React.CSSProperties
}

export const AppTextArea = ({
  label,
  labelClassName,
  controlClassName,
  rows = 3,
  ...props
}: AppTextAreaProps) => {
  return (
    <>
      {label && (
        <Form.Label
          className={`border-start border-info border-5 ps-2 fw-bold ${labelClassName}`}
        >
          {label}
        </Form.Label>
      )}
      <Form.Control
        as="textarea"
        rows={rows}
        className={controlClassName}
        {...props}
      />
    </>
  )
}
