import Link from 'next/link'

type AppLinkProps = {
  href: string
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const AppLink = ({ href, children, className, style }: AppLinkProps) => {
  return (
    <Link
      href={href}
      className={className}
      style={{
        textDecoration: 'none',
        color: '#4b4b4b',
        ...style,
      }}
    >
      {children}
    </Link>
  )
}
