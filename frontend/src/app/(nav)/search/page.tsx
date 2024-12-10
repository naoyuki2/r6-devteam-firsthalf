import { SearchClient } from '@/features/search'
import TopNav from '@/component/TopNav'

export default function Search() {
  return (
    <>
      <TopNav text="検索" />
      <SearchClient />
    </>
  )
}
