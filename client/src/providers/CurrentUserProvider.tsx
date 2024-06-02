import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
import { CurrentUser } from '../types';

interface ICurrentUserContext {
  usuario: CurrentUser,
  setUsuario: Dispatch<SetStateAction<CurrentUser>>
}

interface Props {
    children?: ReactNode
}

export const CurrentUserContext = createContext<ICurrentUserContext>({
  usuario: {
    id: '',
    email: ''
  },
  setUsuario: () => {}
});


export const CurrentUserProvider = ({ children }: Props) => {
  const [usuario, setUsuario] = useState<CurrentUser>({
    id: '',
    email: ''
  });

  return (
    <CurrentUserContext.Provider
      value={{
        usuario, 
        setUsuario
      }}
    >
      { children }
    </CurrentUserContext.Provider>
  );
}