import Multer from 'multer'
import { Request, Response } from 'express'
import { mkdirSync } from 'fs'
import cloudStorage from './cloudStorage'

const FIELD_NAME = 'file' // ※送る側のキー名と同じにすること

export const upload =
  process.env._UPLOAD_TO_CLOUD === '1' ? uploadToCloud : uploadToLocal
function getDestination(folderName: string) {
  return `public/uploads/${folderName}`
}

function getFileName(file: Express.Multer.File) {
  // 日本語文字化け対策で、フロント側npm i multerでファイル名をエンコードしているため
  const fileName = decodeURIComponent(file.originalname)
  return `${Date.now()}-${fileName}`
}

function getFilePath(folderName: string, file: Express.Multer.File) {
  return `${getDestination(folderName)}/${getFileName(file)}`
}

function uploadToLocal(
  req: Request,
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
  req: Request,
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
