import express from 'express'
import * as authService from '../services/authService'

const router = express.Router()

// Iniciar sesión
router.get('/login', (_req, res) => {
  res.send(authService.login())
})

// Cerrar sesión
router.get('/logout', (_req, res) => {
    res.send(authService.logout())
})

export default router