const SERVER_PORT = 4800
export const API = `http://localhost:${SERVER_PORT}`

// Auth endpoints
export const login = `${API}/auth/login`
export const logout = `${API}/auth/logout`
export const validateToken = `${API}/auth/validarToken`

// Cliente endpoints
export const agregarCliente = `${API}/clientes/agregar`
export const editarCliente = `${API}/clientes/editar`
export const eliminarCliente = `${API}/clientes/eliminar` // + especificar id
export const verClientes = `${API}/clientes` // + especificar id si es un solo cliente