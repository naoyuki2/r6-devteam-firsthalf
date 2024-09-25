import crypto from 'crypto'

export class Auth {
  private jwtSecret = crypto.randomBytes(64).toString('hex') // JWT秘密鍵を設定

  generateToken(userId: number): string {
    return this.createJWT(userId, this.jwtSecret)
  }

  private createJWT(userId: number, secret: string): string {
    const header: Header = { alg: 'HS256', typ: 'JWT' }
    const payload: Payload = { sub: userId }
    const unsignedToken = `${this.encodeBase64(header)}.${this.encodeBase64(payload)}`
    const signature = this.hmacSHA256(secret, unsignedToken)
    return `${unsignedToken}.${signature}`
  }

  private encodeBase64(json: Header | Payload): string {
    const jsonStr = JSON.stringify(json)
    const jsonB64 = Buffer.from(jsonStr).toString('base64')
    return this.removePadding(jsonB64)
  }

  private hmacSHA256(key: string, data: string): string {
    const hash = crypto.createHmac('sha256', key).update(data).digest('base64')
    return this.removePadding(hash)
  }

  private removePadding(value: string): string {
    return value.replace(/={1,2}$/, '')
  }
}

type Header = {
  alg: string
  typ: string
}

type Payload = {
  sub: number
}
