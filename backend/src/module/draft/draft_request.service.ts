import { AppDataSource } from '../../app-data-source'
import { Request } from '../request/request.entity'
const requestRepository = AppDataSource.getRepository(Request)

type createProps = {
  requestId: number
}

export class DraftRequestService {
  async create({ requestId }: createProps): Promise<any> {
    //entityが完成したら変更
    const request = await requestRepository.findOneOrFail({
      where: { id: requestId },
    })

    return request
  }
}
