import { GetEndpoint } from '../request/request.type'

const root = '/media'

export const MediaEndpoint = root
export type MediaResponse = {
  imageUrl: string
}
