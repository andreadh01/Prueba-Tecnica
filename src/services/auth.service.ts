import { AppDataSource } from '../data-source'
import { Cliente } from '../models/cliente'
import { ClienteLogueado, CustomResponse } from '../types'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const clienteRepository = AppDataSource.getRepository(Cliente)

export const login = async (email: string, plainPassword: string): Promise<CustomResponse<ClienteLogueado>> => {
  try {
    const cliente = await clienteRepository.createQueryBuilder('cliente')
      .addSelect('cliente.password')
      .where('cliente.email = :email', { email })
      .getOne()

    if (cliente == null) {
      return { success: false, status: 400, message: 'No existe un usuario con ese correo', data: null }
    }

    const passwordMatch = await bcrypt.compare(plainPassword, cliente.password)
    if (!passwordMatch) {
      return { success: false, status: 400, message: 'La contraseña es incorrecta', data: null }
    }

    const token = jwt.sign(
      { id: cliente.id, email: cliente.email },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: '1d'
      }
    )

    const clienteWithoutPwd = await clienteRepository.findOneBy({ id: cliente.id })

    if (clienteWithoutPwd != null) {
      return { success: true, status: 200, message: 'Sesión iniciada', data: { ...clienteWithoutPwd, token } }
    } else {
      return { success: false, status: 400, message: 'Ocurrió un error al obtener los datos', data: null }
    }
  } catch (err: any) {
    return { success: false, status: 500, message: err.message.toString(), data: null }
  }
}

export const isValidToken = (token: string): CustomResponse<string | jwt.JwtPayload> => {
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
    // Si la función arroja un error se irá al catch
    return { success: true, status: 200, message: 'El token es válido', data: decode }
  } catch (err: any) {
    return { success: false, status: 40, message: 'El token no es válido', data: null }
  }
}