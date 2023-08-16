import React from 'react';
import './profile.css';
import useAuth from '../../hooks/useAuth.js';
const Profile = () => {
  const { auth } = useAuth();

  return (
    <div className="profile-container">
      <div className="profile-sum">
        <div className="profile-picture">
          <img src="" alt=" " />
        </div>
        <div className="profile-menu">
          <ul className="menu-items">
            <li>Dashboard</li>
            <li>Account Details</li>
            <li>Change Password</li>
            <li>Logout</li>
          </ul>
        </div>
      </div>

      <div className="settings-view">
        <h1>{auth.uname}&apos;s profile</h1>
        <h3 className="sl-header">Account Settings</h3>
        <form className="profile-form">
          <div className="settings-email">
            <p>Email Address:</p>
            <input type="text" placeholder="Email Address" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
