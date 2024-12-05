import TopNav from '@/component/TopNav'
import { HomeClient } from '@/features/home'

export default async function Home() {
  return (
    <>
      <TopNav isLogoShow={true} />
      <HomeClient />
    </>
  )
}
