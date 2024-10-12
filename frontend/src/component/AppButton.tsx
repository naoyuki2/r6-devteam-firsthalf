import { Button, ButtonProps } from 'react-bootstrap'

type AppButtonProps = {
  text: string
  onClick: (event: any) => void
  className?: string
} & ButtonProps

export const AppButton = ({
  text,
  onClick,
  className,
  ...bootstrapProps
}: AppButtonProps) => {
  return (
    <Button className={className} onClick={onClick} {...bootstrapProps}>
      {text}
    </Button>
  )
}
