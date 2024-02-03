import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import FoundForm from "./components/FoundForm";
import Home from "./components/Home";
import LostForm from "./components/LostForm";
import LostPage from "./components/LostPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/found-form" element={<FoundForm />} />
        <Route path="/lost-form" element={<LostForm />} />
        <Route path="/lost-page" element={<LostPage />} />
        {/* <Route path="/found-page" element={} /> */}
      </Routes>
    </Router>
  );
}

export default App;
