import { useContext, useState } from "react";
import { Form } from "../../form/Form";
import { agregarCliente } from "../../../api";
import Message from "../../Message";
import { InputProps } from "../../form/Input";
import { CustomModalProps } from "../../../types";
import { ClientesContext } from "../../../providers/ClientesProvider";


export const AgregarCliente = ({ close }:CustomModalProps) => {
    const [errorMessage, setErrorMessage] = useState("");
    const { getClientes } = useContext(ClientesContext)
    const [user, setUser] = useState({
        name:'',
        phone:'',
        email: '',
        password: '',
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const inputs: InputProps[] = [
        {
            icon: "user",
            label: "nombre",
            name: "name",
            onChange: handleChange,
            placeholder: "Ingresa el nombre",
            type: "text"
        },
        {
            icon: "phone",
            label: "celular",
            name: "phone",
            onChange: handleChange,
            placeholder: "Ingresa el celular (10 dígitos)",
            type: "tel"
        },
        {
            icon: "envelope",
            label: "correo",
            name: "email",
            onChange: handleChange,
            placeholder: "Ingresa el correo",
            type: "email"
        },
        {
            icon: "lock",
            label: "contraseña",
            name: "password",
            onChange: handleChange,
            placeholder: "Ingresa la contraseña",
            type: "password"
        }
    ]

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const result = await (await fetch(agregarCliente,
            {method:"POST",
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
        <div className="px-6">
           <h1 className="font-bold text-2xl text-gray-900">Agregar cliente</h1>
            <div className={`transition-all duration-500 ${errorMessage ? 'opacity-100 my-2' : 'opacity-0'}`}>
                <Message message={errorMessage} success={false} close={() => setErrorMessage("")}/>
            </div>
            <Form onSubmit={handleSubmit} inputs={inputs} btnText={"Agregar cliente"} />
        </div>
    );
}