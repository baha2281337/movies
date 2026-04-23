import { useEffect, useState } from "react";
import {useParams} from  "react-router-dom";
import { getMovieById } from "../services/api";
import type { Movie } from "../services/api";

export default function MovieDetails() {
    const {id} = useParams();
    const [movie , setMovies] = useState<Movie | null>(null);

    useEffect(() =>{
        if (!id) return;

        getMovieById(id).then(data => {
            setMovies(data);
        });
    }, [id]);

    return(
        <main className="min-h-screen bg-slate-50">
            <section className="mx-auto grid max-w-5xl gap-8 px-4 py-8 md:grid-cols-[280px_1fr]">
                {movie?.primaryImage?.url && (
                    <img
                        src={movie.primaryImage.url}
                        alt={movie.originalTitle || movie.primaryTitle}
                        className="w-full rounded-xl border border-slate-200 bg-white object-cover shadow-sm"
                    />
                )}
                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <h1 className="mb-4 text-3xl font-bold text-slate-900">
                        {movie?.originalTitle || movie?.primaryTitle}
                    </h1>
                    <p className="text-lg leading-8 text-slate-700">
                        {movie?.plot || 'Описание пока недоступно.'}
                    </p>
                </div>
            </section>
        </main>
    );
}
