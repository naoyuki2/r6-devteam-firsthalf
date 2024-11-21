import { Form } from 'react-bootstrap'

type AppTextInputProps = {
  value?: string | number
  label?: string
  type: string
  name: string
  placeholder: string
  autoComplete: string
  onChange: (changeData: React.ChangeEvent<HTMLInputElement>) => void
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
