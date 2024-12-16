import { AppDataSource } from '../../app-data-source'
import { Notification } from './notification.entity'
import { validateEntity } from '../../utils/validate'

const notificationRepository = AppDataSource.getRepository(Notification)

type GetProps = {
  userId: number
}

type ViewProps = {
  userId: number
}

type createProps = {
  userId: number
  roomId: string
  body: string | undefined
  type: 'room' | 'message'
}

export class NotificationService {
  async get({ userId }: GetProps): Promise<Notification[] | undefined> {
    return await notificationRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    })
  }

  async view({ userId }: ViewProps): Promise<Notification[]> {
    const notifications = await notificationRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    })
    for (let i = 0; i < notifications.length; i++) {
      const notification = notifications[i]
      notification.isRead = true
      notifications[i] = notification
    }
    await validateEntity(notifications)
    return await notificationRepository.save(notifications)
  }

  async create({
    userId,
    roomId,
    body,
    type,
  }: createProps): Promise<Notification> {
    if (type == 'room') {
      body = '右下のメッセージアイコンからルームを確認しましょう。'
    }
    const notification = notificationRepository.create({
      body,
      type,
      roomId,
      user: { id: userId },
    })
    await validateEntity(notification)
    return await notificationRepository.save(notification)
  }
}
