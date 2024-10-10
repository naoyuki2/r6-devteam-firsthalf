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
  delivery_location: string
  delivery_date: string
  description: string
  userId: number
  item: Item[]
}

type createItemProps = {
  items: Item[]
}

export class RequestService {
  async getAll(): Promise<Request[]> {
    return await requestRepository.find({
      relations: ['user', 'items'],
    })
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
    delivery_location,
    delivery_date,
    description,
    userId,
    item,
  }: createRequestProps): Promise<Request> {
    const request = requestRepository.create({
      title,
      location_prefecture,
      location_details,
      delivery_location,
      delivery_date,
      description,
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
