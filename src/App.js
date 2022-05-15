import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import IndividualMovie from "./components/IndividualMovie";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/movies/:id" element={<IndividualMovie />} />
      </Routes>
    </Router>
  );
}

export default App;
