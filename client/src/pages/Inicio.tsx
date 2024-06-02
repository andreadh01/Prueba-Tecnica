import { PrivateRoute } from "../components/PrivateRoute";

function Inicio() {
    return (
        <PrivateRoute>
            <h1 className='text-xl font-bold'>Inicio</h1>
        </PrivateRoute>     
    );
  }
  
export default Inicio;
  