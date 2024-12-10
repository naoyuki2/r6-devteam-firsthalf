import { AppDataSource } from '../../app-data-source'
import { validateEntity } from '../../utils/validate'
import { Request } from './request.entity'
import { Item } from '../item/item.entity'
import { DraftRequest } from '../draft_request/draft_request.entity'
import { DraftItem } from '../draft_item/draft_item.entity'
const requestRepository = AppDataSource.getRepository(Request)
const itemRepository = AppDataSource.getRepository(Item)
type GetProps = {
  status?: 'pending' | 'progress' | 'completed'
  userId?: number
  location_prefecture?: string
  delivery_prefecture?: string
}

type createProps = {
  title: string
  location_prefecture: string
  location_details: string
  delivery_prefecture: string
  delivery_details: string
  description: string
  status: 'pending' | 'agreed' | 'received' | 'completed'
  color: string
  userId: number
  items: Item[]
}

type conclusionProps = {
  request: Request
  draftRequest: DraftRequest
}

type AgreedProps = {
  requestId: number
}

type ReceivedProps = {
  requestId: number
}

type CompletedProps = {
  requestId: number
}

export class RequestService {
  async get({
    userId,
    status,
    location_prefecture,
    delivery_prefecture,
  }: GetProps): Promise<Request[]> {
    const qb = requestRepository
      .createQueryBuilder('request')
      .leftJoinAndSelect('request.user', 'user')
      .leftJoinAndSelect('request.items', 'items')
      .orderBy('request.id', 'DESC')

    if (userId !== undefined) {
      qb.where('user.id = :userId', { userId })
    }

    if (status !== undefined) {
      qb.where('status = :status', { status })
    }

    if (location_prefecture !== 'null' && location_prefecture !== undefined) {
      qb.where('location_prefecture = :location_prefecture', {
        location_prefecture,
      })
    }

    if (delivery_prefecture !== 'null' && delivery_prefecture !== undefined) {
      qb.where('delivery_prefecture = :delivery_prefecture', {
        delivery_prefecture,
      })
    }

    return await qb.getMany()
  }

  async getByRequestId(requestId: number): Promise<Request> {
    return await requestRepository.findOneOrFail({
      where: { id: requestId },
      relations: ['user', 'items'],
    })
  }

  async create({
    title,
    location_prefecture,
    location_details,
    delivery_prefecture,
    delivery_details,
    description,
    status,
    color,
    userId,
    items,
  }: createProps): Promise<Request> {
    const request = requestRepository.create({
      title,
      location_prefecture,
      location_details,
      delivery_prefecture,
      delivery_details,
      description,
      status,
      color,
      user: { id: userId },
      items,
    })
    await validateEntity(request)
    return await requestRepository.save(request)
  }

  async agreed({ requestId }: AgreedProps): Promise<Request> {
    const request = await requestRepository.findOneOrFail({
      where: { id: requestId },
      relations: ['user', 'items'],
    })
    request.status = 'agreed'
    await validateEntity(request)
    return await requestRepository.save(request)
  }

  async received({ requestId }: ReceivedProps): Promise<Request> {
    const request = await requestRepository.findOneOrFail({
      where: { id: requestId },
      relations: ['user', 'items'],
    })
    request.status = 'received'
    await validateEntity(request)
    return await requestRepository.save(request)
  }

  async concluded({
    request,
    draftRequest,
  }: conclusionProps): Promise<Request> {
    request.title = draftRequest.title
    request.location_prefecture = draftRequest.location_prefecture
    request.location_details = draftRequest.location_details
    request.delivery_prefecture = draftRequest.delivery_prefecture
    request.delivery_details = draftRequest.delivery_details
    request.description = draftRequest.description
    request.status = 'agreed'
    request.items = await this._draftItemToItems(
      request,
      draftRequest.draft_items,
    )
    await validateEntity(request)
    return await requestRepository.save(request)
  }

  async completed({ requestId }: CompletedProps): Promise<Request> {
    const request = await requestRepository.findOneOrFail({
      where: { id: requestId },
      relations: ['user', 'items'],
    })
    request.status = 'completed'
    await validateEntity(request)
    return await requestRepository.save(request)
  }

  async _draftItemToItems(
    request: Request,
    draftItems: DraftItem[],
  ): Promise<Item[]> {
    const itemIds = request.items.map((item) => item.id)

    if (itemIds.length > 0) await itemRepository.delete(itemIds)

    return draftItems.map((draftItem) => {
      return itemRepository.create({
        name: draftItem.name,
        quantity: draftItem.quantity,
        price: draftItem.price,
      })
    })
  }
}
