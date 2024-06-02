import { Navigate } from "react-router-dom"
import { checkToken } from "../helper/checkToken"
import { ReactNode, useEffect, useState } from "react"

interface Props {
    children?: ReactNode
}

export const PrivateRoute = ({ children }: Props) => {
    const [ isAuthenticated, setIsAuthenticated ] = useState<boolean | null>(null)

    useEffect(() => {        
        getToken();
      }, []);

    async function getToken() {
        const result = await checkToken()
        setIsAuthenticated(result);
    };
    
    return <> { !isAuthenticated ? <Navigate to='/login' replace /> : children } </>
}