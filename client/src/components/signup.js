import React, { useState } from 'react';
import axios from 'axios';
import '../styles/signup.css';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [userData, setUserData] = useState({
        rollNumber: '',
        username: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/user/signup', userData);
            console.log(response.data);
            // redirect to login after successful signup 
            navigate('/login');
        } catch (error) {
            console.error('Signup error:', error.response?.data.message || error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        name="rollNumber"
                        type="text"
                        placeholder="Roll Number"
                        value={userData.rollNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={userData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit" className="sub-button">Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;