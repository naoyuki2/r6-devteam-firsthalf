import crypto from 'crypto'

type Header = {
  alg: string
  typ: string
}

type Payload = {
  sub: number
}

const jwtSecret = 'MySuP3R_z3kr3t'

export const generateToken = (userId: number): string => {
  return createJWT(userId, jwtSecret)
}

const createJWT = (userId: number, secret: string): string => {
  const header: Header = { alg: 'HS256', typ: 'JWT' }
  const payload: Payload = { sub: userId }
  const unsignedToken = `${encodeBase64(header)}.${encodeBase64(payload)}`
  const signature = hmacSHA256(secret, unsignedToken)
  return `${unsignedToken}.${signature}`
}

const encodeBase64 = (json: Header | Payload): string => {
  const jsonStr = JSON.stringify(json)
  const jsonB64 = Buffer.from(jsonStr).toString('base64')
  return removePadding(jsonB64)
}

const hmacSHA256 = (key: string, data: string): string => {
  const hash = crypto.createHmac('sha256', key).update(data).digest('base64')
  return removePadding(hash)
}

const removePadding = (value: string): string => {
  return value.replace(/={1,2}$/, '')
}