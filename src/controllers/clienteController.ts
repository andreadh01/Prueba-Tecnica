import express, { Request, RequestHandler, Response } from 'express'
import * as clienteService from '../services/clienteService'
import { Cliente } from '../models/cliente'
import { isUserNotLogged } from '../middleware/auth.middleware'
import { validationResult } from 'express-validator'
import { validateUser } from '../middleware/validator.middleware'

const router = express.Router()

// Agregar un cliente, aquí no es necesario el middleware autenticación porque se puede registrar como cliente o ser agregado por un usuario
router.post('/agregar', validateUser, (async (req: Request, res: Response) => {
  const result = validationResult(req)
  if (result.isEmpty()) {
    const cliente: Cliente = req.body
    const response = await clienteService.agregarCliente(cliente)
    res.status(response.status).json(response)
  } else {
    res.send({ errors: result.array() })
  }
}) as RequestHandler)

// Se utiliza el middleware de autenticacion para checar si el usuario tiene una sesión iniciada
// la funcion se llama isUserNotLogged

// Ver todos los clientes
router.get('/', isUserNotLogged, (async (_req: Request, res: Response) => {
  const response = await clienteService.getClientes()
  res.status(response.status).json(response)
}) as RequestHandler)

// Ver un cliente por id
router.get('/:id', isUserNotLogged, (async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const response = await clienteService.getCliente(id)
  res.status(response.status).json(response)
}) as RequestHandler)

// Eliminar un cliente
router.delete('/eliminar/:id', isUserNotLogged, (req, res) => {
  const id = Number(req.params.id)
  const response = clienteService.eliminarCliente(id)
  res.status(response.status).json(response)
})

// Editar los datos de un cliente
router.put('/editar', isUserNotLogged, validateUser, (async (req: Request, res: Response) => {
  const result = validationResult(req)
  if (result.isEmpty()) {
    const cliente: Cliente = req.body
    const response = await clienteService.editarCliente(cliente)
    res.status(response.status).json(response)
  } else {
    res.send({ errors: result.array() })
  }
}) as RequestHandler)

export default router
