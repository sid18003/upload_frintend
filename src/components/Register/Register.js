import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student', // Default role is 'student'
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Check if the user is already logged in
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/auth-status', {
                    withCredentials: true, // Ensure credentials are sent with the request
                });

                if (response.data.success) {
                    // If logged in, redirect to the login page
                    navigate('/login');
                }
            } catch (error) {
                // If user is not logged in, stay on the register page
                console.log('User is not logged in or session expired');
            }
        };

        checkLoginStatus();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword, role } = formData;

        // Basic validation
        if (!name || !email || !password || !confirmPassword) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/v1/register', {
                name,
                email,
                password,
                role,
            });

            if (response.data.success) {
                setSuccessMessage('Registration successful!');
                setErrorMessage('');
                // Optionally redirect to login page after registration
                setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
            } else {
                setErrorMessage(response.data.message || 'Registration failed!');
            }
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div style={{ margin: '20px auto', maxWidth: '400px', textAlign: 'center' }}>
            <h2>Register</h2>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

            <form onSubmit={submitHandler}>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{
                            padding: '10px',
                            width: '100%',
                            boxSizing: 'border-box',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                            padding: '10px',
                            width: '100%',
                            boxSizing: 'border-box',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{
                            padding: '10px',
                            width: '100%',
                            boxSizing: 'border-box',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        style={{
                            padding: '10px',
                            width: '100%',
                            boxSizing: 'border-box',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        style={{
                            padding: '10px',
                            width: '100%',
                            boxSizing: 'border-box',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                    >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>
                </div>

                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '4px',
                    }}
                >
                    Register
                </button>
            </form>

            <p style={{ marginTop: '20px' }}>
                Already have an account? <a href="/login">Login here</a>
            </p>
        </div>
    );
};

export default Register;
