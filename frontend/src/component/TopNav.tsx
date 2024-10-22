import Image from 'next/image'
import logo from '../../public/logo.png'
import { AppLink } from './AppLink'

export default function TopNav() {
  return (
    <nav className="position-sticky top-0 bg-info shadow px-3 py-2">
      <div className="d-flex justify-content-center">
        <AppLink href="/">
          <Image src={logo} alt="logo" width={48} height={48} priority={true} />
        </AppLink>
      </div>
    </nav>
  )
}
