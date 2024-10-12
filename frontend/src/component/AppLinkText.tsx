import Link from 'next/link'

type AppLinkTextProps = {
  text: string
  href: string
  className?: string
}

export const AppLinkText = ({ text, href, className }: AppLinkTextProps) => {
  return (
    <Link href={href} className={`link-dark d-block ${className}`}>
      {text}
    </Link>
  )
}
