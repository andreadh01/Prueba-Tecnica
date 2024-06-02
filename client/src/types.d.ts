export type ModalType = 'add' | 'delete' | 'view' | 'edit' | null;

export interface Cliente {
  id?: string
  name: string
  email: string
  phone: string
  password?: string
}

export interface CustomResponse {
  success: boolean
  message: string
  status?: number
  data?: any
}

export interface CurrentUser {
  id: string
  email: string
}

export interface CustomModalProps {
  close: () => void
  clienteId?: string
}

export interface OpenModalProps {
  openModal: (type: ModalType, selected?: string) => void
}