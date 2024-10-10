import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavTop from '../component/nav-top'
import NavBottom from '../component/nav-bottom'

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
      <body
        className={`${notoSansJP.className} d-flex flex-column min-vh-100`}
        style={{ paddingTop: '70px' }}
      >
        <NavTop />
        <main className="flex-fill">{children}</main>
        <NavBottom />
      </body>
    </html>
  )
}
