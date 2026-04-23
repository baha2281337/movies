import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
