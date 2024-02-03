import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import FoundPostPage from "./components/NewFoundPostPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/found-post" element={<FoundPostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
