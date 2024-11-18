import { AppDataSource } from '../../app-data-source'
import { validateEntity } from '../../utils/validate'
import { Request } from './request.entity'
import { Item } from '../item/item.entity'
import { DraftRequest } from '../draft_request/draft_request.entity'
import { DraftItem } from '../draft_item/draft_item.entity'
import { CustomError } from '../../error/CustomError'
const requestRepository = AppDataSource.getRepository(Request)
const itemRepository = AppDataSource.getRepository(Item)
type GetProps = {
  userId: number | undefined
}

type GetByIdProps = {
  id: number
}

type createProps = {
  title: string
  location_prefecture: string
  location_details: string
  delivery_prefecture: string
  delivery_details: string
  description: string
  status: 'pending' | 'progress' | 'completed'
  userId: number
  items: Item[]
}

type approveProps = {
  request: Request
  draftRequest: DraftRequest
}

export class RequestService {
  async get({ userId }: GetProps): Promise<Request[]> {
    const qb = requestRepository
      .createQueryBuilder('request')
      .leftJoinAndSelect('request.user', 'user')
      .leftJoinAndSelect('request.items', 'items')
      .orderBy('request.id', 'DESC')

    if (userId !== undefined) {
      qb.where('user.id = :userId', { userId })
    }

    return await qb.getMany()
  }

  async getById({ id }: GetByIdProps): Promise<Request> {
    return await requestRepository.findOneOrFail({
      where: { id },
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
      user: { id: userId },
      items,
    })
    await validateEntity(request)
    return await requestRepository.save(request)
  }
  async conclusion({ request, draftRequest }: approveProps): Promise<Request> {
    request.title = draftRequest.title
    request.location_prefecture = draftRequest.location_prefecture
    request.location_details = draftRequest.location_details
    request.delivery_prefecture = draftRequest.delivery_prefecture
    request.delivery_details = draftRequest.delivery_details
    request.description = draftRequest.description
    request.status = 'progress'
    request.items = await this._draftItemToItems(
      request,
      draftRequest.draft_items,
    )

    return await requestRepository.save(request)
  }

  async _draftItemToItems(
    request: Request,
    draftItems: DraftItem[],
  ): Promise<Item[]> {
    const itemIds = request.items.map((item) => item.id)

    if (itemIds.length > 0) {
      await itemRepository.delete(itemIds)
    }
    const newItems = draftItems.map((draftItem) => {
      return itemRepository.create({
        name: draftItem.name,
        quantity: draftItem.quantity,
        price: draftItem.price,
      })
    })

    for (const item of newItems) {
      await validateEntity(item)
    }
    return newItems
  }
}
