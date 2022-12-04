import Home from "./components/Home/home";
import "./App.css";
import Campaign from "./components/Campaign/Campaign";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaign" element={<Campaign />} />
      </Routes>
    </div>
  );
}

export default App;
