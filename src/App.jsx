import React, { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import axios from 'axios'
import Profile from './components/Profile'
import ProtectRoute from './components/ProtectRoute'
import PublicRoute from './components/PublicRoute'
import Admin from './components/Admin'

const App = () => {
  // const status = localStorage.getItem("islogged")
  const [islogged, setislogged] = useState(false);
  const [isLoding, setIsLoading] = useState(true)
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        await axios.get("/verifytoken", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setislogged(true);

      } catch (error) {
        localStorage.removeItem(token)
        setislogged(false)
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home islogged={islogged} setislogged={setislogged} />
    },
    {
      path: "/register",
      element: <PublicRoute islogged={islogged}>
        <Register islogged={islogged} setislogged={setislogged} />
      </PublicRoute>
    },
    {
      path: "/login",
      element: (<PublicRoute islogged={islogged}>
        <Login islogged={islogged} setislogged={setislogged} />
      </PublicRoute>
      )
    },
    {
      path: "/ForgotPassword",
      element: (<PublicRoute islogged={islogged}>
        <ForgotPassword />
      </PublicRoute>
      )
    },
    {
      path: "/reset-password/:token",
      element: (<PublicRoute islogged={islogged}>
        <ResetPassword />
      </PublicRoute>
      )
    },
    {
      path: "/profile",
      element: (<ProtectRoute islogged={islogged}>
        <Profile />
      </ProtectRoute>
      )
    },
     {
      path: "/admin",
      element: (<ProtectRoute islogged={islogged}>
        <Admin />
      </ProtectRoute>
      )
    }
  ])

  if (isLoding) {
    return (
      <div className="reset-status-container">
        <div className="reset-status-card">
          <h1>Verifying...</h1>
          <p>
            Please wait while for verification
          </p>
        </div>
      </div>
    );
  }


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App