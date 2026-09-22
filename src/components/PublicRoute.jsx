import React from 'react'
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ islogged, children }) => {
    if (islogged) {
       return <Navigate to="/" replace/>
    }
    return children;
}

export default PublicRoute