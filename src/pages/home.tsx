import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Movie } from '../services/api';
import { searchMovies } from '../services/api';
import { addToFavorites, getFavorites, removeFromFavorites } from '../services/favorites';

const DEFAULT_QUERY = 'batman';
const FALLBACK_POSTER = 'https://placehold.co/600x900/111827/e5e7eb?text=No+Poster';

function getPlotText(movie: Movie) {
  if (typeof movie.plot === 'string') {
    return movie.plot;
  }

  return movie.plot?.plotText ?? movie.description ?? 'Description is not available yet.';
}

function getYear(movie: Movie) {
  return movie.releaseDate?.year ?? movie.startYear ?? 'N/A';
}

export default function Home() {
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => getFavorites());

  async function runSearch(value: string) {
    setLoading(true);
    setError('');

    try {
      const data = await searchMovies(value);
      setMovies(data);
    } catch {
      setError('Failed to load movies. Check the API or your connection.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void runSearch(DEFAULT_QUERY);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void runSearch(query);
  }

  function toggleFavorite(movieId: string) {
    if (favoriteIds.includes(movieId)) {
      removeFromFavorites(movieId);
      setFavoriteIds((prev) => prev.filter((id) => id !== movieId));
      return;
    }

    addToFavorites(movieId);
    setFavoriteIds((prev) => [...prev, movieId]);
  }

  return (
    <main className="page-shell">
      <header className="hero-panel">
        <div>
          <p className="eyebrow">Movie Catalog</p>
          <h1>Search movies and open full details fast</h1>
          <p className="hero-copy">
            Search by title, open the movie page, and keep a personal favorites list.
          </p>
        </div>

        <Link className="secondary-link" to="/favorites">
          Favorites ({favoriteIds.length})
        </Link>
      </header>

      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="For example: interstellar"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error ? <p className="status-message error">{error}</p> : null}
      {!error && loading ? <p className="status-message">Loading...</p> : null}
      {!loading && !error && movies.length === 0 ? (
        <p className="status-message">No movies found for this query.</p>
      ) : null}

      <section className="movies-grid">
        {movies.map((movie) => {
          const isFavorite = favoriteIds.includes(movie.id);

          return (
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
                  <p className="muted-text">{getYear(movie)}</p>
                </div>

                <p className="movie-description">{getPlotText(movie)}</p>

                <div className="card-actions">
                  <Link className="details-link" to={`/movie/${movie.id}`}>
                    Details
                  </Link>

                  <button
                    className={isFavorite ? 'favorite-button active' : 'favorite-button'}
                    type="button"
                    onClick={() => toggleFavorite(movie.id)}
                  >
                    {isFavorite ? 'Remove' : 'Favorite'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
