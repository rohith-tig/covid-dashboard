import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Statedetails from "./pages/Statedetails";

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/:stateId" element={<Statedetails />} />
  </Routes>
);

export default App;
