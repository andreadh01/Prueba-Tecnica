export async function checkToken(): Promise<boolean> {
    const response = await fetch("http://localhost:4800/auth/validarToken")
    const data = await response.json()
    console.log(data)
    return data.success
}