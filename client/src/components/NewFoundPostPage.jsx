import React from "react";
// import { UserContext } from '../../contexts/UserContext';
// import useFetchUser from '../../hooks/useFetchUser';
import { useNavigate } from "react-router-dom";
import "../stylesheets/newFoundPost.css";

function App() {
  const apiUrl = process.env.REACT_APP_URL || "http://localhost:3001";

  // hooks
  // const { user } = useContext(UserContext);
  // const currentUser = useFetchUser(user.email);
  const navigate = useNavigate();
  // console.log(user.email);
  // console.log(currentUser);

  const toActivity = () => {
    navigate("/welcome");
  };

  /**
   * Handle for submission for adding an expense and submit a post request to the server
   * @param {Event} event objevt triggered by the submit button
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      date: event.target.date.value,
      // user: user.email,
      subject: event.target.subject.value,
      category: event.target.category.value,
      amount:
        parseFloat(event.target.amount.value) *
        parseFloat(event.target.paid.value),
      friend: event.target.with.value,
      completed: false,
    };

    console.log(formData);

    // Make a POST request to send form data
    try {
      const response = await fetch(`${apiUrl}/api/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert(data.message);
      toActivity();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div className="add-expense-container">
      <header className="form-header">
        <button className="back-button" onClick={toActivity}>
          ←
        </button>
        <h1>Add new post</h1>
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

        <label htmlFor="amount">Contact (Optional):</label>
        <input className="post-input" type="text" />

        <label htmlFor="paid">Did you keep him/her?:</label>
        <select id="kept" name="kept">
          <option value=""></option>
          <option value="0.5">Yes</option>
          <option value="1">No</option>
        </select>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
