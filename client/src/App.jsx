import "./assets/styles/App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from "./assets/pages/LandingPage"


function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
    </Routes>
  </Router>
  )
}

export default App;
