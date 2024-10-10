const root = '/auth'

export namespace SignIn {
  export const endpoint = root

  export type req = {
    email: string
    password: string
  }

  export type res = {
    user: {
      id: number
      name: string
      email: string
      icon_image_url: string | null
    }
    token: string
  }
}
