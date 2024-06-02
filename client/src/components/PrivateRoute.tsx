import { Navigate } from "react-router-dom"
import { checkToken } from "../helper/checkToken"
import { ReactNode, useContext, useEffect, useState } from "react"
import { Loader } from "./Loader"
import { CurrentUserContext } from "../providers/CurrentUserProvider"

interface Props {
    children?: ReactNode
}

export const PrivateRoute = ({ children }: Props) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState<boolean | null>(null)
    const { setUsuario } = useContext(CurrentUserContext)

    useEffect(() => {   
        setTimeout(() => {
            getToken();
        }, 1000)
        
     }, []);

    async function getToken() {
        const result = await checkToken()
        setIsAuthenticated(result.success);
        if (result.success) {
            setUsuario(result.data)
        }
    };
    
    return <> {isAuthenticated == null  ? <Loader/>: isAuthenticated ? children : <Navigate to='/login' replace /> } </>
}