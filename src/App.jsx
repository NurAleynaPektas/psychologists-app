import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Psychologists from "./pages/Psychologists/Psychologists";
import Favorites from "./pages/Favorites/Favorites";
import Layout from "./components/Layout/Layout";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/psychologists" element={<Psychologists />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Layout>
  );
}
