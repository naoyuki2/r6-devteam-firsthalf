import Link from 'next/link'

type AppLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
}

export const AppLink = ({ href, children, className }: AppLinkProps) => {
  return (
    <Link
      href={href}
      className={className}
      style={{
        textDecoration: 'none',
        color: '#4b4b4b',
      }}
    >
      {children}
    </Link>
  )
}
