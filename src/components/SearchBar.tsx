import { useState } from 'react';

type SearchBarProps = {
    onSearch: (query: string) => void;
};

export default function SearchBar({onSearch}: SearchBarProps) {
    const [query, setQuery] = useState('');

    return (
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && onSearch(query)}
                placeholder="Найти фильм..."
                className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
            <button
                onClick={() => onSearch(query)}
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
            >
                Найти
            </button>
        </div>
    );
}
