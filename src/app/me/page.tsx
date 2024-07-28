"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';  
import Stronavigation from '../components/storenavigation';
import Footer from '../components/footer';
import Loading from '@/app/loading/loading'; 

const UserProfile = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password:'',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axios.get('/api/users/me');
                setUser(prevUser => ({ ...prevUser, ...data.data }));
                // setLoading(false);
            } catch (err :any) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 1800);
    
        return () => clearTimeout(timer);
      }, []);

    const handleChange = (event:any) => {
        const { name, value } = event.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        if (user.newPassword !== user.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        try {
            const updateData = {
                ...user,
                password: user.newPassword 
            };
            await axios.put('/api/users/me', updateData);
            alert('Profile Updated Successfully!');
            setUser({ ...user, newPassword: '', confirmPassword: '' }); // Reset password fields
        } catch (err:any) {
            setError(err.response?.data?.message || err.message);
        }
    };

    if (error) return <p>Error: {error}</p>;

    return (
<div className="bg-white">
{loading && <Loading />} 

<Stronavigation/>
{/* <iframe title="wumela" width="1440" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=840b3ebb-caf1-4dff-98e4-30195c15199d&autoAuth=true&ctid=dbd6664d-4eb9-46eb-99d8-5c43ba153c61"></iframe>         */}
<div className="user-profile">
            
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    
                    <label>First Name</label>
                    <input type="text" name="firstName" value={user.firstName} onChange={handleChange} />
                </div>
		<div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={user.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Current Password</label>
                    <input type="password" name="password" value={user.password} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>New Password</label>
                    <input type="password" name="newPassword" value={user.newPassword} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Confirm New Password</label>
                    <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} />
                </div>
               
                <button type="submit" className="submit-btn">Save Changes</button>
            </form>
        </div>
        <Footer/>

        </div>

    );
};

export default UserProfile;
