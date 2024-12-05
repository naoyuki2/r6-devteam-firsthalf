type AppLabelProps = {
  text: string
}

export const AppLabel = ({ text }: AppLabelProps) => {
  return (
    <p className="border-start border-info border-5 ps-2 fw-bold mt-4">
      {text}
    </p>
  )
}
