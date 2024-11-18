import { AppDataSource } from '../../app-data-source'
import { DraftItem } from '../draft_item/draft_item.entity'
import { Item } from '../item/item.entity'
import { Room } from '../room/room.entity'
import { DraftRequest } from './draft_request.entity'

const draftRequestRepository = AppDataSource.getRepository(DraftRequest)

export class DraftRequestService {
  async create(room: Room): Promise<DraftRequest> {
    const draftRequest = RequestToDraftRequest(room)
    return await draftRequestRepository.save(draftRequest)
  }

  async reject(draftRequestId: number): Promise<boolean> {
    const draftRequest = await draftRequestRepository.findOne({
      where: { id: draftRequestId },
    })
    if (!draftRequest) {
      return false
    }
    await draftRequestRepository.remove(draftRequest)
    return true
  }

  async approve(roomId: string): Promise<DraftRequest> {
    const qb = draftRequestRepository
      .createQueryBuilder('draft_request')
      .leftJoinAndSelect('draft_request.draft_items', 'draft_items')
      .leftJoinAndSelect('draft_request.room', 'room')
      .where('room.id = :roomId', { roomId })
      .orderBy('draft_request.created_at', 'ASC')
    const draftRequests = await qb.getMany()

    const requestsToDelete = draftRequests.slice(0, -1)
    await draftRequestRepository.remove(requestsToDelete)
    const latestRequest = draftRequests[draftRequests.length - 1]
    latestRequest.action = true
    return await draftRequestRepository.save(latestRequest)
  }
}

function RequestToDraftRequest(room: Room): DraftRequest {
  const draftRequest = new DraftRequest()

  draftRequest.title = room.request.title
  draftRequest.location_prefecture = room.request.location_prefecture
  draftRequest.location_details = room.request.location_details
  draftRequest.delivery_prefecture = room.request.delivery_prefecture
  draftRequest.delivery_details = room.request.delivery_details
  draftRequest.description = room.request.description
  draftRequest.status = room.request.status
  draftRequest.room = room

  draftRequest.draft_items = room.request.items.map(ItemToDraftItem)

  return draftRequest
}

function ItemToDraftItem(item: Item): DraftItem {
  const draftItem = new DraftItem()
  draftItem.name = item.name
  draftItem.quantity = item.quantity
  draftItem.price = item.price
  return draftItem
}
