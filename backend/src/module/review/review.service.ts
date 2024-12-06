import { AppDataSource } from '../../app-data-source'
import { role } from '../room_user/room_user.entity'
import { Review } from './review.entity'

type CreateProps = {
  sendUserId: number
  receiveUserId: number
  sendUserRole: role
  body: string
  isGood: boolean
}

const reviewRepository = AppDataSource.getRepository(Review)

export class ReviewService {
  async create({
    sendUserId,
    receiveUserId,
    sendUserRole,
    body,
    isGood,
  }: CreateProps): Promise<void> {
    const createReview = reviewRepository.create({
      send_user: { id: sendUserId },
      receive_user: { id: receiveUserId },
      send_user_role: sendUserRole,
      body: body,
      isGood: isGood,
    })

    await reviewRepository.save(createReview)
  }
}
