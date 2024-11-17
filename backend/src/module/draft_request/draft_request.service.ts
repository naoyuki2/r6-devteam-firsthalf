import { AppDataSource } from '../../app-data-source'
import { DraftItem } from '../draft_item/draft_item.entity'
import { Item } from '../item/item.entity'
import { Room } from '../room/room.entity'
import { DraftRequest } from './draft_request.entity'
import { ProposeUpBody } from './draft_request.type'

const draftRequestRepository = AppDataSource.getRepository(DraftRequest)

export class DraftRequestService {
  async create(room: Room): Promise<DraftRequest> {
    const draftRequest = RequestToDraftRequest(room)
    return await draftRequestRepository.save(draftRequest)
  }

  async proposeUpdate(
    requestId: number,
    body: ProposeUpBody,
    items: DraftItem[] | undefined,
  ): Promise<DraftRequest> {
    const existingDraftRequest = await draftRequestRepository.findOne({
      where: { id: requestId },
      relations: ['draft_items', 'room'],
    })

    if (!existingDraftRequest) {
      throw new Error(`DraftRequest with id ${requestId} not found`)
    }
    if (body.title !== undefined) existingDraftRequest.title = body.title
    if (body.location_prefecture !== undefined)
      existingDraftRequest.location_prefecture = body.location_prefecture
    if (body.location_details !== undefined)
      existingDraftRequest.location_details = body.location_details
    if (body.delivery_prefecture !== undefined)
      existingDraftRequest.delivery_prefecture = body.delivery_prefecture
    if (body.delivery_details !== undefined)
      existingDraftRequest.delivery_details = body.delivery_details
    if (body.description !== undefined)
      existingDraftRequest.description = body.description

    if (items !== undefined) {
      existingDraftRequest.draft_items = items.map((item) => {
        const draftItem = new DraftItem()
        draftItem.name = item.name
        draftItem.quantity = item.quantity
        draftItem.price = item.price
        return draftItem
      })
    }
    const newDraftRequest = draftRequestRepository.create({
      ...existingDraftRequest,
      id: undefined,
    })

    return await draftRequestRepository.save(newDraftRequest)
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
