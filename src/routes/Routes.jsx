import {
    createBrowserRouter,
  
  } from "react-router-dom";
import Login from "../Pages/LogIn/LogIn/LogIn";
import SignUp from "../Pages/Login/SignUp/SignUp";

export const router = createBrowserRouter([
    {
        path:'login',
        element: <Login></Login>
    },
    {
        path:'register',
        element: <SignUp></SignUp>
    }
  ])