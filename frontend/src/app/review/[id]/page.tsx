import BottomNav from '@/component/BottomNav'
import TopNav from '@/component/TopNav'
import { ReviewClient } from '@/features/review'
import { Container } from 'react-bootstrap'

export default function Review({ params }: { params: { id: number } }) {
  return (
    <>
      <TopNav isArrowShow={true} text="評価一覧" />
      <Container>
        <ReviewClient userId={params.id} />
      </Container>
      <BottomNav />
    </>
  )
}
