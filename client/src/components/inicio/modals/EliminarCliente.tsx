import { useContext, useState } from "react";
import { eliminarCliente, logout } from "../../../api";
import { Message } from "../../Message";
import { CustomModalProps } from "../../../types";
import { ClientesContext } from "../../../providers/ClientesProvider";
import { CurrentUserContext } from "../../../providers/CurrentUserProvider";
import { useNavigate } from "react-router-dom";

export const EliminarCliente = ({ clienteId, close}: CustomModalProps) => {
    const [errorMessage, setErrorMessage] = useState("");
    const { getClientes } = useContext(ClientesContext)
    const { usuario } = useContext(CurrentUserContext)
    const navigate = useNavigate()

    const handleDelete = async () => {
        await fetch(`${eliminarCliente}/${clienteId}`,
            {method:"DELETE",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
              }
        })
        if (clienteId === usuario.id) {
            navigate("/login")
        } else {
            getClientes()
            close()
        }
    };
    
    return ( 
        <div className="flex flex-col items-center">
            <div className={`transition-all duration-500 ${errorMessage ? 'opacity-100 my-2' : 'opacity-0'}`}>
                <Message message={errorMessage} success={false} close={() => setErrorMessage("")}/>
            </div>
            <h1 className="mb-4">{clienteId === usuario.id ? '¿Quieres eliminar tu cuenta?' : `¿Estás seguro que quieres eliminar el cliente (ID ${clienteId})?`}</h1>
            <div className="flex gap-4">
                <button onClick={close} className="shadow-lg bg-gray-400  mb-2 hover:bg-gray-600 transition-all duration-150 w-fit px-8 py-3 self-center text-sm text-white font-medium rounded-full flex items-center justify-center gap-2">No</button>
                <button onClick={handleDelete} className="shadow-lg bg-indigo-500  mb-2 hover:bg-indigo-700 transition-all duration-150 w-fit px-8 py-3 self-center text-sm text-white font-medium rounded-full flex items-center justify-center gap-2">Sí</button>
            </div>
        </div>
    );
}