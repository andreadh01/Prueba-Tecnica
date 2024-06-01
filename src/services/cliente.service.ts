import { DeleteResult } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Cliente } from '../models/cliente'
import { CustomResponse } from '../types'
import bcrypt from 'bcrypt'
const clienteRepository = AppDataSource.getRepository(Cliente)

export const agregarCliente = async (nuevoCliente: Cliente): Promise<CustomResponse<Cliente>> => {
  return await editarCliente(nuevoCliente, true)
}

export const getCliente = async (id: number): Promise<CustomResponse<Cliente>> => {
  const clienteEncontrado = await clienteRepository.findOneBy({ id })
  if (clienteEncontrado === null) {
    return { success: false, status: 404, message: 'No existe un cliente con el ID especificado', data: null }
  } else {
    return { success: true, status: 200, message: 'Cliente encontrado', data: clienteEncontrado }
  }
}

export const getClientes = async (): Promise<CustomResponse<Cliente[]>> => {
  const clientes = await clienteRepository.find()
  if (clientes.length === 0) {
    return { success: false, status: 404, message: 'No tienes clientes, agrega uno', data: [] }
  } else {
    return { success: true, status: 200, message: 'Clientes encontrados', data: clientes }
  }
}

export const eliminarCliente = async (id: number): Promise<CustomResponse<DeleteResult>> => {
  try {
    await clienteRepository.delete(id)
    return { success: true, status: 200, message: 'Cliente eliminado', data: null }
  } catch (err: any) {
    return { success: false, status: 500, message: err.message.toString(), data: null }
  }
}

export const editarCliente = async (user: Cliente, nuevo = false): Promise<CustomResponse<Cliente>> => {
  try {
    // Primero se checa si el correo y el celular existen en la BD porque son datos unicos
    if (user.email !== undefined) {
      const emailExiste = await clienteRepository.findOneBy({ email: user.email })
      if (emailExiste !== null && emailExiste.id !== user.id) {
        return { success: false, status: 400, message: 'Ya existe un cliente con ese correo', data: null }
      }
    }

    if (user.phone !== undefined) {
      const celularExiste = await clienteRepository.findOneBy({ phone: user.phone })
      if (celularExiste !== null && celularExiste.id !== user.id) {
        return { success: false, status: 400, message: 'Ya existe un cliente con ese celular', data: null }
      }
    }

    // Si se modifico la contraseña se hace el hasheo
    if (user.password !== undefined) {
    // Se encripta la contraseña
    // let response: CustomResponse<Cliente> = { success: false, status: 400, message: '', data: null };
      const hashedPwd = await bcrypt.hash(user.password, 10)
      user.password = hashedPwd
    }

    const userEntity = clienteRepository.create(user)
    await AppDataSource.manager.save(userEntity)

    // Se vuelve a hacer el query para enviar todos los datos del cliente, excluyendo la contraseña
    const newUser = await clienteRepository.findOneBy({ id: userEntity.id })
    return { success: true, status: 200, message: `Cliente ${nuevo ? 'creado' : 'editado'} correctamente`, data: newUser }
    // Enviar respuesta
  } catch (err: any) {
    return { success: false, status: 500, message: err.message.toString(), data: null }
  }
}
