import { CustomError } from '../../error/CustomError'
import { AppDataSource } from '../../app-data-source'
import { DraftItem } from '../draft_item/draft_item.entity'
import { Item } from '../item/item.entity'
import { Room } from '../room/room.entity'
import { DraftRequest } from './draft_request.entity'
import { ProposeUpBody } from './draft_request.type'
import { validateEntity } from '../../utils/validate'

const draftRequestRepository = AppDataSource.getRepository(DraftRequest)

type ProposeUpdateProps = {
  draftRequestId: number
  body: ProposeUpBody
}

export class DraftRequestService {
  async create(room: Room): Promise<DraftRequest> {
    const draftRequest = this._requestToDraftRequest(room)
    return await draftRequestRepository.save(draftRequest)
  }

  async reject(draftRequestId: number): Promise<boolean> {
    await draftRequestRepository.delete(draftRequestId)
    return true
  }

  async proposeUpdate({
    draftRequestId,
    body,
  }: ProposeUpdateProps): Promise<DraftRequest> {
    const draftRequest = await draftRequestRepository.findOne({
      where: { id: draftRequestId },
      relations: ['draft_items', 'room'],
    })

    if (draftRequest == null)
      throw new CustomError(
        `DraftRequest with id ${draftRequestId} not found`,
        404,
      )

    if (body.title !== undefined) draftRequest.title = body.title
    if (body.location_prefecture !== undefined)
      draftRequest.location_prefecture = body.location_prefecture
    if (body.location_details !== undefined)
      draftRequest.location_details = body.location_details
    if (body.delivery_prefecture !== undefined)
      draftRequest.delivery_prefecture = body.delivery_prefecture
    if (body.delivery_details !== undefined)
      draftRequest.delivery_details = body.delivery_details
    if (body.description !== undefined)
      draftRequest.description = body.description

    if (body.draft_items !== undefined) {
      draftRequest.draft_items = body.draft_items.map((item) => {
        const draftItem = new DraftItem()
        draftItem.name = item.name
        draftItem.quantity = item.quantity
        draftItem.price = item.price
        return draftItem
      })
    }
    const newDraftRequest = draftRequestRepository.create({
      ...draftRequest,
      id: undefined,
      draft_items: draftRequest.draft_items.map((item) => ({
        ...item,
        id: undefined,
      })),
      created_at: undefined,
      updated_at: undefined,
    })
    validateEntity(newDraftRequest)
    return await draftRequestRepository.save(newDraftRequest)
  }

  _requestToDraftRequest(room: Room): DraftRequest {
    const draftRequest = new DraftRequest()

    draftRequest.title = room.request.title
    draftRequest.location_prefecture = room.request.location_prefecture
    draftRequest.location_details = room.request.location_details
    draftRequest.delivery_prefecture = room.request.delivery_prefecture
    draftRequest.delivery_details = room.request.delivery_details
    draftRequest.description = room.request.description
    draftRequest.status = room.request.status
    draftRequest.room = room

    draftRequest.draft_items = room.request.items.map(this._itemToDraftItem)

    return draftRequest
  }

  _itemToDraftItem(item: Item): DraftItem {
    const draftItem = new DraftItem()
    draftItem.name = item.name
    draftItem.quantity = item.quantity
    draftItem.price = item.price
    return draftItem
  }
}
