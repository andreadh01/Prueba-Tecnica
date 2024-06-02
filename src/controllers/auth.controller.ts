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
    res.cookie('token', response.data.token,{
      httpOnly: false,
      secure: false, 
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'lax' 
    })
  }
  res.json(response)
}) as RequestHandler)

// Validar token
router.get('/validarToken', (req: AuthRequest, res) => {
  const token = req.header('Cookie')?.replace('token=', '')
  if (token != null){
    const result = authService.isValidToken(token)
    res.json(result)
  } else {
    res.json({ success: false, message: 'El usuario no ha iniciado sesión' })
  }
  
})

// Cerrar sesión
router.post('/logout', isAuthenticated, (req: AuthRequest, res) => {
  req.user = null
  try {
    res.clearCookie('token')
    res.json({ success: true, message: 'User logged out'})
  } catch {
    res.json({ success: false, message: 'Ocurrió un error al intentar cerrar sesión'})

  }
  

})

export default router
