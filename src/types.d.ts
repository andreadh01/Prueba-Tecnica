import { Request } from 'express'
import { Cliente } from './models/cliente'

export interface CustomResponse<T> {
  success: boolean
  message: string
  status: number
  data: T | null
}

export interface ClienteLogueado extends Cliente {
  token: string
}

interface AuthRequest extends Request {
  user?: any
}
