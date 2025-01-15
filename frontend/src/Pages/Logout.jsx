import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios for API calls
import { toast } from 'react-toastify';  // Optional for notifications

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                // Make an API call to logout
                const response = await axios.get('http://localhost:5000/auth/logout', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Pass the token stored in localStorage or cookies
                    },
                });

                // If successful, clear localStorage or cookies and show success message
                localStorage.removeItem('token');
                toast.success('Logged out successfully!', { autoClose: 1000 });

                // Redirect to login page
                navigate('/auth/login');
            } catch (error) {
                toast.error('Error logging out', { autoClose: 1000 });
            }
        };

        logoutUser();
    }, [navigate]);

    return (
        <div>
            <p>Logging you out...</p>
        </div>
    );
};

export default Logout;
