import './App.css';
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/NavBar";
import { MoviesPage } from "./pages/MoviesPage";
import { FeaturedMovie, MoviePage } from './pages/MoviePage';


function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
      </Routes>

    </div>
  );
}

export default App;
