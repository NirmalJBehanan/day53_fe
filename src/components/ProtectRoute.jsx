import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectRoute = ({ islogged, children }) => {
    if (!islogged) {
       return <Navigate to="/" replace/>
    }
    return children;
}

export default ProtectRoute