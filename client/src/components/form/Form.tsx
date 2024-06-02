import Input, { InputProps } from "./Input";

interface FormProps {
    onSubmit: (e: any) => void
    inputs: InputProps[]
    btnText: string
}

export const Form = ({ onSubmit, inputs, btnText }: FormProps) => {
    return (
        <form onSubmit={onSubmit} className="flex flex-col justify-between gap-2">
        <div>
            {inputs.map((input, index)=>
            <Input key={index} required={input.required} onChange={input.onChange} name={input.name} label={input.label} type={input.type} icon={input.icon} placeholder={input.placeholder}></Input>
            )}
        </div>
        <button type="submit" className="bg-indigo-500  mb-2 hover:bg-indigo-700 transition-all duration-150 w-1/2 px-6 py-2 self-center text-sm text-white font-semibold rounded-full">{btnText}</button>
        </form>
    );
  }
  
export default Form;
