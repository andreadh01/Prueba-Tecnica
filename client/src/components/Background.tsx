import { ReactNode } from "react"

interface Props {
    children?: ReactNode
}

export const Background = ({ children }: Props) => {
    return ( 
    <div className="bg-gradient-to-br from-[#7C5FEE] via-indigo-600 to-[#DAABFF] h-screen max-h-screen flex items-center justify-center">
        <div className="fixed h-screen w-full">
            <div className="absolute -top-10 -left-36 w-80 h-80 bg-[#FFB1EC] rotate-[50deg] rounded-full  blur-md opacity-10 animate-blob"></div>
            <div className="absolute top-36 -right-36 w-96 h-96 bg-[#4300FF] rotate-45 rounded-full  blur-md opacity-10 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-36 left-20 w-96 h-96 bg-pink-300 rotate-45 rounded-full  mix-blend-multiply filter blur-md opacity-20 animate-blob animation-delay-4000"></div>
        </div>
            {children}
    </div>
    );
}