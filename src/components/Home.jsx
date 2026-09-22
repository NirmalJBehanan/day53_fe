import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../App.css"
import axios from 'axios';
const Home = ({ islogged, setislogged }) => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        localStorage.removeItem("token")
        setislogged(false)
        navigate("/")
    }
    return (
        <>
            <div className='navbar'>
                <div className='left'>
                    <h1>logo</h1>
                </div>
                <div className='right'>
                    {
                        islogged ?
                            <>
                                <Link to="/profile">
                                    <button className='nav-btn'>
                                        profile
                                    </button>
                                </Link>

                                <button onClick={handleLogout} className='nav-btn'>
                                    logout
                                </button>

                            </>
                            :
                            <>
                                <Link to="/login">
                                    <button className='nav-btn'>
                                        login
                                    </button>
                                </Link>
                                <Link to="/register">
                                    <button className='nav-btn'>
                                        Register
                                    </button>
                                </Link>
                            </>
                    }
                </div>
            </div>
        </>
    )
}

export default Home