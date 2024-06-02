import { useEffect, useState } from "react";
import { verClientes } from "../../../api";
import { BallTriangle } from "react-loader-spinner";
import { CustomModalProps, CustomResponse } from "../../../types";
import Message from "../../Message";


export const VerCliente = ({ clienteId }: CustomModalProps) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({
        id: '',
        name:'',
        phone:'',
        email: '',
        password: '',
    });

    useEffect(() => {
        const getUser = async () => {
            const result: CustomResponse = await (await fetch(`${verClientes}/${clienteId}`,
                {method:"GET",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                  }
            })).json()
            if (result.success) {
                setUser(result.data)
                setLoading(false)
            } else {
                setErrorMessage(result.message)
                setLoading(false)
            }
        };
        getUser()
    }, [clienteId])
    
    return ( 
        <div>
             {loading ?  
             <BallTriangle
                visible={true}
                height="60"
                width="60"
                color="#7C5FEE"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass="flex items-center justify-center"
            />
            :
            <>
                <div className={`transition-all duration-500 ${errorMessage ? 'opacity-100 my-2' : 'opacity-0'}`}>
                    <Message message={errorMessage} success={false} close={() => setErrorMessage("")}/>
                </div>
                <h1 className="font-bold text-2xl text-gray-900">Cliente #{user.id}</h1>
                <h2>Nombre: {user.name}</h2>
                <h2>Correo: {user.email}</h2>
                <h2>Celular: {user.phone}</h2>
            </>
             }
        </div>
    );
}