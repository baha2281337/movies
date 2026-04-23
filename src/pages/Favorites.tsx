import {getFavorites} from "../services/favorites";

export default function Favorites() {
    const favorites: string[] = getFavorites();

    return (
        <main className="min-h-screen bg-slate-50">
            <section className="mx-auto max-w-4xl px-4 py-8">
                <h1 className="mb-6 text-3xl font-bold text-slate-900">Избранное</h1>
                <ul className="space-y-3">
                    {favorites.map(favorite => (
                        <li key={favorite} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-700 shadow-sm">
                            {favorite}
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
