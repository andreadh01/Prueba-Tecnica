export interface Cliente {
  id: string
  name: string
  email: string
  password: string
  phone: string
}

export type NuevoCliente = Omit<Cliente, 'id'>

