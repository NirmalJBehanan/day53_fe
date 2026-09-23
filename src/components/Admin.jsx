import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Panel from './admin-component/Panel';
import Dashboard from "./admin-component/Dashboard";
import Users from "./admin-component/Users"
import Settings from "./admin-component/Settings"

import "../App.css"
const Admin = () => {
    const [isLoding, setIsLoading] = useState(true);
    const [adminPage, setAdminPage] = useState(false);
    const [activePage, setActivePage] = useState("dashboard");
    const navigate = useNavigate();
    const [total, setTotal] = useState(0);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const verifyAdmin = async () => {
            const token = localStorage.getItem("token")
            if (!token) {
                setIsLoading(false);
                return;
            }
            try {

                const response =await axios.get("/verify_admin",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setTotal(Number(response.data.data))
                    setUsers(response.data.user)
                setAdminPage(true)

            }
            catch (error) {
                console.log(error)
                localStorage.removeItem("token")
                // 2 seconds
                toast.error("Access denied. Admin privileges required.", {
                    autoClose: 2000
                });

                setTimeout(() => {
                    setAdminPage(false);
                    navigate("/");
                }, 2000);


            }
            finally {
                setIsLoading(false)
            }
        }
        verifyAdmin()
    }
        , [navigate])

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
    if (!adminPage) {
        return null;
    }

    return (
        <>
            <ToastContainer />

            <div className="admin-page">
                
                <Panel setActivePage={setActivePage} />

                <div className="admin-content">
                    {activePage === "dashboard" && <Dashboard total={total}/>}

                    {activePage === "users" && <Users users={users}/>}


                    {activePage === "settings" && <Settings />}
                </div>

            </div>
        </>
    );
}
export default Admin