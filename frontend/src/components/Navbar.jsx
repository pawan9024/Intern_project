
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Check if token is expired
                if (decoded.exp * 1000 < Date.now()) {
                    // Token expired
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                    setCurrentUserId(null);
                    toast.info('Your session has expired. Please log in again.');
                } else {
                    setIsLoggedIn(true);
                    setCurrentUserId(decoded.id);
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                setCurrentUserId(null);
            }
        } else {
            setIsLoggedIn(false);
            setCurrentUserId(null);
        }
    }, [history.location.pathname]); // Re-check auth status on route change

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setCurrentUserId(null);
        toast.success('Logged out successfully!');
        history.push('/login');
    };

    return (
        <nav className="bg-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold rounded-md px-3 py-1 bg-blue-300 hover:bg-blue-700 transition duration-300 ease-in-out">
                    <Link to="/">Mini LinkedIn</Link>
                </div>
                <div className="space-x-4 flex items-center">
                    <Link to="/" className="text-gray-300 hover:text-white font-medium px-3 py-2 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out">Home</Link>
                    {isLoggedIn ? (
                        <>
                            <Link to={`/profile/${currentUserId}`} className="text-gray-300 hover:text-white font-medium px-3 py-2 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out">Profile</Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-400 text-white font-medium px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-300 hover:text-white font-medium px-3 py-2 rounded-md hover:bg-gray-700 transition duration-300 ease-in-out">Login</Link>
                            <Link to="/register" className="text-white bg-blue-500 font-medium px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
