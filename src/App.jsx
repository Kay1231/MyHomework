import './App.css'
import LoginForm from './component/LoginForm'
import BlindBox from './component/blindbox'
import WelcomePage from './component/WelcomePage'
import { createBrowserRouter, RouterProvider } from 'react-router'

const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomePage />,
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/detail/:id',
    element: <BlindBox />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App

