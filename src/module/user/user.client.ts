import { SignUp } from './user.type'
import { axiosInstance } from '../../lib/axios.instance'

export const postSignup = async (body: SignUp.req): Promise<SignUp.res> => {
  const { name, email, password } = body
  const response = await axiosInstance.post(`${SignUp.endpoint}`, {
    name,
    email,
    password,
  })

  return response.data
}
