import { userSerializer } from '../user/user.serializer'
import { Review } from './review.entity'

export const reviewSerializer = (review: Review) => ({
  id: review.id,
  sendUser: userSerializer(review.send_user),
  sendUserRole: review.send_user_role,
  body: review.body,
  isGood: review.isGood,
  created_at: review.created_at,
})
