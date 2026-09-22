import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {

    const formik = useFormik({

        initialValues: {
            email: ""
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required")
        }),

        onSubmit: async (values) => {

            try {
                console.log(values)
                const response = await axios.post("/forgetpassword", values);

                toast.success(response.data.message);

                formik.resetForm();

            } catch (error) {

                toast.error(
                    error.response?.data?.message ||
                    "Something went wrong"
                );
            }
        }
    });

    return (
        <>
            <div className="forgot-password-container">
                <div className="forgot-password-card">
                    <h2>Forgot Password</h2>
                    <p className="subtitle">
                        Enter your email to receive a password reset link.
                    </p>

                    <form onSubmit={formik.handleSubmit}>

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            {...formik.getFieldProps("email")}
                        />

                        {formik.touched.email && formik.errors.email ? (
                            <p className="error-message">
                                {formik.errors.email}
                            </p>
                        ) : null}

                        <button type="submit">
                            Send Reset Link
                        </button>

                    </form>
                </div>
            </div>

            <ToastContainer />
        </>
    );
};

export default ForgotPassword;

