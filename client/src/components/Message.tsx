import { motion } from "framer-motion";

interface MessageProps {
    text: string
    success: boolean
    close: () => void
}

export const Message = ({ text, success,close }: MessageProps) => {
    return (
        <div
        className={`rounded-xl ${success ? 'bg-green-300' : 'bg-red-300'} py-2 px-3 w-full flex justify-between items-center`}>
            {text != "" && 
            <>
            <p>{text}</p>
            <button onClick={close} className={`transition-all duration-150 text-sm  ${success ? 'hover:text-green-600' : 'hover:text-red-600'}`}>x</button>
            </>}
        </div>
    );
  }
  
export default Message;
  