import express from 'express'
import * as clienteService from '../services/clienteService'
import { Cliente, NuevoCliente } from "../types"

const router = express.Router()

// Ver todos los clientes
router.get('/', (_req, res) => {
  res.send(clienteService.verClientes())
})

// Ver un cliente por id
router.get('/ver/:id', (req, res) => {
  res.send(clienteService.verCliente(req.params.id))
})

// Eliminar un cliente
router.delete('/eliminar/:id', (req, res) => {
  res.send(clienteService.eliminarCliente(req.params.id))
})

// Agregar un cliente
router.post('/agregar', (req, res) => {
  const nuevoCliente: NuevoCliente = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone
  }
  res.send(clienteService.agregarCliente(nuevoCliente))
})

// Editar los datos de un cliente
router.post('/editar', (req, res) => {
  const cliente: Cliente = {
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone
  }
  res.send(clienteService.editarCliente(cliente))
})

export default router
