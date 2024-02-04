import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import "../stylesheets/lostFoundPage.css";

function App() {
  const apiUrl = process.env.REACT_APP_URL || "http://localhost:8000";
//   console.log(apiUrl)
    const navigate = useNavigate();
    const [lostPets, setLostPets] = useState([]);
    const [showDetails, setShowDetails] = useState({});
    const [selectedSpecies, setSelectedSpecies] = useState(null);
    const [dateRange, setDateRange] = useState({ from: "", to: "" });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
  
  const toLostForm = () => {
    navigate("/lost-form");
  };



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

const handleClear = () => {
    // Clear filters by resetting selectedSpecies and dateRange
    setSelectedSpecies(null);
    setDateRange({ from: "", to: "" });
  };

  useEffect(() => {
    // Fetch found data when the component mounts
    fetchLostPets();
  }, []);

// const handleSubmit = async (event) => {

// // Fetch updated found data after submitting a new post
// fetchLostPets();
// };

const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSpeciesChange = (event) => {
    setSelectedSpecies(event.target.value);
  };
  const handleDateFromChange = (event) => {
    setDateRange({ ...dateRange, from: event.target.value });
  };

  const handleDateToChange = (event) => {
    setDateRange({ ...dateRange, to: event.target.value });
  };
  const isDateInRange = (date) => {
    if (!dateRange.from && !dateRange.to) {
      return true; // No date range filter
    }

    const fromDate = dateRange.from ? new Date(dateRange.from) : null;
    const toDate = dateRange.to ? new Date(dateRange.to) : null;
    const itemDate = new Date(date);

    if (fromDate && toDate) {
      return itemDate >= fromDate && itemDate <= toDate;
    } else if (fromDate) {
      return itemDate >= fromDate;
    } else if (toDate) {
      return itemDate <= toDate;
    }

    return true;
  };

  const filteredData = lostPets
  .filter((item) => !selectedSpecies || item.species === selectedSpecies)
  .filter((item) => isDateInRange(item.date));

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className="app">

        <NavBar></NavBar>
        <h2 className='pageInfo'>These pets are lost😢 Please help to find them!</h2>
        <section className="button-container">
          <button onClick={toLostForm} className="form-button">Lost A Pet</button>
        </section>
        <section className = "filters-container">
        <label>
          Select Species:
          <select onChange={handleSpeciesChange} value={selectedSpecies || ''}>
            <option value="">All</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          Date Range:
          <input type="date" value={dateRange.from} onChange={handleDateFromChange} />
          <span> to </span>
          <input type="date" value={dateRange.to} onChange={handleDateToChange} />
        </label>
        <button onClick={handleClear} className="filter-button">
          Clear
        </button>
        </section>
        <ul className='pet-ul'>
            {/* map pets class below */}
            {currentItems.map((pet, index) => (
            <div className="pets"> 
                <li key={pet._id}>
                    <table ><tr>
                        <td>
                            <img
                            src={pet.image}
                            alt={pet.petName}
                            loading="lazy"
                            />
                        </td>
                        <td>
                            <h2>{pet.petName}</h2>
                            <h3>Last seen in {pet.location}</h3>
                            <p>Date: {pet.date}</p>
                            <p>Species: {pet.species}</p>
                            </td>
                        <td>
                            <button className="detail-button" onClick={() => toggleDetails(index)}>
                            {showDetails[index] ? 'Hide Details' : 'Show Details'}
                        </button>
                        {/* write show details function for pet-details class below*/}
                        {showDetails[index] && (
                        <div className='pet-details'>
                                <h4>Details</h4>
                                <ul>
                                    <li>Description: {pet.description}</li>
                                    <li>Email: {pet.email}</li>
                                    <li>Phone: {pet.phone}</li>
                                </ul>
                            </div>
                            )}
                        </td>
                    </tr></table>
                </li>
            </div>))}
        </ul>
        <div className="pagination">
            {Array.from({ length: Math.ceil(lostPets.length / itemsPerPage) }, (_, index) => (
                <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
                </button>
            ))}
            </div>
    </div>
  );
}

export default App;
