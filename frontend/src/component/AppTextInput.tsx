import { Form, InputGroup } from 'react-bootstrap'

type AppTextInputProps = {
  label?: string
  type: string
  name: string
  placeholder: string
  autoComplete: string
  onChange: (event: any) => void
  labelClassName?: string
  controlClassName?: string
}

export const AppTextInput = ({
  label,
  labelClassName,
  controlClassName,
  ...props
}: AppTextInputProps) => {
  return (
    <>
      {label && (
        <Form.Label
          className={`border-start border-info border-5 ps-2 fw-bold ${labelClassName}`}
        >
          {label}
        </Form.Label>
      )}
      <Form.Control {...props} className={controlClassName}></Form.Control>
    </>
  )
}
