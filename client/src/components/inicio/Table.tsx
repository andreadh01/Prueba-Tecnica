import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import Message from '../Message';
import { BallTriangle } from 'react-loader-spinner';
import { OpenModalProps } from '../../types';
import { ClientesContext } from '../../providers/ClientesProvider';

export const Table = ({ openModal }: OpenModalProps) => {
    const { clientes, loading, errorMessage, setErrorMessage } = useContext(ClientesContext)

    return ( 
        <>
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
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-indigo-500">
                    <thead className="text-xs text-indigo-700 uppercase bg-indigo-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Cliente #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nombre
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Correo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Celular
                            </th>
                            <th scope="col" className="pr-2 py-3">
                                <span className="sr-only">Editar</span>
                            </th>
                            <th scope="col" className=" py-3">
                                <span className="sr-only">Eliminar</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => {
                        return <tr key={cliente.id} className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                    {cliente.id}
                                    </th>
                                    <td className="px-6 py-4 text-gray-900">
                                        {cliente.name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900">
                                        {cliente.email}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900">
                                        {cliente.phone}
                                    </td>
                                    <td className="pr-2 py-4 text-right">
                                        <button onClick={()=>openModal('edit',cliente.id)} className='rounded-full bg-gray-100 cursor-pointer hover:bg-gray-200 p-2'>
                                        <FontAwesomeIcon className='w-4 h-4 text-indigo-600' icon={faEdit} />
                                        </button>

                                    </td>
                                    <td className="py-4 text-left">
                                    <button onClick={()=>openModal('delete',cliente.id)} className='rounded-full bg-gray-100 cursor-pointer hover:bg-gray-200 p-2'>
                                        <FontAwesomeIcon className='w-4 h-4 text-red-500' icon={faTrash} />
                                        </button>
                                    </td>
                                </tr>
                            })}
                    </tbody>
                </table>
            </div>
            </>
            }
        </>
    );
}