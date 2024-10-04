import { GetAll, GetById } from './request.type'
import { axiosInstance } from '../../lib/axios.instance'

export const getAllRequest = async (): Promise<GetAll.res> => {
  const response = await axiosInstance.get(`${GetAll.endpoint}`)

  return response.data
}

export const GetByIdRequest = async (id: number): Promise<GetById.res> => {
  const response = await axiosInstance.get(GetById.endpoint(id))

  return response.data
}
