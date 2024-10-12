import BottomNav from '@/component/BottomNav'
import TopNav from '@/component/TopNav'

export default function NavLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      <main className="min-vh-100">{children}</main>
      <BottomNav />
    </>
  )
}
