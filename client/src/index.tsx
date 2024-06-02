import './index.css';
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Registro from './pages/Registro';
import { AnimatePresence } from 'framer-motion';
import { CurrentUserProvider } from './providers/CurrentUserProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicio />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
]);

root.render(
  <AnimatePresence>
    <CurrentUserProvider>
      <RouterProvider router={router} />
    </CurrentUserProvider>
  </AnimatePresence>
);
