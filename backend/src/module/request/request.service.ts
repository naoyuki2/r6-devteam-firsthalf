import { AppDataSource } from '../../app-data-source'
import { validateEntity } from '../../utils/validate'
import { Request } from './request.entity'
import { Item } from '../item/item.entity'
const requestRepository = AppDataSource.getRepository(Request)

type GetByIdProps = {
  id: number
}

type createRequestProps = {
  title: string
  location_prefecture: string
  location_details: string
  delivery_prefecture: string
  delivery_details: string
  description: string
  status: 'pending' | 'progress' | 'completed'
  userId: number
  item: Item[]
}

type createItemProps = {
  items: Item[]
}

export class RequestService {
  async getAll(userId: Number | undefined): Promise<Request[]> {
    const query = requestRepository
      .createQueryBuilder('request')
      .leftJoinAndSelect('request.user', 'user')
      .leftJoinAndSelect('request.items', 'items')
      .orderBy('request.id', 'DESC')

    if (userId !== undefined) {
      query.where('user.id = :userId', { userId })
    }

    return await query.getMany()
  }

  async getUserAll({ id }: GetByIdProps): Promise<Request[]> {
    return await requestRepository
      .createQueryBuilder('request')
      .leftJoinAndSelect('request.user', 'user')
      .leftJoinAndSelect('request.items', 'items')
      .where('user.id = :id', { id })
      .orderBy('request.id', 'DESC')
      .getMany()
  }

  async getById({ id }: GetByIdProps): Promise<Request> {
    return await requestRepository.findOneOrFail({
      where: { id },
      relations: ['user', 'items'],
    })
  }

  async createRequest({
    title,
    location_prefecture,
    location_details,
    delivery_prefecture,
    delivery_details,
    description,
    status,
    userId,
    item,
  }: createRequestProps): Promise<Request> {
    const request = requestRepository.create({
      title,
      location_prefecture,
      location_details,
      delivery_prefecture,
      delivery_details,
      description,
      status,
      user: { id: userId },
      items: item,
    })
    await validateEntity(request)
    return await requestRepository.save(request)
  }

  async createItem({ items }: createItemProps) {
    const item = []

    for (let i: number = 0; i < items.length; i++) {
      const l = items[i]
      item.push(l)
    }

    return item
  }
}
