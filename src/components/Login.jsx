import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from "yup"
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = ({ setislogged, islogged }) => {
  const [loading, setisloading] = useState(false)
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: yup.object({
      email: yup.string().email("invalid email").required("email is required"),
      password: yup.string().required("password is required").min(5, "minimum 5 dight")
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/login", values)
        toast.success(response.data.message)
        // localStorage.setItem("islogged", "true")
        localStorage.setItem("token", response.data.token)
        setislogged(true)
        formik.resetForm()
        navigate("/")
        setisloading(true)
      } catch (error) {
        console.log(error)
        toast.error(error.response?.data?.message || "Login failed");
      } finally {
        setisloading(false)
      }
    }
  })
  if (loading) {
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

      <div className='loginFormDiv'>
        <ToastContainer />
        <form onSubmit={formik.handleSubmit} className='formLogin'>
          <h1>login</h1>
          <div className='loginDivLabelInput'>
            <label>email</label>
            {
              formik.touched.email && formik.errors.email ?
                <p style={{ color: "red" }}>{formik.errors.email}</p> : null
            }
            <input type='email' placeholder='enter email'
              {...formik.getFieldProps("email")} />
          </div>
          <div className='loginDivLabelInput'>
            <label>password</label>
            {
              formik.touched.password && formik.errors.password ?
                <p style={{ color: "red" }}>{formik.errors.password}</p> : null
            }
            <input type='password' placeholder='enter password'
              {...formik.getFieldProps("password")} />
          </div>
          <button type='submit'>submit</button>
          <div className='loginDivForgotRegister'>
            <Link to="/ForgotPassword">
              <button className='nav-btn'>
                forget password?
              </button>
            </Link>

            <Link to="/register">
              <button className='nav-btn'>
                Register
              </button>
            </Link>
          </div>
        </form>

      </div>
    </>
  )
}

export default Login