import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'db',
  port: 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'mydatabase',
  synchronize: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migration/**/*.ts'],
  logging: true,
})
