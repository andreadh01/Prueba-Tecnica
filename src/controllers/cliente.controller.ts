import express, { Request, RequestHandler, Response } from 'express'
import * as clienteService from '../services/cliente.service'
import { Cliente } from '../models/cliente'
import { isAuthenticated } from '../middleware/auth.middleware'
import { validationResult } from 'express-validator'
import { validateEditUser, validateUser } from '../middleware/validator.middleware'
import { AuthRequest } from '../types'

const router = express.Router()

// Agregar un cliente, aquí no es necesario el middleware autenticación porque se puede registrar como cliente o ser agregado por un usuario
router.post('/agregar', validateUser, (async (req: Request, res: Response) => {
  const result = validationResult(req)
  if (result.isEmpty()) {
    const cliente: Cliente = req.body
    const response = await clienteService.agregarCliente(cliente)
    res.json(response)
  } else {
    res.json({ success: false, message: result.array() })
  }
}) as RequestHandler)

// Se utiliza el middleware de autenticacion para checar si el usuario tiene una sesión iniciada
// la funcion se llama isUserNotLogged

// Ver todos los clientes
router.get('/', isAuthenticated, (async (_req: Request, res: Response) => {
  const response = await clienteService.getClientes()
  res.json(response)
}) as RequestHandler)

// Ver un cliente por id
router.get('/:id', isAuthenticated, (async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const response = await clienteService.getCliente(id)

  res.json(response)
}) as RequestHandler)

// Eliminar un cliente
router.delete('/eliminar/:id', isAuthenticated, (async (req: AuthRequest, res) => {
  const id = Number(req.params.id)
  const response = await clienteService.eliminarCliente(id)

  if (req.user.id === id && response.success) {
    // Si el usuario eliminado es el mismo al logueado, se elimina su sesión
    req.user = null
    res.clearCookie('token')
    res.json({ success: true, message: 'User logged out' })
  } else {
    res.json(response)
  }
}) as RequestHandler)

// Editar los datos de un cliente
router.put('/editar', isAuthenticated, validateEditUser, (async (req: Request, res: Response) => {
  const result = validationResult(req)

  if (result.isEmpty()) {
    const cliente: Cliente = req.body
    
    const response = await clienteService.editarCliente(cliente)
    res.json(response)
  } else {
    res.json({ success: false, message: result.array() })
  }
}) as RequestHandler)

export default router
