'use client'

import Image from 'next/image'
import logo from '../../public/logo.png'
import { AppLink } from './AppLink'
import { ArrowLeft } from 'react-bootstrap-icons'
import { usePathname, useRouter } from 'next/navigation'

export default function TopNav() {
  const pathname = usePathname()
  const router = useRouter()
  const isArrowShow =
    /^\/request\/\d+$/.test(pathname) || /^\/user\/\d+$/.test(pathname)
  //下記のルートの際に戻るボタンを配置する
  // request/?
  // user/?

  return (
    <nav className="position-sticky top-0 bg-info shadow px-3 py-2">
      <div className="d-flex justify-content-center">
        {isArrowShow && (
          <ArrowLeft
            onClick={() => router.back()}
            style={{
              position: 'absolute',
              fontSize: '32px',
              left: 16,
              top: 16,
            }}
          />
        )}
        <AppLink href="/">
          <Image src={logo} alt="logo" width={48} height={48} priority={true} />
        </AppLink>
      </div>
    </nav>
  )
}
