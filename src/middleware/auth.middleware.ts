import { RequestHandler } from 'express'
import { AuthRequest } from '../types'
import { isValidToken } from '../services/auth.service'

export const isAuthenticated: RequestHandler = (req: AuthRequest, res, next) => {
  const token = req.header('Cookie')?.replace('token=', '')
  if (token != null) {
    const result = isValidToken(token)
    if (result.success) {
      req.user = result.data
      next()
    } else {
      res.json(result)
    }
  } else {
    res.json({ success: false, message:'El usuario no ha iniciado sesión' })
  }
}

export const isNotAuthenticated: RequestHandler = (req: AuthRequest, res, next) => {
  const token = req.header('Cookie')?.replace('token=', '')
  if (token == null) {
    next()
  } else {
    const result = isValidToken(token)
    if (result.success) {
      req.user = result.data
      res.json({ success: false, message:'El usuario tiene una sesión iniciada' })
    } else {
      res.json(result)
    }
  }
}
