import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Movie } from '../services/api';
import { getMovieById } from '../services/api';
import { getFavorites, removeFromFavorites } from '../services/favorites';

const FALLBACK_POSTER = 'https://placehold.co/600x900/111827/e5e7eb?text=No+Poster';

export default function Favorites() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      const ids = getFavorites();

      if (ids.length === 0) {
        setMovies([]);
        setLoading(false);
        return;
      }

      const data = await Promise.all(
        ids.map(async (id) => {
          try {
            return await getMovieById(id);
          } catch {
            return null;
          }
        }),
      );

      setMovies(data.filter((movie): movie is Movie => movie !== null));
      setLoading(false);
    }

    void loadFavorites();
  }, []);

  function handleRemove(movieId: string) {
    removeFromFavorites(movieId);
    setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
  }

  return (
    <main className="page-shell">
      <div className="details-actions">
        <Link className="secondary-link" to="/">
          Back to catalog
        </Link>
      </div>

      <header className="hero-panel compact">
        <div>
          <p className="eyebrow">Favorites</p>
          <h1>Favorite movies</h1>
        </div>
      </header>

      {loading ? <p className="status-message">Loading...</p> : null}
      {!loading && movies.length === 0 ? (
        <p className="status-message">Your favorites list is empty.</p>
      ) : null}

      <section className="movies-grid">
        {movies.map((movie) => (
          <article className="movie-card" key={movie.id}>
            <Link className="poster-link" to={`/movie/${movie.id}`}>
              <img
                src={movie.primaryImage?.url || FALLBACK_POSTER}
                alt={movie.originalTitle || 'Movie poster'}
              />
            </Link>

            <div className="movie-meta">
              <div>
                <h2>{movie.originalTitle || 'Untitled'}</h2>
                <p className="muted-text">{movie.releaseDate?.year ?? movie.startYear ?? 'N/A'}</p>
              </div>

              <div className="card-actions">
                <Link className="details-link" to={`/movie/${movie.id}`}>
                  Details
                </Link>

                <button className="favorite-button active" type="button" onClick={() => handleRemove(movie.id)}>
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
