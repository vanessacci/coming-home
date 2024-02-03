import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/navbar.css'; 

const NavBar = () => {
  const navigate = useNavigate();

  const toHome = () => {
      navigate('/');
  };

  const toLostPage = () => {
    navigate('/lost-page');
  };

  const toFoundPage = () => {
      navigate('/found-page');
  };



  return(
        <div className="nav-bar">
        <ul className="nav-list">
            <button onClick={toHome}>Home</button>
            <button onClick={toLostPage}>Lost Pets</button>
            <button onClick={toFoundPage}>Found Pets</button>
        </ul>
        </div>
    );

}

export default NavBar;