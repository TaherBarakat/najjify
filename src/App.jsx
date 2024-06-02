import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signin from "./Components/Register/Signin";
import HomePageRF from "./Components/HomePageRF";
import HomePage from "./Components/HomePage";
import Signup from "./Components/Register/Signup";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePageRF />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
}

export default App;
