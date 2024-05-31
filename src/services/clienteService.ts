import { Cliente, NuevoCliente } from "../types"

export const agregarCliente = (nuevoCliente: NuevoCliente) => console.log(nuevoCliente)

export const editarCliente = (cliente: Cliente) => console.log(cliente)

export const verCliente = (id: string) => console.log(id)

export const verClientes = () => null

export const eliminarCliente = (id: string) => console.log(id)
