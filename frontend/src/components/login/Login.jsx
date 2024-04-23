import { useState } from "react"
import { useNavigate } from "react-router-dom";
import './Login.scss'

const port = import.meta.env.VITE_PORT;

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://127.0.0.1:${port}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        console.log('An error has occurred', response);
        const errorData = await response.json();
        console.log(errorData.detail || 'An error occurred');
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Login failed. Please try again.');
    }
  };

  

  return (
    <div className="login">
      <div className="authentication-form">
      <form onSubmit={handleLogin} className="authentication-form">
        <h1>Login</h1>
        <label htmlFor="username">Username:</label>
        <input type="text" placeholder="ex: maryie" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
      </div>

      <div className="text">
        <p> No account?</p>
        <a id="nav"  onClick={() => navigate('/signup')}>Sign Up</a>
      </div>
      
    </div>
  )
}

export default Login
