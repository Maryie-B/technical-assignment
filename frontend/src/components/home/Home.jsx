import Header from '../header/Header';
import './Home.scss';
import { Outlet } from 'react-router-dom';

const Home = () => {
   

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default Home
