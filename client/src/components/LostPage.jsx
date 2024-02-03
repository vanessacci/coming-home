import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function App() {
  const apiUrl = process.env.REACT_APP_URL || "http://localhost:8000";
  const navigate = useNavigate();
  const [lostPets, setLostPets] = useState([]);
  
  const toLostForm = () => {
    navigate("/lost-form");
  };

  useEffect(() => {
    fetchLostPets();
  }, []);

  const fetchLostPets = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/lostPets`); 
      const data = await response.json();
      setLostPets(data);
    } catch (error) {
      console.error("Failed to fetch lost pets:", error);
    }
  };


  return (
    <div className="app">

        <NavBar></NavBar>
        <h2>These pets are lost, please help to find them!</h2>
        <section className="button-container">
          <button onClick={toLostForm} className="form-button">Lost A Pet</button>
        </section>
        <ul class='pet-ul'>
            {/* map pets class below */}
            <div className="pets"> 
                <li>
                    <table><tr>
                        <td>
                            <img
                            style={{ width: '300px', height:'300px'}} 
                            />
                        </td>
                        <td>
                            <h2>pet name</h2>
                            <h3>location</h3>
                            <p>species</p>
                            <p>last seen date</p>
                            <button className="detail-button" >
                            Show Details
                        </button>
                        {/* write show details function for pet-details class below*/}
                        <div className='pet-details'>
                                <h4>Details</h4>
                                <ul>
                                    <li>description</li>
                                    <li>contact</li>
                                </ul>
                            </div>
                        </td>
                    </tr></table>
                </li>
            </div>
        </ul>
    </div>
  );
}

export default App;
