import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Psychologists from "./pages/Psychologists/Psychologists";
import Favorites from "./pages/Favorites/Favorites";
import Layout from "./components/Layout/Layout";
import { useAuth } from "./context/AuthContext";


function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}

export default function App() {
  return (
    <Layout>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/psychologists" element={<Psychologists />} />

        {/* PROTECTED */}
        <Route
          path="/favorites"
          element={
            <RequireAuth>
              <Favorites />
            </RequireAuth>
          }
        />
      </Routes>
    </Layout>
  );
}
