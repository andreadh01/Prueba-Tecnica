import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';
import { Cliente, CustomResponse } from '../types';
import { verClientes } from '../api';

interface IClientesContext {
  clientes: Cliente[],
  errorMessage: string,
  setErrorMessage: Dispatch<SetStateAction<string>>,
  loading: boolean,
  getClientes: () => void
}

interface Props {
    children?: ReactNode
}

export const ClientesContext = createContext<IClientesContext>({
  clientes: [],
  errorMessage: '',
  setErrorMessage: () => {},
  loading: false,
  getClientes: () => {}
});


export const ClientesProvider = ({ children }: Props) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [ loading, setLoading ] = useState(true)
  const [ errorMessage, setErrorMessage ] = useState("");

  const getClientes = async () => {
    const result: CustomResponse = await (await fetch(`${verClientes}`,
        {method:"GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
          }
    })).json()
    if (result.success) {
        setClientes(result.data)
        setLoading(false)
    } else {
        setErrorMessage(result.message)
        setLoading(false)
    }
};

useEffect(() => {
  getClientes()
}, [])

  return (
    <ClientesContext.Provider
      value={{
        clientes,
        loading,
        errorMessage,
        setErrorMessage,
        getClientes
      }}
    >
      { children }
    </ClientesContext.Provider>
  );
}