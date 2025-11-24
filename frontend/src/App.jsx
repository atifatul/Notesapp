import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyNotes from "./pages/MyNotes";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      {/* Route define kar rahe hain: Kaunse URL par kya dikhana hai */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/mynotes" element={<MyNotes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
