import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/navbar.css'; 

const NavBar = () => {
  const navigate = useNavigate();

  const toHome = () => {
      navigate('/');
  };

  const toLostPage = () => {
    navigate('/lost-pets');
  };

  const toFoundPage = () => {
      navigate('/found-pets');
  };



  return(
        <div className="nav-bar">
            <img src='comingHomeLogo.png' className='logo'/>
        <ul className="nav-list">
            <button onClick={toHome}>Home</button>
            <button onClick={toLostPage}>Lost Pets</button>
            <button onClick={toFoundPage}>Found Pets</button>
        </ul>
        </div>
    );

}

export default NavBar;