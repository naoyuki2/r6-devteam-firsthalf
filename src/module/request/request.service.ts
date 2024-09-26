import { AppDataSource } from '../../app-data-source'
import { Request } from './request.entity'

const requestRepository = AppDataSource.getRepository(Request)

export class RequestService {
  async getAll(): Promise<Request[]> {
    return await requestRepository.find()
  }

  async getOneById(id: number): Promise<Request> {
    const request = await requestRepository.findOne({ where: { id } })
    if (!request) {
      throw new Error(`Order with id ${id} not found`)
    }
    return request
  }
}
