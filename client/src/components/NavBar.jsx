import React from 'react';
import LogOutButton from './LogoutButton';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/navbar.css'; 

const NavBar = () => {
  const navigate = useNavigate();

  const toWelcome = () => {
      navigate('/welcome');
  };

  const toActivity = () => {
    navigate('/activity');
  };

  const toFriends = () => {
      navigate('/friends');
  };

  const toAccount = () => {
    navigate('/account');
  };

  return(
        <div className="nav-bar">
        <ul className="nav-list">
            <button onClick={toWelcome}>Home</button>
            <button onClick={toActivity}>Lost Page</button>
            <button onClick={toFriends}>Found Page</button>
            <button onClick={toAccount}>Account</button>
        </ul>
        </div>
    );

}

export default NavBar;