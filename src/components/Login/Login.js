import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/v1/login', { email, password }, { withCredentials: true });
            if (response.data.success) {
                alert('Login successful!');
                onLogin(response.data.role); 
            } else {
                alert(response.data.message || 'Login failed!');
            }
        } catch (error) {
            console.error('Error during login: ', error);
            alert('An error occurred during login. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-field"
                />
                <button type="submit" className="submit-button">Login</button>
            </form>
            <p className="login-credentials">
                Test Credentials:<br />
                <strong>Student:</strong> Email: <code>student@gmail.com</code>, Password: <code>student@123</code><br />
                <strong>Teacher:</strong> Email: <code>teacher@gmail.com</code>, Password: <code>teacher@123</code>
            </p>
        </div>
    );
};

export default Login;
