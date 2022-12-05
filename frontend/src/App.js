import Home from "./components/Home/home";
import "./App.css";
import Campaign from "./components/Campaign/Campaign";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import Request from "./components/Requests/Request";
import NewRequest from "./components/Requests/NewRequest";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaign" element={<Campaign />} />
        <Route path="/request" element={<Request />} />
        <Route path="/newRequest" element={<NewRequest />} />
      </Routes>
    </div>
  );
}

export default App;
