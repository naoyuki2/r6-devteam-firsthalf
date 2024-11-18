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
