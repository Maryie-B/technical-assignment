import './App.scss'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PrivateRoutes from './PrivateRoutes';
import NotFoundErrorPage from './components/errorPage/NotFoundErrorPage';
import Login from './components/login/Login';
import SingleMovie from './components/SingleMovie.jsx/SingleMovie';
import MoviesList from './components/MoviesList.jsx/MoviesList';
import SignUp from './components/signin/SignUp';
import Favourites from './components/favourites/Favourites';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoutes />,
    errorElement: <NotFoundErrorPage />,
    children: [
      {
        path: '/',
        element: <MoviesList />,
        errorElement: <NotFoundErrorPage />,
      }, 
      {
        path: '/favourites',
        element: <Favourites />,
        errorElement: <NotFoundErrorPage />,
      },
      {
        path: '/:id/:name',
        element: <SingleMovie />,
        errorElement: <NotFoundErrorPage />,
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  }
]);

function App() {
  

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
