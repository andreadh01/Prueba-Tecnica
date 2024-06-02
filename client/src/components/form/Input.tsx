import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName, library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

export interface InputProps {
    name: string
    label: string
    type: string
    icon: string
    onChange: (e: any) => void
    required?: boolean
    value?: string
    placeholder?: string
}

export const Input = ({ name, label, type, icon, onChange, required = true, placeholder, value }: InputProps) => {    
    let iconNameType: IconName = (icon.toLowerCase()) as IconName;
    return (
        <>
        <label className="block text-xs font-medium text-gray-500">{label.charAt(0).toUpperCase() + label.slice(1)}</label>
        <div className="relative mb-4">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <FontAwesomeIcon className='w-4 h-4 text-gray-400' icon={[ 'fas', iconNameType ]} />
          </div>
          <input value={value} onChange={onChange} name={name} required={required}  type={type} className="bg-white border-b border-gray-400 text-gray-900 text-sm transition-all ring-transparent duration-150 ring-0 outline-none  focus:border-indigo-500 focus:ring-0 focus:outline-none block w-full ps-10 p-2.5" placeholder={placeholder ? placeholder : ''}/>
        </div>
        </>  
    );
  }
  
export default Input;
  