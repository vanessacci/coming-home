import React from "react";
import { useNavigate } from "react-router-dom";
import '../stylesheets/home.css';
import NavBar from "./NavBar";

function App() {
  const navigate = useNavigate();
  const toLostForm = () => {
    navigate("/lost-form");
  };
  const toFoundForm = () => {
    navigate("/found-form");
  };

  return (
    <div className="app">
    <NavBar></NavBar>
      <header className="header">
        <h1> ❤️ Coming Home</h1>
      </header>
      <main className="main-content">
        <section className="introduction">
          <h2>Introduction</h2>
          <p>
            🐶 Hello! Everyone in this community will do the best to help find
            your lost pet.
          </p>
          <p>
            🐱 Although we hope that you never need to use this app, please use the forms below or view posts about lost pets nearby.
          </p>
          <p>🐰 We truly wish every little soul can go back home.</p>
        </section>
        <section className="button-container">
          <button onClick={toLostForm} className="form-button">Lost A Pet</button>
        </section>
        <section className="button-container">
          <button onClick={toFoundForm} className="form-button">Found A Pet</button>
        </section>
      </main>
    </div>
  );
}

export default App;
