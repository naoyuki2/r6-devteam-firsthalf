import { AppDataSource } from '../../app-data-source'
import { Request } from './request.entity'

const requestRepository = AppDataSource.getRepository(Request)

export class RequestService {
  async getAll() {
    return requestRepository.find()
  }

  async getOneById(id: number) {
    const request = requestRepository.findOne({ where: { id } })
    if (!request) {
      throw new Error(`Order with id ${id} not found`)
    }
    return request
  }
}
