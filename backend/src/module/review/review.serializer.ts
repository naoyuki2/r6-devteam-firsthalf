import { userSerializer } from '../user/user.serializer'
import { Review } from './review.entity'

export const reviewSerializer = (review: Review) => ({
  id: review.id,
  sendUser: userSerializer(review.send_user),
  sendRole: review.send_user_role,
  body: review.body,
  created_at: review.created_at,
})
