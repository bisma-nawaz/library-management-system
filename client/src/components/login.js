import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

const Login = () => {
    const [credentials, setCredentials] = useState({
        rollNumber: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/user/login', credentials);
            localStorage.setItem('token', response.data.token);
            const userRole = response.data.result.role;
            
            if (userRole === 'student') {
                navigate('/student-dashboard');
            } else if (userRole === 'staff') {
                navigate('/staff-dashboard');
            } else if (userRole === 'manager') {
                navigate('/manager-dashboard');
            } else {
                navigate('/homepage');
            }
        } catch (err) {
            const errorMessage = err.response ? err.response.data.message : 'The server is not responding. Please try again later.';
            setError(errorMessage);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    return (
        <div className="login-page">
            <div className="login-header">
                Management <span className="lib-name">System</span>
            </div>
            <div className='partition'></div>
            <form className='form' onSubmit={handleLogin}>
                <div>
                    <input
                        name="rollNumber"
                        className="user-inp"
                        type='text'
                        placeholder='Roll Number'
                        value={credentials.rollNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        name="password"
                        className="pass-inp"
                        type='password'
                        placeholder='Password'
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit" className="sub-button">Login</button>
                </div>
            </form>
            {error && <div className="error-message">{error}</div>}
            <div className="question">
                Don't have an account?
                <Link to="/signup" className="signup-link">Signup</Link>
            </div>
        </div>
    );
}

export default Login;
