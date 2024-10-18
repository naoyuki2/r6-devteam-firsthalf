import { Form, InputGroup } from 'react-bootstrap'

type AppTextAreaProps = {
  label?: string
  name: string
  placeholder: string
  autoComplete: string
  onChange: (event: any) => void
  labelClassName?: string
  controlClassName?: string
  rows?: number
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
