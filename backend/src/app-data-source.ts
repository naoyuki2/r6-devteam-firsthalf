import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env._DB_HOST || 'db',
  port: 5432,
  username: process.env._DB_USERNAME || 'postgres',
  password: process.env._DB_PASSWORD || 'password',
  database: process.env._DB_DATABASE || 'mydatabase',
  synchronize: false,
  entities: [process.env._DB_TYPEORM_ENTITIES || 'src/**/*.entity.ts'],
  migrations: [process.env._DB_TYPEORM_MIGRATIONS || 'src/migration/**/*.ts'],
  logging: true,
})
