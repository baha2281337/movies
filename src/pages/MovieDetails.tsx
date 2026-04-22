import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Movie } from '../services/api';
import { getMovieById } from '../services/api';
import { addToFavorites, getFavorites, removeFromFavorites } from '../services/favorites';

const FALLBACK_POSTER = 'https://placehold.co/600x900/111827/e5e7eb?text=No+Poster';

function getPlotText(movie: Movie) {
  if (typeof movie.plot === 'string') {
    return movie.plot;
  }

  return movie.plot?.plotText ?? movie.description ?? 'Description is not available yet.';
}

function getGenres(movie: Movie) {
  return movie.genres?.genres?.map((genre) => genre.text).filter(Boolean).join(', ') || 'N/A';
}

function getRuntime(movie: Movie) {
  if (!movie.runtimeSeconds) {
    return 'N/A';
  }

  return `${Math.round(movie.runtimeSeconds / 60)} min`;
}

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorite, setIsFavorite] = useState(() => (id ? getFavorites().includes(id) : false));

  useEffect(() => {
    if (!id) {
      setError('Movie not found.');
      setLoading(false);
      return;
    }

    const movieId: string = id;

    async function loadMovie() {
      setLoading(true);
      setError('');

      try {
        const data = await getMovieById(movieId);
        setMovie(data);
        setIsFavorite(getFavorites().includes(movieId));
      } catch {
        setError('Failed to load movie details.');
      } finally {
        setLoading(false);
      }
    }

    void loadMovie();
  }, [id]);

  function handleFavoriteClick() {
    const movieId = id;

    if (!movieId) {
      return;
    }

    if (isFavorite) {
      removeFromFavorites(movieId);
      setIsFavorite(false);
      return;
    }

    addToFavorites(movieId);
    setIsFavorite(true);
  }

  if (loading) {
    return <main className="page-shell status-message">Loading...</main>;
  }

  if (error || !movie) {
    return (
      <main className="page-shell">
        <p className="status-message error">{error || 'Movie not found.'}</p>
        <Link className="secondary-link" to="/">
          Back home
        </Link>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <div className="details-actions">
        <Link className="secondary-link" to="/">
          Back to catalog
        </Link>
        <Link className="secondary-link" to="/favorites">
          Open favorites
        </Link>
      </div>

      <section className="details-layout">
        <img
          className="details-poster"
          src={movie.primaryImage?.url || FALLBACK_POSTER}
          alt={movie.originalTitle || 'Movie poster'}
        />

        <div className="details-content">
          <p className="eyebrow">Movie Details</p>
          <h1>{movie.originalTitle || 'Untitled'}</h1>
          <p className="hero-copy">{getPlotText(movie)}</p>

          <div className="details-grid">
            <div className="info-card">
              <span>Year</span>
              <strong>{movie.releaseDate?.year ?? movie.startYear ?? 'N/A'}</strong>
            </div>
            <div className="info-card">
              <span>Rating</span>
              <strong>{movie.rating?.aggregateRating ?? 'N/A'}</strong>
            </div>
            <div className="info-card">
              <span>Genres</span>
              <strong>{getGenres(movie)}</strong>
            </div>
            <div className="info-card">
              <span>Runtime</span>
              <strong>{getRuntime(movie)}</strong>
            </div>
          </div>

          <button
            className={isFavorite ? 'favorite-button active standalone' : 'favorite-button standalone'}
            type="button"
            onClick={handleFavoriteClick}
          >
            {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          </button>
        </div>
      </section>
    </main>
  );
}
