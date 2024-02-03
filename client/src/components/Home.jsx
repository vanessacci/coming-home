import React from "react";
import { useNavigate } from "react-router-dom";

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
      <header className="header">
        <h1>♥️ Coming Home</h1>
      </header>
      <main className="main-content">
        <section className="introduction">
          <h2>Introduction</h2>
          <p>
            🐶 Hello! Everyone in this community will do the best to help find
            your lost pet.
          </p>
          <p>
            🐱 Although we hope that you never need to use this app, please log
            in to view posts about lost pets nearby.
          </p>
          <p>🐰 We truly wish every little soul can go back home.</p>
        </section>
        <section>
          <button onClick={toLostForm}>Lost A Pet</button>
        </section>
        <section>
          <button onClick={toFoundForm}>Found A Pet</button>
        </section>
      </main>
    </div>
  );
}

export default App;
