import axios from 'axios'
import { GetAll } from './request.type'

export const fetchAllRequest = async (): Promise<GetAll.res> => {
  const response = await axios.get(`${GetAll.endpoint}`, {
    baseURL: 'http://localhost:3000', // APIのベースURL
    headers: {
      'Content-Type': 'application/json',
      // Authorization: 'Bearer your_token',
    },
  })

  return response.data // レスポンスデータを返す
}
