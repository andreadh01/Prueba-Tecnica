import express, { RequestHandler } from 'express'
import * as authService from '../services/auth.service'
import { isAuthenticated, isNotAuthenticated } from '../middleware/auth.middleware'
import { AuthRequest } from '../types'
const router = express.Router()

// Iniciar sesión
router.post('/login', isNotAuthenticated, (async (req, res) => {
  const { email, password } = req.body
  const response = await authService.login(email, password)
  if (response.data != null) {
    res.cookie('token', response.data.token)
  }
  res.status(response.status).json(response)
}) as RequestHandler)

// Cerrar sesión
router.post('/logout', isAuthenticated, (req: AuthRequest, res) => {
  req.user = null
  res.clearCookie('token')
  res.json('Logged out')
})

export default router
