import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import axios from 'axios';
import StudentData from './components/StudentData';

// Create context to store authentication data
export const AuthContext = createContext();

function App() {
  const [showData, setShowData] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/auth-status', {
                    withCredentials: true,
                });
                if (response.data.success) {
                    setIsLoggedIn(true);
                    setRole(response.data.role);  // Assuming the backend sends the role as well
                }
            } catch (error) {
                setIsLoggedIn(false);
                setRole(null);
            }
        };

        checkLoginStatus();
    }, []);

    const handleLogin = (userRole) => {
        setIsLoggedIn(true);
        setRole(userRole);
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/api/v1/logout', {}, { withCredentials: true });
            setIsLoggedIn(false);
            setRole(null);
            alert('Logged out successfully!');
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Failed to log out. Please try again.');
        }
    };
    const handleShowData = () => {
      setShowData(true);
    };
    return (
        <AuthContext.Provider value={{ isLoggedIn, role }}>
            <div className="App">
                <h1>Welcome to the Portal</h1>
                {isLoggedIn ? (
                    <div className="logged-in-container">
                       <button onClick={handleShowData} className="view-data-button">
              View Students Data
            </button>
            {showData && (
              role === 'student' ? (
                <div className="not-authorized">
                  You are not authorized to access this data
                </div>
              ) : (
                <>
                <h2>You are authorized person</h2>
                <StudentData />
                </>
                
              )
            )}
                      
                        <button
                            onClick={handleLogout}
                            className="logout-button"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="auth-container">
                        <Login onLogin={handleLogin} />
                        <Register />
                    </div>
                )}
            </div>
        </AuthContext.Provider>
    );
}

export default App;
