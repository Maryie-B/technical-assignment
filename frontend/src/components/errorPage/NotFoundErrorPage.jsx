import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './NotFoundErrorPage.scss'

const NotFoundErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
  });

  return (
    <div className="error-page">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <button onClick={() => navigate('/login')}>Back to Login</button>
    </div>
  )
}

export default NotFoundErrorPage
