import { Storage, Bucket, GetSignedUrlConfig } from '@google-cloud/storage'

let storage: Storage
let bucket: Bucket
const BUCKET_NAME = process.env._BUCKET_NAME

try {
  storage = new Storage({
    projectId: process.env._PROJECT_ID,
    keyFilename:
      process.env.NODE_ENV === 'production' ? undefined : 'gcs-key.json',
  })

  bucket = storage.bucket(BUCKET_NAME ?? '')
} catch (e) {
  if (process.env._UPLOAD_TO_CLOUD === '1') {
    throw new Error('エラーが発生しました')
  }
}

export default {
  upload: (buffer: Buffer, path: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (storage == null || bucket == null) {
        return reject('Failed to setup Cloud Storage')
      }
      const blob = bucket.file(path)
      const blobStream = blob.createWriteStream()
      blobStream.on('error', reject)
      blobStream.on('finish', () => {
        resolve(getPublicUrl(blob.name))
      })
      blobStream.end(buffer)
    })
  },
  generateSignedUrl: async (url: string) => {
    if (!isCloudStorageUrl(url)) return url
    const options: GetSignedUrlConfig = {
      version: 'v2',
      action: 'read',
      expires: Date.now() + 1000 * 60 * 60,
    }
    const filename = getFilename(url)
    const [signedUrl] = await bucket.file(filename).getSignedUrl(options)
    return signedUrl
  },
}

const backetUrl = `https://storage.googleapis.com/${BUCKET_NAME}`

export function getPublicUrl(filename: string) {
  return `${backetUrl}/${filename}`
}

function isCloudStorageUrl(url: string) {
  return url.match(backetUrl) != null
}

function getFilename(url: string) {
  const regexp = new RegExp(`${backetUrl}/(.*)`)
  const match = url.match(regexp)
  if (!match) throw Error('Url is invalid')

  return url.match(regexp) ? match[1] : url
}
