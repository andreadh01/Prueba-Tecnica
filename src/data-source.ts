import { DataSource } from 'typeorm'
import { Cliente } from './models/cliente'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER ?? 'root',
  password: process.env.MYSQL_PASSWORD ?? '',
  database: process.env.DATABASE ?? 'prueba_tecnica',
  synchronize: true,
  logging: true,
  entities: [Cliente],
  subscribers: [],
  migrations: []
})
