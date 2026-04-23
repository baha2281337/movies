import MovieCard from "./MovieCard";
import type { Movie } from "../services/api";

type MoviesListProps = {
    movies: Movie[];
};

export default function Movieslist({movies}: MoviesListProps) {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie}/>
            ))}
        </div>
    );
}
