import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Signin from "./Components/Register/Signin";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
      </Routes>
    </div>
  );
}

export default App;
