const root = '/auth'

export const SignInEndpoint = root

export type SignInReq = {
  email: string
  password: string
}

export type SignInRes = {
  user: {
    id: number
    name: string
    email: string
    icon_image_url: string | null
  }
  token: string
}
