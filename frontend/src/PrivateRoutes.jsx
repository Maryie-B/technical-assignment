import { Navigate } from 'react-router-dom';
import Home from './components/home/Home';

const PrivateRoutes = () => {
    const isAuthenticated = localStorage.getItem('token');

  return (
    <>
      {isAuthenticated ? <Home /> : <Navigate to='/login' />}
    </>
  )
}

export default PrivateRoutes
