import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AuthRoute } from "../components/AuthRoute";
import { Background } from "../components/Background";
import { InputProps } from "../components/form/Input";
import { useState } from "react";
import Form from "../components/form/Form";
import Message from "../components/Message";

function Registro() {
    const [errorMessage, setErrorMessage] = useState("");
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
            placeholder: "Ingresa tu nombre",
            type: "text"
        },
        {
            icon: "phone",
            label: "celular",
            name: "phone",
            onChange: handleChange,
            placeholder: "Ingresa tu celular (10 dígitos)",
            type: "tel"
        },
        {
            icon: "envelope",
            label: "correo",
            name: "email",
            onChange: handleChange,
            placeholder: "Ingresa tu correo",
            type: "email"
        },
        {
            icon: "lock",
            label: "contraseña",
            name: "password",
            onChange: handleChange,
            placeholder: "Ingresa tu contraseña",
            type: "password"
        }
    ]

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setErrorMessage('Probandoooo')
        console.log('Form data submitted:', user);
    };
    return (
        <AuthRoute>
        <Background>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-lg">
                <div className="m-8 relative">
                    <div className="p-12 bg-white rounded-lg flex flex-col justify-between">
                        <h1 className="font-bold text-2xl text-gray-900">Registro</h1>
                        <div className={`transition-all duration-500 ${errorMessage ? 'opacity-100 my-2' : 'opacity-0'}`}>
                            <Message text={errorMessage} success={false} close={() => setErrorMessage("")}/>
                        </div>
                        <Form onSubmit={handleSubmit} inputs={inputs} btnText={"Iniciar sesión"} />
                        <p className="text-sm text-center text-gray-600 mt-4">¿Ya tienes una cuenta? <Link className="transition-all duration-150 text-indigo-400 hover:text-indigo-600" to={"/login"}>Haz click aquí para iniciar sesión</Link></p>
                    </div>
                </div>
            </motion.div>
        </Background>
    </AuthRoute>
    );
  }
  
export default Registro;
  