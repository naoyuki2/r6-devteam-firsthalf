import { AppDataSource } from '../../app-data-source'
import { Request } from './request.entity'

const requestRepository = AppDataSource.getRepository(Request)

type GetByIdProps = {
  id: number
}

export class RequestService {
  async getAll(): Promise<Request[]> {
    return await requestRepository.find({
      relations: ['user'],
    })
  }

  async getById({ id }: GetByIdProps): Promise<Request> {
    return await requestRepository.findOneByOrFail({ id })
  }
}
