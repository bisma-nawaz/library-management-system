import React from 'react';
import { Navigate } from 'react-router-dom';

const Private = ({ Component }) => {
    // if the toek exists in the local storage that was used for login,signup, remove the token by stting the bool to false 
    const token = localStorage.getItem('token');
    const auth = !!token; 
    return auth ? <Component /> : <Navigate to="/login" />;
}

export default Private;
