import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "./styles/variables.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
          <div className="theme-orange">
            <App />
          </div>
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
 
);
