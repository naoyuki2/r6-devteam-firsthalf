const root = '/user'

export const SignUpEndpoint = root

export type SignUpReq = {
  name: string
  email: string
  password: string
}

export type SignUpRes = {
  user: {
    id: number
    name: string
    email: string
    icon_image_url: string | null
  }
  token: string
}

export const GetEndpoint = `${root}`

export type GetRes = {
  user: {
    id: number
    name: string
    email: string
    icon_image_url: string | null
  }
}

export const GetByIdEndpoint = `${root}/:id`

export type GetByIdParam = {
  id: number
}

export type GetByIdRes = {
  user: {
    id: number
    name: string
    email: string
    icon_image_url: string | null
  }
}

export const UpdateUserParamEndpoint = root

export type UpdateParamReq = {
  inputName: string | undefined
  inputEmail: string | undefined
}

export type UpdateParamRes = {
  user: {
    id: number
    name: string
    email: string
    icon_image_url: string | null
  }
}
