import { validateToken } from "../api"
import { CustomResponse } from "../types"

export async function checkToken(): Promise<any> {
    const response = await fetch(validateToken, {
        method:'GET',
        credentials: 'include',
      })
    const data: CustomResponse = await response.json()
    return data
}