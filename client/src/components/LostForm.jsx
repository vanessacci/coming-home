import React from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/newFoundPost.css";

function App() {
  const apiUrl = process.env.REACT_APP_URL || "http://localhost:3001";
  const navigate = useNavigate();

  const toHome = () => {
    navigate("/");
  };

  /**
   * Handle for submission for adding an expense and submit a post request to the server
   * @param {Event} event objevt triggered by the submit button
   */
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   // const formData = {
  //   //     petName: event.target.
  //   //   date: event.target.date.value,
  //   //   // user: user.email,
  //   //   subject: event.target.subject.value,
  //   //   category: event.target.category.value,
  //   //   amount:
  //   //     parseFloat(event.target.amount.value) *
  //   //     parseFloat(event.target.paid.value),
  //   //   friend: event.target.with.value,
  //   //   completed: false,
  //   // };

  //   console.log(formData);

  //   // Make a POST request to send form data
  //   try {
  //     const response = await fetch(`${apiUrl}/api/lostFormUpload`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await response.json();
  //     alert(data.message);
  //     toActivity();
  //   } catch (error) {
  //     console.error("Error adding expense:", error);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = {
      petName: event.target.petName.value,
      date: event.target.date.value,
      location: event.target.location.value,
      species: event.target.species.value,
      phone: event.target.phone.value,
      email: event.target.email.value,
      description: event.target.description.value,
      image: null,
    };
  
    if (event.target.image.files.length > 0) {
      const file = event.target.image.files[0];
      const reader = new FileReader();
  
      reader.onloadend = async () => {
        formData.image = reader.result;
        console.log(formData);
        try {
          const response = await fetch(`${apiUrl}/api/lostFormUpload`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
  
          const data = await response.json();
          alert(data.message);
          toHome();
        } catch (error) {
          console.error("Error adding expense:", error);
        }
      };
  
      // Read as a data URL (base64 string)
      reader.readAsDataURL(file);
    } else {
      console.log("No image uploaded.");
    }
  };
  

  return (
    <div className="add-expense-container">
      <header className="form-header">
        <button className="back-button" onClick={toHome}>
          ←
        </button>
        <h1>If you lost a pet, please fill out the form:</h1>
      </header>
      <form
        className="post-form"
        onSubmit={handleSubmit}
        data-testid="form_test"
      >
        <label htmlFor="pet_name">Pet Name:</label>
        <input id="pet-name" name="pet-name"></input>

        <label htmlFor="date">Date:</label>
        <input
          className="post-input"
          type="date"
          id="date"
          name="date"
          required
        />

        <label htmlFor="location">Location:</label>
        <input
          className="post-input"
          type="text"
          id="location"
          name="location"
          required
        />

        <label htmlFor="species">Species:</label>
        <select id="species" name="species">
          <option value=""></option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="others">Others, Specify in Description below</option>
        </select>

        <label htmlFor="amount">Phone:</label>
        <input className="post-input" type="text" name="phone" id="phone" required/>

        <label htmlFor="amount">Email:</label>
        <input className="post-input" type="text" name="email" id="email" required/>

        <label htmlFor="paid">Description</label>
        <input
          className="post-input"
          type="text"
          id="description"
          name="description"
        />

        <label htmlFor="image">Pet Image:</label>
        <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        />

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
