import { useContext, useEffect, useState } from "react";
import { Form } from "../../form/Form";
import { editarCliente, verClientes } from "../../../api";
import Message from "../../Message";
import { InputProps } from "../../form/Input";
import { BallTriangle } from "react-loader-spinner";
import { CustomModalProps } from "../../../types";
import { ClientesContext } from "../../../providers/ClientesProvider";

export const EditarCliente = ({ clienteId, close }:CustomModalProps) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({
        id: '',
        name:'',
        phone:'',
        email: '',
        password: '',
    });
    const { getClientes } = useContext(ClientesContext)


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const getInputs = (): InputProps[] => {
        return [
            {
                value: user.name,
                icon: "user",
                label: "nombre",
                name: "name",
                onChange: handleChange,
                placeholder: "Ingresa el nombre",
                type: "text"
            },
            {
                value: user.phone,
                icon: "phone",
                label: "celular",
                name: "phone",
                onChange: handleChange,
                placeholder: "Ingresa el celular (10 dígitos)",
                type: "tel"
            },
            {
                value: user.email,
                icon: "envelope",
                label: "correo",
                name: "email",
                onChange: handleChange,
                placeholder: "Ingresa el correo",
                type: "email"
            },
            {
                icon: "lock",
                label: "Cambiar contraseña",
                name: "password",
                onChange: handleChange,
                placeholder: "Ingresa una contraseña nueva",
                type: "password",
                required:false
            }
        ]
    }

    useEffect( () => {
        const getUser = async () => {
            const result = await (await fetch(`${verClientes}/${clienteId}`,
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

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const result = await (await fetch(editarCliente,
            {method:"PUT",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(user)
        })).json()
        if (result.success) {
            getClientes()
            close()
        } else {
            setErrorMessage(result.message)
            
        }
    };
    
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
                <h1 className="font-bold text-2xl text-gray-900">Editar cliente</h1>
                <div className={`transition-all duration-500 ${errorMessage ? 'opacity-100 my-2' : 'opacity-0'}`}>
                    <Message message={errorMessage} success={false} close={() => setErrorMessage("")}/>
                </div>
                <Form onSubmit={handleSubmit} inputs={getInputs()} btnText={"Guardar cambios"} />
            </>
            }
        </div>
    );
}