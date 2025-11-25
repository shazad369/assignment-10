import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from './Componants/Layout.jsx';
import Center from './Componants/Center.jsx';

import Partner from './Componants/Partner.jsx';
import Creatpartner from './Componants/Creatpartner.jsx';
import Regester from './Componants/Regester.jsx';
import Details from './Componants/Details.jsx';
import Myconnection from './Componants/Myconnection.jsx';
import Edit from './Componants/Edit.jsx';
import Login from './Componants/Login.jsx';

import Error from './Componants/Error.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout></Layout> ,
    children: [
      {
        path:"/",
        element: <Center></Center>,
      },
       {
        path:"/creatpartner",
        element: <Creatpartner></Creatpartner>,
      },
      {
        path:"/regester",
        element: <Regester></Regester>,
      },
      {
        path:"/detail/:id",
        element: <Details></Details>,
      },
      {
        path:"/myconnnection",
        element: <Myconnection></Myconnection>,
      },
      {

    path: "/edit/:id",
        element: <Edit></Edit>,
      },
      {
        path:"/login",
        element: <Login></Login>,
      },

    
      
    ]
      
  },
        
      {
        path:"/partner",
        element: <Partner></Partner>,
      },  {
        path:"*",
      element: <Error></Error>
      }
     
    

  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
 
       <RouterProvider router={router} />,
   
  </StrictMode>
)
