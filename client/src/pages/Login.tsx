import { Link, useNavigate } from "react-router-dom";
import { AuthRoute } from "../components/AuthRoute";
import { InputProps } from "../components/form/Input";
import { Background } from "../components/Background";
import { motion } from "framer-motion";
import { useState } from "react";
import Form from "../components/form/Form";
import Message from "../components/Message";
import { login } from "../api";
import { CustomResponse } from "../types";
  
function Login() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [user, setUser] = useState({
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

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const result: CustomResponse = await (await fetch(login,{
            method:"POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)})).json()
        if (result.success) {
            navigate("/")
        } else {
            setErrorMessage(result.message)
        }
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
                        <h1 className="font-bold text-2xl text-gray-900">¡Bienvenido!</h1>
                        <div className={`transition-all duration-500 ${errorMessage ? 'opacity-100 my-2' : 'opacity-0'}`}>
                            <Message message={errorMessage} success={false} close={() => setErrorMessage("")}/>
                        </div>
                        <Form onSubmit={handleSubmit} inputs={inputs} btnText={"Iniciar sesión"} />
                        <p className="text-sm text-center text-gray-600 mt-4">¿Aún no tienes una cuenta? <Link className="transition-all duration-150 text-indigo-400 hover:text-indigo-600" to={"/registro"}>Haz click aquí para registrarte</Link></p>
                    </div>
                </div>
            </motion.div>
        </Background>
    </AuthRoute>
    );
  }
  
export default Login;
  