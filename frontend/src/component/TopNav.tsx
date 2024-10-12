import Image from 'next/image'
import logo from '../../public/logo.png'

export default function TopNav() {
  return (
    <nav className="position-sticky top-0 bg-info shadow px-3 py-2">
      <div className="d-flex justify-content-center">
        <Image src={logo} alt="logo" width={48} height={48} priority={true} />
      </div>
    </nav>
  )
}
