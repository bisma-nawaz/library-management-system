import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignoutButton = () => {
    const navigate = useNavigate();

  const handleSignout = () => {
    // remove toek from the local storage: 
    localStorage.removeItem('token');
    // go to user login page whne signed out 
    navigate('/login');
  };

  return (
    <button style={{ marginBottom: '10px', marginLeft: '10px'}}  onClick={handleSignout}>Sign Out</button>
  );
};

export default SignoutButton;
