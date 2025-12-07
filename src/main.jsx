import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import "./styles/variables.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import "izitoast/dist/css/iziToast.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(

    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>

);
