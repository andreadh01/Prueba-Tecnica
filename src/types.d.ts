export interface CustomResponse<T> {
  success: boolean
  message: string
  status: number
  data: T | null
}
