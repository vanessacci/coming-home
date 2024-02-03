import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function App() {
  const apiUrl = process.env.REACT_APP_URL || "http://localhost:8000";
//   console.log(apiUrl)
  const navigate = useNavigate();
  const [lostPets, setLostPets] = useState([]);
  const [showDetails, setShowDetails] = useState({});
  
  
  const toLostForm = () => {
    navigate("/lost-form");
  };

  useEffect(() => {
    fetchLostPets();
  });

  const fetchLostPets = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/lost/not-found/`); 
      const data = await response.json();
    //   console.log(data);
      setLostPets(data);
    //   console.log(lostPets);
    } catch (error) {
      console.error("Failed to fetch lost pets:", error);
    }
  };
  const toggleDetails = (index) => {
    setShowDetails((prevShowDetails) => ({
        ...prevShowDetails,
        [index]: !prevShowDetails[index],
    }));
};

  return (
    <div className="app">

        <NavBar></NavBar>
        <h2>These pets are lost, please help to find them!</h2>
        <section className="button-container">
          <button onClick={toLostForm} className="form-button">Lost A Pet</button>
        </section>
        <ul className='pet-ul'>
            {/* map pets class below */}
            {lostPets.map((pet, index) => (
            <div className="pets"> 
                <li key={pet._id}>
                    <table><tr>
                        <td>
                            <img
                            src={pet.image}
                            alt={pet.petName}
                            style={{ width: '300px', height:'300px'}} 
                            />
                        </td>
                        <td>
                            <h2>{pet.petName}</h2>
                            <h3>{pet.location}</h3>
                            <p>{pet.species}</p>
                            <p>{pet.location}</p>
                            <button className="detail-button" onClick={() => toggleDetails(index)}>
                            {showDetails[index] ? 'Hide Details' : 'Show Details'}
                        </button>
                        {/* write show details function for pet-details class below*/}
                        {showDetails[index] && (
                        <div className='pet-details'>
                                <h4>Details</h4>
                                <ul>
                                    <li>{pet.description}</li>
                                    <li>{pet.email}</li>
                                    <li>{pet.phone}</li>
                                </ul>
                            </div>
                            )}
                        </td>
                    </tr></table>
                </li>
            </div>))}
        </ul>
    </div>
  );
}

export default App;
