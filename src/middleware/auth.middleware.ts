import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { AuthRequest } from '../types'

export const isAuthenticated: RequestHandler = (req: AuthRequest, res, next) => {
  const token = req.header('Cookie')?.replace('token=', '')
  if (token != null) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
      // Si la función arroja un error se irá al catch
      req.user = decode
      next()
    } catch (err: any) {
      res.json(err.message.toString())
    }
  } else {
    res.json('Not loogged in')
  }
}

export const isNotAuthenticated: RequestHandler = (req, res, next) => {
  const token = req.header('Cookie')?.replace('token=', '')
  if (token == null) {
    next()
  } else {
    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY as string)
      // Si la función arroja un error se irá al catch
      res.json('Loogged in')
    } catch (err: any) {
      res.json(err.message.toString())
    }

  }
}
