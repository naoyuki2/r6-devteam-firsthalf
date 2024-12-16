import { userSerializer } from '../user/user.serializer'
import { Notification } from './notification.entity'

export const notificationSerializer = (notification: Notification) => ({
  id: notification.id,
  body: notification.body,
  type: notification.type,
  create_at: notification.created_at,
  roomId: notification.roomId,
  isRead: notification.isRead,
  user: userSerializer(notification.user),
})
