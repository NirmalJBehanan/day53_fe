import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../App.css"
const Profile = () => {
    const [user, setUser] = useState(null)
    const [isLoding, setIsLoading] = useState(true)
    useEffect(() => {
        const getUser = async () => {
            const token = localStorage.getItem("token")

            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get("/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const profileResponse = response.data
                setUser(profileResponse.data)
                 console.log(user,profileResponse)
            } catch (error) {
                console.log(error)
                
            }
            finally {
                setIsLoading(false)
            }

        }
        getUser();
    }
        , [])

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
        {user ? 

            <>
                <div className="profile-container">
                    <div className="profile-card">
                        <h1>My Profile</h1>

                        <div className="profile-details">
                            <p>
                                <strong>Name:</strong> {user.name}
                            </p>

                            <p>
                                <strong>Email:</strong> {user.email}
                            </p>
                            <p>
                                <strong>Role:</strong> {user.role}
                            </p>
                        </div>
                    </div>
                </div>
            </>: 
            <>
                <h1>No Profile Found</h1>
            </>
        }</>
)}
    export default Profile