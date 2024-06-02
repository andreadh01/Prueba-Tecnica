import "react-responsive-modal/styles.css";
import { motion } from "framer-motion";
import { Background } from "../components/Background";
import { PrivateRoute } from "../components/PrivateRoute";
import { Table } from "../components/inicio/Table";
import { SearchInput } from "../components/inicio/SearchInput";
import { Modal } from 'react-responsive-modal';
import { useState } from "react";
import { AgregarCliente } from "../components/inicio/modals/AgregarCliente";
import { EliminarCliente } from "../components/inicio/modals/EliminarCliente";
import { VerCliente } from "../components/inicio/modals/VerCliente";
import { EditarCliente } from "../components/inicio/modals/EditarCliente";
import { logout } from "../api";
import { useNavigate } from "react-router-dom";
import { CustomResponse, ModalType } from "../types";
import { ClientesProvider } from "../providers/ClientesProvider";

interface IModal {
    modalType: ModalType
    selected?: string
}

function Inicio() {
    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState<IModal>();
    const navigate = useNavigate()

    const modalComponent = () => {
        switch (modal?.modalType) {
            case 'add':
                return <AgregarCliente close={closeModal}/>
            case 'delete':
                return <EliminarCliente close={closeModal} clienteId={modal.selected!}/>
            case 'view':
                return <VerCliente close={closeModal} clienteId={modal.selected!}/>
            case 'edit':
                return <EditarCliente close={closeModal} clienteId={modal.selected!}/>
            default:
                break;
        }
    }

    const openModal = (type:ModalType, selected?:string) => {
        setModal({ modalType:type, selected:selected })
        setOpen(true)
    }

    const closeModal = () => setOpen(false);

    const logoutUser = async () => {
        const result: CustomResponse = await ( await fetch(logout,
            {method:"POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
              }
        })).json()
        if (result.success){
            navigate("/login")
        } else {
            window.location.reload()
        }
        
    };

    return (
        <PrivateRoute>
            <ClientesProvider>
                <Background>
                    <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }} 
                    className="relative flex gap-6 flex-col mx-12 justify-center w-full h-full">
                        <button onClick={logoutUser} className="ml-auto shadow-lg bg-white  mb-2 hover:bg-indigo-100 transition-all duration-150 w-fit px-6 py-2.5 self-center text-sm text-indigo-600 font-medium rounded-full">
                        Cerrar sesión
                        </button>
                        <div className=" bg-white rounded-lg  p-6 shadow-lg w-full h-fit">
                            <div className="flex justify-between flex-col md:flex-row gap-4 mb-4">
                                <SearchInput openModal={openModal}></SearchInput>
                                <button onClick={()=>openModal('add')} className="shadow-lg bg-indigo-500  mb-2 hover:bg-indigo-700 transition-all duration-150 w-fit px-6 py-2.5 self-center text-sm text-white font-medium rounded-full flex items-center justify-center gap-2">
                                    <div>+</div>
                                    <div>Agregar cliente</div>
                                </button>
                            </div>
                        <Table openModal={openModal}/>
                        </div>
                    </motion.div>
                    <Modal classNames={{modal:"w-2/3 md:w-1/3 rounded-xl"}} open={open} onClose={closeModal} center>
                        <div  className="py-6 px-3">
                            {modalComponent()}   
                        </div>   
                    </Modal>
                </Background>
            </ClientesProvider>
        </PrivateRoute>     
    );
  }
  
export default Inicio;
  