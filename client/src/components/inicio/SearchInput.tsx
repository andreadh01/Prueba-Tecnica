import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { OpenModalProps } from '../../types';

export const SearchInput = ({ openModal }: OpenModalProps) => {
    const [isFocused, setIsFocused] = useState(false)
    const [value, setValue] = useState('')

    return (
    <div className="w-full md:w-72">   
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <FontAwesomeIcon className={`w-4 h-4 ${isFocused ? 'text-indigo-500' : 'text-gray-400'} transition-all duration-150`} icon={faSearch}/>
            </div>
            <input onChange={(e) => setValue(e.target.value)} onBlur={() => setIsFocused(false)} onFocus={() => setIsFocused(true)} type="number" id="default-search" className=" transition-all duration-150 block w-full px-4 py-2 ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 rounded-full focus:ring-0 outline-none focus:border-indigo-500" placeholder="Buscar cliente por ID" required />
            <button disabled={value === '' && true} onClick={() => openModal('view', value)} className="shadow-lg transition-all duration-150 text-white absolute right-0 bottom-0 bg-indigo-500 hover:bg-indigo-700 border border-indigo-500 font-medium rounded-full text-sm px-4 py-2">Buscar</button>
        </div>
    </div>
)

}