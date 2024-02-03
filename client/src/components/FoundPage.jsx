import React, { useEffect, useState } from "react";
import { useNavigate,  } from "react-router-dom";
//import "../stylesheets/XXX.css";
import NavBar from "./NavBar";


function App() {
    const apiUrl = process.env.REACT_APP_URL || "http://localhost:8000";
    const navigate = useNavigate();
    const [foundData, setFoundData] = useState([
      //test data
      { id: 1, petName: 'Dog 1', date: '2022-01-01', location: 'Park', species: 'dog', contact: '123456', description: 'Found a dog', kept: 'no', image: 'dog1.jpg' },
      { id: 2, petName: 'Cat 2', date: '2022-02-01', location: 'Street', species: 'cat', contact: '654321', description: 'Found a cat', kept: 'yes', image: 'cat1.jpg' },
      { id: 3, petName: 'Dog 3', date: '2022-03-01', location: 'Beach', species: 'dog', contact: '987654', description: 'Found another dog', kept: 'no', image: 'dog2.jpg' },
      { id: 4, petName: 'Cat 4', date: '2022-04-01', location: 'Garden', species: 'cat', contact: '111222', description: 'Found another cat', kept: 'yes', image: 'cat2.jpg' },
      { id: 5, petName: 'Cat 5', date: '2022-04-01', location: 'Garden', species: 'cat', contact: '111222', description: 'Found another cat', kept: 'yes', image: 'cat2.jpg' },
      { id: 6, petName: 'Cat 6', date: '2022-04-01', location: 'Garden', species: 'cat', contact: '111222', description: 'Found another cat', kept: 'yes', image: 'cat2.jpg' },
    ]);
    const toFoundForm = () => {
      navigate("/found-form");
    };
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
      // Function to fetch all found information
    const fetchFoundData = async () => {
        try {
        const response = await fetch(`${apiUrl}/api/getAllFoundData`);
        const data = await response.json();
        setFoundData(data);
        } catch (error) {
        console.error("Error fetching found data:", error);
        }
    };
    useEffect(() => {
        // Fetch found data when the component mounts
        fetchFoundData();
      }, []);

    const handleSubmit = async (event) => {

    // Fetch updated found data after submitting a new post
    fetchFoundData();
    };
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };
    const handleShowDetails = (item) => {
      // Toggle details visibility for the selected item
      setSelectedItem(selectedItem === item ? null : item);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = foundData.slice(indexOfFirstItem, indexOfLastItem);
    return (
      <div className="app">
      <NavBar></NavBar>
      <h2>These pets are found!</h2>
        <section className="button-container">
          <button onClick={toFoundForm} className="form-button">Found A Pet</button>
        </section>
        <main className="main-content">
            <section className="found-info">
            <h2>Found Information</h2>
            <ul>
            {currentItems.map((foundItem) => (
                <li key={foundItem.id}>
                <table>
                    <tbody>
                    <tr>
                        <td>
                        {foundItem.image && (
                            <img
                            src={foundItem.image}
                            alt={foundItem.petName}
                            style={{ maxWidth: "300px", maxHeight: "300px" }}
                            />
                        )}
                        </td>
                        <td>
                            <h2>Pet Name: {foundItem.petName}</h2>
                            <h3>Location: {foundItem.location}</h3>
                            <p>Species: {foundItem.species}</p>
                            <p>Last seen date: {foundItem.date}</p>
                            <p>Kept: {foundItem.kept}</p>
                            <button className="detail-button" onClick={() => handleShowDetails(foundItem)}>
                          {selectedItem === foundItem ? "Hide Details" : "Show Details"}
                        </button>
                        {/* Display details only for the selected item */}
                        {selectedItem === foundItem && (
                          <div className="pet-details">
                            <h4>Details</h4>
                            <ul>
                              <li>Description: {foundItem.description}</li>
                              <li>Contact: {foundItem.contact}</li>
                            </ul>
                          </div>
                        )}
                        </td>
                    </tr>
                    </tbody>
                </table>
                </li>
            ))}
            </ul>
            <div className="pagination">
            {Array.from({ length: Math.ceil(foundData.length / itemsPerPage) }, (_, index) => (
                <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
                </button>
            ))}
            </div>
        </section>
        </main>
      </div>
    );
  }
  
  export default App;
  