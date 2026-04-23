import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/95 text-white shadow-lg backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-2xl font-bold text-transparent">
          MovieStore
        </Link>
        <div className="flex gap-6 font-medium">
          <Link to="/" className="transition-colors hover:text-blue-400">
            Главная
          </Link>
          <Link to="/favorites" className="transition-colors hover:text-blue-400">
            Избранное
          </Link>
        </div>
      </div>
    </nav>
  );
}
