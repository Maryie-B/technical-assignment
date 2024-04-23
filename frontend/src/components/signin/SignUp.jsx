import { useState } from "react"
import { useNavigate } from "react-router-dom";
import '../login/Login.scss'

const port = import.meta.env.VITE_PORT;

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    newPassword: '',
    confirmPassword: '',

  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!formData.username) {
      formIsValid = false;
      errors['username'] = 'You need to input a username.';
    }

    if (!formData.newPassword) {
      formIsValid = false;
      errors['password'] = 'You need to input a password';
    }

    if (!formData.confirmPassword) {
      formIsValid = false;
      errors['confirmPassword'] = 'Confirmation of password is necessary.';
    }

    if (formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword) {
      formIsValid = false;
      errors['confirmPassword'] = 'Passwords do not match!';
    }

    setError(errors);
    return formIsValid;
  };


  const handleSignUp = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    try {
      const response = await fetch(`http://127.0.0.1:${port}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.newPassword,
        })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
      
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Login failed. Please try again.');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  
    navigate('/login');
  };

  

  return (
    <div className="login">
      <div className="authentication-form">
        <form onSubmit={handleSignUp}>
        <h1>Sign Up</h1>
        <label htmlFor="username">Username:</label>
        <input type="text" placeholder="ex: maryie" value={formData.username} name="username" onChange={handleChange} />
        {error?.username && <p className="error-message">{error.username}</p>}
        <label htmlFor="password">Password:</label>
        <input type="password" value={formData.newPassword} name="newPassword" onChange={handleChange} />
        {error?.password && <p className="error-message">{error.password}</p>}
        <label htmlFor="password">Confirm Password</label>
        <input type="password" value={formData.confirmPassword} name="confirmPassword" onChange={handleChange} />
        {error?.confirmPassword && <p className="error-message">{error.confirmPassword}</p>}
        <button type="submit">Sign Up</button>
      </form>
      </div>

      <div className="text">
        <p>Already have an account?</p>
        <a id="nav" onClick={() => navigate('/login')}>Login</a>
      </div>
  
    </div>
  )
}

export default SignUp
