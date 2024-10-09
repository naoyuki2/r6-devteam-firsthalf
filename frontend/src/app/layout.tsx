import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({ subsets: ['latin'], weight: ['400'] })

export const metadata: Metadata = {
  title: 'Hakobun',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.className}`}>{children}</body>
    </html>
  )
}
