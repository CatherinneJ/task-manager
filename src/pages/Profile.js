import React from 'react';
import {Navigate} from 'react-router-dom';
import './profile.css';

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if(!user || user.role !== 'user'){
        return <Navigate to="./login" replace />;
    }

    return (
    <div className="profile-cont">
        <h1 className="profile-text">Welcome, {user?.username}!</h1>
        <h2 className="profile-text">Your profile</h2>
        <p className="profile-p">Your role: {user?.role}</p>

        <button className="profile-btn" onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("tasks");
            window.location.href = "/";
        }}>
            Log Out
        </button>
    </div>
    );
};

export default Profile;