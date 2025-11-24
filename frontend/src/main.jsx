import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios"; // 1. Axios Import kiya

// 2. Base URL set kiya (Apna Render wala URL yahan paste karo)
// Note: Last mein slash '/' mat lagana
axios.defaults.baseURL = "https://notesapp-atif-reyyani.onrender.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
