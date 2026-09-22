import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [loading, setIsLoading] = useState(true);
    const [isValidation, setIsValidation] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                await axios.get("/verifytoken", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setIsValidation(true);

            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Something went wrong"
                );
            } finally {
                setIsLoading(false);
            }
        };

        verifyToken();
    }, [token]);

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },

        validationSchema: Yup.object({
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),

            confirmPassword: Yup.string()
                .oneOf(
                    [Yup.ref("password")],
                    "Passwords must match"
                )
                .required("Please confirm your password")
        }),

        onSubmit: async (values) => {
            try {
                const response = await axios.put(
                    "/resetpassword",
                    {
                        password: values.password
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                toast.success(response.data.message);

                setTimeout(() => {
                    navigate("/login");
                }, 2000);

            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Something went wrong"
                );
            }
        }
    });

    if (loading) {
        return (
            <div className="reset-status-container">
                <div className="reset-status-card">
                    <h1>Verifying...</h1>
                    <p>
                        Please wait while we verify your password reset link.
                    </p>
                </div>
            </div>
        );
    }

    if (!isValidation) {
        return (
            <div className="reset-status-container">
                <div className="reset-status-card">

                    <h2>Invalid or Expired Link</h2>

                    <p>
                        This password reset link is invalid or has expired.
                    </p>

                    <Link
                        to="/ForgotPassword"
                        className="request-new-link"
                    >
                        Request a new link
                    </Link>

                </div>
            </div>
        );
    }

    return (
        <>
            <div className="reset-password-container">

                <div className="reset-password-card">

                    <h2>Reset Password</h2>

                    <p className="reset-subtitle">
                        Enter your new password below.
                    </p>

                    <form onSubmit={formik.handleSubmit}>

                        <label>New Password</label>

                        <input
                            type="password"
                            placeholder="Enter new password"
                            {...formik.getFieldProps("password")}
                        />

                        {formik.touched.password &&
                            formik.errors.password && (
                                <p className="reset-error-message">
                                    {formik.errors.password}
                                </p>
                            )}


                        <label>Confirm Password</label>

                        <input
                            type="password"
                            placeholder="Confirm new password"
                            {...formik.getFieldProps("confirmPassword")}
                        />

                        {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword && (
                                <p className="reset-error-message">
                                    {formik.errors.confirmPassword}
                                </p>
                            )}

                        <button type="submit">
                            Reset Password
                        </button>

                    </form>

                </div>

            </div>

            <ToastContainer />
        </>
    );
};

export default ResetPassword;