import { SearchClient } from '@/features/search'
import TopNav from '@/component/TopNav'
import { Container } from 'react-bootstrap'

export default function Search() {
  return (
    <>
      <TopNav text="検索" />
      <Container>
        <SearchClient />
      </Container>
    </>
  )
}
