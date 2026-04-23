import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getMovieById } from "../services/api";
import type { Movie } from "../services/api";
import {getFavorites} from "../services/favorites";

export default function Favorites() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const favoriteIds = getFavorites();

        if (favoriteIds.length === 0) {
            setMovies([]);
            setLoading(false);
            return;
        }

        const loadFavorites = async () => {
            setLoading(true);
            setError("");

            const results = await Promise.allSettled(
                favoriteIds.map((id) => getMovieById(id))
            );

            const loadedMovies = results
                .filter((result): result is PromiseFulfilledResult<Movie> => result.status === "fulfilled")
                .map((result) => result.value)
                .filter((movie) => Boolean(movie?.id));

            if (loadedMovies.length !== favoriteIds.length) {
                setError("Some favorite movies could not be loaded.");
            }

            setMovies(loadedMovies);
            setLoading(false);
        };

        loadFavorites();
    }, []);

    const handleFavoriteChange = (id: string, isFavorite: boolean) => {
        if (!isFavorite) {
            setMovies((currentMovies) => currentMovies.filter((movie) => movie.id !== id));
        }
    };

    return (
        <main className="min-h-screen bg-slate-50">
            <section className="mx-auto max-w-4xl px-4 py-8">
                <h1 className="mb-6 text-3xl font-bold text-slate-900">Избранное</h1>
                {loading ? (
                    <p className="text-slate-600">Loading favorites...</p>
                ) : movies.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onFavoriteChange={handleFavoriteChange}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="rounded-lg border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-slate-600">
                        You have no favorite movies yet.
                    </p>
                )}
                {error && (
                    <p className="mt-4 text-sm text-amber-700">{error}</p>
                )}
            </section>
        </main>
    );
}
