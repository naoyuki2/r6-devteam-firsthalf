import BottomNav from '@/component/BottomNav'

export default function NavLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="min-vh-100">{children}</main>
      <BottomNav />
    </>
  )
}
