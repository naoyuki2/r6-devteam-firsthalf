import Multer from 'multer'
import { Response } from 'express'
import { mkdirSync } from 'fs'
import crypto from 'crypto'
import path from 'path'
import cloudStorage from './cloudStorage'

const FIELD_NAME = 'file' // ※送る側のキー名と同じにすること

export const upload =
  process.env._UPLOAD_TO_CLOUD === '1' ? uploadToCloud : uploadToLocal
function getDestination(folderName: string) {
  return `public/uploads/${folderName}`
}

function getFileName(file: Express.Multer.File) {
  // ランダムなファイル名を生成してそれを返す
  const currentDate = new Date()
  const formattedDate = currentDate
    .toISOString()
    .replace(/[-:T]/g, '')
    .split('.')[0]
  return `${formattedDate}_${crypto.randomBytes(16).toString('hex')}${path.extname(file.originalname)}`
}

function getFilePath(folderName: string, file: Express.Multer.File) {
  return `${getDestination(folderName)}/${getFileName(file)}`
}

function uploadToLocal(
  // Request型を渡すとRequestを拡張していた場合にエラーがでるのでanyにしてます
  req: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  res: Response,
  folderName: string,
): Promise<{ url: string }> {
  const destination = getDestination(folderName)

  mkdirSync(destination, { recursive: true })
  const storage = Multer.diskStorage({
    destination,
    filename: (_req, file, cb) => cb(null, getFileName(file)),
  })

  const multer = Multer({
    storage,
    limits: {
      fileSize: 10 * 1024 * 1024, // no larger than 10MB
    },
  })

  return new Promise((resolve, reject) => {
    multer.single(FIELD_NAME)(req, res, (err: unknown) => {
      if (req.file == null) return reject(new Error('File required'))
      if (err != null) return reject(err)

      const baseURL = req.protocol + '://' + req.get('host')
      resolve({ url: `${baseURL}/${req.file.path}` })
    })
  })
}

function uploadToCloud(
  req: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  res: Response,
  folderName: string,
): Promise<{ url: string; fileName: string }> {
  const storage = Multer.memoryStorage()

  const multer = Multer({
    storage,
    limits: {
      fileSize: 10 * 1024 * 1024, // no larger than 10MB
    },
  })

  return new Promise((resolve, reject) => {
    multer.single(FIELD_NAME)(req, res, (err: unknown) => {
      if (req.file == null) return reject(new Error('File required'))
      if (err) return reject('MulterError: ' + err)

      cloudStorage
        .upload(req.file.buffer, getFilePath(folderName, req.file))
        .then((url) =>
          resolve({
            url,
            fileName: req.file!.originalname,
          }),
        )
        .catch((err) => reject(err))
    })
  })
}
