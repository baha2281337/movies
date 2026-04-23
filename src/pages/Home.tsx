import { useEffect, useState } from 'react';
import { boardMovies, searchMovies } from '../services/api';
import type { Movie } from '../services/api';
import SearchBar from '../components/SearchBar';
import Movieslist from '../components/MoviesList';

export default function Home() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect (() =>{
        boardMovies().then(data => {
            setMovies(data.titles);
        });
    }, []);

    const handleSearch = (query: string) => {
        searchMovies(query).then(data => {
            setMovies(data.titles);
        });
    };

    return (
        <main className="min-h-screen bg-slate-50">
            <section className="mx-auto max-w-6xl px-4 py-8">
                <div className="mb-8">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">MovieStore</p>
                    <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Каталог фильмов</h1>
                </div>
                <SearchBar onSearch={handleSearch}/>
                <Movieslist movies={movies} />
            </section>
        </main>
    );
}
