const root = '/api/user'

export type SignUpParams = {
  name: string
  email: string
  password: string
}

export enum UserEndpoint {
  signUp = `${root}`,
  updateUser = `${root}/update`,
  getUserById = `${root}/:id`,
}
