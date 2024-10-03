import { AppDataSource } from '../../app-data-source'
import { validateEntity } from '../../utils/validate'
import { Request } from './request.entity'

const requestRepository = AppDataSource.getRepository(Request)

type GetByIdProps = {
  id: number
}

type createRequestProps = {
  title: string
  location_prefecture: string
  location_details: string
  delivery_location: string
  delivery_date: string
  description: string
  userId: number
}

export class RequestService {
  async getAll(): Promise<Request[]> {
    return await requestRepository.find()
  }

  async getById({ id }: GetByIdProps): Promise<Request> {
    return await requestRepository.findOneByOrFail({ id })
  }

  async createRequest({
    title,
    location_prefecture,
    location_details,
    delivery_location,
    delivery_date,
    description,
    userId,
  }: createRequestProps): Promise<Request> {
    const request = requestRepository.create({
      title,
      location_prefecture,
      location_details,
      delivery_location,
      delivery_date,
      description,
      user: { id: userId },
    })
    await validateEntity(request)
    return await requestRepository.save(request)
  }
}
