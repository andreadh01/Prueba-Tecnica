import 'reflect-metadata'
import 'dotenv/config'
import { AppDataSource } from './data-source'
import express from 'express'
import cors from 'cors'
import clientesRouter from './controllers/cliente.controller'
import authRouter from './controllers/auth.controller'

export const app = express()

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())

const PORT = 4800

app.use('/auth', authRouter)

app.use('/clientes', clientesRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  AppDataSource.initialize().catch((error) => console.log(error))
})
