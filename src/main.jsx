import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home/Home.jsx';
import Main from './layout/Main.jsx';
import Login from './components/Login/Login';
import SignIn from './components/SignUp/SignUp';
import AuthProvider from './providers/AuthProvider';
import Profile from './components/Profile/Profile';
import PrivateRoute from './routes/PrivateRoute';
import Orders from './components/Orders/Orders';
 

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signin',
        element: <SignIn></SignIn>
      },
      {
        path: '/profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path: '/orders',
        element: <PrivateRoute> <Orders></Orders> </PrivateRoute>
      }
     
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
       <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
