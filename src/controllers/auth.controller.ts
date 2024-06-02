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

// Validar token
router.get('/validarToken', (req: AuthRequest, res) => {
  const token = req.header('Cookie')?.replace('token=', '')
  if (token != null){
    const result = authService.isValidToken(token)
    res.json(result)
  } else {
    res.json({ success: false, message:'El usuario no ha iniciado sesión' })
  }
  
})

// Cerrar sesión
router.post('/logout', isAuthenticated, (req: AuthRequest, res) => {
  req.user = null
  res.clearCookie('token')
  res.json('Logged out')
})

export default router
