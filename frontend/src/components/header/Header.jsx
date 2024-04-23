import './Header.scss'
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Header = () => {
  const navigate = useNavigate();


  const handleLogOff = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className='header'>
      <div onClick={() => navigate('/')}>
        <img src={logo} className='logo'/>
      </div>
      <div>

      <button className="favourites-btn" onClick={() => navigate('favourites')}>Favourites</button>
      <button className='log-off-btn' onClick={handleLogOff}>Log-off</button>
      </div>
    </div>
  )
}

export default Header
