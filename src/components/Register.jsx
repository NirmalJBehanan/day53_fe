import { useFormik } from 'formik'
import React from 'react'
import * as yup from "yup"
import "../App.css"
import axios from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom'
const Register = ({ islogged, setislogged }) => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            name: yup.string().required("name is required"),
            email: yup.string().email("invalid email").required("email is required"),
            password: yup.string().required("password is required").min(5, "minimum 5 dight")
        })
        ,
        onSubmit: async (values) => {
            try {
                const response = await axios.post("/register", values);

                toast.success(response.data.message);
                console.log(response.data.message);

                formik.resetForm();
                navigate("/login");

            } catch (error) {
                toast.error(error.response?.data?.message || "Registration failed");
            }
        }
    })
    return (
        <>
            <ToastContainer />
            <div className='formRegister'>
                <form className='formone' action="" onSubmit={formik.handleSubmit}>
                    <h1>Register Now</h1>

                    <div className='divForm'>
                        <label>Username</label>
                        {
                            formik.touched.name && formik.errors.name ?
                                <p style={{ color: "red" }}>{formik.errors.name}</p> : null
                        }
                        <input placeholder='enter username'{...formik.getFieldProps("name")} />
                    </div>

                    <div className='divForm'>
                        <label>Email</label>
                        {
                            formik.touched.email && formik.errors.email ?
                                <p style={{ color: "red" }}>{formik.errors.email}</p> : null
                        }
                        <input type='email' placeholder='enter email' {...formik.getFieldProps("email")} />
                    </div>


                    <div className='divForm'>
                        <label>Password</label>
                        {
                            formik.touched.password && formik.errors.password ?
                                <p style={{ color: "red" }}>{formik.errors.password}</p> : null
                        }
                        <input type='password' placeholder='enter password'{...formik.getFieldProps("password")} />

                    </div>

                    <button type='submit'>submit</button>
                </form>
            </div>
        </>
    )
}

export default Register