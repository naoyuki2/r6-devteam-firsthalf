const root = '/user'

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

export namespace GetUser {
  export const endpoint = `${root}`

  export type res = {
    user: {
      id: number
      name: string
      email: string
      icon_image_url: string | null
    }
  }
}

export namespace Update {
  export const endpoint = root

  export type req = {
    inputName: string | undefined
    inputEmail: string | undefined
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
