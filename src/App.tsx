import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Favorites from './pages/favorites';
import Home from './pages/home';
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
