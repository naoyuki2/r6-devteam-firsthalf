const root = '/api/user'

export namespace SignUp {
  export const endpoint = root

  export type req = {
    name: string
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

export namespace GetById {
  export const endpoint = `${root}/:id`

  export type param = {
    id: number
  }

  export type res = {
    user: {
      id: number
      name: string
      email: string
      icon_image_url: string | null
    }
  }
}
