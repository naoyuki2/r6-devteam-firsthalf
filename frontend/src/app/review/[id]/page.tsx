import { ReviewClient } from '@/features/review'
import { Container } from 'react-bootstrap'

export default function Review({ params }: { params: { id: number } }) {
  return (
    <Container>
      <ReviewClient userId={params.id} />
    </Container>
  )
}
