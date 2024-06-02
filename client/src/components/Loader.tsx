import { BallTriangle } from "react-loader-spinner";
import { Background } from "./Background";
import { motion } from "framer-motion";

export const Loader = () => {
    return ( 
        <Background>
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full h-full flex items-center justify-center">
                <BallTriangle
                visible={true}
                height="100"
                width="100"
                color="#ffff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                />
            </motion.div>
        </Background>
    );
}