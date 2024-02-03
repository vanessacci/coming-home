import React from "react";
import { getAuth } from 'firebase/auth';
import app from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


function App() {
    const auth = getAuth(app);
    const navigate = useNavigate();
    const handleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            console.log("handling sign in");
            await signInWithPopup(auth, provider);
            navigate('/welcome'); 
        } catch (error) {
            console.log("Error signing in: ", error);
        }
    };
    return (
        <div className="app">
            <header className="header">
                <h1>♥️ Coming Home</h1>
                <button className="button-37" onClick={handleSignIn}>Log in</button>
            </header>
            <main className="main-content">
                <section className="introduction">
                    <h2>Introduction</h2>
                    <p>🐶 Hello! Everyone in this community will do the best to help find your lost pet.</p>
                    <p>🐱 Although we hope that you never need to use this app, please log in to view posts about lost pets nearby.</p>
                    <p>🐰 We truly wish every little soul can go back home.</p>
                </section>
            </main>
        </div>
    );
}

export default App;