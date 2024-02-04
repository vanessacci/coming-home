import React from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/newFoundPost.css";

function App() {
  const apiUrl = process.env.REACT_APP_URL || "http://localhost:8000";

  const navigate = useNavigate();
  const toHome = () => {
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      petName: event.target.elements["pet-name"].value,
      date: event.target.date.value,
      location: event.target.location.value,
      species: event.target.species.value,
      contact: event.target.contact.value,
      description: event.target.description.value,
      kept: event.target.kept.value,
    };

    const submitData = async (imageData) => {
      if (imageData) {
        formData.image = imageData;
      }

      console.log(formData);
      try {
        const response = await fetch(`${apiUrl}/api/found-form-upload`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        alert(data.message);
        toHome();
      } catch (error) {
        console.error("Error adding lost form:", error);
      }
    };

    if (event.target.image && event.target.image.files.length > 0) {
      const file = event.target.image.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        submitData(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      submitData(null);
    }
  };

  /**
   * Handle for submission for adding an expense and submit a post request to the server
   * @param {Event} event object triggered by the submit button
   */
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const formData = {
  //     petName: event.target.petName.value,
  //     date: event.target.date.value,
  //     location: event.target.location.value,
  //     species: event.target.species.value,
  //     contact: event.target.contact.value,
  //     description: event.target.description.value,
  //     kept: event.target.kept.value,
  //     image: null,
  //   };

  //   if (event.target.image.files.length > 0) {
  //     const file = event.target.image.files[0];
  //     const reader = new FileReader();

  //     reader.onloadend = async () => {
  //       formData.image = reader.result;

  //       // Make a POST request to send form data
  //       try {
  //         const response = await fetch(`${apiUrl}/api/found-form-upload`, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(formData),
  //         });

  //         const data = await response.json();
  //         alert(data.message);
  //         toHome();
  //       } catch (error) {
  //         console.error("Error adding new post:", error);
  //       }
  //     };

  //     reader.readAsDataURL(file);
  //   } else {
  //     console.log("No image uploaded");
  //   }
  // };

  return (
    <div className="add-form-container">
      <header className="form-header">
        <button className="back-button" onClick={toHome}>
          ←
        </button>
        <h2>If you see a lost pet, please fill out the form ⬇️</h2>
      </header>
      <form
        className="post-form"
        onSubmit={handleSubmit}
        data-testid="form_test"
      >
        <label htmlFor="pet_name">Pet Name (if known):</label>
        <input id="pet-name" name="pet-name"></input>

        <label htmlFor="date">Date Seen:</label>
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
          <option value="dog">dog</option>
          <option value="cat">cat</option>
          <option value="others">others</option>
        </select>

        <label htmlFor="description">Description</label>
        <input
          className="post-input"
          type="text"
          id="description"
          name="description"
          required
        />

        <label htmlFor="contact">Contact (Optional):</label>
        <input className="post-input" type="text" id="contact" name="contact" />

        <label htmlFor="kept">Did you keep him/her?:</label>
        <select id="kept" name="kept">
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        <label htmlFor="image">Pet Image:</label>
        <input type="file" id="image" name="image" accept="image/*" />

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
