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

export const GetUserEndpoint = `${root}`

export type GetUserRes = {
  user: {
    id: number
    name: string
    email: string
    icon_image_url: string | null
  }
}

export const UpdateUserParamEndpoint = root

export type UpdateUserParamReq = {
  inputName: string | undefined
  inputEmail: string | undefined
}

export type UpdateUserParamRes = {
  user: {
    id: number
    name: string
    email: string
    icon_image_url: string | null
  }
}
