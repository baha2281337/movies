import { Link } from "react-router-dom";
import { addToFavorites, getFavorites, removeFromFavorites } from "../services/favorites";
import { useState } from "react";
import type { Movie } from "../services/api";

type MovieCardProps = {
    movie: Movie;
    onFavoriteChange?: (id: string, isFavorite: boolean) => void;
};

export default function MovieCard({movie, onFavoriteChange}: MovieCardProps) {
    const [favorites , setFavorites] = useState(getFavorites());

    const handleFavorites = (id: string ) => {
        if (favorites.includes(id)) {
            removeFromFavorites(id);
            setFavorites(getFavorites());
            onFavoriteChange?.(id, false);
        } else {
            addToFavorites(id);
            setFavorites(getFavorites());
            onFavoriteChange?.(id, true);
        }
    };

    const favorite = favorites.includes(movie.id);

    return (
        <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <Link to={`/movie/${movie.id}`} className="flex-1">
                <div className="aspect-[2/3] overflow-hidden bg-slate-100">
                    {movie.primaryImage?.url ? (
                        <img
                            src={movie.primaryImage.url}
                            alt={movie.primaryTitle}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-400">
                            Нет постера
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="h-10 font-bold leading-tight text-slate-800 line-clamp-2 group-hover:text-blue-700">
                        {movie.primaryTitle}
                    </h3>
                </div>
            </Link>
            <div className="p-4 pt-0">
                <button
                    onClick={() => handleFavorites(movie.id)}
                    className={`w-full rounded-lg px-4 py-2 font-medium transition-all active:scale-95 ${favorite
                        ? 'border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                >
                    {favorite ? 'Удалить' : 'В избранное'}
                </button>
            </div>
        </div>
    );
}
